let Recorder = require('node-rtsp-recorder').Recorder;

let rec_stream = new Recorder({
    url:'rtsp://admin:!123456!@10.5.206.65:554',
    folder:'./RTSP_BUFFER',
    name:'cam1',
    //type:'image',
})


rec_stream.startRecording();
setTimeout(()=>{
console.log('STOP RECORDING');
    rec_stream.stopRecording();
    rec_stream = null;
},10000)
return;
    rec_stream.captureImage(()=>{
        console.log('IMAGE_CAPTURED');
    });
    