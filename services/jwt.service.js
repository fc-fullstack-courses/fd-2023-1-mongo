const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const jwtSign = promisify(jwt.sign);
const jwtVerify = promisify(jwt.verify);

const tokenConfig = {
  access: {
    secret: '398yt9whf98hr23r903dj0efdje',
    expiresIn: '1min'
  },
  refresh: {
    secret: '7943yt43798rg23798rhg2387rg238r23',
    expiresIn: '7d'
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