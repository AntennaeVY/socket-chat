var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has("username")) {
  window.location = "index.html";
  throw new Error("Username is required for accessing the chat");
}

var username = params.get("username");
var room;

if (!params.has("room")) {
  room = "lobby";
} else {
  room = params.get("room");
}

socket.on("connect", function () {
  console.log("Connected to the server");

  socket.emit("enterChat", { username, room });
});

socket.on("enterChat", function (data) {
  console.log("User", data.username, "has joined to", data.room);
});

socket.on("leaveChat", function (data) {
  console.log("User", data.username, "has left", data.room);
});

socket.on("sendMessage", function (data) {
  renderMessage(data);
  scrollBottom();
});

socket.on("sendPrivateMessage", function (data) {
  console.log(data);
});

socket.on("updateConnectedUsers", function (data) {
  if (data.length) {
    renderUsers(data);
  }
});

socket.on("disconnect", function () {
  console.log("Lost server connection");
});
