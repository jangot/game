"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(a, b) {
    let projectionWidth = getX(a, b);
    let projectionHeight = getY(a, b);
    let differentWidth = a.width + b.width - projectionWidth;
    let differentHeight = a.height + b.height - projectionHeight;
    return differentWidth > 0 && differentHeight > 0;
}
exports.default = default_1;
function getX(a, b) {
    let result = [a.x, a.x + a.width, b.x, b.x + b.width].sort(sort);
    return result[3] - result[0];
}
function getY(a, b) {
    let result = [a.y, a.y + a.height, b.y, b.y + b.height].sort(sort);
    return result[3] - result[0];
}
function sort(a, b) {
    return a - b;
}
//# sourceMappingURL=isCross.js.map