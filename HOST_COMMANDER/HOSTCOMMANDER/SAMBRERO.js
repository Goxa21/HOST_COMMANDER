const Samba = require('samba-client');

class SAMBRERO{
    constructor(){
        this.sambaClient = new Samba({
            address: '\\\\example.ru\\docum',// + ':' + config.PortDB + '/' + config.DB,
            username: 'example@example.ru',
            password: 'example',
        });
    }
    async list(path) {
        try {
            const responce = await this.sambaClient.list(path);
            //console.log(responce.rows[0]);
            return { status: "success", responce: responce };
        } catch (error) {
            //console.log(error);
            return { status: "error", error: error };
        }
    }
    async getFile(path,destination){
        try {
            const responce = await this.sambaClient.getFile(path,destination);
            //console.log(responce.rows[0]);
            return { status: "success", responce: responce };
        } catch (error) {
            //console.log(error);
            return { status: "error", error: error };
        }
    }
    async searchFile(regexp,destination){
        try {
            const responce = await this.sambaClient.list(destination);
            let result = [];
            for (let rid in responce){
                if (regexp.exec(responce[rid].name)){
                    result.push(responce[rid]);
                }
            }
            //console.log(responce);
            //console.log(result);
            return { status: "success", responce: result };
        } catch (error) {
            return { status: "error", error: error };
        }
    }
}

module.exports = new SAMBRERO();
