let XMLFiguresList = {
	// 1. Planar Primitives
	square:              XMLSquare,
	regular:             XMLRegular,
	circle:              XMLCircle,
	triangle:            XMLTriangle,
	rectangle:           XMLRectangle,
	trapezium:           XMLTrapezium,

	// 2. Spacial Primitives
	cone:                XMLCone,
	pyramid:             XMLPyramid,
	cylinder:            XMLCylinder,
	prism:               XMLPrism,
	cube:                XMLCube,
	block:               XMLBlock,
	sphere:              XMLSphere,
	halfsphere:          XMLHalfSphere,

	// 3. Complex Planar Primitives
	heart:               XMLHeart,
	butterfly:           XMLButterfly,
	folium:              XMLFolium,
	hypocycloid:         XMLHypocycloid,

	// 4. Surface Primitives
	torus:               XMLTorus,
	eight:               XMLEightSurface,
	astroidal:           XMLAstroidal,
	kiss:                XMLKissSurface,
	bohemiandome:        XMLBohemianDome,
	crossedtrough:       XMLCrossedTrough,
	sine:                XMLSineSurface,
	cayley:              XMLCayleySurface,
	mobius:              XMLMobiusStrip,
	elliptichyperboloid: XMLEllipticHyperboloid,
	crosscap:            XMLCrossCap,
	crosscap2:           XMLCrossCap2,
	cornucopia:          XMLCornucopia,
	henneberg:           XMLHennebergMinimal,
	roman:               XMLRomanSurface,
	corkscrew:           XMLCorkscrew,
	kleinbottle:         XMLKleinBottle,
	kleinbottle2:        XMLKleinBottle2
};

class XMLPrimitive extends XMLElement {
	constructor(node) {
		super(node, { id: "ss" });

		this.type = "primitive";

		if (node.childElementCount != 1) {
			throw new XMLException(node, "Primitive node must have exactly one child");
		}

		let child = node.firstElementChild;
		let name = child.tagName.toLocaleLowerCase();

		if (!(name in XMLFiguresList)) {
			throw new XMLException(node, "Primitive " + name + " not recognized");
		} else {
			this.figure = new XMLFiguresList[name](child);
		}
	}
}

class XMLPrimitives extends XMLGroup {
	constructor(node) {
		super(node, {
			primitive: XMLPrimitive
		});

		this.type = "primitives";
	}
}

// Done, needs testing
