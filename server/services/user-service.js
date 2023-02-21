import bcrypt from 'bcrypt';
import { sequelize } from '../db_settings/index.js';

import { UsersModel } from '../models/UsersModel.js';
import { tokenService } from './token-service.js';

const SALT_ROUNDS = 2;

class UserService {
  async signup(user) {
    const { email, password } = user;
    await sequelize.authenticate();

    const userToAdd = await UsersModel.findOne({ where: { email } });
    // console.log('usertoadd', userToAdd);
    if (userToAdd) {
      throw new Error(`User with email: ${email} exists.`);
    }
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = Object.assign({}, user, { password: passwordHash });
    // console.log('newUser', newUser);
    const addedUser = await UsersModel.create(newUser);

    // console.log('user', user);
    const tokens = tokenService.generateTokens({ uid: addedUser.uid, email: addedUser.email });
    await tokenService.saveRefreshTokenToDB(addedUser.uid, tokens.rToken);

    // await sequelize.close();
    return {
      ...tokens,
      uid: addedUser.uid,
      email: addedUser.email,
    };
  }

  async signin(email, password) {
    await sequelize.authenticate();

    const user = await UsersModel.findOne({ where: { email } });

    // console.log(user);
    if (!user) {
      console.log('User not found');
      throw new Error('User not found');
    }

    // const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error('Wrong password');
    }

    const tokens = tokenService.generateTokens({ uid: user.uid, email: user.email });
    await tokenService.saveRefreshTokenToDB(user.uid, tokens.rToken);

    // await sequelize.close();
    return {
      ...tokens,
      uid: user.uid,
      email: user.email,
    };
  }

  async logout(rtoken) {
    await tokenService.deleteTokenFromDB(rtoken);
  }

  async refresh(rtoken) {
    if (!rtoken) {
      throw new Error('User is not authorized');
    }
    const user = tokenService.validateToken(rtoken, process.env.JWT_REFRESH_SECRET);
    const tokenFromDB = tokenService.getTokenFormDB(rtoken);

    if (!user || !tokenFromDB) {
      throw new Error('User is not authorized');
    }

    const tokens = tokenService.generateTokens({ uid: user.uid, email: user.email });
    await tokenService.saveRefreshTokenToDB(user.uid, tokens.rToken);

    // await sequelize.close();
    return {
      ...tokens,
      uid: user.uid,
      email: user.email,
    };
  }
}

export const userService = new UserService();
