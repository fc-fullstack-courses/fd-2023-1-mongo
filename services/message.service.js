const { Message } = require('../models');

/**
 * 
 * @param {object} messageData 
 * @param {object} messageData.user message author object
 * @param {string} messageData.body message text
 * @returns {object} new message
 */
module.exports.createMessage = async ({ user, body }) => {
  const newMessage = await Message.create({
    ...body,
    user: user._id
  });

  // дописать в массив messages у юзера айдишник нового сообщения
  await user.updateOne({ $push: { messages: newMessage._id } });

  return newMessage;
}

module.exports.findMessages = async (filter, select, populate) => {

  console.log(filter);
  console.log(select);
  console.log(populate);

  const messages = await Message.find(filter, select).populate(populate || '');

  console.log(messages);

  return messages;
}