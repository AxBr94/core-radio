'use strict';

class ChatWindow {
    constructor(chatSection) {
        this.opened = false;
        this.chatSection = chatSection;
    }

    open() {
        this.chatSection.style.display = 'block';
        this.opened = true;
    }

    close() {
        this.chatSection.style.display = 'none';
        this.opened = false;
    }
}

const chatLink = document.querySelector('#chat-link');
const chatWindow = new ChatWindow(document.querySelector('#chat'));

chatLink.addEventListener('click', () => {
    chatWindow.opened ? chatWindow.close() : chatWindow.open();
});

class MessageController {
    constructor(messageList, userName, messageText) {
        this.output = messageList;
        this.userName = document.cookie.replace('username=', '');
        this.messageText = messageText;
        this.data = {
            userName: userName,
            message: messageText,
            date: ""//will be set on server side
        };
    }

    async getMessages() {
        try {
            //testing port :3000
            const response = await fetch('http://127.0.0.1:3000/chat', {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
            const json = await response.json();
            this.output.innerHTML = "";
            for (let message of json) {
                let li = document.createElement('li');
                li.setAttribute('class', 'message');
                li.innerHTML = `<article>
                    <h2 class="message-user-name">${message.userName}</h2>
                    <p class="message-user-text">${message.message}</p>
                    <time>${message.date}</time>
                </article>`;
                this.output.appendChild(li);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async sendMessage() {
        if (this.messageText.length > 0) {
            try {
                //testing port :3000
                await fetch('http://127.0.0.1:3000/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.data)
                });

                document.querySelector('#message-form-text').value = "";
            } catch (error) {
                console.error('Ошибка при отправке сообщения:', error);
            }
        } else {
            alert('Empty form in post');
        }
    }
}

const creareMessageController = () => {
    const messageController = new MessageController(
        document.querySelector('#message-list'),
        document.querySelector('#user-form-name').value,
        document.querySelector('#message-form-text').value
    );

    return messageController;
}

creareMessageController().getMessages();

const sendButton = document.querySelector('#send-button');

sendButton.addEventListener('click', async () => {
    const mc = creareMessageController();

    try {
        await mc.sendMessage();
        await mc.getMessages();
    } catch (error) {
        console.error('Ошибка при отправке или получении сообщений:', error);
    }
});