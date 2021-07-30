const { ChatSingleton } = require("../../classes/Chat");
const { io } = require("../../server");

module.exports.onUpdateConnectedUsersEmitter = (socket, { room }) => {
  const connectedUsers = ChatSingleton.getRoom(room).getConnectedUsers();

  io.to(room).emit("updateConnectedUsers", connectedUsers);
};
