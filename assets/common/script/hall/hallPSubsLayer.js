/*
 * @Author: burt
 * @Date: 2019-09-30 16:50:44
 * @LastEditors: burt
 * @LastEditTime: 2019-10-14 16:42:16
 * @Description: 
 */

let gHandler = require("gHandler");
cc.Class({
    extends: cc.Component,

    properties: {
        changehead: cc.Node,
        bindalipay: cc.Node,
        nickchange: cc.Node,
        login: cc.Node,

        headscroll: cc.ScrollView,
        headitem: cc.Node,
    },

    onLoad() {
        this.headpanelinit = false
        this.ensurefunc = () => {
            this.onClickExit()
        }
    },

    start() {

    },

    init(subtype) {
        switch (subtype) {
            case 1: // 修改头像
                this.changehead.active = true
                if (!this.headpanelinit) {
                    this.headpanelinit = true
                    this.changeheadInit()
                }
                this.ensurefunc = this.changeheadCallback
                break;
            case 2: // 绑定支付宝
                this.bindalipay.active = true
                this.ensurefunc = this.bindalipayCallback
                break;
            case 3: // 修改昵称
                this.nickchange.active = true
                this.ensurefunc = this.nickchangeCallback
                break;
            case 4: // 切换账号
                this.login.active = true
                this.ensurefunc = this.loginCallback
                break;
        }
    },

    changeheadCallback() {
        console.log("changeheadCallback", this.headindex)
        gHandler.eventMgr.dispatch(gHandler.eventMgr.refreshPlayerinfo, {
            game_img: this.headindex,
        })
        this.onClickExit()
    },

    bindalipayCallback() {
        console.log("bindalipayCallback")
        let url = gHandler.gameGlobal.pay.pay_host + "/api/payment_account/saveAccount"
        let alipayaccount = this.bindalipay.getChildByName("alipayeditbox").getComponent(cc.EditBox).string
        if (alipayaccount.length == 0) {
            return gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "请输入支付宝账号")
        }
        let shoukuanren = this.bindalipay.getChildByName("shoukuanren").getComponent(cc.EditBox).string
        if (shoukuanren.length == 0) {
            return gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "请输入收款人姓名")
        }
        let obj = {};
        obj = {
            account_card: alipayaccount,
            account_name: shoukuanren,
        };
        let info = JSON.stringify(obj);
        let dataStr = "user_id=" + gHandler.gameGlobal.pay.user_id
        dataStr += "&user_name=" + gHandler.gameGlobal.pay.user_name
        dataStr += "&action=add&withdraw_type=1&type=2"
        dataStr += "&info=" + info
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
        let outcallback = () => {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "网络超时")
        }
        gHandler.http.ajax('POST', url, dataStr, callback, outcallback)
    },

    nickchangeCallback() {
        console.log("nickchangeCallback")
        let callback = (data, url) => {
            if (data.code == 200) {
                gHandler.gHandler.eventMgr.refreshPlayerinfo({ game_nick: data.msg })
                this.onClickExit()
            } else {
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "修改昵称失败")
            }
        }
        let outcallback = () => {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "网络超时")
        }

        let nick = this.nickchange.getChildByName("nickeditbox").getComponent(cc.EditBox).string
        if (nick == "") {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "请输入有效昵称")
            return
        }
        let endurl = gHandler.appGlobal.getIpPostEndUrl(1)
        let data = {
            id: gHandler.gameGlobal.player.id,
            token: gHandler.gameGlobal.token,
            game_nick: nick,
        }
        gHandler.http.sendRequestIpPost(gHandler.appGlobal.server + endurl, data, callback, outcallback);
    },

    loginCallback() {
        // console.log("loginCallback")
        let account = this.login.getChildByName("phoneeditbox").getComponent(cc.EditBox).string
        let pass = this.login.getChildByName("passeditbox").getComponent(cc.EditBox).string
        gHandler.loginMgr.accountChange(account, pass, (issucess) => {
            if (issucess) {
                this.onClickExit()
            } else {
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "切换账号失败")
            }
        })
    },

    changeheadInit() {
        this.itemlist = []
        this.headindex = "0"
        let headlen = gHandler.hallResManager.getHallHeadFrameLength()
        this.headscroll.content.height = Math.floor(headlen / 5) * 155
        let player = gHandler.gameGlobal.player
        let headid = parseInt(player.headurl.substring(0, player.headurl.indexOf(".")))
        for (let i = 0; i < headlen; i++) {
            let headitem = cc.instantiate(this.headitem)
            let head = headitem.getChildByName("masknode").getChildByName("head").getComponent(cc.Sprite)
            head.spriteFrame = gHandler.hallResManager.getHallHeadFrame(i)
            let x = i % 5
            let y = Math.floor(i / 5)
            headitem.setPosition(156 * (x - 2), 155 * (-0.5 - y))
            headitem.active = true
            this.itemlist.push(headitem)

            var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node;
            clickEventHandler.component = "hallPSubsLayer";
            clickEventHandler.customEventData = i;
            clickEventHandler.handler = "onClickHeadItem";
            let button = headitem.getComponent(cc.Button);
            button.clickEvents.push(clickEventHandler);

            this.headscroll.content.addChild(headitem)
            if (headid == i) {
                this.onClickHeadItem({ target: headitem }, headid)
            }
        }
    },

    onClickHeadItem(event, custom) {
        // console.log("event")
        this.headindex = custom + ""
        event.target.getChildByName("selectsp").active = true
        for (let i = 0; i < this.itemlist.length; i++) {
            if (custom == i) {
            } else {
                this.itemlist[i].getChildByName("selectsp").active = false
            }
        }
    },

    onClickForgetPass() {
        // console.log("onClickForgetPass")
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showBiglayer, 1)
        this.onClickExit()
    },

    onClickExit() {
        this.changehead.active = false
        this.bindalipay.active = false
        this.nickchange.active = false
        this.login.active = false
        this.node.active = false
    },

    onClickSure() {
        this.ensurefunc()
    },

    // update (dt) {},

});
