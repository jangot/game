import AbstractEntity from './abstract';
import Canvas from '../canvas'
import { TICK_TIME } from './../../constant';

class Bullet extends AbstractEntity {
    protected timer:number;

    constructor(canvas: Canvas, x:number, y:number) {
        super(canvas, x, y);

        this.width = 6;
        this.height = 6;

        this.timer = setInterval(() => {
            this.addY(-5);
        }, TICK_TIME /2);
    }
    draw() {
        super.draw();

        this.canvas.drawFillRound(this.getCenter(), 3, 'silver');

        return this;
    }
    destroy() {
        super.destroy();

        clearInterval(this.timer);
    }
}

export default Bullet;