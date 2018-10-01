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
