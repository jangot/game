import { start, stop } from './app';
import Keyboard from './class/keyboard';

import Canvas from './class/canvas';
import Man from './class/entity/man';
import Enemies from './class/entity/enemies/enemies';

let canvasElement = document.getElementsByTagName('canvas')[0];
let bodyElement = document.getElementById('body');
let keyboard: Keyboard;


let canvas = new Canvas(canvasElement);


let player = new Man(canvas);
// let enemies = new Enemies(canvas);

let bullet = player.fire();

bullet.addY(-30);

canvas.draw();

setTimeout(() => {
    bullet.addY(-10);

    canvas.draw();
}, 500);