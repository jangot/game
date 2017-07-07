"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var abstract_1 = require("../abstract");
var AbstractEnemies = (function (_super) {
    __extends(AbstractEnemies, _super);
    function AbstractEnemies(canvas, x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var _this = _super.call(this, canvas, x, y) || this;
        _this.width = AbstractEnemies.WIDTH;
        _this.height = AbstractEnemies.HEIGHT;
        return _this;
    }
    AbstractEnemies.prototype.draw = function () {
        console.log("draw");
        var context = this.canvas.getContext();
        context.fillStyle = 'orange';
        context.strokeStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);
        return this;
    };
    return AbstractEnemies;
}(abstract_1.default));
AbstractEnemies.WIDTH = 50;
AbstractEnemies.HEIGHT = 50;
exports.default = AbstractEnemies;
//# sourceMappingURL=abstrat.js.map