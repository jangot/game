"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const abstract_1 = require("../abstract");
const abstract_2 = require("./abstract");
const enemiesFactory_1 = require("../../enemiesFactory");
class Enemies extends abstract_1.default {
    constructor(canvas, x = 0, y = 0) {
        super(canvas, x, y);
        this.direction = Enemies.RIGHT_DIRECTION;
        this.width = canvas.width - 20;
        this.height = 40;
        this.steps = 1;
        this.items = this.getItems();
    }
    get length() {
        return this.items.length;
    }
    ;
    get border() {
        return this.getBorder();
    }
    draw() {
        super.draw();
        for (let item of this.items) {
            item.draw();
        }
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
    killIfCross(entity) {
        for (let item of this.items) {
            if (item.isCross(entity)) {
                lodash_1.remove(this.items, item);
                item.destroy();
                return true;
            }
        }
        return false;
    }
    attack(time) {
        this.attackItem = this.getRandomItem();
        setTimeout(() => {
            this.attackItem.attack(() => {
                this.attackItem = null;
            });
        }, time * 1000);
    }
    inAttack() {
        return !!this.attackItem;
    }
    isBulletCross(entity) {
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
    moveAll() {
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
    getRandomItem() {
        let index = lodash_1.random(0, this.items.length - 1);
        return this.items[index];
    }
    needUpdateDirection() {
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
    getBorder() {
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
            let right = coordinate.x + abstract_2.default.WIDTH;
            let top = coordinate.y;
            let bottom = coordinate.y + abstract_2.default.HEIGHT;
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
    updateDirection() {
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
    moveToCurrentDirection() {
        let isY = true;
        let size = Enemies.MOVE_STEP;
        if (this.direction === Enemies.LEFT_DIRECTION) {
            isY = false;
            size *= -1;
        }
        else if (this.direction === Enemies.RIGHT_DIRECTION) {
            isY = false;
        }
        for (let item of this.items) {
            if (isY) {
                item.addY(size);
            }
            else {
                item.addX(size);
            }
        }
    }
    getItems() {
        let items = [];
        let enemiesFactory = new enemiesFactory_1.default(this.canvas);
        for (let item of enemiesFactory) {
            items.push(item);
        }
        return items;
    }
}
Enemies.LEFT_DIRECTION = 'l';
Enemies.RIGHT_DIRECTION = 'r';
Enemies.LEFT_BOTTOM_DIRECTION = 'lb';
Enemies.RIGHT_BOTTOM_DIRECTION = 'rb';
Enemies.MOVE_TIME = 200;
Enemies.LEFT_BORDER = 5;
Enemies.RIGHT_BORDER = 5;
Enemies.MOVE_STEP = 10;
exports.default = Enemies;
//# sourceMappingURL=enemies.js.map