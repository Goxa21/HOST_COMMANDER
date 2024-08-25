let Ambassador = require('../../../HOSTCOMMANDER/AMBASSADOR');
const fs = require('fs');
const { stringify } = require("csv-stringify");
const MemoryStream = require('memorystream');
const request = require('request');


class HC_Module {
    constructor() {
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

    Execute(request) {
        let THIS = this;
        return new Promise((resolve, reject) => {
            console.log(request);
            if (request.method == 'GET') {
                if (request.path.ext == '.csv') {
                    let selectString = "SELECT * FROM baltets.gettable WHERE ";
                    let filters = JSON.parse(request.url.query.filters);
                    let sorters = JSON.parse(request.url.query.sorters);
                    let positions = JSON.parse(request.url.query.positions);
                    let paramString = '';
                    let pcounter = 0;
                    for (let fv in filters) {
                        if (pcounter > 0) {
                            paramString += 'AND ';
                        }
                        paramString += 'LOWER (' + fv + '::text) LIKE \'%' + filters[fv] + '%\' ';
                        /*if (fv == 'years'){
                            paramString += 'LOWER (' + fv + ') = \'' + request.data.postData[fv] + '\' ';
                        }
                        else {
                        }*/
                        pcounter++;
                    };
                    let scounter = 0;
                    for (let fv in sorters) {
                        if (scounter == 0) {
                            paramString += 'ORDER BY ';
                        }
                        else if (scounter > 0) {
                            paramString += ', ';
                        }
                        let mode = 'ASC';
                        if (sorters[fv] == 'desc') {
                            mode = 'DESC';
                        }
                        paramString += fv + ' ' + mode + ' ';
                        scounter++;
                    };
                    selectString += paramString;
                    Ambassador.launchQuery({ text: selectString, values: [] }).then((callback) => {
                        let columns = []
                        for(let fn in positions){
                            columns[positions[fn]] = fn;
                        }
                        columns.splice(0,1);
                        if (callback.status == 'success') {
                            WriteToCSV(callback.responce,columns).then((memoStream) => {
                                let curMemoStream = memoStream;
                                let CSVdata = null;
                                curMemoStream.on('data', function (chunk) {
                                    if (CSVdata == null) {
                                        CSVdata = chunk;
                                    }
                                    else {
                                        CSVdata = Buffer.concat([CSVdata, chunk]);
                                    }
                                })
                                curMemoStream.on('end', function () {
                                    resolve(CSVdata);
                                });
                                //resolve(resolve);
                            }).catch((err) => {
                                reject(err);
                            });
                        }
                        else {
                            reject(callback.error);
                        }
                    });

                    async function WriteToCSV(callback,columns) {
                        let textColumns = [];
                        for (let i = 0; i < columns.length; i++){
                            textColumns[i] = THIS.ResolveFieldName(columns[i]);
                        }
                        let dataMassive = callback.rows;
                        return new Promise(function (resolve, reject) {
                            const zStringifier = stringify({ header: true, delimiter: ";", columns: textColumns });
                            for (let i = 0; i < dataMassive.length; i++) {
                                let csvRow = [];
                                for (let ic = 0; ic < columns.length; ic++){
                                    csvRow.push(dataMassive[i][columns[ic]]);
                                }
                                zStringifier.write(csvRow);
                            }
                            let memoStream = new MemoryStream();
                            zStringifier.pipe(memoStream);
                            zStringifier.pipe(fs.createWriteStream('./test.csv'));
                            let data = [];
                            zStringifier.end();
                            resolve(memoStream);
                        });

                    }
                }
            }
            switch (request.data.command) {
                case 'getTable':
                    let selectString = "SELECT * FROM baltets.gettable WHERE ";
                    let selectStatsString = "SELECT COUNT(*) FROM baltets.gettable WHERE ";
                    let paramString = '';
                    let pcounter = 0;
                    for (let fv in request.data.postData) {
                        if (pcounter > 0) {
                            paramString += 'AND ';
                        }
                        paramString += 'LOWER (' + fv + '::text) LIKE \'%' + request.data.postData[fv] + '%\' ';
                        /*if (fv == 'years'){
                            paramString += 'LOWER (' + fv + ') = \'' + request.data.postData[fv] + '\' ';
                        }
                        else {
                        }*/
                        pcounter++;
                    };
                    let scounter = 0;
                    selectStatsString += paramString;
                    for (let fv in request.data.sortData) {
                        if (scounter == 0) {
                            paramString += 'ORDER BY ';
                        }
                        else if (scounter > 0) {
                            paramString += ', ';
                        }
                        let mode = 'ASC';
                        if (request.data.sortData[fv] == 'desc') {
                            mode = 'DESC';
                        }
                        paramString += fv + ' ' + mode + ' ';
                        scounter++;
                    };
                    selectString += paramString + 'LIMIT 15 OFFSET ' + request.data.downLimit;
                    Ambassador.launchQuery({ text: selectString, values: [] }).then((callback) => {
                        if (callback.status == 'success') {
                            Ambassador.launchQuery({ text: selectStatsString, values: [] }).then((statsCallback) => {
                                if (statsCallback.status == 'success') {
                                    callback.responce.rowCount = statsCallback.responce.rows[0].count;
                                    resolve(callback.responce);
                                }
                                else {
                                    reject(statsCallback.error);
                                }
                            });
                            //resolve(callback.responce);
                        }
                        else {
                            reject(callback.error);
                        }
                    });
                    break;
                case 'getAvailableYear':
                    Ambassador.launchQuery({ text: "SELECT DISTINCT years FROM baltets.gpz_sap ORDER BY years ASC", values: [] }).then((callback) => {
                        if (callback.status == 'success') {
                            resolve(callback.responce);
                        }
                        else {
                            reject(callback.error);
                        }
                    });
                    break;
            }
        })
    };
}

module.exports = new HC_Module();