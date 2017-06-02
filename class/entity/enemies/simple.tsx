import { random } from 'lodash';
import AbstractEntity from '../abstract';
import Canvas from '../../canvas'

class Simple extends AbstractEntity {
    static PADDING = 50;

    constructor(canvas: Canvas, x:number = 100, y:number = 100) {
        super(canvas, x, y);

        this.x = random(Simple.PADDING, canvas.width - Simple.PADDING);
        this.y = random(Simple.PADDING, canvas.height - Simple.PADDING * 2);

        this.width = 20;
        this.height = 20;
    }

    draw() {
        let context = this.canvas.getContext();

        context.fillStyle = 'blue';
        context.strokeStyle = 'blue';

        context.fillRect(this.x, this.y, this.width, this.height);


        return this;
    }
}

export default Simple;