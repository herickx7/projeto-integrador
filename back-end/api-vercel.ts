import express from "express";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcAcfbTtrwBUwWFWbAesi4nEpXUYxu2fY",
  authDomain: "projeto-integrador-ifrn.firebaseapp.com",
  projectId: "projeto-integrador-ifrn",
  storageBucket: "projeto-integrador-ifrn.firebasestorage.app",
  messagingSenderId: "816598368591",
  appId: "1:816598368591:web:a2d97454614d3e7022c53a",
  measurementId: "G-NC7RFLG0ME"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const app = express();

app.get("/api/alimentos", async (req, res) => {
  const query = (req.query.q as string) || "";
  
  const logProcessamento = [
    "[BACK-END] ⚡ Iniciando requisição à API (Vercel Serverless)...",
    `[BACK-END] 📥 Recebido parâmetro de busca: "${query}"`,
    "[BACK-END] ☁️ Conectando ao Banco de Dados Firestore na nuvem...",
  ];
  
  try {
    const snapshot = await getDocs(collection(db, "alimentos"));
    let resultados: any[] = [];
    
    snapshot.forEach((documento) => {
      resultados.push(documento.data());
    });
    
    logProcessamento.push(`[BACK-END] 📦 Foram lidos ${resultados.length} documentos do Firebase.`);
    
    if (query) {
      const queryMinuscula = query.toLowerCase();
      resultados = resultados.filter((item: any) => item.name.toLowerCase().includes(queryMinuscula));
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

// Exporta o app do Express para o Vercel Serverless
export default app;
