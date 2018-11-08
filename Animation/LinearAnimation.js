class LinearAnimation extends Animation {
    constructor(scene, cp = {}, span) {
        super(scene);
        this.cp = cp;
        this.elapsed_time = 0;
        this.span = span;
        vectors();
    }

    /** rotateAngle(vector1, vecto2r = [0,0,1]){
        let vecnorm = Math.sqrt(x*x + z*z);
        let norm = Math.sqrt(vector[0]*vector[0] + vector[1]*vector[1] + vector[2]*vector[2]);
        return Math.acos((x*vector[0] + z*vector[2])/(vecnorm*norm));
    }*/

    vectors() {
        this.vec = [];
        for (let i = 0; cp.length > i; i++) {
            this.vec = new Array(3);
            this.vec[i][0] = cp[i + 1][0] - cp[i][0];
            this.vec[i][1] = cp[i + 1][1] - cp[i][1];
            this.vec[i][2] = cp[i + 1][2] - cp[i][2];
        }
    }

    update(currTime) {

        this.elapsed_time += currTime - this.previousTime;
        let percentage = (this.elapsed_time / 1000) / this.span;
        let mid_point = cp.length * percentage;
        let point = Math.floor(mid_point);
        let k = mid_point - point;
        let translate = {x: cp[point][0]+ k*this.vec[point][0], 
            y: cp[point][1]+ k*this.vec[point][1],
            z: cp[point][2]+ k*this.vec[point][2]
        }
    }

    apply() {

        this.scene.translate(this.translate.x,this.translate.y, this.translate.z);

    }


}