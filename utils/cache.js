/**
 * Implements a texture cache to be used by the triangle and rectangle primitives.
 *
 * A texCoords array for a given pair (s,t) is stored here, and does not
 * need to be repeatedly created, only assigned -- this preserves a little bit
 * of main memory and improves speed.
 */
class TextureCache {
    constructor(spanS, spanT, baseTexCoords) {
        this.spanS = spanS;
        this.spanT = spanT;
        this.base = baseTexCoords;

        this.cache = new Map();
    }

    ensure(s, t) {
        if (!this.cache.has(s)) {
            this.cache.set(s, new Map());
        }

        if (!this.cache.get(s).has(t)) {
            this.cache.get(s).set(t, this.make(s, t));
        }
    }

    make(s, t) {
        const mS = this.spanS / s;
        const mT = this.spanT / t;

        const texCoords = [];

        for (let i = 0; i < this.base.length; i += 2) {
            texCoords.push(mS * this.base[i], mT * this.base[i + 1]);
        }

        return texCoords;
    }

    get(s, t) {
        this.ensure(s, t);

        return this.cache.get(s).get(t);
    }
}
