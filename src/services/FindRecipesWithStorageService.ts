import RecipesRepository from '../typeORM/repositories/RecipesRepository';
import StoragesRepository from '../typeORM/repositories/StoragesRepository';
import IngredientsRepository from '../typeORM/repositories/IngredientsRepository';
import UsersRepository from '../typeORM/repositories/UsersRepository';

import GetUserStorageService from './GetUserStorageService';

import IngredientInStorageDTO from '../dtos/IngredientInStorageDTO';

import Recipe from '../typeORM/entities/Recipe';

interface RecipeScoreDTO {
  recipe: Recipe;
  available: string[];
  missing: string[];
  score: number;
}

class FindRecipesWithStorageService {
  private recipesRepository: RecipesRepository;
  private storagesRepository: StoragesRepository;
  private ingredientsRepository: IngredientsRepository;
  private usersRepository: UsersRepository;

  constructor(
    recipesRepository: RecipesRepository,
    storagesRepository: StoragesRepository,
    ingredientsRepository: IngredientsRepository,
    usersRepository: UsersRepository
  ) {
    this.recipesRepository = recipesRepository;
    this.storagesRepository = storagesRepository;
    this.ingredientsRepository = ingredientsRepository;
    this.usersRepository = usersRepository;
  }

  public async execute(username: string): Promise<RecipeScoreDTO[]>{
    // To Do
    const getUserStorage = new GetUserStorageService(
      this.storagesRepository,
      this.usersRepository,
      this.ingredientsRepository
    );

    const userAvailableIngredients: IngredientInStorageDTO[] = await getUserStorage.execute(
      username
    );

    const ingredientNames = userAvailableIngredients.map(ingredient => ingredient.ingredient.name);
    
    let mostAvailable = 0;
    let mostAvailableIngredient = '';

    userAvailableIngredients.forEach(ingredient => {
      if (ingredient.amount > mostAvailable) {
        mostAvailable = ingredient.amount;
        mostAvailableIngredient = ingredient.ingredient.name;
      }
    });

    const recipes = await this.recipesRepository.findByIngredient(mostAvailableIngredient);

    const scoredRecipes: RecipeScoreDTO[] = recipes.map(recipe => {
      const ingredients = recipe.ingredients.split('$$');

      let score = ingredients.length;
      let available: string[] = [];
      let missing: string[] = [];

      ingredients.forEach(ingredient => {
        if (!ingredientNames.includes(ingredient)) {
          missing.push(ingredient);
          score -= 1;
        } else {
          available.push(ingredient);
        }
      });

      score = score / ingredients.length;

      return {
        recipe,
        available,
        missing,
        score
      }
    });

    return scoredRecipes;
  }
}
export default FindRecipesWithStorageService;