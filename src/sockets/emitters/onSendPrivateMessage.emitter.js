const { io } = require("../../server");

module.exports.onSendPrivateMessageEmitter = (socket, { msg, to }) => {
  io.to(to).emit("sendPrivateMessage", msg);
};
