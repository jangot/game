import { remove } from 'lodash';
import Canvas from './class/canvas';
import Man from './class/entity/man';
import Enemies from './class/entity/enemies/enemies';
import Bullet from './class/entity/bullet';
import Looser from './class/entity/looser';
import Winner from './class/entity/winner';
import Background from './class/entity/background';
import Keyboard from './class/keyboard';
import { TICK_TIME, ATTACK_STEPS } from './constant';

let tickTimer: number;
let canvas: Canvas;
let bullets: Bullet[];
let attackSteps: number[];
let inAttack: boolean;

export let start = function (canvasElement: HTMLCanvasElement, keyboard: Keyboard) {
    attackSteps = ATTACK_STEPS.concat();
    bullets = [];
    canvas = new Canvas(canvasElement);

    let background = new Background(canvas);
    let player = new Man(canvas, canvas.width / 2);
    let enemies = new Enemies(canvas);

    keyboard
        .onKey(Keyboard.KEY_LEFT, () => {
            player.moveLeft();
        })
        .onKey(Keyboard.KEY_RIGHT, () => {
            player.moveRight();
        })
        .onKey(Keyboard.KEY_UP, () => {
            // enemies.attack();
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
        let crossBullet = enemies.isBulletCross(player);

        // crossBullet = false;
        if (crossPlayer || crossBullet || enemies.border.bottom >= canvas.height) {
            new Looser(canvas);
            clearInterval(tickTimer);
        } else if (enemies.length === 0) {
            enemies.destroy();
            clearInterval(tickTimer);
            new Winner(canvas);
        }

        if (!enemies.inAttack()) {
            let time = attackSteps.shift() || 1;
            inAttack = true;

            enemies.attack(time);
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
    inAttack = false;
};
