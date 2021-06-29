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
}

export default StoragesRepository;