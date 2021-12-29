const { events, EventKind } = require("../../IM_tools/IM_event");
const { default: IM_DataTool } = require("../../IM_util/IM_DataTool");
const { default: IM_global } = require("../../IM_util/IM_global");


cc.Class({
    extends: cc.Component,
    properties: {
        item_name: {
            default: null,
            type: cc.Label
        },
        item_pic: {
            default: null,
            type: cc.Sprite
        },
        msg_Label: {
            default: null,
            type: cc.Label
        },
        unreadCountNode: {
            default: null,
            type: cc.Node
        },
        dateLabel: {
            default: null,
            type: cc.Label
        },
        kefuLabel: {
            default: null,
            type: cc.Label
        }
    },

    userData: null, //当前用户

    onLoad: function () {
        // events.register(EventKind.S2C_GET_UNREAD_NUM, "ListItem", this.receiveUnReadNum.bind(this));
    },

    onDestroy: function () {
        // events.unregister(EventKind.S2C_GET_UNREAD_NUM, "ListItem");
    },

    updateItem: function (data, unReadNumData) {

        // console.log("数据： ", data);
        if (data == null) {
            cc.log("更新组件失败")
            return;
        }
        if (unReadNumData) {
            if (unReadNumData.replaceContent) {
                this.msg_Label.string = unReadNumData.replaceContent;
            }
            this.receiveUnReadNum(unReadNumData);
            return;
        }
        if (data.userId == 0) {
            this.item_name.string = "";
            this.kefuLabel.string = data.toUserNick;
        } else {
            this.item_name.string = data.toUserNick;
            this.kefuLabel.string = "";
        }

        this.msg_Label.string = data.replaceContent ? data.replaceContent : "";
        this.dateLabel.string = data.uptTime ? IM_DataTool.timestampToTime(data.uptTime) : "";
        //头像
        if (data && data.toUserHeadImg && data.toUserHeadImg.length > 0) {
            IM_DataTool.getPlayerHeadPictureByAtlas(data.toUserHeadImg, (error, spriteFrame) => {
                if (error) {
                    return;
                }
                this.item_pic.spriteFrame = spriteFrame;
            });
        }
        this.userData = data;
        if (data.userId == 0) {
            return;
        }
        events.dispatch(EventKind.C2S_GET_UNREAD_NUM, { conversionId: data.conversionId, userId: data.userId, toUserId: data.toUserId });
    },

    /**
     * 收到未读消息数
     * @param {*} unReadNumData 
     */
    receiveUnReadNum: function (unReadNumData) {
        let unReadNum = unReadNumData.unReadNum;
        if (unReadNum > 0) {
            this.unreadCountNode.active = true;
            let unReadLabelNode = this.unreadCountNode.getChildByName("unReadCountLabel");
            let unReadLabel = unReadLabelNode.getComponent(cc.Label);
            unReadLabel.string = unReadNum;
        } else {
            this.unreadCountNode.active = false;
        }
    },

    /**
     * 进入房间
     */
    enterChatRoom: function () {
        //断网后不能进入房间
        if (IM_global.isNetWorkBreakDown) {
            return;
        }
        //充值自动跳转时,不能点击进入房间
        if (IM_global.isAutoEnterRoom) {
            return;
        }
        IM_global.currentChat = this.userData;
        console.log("进入房间: ", IM_global.isAutoEnterRoom);
        events.dispatch(EventKind.SHOWCHATSCENE, {});
        IM_global.isInRoom = true;
    }

});
