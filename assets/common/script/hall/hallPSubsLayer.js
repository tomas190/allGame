/*
 * @Author: burt
 * @Date: 2019-09-30 16:50:44
 * @LastEditors: burt
 * @LastEditTime: 2019-10-04 14:08:02
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
        console.log("subslayer onload")
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
        console.log("changeheadCallback")

    },

    bindalipayCallback() {
        console.log("bindalipayCallback")

    },

    nickchangeCallback() {
        console.log("nickchangeCallback")
        let callback = (data, url) => {
            if (data.code == 200) {
                gHandler.eventMgr.dispatch("changePlayerInfo", { nick: data.msg })
                this.onClickExit()
            } else {

            }
        }
        let outcallback = () => {
        }

        let nick = this.nickchange.getChildByName("nickeditbox").getComponent(cc.EditBox).string
        let endurl = gHandler.appGlobal.getIpPostEndUrl(1)
        let data = {
            id: gHandler.gameGlobal.player.id,
            token: gHandler.gameGlobal.token,
            game_nick: nick,
        }
        gHandler.http.sendRequestIpPost(gHandler.appGlobal.server + endurl, data, callback, outcallback);
    },

    loginCallback() {
        console.log("loginCallback")
        let account = this.login.getChildByName("phoneeditbox").getComponent(cc.EditBox).string
        let pass = this.login.getChildByName("passeditbox").getComponent(cc.EditBox).string
        gHandler.loginMgr.accountChange(account, pass, (issucess) => {
            if (issucess) {
                this.onClickExit()
            } else {
                console.log("切换账号失败")
            }
        })
    },

    changeheadInit() {
        this.itemlist = []
        this.headindex = 0
        let headlen = gHandler.hallResManager.getHallHeadFrameLength()
        this.headscroll.content.height = Math.floor(headlen / 5) * 155
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
        }
    },

    onClickHeadItem(event, custom) {
        // console.log("event")
        this.headindex = custom
        event.target.getChildByName("selectsp").active = true
        for (let i = 0; i < this.itemlist.length; i++) {
            if (custom == i) {
            } else {
                this.itemlist[i].getChildByName("selectsp").active = false
            }
        }
    },

    onClickForgetPass() {
        console.log("onClickForgetPass")
        gHandler.eventMgr.dispatch("showbigsublayer", 1)
        this.onClickExit()
    },

    onClickExit() {
        console.log("tc")
        this.changehead.active = false
        this.bindalipay.active = false
        this.nickchange.active = false
        this.login.active = false
        this.node.active = false
    },

    onClickSure() {
        console.log("qr")

        this.ensurefunc()
    },

    // update (dt) {},

});
