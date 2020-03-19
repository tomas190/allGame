<<<<<<< HEAD

=======
/*
 * @Author: burt
 * @Date: 2020-01-02 19:25:51
 * @LastEditors  : burt
 * @LastEditTime : 2020-01-02 19:51:41
 * @Description: ios提示面板
 */
>>>>>>> 1d13304ef16cf6bd8851bc1c4693c3ec45597bd8
let gHandler = require("gHandler");
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // onLoad () {},

    start() {

    },
    init(data) {

    },

    onClickClose() {
        this.node.removeFromParent(true)
    },
    onCickSure() {
        console.log('onCickSure')
        let endurl = '?token=' + gHandler.gameGlobal.token + '&deviceid=' + gHandler.appGlobal.deviceID + '&acconunt=' + gHandler.gameGlobal.player.account_name
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            if (gHandler.Reflect.setClipboard('http://game.539316.com/' + endurl)) {
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "复制地址成功")
            } else {
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "复制地址失败")
            }
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            cc.sys.openURL('http://game.539316.com/' + endurl)
        }
    },
    /**
     * @Description:不再提示
     */
    noTipAgain(toggle) {
        gHandler.localStorage.globalSet("isShowIosTip", toggle.isChecked)
    },

    // update (dt) {},
});
