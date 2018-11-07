/**
 * MySceneGraph class, representing the scene graph
 */
class MySceneGraph {
    constructor(filename, scene) {
        // Establish bidirectional references between scene and graph
        this.scene = scene;
        scene.graph = this;

        // CGF's file reader
        this.reader = new CGFXMLreader();

        this.reader.open("scenes/" + filename, this);
    }

    /**
     * Called by CGFXMLreader upon successfully parsing the XML file.
     */
    onXMLReady() {
        console.log("XML Loading finished.");

        const rootElement = this.reader.xmlDoc.documentElement;

        console.groupCollapsed("XMLYas Parsing");
        this.parseXMLFile(rootElement);
        console.groupEnd();

        this.scene.onGraphLoaded();
    }

    /**
     * Called by CGFXMLreader upon encountering an error parsing the XML file.
     */
    onXMLError(error) {
        console.error("XML Parse Error", error);
    }
    
    /**
     * Creates the yas object
     */
    parseXMLFile(rootElement) {
        console.log(rootElement);

        window.yasxml = rootElement;

        try {
            this.yas = new XMLYas(rootElement);
            console.log(this.yas);
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
}
