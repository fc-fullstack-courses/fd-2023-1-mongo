const createHttpError = require("http-errors");

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;

    res.status(201).send({ data: body });
  } catch (error) {
    next(error);
  }
}

module.exports.getUsers = async (req, res, next) => {
  res.send({ data: [] })
}

module.exports.getUser = async (req, res, next) => {
  try {
    const { params: { userId } } = req;

    res.send({ data: { id: userId } });
  } catch (error) {
    next(error);
  }
}
module.exports.updateUser = async (req, res, next) => {
  try {
    const { params: { userId } } = req;

    res.send({ data: { id: userId } });
  } catch (error) {
    next(error);
  }
}

module.exports.deleteUser = async (req, res, next) => {
  try {
    const { params: { userId } } = req;

    res.send({ data: { id: userId } });
  } catch (error) {
    next(error);
  }
}