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
			intervalTorus, dt.slices, dt.stacks);
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

	default:
		throw "INTERNAL: Invalid primitive type detected in buildPrimitive(): " + type;
	}
}
