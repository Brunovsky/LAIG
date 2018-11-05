class Plane extends CGFobject {
    constructor(scene, uDivs, vDivs, controlPoints)
    {
        super(scene);
        this.uDivs = uDivs;
        this.vDivs = vDivs;
        this.points = controlPoints;
        this.initBuffers();
    }

    initBuffers()
    {
        const uDivs = this.uDivs, vDivs = this.vDivs,
            points = this.controlPoints;

        const uDelta = (b.maxU - b.minU) / slices;
        const vDelta = (b.maxV - b.minV) / stacks;

        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        // j = 5  . . . . . .
        // j = 4  . . . . . .
        // j = 3  . . . . . .   V
        // j = 2  . . . . . .   ^
        // j = 1  . . . . . .   |
        // j = 0  . . . . . .   ---> U
        //    i = 0 1 2 3 4 5

        for (let j = 0; j <= stacks; ++j) { // iterate V
            for (let i = 0; i <= slices; ++i) { // iterate U
                let U = b.minU + uDelta * i;
                let V = b.minV + vDelta * j;
                let Point = uvSampleFunction(uvfunction, U, V, uDelta, vDelta);

                // Up
                this.vertices.push(Point.X, Point.Y, Point.Z);
                this.normals.push(Point.N.X, Point.N.Y, Point.N.Z);

                // Down
                this.vertices.push(Point.X, Point.Y, Point.Z);
                this.normals.push(-Point.N.X, -Point.N.Y, -Point.N.Z);

                // Texture Up, Down
                let tex = coordsMap(U, V, b);
                this.texCoords.push(tex.U, tex.V); // Up
                this.texCoords.push(tex.U, tex.V); // Down
            }
        }

        for (let j = 0; j < stacks; ++j) { // iterate Y (line)
            for (let i = 0; i < slices; ++i) { // iterate X (column)
                let above = 2 * slices + 2;
                let next = 2, right = 2;

                let line = j * above;
                let current = next * i + line;

                // ... v4U v4D      v3U v3D ... --- line x + 1
                // 
                // ... v1U v1D      v2U v2D ... --- line x
                let v1U = current;
                let v2U = current + right;
                let v3U = current + right + above;
                let v4U = current + above;
                let v1D = 1 + v1U;
                let v2D = 1 + v2U;
                let v3D = 1 + v3U;
                let v4D = 1 + v4U;

                this.indices.push(v1U, v2U, v3U);
                this.indices.push(v1U, v3U, v4U);
                
                this.indices.push(v1D, v3D, v2D);
                this.indices.push(v1D, v4D, v3D);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display()
    {

    }
}