class XMLBase {
	constructor(node) {
		this.node = node;
	}
}

/**
 * An exception of the YAS specification found in the XML structure.
 */
class XMLException extends XMLBase {
	constructor(node, message) {
		super(node);
		this.message = message;

		do {
			this.message = node.tagName + " > " + this.message;
			node = node.parentNode;
		} while (node.parentNode != null);
	}

	error() {
		return this.message;
	}

	source() {
		return this.node;
	}
}


/**
 * Represents a leaf element of the XML structure, with a fixed set
 * of expected and mandatory attributes and children (recursively).
 *
 * The expected attributes, their types, and the expected children
 * are represented in constructor argument spec. See classes like
 * XMLAmbient for example uses.
 */
class XMLElement extends XMLBase {
	constructor(node, spec = {}) {
		super(node);
		this.data = {};

		const reader = new CGFXMLreader();

		for (const key in spec) {
			let val;

			if (typeof spec[key] == "string") {
				if (!reader.hasAttribute(node, key)) {
					throw new XMLException(node, "Missing attribute " + key);
				}

				switch (spec[key]) {
				case 'ss':
					val = reader.getString(node, key);
					break;
				case 'ii':
					val = reader.getInteger(node, key);
					if (val == null) {
						throw new XMLException(node, "Expected integer for attribute " + key);
					}
					break;
				case 'ff':
					val = reader.getFloat(node, key);
					if (val == null || isNaN(val)) {
						throw new XMLException(node, "Expected float for attribute " + key);
					}
					break;
				case 'cc':
					val = reader.getItem(node, key, ["x", "y", "z"]);
					if (val == null) {
						throw new XMLException(node, "Expected coordinate for attribute " + key);
					}
					break;
				case 'tt':
					val = reader.getItem(node, key, ["0", "1"]);
					if (val == null) {
						throw new XMLException(node, "Expected boolean for attribute " + key);
					} else {
						val = val == "0" ? false : true;
					}
					break;
				default:
					throw "INTERNAL: Bad Element attribute descriptor";
				}
			} else if (typeof spec[key] == "object") {
				// Recurse on a child of node with tagname key.
				let child = node.querySelector(key);

				if (child == null) {
					throw new XMLException(node, "Missing expected child node " + key);
				}

				// Do not catch possible exception.
				let element = new XMLElement(child, spec[key]);
				val = element.data;
			}

			this.data[key] = val;
		}
	}
}

/**
 * An ordered group of XMLElement.
 *
 * If the group has no duplicates, then the elements have ids.
 * 
 * The ids are unique in the group, and these XMLElement
 * may only have one of the tags specified in the argument tags.
 */
class XMLGroup extends XMLBase {
	constructor(node, tags) {
		super(node);
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

		let ids = this.elements.map(x => x.data.id);
		let dups = ids.duplicates();

		if (!dups.empty()) {
			throw new XMLException(node, "Duplicate IDs found (" + dups[0] + ")");
		}
	}
}

class XMLYas extends XMLBase {
	constructor(node) {
		super(node);

		this.type = "yas";

		if (node.tagName != "yas") {
			throw new XMLException(node, "Root node does not have tagname 'yas'");
		}

		let tags = ["scene", "views", "ambient", "lights", "textures",
			"materials", "transformations", "primitives", "components"];

		if (node.childElementCount != 9) {
			throw new XMLException(node, "Root node does not have the expected 9 children");
		}

		for (let i = 0; i < 9; ++i) {
			let child = node.children[i];
			if (tags[i] != child.tagName) {
				throw new XMLException(child, "Expected tagname " + tags[i]);
			}
		}

		this.scene = new XMLScene(node.children[0]);
		this.views = new XMLViews(node.children[1]);
		this.ambient = new XMLAmbient(node.children[2]);
		this.lights = new XMLLights(node.children[3]);
		this.textures = new XMLTextures(node.children[4]);
		this.materials = new XMLMaterials(node.children[5]);
		this.transformations = new XMLTransformations(node.children[6]);
		this.primitives = new XMLPrimitives(node.children[7]);
		this.components = new XMLComponents(node.children[8]);
	}
}
