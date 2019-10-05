/*
 * @Author: burt
 * @Date: 2019-09-30 14:03:59
 * @LastEditors: burt
 * @LastEditTime: 2019-10-04 16:33:40
 * @Description: 
 */

let gHandler = require("gHandler");
cc.Class({
    extends: cc.Component,

    properties: {
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
        let player = gHandler.gameGlobal.player
        this.headimg.spriteFrame = gHandler.hallResManager.getHallHeadFrame(player.headurl.substring(0, player.headurl.indexOf(".")))
        this.goldlabel.string = gHandler.commonTools.fixedFloat(player.gold).replace(".", "/")
        this.nicklabel.string = player.nick
        this.idlabel.string = player.id
        if (player.phonenum) {
            this.phonelabel.string = player.phonenum
            this.phonelabel.node.color = new cc.Color(225, 225, 225, 225)
        } else {
            this.phonelabel.string = "暂未绑定手机"
            this.phonelabel.node.color = new cc.Color(152, 152, 152, 225)
        }

        if (player.alipay) {
            this.alipaylabel.string = player.alipay
            this.alipaylabel.node.color = new cc.Color(225, 225, 225, 225)
        } else {
            this.alipaylabel.string = "暂未绑定支付宝"
            this.alipaylabel.node.color = new cc.Color(152, 152, 152, 225)
        }

        if (player.yinhangka) {
            this.yinghangkalabel.string = player.yinhangka
            this.yinghangkalabel.node.color = new cc.Color(225, 225, 225, 225)
        } else {
            this.yinghangkalabel.string = "暂未绑定银行卡"
            this.yinghangkalabel.node.color = new cc.Color(152, 152, 152, 225)
        }

        gHandler.audioMgr && gHandler.audioMgr.bgIsOpen ? this.musictoggle.check() : this.musictoggle.uncheck()
        gHandler.audioMgr && gHandler.audioMgr.effectIsOpen ? this.audiotoggle.check() : this.audiotoggle.uncheck()

        gHandler.eventMgr.register("changePlayerInfo", "hallPersonLayer", this.setPlayerInfo.bind(this))
    },

    start() {

    },

    setPlayerInfo(msg) {
        if (msg.nick) {
            this.nicklabel.string = msg.nick
        }
        if (msg.gold) {
            let gold = 0
            if (msg.gold < 0.01) {
                gold = 0;
            } else {
                gold = gHandler.commonTools.fixedFloat(msg.gold);
            }
            this.goldlabel.string = gold.toString().replace(".", "/")
        }
        if (msg.headurl) {
            this.headimg.spriteFrame = gHandler.hallResManager.getHallHeadFrame(msg.headurl.substring(0, msg.headurl.indexOf(".")))
        }
        if (msg.phonenum) {
            this.phonelabel.string = msg.phonenum
            this.phonelabel.node.color = new cc.Color(225, 225, 225, 225)
        }
        if (msg.alipay) {
            this.alipaylabel.string = msg.alipay
            this.alipaylabel.node.color = new cc.Color(225, 225, 225, 225)
        }
        if (msg.yinhangka) {
            this.yinghangkalabel.string = msg.yinhangka
            this.yinghangkalabel.node.color = new cc.Color(225, 225, 225, 225)
        }
        if (msg.id) {
            this.idlabel.string = msg.id
        }
    },

    onClickExit() {
        console.log("关闭")
        this.node.active = false
    },

    onClickChangeHeadImg() {
        console.log("切换头像")
        gHandler.eventMgr.dispatch("showsmallsublayer", 1)
    },

    onClickNick() {
        console.log("修改昵称")
        gHandler.eventMgr.dispatch("showsmallsublayer", 3)
    },

    onClickCopy() {
        console.log("复制id", this.idlabel.string)
        gHandler.Reflect && gHandler.Reflect.setClipboard(this.idlabel.string);
    },

    obnClickPhoneBind() {
        console.log("绑定手机")
        gHandler.eventMgr.dispatch("showbigsublayer", 3)
    },

    onClickAlipayBind() {
        console.log("绑定支付宝")
        gHandler.eventMgr.dispatch("showsmallsublayer", 2)
    },

    onClickYinHangKaBind() {
        console.log("绑定银行卡")
        gHandler.eventMgr.dispatch("showbigsublayer", 2)
    },

    onClickChangeAccount() {
        console.log("切换账号")
        gHandler.eventMgr.dispatch("showsmallsublayer", 4)
    },

    onClickMusic(event) {
        console.log("音乐开关")
        gHandler.audioMgr && gHandler.audioMgr.setBgState(event.isChecked)
    },

    onClickAudio(event) {
        console.log("音效开关")
        gHandler.audioMgr && gHandler.audioMgr.setEffectState(event.isChecked)
    },
    // update (dt) {},

    onDestroy() {
        console.log("hallPersonLayer onDestroy")
        gHandler.eventMgr.unregister("changePlayerInfo", "hallPersonLayer")
    },
});
