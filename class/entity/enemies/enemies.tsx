import { remove } from 'lodash';
import AbstractEntity from '../abstract';
import AbstractEnemies from './abstract';
import Canvas from '../../canvas';
import Entity from '../../../interface/entity';
import EnemiesFactory from '../../enemiesFactory';

class Enemies extends AbstractEntity {

    static LEFT_DIRECTION = 'l';
    static RIGHT_DIRECTION = 'r';
    static LEFT_BOTTOM_DIRECTION = 'lb';
    static RIGHT_BOTTOM_DIRECTION = 'rb';

    static LEFT_BORDER = 5;
    static RIGHT_BORDER = 5;
    static MOVE_STEP = 10;

    protected timer:number;
    protected items: Entity[];
    protected direction: string = Enemies.RIGHT_DIRECTION;

    constructor(canvas:Canvas, x:number = 0, y:number = 0) {
        super(canvas, x, y);

        this.width = canvas.width - 20;
        this.height = 40;

        this.items = this.getItems();
        this.timer = setInterval(() => {
            this.moveAll();
        }, 100);
    }

    draw() {
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

    destroy() {
        super.destroy();

        for (let item of this.items) {
            item.destroy();
        }
        clearInterval(this.timer);
    }

    protected moveAll() {
        if (this.needUpdateDirection()) {
            this.updateDirection();
        }

        this.moveToCurrentDirection();
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
            top: 0,
            bottom: this.canvas.height
        };

        for (let item of this.items) {
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
            if (bottom < result.bottom) {
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
                item.addY(size);
            } else {
                item.addX(size);
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