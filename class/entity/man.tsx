import AbstractEntity from './abstract';
import Canvas from '../canvas';
import Bullet from '../entity/bullet';

class Man extends AbstractEntity {
    static STEP = 5;
    static GUN_LENGTH = 16;

    protected image: HTMLImageElement;

    constructor(canvas: Canvas, x:number = 100, y:number = 100) {
        super(canvas, x, y);

        this.width = 16;
        this.height = 16;

        this.x = canvas.width / 2;
        this.y = canvas.height - 16;
        this.image = document.getElementById('man') as HTMLImageElement;
    }
    draw() {
        super.draw();

        let ctx = this.canvas.getContext();

        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.stroke();
        ctx.fill();

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
}

export default Man;