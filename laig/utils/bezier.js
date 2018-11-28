/**
 * bezier.js
 *
 * The function protoBezierCurve3D(...points) with n+1 arguments returns a function
 * that takes a real argument t and computes the n-th degree bezier curve
 * with the specified control points, each of the form {X: Y: Z:} or [X, Y, Z].
 *
 * The function protoBezierSurface(...points) takes a (n+1)(m+1) matrix argument
 * and returns a function that computes the uvSurface.
 *
 * Both use De Casteljau's algorithm for the calculation.
 */

function checkDegree(points) {
    const uL = points.length;
    if (uL < 2) return false;

    const vL = points[0].length;
    if (vL < 2) return false;

    for (let i = 0; i < points.length; ++i) {
        if (vL !== points[i].length) return false;
    }

    return {u: uL - 1, v: vL - 1};
}

function binomial(n, k) {
    if (k < 0 || k > n) return 0;
    if (k == 0 || k == n) return 1;

    k = Math.min(k, n - k);

    let val = 1;
    while (k > 0) {
        val *= (n-- / k--);
    };

    return Math.round(val);
}

function bernstein(n, i, t) {
    return binomial(n, i) * (t ** i) * ((1 - t) ** (n - i));
}

function protoBezierCurve(points) {
    const deg = points.length - 1;
    if (deg < 1) return false;

    const bern = bernstein;
    const mult = multVectors;

    let bezier = function(t) {
        let Point = {X: 0, Y: 0, Z: 0};
        for (let i = 0; i <= deg; ++i) {
            Point = mult(Point, bern(deg, i, t), points[i]);
        }
        return Point;
    }

    return bezier;
}

function protoBezierSurface(points) {
    const deg = checkDegree(points);
    if (!deg) return false;

    const bern = bernstein;
    const mult = multVectors;

    let bezier = function(u, v) {
        let Point = {X: 0, Y: 0, Z: 0};
        for (let i = 0; i <= deg.u; ++i) {
            for (let j = 0; j <= deg.v; ++j) {
                Point = mult(Point, bern(deg.u, i, u) * bern(deg.v, j, v), points[i][j]);
            }
        }
        return Point;
    }

    return bezier;
}
