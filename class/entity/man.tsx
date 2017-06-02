import AbstractEntity from './abstract';
import Canvas from '../canvas';
import Bullet from '../entity/bullet';

class Man extends AbstractEntity {
    static STEP = 5;

    constructor(canvas: Canvas, x:number = 100, y:number = 100) {
        super(canvas, x, y);

        this.width = 50;
        this.height = 50;
    }
    draw() {
        let context = this.canvas.getContext();

        let center = {
            x: this.x + this.width/2,
            y: this.y + this.height/2
        };
        let radius = this.width/2;

        context.beginPath();
        context.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'green';
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = '#003300';
        context.stroke();

        return this;
    }

    moveRight():Man {
        return this.addX(Man.STEP);
    }

    moveLeft():Man {
        return this.addX(-1 * Man.STEP);
    }

    addX(x: number):Man {
        let newX = this.x + x;
        let leftBorder = 0;
        let rightBorder = this.canvas.width - this.width;

        if (newX < leftBorder || newX > rightBorder) {
            return this;
        }

        this.x = newX;
        return this;
    }

    addY(y: number): Man {
        let newY = this.y + y;
        let topBorder = 0;
        let bottomBorder = this.canvas.height - this.height;

        if (newY < topBorder || newY > bottomBorder) {
            return this;
        }
        this.y = newY;

        return this;
    }
    fire():Bullet {
        let position = {
            x: this.x + this.width/2,
            y: this.y
        };

        return new Bullet(this.canvas, position.x, position.y);
    }
}

export default Man;