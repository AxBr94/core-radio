'use strict';

const path = 'gifs/';
const gifs = ['bb.gif', 'dude.gif', 'emoes.gif'];

const widget = document.querySelector('#vidget');
widget.setAttribute('src', `${path}${gifs[(Math.random()*2).toFixed(0)]}`);