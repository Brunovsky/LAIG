/**
 * XML Parsing Class
 * Parses yas > views > perspective
 */
class XMLPerspective extends XMLElement {
    constructor(node) {
        super(node, {
            id: "ss", near: "ff", far: "ff", angle: "ff",
            from: { x: "ff", y: "ff", z: "ff" },
            to: { x: "ff", y: "ff", z: "ff" }
        });

        this.type = "perspective";

        const data = this.data, from = data.from, to = data.to;

        if (from.x === to.x && from.y === to.y && from.z === to.z) {
            throw new XMLException(node, "Position and target must differ");
        }

        if (data.near >= data.far) {
            throw new XMLException(node, "Bad near/far clipping planes");
        }

        this.from = data.from;
        this.to = data.to;
        this.angle = data.angle;
    }
}

/**
 * XML Parsing Class
 * Parses yas > views > ortho
 */
class XMLOrtho extends XMLElement {
    constructor(node) {
        super(node, {
            id: "ss", near: "ff", far: "ff",
            left: "ff", right: "ff", top: "ff", bottom: "ff",
            from: { x: "ff", y: "ff", z: "ff" },
            to: { x: "ff", y: "ff", z: "ff" }
        });

        this.type = "ortho";

        const data = this.data, from = data.from, to = data.to;

        if (from.x === to.x && from.y === to.y && from.z === to.z) {
            throw new XMLException(node, "Position and target must differ");
        }

        if (data.left === data.right) {
            throw new XMLException(node, "Left and right must differ");
        }

        if (data.top === data.bottom) {
            throw new XMLException(node, "Top and bottom must differ");
        }

        if (data.near >= data.far) {
            throw new XMLException(node, "Bad near/far clipping planes");
        }

        this.from = data.from;
        this.to = data.to;
    }
}

/**
 * XML Parsing Class
 * Parses yas > views > omni
 */
class XMLViews extends XMLGroup {
    constructor(node) {
        super(node, {
            perspective: XMLPerspective,
            ortho: XMLOrtho
        }, { default: "ss" });

        this.type = "views";
    }
}
