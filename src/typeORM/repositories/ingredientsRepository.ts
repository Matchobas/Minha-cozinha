import { getRepository, Repository } from 'typeorm';

import Ingredient from '../entities/ingredient';

interface CreateIngredientDTO {
  name: string;
  kcalValue: number;
  type: string;
  info: string;
}

class IngredientsRepository {
  private ormRepository: Repository<Ingredient>;

  constructor() {
    this.ormRepository = getRepository(Ingredient);
  }

  public async findAllIngredients(): Promise<Ingredient[]> {
    const ingredients = await this.ormRepository.find();

    return ingredients;
  }

  public async createIngredient(
    { name, kcalValue, type, info }: CreateIngredientDTO): Promise<Ingredient> {
      const ingredient = this.ormRepository.create({
        name,
        kcal_value: kcalValue,
        type,
        info
      });

      await this.ormRepository.save(ingredient);

      return ingredient;
  }
}

export default IngredientsRepository;