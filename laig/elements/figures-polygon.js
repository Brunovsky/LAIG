/**
 * 1. Planar Polygon Primitives
 */

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > square
 */
class XMLSquare extends XMLElement {
    constructor(node) {
        super(node, {
            side: "pp"
        });

        this.type = "square";
    }
}

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > regular
 */
class XMLRegular extends XMLElement {
    constructor(node) {
        super(node, {
            radius: "pp", sides: "ii"
        });

        this.type = "regular";
    }
}

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > circle
 */
class XMLCircle extends XMLElement {
    constructor(node) {
        super(node, {
            radius: "pp", slices: "ii"
        });

        this.type = "circle";
    }
}

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > triangle
 */
class XMLTriangle extends XMLElement {
    constructor(node) {
        super(node, {
            x1: "ff", y1: "ff", z1: "ff",
            x2: "ff", y2: "ff", z2: "ff",
            x3: "ff", y3: "ff", z3: "ff"
        });

        this.type = "triangle";
    }
}

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > rectangle
 */
class XMLRectangle extends XMLElement {
    constructor(node) {
        super(node, {
            x1: "ff", y1: "ff", x2: "ff", y2: "ff"
        });

        this.type = "rectangle";
    }
}

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > trapezium
 */
class XMLTrapezium extends XMLElement {
    constructor(node) {
        super(node, {
            base: "pp", top: "pp", height: "pp"
        });

        this.type = "trapezium";
    }
}
