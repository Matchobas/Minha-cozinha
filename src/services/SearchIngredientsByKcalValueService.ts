import IngredientsRepository from '../typeORM/repositories/IngredientsRepository';

import Ingredient from '../typeORM/entities/ingredient';

class SearchIngredientsByKcalValueService {
  private ingredientsRepository: IngredientsRepository;
  
  constructor(ingredientsRepository: IngredientsRepository) {
    this.ingredientsRepository = ingredientsRepository;
  }

  public async execute (kcalValue: number): Promise<Ingredient[]> {
    if(kcalValue <= 0) {
      throw new Error("Value of kcal can't be less than or equal 0");
    }

    const ingredients = await this.ingredientsRepository.findIngredientsByKcalValue(kcalValue);
    
    return ingredients;
  }
}

export default SearchIngredientsByKcalValueService;