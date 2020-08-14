import { Router } from 'express';

import checkAuthentication from '@modules/users/infra/http/middlewares/checkAuthentication';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(checkAuthentication);

appointmentsRouter.post('/', appointmentsController.create);
appointmentsRouter.get(
  '/my_appointments',
  providerAppointmentsController.index,
);

export default appointmentsRouter;
