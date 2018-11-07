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

        this.surface = new CGFnurbsSurface(1, 1, this.points);
        this.nurbs = new CGFnurbsObject(scene, uDivs, vDivs, this.surface);
    }

    display()
    {
        this.scene.pushMatrix(); // yes, superfluous
            this.nurbs.display();
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
    constructor(scene, baseRadius = 1, topRadius = 0.5, height = 1, slices = 64, stacks = 1)
    {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.baseRadius = baseRadius;
        this.topRadius = topRadius;
        this.height = height;
        this.buildPoints();

        this.surface = new CGFnurbsSurface(5, stacks, this.points);
        this.nurbs = new CGFnurbsObject(slices, stacks, this.surface);
    }

    buildPoints()
    {
        const sin = Math.sin, cos = Math.cos, PI = Math.PI;
        const baseRadius = this.baseRadius, topRadius = this.topRadius,
            height = this.height, slices = this.slices, stacks = this.stacks;

        const stackHeight = height / stacks;
        const radius = baseRadius - topRadius;

        const cosines = [], sines = [];

        for (let i = 0; i < 6; ++i) {
            const dist = 1 + (i % 2);
            cosines.push(dist * cos(-i * (PI / 3)));
            sines.push(dist * sin(-i * (PI / 3)));
        }

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
            const sradius = baseRadius * (1 - s / stacks)
                + topRadius * s / stacks;

            const stack = [];
            for (let i = 0; i < 6; ++i) {
                const w = 2 - (i % 2);
                stack.push(sradius * cosines[i], Y, sradius * sines[i], w);
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
