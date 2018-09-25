var PARSE_ERROR_BAD_ATTRIBUTE = 0x01;
var PARSE_ERROR_MISSING_ATTRIBUTE = 0x02;
var PARSE_ERROR_BAD_CHILD = 0x04;
var PARSE_ERROR_MISSING_CHILD = 0x08;
var PARSE_ERROR_REPEATED_ID = 0x16;
var PARSE_ERROR_BAD_TAGNAME = 0x32;

class XMLBase {
	constructor(node, reader) {
		this.node = node;
		this.reader = reader;
		this.values = {};

		this.error = 0;
		this.errorMessage = "";
	}

	isValid() {
		return this.error == 0;
	}

	errorMessage() {
		return this.errorMessage;
	}
}

class XMLElement extends XMLBase {
	constructor(node, reader, attr = {}) {
		super(node, reader);

		for (const key in attr) {
			let val;

			switch (typeof attr[key]) {
			case "string":
				{
					if (!reader.hasAttribute(node, key)) {
						this.error = PARSE_ERROR_MISSING_ATTRIBUTE;
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
							this.error = PARSE_ERROR_BAD_ATTRIBUTE;
							this.errorMessage = "Bad integer " + key;
							return;
						}
						break;
					case 'ff':
						val = reader.getFloat(node, key);
						if (val == null || isNaN(val)) {
							this.error = PARSE_ERROR_BAD_ATTRIBUTE;
							this.errorMessage = "Bad float " + key;
							return;
						}
						break;
					case 'cc':
						val = reader.getItem(node, key, ["x", "y", "z"]);
						if (val == null) {
							this.error = PARSE_ERROR_BAD_ATTRIBUTE;
							this.errorMessage = "Bad coordinate " + key;
							return;
						}
						break;
					case 'tt':
						val = reader.getItem(node, key, ["0", "1"]);
						if (val == null) {
							this.error = PARSE_ERROR_BAD_ATTRIBUTE;
							this.errorMessage = "Bad coordinate " + key;
							return;
						} else {
							val = val == "0" ? false : true;
						}
						break;
					default:
						throw "Bad Element attribute descriptor";
					}

					this.values[key] = val;
				}
				break;

			case "object":
				{
					let child = node.querySelector(key);

					if (child == null) {
						this.error = PARSE_ERROR_MISSING_CHILD;
						this.error = "Missing child " + key;
						return;
					}

					let element = new XMLElement(child, reader, attr[key]);

					val = element.values;

					if (!element.isValid()) {
						this.error = element.error;
						this.errorMessage = element.errorMessage;
						return;
					}
				}
				break;

			default:
				throw "Bad Element attribute typeof value";
			}

			this.values[key] = val;
		}
	}
}

class XMLYas extends XMLBase {
	constructor(node, reader) {
		super(node, reader);

		this.type = "yas";

		if (node.tagName != "yas") {
			window.NODE = node;
			this.error = PARSE_ERROR_BAD_TAGNAME;
			this.errorMessage = "Root node does not have tagname 'yas'";
			return;
		}

		// Children: scene, views, ambient, lights, textures, materials,
		// transformations, primitives, components.

		if (node.childElementCount != 9) {
			this.error = PARSE_ERROR_MISSING_CHILD;
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
			this.error = PARSE_ERROR_BAD_CHILD;
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

		if (!this.scene.isValid()) {
			this.error = this.scene.error;
			this.errorMessage = this.scene.errorMessage;
			return;
		}

		if (!this.views.isValid()) {
			this.error = this.views.error;
			this.errorMessage = this.views.errorMessage;
			return;
		}

		if (!this.ambient.isValid()) {
			this.error = this.ambient.error;
			this.errorMessage = this.ambient.errorMessage;
			return;
		}

		if (!this.lights.isValid()) {
			this.error = this.lights.error;
			this.errorMessage = this.lights.errorMessage;
			return;
		}

		if (!this.textures.isValid()) {
			this.error = this.textures.error;
			this.errorMessage = this.textures.errorMessage;
			return;
		}

		if (!this.materials.isValid()) {
			this.error = this.materials.error;
			this.errorMessage = this.materials.errorMessage;
			return;
		}

		if (!this.transformations.isValid()) {
			this.error = this.transformations.error;
			this.errorMessage = this.transformations.errorMessage;
			return;
		}

		if (!this.primitives.isValid()) {
			this.error = this.primitives.error;
			this.errorMessage = this.primitives.errorMessage;
			return;
		}

		if (!this.components.isValid()) {
			this.error = this.components.error;
			this.errorMessage = this.components.errorMessage;
			return;
		}
	}
}

// This needs refactoring BAD lol...
