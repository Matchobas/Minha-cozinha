import { Router, Request, Response } from 'express';
import CreateIngredientService from './services/CreateIngredientService';
import SearchIngredientsByKcalValueService from './services/SearchIngredientsByKcalValueService';
import IngredientsRepository from './typeORM/repositories/ingredientsRepository';

const routes = Router();

routes.post('/ingredients', async (request: Request, response: Response): Promise<Response> => {
  try {
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
  } catch (err) {
    return response.json({ Error: err.message });
  }
});

routes.get('/ingredients/search', 
  async (request: Request, response: Response): Promise<Response> => {
    try {
      const { kcalValue } = request.query;
    
      const ingredientsRepository = new IngredientsRepository();

      const searchIngredientsByKcalValueService = new SearchIngredientsByKcalValueService(
        ingredientsRepository
      );

      const ingredients = await searchIngredientsByKcalValueService.execute(Number(kcalValue));

      return response.json(ingredients);
    } catch (err) {
      return response.json({ Error: err.message });
    }
});

export default routes;