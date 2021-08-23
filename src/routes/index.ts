import { Router } from 'express';

import ingredientRoutes from './ingredient.routes';
import usersRoutes from './users.routes';
import storageRoutes from './storages.routes';
import recipesRoutes from './recipes.routes';

const routes = Router();

routes.use('/ingredient', ingredientRoutes);
routes.use('/user', usersRoutes);
routes.use('/storage', storageRoutes);
routes.use('/recipe', recipesRoutes);

export default routes;