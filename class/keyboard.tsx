

export default class Keyboard {
    static KEY_UP = 'ArrowUp';
    static KEY_DOWN = 'ArrowDown';
    static KEY_LEFT = 'ArrowLeft';
    static KEY_RIGHT = 'ArrowRight';

    private body: HTMLElement;
    private events: any;

    constructor(body:HTMLElement) {
        this.body = body;
        this.events = {};
        this.body.addEventListener('keydown', this.listener.bind(this));
    }

    onKey(name: string, cb: () => {}):Keyboard {
        this.events[name] = this.events[name] || [];
        this.events[name].push(cb);

        return this;
    }

    private listener(e: KeyboardEvent) {
        let events = this.events[e.key] || [];
        for (let cb of events) {
            cb();
        }

        e.preventDefault();
    }
}
