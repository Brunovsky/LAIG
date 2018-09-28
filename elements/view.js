class XMLPerspective extends XMLElement {
	constructor(node) {
		super(node, {
			id: "ss", near: "ff", far: "ff", angle: "ff",
			from: { x: "ff", y: "ff", z: "ff" },
			to: { x: "ff", y: "ff", z: "ff" }
		});


		this.type = "perspective";

		if (this.data.from.x == this.data.to.x
			&& this.data.from.y == this.data.to.y
			&& this.data.from.z == this.data.to.z)
			throw new XMLEception(node, "from = to");
	}
}

class XMLOrtho extends XMLElement {
	constructor(node) {
		super(node, {
			id: "ss", near: "ff", far: "ff",
			left: "ff", right: "ff", top: "ff", bottom: "ff"
		});

		this.type = "ortho";
	}

}

class XMLViews extends XMLGroup {
	constructor(node) {
		super(node, {
			perspective: { fun: XMLPerspective },
			ortho: { fun: XMLOrtho }
		}, { default: "ss" });

		this.type = "views";

		if (!this.isValid())
			throw new XMLEception(node, "error");
	}

	isValid() {
		if (this.data.default == null || this.data.near > this.data.far)
			return false;

		return true;
	}
}

// Done, needs testing
