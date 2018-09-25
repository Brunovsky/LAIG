class XMLTranslate extends XMLElement {
	constructor(node, reader) {
		super(node, reader, {
			x:"ff", y:"ff", z:"ff"
		});

		this.type = "translate";
	}
}

class XMLRotate extends XMLElement {
	constructor(node, reader) {
		super(node, reader, {
			axis:"cc", angle:"ff"
		});

		this.type = "rotate";
	}
}

class XMLScale extends XMLElement {
	constructor(node, reader) {
		super(node, reader, {
			x:"ff", y:"ff", z:"ff"
		});

		this.type = "scale";
	}
}

class XMLTransformation extends XMLElement {
	constructor(node, reader) {
		super(node, reader);

		this.type = "transformation";

		this.operations = [];
		let children = node.children;

		for (let i = 0; i < children.length; ++i) {
			let child = children[i];
			let operation;

			if (child.tagName == "translate") {
				operation = new XMLTranslate(child, reader);
			} else if (child.tagName == "rotate") {
				operation = new XMLRotate(child, reader);
			} else if (child.tagName == "scale") {
				operation = new XMLScale(child, reader);
			} else {
				this.errorCode = XMLERROR_BAD_CHILD;
				this.errorMessage = "Unexpected child tagname";
				return;
			}

			if (!operation.valid()) {
				this.errorCode = operation.errorCode;
				this.errorMessage = operation.type + " : " + operation.errorMessage;
				return;
			}

			this.operations.push(operation);
		}
	}
}

class XMLTransformations extends XMLElement {
	constructor(node, reader) {
		super(node, reader);

		this.type = "transformations";

		this.transformations = {};
		let children = node.children;

		for (let i = 0; i < children.length; ++i) {
			let child = children[i];
			let transf;

			if (child.tagName == "transformation") {
				transf = new XMLTransformation(child, reader);
			} else {
				this.errorCode = XMLERROR_BAD_CHILD;
				this.errorMessage = "Unexpected child tagname";
				return;
			}

			if (!transf.valid()) {
				this.errorCode = transf.errorCode;
				this.errorMessage = "transformation : " + transf.errorMessage;
				return;
			}

			let id = transf.values.id;

			if (this.transformations[id] != undefined) {
				this.errorCode = XMLERROR_REPEATED_ID;
				this.errorMessage = "Repeated child id";
				return;
			}

			this.transformations[id] = transf;
		}
	}
}

// Done, needs testing
