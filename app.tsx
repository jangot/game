import { remove } from 'lodash';
import Canvas from './class/canvas';
import Man from './class/entity/man';
import Enemies from './class/entity/enemies/enemies';
import Bullet from './class/entity/bullet';
import Keyboard from './class/keyboard';
import { TICK_TIME } from './constant';

const WIDTH = 340;
const HEIGHT = 200;

let tickTimer:number;
let canvas:Canvas;
let bullets:Bullet[] = [];

export let start = function (canvasElement: HTMLCanvasElement, keyboard: Keyboard) {
    canvas = new Canvas(canvasElement);

    canvas
        .setWidth(WIDTH)
        .setHeight(HEIGHT);

    let enemies = new Enemies(canvas);
    let player = new Man(canvas, WIDTH/2, HEIGHT-10);

    keyboard
        .onKey(Keyboard.KEY_LEFT, () => {
            player.moveLeft();
        })
        .onKey(Keyboard.KEY_RIGHT, () => {
            player.moveRight();
        })
        .onKey(Keyboard.KEY_UP, () => {
            tick();
        })
        .onKey(Keyboard.KEY_DOWN, () => {
            // player.addY(5);
        })
        .onKey(Keyboard.KEY_SPACE, () => {
            if (bullets.length < 1) {
                bullets.push(player.fire());
            }
        })
    ;

    tickTimer = setInterval(tick, TICK_TIME);

    function tick() {
        for (let bullet of bullets) {
            let killed = enemies.killIfCross(bullet);

            if (killed || bullet.y <= 0) {
                removeBullet(bullet);
            }
        }

        let crossPlayer = enemies.killIfCross(player);
        if (crossPlayer) {
            clearInterval(tickTimer);
            // enemies.destroy();
        }

        canvas.draw();
    }

    function removeBullet(bullet:Bullet) {
        remove(bullets, bullet);
        bullet.destroy();
    }
};

export let stop = function () {
    clearInterval(tickTimer);
    bullets = [];
    canvas.destroy();
};
