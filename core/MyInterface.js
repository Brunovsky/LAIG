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
        this.addOptions()
        this.addSceneries()
        this.gaming()
    }

    addOptions() {
        const optionsGroup = this.datgui.addFolder("Options")
        optionsGroup.open()
        this.control.options = {
            "Difficulty": 3,
            "Tournament Rule": true
        };

        optionsGroup.add(this.control.options, "Difficulty", 1, 5).step(1);
        optionsGroup.add(this.control.options, "Tournament Rule");
    }

    addSceneries() {
        this.control['Scenes'] = 'scenery-1';

        const sceneriesList = [];

        for (const id in this.scene.sceneries) {
            sceneriesList.push(id); 
        }

        const sceneriesGroup = this.datgui.add(this.control, 'Scenes', sceneriesList)
            .onChange(id => this.scene.selectScenery(id));
    }

    addStartGaming() {
        const startGameGroup = this.datgui.addFolder("Start Game")
        startGameGroup.open()

        const obj = {
            HumanxHuman: () => {
                const diff = this.control.options["Difficulty"]
                const rule = this.control.options["Tournament Rule"]
                const opt = ['difficulty(' + diff + ')', 'rule(' + rule + ')']
                this.scene.initPente('player', 'player', opt)
            },
            HumanxBot: () => {
                const diff = this.control.options["Difficulty"]
                const rule = this.control.options["Tournament Rule"]
                const opt = ['difficulty(' + diff + ')', 'rule(' + rule + ')']
                this.scene.initPente('player', 'bot', opt)
            },
            BotxHuman: () => {
                const diff = this.control.options["Difficulty"]
                const rule = this.control.options["Tournament Rule"]
                const opt = ['difficulty(' + diff + ')', 'rule(' + rule + ')']
                this.scene.initPente('bot', 'player', opt)
            },
            BotxBot: () => {
                const diff = this.control.options["Difficulty"]
                const rule = this.control.options["Tournament Rule"]
                const opt = ['difficulty(' + diff + ')', 'rule(' + rule + ')']
                this.scene.initPente('bot', 'bot', opt)
            }
        };

        startGameGroup.add(obj, "HumanxHuman")
        startGameGroup.add(obj, "HumanxBot")
        startGameGroup.add(obj, "BotxHuman")
        startGameGroup.add(obj, "BotxBot")
    }

    gaming() {
        let scene = this.scene
        const gameEngine = this.datgui.addFolder("Gaming")

        const obj = {
            undo: function undo() {
                if (scene.pente) {
                    scene.pente.undo()
                } else {
                    alert("You can't undo if you are not playing")
                }
            },
            replay: function replay() {
                if (scene.pente) {
                    scene.pente.replay()
                } else {
                    alert("You can't replay if you are not playing");
                }
            }
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