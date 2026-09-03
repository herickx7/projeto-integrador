import os

filepath = 'src/components/OrganAnimation.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    "CLICK TO CLEAVE STARCH": "CLIQUE PARA QUEBRAR O AMIDO",
    "GLU": "GLI",
    ">STARCH<": ">AMIDO<",
    "INJECT HCl & PEPSIN": "INJETAR HCl E PEPSINA",
    "MACRO LIPID": "MACRO LIPÍDIO",
    "CLICK TO INJECT BILE": "CLIQUE PARA INJETAR BILE",
    "FAT DROPLETS": "GOTÍCULAS DE GORDURA",
    "CLICK NUTRIENTS TO ABSORB": "CLIQUE NOS NUTRIENTES",
    ">CAPILLARY<": ">CAPILAR<",
    ">LACTEAL<": ">QUILÍFERO<",
    "CLICK TO EXTRACT H2O": "CLIQUE PARA EXTRAIR ÁGUA",
    "REABSORPTION COMPLETE": "REABSORÇÃO CONCLUÍDA",
    ">CHYME<": ">QUIMO<",
    ">FIBER<": ">FIBRA<",
    "MUCUS LUBRICATION": "LUBRIFICAÇÃO MUCOSA",
    ">BACTERIA<": ">BACTÉRIA<",
    "SCFA (BUTYRATE)": "AGCC (BUTIRATO)",
    "EC CELL": "CÉL. EC",
    "5-HT (SEROTONIN) INDUCED MOTILITY": "MOTILIDADE INDUZIDA POR 5-HT",
    ">ACINAR CELL<": ">CÉL. ACINAR<",
    ">DUCT CELL<": ">CÉL. DUCTAL<",
    "DIGESTIVE ENZYMES": "ENZIMAS DIGESTIVAS",
    "BICARBONATE": "BICARBONATO",
    "HEPATOCYTE": "HEPATÓCITO",
    "GALLBLADDER": "VESÍCULA BILIAR",
    "PANCREAS": "PÂNCREAS",
    "DUODENUM": "DUODENO",
    "PARIETAL": "CÉL. PARIETAL",
    "CHIEF": "CÉL. PRINCIPAL",
    "TRYPSINOGEN": "TRIPSINOGÊNIO",
    "TRYPSIN": "TRIPSINA",
    "CHYMOTRYPSINOGEN": "QUIMOTRIPSINOGÊNIO",
    "CHYMOTRYPSIN": "QUIMOTRIPSINA",
    "PEPSINOGEN": "PEPSINOGÊNIO",
    "PEPSIN": "PEPSINA",
    "[ RESET SCENE ]": "[ REINICIAR CENA ]"
}

for k, v in replacements.items():
    content = content.replace(k, v)

# Add some top level comments about what the file is
header_comment = """// ==========================================
// Componente responsável por todas as animações interativas 
// dos órgãos e processos digestivos.
// Utiliza Framer Motion para efeitos fluídos.
// ==========================================

"""
if not content.startswith("// =========================================="):
    content = header_comment + content

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

