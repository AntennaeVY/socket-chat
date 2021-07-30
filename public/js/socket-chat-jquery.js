var params = new URLSearchParams(window.location.search);

var username = params.get("username");
var room;

if (!params.has("room")) {
  room = "lobby";
} else {
  room = params.get("room");
}

var roomName = $("#room-name");
roomName.text(room);

var usersContainer = $("#users");
usersContainer.on("click", "a", function () {
  var id = $(this).data("id");

  if (id) {
    console.log("Private messages will come soon...");
  }
});

var chatboxForm = $("#chatbox-form");
var messageBox = $("#message-box");

chatboxForm.on("submit", function (e) {
  e.preventDefault();
  var message = messageBox.val();

  if (message.trim().length != 0) {
    socket.emit("sendMessage", message, function (resp) {
      messageBox.val("");
      renderMessage(resp, true);
    });
  }
});

var chatbox = $("#chatbox");

function renderUsers(users) {
  var html = "";

  html +=
    '<li><a href="javascript:void(0)" class="active">Chat room: <span>' +
    params.get("room") +
    "</span></a></li>";

  for (var i = 0; i < users.length; i++) {
    html +=
      '<li> <a data-id="' +
      users[i].id +
      '" href="javascript:void(0)"><img src="assets/images/users/' +
      users[i].picture +
      '" alt="user-img" class="img-circle"/>';
    html +=
      "<span>" +
      users[i].username +
      '<small class="text-success">online</small></span></a></li>';
  }

  usersContainer.html(html);
}

function renderMessage(message, self) {
  var html = "";
  var date = new Date(message.date);
  var hours = date.getHours();
  var minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = "0" + minutes.toString();
  }

  var time = hours + ":" + minutes;

  if (self) {
    html += '<li class="reverse animated fadeIn">';
    html += '<div class="chat-content">';
    html += "<h5>" + message.sender.username + "</h5>";
    html +=
      '<div class="box bg-light-inverse">' + message.message + "</div></div>";
    html +=
      '<div class="chat-img"><img src="assets/images/users/' +
      message.sender.picture +
      '" alt="user" /></div>';
    html += '<div class="chat-time">' + time + "</div></li>";
  } else {
    html +=
      '<li class="animated fadeIn"><div class="chat-img"><img src="assets/images/users/' +
      message.sender.picture +
      '" alt="user" /></div>';
    html += '<div class="chat-content">';
    html += "<h5>" + message.sender.username + "</h5>";
    html += '<div class="box bg-light-info">' + message.message + "</div>";
    html += '<div class="chat-time">' + time + "</div></div></li>";
  }
  chatbox.append(html);
  scrollBottom();
}

function scrollBottom() {
  var newMessage = chatbox.children("li:last-child");

  var clientHeight = chatbox.prop("clientHeight");
  var scrollTop = chatbox.prop("scrollTop");
  var scrollHeight = chatbox.prop("scrollHeight");
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight() || 0;

  if (
    clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
    scrollHeight
  ) {
    chatbox.scrollTop(scrollHeight);
  }
}
