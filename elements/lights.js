class XMLOmni extends XMLElement {
	constructor(node) {
		super(node, {
			id: "ss", enabled: "tt",
			location: { x: "ff", y: "ff", z: "ff", w: "ff" },
			ambient: { r: "rr", g: "rr", b: "rr", a: "rr" },
			diffuse: { r: "rr", g: "rr", b: "rr", a: "rr" },
			specular: { r: "rr", g: "rr", b: "rr", a: "rr" }
		});

		this.type = "omni";
	}
}

class XMLSpot extends XMLElement {
	constructor(node) {
		super(node, {
			id: "ss", enabled: "tt", angle: "ff", exponent: "ff",
			location: { x: "ff", y: "ff", z: "ff", w: "ff" },
			target: { x: "ff", y: "ff", z: "ff" },
			ambient: { r: "rr", g: "rr", b: "rr", a: "rr" },
			diffuse: { r: "rr", g: "rr", b: "rr", a: "rr" },
			specular: { r: "rr", g: "rr", b: "rr", a: "rr" }

		});
		this.type = "spot";

		if (this.data.target.x == this.data.location.x 
		 && this.data.target.y == this.data.location.y
		 && this.data.target.z == this.data.location.z) {
			throw new XMLException(node, "target needs to be different from location");
		}
	}
}

class XMLLights extends XMLGroup {
	constructor(node) {
		super(node, {
			omni: XMLOmni,
			spot: XMLSpot
		});

		this.type = "lights";
	}
}

// Done, needs testing
