"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const keyboard_1 = require("./class/keyboard");
let canvasElement = document.getElementsByTagName('canvas')[0];
let bodyElement = document.getElementById('body');
let keyboard;
let startButton = document.getElementById('start');
let stopButton = document.getElementById('stop');
// let tickButton = document.getElementById('tick');
startButton
    .addEventListener('click', () => {
    keyboard = new keyboard_1.default(bodyElement);
    let tick = app_1.start(canvasElement, keyboard);
    canvasElement.style.display = 'block';
    stopButton.style.display = 'inline';
    startButton.style.display = 'none';
    // tickButton.addEventListener('click', tick);
});
stopButton
    .addEventListener('click', () => {
    app_1.stop();
    keyboard.destroy();
    canvasElement.style.display = 'none';
    stopButton.style.display = 'none';
    startButton.style.display = 'inline';
});
//# sourceMappingURL=index.js.map