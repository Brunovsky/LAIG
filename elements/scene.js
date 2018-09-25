class XMLScene extends XMLElement {
	constructor(node, reader) {
		super(node, reader, {root:"ss", axis_length:"ff"});

		this.type = "scene";
	}
}

// Done, needs testing
