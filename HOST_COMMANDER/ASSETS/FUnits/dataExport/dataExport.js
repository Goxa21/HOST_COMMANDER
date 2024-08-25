let MyProfile = JSON.parse(window.top.document.querySelector('#global').innerHTML);
let downloadEvent = new CustomEvent('HC_DOWNLOAD', { detail: { src: './dataExport/report.csv' } });
let loaderLaunchEvent = new Event('HC_LOADER.LAUNCH');
let loaderFinishEvent = new Event('HC_LOADER.FINISH');
let forbiddenSessionEvent = new Event('HC_FORBIDDENSESSION');

class CSV_FORMER {
    constructor(settings) {
        this.THIS = this;
        this.presets = [
            {
                filters: { years: '2024', pos_num: '11' },
                sorters: {},
                positions: { code_ps_num: 1, years: 2 },
                ID: 0,
                name: 'Шаблон-шаблонный',
                default: true,
            },
            {
                filters: { years: '2023' },
                sorters: {},
                positions: { target_text: 1, years: 2 },
                ID: 1,
                name: 'Неактивный',
            },
        ];
        this.fields = [];
        this.fieldNames = {
            accept_date: "Дата утверждения",
            act_vk_text: "Номер акта ВК",
            base_unit_text: "Базовая ЕИ",
            central_cost_num: "Сумма Поступило на ЦС",
            central_quantity_num: "Кол-во Поступило на ЦС",
            code_ps_num: "Код ПС",
            cont_numb_text: "Номер договора",
            contract_cost: "Сумма В договорах",
            contract_quantity_num: "Кол-во В договорах",
            contragent_contract_date: "Дата договора у контрагента",
            contragent_name_text: "Имя контрагента",
            control_type: "Вид контроля",
            cost_central_out_num: "Сумма Отпущено с ЦС",
            costnmc_num: "Стоимость без НДС(НМЦ)",
            costvv_num: "Стоимость без НДС, ВВ",
            cur_type_stock_text: "Текущий вид запаса",
            customer_name_text: "Заказчик имя",
            delivery_date: "Дата поставки по договору",
            description_text: "Примечание",
            document_date_text: "Дата проводки документа",
            earthquake_resist_text: "Категория сейсмостойкости",
            element_purpose_text: "НазнЭлемента",
            element_spp_text: "СПП-элемент",
            event_name_text: "Наименование мероприятия",
            external_cont_numb_text: "Внешний номер договора",
            finance_pos_name_text: "Фин.поз. имя",
            finance_pos_text: "Финансовая позиция",
            fond_list_text: "Список фондов",
            justification_text: "Обоснование",
            material_num: "Материал",
            name_pfm_text: "ПФМ имя",
            name_ps_text: "Название ПС",
            object_name_text: "Объект имя",
            okpd2_text: "ОКПД2",
            order_num: "Заявка",
            order_pos_nom2_text: "Позиция ГПЗ",
            order_pos_nom_text: "ГПЗ",
            planner_name_text: "Имя плановика",
            planner_text: "Плановик",
            pos_num: "Позиция заявки",
            program_item_text: "Пункт программы",
            purchase_dep_text: "Отдел снабжения",
            purchase_group_text: "Группа закупок",
            purchase_order: "№ заказа на поставку",
            purchase_org_text: "Закуп. организация",
            quantity_central_out_num: "Кол-во Отпущено с ЦС",
            replace_pos_num: "Замена позиции",
            reqquantity_num: "ЗатребованКолич",
            request_author: "Автор заявки: имя",
            request_type_text: "Вид заявки имя",
            safety_class_num: "Класс безопасности",
            status_accept: "Статус утверждения",
            status_contract_text: "Статус договора",
            status_text: "Статус",
            supply_date: "Дата поставки",
            target_text: "Краткий текст материала/услуги",
            use_mtr_date: "Дата использования МТР в производстве",
            years: "ГОД",
        }
        this.activePresetID = 0;
        this.counter = settings ? settings.counter : null;
        this.filters = {
            years: new Date().getFullYear(),
        };
        this.sorters = {};
        this.positions = {};
        this.rows = [];
        this.presetsBase = settings ? settings.presetsBase : null;
        this.headerBase = settings ? settings.headerBase : null;
        this.structureBase = settings ? settings.structureBase : null;
    }

    Init() {
        if (!this.headerBase || !this.structureBase || !this.presetsBase) {
            return;
        }
        let THIS = this;
        THIS.presetsBase.innerHTML = '';
        THIS.presets.forEach(preset => {
            let pr_elem = document.createElement('div');
            pr_elem.classList.add('presetBlock');
            THIS.presetsBase.appendChild(pr_elem);
            let name = document.createElement('input');
            name.classList.add('name');
            name.value = preset.name;
            pr_elem.appendChild(name);
            let del = document.createElement('div');
            del.classList.add('interactible');
            del.classList.add('delete');
            del.innerHTML = 'X';
            del.addEventListener('click', function () {
                let deleteWindow = GenerateSubwindow();
                deleteWindow.subwindow.classList.add('deleteSubwindow');
                deleteWindow.Open();
                let info = document.createElement('div');
                info.classList.add('info');
                info.innerHTML = 'Вы уверены, что хотите удалить шаблон?';
                deleteWindow.subwindow.appendChild(info);
                let cancel = document.createElement('div');
                cancel.classList.add('cancel');
                cancel.classList.add('interactible');
                cancel.innerHTML = 'X';
                deleteWindow.subwindow.appendChild(cancel);
                let submit = document.createElement('div');
                submit.classList.add('submit');
                submit.classList.add('interactible');
                submit.innerHTML = '>';
                deleteWindow.subwindow.appendChild(submit);
            })
            pr_elem.appendChild(del);
            let select = document.createElement('div');
            select.classList.add('interactible');
            select.classList.add('select');
            select.innerHTML = '>';
            select.addEventListener('click', function () {
                document.querySelectorAll('.presetBlock').forEach(element => {
                    element.classList.remove('active');
                });
                pr_elem.classList.add('active');
                THIS.InitPreset(preset);
            });
            pr_elem.appendChild(select);
            if (preset.default) {
                pr_elem.classList.add('active');
                THIS.InitPreset(preset);
            }
        });

        document.querySelector('.submitExport').addEventListener('click', function () {
            window.top.document.dispatchEvent(new CustomEvent('HC_DOWNLOAD', { detail: { src: './dataExport/report.csv?filters=' + JSON.stringify(THIS.filters) + '&sorters=' + JSON.stringify(THIS.sorters) + '&positions=' + JSON.stringify(THIS.positions) } }));
        })
    }

    InitPreset(preset) {
        if (!this.headerBase || !this.structureBase || !this.presetsBase) {
            return;
        }
        this.activePresetID = preset.ID;
        this.filters = preset.filters;
        this.sorters = preset.sorters;
        this.positions = preset.positions;
        let THIS = this;
        this.headerBase.innerHTML = '';
        this.structureBase.innerHTML = '';
        this.movedRightFieldBuffer = null;
        this.movedLeftFieldBuffer = null;

        SendPost({
            unit: 'dataExport',
            command: 'getTable',
            postData: THIS.filters,
            sortData: {},
            downLimit: 0,
        }, 'gate.sf', function (data) {
            THIS.FillTrueDatadypes(data);
            THIS.counter.innerHTML = "Ожидается записей: " + data.rowCount;
            THIS.fields = data.fields;
            THIS.rows = data.rows;
            THIS.fields.forEach((elem) => {
                let he = document.createElement('div');
                he.classList.add('headerName');
                he.classList.add('interactible');
                he.classList.add('field_' + elem.name);
                if (THIS.positions[elem.name]) {
                    he.classList.add('active');
                }
                he.innerHTML = THIS.fieldNames[elem.name];// + '<br>' + elem.trueDataType;


                let filterImg = document.createElement('img');
                filterImg.classList.add('filt');
                filterImg.src = './images/Filter.png';
                if (!THIS.filters[elem.name]) {
                    filterImg.classList.add('hidden');
                }
                he.appendChild(filterImg);
                let sortImg = document.createElement('img');
                sortImg.classList.add('sort');
                sortImg.src = './images/Sorter.png';
                if (!THIS.sorters[elem.name]) {
                    sortImg.classList.add('hidden');
                }
                else if (THIS.sorters[elem.name] == 'desc') {
                    sortImg.classList.add('inversed');
                }
                he.appendChild(sortImg);

                /*
                if (Math.random() > 0.8) {
                    he.classList.add('active');
                    THIS.PushValue(THIS.positions, elem.name);
                }
                */
                he.addEventListener('click', function () {
                    if (THIS.positions[elem.name] != null) {
                        THIS.EjectValue(THIS.positions, elem.name);
                        he.classList.remove('active');
                    }
                    else {
                        THIS.PushValue(THIS.positions, elem.name);
                        he.classList.add('active');
                    }
                    THIS.DrawStructure();
                })
                THIS.headerBase.appendChild(he);
            });
            THIS.DrawStructure();

        });
    }

    UpdateFilterResult() {
        let THIS = this;
        SendPost({
            unit: 'dataExport',
            command: 'getTable',
            postData: THIS.filters,
            sortData: THIS.sorters,
            downLimit: 0,
        }, 'gate.sf', function (data) {
            THIS.FillTrueDatadypes(data);
            THIS.counter.innerHTML = "Ожидается записей: " + data.rowCount;
            THIS.rows = data.rows;
            THIS.fields = data.fields;
            THIS.DrawStructure();
        });
    }

    DrawStructure() {
        this.structureBase.innerHTML = '';
        let THIS = this;
        for (let i = 1; i < this.GetMax(this.positions) + 1; i++) {
            for (let fn in this.positions) {
                if (!this.GetField(fn)) {
                    this.EjectValue(this.positions, fn);
                    continue;
                }
                if (this.positions[fn] == i) {
                    let struct_plate = document.createElement('div');
                    struct_plate.classList.add('structureBlockHeader');
                    if (THIS.movedLeftFieldBuffer == fn){
                        struct_plate.classList.add('moveLeft');
                    }
                    else if (THIS.movedRightFieldBuffer == fn){
                        struct_plate.classList.add('moveRight');
                    }
                    let name = document.createElement('div');
                    name.classList.add('structureName');
                    struct_plate.appendChild(name);
                    name.innerHTML = THIS.fieldNames[fn];// + '<br>' + this.GetField(fn).trueDataType;
                    let main = document.createElement('div');
                    main.classList.add('structureBlockMain');
                    struct_plate.appendChild(main);
                    let dataDiv = document.createElement('div');
                    dataDiv.classList.add('structureData');
                    struct_plate.appendChild(dataDiv);
                    this.structureBase.appendChild(struct_plate);

                    let switchLeft = document.createElement('div');
                    switchLeft.classList.add('switchLeft');
                    switchLeft.classList.add('interactible');
                    switchLeft.innerHTML = '<';
                    switchLeft.addEventListener('click', function () {
                        THIS.MoveLeft(THIS.positions, fn);
                        THIS.DrawStructure();
                    });
                    let switchRight = document.createElement('div');
                    switchRight.classList.add('switchRight');
                    switchRight.classList.add('interactible');
                    switchRight.innerHTML = '>';
                    switchRight.addEventListener('click',function () {
                        THIS.MoveRight(THIS.positions, fn);
                        THIS.DrawStructure();
                    });
                    name.appendChild(switchLeft);
                    name.appendChild(switchRight);

                    let filterbase = document.createElement('div');
                    filterbase.classList.add('filter');
                    main.appendChild(filterbase);
                    let filterForm = document.createElement('form');
                    filterForm.classList.add('filterForm');
                    filterbase.appendChild(filterForm);

                    let filter_input = document.createElement('input');
                    filter_input.placeholder = 'ФИЛЬТР';
                    if (this.filters[fn]) {
                        filter_input.value = this.filters[fn];
                    }
                    filterForm.appendChild(filter_input);
                    let cancel = document.createElement('div');
                    cancel.classList.add('interactible');
                    cancel.classList.add('cancel');
                    cancel.innerHTML = 'X';
                    cancel.title = 'Сбросить фильтр';
                    cancel.addEventListener('click', function () {
                        delete THIS.filters[fn];
                        document.querySelector('.field_' + fn + ' .filt').classList.add('hidden');
                        THIS.UpdateFilterResult();
                    })
                    filterForm.appendChild(cancel);
                    let submit = document.createElement('div');
                    submit.classList.add('interactible');
                    submit.classList.add('submit');
                    submit.innerHTML = '>';
                    submit.title = 'Применить фильтр';
                    submit.addEventListener('click', function () {
                        THIS.filters[fn] = filter_input.value;
                        document.querySelector('.field_' + fn + ' .filt').classList.remove('hidden');
                        THIS.UpdateFilterResult();
                    })
                    filterForm.appendChild(submit);

                    filterForm.addEventListener('submit', function (e) {
                        e.preventDefault();
                        THIS.filters[fn] = filter_input.value;
                        document.querySelector('.field_' + fn + ' .filt').classList.remove('hidden');
                        THIS.UpdateFilterResult();
                    })

                    let sorterbase = document.createElement('div');
                    sorterbase.classList.add('sorter');
                    sorterbase.innerHTML = 'Сортировать по:<br>';
                    main.appendChild(sorterbase);
                    let sASC = document.createElement('div');
                    sASC.classList.add('sortASC');
                    sASC.classList.add('interactible');
                    if (THIS.sorters[fn] == 'asc') {
                        sASC.classList.add('active_transparent');
                    }
                    let sDESC = document.createElement('div');
                    sDESC.classList.add('sortDESC');
                    sDESC.classList.add('interactible');
                    if (THIS.sorters[fn] == 'desc') {
                        sDESC.classList.add('active_transparent');
                    }
                    sorterbase.appendChild(sASC);
                    sorterbase.appendChild(sDESC);
                    let ASC = document.createElement('img');
                    ASC.src = './images/asc.png';
                    sASC.appendChild(ASC);
                    let DESC = document.createElement('img');
                    DESC.src = './images/desc.png';
                    sDESC.appendChild(DESC);

                    sASC.addEventListener('click', function () {
                        let fieldBlock = document.querySelector('.field_' + fn + ' .sort');
                        if (THIS.sorters[fn] == 'asc') {
                            sASC.classList.remove('active_transparent');
                            fieldBlock.classList.add('hidden');
                            delete THIS.sorters[fn];
                        }
                        else {
                            sDESC.classList.remove('active_transparent');
                            sASC.classList.add('active_transparent');
                            fieldBlock.classList.remove('hidden');
                            fieldBlock.classList.remove('inversed');
                            THIS.sorters[fn] = 'asc';
                        }
                        THIS.UpdateFilterResult();
                    });
                    sDESC.addEventListener('click', function () {
                        let fieldBlock = document.querySelector('.field_' + fn + ' .sort');
                        if (THIS.sorters[fn] == 'desc') {
                            sDESC.classList.remove('active_transparent');
                            fieldBlock.classList.add('hidden');
                            delete THIS.sorters[fn];
                        }
                        else {
                            sASC.classList.remove('active_transparent');
                            sDESC.classList.add('active_transparent');
                            fieldBlock.classList.remove('hidden');
                            fieldBlock.classList.add('inversed');
                            THIS.sorters[fn] = 'desc';
                        }
                        THIS.UpdateFilterResult();
                    });
                    let counter = true;
                    this.rows.forEach((row) => {
                        let curVal = document.createElement('div');
                        curVal.innerHTML = row[fn];
                        curVal.classList.add('cell');
                        if (counter) {
                            curVal.classList.add('mod1');
                        }
                        else {
                            curVal.classList.add('mod2');
                        }
                        counter = !counter;
                        dataDiv.appendChild(curVal);
                    })
                }
                
            }
        }
        THIS.movedLeftFieldBuffer = null;
        THIS.movedRightFieldBuffer = null;
    }

    GetField(name) {
        for (let i = 0; i < this.fields.length; i++) {
            if (this.fields[i].name == name) {
                return this.fields[i];
            }
        }
    }

    PushValue(obj, v) {
        let maxValue = this.GetMax(obj);
        obj[v] = maxValue + 1;
        console.log(this.positions)
    }

    GetMax(obj) {
        let max = 0;
        for (let v in obj) {
            if (obj[v] > max) {
                max = obj[v];
            }
        }
        return max;
    }

    EjectValue(obj, v) {
        let val = obj[v];
        delete obj[v];
        for (let v in obj) {
            if (obj[v] > val) {
                obj[v]--;
            }
        }
        console.log(this.positions)
    }

    MoveRight(obj, v) {
        for (let nv in obj) {
            if (obj[nv] == obj[v] + 1) {
                obj[nv]--;
                obj[v]++;
                this.movedRightFieldBuffer = v;
                this.movedLeftFieldBuffer = nv;
                break;
            }
        }
        console.log(this.positions)
    }
    MoveLeft(obj, v) {
        for (let nv in obj) {
            if (obj[nv] == obj[v] - 1) {
                obj[nv]++;
                obj[v]--;
                this.movedRightFieldBuffer = nv;
                this.movedLeftFieldBuffer = v;
                break;
            }
        }
        console.log(this.positions)
    }

    FillTrueDatadypes(data) {
        data.fields.forEach((field) => {
            for (let elem in data._types._types.builtins) {
                if (field.dataTypeID == data._types._types.builtins[elem]) {
                    field.trueDataType = elem;
                }
            }
        });
    }
}

Awake();
function Awake() {
    let counter = document.querySelector('.counter');
    let presetsBase = document.querySelector('.presetsListMain');
    let headerBase = document.querySelector('.headerNameMain');
    let structureBase = document.querySelector('.structureExportMain');
    let former = new CSV_FORMER({
        headerBase: headerBase,
        structureBase: structureBase,
        presetsBase: presetsBase,
        counter: counter
    });
    former.Init();
}


// --XHR POSTER-- //
function SendPost(saveData, customRef, callback) {
    window.top.document.dispatchEvent(loaderLaunchEvent);
    console.log(saveData);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', customRef, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            jsonData = JSON.parse(xhr.responseText);
            console.log(jsonData);
            switch (JSON.parse(xhr.responseText).status) {
                case "forbidden session":
                    window.top.document.dispatchEvent(loaderFinishEvent);
                    window.top.document.dispatchEvent(forbiddenSessionEvent);
                    console.log('forbidden session');
                    break;
                default:
                    window.top.document.dispatchEvent(loaderFinishEvent);
                    callback(jsonData);
                    break;
            }
        }
        else if (xhr.status != 200) {
            console.error('ERR:' + xhr.status);
        }
    };
    xhr.send(JSON.stringify(saveData));


}
function GenerateSubwindow() {
    let document = window.top.document;
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
    let openSubwindow = function () {
        sbwroot.classList.remove('closed');
    }
    let closeSubwindow = function () {
        sbwdot.remove();
        if (document.querySelectorAll('.subwindowRoot .subwindow').length == 0) {
            sbwroot.classList.add('closed');
        }
    }
    closeCross.addEventListener('click', closeSubwindow);
    return {
        Open: openSubwindow,
        Close: closeSubwindow,
        subwindow: sbw,
    };
}