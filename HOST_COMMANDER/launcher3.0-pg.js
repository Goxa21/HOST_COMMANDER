const ACU = require('./HOSTCOMMANDER/ACU.js');
const GATE = require('./HOSTCOMMANDER/GATE.js');
const CLOCK_PROCESSOR = require('./HOSTCOMMANDER/CLOCK_PROCESSOR.js');
let DEVMODE = process.env.DEVMODE || true;
if (process.env.DEVMODE){
    DEVMODE = (DEVMODE == 'true');
}
let PORT = process.env.PORT || 12080;
let RPATH = process.env.RPATH || '.';



function Awake(){
    console.clear();
    let Clock_Processor = new CLOCK_PROCESSOR({
        DEVMODE:DEVMODE,
        PORT:PORT,
        RPATH:RPATH,
    });
    let Gate = new GATE({
        DEVMODE:DEVMODE,
        PORT:PORT,
        RPATH:RPATH,
    });
    
    
    Clock_Processor.Start();
    Gate.Start();
    
    //ACU.INIT();
}
Awake();