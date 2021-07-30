const { ChatSingleton } = require("../../classes/Chat");
const { onLeaveChatEmitter } = require("../emitters/onLeaveChat.emitter");
const {
  onUpdateConnectedUsersEmitter,
} = require("../emitters/onUpdateConnectedUsers.emitter");

module.exports.onDisconnectListener = (socket) => {
  socket.on("disconnect", () => {
    console.log(
      "Client disconnected from",
      socket.request.connection.remoteAddress
    );

    onLeaveChatEmitter(socket);

    const { room } = ChatSingleton.getUser(socket.id);
    ChatSingleton.getRoom(room).removeUser(socket.id);
    ChatSingleton.removeUser(socket.id);

    onUpdateConnectedUsersEmitter(socket, { room });
  });
};
