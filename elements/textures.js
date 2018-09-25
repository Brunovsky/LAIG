class XMLTexture extends XMLElement {
	constructor(node, reader) {
		super(node, reader, {
			id:"ss", file:"ss"
		});

		this.type = "texture";
	}
}

class XMLTextures extends XMLElement {
	constructor(node, reader) {
		super(node, reader);

		this.type = "textures";

		this.textures = {};
		let children = node.children;

		for (let i = 0; i < children.length; ++i) {
			let child = children[i];
			let texture;

			if (child.tagName == "texture") {
				texture = new XMLTexture(child, reader);
			} else {
				this.errorCode = XMLERROR_BAD_CHILD;
				this.errorMessage = "Unexpected child tagname";
				return;
			}

			if (!texture.valid()) {
				this.errorCode = texture.errorCode;
				this.errorMessage = "texture : " + texture.errorMessage;
				return;
			}

			let id = texture.values.id;

			if (this.textures[id] != undefined) {
				this.errorCode = XMLERROR_REPEATED_ID;
				this.errorMessage = "Repeated child id";
				return;
			}

			this.textures[id] = texture;
		}
	}
}

// Done, needs testing
