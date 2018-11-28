/**
 * 4. Surface Primitives
 */

class XMLTorus extends XMLElement {
    constructor(node) {
        super(node, {
            inner: "pp", outer: "pp", slices: "ii", loops: "ii"
        });

        this.type = "torus";
    }
}

class XMLEightSurface extends XMLElement {
    constructor(node) {
        super(node, {
            slices: "ii", stacks: "ii"
        });

        this.type = "eight";
    }
}

class XMLAstroidal extends XMLElement {
    constructor(node) {
        super(node, {
            slices: "ii", stacks: "ii"
        });

        this.type = "astroidal";
    }
}

class XMLKissSurface extends XMLElement {
    constructor(node) {
        super(node, {
            slices: "ii", stacks: "ii"
        });

        this.type = "kiss";
    }
}

class XMLBohemianDome extends XMLElement {
    constructor(node) {
        super(node, {
            a: "pp", b: "pp", c: "pp",
            slices: "ii", stacks: "ii"
        });

        this.type = "bohemiandome";
    }
}

class XMLCrossedTrough extends XMLElement {
    constructor(node) {
        super(node, {
            slices: "ii", stacks: "ii"
        });

        this.type = "crossedtrough";
    }
}

class XMLSineSurface extends XMLElement {
    constructor(node) {
        super(node, {
            slices: "ii", stacks: "ii"
        });

        this.type = "sine";
    }
}

class XMLCayleySurface extends XMLElement {
    constructor(node) {
        super(node, {
            slices: "ii", stacks: "ii"
        });

        this.type = "cayley";
    }
}

class XMLMobiusStrip extends XMLElement {
    constructor(node) {
        super(node, {
            slices: "ii", stacks: "ii"
        });

        this.type = "mobius";
    }
}

class XMLEllipticHyperboloid extends XMLElement {
    constructor(node) {
        super(node, {
            slices: "ii", stacks: "ii"
        });

        this.type = "elliptichyperboloid";
    }
}

class XMLCrossCap extends XMLElement {
    constructor(node) {
        super(node, {
            slices: "ii", stacks: "ii"
        });

        this.type = "crosscap";
    }
}

class XMLCrossCap2 extends XMLElement {
    constructor(node) {
        super(node, {
            slices: "ii", stacks: "ii"
        });

        this.type = "crosscap2";
    }
}

class XMLCornucopia extends XMLElement {
    constructor(node) {
        super(node, {
            a: "pp", b: "pp",
            slices: "ii", stacks: "ii"
        });

        this.type = "cornucopia";
    }
}

class XMLHennebergMinimal extends XMLElement {
    constructor(node) {
        super(node, {
            slices: "ii", stacks: "ii"
        });

        this.type = "henneberg";
    }
}

class XMLRomanSurface extends XMLElement {
    constructor(node) {
        super(node, {
            slices: "ii", stacks: "ii"
        });

        this.type = "roman";
    }
}

class XMLCorkscrew extends XMLElement {
    constructor(node) {
        super(node, {
            a: "pp", b: "pp",
            slices: "ii", stacks: "ii"
        });

        this.type = "corkscrew";
    }
}

class XMLKleinBottle extends XMLElement {
    constructor(node) {
        super(node, {
            slices: "ii", stacks: "ii"
        });

        this.type = "kleinbottle";
    }
}

class XMLKleinBottle2 extends XMLElement {
    constructor(node) {
        super(node, {
            slices: "ii", stacks: "ii"
        });

        this.type = "kleinbottle2";
    }
}
