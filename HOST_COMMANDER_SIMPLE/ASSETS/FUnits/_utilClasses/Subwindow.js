class HC_Subwindow {
    constructor(cfg = {}) {

        this.openAction = cfg.openAction || function () { };
        this.closeAction = cfg.closeAction || function () { };

        this.swHeight = cfg.heignt || window.top.window.innerHeight;
        this.swWidth = cfg.width || window.top.window.innerWidth;

        this.subwindow;

        this.sbwroot;
        this.sbwdot;
        
        this.Init();
    }

    Init(THIS = this) {
        THIS.sbwroot = window.top.document.querySelector('.subwindowRoot');
        let totalSubwCount = window.top.document.querySelectorAll('.subwindowRoot .subwindow');
        THIS.sbwdot = document.createElement('div');
        THIS.sbwdot.classList.add('subwindow_dot');
        let sbwbgblocker = document.createElement('div');
        sbwbgblocker.classList.add('bgblocker')
        THIS.sbwdot.appendChild(sbwbgblocker);
        
        sbwbgblocker.style.width = THIS.swWidth;
        sbwbgblocker.style.height = THIS.swHeight;
        sbwbgblocker.style.left = -window.top.window.innerWidth/2;
        sbwbgblocker.style.top = -window.top.window.innerHeight/2;

        let sbw = document.createElement('div');
        sbw.classList.add('s' + totalSubwCount.length);
        sbw.classList.add('subwindow');
        let closeCross = document.createElement('div');
        closeCross.classList.add('closeCross');
        closeCross.classList.add('interactible');
        closeCross.innerHTML = 'X';
        sbw.appendChild(closeCross);
        THIS.sbwroot.appendChild(THIS.sbwdot);
        THIS.sbwdot.appendChild(sbw);
        closeCross.addEventListener('click', () => {THIS.Close(THIS)});

        THIS.subwindow = sbw;
    }

    Open(THIS = this){
        THIS.sbwroot.classList.remove('closed');
        THIS.openAction();
    }
    Close(THIS = this){
        THIS.closeAction();
        THIS.sbwdot.remove();
        console.log(window.top.document.querySelectorAll('.subwindowRoot .subwindow'))
        if (window.top.document.querySelectorAll('.subwindowRoot .subwindow').length == 0) {
            THIS.sbwroot.classList.add('closed');
        }
    }
}