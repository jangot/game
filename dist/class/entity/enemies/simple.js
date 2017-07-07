"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_1 = require("./abstract");
class Simple extends abstract_1.default {
    draw() {
        super.draw();
        this.canvas.drawImage('enemies_simple', this, this);
        return this;
    }
}
exports.default = Simple;
//# sourceMappingURL=simple.js.map