"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_1 = require("./abstract");
const bullet_1 = require("../entity/bullet");
class Man extends abstract_1.default {
    constructor(canvas, x = 100, y = 100) {
        super(canvas, x, y);
        this.width = 32;
        this.height = 32;
        this.x = canvas.width / 2;
        this.y = canvas.height - this.height;
        this.image = document.getElementById('man');
    }
    draw() {
        super.draw();
        this.canvas.drawImage('man', this, this);
        return this;
    }
    moveRight() {
        return this.addX(Man.STEP);
    }
    moveLeft() {
        return this.addX(-1 * Man.STEP);
    }
    addX(x) {
        let newX = this.x + x;
        let leftBorder = 0;
        let rightBorder = this.canvas.width - this.width;
        if (newX < leftBorder || newX > rightBorder) {
            return this;
        }
        this.x = newX;
        return this;
    }
    addY(y) {
        let newY = this.y + y;
        let topBorder = 0;
        let bottomBorder = this.canvas.height - this.height;
        if (newY < topBorder || newY > bottomBorder) {
            return this;
        }
        this.y = newY;
        return this;
    }
    fire() {
        let center = this.getCenter();
        return new bullet_1.default(this.canvas, center.x - 3, center.y - Man.GUN_LENGTH);
    }
}
Man.STEP = 5;
Man.GUN_LENGTH = 16;
exports.default = Man;
//# sourceMappingURL=man.js.map