> Como é que devemos implementar a variação dos materials? m/M deve mudar
o material de todos os components ou só de alguns?

> Podemos implementar a mudança de materiais m/M por component através da GUI?

> Como implementar length_s e length_t?
	> Herança de length_s e length_t (pai declara (2,1) e filho declara (2,1),
	o que deve o filho desenhar?)
	> Os valores length_s e length_t aplicam-se à textura, mas a biblioteca WebCGF
	não parece ter nenhuma funcionalidade que permita alterar estes parâmetros
	diretamente na textura (CGFtexture ou CGFappearance). Portanto length_s e length_t
	têm de ser aplicados aos objetos CGF (CGFobject), o que implica que as primitivas
	têm de ser todas duplicadas, uma para cada instância de um primitiveref que a
	referencie. É este o design esperado?

> A primitiva <torus> tem de ser implementada com a classe CGFnurbsObject
fornecida na biblioteca? (Já o implementamos com uma classe própria).

---------------------------------------------------------------------------

> Os materiais/textures podem ser alterados enquanto corre o programa?
Será possível usar bindTexture() (material + texture) em cada classe
CGFobject, ou a texture/material associado a um objeto poderá mudar
inesperadamente?
-- Separar materials e textures dos objectos.

> Como implementar lights <spot>?
-- setSpotCutOff, setSpotExponent, setSpotDirection

> Como implementar views <ortho>?
-- Não estão implementadas ainda

> Como implementar length_s e length_t (por objeto estilo .bindTexture(),
ou por texture estilo .setTextureWrap()).
-- por .setTextureWrap()

> Podemos implementar mais primitives? Nomeadamente:
	block (paralelipípedo)
	cone
	pirâmide
-- Submeter dois ficheiros XML, um com apenas as 5 primitivas originais,
-- outro com as restantes, mais rico

> Podemos reutilizar as classes objeto de CGRA?
-- Yup

> Plano xOy VS plano xOz usado em CGRA.
-- Plano xOz, mas a primitive rectangle está no plano xOy
