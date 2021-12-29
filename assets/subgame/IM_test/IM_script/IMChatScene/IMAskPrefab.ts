import { EventKind, events } from "../IM_tools/IM_event";
import IM_DataTool from "../IM_util/IM_DataTool";
import IM_global from "../IM_util/IM_global";
let gHandler = require("../../../../base/common/gHandler");
/**
 * 询前分类、快捷回复预制体
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class IMAskPrefab extends cc.Component {

    @property({ type: cc.Label, tooltip: "提示字" })
    askLabel: cc.Label = null;

    askObj = null;
    //发送消息防重复点击
    isCanSendMsg: boolean = true;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    // update (dt) {}

    initialAskLabel(askObj) {
        this.askObj = askObj;
        this.askLabel.string = askObj.text;
    }

    /**
     * 点击方法
     */
    touchAskPrefab() {
        console.log("点击方法: ", this.askObj);
        let brandStr = "特斯特";

        //防重复发消息
        if (!this.isCanSendMsg) {
            return;
        }

        this.isCanSendMsg = false;
        this.scheduleOnce(() => {
            this.isCanSendMsg = true;
        }, 1);

        if (IM_global.userInfo.userType == 4) {
            let quickReplyParams = {
                serviceType: String(this.askObj.index)
            };
            console.log("quickReplyParams == ", quickReplyParams);
            //到下级
            if (this.askObj.status == 2) {
                console.log("this.askObj.status == ", this.askObj);
                let toUserInfo = IM_global.currentChat;
                let currentUser = IM_global.userInfo;
                let sendText = this.askObj.text;

                // let uuid = IM_DataTool.creatUUid();
                // let sendTime = Math.round(new Date().getTime() / 1000);
                // let sendMsgParams = {
                //     userHeadImg: currentUser.userHeadImg, userId: currentUser.userId, userNick: currentUser.userNick,
                //     toUserHeadImg: toUserInfo.toUserHeadImg, toUserId: toUserInfo.toUserId, toUserNick: toUserInfo.toUserNick,
                //     content: sendText, contentType: 1, msgType: 1, msgKind: 1, msgId: uuid, sendTime: sendTime
                // };
                // events.dispatch(EventKind.C2S_SEND_CHAT_MSG, sendMsgParams);
                events.dispatch(EventKind.FASTREPLYTOUCHEMIT,sendText);
            } else {
                events.dispatch(EventKind.C2S_REQ_GET_QUICK_REPLY, quickReplyParams);
            }
        } else {
            if (gHandler && gHandler.app) {
                if (gHandler.app.pinpai == "test") {
                    brandStr = "特斯特";
                } else if (gHandler.app.pinpai == "debi") {
                    brandStr = "德比";
                } else if (gHandler.app.pinpai == "xingba") {
                    brandStr = "杏吧";
                } else if (gHandler.app.pinpai == "yuyu") {
                    brandStr = "渔鱼";
                }
            }

            events.dispatch(EventKind.C2S_REQ_MATCH_SERVICE, {
                userId: IM_global.userInfo.userId,
                serviceType: String(this.askObj.index),
                brand: brandStr
            });
        }

    }
}
