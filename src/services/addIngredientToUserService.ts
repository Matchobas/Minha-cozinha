import StoragesRepository from '../typeORM/repositories/StoragesRepository';
import IngredientsRepository from '../typeORM/repositories/IngredientsRepository';

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

    const checkingStorage = await this.storagesRepository.findWithUserIdAndIngredientId(
      userId, 
      ingredientId
    );

    if (checkingStorage) {
      const increasedAmount = checkingStorage.amount + amount;
      console.log(increasedAmount);

      await this.storagesRepository.incrementAmountOfStorage(
        userId,
        ingredientId,
        increasedAmount
      );

      const updatedStorage = await this.storagesRepository.findWithUserIdAndIngredientId(
        userId,
        ingredientId
      );

      if (updatedStorage) {
        return updatedStorage;
      }
    } 

    const storage = await this.storagesRepository.createStorage({
      userId,
      ingredientId,
      amount
    });

    return storage;
  }
}

export default AddIngredientToUserService;