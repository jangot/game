import bind from 'bind-decorator';

export default class Keyboard {
    static KEY_UP = 'ArrowUp';
    static KEY_DOWN = 'ArrowDown';
    static KEY_LEFT = 'ArrowLeft';
    static KEY_RIGHT = 'ArrowRight';
    static KEY_SPACE = 'Space';

    private body: HTMLElement;
    private events: any;

    constructor(body:HTMLElement) {
        this.body = body;
        this.events = {};
        this.body.addEventListener('keydown', this.listener);
    }

    public onKey(name: string, cb: () => any):Keyboard {
        this.events[name] = this.events[name] || [];
        this.events[name].push(cb);

        return this;
    }

    public destroy() {
        this.body.removeEventListener('keydown', this.listener)
    }

    @bind
    private listener(e: KeyboardEvent) {
        if (e.code === 'KeyR') {
            return;
        }
        let events = this.events[e.code] || [];
        for (let cb of events) {
            cb();
        }

        e.preventDefault();
    }
}
