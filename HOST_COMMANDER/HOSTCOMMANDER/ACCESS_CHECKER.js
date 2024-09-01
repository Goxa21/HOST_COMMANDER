let AMBASSADOR = require('./AMBASSADOR.js');

class ACCESS_CHECKER{
    constructor(){
    }
    Check(sessionData){
        return new Promise((resolve,reject)=>{

            AMBASSADOR.launchQuery({ text: "CALL example.login_bi($1)", values: [{
                username:sessionData.userName,
                device:'127.0.0.1',
            }] }).then((callback) => {
                if (callback.status == 'success') {
                    let result = callback.responce.rows[0].result;
                    console.log(result);
                    resolve(result);

                }
                else {
                    reject(callback.error);
                }
            });
        });
    }
}

module.exports = new ACCESS_CHECKER();