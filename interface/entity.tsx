interface Entity {
    draw(): Entity;
    setPosition(x: number, y: number): Entity;
    addX(x: number): Entity;
    addY(y: number): Entity;
}

export default Entity;