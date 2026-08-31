import { FoodItem } from '../types';

// Banco de Dados Local Simulado (Cardápio IFRN)
// Valores nutricionais aproximados para uma porção padrão de 100g
const ifrnMenu: FoodItem[] = [
  { id: '1', name: 'Arroz Branco', carbohydrates: 28, proteins: 2.7, fat: 0.3 },
  { id: '2', name: 'Feijão Carioca', carbohydrates: 14, proteins: 5, fat: 0.5 },
  { id: '3', name: 'Macarrão', carbohydrates: 31, proteins: 5.8, fat: 0.9 },
  { id: '4', name: 'Carne Bovina', carbohydrates: 0, proteins: 26, fat: 11 },
  { id: '5', name: 'Frango Desfiado', carbohydrates: 0, proteins: 31, fat: 4 },
  { id: '6', name: 'Café (sem açúcar)', carbohydrates: 0, proteins: 0.1, fat: 0 },
  { id: '7', name: 'Suco de Frutas', carbohydrates: 10, proteins: 0.7, fat: 0.2 },
  { id: '8', name: 'Achocolatado', carbohydrates: 11, proteins: 3, fat: 2 },
  { id: '9', name: 'Biscoito Maria', carbohydrates: 75, proteins: 7, fat: 14 },
  { id: '10', name: 'Macaxeira (Mandioca)', carbohydrates: 30, proteins: 0.6, fat: 0.1 },
  { id: '11', name: 'Ovo Cozido', carbohydrates: 1.1, proteins: 13, fat: 11 },
  { id: '12', name: 'Pão de Queijo', carbohydrates: 24, proteins: 5, fat: 14 },
  { id: '13', name: 'Cuscuz com Ovo', carbohydrates: 22, proteins: 7, fat: 5 },
  { id: '14', name: 'Cuscuz com Frango', carbohydrates: 20, proteins: 10, fat: 3 },
  { id: '15', name: 'Panqueca', carbohydrates: 18, proteins: 8, fat: 7 },
  { id: '16', name: 'Pizza Tradicional', carbohydrates: 33, proteins: 11, fat: 10 },
  { id: '17', name: 'Cachorro Quente', carbohydrates: 18, proteins: 10, fat: 15 },
  { id: '18', name: 'Canja de Galinha', carbohydrates: 7, proteins: 4, fat: 1 },
  { id: '19', name: 'Farofa', carbohydrates: 80, proteins: 2, fat: 9 },
];

/**
 * Simula o consumo de uma API Assíncrona.
 * Retorna uma Promise que resolve após um delay (simulando latência de rede).
 * 
 * @param query O termo de busca (ex: 'cuscuz')
 * @returns Um array de alimentos (FoodItem)
 */
export async function searchFood(query: string): Promise<FoodItem[]> {
  // 1. Instanciamos uma Promise para manter o contrato assíncrono (async/await)
  return new Promise((resolve) => {
    
    // 2. Simulamos o atraso de uma requisição HTTP real (600ms)
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      
      // 3. Filtramos no "Banco de Dados" em memória
      const results = ifrnMenu.filter(food => 
        food.name.toLowerCase().includes(lowerQuery)
      );
      
      resolve(results);
    }, 600);
    
  });
}
