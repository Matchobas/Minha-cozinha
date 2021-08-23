import { Repository, getRepository, Like } from 'typeorm';

import Recipe from '../entities/Recipe';
import CreateRecipeDTO from '../../dtos/CreateRecipeDTO';

class RecipesRepository {
  private ormRepository: Repository<Recipe>;

  constructor() {
    this.ormRepository = getRepository(Recipe);
  }

  public async createRecipe({
      name,
      description,
      time,
      ingredients
    }: CreateRecipeDTO): Promise<Recipe> {
      
    const newRecipe = await this.ormRepository.create({
      name,
      description,
      time,
      ingredients
    });

    this.ormRepository.save(newRecipe);

    return newRecipe;
  }

  public async findAll(): Promise<Recipe[]> {
    const allRecipes = await this.ormRepository.find();

    return allRecipes;
  }

  public async findByIngredient(ingredient: string): Promise<Recipe[]> {
    const recipes = await this.ormRepository.find({
      ingredients: Like(`%${ingredient}%`)
    });

    return recipes;
  }
}

export default RecipesRepository;