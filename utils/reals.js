// ln(a|x| + 1) / ln(b)
Math.ulog = function(a, x, b) {
    return Math.log1p(a * Math.abs(x)) / Math.log(b);
}

// Derivative of above
Math.dulog = function(a, x, b) {
    return a / ((Math.abs(x) + 1) * Math.log(b));
}

function degToRad(deg) {
    return deg * Math.PI / 180;
}

// Value of polynomial with coefficients ...coefs at X.
function polynomial(X, ...coefs) {
    let val = 0;
    for (let i = 0; i < coefs.length; ++i) {
        val = val * X + coefs[i];
    }
    return val;
}

// Value of derivative of said polynomial at X.
function polynomialDerivative(X, ...coefs) {
    let val = 0;
    let k = coefs.length;
    for (let i = 0; i < coefs.length - 1; ++i) {
        val = val * X + (--k * coefs[i]);
    }
    return val;
}

function protoPolynomial(...coefs) {
    let poly = X => polynomial(X, ...coefs);
    poly.derivative = X => polynomialDerivative(X, ...coefs);
    return poly;
}

function interpolate(X, I, F) {
    return ((I.Y - F.Y) / (I.X - F.X)) * X
        + (I.X * F.Y - F.X * I.Y) / (I.X - F.X);
}
// X => interpolate(X,I,F)

function linearMap(X, I, F) {
    return (F[0] - F[1]) / (I[0] - I[1]) * X
        + (I[0] * F[1] - F[0] * I[1]) / (I[0] - I[1]);
}
// X => linearMap(X,I,F)

/**
 * Say we have functions f : R --> R and g : R --> R, and an interval I [x1, x2].
 *
 * Assume f(x) <= g(x).
 * The area lying between f(I) and g(I) may be parametrized as
 * a uv surface where u lies in [0, 1] and v lies in [0, 1].
 */
function areaMap(u, v, f, g, I) {
    let X = linearMap(u, [0, 1], I);
    let Y = linearMap(v, [0, 1], [f(X), g(X)]);
    return {X: X, Y: Y};
}
// (u,v) => areaMap(u,v,f,g,I)

/**
 * Compute the 4th degree polynomial starting at I = (I.X, I.Y) and ending at F = (F.X, F.Y)
 * with slope I.d at I and slope F.d at F.
 * The 4th degree coefficient w is given.
 *
 * This is the solution of the system:
 *
 * [  1       0       0       0       0  ] [ u4 ]   [  w ]
 * [ Ix^4    Ix^3    Ix^2    Ix^1     1  ] [ u3 ]   [ Iy ]
 * [ Fx^4    Fx^3    Fx^2    Fx^1     1  ] [ u2 ] = [ Fy ]
 * [4Ix^3   3Ix^2   2Ix^1     1       0  ] [ u1 ]   [ dI ]
 * [4Fx^3   3Fx^2   2Fx^1     1       0  ] [ u0 ]   [ dF ]
 */
function protoHermitePolynomial(w, I, F) {
    let det = (I.X - F.X) ** 3;

    // u4 X**4
    let u4 = w;

    // u3 X**3
    let u3 = 2 * w * ((I.X ** 4) - (2 * F.X * I.X ** 3) + (2 * F.X ** 3 * I.X) - (F.X ** 4));
    u3 += (F.X - I.X) * (I.d + F.d);
    u3 += 2 * (I.Y - F.Y);
    u3 = -u3 / det;

    // u2 X**2
    let u2 = w * ((I.X ** 5) + (F.X * I.X ** 4) - (8 * F.X ** 2 * I.X ** 3) + (8 * F.X ** 3 * I.X ** 2) - (F.X ** 4 * I.X) - (F.X ** 5));
    u2 += I.d * ((2 * F.X ** 2) - (F.X * I.X) - (I.X ** 2));
    u2 -= F.d * ((2 * I.X ** 2) - (I.X * F.X) - (F.X ** 2));
    u2 += 3 * (I.X + F.X) * (I.Y - F.Y);
    u2 = u2 / det;

    // u1 X
    let u1 = 2 * w * ((F.X * I.X ** 5) - (2 * F.X ** 2 * I.X ** 4) + (2 * F.X ** 4 * I.X ** 2) - (F.X ** 5 * I.X));
    u1 += I.d * ((-2 * F.X * I.X ** 2) + (F.X ** 2 * I.X) + (F.X ** 3));
    u1 -= F.d * ((-2 * I.X * F.X ** 2) + (I.X ** 2 * F.X) + (I.X ** 3));
    u1 += 6 * F.X * I.X * (I.Y - F.Y);
    u1 = -u1 / det;

    // u0
    let u0 = w * ((F.X ** 2 * I.X ** 5) - (3 * F.X ** 3 * I.X ** 4) + (3 * F.X ** 4 * I.X ** 3) - (F.X ** 5 * I.X ** 2));
    u0 += I.d * ((I.X * F.X ** 3) - (I.X ** 2 * F.X ** 2));
    u0 -= F.d * ((F.X * I.X ** 3) - (F.X ** 2 * I.X ** 2));
    u0 += 3 * F.X * I.X * (F.X * I.Y - I.X * F.Y) + (F.Y * I.X ** 3) - (I.Y * F.X ** 3);
    u0 = u0 / det;

    let poly = protoPolynomial(u4, u3, u2, u1, u0);

    console.log(u4, u3, u2, u1, u0);
    return poly;
}
