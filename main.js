//From https://github.com/EvanHahn/ScriptInclude
include=function(){function f(){var a=this.readyState;(!a||/ded|te/.test(a))&&(c--,!c&&e&&d())}var a=arguments,b=document,c=a.length,d=a[c-1],e=d.call;e&&c--;for(var g,h=0;c>h;h++)g=b.createElement("script"),g.src=arguments[h],g.async=!0,g.onload=g.onerror=g.onreadystatechange=f,(b.head||b.getElementsByTagName("head")[0]).appendChild(g)};
serialInclude=function(a){var b=console,c=serialInclude.l;if(a.length>0)c.splice(0,0,a);else b.log("Done!");if(c.length>0){if(c[0].length>1){var d=c[0].splice(0,1);b.log("Loading "+d+"...");include(d,function(){serialInclude([]);});}else{var e=c[0][0];c.splice(0,1);e.call();};}else b.log("Finished.");};serialInclude.l=new Array();

function getUrlVars() {
    let vars = {};
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
        function(m, key, value) {
            vars[decodeURIComponent(key)] = decodeURIComponent(value);
        }
    );
    return vars;
}

// Before includes
(function premain() {
    console.log("3MIEIC01 -- GROUP 4");
    console.log("201606517", "Bruno Dias da Costa Carvalho");
    console.log("201603404", "Carlos Daniel Coelho Ferreira Gomes");
    console.groupCollapsed("Loading WebCGF and sources");
})();

//Include additional files here
serialInclude([
    // lib/ CGF Library
    '../lib/CGF.js',
    // core/ Main class files
    'core/MyScene.js', 'core/MySceneGraph.js', 'core/MyInterface.js',
    'core/globals.js', 'core/Animations.js',
    // utils/ Utilities for JS and CGF
    'utils/arrays.js', 'utils/stack.js', 'utils/vector.js',
    'utils/reals.js', 'utils/protos.js', 'utils/cache.js',
    'utils/bezier.js',
    // build/ All CGFobject classes
    'build/Cone.js', 'build/Cube.js', 'build/CutCone.js', 'build/CutPyramid.js',
    'build/Cylinder.js', 'build/Nurbs.js', 'build/Polygon.js',
    'build/Prism.js', 'build/Pyramid.js', 'build/revSurface.js',
    'build/Sphere.js', 'build/uvSurface.js', 'build/xSurface.js',
    'build/ySurface.js', 'build/zSurface.js',  'build/Board.js',
    // elements/ All XML parsing classes
    'elements/element.js', 'elements/yas.js', 'elements/figures-composite.js',
    'elements/figures-planar.js', 'elements/figures-polygon.js',
    'elements/figures-spacial.js', 'elements/figures-surface.js',
    'elements/ambient.js', 'elements/animations.js', 'elements/components.js',
    'elements/lights.js', 'elements/materials.js', 'elements/primitives.js',
    'elements/scene.js', 'elements/textures.js', 'elements/transformations.js',
    'elements/view.js', 'elements/controlpoint.js',
    main = function() {
        console.groupEnd();

        console.groupCollapsed("CGF Init @ main");
        // Standard application, scene and interface setup
        let app = new CGFapplication(document.body);
        let myInterface = new MyInterface();
        let myScene = new MyScene(myInterface);

        app.init();
        app.setScene(myScene);
        app.setInterface(myInterface);

        myInterface.setActiveCamera(myScene.camera);
        console.groupEnd();

        let filename = getUrlVars()['file'] || DEFAULT_YAS_FILE;
        console.log("Filename: %s", filename);

        // create and load graph, and associate it to scene. 
        // Check console for loading errors
        let myGraph = new MySceneGraph(filename, myScene);

        console.groupCollapsed("Core Classes");
        console.log("MyInterface", myInterface);
        console.log("MyScene", myScene);
        console.log("MySceneGraph", myGraph);
        console.groupEnd();

        // start
        app.run();
    }
]);
