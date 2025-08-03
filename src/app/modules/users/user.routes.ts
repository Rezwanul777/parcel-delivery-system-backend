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
router.get('/:id', UserController.getSingleUser);
// router.delete('/delete/:id', UserController.);

// routes/user.route.ts or wherever UserRoutes is defined

router.patch('/block/:id',checkAuth(UserRole.ADMIN), validateRequest(updateUserZodSchema), UserController.toggleBlockUser );


export const UserRoutes = router;