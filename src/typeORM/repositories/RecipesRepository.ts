import { Repository, getRepository } from 'typeorm';

import Recipe from '../entities/Recipe';

class RecipesRepository {
  private ormRepository: Repository<Recipe>;

  constructor() {
    this.ormRepository = getRepository(Recipe);
  }

  public async createRecipe(name: string, ingredients: string): Promise<Recipe> {
    const newRecipe = await this.ormRepository.create({
      name,
      ingredients
    });

    this.ormRepository.save(newRecipe);

    return newRecipe;
  }

  public async findAll(): Promise<Recipe[]> {
    const allRecipes = await this.ormRepository.find();

    return allRecipes;
  }
}

export default RecipesRepository;