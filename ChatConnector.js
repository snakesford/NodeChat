const ChatBot = require('./ChatBot.js');
const ChatServer = require('./ChatServer.js');
const EventEmitter = require('events');

module.exports = class ChatConnector extends EventEmitter {
    constructor() {
        super();

        let bot = new ChatBot(this);

        bot.on('name', (name) => {
            let connection = new ChatServer(name);
            this.connection = connection;
            connection.on("join", (time, name) => {
                this.emit("join", time, name);
                bot.addUser(name);
            });
            connection.on("post", (time, name, post) => {
                this.emit("post", time, name, post);
            });
            connection.on("leave", (time, name) => {
                this.emit("leave", time, name);
                bot.removeUser(name);
            });
            connection.on("end", () => {
                process.exit(0);
            });
            connection.on("mention", (time, name, post) => {
                const mentionMessage = `Hey ${name}, you mentioned '@chatbot' in your message: "${post}"`;
                this.emit('mention', time, name, mentionMessage);
            });
            connection.on("time", (time, name, post) => {
                this.emit('time', time, name);
                this.connection.post(`the time is ${bot.formatDate(time)}`)
            });
            connection.on("rollcall", (time, name, post) => {
                const mentionMessage = 'rollcall1';
                const usersList = bot.users.join(', ')
                this.emit('rollcall', time, name, mentionMessage);
                this.connection.post(`Currently in chat: ${usersList}`)
            });
        });

        bot.on('post', (line) => {
            this.connection.post(line);
        })

        bot.on('end', () => {
            this.connection.close();
        });
    }
}