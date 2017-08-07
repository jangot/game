"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_1 = require("./abstract");
class Bullet extends abstract_1.default {
    constructor(canvas, x, y) {
        super(canvas, x, y);
        this.width = 6;
        this.height = 6;
        this.direction = -1;
    }
    reverse() {
        this.direction *= -1;
    }
    draw() {
        super.draw();
        console.log(`BULLET`, this.y);
        this.canvas.drawFillRound(this.getCenter(), 3, 'gold');
        return this;
    }
    tick() {
        super.tick();
        let offset = 10 * this.direction;
        this.addY(offset);
    }
}
exports.default = Bullet;
//# sourceMappingURL=bullet.js.map