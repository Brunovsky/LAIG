class LinearAnimation extends Animation {
    constructor(scene, cp = {}, span) {
        super(scene);
        this.cp = cp;
        this.total_dist = 0;
        this.elapsed_time = 0;
        this.previousTime = 0;
        this.span = span;
        this.pos = 0;
        this.translate = {
            x: 0,
            y: 0,
            z: 0
        }
        console.log(this.translate);
        this.distance();
        // this.rotation = this.rotateAngle(this.vec[this.pos]);
    }

    /*rotateAngle(vector1, vector2 = [0, 0, 1]) {
        let vecnorm1 = Math.sqrt(vector1[0] * vector1[0] + vector1[2] * vector1[2]);
        let vecnorm2 = Math.sqrt(vector2[0] * vector2[0] + vector2[2] * vector2[2]);
        let product = vector1[0] * vector2[0] + vector1[1] * vector2[1];
        return Math.acos(product/(vecnorm1*vecnorm2));
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
            this.elapsed_time += currTime - this.previousTime;
            let percentage = (this.elapsed_time / 1000) / this.span;
            let pos_in_vec = (this.progress[this.pos + 1] - percentage) / (this.progress[this.pos + 1] - this.progress[this.pos]);


            this.translate.x = this.cp[this.pos].xx + (1 - pos_in_vec) * this.vec[this.pos][0];
            this.translate.y = this.cp[this.pos].yy + (1 - pos_in_vec) * this.vec[this.pos][1];
            this.translate.z = this.cp[this.pos].zz + (1 - pos_in_vec) * this.vec[this.pos][2];

            if (this.progress[this.pos + 1] <= percentage)
                this.pos++;

            /*if (this.pos > 0) {
                this.rotation = this.rotateAngle(this.vec[this.pos - 1], this.vec[this.pos])
            }*/

        }

        this.started = true;
        this.previousTime = currTime;

        if (this.elapsed_time / 1000 >= this.span)
            this.end = true;
    }

    apply() {

        this.scene.translate(this.translate.x, this.translate.y, this.translate.z);
        //this.scene.rotate(this.rotation, 0, 1, 0);

    }


}