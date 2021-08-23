import Ingredient from "../typeORM/entities/ingredient";

export default interface ingredientInStorage {
  ingredient: Ingredient;
  amount: number;
}