import IngredientsRepository from '../typeORM/repositories/ingredientsRepository';
import Ingredient from '../typeORM/entities/ingredient';

interface CreateIngredientDTO {
  name: string;
  kcalValue: number;
  type: string;
  info: string;
}

class CreateIngredientService {
  private ingredientsRepository: IngredientsRepository;

  constructor(ingredientsRepository: IngredientsRepository) {
    this.ingredientsRepository = ingredientsRepository;
  }

  public async execute({name, kcalValue, type, info}: CreateIngredientDTO): Promise<Ingredient>{
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