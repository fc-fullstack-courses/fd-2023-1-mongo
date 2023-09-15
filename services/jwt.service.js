const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN
} = require('../constants');


const jwtSign = promisify(jwt.sign);
const jwtVerify = promisify(jwt.verify);

const tokenConfig = {
  access: {
    secret: ACCESS_TOKEN_SECRET,
    expiresIn: ACCESS_TOKEN_EXPIRES_IN
  },
  refresh: {
    secret: REFRESH_TOKEN_SECRET,
    expiresIn: REFRESH_TOKEN_EXPIRES_IN
  }
}

const createToken = (payload, { secret, expiresIn }) => jwtSign(payload, secret, { expiresIn });
const verifyToken = (token, { secret }) => jwtVerify(token, secret);

module.exports.createTokenPair = async (payload) => {

  return {
    accessToken: await createToken(payload, tokenConfig.access),
    refreshToken: await createToken(payload, tokenConfig.refresh),
  }
}

module.exports.verifyAccessToken = token => verifyToken(token, tokenConfig.access);
module.exports.verifyRefreshToken = token => verifyToken(token, tokenConfig.refresh);