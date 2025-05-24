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

    renderMessages(messages) {
        let li = document.createElement('li');
        li.setAttribute('class', 'message');
        for(let message of messages.slice(0, 8)) {
            console.log(messages)

            li.innerHTML = `<article>
                <p class="user-name">${message.userName}</p>
                <p>
                    ${message.message}
                </p>
                <time>${message.date}</time>
            </article>`;
            this.output.appendChild(li);       
        }
        if(messages[9]) {
            li.innerHTML = `<article>
                <p class="user-name">${messages[9].userName}</p>
                <p>
                    ${messages[9].message}
                </p>
                <time>${messages[9].date}</time>
            </article>`;
            this.output.appendChild(li);
        }
    }

    getMessages() {
        fetch('http://127.0.0.1:3000/chat/messages')
            .then(response => response.json())
            .then(json => this.renderMessages(json));
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

sendButton.addEventListener('click', async () => {
    const messageController = new MessageController(
        document.querySelector('#message-list'),
        document.querySelector('#user-name').value,
        document.querySelector('#message-text').value
    );
    await setTimeout(messageController.sendMessage, 1);
    await setTimeout(messageController.getMessages, 1);
});

