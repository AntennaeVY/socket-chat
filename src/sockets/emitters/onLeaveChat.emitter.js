const { ChatSingleton } = require("../../classes/Chat");
const { io } = require("../../server");

module.exports.onLeaveChatEmitter = (socket) => {
  const { username, room } = ChatSingleton.getUser(socket.id);
  io.to(room).emit("leaveChat", { username, room });
};
