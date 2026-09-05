import { FoodItem } from '../tipos';

// ===============================
// api pegando la do nosso back-end
// conecta direto na rota do servidor
// ===============================
export async function searchFood(query: string): Promise<FoodItem[]> {
  try {
    const response = await fetch(`/api/alimentos?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    
    // printando o log no console igual a prof pediu
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
