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

        let lights = this.scene.lights;
        let views = this.scene.views;

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

        let lightsGroup = this.gui.addFolder("Lights");
        lightsGroup.open();

        for (let id in lights.elements) {
            let light = lights.elements[id];
            let name = id + " (" + light.type + ")";
            let index = light.index;

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

        let viewsGroup = this.gui.addFolder("Views");
        viewsGroup.open();

        for (let id in views.elements) {
            let view = views.elements[id];
            let name = id + " (" + view.type + ")";

            this.control.views[name] = value => this.scene.selectView(id);
            viewsGroup.add(this.control.views, name);
        }
    }
}
