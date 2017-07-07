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
var abstract_1 = require("./abstract");
var Bulet = (function (_super) {
    __extends(Bulet, _super);
    function Bulet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bulet.prototype.draw = function () {
    };
    return Bulet;
}(abstract_1.default));
exports.default = Bulet;
//# sourceMappingURL=bulet.js.map