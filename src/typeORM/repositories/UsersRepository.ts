import { getRepository, Repository } from 'typeorm';

import User from '../entities/User';

class UsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { username: username }
    });

    return user;
  }

  public async createUser(name: string, personalFilters: string, username: string): Promise<User> {
    const user = this.ormRepository.create({
      name,
      personal_filters: personalFilters,
      username,
    })

    await this.ormRepository.save(user);

    return user;
  }
}

export default UsersRepository;