'use strict';

class Widget {
    constructor() {
        this.imgTag = document.querySelector('#widget');
        this.gifs = ['bb.gif', 'dude.gif', 'emoes.gif'];
    }
}
Widget.path = 'gifs/';

const widget = new Widget;
widget.imgTag.setAttribute('src', `${Widget.path}${widget.gifs[(Math.random()*2).toFixed(0)]}`);