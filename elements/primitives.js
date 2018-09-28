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

let XMLAcceptedPrimitives = {
	rectangle: {fun:XMLRectangle},
	triangle:  {fun:XMLTriangle},
	cylinder:  {fun:XMLCylinder},
	sphere:    {fun:XMLSphere},
	torus:     {fun:XMLTorus}
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
