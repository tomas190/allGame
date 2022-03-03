import * as cc from 'cc';
const { ccclass } = cc._decorator;

@ccclass('ioswebtip')
export class ioswebtip extends cc.Component {

    onLoad() {
        this.UILoad()
    }

    start() {
    }

    UILoad() {
        hqq.imgLoad(this.node, "base/language/" + hqq.language + "/img/tips")
    }

    init(data: any) {
    }

    onClickClose() {
        this.node.destroy()
        hqq.localStorage.globalSet("noShowIosWebTip", true)
    }

}