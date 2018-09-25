class XMLRectangle extends XMLElement {
	constructor(node, reader) {
		super(node, reader, {
			x1:"ff", y1:"ff", x2:"ff", y2:"ff"
		});

		this.type = "rectangle";
	}
}

class XMLTriangle extends XMLElement {
	constructor(node, reader) {
		super(node, reader, {
			x1:"ff", y1:"ff", z1:"ff",
			x2:"ff", y2:"ff", z2:"ff",
			x3:"ff", y3:"ff", z3:"ff"
		});

		this.type = "triangle";
	}
}

class XMLCylinder extends XMLElement {
	constructor(node, reader) {
		super(node, reader, {
			base:"ff", top:"ff", height:"ff", slices:"ii", stacks:"ii"
		});

		this.type = "cylinder";
	}
}

class XMLSphere extends XMLElement {
	constructor(node, reader) {
		super(node, reader, {
			radius:"ff", slices:"ii", stacks:"ii"
		});

		this.type = "sphere";
	}
}

class XMLTorus extends XMLElement {
	constructor(node, reader) {
		super(node, reader, {
			inner:"ff", outer:"ff", slices:"ii", loops:"ii"
		});

		this.type = "torus";
	}
}

class XMLPrimitive extends XMLElement {
	constructor(node, reader) {
		super(node, reader);

		this.type = "primitive";

		if (node.childElementCount != 1) {
			this.error = PARSE_ERROR_MISSING_CHILD;
			this.errorMessage = "Primitive must have exactly one child";
			return;
		}

		let child = node.firstElementChild;

		switch (child.tagName) {
		case "rectangle":
			this.figure = new XMLRectangle(child, reader);
			break;
		case "triangle":
			this.figure = new XMLTriangle(child, reader);
			break;
		case "cylinder":
			this.figure = new XMLCylinder(child, reader);
			break;
		case "sphere":
			this.figure = new XMLSphere(child, reader);
			break;
		case "torus":
			this.figure = new XMLTorus(child, reader);
			break;
		default:
			this.error = PARSE_ERROR_BAD_CHILD;
			this.errorMessage = "Primitive name not recognized";
			return;
		}

		if (!this.figure.isValid()) {
			this.error = this.figure.error;
			this.errorMessage = this.figure.errorMessage;
			return;
		}
	}
}

class XMLPrimitives extends XMLElement {
	constructor(node, reader) {
		super(node, reader);

		this.type = "primitives";

		this.primitives = {};
		let children = node.children;

		for (let i = 0; i < children.length; ++i) {
			let child = children[i];
			let primitive;

			if (child.tagName == "primitive") {
				primitive = new XMLPrimitive(child, reader);
			} else {
				this.error = PARSE_ERROR_BAD_CHILD;
				this.errorMessage = "Unexpected child tagname";
				return;
			}

			if (!primitive.isValid()) {
				this.error = primitive.error;
				this.errorMessage = primitive.errorMessage;
				return;
			}

			let id = primitive.values.id;

			if (this.primitives[id] != undefined) {
				this.error = PARSE_ERROR_REPEATED_ID;
				this.errorMessage = "Repeated child id";
				return;
			}

			this.primitives[id] = primitive;
		}
	}
}

// Done, needs testing
