"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const canvas_1 = require("./class/canvas");
const man_1 = require("./class/entity/man");
const enemies_1 = require("./class/entity/enemies/enemies");
const looser_1 = require("./class/entity/looser");
const winner_1 = require("./class/entity/winner");
const background_1 = require("./class/entity/background");
const keyboard_1 = require("./class/keyboard");
const constant_1 = require("./constant");
let tickTimer;
let canvas;
let bullets;
let attackSteps;
let inAttack;
exports.start = function (canvasElement, keyboard) {
    attackSteps = constant_1.ATTACK_STEPS.concat();
    bullets = [];
    canvas = new canvas_1.default(canvasElement);
    let background = new background_1.default(canvas);
    let player = new man_1.default(canvas, 1); //canvas.width / 2);
    let enemies = new enemies_1.default(canvas);
    keyboard
        .onKey(keyboard_1.default.KEY_LEFT, () => {
        player.moveLeft();
    })
        .onKey(keyboard_1.default.KEY_RIGHT, () => {
        player.moveRight();
    })
        .onKey(keyboard_1.default.KEY_UP, () => {
        // enemies.attack();
    })
        .onKey(keyboard_1.default.KEY_DOWN, () => {
        // player.addY(5);
    })
        .onKey(keyboard_1.default.KEY_SPACE, () => {
        if (bullets.length < 1) {
            bullets.push(player.fire());
        }
    });
    tickTimer = setInterval(tick, constant_1.TICK_TIME);
    function tick() {
        for (let bullet of bullets) {
            let killed = enemies.killIfCross(bullet);
            if (killed || bullet.y <= 0) {
                removeBullet(bullet);
            }
        }
        let crossPlayer = enemies.killIfCross(player);
        let crossBullet = enemies.isBulletCross(player);
        // crossBullet = false;
        if (crossPlayer || crossBullet || enemies.border.bottom >= canvas.height) {
            new looser_1.default(canvas);
            clearInterval(tickTimer);
        }
        else if (enemies.length === 0) {
            enemies.destroy();
            clearInterval(tickTimer);
            new winner_1.default(canvas);
        }
        if (!enemies.inAttack()) {
            let time = attackSteps.shift() || 1;
            inAttack = true;
            enemies.attack(time);
        }
        canvas.draw();
    }
    function removeBullet(bullet) {
        lodash_1.remove(bullets, bullet);
        bullet.destroy();
    }
    return tick;
};
exports.stop = function () {
    clearInterval(tickTimer);
    bullets = [];
    canvas.destroy();
    inAttack = false;
};
//# sourceMappingURL=app.js.map