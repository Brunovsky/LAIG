class Animation {
    constructor(scene, span) {
        this.scene = scene;
        this.span = span;
        this.percentage = 0;

        this.reset();
    }

    update(currTime) {
        this.time.stamp = currTime;
        this.time.begin = this.time.begin || currTime;
        this.time.elapsed = this.time.stamp - this.time.begin;

        this.percentage = (this.time.elapsed / 1000) / this.span;
        if (this.percentage >= 1.0) this.percentage = 1.0;

        return 
    }

    apply() {}

    reset() {
        this.time = {
            begin: 0,
            stamp: 0,
            elapsed: 0
        };
    }

    hasEnded() {
        return this.percentage === 1.0;
    }
}

class LinearAnimation extends Animation {
    constructor(scene, span, controlPoints) {
        super(scene, span);

        if (controlPoints.length === 0) throw "INTERNAL: Empty control points";
        
        // Repeat the control point if the list is singular
        if (controlPoints.length === 1) {
            controlPoints = [controlPoints[0], controlPoints[0]];
        }

        this.cp = controlPoints;
        this.computeProgress();

        // Status
        this.translate = {x: this.cp[0].x, y: this.cp[0].y, z: this.cp[0].z};
        this.rotation = this.rotateAngle(this.vec[0]);
    }

    computeProgress() {
        const dist = [];
        const progress = [0];
        const vec = [];

        const length = this.cp.length - 1;

        for (let i = 0; i < length; ++i) {
            const x0 = this.cp[i].x, x1 = this.cp[i + 1].x;
            const y0 = this.cp[i].y, y1 = this.cp[i + 1].y;
            const z0 = this.cp[i].z, z1 = this.cp[i + 1].z;

            const dX = x1 - x0, dY = y1 - y0, dZ = z1 - z0;
            const norm = Math.hypot(dX, dY, dZ);

            vec.push({x: dX, y: dY, z: dZ});
            dist.push(norm);
        }

        const totalDist = dist.reduce((a, b) => a + b, 0);

        if (totalDist === 0) {
            for (let i = 0; i < length; ++i) {
                progress.push((i + 1) / length);
            }
        } else {
            let k = 0;

            for (let i = 0; i < length; ++i) {
                k += dist[i];
                progress.push(k / totalDist);
            }
        }

        this.progress = progress;
        this.vec = vec;
    }

    rotateAngle(vec) {
        let norm = Math.hypot(vec.x, vec.z);
        if (norm === 0) return 0;

        let angle = Math.sign(vec.x) * Math.acos(vec.z / norm);

        return angle;
    }

    update(currTime) {
        super.update(currTime);

        // Load variables
        const cp = this.cp, vec = this.vec, progress = this.progress;
        const percentage = this.percentage;

        // Find the progress index
        let p = 0;
        while (p < progress.length && progress[p + 1] < percentage) ++p;

        // Compute p -> p+1 coefficient
        const coef = (percentage - progress[p]) / (progress[p + 1] - progress[p]);

        // Refresh status
        this.translate.x = cp[p].x + coef * vec[p].x;
        this.translate.y = cp[p].y + coef * vec[p].y;
        this.translate.z = cp[p].z + coef * vec[p].z;
        this.rotation = this.rotateAngle(vec[p]);
    }

    apply() {
        super.apply();

        this.scene.translate(this.translate.x, this.translate.y, this.translate.z);
        this.scene.rotate(this.rotation, 0, 1, 0);
    }
}

class CircularAnimation extends Animation {
    constructor(scene, span, center, radius, startang, rotang) {
        super(scene, span);

        this.center = center;
        this.radius = radius;
        this.startang = startang;
        this.rotang = rotang;

        // Status
        this.rotation = this.startang;
    }

    update(currTime) {
        super.update(currTime);

        this.rotation = this.startang + this.rotang * this.percentage;
    }

    apply() {
        super.apply();

        if (CIRCULAR_ROTATION_RULE === "right") {
            this.scene.translate(this.center.x, this.center.y, this.center.z);
            this.scene.rotate(this.rotation, 0, -1, 0);
            this.scene.translate(this.radius, 0, 0);
        }
        else if (CIRCULAR_ROTATION_RULE === "left") {
            this.scene.translate(this.center.x, this.center.y, this.center.z);
            this.scene.rotate(this.rotation, 0, 1, 0);
            this.scene.translate(this.radius, 0, 0);
            this.scene.rotate(Math.PI, 0, 1, 0);
        }
    }
}
