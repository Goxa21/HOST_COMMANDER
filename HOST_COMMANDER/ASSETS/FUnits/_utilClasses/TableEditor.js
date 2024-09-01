

class TABLE_EDITOR {
    constructor(cfg = {}) {
        this.root = cfg.root || null;
        this.dataset = cfg.dataset || {
            table_width: null,
            fields: [],
            rows: [],
            changed: [],
        }
        this.operator = cfg.root || null;

        this.curMouseCoords = { x: 0, y: 0 };


        this.InitEditor();
    }
    InitEditor(THIS = this) {
        document.addEventListener('mousemove', function (e) {
            //console.log(THIS.curMouseCoords);
            THIS.curMouseCoords = {
                x: e.clientX,
                y: e.clientY,
            }
        });
        document.addEventListener('mouseup', function (e) {
            document.dispatchEvent(new CustomEvent('LMB_UP', { detail: {} }));

        });
        document.addEventListener('click', function (e) {
            document.dispatchEvent(new CustomEvent('DATA_EDITOR.APPLYCHANGES', { detail: {} }))
        })

        THIS.dataset.changed = [];
        THIS.DrawEditor(THIS);
    }

    DrawEditor(THIS = this) {
        THIS.operator.innerHTML = '';
        let editor_table = document.createElement('table');
        editor_table.classList.add('editor_table');
        THIS.operator.appendChild(editor_table);
        let htr = document.createElement('tr');
        htr.classList.add('htr');
        editor_table.appendChild(htr);

        if (THIS.dataset.table_width) {
            editor_table.style.width = THIS.dataset.table_width;
        }

        for (let header in THIS.dataset.fields) {
            let htd = document.createElement('td');
            htd.classList.add('htd');
            htr.appendChild(htd);

            if (THIS.dataset.fields[header].width) {
                htd.style.width = THIS.dataset.fields[header].width + 'px';
            }

            let type_base = document.createElement('div');
            type_base.classList.add('type_base');
            htd.appendChild(type_base);
            let type_img = document.createElement('img');
            let truetypename = THIS.dataset.fields[header].true_data_type || String(THIS.dataset.fields[header].type).toUpperCase();
            type_img.src = ResolveIconLinks('T_' + truetypename);
            type_img.classList.add('type_img');
            type_base.appendChild(type_img);

            let name_base = document.createElement('div');
            name_base.classList.add('name_base');
            htd.appendChild(name_base);
            let name_display = document.createElement('div');
            name_display.classList.add('name_display');
            if (THIS.dataset.fields[header].text_name){
                name_display.innerHTML = THIS.dataset.fields[header].text_name;
            }
            else {
                name_display.innerHTML = THIS.dataset.fields[header].name;
            }
            name_base.appendChild(name_display);

            let filter_base = document.createElement('div');
            filter_base.classList.add('filter_base');
            htd.appendChild(filter_base);
            let filter_img = document.createElement('img');
            filter_img.src = ResolveIconLinks('Filter');
            filter_img.classList.add('filter_img');
            filter_base.appendChild(filter_img);

            let sorter_base = document.createElement('div');
            sorter_base.classList.add('sorter_base');
            htd.appendChild(sorter_base);
            let sorter_img = document.createElement('img');
            sorter_img.src = ResolveIconLinks('SRT_UD');
            sorter_img.classList.add('sorter_img');
            sorter_base.appendChild(sorter_img);

            let mover = document.createElement('div');
            mover.classList.add('mover');
            htd.appendChild(mover);

            let htd_controller = new HTD_Controller({
                table: editor_table,
                node: htd,
                mover: mover,
                header: header,
                //curMouseCoords:THIS.curMouseCoords,
                master: THIS,
            });
        }

        /*
        let nhtd = document.createElement('td');
        nhtd.classList.add('nhtd');
        htr.appendChild(nhtd);

        let type_base = document.createElement('div');
        type_base.classList.add('type_base');
        nhtd.appendChild(type_base);
        let type_img = document.createElement('img');
        type_img.src = ResolveIconLinks('T_new');
        type_img.classList.add('type_img');
        type_base.appendChild(type_img);
        */


        let checker = 0;
        for (let row in THIS.dataset.rows) {
            let tr = document.createElement('tr');
            tr.classList.add('tr');
            editor_table.appendChild(tr);
            if (checker == 0) {
                checker = 1;
            }
            else {
                checker = 0;
            }
            tr.classList.add('T_' + checker);
            for (let header in THIS.dataset.fields) {
                let editMode = false;
                let td = document.createElement('td');
                td.classList.add('td');
                tr.appendChild(td);
                let curValue = THIS.dataset.rows[row][THIS.dataset.fields[header].name];
                FillTDValue(curValue);
                if (THIS.dataset.changed[row]) {
                    if (THIS.dataset.changed[row][THIS.dataset.fields[header].name]) {
                        td.classList.add('changed');
                    }
                }

                td.addEventListener('click', function (e) {
                    e.stopPropagation();
                    let curValue = THIS.dataset.rows[row][THIS.dataset.fields[header].name];
                    if (!editMode) {
                        document.dispatchEvent(new CustomEvent('DATA_EDITOR.APPLYCHANGES', { detail: {} }))
                        editMode = true;
                        let inputField = document.createElement('input');
                        inputField.classList.add('inputField');
                        inputField.type = ResolveDataType(THIS.dataset.fields[header].true_data_type);
                        if (curValue != null) {
                            inputField.value = curValue;
                        }
                        td.appendChild(inputField);
                        if (inputField.type != data) {
                            inputField.focus();
                        }

                        inputField.addEventListener('input', function (e) {
                            //console.log(this.value);
                        })

                        let curListenerHook = document.addEventListener('DATA_EDITOR.APPLYCHANGES', function () {
                            if (curValue != inputField.value) {
                                td.classList.add('changed');
                                if (!THIS.dataset.changed[row]) {
                                    THIS.dataset.changed[row] = {};
                                }
                                THIS.dataset.changed[row][THIS.dataset.fields[header].name] = true;
                            }
                            FillTDValue(inputField.value);
                            inputField.remove();
                            editMode = false;
                            document.removeEventListener('DATA_EDITOR.APPLYCHANGES', curListenerHook);
                        })
                    }
                });
                function FillTDValue(curValue) {
                    if (curValue != null) {
                        if (THIS.dataset.fields[header].true_data_type == 'DATE') {
                            let bufDate = new Date(curValue);
                            td.innerHTML = RenderDate(bufDate.getDate(), bufDate.getMonth(), bufDate.getFullYear());
                        }
                        else {
                            td.innerHTML = curValue;
                        }
                    }
                    else {
                        td.innerHTML = '';
                    }
                }

            }
        }

        let ntr = document.createElement('tr');
        ntr.classList.add('ntr');
        editor_table.appendChild(ntr);
        let ntd = document.createElement('td');
        ntd.classList.add('ntd');
        ntd.setAttribute('colspan', THIS.dataset.fields.length);
        ntr.appendChild(ntd);
        let newRow_base = document.createElement('div');
        newRow_base.classList.add('newRow_base');
        ntd.appendChild(newRow_base);
        let newRow_img = document.createElement('img');
        newRow_img.src = ResolveIconLinks('T_NEW');
        newRow_img.classList.add('newRow_img');
        newRow_base.appendChild(newRow_img);

        newRow_base.addEventListener('click', function () {
            THIS.dataset.rows.push({});
            let curAddon = {}
            for (let header in THIS.dataset.fields) {
                curAddon[THIS.dataset.fields[header].name] = true;
            }
            THIS.dataset.changed[THIS.dataset.rows.length - 1] = curAddon;
            THIS.DrawEditor(THIS);
        })
    }

}

class HTD_Controller {
    constructor(options) {
        this.table = options.table || {};
        this.node = options.node || {};
        this.mover = options.mover || {};
        this.header = options.header;
        //this.curMouseCoords = options.curMouseCoords || {x:0,y:0};
        this.DATSET_EDITOR = options.master || {};
        this.startMouseCoords = { x: 0, y: 0 };
        this.curMouseCoords = { x: 0, y: 0 };
        this.startNodeWidth = 0;
        this.curNodeWidth = 0;
        this.startTableWidth = 0;
        this.curTableWidth = 0;
        this.needToMove = false;
        this.Init(this);
    }

    Init(THIS = this) {
        //THIS.node.style.width = THIS.startNodeWidth;
        THIS.mover.addEventListener('mousedown', function () {
            let curTableRect = THIS.table.getBoundingClientRect();
            THIS.startTableWidth = curTableRect.width;
            //console.log(THIS.startTableWidth);
            let curRect = THIS.node.getBoundingClientRect();
            THIS.startNodeWidth = curRect.width;
            //console.log(THIS.startNodeWidth);

            THIS.startMouseCoords = THIS.DATSET_EDITOR.curMouseCoords;
            THIS.needToMove = true;
            THIS.MoveHTD(THIS);
        });

        document.addEventListener('LMB_UP', function (e) {
            THIS.needToMove = false;
        })
    }

    MoveHTD(THIS) {
        THIS.curMouseCoords = THIS.DATSET_EDITOR.curMouseCoords;
        //console.log(THIS.startMouseCoords);
        //console.log(THIS.curMouseCoords);
        let curMouseOffset = {
            x: THIS.startMouseCoords.x - THIS.curMouseCoords.x,
            y: THIS.startMouseCoords.y - THIS.curMouseCoords.y,
        };
        THIS.curNodeWidth = THIS.startNodeWidth - curMouseOffset.x;
        THIS.node.style.width = THIS.curNodeWidth;
        THIS.curTableWidth = THIS.startTableWidth - curMouseOffset.x;
        THIS.table.style.width = THIS.curTableWidth;
        //console.log(curMouseOffset);

        if (THIS.needToMove) {
            setTimeout(THIS.MoveHTD, 100, THIS);
        }
        else {
            THIS.DATSET_EDITOR.dataset.fields[THIS.header].width = THIS.curNodeWidth;
            THIS.DATSET_EDITOR.dataset.table_width = THIS.curTableWidth;
        }
    }
}