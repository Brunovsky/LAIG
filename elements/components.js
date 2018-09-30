class XMLTransformationRef extends XMLElement {
	constructor(node) {
		super(node, { id: "ss" });

		this.type = "transformationref";
	}
}

class XMLImmediateTransformation extends XMLElement {
	constructor(node) {
		super(node);

		this.type = "transformation";

		let tags = {
			translate: XMLTranslate,
			rotate: XMLRotate,
			scale: XMLScale
		};

		this.elements = [];

		for (let child of node.children) {
			let name = child.tagName.toLocaleLowerCase();

			if (!(name in tags)) {
				throw new XMLException(child, "Unexpected tagname " + name);
			}

			this.elements.push(new tags[name](child));
		}
	}
}

class XMLComponentTransformation extends XMLElement {
	constructor(node) {
		super(node);

		this.type = "transformation";

		let child = node.firstElementChild;

		if (child == null) {
			this.mode = "none";
		} else {
			let name = child.tagName.toLocaleLowerCase();
			
			if (name == "transformationref") {
				this.mode = "reference";
				this.transf = new XMLTransformationRef(child);
				this.id = this.transf.id;
			} else {
				this.mode = "immediate";
				this.transf = new XMLImmediateTransformation(node);
			}
		}
	}
}

class XMLComponentRef extends XMLElement {
	constructor(node) {
		super(node, { id: "ss" });

		this.type = "componentref";
	}
}

class XMLPrimitiveRef extends XMLElement {
	constructor(node) {
		super(node, { id: "ss" });

		this.type = "primitiveref";
	}
}

class XMLMaterialRef extends XMLElement {
	constructor(node) {
		super(node, { id: "ss" });

		this.type = "material";
	}
}

class XMLComponentTexture extends XMLElement {
	constructor(node) {
		super(node, { id: "ss", length_s: "pp", length_t: "pp" });

		this.type = "texture";
	}
}

class XMLComponentMaterials extends XMLElement {
	constructor(node) {
		super(node);

		this.type = "transformation";

		let tags = {
			material: XMLMaterialRef
		};

		this.elements = [];

		for (let i = 0; i < node.children.length; ++i) {
			let child = node.children[i];
			let name = child.tagName.toLocaleLowerCase();

			if (!(name in tags)) {
				throw new XMLException(child, "Unexpected tagname " + name);
			}

			this.elements.push(new tags[name](child));
		}
	}
}

class XMLChildren extends XMLGroup {
	constructor(node) {
		super(node, {
			primitiveref: XMLPrimitiveRef,
			componentref: XMLComponentRef
		});

		this.type = "children";
	}
}

class XMLComponent extends XMLElement {
	constructor(node) {
		super(node, { id: "ss" });

		this.type = "component";

		let tags = ["transformation", "materials", "texture", "children"];

		if (node.childElementCount != 4) {
			throw new XMLException(node, "Component node does not have the expected 4 children");
		}

		for (let i = 0; i < 4; ++i) {
			let child = node.children[i];
			let name = child.tagName.toLocaleLowerCase();
			if (tags[i] != name) {
				throw new XMLException(child, "Expected tagname " + tags[i]);
			}
		}

		this.transformation = new XMLComponentTransformation(node.children[0]);
		this.materials = new XMLComponentMaterials(node.children[1]);
		this.texture = new XMLComponentTexture(node.children[2]);
		this.children = new XMLChildren(node.children[3]);
	}
}

class XMLComponents extends XMLGroup {
	constructor(node) {
		super(node, {
			component: XMLComponent
		});

		this.type = "components";
	}
}

// Done, needs testing
