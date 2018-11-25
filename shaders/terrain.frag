#ifdef GL_ES
precision highp float;
#endif
varying vec4 coords;
varying vec4 normal;
uniform float timeFactor;
uniform vec4 selColor;
uniform sampler2D uSampler;
varying vec2 vTextureCoord;


void main()
{

    gl_FragColor = texture2D(uSampler, vTextureCoord);

}