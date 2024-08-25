let Ambassador = require('../../../HOSTCOMMANDER/AMBASSADOR');

class HC_Module {
    constructor() { }

    Execute(request) {
        return new Promise((resolve, reject) => {
            switch (request.data.command) {
                case 'getTable':
                    let selectString = "SELECT * FROM baltets.gettable WHERE ";
                    let selectStatsString = "SELECT COUNT(*) FROM baltets.gettable WHERE ";
                    let paramString = '';
                    let pcounter = 0;
                    for (let fv in request.data.postData){
                        if (pcounter > 0){
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
                    for (let fv in request.data.sortData){
                        if (scounter == 0){
                            paramString += 'ORDER BY ';
                        }
                        else if (scounter > 0){
                            paramString += ', ';
                        }
                        let mode = 'ASC';
                        if (request.data.sortData[fv] == 'desc'){
                            mode = 'DESC';
                        }
                        paramString += fv + ' ' + mode + ' ';
                        scounter++;
                    };
                    selectString += paramString + 'LIMIT 50 OFFSET ' + request.data.downLimit;
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