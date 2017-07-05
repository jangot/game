import AbstractEnemies from './abstract';

class Boss extends AbstractEnemies {
    draw() {
        super.draw();

        this.canvas.drawImage('enemies_boss', this, this);

        return this;
    }
}

export default Boss;