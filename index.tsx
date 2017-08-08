import { start, stop } from './app';
import Keyboard from './class/keyboard';

let canvasElement = document.getElementsByTagName('canvas')[0];
let bodyElement = document.getElementById('body');
let keyboard: Keyboard;

let startButton = document.getElementById('start');
let stopButton = document.getElementById('stop');
// let tickButton = document.getElementById('tick');


startButton
    .addEventListener('click', () => {
        keyboard = new Keyboard(bodyElement);
        start(canvasElement, keyboard);
        canvasElement.style.display = 'block';

        stopButton.style.display = 'inline';
        startButton.style.display = 'none';

        // tickButton.addEventListener('click', tick);
    });

stopButton
    .addEventListener('click', () => {
        stop();
        keyboard.destroy();
        canvasElement.style.display = 'none';

        stopButton.style.display = 'none';
        startButton.style.display = 'inline';
    });