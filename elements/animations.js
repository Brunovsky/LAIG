/**
 * XML Parsing Class
 * Parses yas > animations > linear
 */
class XMLLinear extends XMLOrderedGroup {
    constructor(node) {
        super(node, {
            controlpoint: XMLControlPoint
        }, { id: "ss", span: "pp" }, false);

        this.span = this.data.span;
        this.type = "linear";
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

        this.center = this.data.center;
        this.radius = this.data.radius;
        this.startangle = this.data.startang;
        this.rotangle = this.data.rotang;
        this.span = this.data.span;

        this.type = "circular";
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
