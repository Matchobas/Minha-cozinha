import { Router, Request, Response } from 'express';
import CreateIngredientService from './services/CreateIngredientService';
import IngredientsRepository from './typeORM/repositories/ingredientsRepository';

const routes = Router();

routes.post('/ingredients', async (request: Request, response: Response): Promise<Response> => {
  const { name, kcalValue, type, info } = request.body;

  const ingredientsRepository = new IngredientsRepository();

  const createIngredientService = new CreateIngredientService(ingredientsRepository);

  const ingredient = await createIngredientService.execute({
    name,
    kcalValue,
    type,
    info
  });
  
  return response.json(ingredient);
});

export default routes;