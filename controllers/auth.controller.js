const createHttpError = require("http-errors");
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { User, RefreshToken } = require("../models");

const jwtSign = promisify(jwt.sign);

module.exports.registration = async (req, res, next) => {
  try {
    const { body } = req;

    const user = await User.create(body);

    // 1. создадим payload для токена
    const tokenPayload = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName
    }

    // 2. генерируем токены
    const accessToken = await jwtSign(tokenPayload, '398yt9whf98hr23r903dj0efdje', { expiresIn: '1min' });
    const refreshToken = await jwtSign(tokenPayload, '7943yt43798rg23798rhg2387rg238r23', { expiresIn: '7d' });

    // 3. сохранить рефреш токен в БД
    await RefreshToken.create({ token: refreshToken, userId: user._id });

    // 4. Отправить все на фронт
    res.status(201).send({
      data: {
        user,
        tokenPair: {
          accessToken,
          refreshToken
        }
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports.login = async (req, res, next) => {
  try {
    const { body: { email, password } } = req;

    // 1. найти пользователя
    const user = await User.findOne({
      email
    });

    // 1.5 если нет такого то кидаем ошибку
    if (!user) {
      return next(createHttpError(404, 'Invalid data for user'));
    }

    // 2 проверить пароль
    if (user.password !== password) {
      return next(createHttpError(404, 'Invalid data for user'));
    }

    // 3.1. создадим payload для токена
    const tokenPayload = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName
    }

    // 3.2. генерируем токены
    const accessToken = await jwtSign(tokenPayload, '398yt9whf98hr23r903dj0efdje', { expiresIn: '1min' });
    const refreshToken = await jwtSign(tokenPayload, '7943yt43798rg23798rhg2387rg238r23', { expiresIn: '7d' });

    // 3.3 сохранить рефреш токен в БД
    await RefreshToken.create({ token: refreshToken, userId: user._id });

    // 3.4. Отправить все на фронт
    res.status(201).send({
      data: {
        user,
        tokenPair: {
          accessToken,
          refreshToken
        }
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports.refresh = async (req, res, next) => {
  try {
    // TODO
  } catch (error) {
    next(error);
  }
}