import AbstractEntity from './abstract';
import Canvas from '../canvas';

export default class Looser extends AbstractEntity {

    constructor(canvas:Canvas, x:number = 0, y:number = 0) {
        super(canvas, x, y);

        this.x = canvas.width / 2 - 70;
        this.y = canvas.height / 2;
    }

    draw() {
        super.draw();

        let context = this.canvas.getContext();

        context.fillStyle = 'red';
        context.font = '30px Arial';
        context.fillText('LOOSER!', this.x, this.y);

        return this;
    }
}