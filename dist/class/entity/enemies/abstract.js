"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const abstract_1 = require("../abstract");
const constant_1 = require("../../../constant");
class AbstractEnemies extends abstract_1.default {
    constructor(canvas, x = 0, y = 0) {
        super(canvas, x, y);
        this.attackPosition = { x, y };
        this.width = AbstractEnemies.WIDTH;
        this.height = AbstractEnemies.HEIGHT;
        this.attackStepX = 2;
        this.attackSpeedY = 2;
    }
    setPosition(x, y) {
        if (this.inAttack) {
            this.attackPosition = { x, y };
        }
        else {
            super.setPosition(x, y);
        }
        return this;
    }
    addX(x) {
        if (!this.inAttack) {
            super.addX(x);
        }
        this.attackPosition.x += x;
        return this;
    }
    addY(y) {
        if (!this.inAttack) {
            super.addY(y);
        }
        this.attackPosition.y += y;
        return this;
    }
    attack(cb) {
        if (this.inAttack) {
            cb();
            return;
        }
        this.inAttack = true;
        let xDirection = this.attackStepX;
        let attackTimer = setInterval(() => {
            this.y += this.attackSpeedY;
            if (this.needChangeAttackDirection()) {
                xDirection *= -1;
            }
            this.x += xDirection;
            if (this.y >= this.canvas.height) {
                clearInterval(attackTimer);
                this.finishAttack(cb);
            }
        }, constant_1.TICK_TIME);
    }
    needChangeAttackDirection() {
        let isPositionInBorder = this.x <= 0 || this.x + this.width >= this.canvas.width;
        let needX = lodash_1.random(0, 60) === 0;
        return isPositionInBorder || needX;
    }
    finishAttack(cb) {
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
                cb();
                return;
            }
            if (yDuration !== 0) {
                this.y += 1;
            }
            if (xDuration > 0) {
                this.x += 1;
            }
            else if (xDuration < 0) {
                this.x -= 1;
            }
        }, 5);
    }
}
AbstractEnemies.WIDTH = 20;
AbstractEnemies.HEIGHT = 30;
exports.default = AbstractEnemies;
//# sourceMappingURL=abstract.js.map