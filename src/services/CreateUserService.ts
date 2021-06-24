import UsersRepository from '../typeORM/repositories/usersRepository';
import User from '../typeORM/entities/user';

class CreateUserService {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  public async execute(name: string, personalFilters: string, username: string): Promise<User> {
    const sameUsername = await this.usersRepository.findByUsername(username);

    if (sameUsername !== null) {
      throw new Error("This username already exists");
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