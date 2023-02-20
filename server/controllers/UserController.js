'use strict';

// import { sequelize } from '../db_settings/index.js';

// import { UsersModel } from '../models/UsersModel.js';
import { userService } from '../services/user-service.js';

class UserController {
  async signup(req, res) {
    try {
      const { email, password, username, role } = req.body;
      console.log(req.body);
      const user = await userService.signup(email, password, username, role);
      res.cookie('rtoken', user.rToken, { maxAge: 60 ** 3 * 24 * 1000, httpOnly: true });
      return res.json(user);
    } catch (error) {
      console.log(error);
    }
  }

  async signin(req, res) {
    try {
    } catch (error) {}
  }

  async logout(req, res) {
    try {
    } catch (error) {}
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
