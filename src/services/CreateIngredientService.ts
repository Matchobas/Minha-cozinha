import IngredientsRepository from '../typeORM/repositories/ingredientsRepository';
import Ingredient from '../typeORM/entities/ingredient';

import CreateIngredientDTO from '../dtos/CreateIngredientDTO';

class CreateIngredientService {
  private ingredientsRepository: IngredientsRepository;

  constructor(ingredientsRepository: IngredientsRepository) {
    this.ingredientsRepository = ingredientsRepository;
  }

  public async execute({ name, kcalValue, type, info }: CreateIngredientDTO): Promise<Ingredient>{
    if (kcalValue <= 0) {
      throw new Error("The kcal value of an ingredient must be higher than 0");
    }
    
    const ingredient = await this.ingredientsRepository.createIngredient({
      name,
      kcalValue,
      type,
      info
    });
    
    return ingredient;
  }
}

export default CreateIngredientService;