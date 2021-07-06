import Storage from 'typeORM/entities/storage';
import Ingredient from '../typeORM/entities/ingredient';

import StoragesRepository from '../typeORM/repositories/storagesRepository';
import UsersRepository from '../typeORM/repositories/usersRepository';
import IngredientsRepository from '../typeORM/repositories/ingredientsRepository';

interface ingredientInStorage {
  ingredient: Ingredient;
  amount: number;
}

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

  public async execute(username: string): Promise<ingredientInStorage[]> {
    const loggedUser = await this.usersRepository.findByUsername(username);

    if(!loggedUser) {
      throw new Error("User does not exist");
    }

    const loggedUserId = loggedUser.id;

    const userStorage = await this.storagesRepository.findAllByUserId(loggedUserId);

    // Uma outra possibilidade seria fazer toda essa chamada direta do Banco de Dados!!!!

    const allIngredients = await this.ingredientsRepository.findAllIngredients();

    const storageIngredients: ingredientInStorage[] = userStorage.map(storage => {
      const ingredient = allIngredients.find(ingre => ingre.id = storage.ingredient_id);

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