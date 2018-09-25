class XMLAmbient extends XMLElement {
	constructor(node, reader) {
		super(node, reader, {
			ambient: {r:"ff", g:"ff", b:"ff", a:"ff"},
			background: {r:"ff", g:"ff", b:"ff", a:"ff"}
		});

		this.type = "ambient";
	}
}

// Done, needs testing
