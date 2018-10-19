const PI = Math.PI;

/**
 * Heart
 * http://mathworld.wolfram.com/HeartCurve.html
 *
 * Interval: [0, 2*PI]
 */
function protoHeart() {
    const sin = Math.sin, cos = Math.cos;

    return function heart(t) {
        return {
            X: 2 * sin(t) * sin(t) * sin(t),
            Y: (13 * cos(t) - 5 * cos(2*t) - 2 * cos(3*t) - cos(4*t)) / 8
        };
    }
}
const intervalHeart = [0, 2*PI];

/**
 * Butterfly
 * http://mathworld.wolfram.com/ButterflyCurve.html
 *
 * Interval: [0, 2*PI]
 */
function protoButterfly() {
    const sin = Math.sin, cos = Math.cos, pow = Math.pow, e = Math.E;
    
    return function butterfly(t) {
        const p = pow(e, cos(t)) - 2 * cos(4*t) + pow(sin(t/12), 5);
        return {
            X: sin(t) * p,
            Y: cos(t) * p
        };
    }
}
const intervalButterfly = [0, 2*PI];

/**
 * Folium
 * http://mathworld.wolfram.com/Folium.html
 * 
 * Interval: [-PI, PI]
 *
 * b = 0      -> bifolium
 * 0 < b < 4a -> trifolium
 * a = b      -> perfect trifolium
 * b >= 4a    -> single folium
 * 
 * @param a 
 * @param b 
 */
function protoFolium(a, b) {
    const sin = Math.sin, cos = Math.cos;

    return function folium(theta) {
        return cos(theta) * (4 * a * sin(theta) * sin(theta) - b);
    }
}
const intervalFolium = [-PI, PI];

/**
 * Hypocycloid
 * http://mathworld.wolfram.com/Hypocycloid.html
 *
 * Interval: [0, 2*PI]
 */
function protoHypocycloid(a, b) {
    let cos = Math.cos, sin = Math.sin;
    
    return function hypocycloid(t) {
        return {
            X: (a - b) * cos(t) - b * cos((a - b) * t / b),
            Z: (a - b) * sin(t) + b * sin((a - b) * t / b),
        };
    }
}
const intervalHypocycloid = [0, 2*PI];

/**
 * Torus
 * http://mathworld.wolfram.com/Torus.html
 *
 * Interval: [-PI, PI, -PI, PI]
 *           [0, 2*PI, 0, 2*PI]
 *
 * inner < outer -> Ring Torus
 * inner = outer -> Horn Torus
 * inner > outer -> Spindle Torus
 * 
 * @param inner Radius of the torus tube
 * @param outer Radius from the torus's center to the tube's radial center
 */
function protoTorus(inner, outer) {
    // inner -> radius of torus tube
    // outer -> radius, from center of torus to center of torus tube
    // outer > inner -> ring torus
    // outer = inner -> horn torus
    // outer < inner -> spindle torus
    const sin = Math.sin, cos = Math.cos;

    return function torus(u, v) {
        return {
            X: (outer + inner * cos(v)) * cos(u),
            Y: inner * sin(v),
            Z: (outer + inner * cos(v)) * sin(u)
        };
    }
}
const intervalTorus = [-PI, PI, -PI, PI];

/**
 * Eight Surface
 * http://mathworld.wolfram.com/EightSurface.html
 *
 * Interval: [0, 2*PI, -PI/2, PI/2]
 */
function protoEightSurface() {
    const sin = Math.sin, cos = Math.cos;

    return function eightSurface(u, v) {
        return {
            X: cos(u) * sin(2*v),
            Y: sin(u) * sin(2*v),
            Z: sin(v)
        };
    }
}
const intervalEightSurface = [0, 2*PI, -PI/2, PI/2];

/**
 * Astroidal Ellipsoid
 * http://mathworld.wolfram.com/AstroidalEllipsoid.html
 *
 * Interval: [-PI/2, PI/2, -PI, PI]
 */
function protoAstroidalEllipsoid() {
    const sin = Math.sin, cos = Math.cos;

    return function astroidalEllipsoid(u, v) {
        const s3u = sin(u) * sin(u) * sin(u);
        const c3u = cos(u) * cos(u) * cos(u);
        const s3v = sin(v) * sin(v) * sin(v);
        const c3v = cos(v) * cos(v) * cos(v);
        return {
            X: c3u * c3v,
            Y: s3u * c3v,
            Z: s3v
        };
    }
}
const intervalAstroidalEllipsoid = [-PI/2, PI/2, -PI, PI];

/**
 * Kiss Surface
 * http://mathworld.wolfram.com/KissSurface.html
 *
 * Interval: [-PI, PI, -1, 1]
 */
function protoKissSurface() {
    const sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt;

    return function kissSurface(u, v) {
        return {
            X: v * v * sqrt((1 - v) / 2) * cos(u),
            Y: v * v * sqrt((1 - v) / 2) * sin(u),
            Z: v
        };
    }
}
const intervalKissSurface = [-PI, PI, -1, 1];

/**
 * Bohemian Dome
 * http://mathworld.wolfram.com/BohemianDome.html
 *
 * Interval: [-PI, PI, -PI, PI]
 * 
 * @param a X and Y axis
 * @param b Y axis
 * @param c Z axis
 */
function protoBohemianDome(a, b, c) {
    const sin = Math.sin, cos = Math.cos;

    return function bohemianDome(u, v) {
        return {
            X: a * cos(u),
            Y: b * cos(v) + a * sin(u),
            Z: c * sin(v)
        };
    }
}
const intervalBohemianDome = [-PI, PI, -PI, PI];

/**
 * Crossed Trough
 * http://mathworld.wolfram.com/CrossedTrough.html
 *
 * Interval: [-1, 1, -1, 1]
 */
function protoCrossedTrough() {
    return function crossedTrough(x, y) {
        return x * x * y * y;
    }
}
const intervalCrossedTrough = [-1, 1, -1, 1];

/**
 * Sine Surface
 * http://mathworld.wolfram.com/SineSurface.html
 *
 * Interval: [-PI, PI, -PI, PI]
 */
function protoSineSurface() {
    const sin = Math.sin;

    return function sineSurface(u, v) {
        return {
            X: sin(u),
            Y: sin(v),
            Z: sin(u + v)
        };
    }
}
const intervalSineSurface = [-PI, PI, -PI, PI];

/**
 * Cayley Surface
 * http://mathworld.wolfram.com/CayleySurface.html
 *
 * Interval: [-1, 1, -1, 1]
 */
function protoCayleySurface() {
    const cbrt = Math.cbrt;

    return function cayleySurface(x, y) {
        return x * y - cbrt(x) / 3;
    }
}
const intervalCayleySurface = [-1, 1, -1, 1];

/**
 * Mobius Strip
 * http://mathworld.wolfram.com/MoebiusStrip.html
 *
 * Interval: [-PI, PI, -0.5, 0.5]
 */
function protoMobiusStrip() {
    const sin = Math.sin, cos = Math.cos;

    return function mobiusStrip(u, v) {
        return {
            X: 2 * cos(u) + v * cos(u/2),
            Y: 2 * sin(u) + v * cos(u/2),
            Z: v * sin(u / 2)
        };
    }
}
const intervalMobiusStrip = [-PI, PI, -0.5, 0.5];

/**
 * Elliptic Hyperboloid
 * http://mathworld.wolfram.com/EllipticHyperboloid.html
 *
 * Interval: [-1, 1, -PI, PI]
 */
function protoEllipticHyperboloid() {
    const sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt;
    
    return function ellipticHyperboloid(u, v) {
        return {
            X: sqrt(1 + u*u) * cos(v),
            Y: sqrt(1 + u*u) * sin(v),
            Z: u
        };
    }
}
const intervalEllipticHyperboloid = [-1, 1, -PI, PI];

/**
 * Cross-Cap
 * http://mathworld.wolfram.com/Cross-Cap.html
 *
 * Interval: [-PI, PI, 0, PI/2]
 */
function protoCrossCap() {
    const sin = Math.sin, cos = Math.cos;

    return function crossCap(u, v) {
        return {
            X: cos(u) * sin(2*v),
            Y: sin(u) * sin(2*v),
            Z: cos(v) * cos(v) - cos(u) * cos(u) * sin(v) * sin(v)
        };
    }
}
const intervalCrossCap = [-PI, PI, 0, PI/2];

function protoCrossCap2() {
    const sin = Math.sin, cos = Math.cos;

    return function crossCap2(u, v) {
        return {
            X: sin(u) * sin(2*v),
            Y: 2 * sin(2*u) * sin(v) * sin(v),
            Z: 2 * cos(2*u) * sin(v) * sin(v)
        };
    }
}
const intervalCrossCap2 = [-PI, PI, 0, PI/2];

/**
 * Cornucopia
 * http://mathworld.wolfram.com/Cornucopia.html
 *
 * Interval: [-PI, PI, -2, 0.5]
 * 
 * @param a
 * @param b
 */
function protoCornucopia(a, b) {
    const sin = Math.sin, cos = Math.cos, e = Math.E, pow = Math.pow;

    return function cornucopia(u, v) {
        return {
            X: pow(e, b * v) * cos(v) + pow(e, a * v) * cos(u) * cos(v),
            Y: pow(e, b * v) * sin(v) + pow(e, a * v) * cos(u) * sin(v),
            Z: pow(e, a * v) * sin(u)
        };
    }
}
const intervalCornucopia = [-PI, PI, -2, 0.5];

/**
 * Henneberg's Minimal
 * http://mathworld.wolfram.com/HennebergsMinimalSurface.html
 *
 * Interval: [-PI/8, PI/8, -PI, PI]
 */
function protoHennebergMinimal() {
    const sin = Math.sin, cos = Math.cos, sinh = Math.sinh, cosh = Math.cosh;

    return function hennebergMinimal(u, v) {
        return {
            X: 2 * sinh(u) * cos(v) - (2/3) * sinh(3*u) * cos(3*v),
            Y: 2 * sinh(u) * sin(v) + (2/3) * sinh(3*u) * sin(3*v),
            Z: 2 * cosh(2*u) * cos(2*v)
        };
    }
}
const intervalHennebergMinimal = [-PI/8, PI/8, -PI, PI];

/**
 * Roman Surface
 * http://mathworld.wolfram.com/RomanSurface.html
 *
 * Interval: [-PI, PI, -PI/2, PI/2]
 */
function protoRomanSurface() {
    const sin = Math.sin, cos = Math.cos;

    return function romanSurface(u, v) {
        return {
            X: sin(2*u) * sin(v) * sin(v),
            Y: sin(u) * cos(2*v),
            Z: cos(u) * sin(2*v)
        };
    }
}
const intervalRomanSurface = [-PI, PI, -PI/2, PI/2];

/**
 * Corkscrew
 * http://mathworld.wolfram.com/CorkscrewSurface.html
 *
 * Interval: [-PI, PI, -PI, PI]
 *
 * @param a Defines the radius of the loop
 * @param b Defines the ascension of the loop
 */
function protoCorkscrew(a, b) {
    const sin = Math.sin, cos = Math.cos;

    return function corkscrew(u, v) {
        return {
            X: a * cos(u) * cos(v),
            Y: a * sin(u) * cos(v),
            Z: a * sin(v) + b * u
        };
    }
}
const intervalCorkscrew = [-PI, PI, -PI, PI];

/**
 * Klein Bottle
 * http://mathworld.wolfram.com/KleinBottle.html
 *
 * Interval: [-PI, PI, -PI, PI]
 */

function protoKleinBottle() {
    const sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt;

    return function kleinBottle(u, v) {
        const sqv = sqrt(2) + cos(v);
        const factor = cos(u/2) * sqv + sin(u/2) * sin(v) * cos(v)
        return {
            X: cos(u) * factor,
            Y: sin(u) * factor,
            Z: -sin(u/2) * sqv + cos(u/2) * sin(v) * cos(v)
        };
    }
}
const intervalKleinBottle = [-PI, PI, -PI, PI];

function protoKleinBottle2() {
    const sin = Math.sin, cos = Math.cos, PI = Math.PI, sqrt = Math.sqrt;

    return function kleinBottle2(u, v) {
        const r = 4 * (1 - cos(u) / 2);
        const c = 1/6;
        if ((u % (2 * PI)) < PI) {
            return scaleVector(c, {
                X: 6 * cos(u) * (1 + sin(u)) + r * cos(u) * cos(v),
                Y: 16 * sin(u) + r * sin(u) * cos(v),
                Z: r * sin(v)
            });
        } else {
            return scaleVector(c, {
                X: 6 * cos(u) * (1 + sin(u)) + r * cos(v + PI),
                Y: 16 * sin(u),
                Z: r * sin(v)
            });
        }
    }
}
const intervalKleinBottle2 = [-PI, PI, -PI, PI];
