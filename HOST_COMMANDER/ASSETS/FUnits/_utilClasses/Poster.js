let loaderLaunchEvent = new Event('HC_LOADER.LAUNCH');
let loaderFinishEvent = new Event('HC_LOADER.FINISH');
let forbiddenSessionEvent = new Event('HC_FORBIDDENSESSION');

// --XHR POSTER-- //
function SendPost(saveData, customRef, callback, errorCallback = function(){}) {
    window.top.document.dispatchEvent(loaderLaunchEvent);
    console.log(saveData);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', customRef, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            jsonData = JSON.parse(xhr.responseText);
            console.log(jsonData);
            switch (JSON.parse(xhr.responseText).status) {
                case "forbidden session":
                    window.top.document.dispatchEvent(loaderFinishEvent);
                    window.top.document.dispatchEvent(forbiddenSessionEvent);
                    console.log('forbidden session');
                    break;
                default:
                    window.top.document.dispatchEvent(loaderFinishEvent);
                    callback(jsonData);
                    break;
            }
        }
        else if (xhr.readyState == 4 && xhr.status != 200) {
            console.error('ERR:' + xhr.status);
            window.top.document.dispatchEvent(loaderFinishEvent);
            errorCallback(xhr.status);
        }
    };
    xhr.send(JSON.stringify(saveData));
}