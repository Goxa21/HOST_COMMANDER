const {
    Worker, isMainThread, parentPort, workerData
} = require('worker_threads');
const ROUTER = require('./ROUTER.js');


function StartSequence(){
    //console.log(workerData);
    ROUTER.ExecuteRequest(workerData.request).then((data)=> {
        let header = {"Content-type": "text/html;  charsetcharset=utf-8"};
        if (workerData.request.path.ext == '.csv'){
            header = { "Content-type": "application/csv" };
        }
        parentPort.postMessage({
            status:200,
            header:header,
            body:data,
        });
    }).catch((err) => {
        console.log(err);
    });
    
}
StartSequence();