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

        this.datgui = new dat.GUI();

        this.initKeys();

        return true;
    }

    populate(scene, yas) {
        this.scene = scene;
        this.yas = yas;

        const lights = this.scene.lights;
        const views = this.scene.views;

        this.control = {};

        this.addLightsGroup(yas.lights);
        this.addViewsGroup(yas.views);
        this.addStartGaming()
        this.gaming()
        //    this.addFactor()
    }

    /*     addFactor(){

            this.datgui.add(this.scene,"factor", -5, 5).onChange(factor => this.scene.changeFactor(factor));

        }
     */

 
    addStartGaming() {
        const startGameGroup = this.datgui.addFolder("Start Game")
        const obj = {
            HumanxHuman: function humanhuman(){console.log("HumanxHuman")},
            HumanxBot: function humanbot() {console.log("HumanxBot")},
            BotxHuman: function  bothuman() {console.log("BotxHuman")},
            BotxBot: function botbot() {console.log("BotxBot")}
        };

        startGameGroup.add(obj, "HumanxHuman")
        startGameGroup.add(obj, "HumanxBot")
        startGameGroup.add(obj, "BotxHuman")
        startGameGroup.add(obj, "BotxBot")
    }

    gaming(){
        const gameEngine = this.datgui.addFolder("Gaming")
        
        const obj = {
            undo: function undo(){console.log("undo")},
            replay: function replay(){console.log("replay")}
        }

        gameEngine.add(obj, "undo")
        gameEngine.add(obj, "replay")
    }

    /**
     * Adds a folder for the lights.
     * @param {array} lights
     */
    addLightsGroup() {
        const lights = this.yas.lights;

        this.control.lights = {};

        const lightsGroup = this.datgui.addFolder("Lights");
        lightsGroup.open();

        // For every light declared
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

        this.control['View'] = views.data.default;

        const viewsList = [];

        for (const id in views.elements) {
            viewsList.push(id);
        }

        const viewsGroup = this.datgui.add(this.control, 'View', viewsList)
            .onChange(id => this.scene.selectView(id));
    }

    initKeys() {
        this.processKeyboard = function () {};
        this.activeKeys = {};
    };

    processKeyDown(event) {
        this.activeKeys[event.code] = true;
        console.log(event.code);
    };

    processKeyUp(event) {
        this.activeKeys[event.code] = false;
        console.log(event.code);
    };

    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    };
}