import AbstractEnemies from './abstract';

class Simple extends AbstractEnemies {
    draw() {
        super.draw();

        return this;
    }
}

export default Simple;