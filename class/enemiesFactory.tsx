import Canvas from './canvas';
import Entity from '../interface/entity';
import AbstractEnemies from './entity/enemies/abstract';
import Simple from './entity/enemies/simple';

class EnemiesFactory {
    static ENEMIES_COUNT = 36;
    static ENEMIES_MARGIN = 5;

    private canvas: Canvas;
    private columns: number;
    private lines: number;

    private column = -1;
    private line = 0;

    constructor(canvas: Canvas) {
        this.canvas = canvas;
        this.columns = Math.ceil(
            canvas.width / (AbstractEnemies.WIDTH + EnemiesFactory.ENEMIES_MARGIN)
            ) - 2;
        this.lines = 5;
    }

    [Symbol.iterator]() { return this };

    public next(): { done: boolean, value: Entity } {
        this.column++;
        if (this.column === this.columns) {
            this.column = 0;
            this.line++;
        }

        if (this.line === this.lines) {
            return {
                done: true,
                value: null
            }
        }

        let coordinates = this.getCoordinates();

        return {
            done: false,
            value: new Simple(this.canvas, coordinates.x, coordinates.y)
        }
    }

    private getCoordinates(): { x:number, y:number } {
        let x = this.column * (AbstractEnemies.WIDTH + EnemiesFactory.ENEMIES_MARGIN);
        let y = this.line * (AbstractEnemies.HEIGHT + EnemiesFactory.ENEMIES_MARGIN);


        return { x, y };
    }
}

export default EnemiesFactory;