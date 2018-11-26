/**
 * 5. Composite Planar Primitives
 */

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > plane
 */
class XMLPlane extends XMLElement {
    constructor(node) {
        super(node, {
            npartsU: "ii", npartsV: "ii"
        });

        this.type = "plane";

        if (!(this.data.npartsU > 1) || !(this.data.npartsV > 1)) {
            throw new XMLException(node, "Plane division parts must be greater than 1");
        }
    }
}

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > patch
 */
class XMLPatch extends XMLOrderedGroup {
    constructor(node) {
        super(node, {
            controlpoint: XMLControlPoint
        },{
            npointsU: "ii", npointsV: "ii",
            npartsU: "ii", npartsV: "ii"
        });

        const expectedCP = this.data.npointsU * this.data.npointsV;
        const lengthCP = this.elements.length;

        if (lengthCP !== expectedCP) {
            throw new XMLException(node, "Expected patch with "
                + expectedCP + " control points, got " + lengthCP);
        }

        this.buildCPmatrix();

        this.type = "patch";
    }

    buildCPmatrix() {
        this.points = [];

        for (let i = 0; i < this.data.npointsU; ++i) {
            const row = [];

            for (let j = 0; j < this.data.npointsV; ++j) {
                const s = i * this.data.npointsV + j;
                const el = this.elements[s];
                const cp = [el.x, el.y, el.z, el.w || 1];
                row.push(cp);
            }

            this.points.push(row);
        }
    }
}

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > vehicle
 */
class XMLVehicle extends XMLElement {
    constructor(node) {
        super(node, {});

        this.type = "vehicle";
    }
}

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > cylinder2
 */
class XMLCylinder2 extends XMLElement {
    constructor(node) {
        super(node, {
            base: "pp", top: "p0", height: "pp", slices: "ii", stacks: "ii"
        });

        this.type = "cylinder2";
    }
}

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > terrain
 */
class XMLTerrain extends XMLElement {
    constructor(node) {
        super(node, {
            idtexture: "ss", idheightmap: "ss",
            parts: "ii", heightscale: "ff"
        });

        this.type = "terrain";
    }
}

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > water
 */
class XMLWater extends XMLElement {
    constructor(node) {
        super(node, {
            idtexture: "ss", idwavemap: "ss",
            parts: "ii", heightscale: "ff", texscale: "ff"
        });

        this.type = "water";
    }
}
