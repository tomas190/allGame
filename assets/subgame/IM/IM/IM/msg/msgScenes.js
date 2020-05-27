const cmd = require("IMcmd");
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad: function () {
        this.initData();
    },
    start: function () {

        //this._gameView.active = false;
    },
    resetSence: function () {
        this.onEvenHandle();
        this.isFrom = false
        //拉一下记录
        this.PushHistoryMsg(0, 5)
        this._gameView._centerPancel.skip = 0;
        this._gameView._centerPancel.uploadMsgCount = 0;
        this._gameView._centerPancel.isUploadMsg = false;
        cmd.order_id = null;
        cc.gg.global.orderData = null;
    },
    initData: function () {
        this._gameView = null;
        this.ClickLock = false;

        this._gameView = this.node.getComponent("msgView");
    },

    onEvenHandle: function () {
        // cc.gg.protoBuf.addHandler("ChatRespBody", function (data) {
        //     cc.gg.utils.ccLog(data);
        // })
        var listenArr = ['ChatRespBody', 'PushHistoryMsg', 'ReadMsg', 'MoreHistoryMsg', 'RefuseResp', 'ApplyWays',
            "ApplyData", "BuyerApplyWay", "ConfirmApplyResp", "ConfirmReceiveResp",
            "TransaMsg", "BuyerCancelOrderResp", "SellerDunningResp", "BuyerApplyConfirmAgainResp",
            "OperateResp", "FileUI", "ChangeMsgTypeResp", "ErrorResp", "CancelTransactionResp", "FileUI",
            "CreateImg", "XhrProgress", "UpLoad", "InputFocus", "InputChange",
            "InputBlur", "CompleteOrderResp", "XhrError", "Keydown", "Login", "isGoDirectlyMsg"
        ];
        //RN键盘监听事件
        var listenInputArr = ["__oninput", "__oninputing", "__oninputend", "__oninputreturn"]
        // for (var i = 0; i < listenInputArr.length; i++) {
        //     cc.gg.client.addEventListener(listenInputArr[i], this.listenInputEvent.bind(this))
        // }
        for (var i = 0; i < listenArr.length; i++) {
            cc.gg.protoBuf.addHandler(listenArr[i], this.listenEvent.bind(this))
        }
    },
    listenInputEvent: function (instructionsName, data) {
        var datas = data.data;
        if (instructionsName == "__oninput") {
            console.log("调起了键盘")
            this._gameView._bottomPancel.setText(datas.text);
        } else if (instructionsName == "__oninputing") {
            console.log("输入改变")
            this._gameView._bottomPancel.setText(datas.text);
        } else if (instructionsName == "__oninputend") {
            console.log("键盘结束")
            this._gameView._bottomPancel.privateChat()
        } else if (instructionsName == "__oninputreturn") {
            console.log("键盘回车发送");
            this._gameView._bottomPancel.privateChat()
        }
    },
    listenEvent: function (instructionsName, data, isCustom) {
        //接受任何消息解除Lock
        this.ClickLock = false
        if (isCustom) {
            if (instructionsName == "FileUI") {
                this.manageFileUI(data);
            } else if (instructionsName == "CreateImg") {
                this.manageCreateImg(data);
            } else if (instructionsName == "XhrProgress") {
                this.manageXhrProgress(data);
            } else if (instructionsName == "XhrError") {
                this.manageXhrError(data)
            } else if (instructionsName == "UpLoad") {
                this.manageUpLoad(data);
            } else if (instructionsName == "InputFocus") {
                this.manageInputFocus(data)
            } else if (instructionsName == "InputChange") {
                this.manageInputChange(data)
            } else if (instructionsName == "InputBlur") {
                this.manageInputBlur(data)
            } else if (instructionsName == "Keydown") {
                this.manageKeydown(data)
            }
            return;
        }

        var data = imProto.msg.Resp.deserializeBinary(data);
        var result = data.getResult();
        var resultMessage = data.getResultmessage();
        var datas = data.getData();

        if (result == 1) {
            if (datas != "" && datas && datas != 'undefined' && datas != 'null') {
                if (instructionsName == "Login") {
                    this.manageLoginRsp(datas)
                } else if (instructionsName == "ChatRespBody") {
                    this.manageChatRespBody(datas);
                } else if (instructionsName == "PushHistoryMsg") {
                    this.managePushHistoryMsg(datas)
                } else if (instructionsName == "ReadMeg") {
                    this.manageReadMeg(datas)
                }
            } else {
                console.log("内容为空")
                this._gameView._centerPancel.isUploadMsg = false
            }
        } else {
            if (instructionsName == "ChatRespBody") {
                this._gameView._centerPancel.isUploadMsg = false
            }
            this._gameView._centerPancel.errorText(resultMessage)
            console.log('====================================');
            console.log("失败返回", resultMessage);
            console.log("失败内容", datas);
            // console.log("cc.gg.global.chatObj == ", cc.gg.global.chatObj);
            console.log('====================================');
        }
    },
    manageLoginRsp: function (data) {
        console.log("manageLoginRsp", data);
        var datas = JSON.parse(data);
        cc.gg.protoBuf.authKey = datas.auth_key
    },
    //重置未读
    manageReadMeg: function (data) {
        var datas = JSON.parse(data);
        console.log(datas)
    },
    //聊天历史记录
    managePushHistoryMsg: function (data) {
        var datas = JSON.parse(data);
        // console.log(datas, "managePushHistoryMsg");
        this._gameView._centerPancel.isUploadMsg = false;
        this._gameView._centerPancel.uploadMsgCount++;
        if (datas.length < 5) {
            if (this._gameView._centerPancel.uploadMsgCount == 1) {
                this.addMsgView(datas)
            } else {
                var data = []
                for (var i = datas.length - 1; i >= 0; i--) {
                    data.push(datas[i])
                }
                this.addMsgView(data, "first")
            }
            this._gameView._centerPancel.skip += datas.length
            // if (cc.gg.global.isMoreMsg) {
            //     //是不是加载更多
            //     cc.gg.global.isMoreMsg = false;
            //     this._gameView._centerPancel.scrollview.getComponent(cc.ScrollView).scrollToTop(0.3);
            // } else {
            //     this._gameView._centerPancel.scrollview.getComponent(cc.ScrollView).scrollToTop(0.3);
            // }
        } else if (datas.length == 5) {
            this._gameView._centerPancel.skip += 5
            if (this._gameView._centerPancel.uploadMsgCount <= 2) {
                this.PushHistoryMsg(this._gameView._centerPancel.skip, 5);
            }
            if (this._gameView._centerPancel.uploadMsgCount == 1) {
                //首次加载
                this.addMsgView(datas)
            } else {
                //后续加载从前面插入
                var data = []
                for (var i = datas.length - 1; i >= 0; i--) {
                    data.push(datas[i])
                }
                this.addMsgView(data, "first")
            }

        }

    },
    //从后面渲染msg
    addMsgView: function (datas, first) {
        for (var i = 0; i < datas.length; i++) {
            //datas[i].time = cc.gg.utils.timeNow(datas[i].time)
            if (cc.gg.global.userInfo.userID == datas[i].user_id && datas[i].to_id == cc.gg.global.chatObj.to_id) {
                if (datas[i].msg_type != 3 && datas[i].msg_type != 4 && datas[i].msg_type != 5) {
                    //普通对话消息
                    // console.log("自己是发送方")
                    // return
                    if (first) {
                        this._gameView._centerPancel.addMsg(true, datas[i], first);
                    } else {

                        this._gameView._centerPancel.addMsg(true, datas[i])
                    }

                } else {
                    //订单流程消息
                    if (datas[i].msg_type == 5) {
                        var orderData = datas[i];
                    } else {
                        var orderData = JSON.parse(datas[i].content);
                        var type = orderData.transaction_status;
                        //cc.gg.global.orderType = datas[i].msg_type;
                    }
                    this._gameView._centerPancel.recoverOrder(true, type, orderData, first)

                    // if (first) {
                    //     this._gameView._centerPancel.recoverOrder(true, type, orderData, first)
                    // } else {
                    //     if (this._gameView._centerPancel.uploadMsgCount == 1 && datas.length <= 5) {
                    //         //第一次加载 且数据长度小于五  最新订单数据是最后一条
                    //         if (datas[i].msg_type == 5) {
                    //             cc.gg.global.orderData = datas[i];
                    //         }
                    //         cc.gg.global.orderType = datas[i].msg_type
                    //         if (type == 11) {
                    //             cc.gg.global.orderData = orderData;
                    //         } else if (type == 12) {
                    //             cmd.order_id = orderData.order_id
                    //         }
                    //     }
                    //     this._gameView._centerPancel.recoverOrder(true, type, orderData)
                    // }

                }
            } else if (cc.gg.global.userInfo.userID == datas[i].to_id && datas[i].user_id == cc.gg.global.chatObj.to_id) {
                if (datas[i].msg_type != 3 && datas[i].msg_type != 4 && datas[i].msg_type != 5) {
                    //普通对话消息
                    console.log("自己是接收方")
                    if (first) {
                        this._gameView._centerPancel.addMsg(false, datas[i], first)
                    } else {
                        this._gameView._centerPancel.addMsg(false, datas[i])
                    }

                } else {
                    //订单流程消息
                    if (datas[i].msg_type == 5) {
                        var orderData = datas[i];
                    } else {
                        var orderData = JSON.parse(datas[i].content);
                        var type = orderData.transaction_status;
                    }

                    this._gameView._centerPancel.recoverOrder(false, type, orderData, first);


                    // if (first) {
                    //     this._gameView._centerPancel.recoverOrder(false, type, orderData, first);
                    // } else {
                    //     // if (this._gameView._centerPancel.uploadMsgCount == 1 && datas.length <= 5) {
                    //     //     //第一次加载 且数据长度小于五  最新订单数据是最后一条
                    //     //     cc.gg.global.orderType = datas[i].msg_type;
                    //     //     if (datas[i].msg_type == 5) {
                    //     //         cc.gg.global.orderData = datas[i];
                    //     //     }
                    //     //     if (type == 11) {
                    //     //         cc.gg.global.orderData = orderData;
                    //     //     } else if (type == 12) {
                    //     //         cmd.order_id = orderData.order_id
                    //     //     }
                    //     // }
                    //     this._gameView._centerPancel.recoverOrder(false, type, orderData)
                    // }
                }

            } else {
                console.log("判断有错误")
            }

            this._gameView._centerPancel.setHistory(datas[i])
        }
        if (cc.gg.global.isMoreMsg) {
            //是不是加载更多
            cc.gg.global.isMoreMsg = false;
            this._gameView._centerPancel.scrollview.getComponent(cc.ScrollView).scrollToTop(0.3);
        } else {
            this._gameView._centerPancel.scrollview.getComponent(cc.ScrollView).scrollToBottom(0.3);
        }
    },
    //聊天对话
    manageChatRespBody: function (data) {
        var datas = JSON.parse(data);
        //datas.time = cc.gg.utils.timeNow(datas.time)
        if (cc.gg.global.userInfo.userID == datas.user_id && datas.to_id == cc.gg.global.chatObj.to_id) {
            this._gameView._centerPancel.skip++
            if (datas.msg_type != 3 && datas.msg_type != 4 && datas.msg_type != 5) {
                //普通对话消息
                this._gameView._centerPancel.setHistory(datas)
                console.log("自己是发送方： ", data.content);
                this._gameView._centerPancel.scrollview.getComponent(cc.ScrollView).scrollToBottom(0.3);
                //后续做一下已送达梳理
                return
                this._gameView._centerPancel.addMsg(true, datas)
            } else {
                //订单流程消息
                if (datas.msg_type == 5) {
                    var orderData = datas;
                } else {
                    var orderData = JSON.parse(datas.content);
                    var type = orderData.transaction_status;
                    //cc.gg.global.orderType = datas.msg_type;
                }
                cc.gg.global.orderType = datas.msg_type;
                // if (datas.msg_type == 5) {
                //     cc.gg.global.orderData = datas;
                // }
                // //这里提前处理一下订单消息 赋值
                // if (type == 11) {
                //     cc.gg.global.orderData = orderData;
                // } else if (type == 12) {
                //     cmd.order_id = orderData.order_id
                // }
                this._gameView._centerPancel.recoverOrder(true, type, orderData)
            }
            this.isFrom = true
        } else if (cc.gg.global.userInfo.userID == datas.to_id && datas.user_id == cc.gg.global.chatObj.to_id) {
            this._gameView._centerPancel.skip++

            if (datas.msg_type != 3 && datas.msg_type != 4 && datas.msg_type != 5) {
                //普通对话消息
                console.log("自己是接收方")
                this._gameView._centerPancel.addMsg(false, datas)
            } else {
                //订单流程消息
                if (datas.msg_type == 5) {
                    var orderData = datas;
                } else {
                    var orderData = JSON.parse(datas.content);
                    var type = orderData.transaction_status;
                    //cc.gg.global.orderType = datas.msg_type;
                }
                //这里提前处理一下订单消息 赋值
                cc.gg.global.orderType = datas.msg_type;
                // if (datas.msg_type == 5) {
                //     cc.gg.global.orderData = datas;
                // }
                // if (type == 11) {
                //     cc.gg.global.orderData = orderData;
                // } else if (type == 12) {
                //     cmd.order_id = orderData.order_id
                // }
                this._gameView._centerPancel.recoverOrder(false, type, orderData)
            }
            this.isFrom = false;
        } else {
            console.log("判断有错误")
        }
        this._gameView._centerPancel.setHistory(datas);
        cc.gg.audioMgr.playMusic("chat")
        this._gameView._centerPancel.scrollview.getComponent(cc.ScrollView).scrollToBottom(0.3);
    },
    manageInputChange: function (data) {
        console.log("键盘在输入 ", data)
        //这里是同步给bottom层
        this._gameView._bottomPancel.setText(data.msg);
        //将内容同步给center层
        var data = data.msg
        if (data.length >= 15) {
            data = data.substr(data.length - 15, 15) + ".."
        } else if (data.length == 0) {
            data = "Send Message..."
        }
        this._gameView._centerPancel.inputValue.getComponent(cc.Label).string = data

    },
    manageInputFocus: function () {
        console.log("键盘来了");
        //隐藏bottom键盘 显示center层键盘
        this._gameView._centerPancel.inputText.active = true;
        this._gameView._bottomPancel.hideAll()
    },
    manageInputBlur: function (data) {
        console.log("结束输入")
        //隐藏center键盘  显示bottom键盘 同步内容
        this._gameView._bottomPancel.setText(data.msg);
        this._gameView._centerPancel.inputText.active = false;
        this._gameView._bottomPancel.showAll()
        this._gameView._bottomPancel.privateChat()
    },
    manageKeydown: function () {
        if (cc.gg.global.os == "desktop") {
            this._gameView._bottomPancel.privateChat();
        }
    },
    //上传进度
    manageXhrProgress: function (data) {
        console.log("manageXhrProgress", data);
        //通过msgID找到对应图片节点 渲染进度条 丢给center层处理
        this._gameView._centerPancel.XhrProgress(cc.gg.global.updateFile, data)
    },
    manageXhrError: function (data) {
        this._gameView._centerPancel.XhrError(cc.gg.global.updateFile)
    },
    //上传完成，发送图片给后台
    manageUpLoad: function (data) {
        // alert(2)
        // console.log(data, "manageUpLoad");
        if (cc.sys.isNative) {
            let imgObj = data;
            console.log("imgObj msg_id== ", imgObj.msg_id);
            this._gameView._centerPancel.initImg(imgObj);
            this.privateChat(imgObj);
            return;
        }
        if (typeof (data) == "string") {
            var datas = JSON.parse(data);
            if (datas.code == 200) {
                var datas = data.data;
                //通过msgId渲染刚上传的图片
                var obj = {
                    content: datas.url,
                    width: datas.width,
                    height: datas.height,
                    content_type: 2,
                    msg_id: cc.gg.global.updateFile.msg_id
                }
                this._gameView._centerPancel.initImg(obj)
                this.privateChat(obj)
            }
        } else {
            if (data.code == 200) {
                var datas = data.data;
                //通过msgId渲染刚上传的图片
                var obj = {
                    content: datas.url,
                    width: datas.width,
                    height: datas.height,
                    content_type: 2,
                    msg_id: cc.gg.global.updateFile.msg_id
                }
                this._gameView._centerPancel.initImg(obj)
                this.privateChat(obj)
            }
        }
    },

    /**
     * 创建图片
     * @param {*} data 
     */
    manageCreateImg: function (data) {
        //这里创建自身的图片 直接调取center层方法
        if (!data.datas) {
            return
        };

        var data = {
            content: data.datas,
            content_type: 2,
            msg_type: 2,
            msg_id: cc.gg.utils.getUUid(),
            time: new Date().getTime()
        };

        this._gameView._centerPancel.addMsg(true, data)
        // if(cc.sys.isNative) {
        //     return;
        // }
        //赋值一下全局变量 上传文件信息
        cc.gg.global.updateFile = data;
    },
    manageFileUI: function (data) {
        if (!data.datas) {
            return
        }
        //转发给center层处理
        this._gameView.showSendImg(data)
    },
    manageCompleteOrderResp: function (data) {
        var CompleteOrderResp = imProto.msg.CompleteOrderResp.deserializeBinary(data);
        var data = CompleteOrderResp.getData();
        var datas = JSON.parse(data);
        cc.gg.utils.ccLog(datas, "CompleteOrderResp");
        if (datas.code == 1) {
            //这里要把订单的状态设置为截单   不允许再操作上面的步骤
            this._gameView._centerPancel.alertBoxStyle(datas.transactionStatus);
            cmd.transactionStatus = 10;
        } else {
            this._gameView._topPancel.runAlert(datas.msg)
        }
    },
    manageCancelTransactionResp(data) {
        var manageCancelTransactionResp = imProto.msg.CancelTransactionResp.deserializeBinary(data);
        var datas = manageCancelTransactionResp.getData();
        datas = JSON.parse(datas);
        cc.gg.utils.ccLog(datas, "manageCancelTransactionResp")
        if (datas.code == 1) {
            //买家取消交易成功  改变一下cmd订单的状态
            cmd.transactionStatus = 10;
            this._gameView._centerPancel.alertBoxStyle(13)
        } else {
            this._gameView._centerPancel.alertBoxStyle(-18)
        }
    },
    manageErrorResp: function (data) {
        cc.gg.protoBuf.ISclose = true;
        alert("你已被挤下线");
    },
    //开启会话返回
    manageChangeMsgTypeResp: function (data) {
        var ChangeMsgTypeResp = imProto.msg.ChangeMsgTypeResp.deserializeBinary(data);
        var datas = ChangeMsgTypeResp.getData();
        datas = JSON.parse(datas);
        cc.gg.utils.ccLog(datas, "ChangeMsgTypeResp");
        if (datas.code == 1) {
            this._gameView._topPancel.runAlert(datas.msg);
            this._gameView._bottomPancel.hideOpenMsg();
            cc.gg.file.showFile()
            cc.gg.global.chatObj.type = 1
        } else {
            this._gameView._topPancel.runAlert(datas.msg)
        }
    },
    //选择图片
    manageFile: function (data) {
        this._gameView._bottomPancel.changeName(data)
    },
    //删除历史记录
    manageOperateResp(data) {
        var OperateResp = imProto.msg.OperateResp.deserializeBinary(data);
        var datas = OperateResp.getData();
        datas = JSON.parse(datas);
        cc.gg.utils.ccLog(datas, "OperateResp");
        if (datas.code == 1) {
            this._gameView._topPancel.runAlert("删除成功")
        } else {
            this._gameView._topPancel.runAlert("删除失败")
        }

    },


    //发送私聊消息指令
    privateChat: function (data) {
        if (!data.msg_id) {
            data.msg_id = cc.gg.utils.getUUid();
            console.log("我新生成了一个uuid")
        }
        var data = {
            "conversion_id": cc.gg.global.chatObj.conversion_id, // 会话ID
            "user_id": cc.gg.global.userInfo.userID, // 用户ID 发送方
            "user_nick": cc.gg.global.userInfo.userNick,
            "user_img": cc.gg.global.userInfo.userHeadImg,
            "user_type": cc.gg.global.chatObj.user_type, // 用户类型  1 普通 4：上级代理  5：客服     
            "to_id": cc.gg.global.chatObj.to_id, // 对方用户ID 接收方
            "to_nick": cc.gg.global.chatObj.to_nick,
            "to_img": cc.gg.global.chatObj.to_img,
            "to_type": parseInt(cc.gg.global.chatObj.to_type), // 对方的类型，1 普通 4：上级代理  5：客服
            "content": data.content, // 消息类容
            "content_type": data.content_type, // 消息内容类型(1.文字, 2.图片...)
            "msg_type": 2,
            "msg_id": data.msg_id
        }
        console.log(data, "ChatRespBody")
        cc.gg.protoBuf.send("ChatRespBody", 2, data);
    },

    //发送查询历史记录的指令
    PushHistoryMsg: function (skip, limit) {
        var data = {
            "user_id": cc.gg.global.userInfo.userID,
            "to_id": cc.gg.global.chatObj.to_id,
            "skip": skip,
            "limit": limit,
        }
        console.log(data, "PushHistoryMsg发送内容")
        cc.gg.protoBuf.send("PushHistoryMsg", 2, data)
    },
    //发送订单确认取消操作 (接受订单)
    sendOrderConfirm(data) {
        if (this.ClickLock) {
            return
        }
        var contentData = {
            transaction_id: data.transaction_id,
            transaction_status: cmd.isConfirmStatus,
            seller_id: data.seller_id,
            buyer_id: data.buyer_id,
            is_agree: data.is_agree,
        }
        var datas = {
            "conversion_id": cc.gg.global.chatObj.conversion_id, // 会话ID
            "user_id": cc.gg.global.userInfo.userID, // 用户ID 发送方
            "user_nick": cc.gg.global.userInfo.userNick,
            "user_img": cc.gg.global.userInfo.userHeadImg,
            "user_type": cc.gg.global.chatObj.user_type, // 用户类型  1 普通 4：上级代理  5：客服     
            "to_id": cc.gg.global.chatObj.to_id, // 对方用户ID 接收方
            "to_nick": cc.gg.global.chatObj.to_nick,
            "to_img": cc.gg.global.chatObj.to_img,
            "to_type": parseInt(cc.gg.global.chatObj.to_type), // 对方的类型，1 普通 4：上级代理  5：客服
            "content": JSON.stringify(contentData), // 消息类容
            "content_type": 1, // 消息内容类型(1.文字, 2.图片...)
            "msg_type": 4,
            "msg_id": cc.gg.utils.getUUid()
        }
        this.ClickLock = true
        console.log(datas, "orderConfirm")
        cc.gg.protoBuf.send("ChatRespBody", 2, datas)
    },
    //发送选择的结果
    sendSelectApplyWay: function (data) {
        if (this.ClickLock) {
            return
        }
        this.ClickLock = true
        data.transaction_status = cmd.ConfirmCollecting;
        var datas = {
            "conversion_id": cc.gg.global.chatObj.conversion_id, // 会话ID
            "user_id": cc.gg.global.userInfo.userID, // 用户ID 发送方
            "user_nick": cc.gg.global.userInfo.userNick,
            "user_img": cc.gg.global.userInfo.userHeadImg,
            "user_type": cc.gg.global.chatObj.user_type, // 用户类型  1 普通 4：上级代理  5：客服     
            "to_id": cc.gg.global.chatObj.to_id, // 对方用户ID 接收方
            "to_nick": cc.gg.global.chatObj.to_nick,
            "to_img": cc.gg.global.chatObj.to_img,
            "to_type": parseInt(cc.gg.global.chatObj.to_type), // 对方的类型，1 普通 4：上级代理  5：客服
            "content": JSON.stringify(data), // 消息类容
            "content_type": 1, // 消息内容类型(1.文字, 2.图片...)
            "msg_type": 4,
            "msg_id": cc.gg.utils.getUUid()
        }
        console.log(datas, "sendSelectApplyWay")
        cc.gg.protoBuf.send("ChatRespBody", 2, datas)
    },
    //请求买家收款方式
    sendGetBuyerApplyWay: function (orderData) {
        if (this.ClickLock) {
            return
        }
        this.ClickLock = true
        var data = {
            transaction_status: cmd.GetBuyerApplyWay,
            transaction_id: orderData.transaction_id,
            seller_id: orderData.seller_id,
            buyer_id: orderData.buyer_id,
            msg_type:4
        }
        var datas = {
            "conversion_id": cc.gg.global.chatObj.conversion_id, // 会话ID
            "user_id": cc.gg.global.userInfo.userID, // 用户ID 发送方
            "user_nick": cc.gg.global.userInfo.userNick,
            "user_img": cc.gg.global.userInfo.userHeadImg,
            "user_type": cc.gg.global.chatObj.user_type, // 用户类型  1 普通 4：上级代理  5：客服     
            "to_id": cc.gg.global.chatObj.to_id, // 对方用户ID 接收方
            "to_nick": cc.gg.global.chatObj.to_nick,
            "to_img": cc.gg.global.chatObj.to_img,
            "to_type": parseInt(cc.gg.global.chatObj.to_type), // 对方的类型，1 普通 4：上级代理  5：客服
            "content": JSON.stringify(data), // 消息类容
            "content_type": 1, // 消息内容类型(1.文字, 2.图片...)
            "msg_type": 4,
            "msg_id": cc.gg.utils.getUUid()
        }
        console.log(datas, "sendGetBuyerApplyWay")
        cc.gg.protoBuf.send("ChatRespBody", 2, datas)
    },
    //人工兑换的操作
    sendExchange: function (is_agree,orderData) {
        if (this.ClickLock) {
            return
        }
        this.ClickLock = true;
        // if (JSON.stringify(cc.gg.global.orderData) == "{}") {
        //     console.log("订单信息以销毁");
        //     this.ClickLock = false;
        //     return;
        // }
        var data = JSON.parse(orderData.content)
        var data = {
            user_id: data.user_id,
            order_id: data.order_id,
            operate: is_agree,
            exchange_id: data.exchange_id,
            msg_type:4
        }
        var datas = {
            "conversion_id": cc.gg.global.chatObj.conversion_id, // 会话ID
            "user_id": cc.gg.global.userInfo.userID, // 用户ID 发送方
            "user_nick": cc.gg.global.userInfo.userNick,
            "user_img": cc.gg.global.userInfo.userHeadImg,
            "user_type": cc.gg.global.chatObj.user_type, // 用户类型  1 普通 4：上级代理  5：客服     
            "to_id": cc.gg.global.chatObj.to_id, // 对方用户ID 接收方
            "to_nick": cc.gg.global.chatObj.to_nick,
            "to_img": cc.gg.global.chatObj.to_img,
            "to_type": parseInt(cc.gg.global.chatObj.to_type), // 对方的类型，1 普通 4：上级代理  5：客服
            "content": JSON.stringify(data), // 消息类容
            "content_type": 1, // 消息内容类型(1.文字, 2.图片...)
            "msg_type": 5,
            "msg_id": cc.gg.utils.getUUid()
        }
        console.log(datas, "sendExchange")
        cc.gg.protoBuf.send("ChatRespBody", 2, datas)
    },
    //买家确认付款
    sendBuyerApplyConfirm: function (payData, payID,orderData) {
        if (this.ClickLock) {
            return
        }
        this.ClickLock = true;
        var data = {
            transaction_status: cmd.BuyerApplyConfirm,
            transaction_id: orderData.transaction_id,
            seller_id: orderData.seller_id,
            buyer_id: orderData.buyer_id,
            apply_data: {
                bank_card_pay: '',
                alipay: '',
                pay_id: '',
                pay_name: '',
            },
        }
        var datas = cc.gg.global.payList[parseInt(payID)]
        if (datas.card_num) {
            var obj = {
                card_num: datas.card_num,
                card_name: datas.card_name,
                bank_name: datas.bank_name,
                branch_name: datas.branch_name
            }
            data.apply_data.bank_card_pay = obj;
            data.apply_data.pay_id = cc.gg.global.payType.bank + "";
            data.apply_data.pay_name = "bank";
        } else if (datas.account_card) {
            var obj = {
                account_card: datas.account_card,
                account_surname: datas.account_surname,
                account_first_name: datas.account_first_name,
                account_name: datas.account_name,
                pay_url: datas.pay_url,
            }
            data.apply_data.alipay = obj;
            data.apply_data.pay_id = cc.gg.global.payType.aliPay + "";
            data.apply_data.pay_name = "aliPay";
        } else {
            console.log("sendBuyerApplyConfirm", "异常");
            return
        }

        var datas = {
            "conversion_id": cc.gg.global.chatObj.conversion_id, // 会话ID
            "user_id": cc.gg.global.userInfo.userID, // 用户ID 发送方
            "user_nick": cc.gg.global.userInfo.userNick,
            "user_img": cc.gg.global.userInfo.userHeadImg,
            "user_type": cc.gg.global.chatObj.user_type, // 用户类型  1 普通 4：上级代理  5：客服     
            "to_id": cc.gg.global.chatObj.to_id, // 对方用户ID 接收方
            "to_nick": cc.gg.global.chatObj.to_nick,
            "to_img": cc.gg.global.chatObj.to_img,
            "to_type": parseInt(cc.gg.global.chatObj.to_type), // 对方的类型，1 普通 4：上级代理  5：客服
            "content": JSON.stringify(data), // 消息类容
            "content_type": 1, // 消息内容类型(1.文字, 2.图片...)
            "msg_type":4,
            "msg_id": cc.gg.utils.getUUid()
        }
        console.log(datas, "sendBuyerApplyConfirm")
        cc.gg.protoBuf.send("ChatRespBody", 2, datas)
    },

    //商家确认收款 商家确认收款状态是18
    sendSellerReceiveConfirm: function (orderData) {
        if (this.ClickLock) {
            return
        }
        this.ClickLock = true

        var data = {
            transaction_status: 18,
            transaction_id: orderData.transaction_id,
            seller_id: orderData.seller_id,
            buyer_id: orderData.buyer_id,
            msg_type:4
        }

        console.log("商家确认收款: ", data);


        var datas = {
            "conversion_id": cc.gg.global.chatObj.conversion_id, // 会话ID
            "user_id": cc.gg.global.userInfo.userID, // 用户ID 发送方
            "user_nick": cc.gg.global.userInfo.userNick,
            "user_img": cc.gg.global.userInfo.userHeadImg,
            "user_type": cc.gg.global.chatObj.user_type, // 用户类型  1 普通 4：上级代理  5：客服     
            "to_id": cc.gg.global.chatObj.to_id, // 对方用户ID 接收方
            "to_nick": cc.gg.global.chatObj.to_nick,
            "to_img": cc.gg.global.chatObj.to_img,
            "to_type": parseInt(cc.gg.global.chatObj.to_type), // 对方的类型，1 普通 4：上级代理  5：客服
            "content": JSON.stringify(data), // 消息类容
            "content_type": 1, // 消息内容类型(1.文字, 2.图片...)
            "msg_type":  4,
            "msg_id": cc.gg.utils.getUUid()
        }
        console.log(datas, "sendBuyerApplyConfirm")
        cc.gg.protoBuf.send("ChatRespBody", 2, datas)
    },
    //预留一个取消的接口
    sendBuyerCancelOrder: function (orderData) {
        if (this.ClickLock) {
            return
        }
        this.ClickLock = true
        var data = {
            transaction_status: cmd.sendBuyerCancelOrder,
            transaction_id: orderData.transaction_id,
            seller_id: orderData.seller_id,
            buyer_id: orderData.buyer_id,
            msg_type: 4
        }

        var datas = {
            "conversion_id": cc.gg.global.chatObj.conversion_id, // 会话ID
            "user_id": cc.gg.global.userInfo.userID, // 用户ID 发送方
            "user_nick": cc.gg.global.userInfo.userNick,
            "user_img": cc.gg.global.userInfo.userHeadImg,
            "user_type": cc.gg.global.chatObj.user_type, // 用户类型  1 普通 4：上级代理  5：客服     
            "to_id": cc.gg.global.chatObj.to_id, // 对方用户ID 接收方
            "to_nick": cc.gg.global.chatObj.to_nick,
            "to_img": cc.gg.global.chatObj.to_img,
            "to_type": parseInt(cc.gg.global.chatObj.to_type), // 对方的类型，1 普通 4：上级代理  5：客服
            "content": JSON.stringify(data), // 消息类容
            "content_type": 1, // 消息内容类型(1.文字, 2.图片...)
            "msg_type":4,
            "msg_id": cc.gg.utils.getUUid()
        }
        console.log(datas, "sendBuyerCancelOrder")
        cc.gg.protoBuf.send("ChatRespBody", 2, datas)
    },
    //商家催款指令
    sendSellerDunning: function (orderData) {
        if (this.ClickLock) {
            return
        }
        this.ClickLock = true

        var data = {
            transaction_status: cmd.sendSellerDunning,
            transaction_id: orderData.transaction_id,
            seller_id: orderData.seller_id,
            buyer_id:orderData.buyer_id,
            msg_type: 4
        }

        var datas = {
            "conversion_id": cc.gg.global.chatObj.conversion_id, // 会话ID
            "user_id": cc.gg.global.userInfo.userID, // 用户ID 发送方
            "user_nick": cc.gg.global.userInfo.userNick,
            "user_img": cc.gg.global.userInfo.userHeadImg,
            "user_type": cc.gg.global.chatObj.user_type, // 用户类型  1 普通 4：上级代理  5：客服     
            "to_id": cc.gg.global.chatObj.to_id, // 对方用户ID 接收方
            "to_nick": cc.gg.global.chatObj.to_nick,
            "to_img": cc.gg.global.chatObj.to_img,
            "to_type": parseInt(cc.gg.global.chatObj.to_type), // 对方的类型，1 普通 4：上级代理  5：客服
            "content": JSON.stringify(data), // 消息类容
            "content_type": 1, // 消息内容类型(1.文字, 2.图片...)
            "msg_type":4,
            "msg_id": cc.gg.utils.getUUid()
        }
        console.log(datas, "sendSellerDunning")
        cc.gg.protoBuf.send("ChatRespBody", 2, datas)
    },
    //买家再次确认付款指令 	TStatusBuyerAReadyPay       = 15 // 买家确认付款请求	
    sendBuyerApplyConfirmAgain: function (orderData) {
        if (this.ClickLock) {
            return
        }
        this.ClickLock = true
        var data = {
            transaction_status: 15,
            transaction_id: orderData.transaction_id,
            seller_id: orderData.seller_id,
            buyer_id: orderData.buyer_id,
            msg_type:  4
        }

        console.log("买家确认付款: ", data);

        var datas = {
            "conversion_id": cc.gg.global.chatObj.conversion_id, // 会话ID
            "user_id": cc.gg.global.userInfo.userID, // 用户ID 发送方
            "user_nick": cc.gg.global.userInfo.userNick,
            "user_img": cc.gg.global.userInfo.userHeadImg,
            "user_type": cc.gg.global.chatObj.user_type, // 用户类型  1 普通 4：上级代理  5：客服     
            "to_id": cc.gg.global.chatObj.to_id, // 对方用户ID 接收方
            "to_nick": cc.gg.global.chatObj.to_nick,
            "to_img": cc.gg.global.chatObj.to_img,
            "to_type": parseInt(cc.gg.global.chatObj.to_type), // 对方的类型，1 普通 4：上级代理  5：客服
            "content": JSON.stringify(data), // 消息类容
            "content_type": 1, // 消息内容类型(1.文字, 2.图片...)
            "msg_type":  4,
            "msg_id": cc.gg.utils.getUUid()
        }
        console.log(datas, "sendBuyerApplyConfirmAgain")
        cc.gg.protoBuf.send("ChatRespBody", 2, datas)
    },
    //删除聊天记录 (暂未启用)
    sendDelHistoryMsg: function (datas) {
        // cc.gg.utils.ccLog(datas, "sendDelHistoryMsg");
        // if (!datas.type || !datas.msgID) {
        //     return
        // }
        if (this.ClickLock) {
            return
        }
        this.ClickLock = true
        var accountID = cc.gg.global.userInfo.userID;
        var DelHistoryMsg = new imProto.msg.DelHistoryMsg();
        DelHistoryMsg.setDelby(accountID);
        DelHistoryMsg.setFromid(accountID);
        DelHistoryMsg.setToid(cc.gg.global.chatObj.userID);
        var DelHistoryMsgArray = DelHistoryMsg.serializeBinary();
        cc.gg.protoBuf.send(35, DelHistoryMsgArray);
        cc.gg.utils.ccLog(DelHistoryMsg, "DelHistoryMsg");
    },

    //买家取消交易
    sendCancelTransaction: function (orderData) {
        if (this.ClickLock) {
            return
        }
        this.ClickLock = true
        var data = {
            transaction_status: cmd.sendCancelTransaction,
            transaction_id: orderData.transaction_id,
            seller_id: orderData.seller_id,
            buyer_id: orderData.buyer_id,
            is_agree: -2,
            msg_type: 4
        }

        var datas = {
            "conversion_id": cc.gg.global.chatObj.conversion_id, // 会话ID
            "user_id": cc.gg.global.userInfo.userID, // 用户ID 发送方
            "user_nick": cc.gg.global.userInfo.userNick,
            "user_img": cc.gg.global.userInfo.userHeadImg,
            "user_type": cc.gg.global.chatObj.user_type, // 用户类型  1 普通 4：上级代理  5：客服     
            "to_id": cc.gg.global.chatObj.to_id, // 对方用户ID 接收方
            "to_nick": cc.gg.global.chatObj.to_nick,
            "to_img": cc.gg.global.chatObj.to_img,
            "to_type": parseInt(cc.gg.global.chatObj.to_type), // 对方的类型，1 普通 4：上级代理  5：客服
            "content": JSON.stringify(data), // 消息类容
            "content_type": 1, // 消息内容类型(1.文字, 2.图片...)
            "msg_type":4,
            "msg_id": cc.gg.utils.getUUid()
        }
        console.log(datas, "sendCancelTransaction")
        cc.gg.protoBuf.send("ChatRespBody", 2, datas)
    },
    //退出时发送已读指令
    sendReadMsg: function () {
        console.log("我进入了 ？？？？？？")
        if (this.ClickLock) {
            return
        }
        // if (this.isFrom) {
        //     console.log("我是发送方")
        //     return
        // }
        var data = {
            user_id: cc.gg.global.userInfo.userID,
            to_id: cc.gg.global.chatObj.to_id
        }
        console.log(data, "sendReadMsg")
        cc.gg.protoBuf.send('ReadMsg', 2, data)
    },

});