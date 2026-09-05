import os
import re

replacements = {
    "// Importações do Firebase SDK (versão 9+ modular)": "// importando sdk do firebase",
    "// 1. Configuração do Firebase fornecida": "// config do firebase que peguei la",
    "// 2. Inicializando o App e o Banco de Dados Firestore": "// iniciando o app e o firestore",
    "// 3. Função para popular o Firebase na primeira execução (Seed)": "// funcao pra jogar os dados no banco se tiver vazio",
    "// Cria um documento com o ID especificado": "// cria os docs com id certo",
    "// Executa a verificação assim que o servidor liga": "// roda isso assim q o server ligar",
    "// Endpoint da API real": "// nossa rota principal da api",
    "// Busca todos os documentos da coleção \"alimentos\"": "// pega todos os documentos de alimentos",
    "// Filtragem textual feita pelo processamento do nosso Back-End": "// filtrando a busca por aqui mesmo no back-end",
    "// (O Firestore não possui busca \"LIKE\" nativa, então filtramos no servidor - ótimo para o TCC!)": "// (o firestore nao tem aquele 'like' do sql, entao o filtro rola aqui - fica massa pro tcc)",
    "// Vite middleware for development (Front-End)": "// middleware do vite pra rodar o front junto",
    "// Exporta o app do Express para o Vercel Serverless": "// exportando o express pro vercel",
    "// Estado que armazena o alimento selecionado pelo usuário na barra de pesquisa": "// guarda o alimento que pesquisaram",
    "// Variantes de animação para fazer os elementos aparecerem em sequência (stagger)": "// animacaozinha em sequencia",
    "// Animação individual para cada seção do site subir suavemente": "// animacao de subir a secao",
    "// ==========================================": "// ===============================",
    "// Matriz Didática (Resumo Bioquímico).": "// matriz didatica com resumo",
    "// Exibe uma tabela com o resumo dos órgãos, pH e enzimas ": "// tabelinha com orgaos e ph",
    "// para facilitar a revisão dos alunos.": "// pra ajudar a galera a revisar",
    "// Reseta seleção anterior": "// zera o que tava selecionado",
    "// Linha do tempo interativa da digestão.": "// linha do tempo da digestao",
    "// Renderiza cada órgão sequencialmente e permite ao usuário ": "// vai mostrando os orgaos na ordem",
    "// expandir detalhes nutricionais, citológicos, etc.": "// e da pra abrir os detalhes",
    "// Componente responsável por todas as animações interativas ": "// componente q cuida das animacoes",
    "// dos órgãos e processos digestivos.": "// dos orgaos e digestao",
    "// Utiliza Framer Motion para efeitos fluídos.": "// usando framer motion pra ficar suave",
    "// =================== MOUTH ===================": "// =================== boca ===================",
    "// =================== STOMACH ===================": "// =================== estomago ===================",
    "// =================== LIVER & PÂNCREAS ===================": "// =================== figado e pancreas ===================",
    "// =================== SMALL INTESTINE ===================": "// =================== intestino delgado ===================",
    "// =================== LARGE INTESTINE ===================": "// =================== intestino grosso ===================",
    "// Force reset when tab changes": "// forca o reset trocando de aba",
    "// API Real (Consumindo backend Node.js + MySQL)": "// api pegando la do nosso back-end",
    "// A função conecta-se à rota criada na pasta back-end/": "// conecta direto na rota do servidor",
    "// Imprimindo log de processamento no Console (F12)": "// printando o log no console igual a prof pediu",
    "// Base de dados local com as informações teóricas": "// banco de dados local com a parte teorica",
    "// dos órgãos do sistema digestório. Contém os textos": "// dos orgaos. tem os textos da matriz",
    "// da matriz didática e da linha do tempo.": "// e da timeline",
    "// Arquivo de tipagem TypeScript (Interfaces).": "// arquivo com as tipagens",
    "// Define a estrutura de dados para alimentos e órgãos,": "// moldes pros alimentos e orgaos",
    "// garantindo a segurança de tipos (Type Safety).": "// pra ninguem baguncar os tipos",
}

def process_file(filepath):
    if not os.path.exists(filepath):
        return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for k, v in replacements.items():
        content = content.replace(k, v)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

files_to_process = [
    "back-end/servidor.ts",
    "back-end/api-vercel.ts",
    "front-end/Aplicativo.tsx",
    "front-end/componentes/MatrizDidatica.tsx",
    "front-end/componentes/PesquisaAlimento.tsx",
    "front-end/componentes/LinhaDoTempoDigestiva.tsx",
    "front-end/componentes/AnimacaoOrgao.tsx",
    "front-end/biblioteca/api.ts",
    "front-end/dados.ts",
    "front-end/tipos.ts"
]

for file in files_to_process:
    process_file(file)

