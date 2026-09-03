import os

filepath = 'src/types.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

header_comment = """// ==========================================
// Arquivo de tipagem TypeScript (Interfaces).
// Define a estrutura de dados para alimentos e órgãos,
// garantindo a segurança de tipos (Type Safety).
// ==========================================

"""
if not content.startswith("// =========================================="):
    content = header_comment + content

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

