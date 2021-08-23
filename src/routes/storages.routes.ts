import { Router, Request, Response, response } from 'express';

import AddIngredientToUserService from '../services/addIngredientToUserService';
import GetUserStorageService from '../services/GetUserStorageService';

import StoragesRepository from '../typeORM/repositories/StoragesRepository';
import IngredientsRepository from '../typeORM/repositories/IngredientsRepository';
import UsersRepository from '../typeORM/repositories/UsersRepository';

const storageRoutes = Router();

storageRoutes.post('/add-ingredient', async (request: Request, response: Response): Promise<Response> => {
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

storageRoutes.get('/my-storage/:username', 
  async (request: Request, response: Response): Promise<Response> => {
    try {
      const { username } = request.params;

      const storagesRepository = new StoragesRepository;
      const usersRepository = new UsersRepository;
      const ingredientsReposiotry = new IngredientsRepository;

      const getUserStorageService = new GetUserStorageService(
        storagesRepository,
        usersRepository,
        ingredientsReposiotry
      );

      const userStorageIngredients = await getUserStorageService.execute(username);

      return response.json(userStorageIngredients);
    } catch (err) {
      return response.json({ Error: err.message });
    }
});

export default storageRoutes;