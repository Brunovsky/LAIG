1ª TRADUÇÃO (Ficheiro YAS --> Estrutura de classes XML)
> Adicionar mais primitives (circulo, poligono, piramide, piramide cortada, cone, ...)

2ª TRADUÇÃO (Estrutura de classes XML --> SceneGraph)
> Validar todos os campos
> Emitir warnings para valores imprevistos, resolver referências, construir grafo
> Detetar ciclos e components não alcançáveis

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
