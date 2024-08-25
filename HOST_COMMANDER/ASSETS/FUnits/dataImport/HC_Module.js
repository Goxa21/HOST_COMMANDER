let Ambassador = require('../../../HOSTCOMMANDER/AMBASSADOR');

class LoadManager{
    constructor(){
        this.filesPending = [];
    }

    SendFile(file){
        return new Promise((resolve,reject)=>{
            file.ID = Math.round(Math.random()*999999999); 
            this.filesPending.push(file);
            console.log(this.filesPending);
            resolve(file.ID);
        })
        
    }

    TrackFile(fileID){
        return new Promise((resolve,reject)=>{
            let curFile = null;
            for (let i = 0; i < this.filesPending.length; i++){
                if (this.filesPending[i].ID == fileID){
                    curFile = this.filesPending[i];
                }
            }
            if (curFile){
                setTimeout(resolve,1000);
            }
            else {
                reject();
            }
        })
    }
}
let loadManager = new LoadManager();

class HC_Module {
    constructor() { }

    Execute(request) {
        return new Promise((resolve, reject) => {
            //console.log(request.data.offset);
            switch (request.data.command) {
                case 'getHistory':
                    Ambassador.launchQuery({ text: "SELECT DISTINCT years FROM baltets.gpz_sap ORDER BY years ASC", values: [] }).then((callback) => {
                        if (callback.status == 'success') {
                            resolve(callback.responce);
                        }
                        else {
                            reject(callback.error);
                        }
                    });
                    break;
                case 'loadFile':
                    console.log(request.data.postData);
                    loadManager.SendFile(request.data.postData).then((res) => {
                        resolve(res);
                    }).catch((err)=>{
                        reject(err);
                    });
                    break;
            }
        })
    };
}

module.exports = new HC_Module();