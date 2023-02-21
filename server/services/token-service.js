import jwt from 'jsonwebtoken';

import { TokenModel } from '../models/TokenModel.js';

class TokenService {
  generateTokens(payload) {
    // console.log(jwt);
    const aToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '60m' });
    const rToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '60d' });

    return {
      aToken,
      rToken,
    };
  }

  validateToken(token, secret) {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async saveRefreshTokenToDB(uid, refreshtoken) {
    const existToken = await TokenModel.findOne({ where: { uid } });
    // console.log('exist token', existToken);
    if (existToken) {
      await TokenModel.update({ refreshtoken }, { where: { uid } });
      return existToken;
    }
    const newToken = await TokenModel.create({ uid, refreshtoken });
    return newToken;
  }

  async deleteTokenFromDB(rtoken) {
    // console.log('rtoken', rtoken);
    const existToken = await TokenModel.findOne({ where: { refreshtoken: rtoken } });
    // console.log(existToken);
    if (existToken) {
      await TokenModel.destroy({ where: { refreshtoken: rtoken } });
    }
  }
  async getTokenFormDB(rtoken) {
    const token = await TokenModel.findOne({
      where: {
        refreshtoken: rtoken,
      },
    });
    return token;
  }
}

export const tokenService = new TokenService();
