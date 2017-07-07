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
var lodash_1 = require("lodash");
var abstract_1 = require("./abstract");
var Enemies = (function (_super) {
    __extends(Enemies, _super);
    function Enemies(canvas, x, y) {
        if (x === void 0) { x = 100; }
        if (y === void 0) { y = 100; }
        var _this = _super.call(this, canvas, x, y) || this;
        _this.x = lodash_1.random(Simple.PADDING, canvas.width - Simple.PADDING);
        _this.y = lodash_1.random(Simple.PADDING, canvas.height - Simple.PADDING * 2);
        _this.width = 20;
        _this.height = 20;
        return _this;
    }
    Enemies.prototype.draw = function () {
        var context = this.canvas.getContext();
        context.fillStyle = 'blue';
        context.strokeStyle = 'blue';
        context.fillRect(this.x, this.y, this.width, this.height);
        return this;
    };
    return Enemies;
}(abstract_1.default));
Enemies.PADDING = 50;
exports.default = Enemies;
//# sourceMappingURL=enemies.js.map