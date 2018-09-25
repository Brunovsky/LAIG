// An element's attribute is present but the value is invalid.
var XMLERROR_BAD_ATTRIBUTE = 0x01;

// An element's attribute is missing.
var XMLERROR_MISSING_ATTRIBUTE = 0x02;

// An element's child has an unexpected tag or the number of such children is unexpected.
var XMLERROR_BAD_CHILD = 0x04;

// An element does not have an expected or required child.
var XMLERROR_MISSING_CHILD = 0x08;

// Two elements in the same group have the same id.
var XMLERROR_REPEATED_ID = 0x16;

// An element has an unexpected tagname.
var XMLERROR_BAD_TAGNAME = 0x32;

class XMLBase {
	constructor(node, reader) {
		this.node = node;
		this.reader = reader;

		this.values = {};

		this.errorCode = 0;
		this.errorMessage = "";
	}

	valid() {
		return this.errorCode == 0;
	}

	error() {
		return this.errorMessage;
	}
}

class XMLElement extends XMLBase {
	constructor(node, reader, attr = {}) {
		super(node, reader);

		for (const key in attr) {
			let val;

			if (typeof attr[key] == "string") {
				if (!reader.hasAttribute(node, key)) {
					this.errorCode = XMLERROR_MISSING_ATTRIBUTE;
					this.errorMessage = "Missing attribute " + key;
					return;
				}

				switch (attr[key]) {
				case 'ss':
					val = reader.getString(node, key);
					break;
				case 'ii':
					val = reader.getInteger(node, key);
					if (val == null) {
						this.errorCode = XMLERROR_BAD_ATTRIBUTE;
						this.errorMessage = "Expected integer for key " + key;
						return;
					}
					break;
				case 'ff':
					val = reader.getFloat(node, key);
					if (val == null || isNaN(val)) {
						this.errorCode = XMLERROR_BAD_ATTRIBUTE;
						this.errorMessage = "Expected float for key " + key;
						return;
					}
					break;
				case 'cc':
					val = reader.getItem(node, key, ["x", "y", "z"]);
					if (val == null) {
						this.errorCode = XMLERROR_BAD_ATTRIBUTE;
						this.errorMessage = "Expected coordinate for key " + key;
						return;
					}
					break;
				case 'tt':
					val = reader.getItem(node, key, ["0", "1"]);
					if (val == null) {
						this.errorCode = XMLERROR_BAD_ATTRIBUTE;
						this.errorMessage = "Expected boolean for key " + key;
						return;
					} else {
						val = val == "0" ? false : true;
					}
					break;
				default:
					throw "Bad Element attribute descriptor";
				}
			} else if (typeof attr[key] == "object") {
				let child = node.querySelector(key);

				if (child == null) {
					this.errorCode = XMLERROR_MISSING_CHILD;
					this.errorMessage = "Missing child " + key;
					return;
				}

				let element = new XMLElement(child, reader, attr[key]);

				val = element.values;

				if (!element.valid()) {
					this.errorCode = element.errorCode;
					this.errorMessage = key + " : " + element.errorMessage;
					return;
				}
			}

			this.values[key] = val;
		}
	}
}

class XMLYas extends XMLBase {
	constructor(node, reader) {
		super(node, reader);

		if (node.tagName != "yas") {
			this.errorCode = XMLERROR_BAD_TAGNAME;
			this.errorMessage = "Root node does not have expected tagname 'yas'";
			return;
		}

		// Expected Children:
		// scene
		// views
		// ambient
		// lights
		// textures
		// materials
		// transformations
		// primitives
		// components

		if (node.childElementCount != 9) {
			this.errorCode = XMLERROR_MISSING_CHILD;
			this.errorMessage = "Root node 'yas' does not have 9 children";
			return;
		}

		let sceneNode = node.children[0];
		let viewsNode = node.children[1];
		let ambientNode = node.children[2];
		let lightsNode = node.children[3];
		let texturesNode = node.children[4];
		let materialsNode = node.children[5];
		let transfNode = node.children[6];
		let primitivesNode = node.children[7];
		let componentsNode = node.children[8];

		if (sceneNode.tagName != "scene"
		 || viewsNode.tagName != "views"
		 || ambientNode.tagName != "ambient"
		 || lightsNode.tagName != "lights"
		 || texturesNode.tagName != "textures"
		 || materialsNode.tagName != "materials"
		 || transfNode.tagName != "transformations"
		 || primitivesNode.tagName != "primitives"
		 || componentsNode.tagName != "components") {
			this.errorCode = XMLERROR_BAD_CHILD;
			this.errorMessage = "Root node 'yas' has invalid direct children";
			return;
		}

		this.scene = new XMLScene(sceneNode, reader);
		this.views = new XMLViews(viewsNode, reader);
		this.ambient = new XMLAmbient(ambientNode, reader);
		this.lights = new XMLLights(lightsNode, reader);
		this.textures = new XMLTextures(texturesNode, reader);
		this.materials = new XMLMaterials(materialsNode, reader);
		this.transformations = new XMLTransformations(transfNode, reader);
		this.primitives = new XMLPrimitives(primitivesNode, reader);
		this.components = new XMLComponents(componentsNode, reader);

		if (!this.scene.valid()) {
			this.errorCode = this.scene.errorCode;
			this.errorMessage = "scene : " + this.scene.errorMessage;
			return;
		}

		if (!this.views.valid()) {
			this.errorCode = this.views.errorCode;
			this.errorMessage = "views : " + this.views.errorMessage;
			return;
		}

		if (!this.ambient.valid()) {
			this.errorCode = this.ambient.errorCode;
			this.errorMessage = "ambient : " + this.ambient.errorMessage;
			return;
		}

		if (!this.lights.valid()) {
			this.errorCode = this.lights.errorCode;
			this.errorMessage = "lights : " + this.lights.errorMessage;
			return;
		}

		if (!this.textures.valid()) {
			this.errorCode = this.textures.errorCode;
			this.errorMessage = "textures : " + this.textures.errorMessage;
			return;
		}

		if (!this.materials.valid()) {
			this.errorCode = this.materials.errorCode;
			this.errorMessage = "materials : " + this.materials.errorMessage;
			return;
		}

		if (!this.transformations.valid()) {
			this.errorCode = this.transformations.errorCode;
			this.errorMessage = "transformations : " + this.transformations.errorMessage;
			return;
		}

		if (!this.primitives.valid()) {
			this.errorCode = this.primitives.errorCode;
			this.errorMessage = "primitives : " + this.primitives.errorMessage;
			return;
		}

		if (!this.components.valid()) {
			this.errorCode = this.components.errorCode;
			this.errorMessage = "components : " + this.components.errorMessage;
			return;
		}
	}
}

// This needs refactoring BAD lol...
