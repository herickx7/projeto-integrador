import os

filepath = 'src/components/DidacticMatrix.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

header_comment = """// ==========================================
// Matriz Didática (Resumo Bioquímico).
// Exibe uma tabela com o resumo dos órgãos, pH e enzimas 
// para facilitar a revisão dos alunos.
// ==========================================

"""
if not content.startswith("// =========================================="):
    content = header_comment + content

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

