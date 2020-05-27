/*
 *  Dawnson 2019-4-02
 */
const cmd = require("IMcmd");
let gHandler = require("gHandler");
cc.Class({
    extends: cc.Component,

    properties: {
        skip: 0,
        isUploadMsg: false,
        uploadMsgCount: 0,
    },
    initzation: function (e, t) {
        this.node = e;
        this._gameView = t;
        this.initView();
        this.addEvenListener(this.node);
        let self = this;
        // 节点 b 的组件脚本中
        this.node.on('copyTextSuccess', this.copyTextSuccessAction.bind(this));
        this.node.on('copyTextFailed', this.copyTextFaliedAction.bind(this));

    },
    addEvenListener: function (e) {
        cc.gg.utils.addClickEventEND(this.confirm, this.alertButton.bind(this), {
            isConfirm: true
        });
        cc.gg.utils.addClickEventEND(this.cancel, this.alertButton.bind(this), {
            isConfirm: false
        });
        cc.gg.utils.addClickEventEND(this.inputText, this.inputTextFun.bind(this));
        cc.gg.utils.addClickEventEND(this.bottomRightSend, this.bottomRightSendFun.bind(this));
        cc.gg.utils.addScrollToTop(this.scrollview, this.moreMsg.bind(this))
    },
    initView: function () {
        this.scrollview = this.node.getChildByName("scrollview");
        this.alertStyle = this.node.getChildByName("alertStyle");
        this.content = cc.find("scrollview/view/content", this.node);
        this.msgList = this._gameView.meMsgText;
        this.otherList = this._gameView.otherMsgText;
        this.otherImg = this._gameView.otherImg
        this.meImg = this._gameView.meImg

        //alert 
        this.alert = this.alertStyle.getChildByName("alert");
        this.title = this.alert.getChildByName("title");
        this.text = this.alert.getChildByName("text");
        this.button = this.alert.getChildByName("button");
        this.confirm = this.button.getChildByName("confirm");
        this.cancel = this.button.getChildByName("cancel");

        // orderEndLine
        this.orderLine = this._gameView["orderEnd"];
        // this.orderLineText = this.orderLine.getChildByName("line");

        //input text
        this.inputText = this.node.getChildByName("inputText");
        this.inputValue = this.inputText.getChildByName("text");
        this.bottomRightSend = this.inputText.getChildByName("bottomRightSend");

        //oriderMSG 对话
        this.orderMeNodeAll = [];
        this.orderOtherNodeAll = [];
        for (var i = 1; i < 12; i++) {
            var orderMeNode = this._gameView["orderMeType" + i]
            orderMeNode.active = false;
            this.orderMeNodeAll.push(orderMeNode);
            var orderOtherNode = this._gameView["orderOtherType" + i]
            orderOtherNode.active = false;
            this.orderOtherNodeAll.push(orderOtherNode);
        }

        this.msgList.active = false;
        this.otherList.active = false;
        this.otherImg.active = false;
        this.meImg.active = false;
        this.inputText.active = false;
        //this.orderLine.active = false;
    },
    resetView: function () {
        this.content.removeAllChildren();
        // for (var i = 0; i < this.orderOtherNodeAll.length; i++) {
        //     this.orderMeNodeAll[i].active = false;
        //     this.orderOtherNodeAll[i].active = false;
        // }
        // var deleteAll = [];
        // for (var k = 0; k < this.content.childrenCount; k++) {
        //     if (this.content.children[k].name.indexOf("msg") != -1) {
        //         deleteAll.push(this.content.children[k])
        //     }
        // }
        // for (var i = 0; i < deleteAll.length; i++) {
        //     this.content.removeChild(deleteAll[i]);
        // }
        this.alertStyle.active = false;
        this.inputText.active = false;
        //this.orderLine.active = false;
    },

    copyTextSuccessAction: function (event) {
        this._gameView._topPancel.runAlert("复制成功");
        event.stopPropagation();

    },

    copyTextFaliedAction: function (event) {
        this._gameView._topPancel.runAlert("复制失败");
        event.stopPropagation();
    },

    /**
     * 添加消息
     * @param {是否是自己} isMe 
     * @param {content: 消息,content_type: 消息类型1：文本，2：图片,msg_id:消息id, time: cc.gg.utils.timeNow(newHistoryData[i].time)} data 
     * @param {} first 
     */
    addMsg: function (isMe, data, first) {
        var self = this;
        if (isMe) {
            if (data.content_type == 1) {
                //文本消息
                var msgList = cc.instantiate(this.msgList);
                //msgList.setPosition(-375,)
                msgList.name = "msgID=" + data.msg_id
                var text = data.content
                msgList.active = true;
                var textNode = msgList.getChildByName("text");
                var timesNode = textNode.getChildByName("times");
                if (!text) {
                    return;
                }
                // if (text.replace(/[^\x00-\xff]/g, 'xx').length * 80 < 450) {
                //     textNode.width = text.replace(/[^\x00-\xff]/g, 'xx').length * 80 + 80
                //     //textNode.width = text.length * 32 + 60
                // } else {
                //     textNode.width = 500;
                // }
                var TextWidth = 0
                for (var k = 0; k < text.length; k++) {
                    if (text[k].replace(/[^\x00-\xff]/g, 'xx').length == 1) {
                        if (text[k] == "%") {
                            TextWidth += 15
                        }
                        TextWidth += 20
                    } else {
                        TextWidth += 40
                    }
                }
                if (TextWidth >= 450) {
                    textNode.width = 500;
                } else {
                    textNode.width = TextWidth + 60
                }
                msgList.width = textNode.width + 50
                textNode.getComponent(cc.Label).string = text;
                if (data.time) {
                    timesNode.getComponent(cc.Label).string = cc.gg.utils.timestampToTime(data.time);
                }
                //msgList.height = 40 * Math.ceil(text.replace(/[^\x00-\xff]/g, 'xx').length * 20 / 500 + 1);
                // msgList.setPosition(375, -this.content.height - 26);
                // this.content.height += msgList.height + 20;
                if (first) {
                    this.content.insertChild(msgList, 0);
                    // self.scrollview.getComponent(cc.ScrollView).scrollToTop(0.3);
                } else {
                    this.content.addChild(msgList);
                    // self.scrollview.getComponent(cc.ScrollView).scrollToBottom(0.3);
                }

                //msgList.destroy()
            } else if (data.content_type == 2) {
                var meImg = cc.instantiate(this.meImg);
                meImg.active = true;
                meImg.name = "msgID=" + data.msg_id;
                var textNode = meImg.getChildByName("text");
                var timesNode = meImg.getChildByName("times");
                let markLabelNode = meImg.getChildByName("markLabel");
                if (data.time) {
                    timesNode.getComponent(cc.Label).string = cc.gg.utils.timestampToTime(data.time);
                }

                if (data.content) {
                    //新加图片URl（记录用）
                    markLabelNode.getComponent(cc.Label).string = data.content;
                }

                if (!data.content) {
                    cc.gg.utils.addClickEventEND(meImg, self.magnifyImg.bind(self));
                    if (first) {
                        self.content.insertChild(meImg, 0);
                        self.scrollview.getComponent(cc.ScrollView).scrollToTop(0.3);
                    } else {
                        self.content.addChild(meImg);
                        // self.scrollview.getComponent(cc.ScrollView).scrollToBottom(0.3);
                    }
                    return
                }
                // var size = this.autoImg(text.sizeX, text.sizeY, textNode);
                // if (size) {
                //     meImg.width = size.X;
                //     meImg.height = size.Y;
                //     textNode.width = size.X;
                //     textNode.height = size.Y;
                // }
                // cc.gg.utils.changeSpriteFrameWithServerUrlForWeb(textNode, text.msg);
                // this.autoImg(text.msg, textNode, function () {
                //     meImg.width = textNode.width;
                //     meImg.height = textNode.height;
                //     if (time) {
                //         timesNode.getComponent(cc.Label).string = time;
                //     }
                //     cc.gg.utils.addClickEventEND(meImg, self.magnifyImg.bind(self));
                //     self.content.addChild(meImg);
                // self.scrollview.getComponent(cc.ScrollView).scrollToBottom(0.3);
                // });

                cc.gg.utils.changeSpriteFrameWithServerUrlForWeb(textNode, data.content);
                cc.gg.utils.addClickEventEND(meImg, self.magnifyImg.bind(self));
                if (first) {
                    self.content.insertChild(meImg, 0);
                    self.scrollview.getComponent(cc.ScrollView).scrollToTop(0.3);
                } else {
                    self.content.addChild(meImg);
                    // self.scrollview.getComponent(cc.ScrollView).scrollToBottom(0.3);
                }

                //meImg.destroy()
            }
        } else {
            if (data.content_type == 1) {
                var msgList = cc.instantiate(this.otherList);
                msgList.active = true;
                msgList.name = "msgID=" + data.msg_id;
                var text = data.content
                var textNode = msgList.getChildByName("text");
                var timesNode = textNode.getChildByName("times");
                if (!text) {
                    return;
                }
                var TextWidth = 0
                for (var k = 0; k < text.length; k++) {
                    if (text[k].replace(/[^\x00-\xff]/g, 'xx').length == 1) {
                        if (text[k] == "%") {
                            TextWidth += 15
                        }
                        TextWidth += 20
                    } else {
                        TextWidth += 40
                    }
                }
                if (TextWidth >= 450) {
                    textNode.width = 500;
                } else {
                    textNode.width = TextWidth + 60
                }
                msgList.width = textNode.width + 50
                // if (text.replace(/[^\x00-\xff]/g, 'xx').length * 80 < 450) {
                //     textNode.width = text.replace(/[^\x00-\xff]/g, 'xx').length * 80 + 80
                // } else {
                //     textNode.width = 500;
                // }
                // msgList.width = textNode.width + 50

                textNode.getComponent(cc.Label).string = text;
                if (data.time) {
                    timesNode.getComponent(cc.Label).string = cc.gg.utils.timestampToTime(data.time);
                }
                // msgList.height = 40 * Math.ceil(text.replace(/[^\x00-\xff]/g, 'xx').length * 20 / 500 + 1);
                // msgList.setPosition(-375, -this.content.height - 26);
                // this.content.height += msgList.height + 20;
                if (first) {
                    this.content.insertChild(msgList, 0);
                    self.scrollview.getComponent(cc.ScrollView).scrollToTop(0.3);
                } else {
                    this.content.addChild(msgList);
                    // self.scrollview.getComponent(cc.ScrollView).scrollToBottom(0.3);
                }

                //msgList.destroy()
            } else if (data.content_type == 2) {
                var otherImg = cc.instantiate(this.otherImg);
                otherImg.active = true;
                otherImg.name = "msgID=" + data.msg_id
                var textNode = otherImg.getChildByName("text");
                var timesNode = otherImg.getChildByName("times");
                if (data.time) {
                    timesNode.getComponent(cc.Label).string = cc.gg.utils.timestampToTime(data.time);
                }
                if (!data.content) {
                    return
                }
                // var size = this.autoImg(text.sizeX, text.sizeY, textNode);
                // if (size) {
                //     otherImg.width = size.X;
                //     otherImg.height = size.X;
                //     textNode.width = size.Y;
                //     textNode.height = size.Y;
                // }
                // self.content.addChild(otherImg);
                // this.autoImg(text.msg, textNode, function () {
                //     otherImg.width = textNode.width;
                //     otherImg.height = textNode.height;
                //     if (time) {
                //         timesNode.getComponent(cc.Label).string = time;
                //     }

                //self.scrollview.getComponent(cc.ScrollView).scrollToBottom(0.3);
                //     cc.gg.utils.addClickEventEND(otherImg, self.magnifyImg.bind(self));
                // });

                cc.gg.utils.changeSpriteFrameWithServerUrlForWeb(textNode, data.content);
                cc.gg.utils.addClickEventEND(otherImg, self.magnifyImg.bind(self));
                if (first) {
                    self.content.insertChild(otherImg, 0);
                    self.scrollview.getComponent(cc.ScrollView).scrollToTop(0.3);
                } else {
                    self.content.addChild(otherImg);
                    // self.scrollview.getComponent(cc.ScrollView).scrollToBottom(0.3);
                }

                //otherImg.destroy()
            }
        }
    },
    moreMsg: function (node) {
        if (this.isUploadMsg) {
            console.log("正在加载退出");
            return
        }
        this.isUploadMsg = true;
        cc.gg.global.isMoreMsg = true
        this._gameView._scene.PushHistoryMsg(this.skip, 5)
    },
    //渲染对应图片
    initImg: function (data) {
        var imgNode = cc.find("scrollview/view/content/msgID=" + data.msg_id + "/text", this.node);
        //var msgBox = cc.find("scrollview/view/content/msgID=" + data.msgID, this.node);
        if (imgNode) {
            // this.newAutoImg(imgNode, data, function (size) {

            // })
            // alert("我在替换图片啊", data.msg)
            cc.gg.utils.changeSpriteFrameWithServerUrlForWeb(imgNode, data.content);
        } else {
            alert("图片未找到")
        }
    },
    //模拟获取焦点
    inputTextFun: function () {
        this._gameView._bottomPancel.setFocus()
    },
    //模拟发送消息
    bottomRightSendFun: function () {
        if (cc.gg.global.os == "ios") {
            var inputValue = document.getElementById("text").value;
            this._gameView._bottomPancel.setText(inputValue);
            this._gameView._centerPancel.inputText.active = false;
            this._gameView._bottomPancel.showAll()
            this._gameView._bottomPancel.privateChat()
        } else {
            this._gameView._bottomPancel.privateChat();
        }


    },
    //图片上传进度展示的方法
    XhrProgress: function (updateFile, data) {
        var percentComplete = data.percentComplete;
        var msgID = updateFile.msg_id;
        if (percentComplete && msgID) {
            var imgNode = cc.find("scrollview/view/content/msgID=" + msgID + "/text", this.node);
            var XhrProgress = cc.find("scrollview/view/content/msgID=" + msgID + "/XhrProgress", this.node);
            if (imgNode && XhrProgress) {
                console.log(Math.round((percentComplete / 100) * 250), "进度显示");
                imgNode.opacity = Math.round((percentComplete / 100) * 250);
                XhrProgress.active = true;
                XhrProgress.getComponent(cc.Label).string = percentComplete + "%";
                if (percentComplete == 100) {
                    XhrProgress.active = false;
                }
            } else {
                // alert("渲染图片未找到")
            }
        }
    },
    XhrError: function (updateFile) {
        var msgID = updateFile.msg_id;
        if (percentComplete && msgID) {
            var imgNode = cc.find("scrollview/view/content/msgID=" + msgID + "/text", this.node);
            var XhrProgress = cc.find("scrollview/view/content/msgID=" + msgID + "/XhrProgress", this.node);
            if (imgNode && XhrProgress) {
                XhrProgress.getComponent(cc.Label).string = "上传失败";
            } else {
                // alert("渲染图片未找到")
            }
        }
    },

    //根据返回的比例
    newAutoImg: function (imgNode, data, callFun) {
        var width = imgNode.width;
        var height = imgNode.height;

        if (data.width > 0 && data.height > 0 && data.width && data.height) {
            var size = {
                X: 0,
                Y: 0,
            }
            if (data.width >= data.height) {
                //采取宽适配
                var scale = width / data.width;
                size.Y = data.height * scale;
                size.X = width
            } else {
                //采取高适配
                var scale = height / data.height;
                size.X = data.width * scale;
                size.Y = height;
            }

            imgNode.parent.width = imgNode.width = size.X;
            imgNode.parent.height = imgNode.height = size.Y;

            cc.gg.utils.changeSpriteFrameWithServerUrlForWeb(imgNode, data.msg);
            if (callFun) {
                callFun(size)
            }
        }
    },
    //图片自适应方法   newImg方法 依赖性能
    autoImg: function (url, imgNode, callFun) {
        var img = new Image();
        img.src = url;
        img.onload = function () {
            //取渲染节点宽高
            var width = imgNode.width;
            var height = imgNode.height;
            if (this.width > 0 && this.height > 0 && this.width && this.height) {
                var size = {
                    X: 0,
                    Y: 0,
                }
                if (this.width >= this.height) {
                    //采取宽适配
                    var scale = width / this.width;
                    size.Y = this.height * scale;
                    size.X = width
                } else {
                    //采取高适配
                    var scale = height / this.height;
                    size.X = this.width * scale;
                    size.Y = height;
                }
                imgNode.width = size.X;
                imgNode.height = size.Y;
                cc.gg.utils.changeSpriteFrameWithServerUrlForWeb(imgNode, url);
                callFun()
            }
        }
    },
    //错误提示
    errorText: function (text) {
        this.alertStyle.active = true;
        this.title.getComponent(cc.Label).string = "提示";
        this.text.getComponent(cc.Label).string = text;
        this.cancel.active = false;
        cc.gg.global.alertType = 3;
    },
    //alert提示框
    alertBoxStyle: function (type) {
        cc.gg.utils.ccLog(cmd);
        cc.gg.global.alertType = type;
        //这里判断一下如果订单是结束状态不要弹窗横线提示  需求临时改动
        if (type == 8 || type == 9 || type == -21 || type == -23) {
            if (cmd.alertStyle[type]) {
                this.orderLineText.getComponent(cc.Label).string = "- - -    " + cmd.alertStyle[type].text + "   - - -"
                //this.scrollview.getComponent(cc.ScrollView).scrollToBottom(0.3);
            }
            this.orderLine.active = true;
            return
        }
        if (cmd.alertStyle[type]) {
            this.alertStyle.active = true;
            this.title.getComponent(cc.Label).string = cmd.alertStyle[type].title;
            this.text.getComponent(cc.Label).string = cmd.alertStyle[type].text;
            if (cmd.alertStyle[type].confirm) {
                this.confirm.active = true;
                this.confirm.getComponent(cc.Label).string = cmd.alertStyle[type].confirm;
            } else {
                this.confirm.active = false
            }
            if (cmd.alertStyle[type].cancel) {
                this.cancel.active = true
                this.cancel.getComponent(cc.Label).string = cmd.alertStyle[type].cancel
            } else {
                this.cancel.active = false;
            };
            return;
        } else {
            cc.gg.utils.ccLog("没有找到对应的样式类型")
            return
        }
    },
    alertButton: function (data, confirm) {
        // this.alertStyle.active = false;
        // return;
        var type = cc.gg.global.alertType;
        var accountID = cc.gg.global.userInfo.userID;
        if (!type) {
            //this.alertBoxStyle(-2);
            return;
        }
        if (confirm.isConfirm) {
            if (type == -1 || type == -2 || type == 8 || type == 5 || type == 6 || type == 9 || type == -20 || type == -21) {
                cc.director.loadScene("IMhallMain")
            } else if (type == 3 || type == 2 || type == 12 || type == -9 || type == -8 || type == -2 ||
                type == -3 || type == -44 || type == -45 || type == -15 || type == -5 || type == -6 ||
                type == -13 || type == -14 || type == -11 || type == -12 || type == -16 || type == -17 || type == 100 || type == -18 ||
                type == 13 || type == -22) {
                this.alertStyle.active = false;
            } else if (type == 11) {
                //发送重发指令  取msgid
            } else if (type == 4) {
                this.alertStyle.active = false;
                //发送取消订单的 
                this._gameView._scene.sendBuyerCancelOrder()
            }
        } else {
            if (type == -1 || type == -2 || type == 3 || type == 5) {
                cc.director.loadScene("IMhallMain")
            } else if (type == 4 || type == 8 || type == 11 || type == 6 || type == -8 || type == -2 ||
                type == -3 || type == -44 || type == -45 || type == -5 || type == -6 || type == 9) {
                this.alertStyle.active = false;
            }
        }
    },
    //恢复订单流程
    recoverOrder: function (isSellerId, type, data, first, msg) {
        console.log(data, "订单流程");
        console.log(data.order_status, "订单状态");

        if (data.order_status == 3) {
            this.addOrderEnd(isSellerId, data, first);
            return
        }
        if (data.msg_type == 5) {
            // if (!cc.gg.global.orderData) {
            //     cc.gg.global.orderData = data;
            // }
            var datas = JSON.parse(data.content)
            this.addOrderMsgType5(isSellerId, datas, first);
            console.log("msgType_5", datas);
            return
        }
        //每次进入赋值一下订单信息
        // if (!cc.gg.global.orderData || JSON.stringify(cc.gg.global.orderData) == "{}") {
        //     cc.gg.global.orderData = data;
        // }

        switch (type) {
            case 11:
                this.addOrderTypeOne(isSellerId, data, first);
                break;
            case 12:
                if (!cmd.order_id) {
                    cmd.order_id = data.order_id
                }
                this.addOrderTypeTwo(isSellerId, data, first);
                break;
            case 13:
                this.addOrderTypeThree(isSellerId, data, first);
                break;
            case 14:
                this.addOrderTypeFour(isSellerId, data, first);
                break;
            case 15:
                this.addOrderTypeFive(isSellerId, data, first);
                break;
            case 16:
                this.addOrderTypeSix(isSellerId, data, first);
                break;
            case 17:
                this.addOrderTypeSeven(isSellerId, data, first);
                break;
            default:
                console.log("无此用户状态")
        }
        if (first) {
            //this.scrollview.getComponent(cc.ScrollView).scrollToTop(0.3);
        } else {
            //this.scrollview.getComponent(cc.ScrollView).scrollToBottom(0.3);
        }

    },
    //订单结束
    addOrderEnd: function (isSellerId, data, first) {
        var node = cc.instantiate(this.orderLine);
        node.active = true;
        node.getChildByName("line").getComponent(cc.Label).string = "- - -    " + data.text + "   - - -";

        console.log("data 4646== ", data);

        if (data.text.indexOf("拒绝交易") > -1 || data.text.indexOf("取消交易") > -1 || data.text.indexOf("系统自动取消") > -1 || data.text.indexOf("取消了订单") > -1) {
            if (first) {
                this.content.insertChild(node, 0)
            } else {
                this.content.addChild(node)
            }
            return;
        }


        if (!isSellerId) {
            let newNode = cc.instantiate(this.orderOtherNodeAll[0]);
            let textNode = newNode.getChildByName("text");
            let textLabel = textNode.getComponent(cc.Label);
            textLabel.string = "我已确认收到付款，已为您充值" + data.amount + "金币，请返回游戏中查收！期待再次为您服务！";
            if (first) {
                this.content.insertChild(newNode, 0)
            } else {
                this.content.addChild(newNode)
            }
        } else {
            let newNode = cc.instantiate(this.orderMeNodeAll[0]);
            let textNode = newNode.getChildByName("text");
            let textLabel = textNode.getComponent(cc.Label);
            textLabel.string = "我已确认收到付款，已为您充值" + data.amount + "金币，请返回游戏中查收！期待再次为您服务！";
            if (first) {
                this.content.insertChild(newNode, 0)
            } else {
                this.content.addChild(newNode)
            }
        }



        if (first) {
            this.content.insertChild(node, 0)
        } else {
            this.content.addChild(node)
        }
    },

    /**
     * 点击图片时间
     * @param {*} target 
     */
    magnifyImg: function (target) {
        var url = this.getMsgImg(target.name);
        // console.log("url 111=== ",url);
        // console.log("target.name", target.name);
        if (!url && cc.sys.isNative) {
            let markLabelNode = target.getChildByName("markLabel");
            url = markLabelNode.getComponent(cc.Label).string;
        }
        this._gameView.showAlert(url);
    },

    //接受订单（确认订单）
    addOrderTypeOne: function (isSellerId, data, first) {
        if (isSellerId) {
            //this.orderMeNodeAll[0].active = true;
            var node = cc.instantiate(this.orderOtherNodeAll[0]);

            node.active = true
            node.getChildByName("text").getComponent(cc.Label).string = "亲爱的您好！欢迎光临小店，我是" + cc.gg.global.chatObj.to_nick + "，很高兴为你服务！"
            if (first) {
                this.content.insertChild(node, 0)
            } else {
                this.content.addChild(node)
            }

            //第二阶段  买家
            var nodeTwo = cc.instantiate(this.orderMeNodeAll[1]);
            var title = nodeTwo.getChildByName("text").getComponent(cc.Label);
            var name = nodeTwo.getChildByName("name");
            var unitPrice = nodeTwo.getChildByName("unitPrice");
            var orderSum = nodeTwo.getChildByName("orderSum");
            var money = nodeTwo.getChildByName("money");

            title.string = "你好，" + "请求充值" + data.amount + "游戏币，请确认订单信息！"
            name.getChildByName("name").getComponent(cc.Label).string = data.seller_id;
            unitPrice.getChildByName("price").getComponent(cc.Label).string = data.buyer_id ? data.buyer_id : 1;
            orderSum.getChildByName("orderTotal").getComponent(cc.Label).string = data.amount;
            money.getChildByName("money").getComponent(cc.Label).string = data.total_price;
            nodeTwo.active = true;

            var button = nodeTwo.getChildByName("button");
            var yes = button.getChildByName("yes");
            var cancel = button.getChildByName("cancel");
            cc.gg.utils.addClickEventEND(yes, this.orderConfirm.bind(this), {
                isConfirm: true,
                orderData: data,
                isSellerId: isSellerId,
                currentNode: nodeTwo
            });
            cc.gg.utils.addClickEventEND(cancel, this.orderConfirm.bind(this), {
                isConfirm: false,
                orderData: data,
                isSellerId: isSellerId,
                currentNode: nodeTwo
            });
            if (first) {
                this.content.insertChild(nodeTwo, 1);
            } else {
                this.content.addChild(nodeTwo);
            }

        } else {
            //this.orderOtherNodeAll[0].active = true;
            var node = cc.instantiate(this.orderMeNodeAll[0])
            node.active = true
            node.getChildByName("text").getComponent(cc.Label).string = "亲爱的您好！欢迎光临小店，我是" + cc.gg.global.chatObj.user_nick + "，很高兴为你服务！"

            console.log("cc.gg.global.chatObj.to_nick: ", cc.gg.global.chatObj);

            if (first) {
                this.content.insertChild(node, 0)
            } else {
                this.content.addChild(node)
            }

            var nodeTwo = cc.instantiate(this.orderOtherNodeAll[1]);

            var title = nodeTwo.getChildByName("text").getComponent(cc.Label);
            var name = nodeTwo.getChildByName("name");
            var unitPrice = nodeTwo.getChildByName("unitPrice");
            var orderSum = nodeTwo.getChildByName("orderSum");
            var money = nodeTwo.getChildByName("money");

            title.string = "你好，" + "请求充值" + data.amount + "游戏币，请确认订单信息！"
            name.getChildByName("name").getComponent(cc.Label).string = data.seller_id;
            unitPrice.getChildByName("price").getComponent(cc.Label).string = data.buyer_id ? data.buyer_id : 1;
            orderSum.getChildByName("orderTotal").getComponent(cc.Label).string = data.amount;
            money.getChildByName("money").getComponent(cc.Label).string = data.total_price;
            nodeTwo.active = true;
            //绑定确认取消时间
            var button = nodeTwo.getChildByName("button");
            var yes = button.getChildByName("yes");
            var cancel = button.getChildByName("cancel");
            cc.gg.utils.addClickEventEND(yes, this.orderConfirm.bind(this), {
                isConfirm: true,
                orderData: data,
                isSellerId: isSellerId,
                currentNode: nodeTwo
            });
            cc.gg.utils.addClickEventEND(cancel, this.orderConfirm.bind(this), {
                isConfirm: false,
                orderData: data,
                isSellerId: isSellerId,
                currentNode: nodeTwo
            });
            if (first) {
                this.content.insertChild(nodeTwo, 1);
            } else {
                this.content.addChild(nodeTwo);
            }

        }
    },
    addOrderMsgType5: function (isSellerId, data, first) {
        data.user_payment = JSON.parse(data.user_payment);
        if (isSellerId) {
            var node = cc.instantiate(this._gameView.meMgsType5);
            //var title = node.getChildByName("title");
            //var hint = node.getChildByName("hint");
            //title.getComponent(cc.Label).string = data.user_payment.pay_name + "收款信息"
            // hint.getComponent(cc.Label).string = "您可以复制" + data.apply_data.pay_name + "账号, 使用" + data.apply_data.pay_name + "付款";

            var itemOne = node.getChildByName("itemOne");
            var itemTwo = node.getChildByName("itemTwo");
            var itemThree = node.getChildByName("itemThree");
            var itemFour = node.getChildByName("itemFour");
            var itemFive = node.getChildByName("itemFive");
            var itemSix = node.getChildByName("itemSix");
            var itemSeven = node.getChildByName("itemSeven");

            var itemNameOne = itemOne.getChildByName("itemName").getComponent(cc.Label)
            var itemNameTwo = itemTwo.getChildByName("itemName").getComponent(cc.Label)
            var itemNameThree = itemThree.getChildByName("itemName").getComponent(cc.Label)
            var itemNameFour = itemFour.getChildByName("itemName").getComponent(cc.Label)
            var contentOne = itemOne.getChildByName("content").getComponent(cc.Label)
            var contentTwo = itemTwo.getChildByName("content").getComponent(cc.Label)
            var contentThree = itemThree.getChildByName("content").getComponent(cc.Label)
            var contentFour = itemFour.getChildByName("content").getComponent(cc.Label)
            var contentFive = itemFive.getChildByName("content").getComponent(cc.Label)
            var contentSix = itemSix.getChildByName("content").getComponent(cc.Label)
            var contentSeven = itemSeven.getChildByName("content").getComponent(cc.Label)
            contentSix.string = data.order_id
            contentFive.string = data.exchange_amount;
            contentSeven.string = data.exchange_gold

            if (data.user_payment.pay_id == 1) {
                //微信  二维码
            } else if (data.user_payment.pay_id == 2) {
                //支付宝
                itemNameOne.string = "支付宝账号"
                itemNameTwo.string = "支付宝姓"
                itemNameThree.string = "支付宝名"
                itemNameFour.string = "支付宝姓名"
                contentOne.string = data.user_payment.alipay.account_card
                contentTwo.string = data.user_payment.alipay.account_surname
                contentThree.string = data.user_payment.alipay.account_first_name
                contentFour.string = data.user_payment.alipay.account_name;

            } else if (data.user_payment.pay_id == 3) {
                //银行卡
                itemNameOne.string = "银行卡卡号"
                itemNameTwo.string = "收款卡姓名"
                itemNameThree.string = "开户银行"
                itemNameFour.string = "开户行支行"
                contentOne.string = data.user_payment.bank_card_pay.card_num
                contentTwo.string = data.user_payment.bank_card_pay.card_name
                contentThree.string = data.user_payment.bank_card_pay.bank_name
                contentFour.string = data.user_payment.bank_card_pay.branch_name;
            } else if (data.user_payment.pay_id == 4) {
                //花呗  二维码
            } else if (data.user_payment.pay_id == 5) {
                //信用卡  二维码
            }
            cc.gg.utils.addClickEventEND(itemSix.getChildByName("copy"), this.copyTxt.bind(this), {
                data: contentSix.string,
                node: 5
            });
            node.active = true;
            if (first) {
                this.content.insertChild(node, 0)
            } else {
                this.content.addChild(node)
            }

        } else {
            var node = cc.instantiate(this._gameView.outherMsgType5);
            var title = node.getChildByName("title");
            //var hint = node.getChildByName("hint");
            title.getComponent(cc.Label).string = data.user_payment.pay_name + "收款信息"
            //hint.getComponent(cc.Label).string = "你可以复制" + data.user_payment.pay_name + "账号, 使用" + data.user_payment.pay_name + "付款";
            var itemOne = node.getChildByName("itemOne");
            var itemTwo = node.getChildByName("itemTwo");
            var itemThree = node.getChildByName("itemThree");
            var itemFour = node.getChildByName("itemFour");
            var itemFive = node.getChildByName("itemFive");
            var itemSix = node.getChildByName("itemSix");
            var itemSeven = node.getChildByName("itemSeven");
            var button = node.getChildByName("button");
            //var itemFiveImg = itemFive.getChildByName("content").getChildByName("content")
            //itemFive.active = false; //默认隐藏

            var itemNameOne = itemOne.getChildByName("itemName").getComponent(cc.Label)
            var itemNameTwo = itemTwo.getChildByName("itemName").getComponent(cc.Label)
            var itemNameThree = itemThree.getChildByName("itemName").getComponent(cc.Label)
            var itemNameFour = itemFour.getChildByName("itemName").getComponent(cc.Label)
            var contentOne = itemOne.getChildByName("content").getComponent(cc.Label)
            var contentTwo = itemTwo.getChildByName("content").getComponent(cc.Label)
            var contentThree = itemThree.getChildByName("content").getComponent(cc.Label)
            var contentFour = itemFour.getChildByName("content").getComponent(cc.Label)
            var contentFive = itemFive.getChildByName("content").getComponent(cc.Label)
            var contentSix = itemSix.getChildByName("content").getComponent(cc.Label)
            var contentSeven = itemSeven.getChildByName("content").getComponent(cc.Label)
            contentSix.string = data.order_id
            contentFive.string = data.exchange_amount;
            contentSeven.string = data.exchange_gold

            if (data.user_payment.pay_id == 1) {
                //微信  二维码
            } else if (data.user_payment.pay_id == 2) {
                //支付宝
                itemNameOne.string = "支付宝账号"
                itemNameTwo.string = "支付宝姓"
                itemNameThree.string = "支付宝名"
                itemNameFour.string = "支付宝姓名"
                contentOne.string = data.user_payment.alipay.account_card
                contentTwo.string = data.user_payment.alipay.account_surname
                contentThree.string = data.user_payment.alipay.account_first_name
                contentFour.string = data.user_payment.alipay.account_name;
                //data.user_payment.alipay.pay_url = "HTTPS://QR.ALIPAY.COM/FKX05986VXG57BG33UKD5F4?T=1562573730280";
                //console.log(data.user_payment.alipay.pay_url + "ababab")
                // if (data.user_payment.alipay.pay_url != "") {
                //     var dom = document.createElement("div");
                //     dom.id = "code";
                //     document.getElementById("Cocos2dGameContainer").appendChild(dom);
                //     var qrcode = new QRCode($('#code')[0], {
                //         render: 'canvas||table',
                //         width: 200, //宽度
                //         height: 200, //高度
                //         text: data.user_payment.alipay.pay_url //任意内容
                //     });

                //     var canvas = $("#code").find('canvas').get(0);
                //     //如果有循环,此句必不可少 qrcode.find('canvas').remove();
                //     var imgBaseData = canvas.toDataURL('image/jpg');
                //     cc.gg.utils.changeSpriteFrameWithServerUrlForWeb(itemFiveImg, imgBaseData)
                //     itemFive.active = true;
                //     $("#code").remove();
                //     // qrcode.find('canvas').remove()
                // }
            } else if (data.user_payment.pay_id == 3) {
                //银行卡
                itemNameOne.string = "银行卡卡号"
                itemNameTwo.string = "收款卡姓名"
                itemNameThree.string = "开户银行"
                itemNameFour.string = "开户行支行"
                contentOne.string = data.user_payment.bank_card_pay.card_num
                contentTwo.string = data.user_payment.bank_card_pay.card_name
                contentThree.string = data.user_payment.bank_card_pay.bank_name
                contentFour.string = data.user_payment.bank_card_pay.branch_name;
            } else if (data.user_payment.pay_id == 4) {
                //花呗  二维码
            } else if (data.user_payment.pay_id == 5) {
                //信用卡  二维码
            }
            cc.gg.utils.ccLog(contentOne.string, "aaaaaaaaaaaaaaaaaaaaaaaaa")
            cc.gg.utils.addClickEventEND(itemOne.getChildByName("copy"), this.copyTxt.bind(this), {
                data: contentOne.string,
                node: 1
            });
            cc.gg.utils.addClickEventEND(itemTwo.getChildByName("copy"), this.copyTxt.bind(this), {
                data: contentTwo.string,
                node: 2
            });
            cc.gg.utils.addClickEventEND(itemThree.getChildByName("copy"), this.copyTxt.bind(this), {
                data: contentThree.string,
                node: 3
            });
            cc.gg.utils.addClickEventEND(itemFour.getChildByName("copy"), this.copyTxt.bind(this), {
                data: contentFour.string,
                node: 4
            });
            cc.gg.utils.addClickEventEND(itemSix.getChildByName("copy"), this.copyTxt.bind(this), {
                data: contentSix.string,
                node: 5
            });
            cc.gg.utils.addClickEventEND(button.getChildByName("confirm"), this.exchange.bind(this), {
                isConfirm: true,
                orderData: data,
            });

            cc.gg.utils.addClickEventEND(button.getChildByName("cancel"), this.exchange.bind(this), {
                isConfirm: false,
                orderData: data,
            });
            if (first) {
                this.content.insertChild(node, 0)
            } else {
                this.content.addChild(node)
            }

        }
    },

    addOrderTypeTwo: function (isSellerId, data, first) {
        //收款方式 商家是me
        // var payData = data.way;
        // if (!payData[0]) {
        //     this.alertBoxStyle(5)
        // }    

        if (isSellerId) {
            var node = cc.instantiate(this.orderMeNodeAll[2]);
            node.active = true
            var title = node.getChildByName("text").getComponent(cc.Label);
            let priceTextLabel = node.getChildByName("priceText").getComponent(cc.Label);
            // var payList = node.getChildByName("payItem");
            var button = node.getChildByName("button");
            var confirm = button.getChildByName("confirm");
            var cancel = button.getChildByName("cancel");
            priceTextLabel.string = "订单金额： " + data.amount;

            // title.string = "感谢您耐心等待，你本次申请充值的" + data.amount + "游戏币可以选择以下方式进行支付："
            title.string = "订单已经接受，请务必根据提供的交易方式和充值金额进行付款。付款完成后，请点击下方按钮。"
            // cc.gg.utils.ccLog(data, "paydata")
            // payList.height = 80 * payData.length;
            // // payList.removeAllChildren()
            // for (var i = 0; i < payData.length; i++) {
            //     var item = cc.instantiate(payList.getChildByName("item"));
            //     item.active = true;
            //     item.setPosition(0, 20 - (80 * i));
            //     item.getChildByName("payName").getComponent(cc.Label).string = payData[i].pay_name;
            //     payList.addChild(item);
            // }
            cc.gg.utils.addClickEventEND(confirm, this.isBuyerApplyConfirmAgain.bind(this), {
                isConfirm: false,
                orderData: data,
                isSellerId: isSellerId,
                currentNode: node
            });
            cc.gg.utils.addClickEventEND(cancel, this.isBuyerApplyConfirmAgain.bind(this), {
                isConfirm: false,
                orderData: data,
                isSellerId: isSellerId,
                currentNode: node
            });
            if (first) {
                this.content.insertChild(node, 0)
            } else {
                this.content.addChild(node)
            }

        } else {
            var node = cc.instantiate(this.orderOtherNodeAll[2]);
            var title = node.getChildByName("text").getComponent(cc.Label);
            let priceTextLabel = node.getChildByName("priceText").getComponent(cc.Label);
            // title.string = "感谢您耐心等待，你本次申请充值的" + data.amount + "游戏币可以选择以下方式进行支付："
            title.string = "订单已经接受，请务必根据提供的交易方式和充值金额进行付款。付款完成后，请点击下方按钮。";
            priceTextLabel.string = "订单金额： " + data.amount;

            // var payList = node.getChildByName("payItem");
            var button = node.getChildByName("button");
            var confirm = button.getChildByName("confirm");
            var cancel = button.getChildByName("cancel");
            // payList.height = 70 * payData.length;
            // for (var i = 0; i < payData.length; i++) {
            //     var itemNode = payList.getChildByName("item")
            //     var item = cc.instantiate(itemNode);
            //     item.active = true;
            //     item.setPosition(0, 20 - (80 * i));
            //     var check = item.getChildByName("check");
            //     item.getChildByName("payName").getComponent(cc.Label).string = payData[i].pay_name;
            //     check.name = "selectPay" + payData[i].pay_id
            //     cc.gg.utils.addClickEventEND(check, this.checkPay.bind(this), {
            //         payId: payData[i].pay_id
            //     });
            //     payList.addChild(item);
            // }

            cc.gg.utils.addClickEventEND(confirm, this.isBuyerApplyConfirmAgain.bind(this), {
                isConfirm: true,
                orderData: data,
                isSellerId: isSellerId,
                currentNode: node
            });
            cc.gg.utils.addClickEventEND(cancel, this.isBuyerApplyConfirmAgain.bind(this), {
                isConfirm: false,
                orderData: data,
                isSellerId: isSellerId,
                currentNode: node
            });
            node.active = true;
            if (first) {
                this.content.insertChild(node, 0)
            } else {
                this.content.addChild(node)
            }

        }

    },
    //显示商家的收款详情
    addOrderTypeThree: function (isSellerId, data, first) {
        if (!isSellerId) {
            var node = cc.instantiate(this.orderMeNodeAll[4]);
            var title = node.getChildByName("title");
            var hint = node.getChildByName("hint");
            title.getComponent(cc.Label).string = data.apply_data.pay_name + "收款信息"
            hint.getComponent(cc.Label).string = "您可以复制" + data.apply_data.pay_name + "账号, 使用" + data.apply_data.pay_name + "付款";

            var itemOne = node.getChildByName("itemOne");
            var itemTwo = node.getChildByName("itemTwo");
            var itemThree = node.getChildByName("itemThree");
            var itemFour = node.getChildByName("itemFour");
            var itemNameOne = itemOne.getChildByName("itemName").getComponent(cc.Label)
            var itemNameTwo = itemTwo.getChildByName("itemName").getComponent(cc.Label)
            var itemNameThree = itemThree.getChildByName("itemName").getComponent(cc.Label)
            var itemNameFour = itemFour.getChildByName("itemName").getComponent(cc.Label)
            var contentOne = itemOne.getChildByName("content").getComponent(cc.Label)
            var contentTwo = itemTwo.getChildByName("content").getComponent(cc.Label)
            var contentThree = itemThree.getChildByName("content").getComponent(cc.Label)
            var contentFour = itemFour.getChildByName("content").getComponent(cc.Label)

            if (data.apply_data.pay_id == 1) {
                //微信  二维码
            } else if (data.apply_data.pay_id == 2) {
                //支付宝
                itemNameOne.string = "支付宝账号"
                itemNameTwo.string = "支付宝姓"
                itemNameThree.string = "支付宝名"
                itemNameFour.string = "支付宝姓名"
                contentOne.string = data.apply_data.alipay.account_card
                contentTwo.string = data.apply_data.alipay.account_surname
                contentThree.string = data.apply_data.alipay.account_first_name
                contentFour.string = data.apply_data.alipay.account_name;

            } else if (data.apply_data.pay_id == 3) {
                //银行卡
                itemNameOne.string = "银行卡号"
                itemNameTwo.string = "银行卡名"
                itemNameThree.string = "银行名"
                itemNameFour.string = "银行分行"
                contentOne.string = data.apply_data.bank_card_pay.card_num
                contentTwo.string = data.apply_data.bank_card_pay.card_name
                contentThree.string = data.apply_data.bank_card_pay.bank_name
                contentFour.string = data.apply_data.bank_card_pay.branch_name;
            } else if (data.apply_data.pay_id == 4) {
                //花呗  二维码
            } else if (data.apply_data.pay_id == 5) {
                //信用卡  二维码
            }
            node.active = true;
            if (first) {
                this.content.insertChild(node, 0)
            } else {
                this.content.addChild(node)
            }

            var node = cc.instantiate(this.orderOtherNodeAll[5]);
            node.active = true;
            if (first) {
                this.content.insertChild(node, 1)
            } else {
                this.content.addChild(node)
            }


        } else {
            var node = cc.instantiate(this.orderOtherNodeAll[4]);
            var title = node.getChildByName("title");
            var hint = node.getChildByName("hint");
            title.getComponent(cc.Label).string = data.apply_data.pay_name + "收款信息"
            hint.getComponent(cc.Label).string = "你可以复制" + data.apply_data.pay_name + "账号, 使用" + data.apply_data.pay_name + "付款";
            var itemOne = node.getChildByName("itemOne");
            var itemTwo = node.getChildByName("itemTwo");
            var itemThree = node.getChildByName("itemThree");
            var itemFour = node.getChildByName("itemFour");
            var itemFive = node.getChildByName("itemFive");
            var itemFiveImg = itemFive.getChildByName("content").getChildByName("content")
            itemFive.active = false; //默认隐藏

            var itemNameOne = itemOne.getChildByName("itemName").getComponent(cc.Label)
            var itemNameTwo = itemTwo.getChildByName("itemName").getComponent(cc.Label)
            var itemNameThree = itemThree.getChildByName("itemName").getComponent(cc.Label)
            var itemNameFour = itemFour.getChildByName("itemName").getComponent(cc.Label)
            var contentOne = itemOne.getChildByName("content").getComponent(cc.Label)
            var contentTwo = itemTwo.getChildByName("content").getComponent(cc.Label)
            var contentThree = itemThree.getChildByName("content").getComponent(cc.Label)
            var contentFour = itemFour.getChildByName("content").getComponent(cc.Label)

            if (data.apply_data.pay_id == 1) {
                //微信  二维码
            } else if (data.apply_data.pay_id == 2) {
                //支付宝
                itemNameOne.string = "支付宝账号"
                itemNameTwo.string = "支付宝姓"
                itemNameThree.string = "支付宝名"
                itemNameFour.string = "支付宝姓名"
                contentOne.string = data.apply_data.alipay.account_card
                contentTwo.string = data.apply_data.alipay.account_surname
                contentThree.string = data.apply_data.alipay.account_first_name
                contentFour.string = data.apply_data.alipay.account_name;
                //data.apply_data.alipay.pay_url = "HTTPS://QR.ALIPAY.COM/FKX05986VXG57BG33UKD5F4?T=1562573730280";
                //console.log(data.apply_data.alipay.pay_url + "ababab")
                // if (data.apply_data.alipay.pay_url != "") {
                //     var dom = document.createElement("div");
                //     dom.id = "code";
                //     document.getElementById("Cocos2dGameContainer").appendChild(dom);
                //     var qrcode = new QRCode($('#code')[0], {
                //         render: 'canvas||table',
                //         width: 200, //宽度
                //         height: 200, //高度
                //         text: data.apply_data.alipay.pay_url //任意内容
                //     });

                //     var canvas = $("#code").find('canvas').get(0);
                //     //如果有循环,此句必不可少 qrcode.find('canvas').remove();
                //     var imgBaseData = canvas.toDataURL('image/jpg');
                //     cc.gg.utils.changeSpriteFrameWithServerUrlForWeb(itemFiveImg, imgBaseData)
                //     itemFive.active = true;
                //     $("#code").remove();
                //     // qrcode.find('canvas').remove()
                // }
            } else if (data.apply_data.pay_id == 3) {
                //银行卡
                itemNameOne.string = "银行卡号"
                itemNameTwo.string = "银行卡名"
                itemNameThree.string = "银行名"
                itemNameFour.string = "银行分行"
                contentOne.string = data.apply_data.bank_card_pay.card_num
                contentTwo.string = data.apply_data.bank_card_pay.card_name
                contentThree.string = data.apply_data.bank_card_pay.bank_name
                contentFour.string = data.apply_data.bank_card_pay.branch_name;
            } else if (data.apply_data.pay_id == 4) {
                //花呗  二维码
            } else if (data.apply_data.pay_id == 5) {
                //信用卡  二维码
            }
            cc.gg.utils.addClickEventEND(itemOne.getChildByName("copy"), this.copyTxt.bind(this), {
                data: contentOne.string,
                node: 1
            });
            cc.gg.utils.addClickEventEND(itemTwo.getChildByName("copy"), this.copyTxt.bind(this), {
                data: contentTwo.string,
                node: 2
            });
            cc.gg.utils.addClickEventEND(itemThree.getChildByName("copy"), this.copyTxt.bind(this), {
                data: contentThree.string,
                node: 3
            });
            cc.gg.utils.addClickEventEND(itemFour.getChildByName("copy"), this.copyTxt.bind(this), {
                data: contentFour.string,
                node: 4
            });
            if (first) {
                this.content.insertChild(node, 0)
            } else {
                this.content.addChild(node)
            }

            var node = cc.instantiate(this.orderMeNodeAll[5]);
            var button = node.getChildByName("button");
            var order = node.getChildByName("order");
            var orderId = order.getChildByName("orderID");
            var copy = order.getChildByName("confirm");
            if (cmd.order_id) {
                orderId.getComponent(cc.Label).string = cmd.order_id
            }
            cc.gg.utils.addClickEventEND(button.getChildByName("confirm"), this.GetBuyerApplyWay.bind(this), {
                isConfirm: true,
                orderData: data,
            });

            cc.gg.utils.addClickEventEND(button.getChildByName("cancel"), this.GetBuyerApplyWay.bind(this), {
                isConfirm: false,
                orderData: data,
            });
            cc.gg.utils.ccLog("cmd.orderId", cmd.order_id)
            cc.gg.utils.addClickEventEND(copy, this.copyTxt.bind(this), {
                data: cmd.order_id,
                node: 5
            });
            if (first) {
                this.content.insertChild(node, 1);
            } else {
                this.content.addChild(node);
            }

        }
    },


    //买家取消交易
    CancelTransaction: function (node, data) {
        if (data.orderData.transaction_id != cc.gg.global.orderData.transaction_id) {
            this.errorText("订单已完结请勿操作");
            return
        }
        this._gameView._scene.sendCancelTransaction()
    },
    checkPay: function (node, checkType) {
        var checkAll = node.parent.parent;
        for (var i = 0; i < checkAll.childrenCount; i++) {
            var item = checkAll.children[i]
            if (item.children[0].name == "selectPay" + checkType.payId) {
                item.children[0].children[0].active = true
            } else {
                item.children[0].children[0].active = false;
            }
        }
    },
    isPay: function (node, isPayObj) {
        console.log("isPayObj: ", isPayObj)
        if (isPayObj.orderData.transaction_id != cc.gg.global.orderData.transaction_id) {
            this.errorText("订单已完结请勿操作");
            return
        }
        var transactionNode = node.parent.parent
        if (isPayObj.isPay) {
            var checkAll = transactionNode.getChildByName("payItem");
            // var payID = null;
            // for (var i = 0; i < checkAll.childrenCount; i++) {
            //     var item = checkAll.children[i]
            //     if (item.children[0].children[0].active == true) {
            //         var checkName = item.children[0].name;
            //         if (checkName.indexOf("selectPay") == -1) {
            //             //调取弹窗
            //             this.alertBoxStyle(-12)
            //             return;
            //         } else {
            //             payID = checkName.substr(9);
            //         }
            //     }
            // }
            // if (!payID) {
            //     this.alertBoxStyle(-12);
            //     return
            // }
            var chatObj = cc.gg.global.orderData;
            // var payName = null;
            // if (payID == 2) {
            //     payName = "支付宝"
            // } else if (payID == 3) {
            //     payName = "银行卡"
            // }
            var data = {
                transaction_id: chatObj.transaction_id,
                seller_id: chatObj.seller_id,
                buyer_id: chatObj.buyer_id,
                // pay_name: payName,
                // pay_id: payID,
                transaction_status: chatObj.transaction_status
            }
            this._gameView._scene.sendSelectApplyWay(data);
        } else {
            //买家发送取消
            this.alertBoxStyle(4)
        }

    },
    // 人工兑换
    exchange: function (data, confirm) {
        //发送拉取买家付款方式
        this._gameView._scene.sendExchange(confirm.isConfirm ? 1 : -1);

    },
    GetBuyerApplyWay: function (data, Confirm) {
        if (Confirm.orderData.transaction_id != cc.gg.global.orderData.transaction_id) {
            this.errorText("订单已完结请勿操作");
            return
        }
        if (Confirm.isConfirm) {
            //发送拉取买家付款方式
            this._gameView._scene.sendGetBuyerApplyWay();
        } else {
            this.alertBoxStyle(4);
        }
    },


    copyTxt: function (node, datas) {
        if (cc.sys.isNative) {
            if (gHandler.Reflect && datas) {
                if (gHandler.Reflect.setClipboard(datas.data)) {
                    this.runAlert("复制成功");
                } else {
                    this.runAlert("复制失败");
                }
            }
            return;
        }

        if (datas) {
            cc.gg.utils.webCopyString(datas.data);
            cc.gg.utils.ccLog(datas.data)
            this._gameView._topPancel.runAlert("复制成功");
        } else {
            //this.alertBoxStyle(-10)
            this._gameView._topPancel.runAlert("复制失败");
        }

    },
    addOrderTypeFour: function (isSellerId, data, first) {

        if (!isSellerId) {
            //商家 显示买家正在确认付款方式
            var node = cc.instantiate(this.orderOtherNodeAll[6]);
            if (first) {
                this.content.insertChild(node, 0);
            } else {
                this.content.addChild(node);
            }
        } else {
            //买家 显示付款列表
            var node = cc.instantiate(this.orderMeNodeAll[6]);
            var payList = node.getChildByName("payItem");
            var index = 0;
            cc.gg.global.payList = [];
            payList.height = ((data.bank_card ? data.bank_card.length : 0) + (data.alipay ? data.alipay.length : 0)) * 120;
            if (data.bank_card) {
                //有银行卡信息
                for (var i = 0; i < data.bank_card.length; i++) {
                    var itemNode = payList.getChildByName("item");
                    itemNode.active = false;
                    var item = cc.instantiate(itemNode);
                    item.active = true;
                    item.setPosition(0, -(120 * index));
                    item.getChildByName("payAccount").getComponent(cc.Label).string = data.bank_card[i].card_num;
                    item.getChildByName("name").getComponent(cc.Label).string = data.bank_card[i].branch_name;
                    item.getChildByName("payName").getComponent(cc.Label).string = data.bank_card[i].bank_name;
                    var check = item.getChildByName("check");
                    item.getChildByName("check").name = "selectPay" + index
                    cc.gg.utils.addClickEventEND(check, this.selectBuyerApplyWay.bind(this), {
                        payId: index
                    });
                    cc.gg.global.payList.push(data.bank_card[i])
                    payList.addChild(item);
                    index++;
                }

            }
            if (data.alipay) {
                //有支付宝信息
                for (var i = 0; i < data.alipay.length; i++) {
                    var itemNode = payList.getChildByName("item");
                    itemNode.active = false;
                    var item = cc.instantiate(itemNode);
                    item.active = true;
                    item.setPosition(0, -(120 * index));
                    item.getChildByName("payAccount").getComponent(cc.Label).string = data.alipay[i].account_card;
                    item.getChildByName("name").getComponent(cc.Label).string = data.alipay[i].account_name;
                    item.getChildByName("payName").getComponent(cc.Label).string = "支付宝";
                    var check = item.getChildByName("check");
                    item.getChildByName("check").name = "selectPay" + index
                    cc.gg.utils.addClickEventEND(check, this.selectBuyerApplyWay.bind(this), {
                        payId: index
                    });
                    cc.gg.global.payList.push(data.alipay[i])
                    payList.addChild(item);
                    index++;
                }

            }
            if (index == 0) {
                this.alertBoxStyle("6");
                return
            }
            //点击事件  
            var button = node.getChildByName("button");
            var confirm = button.getChildByName("confirm");
            var cancel = button.getChildByName("cancel");
            cc.gg.utils.addClickEventEND(confirm, this.isBuyerApplyConfirm.bind(this), {
                isConfirm: true,
                orderData: data,
            });
            cc.gg.utils.addClickEventEND(cancel, this.isBuyerApplyConfirm.bind(this), {
                isConfirm: false,
                orderData: data
            });

            if (first) {
                this.content.insertChild(node, 0);
            } else {
                this.content.addChild(node);
            }
        }
    },
    addOrderTypeFive: function (isSellerId, data, first) {

        if (!isSellerId) {
            //商家
            var node = cc.instantiate(this.orderMeNodeAll[7])
            // var itemOne = node.getChildByName("itemOne");
            // var itemTwo = node.getChildByName("itemTwo");
            // var itemThree = node.getChildByName("itemThree");
            // var itemFour = node.getChildByName("itemFour");
            // var itemNameOne = itemOne.getChildByName("itemName").getComponent(cc.Label)
            // var itemNameTwo = itemTwo.getChildByName("itemName").getComponent(cc.Label)
            // var itemNameThree = itemThree.getChildByName("itemName").getComponent(cc.Label)
            // var itemNameFour = itemFour.getChildByName("itemName").getComponent(cc.Label)
            // var contentOne = itemOne.getChildByName("content").getComponent(cc.Label)
            // var contentTwo = itemTwo.getChildByName("content").getComponent(cc.Label)
            // var contentThree = itemThree.getChildByName("content").getComponent(cc.Label)
            // var contentFour = itemFour.getChildByName("content").getComponent(cc.Label)
            // if (data.apply_data.pay_id == 2) {
            //     cc.gg.utils.ccLog(data.alipay);
            //     itemNameOne.string = "支付宝账号"
            //     itemNameTwo.string = "支付宝姓"
            //     itemNameThree.string = "支付宝名"
            //     itemNameFour.string = "支付宝姓名"
            //     contentOne.string = data.apply_data.alipay.account_card
            //     contentTwo.string = data.apply_data.alipay.account_surname
            //     contentThree.string = data.apply_data.alipay.account_first_name
            //     contentFour.string = data.apply_data.alipay.account_name;
            // } else if (data.apply_data.pay_id == 3) {
            //     cc.gg.utils.ccLog(data.bank_card_pay);
            //     itemNameOne.string = "银行卡账号"
            //     itemNameTwo.string = "卡主"
            //     itemNameThree.string = "银行名"
            //     itemNameFour.string = "银行分行"
            //     contentOne.string = data.apply_data.bank_card_pay.card_num
            //     contentTwo.string = data.apply_data.bank_card_pay.card_name
            //     contentThree.string = data.apply_data.bank_card_pay.bank_name
            //     contentFour.string = data.apply_data.bank_card_pay.branch_name;
            // }
            node.active = true;
            var button = node.getChildByName("button");
            var confirm = button.getChildByName("confirm");
            var cancel = button.getChildByName("cancel");
            cc.gg.utils.addClickEventEND(confirm, this.isConfirmReceiveResp.bind(this), {
                isConfirm: true,
                orderData: data,
            });
            cc.gg.utils.addClickEventEND(cancel, this.isConfirmReceiveResp.bind(this), {
                isConfirm: false,
                orderData: data,
            });

            //商家确认收款
            let newNode = cc.instantiate(this.orderOtherNodeAll[10]);
            newNode.active = true;
            var button = newNode.getChildByName("button");
            var confirm = button.getChildByName("yes");
            cc.gg.utils.addClickEventEND(confirm, this.isConfirmReceiveResp.bind(this), {
                isConfirm: true,
                orderData: data,
                currentNode: newNode
            });

            let textNode = newNode.getChildByName("text");
            textNode.getComponent(cc.Label).string = "您好，我已经完成付款" + data.amount + "元，请您查收！";

            let newNode2 = cc.instantiate(this.orderMeNodeAll[0]);
            newNode2.active = true;
            let textNode2 = newNode2.getChildByName("text");
            textNode2.getComponent(cc.Label).string = "正在确认到款情况，请稍后！";

            if (first) {
                this.content.insertChild(newNode, 0);
                this.content.insertChild(newNode2, 0);
            } else {
                this.content.addChild(newNode);
                this.content.addChild(newNode2);
            }
        } else {
            //买家 显示等待商家确认
            var node = cc.instantiate(this.orderOtherNodeAll[7]);
            node.active = true;
            //玩家发消息给商家
            let newNode = cc.instantiate(this.orderMeNodeAll[10]);
            newNode.active = true;
            var button = newNode.getChildByName("button");
            var confirm = button.getChildByName("yes");
            cc.gg.utils.addClickEventEND(confirm, this.isConfirmReceiveResp.bind(this), {
                isConfirm: false,
                orderData: data,
                currentNode: newNode
            });

            let textNode = newNode.getChildByName("text");
            textNode.getComponent(cc.Label).string = "您好，我已经完成付款" + data.amount + "元，请您查收！";



            if (first) {
                this.content.insertChild(newNode, 0);
                this.content.insertChild(node, 0);
            } else {
                this.content.addChild(newNode);
                this.content.addChild(node);
            }
        }
    },

    addOrderTypeSix: function (isSellerId, data, first) {
        if (isSellerId) {
            var node = cc.instantiate(this.orderMeNodeAll[8]);
            node.active = true;
            if (first) {
                this.content.insertChild(node, 0);
            } else {
                this.content.addChild(node);
            }
        } else {
            var node = cc.instantiate(this.orderOtherNodeAll[8]);
            var button = node.getChildByName("button");
            var confirm = button.getChildByName("confirm")
            var cancel = button.getChildByName("cancel")
            cc.gg.utils.addClickEventEND(confirm, this.isBuyerApplyConfirmAgain.bind(this), {
                isConfirm: true,
                orderData: data,
            })
            cc.gg.utils.addClickEventEND(cancel, this.isBuyerApplyConfirmAgain.bind(this), {
                isConfirm: false,
                orderData: data,
            })
            node.active = true;
            if (first) {
                this.content.insertChild(node, 0);
            } else {
                this.content.addChild(node);
            }
        }
    },
    addOrderTypeSeven: function (isSellerId, data, first) {
        if (!isSellerId) {
            var node = cc.instantiate(this.orderOtherNodeAll[9]);
            node.active = true;
            var button = node.getChildByName("button");
            var confirm = button.getChildByName("confirm")
            cc.gg.utils.addClickEventEND(confirm, this.isConfirmReceiveResp.bind(this), {
                isConfirm: true,
                orderData: data,
            })
            if (first) {
                this.content.insertChild(node, 0);
            } else {
                this.content.addChild(node);
            }
        } else {
            var node = cc.instantiate(this.orderMeNodeAll[9]);
            node.active = true;
            if (first) {
                this.content.insertChild(node, 0);
            } else {
                this.content.addChild(node);
            }
        }
    },


    //买家点击 确认已付款 和 取消订单的操作
    isBuyerApplyConfirmAgain: function (data, isConfirm) {
        
        // if (isConfirm.orderData.transaction_id != cc.gg.global.orderData.transaction_id) {
        //     this.errorText("订单已完结请勿操作！");
        //     return
        // }

        //按钮变灰
        let currentNode = isConfirm.currentNode;
        

        let button = currentNode.getChildByName("button");
        let confirm = button.getChildByName("confirm");
        let cancel = button.getChildByName("cancel");
        let confirmGray = button.getChildByName("confirmGray");
        let cancelGray = button.getChildByName("cancelGray");

        if (confirm.active) {
            confirm.active = false;
            confirmGray.active = true;
        }

        if (cancel.active) {
            cancel.active = false;
            cancelGray.active = true;
        }

        if (isConfirm.isSellerId) {
            this.errorText("此操作由玩家处理！");
            return
        }

        let dataObj = isConfirm.orderData;


        if (isConfirm.isConfirm) {
            this._gameView._scene.sendBuyerApplyConfirmAgain(dataObj)
        } else {
            this._gameView._scene.sendBuyerCancelOrder(dataObj)
        }
    },
    //商家确认收款的操作
    isConfirmReceiveResp: function (data, isConfirm) {
        
        // if (isConfirm.orderData.transaction_id != cc.gg.global.orderData.transaction_id) {
        //     this.errorText("订单已完结请勿操作！");
        //     return
        // }

        //变灰
        let newNode = isConfirm.currentNode;
        var button = newNode.getChildByName("button");
        var confirm = button.getChildByName("yes");
        let yesGray = button.getChildByName("yesGray");
        if(confirm.active) {
            confirm.active = false;
            yesGray.active = true;
        }

        if (!isConfirm.isConfirm) {
            this.errorText("此操作由商家处理！");
            return
        }

        let orderData = isConfirm.orderData;
        if (isConfirm.isConfirm) {
            //确认收款  
            this._gameView._scene.sendSellerReceiveConfirm(orderData)
        } else {
            //发送催单操作
            this._gameView._scene.sendSellerDunning(orderData)
        }
    },
    //确认支付方式
    isBuyerApplyConfirm: function (node, isConfirm) {
        if (isConfirm.orderData.transaction_id != cc.gg.global.orderData.transaction_id) {
            this.errorText("订单已完结请勿操作");
            return
        }
        if (isConfirm.isConfirm) {
            var checkAll = node.parent.parent.getChildByName("payItem");
            var swich = false;
            for (var i = 0; i < checkAll.childrenCount; i++) {
                var item = checkAll.children[i]
                if (item.children[0].children[0].active == true) {
                    var checkName = item.children[0].name;
                    swich = true
                    this.SelectPaymentWayData(checkName);
                }
            }
            if (!swich) {
                this.alertBoxStyle(-11);
            }
        } else {
            this.alertBoxStyle(4);
        }
    },
    //根据选择的付款ID
    SelectPaymentWayData: function (payID) {
        if (payID.indexOf("selectPay") > -1) {
            var payId = payID.substr(9);
            this._gameView._scene.sendBuyerApplyConfirm(cc.gg.global.PaymentWayData, payId)
        }
    },
    //玩家选择自己的付款方式
    selectBuyerApplyWay: function (node, sellerId) {
        var checkAll = node.parent.parent;
        for (var i = 0; i < checkAll.childrenCount; i++) {
            var item = checkAll.children[i]
            if (item.children[0].name == "selectPay" + sellerId.payId) {
                item.children[0].children[0].active = true
            } else {
                item.children[0].children[0].active = false;
            }
        }
    },
    orderConfirm: function (data, isConfirm) {
        // if (isConfirm.orderData.transaction_id != cc.gg.global.orderData.transaction_id) {
        //     this.errorText("订单已完结请勿操作！");
        //     return
        // }

        let currentNode = isConfirm.currentNode;
        var button = currentNode.getChildByName("button");
        var yes = button.getChildByName("yes");
        var cancel = button.getChildByName("cancel");
        let yesGray = button.getChildByName("yesGray");
        let cancelGray = button.getChildByName("cancelGray");
        //点击按钮变灰
        if (yes.active) {
            yes.active = false;
            yesGray.active = true;
        }

        if (cancel.active) {
            cancel.active = false;
            cancelGray.active = true;
        }

        if (isConfirm.isSellerId) {
            this.errorText("此操作由商家处理！");
            return
        }

        var dataObj = isConfirm.orderData;
        dataObj.is_agree = isConfirm.isConfirm ? 1 : -1;
        this._gameView._scene.sendOrderConfirm(dataObj);
    },
    //取历史数据并渲染
    initHistoryView: function () {
        var chatbox = cc.gg.global.chatObj
        var userData = cc.gg.global.userInfo
        var historyMsgName = "history" + userData.userID + chatbox.userID
        var historyData = cc.sys.localStorage.getItem(historyMsgName);

        if (historyData) {
            historyData = JSON.parse(cc.sys.localStorage.getItem(historyMsgName));
            var newHistoryData = []
            if (historyData.length >= cc.gg.global.historySum) {
                for (var j = (historyData.length - cc.gg.global.historySum); j < historyData.length; j++) {
                    newHistoryData.push(historyData[j])
                }
            } else {
                newHistoryData = historyData
            }
            for (var i = 0; i < newHistoryData.length; i++) {
                var toId = newHistoryData[i].toId;
                var fromId = newHistoryData[i].fromId;
                var isMe;
                if (fromId == userData.userID) {
                    isMe = true
                } else {
                    isMe = false
                }
                if (!newHistoryData[i].type) {
                    newHistoryData[i].type = 1
                }
                var data = {
                    content: newHistoryData[i].msg,
                    content_type: newHistoryData[i].type,
                    msg_id: newHistoryData[i].msgID,
                    time: cc.gg.utils.timeNow(newHistoryData[i].time)
                }
                this.addMsg(isMe, data)
            }
        } else {
            cc.gg.utils.ccLog("没有找到和此人的历史记录")
        }
    },
    //存历史数据
    setHistory: function (data) {
        var historyMsgName = "history" + data.user_id + data.to_id
        var historyData = cc.sys.localStorage.getItem(historyMsgName);
        if (historyData) {
            historyData = JSON.parse(cc.sys.localStorage.getItem(historyMsgName))
            for (var i = 0; i < historyData.length; i++) {
                if (historyData[i].msg_id == data.msg_id) {
                    cc.gg.utils.ccLog("已经存在此消息ID")
                    return;
                }
            }
            historyData.push(data);
            cc.sys.localStorage.setItem("history" + data.user_id + data.to_id, JSON.stringify(historyData))
        } else {
            if (data) {
                var obj = []
                obj.push(data)
                cc.sys.localStorage.setItem("history" + data.user_id + data.to_id, JSON.stringify(obj))
            }
        }
    },

    //通过msgID 找对应的图片url
    getMsgImg: function (msgID) {
        if (!msgID) {
            return
        }
        msgID = msgID.split("=")[1];
        var chatbox = cc.gg.global.chatObj
        var userData = cc.gg.global.userInfo;
        var historyMsgName = "history" + userData.userID + chatbox.to_id;
        var historyData = JSON.parse(cc.sys.localStorage.getItem(historyMsgName));

        if (historyData) {
            for (var i = 0; i < historyData.length; i++) {
                if (msgID == historyData[i].msg_id) {
                    return historyData[i].content
                }
            }
        } else {
            console.log("发送存储没找到")
        }
        var historyMsgName = "history" + chatbox.to_id + userData.userID;
        var historyData = JSON.parse(cc.sys.localStorage.getItem(historyMsgName));

        if (historyData) {
            for (var i = 0; i < historyData.length; i++) {
                if (msgID == historyData[i].msg_id) {
                    return historyData[i].content
                }
            }
        } else {
            console.log("找图片失败")
        }

    },
    // onDestroy: function () {
    //     cc.gg.file.hideFile()
    // },
    //删除历史记录
    deleteHistory: function () {
        var chatbox = cc.gg.global.chatObj
        var userData = cc.gg.global.userInfo;
        var historyMsgName = "history" + userData.userID + chatbox.userID;
        var historyData = cc.sys.localStorage.getItem(historyMsgName);
        var lastMsgId = {};
        if (historyData) {
            historyData = JSON.parse(cc.sys.localStorage.getItem(historyMsgName));
            if (historyData[historyData.length - 1] && cc.gg.global.chatObj.type != 10) {
                lastMsgId.msgID = historyData[historyData.length - 1].msgID
                lastMsgId.type = historyData[historyData.length - 1].type
            }
            cc.sys.localStorage.setItem(historyMsgName, "");
        };
        if (cc.gg.global.chatObj.type == 10) {
            //订单模式删除历史记录
            if (cmd.transactionStatus == 3 || cmd.transactionStatus == 9 ||
                cmd.transactionStatus == -16 || cmd.transactionStatus == 10 ||
                cmd.transactionStatus == -20 || cmd.orderStatus == 9) {
                lastMsgId.msgID = cc.gg.global.chatObj.msgID;
                lastMsgId.type = cc.gg.global.chatObj.type;
            } else {
                this.alertBoxStyle(100);
                return
            }
        }
        this.content.removeAllChildren();
        this._gameView._scene.sendDelHistoryMsg(lastMsgId)
    },
    //中间层键盘显示
    inputFun: function (type, data) {
        if (type == "text-changed") {
            //显示中间层键盘  更换内容
            // this.inputText.active = true;
            // this._gameView._bottomPancel.hideAll()
            if (data.length >= 15) {
                data = data.substr(data.length - 15, 15) + ".."
            } else if (data.length == 0) {
                data = "Send Message..."
            }
            this.inputValue.getComponent(cc.Label).string = data;
            this._gameView._bottomPancel.setText()
        } else if (type == "editing-did-began") {
            //初始化内容
            console.log("editing-did-began");
            // this.inputText.active = true;
            // this._gameView._bottomPancel.hideAll()
            if (data.length >= 15) {
                data = data.substr(data.length - 15, 15) + ".."
            } else if (data.length == 0) {
                data = "Send Message..."
            }
            this.inputValue.getComponent(cc.Label).string = data;
            this._gameView._bottomPancel.setText()
        } else if (type == "editing-did-ended") {
            this.inputText.active = false;
            this._gameView._bottomPancel.setText()
            this._gameView._bottomPancel.showAll()
        } else if (type == "editing-return") {
            //隐藏中间层节点 
            this.inputText.active = false;
            this._gameView._bottomPancel.setText()
            this._gameView._bottomPancel.showAll()
        }
    },
});