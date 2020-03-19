<<<<<<< HEAD

=======
/*
 * @Author: burt
 * @Date: 2019-09-30 16:50:44
 * @LastEditors  : burt
 * @LastEditTime : 2020-02-11 14:30:40
 * @Description: 
 */
>>>>>>> 1d13304ef16cf6bd8851bc1c4693c3ec45597bd8

let gHandler = require("gHandler");
cc.Class({
    extends: cc.Component,

    properties: {
        changehead: cc.Node,
        bindalipay: cc.Node,
        nickchange: cc.Node,
        login: cc.Node,
        nologin: cc.Node,
        download: cc.Node,
        tiplayer: cc.Node,
        tiplayerinfo: cc.Label,
        iostip: cc.Node,

        exitbtn: cc.Node,
        surecg: cc.Node,

        headscroll: cc.ScrollView,
        headitem: cc.Node,
    },

    onLoad() {

    },

    start() {

    },

    init(data) {
        this.headpanelinit = false
        this.ensurefunc = () => {
            this.onClickExit()
        }
        this.changehead.active = false
        this.bindalipay.active = false
        this.nickchange.active = false
        this.login.active = false
        this.nologin.active = false
        this.tiplayer.active = false
        this.download.active = false
        this.data = data
        switch (data.type) {
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
            case 5: // 切换账号 自动加 id 
                this.login.active = true
                this.login.getChildByName("phoneeditbox").getComponent(cc.EditBox).string = gHandler.gameGlobal.player.id
                this.ensurefunc = this.loginCallback
                break;
            case 6: // 账号掉线
                this.nologin.active = true
                this.exitbtn.active = false
                this.surecg.y = -140
                this.ensurefunc = this.nologinCallback
                break;
            case 7: // 账号掉线 加自动登录
                this.login.active = true
                if (this.login.getChildByName("txt_autologin")) {
                    this.login.getChildByName("txt_autologin").active = true
                }
                if (this.login.getChildByName("txt_forgetpwd")) {
                    this.login.getChildByName("txt_forgetpwd").active = false
                }
                this.ensurefunc = this.loginCallback
                break;
            case 8: // 安装包跳转下载
                this.download.active = true
                if (data.msg) {
                    let label = this.download.getChildByName('download').getComponent(cc.Label)
                    label.string = data.msg || '安装包有更新，请点击确定进行重新下载安装'
                }
                this.exitbtn.active = false
                this.surecg.y = -10
                this.clearLocalData()
                this.ensurefunc = this.downLoadCallback
                break;
            case 9: // 跳转浏览器网页客户端
                this.tiplayerinfo.string = data.msg || 'ios掉包严重，移步至浏览器网页版，无忧游戏'
                this.tiplayer.active = true
                this.surecg.y = -140
                this.ensurefunc = this.openUrl
                break;
            case 10: // 任意提示信息
                this.tiplayerinfo.string = data.msg || '金币不足，不能进入该等级的房间'
                this.tiplayer.active = true
                this.surecg.y = -140
                if (data.ensurefunc) {
                    this.ensurefunc = data.ensurefunc
                }
                break;
        }
    },

    // 清除本地缓存及可读写路径
    clearLocalData() {
        let islocalstorageClear = false
        if (gHandler.localStorage) {
            islocalstorageClear = gHandler.localStorage.clear()
            if (gHandler.appGlobal.huanjin == 'dev') {
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "删除本地缓存", islocalstorageClear)
            }
        }
        if (cc.sys.isBrowser) {
            return
        }
        let directory = jsb.fileUtils.getWritablePath()
        let isok = jsb.fileUtils.removeDirectory(directory)
        return isok
    },
    downLoadCallback() {
        if (gHandler.appDownUrl) {
            cc.sys.openURL(gHandler.appDownUrl)
        } else {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "下载链接错误")
        }
    },
    nologinCallback() {
        this.exitbtn.active = true
        this.nologin.active = false
        this.surecg.y = this.surecg.y - 61
        this.login.active = true
        this.login.getChildByName("phoneeditbox").getComponent(cc.EditBox).string = gHandler.gameGlobal.player.id
        this.ensurefunc = this.loginCallback
    },

    changeheadCallback() {
        let callback = (data, url) => {
            if (data.code == 200) {
                gHandler.setGameInfo({ game_img: data.msg, })
                this.onClickExit()
            } else {
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "修改失败:" + data.msg)
            }
        }
        let outcallback = () => {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "网络超时")
        }

        let endurl = gHandler.appGlobal.getIpPostEndUrl(8)
        let data = {
            id: gHandler.gameGlobal.player.id,
            token: gHandler.gameGlobal.token,
            image: this.headindex + ".png",
        }
        gHandler.http.sendRequestIpPost(gHandler.appGlobal.server + endurl, data, callback, outcallback);
    },

    alipayInputCheck(event) { // 支付宝账号输入检测
        let str = ''
        for (let i = 0; i < event.string.length; i++) {
            let input = event.string[i]
            if (!isNaN(input) || ((input >= 'A' && input <= 'Z') || (input >= 'a' && input <= 'z')) || input == "@" || input == ".") {
                str += event.string[i]
            } else if (/[^\u4e00-\u9fa5]/.test(event.string.charCodeAt(i))) { // @ 字符在里面
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "支付宝账号不支持中文字符")
            } else {
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "支付宝账号只支持数字和英文字母")
            }
        }
        this.bindalipay.getChildByName("alipayeditbox").getComponent(cc.EditBox).string = str
    },

    bindalipayCallback() {
        let url = gHandler.gameGlobal.pay.pay_host + "/api/payment_account/saveAccount"
        let alipayaccount = this.bindalipay.getChildByName("alipayeditbox").getComponent(cc.EditBox).string
        if (alipayaccount.length == 0) {
            return gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "请输入支付宝账号")
        }
        for (let i = 0; i < alipayaccount.length; i++) {
            let input = alipayaccount[i]
            if (!isNaN(input) || ((input >= 'A' && input <= 'Z') || (input >= 'a' && input <= 'z')) || input == "@" || input == ".") {
            } else {
                return gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "支付宝账号只支持数字和英文字母")
            }
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
        let failcallback = () => {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "网络超时")
        }
        gHandler.http.sendRequestPost(url, dataStr, callback, failcallback)
    },

    nickchangeCallback() {
        let callback = (data, url) => {
            if (data.code == 200) {
                gHandler.gHandler.eventMgr.refreshPlayerinfo({ game_nick: data.msg })
                this.onClickExit()
            } else {
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "修改失败:" + data.msg)
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
        this.headindex = "1"
        let headlen = 10
        this.headscroll.content.height = Math.floor(headlen / 5) * 155
        let player = gHandler.gameGlobal.player
        let headid = parseInt(player.headurl.substring(0, player.headurl.indexOf(".")))
        headid = headid % 10
        for (let i = 0; i < headlen; i++) {
            let headitem = cc.instantiate(this.headitem)
            let head = headitem.getChildByName("masknode").getChildByName("head").getComponent(cc.Sprite)
            gHandler.commonTools.loadHeadRes(i, head)
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
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showBiglayer, 1)
        this.onClickExit()
    },

    onClickAutoLogin() {
        gHandler.loginMgr.autoLogin()
    },

    onClickCopyDownurl() {
        if (gHandler.Reflect) {
            if (gHandler.Reflect.setClipboard(gHandler.appDownUrl)) {
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "复制下载链接成功")
            } else {
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "复制下载链接失败")
            }
        }
    },

    onClickExit() {
        this.node.removeFromParent(true)
    },

    onClickSure() {
        switch (this.data.type) {
            case 1: // 修改头像
                this.changeheadCallback()
                break;
            case 2: // 绑定支付宝
                this.bindalipayCallback()
                break;
            case 3: // 修改昵称
                this.nickchangeCallback()
                break;
            case 4: // 切换账号
                this.loginCallback()
                break;
            case 5: // 切换账号 自动加 id 
                this.loginCallback()
                break;
            case 6: // 账号掉线
                this.nologinCallback()
                break;
            case 7: // 账号掉线 加自动登录
                this.loginCallback()
                break;
            case 8: // 安装包跳转下载
                this.downLoadCallback()
                break;
            case 9: // 跳转浏览器网页客户端
                // this.openUrl()
                break;
            case 10: // 任意提示信息
                if (this.data.ensurefunc) {
                    this.data.ensurefunc()
                }
                break;
        }
    },

    // update (dt) {},

});
