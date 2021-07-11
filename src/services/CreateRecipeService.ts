import RecipesRepository from '../typeORM/repositories/RecipesRepository';

import Recipe from '../typeORM/entities/Recipe';

class CreateRecipeService {
  private recipesRepository: RecipesRepository;
  
  constructor(
    recipesRepository: RecipesRepository
  ) {
    this.recipesRepository = recipesRepository;
  }

  public async execute(name: string, ingredients: string): Promise<Recipe> {
    // Checar se o nome já existe para criar a nova receita
    
    const recipe = await this.recipesRepository.createRecipe(
      name,
      ingredients
    );

    return recipe;
  }
}

export default CreateRecipeService;