const { Room } = require("./Room");

class Chat {
  constructor() {
    this.rooms = [new Room("lobby")];
    this.allUsers = [];
  }

  addNewRoom(room) {
    const newRoom = new Room(room);
    this.rooms.push(newRoom);
    return newRoom;
  }

  getRoom(name) {
    return this.rooms.filter((r) => r.name == name)[0];
  }

  getUser(id) {
    return this.allUsers.filter((u) => u.id == id)[0];
  }

  addUser(user) {
    this.allUsers.push(user);
    return this.allUsers;
  }

  removeUser(id) {
    this.allUsers = this.allUsers.filter((u) => u.id != id);
    return this.allUsers;
  }
}

module.exports.ChatSingleton = new Chat();
