import { random } from 'lodash';
import AbstractEntity from '../abstract';
import Entity from '../../../interface/entity';
import Canvas from '../../canvas'
import Coordinate from '../../../interface/coordinate';
import { TICK_TIME } from '../../../constant';

class AbstractEnemies extends AbstractEntity {
    static WIDTH = 20;
    static HEIGHT = 30;

    public get inAttack() {
        return this.inFlyingAttack || this.inFinishingAttack;
    }

    public attackPosition: Coordinate;

    protected inFlyingAttack: boolean;
    protected inFinishingAttack: boolean;
    protected attackStepX: number;
    protected attackSpeedY: number;
    protected xDirection: number;
    protected cb: any;

    constructor(canvas: Canvas, x:number = 0, y:number = 0) {
        super(canvas, x, y);

        this.attackPosition = { x, y };
        this.width = AbstractEnemies.WIDTH;
        this.height = AbstractEnemies.HEIGHT;

        this.attackStepX = 2;
        this.attackSpeedY = 2;
    }

    setPosition(x: number, y: number) {
        if (this.inAttack) {
            this.attackPosition = { x, y }
        } else {
            super.setPosition(x, y);
        }
        return this;
    }

    addX(x: number):AbstractEnemies {
        if (!this.inAttack) {
            super.addX(x);
        }

        this.attackPosition.x += x;

        return this;
    }
    addY(y: number):AbstractEnemies {
        if (!this.inAttack) {
            super.addY(y);
        }
        this.attackPosition.y += y;

        return this;
    }

    draw() {
        super.draw();

        return this;
    }

    tick() {
        super.tick();

        if (this.inFinishingAttack) {
            this.finishAttack();
        }

        if (this.inFlyingAttack) {
            this.flyingAttack();
        }
    }

    attack(cb: () => void) {
        if (this.inAttack) {
            cb();
            return;
        }

        this.inFlyingAttack = true;
        this.xDirection = this.attackStepX;
        this.cb = cb;
    }

    isBulletCross(entity:Entity) {
        return false;
    }

    protected needChangeAttackDirection(): boolean {
        let isPositionInBorder = this.x <= 0 || this.x + this.width >= this.canvas.width;
        let needX = random(0, 60) === 0;

        return isPositionInBorder || needX;
    }

    protected flyingAttack() {
        this.y += this.attackSpeedY;

        if (this.needChangeAttackDirection()) {
            this.xDirection *= -1
        }
        this.x += this.xDirection;
        if (this.y >= this.canvas.height) {
            this.inFlyingAttack = false;
            this.inFinishingAttack = true;

            this.y = this.height * -1;
        }
    }

    protected finishAttack() {
        const FINISHING_STEP = 6;

        let { x, y } = this;

        let aX = this.attackPosition.x;
        let aY = this.attackPosition.y;

        let yDuration = aY - y;
        let xDuration = aX - x;

        if (yDuration < FINISHING_STEP && Math.abs(xDuration) < FINISHING_STEP) {
            this.x = this.attackPosition.x;
            this.y = this.attackPosition.y;

            this.inFinishingAttack = false;

            this.cb();
            this.cb = null;

            return;
        }

        if (yDuration !== 0) {
            this.y += FINISHING_STEP;
        }
        if (xDuration > 0) {
            this.x += FINISHING_STEP;
        } else if (xDuration < 0) {
            this.x -= FINISHING_STEP;
        }
    }
}

export default AbstractEnemies;
