import Canvas from '../../canvas'
import AbstractEnemies from './abstract';

class Boss extends AbstractEnemies {
    constructor(canvas: Canvas, x:number = 0, y:number = 0) {
        super(canvas, x, y);

        this.attackStepX = 3;
        this.attackSpeedY = 6;
    }
    draw() {
        super.draw();

        this.canvas.drawImage('enemies_boss', this, this);

        return this;
    }
}

export default Boss;