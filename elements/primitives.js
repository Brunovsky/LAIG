class XMLRectangle extends XMLElement {
	constructor(node) {
		super(node, {
			x1: "ff", y1: "ff", x2: "ff", y2: "ff"
		});

		this.type = "rectangle";
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

class XMLCylinder extends XMLElement {
	constructor(node) {
		super(node, {
			base: "pp", top: "pp", height:"pp", slices:"ii", stacks:"ii"
		});

		this.type = "cylinder";
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

class XMLTorus extends XMLElement {
	constructor(node) {
		super(node, {
			inner: "pp", outer: "pp", slices: "ii", loops: "ii"
		});

		this.type = "torus";
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

class XMLRegular extends XMLElement {
	constructor(node) {
		super(node, {
			radius: "pp", sides: "ii"
		});

		this.type = "regular";
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

class XMLHalfSphere extends XMLElement {
	constructor(node) {
		super(node, {
			radius: "pp", stacks: "ii", slices: "ii"
		});

		this.type = "halfsphere";
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

class XMLPrism extends XMLElement {
	constructor(node) {
		super(node, {
			base: "pp", top: "p0", height: "pp", stacks: "ii", sides: "ii"
		});

		this.type = "prism";
	}
}

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

let XMLPrimitivesList = {
	rectangle:  XMLRectangle,
	triangle:   XMLTriangle,
	cylinder:   XMLCylinder,
	sphere:     XMLSphere,
	torus:      XMLTorus,
	circle:     XMLCircle,
	regular:    XMLRegular,
	trapezium:  XMLTrapezium,
	halfsphere: XMLHalfSphere,
	cube:       XMLCube,
	block:      XMLBlock,
	prism:      XMLPrism,
	cone:       XMLCone,
	pyramid:    XMLPyramid
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
