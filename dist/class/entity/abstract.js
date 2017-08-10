"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("../../constant");
const isCross_1 = require("../../lib/isCross");
let id = 1;
class Abstract {
    constructor(canvas, x = 0, y = 0) {
        this.canvas = canvas;
        this.canvas.add(this);
        this.id = id++;
        this.x = x;
        this.y = y;
        this.width = 1;
        this.height = 1;
    }
    draw() {
        if (constant_1.DEBUG || this.marked) {
            this.drawDebug();
        }
        return this;
    }
    tick() { }
    mark(isMarck = true) {
        this.marked = isMarck;
    }
    setPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    addX(x) {
        let newX = this.x + x;
        return this.setPosition(newX, this.y);
    }
    addY(y) {
        let newY = this.y + y;
        return this.setPosition(this.x, newY);
    }
    destroy() {
        this.canvas.remove(this);
    }
    isCross(entity) {
        return isCross_1.default(this, entity);
    }
    drawDebug() {
        let start = {
            x: this.x,
            y: this.y
        };
        let end = {
            x: this.width,
            y: this.height
        };
        this.canvas.drawStrokeRect(start, end, 'yellow');
    }
    getCenter() {
        return {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        };
    }
}
exports.default = Abstract;
//# sourceMappingURL=abstract.js.map