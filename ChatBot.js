const EventEmitter = require('events');

class ChatBot extends EventEmitter {
    constructor(connector) {
        super();
        this.users = [];
        process.nextTick(() => this.emit("name", "ChatBot"));
    }

    addUser(name) {
        this.users.push(name);
        this.emit("join", new Date(), name);
        this.updateUsersList();
    }

    removeUser(name) {
        const index = this.users.indexOf(name);
        if (index !== -1) {
            this.users.splice(index, 1);
            this.emit("leave", new Date(), name);
            this.updateUsersList();
        }
    }

    updateUsersList() {
        console.log('Current users:', this.users);
    }
}

module.exports = ChatBot;
