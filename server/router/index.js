import { Router } from 'express';

import { userController } from '../controllers/UserController.js';

import { body } from 'express-validator';
import { restaurantController } from '../controllers/ResaurantController.js';
import { tablesController } from '../controllers/TablesController.js';
const router = new Router();

const MIN_PASSWORD_LENGTH = 3;
const validator_email_pass = [
  body('email').isEmail().normalizeEmail(),
  body('password')
    .not()
    .isEmpty()
    .trim()
    .isLength({ min: MIN_PASSWORD_LENGTH })
    .withMessage('Must be at least 3 chars long'),
];

router.post('/signup', validator_email_pass, userController.signup);
router.post('/signin', validator_email_pass, userController.signin);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUser);

router.post('/restaurants', restaurantController.addRestaurant);
router.get('/restaurants', restaurantController.getRestaurants);
router.get('/restaurants/:id', restaurantController.getRestaurant);

router.post('/tables/:id', tablesController.bindTable);
router.get('/tables/:rid', tablesController.getTablesFromRestaraunt);
// router.get('/tables/:datetime', tablesController.getTablesByDatetime);
router.get('/tables', tablesController.getAllTables);

export { router };
