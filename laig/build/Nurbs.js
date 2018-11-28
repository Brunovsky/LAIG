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

        const w = Math.sqrt(2) / 2;

        this.points = [
            [
                [base, 0, 0, 1],
                [top, 0, height, 1]
            ],
            [
                [base, base, 0, w],
                [top, top, height, w]
            ],
            [
                [0, base, 0, 1],
                [0, top, height, 1]
            ],
        ];

        this.surface = new CGFnurbsSurface(2, 1, this.points);
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
        this.controlPoints = [];

        this.buildDisc();
        this.fixingSphere = new ClosedHalfSphere(scene, 0.7, 64, 64);
        this.headTorus = new uvSurface(scene, protoTorus(0.075, 0.80), intervalTorus);
        this.cannon = new Cylinder2(scene, 0.2, 0.2, 9);
        this.tipSphere = new HalfSphere(scene, 0.2);
    }

    buildDisc() {
        const height = 1;
        const radius = 5;

        const w = Math.sqrt(2) / 2;

        const points = [
            [
                [     0,      0, -height, 1],
                [radius,      0, -height, 1],
                [radius,      0,       0, 1],
                [radius,      0,  height, 1],
                [     0,      0,  height, 1]
            ],
            [
                [     0,      0, -height, w],
                [radius, radius, -height, w],
                [radius, radius,       0, w],
                [radius, radius,  height, w],
                [     0,      0,  height, w]
            ],
            [
                [     0,      0, -height, 1],
                [     0, radius, -height, 1],
                [     0, radius,       0, 1],
                [     0, radius,  height, 1],
                [     0,      0,  height, 1]
            ],
        ];

        const surface = new CGFnurbsSurface(2, 4, points);
        this.disc = new CGFnurbsObject(scene, 64, 64, surface);
    }

    display() {
        this.scene.pushMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.fixingSphere.display();
        this.scene.translate(0, 0, 0.1);
        this.headTorus.display();
        this.scene.popMatrix();  

        this.scene.pushMatrix();
        this.cannon.display();
        this.scene.translate(0, 0, 9);
        this.tipSphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.disc.display();
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.disc.display();
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.disc.display();
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.disc.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}

class Terrain extends Plane {

    constructor(scene, texture, heightmap, parts, heightscale) {
        super(scene, parts, parts);

        this.heightscale = heightscale;
        this.texture1 = texture;
        this.texture2 = heightmap;
    }

    setupShader() {
        this.scene.shaders.terrain.setUniformsValues({
            normScale: this.heightscale
        });
        this.texture1.bind(IMAGE_TEXTURE_GL_N);
        this.texture2.bind(HEIGHTMAP_TEXTURE_GL_N);
    }

    display() {
        this.scene.setActiveShader(this.scene.shaders.terrain);
        this.setupShader();
        super.display(); 
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}

class Water extends Plane
{
    constructor(scene, texture, wavemap, parts, heightscale, texscale)
    {
        super(scene, parts, parts);
        this.texture = texture;
        this.wavemap = wavemap;
        this.parts = parts;
        this.heightscale = heightscale;
        this.texscale = texscale;
    }

    setupShader()
    {
        this.scene.shaders.water.setUniformsValues({
            normScale: this.heightscale,
            texScale: this.texscale
        });
        this.texture.bind(IMAGE_TEXTURE_GL_N);
        this.wavemap.bind(HEIGHTMAP_TEXTURE_GL_N);
    }

    display()
    {
        this.scene.setActiveShader(this.scene.shaders.water);
        this.setupShader();
        super.display();
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}
