"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("./class/canvas");
const man_1 = require("./class/entity/man");
let canvasElement = document.getElementsByTagName('canvas')[0];
let bodyElement = document.getElementById('body');
let keyboard;
let canvas = new canvas_1.default(canvasElement);
let player = new man_1.default(canvas);
// let enemies = new Enemies(canvas);
let bullet = player.fire();
bullet.addY(-30);
canvas.draw();
setTimeout(() => {
    bullet.addY(-10);
    canvas.draw();
}, 500);
//# sourceMappingURL=index_test.js.map