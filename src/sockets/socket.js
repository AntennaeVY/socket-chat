const { io } = require("../server");

const { onDisconnectListener } = require("./listeners/onDisconnect.listener");
const { onEnterChatListener } = require("./listeners/onEnterChat.listener");
const { onSendMessageListener } = require("./listeners/onSendMessage.listener");
const {
  onSendPrivateMessageListener,
} = require("./listeners/onSendPrivateMessage.listener");

io.on("connection", (socket) => {
  console.log("Client connected from", socket.request.connection.remoteAddress);

  onEnterChatListener(socket);
  onSendMessageListener(socket);
  onSendPrivateMessageListener(socket);
  onDisconnectListener(socket);
});
