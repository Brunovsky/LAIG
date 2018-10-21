/**
 * XML Parsing Class
 * Parses yas > scene
 */
class XMLScene extends XMLElement {
    constructor(node) {
        super(node, { root: "ss", axis_length: "p0" });

        this.type = "scene";
    }
}
