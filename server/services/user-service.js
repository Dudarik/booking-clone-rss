import bcrypt from 'bcrypt';
import { sequelize } from '../db_settings/index.js';

import { UsersModel } from '../models/UsersModel.js';
import { tokenService } from './token-service.js';

class UserService {
  async signup(email, password, username, role) {
    await sequelize.authenticate();

    const userToAdd = await UsersModel.findOne({ where: { email } });
    // console.log('usertoadd', userToAdd);
    if (userToAdd) {
      throw new Error(`User with email: ${email} exists.`);
    }
    const passwordHash = await bcrypt.hash(password, 2);
    // console.log('hash', passwordHash);
    const newUser = {
      email,
      password: passwordHash,
      username,
      role,
    };
    // console.log('newUser', newUser);
    const user = await UsersModel.create(newUser);

    // console.log('user', user);
    const tokens = tokenService.generateTokens({ uid: user.uid, email: user.email });
    await tokenService.saveRefreshTokenToDB(user.uid, tokens.rToken);

    await sequelize.close();
    return {
      ...tokens,
      uid: user.uid,
      email: user.email,
    };
  }
}

export const userService = new UserService();
