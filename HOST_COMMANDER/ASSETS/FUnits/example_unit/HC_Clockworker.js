const fs = require('fs');
const Ambassador = require('../../../HOSTCOMMANDER/AMBASSADOR');
const Sambrero = require('../../../HOSTCOMMANDER/SAMBRERO');
const Mailoyala = require('../../../HOSTCOMMANDER/MAILOYALA');
const Xlsx = require('xlsx');
const {
    Worker, isMainThread, parentPort, workerData
} = require('worker_threads');
async function Awake() {
    console.log('CW:EXAMPLE:START');
    if (!workerData){
        workerData = {};
    }
    console.log(workerData);

}


Awake();