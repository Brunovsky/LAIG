class XMLAmbient extends XMLElement {
	constructor(node) {
		super(node, {
			ambient: {r:"ff", g:"ff", b:"ff", a:"ff"},
			background: {r:"ff", g:"ff", b:"ff", a:"ff"}
		});

		this.type = "ambient";
	}
}

// Done, needs testing
