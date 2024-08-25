const fs = require('fs');

class ROUTER {
    constructor(){
        this.RPATH = './ASSETS';
    }

    ExecuteRequest(request){
        return new Promise((resolve,reject) => {
            //console.log(request.path);
            if (request.path.ext == '.sf'){
                let curModule = require('../ASSETS/FUnits/' + request.data.unit + '/HC_Module.js');
                curModule.Execute(request).then((data)=>{
                    resolve(JSON.stringify(data));
                }).catch((err)=>{
                    reject(err);
                });
                return;
            }
            if (request.path.ext == '.csv'){
                let curModule = require('../ASSETS/FUnits/' + request.path.dir + '/HC_Module.js');
                curModule.Execute(request).then((data)=>{
                    resolve(data);
                }).catch((err)=>{
                    reject(err);
                });
                return;
            }
            if (request.url.pathname == '/'){
                fs.readFile(this.RPATH + '/main.html',(err,data) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(data);
                });
            }else {
                fs.readFile(this.RPATH + request.url.pathname,(err,data) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(data);
                });
            }
        });
    }
}

module.exports = new ROUTER();