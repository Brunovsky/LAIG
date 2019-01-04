/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > board
 */
class XMLBoard extends XMLElement {
    constructor(node) {
        super(node, {
            idtexture: "ss", vertOffset: "pp", horOffset: "pp", size: "ii"
        });

        this.type = "board";
    }
}

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > piece
 */
class XMLPiece extends XMLElement {
    constructor(node) {
        super(node, {
            color: "ss"
        });

        this.type = "piece";
    }
}

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > bowl
 */
class XMLBowl extends XMLElement {
    constructor(node) {
        super(node, {
            color: "ss"
        });

        this.type = "bowl";
    }
}
