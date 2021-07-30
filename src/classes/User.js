class User {
  constructor({ id, username, room, picture }) {
    this.id = id;
    this.username = username;
    this.room = room;
    this.picture = picture;
  }

  changeRoom(room) {
    this.room = room;
    return this.room;
  }
}

module.exports.User = User;
