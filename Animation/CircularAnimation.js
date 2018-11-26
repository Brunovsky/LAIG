class CircularAnimation extends Animation {
    constructor(scene, center, radius, startang, rotangle, span) {
        super(scene);
        this.center = center;
        this.radius = radius;
        this.startang = startang* Math.PI / 180;
        this.rotangle = rotangle* Math.PI / 180;
        this.span = span;
        this.rotation = 0;
    }

    update(currTime, previousTime) {
        
        if (this.elapsed_time / 1000 < this.span) {

            super.update(currTime, previousTime);
            
            if(this.percentage > 1)
                this.percentage = 1; 
            this.rotation = this.percentage * this.rotangle;

        }

        if (this.elapsed_time / 1000 >= this.span)
            this.end = true;
    }

    apply() {

        this.scene.translate(this.center.x, this.center.y, this.center.z);
        this.scene.rotate(this.rotation, 0, -1, 0);
        this.scene.translate(this.radius * Math.cos(this.startang), 0, this.radius * Math.sin(this.startang));

    }
}