import { random } from 'lodash';
import AbstractEntity from '../abstract';
import Canvas from '../../canvas'
import Coordinate from '../../../interface/coordinate';
import { TICK_TIME } from '../../../constant';

class AbstractEnemies extends AbstractEntity {
    static WIDTH = 20;
    static HEIGHT = 30;

    public inAttack: boolean;

    protected attackPosition: Coordinate;
    protected attackStepX: number;
    protected attackSpeedY: number;

    constructor(canvas: Canvas, x:number = 0, y:number = 0) {
        super(canvas, x, y);

        this.attackPosition = { x, y };
        this.width = AbstractEnemies.WIDTH;
        this.height = AbstractEnemies.HEIGHT;

        this.attackStepX = 2;
        this.attackSpeedY = 3;
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

    attack() {
        if (this.inAttack) {
            return;
        }

        this.inAttack = true;

        let xDirection = this.attackStepX;
        let attackTimer = setInterval(() => {
            this.y += this.attackSpeedY;

            if (this.needChangeAttackDirection()) {
                xDirection *= -1
            }
            this.x += xDirection;
            if (this.y >= this.canvas.height) {

                clearInterval(attackTimer);
                this.finishAttack();
            }
        }, TICK_TIME)
    }

    protected needChangeAttackDirection(): boolean {
        let isPositionInBorder = this.x <= 0 || this.x + this.width >= this.canvas.width;
        let needX = random(0, 60) === 0;

        return isPositionInBorder || needX;
    }

    protected finishAttack() {
        let x = this.x;
        let y = this.height * -1;

        this.x = x;
        this.y = y;

        let finishTimer = setInterval(() => {
            let { x, y } = this;

            let aX = this.attackPosition.x;
            let aY = this.attackPosition.y;

            let yDuration = aY - y;
            let xDuration = aX - x;

            if (yDuration === 0 && xDuration === 0) {
                clearInterval(finishTimer);
                this.inAttack = false;
                return;
            }

            if (yDuration !== 0) {
                this.y += 1;
            }
            if (xDuration > 0) {
                this.x += 1;
            } else if (xDuration < 0) {
                this.x -= 1;
            }
        }, 5);
    }
}

export default AbstractEnemies;