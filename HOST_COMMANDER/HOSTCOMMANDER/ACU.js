let SESSION_MANAGER = require('./SESSION_MANAGER.js');
class ACU{
    constructor(options){
        this.stdin = process.openStdin();

        this.commandlineList = {
            SESSION_MANAGER:SESSION_MANAGER,
        }
        this.THIS = this;
    }
    
    INIT(){
        console.log(this.commandlineList);
        let THIS = this;
        this.stdin.addListener('data',function(data){
            let regex = /([\w]+)\s([\w]+)\s/g;
            let result = regex.exec(data.toString());
            if (THIS.commandlineList[result[1]]){
                console.log(THIS.commandlineList[result[1]][result[2]]());
            }
            else {
                console.log('Команда не распознана');
            }
        })
    }
}

module.exports = new ACU();