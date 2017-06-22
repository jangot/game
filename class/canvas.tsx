import { remove } from 'lodash';
import Entity from '../interface/entity';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../constant';

export default class Canvas {
    private entities: Entity[];
    private canvas: HTMLCanvasElement;

    public width: number;
    public height: number;

    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.entities = [];

        this
            .setWidth(CANVAS_WIDTH)
            .setHeight(CANVAS_HEIGHT);
    }
    public setWidth(width: number):Canvas {
        this.width = width;
        this.canvas.setAttribute(`width`, `${width}px`);

        return this;
    }
    public setHeight(height: number):Canvas {
        this.height = height;
        this.canvas.setAttribute(`height`, `${height}px`);

        return this;
    }
    public add(entity: Entity):Canvas {
        this.entities.push(entity);

        return this;
    }
    public remove(entity: Entity):Canvas {
        remove(this.entities, entity);

        return this;
    }
    public draw():Canvas {
        this.getContext().clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let entity of this.entities) {
            entity.draw();
        }

        return this;
    }
    public getContext():CanvasRenderingContext2D {
        return this.canvas.getContext('2d');
    }

    public destroy() {
        for (let entity of this.entities) {
            entity.destroy();
        }
        this.entities = [];
    }
}