import AbstractEntity from '../abstract';
import Canvas from '../../canvas'

class AbstractEnemies extends AbstractEntity {
    static WIDTH = 20;
    static HEIGHT = 30;

    constructor(canvas: Canvas, x:number = 0, y:number = 0) {
        super(canvas, x, y);

        this.width = AbstractEnemies.WIDTH;
        this.height = AbstractEnemies.HEIGHT;
    }
}

export default AbstractEnemies;