"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_1 = require("./entity/enemies/abstract");
const simple_1 = require("./entity/enemies/simple");
const boss_1 = require("./entity/enemies/boss");
class EnemiesFactory {
    constructor(canvas) {
        this.column = -1;
        this.line = 0;
        this.canvas = canvas;
        this.columns = Math.ceil(canvas.width / (abstract_1.default.WIDTH + EnemiesFactory.ENEMIES_MARGIN)) - 2;
        this.lines = 5;
    }
    [Symbol.iterator]() { return this; }
    ;
    next() {
        this.column++;
        if (this.column === this.columns) {
            this.column = 0;
            this.line++;
        }
        if (this.line === this.lines) {
            return {
                done: true,
                value: null
            };
        }
        let coordinates = this.getCoordinates();
        let value;
        if (this.line === 0) {
            value = new boss_1.default(this.canvas, coordinates.x, coordinates.y);
        }
        else {
            value = new simple_1.default(this.canvas, coordinates.x, coordinates.y);
        }
        return {
            value,
            done: false
        };
    }
    getCoordinates() {
        let x = this.column * (abstract_1.default.WIDTH + EnemiesFactory.ENEMIES_MARGIN);
        let y = this.line * (abstract_1.default.HEIGHT + EnemiesFactory.ENEMIES_MARGIN);
        return { x, y };
    }
}
EnemiesFactory.ENEMIES_COUNT = 36;
EnemiesFactory.ENEMIES_MARGIN = 10;
exports.default = EnemiesFactory;
//# sourceMappingURL=enemiesFactory.js.map