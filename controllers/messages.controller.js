const createHttpError = require('http-errors');
const { Message, User } = require('../models');

module.exports.createMessage = async (req, res, next) => {
  try {
    const { user, body } = req;

    const message = await Message.create({
      ...body,
      userId: user._id
    });


    res.status(201).send({ data: message });
  } catch (error) {
    next(error)
  }
}

module.exports.getAllMessages = async (req, res, next) => {
  try {

    const messages = await Message.find();

    res.send({ data: messages });
  } catch (error) {
    next(error)
  }
}

module.exports.getUserMessages = async (req, res, next) => {
  try {
    const { user } = req;

    const userMessages = await Message.find({
      userId: user._id
    });

    res.send({ data: userMessages });
  } catch (error) {
    next(error)
  }
}

module.exports.getMessage = async (req, res, next) => {
  try {
    const { params: { messageId }, user: { _id: userId } } = req;

    const message = await Message.findOne({
      _id: messageId,
      userId
    });

    if (!message) {
      return (next(createHttpError(404, 'Message not found')));
    }

    res.send({ data: message });
  } catch (error) {
    next(error)
  }
}

module.exports.updateMessage = async (req, res, next) => {
  try {
    const { user: { _id: userId }, params: { messageId }, body } = req;

    const updatedMessage = await Message.findOneAndUpdate({
      _id: messageId,
      userId
    }, body, {new: true});

    if(!updatedMessage) {
      return (next(createHttpError(404, 'Message not found')));
    }

    res.send({data: updatedMessage});
  } catch (error) {
    next(error)
  }
}

module.exports.deleteMessage = async (req, res, next) => {
  try {
    const { user: { _id: userId }, params: { messageId } } = req;

    const message = await Message.findOneAndDelete({
      _id: messageId,
      userId
    });

    if (!message) {
      return (next(createHttpError(404, 'Message not found')));
    }

    res.send({data: message});
  } catch (error) {
    next(error)
  }
}
