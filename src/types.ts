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
}
