import { userService } from '../services/user-service.js';
import { validationResult } from 'express-validator';

const MAX_AGE_COOKIE = 60 ** 3 * 24 * 1000;
const COOKIE_NAME = 'rtoken';

class UserController {
  async signup(req, res) {
    try {
      const { email, password, username, role } = req.body;
      const { errors } = validationResult(req);
      // console.log(errors);
      if (errors.length > 0) {
        throw new Error('Wrong email or password less than 3 symbols');
      }
      // console.log(req.body);
      const user = await userService.signup({ email, password, username, role });
      res.cookie(COOKIE_NAME, user.rToken, { maxAge: MAX_AGE_COOKIE, httpOnly: true });
      return res.json({ status: 200, user });
    } catch (error) {
      // console.log(error);
      res.json({
        status: 422,
        error: error.message,
      });
    }
  }

  async signin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userService.signin(email, password);

      res.cookie('rtoken', user.rToken, { maxAge: MAX_AGE_COOKIE, httpOnly: true });
      return res.json({ status: 200, user });
    } catch (error) {
      res.json({
        status: 422,
        error: error.message,
      });
    }
  }

  async logout(req, res) {
    try {
      const { rtoken } = req.cookies;

      // console.log('cockie', req.cookies);
      // console.log('rToken', rtoken);
      if (!rtoken) {
        throw new Error(`Wrong token, or undefined: ${rtoken}`);
      }
      await userService.logout(rtoken);

      res.clearCookie(COOKIE_NAME);
      // console.log('logout ok');
      return res.json({ status: 200, message: 'logout ok' });
    } catch (error) {
      console.log(error);
    }
  }
  async refresh(req, res) {
    try {
    } catch (error) {}
  }

  async getUsers(req, res) {
    try {
      res.json(['333', '222']);
    } catch (error) {
      res.json(error);
    }
  }

  async getUser(req, res) {
    try {
      res.json('222');
    } catch (error) {
      res.json(error.message);
    }
  }
}

export const userController = new UserController();
