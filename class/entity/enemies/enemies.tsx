import { random } from 'lodash';
import AbstractEntity from '../abstract';
import Canvas from '../../canvas'

class Enemies extends AbstractEntity {
    static PADDING = 50;

    constructor(canvas:Canvas, x:number = 100, y:number = 100) {
        super(canvas, x, y);

        this.x = random(Enemies.PADDING, canvas.width - Enemies.PADDING);
        this.y = random(Enemies.PADDING, canvas.height - Enemies.PADDING * 2);

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

export default Enemies;