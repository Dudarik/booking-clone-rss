import { Router } from 'express';

import { userController } from '../controllers/UserController.js';

import { body } from 'express-validator';
const router = new Router();

const validator_email_pass = [
  body('email').isEmail().normalizeEmail(),
  body('password').not().isEmpty().trim().isLength({ min: 3 }).withMessage('Must be at least 3 chars long'),
];

router.post('/signup', validator_email_pass, userController.signup);
router.post('/signin', validator_email_pass, userController.signin);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUser);

export { router };
