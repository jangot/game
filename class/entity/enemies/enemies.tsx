import { remove, random } from 'lodash';
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

    static MOVE_TIME = 200;
    static LEFT_BORDER = 5;
    static RIGHT_BORDER = 5;
    static MOVE_STEP = 10;

    steps: number;
    enemiesFactory: EnemiesFactory;

    public get length() {
        return this.items.length;
    };
    public get border() {
        return this.getBorder();
    }

    protected items: AbstractEnemies[];
    protected attackItem: AbstractEnemies;
    protected direction: string = Enemies.RIGHT_DIRECTION;

    constructor(canvas:Canvas, x:number = 0, y:number = 0) {
        super(canvas, x, y);

        this.width = canvas.width - 20;
        this.height = 40;

        this.steps = 1;
        this.items = this.getItems();
    }

    draw() {
        super.draw();

        return this;
    }

    tick() {
        super.tick();

        this.steps++;
        if (this.steps === 10) {
            this.steps = 1;
            this.moveAll();
        }
    }

    killIfCross(entity: Entity): boolean {
        for (let item of this.items) {
            if (item.isCross(entity)) {
                remove(this.items, item);

                item.destroy();
                if (this.attackItem === item) {
                    this.attackItem = null;
                }
                return true;
            }
        }
        return false;
    }

    attack(time: number) {
        this.attackItem = this.getRandomItem();

        setTimeout(() => {
            this.attackItem.attack(() => {
                this.attackItem = null;
            });
        }, time * 1000)
    }

    inAttack(): boolean {
        return !!this.attackItem;
    }

    isBulletCross(entity: Entity) {
        if (!this.attackItem) {
            return false;
        }

        return this.attackItem.isBulletCross(entity);
    }

    destroy() {
        super.destroy();

        for (let item of this.items) {
            item.destroy();
        }
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

    protected getRandomItem(): AbstractEnemies {
        let last = this.items.length - 1;
        let first = last - this.enemiesFactory.enemiesInLine;
        if (first < 0) first = 0;

        let index = random(first, last);

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
            let coordinate = {
                x: item.x,
                y: item.y
            };

            if (item === this.attackItem) {
                coordinate = item.attackPosition;
            }

            let left = coordinate.x;
            let right = coordinate.x + AbstractEnemies.WIDTH;
            let top = coordinate.y;
            let bottom = coordinate.y + AbstractEnemies.HEIGHT;

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
                item.addY(size);
            } else {
                item.addX(size);
            }
        }
    }

    protected getItems(): AbstractEnemies[] {
        let items:AbstractEnemies[] = [];

        this.enemiesFactory = new EnemiesFactory(this.canvas);
        for (let item of this.enemiesFactory) {
            items.push(item);
        }
        return items;
    }


}

export default Enemies;