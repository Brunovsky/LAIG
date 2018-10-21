/**
 * 2. Spacial Primitives
 */

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > cone
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

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > pyramid
 */
// ClosedPyramid
class XMLPyramid extends XMLElement {
    constructor(node) {
        super(node, {
            radius: "pp", height: "pp", stacks: "ii", sides: "ii"
        });

        this.type = "pyramid";
    }
}

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > cylinder
 */
// ClosedCutCone
class XMLCylinder extends XMLElement {
    constructor(node) {
        super(node, {
            base: "pp", top: "p0", height:"pp", slices:"ii", stacks:"ii"
        });

        this.type = "cylinder";
    }
}

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > prism
 */
// ClosedCutPyramid
class XMLPrism extends XMLElement {
    constructor(node) {
        super(node, {
            base: "pp", top: "pp", height: "pp", stacks: "ii", sides: "ii"
        });

        this.type = "prism";
    }
}

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > cube
 */
// Cube
class XMLCube extends XMLElement {
    constructor(node) {
        super(node, {
            side: "pp"
        });

        this.type = "cube";
    }
}

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > block
 */
// Block
class XMLBlock extends XMLElement {
    constructor(node) {
        super(node, {
            x: "pp", y: "pp", z: "pp"
        });

        this.type = "block";
    }
}

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > sphere
 */
// Sphere
class XMLSphere extends XMLElement {
    constructor(node) {
        super(node, {
            radius: "pp", slices: "ii", stacks: "ii"
        });

        this.type = "sphere";
    }
}

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > halfsphere
 */
// ClosedHalfSphere
class XMLHalfSphere extends XMLElement {
    constructor(node) {
        super(node, {
            radius: "pp", stacks: "ii", slices: "ii"
        });

        this.type = "halfsphere";
    }
}

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > opencone
 */
// Cone
class XMLOpenCone extends XMLElement {
    constructor(node) {
        super(node, {
            radius: "pp", height: "pp", stacks: "ii", slices: "ii"
        });

        this.type = "opencone";
    }
}

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > doublecone
 */
// DoubleCone
class XMLDoubleCone extends XMLElement {
    constructor(node) {
        super(node, {
            radius: "pp", height: "pp", stacks: "ii", slices: "ii"
        });

        this.type = "doublecone";
    }
}

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > spheredcone
 */
// SpheredCone
class XMLSpheredCone extends XMLElement {
    constructor(node) {
        super(node, {
            radius: "pp", height: "pp", stacks: "ii", slices: "ii"
        });

        this.type = "spheredcone";
    }
}

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > openpyramid
 */
// Pyramid
class XMLOpenPyramid extends XMLElement {
    constructor(node) {
        super(node, {
            radius: "pp", height: "pp", stacks: "ii", sides: "ii"
        });

        this.type = "openpyramid";
    }
}

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > doublepyramid
 */
// DoublePyramid
class XMLDoublePyramid extends XMLElement {
    constructor(node) {
        super(node, {
            radius: "pp", height: "pp", stacks: "ii", sides: "ii"
        });

        this.type = "doublepyramid";
    }
}

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > opencylinder
 */
// CutCone
class XMLOpenCylinder extends XMLElement {
    constructor(node) {
        super(node, {
            base: "pp", top: "pp", height: "pp", stacks: "ii", slices: "ii"
        });

        this.type = "opencylinder";
    }
}

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > doublecylinder
 */
// DoubleCutCone
class XMLDoubleCylinder extends XMLElement {
    constructor(node) {
        super(node, {
            base: "pp", top: "pp", height: "pp", stacks: "ii", slices: "ii"
        });

        this.type = "doublecylinder";
    }
}

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > spheredcylinder
 */
// SpheredCutCone
class XMLSpheredCylinder extends XMLElement {
    constructor(node) {
        super(node, {
            base: "pp", top: "pp", height: "pp", stacks: "ii", slices: "ii"
        });

        this.type = "spheredcylinder";
    }
}

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > openprism
 */
// CutPyramid
class XMLOpenPrism extends XMLElement {
    constructor(node) {
        super(node, {
            base: "pp", top: "pp", height: "pp", stacks: "ii", sides: "ii"
        });

        this.type = "openprism";
    }
}

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > doubleprism
 */
// DoubleCutPyramid
class XMLDoublePrism extends XMLElement {
    constructor(node) {
        super(node, {
            base: "pp", top: "pp", height: "pp", stacks: "ii", sides: "ii"
        });

        this.type = "doubleprism";
    }
}

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > openhalfsphere
 */
// HalfSphere
class XMLOpenHalfSphere extends XMLElement {
    constructor(node) {
        super(node, {
            radius: "pp", stacks: "ii", slices: "ii"
        });

        this.type = "openhalfsphere";
    }
}

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > flipsphere
 */
// FlipSphere
class XMLFlipSphere extends XMLElement {
    constructor(node) {
        super(node, {
            radius: "pp", stacks: "ii", slices: "ii"
        });

        this.type = "flipsphere";
    }
}
