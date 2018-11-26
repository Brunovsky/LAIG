class Plane extends CGFobject {
    constructor(scene, uDivs, vDivs) {
        super(scene);
        const points = [
            [
                [-0.5, 0, -0.5, 1],
                [0.5, 0, -0.5, 1]
            ],
            [
                [-0.5, 0, 0.5, 1],
                [0.5, 0, 0.5, 1]
            ]
        ];
        this.divs = { u: uDivs, v: vDivs };
        this.points = points;

        this.surface = new CGFnurbsSurface(1, 1, this.points);
        this.nurbs = new CGFnurbsObject(scene, uDivs, vDivs, this.surface);
    }

    display() {
        this.scene.pushMatrix(); // yes, superfluous
        this.nurbs.display();
        this.scene.popMatrix();
    }
}

class Patch extends CGFobject {
    constructor(scene, uDivs, vDivs, points) {
        super(scene);
        const uDegree = points.length - 1;
        const vDegree = points[0].length - 1;
        this.divs = { u: uDivs, v: vDivs };
        this.deg = { u: uDegree, v: vDegree };
        this.points = points;

        this.surface = new CGFnurbsSurface(uDegree, vDegree, points);
        this.nurbs = new CGFnurbsObject(scene, uDivs, vDivs, this.surface);
    }

    display() {
        this.scene.pushMatrix(); // yes, superfluous
        this.nurbs.display();
        this.scene.popMatrix();
    }
}

class Cylinder2 extends CGFobject {
    constructor(scene, base = 1, top = 0.5, height = 1, slices = 64, stacks = 1) {
        super(scene);
        this.slices = Math.floor((slices + 3) / 4);
        this.stacks = stacks;
        this.base = base;
        this.top = top;
        this.height = height;

        const points = [
            [
                [base, 0, 0, 1],
                [top, 0, height, 1]
            ],
            [
                [base, base, 0, Math.sqrt(2) / 2],
                [top, top, height, Math.sqrt(2) / 2]
            ],
            [
                [0, base, 0, 1],
                [0, top, height, 1]
            ],
        ];
        /*
        const points = [
            [
                [0, base, 0, 1],
                [base, base, 0, Math.sqrt(2) / 2],
                [base, 0, 0, 1]
            ],
            [
                [0, top, height, 1],
                [top, top, height, Math.sqrt(2) / 2],
                [top, 0, height, 1]
            ],
        ];
        */

        this.surface = new CGFnurbsSurface(2, 1, points);
        this.nurbs = new CGFnurbsObject(scene, this.slices, stacks, this.surface);
    }

    display() {
        this.scene.pushMatrix();
        this.nurbs.display();
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.nurbs.display();
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.nurbs.display();
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.nurbs.display();
        this.scene.popMatrix();
    }
}

class Vehicle extends CGFobject {

    constructor(scene) {
        super(scene);
        this.scene = scene;
        let raio = 5;
        this.incr = Math.PI * 2 / 72;
        this.controlPoints = [];

        for (let i = 0; i < 72; i++) {
            let a = Math.sin(i * this.incr) * raio;
            let b = Math.cos(i * this.incr) * raio;
            let point1 = [a, 0, b, 1];
            let point2 = [a, 1, b, 1];

            let point = [point1, point2];
            this.controlPoints.push(point);

        }


        this.nurb = new Patch(scene, 12, 12, this.controlPoints);
    }

    display() {

        this.nurb.display();
    }

}