class XMLTranslate extends XMLElement {
	constructor(node) {
		super(node, {
			x: "ff", y: "ff", z: "ff"
		});

		this.type = "translate";
	}
}

class XMLRotate extends XMLElement {
	constructor(node) {
		super(node, {
			axis: "cc", angle: "ff"
		});

		this.type = "rotate";
	}
}

class XMLScale extends XMLElement {
	constructor(node) {
		super(node, {
			x: "ff", y: "ff", z: "ff"
		});

		this.type = "scale";
		if (x == 0 || y == 0 || z == 0)
			throw new XMLException(node, "x, y or z = 0");

	}
}

class XMLTransformation extends XMLElement {
	constructor(node) {
		super(node, { id: "ss" });

		this.type = "transformation";

		let tags = {
			translate: { fun: XMLTranslate },
			rotate: { fun: XMLRotate },
			scale: { fun: XMLScale }
		};

		this.elements = [];

		for (let i = 0; i < node.children.length; ++i) {
			let child = node.children[i];
			let name = child.tagName.toLocaleLowerCase();

			if (!name in tags) {
				throw new XMLException(child, "Unexpected tagname " + name);
			}

			let fun = tags[name].fun;

			this.elements.push(new fun(child));
		}
	}
}

class XMLTransformations extends XMLGroup {
	constructor(node) {
		super(node, {
			transformation: { fun: XMLTransformation }
		});

		this.type = "transformations";
	}
}

// Done, needs testing
