class XMLTexture extends XMLElement {
	constructor(node) {
		super(node, { id:"ss" , file: "ss" });

		this.type = "texture";
	}
}

class XMLTextures extends XMLGroup {
	constructor(node) {
		super(node, {
			texture: XMLTexture
		});

		this.type = "textures";
	}
}

// Done, needs testing
