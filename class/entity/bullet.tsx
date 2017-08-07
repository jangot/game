import AbstractEntity from './abstract';
import Canvas from '../canvas'
import { TICK_TIME } from '../../constant';

class Bullet extends AbstractEntity {
    protected timer:number;
    protected direction: number;

    constructor(canvas: Canvas, x:number, y:number) {
        super(canvas, x, y);

        this.width = 6;
        this.height = 6;

        this.direction = -1;
    }
    reverse() {
        this.direction *= -1;
    }
    draw() {
        super.draw();

        console.log(`BULLET`, this.y);
        this.canvas.drawFillRound(this.getCenter(), 3, 'gold');

        return this;
    }

    tick() {
        super.tick();

        let offset = 10 * this.direction;

        this.addY(offset);
    }
}

export default Bullet;