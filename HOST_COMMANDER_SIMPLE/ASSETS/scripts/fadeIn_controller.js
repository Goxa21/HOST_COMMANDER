class FadeInController{
    constructor(cfg = {}){
        this.elements = document.querySelectorAll('.fadeInAble');
        this.Update(this);
        
    }

    Update(THIS = this){
        for(let elem of THIS.elements){
            let curRect = elem.getClientRects();
            if (curRect[0].y < window.innerHeight && !elem.classList.contains('fadeIn_L')){
                elem.classList.add("fadeIn_L");
            }
            if ((curRect[0].y+curRect[0].height < 0 || curRect[0].y > window.innerHeight) && elem.classList.contains('fadeIn_L')){
                elem.classList.remove("fadeIn_L");
            }
            
        }
        setTimeout(THIS.Update,200,THIS)
    }
}

let fadeInController = new FadeInController();