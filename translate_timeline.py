import os

filepath = 'src/components/DigestiveTimeline.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    "> Nutrição<": "> Nutrição<",
    "> Citologia<": "> Citologia<",
    "> Bioquímica<": "> Bioquímica<",
    "> Endócrino<": "> Endócrino<",
    "Papel na Nutrição": "Papel na Nutrição",
    "Enzimas & Ação Fisiológica": "Enzimas & Ação Fisiológica",
    "Morfologia Celular": "Morfologia Celular",
    "Rotas Moleculares": "Rotas Moleculares",
    "Controle Hormonal e Nervoso": "Controle Hormonal e Nervoso"
}
# The text in DigestiveTimeline.tsx is mostly in Portuguese already.
# I just need to add comments.

header_comment = """// ==========================================
// Linha do tempo interativa da digestão.
// Renderiza cada órgão sequencialmente e permite ao usuário 
// expandir detalhes nutricionais, citológicos, etc.
// ==========================================

"""
if not content.startswith("// =========================================="):
    content = header_comment + content

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

