const ChatConnector = require('./ChatConnector.js');

const connector = new ChatConnector();

connector.on('join', (time, name) => {
    console.log(`Joined ${name}`);
    console.log(`ChatBot: Welcome ${name}!`);
});

connector.on('leave', (time, name) => {
    console.log(`${name} left the chat at ${time}`);
    console.log(`ChatBot: ${name} left the chat.`);
});

