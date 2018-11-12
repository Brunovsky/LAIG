class CircularAnimation extends Animation {
    constructor(scene, center, radius, startang, rotangle, span) {
        super(scene);
        this.center = center;
        this.radius = radius;
        this.startang = startang;
        this.rotangle = rotangle;
        this.span = span;
        this.rotation = 0;
    }

    update(currTime) {
        
        if (this.started && (this.elapsed_time / 1000 < this.span)) {
          super.update(currTime);
           
            this.rotation += this.percentage * this.rotangle;

            

        }

        this.started = true;
        this.previousTime = currTime;

        if (this.elapsed_time / 1000 >= this.span)
            this.end = true;
    }

    apply() {

        this.scene.rotate(this.rotation, 0, -1, 0);
    }
}