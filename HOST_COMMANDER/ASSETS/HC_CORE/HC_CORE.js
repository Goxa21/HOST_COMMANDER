let qdata = JSON.parse(document.querySelector('#data').innerHTML);
let rootAdress = 'https://' + document.getElementById('host').text + '/';
let MyProfile = null;
let defaultKillSessionTime = 120;
let KillSessionTime = defaultKillSessionTime;
let operator = document.querySelector('.operator');
let operatorBackground = document.querySelector('.operatorBackground');
let downloadFrame = document.querySelector('#download');
let currentModule = {};
let pendingLoaders = [];


// --LOADER-- //
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
    /*
    let styleHost = operator.contentDocument.querySelector('#style_host');
    if (!styleHost) {
        return;
    }
    if (document.querySelector('.logo').classList.contains('light')) {
        //console.log(styleHost);
        //console.log(currentModule);
        styleHost.href = './' + currentModule.codename + '_LIGHT.css';
    }
    else {
        //console.log(styleHost);
        //console.log(currentModule);
        styleHost.href = './' + currentModule.codename + '_DARK.css';
    }
    */
    setTimeout(function () {
    }, 100);
}
/*
downloadFrame.onload = function(){
    loader.Finish();
}
*/

let SimpleMenuTree = [
    {
        name: 'Инфоцентр', // - Наименование вкладки
        codename: 'info_levels', // - Кодовое имя, вся логика смотрит на него
        href: '../FUnits/bi_explorer/bi_explorer.html', // - Я подставлю на своей стороне
        icon: './HC_CORE/images/graph7.png', // - Я подставлю на своей стороне
        default: true, // - Данная вкладка открывается по умолчанию
        parents: [
            'root', // Кодовые имена родителей в иерархии древа (root - корень древа)
        ],
    },
    {
        name: 'Цепочка помощи',
        codename: 'help_chain',
        href: '../FUnits/bi_explorer/bi_explorer.html',// - Я подставлю на своей стороне
        icon: './HC_CORE/images/graph7.png',// - Я подставлю на своей стороне
        parents: [
            'info_levels',
        ],
    },
    {
        name: 'Администрирование',
        codename: 'admin',
        href: '../FUnits/bi_explorer/bi_explorer.html',// - Я подставлю на своей стороне
        icon: './HC_CORE/images/graph7.png',// - Я подставлю на своей стороне
        parents: [
            'root',
        ],
    },
]
/*
    {
        name: '1 Уровень',
        codename: 'lvl1',
        //href: '../FUnits/bi_intro/bi_intro.html',
        extra: {
            path:['root','lvl1'],
        },
        icon: './HC_CORE/images/graph7.png',
        parents: [
            'info_levels',
        ],
    },
    {
        name: '2 Уровень',
        codename: 'lvl2',
        //href: '../FUnits/bi_intro/bi_intro.html',
        icon: './HC_CORE/images/graph7.png',
        parents: [
            'info_levels',
        ],
    },
    {
        name: '3 Уровень',
        codename: 'lvl3',
        //href: '../FUnits/bi_intro/bi_intro.html',
        icon: './HC_CORE/images/graph7.png',
        parents: [
            'lvl2',
        ],
    },
    {
        name: 'Персональный уровень',
        codename: 'lvl4',
        //href: '../FUnits/bi_intro/bi_intro.html',
        icon: './HC_CORE/images/graph7.png',
        parents: [
            'info_levels',
        ],
    },
    {
        name: 'Админ',
        codename: 'egg',
        icon: './HC_CORE/images/CLC_1.png',
        honoredOnly: true,
        parents: [
            'root',
        ],
    },
    {
        name: 'Тетра',
        codename: 'egg_tetra',
        icon: './HC_CORE/images/CLC_1.png',
        href: '../egg_tetra/tetra.html',
        honoredOnly: true,
        parents: [
            'egg',
        ],
    },
    {
        name: 'Космический воин',
        codename: 'egg_spacewarrior',
        icon: './HC_CORE/images/CLC_1.png',
        href: '../egg_spacewarrior/spacewarrior.html',
        honoredOnly: true,
        parents: [
            'egg',
        ],
    },
    {
        name: 'Сапёр',
        codename: 'egg_defuser',
        icon: './HC_CORE/images/CLC_1.png',
        href: '../egg_defuser/defuser.html',
        honoredOnly: true,
        parents: [
            'egg',
        ],
    },

]
*/
/*
let MenuTree = [
    {
        name: 'Инфоцентр',
        href: '../FUnits/bi_explorer/bi_explorer.html',
        icon: './HC_CORE/images/DP_1.png',
        default: true,
        subspace: [{
            name: '1 уровень',
            codename: 'bi_intro',
            href: '../FUnits/bi_intro/bi_intro.html',
        }, {
            name: '2 уровень',
            codename: 'bi_intro',
            href: '../FUnits/bi_intro/bi_intro.html',
        }, {
            name: '3 уровень',
            codename: 'bi_intro',
            href: '../FUnits/bi_intro/bi_intro.html',
        }],
    }, {
        name: 'Игровой центр',
        closed: true,
        honoredOnly: true,
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
    }];
    */
let MenuTree = [];

Awake();
function Awake() {
    //console.log(document.cookie);
    document.addEventListener('contextmenu',function(e){
        e.preventDefault();
    })
    let themeRegexp = /theme=(LIGHT|DARK)/;
    let curTheme = 'LIGHT';
    if (themeRegexp.exec(document.cookie)) {
        curTheme = themeRegexp.exec(document.cookie)[1];
    }
    //console.log(curTheme);
    /*
    switch (curTheme) {
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
    */
    //SET THEME//
    /*
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
    */
    document.querySelector('.logout').addEventListener('click', function () {
        SendPost({}, 'gate.logout', function (data) {
            Warp(rootAdress);
        })
    });
    document.querySelector('.contextRoot').addEventListener('click',function(){
        let childs = this.querySelectorAll('.context_dot'); 
        //console.log(childs);
        for (let i = 0; i < childs.length; i++){
            //console.log(childs[i]);
            childs[i].remove();
        }
        this.classList.add('closed');
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
    });
    document.addEventListener('HC_LOADER.DISPLAY', (e) => {
        console.log(e.detail);
        let animframe = DisplayLoaderAnimationIFRAME(e.detail.node,e.detail.custom_style);
        pendingLoaders.push(animframe);
    });
    document.addEventListener('HC_LOADER.STOPDISPLAY', (e) => {
        //console.log(e);
        if (e.detail.operator) {
            e.detail.node = operatorBackground;
        }
        for (let i = 0; i < pendingLoaders.length; i++) {
            //console.log(pendingLoaders[i].root);
            if (e.detail.node == pendingLoaders[i].root || pendingLoaders[i].root.classList.contains(e.detail.node_class)) {
                pendingLoaders[i].Close();
                pendingLoaders.splice(i, 1);
                i--;
            }
        }
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
    let domain = document.createElement('input');
    domain.classList.add('domain');
    domain.type = 'text';
    domain.placeholder = 'BALNPS.rosenergoatom.ru';
    domain.value = 'BALNPS.rosenergoatom.ru';
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
    form.appendChild(domain);
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
    loginWindow.subwindow.querySelector('.closeCross').addEventListener('click', function () {
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
    MyProfile = data.session;
    document.querySelector('#global').innerHTML = JSON.stringify(MyProfile);
    document.querySelector('.username').innerHTML = MyProfile.cn;
    //console.log(MyProfile);
    GenerateMenu(data);
}

// --MENU-- //
function GenerateMenu(data) {
    let curTree = [];
    for (let id in data.login_info.modules){
        if (data.login_info.modules[id].displayed){
            curTree.push(data.login_info.modules[id]);
        }
    }
    let menuRoot = document.querySelector('.menu');
    menuRoot.classList.remove('closed');
    operator.classList.remove('scaled');
    operatorBackground.classList.remove('scaled');
    let menuButton = document.querySelector('.menuButton');
    menuButton.addEventListener('click', function () {
        if (menuRoot.classList.contains('closed')) {
            menuRoot.classList.remove('closed');
            operator.classList.remove('scaled');
            operatorBackground.classList.remove('scaled');
        }
        else {
            menuRoot.classList.add('closed');
            operator.classList.add('scaled');
            operatorBackground.classList.add('scaled');
        }
    });

    
    for(let elid in curTree){
        curTree[elid] = {...curTree[elid],...MODULE_LIBRARY.ResolveDetails(curTree[elid].codename)};
    }
    //console.log(curTree);
    FormatTreeToMultyLevel(curTree);

    function FormatTreeToMultyLevel(curTree) {
        //console.log(curTree)
        curTree.forEach(SMT_elem => {
            if (SMT_elem.parents.includes("root")) {
                MenuTree.push(SMT_elem);
                SMT_elem.scanned = true;
                FindAllChilds(SMT_elem);
            }
        });

        function FindAllChilds(parent) {
            curTree.forEach(SMT_elem => {
                if (SMT_elem.scanned) {
                    return;
                }
                if (SMT_elem.parents.includes(parent.codename)) {
                    if (!parent.subspace) {
                        parent.subspace = [];
                    }
                    parent.subspace.push(SMT_elem);
                    SMT_elem.scanned = true;
                    FindAllChilds(SMT_elem);
                }
            })
        }

    }


    GenerateBranchRecursive(menuRoot, MenuTree, { isFirst: true });

    function GenerateBranchRecursive(root, curBranch, options = {}) {
        curBranch.forEach(elem => {
            if (elem.honoredOnly) {
                switch (MyProfile.userName) {
                    case 'gegelgg':
                    case 'smirnovar':
                    case 'boichukav':
                    case 'churinms':
                        break;
                    default:
                        return;
                }
            }

            let mt_elem = document.createElement('div');
            mt_elem.classList.add('mt_elem');
            root.appendChild(mt_elem);

            let mt_nameRow = document.createElement('div');
            mt_nameRow.classList.add('mt_nameRow');
            mt_elem.appendChild(mt_nameRow);

            if (!options.isFirst) {
                let mt_childBar = document.createElement('div');
                mt_childBar.classList.add('mt_childBar');
                mt_nameRow.appendChild(mt_childBar);
            }

            let mt_unfold = document.createElement('div');
            if (elem.subspace) {
                mt_unfold.classList.add('mt_unfold');
                mt_nameRow.appendChild(mt_unfold);

                let mt_unfoldImg = document.createElement('img');
                mt_unfoldImg.src = './HC_CORE/images/CLC_3.png';
                mt_unfold.appendChild(mt_unfoldImg);


            }

            let mt_butt = document.createElement('div');
            mt_butt.classList.add('mt_butt');
            mt_nameRow.appendChild(mt_butt);

            let mt_icon = document.createElement('div');
            mt_icon.classList.add('mt_icon');
            mt_butt.appendChild(mt_icon);

            let mt_iconImg = document.createElement('img');
            if (elem.icon) {
                mt_iconImg.src = elem.icon;
            }
            else {
                mt_iconImg.src = './HC_CORE/images/BL1_100px.png';
            }
            mt_icon.appendChild(mt_iconImg);

            let mt_name = document.createElement('div');
            mt_name.innerHTML = elem.name;
            mt_name.classList.add('mt_name');
            mt_butt.appendChild(mt_name);



            let mt_subspace = document.createElement('div');
            if (elem.subspace) {
                mt_subspace.classList.add('mt_subspace');
                mt_subspace.classList.add('closed');
                mt_unfold.classList.add('closed');
                mt_elem.appendChild(mt_subspace);

                mt_unfold.addEventListener('click', function () {
                    if (mt_subspace.classList.contains('closed')) {
                        mt_subspace.classList.remove('closed');
                        mt_unfold.classList.remove('closed');
                    }
                    else {
                        mt_subspace.classList.add('closed');
                        mt_unfold.classList.add('closed');
                    }
                });

                GenerateBranchRecursive(mt_subspace, elem.subspace);
            }

            if (elem.href) {
                mt_butt.addEventListener('click', function () {
                    loader.inActionCounter = 0;
                    loader.Launch();
                    window.top.document.dispatchEvent(new CustomEvent('HC_LOADER.DISPLAY', { detail: { node: operatorBackground } }));
                    currentModule = elem;
                    operator.contentWindow.document.open();
                    operator.contentWindow.document.write('');
                    operator.contentWindow.document.close();
                    document.querySelectorAll('.mt_butt').forEach(elem => {
                        elem.classList.remove('active');
                    });
                    mt_butt.classList.add('active');
                    setTimeout(() => {
                        operator.setAttribute('src', elem.href);
                    }, 200);
                });
            }
            else {
                if (elem.subspace) {
                    mt_butt.addEventListener('click', function () {
                        if (mt_subspace.classList.contains('closed')) {
                            mt_subspace.classList.remove('closed');
                            mt_unfold.classList.remove('closed');
                        }
                        else {
                            mt_subspace.classList.add('closed');
                            mt_unfold.classList.add('closed');
                        }
                    });
                }
            }
            if (elem.default == true) {
                loader.inActionCounter = 0;
                loader.Launch();
                window.top.document.dispatchEvent(new CustomEvent('HC_LOADER.DISPLAY', { detail: { node: operatorBackground } }));
                currentModule = elem;
                mt_butt.classList.add('active');
                operator.contentWindow.document.open();
                operator.contentWindow.document.write('');
                operator.contentWindow.document.close();
                setTimeout(() => {
                    operator.setAttribute('src', elem.href);
                }, 500);
            }
        });

    }

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
    let openAction = function () { };
    let closeAction = function () { };
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
/*
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
*/


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

function DisplayLoaderAnimationIFRAME(rootNode,custom_style = 'height:100%; width:100%') {

    let iframe = document.createElement('iframe');
    iframe.frameBorder = 0;
    iframe.src = '../../HC_CORE/loader/loader.html';
    iframe.style = custom_style;
    rootNode.appendChild(iframe);
    return {
        iframe: iframe,
        root: rootNode,
        Close: function () {
            let cur_opacity = 1;
            setTimeout(anim, 100);
            function anim() {
                if (cur_opacity > 0) {
                    cur_opacity--;
                    iframe.style.opacity = cur_opacity;
                    setTimeout(anim, 100);
                }
                else {
                    iframe.remove();
                }
            }
        }
    }
}