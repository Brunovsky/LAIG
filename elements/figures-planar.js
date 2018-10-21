/**
 * 3. Complex Planar Primitives
 */

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > heart
 */
class XMLHeart extends XMLElement {
    constructor(node) {
        super(node, {
            samples: "ii"
        });

        this.type = "heart";
    }
}

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > butterfly
 */
class XMLButterfly extends XMLElement {
    constructor(node) {
        super(node, {
            samples: "ii"
        });

        this.type = "butterfly";
    }
}

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > folium
 */
class XMLFolium extends XMLElement {
    constructor(node) {
        super(node, {
            a: "pp", b: "p0", samples: "ii"
        });

        this.type = "folium";
    }
}

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > hypocycloid
 */
class XMLHypocycloid extends XMLElement {
    constructor(node) {
        super(node, {
            a: "pp", b: "pp", samples: "ii"
        });

        this.type = "hypocycloid";
    }
}
