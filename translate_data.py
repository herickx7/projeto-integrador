import os

filepath = 'src/data.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

header_comment = """// ==========================================
// Base de dados local com as informações teóricas
// dos órgãos do sistema digestório. Contém os textos
// da matriz didática e da linha do tempo.
// ==========================================

"""
if not content.startswith("// =========================================="):
    content = header_comment + content

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

