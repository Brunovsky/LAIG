/**
 * XML Parsing Class
 * Parses yas > primitives > primitive
 */
class XMLPrimitive extends XMLElement {
    constructor(node) {
        super(node, { id: "ss" });

        this.type = "primitive";

        if (node.childElementCount != 1) {
            throw new XMLException(node, "Primitive node must have exactly one child");
        }

        const child = node.firstElementChild;
        const name = child.tagName.toLocaleLowerCase();

        if (!(name in XMLFiguresList)) {
            throw new XMLException(node, "Primitive " + name + " not recognized");
        } else {
            this.figure = new XMLFiguresList[name].const(child);
        }

        this.cache = new Map();
    }
}

/**
 * XML Parsing Class
 * Parses yas > primitives
 */
class XMLPrimitives extends XMLGroup {
    constructor(node) {
        super(node, {
            primitive: XMLPrimitive,
        });

        this.type = "primitives";
    }
}

const XMLFiguresList = {
    // 1. Planar Primitives
    square:              {adjust:  true, const: XMLSquare},
    regular:             {adjust:  true, const: XMLRegular},
    circle:              {adjust:  true, const: XMLCircle},
    triangle:            {adjust:  true, const: XMLTriangle},
    rectangle:           {adjust:  true, const: XMLRectangle},
    trapezium:           {adjust:  true, const: XMLTrapezium},

    // 2. Spacial Primitives
    cone:                {adjust: false, const: XMLCone},
    pyramid:             {adjust: false, const: XMLPyramid},
    cylinder:            {adjust: false, const: XMLCylinder},
    prism:               {adjust: false, const: XMLPrism},
    cube:                {adjust: false, const: XMLCube},
    block:               {adjust: false, const: XMLBlock},
    sphere:              {adjust: false, const: XMLFlipSphere},
    halfsphere:          {adjust: false, const: XMLHalfSphere},
    opencone:            {adjust: false, const: XMLOpenCone},
    doublecone:          {adjust: false, const: XMLDoubleCone},
    spheredcone:         {adjust: false, const: XMLSpheredCone},
    openpyramid:         {adjust: false, const: XMLOpenPyramid},
    doublepyramid:       {adjust: false, const: XMLDoublePyramid},
    opencylinder:        {adjust: false, const: XMLOpenCylinder},
    doublecylinder:      {adjust: false, const: XMLDoubleCylinder},
    spheredcylinder:     {adjust: false, const: XMLSpheredCylinder},
    openprism:           {adjust: false, const: XMLOpenPrism},
    doubleprism:         {adjust: false, const: XMLDoublePrism},
    openhalfsphere:      {adjust: false, const: XMLOpenHalfSphere},
    flipsphere:          {adjust: false, const: XMLFlipSphere},

    // 3. Complex Planar Primitives
    heart:               {adjust:  true, const: XMLHeart},
    butterfly:           {adjust:  true, const: XMLButterfly},
    folium:              {adjust:  true, const: XMLFolium},
    hypocycloid:         {adjust:  true, const: XMLHypocycloid},

    // 4. Surface Primitives
    torus:               {adjust: false, const: XMLTorus},
    eight:               {adjust: false, const: XMLEightSurface},
    astroidal:           {adjust: false, const: XMLAstroidal},
    kiss:                {adjust: false, const: XMLKissSurface},
    bohemiandome:        {adjust: false, const: XMLBohemianDome},
    crossedtrough:       {adjust: false, const: XMLCrossedTrough},
    sine:                {adjust: false, const: XMLSineSurface},
    cayley:              {adjust: false, const: XMLCayleySurface},
    mobius:              {adjust: false, const: XMLMobiusStrip},
    elliptichyperboloid: {adjust: false, const: XMLEllipticHyperboloid},
    crosscap:            {adjust: false, const: XMLCrossCap},
    crosscap2:           {adjust: false, const: XMLCrossCap2},
    cornucopia:          {adjust: false, const: XMLCornucopia},
    henneberg:           {adjust: false, const: XMLHennebergMinimal},
    roman:               {adjust: false, const: XMLRomanSurface},
    corkscrew:           {adjust: false, const: XMLCorkscrew},
    kleinbottle:         {adjust: false, const: XMLKleinBottle},
    kleinbottle2:        {adjust: false, const: XMLKleinBottle2},

    // 5. Complex Primitives
    plane:               {adjust:  true, const: XMLPlane},
    patch:               {adjust:  true, const: XMLPatch},
    vehicle:             {adjust:  true, const: XMLVehicle},
    cylinder2:           {adjust: false, const: XMLCylinder2},
    terrain:             {adjust:  true, const: XMLTerrain},
    water:               {adjust:  true, const: XMLWater},
};

function isTexAdjusted(primitive) {
    return XMLFiguresList[primitive.figure.type].adjust;
}

function buildPrimitive(scene, primitive) {
    const type = primitive.figure.type;
    const dt = primitive.figure.data;

    const PI = Math.PI;

    switch (type) {
    // 1. Planar Primitives
    case 'square':
        return new Square(scene, dt.side);
    case 'regular':
        return new Regular(scene, dt.sides, dt.radius);
    case 'circle':
        return new Circle(scene, dt.radius, dt.slices);
    case 'triangle': // Not Supported
        return new Triangle(scene, dt.x1, dt.y1, dt.z1,
            dt.x2, dt.y2, dt.z2, dt.x3, dt.y3, dt.z3);
    case 'rectangle': // Not Supported
        return new Rectangle(scene, {x1: dt.x1, y1: dt.y1, x2: dt.x2, y2: dt.y2});
    case 'trapezium':
        return new Trapezium(scene, dt.base, dt.height, dt.top);

    // 2. Spacial Primitives
    case 'cone':
        return new ClosedCone(scene, dt.radius, dt.height, dt.slices, dt.stacks);
    case 'pyramid':
        return new ClosedPyramid(scene, dt.sides, dt.radius, dt.height, dt.stacks);
    case 'cylinder':
        return new ClosedCutCone(scene, dt.base, dt.top, dt.height, dt.slices, dt.stacks);
    case 'prism':
        return new ClosedPrism(scene, dt.sides, dt.radius, dt.height, dt.stacks);
    case 'cube':
        return new Cube(scene, dt.side);
    case 'block':
        return new Block(scene, dt.x, dt.y, dt.z);
    case 'sphere':
        return new Sphere(scene, dt.radius, dt.slices, dt.stacks);
    case 'halfsphere':
        return new ClosedHalfSphere(scene, dt.radius, dt.slices, dt.stacks);
        
    case 'opencone':
        return new Cone(scene, dt.radius, dt.height, dt.slices, dt.stacks);
    case 'doublecone':
        return new DoubleCone(scene, dt.radius, dt.height, dt.slices, dt.stacks);
    case 'spheredcone':
        return new SpheredCone(scene, dt.radius, dt.height, dt.slices, dt.stacks);
    case 'openpyramid':
        return new Pyramid(scene, dt.sides, dt.radius, dt.height, dt.stacks);
    case 'doublepyramid':
        return new DoublePyramid(scene, dt.sides, dt.radius, dt.height, dt.stacks);
    case 'opencylinder':
        return new CutCone(scene, dt.base, dt.top, dt.height, dt.slices, dt.stacks);
    case 'doublecylinder':
        return new DoubleCutCone(scene, dt.base, dt.top, dt.height, dt.slices, dt.stacks);
    case 'spheredcylinder':
        return new SpheredCutCone(scene, dt.base, dt.top, dt.height, dt.slices, dt.stacks);
    case 'openprism':
        return new CutPyramid(scene, dt.sides, dt.base, dt.top, dt.height, dt.stacks);
    case 'doubleprism':
        return new DoubleCutPyramid(scene, dt.sides, dt.base, dt.top, dt.height, dt.stacks);
    case 'openhalfsphere':
        return new HalfSphere(scene, dt.radius, dt.slices, dt.stacks);
    case 'flipsphere':
        return new FlipSphere(scene, dt.radius, dt.slices, dt.stacks);

    // 3. Complex Planar Primitives
    case 'heart':
        return new tPolygon(scene, protoHeart(), intervalHeart, dt.samples);
    case 'butterfly':
        return new tPolygon(scene, protoButterfly(), intervalButterfly, dt.samples);
    case 'folium':
        return new rPolygon(scene, protoFolium(dt.a, dt.b), intervalFolium, dt.samples);
    case 'hypocycloid':
        return new tPolygon(scene, protoHypocycloid(dt.a, dt.b), intervalHypocycloid, dt.samples);

    // 4. Surface Primitives
    case 'torus':
        return new uvSurface(scene, protoTorus(dt.inner, dt.outer),
            intervalTorus, dt.slices, dt.loops);
    case 'eight':
        return new uvSurface(scene, protoEightSurface(),
            intervalEightSurface, dt.slices, dt.stacks);
    case 'astroidal':
        return new uvSurface(scene, protoAstroidalEllipsoid(),
            intervalAstroidalEllipsoid, dt.slices, dt.stacks);
    case 'kiss':
        return new uvSurface(scene, protoKissSurface(),
            intervalKissSurface, dt.slices, dt.stacks);
    case 'bohemiandome':
        return new uvSurface(scene, protoBohemianDome(dt.a, dt.b, dt.c),
            intervalBohemianDome, dt.slices, dt.stacks);
    case 'crossedtrough':
        return new zSurface(scene, protoCrossedTrough(),
            intervalCrossedTrough, dt.slices, dt.stacks);
    case 'sine':
        return new uvSurface(scene, protoSineSurface(),
            intervalSineSurface, dt.slices, dt.stacks);
    case 'cayley':
        return new zSurface(scene, protoCayleySurface(),
            intervalCayleySurface, dt.slices, dt.stacks);
    case 'mobius':
        return new uvSurface(scene, protoMobiusStrip(),
            intervalMobiusStrip, dt.slices, dt.stacks);
    case 'elliptichyperboloid':
        return new uvSurface(scene, protoEllipticHyperboloid(),
            intervalEllipticHyperboloid, dt.slices, dt.stacks);
    case 'crosscap':
        return new uvSurface(scene, protoCrossCap(),
            intervalCrossCap, dt.slices, dt.stacks);
    case 'crosscap2':
        return new uvSurface(scene, protoCrossCap2(),
            intervalCrossCap2, dt.slices, dt.stacks);
    case 'cornucopia':
        return new uvSurface(scene, protoCornucopia(dt.a, dt.b),
            intervalCornucopia, dt.slices, dt.stacks);
    case 'henneberg':
        return new uvSurface(scene, protoHennebergMinimal(),
            intervalHennebergMinimal, dt.slices, dt.stacks);
    case 'roman':
        return new uvSurface(scene, protoRomanSurface(),
            intervalRomanSurface, dt.slices, dt.stacks);
    case 'corkscrew':
        return new uvSurface(scene, protoCorkscrew(dt.a, dt.b),
            intervalCorkscrew, dt.slices, dt.stacks);
    case 'kleinbottle':
        return new uvSurface(scene, protoKleinBottle(),
            intervalKleinBottle, dt.slices, dt.stacks);
    case 'kleinbottle2':
        return new uvSurface(scene, protoKleinBottle2(),
            intervalKleinBottle2, dt.slices, dt.stacks);

    // 5. Complex Primitives
    case 'plane':
        return new Plane(scene, dt.npartsU, dt.npartsV);
    case 'patch':
    case 'vehicle':
    case 'cylinder2':
        return new ClosedCutCone(scene, dt.base, dt.top, dt.height, dt.slices, dt.stacks);
    case 'terrain':
    case 'water':
    default:
        throw "INTERNAL: Invalid primitive type detected in buildPrimitive(): " + type;
    }
}
