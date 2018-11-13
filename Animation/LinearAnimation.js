class LinearAnimation extends Animation {
    constructor(scene, cp = {}, span) {
        super(scene);
        this.cp = cp;
        this.total_dist = 0;
        this.comp = 0;
        this.span = span;
        this.pos = 0;
        this.vector_acumulator
        this.translate = {
            x: 0,
            y: 0,
            z: 0
        }
        this.distance();
        this.rotation = this.rotateAngle(this.vec[this.pos]);
    }

    rotateAngle(vector2) {
        let vecnorm2 = Math.sqrt(vector2[0] * vector2[0] + vector2[2] * vector2[2]);
        
        if (vecnorm2 === 0)
            return 0;

        let angle = Math.acos(vector2[2] / vecnorm2);
        if (vector2[0] < 0)
            angle = -1 * angle;

        return angle;
    }

    distance() {
        this.dist = [];
        this.vec = [];
        this.progress = [0];
        for (let i = 0; i + 1 < this.cp.length; i++) {
            this.vec.push(new Array(3));

            this.vec[i][0] = this.cp[i + 1].xx - this.cp[i].xx;
            this.vec[i][1] = this.cp[i + 1].yy - this.cp[i].yy;
            this.vec[i][2] = this.cp[i + 1].zz - this.cp[i].zz;
            this.dist.push(Math.sqrt(this.vec[i][0] * this.vec[i][0] + this.vec[i][1] * this.vec[i][1] + this.vec[i][2] * this.vec[i][2]));
            this.total_dist += this.dist[i];
        }

        let k = 0;

        for (let value of this.dist) {

            k += value;
            this.progress.push(k / this.total_dist);
        }
    }

    update(currTime) {

        if (this.started && (this.elapsed_time / 1000 < this.span)) {
            super.update(currTime);
            let pos_in_vec = (this.progress[this.pos + 1] - this.percentage) / (this.progress[this.pos + 1] - this.progress[this.pos]);


            this.translate.x = this.cp[this.pos].xx + (1 - pos_in_vec) * this.vec[this.pos][0];
            this.translate.y = this.cp[this.pos].yy + (1 - pos_in_vec) * this.vec[this.pos][1];
            this.translate.z = this.cp[this.pos].zz + (1 - pos_in_vec) * this.vec[this.pos][2];

            if (this.progress[this.pos + 1] <= this.percentage) {
                this.pos++;
                this.rotation = this.rotateAngle(this.vec[this.pos]);

            }

        }



        this.started = true;
        this.previousTime = currTime;

        if (this.elapsed_time / 1000 >= this.span)
            this.end = true;
    }

    apply() {
        console.log(this.rotation * 180 / Math.PI);
        this.scene.translate(this.translate.x, this.translate.y, this.translate.z);

        this.scene.rotate(this.rotation, 0, 1, 0);

    }


}