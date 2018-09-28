1ª TRADUÇÃO (Ficheiro YAS --> Estrutura de classes XML)
> Adicionar mais primitives (circulo, poligono, piramide, piramide cortada, cone, ...)

2ª TRADUÇÃO (Estrutura de classes XML --> SceneGraph)
> Validar todos os campos
> Emitir warnings para valores imprevistos, resolver referências, construir grafo
> Detetar ciclos e components não alcançáveis

; scene:
	root component must exist
	axis_length > 0.
; views:
	default must exist
	must have at least one view
	near < far
	from != to
; ambient:
	r, g, b, a in the range [0, 1].
; lights:
	r, g, b, a in the range [0, 1].
	location != target
; texture:
	open associated file, give a warning if it
	does not exist
; material:
	shininess > 0
	r, g, b, a in the range [0, 1].
; transformation:
	warning if angle is not in the range [-360, 360].
	scale's x, y, z should not be 0.
; primitive
	radius, height, slices, stacks, loops, inner, outer
	should all be positive
	...
; component
	; transformation
		transformationref must exist
		same as transformation above
	; material
		distinguish id="inherit"
		otherwise verify material with the id exists
	; texture
		distinguish id="inherit" and id="none"
		otherwise verify texture with the id exists
		length_s and length_t should be positive
	; children
		componentref/primitiveref with given ids must exist
		verify all children are reachable (hard) (emit warning)
		verify there are no cycles (hard) (throw exception)
		in my opinion, do not emit a warning if a primitive
		is not used

3ª TRADUÇÃO (SceneGraph --> WebGL)
> Baseado em CGRA
> Materials stack
> Texture stack
> Transformation matrix stack

OUTROS:
> Adicionar mais primitivas:
	Planares
		Polígono regular
		Polígono ordenado
		Polígono t
	*   Triângulo, retângulo, trapézio, ...
	Espaciais
	*   Esfera
	*   Cubo, paralelipípedo
		Pirâmide
	*   Esfera
	Superfícies
	*   Torus
		Superfície u,v
		Superfície x,y,z
		Superfície r,teta
