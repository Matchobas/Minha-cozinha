import StoragesRepository from '../typeORM/repositories/storagesRepository';
import IngredientsRepository from '../typeORM/repositories/ingredientsRepository';
import UsersRepository from '../typeORM/repositories/usersRepository';

import Storage from '../typeORM/entities/storage';

import CreateStorageDTO from '../dtos/CreateStorageDTO';

class AddIngredientToUserService {
  private storagesRepository: StoragesRepository;
  private ingredientsRepository: IngredientsRepository;

  constructor(
    storagesRepository: StoragesRepository,
    ingredientsRepository: IngredientsRepository,
  ) {
      this.storagesRepository = storagesRepository;
      this.ingredientsRepository = ingredientsRepository;
  }

  public async execute({ 
    userId,
    amount,
    ingredientName
  }: CreateStorageDTO): Promise<Storage> {
    if (ingredientName === undefined){
      throw new Error('Name of the ingredient must be informed in this call');
    }

    const ingredient = await this.ingredientsRepository.findIngredientByName(ingredientName);
    const ingredientId = ingredient.id;

    const storage = await this.storagesRepository.createStorage({
      userId,
      ingredientId,
      amount
    });

    return storage;
  }
}

export default AddIngredientToUserService;