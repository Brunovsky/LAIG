# Primitives List

## 1. Planar Primitives

### <square>
	side:"pp"

### <regular>
	sides:"ii"
	radius:"pp"

### <circle>
	radius:"pp"
	slices:"ii"

### <triangle>
	x1:"ff" y1:"ff" z1:"ff"
	x2:"ff" y2:"ff" z2:"ff"
	x3:"ff" y3:"ff" z3:"ff"

### <rectangle>
	x1:"ff" y1:"ff"
	x2:"ff" y2:"ff"

### <trapezium>
	base:"pp"
	height:"pp"
	top:"pp"

## 2. Spacial Primitives

### <cone>, <opencone>, <doublecone>, <spheredcone>
	radius:"pp"
	height:"pp"
	slices:"ii"
	stacks:"ii"

### <pyramid>, <openpyramid>, <doublepyramid>
	sides:"ii"
	radius:"pp"
	height:"pp"
	stacks:"ii"

### <cylinder>, <opencylinder>, <halfspheredcylinder>, <spheredcylinder>
	radius:"pp"
	height:"pp"
	slices:"ii"
	stacks:"ii"

### <prism>, <openprism>
	sides:"ii"
	radius:"pp"
	height:"pp"
	stacks:"ii"

### <cube>
	side:"pp"

### <block>
	x:"pp"
	y:"pp"
	z:"pp"

### <sphere>, <halfsphere>, <closedhalfsphere>, <flipsphere>
	radius:"pp"
	slices:"ii"
	stacks:"ii"

### <cutcone>, <cutpyramid>, ...

## 3. Complex Planar Primitives

### <butterfly> (tPolygon)
	samples="ii"

### <folium> (rPolygon)
	a:"pp"
	b:"p0"
	samples:"ii"

### ...

## 4. Surface Primitives

### <torus> (uvSurface)
	inner:"pp"
	outer:"pp"
	slices:"ii"
	stacks:"ii"

### <cornucopia> (uvSurface)
	slices:"ii"
	stacks:"ii"

### ...
