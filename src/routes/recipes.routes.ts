import { Router, Response, Request } from 'express';

import RecipesRepository from '../typeORM/repositories/RecipesRepository';
import CreateRecipeService from '../services/CreateRecipeService';

const recipesRoutes = Router();

recipesRoutes.post('/createRecipe', 
  async (request: Request, response: Response): Promise<Response> => {
    try {
      const { name, ingredients } = request.body;

      const recipesRepository = new RecipesRepository;

      const createRecipeService = new CreateRecipeService(
        recipesRepository
      );

      const recipe = await createRecipeService.execute(name, ingredients);

      return response.json(recipe);
    } catch (err) {
      return response.json({ Error: err.message });
    }
  }
)

export default recipesRoutes;