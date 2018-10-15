/**
 * 3. Complex Planar Primitives
 */
class XMLHeart extends XMLElement {
    constructor(node) {
        super(node, {
            samples: "ii"
        });

        this.type = "heart";
    }
}

class XMLButterfly extends XMLElement {
    constructor(node) {
        super(node, {
            samples: "ii"
        });

        this.type = "butterfly";
    }
}

class XMLFolium extends XMLElement {
    constructor(node) {
        super(node, {
            a: "pp", b: "p0", samples: "ii"
        });

        this.type = "folium";
    }
}

class XMLHypocycloid extends XMLElement {
    constructor(node) {
        super(node, {
            a: "pp", b: "pp", samples: "ii"
        });

        this.type = "hypocycloid";
    }
}
