import { Router } from 'express';

import checkAuthentication from '@modules/users/infra/http/middlewares/checkAuthentication';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthlyAvailabilityController from '../controllers/ProviderMonthlyAvailabilityController';
import ProviderDailyAvailabilityController from '../controllers/ProviderDailyAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthlyAvailabilityController = new ProviderMonthlyAvailabilityController();
const providerDailyAvailabilityController = new ProviderDailyAvailabilityController();

providersRouter.use(checkAuthentication);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/monthly-availability',
  providerMonthlyAvailabilityController.index,
);
providersRouter.get(
  '/:provider_id/daily-availability',
  providerDailyAvailabilityController.index,
);

export default providersRouter;
