import * as cc from 'cc';
const { ccclass, property } = cc._decorator;

@ccclass('hallRegisterLayer_test')
export class hallRegisterLayer_test extends cc.Component {
    public numfont: cc.LabelAtlas | null = null;
    public xsnumfont: cc.LabelAtlas | null = null;
    public goldlabel: cc.Label | null = null;
    public chongzhi: cc.Label | null = null;
    public xhnumfont: cc.LabelAtlas | null = null;
    private data: any = null;
    getClassName() {
        return "hallRegisterLayer_test";
    }
    onLoad() {
        this.data = null;

        this.goldlabel = cc.find("Canvas/registerlayer/aninode/freegold").getComponent(cc.Label);
        this.chongzhi = cc.find("Canvas/registerlayer/aninode/chongzhi").getComponent(cc.Label);
    }
    start() {
    }
    UILoad() {
        let givejinbi = cc.find("Canvas/registerlayer/aninode/givejinbi")
        let registerbtn = cc.find("Canvas/registerlayer/aninode/registerbtn")
        if (hqq.app.pinpai != "xinsheng" && hqq.app.pinpai != "xinlong") {
            hqq.btnLoad(registerbtn, "base/language/" + hqq.language + "/img/registerbtn")
        }
        let aninode = cc.find("Canvas/registerlayer/aninode")
        let closebtn = cc.find("Canvas/registerlayer/aninode/p_close")
        hqq.setBtn(registerbtn, { callback: "onClickRegister", script: this });
        hqq.setBtn(closebtn, { callback: "onClickExit", script: this });

        if (hqq.app.pinpai == "fuxin") {
            registerbtn.active = false
            hqq.setBtn(closebtn, { path: "base/img/btn_close", x: 360, y: 250 })
            hqq.skeletonLoad(aninode, "language/" + hqq.language + "/fuxinregisterani", "animation", true, hqq["hall_" + hqq.app.pinpai])
        } else if (hqq.app.pinpai == "juding") {
            registerbtn.active = false
            hqq.setBtn(closebtn, { Res: hqq["hall_" + hqq.app.pinpai], path: "juding/btn_close", x: 360, y: 250 })
            hqq.skeletonLoad(aninode, "language/" + hqq.language + "/fuxinregisterani", "animation", true, hqq["hall_" + hqq.app.pinpai])
        } else if (hqq.app.pinpai == "xinsheng") {
            this.chongzhi.font = this.xsnumfont
            this.chongzhi.fontSize = 50
            this.chongzhi.string = "3-"
            this.chongzhi.node.setPositionEx(-35, -70)
            this.goldlabel.font = this.xsnumfont
            this.goldlabel.fontSize = 50
            this.goldlabel.string = "388"
            this.goldlabel.node.setPositionEx(80, -70)
            hqq.setSprite(aninode, { Res: hqq["hall_" + hqq.app.pinpai], path: "language/" + hqq.language + "/bigimg/d", width: 1096, height: 750, widget: { horizontalCenter: 0, verticalCenter: 0 } })
            hqq.setSprite(registerbtn, { Res: hqq["hall_" + hqq.app.pinpai], path: "language/" + hqq.language + "/xinsheng/btn", position: { x: 0, y: -230 } })
            hqq.setBtn(closebtn, { path: "base/xinsheng/img/exit" })
        } else if (hqq.app.pinpai == "xinlong") {
            this.chongzhi.node.active = false;
            this.goldlabel.node.active = false;
            hqq.setSprite(aninode, { Res: hqq["hall_" + hqq.app.pinpai], path: "language/" + hqq.language + "/bigimg/d", width: 1273, height: 668, widget: { horizontalCenter: 0, verticalCenter: -30 } })
            hqq.setSprite(registerbtn, { Res: hqq["hall_" + hqq.app.pinpai], path: "language/" + hqq.language + "/xinlong/btn", position: { x: 110, y: -155 } })
            hqq.setBtn(closebtn, { Res: hqq["hall_" + hqq.app.pinpai], path: "xinlong/img/exit", position: { x: 520, y: 220 } })
        } else if (hqq.app.pinpai == "xingui") {
            this.chongzhi.font = this.xsnumfont
            this.chongzhi.fontSize = 65
            this.chongzhi.string = "200"
            this.chongzhi.node.setPositionEx(-45, -180)
            this.goldlabel.font = this.xsnumfont
            this.goldlabel.fontSize = 80
            this.goldlabel.string = "60"
            this.goldlabel.node.setPositionEx(270, -174)
            hqq.setSprite(givejinbi, { path: "base/language/" + hqq.language + "/img/givejinbi3", position: { x: 400, y: -205 } })
            hqq.skeletonLoad(aninode, "language/" + hqq.language + "/huodong_signupbonus2", "xunhuan", true, hqq["hall_" + hqq.app.pinpai])
            hqq.setBtn(closebtn, { path: "base/xinsheng/img/exit" })
        } else if (hqq.app.pinpai == "debi") {
            this.goldlabel.font = this.xsnumfont
            this.goldlabel.fontSize = 80
            this.goldlabel.string = "2"
            this.goldlabel.node.setPositionEx(220, -174)
            hqq.setSprite(givejinbi, { path: "base/language/" + hqq.language + "/img/givejinbi", position: { x: 345, y: -194 } })
            hqq.skeletonLoad(aninode, "bigimg/language/" + hqq.language + "/xinshenghuodong", "xunhuan", true)
            hqq.setBtn(closebtn, { path: "base/xinsheng/img/exit" })
        } else if (hqq.app.pinpai == "xinhao") {
            this.chongzhi.font = this.xhnumfont
            this.chongzhi.fontSize = 65
            this.chongzhi.string = "3-"
            this.chongzhi.node.setPositionEx(15, -180)
            this.goldlabel.font = this.xhnumfont
            this.goldlabel.fontSize = 65
            this.goldlabel.string = "388"
            this.goldlabel.node.setPositionEx(180, -180)
            hqq.setSprite(givejinbi, { Res: hqq["hall_test"], path: "language/" + hqq.language + "/xinhao/givejinbi4", position: { x: 380, y: -185 } })
            hqq.skeletonLoad(aninode, "language/" + hqq.language + "/huodong_signupbonus3", "xunhuan", true, hqq["hall_test"])
            hqq.setBtn(closebtn, { path: "base/xinsheng/img/exit" })
        } else if (hqq.app.pinpai == "nineone") {
            this.goldlabel.font = this.numfont
            this.goldlabel.fontSize = 60
            this.goldlabel.node.setPositionEx(240, -185)
            this.goldlabel.string = "10"
            hqq.setSprite(givejinbi, { path: "base/language/" + hqq.language + "/img/givejinbi", position: { x: 400, y: -210 } })
            hqq.skeletonLoad(aninode, "language/" + hqq.language + "/huodong_signupbonus4", "xunhuan", true, hqq["hall_test"])
            hqq.setBtn(closebtn, { path: "base/img/p_close" })
        } else {
            this.goldlabel.font = this.numfont
            this.goldlabel.fontSize = 60
            this.goldlabel.node.setPositionEx(220, -185)
            this.goldlabel.string = "3"
            hqq.setSprite(givejinbi, { path: "base/language/" + hqq.language + "/img/givejinbi", position: { x: 380, y: -210 } })
            hqq.skeletonLoad(aninode, "language/" + hqq.language + "/huodong", "xunhuan", true, hqq["hall_test"])
            hqq.setBtn(closebtn, { path: "base/img/p_close" })
        }
    }
    init(data: any) {
        cc.resources.load("base/test/labelatlas/registernum", cc.LabelAtlas, (error: Error, labelatlas: cc.LabelAtlas) => {
            if (error) {
                cc.log(error);
                return;
            }
            this.numfont = labelatlas;
            cc.resources.load("base/xinsheng/labelatlas/givenum3", cc.LabelAtlas, (error2: Error, labelatlas: cc.LabelAtlas) => {
                if (error2) {
                    cc.log(error2);
                    return;
                }
                this.xsnumfont = labelatlas;
                cc.resources.load("base/test/labelatlas/givenum3", cc.LabelAtlas, (error3: Error, labelatlas: cc.LabelAtlas) => {
                    if (error3) {
                        cc.log(error3);
                        return;
                    }
                    this.xhnumfont = labelatlas;
                    this.UILoad()
                    if (data) {
                        if (data.exitfunc) {
                            this.onClickExit = () => {
                                this.node.destroy()
                                data.exitfunc()
                            }
                        }
                    }
                })
            })
        })
    }
    onClickExit() {
        this.node.destroy()
    }
    onClickRegister() {
        if (hqq.gameGlobal.player.phonenum != "") {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip43"))
        } else {
            hqq.eventMgr.dispatch(hqq.eventMgr.showBiglayer, 3)
            this.node.destroy()
        }
    }
}