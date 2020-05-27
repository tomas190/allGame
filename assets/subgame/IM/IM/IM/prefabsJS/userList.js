cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad: function () {

    },
    initUserInfo: function (data) {
        //用戶自選頭像
        this.userBg = cc.find("userImg/userHeadMask/userBg", this.node);
        this.userBg.getComponent(cc.Sprite).spriteFrame = "";
        //用戶首拼
        this.userP = cc.find("userImg/userHeadMask/userP", this.node);
        this.SP = this.userP.getChildByName("SP");
        //用戶狀態
        this.isOnline = this.node.getChildByName("isOnline");
        //appellation
        this.appellation = this.node.getChildByName("appellation");
        //用戶名 或群標識
        this.UserName = this.appellation.getChildByName("Name");
        // 消息標識 
        this.icon = this.appellation.getChildByName("icon");
        //消息時間未读
        this.timerBox = this.node.getChildByName("times")
        //消息时间
        this.msgTime = this.timerBox.getChildByName("time");
        //未读条数
        this.total = this.timerBox.getChildByName("total");

        this.msg = this.node.getChildByName("msg");
        //发送者名字
        this.msgName = this.msg.getChildByName("msgName")
        //发送内容
        this.Text = this.msg.getChildByName("Text");

        if (data.to_nick.length > 17) {
            data.to_nick = data.to_nick.substr(0, 17) + ".."
        }
        this.UserName.getComponent(cc.Label).string = data.to_nick;
        this.userBg.active = false;
        this.userP.active = true;
        if (data.to_img) {
            cc.gg.utils.getUserImgSourceByNumber(data.to_img, (err, spriteFrame) => {
                if (err) {
                    return;
                }
                const userBgSprite = this.userBg.getComponent(cc.Sprite);
                userBgSprite.spriteFrame = spriteFrame;
            });
            this.userBg.active = true;
            this.userP.active = false;
            // cc.gg.utils.changeSpriteFrameWithServerUrlForWeb(this.userBg, data.to_img)
        } else {
            this.userBg.active = false;
            this.userP.active = true;
            this.SP.getComponent(cc.Label).string = (data.to_nick + "").substr(0, 1);
        }
        this.msg.active = false;
        this.timerBox.active = false;
        // if (data.fromText) {
        //     this.msgName.getComponent(cc.Label).string = cc.gg.utils.getSubStringLengTxt(data.fromNick, 4);
        //     this.Text.getComponent(cc.Label).string = cc.gg.utils.getSubStringLengTxt(data.Text, 8);
        //     this.msgTime.getComponent(cc.Label).string = cc.gg.utils.timestampToTime(data.time)
        //     this.total.getComponent(cc.Label).string = data.unread
        // } else {
        //     this.msg.active = false;
        //     this.timerBox.active = false;
        // }
    },
    initListInfo: function (data) {
        //用戶自選頭像
        this.userBg = cc.find("userImg/userHeadMask/userBg", this.node);
        //用戶首拼
        this.userP = cc.find("userImg/userHeadMask/userP", this.node);
        this.SP = this.userP.getChildByName("SP");
        //用戶狀態
        this.isOnline = this.node.getChildByName("isOnline");
        //appellation
        this.appellation = this.node.getChildByName("appellation");
        //用戶名 或群標識
        this.UserName = this.appellation.getChildByName("Name");
        // 消息標識 
        this.icon = this.appellation.getChildByName("icon");
        //消息時間未读
        this.timerBox = this.node.getChildByName("times")
        //消息时间
        this.msgTime = this.timerBox.getChildByName("time");
        //未读条数
        this.total = this.timerBox.getChildByName("total");

        this.msg = this.node.getChildByName("msg");
        //发送者名字
        this.msgName = this.msg.getChildByName("msgName")
        //发送内容
        this.Text = this.msg.getChildByName("Text");
        if (data.nick_name.length > 17) {
            data.nick_name = data.nick_name.substr(0, 17) + ".."
        }
        this.UserName.getComponent(cc.Label).string = data.nick_name;
        if (data.head_img) {
            cc.gg.utils.getUserImgSourceByNumber(data.head_img, (err, spriteFrame) => {
                if (err) {
                    return;
                }
                const userBgSprite = this.userBg.getComponent(cc.Sprite);
                userBgSprite.spriteFrame = spriteFrame;
            });
            this.userBg.active = true;
            this.userP.active = false;
            // cc.gg.utils.changeSpriteFrameWithServerUrlForWeb(this.userBg, data.head_img)
        } else {
            this.userBg.active = false;
            this.userP.active = true;
            this.SP.getComponent(cc.Label).string = (data.nick_name + "").substr(0, 1);
        }
        this.msg.active = false;
        this.timerBox.active = false;
        // if (data.fromText) {
        //     this.msgName.getComponent(cc.Label).string = cc.gg.utils.getSubStringLengTxt(data.fromNick, 4);
        //     this.Text.getComponent(cc.Label).string = cc.gg.utils.getSubStringLengTxt(data.Text, 8);
        //     this.msgTime.getComponent(cc.Label).string = cc.gg.utils.timestampToTime(data.time)
        //     this.total.getComponent(cc.Label).string = data.unread
        // } else {
        //     this.msg.active = false;
        //     this.timerBox.active = false;
        // }
    }
});