import AbstractEntity from './abstract';
import Canvas from '../canvas'
import { TICK_TIME } from './../../constant';

class Bullet extends AbstractEntity {
    protected timer:number;

    constructor(canvas: Canvas, x:number, y:number) {
        super(canvas, x, y);

        this.timer = setInterval(() => {
            this.addY(-5);
        }, TICK_TIME);
    }
    draw() {
        let context = this.canvas.getContext();

        context.beginPath();
        context.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
        context.fillStyle = 'red';
        context.fill();
        context.lineWidth = 0;
        context.strokeStyle = 'red';
        context.stroke();

        return this;
    }
    destroy() {
        super.destroy();

        clearInterval(this.timer);
    }
}

export default Bullet;