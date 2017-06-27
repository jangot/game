import AbstractEntity from '../abstract';
import Canvas from '../../canvas'

class AbstractEnemies extends AbstractEntity {
    static WIDTH = 20;
    static HEIGHT = 30;

    constructor(canvas: Canvas, x:number = 0, y:number = 0) {
        super(canvas, x, y);

        this.width = AbstractEnemies.WIDTH;
        this.height = AbstractEnemies.HEIGHT;
    }

    draw() {
        super.draw();

        let start = {
            x: this.x,
            y: this.y
        };
        let end = {
            x: this.width,
            y: this.height
        };

        this.canvas.drawFillRect(start, end, 'orange');


        return this;
    }
}

export default AbstractEnemies;