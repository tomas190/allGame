import { ISendDelegate } from "./IM_delegate";
import { events, EventKind } from "../IM_tools/IM_event";
import { mproto } from "../../IM_proto/im_proto_msg";

const { ccclass } = cc._decorator;

@ccclass
class Sender {
    private static _instance: Sender;
    private _delegate: ISendDelegate;

    constructor() {
        // URLSearchParams
    }

    public static getInstance(): Sender {
        this._instance || (this._instance = new Sender());
        return this._instance;
    }

    public init(dg: ISendDelegate): void {
        this._delegate = dg;
        events.register(EventKind.C2S_Login, "send", this.loginRequest.bind(this));
        events.register(EventKind.C2S_CoversionList, "send", this.getConversionList.bind(this));
        events.register(EventKind.C2S_CHAT_MSG_LIST, "send", this.sendChatMsgList.bind(this));
        events.register(EventKind.C2S_SEND_CHAT_MSG, "send", this.sendChatMsgAction.bind(this));
        events.register(EventKind.C2S_GET_UNREAD_NUM, "send", this.getUnReadNumAction.bind(this));
        events.register(EventKind.C2S_READ_MSG, "send", this.readMsgAction.bind(this));
        events.register(EventKind.C2S_SEARCH_USER, "send", this.searchUserAction.bind(this));
        events.register(EventKind.C2S_SEARCH_SUB_USER, "send", this.searchSubUserAction.bind(this));
        events.register(EventKind.C2S_GET_SUB_USER_LIST, "send", this.getSubUserListAction.bind(this));
        events.register(EventKind.C2S_REQ_MATCH_SERVICE, "send", this.sendReqMatchService.bind(this));
        events.register(EventKind.C2S_REQ_DELETE_CONVERSION, "send", this.deleteConversion.bind(this));
        events.register(EventKind.C2S_REQ_GET_QUICK_REPLY, "send", this.sendGetQuikReply.bind(this));
    }
    /**
     * 发送登录请求
     * @param loginObj 登录请求
     */
    private loginRequest(loginObj): void {
        let data;
        if (loginObj.token) {
            data = {
                userId: loginObj.Id,
                token: loginObj.token
            }
        }

        if (loginObj.PassWord) {
            data = {
                userId: loginObj.Id,
                userPassword: loginObj.PassWord
            }
        }

        this.send(mproto.MessageID.REQ_LOGIN, data);
    }

    /**
     * 获取会话列表接口
     * @param listParams 获取列表参数
     */
    private getConversionList(listParams): void {
        if (!listParams) {
            return;
        }

        console.log("listParams == ", listParams);

        this.send(mproto.MessageID.REQ_CONVERSION_LIST, listParams);
    }

    /**
     * 获取消息列表请求
     * 
     * public userId: string;
         public toUserId: string;
         public skip: number;
          public limit: number;
     * @param listParams 消息列表参数
     */
    private sendChatMsgList(listParams) {
        if (!listParams) {
            return;
        }
        this.send(mproto.MessageID.REQ_CHAT_MSG_LIST, listParams);
    }

    /**
     * 发送聊天消息
     * @param chatParams 聊天参数
     */
    private sendChatMsgAction(chatParams) {
        if (!chatParams) {
            return;
        }
        console.log("chatParams == ", chatParams);

        // let chatMsg:mproto.ChatMsg = {};
        // Object.assign(chatMsg,chatParams);
        // console.log("chatMsg == ", chatMsg);


        this.send(mproto.MessageID.REQ_SEND_CHAT_MSG, { chatMsg: chatParams });
    }

    /**
     * 获取未读数
     * conversionId?: (string|null);
     * userId?: (string|null);
     *  toUserId?: (string|null);
     * @param unReadParams 获取未读参数
     */
    private getUnReadNumAction(unReadParams) {
        if (!unReadParams) {
            return;
        }
        this.send(mproto.MessageID.REQ_GET_UNREAD_NUM, unReadParams);
    }

    /**
     * 消息已读
     */
    private readMsgAction(readMsgParams) {
        // console.log("readMsgParams 111== ", readMsgParams);

        if (!readMsgParams) {
            return;
        }
        this.send(mproto.MessageID.REQ_READ_MSG, readMsgParams);
    }

    /**
     * 搜索用户
     * @param searchUserParms 搜索用户参数 {userId,searchUserId}
     */
    private searchUserAction(searchUserParms) {
        if (!searchUserParms) {
            return;
        }
        this.send(mproto.MessageID.REQ_SEARCH_USER, searchUserParms);
    }

    /**
     * 搜索下级用户
     *  public userId: string;
     *  public searchUserId: string;
     * @param subUserParams 
     */
    private searchSubUserAction(subUserParams) {
        if (!subUserParams) {
            return;
        }
        this.send(mproto.MessageID.REQ_SEARCH_SUB_USER, subUserParams);
    }

    /**
     * 获取下级用户列表
     *   public userId: string;
     *   public skip: number;
     *   public limit: number;
     * @param subUserListParams 
     */
    private getSubUserListAction(subUserListParams) {
        if (!subUserListParams) {
            return;
        }
        this.send(mproto.MessageID.REQ_GET_SUB_USER_LIST, subUserListParams);
    }

    /**
     * 
     * // 1.匹配客服
     * message ReqMatchService {
     * string userId = 1; // 当前执行次操作的userId
     * int32 serviceType = 2; //   // 客服分类 1 充值未到账 2 兑换未到账 3 活动问题 4 其他
     *  string brand = 3; // 当前客服端品牌 , 特斯特 德比   直接传中文
     *   }
     * 
     */
    private sendReqMatchService(matchParams) {
        if (!matchParams) {
            return;
        }
        console.log("matchParam: ", matchParams);

        this.send(mproto.MessageID.REQ_MATCH_SERVICE, matchParams);
    }
    /**
     * 删除会话列表
     * @param deleteConverParams 删除会话列表参数
     */
    private deleteConversion(deleteConverParams: mproto.IReqDeleteConversion) {
        if (!deleteConverParams) {
            return;
        }
        console.log("deleteConverParams == ", deleteConverParams);

        this.send(mproto.MessageID.REQ_DELETE_CONVERSION, deleteConverParams);
    }

    /**
     * 发送快捷回复参数
     * @param quickReplyParams 快捷回复参数
     */
    private sendGetQuikReply(quickReplyParams: mproto.IReqGetQuickReplyList) {
        if (!quickReplyParams) {
            return;
        }
        console.log("quickReplyParams === ", quickReplyParams);
        
        this.send(mproto.MessageID.REQ_GET_QUICK_REPLY, quickReplyParams);
    }

    private send(mId, data: any): void {
        // console.log("发送", mId, data);
        this._delegate && this._delegate.sendMessage(mId, data);
    }

}



export const initSender = (dg: ISendDelegate) => {
    Sender.getInstance().init(dg);
}
