"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bind_decorator_1 = require("bind-decorator");
class Keyboard {
    constructor(body) {
        this.inProgress = {};
        this.body = body;
        this.events = {};
        this.body.addEventListener('keydown', this.listenerDown);
        this.body.addEventListener('keyup', this.listenerUp);
    }
    onKey(name, cb) {
        this.events[name] = this.events[name] || [];
        this.events[name].push(cb);
        return this;
    }
    destroy() {
        this.body.removeEventListener('keydown', this.listenerDown);
        this.body.removeEventListener('keyup', this.listenerUp);
    }
    listenerDown(e) {
        let keyCode = e.code;
        if (keyCode === 'KeyR' || this.inProgress[keyCode]) {
            return;
        }
        this.inProgress[keyCode] = setInterval(() => {
            let events = this.events[keyCode] || [];
            for (let cb of events) {
                cb();
            }
        }, Keyboard.KEY_DELAY);
        e.preventDefault();
    }
    listenerUp(e) {
        if (e.code === 'KeyR') {
            return;
        }
        clearInterval(this.inProgress[e.code]);
        this.inProgress[e.code] = null;
        e.preventDefault();
    }
}
Keyboard.KEY_UP = 'ArrowUp';
Keyboard.KEY_DOWN = 'ArrowDown';
Keyboard.KEY_LEFT = 'ArrowLeft';
Keyboard.KEY_RIGHT = 'ArrowRight';
Keyboard.KEY_SPACE = 'Space';
Keyboard.KEY_DELAY = 50;
__decorate([
    bind_decorator_1.default
], Keyboard.prototype, "listenerDown", null);
__decorate([
    bind_decorator_1.default
], Keyboard.prototype, "listenerUp", null);
exports.default = Keyboard;
//# sourceMappingURL=keyboard.js.map