import Canvas from './class/canvas';
import Man from './class/entity/man';

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

    setTimeout(() => {
        player
            .addY(150)
            .addX(100)
        ;
    }, 2000)
}

export default app;

