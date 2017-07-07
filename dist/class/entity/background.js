"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_1 = require("./abstract");
class Background extends abstract_1.default {
    constructor(canvas, x = 0, y = 0) {
        super(canvas, x, y);
        this.width = canvas.width;
        this.height = canvas.height;
        this.start = {
            x: this.x,
            y: this.y
        };
        this.end = {
            x: canvas.width,
            y: canvas.height
        };
    }
    draw() {
        super.draw();
        this.canvas.drawFillRect(this.start, this.end, 'black');
        return this;
    }
}
exports.default = Background;
//# sourceMappingURL=background.js.map