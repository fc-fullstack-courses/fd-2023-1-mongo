const createHttpError = require("http-errors");
const { User } = require("../models");
const AuthService = require('../services/auth.service');


module.exports.registration = async (req, res, next) => {
  try {
    const { body } = req;

    const user = await User.create(body);

    const userWithTokens = await AuthService.createSession(user);

    // 4. Отправить все на фронт
    res.status(201).send({
      data: userWithTokens
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

    const userWithTokens = await AuthService.createSession(user);

    // 3.4. Отправить все на фронт
    res.send({
      data: userWithTokens
    });
  } catch (error) {
    next(error);
  }
}

module.exports.refresh = async (req, res, next) => {
  try {
    const { tokenInstance } = req;

    const userWithTokens = await AuthService.refreshSession(tokenInstance);

    res.send({ data: userWithTokens });
  } catch (error) {
    next(error);
  }
}