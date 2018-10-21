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
class XMLTransformation extends XMLElement {
    constructor(node) {
        super(node, { id: "ss" });

        this.type = "transformation";

        const tags = {
            translate: XMLTranslate,
            rotate: XMLRotate,
            scale: XMLScale
        };

        this.elements = [];

        for (const child of node.children) {
            const name = child.tagName.toLocaleLowerCase();

            if (!(name in tags)) {
                throw new XMLException(child, "Unexpected tagname " + name);
            }

            this.elements.push(new tags[name](child));
        }
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
