import StoragesRepository from '../typeORM/repositories/storagesRepository';
import IngredientsRepository from '../typeORM/repositories/ingredientsRepository';
import UsersRepository from '../typeORM/repositories/usersRepository';

import Storage from '../typeORM/entities/storage';
import User from '../typeORM/entities/user';
import Ingredient from '../typeORM/entities/ingredient';

import CreateStorageDTO from '../dtos/CreateStorageDTO';

class AddIngredientToUserService {
  private storagesRepository: StoragesRepository;
  private ingredientsRepository: IngredientsRepository;
  private usersRepository: UsersRepository;

  constructor(
    storagesRepository: StoragesRepository,
    ingredientsRepository: IngredientsRepository,
    usersRepository: UsersRepository
  ) {
      this.storagesRepository = storagesRepository;
      this.ingredientsRepository = ingredientsRepository;
      this.usersRepository = usersRepository;
  }

  public async execute(amount: number): Promise<Storage> {
    const user = await this.usersRepository.findByUsername('ElMatchobas');

    if (user === undefined){
      throw new Error('Undefined user');
    }

    const ingredient = await this.ingredientsRepository.findIngredientByName('Camarão congelado');

    const userId = user.id;
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