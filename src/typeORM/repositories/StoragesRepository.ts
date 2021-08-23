import { getRepository, Repository } from 'typeorm';

import CreateStorageDTO from '../../dtos/CreateStorageDTO';
import Storage from '../entities/storage';

class StoragesRepository {
  private ormRepository: Repository<Storage>;

  constructor() {
    this.ormRepository = getRepository(Storage);
  }

  public async createStorage({userId, ingredientId, amount}: CreateStorageDTO): Promise<Storage> {

    const storage = this.ormRepository.create({
      user_id: userId,
      ingredient_id: ingredientId,
      amount
    });

    await this.ormRepository.save(storage);

    return storage;
  }

  public async findWithUserIdAndIngredientId(
    userId: string,
    ingredientId: string
  ): Promise<Storage | null> {

    const storage = await this.ormRepository.findOne({
      where: {
        user_id: userId,
        ingredient_id: ingredientId
      }
    });

    if (!storage) {
      return null;
    }
  
    return storage;
  }

  public async incrementAmountOfStorage(userId: string, ingredientId: string, amount: number): Promise<void>{
    await this.ormRepository.createQueryBuilder()
    .update(Storage)
    .set({ amount: amount })
    .where("user_id = :user_id", { user_id: userId })
    .andWhere("ingredient_id = :ingredient_id", { ingredient_id: ingredientId })
    .execute();
  }

  public async findAllByUserId(userId: string): Promise<Storage[]> {
    const userStorage = await this.ormRepository.find({
      where: { user_id: userId }
    });

    return userStorage;
  }
}

export default StoragesRepository;