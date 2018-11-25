#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;
uniform sampler2D uSampler2;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float normScale;
varying vec4 coords;
varying vec4 normal;
varying vec2 vTextureCoord;

void main()
{
    vTextureCoord = aTextureCoord;
    vec4 rgb = texture2D(uSampler2, vTextureCoord);
    vec3 offset = vec3(0.0, rgb.r * 0.3 + rgb.g * 0.59 + rgb.b * 0.11, 0.0);
    offset = offset * normScale;
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}