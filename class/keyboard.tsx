import bind from 'bind-decorator';

export default class Keyboard {
    static KEY_UP = 'ArrowUp';
    static KEY_DOWN = 'ArrowDown';
    static KEY_LEFT = 'ArrowLeft';
    static KEY_RIGHT = 'ArrowRight';
    static KEY_SPACE = 'Space';
    static KEY_DELAY = 50;

    private body: HTMLElement;
    private events: any;
    private inProgress:any = {};

    constructor(body:HTMLElement) {
        this.body = body;
        this.events = {};
        this.body.addEventListener('keydown', this.listenerDown);
        this.body.addEventListener('keyup', this.listenerUp);
    }

    public onKey(name: string, cb: () => any):Keyboard {
        this.events[name] = this.events[name] || [];
        this.events[name].push(cb);

        return this;
    }

    public destroy() {
        this.body.removeEventListener('keydown', this.listenerDown);
        this.body.removeEventListener('keyup', this.listenerUp);
    }

    @bind
    private listenerDown(e: KeyboardEvent) {
        let keyCode = e.code;

        if (keyCode === 'KeyR' || this.inProgress[keyCode]) {
            return;
        }

        this.inProgress[keyCode] = setInterval(() => {
            let events = this.events[keyCode] || [];
            for (let cb of events) {
                cb();
            }
        }, Keyboard.KEY_DELAY);
        e.preventDefault();
    }

    @bind
    private listenerUp(e: KeyboardEvent) {
        if (e.code === 'KeyR') {
            return;
        }
        clearInterval(this.inProgress[e.code]);
        this.inProgress[e.code] = null;

        e.preventDefault();
    }

}
