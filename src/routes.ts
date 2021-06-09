import { Router, Request, Response } from 'express';

const routes = Router();

routes.get('/ingredients', (request: Request, response: Response): Response => {
  return response.json({ message: "Funcionando" });
});

export default routes;