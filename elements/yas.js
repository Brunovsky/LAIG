/**
 * XML Parsing Class
 * Parses yas (entry point)
 *
 * After parsing the XML, validates it (see resolve())
 */
class XMLYas extends XMLOrderedSet {
    constructor(node) {
        super(node, [
            {name: "scene", xml: XMLScene, opt: false},
            {name: "views", xml: XMLViews, opt: false},
            {name: "ambient", xml: XMLAmbient, opt: false},
            {name: "lights", xml: XMLLights, opt: false},
            {name: "textures", xml: XMLTextures, opt: false},
            {name: "materials", xml: XMLMaterials, opt: false},
            {name: "transformations", xml: XMLTransformations, opt: false},
            {name: "animations", xml: XMLAnimations, opt: XML_ANIMATIONS_OPT},
            {name: "primitives", xml: XMLPrimitives, opt: false},
            {name: "components", xml: XMLComponents, opt: false},
        ]);

        this.type = "yas";

        if (node.tagName.toLocaleLowerCase() !== "yas") {
            throw new XMLException(node, "Root node does not have tagname 'yas'");
        }

        /*
        const tags = ["scene", "views", "ambient", "lights", "textures",
            "materials", "transformations", "primitives", "components"];

        if (node.childElementCount !== 9) {
            throw new XMLException(node,
                "Root node does not have the expected 9 children");
        }

        for (let i = 0; i < 9; ++i) {
            const child = node.children[i];
            const name = child.tagName.toLocaleLowerCase();
            if (tags[i] !== name) {
                throw new XMLException(child, "Root child, expected tagname " + tags[i]);
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
        */

        this.log();
        this.resolve();
    }

    log() {
        console.log(this.scene);
        console.log(this.views);
        console.log(this.ambient);
        console.log(this.lights);
        console.log(this.textures);
        console.log(this.materials);
        console.log(this.transformations);
        console.log(this.primitives);
        console.log(this.components);
    }

    resolve() {
        this.resolveReferences();
        this.validateRoot();
        this.validateViews();
        this.validateGraph();
        this.printWarnings();
    }

    /**
     * Resolve cross references between components, transformations,
     * textures and materials.
     */
    resolveReferences() {
        for (const componentId in this.components.elements) {
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
            for (const material of materials) {
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
            for (const id in children) {
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

    /**
     * Validate root node exists and has material and texture non-inherit
     */
    validateRoot() {
        const id = this.scene.data.root;
        this.root = this.components.get(id);

        // Root component pointed by root in <scene< must exist
        if (this.root == null) {
            throw new XMLException(this.scene.node,
                "Bad reference: root component " + rootId + " does not exist");
        }

        // Root component cannot inherit material
        for (let i = 0; i < this.root.materials.elements.length; ++i) {
            const mat = this.root.materials.elements[i];

            if (mat.id === "inherit") {
                throw new XMLException(mat.node,
                    "Bad inherit: root node cannot inherit material");
            }
        }

        // Root component cannot inherit texture
        if (this.root.texture.id === "inherit") {
            throw new XMLException(this.root.texture.node,
                "Bad inherit: root node cannot inherit texture");
        }
    }

    /**
     * Validate default view
     */
    validateViews() {
        const id = this.views.data.default;
        
        // Default view pointed by default in <views> must exist
        if (this.views.get(id) == null) {
            throw new XMLException(this.views.node,
                "Bad reference: default view " + id + " does not exist");
        }
    }

    /**
     * Check for cycles in the scene graph
     */
    validateGraph() {
        const components = this.components;
        const stack = new Stack();
        const visited = new Set();

        // Depth First Traversal
        // Visit a component with this id and by dft
        // all of its children.
        function dft(id) {
            const parent = components.get(id);
            const children = parent.children.elements;

            visited.add(id);

            // If we have been here already we have a loop, so crash
            if (stack.has(id)) {
                stack.push(id);
                console.log("Stack: ", stack);

                throw new XMLException(parent.node,
                    "Scene graph loop found starting at node " + id
                    + " (stack logged)");
            }

            // Otherwise mark us in the tree stack
            stack.push(id);

            // Recurse all component children
            for (const id in children) {
                const child = children[id];

                if (child.type == "componentref") {
                    dft(id);
                }
            }

            // Unmark us from the tree stack
            stack.pop();
        }

        dft(this.root.id);

        // Detect all unreachable components
        this.reachable = visited;
        this.unreachable = new Set();

        for (const id in components.elements) {
            if (!visited.has(id)) {
                this.unreachable.add(id);
            }
        }
    }

    /**
     * Print relevant warnings (too many lights, unreachable components,
     * texture and material named inherit/none).
     */
    printWarnings() {
        let count = 0;

        // Emit warnings for unreachable components, maximum 7 warnings
        for (const id of this.unreachable) {
            console.warn("Warning: component " + id + " is not reachable");
            if (++count === 7) break;
        }

        count = this.lights.elements.length;

        // Emit single warning for more than 8 lights
        if (count > 8) {
            console.warn("Warning: WebGL only supports 8 lights, but " + count
                + " lights are listed. Only the first 8 will be used");

            // Slice lights array
            this.lights.elements.length = 8;
        }

        // Emit warning for material named "inherit"
        let material = this.materials.get("inherit");
        if (material != null) {
            console.warn("Warning: material named 'inherit' is unusable");
        }

        // Emit warning for texture named "inherit"
        let texture = this.textures.get("inherit");
        if (texture != null) {
            console.warn("Warning: texture named 'inherit' is unusable");
        }

        texture = this.textures.get("none");
        if (texture != null) {
            console.warn("Warning: texture named 'none' is unusable");
        }
    }
}
