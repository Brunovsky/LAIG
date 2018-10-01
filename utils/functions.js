function heart(t) {
    const sin = Math.sin, cos = Math.cos;
    return {
        X: 2 * sin(t) * sin(t) * sin(t),
        Y: (13 * cos(t) - 5 * cos(2*t) - 2 * cos(3*t) - cos(4*t)) / 8
    };
}

function butterfly(t) {
    const sin = Math.sin, cos = Math.cos, pow = Math.pow, e = Math.E;
    const p = pow(e, cos(t)) - 2 * cos(4*t) + pow(sin(t/12), 5);
    return {
        X: sin(t) * p,
        Y: cos(t) * p
    };
}

function trifolium(theta) {
    const sin = Math.sin, cos = Math.cos;
    return cos(theta) * (4 * sin(theta) * sin(theta) - 1);
}

function eightSurface(u, v) {
    const sin = Math.sin, cos = Math.cos;
    return {
        X: cos(u) * sin(2*v),
        Y: sin(u) * sin(2*v),
        Z: sin(v)
    };
}

function astroidalEllipsoid(u, v) {
    const sin = Math.sin, cos = Math.cos;
    
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

function kissSurface(u, v) {
    const sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt;
    return {
        X: v * v * sqrt((1 - v) / 2) * cos(u),
        Y: v * v * sqrt((1 - v) / 2) * sin(u),
        Z: v
    }
}

function bohemianDome(u, v) {
    const sin = Math.sin, cos = Math.cos;
    return {
        X: 0.5 * cos(u),
        Y: 1.5 * cos(v) + 0.5 * sin(u),
        Z: 1 * sin(v)
    };
}

function sineSurface(u, v) {
    const sin = Math.sin;
    return {
        X: sin(u),
        Y: sin(v),
        Z: sin(u + v)
    };
}

function cayleySurface(x, y) {
    return x * y - Math.cbrt(x) / 3;
}

function mobiusStrip(u, v) {
    const sin = Math.sin, cos = Math.cos;
    return {
        X: 2 * cos(u) + v * cos(u / 2),
        Y: 2 * sin(u) + v * cos(u / 2),
        Z: v * sin(u / 2)
    };
}

function ellipticHyperboloid(u, v) {
    const sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt;
    return {
        X: sqrt(1 + u * u) * cos(v),
        Y: sqrt(1 + u * u) * sin(v),
        Z: u
    };
}

function monkeySaddle(x, y) {
    return x * (x * x - 3 * y * y);
}

function crossCap(u, v) {
    const sin = Math.sin, cos = Math.cos;
    return {
        X: cos(u) * sin(2*v),
        Y: sin(u) * sin(2*v),
        Z: cos(v) * cos(v) - cos(u) * cos(u) * sin(v) * sin(v)
    }
}

function crossCap2(u, v) {
    const sin = Math.sin, cos = Math.cos;
    return {
        X: sin(u) * sin(2*v),
        Y: 2 * sin(2*u) * sin(v) * sin(v),
        Z: 2 * cos(2*u) * sin(v) * sin(v)
    }
}

function cornucopia(u, v) {
    const sin = Math.sin, cos = Math.cos, e = Math.E, pow = Math.pow;
    return {
        X: pow(e, v) * (cos(v) + cos(u) * cos(v)),
        Y: pow(e, v) * (sin(v) + cos(u) * sin(v)),
        Z: pow(e, v) * sin(u)
    };
}

function hennebergMinimal(u, v) {
    const sin = Math.sin, cos = Math.cos, sinh = Math.sinh, cosh = Math.cosh;
    return {
        X: 2 * sinh(u) * cos(v) - (2/3) * sinh(3*u) * cos(3*v),
        Y: 2 * sinh(u) * sin(v) + (2/3) * sinh(3*u) * sin(3*v),
        Z: 2 * cosh(2*u) * cos(2*v)
    }
}

function mennSurface(x, y) {
    return (x * x * x * x) + (x * x * y) - y * y; 
}

function romanSurface(u, v) {
    const sin = Math.sin, cos = Math.cos;
    return {
        X: sin(2*u) * sin(v) * sin(v),
        Y: sin(u) * cos(2*v),
        Z: cos(u) * sin(2*v)
    }
}

function corkScrew(u, v) {
    const sin = Math.sin, cos = Math.cos;
    return {
        X: cos(u) * cos(v),
        Y: sin(u) * cos(v),
        Z: sin(v) + u
    }
}

function kleinBottle(u, v) {
    const sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt;
    const sqv = sqrt(2) + cos(v);
    const factor = cos(u/2) * sqv + sin(u/2) * sin(v) * cos(v)
    return {
        X: cos(u) * factor,
        Y: sin(u) * factor,
        Z: -sin(u/2) * sqv + cos(u/2) * sin(v) * cos(v)
    }
}

function kleinBottle2(u, v) {
    const sin = Math.sin, cos = Math.cos, PI = Math.PI, sqrt = Math.sqrt;
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

function torus(u, v) {
    const a = 1, c = 2;
    const sin = Math.sin, cos = Math.cos;
    return {
        X: (c + a * cos(v)) * cos(u),
        Y: (c + a * cos(v)) * sin(u),
        Z: a * sin(v)
    };
}


let sampleBezier = protoBezierSurface(
    [
        {X: -1, Y:  1, Z:  0},
        {X:  0, Y:  1, Z: -2},
        {X:  1, Y:  1, Z:  0}
    ],
    [
        {X: -1, Y:  0, Z:  0},
        {X:  0, Y:  0, Z: -4},
        {X:  1, Y:  0, Z:  0}
    ],
    [
        {X: -1, Y: -1, Z:  0},
        {X:  0, Y: -1, Z: -1},
        {X:  1, Y: -1, Z:  0}
    ]
);

function hypocycloid(a, b, t) {
    let cos = Math.cos, sin = Math.sin;
    return {
        X: (a - b) * cos(t) - b * cos((a - b) * t / b),
        Z: (a - b) * sin(t) + b * sin((a - b) * t / b),
    };
}
