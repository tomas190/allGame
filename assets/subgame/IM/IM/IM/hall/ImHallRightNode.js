/*
 *  Dawnson 2019-4-02
 */
cc.Class({
    extends: cc.Component,

    properties: {
        lock: true,
        skip: 0,
        lockPull: false,
        msgText: "",
    },


    initzation: function(e, t) {
        this.node = e;
        this._GameView = t;
        this.initView();
        this.addEvenListener(this.node)
    },
    addEvenListener: function(e) {
        cc.gg.utils.addClickEventEND(this.searchBoxMask, this.toggleStatus.bind(this));
        cc.gg.utils.addTextChanged(this.edit, this.changeText.bind(this));
        cc.gg.utils.addClickEventEND(this.subMsgBox, this.subMsg.bind(this));
        cc.gg.utils.addClickEventEND(this.pullChild, this.pullChildFun.bind(this));
        cc.gg.utils.addClickEventEND(this.bottomLeft, this.toggleStatus.bind(this));

        cc.gg.utils.addClickEventEND(this.seachSub, this.seachSubFun.bind(this));
        cc.gg.utils.addClickEventEND(this.seachUser, this.seachUserFun.bind(this));

        cc.gg.utils.addClickEventEND(this.inputText, this.inputTextFun.bind(this));
    },
    initView: function() {
        //search  mask
        this.searchBoxMask = this.node.getChildByName("mask");
        this.searchTop = this.node.getChildByName("header");
        this.edit = this.searchTop.getChildByName("bottomBg").getChildByName("editbox");
        this.bottomLeft = this.searchTop.getChildByName("bottomBg").getChildByName("bottomLeft")
        this.scrollView = this.node.getChildByName("center");

        //搜索下级
        this.seachSub = this.searchTop.getChildByName("bottomBg").getChildByName("seachSub");
        this.seachUser = this.searchTop.getChildByName("bottomBg").getChildByName("seachUser");
        this.inputText = this.searchTop.getChildByName("bottomBg").getChildByName("inputText");
        this.text = this.inputText.getChildByName("text")

        //搜索用户
        this.searchCeter = cc.find("center/view/content", this.node);
        //搜索下级的人物内容
        this.searchPeo = this.searchCeter.getChildByName("subData");
        //搜索下级的提示
        this.searchAlert = this.searchPeo.getChildByName("alert");
        //人物头像点击区域
        this.subMsgBox = this.searchPeo.getChildByName("headerCenter");
        //名字和ID
        this.subName = this.searchPeo.getChildByName("userName")
        this.subID = this.searchPeo.getChildByName("userID");
        //加载下级的按钮
        this.pullChild = this.node.getChildByName("pullChild");
        //提示
        this.err = this.searchCeter.getChildByName("err");
        //列表模板
        this.userList = this.searchCeter.getChildByName("userList");
        //下级头像
        this.searchUserBg = cc.find("center/view/content/subData/headerCenter/userHeadMask/userBg", this.node);
        this.searchUserSPBox = cc.find("center/view/content/subData/headerCenter/userHeadMask/userP", this.node);
        this.searchUserSP = this.searchUserSPBox.getChildByName("SP");
        this.searchAlert.active = false;
        this.searchPeo.active = false;
        this.userList.active = false;
        this.err.active = false;
        this.seachSub.active = false;
        this.seachUser.active = false;
    },
    resetView: function() {
        //this.bottomRightSend.active = false;
        if (cc.gg.global.os == "desktop") {
            console.log(cc.gg.global.os)
            this.edit.active = true;
            this.inputText.active = false
        } else {
            this.edit.active = false;
            this.inputText.active = true;
        }
    },
    inputTextFun: function() {
        var text = this.msgText
        if (text.indexOf("输入用户ID查找") > -1) {
            text = this.text.getComponent(cc.Label).string = ""
        }
        // cc.gg.client.send("__oninput", {
        //     text: text,
        //     shouldShowInput: true,
        //     shouldAnimated: false,
        //     isVertical: true,
        // });
    },
    seachSubFun: function() {
        this.msgText = ""
        if (cc.gg.global.os == "desktop") {
            var text = this.edit.getComponent(cc.EditBox).string;
        } else {
            var text = this.text.getComponent(cc.Label).string;
        }
        //发送搜索下级
        this._GameView._scene.getSub(text)
    },
    seachUserFun: function() {
        this.msgText = ""
        if (cc.gg.global.os == "desktop") {
            var text = this.edit.getComponent(cc.EditBox).string;
        } else {
            var text = this.text.getComponent(cc.Label).string;
        }
        //发送搜索用户
        this._GameView._scene.getUser(text)
    },
    pullChildFun: function() {
        if (this.lockPull) {
            console.log("尚未加载完成")
            return
        }
        var skip = this.searchCeter.childrenCount - 3;
        this._GameView._scene.sendUserChildrenList({
            skip: skip
        })
    },
    pullView: function(datas) {
        if (datas.length >= 0) {
            for (var i = 0; i < datas.length; i++) {
                var item = cc.instantiate(this.userList);
                item.active = true
                item.getComponent("userList").initListInfo(datas[i]);
                item.name = "accountId=" + datas[i].user_id + "&type=" + datas[i].user_type + "&nick=" + datas[i].nick_name + "&img=" + datas[i].head_img
                cc.gg.utils.addClickEventEND(item, this.subMsg.bind(this))
                this.searchCeter.addChild(item);
            }
            if (datas.length == 0 && this.searchCeter.childrenCount == 3) {
                this.err.getComponent(cc.Label).string = "您暂时没有下级"
                this.err.active = true;

            }
            this.scrollView.getComponent(cc.ScrollView).scrollToBottom(0.3);
        } else {
            this.err.getComponent(cc.Label).string = "加载失败"
            this.err.active = true;
        }
    },

    subInitView: function(data, err) {
        if (!data) {
            if (!err) {
                err = "对方不是你的下级"
            }
            this.searchAlert.getComponent(cc.Label).string = err;
            this.searchAlert.active = true;
            this.searchPeo.active = true;
            this.subMsgBox.active = false;
            this.subName.active = false;
            this.subID.active = false;
        } else {
            this.subName.getComponent(cc.Label).string = data.nick_name;
            this.subID.getComponent(cc.Label).string = data.user_id;
            if (data.head_img) {
                cc.gg.utils.changeSpriteFrameWithServerUrlForWeb(this.searchUserBg, data.head_img)
                this.searchUserBg.active = true
                this.searchUserSPBox.active = false
            } else {
                this.searchUserBg.active = false;
                this.searchUserSPBox.active = true;
                this.searchUserSP.getComponent(cc.Label).string = (data.nick_name + "").substr(0, 1);
            }
            this.searchAlert.active = false;
            this.searchPeo.active = true;
            this.subMsgBox.active = true;
            this.subName.active = true;
            this.subID.active = true;
            //这里给下级附上一个唯一标识 
            this.subMsgBox.name = "accountId=" + data.user_id + "&type=1" + "&nick=" + data.nick_name + "&gameImg=" + data.head_img
        }
    },
    //和搜索出的下级聊天
    subMsg: function(target) {
        cc.gg.utils.ccLog(target.name);
        var data = cc.gg.utils.urlParse(target.name);
        //操作缓存的人员列表
        var userObj = {
            to_id: data.accountId,
            to_nick: data.nick,
            to_img: data.img,
            to_type: data.type,
            user_id: cc.gg.global.userInfo.userID,
            user_img: cc.gg.global.userInfo.userHeadImg,
            user_nick: cc.gg.global.userInfo.userNick,
            allow_chat: 5,
        }


        //定义正在聊天的对象
        cc.gg.global.chatObj = userObj
            // cc.director.loadScene("msg")
        this._GameView.backMsgFun()
    },
    toggleStatus: function() {
        var self = this;
        // cc.gg.utils.ccLog(this.lock)
        // if (!this.lock) {
        //     return
        // }
        // this.lock = false;
        var width = this.node.width;
        this.node.active = !this.node.active
            // if (status) {
            //     var active = cc.sequence(cc.moveBy(.3, width, 0), cc.callFunc(function () {
            //         self.lock = true;
            //         self.searchBoxMask.active = false;
            //     }))
            // } else {
            //     self.searchBoxMask.active = true;
            //     var active = cc.sequence(cc.moveBy(.3, -width, 0), cc.callFunc(function () {
            //         self.lock = true;
            //     }))
            // }
            // this.node.runAction(active);
    },
    changeText: function() {

        var text = this.edit.getComponent(cc.EditBox).string;
        cc.gg.utils.ccLog("我触发了切换text" + text)
        if (text.length >= 9) {
            this.edit.getComponent(cc.EditBox).string = text.substr(0, 9)
                //发送消息
                //this._GameView._scene.isSub(text)
            this.seachSub.active = true;
            this.seachUser.active = true;
        } else {
            this.searchAlert.active = false
            this.seachSub.active = false;
            this.seachUser.active = false;
        }
    },
    //提供一个方法 将输入框中的内容同步到inputText中
    setText: function(data) {
        if (cc.gg.global.os == "desktop") {
            var data = this.edit.getComponent(cc.EditBox).string;
        } else {
            if (data.length >= 9) {
                this.seachSub.active = true;
                this.seachUser.active = true;
                this.text.getComponent(cc.Label).string = data.substr(0, 9)
            } else if (data.length == 0) {
                this.text.getComponent(cc.Label).string = "Send Message.."
                this.msgText = "";
                return;
            } else {
                this.searchAlert.active = false
                this.seachSub.active = false;
                this.seachUser.active = false;
                this.text.getComponent(cc.Label).string = data
            }
            this.msgText = this.text.getComponent(cc.Label).string
        }
    },
});