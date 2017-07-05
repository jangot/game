import { remove, random } from 'lodash';
import AbstractEntity from '../abstract';
import AbstractEnemies from './abstract';
import Coordinate from '../../../interface/coordinate';
import Canvas from '../../canvas';
import Entity from '../../../interface/entity';
import EnemiesFactory from '../../enemiesFactory';
import { TICK_TIME } from '../../../constant';

class Enemies extends AbstractEntity {

    static LEFT_DIRECTION = 'l';
    static RIGHT_DIRECTION = 'r';
    static LEFT_BOTTOM_DIRECTION = 'lb';
    static RIGHT_BOTTOM_DIRECTION = 'rb';

    static MOVE_TIME = 300;
    static LEFT_BORDER = 5;
    static RIGHT_BORDER = 5;
    static MOVE_STEP = 10;
    static ATTACK_STEP_X = 2;
    static ATTACK_STEP_Y = 5;

    public get length() {
        return this.items.length;
    };
    public get border() {
        return this.getBorder();
    }

    protected timer: number;
    protected items: Entity[];
    protected attackItem: Entity;
    protected attackPosition: Coordinate;
    protected direction: string = Enemies.RIGHT_DIRECTION;

    constructor(canvas:Canvas, x:number = 0, y:number = 0) {
        super(canvas, x, y);

        this.width = canvas.width - 20;
        this.height = 40;

        this.items = this.getItems();
        this.timer = setInterval(() => {
            this.moveAll();
        }, Enemies.MOVE_TIME);
    }

    draw() {
        super.draw();

        for (let item of this.items) {
            item.draw();
        }

        return this;
    }

    killIfCross(entity: Entity): boolean {
        for (let item of this.items) {
            if (item.isCross(entity)) {
                remove(this.items, item);

                item.destroy();

                return true;
            }
        }
        return false;
    }

    attack() {
        if (this.attackItem) {
            return;
        }

        this.attackItem = this.getRandomItem();
        this.attackPosition = {
            x: this.attackItem.x,
            y: this.attackItem.y
        };

        let xDirection = Enemies.ATTACK_STEP_X;
        let attackTimer = setInterval(() => {
            this.attackItem.addY(Enemies.ATTACK_STEP_Y);

            if (this.needChangeAttackDirection(this.attackItem)) {
                xDirection *= -1
            }
            this.attackItem.addX(xDirection);
            if (this.attackItem.y >= this.canvas.height) {

                clearInterval(attackTimer);
                this.finishAttack();
            }
        }, TICK_TIME)
    }

    inAttack(): boolean {
        return !!this.attackItem;
    }

    destroy() {
        super.destroy();

        for (let item of this.items) {
            item.destroy();
        }
        clearInterval(this.timer);
    }

    protected finishAttack() {
        let x = this.attackItem.x;
        let y = this.attackItem.height * -1;

        this.attackItem.setPosition(x, y);

        let finishTimer = setInterval(() => {
            let { x, y } = this.attackItem;

            let aX = this.attackPosition.x;
            let aY = this.attackPosition.y;

            let yDuration = aY - y;
            let xDuration = aX - x;

            if (yDuration === 0 && xDuration === 0) {
                clearInterval(finishTimer);
                this.attackItem = null;
                return;
            }

            if (yDuration !== 0) {
                this.attackItem.addY(1);
            }
            if (xDuration > 0) {
                this.attackItem.addX(1);
            } else if (xDuration < 0) {
                this.attackItem.addX(-1);
            }
        }, 10);
    }

    protected needChangeAttackDirection(item: Entity): boolean {
        let isPositionInBorder = item.x <= 0 || item.x + item.width >= this.canvas.width;
        let needX = random(0, 60) === 0;

        return isPositionInBorder || needX;
    }

    protected moveAll() {
        if (this.needUpdateDirection()) {
            this.updateDirection();
        }

        this.moveToCurrentDirection();

        let { top, left, right, bottom } = this.border;

        this.x = left;
        this.y = top;

        this.height = this.canvas.height - top - bottom;
        this.width = this.canvas.width - left - right;
    }

    protected getRandomItem(): Entity {
        let index = random(0, this.items.length - 1);

        return this.items[index];
    }

    protected needUpdateDirection(): boolean {
        let border = this.getBorder();

        if (this.direction === Enemies.LEFT_BOTTOM_DIRECTION || this.direction === Enemies.RIGHT_BOTTOM_DIRECTION) {
            return true;
        }

        if (this.direction === Enemies.LEFT_DIRECTION && border.left < Enemies.LEFT_BORDER) {
            return true;
        }

        let rightBorder = border.right + Enemies.RIGHT_BORDER;
        if (this.direction === Enemies.RIGHT_DIRECTION && rightBorder > this.canvas.width) {
            return true;
        }

        return false;
    }

    protected getBorder() {
        let result = {
            left: this.canvas.width,
            right: 0,
            bottom: 0,
            top: this.canvas.height
        };

        for (let item of this.items) {
            if (item === this.attackItem) {
                continue;
            }

            let left = item.x;
            let right = item.x + AbstractEnemies.WIDTH;
            let top = item.y;
            let bottom = item.y + AbstractEnemies.HEIGHT;

            if (left < result.left) {
                result.left = left;
            }
            if (right > result.right) {
                result.right = right;
            }
            if (top < result.top) {
                result.top = top;
            }
            if (bottom > result.bottom) {
                result.bottom = bottom;
            }
        }

        return result;
    }

    protected updateDirection() {
        switch (this.direction) {
            case Enemies.LEFT_DIRECTION:
                this.direction = Enemies.LEFT_BOTTOM_DIRECTION;
                break;
            case Enemies.LEFT_BOTTOM_DIRECTION:
                this.direction = Enemies.RIGHT_DIRECTION;
                break;
            case Enemies.RIGHT_DIRECTION:
                this.direction = Enemies.RIGHT_BOTTOM_DIRECTION;
                break;
            case Enemies.RIGHT_BOTTOM_DIRECTION:
                this.direction = Enemies.LEFT_DIRECTION;
                break;
        }
    }

    protected moveToCurrentDirection() {
        let isY = true;
        let size = Enemies.MOVE_STEP;

        if (this.direction === Enemies.LEFT_DIRECTION) {
            isY = false;
            size *= -1;
        } else if (this.direction === Enemies.RIGHT_DIRECTION) {
            isY = false;
        }

        for (let item of this.items) {
            if (isY) {
                if (item == this.attackItem) {
                    this.attackPosition.y += size;
                } else {
                    item.addY(size);
                }
            } else {
                if (item == this.attackItem) {
                    this.attackPosition.x += size;
                } else {
                    item.addX(size);
                }
            }
        }
    }

    protected getItems(): Entity[] {
        let items = [];

        let enemiesFactory = new EnemiesFactory(this.canvas);
        for (let item of enemiesFactory) {
            items.push(item);
        }
        return items;
    }


}

export default Enemies;