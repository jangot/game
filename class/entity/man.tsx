import AbstractEntity from './abstract';
import Canvas from '../canvas';
import Bullet from '../entity/bullet';

class Man extends AbstractEntity {
    static STEP = 5;
    static GUN_LENGTH = 35;

    constructor(canvas: Canvas, x:number = 100, y:number = 100) {
        super(canvas, x, y);

        this.x = canvas.width / 2;
        this.y = canvas.height - 10;
        this.width = 50;
        this.height = 50;
    }
    draw() {
        let context = this.canvas.getContext();

        let center = this.getCenter();
        let radius = this.width/2;

        context.beginPath();
        context.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'green';
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = '#003300';
        context.stroke();

        context.moveTo(center.x, center.y);
        context.lineTo(center.x, center.y - Man.GUN_LENGTH);
        context.lineWidth = 5;
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
        let center = this.getCenter();

        return new Bullet(this.canvas, center.x, center.y - Man.GUN_LENGTH);
    }

    private getCenter() {
        return {
            x: this.x + this.width/2,
            y: this.y + this.height/2
        };
    }
}

export default Man;