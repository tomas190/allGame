import * as cc from 'cc';
const { ccclass } = cc._decorator;

@ccclass('iostiplayer')
export class iostiplayer extends cc.Component {

    onLoad() {
        this.UILoad()
    }

    start() {
    }

    UILoad() {
        let surebtn = cc.find("iostiplayer/surecg")
        hqq.imgLoad(surebtn, "base/language/" + hqq.language + "/img/surecg")
        let info = cc.find("iostiplayer/info")
        hqq.setLabel(info, { tipname: "iostiplayer" })
        let noremind = cc.find("iostiplayer/toggle/noremind")
        hqq.imgLoad(noremind, "base/language/" + hqq.language + "/img/noremind")
    }

    init(data: any) {
    }

    onClickClose() {
        this.node.destroy()
    }

    onCickSure() {
        cc.log('onCickSure')
        let endurl = '?token=' + hqq.gameGlobal.token + '&deviceid=' + hqq.app.deviceID + '&acconunt=' + hqq.gameGlobal.player.account_name
        if (cc.sys.os === cc.sys.OS.ANDROID) {
            if (hqq.reflect.setClipboard('http://game.539316.com/' + endurl)) {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip17"))
            } else {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip18"))
            }
        } else if (cc.sys.os === cc.sys.OS.IOS) {
            cc.sys.openURL('http://game.539316.com/' + endurl)
        }
    }

    noTipAgain(toggle: any) {
        hqq.localStorage.globalSet("isShowIosTip", toggle.isChecked)
    }

}