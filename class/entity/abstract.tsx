import { concat } from 'lodash';

import { DEBUG } from '../../constant';
import Entity from '../../interface/entity';
import isCross from '../../lib/isCross';
import Сoordinate from '../../interface/coordinate';
import Canvas from '../canvas';

let id = 1;
class Abstract implements Entity {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public id: number;

    protected canvas: Canvas;

    constructor(canvas: Canvas, x:number = 0, y:number = 0) {
        this.canvas = canvas;
        this.canvas.add(this);

        this.id = id++;
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

    tick() {}

    setPosition(x: number, y: number):Entity {
        this.x = x;
        this.y = y;

        return this;
    }
    addX(x: number):Entity {
        let newX = this.x + x;

        return this.setPosition(newX, this.y);
    }
    addY(y: number):Entity {
        let newY = this.y + y;

        return this.setPosition(this.x, newY);
    }
    destroy() {
        this.canvas.remove(this);
    }
    isCross(entity: Entity): boolean {
        return isCross(this, entity);
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

        this.canvas.drawStrokeRect(start, end, '#00ff00');
    }

    protected getCenter() {
        return {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        }
    }

}

export default Abstract;