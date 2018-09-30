# 1ª TRADUÇÃO (Ficheiro YAS --> Estrutura de classes XML)

# 2ª TRADUÇÃO (Estrutura de classes XML --> SceneGraph)
## Validar todos os campos
## Emitir warnings para valores imprevistos, resolver referências, construir grafo
## Detetar ciclos e components não alcançáveis

### scene:
	root component must exist CHECK
	axis_length > 0. CHECK
### views:
	default must exist CHECK
	must have at least one view CHECK
	near < far
	from != to CHECK
### ambient:
	r, g, b, a in the range [0, 1]. CHECK
### lights:
	r, g, b, a in the range [0, 1]. CHECK
	location != target CHECK
### texture:
	open associated file, give a warning if it does not exist (hard)
### material:
	shininess > 0 CHECK
	r, g, b, a in the range [0, 1]. CHECK
### transformation:
	scale's x, y, z should not be 0. CHECK
### primitive
	radius, height, ... positive or nonnegative CHECK
	...
### component
	#### transformation
		transformationref must exist CHECK
	#### material
		distinguish id="inherit" CHECK
		otherwise verify material with the id exists CHECK
	#### texture
		distinguish id="inherit" and id="none" CHECK
		otherwise verify texture with the id exists CHECK
		length_s and length_t should be positive CHECK
	#### children
		componentref/primitiveref with given ids must exist CHECK
		verify all children are reachable (hard) (emit warning) CHECK
		verify there are no cycles (hard) (throw exception) CHECK

# 3ª TRADUÇÃO (SceneGraph --> WebGL)
## Baseado em CGRA
## Transformation matrix stack
## Integrate 3 stacks into the components stack / tree depth first traversal
### Translate scene
	root for display()
    axis_length for CGFaxis() CHECK
### Translate views
	default view
	list of views CHECK
		perspective CHECK
		ortho
### Translate ambient
	ambient CHECK
	background CHECK
### Translate lights
	list of lights CHECK
### Translate textures
	list of textures CHECK
### Translate materials
	list of materials CHECK
		emission, ambient, diffuse, specular CHECK
	material stack (??)
### Translate transformations
	list of transformations
		translate
		rotate
		scale
	fast transformation computation
### Translate primitives
	buildPrimitive() CHECK
### Translate components
	...
## Switching materials for each component m/M (ATM: Using only materials[0])
## Apply length_s and length_t for textures (ATM: Completely ignored)

OUTROS:
## Adicionar mais primitivas:
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
