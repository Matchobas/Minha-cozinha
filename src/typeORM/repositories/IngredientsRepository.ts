import { getRepository, LessThanOrEqual, Repository } from 'typeorm';

import Ingredient from '../entities/Ingredient';

import CreateIngredientDTO from '../../dtos/CreateIngredientDTO';

class IngredientsRepository {
  private ormRepository: Repository<Ingredient>;

  constructor() {
    this.ormRepository = getRepository(Ingredient);
  }

  public async findIngredientByName(name: string): Promise<Ingredient | undefined> {
    const ingredient = await this.ormRepository.findOne({
      where: { name: name }
    });

    return ingredient;
  }

  public async findAllIngredients(): Promise<Ingredient[]> {
    const ingredients = await this.ormRepository.find();

    return ingredients;
  }

  public async findIngredientsByKcalValue(kcalValue: number): Promise<Ingredient[]> {
    const ingredients = await this.ormRepository.find({
      kcal_value: LessThanOrEqual(kcalValue)
    });

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

  public async findIngredientById(id: string): Promise<Ingredient> {
    const ingredient = await this.ormRepository.findOne({
      where: { id: id }
    });

    if(!ingredient) {
      throw new Error("Ingredient not finded");
    }

    return ingredient;
  }
}

export default IngredientsRepository;