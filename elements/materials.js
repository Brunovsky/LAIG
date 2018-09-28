class XMLMaterial extends XMLElement {
	constructor(node) {
		super(node, {
			id:"ss", shininess:"ff",
			emission: {r:"ff", g:"ff", b:"ff", a:"ff"},
			ambient: {r:"ff", g:"ff", b:"ff", a:"ff"},
			diffuse: {r:"ff", g:"ff", b:"ff", a:"ff"},
			specular: {r:"ff", g:"ff", b:"ff", a:"ff"}
		});

		this.type = "material";
	}
}

class XMLMaterials extends XMLGroup {
	constructor(node) {
		super(node, {
			material: {fun:XMLMaterial}
		});

		this.type = "materials";
	}
}

// Done, needs testing
