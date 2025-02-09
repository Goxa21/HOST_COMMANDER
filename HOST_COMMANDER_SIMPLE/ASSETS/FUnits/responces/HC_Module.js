class HC_Module {
    constructor() { }

    Execute(request) {
        return new Promise((resolve, reject) => {
            switch (request.data.command) {
                case 'example':
                    resolve(callback.responce);
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