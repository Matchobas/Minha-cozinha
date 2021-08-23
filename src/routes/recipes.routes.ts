import { Router, Response, Request } from 'express';

import RecipesRepository from '../typeORM/repositories/RecipesRepository';
import StoragesRepository from '../typeORM/repositories/StoragesRepository';
import UsersRepository from '../typeORM/repositories/UsersRepository';
import IngredientsRepository from '../typeORM/repositories/IngredientsRepository';

import FindRecipesWithStorageService from '../services/FindRecipesWithStorageService';
import CreateRecipeService from '../services/CreateRecipeService';

const recipesRoutes = Router();

recipesRoutes.post('/create', 
  async (request: Request, response: Response): Promise<Response> => {
    try {
      const { name, description, time, ingredients } = request.body;

      const recipesRepository = new RecipesRepository;

      const createRecipeService = new CreateRecipeService(
        recipesRepository
      );

      const recipe = await createRecipeService.execute({
        name,
        description,
        time,
        ingredients
      });

      return response.json(recipe);
    } catch (err) {
      return response.json({ Error: err.message });
    }
  }
)

recipesRoutes.get('/find-recipes/:username',
  async (request: Request, response: Response): Promise<Response> => {
    try {
      const { username } = request.params;
      const { ingredient } = request.query;

      const recipesRepository = new RecipesRepository;
      const storagesRepository = new StoragesRepository;
      const usersRepository = new UsersRepository;
      const ingredientsReposiotry = new IngredientsRepository;

      const findRecipesWithStorageService = new FindRecipesWithStorageService(
        recipesRepository,
        storagesRepository,
        ingredientsReposiotry,
        usersRepository
      );

      const availableRecipes = await findRecipesWithStorageService.execute(
        username,
        String(ingredient)
      );
      
      return response.json(availableRecipes);
    } catch (err) {
      return response.json({ Error: err.message });
    }
  }
)

export default recipesRoutes;