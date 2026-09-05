// ===============================
// arquivo com as tipagens
// moldes pros alimentos e orgaos
// pra ninguem baguncar os tipos
// ===============================

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
