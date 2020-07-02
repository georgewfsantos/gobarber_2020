import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import checkAuthentication from '@modules/users/infra/http/middlewares/checkAuthentication';

const usersRouter = Router();
const upload = multer(uploadConfig);
const userscontroller = new UsersController();
const userAvatarcontroller = new UserAvatarController();

usersRouter.post('/', userscontroller.create);

usersRouter.patch(
  '/avatar',
  checkAuthentication,
  upload.single('avatar'),
  userAvatarcontroller.update,
);

export default usersRouter;
