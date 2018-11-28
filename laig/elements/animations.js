/**
 * XML Parsing Class
 * Parses yas > animations > linear
 */
class XMLLinear extends XMLOrderedGroup {
    constructor(node) {
        super(node, {
            controlpoint: XMLControlPoint
        }, { id: "ss", span: "pp" }, false);

        this.type = "linear";

        this.span = this.data.span;
        this.points = this.elements;
    }
}

/**
 * XML Parsing Class
 * Parses yas > animations > circular
 */
class XMLCircular extends XMLElement {
    constructor(node) {
        super(node, {
            id: "ss", span: "pp", center: "ff ff ff",
            radius: "ff", startang: "ff", rotang: "ff"
        });

        this.type = "circular";

        this.span = this.data.span;
        this.center = this.data.center;
        this.radius = this.data.radius;
        this.startang = this.data.startang;
        this.rotang = this.data.rotang;
    }
}

/**
 * XML Parsing Class
 * Parses yas > animations
 */
class XMLAnimations extends XMLGroup {
    constructor(node) {
        super(node, {
            linear: XMLLinear,
            circular: XMLCircular
        }, {}, XML_ANIMATIONS_NONEMPTY);

        this.type = "animations";
    }
}
