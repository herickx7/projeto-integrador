import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";
import alasql from "alasql";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Banco de dados em memória utilizando AlaSQL para suportar SQL nativo
// Simula o comportamento e sintaxe de um banco relacional MySQL
alasql("CREATE TABLE alimentos (id STRING, name STRING, carbohydrates NUMBER, proteins NUMBER, fat NUMBER, image STRING)");

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
  alasql("INSERT INTO alimentos VALUES (?, ?, ?, ?, ?, ?)", [food.id, food.name, food.carbohydrates, food.proteins, food.fat, food.image]);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Endpoint da API real consultando banco
  app.get("/api/alimentos", (req, res) => {
    const query = (req.query.q as string) || "";
    
    // Preparando log para console do navegador (F12)
    const logProcessamento = [
      "[BACK-END] ⚡ Iniciando requisição à API...",
      `[BACK-END] 📥 Recebido parâmetro de busca: "${query}"`,
      "[BACK-END] 🔌 Conectando ao Banco de Dados Relacional (Simulação MySQL local)...",
      `[BACK-END] 📝 Executando Query: SELECT * FROM alimentos WHERE name LIKE '%${query}%'`
    ];
    
    try {
      const dbQuery = `%${query}%`;
      const rows = alasql("SELECT * FROM alimentos WHERE name LIKE ?", [dbQuery]);
      
      logProcessamento.push(`[BACK-END] ✅ Query retornou ${rows.length} resultados.`);
      logProcessamento.push("[BACK-END] 🚀 Processamento concluído. Enviando resposta ao Front-End.");
      
      // Delay simulado para experiência visual
      setTimeout(() => {
        res.json({
          resultados: rows,
          logs: logProcessamento
        });
      }, 600);
    } catch (err: any) {
      logProcessamento.push("[BACK-END] ❌ Erro ao consultar banco de dados: " + err.message);
      res.status(500).json({ error: err.message, logs: logProcessamento });
    }
  });

  // Vite middleware for development
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
