class TRANSFORMATOR {
    constructor(setup) {
        this.target = {
            node: setup.node,
            cfg: setup.cfg,
        };
        this.node;
        this.editor = setup.editor,
            this.movers = {};
        this.INIT(this);

        this.startTargetCoords = { x: 0, y: 0 };
        this.startTargetScale = { x: 0, y: 0 };
        this.startMouseCoords = { x: 0, y: 0 };

        this.LMB = false;
    }

    INIT(THIS) {
        let base = document.createElement('div');
        base.classList.add('transformator');

        let UL = document.createElement('div');
        UL.classList.add('UL');
        this.movers.UL = UL;
        let U = document.createElement('div');
        U.classList.add('U');
        this.movers.U = U;
        let UR = document.createElement('div');
        UR.classList.add('UR');
        this.movers.UR = UR;
        let L = document.createElement('div');
        L.classList.add('L');
        this.movers.L = L;
        let C = document.createElement('div');
        C.classList.add('C');
        this.movers.C = C;
        let R = document.createElement('div');
        R.classList.add('R');
        this.movers.R = R;
        let BL = document.createElement('div');
        BL.classList.add('BL');
        this.movers.BL = BL;
        let B = document.createElement('div');
        B.classList.add('B');
        this.movers.B = B;
        let BR = document.createElement('div');
        BR.classList.add('BR');
        this.movers.BR = BR;

        base.appendChild(UL);
        base.appendChild(U);
        base.appendChild(UR);
        base.appendChild(L);
        base.appendChild(C);
        base.appendChild(R);
        base.appendChild(BL);
        base.appendChild(B);
        base.appendChild(BR);

        this.node = base;

        this.node.addEventListener('update_elem', function (e) {
            console.log(e.detail);
            
            for (let group in e.detail) {
                for (let param in e.detail[group]) {
                    if (group == 'transform') {
                        switch (param) {
                            case 'height':
                                THIS.target.node.style.height = e.detail.transform.height;
                                THIS.node.style.height = e.detail.transform.height;
                                break;
                            case 'width':
                                THIS.target.node.style.width = e.detail.transform.width;
                                THIS.node.style.width = e.detail.transform.width;
                                break;
                            case 'x':
                                THIS.target.node.style.left = e.detail.transform.x;
                                THIS.node.style.left = e.detail.transform.x;
                                break;
                            case 'y':
                                THIS.target.node.style.top = e.detail.transform.y;
                                THIS.node.style.top = e.detail.transform.y;
                                break;
                            case 'zIndex':
                                THIS.target.node.style.zIndex = e.detail.transform.zIndex;
                                //THIS.node.style.zIndex = e.detail.transform.zIndex;
                                break;
                        }
                    }
                    THIS.target.cfg.components[group][param] = e.detail[group][param];
                }
            }


        })

        UL.addEventListener('mousedown', function (e) {
            if (e.button == 0) {
                THIS.LMB = true;
                THIS.startMouseCoords = {
                    x: THIS.editor.curMouseCoords.x,
                    y: THIS.editor.curMouseCoords.y,
                };
                THIS.startTargetCoords = { x: THIS.target.cfg.components.transform.x, y: THIS.target.cfg.components.transform.y };
                THIS.startTargetScale = { x: THIS.target.cfg.components.transform.width, y: THIS.target.cfg.components.transform.height };
                setTimeout(MoveTarget, 50, THIS, {
                    scaleX: -1,
                    scaleY: -1,
                    moveX: 1,
                    moveY: 1,
                });
            }
        });
        U.addEventListener('mousedown', function (e) {
            if (e.button == 0) {
                THIS.LMB = true;
                THIS.startMouseCoords = {
                    x: THIS.editor.curMouseCoords.x,
                    y: THIS.editor.curMouseCoords.y,
                };
                THIS.startTargetCoords = { x: THIS.target.cfg.components.transform.x, y: THIS.target.cfg.components.transform.y };
                THIS.startTargetScale = { x: THIS.target.cfg.components.transform.width, y: THIS.target.cfg.components.transform.height };
                setTimeout(MoveTarget, 50, THIS, {
                    scaleX: 0,
                    scaleY: -1,
                    moveX: 0,
                    moveY: 1,
                });
            }
        });
        UR.addEventListener('mousedown', function (e) {
            if (e.button == 0) {
                THIS.LMB = true;
                THIS.startMouseCoords = {
                    x: THIS.editor.curMouseCoords.x,
                    y: THIS.editor.curMouseCoords.y,
                };
                THIS.startTargetCoords = { x: THIS.target.cfg.components.transform.x, y: THIS.target.cfg.components.transform.y };
                THIS.startTargetScale = { x: THIS.target.cfg.components.transform.width, y: THIS.target.cfg.components.transform.height };
                setTimeout(MoveTarget, 50, THIS, {
                    scaleX: 1,
                    scaleY: -1,
                    moveX: 0,
                    moveY: 1,
                });
            }
        });
        L.addEventListener('mousedown', function (e) {
            if (e.button == 0) {
                THIS.LMB = true;
                THIS.startMouseCoords = {
                    x: THIS.editor.curMouseCoords.x,
                    y: THIS.editor.curMouseCoords.y,
                };
                THIS.startTargetCoords = { x: THIS.target.cfg.components.transform.x, y: THIS.target.cfg.components.transform.y };
                THIS.startTargetScale = { x: THIS.target.cfg.components.transform.width, y: THIS.target.cfg.components.transform.height };
                setTimeout(MoveTarget, 50, THIS, {
                    scaleX: -1,
                    scaleY: 0,
                    moveX: 1,
                    moveY: 0,
                });
            }
        });
        C.addEventListener('mousedown', function (e) {
            if (e.button == 0) {
                THIS.LMB = true;
                THIS.startMouseCoords = {
                    x: THIS.editor.curMouseCoords.x,
                    y: THIS.editor.curMouseCoords.y,
                };
                THIS.startTargetCoords = { x: THIS.target.cfg.components.transform.x, y: THIS.target.cfg.components.transform.y };
                THIS.startTargetScale = { x: THIS.target.cfg.components.transform.width, y: THIS.target.cfg.components.transform.height };
                setTimeout(MoveTarget, 50, THIS, {
                    scaleX: 0,
                    scaleY: 0,
                    moveX: 1,
                    moveY: 1,
                });
            }
        });
        R.addEventListener('mousedown', function (e) {
            if (e.button == 0) {
                THIS.LMB = true;
                THIS.startMouseCoords = {
                    x: THIS.editor.curMouseCoords.x,
                    y: THIS.editor.curMouseCoords.y,
                };
                THIS.startTargetCoords = { x: THIS.target.cfg.components.transform.x, y: THIS.target.cfg.components.transform.y };
                THIS.startTargetScale = { x: THIS.target.cfg.components.transform.width, y: THIS.target.cfg.components.transform.height };
                setTimeout(MoveTarget, 50, THIS, {
                    scaleX: 1,
                    scaleY: 0,
                    moveX: 0,
                    moveY: 0,
                });
            }
        });
        BL.addEventListener('mousedown', function (e) {
            if (e.button == 0) {
                THIS.LMB = true;
                THIS.startMouseCoords = {
                    x: THIS.editor.curMouseCoords.x,
                    y: THIS.editor.curMouseCoords.y,
                };
                THIS.startTargetCoords = { x: THIS.target.cfg.components.transform.x, y: THIS.target.cfg.components.transform.y };
                THIS.startTargetScale = { x: THIS.target.cfg.components.transform.width, y: THIS.target.cfg.components.transform.height };
                setTimeout(MoveTarget, 50, THIS, {
                    scaleX: -1,
                    scaleY: 1,
                    moveX: 1,
                    moveY: 0,
                });

            }
        });
        B.addEventListener('mousedown', function (e) {
            if (e.button == 0) {
                THIS.LMB = true;
                THIS.startMouseCoords = {
                    x: THIS.editor.curMouseCoords.x,
                    y: THIS.editor.curMouseCoords.y,
                };
                THIS.startTargetCoords = { x: THIS.target.cfg.components.transform.x, y: THIS.target.cfg.components.transform.y };
                THIS.startTargetScale = { x: THIS.target.cfg.components.transform.width, y: THIS.target.cfg.components.transform.height };
                setTimeout(MoveTarget, 50, THIS, {
                    scaleX: 0,
                    scaleY: 1,
                    moveX: 0,
                    moveY: 0,
                });

            }
        });
        BR.addEventListener('mousedown', function (e) {
            if (e.button == 0) {
                THIS.LMB = true;
                THIS.startMouseCoords = {
                    x: THIS.editor.curMouseCoords.x,
                    y: THIS.editor.curMouseCoords.y,
                };
                THIS.startTargetCoords = { x: THIS.target.cfg.components.transform.x, y: THIS.target.cfg.components.transform.y };
                THIS.startTargetScale = { x: THIS.target.cfg.components.transform.width, y: THIS.target.cfg.components.transform.height };
                setTimeout(MoveTarget, 50, THIS, {
                    scaleX: 1,
                    scaleY: 1,
                    moveX: 0,
                    moveY: 0,
                });

            }
        });

        function MoveTarget(THIS, coefs) {
            let deltaMouseCoords = {
                x: Number(THIS.editor.curMouseCoords.x) - Number(THIS.startMouseCoords.x),
                y: Number(THIS.editor.curMouseCoords.y) - Number(THIS.startMouseCoords.y),
            }
            let newTargetCoords = {
                x: Math.round((Number(THIS.startTargetCoords.x) + Number(deltaMouseCoords.x) / THIS.editor.platform_transform.scale * coefs.moveX) * 100) / 100,
                y: Math.round((Number(THIS.startTargetCoords.y) + Number(deltaMouseCoords.y) / THIS.editor.platform_transform.scale * coefs.moveY) * 100) / 100,
            }
            let newTargetScale = {
                x: Math.round((Number(THIS.startTargetScale.x) + Number(deltaMouseCoords.x) / THIS.editor.platform_transform.scale * coefs.scaleX) * 100) / 100,
                y: Math.round((Number(THIS.startTargetScale.y) + Number(deltaMouseCoords.y) / THIS.editor.platform_transform.scale * coefs.scaleY) * 100) / 100,
            }
            //console.log('MOVE');
            //console.log(THIS.startMouseCoords);
            //console.log(THIS.editor.curMouseCoords);
            //console.log(deltaMouseCoords);
            //console.log(THIS.startTargetCoords);
            //console.log(THIS.startTargetScale);
            //console.log(newTargetCoords);
            console.log(THIS);
            THIS.target.node.style.left = newTargetCoords.x;
            THIS.target.node.style.top = newTargetCoords.y;
            THIS.target.cfg.components.transform.x = newTargetCoords.x;
            THIS.target.cfg.components.transform.y = newTargetCoords.y;
            THIS.target.node.style.width = newTargetScale.x;
            THIS.target.node.style.height = newTargetScale.y;
            THIS.target.cfg.components.transform.width = newTargetScale.x;
            THIS.target.cfg.components.transform.height = newTargetScale.y;
            THIS.node.style.left = newTargetCoords.x;
            THIS.node.style.top = newTargetCoords.y;
            THIS.node.style.width = newTargetScale.x;
            THIS.node.style.height = newTargetScale.y;
            if (THIS.LMB) {
                setTimeout(MoveTarget, 50, THIS, coefs);
            }

            THIS.target.node.dispatchEvent(new CustomEvent('update_cfg', {
                detail: {
                    transform: {
                        x: newTargetCoords.x,
                        y: newTargetCoords.y,
                        width: newTargetScale.x,
                        height: newTargetScale.y,
                    }
                }
            }));
        }
        document.addEventListener('mouseup', function (e) {
            if (e.button == 0) {
                THIS.LMB = false;
            }
        })
    }
}