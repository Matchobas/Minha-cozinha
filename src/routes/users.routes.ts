import { Router, Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import UsersRepository from '../typeORM/repositories/usersRepository';

const usersRoutes = Router();

usersRoutes.post('/create', async (request: Request, response: Response): Promise<Response> => {
  try {
    const { name, personalFilters, username } = request.body;

    const usersRepository = new UsersRepository();

    const createUserService = new CreateUserService(usersRepository);

    const newUser = await createUserService.execute(name, personalFilters, username);

    return response.json(newUser);
  } catch (err) {
    return response.json({ Error: err.message });
  }
});

export default usersRoutes;