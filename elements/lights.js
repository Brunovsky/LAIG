class XMLOmni extends XMLElement {
	constructor(node) {
		super(node, {
			id:"ss", enabled:"tt",
			location: {x:"ff", y:"ff", z:"ff", w:"ff"},
			ambient: {r:"ff", g:"ff", b:"ff", a:"ff"},
			diffuse: {r:"ff", g:"ff", b:"ff", a:"ff"},
			specular: {r:"ff", g:"ff", b:"ff", a:"ff"}
		});

		this.type = "omni";
	}
}

class XMLSpot extends XMLElement {
	constructor(node) {
		super(node, {
			id:"ss", enabled:"tt", angle:"ff", exponent:"ff",
			location: {x:"ff", y:"ff", z:"ff"},
			target: {x:"ff", y:"ff", z:"ff"},
			ambient: {r:"ff", g:"ff", b:"ff", a:"ff"},
			diffuse: {r:"ff", g:"ff", b:"ff", a:"ff"},
			specular: {r:"ff", g:"ff", b:"ff", a:"ff"}
		});

		this.type = "spot";
	}
}

class XMLLights extends XMLGroup {
	constructor(node) {
		super(node, {
			omni: {fun:XMLOmni},
			spot: {fun:XMLSpot}
		});

		this.type = "lights";
	}
}

// Done, needs testing
