"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_1 = require("./abstract");
const constant_1 = require("../../constant");
class Bullet extends abstract_1.default {
    constructor(canvas, x, y) {
        super(canvas, x, y);
        this.width = 6;
        this.height = 6;
        this.timer = setInterval(() => {
            this.addY(-5);
        }, constant_1.TICK_TIME / 2);
    }
    draw() {
        super.draw();
        this.canvas.drawFillRound(this.getCenter(), 3, 'white');
        return this;
    }
    destroy() {
        super.destroy();
        clearInterval(this.timer);
    }
}
exports.default = Bullet;
//# sourceMappingURL=bullet.js.map