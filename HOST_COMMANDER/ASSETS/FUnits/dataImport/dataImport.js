let MyProfile = JSON.parse(window.top.document.querySelector('#global').innerHTML);
let loaderLaunchEvent = new Event('HC_LOADER.LAUNCH');
let loaderFinishEvent = new Event('HC_LOADER.FINISH');
let forbiddenSessionEvent = new Event('HC_FORBIDDENSESSION');

class Histeria {
    constructor(setup = {}) {
        this.renderBase = setup.renderBase;
        this.historyTabs = [];
        this.loadMore = null;
        this.history = setup.history || [
            {
                filename: 'filename',
                size: 912590152,
                person: "Хог Матвей Чиби",
                ext: '.xlsx',
                date: new Date(),
                status: '0',
                commentary: 'Обработка',
            },
            {
                filename: 'filename',
                size: 912590152,
                person: "Хог Матвей Чиби",
                ext: '.xlsx',
                date: new Date(),
                status: '1',
                commentary: 'Импортировано',
            },
            {
                filename: 'filename',
                size: 912590152,
                person: "Хог Матвей Чиби",
                ext: '.sosu',
                date: new Date(),
                status: '2',
                commentary: 'Неверный формат',
            }
        ]
    }

    Init() {
        if (!this.renderBase) {
            return;
        }
        let THIS = this;
        SendPost({
            unit: 'dataImport',
            command: 'getHistory',
            downLimit: 0,
        }, 'gate.sf', function (data) {
            THIS.DrawHistory();
        });



    }

    DrawHistory(options = {}) {
        let THIS = this;
        if (!options.loadmore) {
            THIS.historyTabs.forEach((elem) => {
                elem.remove();
            })
            THIS.historyTabs = [];
        }
        this.history.forEach((elem) => {
            let base = document.createElement('div');
            base.classList.add('fileBase');
            base.classList.add('status_' + elem.status);
            THIS.renderBase.appendChild(base);
            let img_base = document.createElement('div');
            img_base.classList.add('imgBase');
            base.appendChild(img_base);
            let img = document.createElement('img');
            img.classList.add('miniature');
            img.src = './images/docPic.png';
            img_base.appendChild(img);
            let ext = document.createElement('div');
            ext.classList.add('ext');
            ext.innerHTML = elem.ext;
            img_base.appendChild(ext);
            let block1 = document.createElement('div');
            block1.classList.add('block1');
            base.appendChild(block1);
            let block2 = document.createElement('div');
            block2.classList.add('block2');
            base.appendChild(block2);
            let name = document.createElement('div');
            name.classList.add('filename');
            name.innerHTML = elem.filename;
            block1.appendChild(name);
            let sender = document.createElement('div');
            sender.classList.add('sender');
            sender.innerHTML = 'От: ' + elem.person;
            block1.appendChild(sender);
            let size = document.createElement('div');
            size.classList.add('size');
            size.innerHTML = elem.size + 'байт';
            block2.appendChild(size);
            let date = document.createElement('div');
            date.classList.add('date');
            date.innerHTML = RenderDate(elem.date);
            block2.appendChild(date);
            let status = document.createElement('div');
            status.classList.add('status');
            status.innerHTML = elem.commentary;
            base.appendChild(status);
            let statusImg = document.createElement('img');
            statusImg.classList.add('statusImg');
            statusImg.src = './images/HyperMatrix.png';
            base.appendChild(statusImg);
            THIS.historyTabs.push(base);

        });
        if (THIS.loadMore) {
            THIS.loadMore.remove();
        }
        let loadMoreButton = document.createElement('div');
        loadMoreButton.classList.add('loadMoreButton');
        loadMoreButton.classList.add('interactible');
        loadMoreButton.innerHTML = 'Загрузить ещё';
        THIS.renderBase.appendChild(loadMoreButton);
        THIS.loadMore = loadMoreButton;
        loadMoreButton.addEventListener('click', function (data) {
            SendPost({
                unit: 'dataImport',
                command: 'getHistory',
                offset: THIS.historyTabs.length,
            }, 'gate.sf', function (data) {
                THIS.DrawHistory({ loadmore: true });
            });
        })
    }

    TrackFile(file) {
        let base = document.createElement('div');
        base.classList.add('fileBase');
        base.classList.add('status_' + 0);
        this.renderBase.insertBefore(base, this.renderBase.firstChild);
        let img_base = document.createElement('div');
        img_base.classList.add('imgBase');
        base.appendChild(img_base);
        let img = document.createElement('img');
        img.classList.add('miniature');
        img.src = './images/docPic.png';
        img_base.appendChild(img);
        let ext = document.createElement('div');
        ext.classList.add('ext');
        ext.innerHTML = file.ext;
        img_base.appendChild(ext);
        let block1 = document.createElement('div');
        block1.classList.add('block1');
        base.appendChild(block1);
        let block2 = document.createElement('div');
        block2.classList.add('block2');
        base.appendChild(block2);
        let name = document.createElement('div');
        name.classList.add('filename');
        name.innerHTML = file.filename;
        block1.appendChild(name);
        let sender = document.createElement('div');
        sender.classList.add('sender');
        sender.innerHTML = 'От: ' + file.person;
        block1.appendChild(sender);
        let size = document.createElement('div');
        size.classList.add('size');
        size.innerHTML = file.size + 'байт';
        block2.appendChild(size);
        let date = document.createElement('div');
        date.classList.add('date');
        date.innerHTML = RenderDate(file.date || new Date());
        block2.appendChild(date);
        let status = document.createElement('div');
        status.classList.add('status');
        status.innerHTML = file.commentary;
        base.appendChild(status);
        let statusImg = document.createElement('img');
        statusImg.classList.add('statusImg');
        statusImg.src = './images/HyperMatrix.png';
        base.appendChild(statusImg);
        this.historyTabs.push(base);

    }

}

Awake();
function Awake() {
    DrawPageBase();
}

function RenderDate(date) {
    let result = '';
    if (date.getDate() < 10) {
        result += '0';
    }
    result += date.getDate() + '.';
    if (date.getMonth() < 10) {
        result += '0';
    }
    result += date.getMonth() + '.';
    result += date.getFullYear();
    return result;
}

function DrawPageBase() {

    let history_base = document.createElement('div');
    history_base.innerHTML = 'ИСТОРИЯ ИМПОРТА ФАЙЛОВ';
    history_base.classList.add('historyBase');
    document.body.appendChild(history_base);
    let history_main = document.createElement('div');
    history_main.classList.add('historyMain');
    history_base.appendChild(history_main);

    let importButton = document.createElement('div');
    importButton.classList.add('importButton');
    importButton.classList.add('interactible');
    importButton.innerHTML = 'Импортировать документ';
    document.body.appendChild(importButton);
    let inputfield = document.createElement('input');
    inputfield.classList.add('input_file_field');
    inputfield.type = 'file';
    importButton.appendChild(inputfield);

    let histeria = new Histeria({
        renderBase: history_main,
    });
    histeria.Init();

    inputfield.addEventListener('input', function () {
        console.log(this.files);
        for (let i = 0; i < this.files.length; i++) {
            let reader = new FileReader();
            let file = this.files[0];
            reader.onload = function (ev) {
                let meta = {
                    name: file.name,
                    type: file.type,
                    size: file.size,
                }
                SendPost({
                    unit: 'dataImport',
                    command: 'loadFile',
                    postData: {
                        meta: meta,
                        dataString: ev.target.result,
                    }
                }, 'gate.sf', function (data) {
                    histeria.TrackFile({ ID: data, meta: meta });
                    /*
                    SendPost({
                        unit: 'dataImport',
                        command: 'getHistory',
                        downLimit: 0,
                    }, 'gate.sf', function (data) {
                        histeria.DrawHistory();
                    });
                    */
                });
            }
            reader.readAsDataURL(file);
        }


    })
}

function SendPost(saveData, customRef, callback) {
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
        else if (xhr.status != 200) {
            console.error('ERR:' + xhr.status);
        }
    };
    xhr.send(JSON.stringify(saveData));
}