import Сoordinate from './coordinate';

interface Entity {
    x: number;
    y: number;
    width: number;
    height: number;
    id: number;
    draw(): Entity;
    tick(): any;
    setPosition(x: number, y: number): Entity;
    addX(x: number): Entity;
    addY(y: number): Entity;
    isCross(entity:Entity): boolean;
    destroy():void;
}

export default Entity;