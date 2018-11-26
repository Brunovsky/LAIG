// CGFaxis thickness
const AXIS_THICKNESS = 0.05;

// Make lights visible when they are enabled?
const ENABLED_LIGHTS_VISIBLE = true;

// Make lights visible when they are disabled?
const DISABLED_LIGHTS_VISIBLE = false;

// Constant attenuation for all lights
const LIGHT_CONSTANT_ATTENUATION = 0.5;

// Linear attenuation for all lights
const LIGHT_LINEAR_ATTENUATION = 0.01;

// Quadratic attenuation for all lights
const LIGHT_QUADRATIC_ATTENUATION = 0.0025;

// Update frequency
const HZ = 60;

// Use z axis instead of y axis for the height dimension in spacial primitives
const DOWN_SPACIAL = true;

// Inherit (s,t) lengths from parent component when unspecified
const INHERIT_S_T = true;

// Make <animations> child of <yas> optional
const XML_ANIMATIONS_OPT = true;

// Disallow empty <animations> in <yas>
const XML_ANIMATIONS_NONEMPTY = false;

// WebGL active texture numbers
const IMAGE_TEXTURE_GL_N = 0;
const HEIGHTMAP_TEXTURE_GL_N = 1;

// Wave behaviour ("linear" or "sine")
const WAVE_BEHAVIOUR = "linear";

// Wave period
const WAVE_PERIOD = 100;



// Target yas file, in folder scenes/
const DEFAULT_YAS_FILE = "trialscene.xml";

// Shader files, in folder shaders/
const SHADER_FILES = {
    water: {
        vertex: "vertex/water-displace.glsl",
        fragment: "fragment/water-displace.glsl"
    },
    terrain: {
        vertex: "vertex/test.glsl",
        fragment: "fragment/test.glsl"
    }
};
