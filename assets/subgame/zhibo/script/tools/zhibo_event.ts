const { ccclass } = cc._decorator;

type IBindFunc = (data: any) => void;

@ccclass
class EventManage {
    private static _instance: EventManage;
    private _mapHandler: Map<EventKind, Map<string, IBindFunc>>;

    constructor() {
        this._mapHandler = new Map();
    }
    public static getInstance(): EventManage {
        this._instance || (this._instance = new EventManage());
        return this._instance;
    }
    /**
     * 注册监听事件
     * @param kind 事件类型
     * @param className 响应函数所属类名
     * @param func 响应函数
     */
    public register(kind: EventKind, className: string, func: IBindFunc): void {
        const funcs = this._mapHandler.get(kind) || (new Map());
        if (funcs.has(className)) {
            return
        }
        funcs.set(className, func);
        this._mapHandler.set(kind, funcs);
    }

    /**
     * 取消监听事件
     * @param kind 事件类型
     * @param className 响应函数所属类名
     */
    public unregister(kind: EventKind, className: string): void {
        if (!this._mapHandler.has(kind)) {
            return
        }
        const funcs = this._mapHandler.get(kind);
        funcs.has(className) && funcs.delete(className);
        this._mapHandler.set(kind, funcs);
    }

    /**
     * 派发事件
     * @param kind 事件类型
     * @param data 传递的数据
     */
    public dispatch(kind: EventKind, data?: any): void {
        if (!this._mapHandler.has(kind)) {
            return
        }
        const funcs = this._mapHandler.get(kind);
        funcs.forEach((value: IBindFunc) => {
            value(data);
        })
    }
}

export const enum EventKind {
    C2S_Login,
    C2S_FrontEndLog,
    S2C_Connect,
    S2C_Login,
    S2C_PauseLiveServer,
    S2C_ForwardRecharge,
    TIP_Message,
    CLI_Reconnect,
}

export const events = EventManage.getInstance();