function buildPrimitive(scene, primitive) {
	const type = primitive.figure.type;
	const dt = primitive.figure.data;

	switch (type) {
	// 1. Planar Primitives
	case 'square':
		return new Square(scene, dt.side);
	case 'regular':
		return new Regular(scene, dt.sides, dt.radius);
	case 'circle':
		return new Circle(scene, dt.radius, dt.slices);
	case 'triangle': // Not Supported
		return new Triangle(scene, 1);
	case 'rectangle': // Not Supported
		return new Rectangle(scene, 2, 3);
	case 'trapezium':
		return new Trapezium(scene, dt.base, dt.height, dt.top);

	// 2. Spacial Primitives
	case 'cone':
		return new ClosedCone(scene, dt.radius, dt.height, dt.slices, dt.stacks);
	case 'pyramid':
		return new ClosedPyramid(scene, dt.sides, dt.radius, dt.height, dt.stacks);
	case 'cylinder':
		return new ClosedCylinder(scene, dt.radius, dt.height, dt.slices, dt.stacks);
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

	// 3. Complex Planar Primitives
	case 'butterfly':
		return null;
	case 'folium':
		return null;

	// 4. Surface Primitives
	case 'torus':
		return null;
	case 'cornucopia':
		return null;

	default:
		throw "INTERNAL: Invalid primitive type detected in buildPrimitive(): " + type;
	}
}
