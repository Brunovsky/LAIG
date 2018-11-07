/**
 * XML Parsing Class
 * Parses yas > transformations > transformation > translate
 */
class XMLTranslate extends XMLElement {
    constructor(node) {
        super(node, {
            x: "ff", y: "ff", z: "ff"
        });

        this.type = "translate";
    }
}

/**
 * XML Parsing Class
 * Parses yas > transformations > transformation > rotate
 */
class XMLRotate extends XMLElement {
    constructor(node) {
        super(node, {
            axis: "cc", angle: "ff"
        });

        this.type = "rotate";
    }
}

/**
 * XML Parsing Class
 * Parses yas > transformations > transformation > scale
 */
class XMLScale extends XMLElement {
    constructor(node) {
        super(node, {
            x: "ff", y: "ff", z: "ff"
        });

        this.type = "scale";

        if (this.data.x == 0 || this.data.y == 0 || this.data.z == 0) {
            throw new XMLException(node, "Invalid scale parameters (x, y or z = 0)");
        }
    }
}

/**
 * XML Parsing Class
 * Parses yas > transformations > transformation
 */
class XMLTransformation extends XMLOrderedGroup {
    constructor(node) {
        super(node, {
            translate: XMLTranslate,
            rotate: XMLRotate,
            scale: XMLScale
        },{ id: "ss" });

        this.type = "transformation";
    }
}

/**
 * XML Parsing Class
 * Parses yas > transformations
 */
class XMLTransformations extends XMLGroup {
    constructor(node) {
        super(node, {
            transformation: XMLTransformation
        });

        this.type = "transformations";
    }
}
