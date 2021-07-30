const { ChatSingleton } = require("../../classes/Chat");
const { User } = require("../../classes/User");

const {
  onUpdateConnectedUsersEmitter,
} = require("../emitters/onUpdateConnectedUsers.emitter");
const { onEnterChatEmitter } = require("../emitters/onEnterChat.emitter");

module.exports.onEnterChatListener = (socket) => {
  socket.on("enterChat", ({ username, room }) => {
    const picture = Math.floor(Math.random() * 8) + 1 + ".jpg";

    const user = new User({
      id: socket.id,
      username,
      room,
      picture,
    });

    if (!ChatSingleton.getRoom(room)) {
      ChatSingleton.addNewRoom(room);
    }

    ChatSingleton.addUser(user);
    ChatSingleton.getRoom(room).addUser(user);
    socket.join(room);

    onEnterChatEmitter(socket);
    onUpdateConnectedUsersEmitter(socket, { room });
  });
};
