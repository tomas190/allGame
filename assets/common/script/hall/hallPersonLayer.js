/*
 * @Author: burt
 * @Date: 2019-09-30 14:03:59
 * @LastEditors  : burt
 * @LastEditTime : 2019-12-26 19:49:01
 * @Description: 
 */

let gHandler = require("gHandler");
cc.Class({
    extends: cc.Component,

    properties: {
        txt_se: cc.Node,
        txt_bgm: cc.Node,
        versionlabel: cc.Label,
        phonebindbtn: cc.Node,
        alipaybindbtn: cc.Node,
        yinhangkabindbtn: cc.Node,

        musictoggle: cc.Toggle,
        audiotoggle: cc.Toggle,

        headimg: cc.Sprite,
        goldlabel: cc.Label,
        nicklabel: cc.Label,
        idlabel: cc.Label,
        phonelabel: cc.Label,
        alipaylabel: cc.Label,
        yinghangkalabel: cc.Label,
    },

    onLoad() {
        this.num0 = 0
        this.num1 = 0
        let str = "版本：" + (gHandler.localStorage.getGlobal().versionKey || "1.0.0")
        if (cc.sys.isNative && cc.sys.os != "Windows") {
            str += "剪切板：" + gHandler.Reflect.getClipboard()
        }
        this.versionlabel.string = str
        if (cc.Button.prototype.setSoundEffect) {
            this.txt_bgm.getComponent(cc.Button).setSoundEffect(false)
            this.txt_se.getComponent(cc.Button).setSoundEffect(false)
        }
    },

    start() {
    },

    init(data) {
        let player = gHandler.gameGlobal.player
        gHandler.commonTools.loadHeadRes(player.headurl, this.headimg)
        this.goldlabel.string = gHandler.commonTools.formatGold(player.gold).toString().replace(".", "/")
        this.nicklabel.string = player.nick
        this.idlabel.string = player.id
        if (player.phonenum) {
            this.phonelabel.string = player.phonenum
            this.phonelabel.node.color = new cc.Color(225, 225, 225)
            this.phonebindbtn.active = false
        }
        // else {
        //     this.phonelabel.string = "暂未绑定手机"
        //     this.phonelabel.node.color = new cc.Color(152, 152, 152)
        // }

        if (player.alipay) {
            this.alipaylabel.string = player.alipay.substring(0, 2) + "** **** **" + player.alipay.substring(player.alipay.length - 2, player.alipay.length)
            this.alipaylabel.node.color = new cc.Color(225, 225, 225)
            this.alipaybindbtn.active = false
        }
        // else {
        //     this.alipaylabel.string = "暂未绑定支付宝"
        //     this.alipaylabel.node.color = new cc.Color(152, 152, 152)
        // }

        if (player.yinhangka) {
            let kahaostr = player.yinhangka.toString()
            this.yinghangkalabel.string = "**** **** **** " + kahaostr.substring(kahaostr.length - 4, kahaostr.length)
            this.yinghangkalabel.node.color = new cc.Color(225, 225, 225)
            this.yinhangkabindbtn.active = false
        }
        //  else {
        //     this.yinghangkalabel.string = "暂未绑定银行卡"
        //     this.yinghangkalabel.node.color = new cc.Color(152, 152, 152)
        // }

        gHandler.audioMgr && gHandler.audioMgr.bgIsOpen ? this.musictoggle.check() : this.musictoggle.uncheck()
        gHandler.audioMgr && gHandler.audioMgr.effectIsOpen ? this.audiotoggle.check() : this.audiotoggle.uncheck()

        gHandler.eventMgr.register(gHandler.eventMgr.refreshPlayerinfo, "hallPersonLayer", this.setPlayerInfo.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.getPayInfo, "hallPersonLayer", this.getPayInfo.bind(this))

        if (!player.alipay || !player.yinhangka) {
            this.getPayInfo();
        }
    },

    getPayInfo() {
        let endurl = "/api/with_draw/index?user_id=" + gHandler.gameGlobal.pay.user_id
        endurl += "&token=e40f01afbb1b9ae3dd6747ced5bca532&package_id=" + gHandler.gameGlobal.pay.package_id
        endurl += "&version=1"
        let callback = (data) => {
            // cc.log("getPayInfo callback", data)
            if (data && data.status == 0) {
                let list = data.data.list
                let isNoAlipay = true
                let isNotyinhang = true
                for (let i = 0; i < list.length; i++) {
                    if (list[i].type == "3") {
                        gHandler.gameGlobal.player.yinhangka = JSON.parse(list[i].info).card_num
                        let kahaostr = gHandler.gameGlobal.player.yinhangka.toString()
                        this.yinghangkalabel.string = "**** **** **** " + kahaostr.substring(kahaostr.length - 4, kahaostr.length)
                        this.yinghangkalabel.node.color = new cc.Color(225, 225, 225)
                        this.yinhangkabindbtn.active = false
                        isNotyinhang = false
                    } else if (list[i].type == "2") {
                        gHandler.gameGlobal.player.alipay = JSON.parse(list[i].info).account_card
                        let alistr = gHandler.gameGlobal.player.alipay
                        this.alipaylabel.string = alistr.substring(0, 2) + "** **** **" + alistr.substring(alistr.length - 2, alistr.length)
                        this.alipaylabel.node.color = new cc.Color(225, 225, 225)
                        this.alipaybindbtn.active = false
                        isNoAlipay = false
                    }
                }
                if (isNoAlipay) {
                    this.alipaylabel.string = "暂未绑定支付宝"
                    this.alipaylabel.node.color = new cc.Color(152, 152, 152)
                    this.alipaybindbtn.active = true
                }
                if (isNotyinhang) {
                    this.yinghangkalabel.string = "暂未绑定银行卡"
                    this.yinghangkalabel.node.color = new cc.Color(152, 152, 152)
                    this.yinhangkabindbtn.active = true
                }
            }
        }
        let outcallback = () => { // 账号密码登录超时，uuid登录
        }
        if (gHandler.gameGlobal.pay.pay_host == "") {
            gHandler.logMgr.time("最快的pay地址")
            let qcallback = (url) => {
                gHandler.logMgr.timeEnd("最快的pay地址", url)
                gHandler.gameGlobal.pay.pay_host = url;
                this.sendRequestIpGet(gHandler.gameGlobal.pay.pay_host, endurl, callback, outcallback)
            }
            console.log("requestFastestUrl(gHandler.appGlobal.remoteSeverinfo.pay_host: " + gHandler.appGlobal.remoteSeverinfo.pay_host + " +/checked");
            gHandler.http.requestFastestUrl(gHandler.appGlobal.remoteSeverinfo.pay_host, null, "/checked", qcallback)
        } else {
            this.sendRequestIpGet(gHandler.gameGlobal.pay.pay_host, endurl, callback, outcallback)
        }
    },
    sendRequestIpGet(urlto, endurl, callback, outcallback) {
        let alreadyCallBack = false;
        let xhr = new XMLHttpRequest();
        let m_url = urlto + endurl;
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    if (callback && !alreadyCallBack) {
                        let response = JSON.parse(xhr.responseText);
                        callback(response, urlto);
                        alreadyCallBack = true;
                    }
                } else {
                    if (callback && !alreadyCallBack) {
                        callback(null);
                        alreadyCallBack = true;
                    }
                }
            }
        };
        xhr.open("GET", m_url, true);
        let timer = setTimeout(() => {
            if (outcallback && !alreadyCallBack) {
                // xhr.abort(); // 如果请求已经被发送，则立刻终止请求
                outcallback(null);
                alreadyCallBack = true;
            }
            clearTimeout(timer);
        }, 3000)
        xhr.send();
    },

    setPlayerInfo(msg) {
        if (msg.game_nick) {
            this.nicklabel.string = msg.game_nick
        }
        if (msg.game_gold || msg.game_gold == 0) {
            this.goldlabel.string = msg.game_gold.toString().replace(".", "/")
        }
        if (msg.game_img) {
            gHandler.commonTools.loadHeadRes(msg.game_img, this.headimg)
        }
        if (msg.phone_number) {
            this.phonelabel.string = msg.phone_number
            this.phonelabel.node.color = new cc.Color(225, 225, 225)
            this.phonebindbtn.active = false
        } else if (msg.phone_number == "") {
            this.phonelabel.string = "暂未绑定手机"
            this.phonelabel.node.color = new cc.Color(152, 152, 152)
        }
        if (msg.alipay) {
            this.alipaylabel.string = msg.alipay.substring(0, 2) + "** **** **" + msg.alipay.substring(msg.alipay.length - 2, msg.alipay.length)
            this.alipaylabel.node.color = new cc.Color(225, 225, 225)
            this.alipaybindbtn.active = false
        }
        if (msg.yinhangka) {
            this.yinghangkalabel.string = "**** **** **** " + msg.yinhangka.substring(msg.yinhangka.length - 4, msg.yinhangka.length)
            this.yinghangkalabel.node.color = new cc.Color(225, 225, 225)
            this.yinhangkabindbtn.active = false
        }
        if (msg.id) {
            this.idlabel.string = msg.id
            if (!msg.alipay || !msg.yinhangka) {
                this.getPayInfo();
            }
        }
    },

    onClickExit() {
        // cc.log("关闭")
        this.node.removeFromParent(true)
    },

    onClickChangeHeadImg() {
        // cc.log("切换头像")
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showSamlllayer, { type: 1 })
    },

    onClickNick() {
        // cc.log("修改昵称")
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showSamlllayer, { type: 3 })
    },

    onClickCopy() {
        // cc.log("复制id", this.idlabel.string)
        if (gHandler.Reflect) {
            if (gHandler.Reflect.setClipboard(this.idlabel.string)) {
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "复制id成功")
            } else {
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "复制id失败")
            }
        }
    },

    obnClickPhoneBind() {
        // cc.log("绑定手机")
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showBiglayer, 3)
    },

    onClickAlipayBind() {
        // cc.log("绑定支付宝")
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showSamlllayer, { type: 2 })
    },

    onClickYinHangKaBind() {
        // cc.log("绑定银行卡")
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showBiglayer, 2)
    },

    onClickChangeAccount() {
        // cc.log("切换账号")
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showSamlllayer, { type: 4 })
    },

    onClickMusic(event) {
        // cc.log("音乐开关")
        gHandler.audioMgr && gHandler.audioMgr.setBgState(event.isChecked)
    },

    onClickAudio(event) {
        // cc.log("音效开关")
        gHandler.audioMgr && gHandler.audioMgr.setEffectState(event.isChecked)
    },

    onClicktxt_se() {
        this.num0++
        if (this.num0 > 10 && this.num1 > 10) {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showConsole, null)
        }
    },
    onClicktxt_bgm() {
        this.num1++
        if (this.num0 > 10 && this.num1 > 10) {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showConsole, null)
        }
    },

    onclickDownApk() {
        gHandler.appGlobal.idDownApk = true
        cc.director.loadScene('loading')
    },

    // update (dt) {},

    onEnable() {
        gHandler.eventMgr.register(gHandler.eventMgr.refreshPlayerinfo, "hallPersonLayer", this.setPlayerInfo.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.getPayInfo, "hallPersonLayer", this.getPayInfo.bind(this))
    },

    onDisable() {
        gHandler.eventMgr.unregister(gHandler.eventMgr.getPayInfo, "hallPersonLayer")
        gHandler.eventMgr.unregister(gHandler.eventMgr.refreshPlayerinfo, "hallPersonLayer")
    },

    onDestroy() {
        gHandler.eventMgr.unregister(gHandler.eventMgr.getPayInfo, "hallPersonLayer")
        gHandler.eventMgr.unregister(gHandler.eventMgr.refreshPlayerinfo, "hallPersonLayer")
    },
});
