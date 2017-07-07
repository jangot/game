"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_1 = require("./abstract");
class Boss extends abstract_1.default {
    constructor(canvas, x = 0, y = 0) {
        super(canvas, x, y);
        this.attackStepX = 3;
        this.attackSpeedY = 4;
    }
    draw() {
        super.draw();
        this.canvas.drawImage('enemies_boss', this, this);
        return this;
    }
}
exports.default = Boss;
//# sourceMappingURL=boss.js.map