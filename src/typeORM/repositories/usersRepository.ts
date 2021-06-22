import { getRepository, Repository } from 'typeorm';

import User from '../entities/user';

class UsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByName(name: string): Promise<User> {
    const user = await this.ormRepository.find({
      name: name
    })
  }

  public async createUser(name: string, personalFilters: string): Promise<User> {
    const user = this.ormRepository.create({
      name,
      personal_filters: personalFilters,
    })

    await this.ormRepository.save(user);

    return user;
  }
}

export default UsersRepository;