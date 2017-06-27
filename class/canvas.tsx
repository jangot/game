import { remove } from 'lodash';
import Entity from '../interface/entity';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../constant';

export default class Canvas {
    private entities: Entity[];
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    public width: number;
    public height: number;

    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
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
        return this.context;
    }

    public destroy() {
        for (let entity of this.entities) {
            entity.destroy();
        }
        this.entities = [];
    }

    public drawStrokeRound(center:any, radius:number, color:string):Canvas {
        let ctx = this.getContext();

        ctx.beginPath();
        ctx.moveTo(center.x + radius, center.y);
        ctx.strokeStyle = color;
        ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);
        ctx.stroke();

        return this;
    }

    public drawFillRound(center:any, radius:number, color:string):Canvas {
        let ctx = this.getContext();

        ctx.beginPath();
        ctx.moveTo(center.x + radius, center.y);
        ctx.fillStyle = color;
        ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);
        ctx.fill();

        return this;
    }

    public drawStrokeRect(start:any, end:any, color:string):Canvas {
        let ctx = this.getContext();

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.strokeRect(start.x, start.y, end.x, end.y);
        ctx.stroke();

        return this;
    }

    public drawFillRect(start:any, end:any, color:string):Canvas {
        let ctx = this.getContext();

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fillRect(start.x, start.y, end.x, end.y);
        ctx.fill();

        return this;
    }
}