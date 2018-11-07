class Plane extends CGFobject
{
    constructor(scene, uDivs, vDivs)
    {
        super(scene);
        const points = [
            [
                [-0.5, 0, -0.5, 1],
                [ 0.5, 0, -0.5, 1]
            ],
            [
                [-0.5, 0,  0.5, 1],
                [ 0.5, 0,  0.5, 1]
            ]
        ];
        this.divs = {u: uDivs, v: vDivs};
        this.points = points;

        this.surface = new CGFnurbsSurface(1, 1, points);
        this.nurbs = new CGFnurbsObject(scene, uDivs, vDivs, points);
    }

    display()
    {
        this.scene.pushMatrix(); // yes, superfluous
            this.patch.display();
        this.scene.popMatrix();
    }
}

class Patch extends CGFobject
{
    constructor(scene, uDivs, vDivs, points)
    {
        super(scene);
        const uDegree = points.length - 1;
        const vDegree = points[0].length - 1;
        this.divs = {u: uDivs, v: vDivs};
        this.deg = {u: uDegree, v: vDegree};
        this.points = points;

        this.surface = new CGFnurbsSurface(uDegree, vDegree, points);
        this.nurbs = new CGFnurbsObject(scene, uDivs, vDivs, this.surface);
    }

    display()
    {
        this.scene.pushMatrix(); // yes, superfluous
            this.nurbs.display();
        this.scene.popMatrix();
    }
}

class Cylinder2 extends CGFobject
{
    constructor(scene, radius = 1, height = 1, slices = 64, stacks = 1)
    {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.height = height;
        this.buildPoints();

        this.surface = new CGFnurbsSurface(5, stacks, this.points);
        this.nurbs = new CGFnurbsObject(slices, stacks, this.surface);
    }

    buildPoints()
    {
        const sin = Math.sin, cos = Math.cos, PI = Math.PI;
        const slices = this.slices, stacks = this.stacks,
            radius = this.radius, height = this.height;

        const stackHeight = height / stacks;

        const cosines = [], sines = [];
        for (let i = 0; i < 6; ++i) {
            cosines.push(radius * cos(-i * (PI / 3)));
            sines.push(radius * sin(-i * (PI / 3)));
        }

        const X = [
            cosines[0], 2 * cosines[1],
            cosines[2], 2 * cosines[3],
            cosines[4], 2 * cosines[5]
        ];

        const Z = [
            sines[0], 2 * sines[1],
            sines[2], 2 * sines[3],
            sines[4], 2 * sines[5]
        ];

        //                   X  1
        //                .. .
        //         2   ..    .
        //           X       .
        //        ..         X  0
        // 3   ..            .
        //   X __            .
        //        -- X __    .
        //          4     -- X  5

        const points = [];

        for (let s = 0; s <= stacks; ++s) { // stack
            const Y = s * stackHeight;

            const stack = [];
            for (let i = 0; i < 6; ++i) {
                stack.push(X[i], Y, Z[i]);
            }

            points.push(stack);
        }

        this.points = points;
    }

    display()
    {
        this.scene.pushMatrix();
            this.nurbs.display();
        this.scene.popMatrix();
    }
}
