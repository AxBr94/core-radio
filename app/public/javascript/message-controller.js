'use strict';

class MessageController {
    constructor(messageList, userName, messageText) {
        this.output = messageList;
        this.userName = document.cookie.replace('username=', '');
        this.messageText = messageText;
        this.data = {
            userName: userName,
            message: messageText,
            date: ""
        };
    }

    /* setUserName(userName) {
        if(userName !== 'Anon') {
            userName = 
            return userName;
        } 
    } */

    renderMessages(messages) {
        for(let message of messages) {
            let li = document.createElement('li');
            li.setAttribute('class', 'message');
            li.innerHTML = `<article>
                <p class="user-name">${message.userName}</p>
                <p>
                    ${message.message}
                </p>
                <time>${message.date}</time>
            </article>`;
            this.output.appendChild(li);
            
            if([...this.output.children].length > 10){
                this.output.firstElementChild.remove();
            }
        }
    }

    getMessages() {
        fetch('http://127.0.0.1:3000/chat/messages')
            .then(response => response.json())
            .then(json => this.renderMessages(json))
            .catch(error => console.error(error));
    }

    sendMessage() {
        if(this.messageText.length > 0 && this.userName.length > 0) {
            fetch('http://127.0.0.1:3000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.data)
            })
            .then(() => {
                document.querySelector('#message-text').value = "";
            })
            .catch(error => console.error(error));
        } else {
            alert('Empty form in post');
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
    
    setTimeout(() => {
        messageController.getMessages();
    }, 100);
});