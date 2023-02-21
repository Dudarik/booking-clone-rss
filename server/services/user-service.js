import bcrypt from 'bcrypt';
import { sequelize } from '../db_settings/index.js';

import { UsersModel } from '../models/UsersModel.js';
import { tokenService } from './token-service.js';

class UserService {
  async signup(user) {
    const { email, password } = user;
    await sequelize.authenticate();

    const userToAdd = await UsersModel.findOne({ where: { email } });
    // console.log('usertoadd', userToAdd);
    if (userToAdd) {
      throw new Error(`User with email: ${email} exists.`);
    }
    const passwordHash = await bcrypt.hash(password, 2);

    const newUser = Object.assign({}, user, { password: passwordHash });
    // console.log('newUser', newUser);
    const addedUser = await UsersModel.create(newUser);

    // console.log('user', user);
    const tokens = tokenService.generateTokens({ uid: addedUser.uid, email: addedUser.email });
    await tokenService.saveRefreshTokenToDB(addedUser.uid, tokens.rToken);

    await sequelize.close();
    return {
      ...tokens,
      uid: addedUser.uid,
      email: addedUser.email,
    };
  }
}

export const userService = new UserService();
