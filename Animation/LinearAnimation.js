class LinearAnimation extends Animation {
    constructor(scene, cp = {}, span) {
        super(scene);
        this.cp = cp;
        this.elapsed_time = 0;
        this.span = span;
        this.pos = 0;
        this.distance();
    }

    /** rotateAngle(vector1, vecto2r = [0,0,1]){
        let vecnorm = Math.sqrt(x*x + z*z);
        let norm = Math.sqrt(vector[0]*vector[0] + vector[1]*vector[1] + vector[2]*vector[2]);
        return Math.acos((x*vector[0] + z*vector[2])/(vecnorm*norm));
    }*/

    distance() {
        this.dist = [];
        this.progress = [0];
        for (let i = 0; cp.length > i; i++) {
            this.vec[i] = new Array(3);
            this.vec[i][0] = cp[i + 1][0] - cp[i][0];
            this.vec[i][1] = cp[i + 1][1] - cp[i][1];
            this.vec[i][2] = cp[i + 1][2] - cp[i][2];
            this.dis[i] = Math.sqrt(this.vec[i][0]*this.vec[i][0] + this.vec[i][1]*this.vec[i][1] + this.vec[i][2]*this.vec[i][2])
            this.total_dist += this.dis[i];
        }
        
        let k = 0;
        
        for(let value of this.dis){
            k += value;
            this.progress.push(k/this.total_dist);
        }
    }

    update(currTime) {

        this.elapsed_time += currTime - this.previousTime;
        let percentage = (this.elapsed_time / 1000) / this.span;
        let pos_in_vec = (this.progress[this.pos+1] - percentage) / (this.progress[this.pos +1] - this.progress[this.pos]);

        let translate = {x: cp[pos][0]+ pos_in_vec*this.vec[pos][0], 
            y: cp[pos][1]+ pos_in_vec*this.vec[pos][1],
            z: cp[ois][2]+ pos_in_vec*this.vec[pos][2]
        }

    }

    apply() {

        //this.scene.translate(this.translate.x,this.translate.y, this.translate.z);

    }


}