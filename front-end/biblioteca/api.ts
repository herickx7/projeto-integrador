import { FoodItem } from '../tipos';

// ==========================================
// API Real (Consumindo backend Node.js + MySQL)
// A função conecta-se à rota criada na pasta back-end/
// ==========================================
export async function searchFood(query: string): Promise<FoodItem[]> {
  try {
    const response = await fetch(`/api/alimentos?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    
    // Imprimindo log de processamento no Console (F12) como a professora pediu
    if (data.logs) {
      console.log("%c=== PROCESSAMENTO DA API NO BACK-END ===", "color: #3b82f6; font-weight: bold; font-size: 14px;");
      data.logs.forEach((log: string) => {
        console.log(`%c${log}`, "color: #10b981; font-family: monospace;");
      });
      console.log("%c========================================", "color: #3b82f6; font-weight: bold;");
    }

    if (!response.ok) {
      throw new Error("Erro na comunicação com a API de alimentos");
    }
    
    return data.resultados as FoodItem[];
  } catch (error) {
    console.error("Falha ao buscar alimentos na API:", error);
    throw error;
  }
}
