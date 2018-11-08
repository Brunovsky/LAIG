class LinearAnimation extends Animation {
    constructor(scene, cp = {}, span) {
        super(scene);
        this.cp = cp;
        this.total_dist = 0;
        this.elapsed_time = 0;
        this.span = span;
        this.pos = 0;
        this.translate = {
            x: 0, 
            y: 0,
            z: 0
        }
        this.distance();
    }

    /** rotateAngle(vector1, vecto2r = [0,0,1]){
        let vecnorm = Math.sqrt(x*x + z*z);
        let norm = Math.sqrt(vector[0]*vector[0] + vector[1]*vector[1] + vector[2]*vector[2]);
        return Math.acos((x*vector[0] + z*vector[2])/(vecnorm*norm));
    }*/

    distance() {
        this.dist = [];
        this.vec = [];
        this.progress = [0];
        this.translate
        for (let i = 0; i + 1 < this.cp.length; i++) {
            this.vec.push(new Array(3));

            this.vec[i][0] = this.cp[i + 1].xx - this.cp[i].xx;
            this.vec[i][1] = this.cp[i + 1].yy - this.cp[i].yy;
            this.vec[i][2] = this.cp[i + 1].zz - this.cp[i].zz;
            this.dist.push(Math.sqrt(this.vec[i][0]*this.vec[i][0] + this.vec[i][1]*this.vec[i][1] + this.vec[i][2]*this.vec[i][2]));
            this.total_dist += this.dist[i];
        }
        
        let k = 0;
        
        for(let value of this.dist){
            k += value;
            this.progress.push(k/this.total_dist);
        }
    }

    update(currTime) {

        this.elapsed_time += currTime - this.previousTime;
        let percentage = (this.elapsed_time / 1000) / this.span;
        let pos_in_vec = (this.progress[this.pos+1] - percentage) / (this.progress[this.pos +1] - this.progress[this.pos]);

        this.translate.x = this.cp[this.pos].xx + pos_in_vec*this.vec[this.pos][0];
        this.translate.y = this.cp[this.pos].yy + pos_in_vec*this.vec[this.pos][1];
        this.translate.z = this.cp[this.pos].zz + pos_in_vec*this.vec[this.pos][2];

        this.previousTime = currTime;
    }

    apply() {
       this.scene.translate(this.translate.x,this.translate.y, this.translate.z);
    }


}