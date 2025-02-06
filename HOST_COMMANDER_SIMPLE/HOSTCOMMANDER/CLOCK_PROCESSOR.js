const Scheduler = require('node-schedule');
const fs = require('fs');
const {
    Worker, isMainThread, parentPort, workerData
} = require('worker_threads');

class Clock_processor {
    constructor(options) {
        this.options = options || {
            DEVMODE: true,
            RPATH: '.',
        };
        if (this.options.RPATH != '.') {
            process.chdir(this.options.RPATH);
        }
    }
    Start() {
        let FUnits = fs.readdirSync('./ASSETS/FUnits');
        for (let dirID in FUnits) {
            let files = fs.readdirSync('./ASSETS/FUnits/' + FUnits[dirID]);
            let workerName = '';
            let isThereWorker = false;
            let isThereClinfo = false;
            let clInfo = {};
            for (let fileID in files) {
                if (files[fileID] == 'HC_Clockworker.js') {
                    isThereWorker = true;
                    workerName = './ASSETS/FUnits/' + FUnits[dirID] + '/' + files[fileID];
                } else if (files[fileID] == 'HC_CW_info.js') {
                    isThereClinfo = true;
                    clInfo = require('../ASSETS/FUnits/' + FUnits[dirID] + '/' + files[fileID])
                }
            }
            if (isThereClinfo && isThereWorker) {
                /*let worker = new Worker(workerName, { workerData: {} });
                    worker.on('exit', function () {
                        console.log('CW:EXITED:' + workerName);
                    });
                    return;*/
                console.log('CW:REGISTER:' + workerName);
                let job = Scheduler.scheduleJob(clInfo.info.cron_mask, function (context) {
                    console.log('CW:LAUNCH:' + workerName);
                    let worker = new Worker(workerName, { workerData: {} });
                    worker.on('exit', function () {
                        console.log('CW:EXITED:' + workerName);
                    });
                });
            }
        }
    }
}

module.exports = Clock_processor;
