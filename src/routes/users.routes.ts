import { Router, Request, Response } from 'express';

import CreateUserService from '../services/CreateUserService';
import AddIngredientToUserService from '../services/addIngredientToUserService';

import UsersRepository from '../typeORM/repositories/usersRepository';
import StoragesRepository from '../typeORM/repositories/storagesRepository';
import IngredientsRepository from '../typeORM/repositories/ingredientsRepository';

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

usersRoutes.get('/:username', async (request: Request, response: Response): Promise<Response> => {
  try {
    const { username } = request.params;

    const usersRepository = new UsersRepository();

    const getUser = await usersRepository.findByUsername(username);

    return response.json(getUser);
  } catch (err) {
    return response.json({ Error: err.message });
  }
});

usersRoutes.post('/add-ingredient', async (request: Request, response: Response): Promise<Response> => {
  try {
    const { amount, userId, ingredientName } = request.body;

    const storagesRepository = new StoragesRepository();
    const ingredientsRepository = new IngredientsRepository();

    const addIngredientToUserService = new AddIngredientToUserService(
      storagesRepository,
      ingredientsRepository
    );

    const storage = await addIngredientToUserService.execute({
      userId,
      ingredientName,
      amount
    });

    return response.json(storage);
  } catch (err) {
    return response.json({ Error: err.message });
  }
});

export default usersRoutes;