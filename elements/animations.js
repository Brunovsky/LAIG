/**
 * XML Parsing Class
 * Parses * > controlpoint
 */
class XMLControlPoint extends XMLElement {
    constructor(node) {
        super(node, {
            xx: "ff", yy: "ff", zz: "ff"
        });

        this.type = "controlpoint";
    }
}

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
    }
}

/**
 * XML Parsing Class
 * Parses yas > animations > circular
 */
class XMLCircular extends XMLElement {
    constructor(node) {
        super(node, {
            id: "ss", span: "pp", center="ff ff ff",
            radius: "ff", startang: "ff", rotang: "ff"
        });

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
        }, {}, false);

        this.type = "animations";
    }
}
