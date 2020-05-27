/*
 *  Dawnson 2019-4-03
 */
const cmd = require("IMcmd");
cc.Class({
    extends: cc.Component,

    properties: {
        isFile: false,
        msgText: "",
        touchUploadFile: true
    },
    initzation: function (e, t) {
        this.node = e;
        this._gameView = t;
        this.initView();
        //this.resetView();
        this.addEvenListener(this.node);
    },
    addEvenListener: function (e) {
        cc.gg.utils.addClickEventEND(this.bottomLeft, this.more.bind(this));
        cc.gg.utils.addTextChanged(this.bottomEditbox, this.changeText.bind(this));
        cc.gg.utils.addEditingDidBegan(this.bottomEditbox, this.addEditingDidBegan.bind(this));
        cc.gg.utils.addEditingReturn(this.bottomEditbox, this.addEditingReturn.bind(this));
        cc.gg.utils.addEditingDidEnded(this.bottomEditbox, this.addEditingDidEnded.bind(this));

        cc.gg.utils.addClickEventEND(this.bottomRightSend, this.privateChat.bind(this))
        cc.gg.utils.addClickEventEND(this.alertText, this.openMsgFun.bind(this))
        cc.gg.utils.addClickEventEND(this.inputText, this.setFocus.bind(this))
        cc.gg.utils.addClickEventEND(this.bottomRightFile, this.file_.bind(this))
    },
    addEditingDidEnded: function () {
        var text = this.bottomEditbox.getComponent(cc.EditBox).string;
        this._gameView._centerPancel.inputFun("editing-did-ended", text);
    },
    addEditingDidBegan: function () {
        console.log("addEditingDidBegan")
        var text = this.bottomEditbox.getComponent(cc.EditBox).string;
        this._gameView._centerPancel.inputFun("editing-did-began", text);
    },
    addEditingReturn: function () {
        var text = this.bottomEditbox.getComponent(cc.EditBox).string;
        this._gameView._centerPancel.inputFun("editing-return", text);
    },
    //页面初始化
    initView: function () {
        var self = this;
        this.bottomLeft = this.node.getChildByName("bottomLeft");
        this.bottomRightFile = this.node.getChildByName("bottomRightFile");
        this.bottomRightVoice = this.node.getChildByName("bottomRightVoice");
        this.bottomRightSend = this.node.getChildByName("bottomRightSend");
        this.bottomEditbox = this.node.getChildByName("editbox");
        this.openMsg = this.node.getChildByName("openMsg");
        this.alertText = this.openMsg.getChildByName("alert");
        this.inputText = this.node.getChildByName("inputText");
        this.text = this.inputText.getChildByName("text")
        this.bottomRightSend.active = true;
        this.mask = this.node.getChildByName("mask");
        this.mask.active = false;
        //this.bottomEditbox.getComponent(cc.EditBox)._impl._beginEditing()
        //console.log(this.bottomEditbox, "aaaaa")
    },

    resetView: function () {
        this.mask.active = false;
        //this.bottomRightSend.active = false;
        if (cc.gg.global.os == "desktop") {
            console.log(cc.gg.global.os)
            this.bottomEditbox.active = true;
            this.inputText.active = false;
        } else {
            this.bottomEditbox.active = false;
            this.inputText.active = true;
        }
        if (cc.gg.global.chatObj.allow_chat > 0) {
            this.openMsg.active = false;
        } else {
            //this.openMsg.active = true;
        }
    },
    //获取焦点

    setFocus: function () {
        //this.bottomEditbox.getComponent(cc.EditBox).stayOnTop(true)
        //this.bottomEditbox.getComponent(cc.EditBox).setFocus();
        //this.bottomEditbox.getComponent(cc.EditBox)._impl._beginEditing()
        //console.log(this.bottomEditbox.getComponent(cc.EditBox).__eventTargets);
        // this.bottomEditbox.getComponent(cc.EditBox)._impl._beginEditing()
        // this.bottomEditbox.getComponent(cc.EditBox).__eventTargets[2].emit(['click']);
        //this.bottomEditbox.getComponent(cc.EditBox).__eventTargets[2].emit(['text-changed']);
        // this.bottomEditbox.getComponent(cc.EditBox).stayOnTop = true //[0].emit(['click']);
        //this.bottomEditbox.getComponent(cc.EditBox).setFocus();
        //让web键盘获取焦点
        //第三种方案  唤起RN键盘
        //var text = this.text.getComponent(cc.Label).string
        var text = this.msgText
        if (text.indexOf("Send Message..") > -1) {
            text = this.text.getComponent(cc.Label).string = ""
        }
        // cc.gg.client.send("__oninput", {
        //     text: text,
        //     shouldShowInput: true,
        //     shouldAnimated: false,
        //     isVertical: true,
        // });

    },
    //提供一个方法 将输入框中的内容同步到inputText中
    setText: function (data) {
        if (cc.gg.global.os == "desktop") {
            var data = this.bottomEditbox.getComponent(cc.EditBox).string;
        } else {
            if (data.length >= 15) {
                this.text.getComponent(cc.Label).string = data.substr(data.length - 15, 15) + "..."
            } else if (data.length == 0) {
                this.text.getComponent(cc.Label).string = "Send Message.."
            } else {
                this.text.getComponent(cc.Label).string = data
            }
            this.msgText = data
        }
    },
    hideOpenMsg: function () {
        this.openMsg.active = false;
    },
    more: function () {
        //显示更多
    },
    hideAll: function () {
        this.mask.active = true;
    },
    showAll: function () {
        this.mask.active = false;
    },
    openMsgFun: function () {
        if (cmd.transactionStatus == 3 || cmd.transactionStatus == 9 || cmd.transactionStatus == -16 ||
            cmd.transactionStatus == 10 ||
            cmd.transactionStatus == -20 || cmd.orderStatus == 9) {
            this._gameView._scene.sendChangeMsgType({
                msgID: cc.gg.global.chatObj.msgID
            })
        } else {
            this._gameView._centerPancel.alertBoxStyle("-17")
        }
    },
    changeText: function () {
        var text = this.bottomEditbox.getComponent(cc.EditBox).string;
        this._gameView._centerPancel.inputFun("text-changed", text);
    },
    changeName: function (data) {
        this.bottomEditbox.getComponent(cc.EditBox).string = data;
    },
    privateChat: function () {
        // if (cc.gg.global.chatObj.msg_type == 10) {
        //     this._gameView._centerPancel.alertBoxStyle(12);
        //     return;
        // }
        var times = new Date().getTime() + parseInt((Math.random() * 10000) % 1000) + cc.gg.global.userInfo.userID
        cc.gg.utils.ccLog("msgID", times)
        //普通文字
        //var msg = this.bottomEditbox.getComponent(cc.EditBox).string;
        //var msg = document.getElementById("text").value
        if (cc.gg.global.os != "desktop") {
            //var msg = document.getElementById("text").value
            var msg = this.msgText
            if (msg == "Send Message..") {
                console.log("不允许发送空消息");
                return
            }
        } else {
            var msg = this.bottomEditbox.getComponent(cc.EditBox).string;
        }
        if (msg) {
            var data = {
                content: msg,
                content_type: 1,
                msg_type: 2,
                msg_id: times,
                time: new Date().getTime(),
            }
            this._gameView._scene.privateChat(data);
            this._gameView._centerPancel.addMsg(true, data);
            if (cc.gg.global.os != "desktop") {
                this.text.getComponent(cc.Label).string = "Send Message..."
                this.msgText = ""
                // document.getElementById("text").value = ""
                //this._gameView._centerPancel.inputValue.getComponent(cc.Label).string = ""
            } else {
                this.bottomEditbox.getComponent(cc.EditBox).string = "";
                //this.setText()
            }
            this._gameView._scene.isFrom = true;
        }
        cc.gg.audioMgr.playMusic("session")
        //cc.gg.client.send("__oninputend", {});
    },
    file_: function (file) {
        // alert(111111);
        //这里重置一下开关  表示现在是上传文件等等
        // this.isFile = true;
        // cc.gg.utils.ccLog(file.files[0].name);
        // if (this.bottomEditbox) {
        //     this.bottomEditbox.getComponent(cc.EditBox).string = file.files[0].name;
        // }

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
                //测试
                // cc.gg.global.file = "http://im1.lymrmfyp.com/upload";
                if (cc.gg.global.file) {
                    jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "selectImg", "(Ljava/lang/String;)V", cc.gg.global.file);
                } else {
                    console.log('没有file')
                }
            } else {
                //动态请求权限
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "requestPermissionAction", "()V");
            }
        } else if (cc.sys.os == cc.sys.OS_IOS) {
            //测试
            // cc.gg.global.file = "http://im1.lymrmfyp.com/upload";
            jsb.reflection.callStaticMethod("AppController",
                "selectImg:", cc.gg.global.file);
        }

    },
    // onDestroy: function () {
    //     cc.gg.file.hideFile()
    // }
});