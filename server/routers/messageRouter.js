const messageRouter = require('express').Router();
const messageController = require('../controllers/messages.controller');
const { checkAccessToken } = require('../middlewares/token.mw');

messageRouter.route('/')
  .post(checkAccessToken, messageController.createMessage)
  .get(messageController.getUserMessages);

messageRouter.route('/:messageId')
  .get(messageController.getMessage)
  .put(messageController.updateMessage)
  .delete(messageController.deleteMessage);

module.exports = messageRouter;