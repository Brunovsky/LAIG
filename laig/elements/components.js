/**
 * XML Parsing Class
 * Parses yas > components > component > transformation > transformationref
 */
class XMLTransformationRef extends XMLElement {
    constructor(node) {
        super(node, { id: "ss" });

        this.type = "transformationref";
    }
}
/**
 * XML Parsing Class
 * Parses yas > components > component > transformation
 * Immediate transformation (non empty and no transformationref)
 */
class XMLImmediateTransformation extends XMLOrderedGroup {
    constructor(node) {
        super(node, {
            translate: XMLTranslate,
            rotate: XMLRotate,
            scale: XMLScale
        });

        this.type = "transformation";
    }
}

/**
 * XML Parsing Class
 * Parses yas > components > component > transformation
 */
class XMLComponentTransformation extends XMLElement {
    constructor(node) {
        super(node);

        this.type = "transformation";

        const child = node.firstElementChild;

        if (child == null) {
            this.mode = "none";
        } else {
            const name = child.tagName.toLocaleLowerCase();
            
            if (name == "transformationref") {
                this.mode = "reference";
                this.transf = new XMLTransformationRef(child);
                this.id = this.transf.id;
            } else {
                this.mode = "immediate";
                this.transf = new XMLImmediateTransformation(node);
            }
        }
    }
}

/**
 * XML Parsing Class
 * Parses yas > components > component > children > componentref
 */
class XMLComponentRef extends XMLElement {
    constructor(node) {
        super(node, { id: "ss" });

        this.type = "componentref";
    }
}

/**
 * XML Parsing Class
 * Parses yas > components > component > children > primitiveref
 */
class XMLPrimitiveRef extends XMLElement {
    constructor(node) {
        super(node, { id: "ss" });

        this.type = "primitiveref";
    }
}

/**
 * XML Parsing Class
 * Parses yas > components > component > materials > material
 */
class XMLMaterialRef extends XMLElement {
    constructor(node) {
        super(node, { id: "ss" });

        this.type = "material";

        if (this.id === "inherit") {
            this.mode = "inherit";
        } else {
            this.mode = "reference";
        }
    }
}

/**
 * XML Parsing Class
 * Parses yas > components > component > animations > animationref
 */
class XMLAnimationRef extends XMLElement {
    constructor(node) {
        super(node, { id: "ss" });

        this.type = "animationref";
    }
}

/**
 * XML Parsing Class
 * Parses yas > components > component > texture
 */
class XMLComponentTexture extends XMLElement {
    constructor(node) {
        super(node, { id: "ss" });

        this.type = "texture";

        this.s = 1.0;
        this.t = 1.0;

        if (this.id === "inherit") {
            this.mode = "inherit";
        } else if (this.id === "none") {
            this.mode = "none";
        } else {
            this.mode = "reference";

            let tmp = new XMLElement(node, {length_s: "pp", length_t: "pp"});

            this.s = tmp.data.length_s;
            this.t = tmp.data.length_t;
        }
    }
}

/**
 * XML Parsing Class
 * Parses yas > components > component > materials
 */
class XMLComponentMaterials extends XMLOrderedGroup {
    constructor(node) {
        super(node, {
            material: XMLMaterialRef
        });

        this.type = "materials";
    }
}

/**
 * XML Parsing Class
 * Parses yas > components > component > animations
 */
class XMLComponentAnimations extends XMLOrderedGroup {
    constructor(node) {
        super(node, {
            animationref: XMLAnimationRef
        }, {}, false);

        this.type = "animations";
    }
}

/**
 * XML Parsing Class
 * Parses yas > components > component > children
 */
class XMLChildren extends XMLGroup {
    constructor(node) {
        super(node, {
            primitiveref: XMLPrimitiveRef,
            componentref: XMLComponentRef
        });

        this.type = "children";
    }
}

/**
 * XML Parsing Class
 * Parses yas > components > component
 */
class XMLComponent extends XMLOrderedSet {
    constructor(node) {
        super(node, [
            {name: "transformation", xml: XMLComponentTransformation, opt: false},
            {name: "animations", xml: XMLComponentAnimations, opt: true},
            {name: "materials", xml: XMLComponentMaterials, opt: false},
            {name: "texture", xml: XMLComponentTexture, opt: false},
            {name: "children", xml: XMLChildren, opt: false},
        ], { id: "ss" });

        this.type = "component";
    }
}

/**
 * XML Parsing Class
 * Parses yas > components
 */
class XMLComponents extends XMLGroup {
    constructor(node) {
        super(node, {
            component: XMLComponent
        });

        this.type = "components";
    }
}
