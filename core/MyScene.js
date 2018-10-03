/**
 * XMLscene class, representing the scene that is to be rendered.
 */
class MyScene extends CGFscene {
    /**
     * @constructor
     * @param {MyInterface} myInterface 
    }
     */
    constructor(myInterface) {
        super(); // noop

        this.interface = myInterface;
        myInterface.scene = this;

        this.newCamera = false;
    }

    /**
     * Initializes the scene and the camera, setting some WebGL defaults.
     * @param {CGFApplication} application
     */
    init(application) {
        super.init(application);

        this.count = 0;

        this.selectedCamera = null;

        this.graphLoaded = false;

        this.initDefaults();

        this.enableTextures(true);
        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
    }

    /**
     * Initializes the scene's default camera, lights and axis.
     */
    initDefaults() {
        this.axis = new CGFaxis(this);

        this.camera = new CGFcamera(0.4, 0.1, 500,
            vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }

    /* Handler called when the graph is finally loaded. 
     * As loading is asynchronous, this may be called already after the application has started the run loop
     */
    onGraphLoaded() {
        this.initAxis();

        this.initViews();

        this.initAmbient();

        this.initLights();

        this.initTextures();

        this.initMaterials();

        this.initPrimitives();

        this.interface.populate(this, this.graph.yas);

        this.graphLoaded = true;
    }

    initAxis() {
        const scene = this.graph.yas.scene;

        const axisLength = scene.data.axis_length;
        this.axis = new CGFaxis(this, axisLength, AXIS_THICKNESS);
    }

    initViews() {
        const views = this.graph.yas.views;

        this.views = {};

        for (const id in views.elements) {
            const view = views.elements[id];
            const data = view.data;

            if (view.type === "perspective") {
                const position = vec3.fromValues(data.from.x, data.from.y, data.from.z);
                const target = vec3.fromValues(data.to.x, data.to.y, data.to.z);
                const fov = degToRad(data.angle), near = data.near, far = data.far;

                this.views[id] = new CGFcamera(fov, near, far, position, target);
            } else {
                console.warn("views > ortho is not implemented yet.");
            }
        }

        console.log(this.camera);

        this.selectView(views.data.default);
    }

    initAmbient() {
        const ambient = this.graph.yas.ambient;

        this.setGlobalAmbientLight(ambient.data.ambient.r,
            ambient.data.ambient.g, ambient.data.ambient.b,
            ambient.data.ambient.a);

        this.gl.clearColor(ambient.data.background.r,
            ambient.data.background.g, ambient.data.background.b,
            ambient.data.background.a);
    }

    initLights() {
        const lights = this.graph.yas.lights;

        let i = 0;

        for (const id in lights.elements) {
            const light = lights.elements[id];
            if (i >= 8) break;

            light.index = i;

            const location = light.data.location;
            const ambient = light.data.ambient;
            const diffuse = light.data.diffuse;
            const specular = light.data.specular;

            this.lights[i].setPosition(location.x, location.y, location.z, location.w);
            this.lights[i].setAmbient(ambient.r, ambient.g, ambient.b, ambient.a);
            this.lights[i].setDiffuse(diffuse.r, diffuse.g, diffuse.b, diffuse.a);
            this.lights[i].setSpecular(specular.r, specular.g, specular.b, specular.a);

            if (light.type === "spot") {
                const target = light.data.target;
                const angle = light.data.angle;
                const exponent = light.data.exponent;

                this.lights[i].setSpotCutOff(angle);
                this.lights[i].setSpotExponent(exponent);
                this.lights[i].setSpotDirection(target.x - location.x,
                    target.y - location.y, target.z - location.z);
            }

            this.lights[i].setConstantAttenuation(LIGHT_CONSTANT_ATTENUATION);
            this.lights[i].setLinearAttenuation(LIGHT_LINEAR_ATTENUATION);
            this.lights[i].setQuadraticAttenuation(LIGHT_QUADRATIC_ATTENUATION);

            if (light.data.enabled) {
                this.lights[i].enable();
                this.lights[i].setVisible(ENABLED_LIGHTS_VISIBLE);
            } else {
                this.lights[i].disable();
                this.lights[i].setVisible(DISABLED_LIGHTS_VISIBLE);
            }

            this.lights[i].update();

            ++i;
        }
    }

    initTextures() {
        const textures = this.graph.yas.textures;

        this.textures = {};

        for (const id in textures.elements) {
            const texture = textures.elements[id];

            this.textures[id] = new CGFtexture(this, texture.data.file);
        }
    }

    initMaterials() {
        const materials = this.graph.yas.materials;

        this.materials = {};

        for (const id in materials.elements) {
            const material = materials.elements[id];

            const shininess = material.data.shininess;
            const emission = material.data.emission;
            const ambient = material.data.ambient;
            const diffuse = material.data.diffuse;
            const specular = material.data.specular;

            this.materials[id] = new CGFappearance(this);

            this.materials[id].setShininess(shininess);
            this.materials[id].setEmission(emission.r, emission.g, emission.g, emission.a);
            this.materials[id].setAmbient(ambient.r, ambient.g, ambient.b, ambient.a);
            this.materials[id].setDiffuse(diffuse.r, diffuse.g, diffuse.b, diffuse.a);
            this.materials[id].setSpecular(specular.r, specular.g, specular.b, specular.a);
        }
    }

    initPrimitives() {
        const primitives = this.graph.yas.primitives;

        this.primitives = {};

        for (const id in primitives.elements) {
            const prim = primitives.elements[id];

            this.primitives[id] = buildPrimitive(this, prim);
        }
    }

    selectLight(i, value) {
        console.log(i, value);
        if (value) {
            this.lights[i].enable();
            this.lights[i].setVisible(ENABLED_LIGHTS_VISIBLE);
        } else {
            this.lights[i].disable();
            this.lights[i].setVisible(DISABLED_LIGHTS_VISIBLE);
        }
    }

    selectView(id) {
        console.log(id);
        this.camera = this.views[id];
        this.interface.setActiveCamera(this.camera);
    }

    applyTransformation(transformation) {
        const operations = transformation.elements;

        for (const operation of operations) {
            const data = operation.data;

            switch (operation.type) {
            case 'translate':
                this.translate(data.x, data.y, data.z);
                break;
            case 'rotate':
                const x = data.axis === 'x';
                const y = data.axis === 'y';
                const z = data.axis === 'z';
                this.rotate(degToRad(data.angle), x, y, z);
                break;
            case 'scale':
                this.scale(data.x, data.y, data.z);
                break;
            }
        }
    }

    clearMatrixStack() {
        if (this.matrixStack.length > 0) {
            console.warn("Matrix stack was not empty at the end of display()");
            this.matrixStack.length = 0;
        }
    }

    updateLights()  {
        for (let i = 0; i < this.lights.length; ++i) {
            this.lights[i].update();
        }
    }

    display() {
        // ---- BEGIN Pre-setup (background, matrix, lights, camera, ...)

        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // Initialize Model-View matrix as identity (no transformation)
        this.updateProjectionMatrix();
        this.clearMatrixStack();
        this.loadIdentity();

        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        this.updateLights();

        // ---- END Pre-setup (background, matrix, lights, camera, ...)

        // ---- BEGIN Primary display

        this.pushMatrix();

        this.axis.display();

        if (this.graphLoaded) {
            this.traverseGraph();
        }

        this.popMatrix();

        // ---- END Primary display
    }

    traverseGraph() {
        this.traverser(this.graph.yas.root, null, null);
    }

    traverser(current, sceneMaterial, sceneTexture) {
        const transformation = current.transformation;
        const material = current.materials.elements[0];
        const texture = current.texture;
        const children = current.children;

        // Transformation & Material & Texture Stack PUSH
        this.pushMatrix();

        // Transformation
        if (transformation.mode === "reference") {
            this.applyTransformation(transformation.ref);
        } else if (transformation.mode === "immediate") {
            this.applyTransformation(transformation.transf);
        }

        // Material
        if (material.mode === "reference") {
            sceneMaterial = this.materials[material.id];
        }

        // Texture
        if (texture.mode === "none") {
            sceneTexture = false; // allowed for setTexture()
        } else if (texture.mode === "reference") {
            sceneTexture = this.textures[texture.id];
        }

        // Apply Material
        sceneMaterial.setTexture(sceneTexture);
        sceneMaterial.setTextureWrap(texture.data.length_s, texture.data.length_t);
        sceneMaterial.apply();

        // Recurse & Display primitives
        for (const id in children.elements) {
            const child = children.elements[id];
            if (child.type === "componentref") {
                this.traverser(child.ref, sceneMaterial, sceneTexture);
            } else {
                this.primitives[child.id].display();
            }
        }

        // Transformation & Material & Texture Stack POP
        this.popMatrix();
    }
}
