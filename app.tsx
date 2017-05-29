import Canvas from './class/canvas';
import Man from './class/entity/man';
import Keyboard from './class/keyboard';

const WIDTH = 400;
const HEIGHT = 600;

function app(canvasElement: HTMLCanvasElement) {
    const canvas = new Canvas(canvasElement);

    canvas
        .setWidth(WIDTH)
        .setHeight(HEIGHT);

    let player = new Man(canvas);

    setInterval(() => {
        canvas.draw();
    }, 10);

    let keyboard = new Keyboard(document.getElementById('body'));
    keyboard
        .onKey(Keyboard.KEY_LEFT, () => {
            player.addX(-5);

            return {};
        })
        .onKey(Keyboard.KEY_RIGHT, () => {
            player.addX(5);

            return {};
        })
        .onKey(Keyboard.KEY_UP, () => {
            player.addY(-5);

            return {};
        })
        .onKey(Keyboard.KEY_DOWN, () => {
            player.addY(5);

            return {};
        })
}

export default app;

