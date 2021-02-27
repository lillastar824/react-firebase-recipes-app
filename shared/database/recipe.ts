export const RECIPE_COLLECTION = "recipes";

export enum RecipeStatus {
  ACTIVE = "ACTIVE",
  DISABLED = "DISABLED"
}

export interface Recipe {
  title: string;
  content: string;
  status: RecipeStatus;
  created_at: number;
  updated_at: number;
}