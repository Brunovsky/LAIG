> Como é que devemos implementar a variação dos materials? m/M deve mudar
o material de todos os components?
-- Não respondida

> Os materiais/textures podem ser alterados enquanto corre o programa?
Será possível usar bindTexture() (material + texture) em cada classe
CGFobject, ou a texture/material associado a um objeto poderá mudar
inesperadamente?
-- Separar materials e textures dos objectos.

> Como implementar lights <spot>?
-- setSpotCutOff, setSpotExponent, setSpotDirection

> Como implementar views <ortho>?

> Como implementar length_s e length_t (por objeto estilo .bindTexture(),
ou por texture estilo .setTextureWrap()).

> Podemos implementar mais primitives? Nomeadamente:
	block (paralelipípedo)
	cone
	pirâmide

> Podemos reutilizar as classes objeto de CGRA?

> Plano xOy VS plano xOz usado em CGRA.