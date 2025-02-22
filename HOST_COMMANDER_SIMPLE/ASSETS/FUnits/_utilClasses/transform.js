class Transform{
    constructor(input = {}){
        this.scale = input.scale || 1;
        this.x = input.x || 0;
        this.y = input.y || 0;
        this.zIndex = input.zIndex || 0;
        this.height = input.height || 0;
        this.width = input.width || 0;
    }
}