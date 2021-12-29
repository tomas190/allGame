/**
 * 人工代充订单预制体
 */

import { type } from "os";
import { EventKind, events } from "../../IM_tools/IM_event";
import IM_DataTool from "../../IM_util/IM_DataTool";
import IM_global from "../../IM_util/IM_global";

const { ccclass, property } = cc._decorator;

@ccclass
export default class OrderPrefab2 extends cc.Component {
    @property({ type: cc.Label, tooltip: "标题" })
    orderTitle: cc.Label = null;
    @property({ type: cc.Label, tooltip: "商家id" })
    merchantIdLabel: cc.Label = null;
    @property({ type: cc.Label, tooltip: "玩家id" })
    playerIdLabel: cc.Label = null;
    @property({ type: cc.Label, tooltip: "订单金额" })
    orderPriceLabel: cc.Label = null;
    @property({ type: [cc.Node], tooltip: "确认按钮,2灰显" })
    acceptOrderBtnArr: cc.Node[] = [];
    @property({ type: [cc.Node], tooltip: "取消按钮，2灰显" })
    cancelOrderBtnArr: cc.Node[] = [];

    orderData = null;
    /**
     * 确认订单
     */
    confirmOrderAction() {
        console.log("确认订单：", this.orderData);
        if (this.orderData) {
            //1   初始化 2   正在交易 3 交易结束
            let orderStatus = this.orderData.order_status;
            let tradeStatus = this.orderData.transaction_status;
            let currentUser = IM_global.userInfo;
            let isSeller = currentUser.userId == this.orderData.seller_id;
            let isBuyer = currentUser.userId == this.orderData.buyer_id;

            if (orderStatus == 3) {
                return;
            } else {
                switch (tradeStatus) {
                    //商家接受订单/拒绝订单 12 -1商家拒绝 -2 买家取消/ 1商家接受
                    case 11:
                        if (isSeller) {
                            let contentData = {
                                transaction_id: this.orderData.transaction_id,
                                transaction_status: 12,
                                seller_id: this.orderData.seller_id,
                                buyer_id: this.orderData.buyer_id,
                                is_agree: 1,
                            }
                            let sendText = JSON.stringify(contentData);
                            this.sendTradeOrderAction(sendText);
                            //按钮变灰
                            this.comfirmBtnChangeGray();
                            this.cancelBtnChangeGray();
                        }
                        break;
                    //买家点击付款完成或者取消订单
                    case 12:
                        console.log(isBuyer);

                        if (isBuyer) {
                            let contentData = {
                                transaction_id: this.orderData.transaction_id,
                                transaction_status: 15,
                                seller_id: this.orderData.seller_id,
                                buyer_id: this.orderData.buyer_id,
                                msg_type: 2
                            }
                            let sendText = JSON.stringify(contentData);
                            this.sendTradeOrderAction(sendText);
                            //按钮变灰
                            this.cancelBtnChangeGray();
                            this.comfirmBtnChangeGray();
                        }
                        break;
                    case 15:
                        if (isSeller) {
                            let contentData = {
                                transaction_id: this.orderData.transaction_id,
                                transaction_status: 18,
                                seller_id: this.orderData.seller_id,
                                buyer_id: this.orderData.buyer_id,
                                msg_type: 2
                            }
                            let sendText = JSON.stringify(contentData);
                            this.sendTradeOrderAction(sendText);
                            this.comfirmBtnChangeGray();
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    }

    /**
     * 确认按钮状态变灰
     */
    comfirmBtnChangeGray() {
        if (this.acceptOrderBtnArr.length > 0) {
            this.acceptOrderBtnArr[0].active = false;
            this.acceptOrderBtnArr[1].active = true;
        }
    }

    /**
     * 取消按钮状态变灰
     */
    cancelBtnChangeGray() {
        if (this.cancelOrderBtnArr.length > 0) {
            this.cancelOrderBtnArr[0].active = false;
            this.cancelOrderBtnArr[1].active = true;
        }
    }

    /**
     * 发送交易消息给后台
     * @param contentData 
     */
    sendTradeOrderAction(contentData: string) {
        let currentUser = IM_global.userInfo;
        let toUserInfo = IM_global.currentChat;
        let uuid = IM_DataTool.creatUUid();
        let sendTime = Math.round(new Date().getTime() / 1000);
        let sendMsgParams = {
            userHeadImg: currentUser.userHeadImg, userId: currentUser.userId,
            userNick: currentUser.userNick, toUserHeadImg: toUserInfo.toUserHeadImg,
            toUserId: toUserInfo.toUserId, toUserNick: toUserInfo.toUserNick,
            content: contentData, msgType: 2, msgKind: 1,
            msgId: uuid, sendTime: sendTime
        };
        // console.log("sendMsgParams == ", sendMsgParams);
        events.dispatch(EventKind.C2S_SEND_CHAT_MSG, sendMsgParams);
    }

    /**
     * 取消订单
     * 
     */
    cancelOrderAction() {
        console.log("取消订单");
        //1   初始化 2   正在交易 3 交易结束
        let orderStatus = this.orderData.order_status;
        let tradeStatus = this.orderData.transaction_status;
        let currentUser = IM_global.userInfo;

        if (orderStatus == 3) {
            this.cancelBtnChangeGray();
            this.comfirmBtnChangeGray();
            return;
        } else {
            switch (tradeStatus) {
                //商家接受订单/拒绝订单 1/-1
                case 11:
                    let isSeller = currentUser.userId == this.orderData.seller_id;
                    if (isSeller) {
                        let contentData = {
                            transaction_id: this.orderData.transaction_id,
                            transaction_status: 12,
                            seller_id: this.orderData.seller_id,
                            buyer_id: this.orderData.buyer_id,
                            is_agree: -1,
                        }
                        let sendText = JSON.stringify(contentData);
                        this.sendTradeOrderAction(sendText);
                        this.cancelBtnChangeGray();
                        this.comfirmBtnChangeGray();
                    }
                    break;
                case 12:
                    let isBuyer = currentUser.userId == this.orderData.buyer_id;
                    if (isBuyer) {
                        let contentData = {
                            transaction_id: this.orderData.transaction_id,
                            transaction_status: 24,
                            seller_id: this.orderData.seller_id,
                            buyer_id: this.orderData.buyer_id,
                            msg_type: 2
                        }
                        let sendText = JSON.stringify(contentData);
                        this.sendTradeOrderAction(sendText);
                        this.cancelBtnChangeGray();
                        this.comfirmBtnChangeGray();
                    }
                    break;
                default:
                    break;
            }
        }

    }


    /**
    * 更新订单视图
    * @param orderData 
    */
    updateOrderPrefab1(orderData) {
        let tradeStatus = orderData.transaction_status;
        switch (tradeStatus) {
            case 11:
                this.orderTitle.string = "亲爱的您好！欢迎光临小店，我是" + orderData.seller_name + "，很高兴为您服务！";
                break;
            case 15:
                //正在确认到款情况，请稍后！
                this.orderTitle.string = "正在确认到款情况，请稍后！";
                break;
            case 18:
                this.orderTitle.string = "我已确认收到付款，已为您充值" + orderData.amount
                    + "金币，请返回游戏中查收！期待再次为您服务！";
                break;
            default:
                break;
        }
    }
    /**
    * 更新订单视图
    * 
    *     
    * @param orderData 
    */
    updateOrderPrefab2(orderData) {
        // console.log("更新订单视图 ");
        this.orderData = orderData;
        this.orderTitle.string = "你好，" + "请求充值" + orderData.amount + "游戏币，请确认订单信息！";
        this.orderPriceLabel.string = orderData.amount;
        this.merchantIdLabel.string = orderData.seller_id;
        this.playerIdLabel.string = orderData.buyer_id;
    }
    /**
    * 更新订单视图
    * @param orderData 
    */
    updateOrderPrefab3(orderData) {
        console.log("更新订单视图 ");
        this.orderData = orderData;
        // this.orderTitle.string = "订单已经接受，请务必根据提供的交易方式和充值金额进行付款。付款完成后，请点击下方按钮。";
        this.orderPriceLabel.string = orderData.amount;
    }
    /**
    * 更新订单视图
    * @param orderData 
    */
    updateOrderPrefab4(orderData) {
        this.orderData = orderData;
        this.orderTitle.string = "您好，我已经完成付款" + orderData.amount + "元，请您查收！";
    }
}
