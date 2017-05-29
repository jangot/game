import Entity from '../../interface/entity';
import Canvas from '../canvas';

class Abstract implements Entity {
    protected canvas: Canvas;
    protected x: number;
    protected y: number;

    constructor(canvas: Canvas) {
        this.canvas = canvas;
        this.canvas.add(this);

        this.x = 40;
        this.y = 40;
    }
    draw():Entity {
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
}

export default Abstract;