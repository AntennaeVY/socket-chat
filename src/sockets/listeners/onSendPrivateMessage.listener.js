const { createMessage } = require("../../utils/utils");
const {
  onSendPrivateMessageEmitter,
} = require("../emitters/onSendPrivateMessage.emitter");

module.exports.onSendPrivateMessageListener = (socket) => {
  socket.on("sendPrivateMessage", ({ to, message }) => {
    const msg = createMessage(to, message);
    onSendPrivateMessageEmitter(socket, { msg, to });
  });
};
