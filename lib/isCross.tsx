import Entity from '../interface/entity';

export default function(a:Entity, b:Entity): boolean {
    let projectionWidth = getX(a, b);
    let projectionHeight = getY(a, b);

    let differentWidth = a.width + b.width - projectionWidth;
    let differentHeight = a.height + b.height - projectionHeight;

    return differentWidth > 0 && differentHeight > 0;
}

function getX(a:Entity, b:Entity):number {
    let result = [a.x, a.x + a.width, b.x, b.x + b.width].sort(sort);

    return result[3] - result[0];
}

function getY(a:Entity, b:Entity):number {
    let result = [a.y, a.y + a.height, b.y, b.y + b.height].sort(sort);

    return result[3] - result[0];
}

function sort(a:number, b:number):number {
    return a - b;
}