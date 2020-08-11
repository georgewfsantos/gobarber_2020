import { Router } from 'express';

import checkAuthentication from '@modules/users/infra/http/middlewares/checkAuthentication';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(checkAuthentication);

/* appointmentsRouter.get('/', async (request, response) => {
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
}); */

providersRouter.get('/', providersController.index);

export default providersRouter;
