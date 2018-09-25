class XMLMaterial extends XMLElement {
	constructor(node, reader) {
		super(node, reader, {
			id:"ss", shininess:"ff",
			emission: {r:"ff", g:"ff", b:"ff", a:"ff"},
			ambient: {r:"ff", g:"ff", b:"ff", a:"ff"},
			diffuse: {r:"ff", g:"ff", b:"ff", a:"ff"},
			specular: {r:"ff", g:"ff", b:"ff", a:"ff"}
		});

		this.type = "material";
	}
}

class XMLMaterials extends XMLElement {
	constructor(node, reader) {
		super(node, reader);

		this.type = "materials";

		this.materials = {};
		let children = node.children;

		for (let i = 0; i < children.length; ++i) {
			let child = children[i];
			let material;

			if (child.tagName == "material") {
				material = new XMLMaterial(child, reader);
			} else {
				this.errorCode = XMLERROR_BAD_CHILD;
				this.errorMessage = "Unexpected child tagname";
				return;
			}

			if (!material.valid()) {
				this.errorCode = material.errorCode;
				this.errorMessage = "material : " + material.errorMessage;
				return;
			}

			let id = material.values.id;

			if (this.materials[id] != undefined) {
				this.errorCode = XMLERROR_REPEATED_ID;
				this.errorMessage = "Repeated child id";
				return;
			}

			this.materials[id] = material;
		}
	}
}

// Done, needs testing
