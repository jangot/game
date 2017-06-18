import { start, stop } from './app';
import Keyboard from './class/keyboard';

let canvasElement = document.getElementsByTagName('canvas')[0];
let bodyElement = document.getElementById('body');
let keyboard: Keyboard;

document
    .getElementById('start')
    .addEventListener('click', () => {
        keyboard = new Keyboard(bodyElement);
        start(canvasElement, keyboard);
        canvasElement.style.display = 'block';
    });

document
    .getElementById('stop')
    .addEventListener('click', () => {
        stop();
        keyboard.destroy();
        canvasElement.style.display = 'none';
    });