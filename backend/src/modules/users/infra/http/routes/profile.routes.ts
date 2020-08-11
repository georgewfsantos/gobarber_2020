import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';

import checkAuthentication from '@modules/users/infra/http/middlewares/checkAuthentication';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(checkAuthentication);

profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;
