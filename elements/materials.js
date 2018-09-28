class XMLMaterial extends XMLElement {
	constructor(node) {
		super(node, {
			id:"ss", shininess:"ff",
			emission: {r:"ff", g:"ff", b:"ff", a:"ff"},
			ambient: {r:"rr", g:"rr", b:"rr", a:"rr"},
			diffuse: {r:"rr", g:"rr", b:"rr", a:"rr"},
			specular: {r:"rr", g:"rr", b:"rr", a:"rr"}
		});

		this.type = "material";

		if(this.data.shininess < 0)
		throw new XMLException(node, "shininess < 0");
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
