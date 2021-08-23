import RecipesRepository from '../typeORM/repositories/RecipesRepository';

import Recipe from '../typeORM/entities/Recipe';
import CreateRecipeDTO from '../dtos/CreateRecipeDTO';

class CreateRecipeService {
  private recipesRepository: RecipesRepository;
  
  constructor(
    recipesRepository: RecipesRepository
  ) {
    this.recipesRepository = recipesRepository;
  }

  public async execute({
    name,
    description,
    time,
    ingredients
  }: CreateRecipeDTO): Promise<Recipe> {
    // Checar se o nome já existe para criar a nova receita
    
    const recipe = await this.recipesRepository.createRecipe({
      name,
      description,
      time,
      ingredients
    });

    return recipe;
  }
}

export default CreateRecipeService;