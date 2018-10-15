/**
 * 2. Spacial Primitives
 */

// ClosedCone
class XMLCone extends XMLElement {
    constructor(node) {
        super(node, {
            radius: "pp", height: "pp", stacks: "ii", slices: "ii"
        });

        this.type = "cone";
    }
}

// ClosedPyramid
class XMLPyramid extends XMLElement {
    constructor(node) {
        super(node, {
            radius: "pp", height: "pp", stacks: "ii", sides: "ii"
        });

        this.type = "pyramid";
    }
}

// ClosedCutCone
class XMLCylinder extends XMLElement {
    constructor(node) {
        super(node, {
            base: "pp", top: "p0", height:"pp", slices:"ii", stacks:"ii"
        });

        this.type = "cylinder";
    }
}

// ClosedCutPyramid
class XMLPrism extends XMLElement {
    constructor(node) {
        super(node, {
            base: "pp", top: "pp", height: "pp", stacks: "ii", sides: "ii"
        });

        this.type = "prism";
    }
}

// Cube
class XMLCube extends XMLElement {
    constructor(node) {
        super(node, {
            side: "pp"
        });

        this.type = "cube";
    }
}

// Block
class XMLBlock extends XMLElement {
    constructor(node) {
        super(node, {
            x: "pp", y: "pp", z: "pp"
        });

        this.type = "block";
    }
}

// Sphere
class XMLSphere extends XMLElement {
    constructor(node) {
        super(node, {
            radius: "pp", slices: "ii", stacks: "ii"
        });

        this.type = "sphere";
    }
}

// ClosedHalfSphere
class XMLHalfSphere extends XMLElement {
    constructor(node) {
        super(node, {
            radius: "pp", stacks: "ii", slices: "ii"
        });

        this.type = "halfsphere";
    }
}

// Cone
class XMLOpenCone extends XMLElement {
    constructor(node) {
        super(node, {
            radius: "pp", height: "pp", stacks: "ii", slices: "ii"
        });

        this.type = "opencone";
    }
}

// DoubleCone
class XMLDoubleCone extends XMLElement {
    constructor(node) {
        super(node, {
            radius: "pp", height: "pp", stacks: "ii", slices: "ii"
        });

        this.type = "doublecone";
    }
}

// SpheredCone
class XMLSpheredCone extends XMLElement {
    constructor(node) {
        super(node, {
            radius: "pp", height: "pp", stacks: "ii", slices: "ii"
        });

        this.type = "spheredcone";
    }
}

// Pyramid
class XMLOpenPyramid extends XMLElement {
    constructor(node) {
        super(node, {
            radius: "pp", height: "pp", stacks: "ii", sides: "ii"
        });

        this.type = "openpyramid";
    }
}

// DoublePyramid
class XMLDoublePyramid extends XMLElement {
    constructor(node) {
        super(node, {
            radius: "pp", height: "pp", stacks: "ii", sides: "ii"
        });

        this.type = "doublepyramid";
    }
}

// CutCone
class XMLOpenCylinder extends XMLElement {
    constructor(node) {
        super(node, {
            base: "pp", top: "pp", height: "pp", stacks: "ii", slices: "ii"
        });

        this.type = "opencylinder";
    }
}

// DoubleCutCone
class XMLDoubleCylinder extends XMLElement {
    constructor(node) {
        super(node, {
            base: "pp", top: "pp", height: "pp", stacks: "ii", slices: "ii"
        });

        this.type = "doublecylinder";
    }
}

// SpheredCutCone
class XMLSpheredCylinder extends XMLElement {
    constructor(node) {
        super(node, {
            base: "pp", top: "pp", height: "pp", stacks: "ii", slices: "ii"
        });

        this.type = "spheredcylinder";
    }
}

// CutPyramid
class XMLOpenPrism extends XMLElement {
    constructor(node) {
        super(node, {
            base: "pp", top: "pp", height: "pp", stacks: "ii", sides: "ii"
        });

        this.type = "openprism";
    }
}

// DoubleCutPyramid
class XMLDoublePrism extends XMLElement {
    constructor(node) {
        super(node, {
            base: "pp", top: "pp", height: "pp", stacks: "ii", sides: "ii"
        });

        this.type = "doubleprism";
    }
}

// HalfSphere
class XMLOpenHalfSphere extends XMLElement {
    constructor(node) {
        super(node, {
            radius: "pp", stacks: "ii", slices: "ii"
        });

        this.type = "openhalfsphere";
    }
}

// FlipSphere
class XMLFlipSphere extends XMLElement {
    constructor(node) {
        super(node, {
            radius: "pp", stacks: "ii", slices: "ii"
        });

        this.type = "flipsphere";
    }
}
