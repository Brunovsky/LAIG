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

//Include additional files here
serialInclude(['../lib/CGF.js',
    // core/ files
    'core/MyScene.js', 'core/MySceneGraph.js', 'core/MyInterface.js',
    'core/globals.js',
    // utils/ files
    'utils/arrays.js', 'utils/stack.js', 'utils/vector.js',
    'utils/reals.js', 'utils/protos.js',
    // build/ files
    'build/Cone.js', 'build/Cube.js', 'build/CutCone.js', 'build/CutPyramid.js',
    'build/Cylinder.js', 'build/Polygon.js', 'build/Prism.js', 'build/Pyramid.js',
    'build/revSurface.js', 'build/Sphere.js', 'build/uvSurface.js',
    'build/xSurface.js', 'build/ySurface.js', 'build/zSurface.js',
    // elements/ files
    'elements/element.js', 'elements/yas.js', 'elements/buildPrimitive.js',
    'elements/figures-planar.js', 'elements/figures-polygon.js',
    'elements/figures-spacial.js', 'elements/figures-surface.js',
    'elements/ambient.js', 'elements/components.js', 'elements/lights.js',
    'elements/materials.js', 'elements/primitives.js', 'elements/scene.js',
    'elements/textures.js', 'elements/transformations.js', 'elements/view.js',

    main = function() {
    	// Standard application, scene and interface setup
        let app = new CGFapplication(document.body);
        let myInterface = new MyInterface();
        let myScene = new MyScene(myInterface);

        app.init();

        app.setScene(myScene);
        app.setInterface(myInterface);

        myInterface.setActiveCamera(myScene.camera);

    	// get file name provided in URL, e.g. http://localhost/myproj/?file=myfile.xml 
    	// or use "demo.xml" as default (assumes files in subfolder "scenes", check MySceneGraph constructor) 
    	
    	let filename = getUrlVars()['file'] || DEFAULT_YAS_FILE;

    	// create and load graph, and associate it to scene. 
    	// Check console for loading errors
    	let myGraph = new MySceneGraph(filename, myScene);

        console.log(myInterface);
        console.log(myScene);
        console.log(myGraph);
    	
    	// start
        app.run();
    }
]);
