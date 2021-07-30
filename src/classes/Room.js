class Room {
  constructor(name) {
    this.name = name;
    this.users = [];
  }

  addUser(user) {
    this.users.push(user);

    return this.users;
  }

  getUser(id) {
    return this.users.filter((u) => u.id == id)[0];
  }

  getConnectedUsers() {
    return this.users;
  }

  removeUser(id) {
    this.users = this.users.filter((u) => u.id != id);

    return this.users;
  }
}

module.exports.Room = Room;
