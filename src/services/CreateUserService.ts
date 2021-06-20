import UsersRepository from '../typeORM/repositories/usersRepository';
import User from '../typeORM/entities/user';

class CreateUserService {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  public async execute(name: string, personalFilters: string): Promise<User> {
    
    const createdUser = await this.usersRepository.createUser(
      name,
      personalFilters
    );

    return createdUser;
  }
}

export default CreateUserService;