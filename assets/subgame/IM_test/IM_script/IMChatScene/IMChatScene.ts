import IMDatabase = require("../IM_util/IM_DataBase")
import IM_Reveive = require("../IM_net/IM_receive");
import { EventKind, events } from "../IM_tools/IM_event";
import IM_global from "../IM_util/IM_global";
import IM_DataTool from "../IM_util/IM_DataTool";
import { mproto } from "../../IM_proto/im_proto_msg";
import { app } from "../IM_tools/IM_config";
let gHandler = require("../../../../base/common/gHandler");
import { closeWebSocket, resetConnetTime } from "../IM_net/IM_client";
const { ccclass, property } = cc._decorator;

@ccclass
export default class IMChatScene extends cc.Component {

    @property(cc.Prefab)
    ChatItem_me: cc.Prefab = null;
    @property(cc.Prefab)
    ChatItem_other: cc.Prefab = null;
    @property(cc.Prefab)
    ChatItem_other_p: cc.Prefab = null;
    @property(cc.Prefab)
    ChatItem_me_p: cc.Prefab = null;
    @property(cc.Prefab)
    origin: cc.Prefab = null;
    @property(cc.Prefab)
    evaluate: cc.Prefab = null;
    @property(cc.Label)
    textInputLabel: cc.Label = null;
    @property(cc.EditBox)
    textInputEdit: cc.EditBox = null;
    @property({ type: cc.Node, tooltip: "底部栏" })
    bottomNode: cc.Node = null;
    @property({ type: [cc.Prefab], tooltip: "我的订单预制体" })
    orderMePrefabArr: cc.Prefab[] = [];
    @property({ type: [cc.Prefab], tooltip: "对方订单预制体" })
    orderOtherPrefabArr: cc.Prefab[] = [];
    @property(cc.ScrollView)
    SV: cc.ScrollView = null;
    @property(cc.Node)
    tip: cc.Node = null;
    @property(cc.Node)
    view: cc.Node = null;
    @property(cc.Label)
    currentDate: cc.Label = null;
    @property(cc.Label)
    toUserNick: cc.Label = null;
    @property(cc.Sprite)
    toUserPic: cc.Sprite = null;
    @property({ type: cc.Node, tooltip: "发送图片确认节点" })
    sendImgNode: cc.Node = null;
    @property({ type: cc.Node, tooltip: "提示框" })
    promptBoxNode: cc.Node = null;
    @property({ type: cc.ScrollView, tooltip: "询前框" })
    askScroll: cc.ScrollView = null;
    @property({ type: cc.Prefab, tooltip: "询前预制体" })
    askPrefab: cc.Prefab = null;
    //endChatOrNewOrder
    @property({ type: cc.Node, tooltip: "结束会话或创建订单" })
    endChatOrNewOrderNode: cc.Node = null;
    @property({ type: cc.Node, tooltip: "结束会话按钮" })
    endChatHeadNode: cc.Node = null;
    @property({ type: cc.Node, tooltip: "快捷回复按钮" })
    fastReplyNode: cc.Node = null;
    @property({ type: cc.Node, tooltip: "关闭视图" })
    closeAskView: cc.Node = null;
    @property({ type: cc.Node, tooltip: "聊天室节点" })
    IMChatSceneNode: cc.Node = null;
    @property
    lastoffsetY: number = 0;
    @property
    currentID: string = "";//当前用户id
    @property
    unreadMsg: any[] = [];//保存未读消息
    @property
    viewBottomPos: any = null;//view的矩形盒
    @property
    spacingY: number = 15;//消息间距
    @property
    contentWidth: number = 750;//滑动区域宽度
    @property
    contentHeight: number = 10;//滑动区域高度
    @property
    startY: number = 15;//初始节点Y坐标

    @property
    isRequested: boolean = false;//是否已发起加载请求
    @property
    ItemSet: any[] = [];//保存所有的聊天项
    @property
    records: any = null;

    @property
    skipPage: number = 0; //下拉加载更多页数 从0开始
    @property
    limit: number = 20; //每次加载条数
    @property
    recordPageList: any[] = []; //记录每页消息列表数据



    touchUploadFile: boolean = true;
    //断线重连次数
    reConnectTime = 0;
    //是否收到停止重连消息
    isStopReConnect: boolean = false;
    //是否是下拉
    isPullDown: boolean = false;
    //发送消息防重复点击
    isCanSendMsg: boolean = true;


    //询前回复消息数据
    beforeAskList = [{ text: "1.充值未到账", index: 1 }, { text: "2.兑换未到账", index: 2 },
    { text: "3.活动问题", index: 3 }, { text: "4.其他", index: 4 }];
    //快捷回复
    quickReplyList = [];

    /**
     * @method 初始化聊天场景
     */
    initChatScene() {
        // let date = new Date();
        // this.currentDate.string = date.getFullYear()+"/"+date.getMonth()+"/"+date.getDate();
        // this.currentID = "123456";
        //初始化聊天记录
        // this.showMsgs();
        // console.log("this.SV.vertical == ", this.SV.vertical);

        if (!IM_global.currentChat) {
            return;
        }

        // console.log("IM_global.currentChat == ", IM_global.currentChat.toUserType);


        if (IM_global.currentChat && IM_global.currentChat.userId !== 0) {
            this.skipPage = 0;
            this.sendMsgListAction();
        }

        this.viewBottomPos = this.view.getBoundingBox();
        this.toUserNick.string = IM_global.currentChat.toUserNick;
        if (IM_global.currentChat.toUserHeadImg) {
            IM_DataTool.getPlayerHeadPictureByAtlas(IM_global.currentChat.toUserHeadImg, (error, spriteFrame) => {
                if (error) {
                    return;
                }
                this.toUserPic.spriteFrame = spriteFrame;
            })
        } else {
            cc.resources.load("IM/IM_Image/chat_reply", cc.SpriteFrame, (err, spriteFrame) => {
                this.toUserPic.spriteFrame = spriteFrame;
            });
        }
        //屏蔽第二期功能
        // return;
        console.log("IM_global.userInfo.userType == ", IM_global.userInfo.userType);

        if (IM_global.userInfo.userType == 4) {
            this.endChatHeadNode.active = true;
            this.fastReplyNode.active = true;
        } else {
            this.endChatHeadNode.active = false;
            this.fastReplyNode.active = false;
            //询前回复（只有玩家才有）
            if (IM_global.currentChat.userId == 0) {
                for (let i = 0; i < this.beforeAskList.length; i++) {
                    const askObj = this.beforeAskList[i];
                    let askItem = cc.instantiate(this.askPrefab);
                    askItem.getComponent("IMAskPrefab").initialAskLabel(askObj);
                    this.askScroll.content.addChild(askItem);
                }
                this.askScroll.node.active = true;
                this.closeAskView.active = true;
                this.bottomNode.active = false;
            }

        }

    }

    /**
     * @method 接收服务器发送的消息
     */
    receiveMsg(data: any) {
        // console.log("receiveMsg == ", data);

        //msgType  消息类型(1聊天消息, 2交易消息)
        if (data.msgType == 2) {
            this.getTradeOrderItem(data.content, 1);
        } else if (data.msgType == 1) {
            if (data.type == 1) {
                let Item = this.getMsgItem(data.content, data.status, data.sendTime);
                this.adaptation(Item);
            } else if (data.type == 2) {
                let imgUrl = app.AppImgUrl + app.AppImgPath + data.content;
                console.log("imgUrl == ", imgUrl);
                console.log("data.content == ", data.content);

                this.getPictureItem(imgUrl, data.status, 1, data.sendTime);
            }
        }

    }

    adaptation(Item: any) {
        let pos = this.SV.getContentPosition();//获取滚动内容当前的位置
        let vsize = this.view.getContentSize();//显示区域大小
        let deltaY = pos.y - this.contentHeight;//滚动内容底部Y坐标
        let value = vsize.height / 2;
        // cc.log("##################", pos.y, this.contentHeight)
        this.AddItem(Item);//添加聊天内容
        if (deltaY < -value) {
            this.unreadMsg.push(Item);//保存未读消息坐标 方便在滚动时做修改
            this.notice();
        } else {
            if (this.contentHeight >= vsize.height) this.SV.scrollToBottom();
        }
    }

    /**
     * @method 提示未读消息
     */
    notice() {
        let len = this.unreadMsg.length;
        this.tip.active = !(len == 0);
        this.tip.getComponent(cc.Label).string = len + "条消息未读";
    }

    /**
     * @method 添加聊天内容
     * @param item 聊天气泡节点
     */
    AddItem(item: any) {
        let itemHeight = item.getContentSize().height;//获得滑动条目高度
        // console.log("itemHeight == ", item.name, itemHeight);


        item.y = -this.contentHeight;//设置Y坐标
        this.contentHeight += (itemHeight + this.spacingY);//计算滑动框高度
        let content_size = cc.size(this.contentWidth, this.contentHeight);
        this.SV.content.setContentSize(content_size);
        this.SV.content.addChild(item);
        this.ItemSet.push(item);
    }

    /**
     * @method 获取当前消息框
     */
    getMsgItem(content: string, status: Number, sendTime: Number) {
        let x = cc.winSize.width / 2;
        let item = null;
        if (status == 1) {
            item = cc.instantiate(this.ChatItem_me);
            item.x = x - 5;
        } else {
            item = cc.instantiate(this.ChatItem_other);
            item.x = 5 - x;
        }
        item.getComponent("IMChatItem").setContent(content, sendTime);
        return item;
    }
    /**
     * @method 获取当前消息框
     */
    getPictureItem(content: string, status: Number, flag: Number, sendTime: Number) {
        let x = cc.winSize.width / 2;
        let item = null;
        if (status == 1) {
            item = cc.instantiate(this.ChatItem_me_p);
            item.x = x - 5;
        } else {
            item = cc.instantiate(this.ChatItem_other_p);
            item.x = 5 - x;
        }
        item.getComponent("IMChatItemP").setContent(content, status, this.node, flag, sendTime);
        return item;
    }



    //订单状态
    /**
     * const (
TStatusInitiation           = 11 // 1交易发起
TStatusStatusDealTran       = 12 // 商家处理交易请求      2商家确认  (-1商家拒绝 -2 买家取消/ 1商家接受 )
TStatusSellerSendPayWay     = 12 //              2商家发送支付方式 ()(商家确认交易的时候就发送了支付方式) 所以状态同上
TStatusBuyerSelectPayWay    = 13 // 买家选择支付方式请求       3买家选择了一种支付方式
TStatusBuyerGetPayInfo      = 14 // 获取买家支付信息请求    4获取了买家的支付信息
TStatusBuyerAReadyPay       = 15 // 买家确认付款请求        5买家选择了自己的支付信息并发送了确认付款
TStatusSellerDunning        = 16 // 商家催款请求       6商家催款
TStatusBuyerPayAgain        = 17 // 买家再次确认付款      7买家再次确认付款
TStatusSellerConfirmReceive = 18 // 商家确认收款请求     8商家确认收款

)


     */
    /**
     * 获取交易消息
     * @param content 
     * @param flag 1接受新消息，2历史
     */
    getTradeOrderItem(content: string, flag: number) {
        if (content.length > 0) {
            // console.log("content == ", JSON.parse(content));
            let tradeOrderObj = JSON.parse(content);
            //当前用户是否是商家
            let isSeller = IM_global.userInfo.userId == tradeOrderObj.seller_id;
            let isBuyer = IM_global.userInfo.userId == tradeOrderObj.buyer_id;
            let tradeStatus = tradeOrderObj.transaction_status;
            let x = cc.winSize.width / 2;
            // console.log("tradeStatus: ", tradeStatus);

            switch (tradeStatus) {
                //商家接受、拒绝订单
                case 11:
                    if (isSeller) {
                        let orderPrefab1 = cc.instantiate(this.orderMePrefabArr[0]);
                        orderPrefab1.getComponent("OrderPrefab").updateOrderPrefab1(tradeOrderObj);
                        orderPrefab1.x = x - 5;
                        let orderPrefab2 = cc.instantiate(this.orderOtherPrefabArr[1]);
                        orderPrefab2.getComponent("OrderPrefab").updateOrderPrefab2(tradeOrderObj);
                        orderPrefab2.x = 5 - x;
                        if (flag == 1) {
                            this.adaptation(orderPrefab1);
                            this.adaptation(orderPrefab2);
                        } else {
                            this.adaptation2(orderPrefab2, true);
                            this.adaptation2(orderPrefab1);
                        }
                    } else {
                        let orderPrefab1 = cc.instantiate(this.orderOtherPrefabArr[0]);
                        orderPrefab1.getComponent("OrderPrefab").updateOrderPrefab1(tradeOrderObj);
                        orderPrefab1.x = 5 - x;

                        let orderPrefab2 = cc.instantiate(this.orderMePrefabArr[1]);
                        orderPrefab2.getComponent("OrderPrefab").updateOrderPrefab2(tradeOrderObj);
                        orderPrefab2.x = x - 5;

                        if (flag == 1) {
                            this.adaptation(orderPrefab1);//添加聊天内容
                            this.adaptation(orderPrefab2);//添加聊天内容
                        } else {
                            this.adaptation2(orderPrefab2, true);
                            this.adaptation2(orderPrefab1);
                        }

                    }
                    break;
                //玩家确认付款或取消订单
                case 12:
                    let order_status = tradeOrderObj.order_status;
                    //商家拒绝订单
                    if (order_status == 3) {
                        let contents = "对不起，该订单已取消";
                        let items = this.getMsgItem(contents, 1, tradeOrderObj.sendTime);
                        if (isBuyer) {
                            items = this.getMsgItem(contents, 2, tradeOrderObj.sendTime);
                        }
                        if (flag == 1) {
                            this.adaptation(items);
                        } else {
                            this.adaptation2(items);
                        }
                        return;
                    }

                    if (isSeller) {
                        let orderPrefab3 = cc.instantiate(this.orderMePrefabArr[2]);
                        orderPrefab3.getComponent("OrderPrefab").updateOrderPrefab3(tradeOrderObj);
                        orderPrefab3.x = x - 5;
                        if (flag == 1) {
                            this.adaptation(orderPrefab3);//添加聊天内容
                        } else {
                            this.adaptation2(orderPrefab3);
                        }
                    } else {
                        let orderPrefab3 = cc.instantiate(this.orderOtherPrefabArr[2]);
                        orderPrefab3.getComponent("OrderPrefab").updateOrderPrefab3(tradeOrderObj);
                        orderPrefab3.x = 5 - x;
                        if (flag == 1) {
                            this.adaptation(orderPrefab3);//添加聊天内容
                        } else {
                            this.adaptation2(orderPrefab3);
                        }
                    }
                    break;
                //商家确认收到付款
                case 15:
                    if (isBuyer) {
                        let orderPrefab4 = cc.instantiate(this.orderMePrefabArr[3]);
                        orderPrefab4.getComponent("OrderPrefab").updateOrderPrefab4(tradeOrderObj);
                        orderPrefab4.x = x - 5;
                        let content = "正在确认到款情况，请稍后";
                        let item = this.getMsgItem(content, 2, tradeOrderObj.sendTime);
                        if (flag == 1) {
                            this.adaptation(orderPrefab4);//添加聊天内容
                            this.adaptation(item);
                        } else {
                            this.adaptation2(item, true);
                            this.adaptation2(orderPrefab4);
                        }

                    } else {
                        let orderPrefab4 = cc.instantiate(this.orderOtherPrefabArr[3]);
                        orderPrefab4.getComponent("OrderPrefab").updateOrderPrefab4(tradeOrderObj);
                        orderPrefab4.x = 5 - x;

                        let content = "正在确认到款情况，请稍后";
                        let item = this.getMsgItem(content, 1, tradeOrderObj.sendTime);
                        if (flag == 1) {
                            this.adaptation(orderPrefab4);
                            this.adaptation(item);
                        } else {
                            this.adaptation2(item, true);
                            this.adaptation2(orderPrefab4);
                        }
                    }
                    break;
                case 18:
                    let contents = "我已确认收到付款，已为您充值" + tradeOrderObj.amount + "金币，请返回游戏中查收！期待再次为您服务！";
                    let items = this.getMsgItem(contents, 1, tradeOrderObj.sendTime);
                    if (isBuyer) {
                        items = this.getMsgItem(contents, 2, tradeOrderObj.sendTime);
                    }
                    if (flag == 1) {
                        this.adaptation(items);
                    } else {
                        this.adaptation2(items);
                    }
                    break;
                case 24:
                    //买家取消付款
                    let content = "您好，我已取消付款";
                    let item = this.getMsgItem(content, 1, tradeOrderObj.sendTime);
                    if (isSeller) {
                        item = this.getMsgItem(content, 2, tradeOrderObj.sendTime);
                    }
                    if (flag == 1) {
                        this.adaptation(item);
                    } else {
                        this.adaptation2(item);
                    }
                    break;
                default:
                    break;
            }
        }

    }

    //适配加载历史数据的列表
    adaptation2(Item: any, isOther?: boolean) {
        // console.log("ItemName: ", Item.name);

        Item.y = -10;
        let Item_Size = Item.getContentSize();//获取消息框尺寸
        // console.log("Item_Size == ", Item_Size);

        for (let i = 0; i < this.ItemSet.length; ++i) {
            this.ItemSet[i].y -= (Item_Size.height + this.spacingY)
        }
        this.contentHeight += (Item_Size.height + this.spacingY);//计算滑动框高度
        let content_size = cc.size(this.contentWidth, this.contentHeight);
        // console.log("contentSize: ", content_size);

        this.SV.content.setContentSize(content_size);
        this.SV.content.addChild(Item);
        this.ItemSet.push(Item);
        if (isOther) return;
        this.getRecords();
    }

    getRecords() {
        let msg = this.records.pop();//最近的一条记录
        // console.log("this.records.length11: ", this.records.length);
        // console.log("msg == ", msg);

        if (!msg) {
            // console.log("this.SV.content.height == ", this.SV.content.height);
            // console.log("isPullDown == ", this.isPullDown);
            console.log(this.contentHeight);


            this.isRequested = false;
            if (!this.isPullDown) {
                if (this.SV.content.height > 1123) {
                    this.SV.scrollToBottom();
                }
            }

            return;
        }
        let chatStatus = IM_global.userInfo.userId == msg.userId ? 1 : 2;
        let sendTime = msg.sendTime;
        if (msg.msgType == 2) {
            this.getTradeOrderItem(msg.content, 2);
        } else if (msg.contentType == 1) {
            let Item = this.getMsgItem(msg.content, chatStatus, sendTime);
            this.adaptation2(Item);
        } else if (msg.contentType == 2) {
            let imgUrl = app.AppImgUrl + app.AppImgPath + msg.content;
            // console.log("msg.contentType == 2", imgUrl, chatStatus);
            this.getPictureItem(imgUrl, chatStatus, 2, sendTime);
        }
        // this.SV.scrollToBottom();
    }

    //加载历史聊天记录
    loadHistroyRecord(records: any) {
        this.records = records;
        this.getRecords();
    }

    scrollEvent() {
        let offsetY = this.SV.getScrollOffset().y;
        // console.log("scrollEvent === : ", this.contentHeight);

        if (offsetY < -50) {//下拉加载
            console.log("this.isRequested==", this.isRequested);
            this.isPullDown = true;
            if (!this.isRequested) {
                cc.log("发起加载请求")
                this.sendMsgListAction();
                this.isRequested = true;
            }
        } else {
            this.isPullDown = false;
        }

        if (this.unreadMsg.length == 0) return;
        for (let i = 0; i < this.unreadMsg.length; ++i) {
            let item = this.unreadMsg[i];
            if (item.getPosition().y + offsetY > this.viewBottomPos.y) {//表示已经滚动到视图上部
                this.unreadMsg.splice(i, 1);//以显示从未读消息中删除 
            }
        }


        this.notice();//更新未读消息提示
    }

    /**
     * @method 初始化聊天记录
     */
    showMsgs() {
        let Msgs = IMDatabase.getNewMsgsById(this.currentID);
        if (Msgs.length == 0) return;
        for (let i = 0; i < Msgs.length; ++i) {
            let Item = this.getMsgItem(Msgs[i].msg, Msgs[i].status, Msgs[i].sendTime);
            this.AddItem(Item);
        }
        this.SV.scrollToBottom();
        this.tip.active = false;
    }

    /**
    * @method 显示全部未读消息
    */
    jumpToButtom() {
        console.log("this.contentHeight: ", this.contentHeight);

        this.SV.scrollToBottom();
        this.tip.active = false;
    }

    showPicture(spriteFrame) {
        let obj = cc.instantiate(this.origin);
        obj.getComponent("IMOriginalPicture").init(spriteFrame);
        this.node.addChild(obj);
    }

    option() {
        let evaluate = cc.instantiate(this.evaluate);
        this.node.addChild(evaluate);
    }

    back() {
        //断线重连时，不能返回大厅
        if (this.isStopReConnect) {
            return;
        }
        if (this.reConnectTime > 0) {
            return;
        }
        // cc.director.loadScene("IMHallScene");
        this.IMChatSceneNode.active = false;
        //还原数据
        events.dispatch(EventKind.BACKTOHALLSCENE, {});
        this.recoverDataAction();
        console.log("返回列表")
    }

    /**
     * 返回房间列表时，还原数据
     */
    recoverDataAction() {
        this.askScroll.node.active = false;
        this.closeAskView.active = false;
        this.recordPageList = [];
        this.askScroll.content.removeAllChildren();
        this.bottomNode.active = true;
        this.SV.content.removeAllChildren();
        IM_global.isInRoom = false;
        this.unreadMsg = [];
        this.SV.content.removeAllChildren();
        this.contentHeight = 10;
        let content_size = cc.size(this.contentWidth, this.contentHeight);
        this.SV.content.setContentSize(content_size);
        this.skipPage = 0;
    }

    onLoad() {
        console.log("onLoad222");
        // this.initChatScene();
        this.responseAction();
        cc.game.on(cc.game.EVENT_HIDE, this.gameHideBackgroundAction, this);
        cc.game.on(cc.game.EVENT_SHOW, this.gameShowAction, this);
    }

    onDestroy() {
        this.removeListenerAction();
        cc.game.off(cc.game.EVENT_HIDE, this.gameHideBackgroundAction, this);
        cc.game.off(cc.game.EVENT_SHOW, this.gameShowAction, this);
    }

    /**
     * 监听收到消息
     */
    responseAction() {
        events.register(EventKind.S2C_CHAT_MSG_LIST, "IMChatScene", this.receiveChatMsgListAction.bind(this));
        events.register(EventKind.S2C_SEND_CHAT_MSG, "IMChatScene", this.receiveSendChatMsgAction.bind(this));
        events.register(EventKind.S2C_RECEIVE_CHAT_MSG, "IMChatScene", this.receiveChatMsgAction.bind(this));
        events.register(EventKind.S2C_READ_MSG, "IMChatScene", this.receiveReadMsgAction.bind(this));
        events.register(EventKind.S2C_MSG_ERR_MSG_PUSH, "IMChatScene", this.onErrorMsgAction.bind(this));
        events.register(EventKind.Get_LocalImgPath, "IMChatScene", this.getLocalImgPath.bind(this));
        events.register(EventKind.Get_ImgPath_Native, "IMChatScene", this.getImagPathNative.bind(this));
        events.register(EventKind.EVENT_ONERROR, "IMChatScene", this.networkBreakDownAction.bind(this));
        events.register(EventKind.EVENT_ONOPEN, "IMChatScene", this.networkOnOpenAction.bind(this));
        events.register(EventKind.S2C_RESP_DELETE_CONVERSION, "IMChatScene", this.respDeleteConversion.bind(this));
        events.register(EventKind.S2C_RESP_GET_QUICK_REPLY, "IMChatScene", this.getQuickReplyList.bind(this));
        events.register(EventKind.FASTREPLYTOUCHEMIT, "IMChatScene", this.fastReplyTouchEmit.bind(this));
        events.register(EventKind.SHOWCHATSCENE, "IMChatScene", this.showChatSceneAction.bind(this));
    }

    /**
     * 移除监听
     */
    removeListenerAction() {
        events.unregister(EventKind.S2C_SEND_CHAT_MSG, "IMChatScene");
        events.unregister(EventKind.S2C_CHAT_MSG_LIST, "IMChatScene");
        events.unregister(EventKind.S2C_RECEIVE_CHAT_MSG, "IMChatScene");
        events.unregister(EventKind.S2C_READ_MSG, "IMChatScene");
        events.unregister(EventKind.S2C_MSG_ERR_MSG_PUSH, "IMChatScene");
        events.unregister(EventKind.Get_LocalImgPath, "IMChatScene");
        events.unregister(EventKind.Get_ImgPath_Native, "IMChatScene");
        events.unregister(EventKind.EVENT_ONERROR, "IMChatScene");
        events.unregister(EventKind.EVENT_ONOPEN, "IMChatScene");
        events.unregister(EventKind.S2C_RESP_DELETE_CONVERSION, "IMChatScene");
        events.unregister(EventKind.S2C_RESP_GET_QUICK_REPLY, "IMChatScene");
        events.unregister(EventKind.FASTREPLYTOUCHEMIT, "IMChatScene");
        events.unregister(EventKind.SHOWCHATSCENE, "IMChatScene");
    }

    /**
     * 显示当前场景
     */
    showChatSceneAction() {
        console.log("showChatSceneAction 222== ");

        this.initChatScene();
    }
    /**
    * 消息错误提示
    * @param errMsgData 
    */
    onErrorMsgAction(errMsgData: mproto.IErrMsg) {
        console.log("errMsgData == ", errMsgData);

        //订单完结消息
        if (errMsgData.msgId == 103) {
            gHandler.eventMgr && gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "改订单已完结");
        } else if (errMsgData.msgId == 112) {
            gHandler.eventMgr && gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, errMsgData.msg);
        }
    }

    /**
     * 发送获取消息列表方法
     */
    sendMsgListAction() {
        let currentUser = IM_global.userInfo;
        let getChatMsgParams = { userId: currentUser.userId, toUserId: IM_global.currentChat.toUserId, skip: this.skipPage, limit: this.limit };
        console.log("getChatMsgParams == ", getChatMsgParams);
        events.dispatch(EventKind.C2S_CHAT_MSG_LIST, getChatMsgParams);
    }

    /**
     * 发送消息给别人
     */
    chatWithUsersAction() {
        //断线重连期间，不能发送聊天消息
        if (this.reConnectTime > 0) {
            return;
        }
        //防重复发消息
        if (!this.isCanSendMsg) {
            return;
        }
        //发送消息给别人
        let uuid = IM_DataTool.creatUUid();
        let currentUser = IM_global.userInfo;
        let toUserInfo = IM_global.currentChat;
        let sendText = this.textInputLabel.string;
        let sendTime = Math.round(new Date().getTime() / 1000);
        if (sendText == "") {
            return;
        }
        let sendMsgParams = {
            userHeadImg: currentUser.userHeadImg, userId: currentUser.userId, userNick: currentUser.userNick,
            toUserHeadImg: toUserInfo.toUserHeadImg, toUserId: toUserInfo.toUserId, toUserNick: toUserInfo.toUserNick,
            content: sendText, contentType: 1, msgType: 1, msgKind: 1, msgId: uuid, sendTime: sendTime
        };
        // console.log("sendMsgParams == ", sendMsgParams);
        events.dispatch(EventKind.C2S_SEND_CHAT_MSG, sendMsgParams);
        this.isCanSendMsg = false;
        this.scheduleOnce(() => {
            this.isCanSendMsg = true;
        }, 1);
    }

    /**
     * 获取聊天消息列表
     * @param chatListData 聊天列表数据
     */
    receiveChatMsgListAction(chatListData) {
        if (!IM_global.isInRoom) {
            return;
        }

        let chatList = chatListData.chatMsg;
        // console.log("聊天列表消息2：", this.skipPage);
        // console.log("chatList: ", chatList);
        for (let i = 0; i < chatList.length; i++) {
            const chatMsgData = chatList[i];
            // console.log("chatMsgData == ", chatMsgData);

            let chatStatus = IM_global.userInfo.userId == chatMsgData.userId ? 1 : 2;
            //消息已读
            if (!chatMsgData.isRead && chatStatus == 2) {
                events.dispatch(EventKind.C2S_READ_MSG, {
                    msgId: chatMsgData.msgId,
                    userId: chatMsgData.userId, toUserId: chatMsgData.toUserId
                });
            }
        }


        this.skipPage += chatList.length;
        chatList.reverse();


        this.recordPageList = chatList;
        this.loadHistroyRecord(chatList);


    }

    /**
     * 发送消息成功
     * @param sendChatMsgData 发送消息成功推送
     */
    receiveSendChatMsgAction(sendChatMsgData) {
        console.log("发送消息成功：", sendChatMsgData);
        this.textInputLabel.string = '';
        this.textInputEdit.string = "";
        this.textInputEdit.blur();
        this.textInputLabel.node.active = false;
        // this.textInputEdit.focus();
        let chatMsgData: mproto.ChatMsg = sendChatMsgData.chatMsg;
        let chatStatus = IM_global.userInfo.userId == chatMsgData.userId ? 1 : 2;
        let sendTime = chatMsgData.sendTime;
        this.receiveMsg({
            content: chatMsgData.content, status: chatStatus,
            type: chatMsgData.contentType, sendTime: sendTime,
            msgType: chatMsgData.msgType
        });

        if (IM_global.currentChat.userId == 0) {
            this.bottomNode.active = true;
            this.askScroll.node.active = false;
            this.closeAskView.active = false;
            IM_global.currentChat = chatMsgData;
            this.toUserNick.string = chatMsgData.toUserNick;
            if (chatMsgData.toUserHeadImg) {
                IM_DataTool.getPlayerHeadPictureByAtlas(chatMsgData.toUserHeadImg, (error, spriteFrame) => {
                    if (error) {
                        return;
                    }
                    this.toUserPic.spriteFrame = spriteFrame;
                })
            }
        }

        if (IM_global.userInfo.userType == 4) {
            this.askScroll.node.active = false;
            this.closeAskView.active = false;
        }
    }

    /**
     * 收到聊天消息方法
     * @param {*} chatMsgData 收到聊天消息
     */
    receiveChatMsgAction(receiveMsgData) {
        console.log("receiveMsgData: ", receiveMsgData);
        if (!IM_global.isInRoom) {
            return;
        }
        console.log("IM_global.isInRoom == ", IM_global.isInRoom);
        let chatMsgData: mproto.ChatMsg = receiveMsgData.chatMsg;

        //当收到的消息是当前对象时，更新消息列表
        if (IM_global.currentChat && chatMsgData.userId == IM_global.currentChat.toUserId) {

            let playerUrl = IM_DataTool.loadAudioAction(1);
            IM_DataTool.playAudioAction(playerUrl, IM_global.isPlayrAudio);

            let chatStatus = IM_global.userInfo.userId == chatMsgData.userId ? 1 : 2;
            let sendTime = chatMsgData.sendTime;
            events.dispatch(EventKind.C2S_READ_MSG, {
                msgId: chatMsgData.msgId,
                userId: chatMsgData.userId,
                toUserId: chatMsgData.toUserId
            });
            this.receiveMsg({
                content: chatMsgData.content, status: chatStatus,
                type: chatMsgData.contentType, sendTime: sendTime,
                msgType: chatMsgData.msgType
            });
        }
    }

    /**
     * 消息已读成功回调
     * @param {*} readMsgData 消息已读回调
     */
    receiveReadMsgAction(readMsgData) {
        console.log("消息已读成功：");
    }

    /**
     * 点击发送图片按钮
     */
    touchImgBtnAction() {
        if (this.isStopReConnect) {
            return;
        }
        if (cc.sys.isNative) {
            this.sendImgNativeAction();
        } else {
            IM_DataTool.uploadImgWeb();
        }
        // this.schedule(this.showSendingImgAction, 2, cc.macro.REPEAT_FOREVER);
    }

    showSendingImgAction() {
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "图片发送中");
    }

    /**
     * 原生发送图片方法
     */
    sendImgNativeAction() {
        if (!this.touchUploadFile) {
            return;
        } else {
            this.touchUploadFile = false;
            this.scheduleOnce(() => {
                this.touchUploadFile = true;
            }, 3);
        }

        if (cc.sys.os == cc.sys.OS_ANDROID) {
            //查看获取权限 true 已获取权限，false 暂无权限（）
            let permission = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "isHasStoragePermission", "()Z");
            if (permission) {
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "selectImg", "(Ljava/lang/String;)V", app.UploadImgURL);
            } else {
                //动态请求权限
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "requestPermissionAction", "()V");
            }
        } else if (cc.sys.os == cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod("AppController",
                "selectImg:", app.UploadImgURL);
        }
    }

    /**
     * 收到图片信息
     * @param imgDataObj 图片路径
     */
    getLocalImgPath(imgDataObj) {
        console.log("getLocalImgPath == ", imgDataObj);
        if (imgDataObj.imgData) {
            this.sendImgNode.active = true;
            // this.unschedule(this.showSendingImgAction);
        }
    }

    /**
     * 原生上传图片成功回调
     * @param data 
     */
    getImagPathNative(imgDataObj) {
        if (imgDataObj) {
            this.sendImgNode.active = true;
            // this.unschedule(this.showSendingImgAction);
        }
    }

    /**
     * 断网监听
     * @param data 
     */
    networkBreakDownAction(data) {
        this.reConnectTime++;
        IM_global.isNetWorkBreakDown = true;
        console.log("reConnectTime: ", this.reConnectTime);
        //断线后，不能输入文字
        this.textInputEdit.node.active = false;
        if (this.reConnectTime >= 30) {
            this.showStopConnectView();
            closeWebSocket();
            return;
        }
        gHandler && gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "网络断开，正在努力连接中");
    }

    /**
     * 网络连接成功监听
     */
    networkOnOpenAction() {
        if (IM_global.isNetWorkBreakDown) {
            this.reConnectTime = 0;
            IM_global.isNetWorkBreakDown = false;
            this.textInputEdit.node.active = true;
            //刷新聊天列表
            this.SV.content.removeAllChildren();
            this.contentHeight = 10;
            let content_size = cc.size(this.contentWidth, this.contentHeight);
            this.SV.content.setContentSize(content_size);
            this.skipPage = 0;
            this.sendMsgListAction();
            resetConnetTime();
        }

    }

    /**
     * 停止重连
     */
    showStopConnectView() {
        let promptStr = "连接超时，请您返回游戏大厅后重新进入";
        this.showPromptBoxAction(promptStr);
        this.isStopReConnect = true;
        this.SV.vertical = false;
        this.textInputEdit.node.active = false;
    }

    /**
   * 显示提示框
   * @param 弹框提示信息
   */
    showPromptBoxAction(promptLabelStr: string) {
        let promptLabelNode = this.promptBoxNode.getChildByName('promptLabel');
        let promptLabel = promptLabelNode.getComponent(cc.Label);
        promptLabel.string = promptLabelStr;
        this.promptBoxNode.runAction(
            cc.scaleTo(0.2, 1)
        );
    }

    /**
     * 进入后台
     */
    gameHideBackgroundAction() {
        console.log("进入后台==========");
        //移除监听
        this.removeListenerAction();
    }

    /**
    * 隐藏提示框
    */
    hidePromptBoxAction() {
        this.promptBoxNode.runAction(
            cc.scaleTo(0.2, 0)
        );
    }

    /**
    * 弹框确认按钮事件
    */
    confirmBtnAction() {
        this.hidePromptBoxAction();
        if (this.isStopReConnect) {
            cc.director.loadScene("hall");
            gHandler.reflect.setOrientation("landscape", 1334, 750);
            return;
        }
    }

    /**
     * 发送进入房间消息
     */
    gameShowAction() {
        //进入房间发送消息给后台
        //重新监听
        this.responseAction();
    }

    /**
     * 结束会话或创建订单
     */
    endOrCreateOrderBtnAction() {
        console.log("IM_global.isCanTouchEnd == ", IM_global.isCanTouchEnd);

        if (!IM_global.isCanTouchEnd) {
            this.scheduleOnce(() => {
                IM_global.isCanTouchEnd = true;
            }, 2);
            return;
        }
        console.log("显示结束会话或创建订单");
        this.endChatOrNewOrderNode.active = true;
        this.closeAskView.active = true;
        IM_global.isCanTouchEnd = false;
    }

    /**
     * 快捷回复方法
     */
    fastReplyBtnAction() {
        console.log("快捷回复");
        this.askScroll.content.removeAllChildren();
        for (let i = 0; i < this.beforeAskList.length; i++) {
            const askObj = this.beforeAskList[i];
            let askItem = cc.instantiate(this.askPrefab);
            askItem.getComponent("IMAskPrefab").initialAskLabel(askObj);
            this.askScroll.content.addChild(askItem);
        }
        this.askScroll.node.active = true;
        this.closeAskView.active = true;
        if (this.SV.content.height > 1123) {
            this.SV.scrollToBottom();
            this.SV.node.runAction(cc.moveBy(0.2, 0, this.askScroll.node.height - 100));
        }
    }

    /**
     * 生成订单或结束对话
     * @param index 1 生成订单 2 结束对话
     */
    endTalkOrCreateOrderBtnAction(touchEvent, index) {
        // console.log("index == ", index);

        this.endChatOrNewOrderNode.active = false;
        this.closeAskView.active = false;
        //生成订单
        if (index == 1) {

        } else {
            //结束会话，删除会话列表
            //conversionId userId toUserId
            //上级代理不能删除
            if (IM_global.currentChat.toUserType == 3) {
                gHandler.eventMgr && gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "上级代理不能删除！");
                return;
            }
            let deleteParams1 = { userId: IM_global.currentChat.userId, toUserId: IM_global.currentChat.toUserId };
            let deleteParams2 = { userId: IM_global.currentChat.toUserId, toUserId: IM_global.currentChat.userId };
            events.dispatch(EventKind.C2S_REQ_DELETE_CONVERSION, deleteParams1);
            events.dispatch(EventKind.C2S_REQ_DELETE_CONVERSION, deleteParams2);
        }
    }

    /**
     * 收到删除会话推送
     * @param deleteData 
     */
    respDeleteConversion(deleteData: mproto.IRespDeleteConversion) {
        if (deleteData) {
            console.log("deleteData == ", deleteData.conversion.userId);
            //点击结束会话，返回大厅
            if (deleteData.conversion.userId == IM_global.userInfo.userId) {
                this.back();
            }
        }

    }

    /**
     * 获取快速回复列表
     * @param quickReplyListData 
     */
    getQuickReplyList(quickReplyListData: mproto.IRespGetQuickReplyList) {
        console.log("quickReplyListData =", quickReplyListData);
        let quickReplyListContent = quickReplyListData.content;
        this.quickReplyList = [];
        if (quickReplyListContent.length > 0) {
            for (let i = 0; i < quickReplyListContent.length; i++) {
                const quickElement = quickReplyListContent[i];
                let index = i + 1;
                //{ text: "1.充值未到账", index: 1 }
                this.quickReplyList.push({ text: quickElement, index: index, status: 2 });
            }

            this.askScroll.content.removeAllChildren();
            for (let i = 0; i < this.quickReplyList.length; i++) {
                const askObj = this.quickReplyList[i];
                let askItem = cc.instantiate(this.askPrefab);
                askItem.getComponent("IMAskPrefab").initialAskLabel(askObj);
                this.askScroll.content.addChild(askItem);
            }
            this.askScroll.node.active = true;
            this.closeAskView.active = true;
        } else {
            gHandler.eventMgr && gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "您还未添加改分类的快捷回复！");
            this.askScroll.node.active = false;
            this.closeAskView.active = false;
            if (this.SV.content.height > 1123) {
                this.SV.scrollToBottom();
                this.SV.node.runAction(cc.moveBy(0.1, 0, -(this.askScroll.node.height - 100)));
            }
        }

    }

    /**
     * 点击快捷回复，触发输入框
     * @param sendText 
     */
    fastReplyTouchEmit(sendText) {
        console.log("sendText == ", sendText);
        this.textInputLabel.string = sendText;
        this.textInputEdit.string = sendText;
        this.textInputEdit.focus();
        this.askScroll.node.active = false;
        this.closeAskView.active = false;
        if (this.SV.content.height > 1123) {
            this.SV.scrollToBottom();
            this.SV.node.runAction(cc.moveBy(0.1, 0, -(this.askScroll.node.height - 100)));
        }
    }

    /**
     * 点击空白处关闭视图
     */
    closeViewAcion() {
        if (this.askScroll.node.active) {
            this.askScroll.node.active = false;
            if (this.SV.content.height > 1123) {
                this.SV.scrollToBottom();
                this.SV.node.runAction(cc.moveBy(0.1, 0, -(this.askScroll.node.height - 100)));
            }
        }

        if (this.endChatOrNewOrderNode.active) {
            this.endChatOrNewOrderNode.active = false;
        }
        this.closeAskView.active = false;
    }

}
