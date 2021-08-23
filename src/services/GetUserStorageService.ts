import Storage from 'typeORM/entities/Storage';
import Ingredient from '../typeORM/entities/Ingredient';

import StoragesRepository from '../typeORM/repositories/StoragesRepository';
import UsersRepository from '../typeORM/repositories/UsersRepository';
import IngredientsRepository from '../typeORM/repositories/IngredientsRepository';

import IngredientInStorageDTO from '../dtos/IngredientInStorageDTO';

class GetUserStorageService {
  private storagesRepository: StoragesRepository;
  private usersRepository: UsersRepository;
  private ingredientsRepository: IngredientsRepository;

  constructor(
      storagesRepository: StoragesRepository,
      usersRepository: UsersRepository,
      ingredientsRepository: IngredientsRepository
    ) {
    this.storagesRepository = storagesRepository;
    this.usersRepository = usersRepository;
    this.ingredientsRepository = ingredientsRepository;
  }

  public async execute(username: string): Promise<IngredientInStorageDTO[]> {
    const loggedUser = await this.usersRepository.findByUsername(username);

    if(!loggedUser) {
      throw new Error("User does not exist");
    }

    const loggedUserId = loggedUser.id;

    const userStorage = await this.storagesRepository.findAllByUserId(loggedUserId);

    // Uma outra possibilidade seria fazer toda essa chamada direta do Banco de Dados!!!!

    const allIngredients = await this.ingredientsRepository.findAllIngredients();

    const storageIngredients: IngredientInStorageDTO[] = userStorage.map(storage => {
      const ingredient = allIngredients.find(ingre => ingre.id == storage.ingredient_id);

      if(!ingredient) {
        throw new Error("One of the ingredients does not exist");
      }

      return {
        ingredient,
        amount: storage.amount
      }
    });

    return storageIngredients;
  }
}

export default GetUserStorageService;