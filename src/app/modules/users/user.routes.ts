import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { createUserZodSchema, updateUserZodSchema } from './user.validation';
import { UserController } from './user.controllers';
import { checkAuth } from '../../middlewares/checkAuth';
import { UserRole } from './user.interface';



const router = express.Router();

router.post('/register', validateRequest(createUserZodSchema), UserController.createUser);
// router.get('/', UserController.getAllUsers);
router.get('/', checkAuth(UserRole.ADMIN), UserController.getAllUsers);
router.get('/:id',checkAuth(UserRole.ADMIN), UserController.getSingleUser);
 router.get('/:id', UserController.getMe);

router.patch('/update/:id', checkAuth(UserRole.ADMIN), validateRequest(updateUserZodSchema), UserController.updateUser);
//router.delete('/delete/:id', checkAuth(UserRole.ADMIN), UserController.deleteUser);

router.patch('/block/:id',checkAuth(UserRole.ADMIN), validateRequest(updateUserZodSchema), UserController.toggleBlockUser );


export const UserRoutes = router;