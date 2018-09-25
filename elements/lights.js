class XMLOmni extends XMLElement {
	constructor(node, reader) {
		super(node, reader, {
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
	constructor(node, reader) {
		super(node, reader, {
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

class XMLLights extends XMLElement {
	constructor(node, reader) {
		super(node, reader);

		this.type = "lights";

		this.lights = {};
		let children = node.children;

		for (let i = 0; i < children.length; ++i) {
			let child = children[i];
			let light;

			if (child.tagName == "omni") {
				light = new XMLOmni(child, reader);
			} else if (child.tagName == "spot") {
				light = new XMLSpot(child, reader);
			} else {
				this.errorCode = XMLERROR_BAD_CHILD;
				this.errorMessage = "Unexpected child tagname";
				return;
			}

			if (!light.valid()) {
				this.errorCode = light.errorCode;
				this.errorMessage = light.type + " : " + light.errorMessage;
				return;
			}

			let id = light.values.id;

			if (this.lights[id] != undefined) {
				this.errorCode = XMLERROR_REPEATED_ID;
				this.errorMessage = "Repeated child id";
				return;
			}

			this.lights[id] = light;
		}
	}
}

// Done, needs testing
