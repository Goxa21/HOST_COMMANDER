const {
    Worker, isMainThread, parentPort, workerData
} = require('worker_threads');
const ROUTER = require('./ROUTER.js');


function StartSequence(){
    //console.log(workerData);
    let header = {"Content-type": "text/html;  charsetcharset=utf-8"};
    ROUTER.ExecuteRequest(workerData.request).then((data)=> {
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
        parentPort.postMessage({
            status:400,
            header:header,
            body:err.toString(),
        });
    });
    
}
StartSequence();