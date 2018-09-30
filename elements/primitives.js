/**
 * 1. Planar Primitives
 */

class XMLSquare extends XMLElement {
	constructor(node) {
		super(node, {
			side: "pp"
		});

		this.type = "square";
	}
}

class XMLRegular extends XMLElement {
	constructor(node) {
		super(node, {
			radius: "pp", sides: "ii"
		});

		this.type = "regular";
	}
}

class XMLCircle extends XMLElement {
	constructor(node) {
		super(node, {
			radius: "pp", slices: "ii"
		});

		this.type = "circle";
	}
}

class XMLTriangle extends XMLElement {
	constructor(node) {
		super(node, {
			x1: "ff", y1: "ff", z1: "ff",
			x2: "ff", y2: "ff", z2: "ff",
			x3: "ff", y3: "ff", z3: "ff"
		});

		this.type = "triangle";
	}
}

class XMLRectangle extends XMLElement {
	constructor(node) {
		super(node, {
			x1: "ff", y1: "ff", x2: "ff", y2: "ff"
		});

		this.type = "rectangle";
	}
}

class XMLTrapezium extends XMLElement {
	constructor(node) {
		super(node, {
			base: "pp", top: "pp", height: "pp"
		});

		this.type = "trapezium";
	}
}

/**
 * 2. Spacial Primitives
 */

class XMLCone extends XMLElement {
	constructor(node) {
		super(node, {
			radius: "pp", height: "pp", stacks: "ii", slices: "ii"
		});

		this.type = "cone";
	}
}

class XMLPyramid extends XMLElement {
	constructor(node) {
		super(node, {
			radius: "pp", height: "pp", stacks: "ii", sides: "ii"
		});

		this.type = "pyramid";
	}
}

class XMLCylinder extends XMLElement {
	constructor(node) {
		super(node, {
			base: "pp", top: "pp", height:"pp", slices:"ii", stacks:"ii"
		});

		this.type = "cylinder";
	}
}

class XMLPrism extends XMLElement {
	constructor(node) {
		super(node, {
			base: "pp", top: "p0", height: "pp", stacks: "ii", sides: "ii"
		});

		this.type = "prism";
	}
}

class XMLCube extends XMLElement {
	constructor(node) {
		super(node, {
			side: "pp"
		});

		this.type = "cube";
	}
}

class XMLBlock extends XMLElement {
	constructor(node) {
		super(node, {
			x: "pp", y: "pp", z: "pp"
		});

		this.type = "block";
	}
}

class XMLSphere extends XMLElement {
	constructor(node) {
		super(node, {
			radius: "pp", slices: "ii", stacks: "ii"
		});

		this.type = "sphere";
	}
}

class XMLHalfSphere extends XMLElement {
	constructor(node) {
		super(node, {
			radius: "pp", stacks: "ii", slices: "ii"
		});

		this.type = "halfsphere";
	}
}

/**
 * 3. Complex Planar Primitives
 */

class XMLButterfly extends XMLElement {
	constructor(node) {
		super(node, {
			samples: "ii"
		});

		this.type = "butterfly";
	}
}

class XMLFolium extends XMLElement {
	constructor(node) {
		super(node, {
			a: "pp", b: "p0", samples:"ii"
		});

		this.type = "folium";
	}
}

/**
 * 4. Surface Primitives
 */

class XMLTorus extends XMLElement {
	constructor(node) {
		super(node, {
			inner: "pp", outer: "pp", slices: "ii", loops: "ii"
		});

		this.type = "torus";
	}
}

class XMLCornucopia extends XMLElement {
	constructor(node) {
		super(node, {
			slices: "ii", stacks: "ii"
		});

		this.type = "cornucopia";
	}
}

let XMLPrimitivesList = {
	// 1. Planar Primitives
	square:     XMLSquare,
	regular:    XMLRegular,
	circle:     XMLCircle,
	triangle:   XMLTriangle,
	rectangle:  XMLRectangle,
	trapezium:  XMLTrapezium,

	// 2. Spacial Primitives
	cone:       XMLCone,
	pyramid:    XMLPyramid,
	cylinder:   XMLCylinder,
	prism:      XMLPrism,
	cube:       XMLCube,
	block:      XMLBlock,
	sphere:     XMLSphere,
	halfsphere: XMLHalfSphere,

	// 3. Complex Planar Primitives
	butterfly:  XMLButterfly,
	folium:     XMLFolium,

	// 4. Surface Primitives
	torus:      XMLTorus,
	cornucopia: XMLCornucopia
};

class XMLPrimitive extends XMLElement {
	constructor(node) {
		super(node, { id: "ss" });

		this.type = "primitive";

		if (node.childElementCount != 1) {
			throw new XMLException(node, "Primitive node must have exactly one child");
		}

		let child = node.firstElementChild;
		let name = child.tagName.toLocaleLowerCase();

		if (!(name in XMLPrimitivesList)) {
			throw new XMLException(node, "Primitive " + name + " not recognized");
		} else {
			this.figure = new XMLPrimitivesList[name](child);
		}
	}
}

class XMLPrimitives extends XMLGroup {
	constructor(node) {
		super(node, {
			primitive: XMLPrimitive
		});

		this.type = "primitives";
	}
}

// Done, needs testing
