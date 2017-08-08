import Canvas from './canvas';
import AbstractEnemies from './entity/enemies/abstract';
import Simple from './entity/enemies/simple';
import Boss from './entity/enemies/boss';
import SupperBoss from './entity/enemies/supper-boss';
import Coordinate from '../interface/coordinate';

class EnemiesFactory {
    static ENEMIES_COUNT = 36;
    static ENEMIES_MARGIN = 10;

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

        this.lines = 4;
    }

    [Symbol.iterator]() { return this };

    public next(): { done: boolean, value: AbstractEnemies } {
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

        let value: AbstractEnemies;

        switch (this.line) {
            case 0:
                value = new SupperBoss(this.canvas, coordinates.x, coordinates.y);
                break;
            case 1:
                value = new Boss(this.canvas, coordinates.x, coordinates.y);
                break;
            default:
                value = new Simple(this.canvas, coordinates.x, coordinates.y);
        }

        return {
            value,
            done: false
        }
    }

    private getCoordinates():Coordinate {
        let x = this.column * (AbstractEnemies.WIDTH + EnemiesFactory.ENEMIES_MARGIN);
        let y = this.line * (AbstractEnemies.HEIGHT + EnemiesFactory.ENEMIES_MARGIN);


        return { x, y };
    }
}

export default EnemiesFactory;