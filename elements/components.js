class XMLTransformationRef extends XMLElement {
	constructor(node, reader) {
		super(node, reader, {id:"ss"});

		this.type = "transformationref";
	}
}

class XMLComponentTransformation extends XMLElement {
	constructor(node, reader) {
		super(node, reader);

		this.type = "transformation";

		let child = node.firstElementChild;

		if (child == null) {
			this.mode = "none";
		} else if (child.tagName == "transformationref") {
			this.mode = "ref";

			this.transf = new XMLTransformationRef(child, reader);

			if (!this.transf.isValid()) {
				this.error = this.transf.error;
				this.errorMessage = this.transf.errorMessage;
				return;
			}
		} else {
			this.mode = "immediate";

			this.transf = new XMLTransformation(node, reader);

			if (!this.transf.isValid()) {
				this.error = this.transf.error;
				this.errorMessage = this.transf.errorMessage;
				return;
			}
		}
	}
}

class XMLComponentRef extends XMLElement {
	constructor(node, reader) {
		super(node, reader, {id:"ss"});

		this.type = "componentref";
	}
}

class XMLPrimitiveRef extends XMLElement {
	constructor(node, reader) {
		super(node, reader, {id:"ss"});

		this.type = "primitiveref";
	}
}

class XMLComponentTexture extends XMLElement {
	constructor(node, reader) {
		super(node, reader, {id:"ss", length_s:"ff", length_t:"ff"});

		this.type = "texture";
	}
}

class XMLMaterialRef extends XMLElement {
	constructor(node, reader) {
		super(node, reader, {id:"ss"});

		this.type = "material";
	}
}

class XMLComponentMaterials extends XMLElement {
	constructor(node, reader) {
		super(node, reader);

		this.type = "materials";

		this.materials = [];
		let children = node.children;

		for (let i = 0; i < children.length; ++i) {
			let child = children[i];
			let material;

			if (child.tagName == "material") {
				material = new XMLMaterialRef(child, reader);
			} else {
				this.error = PARSE_ERROR_BAD_CHILD;
				this.errorMessage = "Unexpected child tagname";
				return;
			}

			if (!material.isValid()) {
				this.error = material.error;
				this.errorMessage = material.errorMessage;
				return;
			}

			this.materials.push(material);
		}
	}
}

class XMLChildren extends XMLElement {
	constructor(node, reader) {
		super(node, reader);

		this.type = "children";

		this.refs = {};
		let children = node.children;

		for (let i = 0; i < children.length; ++i) {
			let child = children[i];
			let ref;

			if (child.tagName == "primitiveref") {
				ref = new XMLPrimitiveRef(child, reader);
			} else if (child.tagName == "componentref") {
				ref = new XMLComponentRef(child, reader);
			} else {
				this.error = PARSE_ERROR_BAD_CHILD;
				this.errorMessage = "Unexpected child tagname";
				return;
			}

			if (!ref.isValid()) {
				this.error = ref.error;
				this.errorMessage = ref.errorMessage;
				return;
			}

			let id = ref.values.id;

			if (this.refs[id] != undefined) {
				this.error = PARSE_ERROR_REPEATED_ID;
				this.errorMessage = "Repeated child id";
				return;
			}

			this.refs[id] = ref;
		}
	}
}

class XMLComponent extends XMLElement {
	constructor(node, reader) {
		super(node, reader);

		this.type = "component";

		if (node.childElementCount != 4) {
			this.error = PARSE_ERROR_MISSING_CHILD;
			this.errorMessage = "Component must have 4 children";
			return;
		}

		let transf = node.querySelector("transformation");
		let materials = node.querySelector("materials");
		let texture = node.querySelector("texture");
		let children = node.querySelector("children");

		if (transf == null || materials == null ||
			texture == null || children == null) {
			this.error = PARSE_ERROR_BAD_CHILD;
			this.errorMessage = "Unexpected component child element";
			return;
		}

		this.transf = new XMLComponentTransformation(transf, reader);
		this.materials = new XMLComponentMaterials(materials, reader);
		this.texture = new XMLComponentTexture(texture, reader);
		this.children = new XMLChildren(children, reader);

		if (!this.transf.isValid()) {
			this.error = this.transf.error;
			this.errorMessage = this.transf.errorMessage;
			return;
		}

		if (!this.materials.isValid()) {
			this.error = this.materials.error;
			this.errorMessage = this.materials.errorMessage;
			return;
		}

		if (!this.texture.isValid()) {
			this.error = this.texture.error;
			this.errorMessage = this.texture.errorMessage;
			return;
		}

		if (!this.children.isValid()) {
			this.error = this.children.error;
			this.errorMessage = this.children.errorMessage;
			return;
		}
	}
}

class XMLComponents extends XMLElement {
	constructor(node, reader) {
		super(node, reader);

		this.type = "components";

		this.components = {};
		let children = node.children;

		for (let i = 0; i < children.length; ++i) {
			let child = children[i];
			let component;

			if (child.tagName == "component") {
				component = new XMLComponent(child, reader);
			} else {
				this.error = PARSE_ERROR_BAD_CHILD;
				this.errorMessage = "Unexpected child tagname";
				return;
			}

			if (!component.isValid()) {
				this.error = component.error;
				this.errorMessage = component.errorMessage;
				return;
			}

			let id = component.values.id;

			if (this.components[id] != undefined) {
				this.error = PARSE_ERROR_REPEATED_ID;
				this.errorMessage = "Repeated child id";
				return;
			}

			this.components[id] = component;
		}
	}
}

// Done, needs testing
