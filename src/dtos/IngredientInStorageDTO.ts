import Ingredient from "../typeORM/entities/Ingredient";

export default interface ingredientInStorage {
  ingredient: Ingredient;
  amount: number;
}