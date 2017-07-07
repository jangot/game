"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const constant_1 = require("../constant");
class Canvas {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.entities = [];
        this.images = {};
        this
            .setWidth(constant_1.CANVAS_WIDTH)
            .setHeight(constant_1.CANVAS_HEIGHT);
    }
    setWidth(width) {
        this.width = width;
        this.canvas.setAttribute(`width`, `${width}px`);
        return this;
    }
    setHeight(height) {
        this.height = height;
        this.canvas.setAttribute(`height`, `${height}px`);
        return this;
    }
    add(entity) {
        this.entities.push(entity);
        return this;
    }
    remove(entity) {
        lodash_1.remove(this.entities, entity);
        return this;
    }
    draw() {
        this.getContext().clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let entity of this.entities) {
            entity.draw();
        }
        return this;
    }
    getContext() {
        return this.context;
    }
    destroy() {
        for (let entity of this.entities) {
            entity.destroy();
        }
        this.entities = [];
    }
    drawStrokeRound(center, radius, color) {
        let ctx = this.getContext();
        ctx.beginPath();
        ctx.moveTo(center.x + radius, center.y);
        ctx.strokeStyle = color;
        ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);
        ctx.stroke();
        return this;
    }
    drawFillRound(center, radius, color) {
        let ctx = this.getContext();
        ctx.beginPath();
        ctx.moveTo(center.x + radius, center.y);
        ctx.fillStyle = color;
        ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);
        ctx.fill();
        return this;
    }
    drawStrokeRect(start, end, color) {
        let ctx = this.getContext();
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.strokeRect(start.x, start.y, end.x, end.y);
        ctx.stroke();
        return this;
    }
    drawFillRect(start, end, color) {
        let ctx = this.getContext();
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fillRect(start.x, start.y, end.x, end.y);
        ctx.fill();
        return this;
    }
    drawImage(name, start, size) {
        if (!this.images[name]) {
            this.images[name] = document.getElementById(name);
        }
        let ctx = this.getContext();
        ctx.drawImage(this.images[name], start.x, start.y, size.width, size.height);
        return this;
    }
}
exports.default = Canvas;
//# sourceMappingURL=canvas.js.map