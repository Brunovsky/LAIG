/**
* MyInterface class, creating a GUI interface.
*
* http://workshop.chromeexperiments.com/examples/gui
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        super.init(application);

        this.gui = new dat.GUI();
        this.control = {};

        return true;
    }

    populate(scene, yas) {
        this.scene = scene;
        this.yas = yas;

        const lights = this.scene.lights;
        const views = this.scene.views;

        this.addLightsGroup(yas.lights);
        this.addViewsGroup(yas.views);
    }

    /**
     * Adds a folder for the lights.
     * @param {array} lights
     */
    addLightsGroup() {
        const lights = this.yas.lights;

        this.control.lights = {};

        const lightsGroup = this.gui.addFolder("Lights");
        lightsGroup.open();

        for (const id in lights.elements) {
            const light = lights.elements[id];
            const name = id + " (" + light.type + ")";
            const index = light.index;

            this.control.lights[name] = true;
            lightsGroup.add(this.control.lights, name)
                .onChange(value => this.scene.selectLight(index, value));
        }
    }

    /**
     * Adds a folder for the views.
     */
    addViewsGroup() {
        const views = this.yas.views;

        this.control.views = {};

        const viewsGroup = this.gui.addFolder("Views");
        viewsGroup.open();

        for (const id in views.elements) {
            const view = views.elements[id];
            const name = id + " (" + view.type + ")";

            this.control.views[name] = value => this.scene.selectView(id);
            viewsGroup.add(this.control.views, name);
        }
    }
}
