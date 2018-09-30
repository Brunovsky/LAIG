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
			let name = node.tagName.toLocaleLowerCase();
			this.message = name + " > " + this.message;
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
					case "ss":
						val = reader.getString(node, key);
						break;
					case "ii":
						val = reader.getInteger(node, key);
						if (val == null && val <= 0) {
							throw new XMLException(node, "Expected positive integer for attribute " + key);
						}
						break;
					case "ff":
						val = reader.getFloat(node, key);
						if (val == null || isNaN(val)) {
							throw new XMLException(node, "Expected float for attribute " + key);
						}
						break;
					case "p0":
						val = reader.getFloat(node, key);
						if (val == null || isNaN(val) || val < 0) {
							throw new XMLException(node, "Expected nonnegative float for attribute " + key);
						}
						break;
					case "pp":
						val = reader.getFloat(node, key);
						if (val == null || isNaN(val) || val <= 0) {
							throw new XMLException(node, "Expected positive float for attribute " + key);
						}
						break;
					case "rr":
						val = reader.getFloat(node, key);
						if (val == null || isNaN(val) || val < 0 || val > 1) {
							throw new XMLException(node, "Expected [0,1] float for attribute " + key);
						}
						break;
					case "cc":
						val = reader.getItem(node, key, ['x', 'y', 'z']);
						if (val == null) {
							throw new XMLException(node, "Expected coordinate for attribute " + key);
						}
						break;
					case "tt":
						val = reader.getItem(node, key, ['0', '1']);
						if (val == null) {
							throw new XMLException(node, "Expected boolean for attribute " + key);
						} else {
							val = val == '0' ? false : true;
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

		// For convenience: lift the id from data.
		if (this.data.id != null) {
			this.id = this.data.id;
		}
	}

	get(attr) {
		return data[attr];
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
class XMLGroup extends XMLElement {
	constructor(node, tags, attr = {}, nonEmpty = true) {
		super(node, attr);
		this.elements = {};

		if (nonEmpty && node.childElementCount === 0) {
			throw new XMLException(node, "Group node must have at least one child");
		}

		for (let child of node.children) {
			let name = child.tagName.toLocaleLowerCase();

			if (!(name in tags)) {
				throw new XMLException(child, "Unexpected tagname " + name);
			}

			let element = new tags[name](child);
			let id = element.id;

			if (id == null) {
				throw "INTERNAL: attr for XMLGroup does not demand child id";
			}

			if (id in this.elements) {
				throw new XMLException(child, "Repeated id: " + id);
			}

			this.elements[id] = element;
		}
	}

	get(id) {
		return this.elements[id];
	}
}
