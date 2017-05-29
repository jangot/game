import AbstractEntity from './abstract';
import Canvas from '../canvas'

class Man extends AbstractEntity {
    private ariaSize: number;

    constructor(canvas: Canvas) {
        super(canvas);

        this.ariaSize = 10;
    }
    draw() {
        let context = this.canvas.getContext();

        context.beginPath();
        context.arc(this.x, this.y, this.ariaSize, 0, 2 * Math.PI, false);
        context.fillStyle = 'green';
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = '#003300';
        context.stroke();

        return this;
    }
    addX(x: number): Man {
        let newX = this.x + x;
        let leftBorder = this.ariaSize;
        let rightBorder = this.canvas.width - this.ariaSize;

        if (newX < leftBorder || newX > rightBorder) {
            return this;
        }

        this.x = newX;
        return this;
    }

    addY(y: number): Man {
        let newY = this.y + y;
        let topBorder = this.ariaSize;
        let bottomBorder = this.canvas.height - this.ariaSize;

        if (newY < topBorder || newY > bottomBorder) {
            return this;
        }
        this.y = newY;

        return this;
    }
}

export default Man;