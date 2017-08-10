"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const abstract_1 = require("./abstract");
const bullet_1 = require("../bullet");
class SupperBoss extends abstract_1.default {
    constructor(canvas, x = 0, y = 0) {
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
        let needFire = lodash_1.random(0, 70) === 0;
        if (needFire) {
            let x = this.x + this.width / 2;
            let y = this.y + this.height;
            this.bullet = new bullet_1.default(this.canvas, x, y);
            this.bullet.reverse();
        }
    }
    isBulletCross(entity) {
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
exports.default = SupperBoss;
//# sourceMappingURL=supper-boss.js.map