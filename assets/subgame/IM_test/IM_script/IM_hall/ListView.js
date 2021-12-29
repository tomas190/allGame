// 聊天列表

const { mproto } = require("../../IM_proto/im_proto_msg");
const { closeWebSocket, resetConnetTime } = require("../IM_net/IM_client");
const { events, EventKind } = require("../IM_tools/IM_event");
const { default: IM_DataTool } = require("../IM_util/IM_DataTool");
const { default: IM_global } = require("../IM_util/IM_global");
let gHandler = require("gHandler");


var ItemData = cc.Class({
    name: "ItemData",
    properties: {
        id: cc.Integer,
        name: cc.String,
        grade: cc.Integer

    },


});
const EventType = cc.ScrollView.EventType;

/**
 *  ListView 方向
 * @enum ListView.Direction
 */
const Direction = cc.Enum({

    HORIZONTAL: 0,
    VERTICAL: 1
});



/**
 *  循环滚动组件
 * @class ListView
 * @extends Component
 */
let ListView = cc.Class({
    extends: cc.Component,
    properties: {
        template: {
            default: null,
            type: cc.Node,
            tooltip: "跟新数据模版,可以是node节点,也可以是 prefab(手动赋值)"
        },
        updateComp: {
            default: "",
            tooltip: "跟新数据组件名"
        },

        scrollView: {
            default: null,
            type: cc.ScrollView
        },
        promptBoxNode: {
            default: null,
            type: cc.Node,
            tooltip: "提示框"
        },
        userHeadSprite: {
            default: null,
            type: cc.Sprite,
            tooltip: "玩家头像"
        },
        direction: {
            default: Direction.VERTICAL,
            type: Direction,

        },
        lblPostion: {
            default: null,
            type: cc.Label
        },
        unReadNumNode: {
            default: null,
            type: cc.Node,
            tooltip: "未读消息节点"
        },
        spawnCount: 0,              //用来循环的item的数量
        spacing: 0,                 //每个Item的之间的间隙
        bufferZone: 0,              //离StrollView中心多远之后开启循环

        _items: [],                  //缓存包装后的Item
        _updateTimer: 0,             //记录上次更新的时间
        _updateInterval: 0.2,        //记录跟新的间隙

        _content: null,              //ScrollView的容器

        _deadZone: 2,                //死区,滑动在这个范围内,不更新
        _lastContentPos: cc.v2(0, 0), //和死区配合使用


        _offset: 0,                  //
        _onFastRefresh: false,       //在设置固定位置时,要快速的滚动到相应的位置

        listLimit: 7,//每次加载数据数
        listSkip: 0,//每次加载页数
        isCanLoadMore: true, //是否调用加载更多
        isRefreshing: true, //是否刷新
        //断线重连次数
        reConnectTime: 0,
        //是否收到停止重连消息
        isStopReConnect: false,
        datas: [], //数据源
        unReadIndex: 0, //消息未读计数
        recordList: [] //记录会话列表每页数据
    },
    statics: {
        Direction: Direction,
    },
    onLoad: function () {
        cc.gg = {};
        this._content = this.scrollView.content;
        this._lastContentPos = this._content.position;
        let currentUser = IM_global.userInfo;
        if (currentUser) {
            events.dispatch(EventKind.C2S_CoversionList, { userId: currentUser.userId, skip: this.listSkip, limit: this.listLimit });
            IM_DataTool.getPlayerHeadPictureByAtlas(currentUser.userHeadImg, (error, spriteFrame) => {
                if (error) {
                    return;
                }
                this.userHeadSprite.spriteFrame = spriteFrame;
            });
        }

        this.responseAction();
        cc.game.on(cc.game.EVENT_HIDE, this.gameHideBackgroundAction, this);
        cc.game.on(cc.game.EVENT_SHOW, this.gameShowAction, this);
        //原生监听类
        let Global = require('IMGlobal');
        cc.gg.global = new Global;
    },

    onDestroy: function () {
        this.unregistAction();
        cc.game.off(cc.game.EVENT_HIDE, this.gameHideBackgroundAction, this);
        cc.game.off(cc.game.EVENT_SHOW, this.gameShowAction, this);
    },

    //用于手动初始化数据
    initialize: function (scrollView, direction, template, updateComp, datas, spawnCount, bufferZone) {

        this.scrollView = scrollView;
        this.direction = direction;
        this.template = template;
        this.updateComp = updateComp;
        this._content = scrollView.content;

        if (this.direction == Direction.VERTICAL) {
            this._content.height = this.datas.length * (this.template.height + this.spacing) + this.spacing;
            this.spawnCount = spawnCount ? spawnCount : Math.ceil(this.scrollView.height * 2 / this.template.height);
            this.bufferZone = bufferZone ? bufferZone : this.scrollView.height / 2 + this.template.height;

        } else {

            this._content.width = this.datas.length * (this.template.width + this.spacing) + this.spacing;
            this.spawnCount = spawnCount ? spawnCount : Math.ceil(this.scrollView.width * 2 / this.template.width);
            this.bufferZone = bufferZone ? bufferZone : this.scrollView.width / 2 + this.template.width;
        }

        //可以重复使用
        this._items = [];
        this.datas = [];
        // this._content.removeAllChildren(true);
        // this.bindData(datas);
    },


    responseAction: function () {
        events.register(EventKind.S2C_Conversionlist, "ListView", this.getConversionList.bind(this));
        events.register(EventKind.S2C_MSG_ERR_MSG_PUSH, "ListView", this.onErrorMsgAction.bind(this));
        events.register(EventKind.S2C_RECEIVE_CHAT_MSG, "ListView", this.receiveChatMsgAction.bind(this));
        events.register(EventKind.S2C_GET_UNREAD_NUM, "ListView", this.receiveUnReadNum.bind(this));
        events.register(EventKind.EVENT_ONERROR, "ListView", this.networkBreakDownAction.bind(this));
        events.register(EventKind.EVENT_ONOPEN, "ListView", this.networkOnOpenAction.bind(this));
        events.register(EventKind.S2C_RESP_DELETE_CONVERSION, "ListView", this.respDeleteConversion.bind(this));
        events.register(EventKind.BACKTOHALLSCENE, "ListView", this.backToIMHallAction.bind(this));
    },

    unregistAction: function () {
        events.unregister(EventKind.S2C_Conversionlist, "ListView");
        events.unregister(EventKind.S2C_MSG_ERR_MSG_PUSH, "ListView");
        events.unregister(EventKind.S2C_RECEIVE_CHAT_MSG, "ListView");
        events.unregister(EventKind.S2C_GET_UNREAD_NUM, "ListView");
        events.unregister(EventKind.EVENT_ONERROR, "ListView");
        events.unregister(EventKind.EVENT_ONOPEN, "ListView");
        events.unregister(EventKind.S2C_RESP_DELETE_CONVERSION, "ListView");
        events.unregister(EventKind.BACKTOHALLSCENE, "ListView");
    },





    /**
     * 聊天列表
     * @param {*} listData 
     */
    getConversionList: function (listData) {
        if (listData && listData.conversions) {
            let conversionsList = listData.conversions;
            // console.log("聊天列表 == ", listData);
            this.listSkip = listData.skip ? listData.skip : 0;
            console.log("当前页数：", this.listSkip);
            // console.log("listData ==", listData);

            if (this.listSkip == 0) {
                this._items = [];
                this.datas = [];
                this._content.removeAllChildren(true);
                let conversionLists = [{ toUserNick: "客服", userId: 0 }];
                conversionLists = conversionLists.concat(conversionsList);
                if (conversionsList.length > 0) {
                    this.listSkip += conversionsList.length;
                    // console.log("this.listSkip 11: ", this.listSkip);
                }
                // console.log("conversionLists == ", conversionLists);
                this.recordList = conversionsList;
                //客服不用显示客户会话列表
                if (IM_global.userInfo.userType == 4) {
                    conversionsList && this.bindData(conversionsList);
                    return;
                }
                this.bindData(conversionLists);
            } else {
                if (conversionsList && conversionsList.length > 0) {
                    this.listSkip += conversionsList.length;
                    let filterList = this.filterNewListAction(conversionsList);
                    console.log("filterList 1111== ", filterList);
                    this.bindData(filterList);
                    if (conversionsList.length < this.listLimit) {
                        this.isCanLoadMore = false;
                    } else {
                        this.isCanLoadMore = true;
                    }
                } else {
                    this.isCanLoadMore = false;
                }
            }
            this.recordList = conversionsList;
        }
    },

    /**
     * 删除会话列表中的相同数据
     * @param {*} listArr 后台返回会话列表
     */
    filterNewListAction(listArr) {
        console.log("this.recordList == ", this.recordList);
        console.log("listArr == ", listArr);
        let newListArr = [];
        if (listArr && this.recordList && this.recordList.length > 0 && listArr.length > 0) {
            let newArr = [];
            //测试
            // listArr.splice(0, 1, this.recordList[this.recordList.length - 1]);
            //找出相同元素
            for (let i = 0; i < listArr.length; i++) {
                for (let j = 0; j < this.recordList.length; j++) {
                    let recordObj = this.recordList[j];
                    let newObj = listArr[i];
                    if (recordObj.toUserId == newObj.toUserId) {
                        newArr.push(recordObj);
                    }
                }
            }

            //删除相同元素
            if (newArr.length > 0) {
                let idList = newArr.map(item => item.toUserId);
                console.log("idList == ", idList);
                newListArr = listArr.filter(item => {
                    return !idList.includes(item.toUserId);
                });
                // console.log("newListArr == ", newListArr);
            }

        }

        if (newListArr.length == 0) {
            newListArr = listArr;
        }
        return newListArr
    },

    /**
     * 收到聊天消息方法
     * @param {*} chatMsgData 收到聊天消息
     */
    receiveChatMsgAction: function (chatMsgData) {
        //unReadNumLabel
        //收到聊天消息播放音效
        let playerUrl = IM_DataTool.loadAudioAction(2);
        IM_DataTool.playAudioAction(playerUrl, IM_global.isPlayrAudio);
        //收到聊天消息刷新列表 如果用户不在第一页不刷新列表
        if (this.listSkip < this.listLimit) {
            this.refreshListData();
        } else {
            let scrollY = this.scrollView.getScrollOffset().y;
            if (scrollY > 20) {
                this.unReadIndex++;
                if (!this.unReadNumNode.active) {
                    this.unReadNumNode.active = true;
                }
                let unReadNumLabel = this.unReadNumNode.getChildByName("unReadNumLabel").getComponent(cc.Label);
                unReadNumLabel.string = this.unReadIndex + "条消息未查看，请点击刷新！"
            } else {
                this.refreshListData();
            }
        }

        // console.log("收到聊天消息：", chatMsgData);
        return;
        let items = this._items;
        let hasUser = false;
        let recordData = null;
        // console.log("items", items.length);
        // console.log("this.datas: ", this.datas);

        for (let i = 0; i < this.datas.length; ++i) {
            var data = this.datas[i];
            // let data = item.chatData;
            if (data.toUserId == chatMsgData.chatMsg.userId) {
                // console.log("chatMsgData2223 == ", chatMsgData);
                hasUser = true;
                recordData = data;
            }
        }
        //如果列表中有该数据，直接更新；否则刷新列表
        if (hasUser && recordData) {
            console.log("hasUser");
            events.dispatch(EventKind.C2S_GET_UNREAD_NUM,
                {
                    conversionId: recordData.conversionId, userId: recordData.userId,
                    toUserId: recordData.toUserId
                });

        } else {
            // console.log(22222);
            this.refreshListData();
        }

    },

    /**
     * 刷新列表
     */
    refreshListData() {
        console.log("this.isRefreshing == ", this.isRefreshing);
        if (!this.isRefreshing) {
            return;
        }
        this.unReadNumNode.active = false;
        this.unReadIndex = 0;
        this.listSkip = 0;
        this.isCanLoadMore = true;
        let currentUser = IM_global.userInfo;
        if (currentUser) {
            events.dispatch(EventKind.C2S_CoversionList,
                { userId: currentUser.userId, skip: this.listSkip, limit: this.listLimit });
        }
        console.log("refreshListAction == ");
    },

    /**
     * 点击消息未读按钮方法
     */
    touchUnReadNumNodeAction() {
        this.refreshListData();
    },

    onErrorMsgAction: function (errMsgData) {
        console.log("服务器报错信息：", errMsgData);
    },

    bindData: function (datas) {
        cc.assert(datas != null, "数据类型错误");

        for (let item in datas) {
            this.addItem(datas[item])
        }

    },

    /**
     * 收到未读消息数
     * @param {*} unReadNumData 
     */
    receiveUnReadNum: function (unReadNumData) {
        // console.log("收到未读消息数 == ", unReadNumData);
        let items = this._items;
        for (let i = 0; i < items.length; i++) {
            var item = items[i];
            let _item = item._item;
            let data = _item.getComponent(this.updateComp).userData;
            let toUserId = data.toUserId;
            // console.log("toUserId== ", toUserId);
            if (toUserId == unReadNumData.toUserId) {
                //更新列表数据
                if (_item) {
                    _item.getComponent(this.updateComp).updateItem(data, unReadNumData);
                }
            }
        }
    },

    addItem: function (data) {

        //如果数量没有达到循环需要的数量,就要添加新的item
        // console.log("this.spawnCount == ", this.spawnCount);
        // console.log("data == ", data);
        // console.log("this._items.length = ", this._items.length);
        if (this._items.length < this.spawnCount) {
            let item = cc.instantiate(this.template);
            this._content.addChild(item);
            let index = this._items.length;

            if (this.direction == Direction.VERTICAL) {
                item.setPosition(0, -item.height * (0.5 + index) - this.spacing * (index + 1));
            }
            else {
                item.setPosition(item.width * (0.5 + index) + this.spacing * (index + 1), 0);
            }
            //更新列表数据
            item.getComponent(this.updateComp).updateItem(data);
            //包装一下保存index
            this._items.push({ _item: item, _index: index, chatData: data });
        }
        this.datas.push(data);

        //添加元素后,重新计算一下content的高度
        if (this.direction == Direction.VERTICAL) {
            this._content.height = this.datas.length * (this.template.height + this.spacing) + this.spacing;
        } else {
            this._content.width = this.datas.length * (this.template.width + this.spacing) + this.spacing;
        }

    },


    getPositionInView: function (item) {
        let worldPos = item.parent.convertToWorldSpaceAR(item.position);
        let viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    },

    update: function (dt) {

        if (this._items.length < this.spawnCount) {
            return;
        }

        // this.lblPostion.string= this._content.position.toString();
        return;
        this._updateTimer += dt;
        if (this._updateTimer < this._updateInterval) return;


        this._updateListView();


        this._updateTimer = 0;
        this._lastContentPos = this._content.position;
    },


    _updateListView: function () {

        let items = this._items;


        for (let i = 0; i < items.length; ++i) {
            var item = items[i];
            let _item = item._item;
            let _index = item._index;
            let viewPos = this.getPositionInView(_item);
            let buffer = this.bufferZone;
            let offset = 0;

            if (this.direction == Direction.VERTICAL) {
                offset = (this.template.height + this.spacing) * this._items.length;
                if (this._content.y > this._lastContentPos.y) {
                    if (viewPos.y > buffer && _item.y - offset > -this._content.height) {
                        _item.y = _item.y - offset;
                        item._index = _index + this._items.length;
                        let itemComponent = _item.getComponent(this.updateComp);
                        itemComponent.updateItem(this.datas[item._index]);
                    }

                } else {
                    if (viewPos.y < -buffer && _item.y + offset < 0) {
                        _item.y = _item.y + offset;
                        item._index = _index - this._items.length;
                        let itemComponent = _item.getComponent(this.updateComp);
                        itemComponent.updateItem(this.datas[item._index]);
                    }
                }
            } else {
                offset = (this.template.width + this.spacing) * this._items.length;
                if (this._content.x > this._lastContentPos.x) {
                    if (viewPos.x > buffer && _item.x - offset > 0) {
                        _item.x = _item.x - offset;
                        item._index = _index - this._items.length;
                        let itemComponent = _item.getComponent(this.updateComp);
                        itemComponent.updateItem(this.datas[item._index]);
                    }
                } else {
                    if (viewPos.x < -buffer && _item.x + offset < this._content.width) {
                        _item.x = _item.x + offset;
                        item._index = _index + this._items.length;
                        let itemComponent = _item.getComponent(this.updateComp);
                        itemComponent.updateItem(this.datas[item._index]);
                    }

                }
            }
        }
    },




    /**
     * @method scrollEvent
     * @param {cc.ScrollView}
     * @param {cc.ScrollView.EventType}
     */
    scrollEvent: function (sender, event) {
        switch (event) {
            case EventType.SCROLLING:
                console.log("正在滑动");
                this.isRefreshing = false;
                this.onScroll();
                break;
            case EventType.SCROLL_ENDED:
                console.log("滑动结束");
                this.isRefreshing = true;
                cc.log("Auto scroll ended");
                break;
            case EventType.SCROLL_TO_BOTTOM:
                console.log("滑动到底部");
                console.log("SCROLL_TO_BOTTOM");
                this.loadMoreData();
                break;
        }
    },


    onScroll: function (direction) {


        var direction = cc.v2();
        if (this.direction == Direction.VERTICAL) {
            direction.y = this._lastContentPos.y > this._content.position.y ? -1 : 1;

        } else {
            direction.x = this._lastContentPos.x > this._content.position.x ? -1 : 1;
        }

        for (let i = 0; i < this._items.length; ++i) {
            let item = this._items[i];
            let _item = item._item;
            let _index = item._index;
            let buffer = this.bufferZone;

            let offsetPos = cc.v3(
                (this.template.width + this.spacing) * this._items.length * -direction.x,
                (this.template.height + this.spacing) * this._items.length * -direction.y,
                0
            );
            let targetPos = _item.position.add(offsetPos);
            let rect = this._content.getBoundingBoxToWorld()


            let viewPos = this.getPositionInView(_item);
            let distance = viewPos.mag();


            //距离在边框之外 并且   转换后的坐标在盒子空间内
            if (distance > buffer && viewPos.normalize().equals(direction) && rect.contains(this._content.convertToWorldSpaceAR(targetPos))) {
                _item.position = targetPos;
                item._index = _index + this._items.length * (direction.x == -1 || direction.y == 1 ? 1 : -1);
                let itemComponent = _item.getComponent(this.updateComp);

                itemComponent.updateItem(this.datas[item._index]);
            }
        }

        this._lastContentPos = this._content.position;
    },

    /**
     * 加载更多数据
     */
    loadMoreData: function () {
        console.log("加载更多数据: ", this.isCanLoadMore);
        let currentUser = IM_global.userInfo;
        if (currentUser && this.isCanLoadMore) {
            this.isCanLoadMore = false;
            console.log("this.listSkip 22 == ", this.listSkip);
            events.dispatch(EventKind.C2S_CoversionList,
                {
                    userId: currentUser.userId, skip: this.listSkip,
                    limit: this.listLimit
                });
        }
    },



    /**
     * 返回大厅
     */
    backToHallAction() {
        gHandler.reflect.setOrientation("landscape", 1334, 750);
        cc.director.loadScene("hall");
        closeWebSocket();
    },

    /**
     * 断网监听
     * @param data 
     */
    networkBreakDownAction(data) {
        IM_global.isNetWorkBreakDown = true;
        this.reConnectTime++;
        console.log("reConnectTime: ", this.reConnectTime);
        if (this.reConnectTime >= 30) {
            this.showStopConnectView();
            closeWebSocket();
            return;
        }
        gHandler.eventMgr && gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "网络断开，正在努力连接中");
    },

    /**
     * 网络连接成功监听
     */
    networkOnOpenAction() {
        console.log("断线重连成功");
        //断线重连后，刷新列表
        if (IM_global.isNetWorkBreakDown) {
            this.reConnectTime = 0;
            IM_global.isNetWorkBreakDown = false;
            this.refreshListData();
            resetConnetTime();
        }
    },

    /**
     * 收到删除会话推送
     * @param deleteData 
     */
    respDeleteConversion(deleteData) {
        // console.log("deleteData == ", deleteData);
        //点击结束会话，返回大厅
        if (deleteData.conversion.userId == IM_global.userInfo.userId) {
            cc.director.loadScene("IMHallScene");
        }
    },

    /**
     * 收到返回聊天列表消息
     */
    backToIMHallAction() {
        if (IM_global.currentChat) {
            if (IM_global.currentChat.userId == 0) {
                this.refreshListData();
                return;
            } else {
                console.log("收到返回聊天列表消息: ", IM_global.currentChat, this.listLimit);
                console.log("this.listSkip == ", this.listSkip);
                //数据只有一页，返回后直接刷新列表
                if (this.listSkip <= this.listLimit) {
                    this.refreshListData();
                } else {
                    let recordData = IM_global.currentChat;
                    events.dispatch(EventKind.C2S_GET_UNREAD_NUM,
                        {
                            conversionId: recordData.conversionId, userId: recordData.userId,
                            toUserId: recordData.toUserId
                        });
                }
            }
        }
    },

    /**
     * 停止重连
     */
    showStopConnectView() {
        let promptStr = "连接超时，请您返回游戏大厅后重新进入";
        this.showPromptBoxAction(promptStr);
        this.isStopReConnect = true;
    },

    /**
   * 显示提示框
   * @param 弹框提示信息
   */
    showPromptBoxAction(promptLabelStr) {
        let promptLabelNode = this.promptBoxNode.getChildByName('promptLabel');
        let promptLabel = promptLabelNode.getComponent(cc.Label);
        promptLabel.string = promptLabelStr;
        this.promptBoxNode.runAction(
            cc.scaleTo(0.2, 1)
        );
    },

    /**
     * 进入后台
     */
    gameHideBackgroundAction() {
        console.log("进入后台==========");
        //移除监听
        this.unregistAction();
    },

    /**
    * 隐藏提示框
    */
    hidePromptBoxAction() {
        this.promptBoxNode.runAction(
            cc.scaleTo(0.2, 0)
        );
    },

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
    },

    /**
     * 发送进入房间消息
     */
    gameShowAction() {
        //进入房间发送消息给后台
        //重新监听
        this.responseAction();
    },

    scrollToFixedPosition: function (pos) {
        this.scrollView.scrollToOffset(pos, 2);
    },
    scrollTo500: function () {
        this.scrollToFixedPosition(cc.v2(500, 500));

    },
    scrollToBottom: function () {
        this.scrollToFixedPosition(cc.v2(0, this._content.height));

    },
    scrollToTop: function () {
        this.scrollToFixedPosition(cc.v2(0, 0));
    },

    scrollToLeft: function () {
        this.scrollToFixedPosition(cc.v2(0, 0));

    },
    scrollToRight: function () {
        this.scrollToFixedPosition(cc.v2(this._content.width, 0));
    }
});
