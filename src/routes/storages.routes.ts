import { Router, Request, Response } from 'express';

import AddIngredientToUserService from '../services/addIngredientToUserService';

import StoragesRepository from '../typeORM/repositories/storagesRepository';
import IngredientsRepository from '../typeORM/repositories/ingredientsRepository';

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

export default storageRoutes;