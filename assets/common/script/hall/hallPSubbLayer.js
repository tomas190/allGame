/*
 * @Author: burt
 * @Date: 2019-09-30 16:50:44
 * @LastEditors: burt
 * @LastEditTime: 2019-10-14 18:39:39
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
    },

    onLoad() {
        // console.log("subblayer onload")
        this.subtype = 0
        this.ensurefunc = () => {
            this.onClickExit()
        }
    },

    start() {

    },

    init(subtype) {
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
        console.log('onClickCaptcha', this.subtype)
        this.panelInit(this.subtype)
    },

    // 注册正式账号初始化
    panelInit(mtype) {
        if (CC_JSB) {
            let fullPath = jsb.fileUtils.getWritablePath() + "yanzhenma.png";
            jsb.fileUtils.isFileExist(fullPath) && jsb.fileUtils.removeFile(fullPath);
            cc.loader.release(fullPath);
        }

        let imgurl = "http://" + gHandler.appGlobal.server + "/Game/Verify/createCaptcha?"
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
                console.log("请求到了图片")
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
        console.log("获取手机短信验证码")
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
        if (yanzhenmanum == "") {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "请输入图形验证码")
            return
        }
        let self = this
        let callback = (data, url) => {
            console.log("getCaptcha callback", data, url)
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
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "获取手机验证码失败")
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

        let callback = (data) => {
            console.log("成功注册正式账号", data)
            if (data.code == 200) {
                gHandler.setPlayerinfo({ phone_number: data.msg })
                this.getGold(data.msg)
            } else {
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "注册正式账号失败")
            }
        }

        let outcallback = () => {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "网络超时")
        }

        let endurl = gHandler.appGlobal.getIpPostEndUrl(5)
        let data = {
            id: gHandler.gameGlobal.player.id,
            token: gHandler.gameGlobal.token,
            phone_number: phonenum,
            captcha: yanzhenmanum,
            code: capchanum,
            password: passnum,
        }
        gHandler.http.sendRequestIpPost(gHandler.appGlobal.server + endurl, data, callback, outcallback);
    },
    // 注册正式账号获取免费金币
    getGold(bindPhone) {
        let payUrl = gHandler.gameGlobal.pay.pay_host + bindPhone;
        let formData2 = new FormData();
        formData2.append('user_id', gHandler.gameGlobal.player.id);
        formData2.append('user_name', gHandler.gameGlobal.player.nick);
        formData2.append('phone_number', bindPhone);
        formData2.append('token', 'e40f01afbb1b9ae3dd6747ced5bca532');
        formData2.append('package_id', gHandler.gameGlobal.pay.package_id);
        fetch(payUrl, {
            method: 'POST',
            body: formData2
        }).then((response) => {
            let data2 = response.json()
            if (data2.status != 0) return gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "获取免费金币失败");
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "成功获取免费金币")
            this.onClickExit()
        });
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
            console.log("重置账号密码", data)
            if (data.code == 200) {
                this.onClickExit()
            } else {
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "重置账号密码失败")
            }
        }

        let outcallback = () => {

        }

        let endurl = gHandler.appGlobal.getIpPostEndUrl(5)
        let data = {
            // account_pass:
            // id:
        }
        gHandler.http.sendRequestIpPost(gHandler.appGlobal.server + endurl, data, callback, outcallback);
    },

    onClickExit() {
        if (CC_JSB) {
            let fullPath = jsb.fileUtils.getWritablePath() + "yanzhenma.png";
            jsb.fileUtils.isFileExist(fullPath) && jsb.fileUtils.removeFile(fullPath);
            cc.loader.release(fullPath);
        }
        this.resetpass.active = false
        this.bindyinhangka.active = false
        this.officelogin.active = false
        this.node.active = false
    },

    onClickSure() {
        this.ensurefunc()
    },

    // update (dt) {},
});
