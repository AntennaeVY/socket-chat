const { ChatSingleton } = require("../classes/Chat");

module.exports.createMessage = (senderid, message) => {
  const sender = ChatSingleton.getUser(senderid);

  return {
    sender,
    message,
    date: new Date().getTime(),
  };
};
