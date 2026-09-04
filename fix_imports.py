import os

replacements = {
    "import App from './App'": "import Aplicativo from './Aplicativo'",
    "<App />": "<Aplicativo />",
    "'./index.css'": "'./estilo.css'",
    "'./components/FoodSearch'": "'./componentes/PesquisaAlimento'",
    "'./components/DidacticMatrix'": "'./componentes/MatrizDidatica'",
    "'./components/DigestiveTimeline'": "'./componentes/LinhaDoTempoDigestiva'",
    "import FoodSearch from": "import PesquisaAlimento from",
    "<FoodSearch ": "<PesquisaAlimento ",
    "import DidacticMatrix from": "import MatrizDidatica from",
    "<DidacticMatrix ": "<MatrizDidatica ",
    "import DigestiveTimeline from": "import LinhaDoTempoDigestiva from",
    "<DigestiveTimeline ": "<LinhaDoTempoDigestiva ",
    "'./types'": "'./tipos'",
    "'../types'": "'../tipos'",
    "import { searchFood } from '../lib/api'": "import { searchFood } from '../biblioteca/api'",
    "'../data'": "'../dados'",
    "'./OrganAnimation'": "'./AnimacaoOrgao'",
    "import OrganAnimation from": "import AnimacaoOrgao from",
    "<OrganAnimation ": "<AnimacaoOrgao ",
    "'./EnzymeAnimation'": "'./AnimacaoEnzima'",
    "import EnzymeAnimation from": "import AnimacaoEnzima from",
    "<EnzymeAnimation ": "<AnimacaoEnzima "
}

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for k, v in replacements.items():
        content = content.replace(k, v)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for root, _, files in os.walk('front-end'):
    for file in files:
        if file.endswith(('.tsx', '.ts')):
            process_file(os.path.join(root, file))

