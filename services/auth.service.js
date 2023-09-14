const { RefreshToken } = require("../models");
const JwtService = require('./jwt.service');

module.exports.createSession = async (user) => {

  const tokenPayload = {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName
  }

  const tokenPair = await JwtService.createTokenPair(tokenPayload);

  await RefreshToken.create({ token: tokenPair.refreshToken, userId: user._id });

  return {
    user,
    tokenPair
  }
}
