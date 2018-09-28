class XMLRectangle extends XMLElement {
	constructor(node) {
		super(node, {
			x1:"ff", y1:"ff", x2:"ff", y2:"ff"
		});

		this.type = "rectangle";
	}
}

class XMLTriangle extends XMLElement {
	constructor(node) {
		super(node, {
			x1:"ff", y1:"ff", z1:"ff",
			x2:"ff", y2:"ff", z2:"ff",
			x3:"ff", y3:"ff", z3:"ff"
		});

		this.type = "triangle";
	}
}

class XMLCylinder extends XMLElement {
	constructor(node) {
		super(node, {
			base:"ff", top:"ff", height:"ff", slices:"ii", stacks:"ii"
		});

		this.type = "cylinder";
	}
}

class XMLSphere extends XMLElement {
	constructor(node) {
		super(node, {
			radius:"ff", slices:"ii", stacks:"ii"
		});

		this.type = "sphere";
	}
}

class XMLTorus extends XMLElement {
	constructor(node) {
		super(node, {
			inner:"ff", outer:"ff", slices:"ii", loops:"ii"
		});

		this.type = "torus";
	if(this.data.inner <= 0 || this.data.outer <=0)
	throw new XMLException(this.node, "inner or outer is <0");

	}
}

class XMLCircle extends XMLElement {
	constructor(node) {
		super(node, {
			radius:"ff", slices:"ii"
		});

		this.type = "circle";
	}
}

class XMLRegular extends XMLElement {
	constructor(node) {
		super(node, {
			radius:"ff", sides:"ii"
		});

		this.type = "regular";
	}
}

class XMLTrapezium extends XMLElement {
	constructor(node) {
		super(node, {
			base:"ff", top:"ff", height:"ff"
		});

		this.type = "trapezium";
	}
}

class XMLHalfSphere extends XMLElement {
	constructor(node) {
		super(node, {
			radius:"ff", stacks:"ii", slices:"ii"
		});

		this.type = "halfsphere";
	}
}

class XMLCube extends XMLElement {
	constructor(node) {
		super(node, {
			side:"ff"
		});

		this.type = "cube";
	}
}

class XMLBlock extends XMLElement {
	constructor(node) {
		super(node, {
			x:"ff", y:"ff", z:"ff"
		});

		this.type = "block";
	}
}

class XMLPrism extends XMLElement {
	constructor(node) {
		super(node, {
			base:"ff", top:"ff", height:"ff", stacks:"ii", sides:"ii"
		});

		this.type = "prism";
	}
}

class XMLCone extends XMLElement {
	constructor(node) {
		super(node, {
			radius:"ff", height:"ff", stacks:"ii", slices:"ii"
		});

		this.type = "cone";
	}
}

class XMLPyramid extends XMLElement {
	constructor(node) {
		super(node, {
			radius:"ff", height:"ff", stacks:"ii", sides:"ii"
		});

		this.type = "pyramid";
	}
}

let XMLAcceptedPrimitives = {
	rectangle: {fun:XMLRectangle},
	triangle:  {fun:XMLTriangle},
	cylinder:  {fun:XMLCylinder},
	sphere:    {fun:XMLSphere},
	torus:     {fun:XMLTorus},
	circle:    {fun:XMLCircle},
	regular:   {fun:XMLRegular},
	trapezium: {fun:XMLTrapezium},
	halfsphere:{fun:XMLHalfSphere},
	cube:      {fun:XMLCube},
	block:     {fun:XMLBlock},
	prism:     {fun:XMLPrism},
	cone:      {fun:XMLCone},
	pyramid:   {fun:XMLPyramid}
};

class XMLPrimitive extends XMLElement {
	constructor(node) {
		super(node, {id:"ss"});

		this.type = "primitive";

		if (node.childElementCount != 1) {
			throw new XMLException(node, "Primitive node must have exactly one child");
		}

		let child = node.firstElementChild;
		let name = child.tagName.toLocaleLowerCase();

		if (!name in XMLAcceptedPrimitives) {
			throw new XMLException(node, "Primitive " + name + " not recognized");
		} else {
			let fun = XMLAcceptedPrimitives[name].fun;

			this.figure = new fun(child);
		}
	}
}

class XMLPrimitives extends XMLGroup {
	constructor(node) {
		super(node, {
			primitive: {fun:XMLPrimitive}
		});

		this.type = "primitives";
	}
}

// Done, needs testing
