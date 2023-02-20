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
}

export const tokenService = new TokenService();
