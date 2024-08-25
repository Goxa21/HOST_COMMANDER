const fs = require('fs');
const https = require('https');
const http = require('http');
const URL = require('url');
const Path = require('path');
const cookie = require('cookie');
const SESSION_MANAGER = require('./SESSION_MANAGER.js');


const {
    Worker, isMainThread, parentPort, workerData
} = require('worker_threads');
const { pathMatch } = require('tough-cookie');


class GATE {
    constructor(options) {
        this.options = options || {
            PORT: 8080,
            DEVMODE: true,
            RPATH: '.',
        };
        if (this.options.RPATH != '.'){
            process.chdir(this.options.RPATH);
        }
        this.ssl;
        if (this.options.DEVMODE) {
            this.ssl = {
                key: fs.readFileSync(this.options.RPATH + '/ssl/dom/bal-webapps-01.server.decrypted.key'),
                cert: fs.readFileSync(this.options.RPATH + '/ssl/dom/bal-webapps-01.server.crt'),
            }
        }
        else {
            this.ssl = {
                /*
                key: fs.readFileSync(this.options.RPATH + '/ssl/dom/bal-webapps-01.server.decrypted.key'),
                cert: fs.readFileSync(this.options.RPATH + '/ssl/dom/bal-webapps-01.server.crt'),
                */
                key: fs.readFileSync(this.options.RPATH + '/ssl/keys/server.key'),
                cert: fs.readFileSync(this.options.RPATH + '/ssl/keys/server.cert'),
            }
        }
        this.server = null;
    }

    Start() {
        let options = this.options;
        this.server = https.createServer(this.ssl, function (request, response) {

            let curUrl = URL.parse(request.url, true);
            let curPath = Path.parse(curUrl.pathname);
            let curCookie = {};
            let curSession = null;
            if (request.headers.cookie != null) {
                try{
                    curCookie = JSON.parse(cookie.parse(request.headers.cookie).cook);
                }
                catch{
                    //console.log('DEFECTIVE COOKIE!!!');
                }
                curSession = SESSION_MANAGER.CheckSessionExistance(curCookie.userName, curCookie.sessionKey);
            }
            let curMethod = request.method;
            let curData = '';
            switch (curMethod) {
                case "GET":
                    OpenGate();
                    break;
                case "POST":
                    request.on('data', (data) => {
                        curData += data;
                    }).on('end', () => {
                        curData = JSON.parse(curData);
                        if (curPath.ext == '.login') {
                            SESSION_MANAGER.OpenNewSession(curData.user, curData.pass).then((curSession) => {
                                if (curSession != null) {
                                    let sessionResponce = JSON.parse(JSON.stringify(curSession));
                                    sessionResponce.sessionKey = null;
                                    response.writeHead(200, { 'Set-Cookie': SetLoginCookie(curSession.userName, curSession.sessionKey), "Content-type": "text/plain;  charsetcharset=utf-8", 'Secure': 'HttpOnly' });
                                    response.end(JSON.stringify({
                                        data: sessionResponce,
                                        status: 'success',
                                    }));
                                }
                            }).catch((err) => {
                                response.writeHead(200, { "Content-type": "text/plain;  charsetcharset=utf-8" });
                                response.end(JSON.stringify({
                                    data: null,
                                    status: 'denied',
                                }));
                            });
                            return;
                        }
                        else if (curPath.ext == '.autologin') {
                            curSession = SESSION_MANAGER.CheckSessionExistance(curCookie.userName, curCookie.sessionKey);
                            if (curSession != null) {
                                let sessionResponce = JSON.parse(JSON.stringify(curSession));
                                sessionResponce.sessionKey = null;
                                response.writeHead(200, { 'Set-Cookie': SetLoginCookie(curSession.userName, curSession.sessionKey), "Content-type": "text/plain;  charsetcharset=utf-8", 'Secure': 'HttpOnly' });
                                response.end(JSON.stringify({
                                    data: sessionResponce,
                                    status: 'success',
                                }));
                                return;
                            }
                            else {
                                response.writeHead(200, { "Content-type": "text/plain;  charsetcharset=utf-8" });
                                response.end(JSON.stringify({
                                    data: null,
                                    status: 'denied',
                                }));
                                return;
                            }
                        }
                        else if (curSession == null){
                            response.writeHead(200, { "Content-type": "text/plain;  charsetcharset=utf-8" });
                            response.end(JSON.stringify({
                                data: {},
                                status: 'forbidden session',
                            }));
                            return;
                        }
                        else if (curPath.ext == '.logout') {
                            curSession = SESSION_MANAGER.KillSession(curCookie.userName, curCookie.sessionKey);
                            response.writeHead(200, { "Content-type": "text/plain;  charsetcharset=utf-8" });
                            response.end(JSON.stringify({
                                data: curSession,
                                status: 'success',
                            }));
                            return;
                        }
                        OpenGate();
                    })
                    break;
            }

            async function OpenGate() {
                let singletonResult = null;
                let requestPrefab = {
                    url: curUrl,
                    cookie: curCookie || {},
                    method: curMethod,
                    data: curData,
                    path:curPath,
                    singletonResult:singletonResult,
                }
                if (curPath.ext == '.sf'){
                    let curModule = require('../ASSETS/FUnits/' + curData.unit + '/HC_Singleton.js');
                    try {
                        singletonResult = await curModule.Execute(requestPrefab);
                        //console.log('SINGLETON RESULT:' + singletonResult);
                        requestPrefab.singletonResult = singletonResult;
                    }
                    catch {
                        console.log('SingletonNotFound at ' + '../ASSETS/FUnits/' + curData.unit + '/HC_Singleton.js');
                    }
                }
                let GATE_WORKER = new Worker(options.RPATH + '/HOSTCOMMANDER/GATE_WORKER.js', {
                    workerData: {
                        options: options,
                        request: requestPrefab,
                        session: curSession,
                    }
                });
                GATE_WORKER.once('message', function (message) {
                    //console.log(curPath.base);
                    response.writeHead(message.status, message.header);
                    if (curPath.ext == ".html" || (curPath.name == '' && curPath.dir == '/')) {
                        response.write("<script id='data' type = 'application/json'>" + JSON.stringify(curUrl.query) + "</script>");
                        response.write("<script id='host' type = 'application/json'>" + request.headers.host + "</script>");
                    }
                    response.end(message.body);
                });
                GATE_WORKER.on('exit',function(){
                    //console.log('GATE_CLOSED');
                })
            }
        });

        this.Listen();

        function SetLoginCookie(userName, sessionKey) {
            return 'cook=' + JSON.stringify({
                'userName': userName,
                'sessionKey': sessionKey
            });
        }
    }

    Listen() {
        try {
            this.server.listen(this.options.PORT, '0.0.0.0', () => {
                console.clear();
                console.log(" ");
                console.log(`HOSTCOMMANDER started on PORT ${this.options.PORT}`);
                console.log(" ");
                console.log("--DIAGNOSTICS:");
            });
        }
        catch (e) {
            console.log("---FATAL--ERROR---");
            console.log(e);
            console.log("---RESTARTING--SERVER---");
            this.Listen();
        }
    }


}


module.exports = GATE;