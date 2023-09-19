const { Message, User } = require('../models');

/**
 * 
 * @param {object} messageData 
 * @param {object} messageData.user message author object
 * @param {string} messageData.body message text
 * @returns {object} new message
 */
module.exports.createMessage = async ({ user, body }) => {

  const newMessage = await (await Message.create({
    body,
    user: user._id
  })).populate({ path: 'user', select: 'firstName lastName email isOnline' });

  // дописать в массив messages у юзера айдишник нового сообщения
  await User.updateOne({ _id: user._id }, { $push: { messages: newMessage._id } });

  return newMessage;
}

module.exports.findMessages = async (filter, select, populate) => {

  const messages = await Message.find(filter, select).populate(populate || '');

  return messages;
}