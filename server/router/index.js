import { Router } from 'express';

import { userController } from '../controllers/UserController.js';

const router = new Router();

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUser);

export { router };
