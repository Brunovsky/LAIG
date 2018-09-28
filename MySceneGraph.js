/**
 * MySceneGraph class, representing the scene graph.
 */
class MySceneGraph {
    constructor(filename, scene) {
        this.loadedOk = null;

        // Establish bidirectional references between scene and graph.
        this.scene = scene;
        scene.graph = this;

        // File reading 
        this.reader = new CGFXMLreader();

        /*
         * Read the contents of the xml file, and refer to this class for loading and error handlers.
         * After the file is read, the reader calls onXMLReady on this object.
         * If any error occurs, the reader calls onXMLError on this object, with an error message
         */
        this.reader.open('scenes/' + filename, this);
    }

    onXMLReady() {
        console.log("XML Loading finished.");
        let rootElement = this.reader.xmlDoc.documentElement;

        console.log()
        let error = this.parseXMLFile(rootElement);

        if (error) return;

        this.loadedOk = true;

        // As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
        this.scene.onGraphLoaded();
    }

    onXMLError(error) { console.log(error); return false; }
    /**
     * Parses the XML file, processing each block.
     * @param {XML root element} rootElement
     */
    parseXMLFile(rootElement) {
        console.log(rootElement);

        try {
            this.yas = new XMLYas(rootElement);
        } catch (e) {
            if (e instanceof XMLException) {
                console.log(e);
                return true;
            } else {
                throw e;
            }
        }

        console.log(this.yas);
        
        return false;
    }
}