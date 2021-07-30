const { ChatSingleton } = require("../../classes/Chat");

module.exports.onSendMessageEmitter = (socket, message) => {
  const { room } = ChatSingleton.getUser(socket.id);
  socket.broadcast.to(room).emit("sendMessage", message);
};
