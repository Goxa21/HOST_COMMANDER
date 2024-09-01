let Ambassador = require('../../../HOSTCOMMANDER/AMBASSADOR');
let CsvWeaver = require('../../../HOSTCOMMANDER/CSV_WEAVER');
const {
    Worker, isMainThread, parentPort, workerData
} = require('worker_threads');

class HC_Module {
    constructor() { }

    Execute(request) {
        return new Promise((resolve, reject) => {
            switch (request.data.command) {
                case 'example':
                    Ambassador.launchQuery({ text: "CALL example.example($1); ", values: [{ username: request.session.userName, data:request.data.postData}] }).then((callback) => {
                        if (callback.status == 'success') {
                            resolve(callback.responce);
                        }
                        else {
                            reject(callback.error);
                        }
                    });
                    break;
                default:
                    console.log('MODULE REQUEST: STATUS');
                    resolve(request.singletonResult);
                    break;
            }
        })
    };
}
module.exports = new HC_Module();