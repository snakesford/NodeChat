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

        const userListString = this.users.join(', ');
        const welcomeMessage = `Welcome, ${name}! Currently in chat: ${userListString}`;
        this.emit("post", welcomeMessage);
    }

    removeUser(name) {
        const index = this.users.indexOf(name);
        if (index !== -1) {
            this.users.splice(index, 1);
            this.emit("leave", new Date(), name);
            this.updateUsersList();

            const userListString = this.users.join(', ');
            const goodbyeMessage = `Goodbye, ${name}! Currently in chat: ${userListString}`;
            this.emit("post", goodbyeMessage);
        }
    }

    updateUsersList() {
        console.log('Current users:', this.users);
    }
}

module.exports = ChatBot;
//chat bot is going to react to events that the chat connector emitts
// 6:58
//@mentions chat bot
//@chatbot time
//@chatbot catch unknown names