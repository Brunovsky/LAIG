/**
 * An exception of the YAS specification found in the XML structure.
 * Thrown whenever a parsing error is found by XMLElement, XMLGroup, and others.
 */
class XMLException extends Error {
    constructor(node, message) {
        super(message);
        this.message = message;

        do {
            this.message = this.makeName(node) + " > " + this.message;
            node = node.parentNode;
        } while (node.parentNode != null);
    }

    makeName(node) {
        let name = node.tagName.toLocaleLowerCase();

        if (node.hasAttribute('id')) {
            name += "#" + node.getAttribute('id');
        }

        return name;
    }

    error() {
        return this.message;
    }

    source() {
        return this.node;
    }
}

/**
 * XML Core Parsing Class
 * 
 * Represents a leaf element of the XML structure, with a fixed set
 * of expected and mandatory attributes and children (recursively).
 *
 * The expected attributes, their types, and the expected children
 * are represented in constructor argument spec. See classes like
 * XMLAmbient for example uses.
 */
class XMLElement {
    constructor(node, spec = {}) {
        this.node = node;
        this.data = {};

        this.reader = new CGFXMLreader();

        for (const key in spec) {
            this.data[key] = this.extract(key, spec[key]);
        }

        // For convenience: lift the id from data.
        if (this.data.id != null) this.id = this.data.id;
    }

    extract(key, spec) {
        const node = this.node, reader = this.reader;

        // 1. String spec: attribute
        if (typeof spec === "string") {
            // No such attribute?
            if (!reader.hasAttribute(node, key)) {
                throw new XMLException(node, "Missing attribute " + key);
            }

            return this.parseAttribute(key, spec);
        }

        // 2. Object spec: child
        if (typeof spec === "object") {
            // Recurse on a child of node with tagname key.
            const child = node.querySelector(key);

            // No such child?
            if (child == null) {
                throw new XMLException(node, "Missing expected child node " + key);
            }

            // Do not catch possible exception.
            const element = new XMLElement(child, spec);
            return element.data;
        }

        throw new Error("INTERNAL: Unexpected spec type");
    }

    parseAttribute(key, spec) {
        const node = this.node, reader = this.reader;
        let val;

        switch (spec) {
        case "ss": // string
            val = reader.getString(node, key);
            break;
        case "ii": // positive integer
            val = reader.getInteger(node, key);
            if (val == null || val <= 0) {
                throw this.expected("positive integer", key);
            }
            break;
        case "ff": // float
            val = reader.getFloat(node, key);
            if (val == null || isNaN(val)) {
                throw this.expected("float", key);
            }
            break;
        case "p0": // nonnegative float
            val = reader.getFloat(node, key);
            if (val == null || isNaN(val) || val < 0) {
                throw this.expected("nonnegative float", key);
            }
            break;
        case "pp": // positive float
            val = reader.getFloat(node, key);
            if (val == null || isNaN(val) || val <= 0) {
                throw this.expected("positive float", key);
            }
            break;
        case "rr": // [0,1] float
            val = reader.getFloat(node, key);
            if (val == null || isNaN(val) || val < 0 || val > 1) {
                throw this.expected("[0,1] float", key);
            }
            break;
        case "cc": // x, y, z
            val = reader.getItem(node, key, ['x', 'y', 'z']);
            if (val == null) {
                throw this.expected("axis", key);
            }
            break;
        case "tt": // 0, 1
            val = reader.getItem(node, key, ['0', '1', 't', 'f', "true", "false"]);
            if (val == null) {
                throw this.expected("boolean", key);
            }
            val = (val === '1' || val === 't' || val === "true");
            break;
        case "ff ff ff":
            val = reader.getString(node, key).split(" ");
            val = {
                x: parseFloat(val[0]),
                y: parseFloat(val[1]),
                z: parseFloat(val[2])
            };
            if (isNaN(val.x) || isNaN(val.y) || isNaN(val.z)) {
                throw this.expected("coordinates", key);
            }
            break;
        default:
            throw new Error("INTERNAL: Bad Element attribute descriptor");
        }

        return val;
    }

    expected(msg, key) {
        return new XMLException(this.node, "Expected " + msg + " for attribute " + key);
    }

    get(key) {
        return this.data[key];
    }
}

/**
 * XML Core Parsing Class
 * 
 * Represents a leaf element of the XML structure, with a fixed set
 * of expected attributes and children (recursively) which may or may
 * not be optionally present -- with default values for optional attributes.
 *
 * The attribute names, their types, their optionality and the expected
 * children are represented in constructor argument spec.
 */
class XMLOptional extends XMLElement {
    constructor(node, spec = {}) {
        super(node);

        for (const key in spec) {
            const s = spec[key];

            if (s.spec != null && s.def != null) {
                this.data[key] = this.extract(key, s.spec, true, s.def);
            } else if (s instanceof Array) {
                this.data[key] = this.extract(key, s[0], true, s[1]);
            } else {
                this.data[key] = this.extract(key, s, false);
            }
        }

        // For convenience: lift the id from data.
        if (this.data.id != null) this.id = this.data.id;
    }

    extract(key, spec, optional, def = null) {
        const node = this.node, reader = this.reader;

        // 1. String spec: attribute
        if (typeof spec === "string") {
            // No such attribute?
            if (!reader.hasAttribute(node, key)) {
                if (!optional) {
                    throw new XMLException(node, "Missing attribute " + key);
                }
                
                return def;
            }

            return this.parseAttribute(key, spec);
        }

        // 2. Object spec: child
        if (typeof spec === "object") {
            // Recurse on a child of node with tagname key.
            const child = node.querySelector(key);

            // No such child?
            if (child == null) {
                if (!optional) {
                    throw new XMLException(node, "Missing expected child node " + key);
                }

                return def;
            }

            // Do not catch possible exception.
            const element = new XMLOptional(child, spec);
            return element.data;
        }

        throw new Error("INTERNAL: Unexpected spec type");
    }
}

/**
 * An unordered group of nodes parsed by XML Parsing Classes.
 * 
 * The ids are unique in the group, and these XMLElement
 * may only have one of the tags specified in the argument tags
 * for the constructor.
 */
class XMLGroup extends XMLElement {
    constructor(node, tags, attr = {}, nonEmpty = true) {
        super(node, attr);
        this.elements = {};

        if (nonEmpty && node.childElementCount === 0) {
            throw new XMLException(node, "Group node must have at least one child");
        }

        for (const child of node.children) {
            const name = child.tagName.toLocaleLowerCase();

            if (!(name in tags)) {
                throw new XMLException(child, "Unexpected tagname " + name);
            }

            const element = new tags[name](child);
            const id = element.id;

            if (id == null) {
                throw "INTERNAL: tag for XMLGroup does not demand child id";
            }

            if (id in this.elements) {
                throw new XMLException(child, "Repeated id: " + id);
            }

            this.elements[id] = element;
        }
    }

    get(id) {
        return this.elements[id];
    }
}

/**
 * An ordered group of nodes parsed by XML Parsing Classes.
 *
 * The elements do not necessarily have ids, and are ordered
 * in the array .elements in the order they appear in the XML.
 * The tags accepted are specified as keys in argument tags of the
 * constructor, with their respective constructors as the values.
 */
class XMLOrderedGroup extends XMLElement {
    constructor(node, tags, attr = {}, nonEmpty = true) {
        super(node, attr);
        this.elements = [];

        if (nonEmpty && node.childElementCount === 0) {
            throw new XMLException(node, "Ordered group node must have at least one child");
        }

        for (const child of node.children) {
            const name = child.tagName.toLocaleLowerCase();

            if (!(name in tags)) {
                throw new XMLException(child, "Unexpected tagname " + name);
            }

            const element = new tags[name](child);

            this.elements.push(element);
        }
    }

    index(i) {
        const l = this.elements.length;

        if (l === 0) return null;

        return this.elements[((i % l) + l) % l];
    }
}

/**
 * An unordered set of nodes parsed by XML Parsing Classes.
 *
 * The elements are named and do not necessarily have ids.
 * 
 */
class XMLSet extends XMLElement {
    constructor(node, tags, attr = {}) {
        super(node, attr);

        function findChild(tag) {
            for (let i = 0; i < node.children.length; ++i) {
                let child = node.children[i];
                let name = child.tagName.toLocaleLowerCase();
                if (name == tag) return child;
            }
            return null;
        }

        for (const tag in tags) {
            let child = findChild(tag);

            if (child != null) {
                this[tag] = new tags[tag].xml(child);
            } else if (!tags[tag].opt) {
                throw new XMLException(node, "Expected node " + tag);
            }
        }
    }
}

/**
 * An ordered set of nodes parsed by XML Parsing Classes.
 *
 * The elements are named and do not necessarily have ids.
 * And are parsed directly into properties of this.
 * The tags accepted are specified in the array tags, whose objects
 * include constructor (.xml), optionality (.opt), and name (.name).
 */
class XMLOrderedSet extends XMLElement {
    constructor(node, tags, attr = {}) {
        super(node, attr);

        const ch = node.children;

        let i = 0;

        for (const tag of tags) {
            if (i == ch.length) {
                throw new XMLException(node, "Expected more children nodes "
                    + "(looking for child" + tag.name + ")");
            }

            const childTagname = ch[i].tagName.toLocaleLowerCase();

            if (childTagname == tag.name) {
                this[tag.name] = new tag.xml(ch[i++]);
            } else if (tag.opt) {
                this[tag.name] = null;
            } else {
                throw new XMLException(node, "Expected node " + tag.name
                 + " but got " + childTagname);
            }
        }
    }
}
