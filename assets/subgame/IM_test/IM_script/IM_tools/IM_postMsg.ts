const { ccclass } = cc._decorator;

interface IMessage {
    type: string;
    data: any;
    fn: () => {};
}
/**
 * 处理发送到大厅的消息
 */
@ccclass
class ClientMessage {
    private static instance: ClientMessage;
    private eventMap: object;
    private queue: IMessage[];
    private ok: boolean;
    private ticker: number;

    public static getInstance(): ClientMessage {
        this.instance || (this.instance = new ClientMessage());
        return this.instance;
    }

    public constructor() {
        this.eventMap = {};
        this.onMessage();
        this.queue = [];
        this.ok = false;
        this.ticker = 0;
        this.ping();
    }

    public send(eventName: string, data: object, fn: () => {}): void {
        if (!this.ok) {
            this.queue.push({
                type: eventName,
                data,
                fn,
            });
            return;
        }

        const message = {
            type: eventName,
            data,
        };

        this.push(JSON.stringify(message));
        fn && fn();
    }

    private push(message: string): void {
        const client = window["ReactNativeWebView"] || window.parent;
        try {
            client.postMessage(message, "*");
        } catch (error) {
            client.postMessage(message);
        }
    }

    private ping(): void {
        this.ticker = setInterval(() => {
            this.push(JSON.stringify({ type: "ping", data: {} }));
        }, 500);
    }

    private pong(): void {
        this.ok = true;
        clearInterval(this.ticker);
    }

    private ready(): void {
        while (this.queue.length > 0) {
            const message = this.queue.shift();
            this.send(message.type, message.data, message.fn);
        }
    }

    private addEventListener(eventName: string, fn: () => {}): void {
        this.eventMap[eventName] = fn;
    }

    private removeEventListener(eventName: string): void {
        delete this.eventMap[eventName];
    }

    private onMessage(): void {
        [window.document, window].forEach((handler) => {
            handler.addEventListener(
                "message",
                (e: any) => {
                    try {
                        const message = JSON.parse(e.data);

                        if (message.type === "pong") {
                            this.pong();
                            this.ready();
                            return;
                        }
                        // if (this.eventMap[message.type]) {
                        //     return this.eventMap[message.type](message, this.app);
                        // }
                    } catch (error) {
                        console.log(error);
                    }
                },
                false,
            );
        });
    }
}

export const sendPostMessage = (msg: string, data: any = "") => {
    ClientMessage.getInstance().send(msg, data, undefined);
};
