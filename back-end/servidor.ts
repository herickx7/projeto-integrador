import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";

// Importações do Firebase SDK (versão 9+ modular)
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc } from "firebase/firestore";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Configuração do Firebase fornecida
const firebaseConfig = {
  apiKey: "AIzaSyDcAcfbTtrwBUwWFWbAesi4nEpXUYxu2fY",
  authDomain: "projeto-integrador-ifrn.firebaseapp.com",
  projectId: "projeto-integrador-ifrn",
  storageBucket: "projeto-integrador-ifrn.firebasestorage.app",
  messagingSenderId: "816598368591",
  appId: "1:816598368591:web:a2d97454614d3e7022c53a",
  measurementId: "G-NC7RFLG0ME"
};

// 2. Inicializando o App e o Banco de Dados Firestore
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// 3. Função para popular o Firebase na primeira execução (Seed)
async function popularBancoSeEstiverVazio() {
  try {
    const alimentosRef = collection(db, "alimentos");
    const snapshot = await getDocs(alimentosRef);
    
    if (snapshot.empty) {
      console.log("[FIREBASE] O banco de dados está vazio. Populando com o cardápio do IFRN...");
      
      const ifrnMenu = [
        { id: '1', name: 'Arroz Branco', carbohydrates: 28, proteins: 2.7, fat: 0.3, image: '' },
        { id: '2', name: 'Feijão Macaçar', carbohydrates: 20, proteins: 8, fat: 0.5, image: '' },
        { id: '3', name: 'Macaxeira Cozida', carbohydrates: 38, proteins: 1.4, fat: 0.2, image: '' },
        { id: '4', name: 'Inhame', carbohydrates: 27, proteins: 1.5, fat: 0.1, image: '' },
        { id: '5', name: 'Batata Doce', carbohydrates: 20, proteins: 1.6, fat: 0.1, image: '' },
        { id: '6', name: 'Cuscuz de Milho', carbohydrates: 18, proteins: 2, fat: 1, image: '' },
        { id: '7', name: 'Frango Assado', carbohydrates: 0, proteins: 25, fat: 12, image: '' },
        { id: '8', name: 'Carne Guisada', carbohydrates: 0, proteins: 21, fat: 14, image: '' },
        { id: '9', name: 'Ovo Frito', carbohydrates: 1, proteins: 13, fat: 11, image: '' },
        { id: '10', name: 'Salada Mista', carbohydrates: 3, proteins: 1, fat: 0.2, image: '' },
        { id: '11', name: 'Carne de Sol', carbohydrates: 0, proteins: 28, fat: 15, image: '' },
        { id: '12', name: 'Bolo de Milho', carbohydrates: 45, proteins: 5, fat: 12, image: '' },
        { id: '13', name: 'Cuscuz com Ovo', carbohydrates: 22, proteins: 7, fat: 5, image: '' },
      ];

      for (const food of ifrnMenu) {
        // Cria um documento com o ID especificado
        await setDoc(doc(db, "alimentos", food.id), food);
      }
      console.log("[FIREBASE] Cardápio inserido no Firestore com sucesso!");
    } else {
      console.log(`[FIREBASE] Conectado. O banco já possui ${snapshot.size} alimentos cadastrados.`);
    }
  } catch (error) {
    console.error("[FIREBASE] Erro ao conectar ou popular o Firestore:", error);
  }
}

// Executa a verificação assim que o servidor liga
popularBancoSeEstiverVazio();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Endpoint da API real
  app.get("/api/alimentos", async (req, res) => {
    const query = (req.query.q as string) || "";
    
    const logProcessamento = [
      "[BACK-END] ⚡ Iniciando requisição à API...",
      `[BACK-END] 📥 Recebido parâmetro de busca: "${query}"`,
      "[BACK-END] ☁️ Conectando ao Banco de Dados Firestore na nuvem...",
    ];
    
    try {
      // Busca todos os documentos da coleção "alimentos"
      const snapshot = await getDocs(collection(db, "alimentos"));
      let resultados: any[] = [];
      
      snapshot.forEach((documento) => {
        resultados.push(documento.data());
      });
      
      logProcessamento.push(`[BACK-END] 📦 Foram lidos ${resultados.length} documentos do Firebase.`);
      
      // Filtragem textual feita pelo processamento do nosso Back-End
      // (O Firestore não possui busca "LIKE" nativa, então filtramos no servidor - ótimo para o TCC!)
      if (query) {
        const queryMinuscula = query.toLowerCase();
        resultados = resultados.filter(item => item.name.toLowerCase().includes(queryMinuscula));
        logProcessamento.push(`[BACK-END] 🔍 Filtragem em memória concluída. Encontrados ${resultados.length} itens compatíveis com "${query}".`);
      }

      logProcessamento.push("[BACK-END] 🚀 Processamento concluído. Enviando resposta ao Front-End em formato JSON.");
      
      res.json({
        resultados: resultados,
        logs: logProcessamento
      });
      
    } catch (err: any) {
      logProcessamento.push("[BACK-END] ❌ Erro ao consultar Firebase: " + err.message);
      res.status(500).json({ error: err.message, logs: logProcessamento });
    }
  });

  // Vite middleware for development (Front-End)
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
