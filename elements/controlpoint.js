/**
 * XML Parsing Class
 * Parses * > controlpoint
 */
class XMLControlPoint extends XMLElement {
    constructor(node) {
        super(node, {
            xx: "ff", yy: "ff", zz: "ff"
        });

        this.x = this.xx = this.data.xx;
        this.y = this.yy = this.data.yy;
        this.z = this.zz = this.data.zz;
        this.w = this.ww = this.data.ww;

        this.type = "controlpoint";
    }
}

/**
 * XML Parsing Class
 * Parses * > controlpoint
 */
class XMLWeighedControlPoint extends XMLElement {
    constructor(node) {
        super(node, {
            xx: "ff", yy: "ff", zz: "ff", ww: "pp"
        });

        this.x = this.xx = this.data.xx;
        this.y = this.yy = this.data.yy;
        this.z = this.zz = this.data.zz;
        this.w = this.ww = this.data.ww;

        this.type = "controlpoint";
    }
}
