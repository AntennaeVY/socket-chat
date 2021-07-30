const { onSendMessageEmitter } = require("../emitters/onSendMessage.emitter");
const { createMessage } = require("../../utils/utils");

module.exports.onSendMessageListener = (socket) => {
  socket.on("sendMessage", (msg, fn) => {
    const message = createMessage(socket.id, msg);
    onSendMessageEmitter(socket, message);

    fn(message);
  });
};
