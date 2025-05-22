'use strict';

class MessageController {
    constructor(messangeList, userName, messageText) {
        this.output = messangeList;
        this.userName = this.setUserName(userName);
        this.data = {
            userName: userName,
            message: messageText
        };
    }

    getMessages() {
        fetch('http://127.0.0.1:3000/chat/messages')
            .then(response => response.json())
            .then(json => console.log(json));
    }

    sendMessage() {
        fetch('http://127.0.0.1:3000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.data)
        })
        .catch(error => console.error(error));
    }
    

    setUserName(userName) {////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        if(userName !== 'Anon') {
            this.userName = userName;
            document.querySelector('#user-name').value = document.cookie.replace('username=', '');
        } 
    }
}

const sendButton = document.querySelector('#send-button');

sendButton.addEventListener('click', () => {
    const messageController = new MessageController(
        document.querySelector('#messenge-list'),
        document.querySelector('#user-name').value,
        document.querySelector('#message-text').value
    );

    messageController.sendMessage();
    messageController.getMessages();
});

