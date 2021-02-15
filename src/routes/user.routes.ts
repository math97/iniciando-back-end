import { Request, Response, Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import { getCustomRepository } from 'typeorm';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import updateUserAvatar from '../services/UpdateUserAvatarService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const userRouter = Router();

const upload = multer(uploadConfig);


userRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({ name, email, password })

  //delete user.password;

  return response.json(user);

})

userRouter.patch('/avatar', ensureAuthenticated,
  upload.single('avatar'),
  async (request: Request, response: Response) => {

    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json(user);

  });

export default userRouter;
