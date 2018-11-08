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

        const reader = new CGFXMLreader();

        for (const key in spec) {
            let val, str, x, y, z;

            if (typeof spec[key] === "string") {
                if (!reader.hasAttribute(node, key)) {
                    throw new XMLException(node, "Missing attribute " + key);
                }

                switch (spec[key]) {
                    case "ss": // string
                        val = reader.getString(node, key);
                        break;
                    case "ii": // positive integer
                        val = reader.getInteger(node, key);
                        if (val == null || val <= 0) {
                            throw new XMLException(node, "Expected positive integer for attribute " + key);
                        }
                        break;
                    case "ff": // float
                        val = reader.getFloat(node, key);
                        if (val == null || isNaN(val)) {
                            throw new XMLException(node, "Expected float for attribute " + key);
                        }
                        break;
                    case "p0": // nonnegative float
                        val = reader.getFloat(node, key);
                        if (val == null || isNaN(val) || val < 0) {
                            throw new XMLException(node, "Expected nonnegative float for attribute " + key);
                        }
                        break;
                    case "pp": // positive float
                        val = reader.getFloat(node, key);
                        if (val == null || isNaN(val) || val <= 0) {
                            throw new XMLException(node, "Expected positive float for attribute " + key);
                        }
                        break;
                    case "rr": // [0,1] float
                        val = reader.getFloat(node, key);
                        if (val == null || isNaN(val) || val < 0 || val > 1) {
                            throw new XMLException(node, "Expected [0,1] float for attribute " + key);
                        }
                        break;
                    case "cc": // x, y, z
                        val = reader.getItem(node, key, ['x', 'y', 'z']);
                        if (val == null) {
                            throw new XMLException(node, "Expected coordinate for attribute " + key);
                        }
                        break;
                    case "tt": // 0, 1
                        val = reader.getItem(node, key, ['0', '1', 't', 'f', "true", "false"]);
                        if (val == null) {
                            throw new XMLException(node, "Expected boolean for attribute " + key);
                        }
                        if (val === '0' || val === '1') {
                            val = val === '1' ? true : false;
                        } else if (val === 'f' || val === 't') {
                            val = val === 't' ? true : false;
                        } else {
                            val = val === "true" ? true : false;
                        }
                        break;
                    case "ff ff ff":
                        str = reader.getString(node, key).split(" ");
                        val = {
                            x: parseFloat(str[0]),
                            y: parseFloat(str[1]),
                            z: parseFloat(str[2])
                        };
                        if (isNaN(val.x) || isNaN(val.y) || isNaN(val.z)) {
                            throw new XMLException(node, "Expected float coordinates for attribute " + key);
                        }
                        break;
                    default:
                        throw "INTERNAL: Bad Element attribute descriptor";
                }
            } else if (typeof spec[key] == "object") {
                // Recurse on a child of node with tagname key.
                const child = node.querySelector(key);

                if (child == null) {
                    throw new XMLException(node, "Missing expected child node " + key);
                }

                // Do not catch possible exception.
                const element = new XMLElement(child, spec[key]);
                val = element.data;
            }

            this.data[key] = val;
        }

        // For convenience: lift the id from data.
        if (this.data.id != null) {
            this.id = this.data.id;
        }
    }

    get(attr) {
        return this.data[attr];
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
                throw "INTERNAL: attr for XMLGroup does not demand child id";
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
