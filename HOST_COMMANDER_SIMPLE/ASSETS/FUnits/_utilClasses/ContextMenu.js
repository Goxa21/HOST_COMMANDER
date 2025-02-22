class ContextMenu {
    constructor(cfg = {}) {
        this.el = cfg.elements || [
            {
                name: 'Функция 1',
                method: function () { },
                icon: 'G1'
            },
            {
                name: 'Функция 2',
                method: function () { },
                icon: 'G2'
            },
            {
                name: 'Функция 3',
                method: function () { },
                icon: 'G3'
            },
        ];
        this.transform = cfg.transform || new Transform({});
        this.e = cfg.e || null;
        if (this.e){
            this.transform = new Transform({
                x: this.e.screenX - window.screenLeft,
                y: this.e.screenY - window.screenTop + (window.top.innerHeight - window.top.outerHeight),
            })
        }
        this.cmdot;
        this.cmroot;
        this.cm_base;


        this.Init();
    }

    Init(THIS = this) {
        THIS.cmroot = window.top.document.querySelector('.contextRoot');
        THIS.cmroot.classList.remove('closed');
        console.log(THIS);
        THIS.cmdot = document.createElement('div');
        THIS.cmdot.classList.add('context_dot');
        window.document.body.appendChild(THIS.cmdot);
        THIS.cm_base = document.createElement('div');
        THIS.cm_base.classList.add('bgblocker')
        THIS.cmdot.appendChild(THIS.cm_base);

        THIS.cmdot.style.left = THIS.transform.x;
        THIS.cmdot.style.top = THIS.transform.y;

        //THIS.cm_base.style.width = '100px';
        //THIS.cm_base.style.height = '100px';

        THIS.cmroot.appendChild(THIS.cmdot);

        for (let i in THIS.el){
            THIS.createContext(THIS.el[i]);

        }
    }

    createContext(cfg = {}){
        let cntxt_button = document.createElement('div');
        cntxt_button.classList.add('cntxt_button');

        let cntxt_icon = document.createElement('img');
        cntxt_icon.classList.add('cntxt_icon');
        cntxt_icon.src = ResolveIconLinks(cfg.icon);

        let cntxt_name = document.createElement('div');
        cntxt_name.classList.add('cntxt_name');
        cntxt_name.innerHTML = cfg.name;

        cntxt_button.addEventListener('click',function(e){
            cfg.method(e);
        });


        cntxt_button.appendChild(cntxt_icon);
        cntxt_button.appendChild(cntxt_name);
        this.cm_base.appendChild(cntxt_button);
    }
}