'use strict';

class MessageController {
    constructor(messageList, userName, messageText) {
        this.output = messageList;
        this.userName = this.setUserName(userName);
        this.data = {
            userName: userName,
            message: messageText,
            date: ""
        };
    }

    appendMessage(messages) {//!!!!!!!!!!!!!
        for(let message in messages) {
            const li = document.createElement('li');
            li.setAttribute('class', 'message');
            li.innerHTML = `<article>
                <p class="user-name">${message.userName}</p>
                <p>
                    ${message.message}
                </p>
                <time>${message.date}</time>
            </article>`;
            this.output.appendChild(li);
        }
    }

    getMessages() {
        fetch('http://127.0.0.1:3000/chat/messages')
            .then(response => response.json())
            .then(json => this.appendMessage(json));
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
    

    setUserName(userName) {
        if(userName !== 'Anon') {
            userName = document.cookie.replace('username=', '');
            return userName;
        } 
    }


}

const sendButton = document.querySelector('#send-button');

sendButton.addEventListener('click', () => {
    const messageController = new MessageController(
        document.querySelector('#message-list'),
        document.querySelector('#user-name').value,
        document.querySelector('#message-text').value
    );

    messageController.sendMessage();
    messageController.getMessages();
});

