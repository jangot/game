"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function iterator(constructor) {
    constructor.prototype[Symbol.iterator] = () => { return this; };
}
exports.default = iterator;
//# sourceMappingURL=iterator.js.map