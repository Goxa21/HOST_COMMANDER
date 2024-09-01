let MyProfile = JSON.parse(window.top.document.querySelector('#global').innerHTML);

Awake();
function Awake() {
    window.top.document.dispatchEvent(new CustomEvent('HC_LOADER.FINISH', { detail: {} }));
    window.top.document.dispatchEvent(new CustomEvent('HC_LOADER.STOPDISPLAY', { detail: { operator: true } }));

    document.body.innerHTML = 'EXAMPLE';
}
