'use strict';

class Redirect {
    constructor(linkTagElement) {
        this.link = linkTagElement;
        this.chatWindow;
    }
    openWindow() {
        this.chatWindow = window.open(
            'http://127.0.0.1:3000/chat', 'newWindow', 'width=300,height=500,top=100,left=0'
        );
    };
}


const red = new Redirect(
    document.querySelector('#chat-link')
);

red.link.addEventListener('click', red.openWindow);
