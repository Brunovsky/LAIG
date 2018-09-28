class XMLTransformationRef extends XMLElement {
	constructor(node) {
		super(node, {id:"ss"});

		this.type = "transformationref";
	}
}

class XMLImmediateTransformation extends XMLElement {
	constructor(node) {
		super(node);

		this.type = "transformation";

		let tags = {
			translate: {fun:XMLTranslate},
			rotate:    {fun:XMLRotate},
			scale:     {fun:XMLScale}
		};

		this.elements = [];

		for (let i = 0; i < node.children.length; ++i) {
			let child = node.children[i];
			let name = child.tagName;

			if (!name in tags) {
				throw new XMLException(child, "Unexpected tagname " + name);
			}

			let fun = tags[name].fun;

			this.elements.push(new fun(child));
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
		} else if (child.tagName == "transformationref") {
			this.mode = "ref";
			this.transf = new XMLTransformationRef(child);
		} else {
			this.mode = "immediate";
			this.transf = new XMLImmediateTransformation(node);
		}
	}
}

class XMLComponentRef extends XMLElement {
	constructor(node) {
		super(node, {id:"ss"});

		this.type = "componentref";
	}
}

class XMLPrimitiveRef extends XMLElement {
	constructor(node) {
		super(node, {id:"ss"});

		this.type = "primitiveref";
	}
}

class XMLMaterialRef extends XMLElement {
	constructor(node) {
		super(node, {id:"ss"});

		this.type = "material";
	}
}

class XMLComponentTexture extends XMLElement {
	constructor(node) {
		super(node, {id:"ss", length_s:"ff", length_t:"ff"});

		this.type = "texture";
	}
}

class XMLComponentMaterials extends XMLGroup {
	constructor(node) {
		super(node, {
			material: {fun:XMLMaterialRef}
		});

		this.type = "materials";
	}
}

class XMLChildren extends XMLGroup {
	constructor(node) {
		super(node, {
			primitiveref: {fun:XMLPrimitiveRef},
			componentref: {fun:XMLComponentRef}
		});

		this.type = "children";
	}
}

class XMLComponent extends XMLElement {
	constructor(node) {
		super(node, {id:"ss"});

		this.type = "component";

		let tags = ["transformation", "materials", "texture", "children"];

		if (node.childElementCount != 4) {
			throw new XMLException(node, "Component node does not have the expected 4 children");
		}

		for (let i = 0; i < 4; ++i) {
			let child = node.children[i];
			if (tags[i] != child.tagName) {
				throw new XMLException(child, "Expected tagname " + tags[i]);
			}
		}

		this.transf = new XMLComponentTransformation(node.children[0]);
		this.materials = new XMLComponentMaterials(node.children[1]);
		this.texture = new XMLComponentTexture(node.children[2]);
		this.children = new XMLChildren(node.children[3]);
	}
}

class XMLComponents extends XMLGroup {
	constructor(node) {
		super(node, {
			component: {fun:XMLComponent}
		});

		this.type = "components";
	}
}

// Done, needs testing
