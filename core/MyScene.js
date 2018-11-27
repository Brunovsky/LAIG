/**
 * XMLscene class, representing the scene that is to be rendered.
 */
class MyScene extends CGFscene {
    constructor(gui) {
        super(); // noop

        this.gui = gui;
        gui.scene = this;

        window.scene = this;
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
        this.setUpdatePeriod(1000 / HZ); // this function is messed up (inverted logic)

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
     * As loading is asynchronous, this may be called already after the application
     * has started the run loop
     */
    onGraphLoaded() {
        console.groupCollapsed("MyScene Load (onGraphLoaded)");

        this.initAxis();
        this.initViews();
        this.initAmbient();
        this.initLights();
        this.initTextures();
        this.initMaterials();
        this.initAnimations();
        this.initPrimitives();
        this.initShaders();
        this.initInterface();

        console.log("Axis", this.axis);
        console.log("Views", this.views);
        console.log("Ambient", this.bg);
        console.log("Lights", this.lights);
        console.log("Textures", this.textures);
        console.log("Materials", this.materials);
        console.log("Animations", this.animations);
        console.log("Primitives", this.primitives);
        console.log("Shaders", this.shaders);
        console.log("Interface", this.gui);

        this.graphLoaded = true;
        console.groupEnd();

        console.groupCollapsed("Loading textures, others...");
        setTimeout(console.groupEnd, 3000);
    }

    initAxis() {
        const yasscene = this.graph.yas.scene;

        const axisLength = yasscene.data.axis_length;
        this.axis = new CGFaxis(this, axisLength, AXIS_THICKNESS);
    }

    initViews() {
        const yasviews = this.graph.yas.views;

        this.views = {};

        for (const id in yasviews.elements) {
            const view = yasviews.get(id);
            const data = view.data;

            if (view.type === "perspective") {
                const position = vec3.fromValues(view.from.x, view.from.y, view.from.z);
                const target = vec3.fromValues(view.to.x, view.to.y, view.to.z);
                const fov = degToRad(data.angle), near = data.near, far = data.far;

                this.views[id] = new CGFcamera(fov, near, far, position, target);
            } else {
                const position = vec3.fromValues(view.from.x, view.from.y, view.from.z);
                const target = vec3.fromValues(view.to.x, view.to.y, view.to.z);
                const near = data.near, far = data.far, left = data.left,
                    right = data.right, top = data.top, bottom = data.bottom;
                const up = vec3.fromValues(0, 1, 0);

                this.views[id] = new CGFcameraOrtho(left, right, bottom, top,
                    near, far, position, target, up);
            }
        }

        this.selectView(yasviews.data.default);
    }

    initAmbient() {
        const yasambient = this.graph.yas.ambient;

        const ambient = yasambient.data.ambient;
        const background = yasambient.data.background;

        this.setGlobalAmbientLight(ambient.r, ambient.g, ambient.b, ambient.a);
        this.gl.clearColor(background.r, background.g, background.b, background.a);

        this.bg = background;
    }

    initLights() {
        const yaslights = this.graph.yas.lights;

        let i = 0;

        for (const id in yaslights.elements) {
            const light = yaslights.get(id);
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
        const yastextures = this.graph.yas.textures;

        this.textures = {};

        for (const id in yastextures.elements) {
            const texture = yastextures.get(id);
            const file = texture.data.file;

            this.textures[id] = new CGFtexture(this, file);
            if (this.textures[id] != null) {
                this.textures[id].yasID = id;
                continue;
            }

            console.warn("Texture file %s not found, searching in images/", file);

            this.textures[id] = new CGFtexture(this, "images/" + file);
            if (this.textures[id] != null) {
                this.textures[id].yasID = id;
                continue;
            }

            console.warn("Texture file images/%s not found, searching in tex/", file);

            this.textures[id] = new CGFtexture(this, "tex/" + file);
            if (this.textures[id] != null) {
                this.textures[id].yasID = id;
                continue;
            }

            console.warn("Texture file tex/%s not found", file);
        }
    }

    initMaterials() {
        const yasmaterials = this.graph.yas.materials;

        this.materials = {};

        for (const id in yasmaterials.elements) {
            const material = yasmaterials.get(id);

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
            this.materials[id].setTextureWrap("REPEAT", "REPEAT");

            this.materials[id].yasID = id;
        }
        this.materialIndex = 0;
    }

    initAnimations() {
        const yascomponents = this.graph.yas.components;
        const yasanimations = this.graph.yas.animations;

        this.animations = {};

        if (yasanimations == null) return;

        // 1. Iterate components
        for (const id in yascomponents.elements) {
            const component = yascomponents.get(id);
            const animrefs = component.animations;

            // 2.1. Skip if no animations
            if (component.animations == null) continue;
            if (animrefs.elements.length === 0) continue;

            // 2.2. Component's animations tracker
            const tracker = {
                index: 0,
                animations: [],
                max: animrefs.elements.length - 1
            };

            // 2.3. Iterate the animations, adding them to the tracker
            for (const i in animrefs.elements) {
                const animationId = animrefs.index(i).id; // xml reference
                const anim = yasanimations.get(animationId); // xml animation

                if (anim.type === "linear") {
                    const an = new LinearAnimation(this, anim.span, anim.points);

                    tracker.animations.push(an);
                }
                else {
                    const an = new CircularAnimation(this, anim.span, anim.center,
                        anim.radius, degToRad(anim.startang), degToRad(anim.rotang));

                    tracker.animations.push(an);
                }
            }

            // 3. Store the tracker
            this.animations[id] = tracker;
        }
    }

    initPrimitives() {
        const yasprimitives = this.graph.yas.primitives;

        this.primitives = {};

        for (const id in yasprimitives.elements) {
            const prim = yasprimitives.get(id);

            this.primitives[id] = buildPrimitive(this, prim);
        }
    }

    initShaders() {
        const waterv = "shaders/" + SHADER_FILES.water.vertex;
        const waterf = "shaders/" + SHADER_FILES.water.fragment;
        const terrainv = "shaders/" + SHADER_FILES.terrain.vertex;
        const terrainf = "shaders/" + SHADER_FILES.terrain.fragment;

        this.shaders = {
            water: new CGFshader(this.gl, waterv, waterf),
            terrain: new CGFshader(this.gl, terrainv, terrainf),
        };

        this.shaders.water.setUniformsValues({
            uSampler: IMAGE_TEXTURE_GL_N,
            heightSampler: HEIGHTMAP_TEXTURE_GL_N,
            uSampler2: HEIGHTMAP_TEXTURE_GL_N
        });

        this.shaders.terrain.setUniformsValues({
            uSampler: IMAGE_TEXTURE_GL_N,
            heightSampler: HEIGHTMAP_TEXTURE_GL_N,
            uSampler2: HEIGHTMAP_TEXTURE_GL_N
        });

        this.wavePeriod = WAVE_PERIOD;
    }

    initInterface() {
        this.keymap = {
            KeyN: "leftMaterial",
            KeyM: "rightMaterial"
        };

        this.keys = {
            leftMaterial: false,
            rightMaterial: false
        }

        this.gui.populate(this, this.graph.yas);
    }

    /**
     * Select or unselect light and index i
     */
    selectLight(i, value) {
        if (value) {
            this.lights[i].enable();
            this.lights[i].setVisible(ENABLED_LIGHTS_VISIBLE);
        } else {
            this.lights[i].disable();
            this.lights[i].setVisible(DISABLED_LIGHTS_VISIBLE);
        }
    }

    /**
     * Select camera with given id
     */
    selectView(id) {
        console.log("Select View", this.views[id]);
        this.camera = this.views[id];
        this.gui.setActiveCamera(this.camera);
    }

    /**
     * Apply a transformation given by the XML description
     */
    applyTransformation(transformation) {
        const operations = transformation.elements;

        for (const operation of operations) {
            const data = operation.data;

            switch (operation.type) {
                case 'translate':
                    this.translate(data.x, data.y, data.z);
                    break;
                case 'rotate':
                    const x = data.axis === 'x' ? 1 : 0;
                    const y = data.axis === 'y' ? 1 : 0;
                    const z = data.axis === 'z' ? 1 : 0;
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

    /**
     * Update lights for the display cycle
     */
    updateLights() {
        for (let i = 0; i < this.lights.length; ++i) {
            this.lights[i].update();
        }
    }

    display() {
        // OpenGL setup, similar to super.display()
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        //this.gl.clearColor(this.bg.r, this.bg.g, this.bg.b, this.bg.a);
        this.gl.enable(this.gl.DEPTH_TEST);

        // Update projection matrix
        this.updateProjectionMatrix();

        // Set model matrix to the identity
        this.clearMatrixStack();
        this.loadIdentity();

        // Update view matrix
        this.applyViewMatrix();

        // Update lights
        this.updateLights();

        // Display objects
        this.pushMatrix();
        this.axis.display();

        if (this.graphLoaded) {
            this.displaySceneGraph();
        }

        this.popMatrix();
    }

    /**
     * Entry point for the depth first traversal of the scene graph
     */
    displaySceneGraph() {
        this.traverser(this.graph.yas.root, null, null, 1.0, 1.0);
    }

    traverser(current, sceneMaterial, sceneTexture, s, t) {
        const transformation = current.transformation;
        const material = current.materials.index(this.materialIndex);
        const texture = current.texture;
        const children = current.children;
        const animations = this.animations[current.id];

        // Use own (s,t), or inherit from parent?
        if (!INHERIT_S_T || texture.mode != "inherit") {
            s = texture.s;
            t = texture.t;
        }

        this.pushMatrix();

        // Animations
        if (animations != null) {
            let index = animations.index;
            let aux = animations.animations[index];

            aux.apply();
        }

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
            sceneTexture = null; // allowed for setTexture()
        } else if (texture.mode === "reference") {
            sceneTexture = this.textures[texture.id];
        }

        // Recurse & Display primitives
        for (const id in children.elements) {
            const child = children.elements[id];

            // Apply Material

            if (child.type === "componentref") {
                this.traverser(child.ref, sceneMaterial, sceneTexture, s, t);
            } else {
                const prim = this.primitives[child.id];

                if (prim.adjust) prim.updateTexCoords(s, t);

                sceneMaterial.setTexture(sceneTexture);
                sceneMaterial.apply();

                this.primitives[child.id].display();
            }
        }

        this.popMatrix();
    }

    /**
     * Update data (only keys)
     */
    update(currTime) {
        if (!this.graphLoaded) return;

        this.checkKeys();
        this.updateAnimations(currTime);
        this.updateUniforms(currTime);
    }

    /**
     * Check interface keys
     */
    checkKeys() {
        for (const key in this.keymap) {
            const press = this.gui.isKeyPressed(key);
            const func = this.keymap[key];

            if (press && !this.keys[func]) {
                switch (func) {
                    case "leftMaterial":
                        --this.materialIndex;
                        break;
                    case "rightMaterial":
                        ++this.materialIndex;
                        break;
                    // ...
                    default:
                        throw "INTERNAL: Unhandled checkKeys case";
                }

                console.log("New material index: %d", this.materialIndex);
            }

            this.keys[func] = press;
        }
    }

    updateAnimations(currTime) {
        for (const id in this.animations) {
            let tracker = this.animations[id];

            let current = tracker.animations[tracker.index];
            if (current.hasEnded() && tracker.index < tracker.max) ++tracker.index;

            tracker.animations[tracker.index].update(currTime);
        }
    }

    updateUniforms(currTime) {
        const seconds = currTime / 1000;

        if (WAVE_BEHAVIOUR === "linear") {
            var time = (seconds / WAVE_PERIOD) % 1.0;
        } else if (WAVE_BEHAVIOUR === "sine") {
            const angularFrequency = 2 * Math.PI / WAVE_PERIOD;
            var time = 0.5 + Math.sin(seconds * angularFrequency) / 2;
        }

        this.shaders.water.setUniformsValues({
            time: time
        });
    }
}
