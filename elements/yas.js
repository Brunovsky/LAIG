class XMLYas extends XMLBase {
	constructor(node) {
		super(node);

		this.type = "yas";

		if (node.tagName.toLocaleLowerCase() != "yas") {
			throw new XMLException(node, "Root node does not have tagname 'yas'");
		}

		let tags = ["scene", "views", "ambient", "lights", "textures",
			"materials", "transformations", "primitives", "components"];

		if (node.childElementCount != 9) {
			throw new XMLException(node, "Root node does not have the expected 9 children");
		}

		for (let i = 0; i < 9; ++i) {
			let child = node.children[i];
			let name = child.tagName.toLocaleLowerCase();
			if (tags[i] != name) {
				throw new XMLException(child, "Expected tagname " + tags[i]);
			}
		}

		this.scene = new XMLScene(node.children[0]);
		this.views = new XMLViews(node.children[1]);
		this.ambient = new XMLAmbient(node.children[2]);
		this.lights = new XMLLights(node.children[3]);
		this.textures = new XMLTextures(node.children[4]);
		this.materials = new XMLMaterials(node.children[5]);
		this.transformations = new XMLTransformations(node.children[6]);
		this.primitives = new XMLPrimitives(node.children[7]);
		this.components = new XMLComponents(node.children[8]);

		this.resolve();
	}

	resolve() {
		this.resolveReferences();
		this.validateRoot();
		this.validateGraph();
		this.printWarnings();
	}

	resolveReferences() {
		for (let componentId in this.components.elements) {
			let component = this.components.elements[componentId];

			let transformation = component.transformation;
			let materials = component.materials.elements;
			let texture = component.texture;
			let children = component.children.elements;

			// 1. Resolve transformationref references
			if (transformation.mode === "reference") {
				let id = transformation.id;
				let transfref = this.transformations.get(id);

				if (transfref == null) {
					throw new XMLException(transformation.node,
						"Bad reference: transformation with id " + id + " does not exist");
				}

				transformation.ref = transfref;
			}

			// 2. Resolve material references
			for (let material of materials) {
				let id = material.id;

				if (id === "inherit") continue;

				let materialref = this.materials.get(id);

				if (materialref == null) {
					throw new XMLException(material.node,
						"Bad reference: material with id " + id + " does not exist");
				}

				materials[id].ref = materialref;
			}

			// 3. Resolve texture reference
			if (texture.id !== "inherit" && texture.id !== "none") {
				let textureref = this.textures.get(texture.id);

				if (textureref == null) {
					throw new XMLException(texture.node,
						"Bad reference: texture with id " + id + " does not exist");
				}

				texture.ref = textureref;
			}

			// 4. Resolve primitiveref and componentref references
			for (let id in children) {
				let child = children[id]; // XMLPrimitiveRef or XMLComponentRef

				// 4.1. Resolve primitiveref references
				if (child.type === "primitiveref") {
					let primitive = this.primitives.get(id);

					if (primitive == null) {
						throw new XMLException(child.node,
							"Bad reference: primitive with id " + id + " does not exist");
					}

					child.ref = primitive;
				}

				// 4.2. Resolve componentref references
				else if (child.type === "componentref") {
					let component = this.components.get(id);

					if (component == null) {
						throw new XMLException(component.node,
							"Bad reference: component with id " + id + " does not exist");
					}

					child.ref = component; 
				}
			}
		}
	}

	validateRoot() {
		let rootId = this.scene.data.root;
		this.root = this.components.get(rootId);

		if (this.root == null) {
			throw new XMLException(this.scene.node,
				"Bad reference: root component with id " + id + " does not exist");
		}

		for (let i = 0; i < this.root.materials.elements.length; ++i) {
			let mat = this.root.materials.elements[i];

			if (mat.id === "inherit") {
				throw new XMLException(mat.node,
					"Bad inherit: root node cannot inherit material");
			}
		}

		if (this.root.texture.id === "inherit") {
			throw new XMLException(this.root.texture.node,
				"Bad inherit: root node cannot inherit texture");
		}
	}

	validateGraph() {
		let stack = new Stack();
		let visited = new Set();

		// Depth first traversal
		function dft(id) {
			let parent = this.components.get(id);
			let children = parent.children.elements;

			visited.add(id);

			if (stack.has(id)) {
				console.log("Stack: ", stack);
				throw new XMLException(parent.node,
					"Scene graph loop found starting at node " + id + " (stack logged)");
			}

			stack.push(id);

			for (let id in children) {
				let child = children[id];
				
				if (child.type == "componentref") {
					dft(id);
				}
			}

			stack.pop();
		}

		dft(this.root.id);

		this.reachable = visited;
		this.unreachable = new Set();

		for (let id in this.components) {
			if (!visited.has(id)) {
				this.unreachable.add(id);
			}
		}
	}

	printWarnings() {
		let count = 0;

		for (let id of this.unreachable) {
			console.log("Warning: component with id " + id + " is not reachable");
			++count;
			if (count === 7) break;
		}
	}
}
