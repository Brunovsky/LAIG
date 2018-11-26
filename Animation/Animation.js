class Animation{
    constructor(scene){
        this.scene = scene;
        this.started = false;
        this.end = false;
        this.elapsed_time = 100;

    }

    update(currTime, previousTime){
        this.elapsed_time += currTime - previousTime;
        this.percentage = (this.elapsed_time / 1000) / this.span;
      
    }

    apply(){
        
    }

    hasEnded(){
        return this.end;
    }

    hasStarted(){
        return this.started;
    }
}