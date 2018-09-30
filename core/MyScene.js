function degToRad(deg) {
    return Math.PI / 180;
}

var DEGREE_TO_RAD = Math.PI / 180;

var AXIS_THICKNESS = 0.05;

var LIGHTS_VISIBLE = true;

var DEBUG_DISPLAY = true;

/**
 * XMLscene class, representing the scene that is to be rendered.
 */
class MyScene extends CGFscene {
    /**
     * @constructor
     * @param {MyInterface} myinterface 
     */
    constructor(myinterface) {
        super(); // noop

        this.myinterface = myinterface;
        this.lightValues = {};
        this.count = 0;
    }

    /**
     * Initializes the scene and the camera, setting some WebGL defaults.
     * @param {CGFApplication} application
     */
    init(application) {
        super.init(application);

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

        this.graphLoaded = true;
    }

    initAxis() {
        const scene = this.graph.yas.scene;

        const axisLength = scene.data.axis_length;
        this.axis = new CGFaxis(this, axisLength, AXIS_THICKNESS);
    }

    initViews() {
        const views = this.graph.yas.views;

        this.cameras = {};

        for (let id in views.elements) {
            let view = views.elements[id];
            let data = view.data;

            if (view.type === "perspective") {
                this.cameras[id] = new CGFcamera(
                    degToRad(data.angle),
                    data.near,
                    data.far,
                    [data.from.x, data.from.y, data.from.z],
                    [data.to.x, data.to.y, data.to.z]
                );
            } else {
                console.warn("view > ortho not yet supported in MyScene");
            }
        }

        // CGFcamera(FIELD OF VIEW, NEAR, FAR, POSITION, TARGET);
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

        // Reads the lights from the scene graph.
        for (let id in lights.elements) {
            let light = lights.elements[id];
            if (i >= 8) break;

            if (light.type === "omni") {
                light.index = i;

                let location = light.data.location;
                let ambient = light.data.ambient;
                let diffuse = light.data.diffuse;
                let specular = light.data.specular;

                this.lights[i].setPosition(location.x, location.y, location.z);
                this.lights[i].setAmbient(ambient.r, ambient.g, ambient.b, ambient.a);
                this.lights[i].setDiffuse(diffuse.r, diffuse.g, diffuse.b, diffuse.a);
                this.lights[i].setSpecular(specular.r, specular.g, specular.b, specular.a);
                this.lights[i].setVisible(LIGHTS_VISIBLE);

                if (light.data.enabled) {
                    this.lights[i].enable();
                } else {
                    this.lights[i].disable();
                }

                this.lights[i].update();

                ++i;
            } else {
                console.warn("light > spot not yet supported in MyScene");
            }
        }
    }

    initTextures() {
        const textures = this.graph.yas.textures;

        this.textures = {};

        for (let id in textures.elements) {
            let texture = textures.elements[id];

            this.textures[id] = new CGFtexture(this, texture.data.file);
        }
    }

    initMaterials() {
        const materials = this.graph.yas.materials;

        this.materials = {};

        for (let id in materials.elements) {
            let material = materials.elements[id];

            let shininess = material.data.shininess;
            let emission = material.data.emission;
            let ambient = material.data.ambient;
            let diffuse = material.data.diffuse;
            let specular = material.data.specular;

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

        for (let id in primitives.elements) {
            let prim = primitives.elements[id];

            this.primitives[id] = buildPrimitive(this, prim);
        }
    }

    applyTransformation(transformation) {
        // ... TODO
    }

    clearMatrixStack() {
        if (this.matrixStack.length > 0) {
            console.warn("Matrix stack was not empty at the end of display()");
            this.matrixStack.length = 0;
        }
    }

    display() {
        if (DEBUG_DISPLAY) {
            if (++this.count > 120) return;
        }

        // ---- BEGIN Background, camera and axis setup

        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // Initialize Model-View matrix as identity (no transformation)
        this.updateProjectionMatrix();
        this.clearMatrixStack();
        this.loadIdentity();

        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // ---- END Background, camera and axis setup
        
        // ---- BEGIN 

        this.pushMatrix();

        this.axis.display();

        if (this.graphLoaded) {
            this.traverseGraph();
        }

        this.popMatrix();
    }

    traverseGraph() {
        this.traverser(this.graph.yas.root, null, null);
    }

    traverser(current, currentMaterial, currentTexture) {
        const transformation = current.transformation;
        const material = current.materials.elements[0];
        const texture = current.texture;
        const children = current.children;

        // Transformation & Material & Texture Stack PUSH
        this.pushMatrix();
        let previousMaterial = currentMaterial;
        let previousTexture = currentTexture;

        // Transformation
        if (transformation.mode === "reference") {
            this.applyTransformation(transformation.ref);
        } else if (transformation.mode === "immediate") {
            this.applyTransformation(transformation.transf);
        }

        // Material
        if (material.mode === "reference") {
            currentMaterial = this.materials[material.id];
        }

        // Texture
        if (texture.mode === "none") {
            currentTexture = false; // allowed for setTexture()
        } else if (texture.mode === "reference") {
            currentTexture = this.textures[texture.id];
        }

        // Apply Material
        currentMaterial.setTexture(currentTexture);
        currentMaterial.apply();

        // Recurse & Display primitives
        for (let id in children.elements) {
            let child = children.elements[id];
            if (child.type === "componentref") {
                this.traverser(child.ref, currentMaterial, currentTexture);
            } else {
                this.primitives[child.id].display();
            }
        }

        // Transformation & Material & Texture Stack POP
        this.popMatrix();
        currentMaterial = previousMaterial;
        currentTexture = previousTexture;
    }
}