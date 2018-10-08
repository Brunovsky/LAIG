const DEGREE_TO_RAD = Math.PI / 180;

const AXIS_THICKNESS = 0.05;

const ENABLED_LIGHTS_VISIBLE = true;

const DISABLED_LIGHTS_VISIBLE = false;

const DEBUG_DISPLAY = true;

const DEFAULT_YAS_FILE = "scenes/staircase.xml";

const LIGHT_CONSTANT_ATTENUATION = 0.5;

const LIGHT_LINEAR_ATTENUATION = 0.01;

const LIGHT_QUADRATIC_ATTENUATION = 0.0025;

const HZ = 60; // Update frequency

function degToRad(deg) {
    return deg * DEGREE_TO_RAD;
}
