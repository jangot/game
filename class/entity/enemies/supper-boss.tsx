import { random } from 'lodash';
import Canvas from '../../canvas';
import Entity from '../../../interface/entity';
import AbstractEnemies from './abstract';
import Bullet from '../bullet';
import { TICK_TIME } from '../../../constant';

class SupperBoss extends AbstractEnemies {
    protected bullet: Bullet;

    constructor(canvas: Canvas, x:number = 0, y:number = 0) {
        super(canvas, x, y);

        this.attackStepX = 3;
        this.attackSpeedY = 4;
    }
    draw() {
        super.draw();

        this.canvas.drawImage('enemies_supper_boss', this, this);

        if (this.inAttack && !this.bullet) {
            this.fire();
        }
        return this;
    }
    tick() {
        super.tick();

        if (this.bullet) {
            if (this.bullet.y > this.canvas.height) {
                this.bullet.destroy();
                this.bullet = null;
            }
        }
    }
    fire() {
        let needFire = random(0, 100) === 0;

        if (needFire) {
            let x = this.x + this.width / 2;
            let y = this.y + this.height;
            this.bullet = new Bullet(this.canvas, x, y);
            this.bullet.reverse();
        }
    }
    isBulletCross(entity:Entity) {
        if (!this.bullet) {
            return false;
        }

        return this.bullet.isCross(entity);
    }
    destroy() {
        if (this.bullet) {
            this.bullet.destroy();
        }
        super.destroy();
    }
}

export default SupperBoss;
