/**
 * XML Parsing Class
 * Parses yas > textures > texture
 */
class XMLTexture extends XMLElement {
    constructor(node) {
        super(node, { id:"ss" , file: "ss" });

        this.type = "texture";
    }
}

/**
 * XML Parsing Class
 * Parses yas > textures
 */
class XMLTextures extends XMLGroup {
    constructor(node) {
        super(node, {
            texture: XMLTexture
        });

        this.type = "textures";
    }
}
