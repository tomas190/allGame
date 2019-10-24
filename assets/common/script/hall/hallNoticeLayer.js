
/*
 * @Author: burt
 * @Date: 2019-09-28 17:12:14
 * @LastEditors: burt
 * @LastEditTime: 2019-10-24 08:32:55
 * @Description: 大厅公告页
 */

let gHandler = require("gHandler");
cc.Class({
    extends: cc.Component,

    properties: {
        subtitle: cc.Sprite,
        subtime: cc.Label,
        subtxt: cc.Label,
        subscroll: cc.ScrollView,
        email: cc.SpriteFrame,
        notice: cc.SpriteFrame,

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
        this.subData = null

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

    init() {

    },

    initNoticeScroll() {
        this.noticeItemList = []
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
        this.emailItemList = []
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
        this.node.removeFromParent(true)
    },

    onClickGongGao() {
        // console.log("公告")
        this.gonggaobtn.interactable = false
        this.emailbtn.interactable = true
        this.noticescroll.node.active = true
        this.eamilscroll.node.active = false
        this.deletbtn.active = false
    },

    onClickYouJian(event, custom) {
        return
        // console.log("邮件")
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
        // console.log("点击", custom)
        this.noticedata[custom.key].isShow = 1
        this.noticeItemList[custom.key].getChildByName("readstate").getComponent(cc.Sprite).spriteFrame = this.noticedata[custom.key].isShow ? this.hasreadframe : this.noreadframe;
        this.sublayer.active = true
        this.initSubLayer(custom)
        this.checkIsAllRead()
        let noticehistory = gHandler.localStorage.getGlobal().noticeKey
        if (!noticehistory) {
            noticehistory = []
        }
        noticehistory.push(custom.create_time)
        if (noticehistory.length > 200) {
            noticehistory.splice(0, 150)
        }
        gHandler.localStorage.globalSet('noticeKey', noticehistory)
    },

    checkIsAllRead() {
        for (let i = 0; i < this.noticedata.length; i++) {
            if (this.noticedata[i].isShow == 0) {
                return
            }
        }
        gHandler.eventMgr.dispatch(gHandler.eventMgr.refreshHallTips, { hidenoticetip: true })
    },

    onClieckDeleteHasRead() {
        this.emaildata.shift()
        this.initEmailScroll()
    },


    onClickSubClose() {
        this.sublayer.active = false
    },

    onClickDelete() {
        if (this.subData.type == 2) {
            for (let i = 0; i < this.noticedata.length; i++) {
                if (this.noticedata[i].key == this.subData.key) {
                    this.noticedata.splice(i, 1)
                    for (let j = 0; j < this.noticedata.length; j++) {
                        this.noticedata[j].key = j
                    }
                    this.initNoticeScroll()
                    this.onClickSubClose()
                    return
                }
            }
        }
    },

    initSubLayer(custom, isemail) {
        this.subData = custom
        this.subtime.node.active = isemail
        if (isemail) {
            this.subtime.string = custom.strtime
            this.subtitle.spriteFrame = this.email
        } else {
            this.subtitle.spriteFrame = this.notice
        }
        this.subtxt.string = custom.words
        this.subtxt._updateRenderData(true)
        this.subscroll.content.height = this.subtime.node.height + this.subtxt.node.height
    }

    // update (dt) {},
});
