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

        if (this.data.from.x == this.data.to.x
         && this.data.from.y == this.data.to.y
         && this.data.from.z == this.data.to.z) {
            throw new XMLEception(node, "from = to");
        }
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
