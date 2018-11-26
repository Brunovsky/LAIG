#ifdef GL_ES
precision highp float;
#endif

varying vec2 shiftedTexCoord;

uniform sampler2D uSampler;

vec4 getColor(vec2 coord) {
    vec4 color = texture2D(uSampler, mod(coord, 1.0));
    return vec4(clamp(color.rgb, vec3(0.0), vec3(1.0)), 1.0);
    // the clamp is probably not necessary
}

void main() {
    gl_FragColor = getColor(shiftedTexCoord);
}