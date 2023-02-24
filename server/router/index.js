import { Router } from 'express';

import { userController } from '../controllers/UserController.js';

import { body } from 'express-validator';
import { restaurantController } from '../controllers/ResaurantController.js';
import { tablesController } from '../controllers/TablesController.js';
import { commentsController } from '../controllers/CommentsController.js';
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
router.get('/users/:uid', userController.getUser);
router.patch('/users/:uid', userController.changeUser);
router.delete('/users/:uid', userController.deleteUser);

router.post('/restaurants', restaurantController.addRestaurant);
router.get('/restaurants', restaurantController.getRestaurants);
router.get('/restaurants/:rid', restaurantController.getRestaurant);
router.patch('/restaurants/:rid', restaurantController.setRestaurantSettings);
router.delete('/restaurants/:rid', restaurantController.deleteRestaurant);

router.post('/tables/:id', tablesController.bindTable);
router.post('/tables', tablesController.addTable);
router.get('/tables/:rid', tablesController.getTablesFromRestaraunt);
router.get('/tables', tablesController.getAllTables);
router.patch('/tables/:tid', tablesController.setTableSettings);
router.delete('/tables/:tid', tablesController.deleteTables);

router.post('/comments/:rid', commentsController.addComment);
router.get('/comments/:rid', commentsController.getCommentsRestaurant);
router.patch('/comments/:id', commentsController.changeComment);
router.delete('/comments/:id', commentsController.deleteComment);

export { router };
