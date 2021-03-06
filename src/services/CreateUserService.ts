import UsersRepository from '../typeORM/repositories/UsersRepository';
import User from '../typeORM/entities/User';

class CreateUserService {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  public async execute(name: string, personalFilters: string, username: string): Promise<User> {
    const sameUsername = await this.usersRepository.findByUsername(username);

    if (sameUsername !== undefined) {
      throw new Error("This username is already being used");
    }

    const createdUser = await this.usersRepository.createUser(
      name,
      personalFilters,
      username
    );

    return createdUser;
  }
}

export default CreateUserService;