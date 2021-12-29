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
        // console.warn('event.ts', kind, className);
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
        // console.warn(this._mapHandler.has(kind));
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
    /**客户端——————————————服务器 */
    C2S_Login,//登录
    C2S_CoversionList,//会话列表
    C2S_CHAT_MSG_LIST,//消息列表
    C2S_SEND_CHAT_MSG,//发送消息
    C2S_GET_UNREAD_NUM,//获取消息未读
    C2S_READ_MSG, //消息已读
    C2S_SEARCH_USER,//搜索用户
    C2S_SEARCH_SUB_USER,//查找下级
    C2S_GET_SUB_USER_LIST,//加载下级列表
    C2S_REQ_MATCH_SERVICE, //匹配客服
    C2S_REQ_DELETE_CONVERSION,//删除会话列表
    C2S_REQ_GET_QUICK_REPLY,//快捷回复请求
    /**服务器——————————————客户端 */
    S2C_Connect,
    S2C_Login,
    S2C_MSG_ERR_MSG_PUSH, //错误消息推送
    S2C_MSG_CLOSE_CONN_PUSH, //服务器主动断开
    S2C_Conversionlist,//会话列表消息返回
    S2C_CHAT_MSG_LIST,//消息列表返回
    S2C_SEND_CHAT_MSG,//发送消息返回
    S2C_RECEIVE_CHAT_MSG,//收到聊天消息
    EVENT_ONERROR, //玩家断线提示
    EVENT_ONOPEN, //网络开启
    S2C_GET_UNREAD_NUM, //消息未读数
    S2C_READ_MSG, //消息已读成功回调
    S2C_SEARCH_USER, //搜索用户成功
    Get_LocalImgPath, //本地图片路径(web)
    Get_ImgPath_Native, //原生发送图片
    S2C_SEARCH_SUB_USER,//查找下级返回
    S2C_GET_SUB_USER_LIST,//加载下级列表返回
    PushAutoEnterConversion, //人工代充推送
    S2C_RESP_DELETE_CONVERSION, //删除会话列表
    S2C_RESP_GET_QUICK_REPLY, //快捷回复返回
    FASTREPLYTOUCHEMIT, //点击快捷回复
    SHOWCHATSCENE, //显示聊天室
    BACKTOHALLSCENE //回到聊天列表场景
}

export const events = EventManage.getInstance();
