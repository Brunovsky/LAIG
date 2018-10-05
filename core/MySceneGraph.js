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

        /*
         * Read the contents of the xml file,
         * and refer to this class for loading and error handlers.
         * After the file is read, the reader calls onXMLReady.
         * If any error occurs, the reader calls onXMLError.
         */
        this.reader.open(filename, this);
    }

    /**
     * Called by CGFXMLreader upon successfully parsing the XML file.
     */
    onXMLReady() {
        console.log("XML Loading finished.");

        const rootElement = this.reader.xmlDoc.documentElement;

        this.parseXMLFile(rootElement);

        this.scene.onGraphLoaded();
    }

    /**
     * Called by CGFXMLreader upon encountering an error parsing the XML file.
     */
    onXMLError(error) {
        console.error(error);
    }
    
    /**
     * Creates
     */
    parseXMLFile(rootElement) {
        console.log(rootElement);

        this.yas = new XMLYas(rootElement);

        console.log(this.yas);
    }
}
