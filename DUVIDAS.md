> Como é que devemos implementar a variação dos materials? m/M deve mudar
o material de todos os components?
??

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
