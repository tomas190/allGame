
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        this.UILoad()
    },

    start() {

    },
    // UI动态加载
    UILoad() {
        let surebtn = cc.find("iostiplayer/surecg")
        hqq.imgLoad(surebtn, "base/language/" + hqq.language + "/img/surecg")
        let info = cc.find("iostiplayer/info")
        hqq.setLabel(info, { tipname: "iostiplayer" })
        let noremind = cc.find("iostiplayer/toggle/noremind")
        hqq.imgLoad(noremind, "base/language/" + hqq.language + "/img/noremind")
    },
    init(data) {

    },
    onClickClose() {
        this.node.destroy()
    },
    onCickSure() {
        cc.log('onCickSure')
        let endurl = '?token=' + hqq.gameGlobal.token + '&deviceid=' + hqq.app.deviceID + '&acconunt=' + hqq.gameGlobal.player.account_name
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            if (hqq.reflect.setClipboard('http://game.539316.com/' + endurl)) {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip17"))
            } else {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip18"))
            }
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            cc.sys.openURL('http://game.539316.com/' + endurl)
        }
    },
    /**
     * @Description:不再提示
     */
    noTipAgain(toggle) {
        hqq.localStorage.globalSet("isShowIosTip", toggle.isChecked)
    },

    // update (dt) {},
});
