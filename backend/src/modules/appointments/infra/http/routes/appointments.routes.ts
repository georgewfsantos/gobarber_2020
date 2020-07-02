import { Router } from 'express';

import checkAuthentication from '@modules/users/infra/http/middlewares/checkAuthentication';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(checkAuthentication);

/* appointmentsRouter.get('/', async (request, response) => {
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
}); */

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
