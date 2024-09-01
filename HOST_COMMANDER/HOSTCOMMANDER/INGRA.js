const { reject } = require('bluebird');
const { Pool } = require('pg');
const Samba = require('samba-client');
const Ambassador = require('./AMBASSADOR');
const Xlsx = require('xlsx');
const PATH = require('path');
const fs = require('fs');

class INGRA {
    constructor() {
    }

    Launch(config, mode = 'productive') {
        let THIS = this;
        return new Promise((resolve, reject) => {
            console.log(config);
            switch (config.connectionType) {
                case 'PG':
                    let pgPool = new Pool({
                        user: config.user,
                        database: config.database,
                        password: config.password,
                        port: config.port,
                        host: config.host,
                    });
                    break;
                case 'SMB_XLS':
                    let smbClient = new Samba({
                        address: config.host,
                        username: config.user,
                        password: config.password,
                    });
                    try {
                        smbClient.list(config.path).then(function (v) {
                            console.log(v);
                            let result = null;
                            for (let i = 0; i < v.length; i++) {
                                if (result = RegExp(config.filename_mask, 'g').exec(v[i].name)) {
                                    console.log(result[0]);
                                    break;
                                }
                            }
                            console.log(result);
                            if (result) {
                                console.log('FILE FOUND');
                                let remoFilePath = config.path + result[0];
                                if (PATH.extname(remoFilePath) != '.xlsx') {
                                    reject({ error: 'INCORRECT DATA TYPE' });
                                    return;
                                }
                                let convertedPath = remoFilePath.replace(/\\/g, '/');
                                console.log(remoFilePath);
                                let thisFilePath = './SAMBA_BUFFER/' + PATH.basename(convertedPath);
                                smbClient.getFile(remoFilePath, thisFilePath).then(function (v) {
                                    console.log(v);
                                    fs.readFile(thisFilePath, function (err, data) {
                                        if (err) {
                                            reject({ error: 'READING LOCAL BUFFER ERROR' });
                                        }
                                        let workbook = Xlsx.read(new Uint8Array(data));;
                                        let worksheet = workbook.Sheets[config.xlsx_worksheet];
                                        let jsonHeaders = Xlsx.utils.sheet_to_json(worksheet, { header: 1 });
                                        let curHeaders = jsonHeaders[config.xlsx_headerRow];
                                        console.log(curHeaders);
                                        let headedHeaders = [];
                                        for (let i = 0; i < curHeaders.length; i++) {
                                            if (headedHeaders.includes(curHeaders[i])) {
                                                headedHeaders.push(curHeaders[i] + '_' + headedHeaders.filter(item => item.indexOf(curHeaders[i]) !== -1).length);
                                            }
                                            else {
                                                headedHeaders.push(curHeaders[i]);
                                            }
                                        }
                                        console.log(headedHeaders);
                                        let jsonXlsx = Xlsx.utils.sheet_to_json(worksheet, { header: headedHeaders });
                                        console.log(jsonXlsx);

                                        let bufferedResult = {};
                                        bufferedResult.rows = jsonXlsx;
                                        bufferedResult.rowCount = jsonXlsx.length;
                                        bufferedResult.fields = [];
                                        for (let i = 0; i < headedHeaders.length; i++) {
                                            let thisField = {
                                                name: headedHeaders[i],
                                                columnID: i + 1,
                                                format:'text',
                                                true_data_type:'TEXT',
                                            }
                                            bufferedResult.fields.push(thisField);
                                        }
                                        resolve(bufferedResult);
                                    })

                                });
                            }
                            else {
                                reject({ error: 'no such file' });
                            }
                        });
                    }
                    catch (e) {
                        reject({ error: e });
                    }
                    break;
            }
        });

    }
}

module.exports = new INGRA();