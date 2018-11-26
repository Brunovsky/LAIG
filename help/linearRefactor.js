class LinearAnimation extends Animation {
    constructor(scene, cp, span) {
        super(scene);
        this.cp = cp;
        this.span = span;
        this.pos = 0;
        this.translate = {
            x: this.cp[0].x,
            y: this.cp[0].y,
            z: this.cp[0].z
        };
        this.distance();

        console.groupCollapsed("Linear");
        console.log("Control Points", cp);
        console.log("Span", span);
        console.log("Progress", this.progress);
        console.log("Vec", this.vec);
        console.log("Dist", this.dist);
        console.groupEnd();
    }

    rotateAngle(vec) {
        let norm = Math.sqrt(vec.x * vec.x + vec.z * vec.z);
        if (norm === 0)
            return 0;
        let angle = Math.acos(vec[2] / norm);
        if (vec.x < 0)
            angle = -1 * angle;

        return angle;
    }

    distance() {
        this.dist = [];
        this.vec = [];
        this.progress = [0];
        
        let totalDist = 0;

        for (let i = 0; i + 1 < this.cp.length; i++) {
            let x = this.cp[i + 1].x - this.cp[i].x,
                y = this.cp[i + 1].y - this.cp[i].y,
                z = this.cp[i + 1].z - this.cp[i].z;

            this.vec.push({x: x, y: y, z: z});

            const norm = Math.sqrt(x * x + y * y + z * z);
            
            this.dist.push(norm);
            totalDist += norm;
        }

        if (totalDist === 0) {
            for (let i = 1; i <= this.vec.length; ++i) {
                this.progress.push(i / this.vec.length);
            }
        } else {
            let accumulator = 0;
                
            for (let value of this.dist) {
                accumulator += value;
                this.progress.push(accumulator / totalDist);
            }
        }
    }

    update(currTime) {
        super.update(currTime);

        const perc = this.percentage, prog = this.progress;

        while (!this.end && prog[this.pos + 1] <= perc) ++this.pos;

        const pos = this.pos;

        let coef = (prog[pos + 1] - perc) / (prog[pos + 1] - prog[pos]);

        this.translate.x = this.cp[pos].x + (1 - coef) * this.vec[pos].x;
        this.translate.y = this.cp[pos].y + (1 - coef) * this.vec[pos].y;
        this.translate.z = this.cp[pos].z + (1 - coef) * this.vec[pos].z;
        this.rotation = this.rotateAngle(this.vec[pos]);

        return this.end;
    }

    apply() {
        this.scene.translate(this.translate.x, this.translate.y, this.translate.z);
        this.scene.rotate(this.rotation, 0, 1, 0);
    }
}
