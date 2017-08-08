"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const abstract_1 = require("../abstract");
class AbstractEnemies extends abstract_1.default {
    constructor(canvas, x = 0, y = 0) {
        super(canvas, x, y);
        this.attackPosition = { x, y };
        this.width = AbstractEnemies.WIDTH;
        this.height = AbstractEnemies.HEIGHT;
        this.attackStepX = 2;
        this.attackSpeedY = 2;
    }
    get inAttack() {
        return this.inFlyingAttack || this.inFinishingAttack;
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
    attack(cb) {
        if (this.inAttack) {
            cb();
            return;
        }
        this.inFlyingAttack = true;
        this.xDirection = this.attackStepX;
        this.cb = cb;
    }
    isBulletCross(entity) {
        return false;
    }
    needChangeAttackDirection() {
        let isPositionInBorder = this.x <= 0 || this.x + this.width >= this.canvas.width;
        let needX = lodash_1.random(0, 60) === 0;
        return isPositionInBorder || needX;
    }
    flyingAttack() {
        this.y += this.attackSpeedY;
        if (this.needChangeAttackDirection()) {
            this.xDirection *= -1;
        }
        this.x += this.xDirection;
        if (this.y >= this.canvas.height) {
            this.inFlyingAttack = false;
            this.inFinishingAttack = true;
            this.y = this.height * -1;
        }
    }
    finishAttack() {
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
        }
        else if (xDuration < 0) {
            this.x -= FINISHING_STEP;
        }
    }
}
AbstractEnemies.WIDTH = 20;
AbstractEnemies.HEIGHT = 30;
exports.default = AbstractEnemies;
//# sourceMappingURL=abstract.js.map