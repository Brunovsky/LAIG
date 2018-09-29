class XMLMaterial extends XMLElement {
	constructor(node) {
		super(node, {
			id: "ss", shininess: "pp",
			emission: {r: "rr", g: "rr", b: "rr", a: "rr"},
			ambient: {r: "rr", g: "rr", b: "rr", a: "rr"},
			diffuse: {r: "rr", g: "rr", b: "rr", a: "rr"},
			specular: {r: "rr", g: "rr", b: "rr", a: "rr"}
		});

		this.type = "material";
	}
}

class XMLMaterials extends XMLGroup {
	constructor(node) {
		super(node, {
			material: XMLMaterial
		});

		this.type = "materials";
	}
}

// Done, needs testing
