class XMLPerspective extends XMLElement {
	constructor(node) {
		super(node, {
			id:"ss", near:"ff", far:"ff", angle:"ff",
			from: {x:"ff", y:"ff", z:"ff"},
			to: {x:"ff", y:"ff", z:"ff"}
		});

		this.type = "perspective";
	}
}

class XMLOrtho extends XMLElement {
	constructor(node) {
		super(node, {
			id:"ss", near:"ff", far:"ff",
			left:"ff", right:"ff", top:"ff", bottom:"ff"
		});

		this.type = "ortho";
	}
}

class XMLViews extends XMLGroup {
	constructor(node) {
		super(node, {
			perspective: {fun:XMLPerspective},
			ortho:       {fun:XMLOrtho}
		}, {default:"ss"});

		this.type = "views";
	}
}

// Done, needs testing
