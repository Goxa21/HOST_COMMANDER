const fs = require('fs');
const { stringify } = require("csv-stringify");
const MemoryStream = require('memorystream');

class CSV_WEAVER {
    constructor() {
    }

    async WriteToCSV(dataMassive, columns) {
        dataMassive = dataMassive || [];
        console.log(dataMassive);
        console.log(columns);
        let textColumns = [];
        for (let cID in columns){
            textColumns.push(columns[cID].textname);
        }
        console.log(textColumns);
        return new Promise(function (resolve, reject) {
            const zStringifier = stringify({ header: true, delimiter: ";", columns: textColumns });
            for (let i = 0; i < dataMassive.length; i++) {
                let csvRow = [];
                for (let cID in columns){
                    csvRow.push(dataMassive[i][columns[cID].codename]);
                }
                zStringifier.write(csvRow);
            }
            let memoStream = new MemoryStream();
            zStringifier.pipe(memoStream);
            zStringifier.pipe(fs.createWriteStream('./test.csv'));
            zStringifier.end();
            resolve(memoStream);
        });
    
    }
}

module.exports = new CSV_WEAVER();

async function WriteToCSV(callback, columns) {
    let textColumns = [];
    for (let i = 0; i < columns.length; i++) {
        textColumns[i] = THIS.ResolveFieldName(columns[i]);
    }
    let dataMassive = callback.rows;
    return new Promise(function (resolve, reject) {
        const zStringifier = stringify({ header: true, delimiter: ";", columns: textColumns });
        for (let i = 0; i < dataMassive.length; i++) {
            let csvRow = [];
            for (let ic = 0; ic < columns.length; ic++) {
                csvRow.push(dataMassive[i][columns[ic]]);
            }
            zStringifier.write(csvRow);
        }
        let memoStream = new MemoryStream();
        zStringifier.pipe(memoStream);
        zStringifier.pipe(fs.createWriteStream('./test.csv'));
        let data = [];
        zStringifier.end();
        resolve(memoStream);
    });

}