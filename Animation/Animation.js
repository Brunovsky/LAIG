class Animation{
    constructor(scene){
        this.scene = scene;
        this.started = false;
        this.end = false;
    }

    update(currTime){
        this.elapsed_time += currTime - this.previousTime;
        this.percentage = (this.elapsed_time / 1000) / this.span;

    }

    apply(){
        
    }

    hasEnded(){
        return this.end;
    }
}