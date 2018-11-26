// Ins
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D uSampler;
uniform sampler2D heightSampler;

// Outs
varying vec3 vNormal;
varying vec3 vEyeVec;

vec3 displace(vec3 vertex, vec3 normal, vec2 coord) {
    vec4 tex = texture2D(heightSampler, coord); // basic texture access
    
}

void main() {
    // Transformed vertex position in view/eye coordinates
    vec4 vertex = uMVMatrix * vec4(aVertexPosition, 1.0);

    // Transformed normal position
    vec3 N = normalize(vec3(uNMatrix * vec4(aVertexNormal, 1.0)));

    vec3 eyeVec = -vec3(vertex.xyz);
    vec3 E = normalize(eyeVec);
}