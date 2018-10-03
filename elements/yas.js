class XMLYas extends XMLBase {
	constructor(node) {
		super(node);

		this.type = "yas";

		if (node.tagName.toLocaleLowerCase() !== "yas") {
			throw new XMLException(node, "Root node does not have tagname 'yas'");
		}

		const tags = ["scene", "views", "ambient", "lights", "textures",
			"materials", "transformations", "primitives", "components"];

		if (node.childElementCount !== 9) {
			throw new XMLException(node, "Root node does not have the expected 9 children");
		}

		for (let i = 0; i < 9; ++i) {
			const child = node.children[i];
			const name = child.tagName.toLocaleLowerCase();
			if (tags[i] !== name) {
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
		this.validateViews();
		this.validateGraph();
		this.printWarnings();
	}

	resolveReferences() {
		for (let componentId in this.components.elements) {
			const component = this.components.elements[componentId];

			const transformation = component.transformation;
			const materials = component.materials.elements;
			const texture = component.texture;
			const children = component.children.elements;

			// 1. Resolve transformationref references
			if (transformation.mode === "reference") {
				const id = transformation.id;
				const transfref = this.transformations.get(id);

				if (transfref == null) {
					throw new XMLException(transformation.node,
						"Bad reference: transformation " + id + " does not exist");
				}

				transformation.ref = transfref;
			}

			// 2. Resolve material references
			for (let material of materials) {
				const id = material.id;

				if (material.mode !== "reference") continue;

				const materialref = this.materials.get(id);

				if (materialref == null) {
					throw new XMLException(material.node,
						"Bad reference: material " + id + " does not exist");
				}

				material.ref = materialref;
			}

			// 3. Resolve texture reference
			if (texture.mode === "reference") {
				const id = texture.id;
				const textureref = this.textures.get(id);

				if (textureref == null) {
					throw new XMLException(texture.node,
						"Bad reference: texture " + id + " does not exist");
				}

				texture.ref = textureref;
			}

			// 4. Resolve primitiveref and componentref references
			for (let id in children) {
				const child = children[id]; // XMLPrimitiveRef or XMLComponentRef

				// 4.1. Resolve primitiveref references
				if (child.type === "primitiveref") {
					const primitive = this.primitives.get(id);

					if (primitive == null) {
						throw new XMLException(child.node,
							"Bad reference: primitive " + id + " does not exist");
					}

					child.ref = primitive;
				}

				// 4.2. Resolve componentref references
				else if (child.type === "componentref") {
					const component = this.components.get(id);

					if (component == null) {
						throw new XMLException(child.node,
							"Bad reference: component " + id + " does not exist");
					}

					child.ref = component; 
				}
			}
		}
	}

	validateRoot() {
		const id = this.scene.data.root;
		this.root = this.components.get(id);

		if (this.root == null) {
			throw new XMLException(this.scene.node,
				"Bad reference: root component " + id + " does not exist");
		}

		for (let i = 0; i < this.root.materials.elements.length; ++i) {
			const mat = this.root.materials.elements[i];

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

	validateViews() {
		const id = this.views.data.default;
		
		if (this.views.get(id) == null) {
			throw new XMLException(this.views.node,
				"Bad reference: default view " + id + " does not exist");
		}
	}

	validateGraph() {
		const components = this.components;
		const stack = new Stack();
		const visited = new Set();

		// Depth first traversal
		function dft(id) {
			const parent = components.get(id);
			const children = parent.children.elements;

			visited.add(id);

			if (stack.has(id)) {
				stack.push(id);
				console.log("Stack: ", stack);

				throw new XMLException(parent.node,
					"Scene graph loop found starting at node " + id
					+ " (stack logged)");
			}

			stack.push(id);

			for (let id in children) {
				const child = children[id];
				
				if (child.type == "componentref") {
					dft(id);
				}
			}

			stack.pop();
		}

		dft(this.root.id);

		this.reachable = visited;
		this.unreachable = new Set();

		for (let id in components.elements) {
			if (!visited.has(id)) {
				this.unreachable.add(id);
			}
		}
	}

	printWarnings() {
		const count = 0;

		for (let id of this.unreachable) {
			console.warn("Warning: component " + id + " is not reachable");
			++count;
			if (count === 7) break;
		}

		count = this.lights.elements.length;

		if (count > 8) {
			console.warn("Warning: WebGL only supports 8 lights, but " + count
				+ " lights are listed. Only the first 8 will be used");
		}
	}
}
