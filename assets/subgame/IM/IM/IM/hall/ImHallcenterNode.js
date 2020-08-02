/*
 *  Dawnson 2019-4-02
 */
cc.Class({
    extends: cc.Component,

    properties: {
        isUploadCenter: false,
        //防重复点击IM列表
        hasTouchListItem: false
    },

    initzation: function (e, t) {
        this.node = e;
        this._gameView = t;
        this.initView();
        this.addEvenListener(this.node)
    },
    addEvenListener: function (e) {
        cc.gg.utils.addScrollToBottom(this.scrollView, this.moreCenter.bind(this))
    },
    initView: function () {
        this.content = this.node.getChildByName("peopleList").getChildByName("view").getChildByName("content");
        this.scrollView = this.node.getChildByName("peopleList")
        this.userList = this._gameView.userList
        this.userList.active = false;
    },
    InitViewList: function (sessionData) {
        this.content.removeAllChildren();
        if (!sessionData) {
            sessionData = cc.gg.global.sessionData
        }
        //var  = cc.gg.global.sessionData;
        // cc.gg.utils.ccLog(sessionData);
        for (var i = 0; i < sessionData.length; i++) {
            var userList = cc.instantiate(this.userList);
            userList.active = true;
            userList.name = "accountId=" + sessionData[i].to_id
            userList.getComponent("userList").initUserInfo(sessionData[i]);
            this.conversationView(userList, sessionData[i])
            var more = userList.getChildByName("more")
            cc.gg.utils.addClickEventEND(userList, this.msg.bind(this));
            cc.gg.utils.addClickEventEND(more, this.more.bind(this));
            // console.log(userList);
            this.content.addChild(userList);
            //这里渲染一下对话

        }
    },
    addViewList: function (data) {
        var sessionData = data;
        for (var i = 0; i < sessionData.length; i++) {
            var userList = cc.instantiate(this.userList);
            userList.active = true;
            userList.name = "accountId=" + sessionData[i].to_id
            userList.getComponent("userList").initUserInfo(sessionData[i]);
            this.conversationView(userList, sessionData[i])
            var more = userList.getChildByName("more")
            cc.gg.utils.addClickEventEND(userList, this.msg.bind(this));
            cc.gg.utils.addClickEventEND(more, this.more.bind(this));
            // console.log(userList);
            this.content.addChild(userList);
            //这里渲染一下对话
        }
    },
    moreCenter: function () {
        console.log("加载更多");
        this.isMoreCenter = true;
        if (this.isUploadCenter) {
            console.log("正在加载退出");
            return
        }
        this.isUploadCenter = true;
        cc.gg.global.isMoreCenter = true
        this._gameView._scene.PushHistorySession(cc.gg.global.sessionData.length, 5)
    },
    more: function (target) {
        cc.gg.utils.ccLog(target.parent.name);
        var deleAccountID = target.parent.name;
        deleAccountID = cc.gg.utils.urlParse(deleAccountID).accountId
        if (!deleAccountID) {
            return
        } else {
            cc.gg.global.deleAccountID = deleAccountID
        }
        this._gameView._bottomPancel.bottomAnimate();
    },
    msg: function (target) {
        if(this.hasTouchListItem) {
            return;
        }
        this.hasTouchListItem = true;
        this.scheduleOnce(() => {
            this.hasTouchListItem = false;
        },2);
      
        const parentNode = this.node.parent;
        const coverNode = parentNode.getChildByName("coverNode");
        //当coverNode存在时，点击收起弹框
        if (coverNode.active) {
            this._gameView._bottomPancel.bottomAnimate();
            return;
        }

        var accountId = cc.gg.utils.urlParse(target.name).accountId;
        var sessionData = cc.gg.global.sessionData;
        if (accountId) {
            for (var i = 0; i < sessionData.length; i++) {
                if (accountId == sessionData[i].to_id) {
                    cc.gg.global.chatObj = sessionData[i];
                    this._gameView.backMsgFun()
                }
            }
        }
    },

    //根据ID删除节点
    deleteNode: function (accountID) {
        var item = cc.find("peopleList/view/content/accountId=" + accountID, this.node);
        if (item) {
            this.content.removeChild(item);
        }
    },
    conversationView: function (item, data) {
        if (!item) {
            return;
        }
        var msg = item.getChildByName("msg");
        var timerBox = item.getChildByName("times");
        timerBox.active = true;
        msg.active = true
        //未读条数
        var total = timerBox.getChildByName("total");
        var totalBg = timerBox.getChildByName("totalBG");
        //发送者名字
        var msgName = msg.getChildByName("msgName")
        //发送内容
        var Text = msg.getChildByName("Text")
        //发送时间
        var msgTime = timerBox.getChildByName("time");
        if (data.last_send_user_id && data.last_send_user_id != "") {
            if (data.last_send_user_id == cc.gg.global.userInfo.userID) {
                msgName.getComponent(cc.Label).string = "you : "
            } else {
                msgName.getComponent(cc.Label).string = cc.gg.utils.getSubStringLengTxt(data.to_nick, 4) + " : ";
            }
        } else {
            msgName.active = false
            Text.active = false
        }
        Text.getComponent(cc.Label).string = cc.gg.utils.getSubStringLengTxt(data.replace_content, 8);
        msgTime.getComponent(cc.Label).string = cc.gg.utils.timestampToTime(data.update_time);
        total.getComponent(cc.Label).string = data.un_read_num;
        if (data.un_read_num == 0) {
            total.active = false;
            totalBg.active = false;
        } else {
            total.active = true;
            totalBg.active = true;
        }

    },
});