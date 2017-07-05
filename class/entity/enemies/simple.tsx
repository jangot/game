import AbstractEnemies from './abstract';

class Simple extends AbstractEnemies {
    draw() {
        super.draw();

        this.canvas.drawImage('enemies_simple', this, this);

        return this;
    }
}

export default Simple;