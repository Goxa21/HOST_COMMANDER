class Qfield{
    constructor(cfg = {}){
        this.node = null;
        this.nameField = null;
        this.inputField = null;
        this.name = cfg.name || 'QField';
        this.type = cfg.type || 'text';
        this.options = cfg.options || [
            {name:'q-var-1',value:1},
            {name:'q-var-2',value:2},
            {name:'q-var-3',value:3},
        ];
        
        this.Init(this);
    }
    Init(THIS = this){
        THIS.node = document.createElement('div');
        THIS.node.classList.add('q-field');
        
        THIS.nameField = document.createElement('div');
        THIS.nameField.classList.add('q-name');
        THIS.nameField.innerHTML = THIS.name;
        THIS.node.appendChild(THIS.nameField);

        switch(THIS.type){
            case ('select'):
                THIS.inputField = document.createElement('select');
                for (let opt_elem of THIS.options){
                    let opt = document.createElement('option');
                    opt.innerHTML = opt_elem.name;
                    opt.value = opt_elem.value;
                    THIS.inputField.appendChild(opt);
                }
                break;
            case ('textarea'):
                THIS.inputField = document.createElement('textarea');
                THIS.inputField.addEventListener('focus',function(e){
                    THIS.inputField.classList.add('selected');
                    THIS.inputField.style.height = THIS.inputField.scrollHeight + 'px';
                });
                THIS.inputField.addEventListener('blur',function(e){
                    THIS.inputField.classList.remove('selected');
                    THIS.inputField.style.height = '';
                });
                THIS.inputField.addEventListener('input',function(e){
                    THIS.inputField.style.height = THIS.inputField.scrollHeight + 'px';
                });
                break;
            default:
                THIS.inputField = document.createElement('input');
                THIS.inputField.type = THIS.type;
                break;
            }
            
            THIS.inputField.classList.add('q-input');
            THIS.node.appendChild(THIS.inputField);
        
    }
}