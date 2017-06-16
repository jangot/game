import Canvas from './canvas';
import Entity from '../interface/entity';
import AbstractEnemies from './entity/enemies/abstract';
import Simple from './entity/enemies/simple';

class EnemiesFactory {
    static ENEMIES_COUNT = 36;
    static ENEMIES_MARGIN = 5;

    private canvas: Canvas;

    private counter = 0;
    private lastX = 0;
    private lastY = 0;

    constructor(canvas: Canvas) {
        this.canvas = canvas;
    }

    [Symbol.iterator]() { return this };

    public next(): { done: boolean, value: Entity } {
        if (this.counter === EnemiesFactory.ENEMIES_COUNT) {
            return {
                done: true,
                value: null
            }
        }

        let coordinates = this.getCoordinates();
        this.counter++;

        return {
            done: false,
            value: new Simple(this.canvas, coordinates.x, coordinates.y)
        }
    }

    private getCoordinates(): { x:number, y:number } {
        if (this.counter > 0) {
            this.lastX += AbstractEnemies.WIDTH + EnemiesFactory.ENEMIES_MARGIN;
        }

        if (this.lastX > this.canvas.width - 50) {
            this.lastX = 0;
            this.lastY += (AbstractEnemies.HEIGHT + EnemiesFactory.ENEMIES_MARGIN);
        }

        return {
            x: this.lastX,
            y: this.lastY
        }
    }
}

export default EnemiesFactory;