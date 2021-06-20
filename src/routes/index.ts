import { Router } from 'express';
import ingredientRoutes from './ingredient.routes';
import usersRoutes from './users.routes';

const routes = Router();

routes.use('/ingredient', ingredientRoutes);
routes.use('/user', usersRoutes);

export default routes;