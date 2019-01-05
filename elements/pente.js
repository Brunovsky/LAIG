/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > board
 */
class XMLBoard extends XMLElement {
    constructor(node) {
        super(node, {
            idtexture: "ss", leftOffset: "pp", rightOffset: "pp", topOffset: "pp",
            botOffset: "pp", size: "ii"
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
        super(node, {});

        this.type = "piece";
    }
}

/**
 * XML Parsing Class
 * Parses yas > primitives > primitive > bowl
 */
class XMLBowl extends XMLElement {
    constructor(node) {
        super(node, {});

        this.type = "bowl";
    }
}
