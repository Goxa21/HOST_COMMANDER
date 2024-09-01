class HC_Singleton {
    constructor() {
        this.Key = Math.random();
        this.TimerModule = new Timer();
        this.execResult = null;
        this.reqHumieArray = [];
        this.THIS = this;
        //setInterval(this.CycleLocalScan, 30000, this);
    }

    Execute(request) {
        let THIS = this;
        //console.log('SINGLETON EXECUTION');
        return new Promise((resolve, reject) => {
            switch (request.data.command) {
                case 'example':
                    if (THIS.execResult) {
                        resolve(THIS.execResult);
                    }
                    else {
                        reject(THIS.execResult);
                    }
                    break;
                default:
                    reject({error:'Unknown command'});
                    break;
            }
        })
    };
}

let Instance = new HC_Singleton();

module.exports = Instance;