const createHttpError = require("http-errors");
const { User } = require("../models");


module.exports.registration = async (req, res, next) => {
  try {
    const { body } = req;

    const user = await User.create(body);

    res.status(201).send({ data: user });
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

    // 3. дать клиенту данные 
    res.send({ data: user });
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