import Canvas from './class/canvas';
import Man from './class/entity/man';
import Keyboard from './class/keyboard';

const WIDTH = 400;
const HEIGHT = 600;

export default function app(canvasElement: HTMLCanvasElement) {
    const canvas = new Canvas(canvasElement);

    canvas
        .setWidth(WIDTH)
        .setHeight(HEIGHT);

    let player = new Man(canvas);

    let keyboard = new Keyboard(document.getElementById('body'));
    keyboard
        .onKey(Keyboard.KEY_LEFT, () => {
            player.addX(-5);
        })
        .onKey(Keyboard.KEY_RIGHT, () => {
            player.addX(5);
        })
        .onKey(Keyboard.KEY_UP, () => {
            player.addY(-5);
        })
        .onKey(Keyboard.KEY_DOWN, () => {
            player.addY(5);
        });

    setInterval(() => {
        canvas.draw();
    }, 10);
}
