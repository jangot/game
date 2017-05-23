import AbstractEntity from './abstract';

class Man extends AbstractEntity {
    draw() {
        let context = this.canvas.getContext();

        context.beginPath();
        context.arc(this.x, this.y, 50, 0, 2 * Math.PI, false);
        context.fillStyle = 'green';
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = '#003300';
        context.stroke();

        return this;
    }
    addX(x: number): Man {
        let newX = this.x + x;
        if (newX < 0 || newX > this.canvas.width) {
            return this;
        }

        this.x = newX;
        return this;
    }

    addY(y: number): Man {
        let newY = this.y + y;
        if (newY < 0 || newY > this.canvas.height) {
            return this;
        }
        this.y = newY;

        return this;
    }
}

export default Man;