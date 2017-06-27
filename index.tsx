import { start, stop } from './app';
import Keyboard from './class/keyboard';

let canvasElement = document.getElementsByTagName('canvas')[0];
let bodyElement = document.getElementById('body');
let keyboard: Keyboard;


// let ctx = canvasElement.getContext('2d');
//
//
// let image = document.getElementById('man') as HTMLImageElement;
// ctx.drawImage(image, 10, 10, 16, 16);
// ctx.stroke();
// ctx.fill();
//
// // ctx = canvasElement.getContext('2d');
//
// // ctx.beginPath();
// ctx.arc(100, 100, 10, 0, 2 * Math.PI, false);
// ctx.fillStyle = 'green';
// ctx.strokeStyle = 'red';
// ctx.fill();
// ctx.stroke();

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