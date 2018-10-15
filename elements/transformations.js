class XMLTranslate extends XMLElement {
    constructor(node) {
        super(node, {
            x: "ff", y: "ff", z: "ff"
        });

        this.type = "translate";
    }
}

class XMLRotate extends XMLElement {
    constructor(node) {
        super(node, {
            axis: "cc", angle: "ff"
        });

        this.type = "rotate";
    }
}

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

class XMLTransformations extends XMLGroup {
    constructor(node) {
        super(node, {
            transformation: XMLTransformation
        });

        this.type = "transformations";
    }
}
