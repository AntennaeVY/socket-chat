const { ChatSingleton } = require("../../classes/Chat");
const { io } = require("../../server");

module.exports.onEnterChatEmitter = (socket) => {
  const { username, room } = ChatSingleton.getUser(socket.id);
  io.to(room).emit("enterChat", { username, room });
};
