/*
 * @Author: burt
 * @Date: 2019-09-30 16:50:44
 * @LastEditors  : burt
 * @LastEditTime : 2020-01-20 23:44:22
 * @Description: 
 */

let gHandler = require("gHandler");
cc.Class({
    extends: cc.Component,

    properties: {
        resetpass: cc.Node,
        bindyinhangka: cc.Node,
        officelogin: cc.Node,

        captchaimg1: cc.Sprite,
        captchaimg2: cc.Sprite,
        BankSelectItem: cc.Prefab,
        selectContent: cc.Node,
    },

    onLoad() {
    },

    start() {
        console.log("gHandler.gameGlobal.pay.pay_host: ", gHandler.gameGlobal.pay.pay_host);
    },

    init(subtype) {
        this.subtype = 0
        this.showSelect = null
        this.showSelect = false
        this.selectIndex = 0
        this.time = 0
        this.ensurefunc = () => {
            this.onClickExit()
        }

        this.subtype = subtype;
        switch (subtype) {
            case 1: // 重置密码
                this.resetpass.active = true
                this.panelInit(1)
                this.ensurefunc = this.resetpassEnsure
                break;
            case 2: // 绑定银行卡
                this.bindyinhangka.active = true
                this.ensurefunc = this.bindyinhangkaEnsure
                break;
            case 3: // 注册正式账号
                this.officelogin.active = true
                this.panelInit(2)
                this.ensurefunc = this.officeloginEnsure
                break;
        }
    },

    onClickXiala() {
        var results = ['中国农业银行', '交通银行', '中国建设银行', '兴业银行', '民生银行', '中信银行', '华夏银行', '中国工商银行', '浦发银行', '招商银行', '中国银行']
        if (!this.showSelect) {
            for (var i = 0; i < results.length; i++) {
                var node = cc.instantiate(this.BankSelectItem);
                this.selectContent.addChild(node);
                node.getChildByName('label').getComponent(cc.Label).string = results[i];
                var clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node;
                clickEventHandler.component = "hallPSubbLayer";
                clickEventHandler.customEventData = results[i];
                clickEventHandler.handler = "onClickItem";
                let button = node.getComponent(cc.Button);
                button.clickEvents.push(clickEventHandler);
            }
            this.showSelect = true;
        } else {
            this.selectContent.removeAllChildren();
            this.showSelect = false;
        }
    },

    onClickItem(event, custom) {
        this.bindyinhangka.getChildByName("yinhangname").getComponent(cc.EditBox).string = custom
    },

    bindyinhangkaEnsure() {
        let url = gHandler.gameGlobal.pay.pay_host + "/api/payment_account/saveAccount"
        let card_num = this.bindyinhangka.getChildByName("kahaoeditbox").getComponent(cc.EditBox).string
        if (card_num.length == 0) {
            return gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "请输入银行卡卡号")
        }
        if (card_num.length < 15) {
            return gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "请输入正确的银行卡卡号")
        }
        let card_name = this.bindyinhangka.getChildByName("nameediftox").getComponent(cc.EditBox).string
        if (card_name.length == 0) {
            return gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "请输入银行卡收款人姓名")
        }
        let bank_name = this.bindyinhangka.getChildByName("yinhangname").getComponent(cc.EditBox).string
        if (bank_name.length == 0) {
            return gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "请输入开户银行")
        }
        let branch_name = this.bindyinhangka.getChildByName("zhihang").getComponent(cc.EditBox).string
        if (branch_name.length == 0) {
            return gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "请输入开户行支行")
        }
        let obj = {};
        obj = {
            card_num: card_num,
            card_name: card_name,
            bank_name: bank_name,
            branch_name: branch_name,
        };
        let info = JSON.stringify(obj);
        let dataStr = "user_id=" + gHandler.gameGlobal.pay.user_id
        dataStr += "&user_name=" + gHandler.gameGlobal.pay.user_name
        dataStr += "&action=add&type=3&info=" + info
        dataStr += "&client=" + gHandler.gameGlobal.pay.client
        dataStr += "&proxy_user_id=" + gHandler.gameGlobal.pay.proxy_user_id
        dataStr += "&proxy_name=" + gHandler.gameGlobal.pay.proxy_name
        dataStr += "&package_id=" + gHandler.gameGlobal.pay.package_id
        dataStr += "&token=e40f01afbb1b9ae3dd6747ced5bca532"
        dataStr += "&version=1"
        let callback = (response) => {
            if (response.status == 0) {
                gHandler.eventMgr.dispatch(gHandler.eventMgr.getPayInfo)
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "操作成功")
                this.onClickExit()
            } else {
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, response.msg)
            }
        }
        let outcallback = (status) => {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "网络超时:" + status)
        }
        gHandler.http.ajax('POST', url, dataStr, callback, outcallback)
    },

    onClickCaptcha() {
        cc.log('onClickCaptcha', this.subtype)
        this.panelInit(this.subtype)
    },

    // 注册正式账号初始化
    panelInit(mtype) {
        if (CC_JSB) {
            let fullPath = jsb.fileUtils.getWritablePath() + "yanzhenma.png";
            jsb.fileUtils.isFileExist(fullPath) && jsb.fileUtils.removeFile(fullPath);
            cc.loader.release(fullPath);
        }

        let imgurl = ''
        if (gHandler.appGlobal.server.indexOf("http:") == -1 && gHandler.appGlobal.server.indexOf("https:") == -1) {
            imgurl = "http://" + gHandler.appGlobal.server + "/Game/Verify/createCaptcha?"
        } else {
            imgurl = gHandler.appGlobal.server + "/Game/Verify/createCaptcha?"
        }
        imgurl += "id=" + gHandler.appGlobal.gameuser.id;
        imgurl += "&token=" + gHandler.gameGlobal.token;
        let self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("get", imgurl, true);
        if (CC_JSB) {
            xhr.responseType = "arraybuffer";
        } else {
            xhr.responseType = "blob";
        }
        xhr.onload = function () {
            if (this.status == 200) {
                cc.log("请求到了图片")
                if (CC_JSB) {
                    var fullPath = jsb.fileUtils.getWritablePath() + "yanzhenma.png";
                    if (jsb.fileUtils.isFileExist(fullPath) && jsb.fileUtils.removeFile(fullPath)) {
                        if (jsb.fileUtils.writeDataToFile(new Uint8Array(this.response), fullPath)) {
                            cc.loader.load(fullPath, function (err, tex) {
                                if (err) {
                                    cc.error(err);
                                } else {
                                    let mspriteFrame = new cc.SpriteFrame(tex);
                                    if (mspriteFrame) {
                                        if (mtype == 1) {
                                            self.captchaimg1.spriteFrame = mspriteFrame;
                                        } else {
                                            self.captchaimg2.spriteFrame = mspriteFrame;
                                        }
                                    }
                                }
                            });
                        } else {
                            cc.log('Remote write file failed.');
                        }
                    } else {
                        if (jsb.fileUtils.writeDataToFile(new Uint8Array(this.response), fullPath)) {
                            cc.loader.load(fullPath, function (err, tex) {
                                if (err) {
                                    cc.error(err);
                                } else {
                                    let mspriteFrame = new cc.SpriteFrame(tex);
                                    if (mspriteFrame) {
                                        if (mtype == 1) {
                                            self.captchaimg1.spriteFrame = mspriteFrame;
                                        } else {
                                            self.captchaimg2.spriteFrame = mspriteFrame;
                                        }
                                    }
                                }
                            });
                        } else {
                            cc.log('Remote write file failed.');
                        }
                    }
                } else {
                    var blob = this.response;
                    let oFileReader = new FileReader();
                    oFileReader.onloadend = function (e) {
                        let base64 = e.target.result;
                        var img = new Image();
                        img.src = base64;
                        img.onload = function () {
                            var texture = new cc.Texture2D();
                            texture.initWithElement(img);
                            var newframe = new cc.SpriteFrame();
                            newframe.setTexture(texture);
                            if (mtype == 1) {
                                self.captchaimg1.spriteFrame = newframe;
                            } else {
                                self.captchaimg2.spriteFrame = newframe;
                            }
                        }
                    };
                    oFileReader.readAsDataURL(blob);
                }
            }
        }
        xhr.send();
    },
    // 获取手机短信验证码
    onClickGetCaptcha(event, custom) {
        cc.log("获取手机短信验证码")
        let phonenum
        let yanzhenmanum
        if (custom == 1) {
            phonenum = this.resetpass.getChildByName("phoneeditbox").getComponent(cc.EditBox).string
            yanzhenmanum = this.resetpass.getChildByName("yanzheneditbox").getComponent(cc.EditBox).string
        } else {
            phonenum = this.officelogin.getChildByName("phoneeditbox").getComponent(cc.EditBox).string
            yanzhenmanum = this.officelogin.getChildByName("yanzheneditbox").getComponent(cc.EditBox).string
        }
        if (phonenum == "") {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "请输入手机号")
            return
        }
        if (phonenum[0] != "1") {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "请输入正确的手机号")
            return
        }
        if (yanzhenmanum == "") {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "请输入图形验证码")
            return
        }
        let self = this
        let callback = (data) => {
            cc.log("sendPhoneMessage callback", data)
            if (data.code == 200) {
                let btn
                if (custom == 1) {
                    btn = self.resetpass.getChildByName("getcodebtn").getComponent(cc.Button)
                } else {
                    btn = self.officelogin.getChildByName("getcodebtn").getComponent(cc.Button)
                }
                btn.interactable = false
                let btnlabel = btn.node.getChildByName('btnlabel')
                let la = btnlabel.getComponent(cc.Label)
                la.string = "重发（60）"
                btnlabel.color = new cc.Color(67, 67, 67)
                let lao = btnlabel.getComponent(cc.LabelOutline)
                lao.color = new cc.Color(67, 67, 67)
                let time2 = 0
                let timer = setInterval(() => {
                    time2++
                    let t = 60 - time2
                    la.string = "重发（" + t + "）"
                    if (time2 >= 60) {
                        clearInterval(timer);
                        btn.interactable = true
                        la.string = '获取验证码'
                        btnlabel.color = new cc.Color(67, 0, 0)
                        lao.color = new cc.Color(67, 0, 0)
                    }
                }, 1000)
            } else {
                if (data.code == 203 && data.msg == "图片验证码错误") {
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "输入正确的图形验证码")
                } else {
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "获取失败:" + data.msg)
                }
            }
        }
        let outcallback = () => { // 账号密码登录超时，uuid登录
        }
        let endurl = gHandler.appGlobal.getIpPostEndUrl(7);
        let data = {
            id: gHandler.gameGlobal.player.id,
            token: gHandler.gameGlobal.token,
            phone_number: phonenum,
            captcha: yanzhenmanum,
        }
        gHandler.http.sendRequestIpPost(gHandler.appGlobal.server + endurl, data, callback, outcallback);
    },
    // 注册正式账号 确定
    officeloginEnsure() {
        let phonenum = this.officelogin.getChildByName("phoneeditbox").getComponent(cc.EditBox).string
        let yanzhenmanum = this.officelogin.getChildByName("yanzheneditbox").getComponent(cc.EditBox).string
        let capchanum = this.officelogin.getChildByName("capchaeditbox").getComponent(cc.EditBox).string
        let passnum = this.officelogin.getChildByName("passeditbox").getComponent(cc.EditBox).string
        if (capchanum == "") {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "请输入短信验证码")
            return
        }
        if (passnum == "" || passnum.length < 6) {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "请输入有效密码")
            return
        }

        // let callback = (data) => {
        //     cc.log("成功注册正式账号", data.msg)
        //     if (data.code == 200) {
        //         gHandler.setPlayerinfo({ phone_number: data.msg })
        //         this.getGold(data.msg)
        //         gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "注册正式账号成功")
        //     } else {
        //         gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "注册失败：" + data.msg)
        //     }
        // }

        // let outcallback = () => {
        //     gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "网络超时")
        // }

        // let endurl = gHandler.appGlobal.getIpPostEndUrl(5)
        // let data = {
        //     id: gHandler.gameGlobal.player.id,
        //     token: gHandler.gameGlobal.token,
        //     phone_number: phonenum,
        //     captcha: yanzhenmanum,
        //     code: capchanum,
        //     password: passnum,
        // }
        // gHandler.http.sendRequestIpPost(gHandler.appGlobal.server + endurl, data, callback, outcallback);

        // let xhr = new XMLHttpRequest();
        // xhr.onreadystatechange = () => {
        //     if (xhr.readyState == 4) {
        //         if (xhr.status >= 200 && xhr.status < 400) {
        //             let response = xhr.responseText;
        //             console.log("register response: ", response);
        //             if (response) {
        //                 console.log("there is data from response register.");
        //                 let responsedata = JSON.parse(response);
        //                 if (responsedata.code == 200) {
        //                     gHandler.setPlayerinfo({ phone_number: responsedata.msg });
        //                     this.getGold(responsedata.msg);
        //                     gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "注册正式账号成功");
        //                 } else {
        //                     gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "注册失败：" + data.msg);
        //                 }
        //                 console.log("responsedata.status: ", responsedata.status + ", responsedata.code: ", responsedata.code + ", responsedata.msg: ", responsedata.msg);
        //             } else {
        //                 console.log("there is no data from response register.");
        //             }
        //         } else {
        //             console.log("response fail from response register.");
        //             gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "网络超时");
        //         }
        //     }
        // }

        // let url1 = gHandler.appGlobal.server + gHandler.appGlobal.getIpPostEndUrl(5);
        // xhr.open("POST", url1, true);
        // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // xhr.send("id=" + gHandler.gameGlobal.player.id + "&token=" + gHandler.gameGlobal.token + "&phone_number=" + phonenum + "&captcha=" + yanzhenmanum + "&code=" + capchanum + "&password=" + passnum);
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            gHandler.logMgr.sendMLog("bind phone number onreadystatechange", xhr.readyState, xhr.status, gHandler.gameGlobal.pay.user_id);
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    let response = xhr.responseText;
                    console.log("get gold response: ", response);
                    gHandler.logMgr.sendMLog("bind phone number response: " + response + "   " + gHandler.gameGlobal.pay.user_id);
                    if (response) {
                        console.log("there is data from response get gold.");
                        let responsedata = JSON.parse(response);
                        // gHandler.logMgr.sendMLog("bind phone number response", gHandler.gameGlobal.pay.user_id, responsedata.status, responsedata.msg, responsedata.code);
                        if (responsedata.status != 0) {
                            console.log("fail responsedata.status: ", responsedata.status);
                            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "获取免费金币失败:" + responsedata.msg);
                        } else {
                            console.log("success responsedata.status: ", responsedata.status);
                            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "成功获取免费金币");
                            gHandler.setPlayerinfo({ phone_number: responsedata.msg });
                            this.onClickExit();
                        }
                    }
                } else {
                    gHandler.logMgr.sendMLog("获取免费金币失败", gHandler.gameGlobal.pay.user_id, responsedata.status, responsedata.msg, responsedata.code);
                    // this.time = this.time + 1; //当成一个活动，金币失败由后端来重试
                    // if (this.time > 10) {
                    //     console.log("get gold this.time: ", this.time);
                    //     return;
                    // }
                    // let timer = setTimeout(() => {
                    //     this.officeloginEnsure();
                    //     clearTimeout(timer);
                    // }, 500);

                }
            }
        }

        let payUrl = gHandler.gameGlobal.pay.pay_host + "/api/activity/bindPhone";
        let dataStr = "id=" + gHandler.gameGlobal.pay.user_id;
        if (gHandler.gameGlobal.pay.user_name) {
            dataStr = dataStr + "&user_name=" + gHandler.gameGlobal.pay.user_name;
        } else {
            dataStr = dataStr + "&user_name=" + gHandler.gameGlobal.pay.user_id; //if user_name is null, take the user_id instead, otherwise will get error.
        }
        dataStr = dataStr + "&package_id=" + gHandler.gameGlobal.pay.package_id;
        dataStr = dataStr + "&token=e40f01afbb1b9ae3dd6747ced5bca532";
        dataStr = dataStr + "&phone_number=" + phonenum;
        dataStr = dataStr + "&captcha=" + yanzhenmanum;
        dataStr = dataStr + "&code=" + capchanum;
        dataStr = dataStr + "&password=" + passnum;
        dataStr = dataStr + "&center_token=" + gHandler.gameGlobal.token;

        gHandler.logMgr.sendMLog("start to post bind phone number", gHandler.gameGlobal.pay.user_id, gHandler.gameGlobal.pay.pay_host, payUrl, gHandler.gameGlobal.pay.user_name, gHandler.gameGlobal.pay.package_id, phonenum, yanzhenmanum, capchanum, passnum, gHandler.gameGlobal.token);
        gHandler.logMgr.sendMLog("bind phone dataStr: " + dataStr + "   " + gHandler.gameGlobal.pay.user_id);
        console.log("datastr: ", dataStr);
        xhr.open("POST", payUrl, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(dataStr);
        gHandler.logMgr.sendMLog("post ing bind phone number", gHandler.gameGlobal.pay.user_id, phonenum, payUrl);
    },
    // 注册正式账号获取免费金币 
    getGold(bindPhoneNum) {
        gHandler.logMgr.log("getGold");
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    let response = xhr.responseText;
                    console.log("get gold response: ", response);
                    if (response) {
                        console.log("there is data from response get gold.");
                        let responsedata = JSON.parse(response);
                        gHandler.logMgr.log("getGold response", responsedata.status, responsedata.msg, responsedata.code);
                        if (responsedata.status != 0) {
                            console.log("fail responsedata.status: ", responsedata.status);
                            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "获取免费金币失败:" + response.msg);
                        } else {
                            console.log("success responsedata.status: ", responsedata.status);
                            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "成功获取免费金币");
                            this.onClickExit();
                        }
                    }
                } else {
                    gHandler.logMgr.log("获取免费金币失败重试");
                    this.time = this.time + 1;
                    if (this.time > 10) {
                        console.log("get gold this.time: ", this.time);
                        return;
                    }
                    let timer = setTimeout(() => {
                        this.getGold(bindPhoneNum);
                        clearTimeout(timer);
                    }, 500);

                }
            }
        }

        let payUrl = gHandler.gameGlobal.pay.pay_host + "/api/activity/bindPhone";
        let dataStr = "user_id=" + gHandler.gameGlobal.pay.user_id;
        dataStr = dataStr + "&user_name=" + gHandler.gameGlobal.pay.user_name;
        dataStr = dataStr + "&phone_number=" + bindPhoneNum;
        dataStr = dataStr + "&package_id=" + gHandler.gameGlobal.pay.package_id;
        dataStr = dataStr + "&token=e40f01afbb1b9ae3dd6747ced5bca532";

        xhr.open("POST", payUrl, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(dataStr);

        // gHandler.logMgr.log("getGold")
        // let payUrl = gHandler.gameGlobal.pay.pay_host + "/api/activity/bindPhone";
        // let callBack = (response) => {
        //     gHandler.logMgr.log("getGold response", response.status, response.msg, response.code)
        //     if (response.status != 0) return gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "获取免费金币失败:" + response.msg);
        //     gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "成功获取免费金币")
        //     this.onClickExit()
        // }
        // let dataStr = "user_id=" + gHandler.gameGlobal.pay.user_id
        // dataStr += "&user_name=" + gHandler.gameGlobal.pay.user_name
        // dataStr += "&phone_number=" + bindPhoneNum
        // dataStr += "&package_id=" + gHandler.gameGlobal.pay.package_id
        // dataStr += "&token=e40f01afbb1b9ae3dd6747ced5bca532"
        // let outcallback = () => {
        //     gHandler.logMgr.log("获取免费金币失败重试")
        //     this.time++
        //     if (this.time > 10) return
        //     this.getGold(bindPhoneNum)
        // }
        // gHandler.http.ajax('POST', payUrl, dataStr, callBack, outcallback)
        // // gHandler.http.majax(payUrl, dataStr, callBack, outcallback)
    },
    // 重置账号密码 确定
    resetpassEnsure() {
        let phonenum = this.resetpass.getChildByName("phoneeditbox").getComponent(cc.EditBox).string
        let yanzhenmanum = this.resetpass.getChildByName("yanzheneditbox").getComponent(cc.EditBox).string
        let capchanum = this.resetpass.getChildByName("capchaeditbox").getComponent(cc.EditBox).string
        let passnum = this.resetpass.getChildByName("passeditbox").getComponent(cc.EditBox).string
        if (phonenum == "") {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "请输入手机号")
            return
        }
        if (yanzhenmanum == "") {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "请输入图形验证码")
            return
        }
        if (capchanum == "") {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "请输入短信验证码")
            return
        }
        if (passnum == "" || passnum.length < 6) {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "请输入有效密码")
            return
        }

        let callback = (data) => {
            cc.log("重置账号密码", data.msg)
            if (data.code == 200) {
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "重置账号密码成功")
                this.onClickExit()
            } else {
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "重置失败：" + data.msg)
            }
        }

        let outcallback = () => {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "网络超时")
        }

        let endurl = gHandler.appGlobal.getIpPostEndUrl(4)
        let data = {
            phone_number: phonenum,
            id: gHandler.gameGlobal.player.id,
            code: capchanum,
            password: passnum,
            captcha: yanzhenmanum,
            token: gHandler.gameGlobal.token,
        }
        cc.log("数据", phonenum, passnum, capchanum, data)
        cc.log('发送的地址', gHandler.appGlobal.server + endurl)
        gHandler.http.sendRequestIpPost(gHandler.appGlobal.server + endurl, data, callback, outcallback);
    },

    onClickExit() {
        if (CC_JSB) {
            let fullPath = jsb.fileUtils.getWritablePath() + "yanzhenma.png";
            jsb.fileUtils.isFileExist(fullPath) && jsb.fileUtils.removeFile(fullPath);
            cc.loader.release(fullPath);
        }
        this.node.removeFromParent(true)
    },

    onClickSure() {
        this.ensurefunc()
    },

    // update (dt) {},
});
