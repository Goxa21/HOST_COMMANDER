let MyProfile = JSON.parse(window.top.document.querySelector('#global').innerHTML);
let loaderLaunchEvent = new Event('HC_LOADER.LAUNCH');
let loaderFinishEvent = new Event('HC_LOADER.FINISH');
let forbiddenSessionEvent = new Event('HC_FORBIDDENSESSION');

class GIGATABLE {
    constructor(root) {
        this.configuration = [];
        this.years = '2024';
        this.THIS = this;
        this.rows = [];
        this.loadMoreRow = null;
        this.root = root;
        this.tablebase;
        this.table;
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
        
    }

    ResolveFieldName(fn){
        return this.fieldNames[fn];
    }

    Init() {
        let THIS = this.THIS;
        SendPost({
            unit: 'gigatable',
            command: 'getTable',
            postData: {
                years: 'false',
            },
            downLimit:0,
        }, 'gate.sf', function (data) {
            let base = document.createElement('div');
            base.classList.add('tablebase');
            THIS.tablebase = base;
            THIS.root.appendChild(base);
            let table = document.createElement('table');
            table.classList.add('gigatable');
            base.appendChild(table);
            THIS.table = table;
            let htr = document.createElement('tr');
            htr.classList.add('header');
            table.appendChild(htr);
            FillTrueDatadypes(data);
            THIS.configuration = data.fields;
            THIS.configuration.forEach((field) => {
                let th = document.createElement('th');
                htr.appendChild(th);
                th.innerHTML = THIS.ResolveFieldName(field.name);// + '<br>' + field.trueDataType;
                let sortImg = document.createElement('img');
                sortImg.classList.add('sort');
                sortImg.classList.add('hidden');
                sortImg.src = './images/Sorter.png';
                th.appendChild(sortImg);
                let filtImg = document.createElement('img');
                filtImg.classList.add('filt');
                filtImg.classList.add('hidden');
                filtImg.src = './images/Filter.png';
                th.appendChild(filtImg);
                let filterbase = document.createElement('form');
                filterbase.classList.add('filterbase');
                filterbase.classList.add('hidden');
                th.appendChild(filterbase);



                let filterstring = document.createElement('form');
                filterstring.classList.add('filterstring');
                filterstring.classList.add('hidden');
                filterbase.appendChild(filterstring);
                let finput = document.createElement('input');
                filterstring.appendChild(finput);
                finput.placeholder = 'ФИЛЬТР';
                let finput_submit = document.createElement('div');
                finput_submit.innerHTML = '>';
                finput_submit.classList.add('submit');
                finput_submit.classList.add('interactible');
                finput_submit.title = 'Задать фильтр';
                filterstring.appendChild(finput_submit);
                finput_submit.addEventListener('click', function () {
                    if (finput.value != '') {
                        field.filterValue = finput.value.toLowerCase();
                        filtImg.classList.remove('hidden');
                    }
                    else {
                        field.filterValue = null;
                        filtImg.classList.add('hidden');
                    }
                    THIS.DrawTable();
                });
                let finput_cancel = document.createElement('div');
                finput_cancel.innerHTML = 'X';
                finput_cancel.classList.add('cancel');
                finput_cancel.classList.add('interactible');
                finput_cancel.title = 'Снять фильтр';
                filterstring.appendChild(finput_cancel);
                finput_cancel.addEventListener('click', function () {
                    finput.value = '';
                    field.filterValue = null;
                    filtImg.classList.add('hidden');
                    THIS.DrawTable();
                });
                th.addEventListener('mouseleave', function (e) {
                    filterbase.classList.add('hidden');
                });
                th.addEventListener('mouseenter', function (e) {
                    filterbase.classList.remove('hidden');
                });

                /*
                th.addEventListener('click',function(){
                    document.querySelectorAll('.filterbase').forEach((element)=>{
                        element.classList.add('hidden');
                    })
                    filterbase.classList.remove('hidden');
                });
                */
                filterstring.addEventListener('submit', function (e) {
                    e.preventDefault();
                    if (finput.value != '') {
                        field.filterValue = finput.value.toLowerCase();
                        filtImg.classList.remove('hidden');
                    }
                    else {
                        field.filterValue = null;
                        filtImg.classList.add('hidden');
                    }
                    THIS.DrawTable();
                });

                let sorterstring = document.createElement('form');
                sorterstring.classList.add('sorterstring');
                sorterstring.classList.add('hidden');
                filterbase.appendChild(sorterstring);
                let sort_text = document.createElement('div');
                sort_text.innerHTML = 'Сортировать:';
                sort_text.classList.add('sorttext');
                sorterstring.appendChild(sort_text);
                let asc_base = document.createElement('div');
                asc_base.classList.add('interactible');
                asc_base.classList.add('asc');
                sorterstring.appendChild(asc_base);
                let desc_base = document.createElement('div');
                desc_base.classList.add('interactible');
                desc_base.classList.add('desc');
                sorterstring.appendChild(desc_base);
                let asc_img = document.createElement('img');
                asc_img.src = './images/asc.png';
                asc_img.title = 'По возрастанию';
                asc_base.appendChild(asc_img);
                let desc_img = document.createElement('img');
                desc_img.src = './images/desc.png';
                desc_img.title = 'По убыванию';
                desc_base.appendChild(desc_img);
                asc_base.addEventListener('click',function(){
                    if (field.sortingMode == 'asc'){
                        asc_base.classList.remove('active');
                        sortImg.classList.add('hidden');
                        field.sortingMode = null;
                    }
                    else {
                        asc_base.classList.add('active');
                        desc_base.classList.remove('active');
                        sortImg.classList.remove('inversed');
                        sortImg.classList.remove('hidden');
                        field.sortingMode = 'asc';
                    }
                    THIS.DrawTable();
                });
                desc_base.addEventListener('click',function(){
                    if (field.sortingMode == 'desc'){
                        desc_base.classList.remove('active');
                        sortImg.classList.add('hidden');
                        field.sortingMode = null;
                    }
                    else {
                        desc_base.classList.add('active');
                        asc_base.classList.remove('active');
                        sortImg.classList.remove('hidden');
                        sortImg.classList.add('inversed');
                        field.sortingMode = 'desc';
                    }
                    THIS.DrawTable();
                });
                
            });
            THIS.DrawTable();
        });

        function FillTrueDatadypes(data) {
            data.fields.forEach((field) => {
                for (let elem in data._types._types.builtins) {
                    if (field.dataTypeID == data._types._types.builtins[elem]) {
                        field.trueDataType = elem;
                    }
                }
            })
        }
    }

    DrawTable(options = {}) {
        let postData = {
            years: this.years,
        };
        let sortData = {};
        this.configuration.forEach((field) => {
            if (field.filterValue) {
                postData[field.name] = field.filterValue;
            }
        });
        this.configuration.forEach((field) => {
            if (field.sortingMode) {
                sortData[field.name] = field.sortingMode;
            }
        });

        let THIS = this;
        let downLimit = 0;
        if (options.loadMore){
            downLimit = this.rows.length
        }
        SendPost({
            unit: 'gigatable',
            command: 'getTable',
            postData: postData, 
            sortData: sortData,
            downLimit:downLimit,
        }, 'gate.sf', function (data) {
            if (!options.loadMore) {
                THIS.rows.forEach((node) => {
                    node.remove();
                });
                THIS.rows = [];
            }
            let mod = true;
            data.rows.forEach((row) => {
                mod = !mod;
                let tr = document.createElement('tr');
                THIS.rows.push(tr);
                if (mod) {
                    tr.classList.add('mod1');
                }
                else {
                    tr.classList.add('mod2');
                }
                THIS.table.appendChild(tr);
                THIS.configuration.forEach((field) => {
                    let td = document.createElement('td');
                    tr.appendChild(td);
                    td.innerHTML = row[field.name];
                });
            });
            document.querySelector('.displayInfo').innerHTML = 'Записей: ' + THIS.rows.length + ' / ' + data.rowCount;
            if (THIS.loadMoreRow && options.loadMore){
                THIS.loadMoreRow.remove();
                THIS.loadMoreRow = null;
            }
            if (!THIS.loadMoreRow){
                let loadMoreButton = document.createElement('div');
                loadMoreButton.classList.add('loadMore');
                loadMoreButton.classList.add('interactible');
                loadMoreButton.innerHTML = 'Загрузить ещё';
                THIS.loadMoreRow = loadMoreButton;
                THIS.tablebase.appendChild(loadMoreButton);
                let loadMoreStopper = false;
                loadMoreButton.addEventListener('click',function(){
                    if (!loadMoreStopper){
                        loadMoreStopper = true;
                        loadMoreButton.innerHTML = '...';
                        THIS.DrawTable({loadMore:true});
                    }
                })
            }
        });
    }
}

Awake();
function Awake() {
    DrawPageBase();
}

function DrawPageBase() {
    let topline = document.createElement('div');
    document.body.appendChild(topline);
    topline.classList.add('topline');
    let scrollbase = document.createElement('div');
    document.body.appendChild(scrollbase);
    scrollbase.classList.add('scrollbase');

    let option_base = document.createElement('div');
    option_base.classList.add('option');
    topline.appendChild(option_base);
    let option_name = document.createElement('div');
    option_name.classList.add('name');
    option_name.innerHTML = 'ГОД';
    option_base.appendChild(option_name);
    let option_selector = document.createElement('select');
    option_selector.classList.add('selector');
    option_base.appendChild(option_selector);

    let displayInfo = document.createElement('div');
    displayInfo.classList.add('displayInfo');
    topline.appendChild(displayInfo);
    
    let gigatable = new GIGATABLE(scrollbase);
    
    option_selector.addEventListener('input',function(){
        console.log('SELECT');
        gigatable.years = this.value;
        gigatable.DrawTable();
    })

    SendPost({
        unit: 'gigatable',
        command: 'getAvailableYear',
        postData: {}
    }, 'gate.sf', function (data) {
        if (data.rows != null) {
            data.rows.forEach(element => {
                let opt = document.createElement('option');
                opt.value = element.years;
                opt.innerHTML = element.years;
                option_selector.appendChild(opt);
            });
            if (data.rows[0] != null){
                gigatable.years = data.rows[0].years;
                gigatable.Init();
                //gigatable.DrawTable();
            }
        }
    });
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