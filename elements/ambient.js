class XMLAmbient extends XMLElement {
	constructor(node) {
		super(node, {
			ambient: {r:"rr", g:"rr", b:"rr", a:"rr"},
			background: {r:"rr", g:"rr", b:"rr", a:"rr"}
		});

		this.type = "ambient";
	}
}

// Done, needs testing
