import { Router } from 'express';
import ingredientRoutes from './ingredient.routes';
import usersRoutes from './users.routes';
import storageRoutes from './storages.routes';

const routes = Router();

routes.use('/ingredient', ingredientRoutes);
routes.use('/user', usersRoutes);
routes.use('/storage', storageRoutes);

export default routes;