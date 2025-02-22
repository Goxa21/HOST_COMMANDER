const FS = require('fs');
class HC_Module {
    constructor() { }

    Execute(request) {
        return new Promise((resolve, reject) => {
            switch (request.data.command) {
                case 'write_answer':
                    console.log(JSON.stringify(request.data.postData));
                    let foldar_path = './ASSETS/FUnits/responces/answer_library/';
                    console.log(FS.readdirSync(foldar_path).length);
                    FS.writeFileSync(foldar_path + request.data.postData.human_name + '_' + FS.readdirSync(foldar_path).length + '.json',JSON.stringify(request.data.postData));
                    resolve({});
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