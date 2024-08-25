const GATE = require('./HOSTCOMMANDER/GATE.js');
let DEVMODE = process.env.DEVMODE || true;
let PORT = process.env.PORT || 8080;
let RPATH = process.env.RPATH || '.';



function Awake(){
    let Gate = new GATE({
        DEVMODE:DEVMODE,
        PORT:PORT,
        RPATH:RPATH,
    });
    Gate.Start();
}
Awake();