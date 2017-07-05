import Canvas from '../canvas';
import AbstractEnemies from './abstract';
import Coordinate from '../../interface/coordinate';

class Background extends AbstractEnemies {

    private start: Coordinate;
    private end: Coordinate;

    constructor(canvas:Canvas, x:number = 0, y:number = 0) {
        super(canvas, x, y);

        this.width = canvas.width;
        this.height = canvas.height;

        this.start = {
            x: this.x,
            y: this.y
        };

        this.end = {
            x: canvas.width,
            y: canvas.height
        };
    }

    draw () {
        super.draw();


        this.canvas.drawFillRect(this.start, this.end, 'black');
        return this;
    }
}

export default Background;