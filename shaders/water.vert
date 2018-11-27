#ifdef GL_ES
precision highp float;
#endif

// Ins
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

// Uniforms
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D uSampler;
uniform sampler2D heightSampler;

uniform float normScale;
uniform float texScale;
uniform float time;

varying vec2 shiftedTexCoord;

// https://stackoverflow.com/questions/15095909/from-rgb-to-hsv-in-opengl-glsl
vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

// Shift aTextureCoord according to texScale and time, dont mod to [0,1]
vec2 shift(vec2 coord) {
    return texScale * coord + time;
}

// Displace vertex along normal according to heightmap at heightSampler, greyscale
vec3 displaceGreyscale(vec3 vertex, vec3 normal, vec2 coord) {
    vec4 color = texture2D(heightSampler, mod(coord, 1.0));
    float grey = (color.r + color.g + color.b) / 3.0;
    return vertex + grey * normScale * vec3(0.0, 1.0, 0.0);
}

// Displace vertex along normal according to heightmap at heightSampler, hue linear
vec3 displaceHuescale(vec3 vertex, vec3 normal, vec2 coord) {
    vec4 color = texture2D(heightSampler, mod(coord, 1.0));
    float hue = 1.0 - rgb2hsv(color.rgb).r;
    return vertex + hue * normScale * normal;
}

void main() {
    vec2 shifted = shift(aTextureCoord);

    // Displaced position
    vec3 displaced = displaceGreyscale(aVertexPosition, aVertexNormal, shifted);
    
    // Transformed vertex position in view/eye coordinates
    vec4 vertex = uMVMatrix * vec4(displaced, 1.0);

    // Out
    shiftedTexCoord = shifted;
    gl_Position = uPMatrix * vertex;
}