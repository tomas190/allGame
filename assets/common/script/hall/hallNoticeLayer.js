
/*
 * @Author: burt
 * @Date: 2019-09-28 17:12:14
 * @LastEditors: burt
 * @LastEditTime: 2019-10-03 16:43:22
 * @Description: 大厅公告页
 */

let gHandler = require("gHandler");
cc.Class({
    extends: cc.Component,

    properties: {
        gonggaobtn: cc.Button,
        emailbtn: cc.Button,
        deletbtn: cc.Node,
        sublayer: cc.Node,
        item: cc.Node,
        noticescroll: cc.ScrollView,
        eamilscroll: cc.ScrollView,

        hasreadframe: cc.SpriteFrame,
        noreadframe: cc.SpriteFrame,

        ehasreadframe: cc.SpriteFrame,
        enoreadframe: cc.SpriteFrame,

        subnoticeframe: cc.SpriteFrame,
        subemailframe: cc.SpriteFrame,

    },

    onLoad() {
        // this.tempdata = [
        //     {
        //         title: "公平游戏公告",
        //         time: "2019-07-25 16:32:15",
        //         content: "啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
        //         readstate: true,
        //     },
        //     {
        //         title: "支付宝充值注意事项",
        //         time: "2019-07-25 16:32:16",
        //         content: "不不不不不不不不不不不不不不不",
        //         readstate: false,
        //     },
        //     {
        //         title: "银行卡收益公告",
        //         time: "2019-07-25 16:32:17",
        //         content: "啛啛喳喳错错错错错错错错错错错错错错",
        //         readstate: false,
        //     },
        //     {
        //         title: "银行卡收益公告",
        //         time: "2019-07-25 16:32:17",
        //         content: "啛啛喳喳错错错错错错错错错错错错错错",
        //         readstate: false,
        //     },
        //     {
        //         title: "银行卡收益公告",
        //         time: "2019-07-25 16:32:17",
        //         content: "啛啛喳喳错错错错错错错错错错错错错错",
        //         readstate: false,
        //     },
        //     {
        //         title: "银行卡收益公告",
        //         time: "2019-07-25 16:32:17",
        //         content: "啛啛喳喳错错错错错错错错错错错错错错",
        //         readstate: false,
        //     },
        // ]

        this.noticedata = gHandler.commonTools.jsonCopy(gHandler.gameGlobal.noticeList)

        this.emaildata = []

        this.noticeItemList = []
        this.emailItemList = []
        // this.initEmailScroll()
        this.initNoticeScroll()
        this.onClickGongGao()
    },

    start() {

    },

    initNoticeScroll() {
        this.noticescroll.content.removeAllChildren()
        this.noticescroll.content.height = (this.item.height + 16) * this.noticedata.length + 44
        for (let i = 0; i < this.noticedata.length; i++) {
            let mitem = cc.instantiate(this.item)
            let readstate = mitem.getChildByName("readstate").getComponent(cc.Sprite)
            readstate.spriteFrame = this.noticedata[i].isShow ? this.hasreadframe : this.noreadframe;
            let time = mitem.getChildByName("time").getComponent(cc.Label)
            let notice = mitem.getChildByName("notice")
            notice.active = true
            let email = mitem.getChildByName("email")
            email.active = false
            let title = notice.getChildByName("title").getComponent(cc.Label)
            title.string = this.noticedata[i].title
            this.noticedata[i].strtime = gHandler.commonTools.formatDateToStr(this.noticedata[i].create_time)
            time.string = this.noticedata[i].strtime
            var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node;
            clickEventHandler.component = "hallNoticeLayer";
            clickEventHandler.customEventData = this.noticedata[i];
            clickEventHandler.handler = "onClickReadItem";
            let btn = notice.getChildByName("btn").getComponent(cc.Button);
            btn.clickEvents.push(clickEventHandler);
            mitem.setPosition(0, -(0.5 + i) * (mitem.height + 16) - 22)
            mitem.active = true
            this.noticescroll.content.addChild(mitem)
            this.noticeItemList.push(mitem)
        }
    },

    initEmailScroll() {
        this.eamilscroll.content.removeAllChildren()
        this.eamilscroll.content.height = (this.item.height + 16) * this.emaildata.length + 44
        for (let i = 0; i < this.emaildata.length; i++) {
            let mitem = cc.instantiate(this.item)
            let readstate = mitem.getChildByName("readstate").getComponent(cc.Sprite)
            readstate.spriteFrame = this.emaildata[i].isShow ? this.hasreadframe : this.noreadframe;
            let time = mitem.getChildByName("time").getComponent(cc.Label)
            let notice = mitem.getChildByName("notice")
            notice.active = false
            let email = mitem.getChildByName("email")
            email.active = true
            let title = email.getChildByName("title").getComponent(cc.Label)
            title.string = this.emaildata[i].title
            this.emaildata[i].strtime = gHandler.commonTools.formatDateToStr(this.emaildata[i].create_time)
            time.string = this.emaildata[i].strtime
            var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node;
            clickEventHandler.component = "hallNoticeLayer";
            clickEventHandler.customEventData = this.emaildata[i];
            clickEventHandler.handler = "onClickReadItem";
            let btnnode = email.getChildByName("btn")
            let btnsprite = btnnode.getComponent(cc.Sprite)
            btnsprite.spriteFrame = this.emaildata[i].isShow ? this.ehasreadframe : this.enoreadframe;
            let btn = btnnode.getComponent(cc.Button);
            btn.clickEvents.push(clickEventHandler);
            mitem.setPosition(0, -(0.5 + i) * (mitem.height + 16) - 22)
            mitem.active = true
            this.eamilscroll.content.addChild(mitem)
            this.emailItemList.push(mitem)
        }
    },

    onClickExit() {
        this.node.active = false;
    },

    onClickGongGao() {
        console.log("公告")
        this.gonggaobtn.interactable = false
        this.emailbtn.interactable = true
        this.noticescroll.node.active = true
        this.eamilscroll.node.active = false
        this.deletbtn.active = false
    },

    onClickYouJian(event, custom) {
        return
        console.log("邮件")
        this.emaildata[custom.key].isShow = 1
        this.noticeItemList[custom.key].getChildByName("readstate").getComponent(cc.Sprite).spriteFrame = this.emaildata[custom.key].isShow ? this.hasreadframe : this.noreadframe;
        this.emailItemList[custom.key].getChildByName("email").getChildByName("btn").getComponent(cc.Sprite).spriteFrame = this.emaildata[custom.key].isShow ? this.ehasreadframe : this.enoreadframe;
        this.gonggaobtn.interactable = true
        this.emailbtn.interactable = false
        this.noticescroll.node.active = false
        this.eamilscroll.node.active = true
        this.deletbtn.active = true
    },

    onClickReadItem(event, custom) {
        console.log("点击", custom)
        this.noticedata[custom.key].isShow = 1
        this.noticeItemList[custom.key].getChildByName("readstate").getComponent(cc.Sprite).spriteFrame = this.noticedata[custom.key].isShow ? this.hasreadframe : this.noreadframe;
        this.sublayer.active = true
        this.sublayer.getComponent("hallNoticeSubLayer").init(custom)
        this.checkIsAllRead()
    },

    checkIsAllRead() {
        for (let i = 0; i < this.noticedata.length; i++) {
            if (this.noticedata[i].isShow == 0) {
                return
            }
        }
        gHandler.eventMgr.dispatch("noticeallread", false)
    },

    onClieckDeleteHasRead() {
        this.emaildata.shift()
        this.initEmailScroll()
    },

    // update (dt) {},
});
