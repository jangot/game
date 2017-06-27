import { DEBUG } from '../../constant';
import Entity from '../../interface/entity';
import Canvas from '../canvas';

class Abstract implements Entity {
    public x: number;
    public y: number;
    public width:number;
    public height:number;

    protected canvas: Canvas;

    constructor(canvas: Canvas, x:number = 0, y:number = 0) {
        this.canvas = canvas;
        this.canvas.add(this);

        this.x = x;
        this.y = y;
        this.width = 1;
        this.height = 1;
    }
    draw():Entity {
        if (DEBUG) {
            this.drawDebug();
        }

        return this;
    }
    setPosition(x: number, y: number):Entity {
        this.x = x;
        this.y = y;

        return this;
    }
    addX(x: number):Entity {
        this.x += x;

        return this;
    }
    addY(y: number):Entity {
        this.y += y;

        return this;
    }
    destroy() {
        this.canvas.remove(this);
    }
    isCross(entity:Entity) {
        return this.isCrossX(entity) && this.isCrossY(entity);
    }

    protected drawDebug() {
        let start = {
            x: this.x,
            y: this.y
        };
        let end = {
            x: this.width,
            y: this.height
        };

        this.canvas.drawStrokeRect(start, end, 'black');
    }

    protected getCenter() {
        return {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        }
    }

    protected isCrossX(entity:Entity):boolean {
        let point1 = entity.x;
        let point2 = entity.x + entity.width;

        let x1 = this.x;
        let x2 = this.x + this.width;

        return this.isPointBetween(point1, x1, x2) || this.isPointBetween(point2, x1, x2);
    }
    protected isCrossY(entity:Entity):boolean {
        let point1 = entity.y;
        let point2 = entity.y + entity.height;

        let y1 = this.y;
        let y2 = this.y + this.height;

        return this.isPointBetween(point1, y1, y2) || this.isPointBetween(point2, y1, y2);
    }
    protected isPointBetween(point:number, c1:number, c2:number):boolean {
        return c1 <= point && point <= c2;
    }
}

export default Abstract;