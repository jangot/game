"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_1 = require("./abstract");
class Looser extends abstract_1.default {
    constructor(canvas, x = 0, y = 0) {
        super(canvas, x, y);
        this.x = canvas.width / 2 - 70;
        this.y = canvas.height / 2;
    }
    draw() {
        super.draw();
        let context = this.canvas.getContext();
        context.fillStyle = 'red';
        context.font = '30px Arial';
        context.fillText('LOOSER!', this.x, this.y);
        return this;
    }
}
exports.default = Looser;
//# sourceMappingURL=looser.js.map