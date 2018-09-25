class XMLView extends XMLElement {
	constructor(node, reader, attr) {
		super(node, reader, attr);

		this.type = "view";
	}
}

class XMLPerspective extends XMLView {
	constructor(node, reader) {
		super(node, reader, {
			id:"ss", near:"ff", far:"ff", angle:"ff",
			from: {x:"ff", y:"ff", z:"ff"},
			to: {x:"ff", y:"ff", z:"ff"}
		});

		this.type = "perspective";
	}
}

class XMLOrtho extends XMLView {
	constructor(node, reader) {
		super(node, reader, {
			id:"ss", near:"ff", far:"ff",
			left:"ff", right:"ff", top:"ff", bottom:"ff"
		});

		this.type = "ortho";
	}
}

class XMLViews extends XMLElement {
	constructor(node, reader) {
		super(node, reader);

		this.type = "views";

		this.views = {};
		let children = node.children;

		for (let i = 0; i < children.length; ++i) {
			let child = children[i];
			let view;

			if (child.tagName == "perspective") {
				view = new XMLPerspective(child, reader);
			} else if (child.tagName == "ortho") {
				view = new XMLOrtho(child, reader);
			} else {
				this.error = PARSE_ERROR_BAD_CHILD;
				this.errorMessage = "Unexpected child tagname";
				return;
			}

			if (!view.isValid()) {
				this.error = view.error;
				this.errorMessage = view.errorMessage;
				return;
			}

			let id = view.values.id;

			if (this.views[id] != undefined) {
				this.error = PARSE_ERROR_REPEATED_ID;
				this.errorMessage = "Repeated child id";
				return;
			}

			this.views[id] = view;
		}
	}
}

// Done, needs testing
