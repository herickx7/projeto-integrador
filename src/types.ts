// ==========================================
// Arquivo de tipagem TypeScript (Interfaces).
// Define a estrutura de dados para alimentos e órgãos,
// garantindo a segurança de tipos (Type Safety).
// ==========================================

export interface FoodItem {
  id: string;
  name: string;
  image?: string;
  carbohydrates: number;
  proteins: number;
  fat: number;
}

export interface OrganData {
  id: string;
  name: string;
  ph: string;
  enzymes: string[];
  action: string;
  nutrition: string;
  color: string;
  academicDetails?: {
    cytology: string;
    biochem: string;
    endocrine: string;
  };
}
