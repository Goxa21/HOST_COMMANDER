process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

let https = require('https');
let Ambassador = require('./HOSTCOMMANDER/AMBASSADOR');

console.log('ATTACK!!!');

let req_body = JSON.stringify({
    "command": "get_cluster",
    "data": {
        "levelID": 1,
        "moduleID": 2,
        "publish": true
    }
});
let req_options = {
    host: 'bal-webapps-01',
    port: 8070,
    path: '/gate.sf',
    method: 'POST',
    headers: {
        'Content-Type': 'text/plain',
        'Cookie': 'cook={"userName":"gegelgg","sessionKey":"K65589882366930085028254283614280424294338732272643227169461450"}',
        'Content-Length': Buffer.byteLength(req_body),
    }
}

let req = https.request(req_options,function(res){
    console.log(res.statusCode);
    console.log(res.headers);
    res.setEncoding('utf-8');
    res.on('data',function(chunk){
        console.log('Response: ' + chunk);
    })
})

/*
req.write(req_body);
req.end();
*/

ATTACK();

async function ATTACK(){
    let totalAttackers = 1000;
    let resultAwaiting = 0;
    let overflowStopper = 100000;


    let initialTime = new Date();

    for (let i =0; i < totalAttackers; i++){
        let req = https.request(req_options,function(res){
            console.log(i + " responded");
            /*
            res.setEncoding('utf-8');
            res.on('data',function(chunk){
                console.log('Response: ' + chunk);
            })
            */
            resultAwaiting++;
            if (resultAwaiting == totalAttackers){
                REPORT(initialTime,totalAttackers);
            }
        })
        req.write(req_body);
        req.end();
        console.log('LAUNCH REQUEST!!!');
    }

    
} 

async function REPORT(initialTime,totalAttackers){

    let curTime = new Date();
    console.log(initialTime);
    console.log(curTime);
    let delta = new Date(curTime - initialTime);
    let report = delta.getMinutes() + 'm' + delta.getSeconds() + 's' + delta.getMilliseconds() + 'ms';

    console.log('REPORT!!!');
    console.log('delta:' + delta.getMinutes() + 'm' + delta.getSeconds() + 's' + delta.getMilliseconds() + 'ms');
    Ambassador.launchQuery({
        text: "CALL ddos_test.ddos_log($1)", values: [{ clients: totalAttackers, callback: report }]
    }).then((callback) => {
        if (callback.status == 'success') {
            console.log(callback.responce.rows);
        }
        else {
            console.log(callback.error);
        }
    }); 
}

/*
Ambassador.launchQuery({
    text: "CALL ddos_test.ddos_log($1)", values: [{ clients: 10, callback: '10 ms' }]
}).then((callback) => {
    if (callback.status == 'success') {
        console.log(callback.responce.rows);
    }
    else {
        console.log(callback.error);
    }
});
*/

