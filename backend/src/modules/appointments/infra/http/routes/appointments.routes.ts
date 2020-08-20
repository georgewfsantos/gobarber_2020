import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import checkAuthentication from '@modules/users/infra/http/middlewares/checkAuthentication';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(checkAuthentication);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsController.create,
);
appointmentsRouter.get(
  '/my_appointments',
  providerAppointmentsController.index,
);

export default appointmentsRouter;
