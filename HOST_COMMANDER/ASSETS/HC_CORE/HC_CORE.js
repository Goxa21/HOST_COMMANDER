let qdata = JSON.parse(document.querySelector('#data').innerHTML);
let rootAdress = 'https://' + document.getElementById('host').text + '/';
let MyProfile = null;
let defaultKillSessionTime = 120;
let KillSessionTime = defaultKillSessionTime;
let operator = document.querySelector('.operator');
let downloadFrame = document.querySelector('#download');
let currentModule = {};


// --LADER-- //
class LOADER {
    constructor(node) {
        this.node = node;
        this.lerpCoef = 0.02;
        this.progress = 0;
        this.alpha = 0;
        this.dimCoef = 0.02;
        this.cycleHandlerID = null;
        this.dimHandlerID = null;
        this.THIS = this;
        this.inActionCounter = 0;
    }

    Launch() {
        this.inActionCounter++;
        clearInterval(this.dimHandlerID);
        clearInterval(this.cycleHandlerID);
        this.progress = 0;
        this.node.value = this.progress;
        this.alpha = 1;
        this.node.style.setProperty('--color', 'rgba(255,255,103,' + this.alpha + ')');
        if (this.node != null) {
            this.node.classList.add('active');
        }
        this.cycleHandlerID = setInterval(this.cycle, 10, this);
    }

    cycle(THIS) {
        if (THIS.node != null) {
            THIS.node.value = THIS.progress;
        }
        if (THIS.progress < 100) {
            THIS.progress += (100 - THIS.progress) * THIS.lerpCoef;
        }
    }

    Finish() {
        this.inActionCounter--;
        if (this.inActionCounter > 0) {
            return;
        }
        clearInterval(this.cycleHandlerID);
        this.progress = 100;
        this.cycle(this);
        if (this.node != null) {
            this.node.classList.remove('active');
        }
        this.dimHandlerID = setInterval(this.dim, 10, this);
    }

    dim(THIS) {
        THIS.node.style.setProperty('--color', 'rgba(255,255,103,' + THIS.alpha + ')');
        if (THIS.alpha > 0) {
            THIS.alpha -= THIS.dimCoef;
        }
        else {
            clearInterval(THIS.dimHandlerID);
        }
    }
}
let loader = new LOADER(document.querySelector('.loader'));

operator.onload = function () {
    loader.Finish();
    if (document.querySelector('.logo').classList.contains('light')) {
        let styleHost = operator.contentDocument.querySelector('#style_host');
        //console.log(styleHost);
        //console.log(currentModule);
        styleHost.href = './' + currentModule.codename + '_LIGHT.css';
    }
    else {
        let styleHost = operator.contentDocument.querySelector('#style_host');
        //console.log(styleHost);
        //console.log(currentModule);
        styleHost.href = './' + currentModule.codename + '_DARK.css';
    }
    setTimeout(function () {
    }, 100);
}
/*
downloadFrame.onload = function(){
    loader.Finish();
}
*/



let MenuTree = [{
    name: 'Интерфейс',
    subspace: [{
        name: 'Просмотр',
        codename: 'status',
        href: '../FUnits/status/status.html',
        default: true,
    }]
}, {
    name: 'Игровой центр',
    closed: true,
    honoredOnly:true,
    subspace: [{
        name: 'Тетра',
        codename: '',
        href: '../egg_tetra/tetra.html',
    },
    {
        name: 'Космический воин',
        codename: '',
        href: '../egg_spacewarrior/spacewarrior.html',
    },
    {
        name: 'Сапёр',
        codename: '',
        href: '../egg_defuser/defuser.html',

    }]
}]

Awake();
function Awake() {
    //console.log(document.cookie);
    let themeRegexp = /theme=(LIGHT|DARK)/;
    let curTheme = 'LIGHT';
    if (themeRegexp.exec(document.cookie)){
        curTheme = themeRegexp.exec(document.cookie)[1];
    }
    //console.log(curTheme);
    switch (curTheme){
        case "DARK":
            document.querySelector('.logo').classList.remove('light');
            document.querySelector('#style_host').href = './HC_CORE/HC_CORE_DARK.css';
            break;
        case "LIGHT":
            document.querySelector('.logo').classList.add('light');
            document.querySelector('#style_host').href = './HC_CORE/HC_CORE_LIGHT.css';
            break;
        default:
            document.cookie = 'theme=LIGHT';
            break;
    }
    //SET THEME//
    document.querySelector('.logo').addEventListener('click', function () {
            if (!this.classList.contains('light')) {
                this.classList.add('light');
                document.cookie = 'theme=LIGHT';
                let core_stylesheet = document.querySelector('#style_host');
                let operator_stylesheet = operator.contentDocument.querySelector('#style_host');
                core_stylesheet.href = core_stylesheet.href.replace('DARK', 'LIGHT');
                operator_stylesheet.href = operator_stylesheet.href.replace('DARK', 'LIGHT');
            }
            else {
                this.classList.remove('light');
                document.cookie = 'theme=DARK';
                let core_stylesheet = document.querySelector('#style_host');
                let operator_stylesheet = operator.contentDocument.querySelector('#style_host');
                core_stylesheet.href = core_stylesheet.href.replace('LIGHT', 'DARK');
                operator_stylesheet.href = operator_stylesheet.href.replace('LIGHT', 'DARK');
            }

        })
        document.querySelector('.logout').addEventListener('click', function () {
            SendPost({}, 'gate.logout', function (data) {
                Warp(rootAdress);
            })
        });
        //TryToAutologin
        Autologin().then(() => {
        }).catch(() => {
            LoginGate();
        });

        document.addEventListener('HC_FORBIDDENSESSION', (e) => {
            Warp(rootAdress);
        });
        document.addEventListener('HC_LOADER.LAUNCH', (e) => {
            loader.Launch();
        });
        document.addEventListener('HC_LOADER.FINISH', (e) => {
            loader.Finish();
        });
        document.addEventListener('HC_DOWNLOAD', (e) => {
            Download(e.detail.src);
        })
    }

    function Autologin() {
        return new Promise((resolve, reject) => {
            SendPost({
            }, 'gate.autologin', function (data) {
                if (data.status == 'success') {
                    SetMyProfile(data.data);
                    resolve();
                }
                else {
                    reject();
                }
            })
        })
    }

    function LoginGate() {
        let loginWindow = GenerateSubwindow();
        loginWindow.subwindow.classList.add('loginGate');
        let form = document.createElement('form');
        let title = document.createElement('div');
        title.innerHTML = 'Аутентификация';
        title.classList.add('title');
        let inputName = document.createElement('input');
        inputName.classList.add('username');
        inputName.type = 'text';
        inputName.placeholder = 'Логин';
        let inputPass = document.createElement('input');
        inputPass.classList.add('password');
        inputPass.type = 'password';
        inputPass.placeholder = 'Пароль';
        let inputSubmit = document.createElement('input');
        inputSubmit.classList.add('submit');
        inputSubmit.classList.add('interactible');
        inputSubmit.type = 'submit';
        inputSubmit.value = 'Вход';
        let info = document.createElement('div');
        info.classList.add('info');
        info.innerHTML = '';
        form.appendChild(title);
        form.appendChild(inputName);
        form.appendChild(inputPass);
        form.appendChild(inputSubmit);
        form.appendChild(info);
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            //console.log(inputName.value);
            //console.log(inputPass.value);
            SendPost({
                user: inputName.value,
                pass: inputPass.value,
            }, 'gate.login', function (data) {
                if (data.status == 'success') {
                    loginWindow.Close();
                    SetMyProfile(data.data);
                }
                else {
                    info.innerHTML = 'Данные введены неверно';
                    inputPass.value = '';
                }
            })
        });
        loginWindow.subwindow.querySelector('.closeCross').addEventListener('click',function(){
            SendPost({
                user: 'guest',
                pass: 'guest',
            }, 'gate.login', function (data) {
                if (data.status == 'success') {
                    loginWindow.Close();
                    SetMyProfile(data.data);
                }
                else {
                    info.innerHTML = 'Данные введены неверно';
                    inputPass.value = '';
                }
            });
        });
        loginWindow.subwindow.appendChild(form);
        /*
        SendPost({
            user: 'guest',
            pass: 'guest',
        }, 'gate.login', function (data) {
            if (data.status == 'success') {
                loginWindow.Close();
                SetMyProfile(data.data);
            }
            else {
                info.innerHTML = 'Данные введены неверно';
                inputPass.value = '';
            }
        });
        */
        loginWindow.Open();

    }

    function SetMyProfile(data) {
        MyProfile = data;
        document.querySelector('#global').innerHTML = JSON.stringify(MyProfile);
        document.querySelector('.username').innerHTML = MyProfile.cn;
        console.log(MyProfile);
        GenerateMenu();
    }

    // --MENU-- //
    function GenerateMenu() {
        let menuRoot = document.querySelector('.menu');
        //menuRoot.classList.remove('closed');
        //operator.classList.remove('scaled');
        let menuButton = document.querySelector('.menuButton');
        menuButton.addEventListener('click', function () {
            if (menuRoot.classList.contains('closed')) {
                menuRoot.classList.remove('closed');
                operator.classList.remove('scaled');
            }
            else {
                menuRoot.classList.add('closed');
                operator.classList.add('scaled');
            }
        })
        //console.log(menuRoot);
        MenuTree.forEach(elem => {
            if (elem.honoredOnly){
                switch (MyProfile.userName){
                    case 'gegelgg':
                    case 'smirnovar':
                    case 'boichukav':
                    case 'churinms':
                        break;
                    default:
                        return;
                }
            }
            let elb = document.createElement('div');
            let elbname = document.createElement('div');
            elb.appendChild(elbname);
            elbname.innerHTML = elem.name;
            elb.classList.add('tome');
            elb.classList.add('closed');
            elbname.classList.add('name');
            menuRoot.appendChild(elb);
            let elbChilds = [];
            elem.subspace.forEach(elem => {
                let elp = document.createElement('div');
                elp.innerHTML = elem.name;
                elp.classList.add('page');
                elp.classList.add('interactible');
                elp.addEventListener('click', function () {
                    loader.inActionCounter = 0;
                    loader.Launch();
                    currentModule = elem;
                    operator.setAttribute('src', elem.href);
                }); 
                if (elem.default == true) {
                    //loader.inActionCounter = 0;
                    loader.Launch();
                    currentModule = elem;
                    operator.setAttribute('src', elem.href);
                }
                elb.appendChild(elp);
                elbChilds.push(elp);
            });
            function elbToggle(){
                if (elb.classList.contains('closed')) {
                    elb.classList.remove('closed');
                }
                else {
                    elb.classList.add('closed');
                }
                elbChilds.forEach(elem => {
                    if (elem.classList.contains('hidden')) {
                        elem.classList.remove('hidden');
                    }
                    else {
                        elem.classList.add('hidden');
                    }
                });
            }
            if (elem.closed){
                elbToggle();
            }
            elbname.addEventListener('click', elbToggle)
        })
    }

    // --SUBWINDOW-- //
    function GenerateSubwindow() {
        let sbwroot = document.querySelector('.subwindowRoot');
        let totalSubwCount = document.querySelectorAll('.subwindowRoot .subwindow');
        let sbwdot = document.createElement('div');
        sbwdot.classList.add('subwindow_dot');
        let sbw = document.createElement('div');
        sbw.classList.add('s' + totalSubwCount.length);
        sbw.classList.add('subwindow');
        let closeCross = document.createElement('div');
        closeCross.classList.add('closeCross');
        closeCross.classList.add('interactible');
        closeCross.innerHTML = 'X';
        sbw.appendChild(closeCross);
        sbwroot.appendChild(sbwdot);
        sbwdot.appendChild(sbw);
        let openAction = function(){};
        let closeAction = function(){};
        let openSubwindow = function () {
            sbwroot.classList.remove('closed');
            openAction();
        }
        let closeSubwindow = function () {
            closeAction();
            sbwdot.remove();
            if (document.querySelectorAll('.subwindowRoot .subwindow').length == 0) {
                sbwroot.classList.add('closed');
            }
        }
        closeCross.addEventListener('click', closeSubwindow);
        return {
            Open: openSubwindow,
            Close: closeSubwindow,
            openAction: openAction,
            closeAction: closeAction,
            subwindow: sbw,
        };
    }

    // --XHR POSTER-- //
    function SendPost(saveData, customRef, callback) {
        loader.Launch();
        console.log(saveData);
        let xhr = new XMLHttpRequest();
        xhr.open('POST', customRef, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                jsonData = JSON.parse(xhr.responseText);
                console.log(jsonData);
                RefreshKILLTimer();
                switch (JSON.parse(xhr.responseText).status) {
                    case "forbidden session":
                        loader.Finish();
                        Warp(rootAdress);
                        break;
                    default:
                        callback(jsonData);
                        loader.Finish();
                        break;
                }
            }
            else if (xhr.status != 200) {
                console.error('ERR:' + xhr.status);
            }
        };
        xhr.send(JSON.stringify(saveData));
    }

    // --SESSION KILLER-- //
    function KillSession() {
        SendPost({}, 'gate.logout', function () {
            console.log('Session is dead');
            Warp(rootAdress);
        });
    }

    function KILLTimer() {
        KillSessionTime--;
        //console.log("KILL IN " + KillSessionTime);
        if (KillSessionTime < 0) {
            KillSession();
        }
        else {
            setTimeout(KILLTimer, 1000);
        }
    }

    function RefreshKILLTimer() {
        KillSessionTime = defaultKillSessionTime;
    }

    // --WARPER-- //
    function Warp(destinationURL) {
        window.location.href = destinationURL;
    }

    function Download(src) {
        //loader.Launch();
        if (downloadFrame != null) {
            console.log('Downloading:' + src);
            downloadFrame.src = src;
            //setTimeout(loadChecker,100);
        }
        /*
        function loadChecker(){
            let frameDoc = downloadFrame.contentDocument || downloadFrame.contentWindow.document;
            if (frameDoc.readyState == 'complete'){
                loader.Finish();
            }
            else {
            }
            setTimeout(loadChecker,100);
        }
        */
    }