interface Entity {
    x:number;
    y:number;
    width:number;
    height:number;
    draw(): Entity;
    setPosition(x: number, y: number): Entity;
    addX(x: number): Entity;
    addY(y: number): Entity;
    isCross(entity:Entity):boolean;
}

export default Entity;