"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("../../constant");
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
        if (constant_1.DEBUG) {
            this.drawDebug();
        }
        return this;
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
        return this.isCrossX(entity) && this.isCrossY(entity);
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
        this.canvas.drawStrokeRect(start, end, '#00ff00');
    }
    getCenter() {
        return {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        };
    }
    isCrossX(entity) {
        let point1 = entity.x;
        let point2 = entity.x + entity.width;
        let x1 = this.x;
        let x2 = this.x + this.width;
        return this.isPointBetween(point1, x1, x2) || this.isPointBetween(point2, x1, x2);
    }
    isCrossY(entity) {
        let point1 = entity.y;
        let point2 = entity.y + entity.height;
        let y1 = this.y;
        let y2 = this.y + this.height;
        return this.isPointBetween(point1, y1, y2) || this.isPointBetween(point2, y1, y2);
    }
    isPointBetween(point, c1, c2) {
        return c1 <= point && point <= c2;
    }
}
exports.default = Abstract;
//# sourceMappingURL=abstract.js.map