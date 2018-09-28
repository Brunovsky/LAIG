class XMLScene extends XMLElement {
	constructor(node) {
		super(node, {root:"ss", axis_length:"ff"});

		this.type = "scene";
	}
}

// Done, needs testing
