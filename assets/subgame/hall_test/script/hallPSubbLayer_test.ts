import * as cc from 'cc';
import { JSB } from 'cc/env';
const { ccclass, property } = cc._decorator;

@ccclass('hallPSubbLayer_test')
export class hallPSubbLayer_test extends cc.Component {
        public back: cc.Node | null = null;
        public exitbtn: cc.Node | null = null;
        public ensurebtn: cc.Button | null = null;
        public resetpass: cc.Node | null = null;
        public bindyinhangka: cc.Node | null = null;
        public officelogin: cc.Node | null = null;
        public captchaimg1: cc.Sprite | null = null;
        public captchaimg2: cc.Sprite | null = null;
        public BankSelectItem: cc.Prefab | null = null;
        public selectKaihushengContent: cc.Node | null = null;
        public selectKaihushiContent: cc.Node | null = null;
        public selectKaihuhangContent: cc.Node | null = null;
        cities: string = "";
        btnlabel: cc.Node | null = null;
        btnlabel2: cc.Node | null = null;
        kaihushengbtn: cc.Node | null = null;
        kaihushibtn: cc.Node | null = null;
        yinhangnamebtn: cc.Node | null = null;
        title_resetpwd: cc.Node | null = null;
        title_bdbankcard: cc.Node | null = null;
        subtype: number = null;
        kaihuhangSelect: boolean = false;
        kaihushengSelect: boolean = false;
        kaihushiSelect: boolean = false;
        selectIndex: number = null;
        time: number = null;
        ensurefunc: Function = null;

        timer: number = null;
        temptex: cc.Texture2D | null = null;
        getClassName() {
                return "hallPSubbLayer_test";
        }
        onLoad() {
                this.cities = hqq.getTip("cities")
                this.UILoad()
        }
        start() {
        }
        UILoad() {
                if (!cc.isValid(this.node)) {
                        console.log("hallPSubbLayer UILoad 节点不存在")
                        return;
                }
                this.back = cc.find("Canvas/bigsublayer/p_bandalibg2");
                this.exitbtn = cc.find("Canvas/bigsublayer/p_close");
                let surecg = cc.find("Canvas/bigsublayer/surecg");
                this.ensurebtn = surecg.getComponent(cc.Button);
                this.resetpass = cc.find("Canvas/bigsublayer/resetpass");
                this.bindyinhangka = cc.find("Canvas/bigsublayer/bindyinhangka");
                this.officelogin = cc.find("Canvas/bigsublayer/officelogin");
                this.selectKaihushengContent = cc.find("Canvas/bigsublayer/bindyinhangka/kaihushengscrorll/view/selectContent");
                this.selectKaihushiContent = cc.find("Canvas/bigsublayer/bindyinhangka/kaihushiscrorll/view/selectContent");
                this.selectKaihuhangContent = cc.find("Canvas/bigsublayer/bindyinhangka/yinghangnamescrorll/view/selectContent");

                this.captchaimg1 = cc.find("Canvas/bigsublayer/resetpass/imgback/captchaimg").getComponent(cc.Sprite);
                hqq.setBtn(this.captchaimg1.node, { callback: "onClickCaptcha", script: this })
                this.captchaimg2 = cc.find("Canvas/bigsublayer/officelogin/imgback/captchaimg").getComponent(cc.Sprite)
                hqq.setBtn(this.captchaimg2.node, { callback: "onClickCaptcha", script: this })
                hqq["hall_test"].load("prefab/BankSelectItem", cc.Prefab, (err, prefab) => {
                        if (err) {
                                cc.log(err)
                                return
                        }
                        this.BankSelectItem = prefab;
                })

                let getcodebtn = cc.find("Canvas/bigsublayer/resetpass/getcodebtn")
                this.btnlabel = cc.find("Canvas/bigsublayer/resetpass/getcodebtn/btnlabel")
                this.btnlabel.getComponent(cc.Label).string = hqq.getTip("getcode")
                let phoneeditboxnode = cc.find("Canvas/bigsublayer/resetpass/phoneeditbox")
                hqq.editboxTipLoad(phoneeditboxnode, "enterphone")
                let yanzheneditboxnode = cc.find("Canvas/bigsublayer/resetpass/yanzheneditbox")
                hqq.editboxTipLoad(yanzheneditboxnode, "entercode")
                let capchaeditboxnode = cc.find("Canvas/bigsublayer/resetpass/capchaeditbox")
                hqq.editboxTipLoad(capchaeditboxnode, "capchaed")
                let passeditboxnode = cc.find("Canvas/bigsublayer/resetpass/passeditbox")
                hqq.editboxTipLoad(passeditboxnode, "enterlongpass")

                let kahaoeditbox = cc.find("Canvas/bigsublayer/bindyinhangka/kahaoeditbox")
                hqq.editboxTipLoad(kahaoeditbox, "kahaoeditbox")
                let nameediftox = cc.find("Canvas/bigsublayer/bindyinhangka/nameediftox")
                hqq.editboxTipLoad(nameediftox, "nameediftox")
                let kaihusheng = cc.find("Canvas/bigsublayer/bindyinhangka/kaihusheng/kaihushenglabel")
                kaihusheng.getComponent(cc.Label).string = hqq.getTip("kaihusheng")
                let kaihushi = cc.find("Canvas/bigsublayer/bindyinhangka/kaihushi/kaihushilabel")
                kaihushi.getComponent(cc.Label).string = hqq.getTip("kaihushi")
                let yinhangname = cc.find("Canvas/bigsublayer/bindyinhangka/yinhangname/yinhanglabel")
                yinhangname.getComponent(cc.Label).string = hqq.getTip("yinhangname")
                let zhihang = cc.find("Canvas/bigsublayer/bindyinhangka/zhihang")
                hqq.editboxTipLoad(zhihang, "zhihang")

                let getcodebtn2 = cc.find("Canvas/bigsublayer/officelogin/getcodebtn")
                this.btnlabel2 = cc.find("Canvas/bigsublayer/officelogin/getcodebtn/btnlabel")
                this.btnlabel2.getComponent(cc.Label).string = hqq.getTip("getcode")
                let phoneeditbox = cc.find("Canvas/bigsublayer/officelogin/phoneeditbox")
                hqq.editboxTipLoad(phoneeditbox, "enterphone")
                let yanzheneditbox = cc.find("Canvas/bigsublayer/officelogin/yanzheneditbox")
                hqq.editboxTipLoad(yanzheneditbox, "entercode")
                let capchaeditbox = cc.find("Canvas/bigsublayer/officelogin/capchaeditbox")
                hqq.editboxTipLoad(capchaeditbox, "capchaed")
                let passeditbox = cc.find("Canvas/bigsublayer/officelogin/passeditbox")
                hqq.editboxTipLoad(passeditbox, "enterlongpass")
                let tiplabel = cc.find("Canvas/bigsublayer/officelogin/tiplabel")
                tiplabel.getComponent(cc.Label).string = hqq.getTip("officelogintiplabel")
                tiplabel.getComponent(cc.Label).color = cc.color(255, 161, 73, 255);

                this.kaihushengbtn = cc.find("Canvas/bigsublayer/bindyinhangka/kaihusheng/kaihushengxiala")
                this.kaihushibtn = cc.find("Canvas/bigsublayer/bindyinhangka/kaihushi/kaihushixiala")
                this.yinhangnamebtn = cc.find("Canvas/bigsublayer/bindyinhangka/yinhangname/yinghangnamexiala")
                this.title_resetpwd = cc.find("Canvas/bigsublayer/resetpass/title_resetpwd")
                let bankcard_form = cc.find("Canvas/bigsublayer/bindyinhangka/bankcard_form")
                this.title_bdbankcard = cc.find("Canvas/bigsublayer/bindyinhangka/title_bdbankcard")
                let title_signup = cc.find("Canvas/bigsublayer/officelogin/title_signup")

                hqq.setBtn(this.exitbtn, { callback: "onClickExit", script: this })
                hqq.setBtn(surecg, { callback: "onClickSure", script: this })
                hqq.setBtn(getcodebtn, { callback: "onClickGetCaptcha", script: this, custom: 1 })
                hqq.setBtn(getcodebtn2, { callback: "onClickGetCaptcha", script: this, custom: 2 })
                hqq.setBtn(this.kaihushengbtn, { callback: "onClickKaihushengXiala", script: this, x: 225 })
                hqq.setBtn(this.kaihushibtn, { callback: "onClickKaihushiXiala", script: this, x: 225 })
                hqq.setBtn(this.yinhangnamebtn, { callback: "onClickKaihuhangXiala", script: this, x: 225 })

                if (hqq.app.pinpai == "fuxin") {
                        let bpath = "base/fuxin/img/"
                        let blpath = "base/language/" + hqq.language + "/fuxin/"
                        let hpath = "fuxin/img/"
                        let hlpath = "language/" + hqq.language + "/fuxin/"
                        hqq.addNode(this.back, { path: bpath + "tck", y: -10, width: 420, height: 640, anchorX: 1, type: cc.Sprite.Type.SLICED })
                        hqq.addNode(this.back, { path: bpath + "tck", y: -10, width: 420, height: 640, anchorX: 1, scaleX: -1, type: cc.Sprite.Type.SLICED })
                        hqq.setBtn(this.exitbtn, { path: bpath + "guanbi", x: 390, y: 260 })
                        hqq.setBtn(surecg, { path: bpath + "anniu4" })
                        hqq.addNode(surecg, { path: blpath + "qr" })
                        hqq.setBtn(getcodebtn, { path: bpath + "anniu3" })
                        hqq.setBtn(getcodebtn2, { path: bpath + "anniu3" })

                        hqq.setSprite(title_signup, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "zczszh", y: 260 })
                } else if (hqq.app.pinpai == "juding") {
                        let bpath = "base/juding/img/"
                        let blpath = "base/language/" + hqq.language + "/juding/"
                        let hpath = "juding/img/"
                        let hlpath = "language/" + hqq.language + "/juding/"
                        hqq.setSprite(this.back, { path: bpath + "jd_p_bandalibg_2", width: 897, height: 609 })
                        // // hqq.addNode(this.back, { path: bpath + "tck", y: -10, width: 420, height: 640, anchorX: 1, scaleX: -1, type: cc.Sprite.Type.SLICED })
                        hqq.setBtn(this.exitbtn, { path: bpath + "jd_popup_btn_close", x: 385, y: 248, width: 119, height: 70 })
                        hqq.setBtn(surecg, { path: bpath + "jd_p_btn_1_3" })
                        hqq.addNode(surecg, { string: "qr", fontSize: 32, color: cc.color(148, 81, 10), y: -10, bold: true })
                        hqq.setBtn(getcodebtn, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "jd_p_btn_1_1" })
                        hqq.setBtn(getcodebtn2, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "jd_p_btn_1_1" })

                        hqq.setSprite(title_signup, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "zhucezhengshizhanghao", x: -300, y: 255 })
                } else if (hqq.app.pinpai == "xingui") {
                        let bpath = "base/xingui/img/"
                        let blpath = "base/language/" + hqq.language + "/xingui/"
                        let hpath = "xingui/img/"
                        let hlpath = "language/" + hqq.language + "/xingui/"
                        hqq.setSprite(this.back, { path: bpath + "d_tc" })
                        hqq.setBtn(this.exitbtn, { path: bpath + "btn_x" })
                        hqq.setBtn(surecg, { path: bpath + "btn_1" })
                        hqq.addNode(surecg, { path: blpath + "qued" })
                        hqq.setBtn(getcodebtn, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "btn_4" })
                        hqq.setBtn(getcodebtn2, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "btn_4" })
                        hqq.setSprite(title_signup, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "zhuczszh", y: 240 })
                } else if (hqq.app.pinpai == "xinsheng") {
                        let xpath = "base/xinsheng/img/"
                        let xlpath = "base/language/" + hqq.language + "/xinsheng/"
                        let hlpath = "base/language/" + hqq.language + "/img/"
                        hqq.setSprite(this.back, { path: xpath + "back1" })
                        hqq.setBtn(this.exitbtn, { path: xpath + "exit" })
                        hqq.setBtn(getcodebtn, { path: xpath + "btnback1", pressed: xpath + "btnback2", transition: cc.Button.Transition.SPRITE })
                        hqq.setBtn(getcodebtn2, { path: xpath + "btnback1", pressed: xpath + "btnback2", transition: cc.Button.Transition.SPRITE })
                        hqq.setBtn(surecg, { path: xpath + "btnback" })
                        let node = new cc.Node();
                        hqq.setSprite(node, { path: xlpath + "queding", y: 10 })
                        surecg.addChildEx(node)

                        hqq.setSprite(bankcard_form, { path: hlpath + "bankcard_form" })
                        hqq.setSprite(title_signup, { path: xlpath + "zczszh", position: { x: -200, y: 250 } })
                } else if (hqq.app.pinpai == "xinlong") {
                        let bpath = "base/xinlong/img/"
                        let blpath = "base/language/" + hqq.language + "/xinlong/"
                        let hpath = "xinlong/img/"
                        let hlpath = "language/" + hqq.language + "/xinlong/"
                        hqq.setSprite(this.back, { path: bpath + "jd_p_bandalibg_2", width: 897, height: 609 })
                        // // hqq.addNode(this.back, { path: bpath + "tck", y: -10, width: 420, height: 640, anchorX: 1, scaleX: -1, type: cc.Sprite.Type.SLICED })
                        hqq.setBtn(this.exitbtn, { path: bpath + "jd_popup_btn_close", x: 385, y: 248, width: 119, height: 70 })
                        hqq.setBtn(surecg, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "jd_p_btn_1_3" })
                        hqq.addNode(surecg, { string: "qr", fontSize: 32, color: cc.color(148, 81, 10), y: -10, bold: true })
                        hqq.setBtn(getcodebtn, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "jd_p_btn_1_1" })
                        hqq.setBtn(getcodebtn2, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "jd_p_btn_1_1" })

                        hqq.setSprite(title_signup, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "zhucezhengshizhanghao", x: -300, y: 255 })
                } else if (hqq.app.pinpai == "huaxing") {
                        let bpath = "base/huaxing/img/";
                        let blpath = "base/language/" + hqq.language + "/huaxing/"
                        let hpath = "huaxing/img/"
                        let hlpath = "language/" + hqq.language + "/huaxing/"
                        hqq.setSprite(this.back, { path: bpath + "d_ggtc", width: 897, height: 609, type: cc.Sprite.Type.SLICED })
                        hqq.addNode(this.back, { path: bpath + "d_tit", y: 300 })
                        hqq.setBtn(this.exitbtn, { path: bpath + "btn_x", x: 445, y: 290, width: 78, height: 78 })
                        hqq.setBtn(surecg, { path: bpath + "btn_2" })
                        hqq.addNode(surecg, { string: "qr", fontSize: 32, y: -10, bold: true })
                        hqq.setBtn(getcodebtn, { path: bpath + "btn_3", pressed: bpath + "btn_4", transition: cc.Button.Transition.SPRITE })
                        hqq.setBtn(getcodebtn2, { path: bpath + "btn_3", pressed: bpath + "btn_4", transition: cc.Button.Transition.SPRITE })

                        hqq.setSprite(title_signup, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "6", x: 0, y: 285 })
                } else if (hqq.app.pinpai == "ninetwo") {
                        let bpath = "base/ninetwo/img/"
                        let blpath = "base/language/" + hqq.language + "/ninetwo/img/"
                        let hpath = "ninetwo/img/"
                        let hlpath = "language/" + hqq.language + "/ninetwo/img/"
                        hqq.setSprite(this.back, { path: bpath + "popup_win_bg3", width: 813, height: 562, type: cc.Sprite.Type.SLICED })
                        // // hqq.addNode(this.back, { path: hpath + "d_tit" , y:300})
                        hqq.setBtn(this.exitbtn, { path: bpath + "guanbi", x: 400, y: 265, width: 60, height: 60 })
                        hqq.setBtn(getcodebtn, { path: bpath + "anniu1", pressed: bpath + "anniu2", transition: cc.Button.Transition.SPRITE, type: cc.Sprite.Type.SLICED, width: 124, height: 40 })
                        hqq.setBtn(getcodebtn2, { path: bpath + "anniu1", pressed: bpath + "anniu2", transition: cc.Button.Transition.SPRITE, type: cc.Sprite.Type.SLICED, width: 124, height: 40 })

                        hqq.setSprite(this.title_resetpwd, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "titlegaimima", x: 0, y: 230 })
                        // // this.title_resetpwd.setPositionEx(0,180);
                        // // hqq.addNode(this.title_resetpwd, { string: "resetpwd",fontSize:40,lineHeight:45,bold:true ,color:cc.color(190,168,111)})
                        hqq.setSprite(title_signup, { path: blpath + "titlezczszh", x: 0, y: 230 })
                        hqq.addNode(title_signup, { path: bpath + "16", x: -150 })
                        hqq.addNode(title_signup, { path: bpath + "16", x: 150 })
                        hqq.setNode(tiplabel, { x: 270, y: -240, color: cc.color(219, 97, 74) });

                        this.btnlabel2.getComponent(cc.Label).string = hqq.getTip("sendcode2");

                        hqq.setSprite(cc.find("Canvas/bigsublayer/officelogin/info_form"), { path: blpath + "registerAccount_frame", y: -10 })
                } else if (hqq.app.pinpai == "tianqi") {
                        let bpath = "base/img/"
                        let bppath = "base/tianqi/personal/"
                        let blpath = "base/language/" + hqq.language + "/img/"
                        let hlpath = "language/" + hqq.language + "/img/"
                        hqq.setSprite(this.back, { path: "base/tianqi/img/p_bandalibg2" })
                        hqq.setBtn(this.exitbtn, { path: "base/tianqi/img/p_close" })
                        hqq.setBtn(surecg, { path: blpath + "surecg" })
                        hqq.setBtn(getcodebtn, { path: bpath + "getcodebtn", pressed: bpath + "getcodehui", transition: cc.Button.Transition.SPRITE })
                        hqq.setBtn(getcodebtn2, { path: bpath + "getcodebtn", pressed: bpath + "getcodehui", transition: cc.Button.Transition.SPRITE })

                        hqq.setSprite(this.title_resetpwd, { path: blpath + "title_resetpwd" })
                        hqq.setSprite(bankcard_form, { path: blpath + "bankcard_form" })
                        hqq.setSprite(this.title_bdbankcard, { path: blpath + "title_bdbankcard" })
                        hqq.setSprite(title_signup, { path: blpath + "title_signup" })

                        hqq.setBtn(this.kaihushengbtn, { path: bppath + "1" })
                        hqq.setBtn(this.kaihushibtn, { path: bppath + "1" })
                        hqq.setBtn(this.yinhangnamebtn, { path: bppath + "1" })

                        hqq.setSprite(cc.find("Canvas/bigsublayer/resetpass/info_form"), { Res: hqq["hall_test"], path: "test/personal/info_form" })
                        hqq.setSprite(cc.find("Canvas/bigsublayer/officelogin/info_form"), { Res: hqq["hall_test"], path: "test/personal/info_form" })
                } else {
                        let bpath = "base/img/"
                        let hppath = "test/personal/"
                        let blpath = "base/language/" + hqq.language + "/img/"
                        hqq.setSprite(this.back, { Res: hqq["hall_test"], path: hppath + "p_bandalibg2" })
                        hqq.setBtn(this.exitbtn, { path: "base/img/p_close" })
                        hqq.setBtn(surecg, { path: blpath + "surecg" })
                        hqq.setBtn(getcodebtn, { path: bpath + "getcodebtn", pressed: bpath + "getcodehui", transition: cc.Button.Transition.SPRITE })
                        hqq.setBtn(getcodebtn2, { path: bpath + "getcodebtn", pressed: bpath + "getcodehui", transition: cc.Button.Transition.SPRITE })

                        hqq.setSprite(this.title_resetpwd, { path: blpath + "title_resetpwd" })
                        hqq.setSprite(bankcard_form, { path: blpath + "bankcard_form" })
                        hqq.setSprite(this.title_bdbankcard, { path: blpath + "title_bdbankcard" })
                        hqq.setSprite(title_signup, { path: blpath + "title_signup" })

                        let kaihushengscrorll = cc.find("Canvas/bigsublayer/bindyinhangka/kaihushengscrorll");
                        kaihushengscrorll.setPositionEx(160, kaihushengscrorll.getPosition().y);
                        let kaihushiscrorll = cc.find("Canvas/bigsublayer/bindyinhangka/kaihushiscrorll");
                        kaihushiscrorll.setPositionEx(160, kaihushiscrorll.getPosition().y);
                        let yinghangnamescrorll = cc.find("Canvas/bigsublayer/bindyinhangka/yinghangnamescrorll");
                        yinghangnamescrorll.setPositionEx(160, yinghangnamescrorll.getPosition().y);

                        hqq.setBtn(this.kaihushengbtn, { Res: hqq["hall_test"], path: hppath + "1", x: 209 })
                        hqq.setBtn(this.kaihushibtn, { Res: hqq["hall_test"], path: hppath + "1", x: 209 })
                        hqq.setBtn(this.yinhangnamebtn, { Res: hqq["hall_test"], path: hppath + "1", x: 209 })

                        hqq.setSprite(cc.find("Canvas/bigsublayer/resetpass/info_form"), { Res: hqq["hall_test"], path: "test/personal/info_form" })
                        hqq.setSprite(cc.find("Canvas/bigsublayer/officelogin/info_form"), { Res: hqq["hall_test"], path: "test/personal/info_form" })
                }
        }
        init(subtype: any) {
                this.subtype = 0
                this.kaihuhangSelect = false
                this.kaihushengSelect = false
                this.kaihushiSelect = false
                this.selectIndex = 0
                this.time = 0
                this.ensurefunc = () => {
                        this.onClickExit()
                }

                this.subtype = subtype;
                switch (subtype) {
                        case 1: // 重置密码
                                this.resetpass.active = true
                                this.bindyinhangka.active = false
                                this.officelogin.active = false
                                this.panelInit(1)
                                this.ensurefunc = this.resetpassEnsure
                                if (hqq.app.pinpai == "fuxin") {
                                        let bpath = "base/fuxin/img/"
                                        let hpath = "fuxin/img/"
                                        let hlpath = "language/" + hqq.language + "/fuxin/"
                                        let info_form = cc.find("Canvas/bigsublayer/resetpass/info_form")
                                        info_form.active = false
                                        let resetpass = cc.find("Canvas/bigsublayer/resetpass")
                                        hqq.addNode(resetpass, { path: bpath + "srk", zIndex: -2, width: 630, x: 30, y: 145, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(resetpass, { path: bpath + "srk", zIndex: -2, width: 420, x: -75, y: 48, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(resetpass, { path: bpath + "srk", zIndex: -2, width: 420, x: -75, y: -48, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(resetpass, { path: bpath + "srk", zIndex: -2, width: 630, x: 30, y: -150, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(resetpass, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "phone", zIndex: -1, x: -250, y: 145 })
                                        hqq.addNode(resetpass, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "aq", zIndex: -1, x: -250, y: 48 })
                                        hqq.addNode(resetpass, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "yj", zIndex: -1, x: -250, y: -48 })
                                        hqq.addNode(resetpass, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "lock", zIndex: -1, x: -250, y: -150 })
                                        this.btnlabel.getComponent(cc.Label).color = cc.color(255, 255, 255)
                                        let lao = this.btnlabel.getComponent(cc.LabelOutline)
                                        lao.color = cc.color(67, 0, 0)
                                        lao.width = 2
                                        hqq.setSprite(this.title_resetpwd, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "czmm", y: 260 })
                                } else if (hqq.app.pinpai == "juding") {
                                        let bpath = "base/juding/img/"
                                        let hpath = "juding/img/"
                                        let hlpath = "language/" + hqq.language + "/juding/"
                                        let info_form = cc.find("Canvas/bigsublayer/resetpass/info_form")
                                        info_form.active = false
                                        let resetpass = cc.find("Canvas/bigsublayer/resetpass")
                                        hqq.addNode(resetpass, { path: bpath + "jd_p_inputBox_1", zIndex: -2, width: 630, x: 30, y: 145, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(resetpass, { path: bpath + "jd_p_inputBox_1", zIndex: -2, width: 420, x: -75, y: 48, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(resetpass, { path: bpath + "jd_p_inputBox_1", zIndex: -2, width: 420, x: -75, y: -48, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(resetpass, { path: bpath + "jd_p_inputBox_1", zIndex: -2, width: 630, x: 30, y: -150, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(resetpass, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "shoujid", zIndex: -1, x: -250, y: 145 })
                                        hqq.addNode(resetpass, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "fang", zIndex: -1, x: -250, y: 48 })
                                        hqq.addNode(resetpass, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "duanxin", zIndex: -1, x: -250, y: -48 })
                                        hqq.addNode(resetpass, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "suotou", zIndex: -1, x: -250, y: -150 })
                                        this.btnlabel.getComponent(cc.Label).color = cc.color(255, 255, 255)
                                        let lao = this.btnlabel.getComponent(cc.LabelOutline)
                                        lao.color = cc.color(67, 0, 0)
                                        lao.width = 2
                                        hqq.setSprite(this.title_resetpwd, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "chongzhimuma", x: -300, y: 260 })

                                        cc.find("Canvas/bigsublayer/resetpass/phoneeditbox/TEXT_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/resetpass/phoneeditbox/TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
                                        cc.find("Canvas/bigsublayer/resetpass/phoneeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/resetpass/phoneeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;

                                        cc.find("Canvas/bigsublayer/resetpass/yanzheneditbox/TEXT_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/resetpass/yanzheneditbox/TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
                                        cc.find("Canvas/bigsublayer/resetpass/yanzheneditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/resetpass/yanzheneditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;

                                        cc.find("Canvas/bigsublayer/resetpass/capchaeditbox/TEXT_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/resetpass/capchaeditbox/TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
                                        cc.find("Canvas/bigsublayer/resetpass/capchaeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/resetpass/capchaeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;

                                        cc.find("Canvas/bigsublayer/resetpass/passeditbox/TEXT_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/resetpass/passeditbox/TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
                                        cc.find("Canvas/bigsublayer/resetpass/passeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/resetpass/passeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;

                                } else if (hqq.app.pinpai == "xingui") {
                                        let hlpath = "language/" + hqq.language + "/xingui/"
                                        hqq.setSprite(this.title_resetpwd, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "cz", y: 240 })
                                        this.btnlabel.getComponent(cc.Label).color = cc.color(255, 255, 255)
                                        let lao = this.btnlabel.getComponent(cc.LabelOutline)
                                        lao.color = cc.color(255, 255, 255)
                                        this.btnlabel2.getComponent(cc.Label).color = cc.color(255, 255, 255)
                                        let lao2 = this.btnlabel2.getComponent(cc.LabelOutline)
                                        lao2.color = cc.color(255, 255, 255)
                                        this.exitbtn.setPositionEx(415, 235);
                                } else if (hqq.app.pinpai == "xinsheng") {
                                        this.exitbtn.setPositionEx(430, 260);
                                        let xlpath = "base/language/" + hqq.language + "/xinsheng/"
                                        hqq.setSprite(this.title_resetpwd, { path: xlpath + "czmm", position: { x: -245, y: 250 } })
                                } else if (hqq.app.pinpai == "xinlong") {
                                        let bpath = "base/xinlong/img/"
                                        let hpath = "xinlong/img/"
                                        let hlpath = "language/" + hqq.language + "/xinlong/"
                                        let info_form = cc.find("Canvas/bigsublayer/resetpass/info_form")
                                        info_form.active = false
                                        let resetpass = cc.find("Canvas/bigsublayer/resetpass")
                                        hqq.addNode(resetpass, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "jd_p_inputBox_1", zIndex: -2, width: 630, x: 30, y: 145, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(resetpass, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "jd_p_inputBox_1", zIndex: -2, width: 420, x: -75, y: 48, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(resetpass, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "jd_p_inputBox_1", zIndex: -2, width: 420, x: -75, y: -48, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(resetpass, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "jd_p_inputBox_1", zIndex: -2, width: 630, x: 30, y: -150, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(resetpass, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "shoujid", zIndex: -1, x: -250, y: 145 })
                                        hqq.addNode(resetpass, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "fang", zIndex: -1, x: -250, y: 48 })
                                        hqq.addNode(resetpass, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "duanxin", zIndex: -1, x: -250, y: -48 })
                                        hqq.addNode(resetpass, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "suotou", zIndex: -1, x: -250, y: -150 })
                                        this.btnlabel.getComponent(cc.Label).color = cc.color(255, 255, 255)
                                        let lao = this.btnlabel.getComponent(cc.LabelOutline)
                                        lao.color = cc.color(67, 0, 0)
                                        lao.width = 2
                                        hqq.setSprite(this.title_resetpwd, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "chongzhimuma", x: -300, y: 260 })

                                        cc.find("Canvas/bigsublayer/resetpass/phoneeditbox/TEXT_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/resetpass/phoneeditbox/TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
                                        cc.find("Canvas/bigsublayer/resetpass/phoneeditbox/TEXT_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT;
                                        cc.find("Canvas/bigsublayer/resetpass/phoneeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/resetpass/phoneeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
                                        cc.find("Canvas/bigsublayer/resetpass/phoneeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT;

                                        cc.find("Canvas/bigsublayer/resetpass/yanzheneditbox/TEXT_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/resetpass/yanzheneditbox/TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
                                        cc.find("Canvas/bigsublayer/resetpass/yanzheneditbox/TEXT_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT;
                                        cc.find("Canvas/bigsublayer/resetpass/yanzheneditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/resetpass/yanzheneditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
                                        cc.find("Canvas/bigsublayer/resetpass/yanzheneditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT;

                                        cc.find("Canvas/bigsublayer/resetpass/capchaeditbox/TEXT_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/resetpass/capchaeditbox/TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
                                        cc.find("Canvas/bigsublayer/resetpass/capchaeditbox/TEXT_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT;
                                        cc.find("Canvas/bigsublayer/resetpass/capchaeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/resetpass/capchaeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
                                        cc.find("Canvas/bigsublayer/resetpass/capchaeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT;

                                        cc.find("Canvas/bigsublayer/resetpass/passeditbox/TEXT_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/resetpass/passeditbox/TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
                                        cc.find("Canvas/bigsublayer/resetpass/passeditbox/TEXT_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT;
                                        cc.find("Canvas/bigsublayer/resetpass/passeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/resetpass/passeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
                                        cc.find("Canvas/bigsublayer/resetpass/passeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT;
                                } else if (hqq.app.pinpai == "huaxing") {
                                        let bpath = "base/huaxing/img/"
                                        let hpath = "huaxing/img/"
                                        let hlpath = "language/" + hqq.language + "/huaxing/"
                                        let info_form = cc.find("Canvas/bigsublayer/resetpass/info_form")
                                        info_form.active = false
                                        let resetpass = cc.find("Canvas/bigsublayer/resetpass")
                                        hqq.addNode(resetpass, { path: bpath + "4", zIndex: -2, width: 630, x: 30, y: 145, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(resetpass, { path: bpath + "4", zIndex: -2, width: 420, x: -75, y: 48, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(resetpass, { path: bpath + "4", zIndex: -2, width: 420, x: -75, y: -48, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(resetpass, { path: bpath + "4", zIndex: -2, width: 630, x: 30, y: -150, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(resetpass, { path: bpath + "19", zIndex: -1, x: -250, y: 145 })
                                        hqq.addNode(resetpass, { path: bpath + "21", zIndex: -1, x: -250, y: 48 })
                                        hqq.addNode(resetpass, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "20", zIndex: -1, x: -250, y: -48 })
                                        hqq.addNode(resetpass, { path: bpath + "18", zIndex: -1, x: -250, y: -150 })
                                        hqq.setSprite(this.title_resetpwd, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "5", x: 0, y: 285 })

                                        // // cc.find("Canvas/bigsublayer/resetpass/phoneeditbox/TEXT_LABEL").color = cc.color(84,98,119,255);
                                        cc.find("Canvas/bigsublayer/resetpass/phoneeditbox/TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
                                        // // cc.find("Canvas/bigsublayer/resetpass/phoneeditbox/PLACEHOLDER_LABEL").color = cc.color(84,98,119,255);
                                        cc.find("Canvas/bigsublayer/resetpass/phoneeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;

                                        // // cc.find("Canvas/bigsublayer/resetpass/yanzheneditbox/TEXT_LABEL").color = cc.color(84,98,119,255);
                                        cc.find("Canvas/bigsublayer/resetpass/yanzheneditbox/TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
                                        // // cc.find("Canvas/bigsublayer/resetpass/yanzheneditbox/PLACEHOLDER_LABEL").color = cc.color(84,98,119,255);
                                        cc.find("Canvas/bigsublayer/resetpass/yanzheneditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;

                                        // // cc.find("Canvas/bigsublayer/resetpass/capchaeditbox/TEXT_LABEL").color = cc.color(84,98,119,255);
                                        cc.find("Canvas/bigsublayer/resetpass/capchaeditbox/TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
                                        // // cc.find("Canvas/bigsublayer/resetpass/capchaeditbox/PLACEHOLDER_LABEL").color = cc.color(84,98,119,255);
                                        cc.find("Canvas/bigsublayer/resetpass/capchaeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;

                                        // // cc.find("Canvas/bigsublayer/resetpass/passeditbox/TEXT_LABEL").color = cc.color(84,98,119,255);
                                        cc.find("Canvas/bigsublayer/resetpass/passeditbox/TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
                                        // // cc.find("Canvas/bigsublayer/resetpass/passeditbox/PLACEHOLDER_LABEL").color = cc.color(84,98,119,255);
                                        cc.find("Canvas/bigsublayer/resetpass/passeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;

                                } else if (hqq.app.pinpai == "ninetwo") {
                                        let bpath = "base/ninetwo/img/"
                                        let hpath = "ninetwo/img/"
                                        let hlpath2 = "language/" + hqq.language + "/ninetwo/"
                                        let resetpass = cc.find("Canvas/bigsublayer/resetpass")
                                        hqq.addNode(resetpass, { path: bpath + "kuangti1", zIndex: -2, width: 750, height: 350, x: 0, y: 0, type: cc.Sprite.Type.SLICED })
                                        let input1 = hqq.addNode(resetpass, { path: bpath + "yjks", zIndex: -2, width: 513 * (750 / 576), height: 36 * (450 / 273), x: 0, y: 135, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(input1, { path: bpath + "shouji", x: -310 })
                                        let input2 = hqq.addNode(resetpass, { path: bpath + "yjks", zIndex: -2, width: 290 * (750 / 576), height: 36 * (450 / 273), x: -145, y: 45, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(input2, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "34w", x: -167 })
                                        let input3 = hqq.addNode(resetpass, { path: bpath + "yjks", zIndex: -2, width: 390 * (750 / 576), height: 36 * (450 / 273), x: -82, y: -45, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(input3, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "twtrew", x: -226 })
                                        let input4 = hqq.addNode(resetpass, { path: bpath + "yjks", zIndex: -2, width: 513 * (750 / 576), height: 36 * (450 / 273), x: 0, y: -135, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(input4, { path: bpath + "gfdsg", x: -310 })

                                        let phoneeditbox = cc.find("Canvas/bigsublayer/resetpass/phoneeditbox");
                                        hqq.setNode(phoneeditbox, { width: 480 * (750 / 576), height: 36 * (450 / 273), x: 20, y: 135 });
                                        hqq.setNode(phoneeditbox.getChildByName("BACKGROUND_SPRITE"), { width: 480 * (750 / 576), height: 36 * (450 / 273) });
                                        hqq.setNode(phoneeditbox.getChildByName("TEXT_LABEL"), { width: 480 * (750 / 576), height: 36 * (450 / 273) });
                                        hqq.setNode(phoneeditbox.getChildByName("PLACEHOLDER_LABEL"), { width: 480 * (750 / 576), height: 36 * (450 / 273), color: cc.color(129, 129, 126, 255) });

                                        let yanzheneditbox = cc.find("Canvas/bigsublayer/resetpass/yanzheneditbox");
                                        hqq.setNode(yanzheneditbox, { width: 355 * (750 / 576), height: 36 * (450 / 273), x: -61, y: 45 });
                                        hqq.setNode(yanzheneditbox.getChildByName("BACKGROUND_SPRITE"), { width: 355 * (750 / 576), height: 36 * (450 / 273) });
                                        hqq.setNode(yanzheneditbox.getChildByName("TEXT_LABEL"), { width: 355 * (750 / 576), height: 36 * (450 / 273) });
                                        hqq.setNode(yanzheneditbox.getChildByName("PLACEHOLDER_LABEL"), { width: 355 * (750 / 576), height: 36 * (450 / 273), color: cc.color(129, 129, 126, 255) });

                                        let capchaeditbox = cc.find("Canvas/bigsublayer/resetpass/capchaeditbox");
                                        hqq.setNode(capchaeditbox, { width: 355 * (750 / 576), height: 36 * (450 / 273), x: -61, y: -45 });
                                        hqq.setNode(capchaeditbox.getChildByName("BACKGROUND_SPRITE"), { width: 355 * (750 / 576), height: 36 * (450 / 273) });
                                        hqq.setNode(capchaeditbox.getChildByName("TEXT_LABEL"), { width: 355 * (750 / 576), height: 36 * (450 / 273) });
                                        hqq.setNode(capchaeditbox.getChildByName("PLACEHOLDER_LABEL"), { width: 355 * (750 / 576), height: 36 * (450 / 273), color: cc.color(129, 129, 126, 255) });

                                        let passeditbox = cc.find("Canvas/bigsublayer/resetpass/passeditbox");
                                        hqq.setNode(passeditbox, { width: 480 * (750 / 576), height: 36 * (450 / 273), x: 20, y: -135 });
                                        hqq.setNode(passeditbox.getChildByName("BACKGROUND_SPRITE"), { width: 480 * (750 / 576), height: 36 * (450 / 273) });
                                        hqq.setNode(passeditbox.getChildByName("TEXT_LABEL"), { width: 480 * (750 / 576), height: 36 * (450 / 273) });
                                        hqq.setNode(passeditbox.getChildByName("PLACEHOLDER_LABEL"), { width: 480 * (750 / 576), height: 36 * (450 / 273), color: cc.color(129, 129, 126, 255) });

                                        let surecg = cc.find("Canvas/bigsublayer/surecg")
                                        hqq.setBtn(surecg, { Res: hqq["hall_" + hqq.app.pinpai], normal: hlpath2 + "setting_btn_confirm/", aniname: "animation", loop: true, timeScale: 0.95, x: 0, y: -230 })

                                        let imageback = cc.find("Canvas/bigsublayer/resetpass/imgback");
                                        hqq.setNode(imageback, { width: 240, height: 80 })
                                        hqq.setNode(imageback.getChildByName("captchaimg"), { width: 240, height: 80 })
                                        imageback.setPositionEx(200, 50);
                                        // // hqq.setNode(imageback,{width:106,height:42,x:200,y:33})
                                        // // hqq.setNode(imageback.getChildByName("captchaimg"),{width:106,height:42,x:0,y:0})
                                        this.btnlabel.parent.setPositionEx(250, -43);
                                        this.btnlabel.getComponent(cc.Label).fontSize = 18;
                                        let info_form = cc.find("Canvas/bigsublayer/resetpass/info_form")
                                        info_form.active = false
                                } else {
                                        this.exitbtn.setPositionEx(this.exitbtn.getPosition().x, 290);
                                }
                                break;
                        case 2: // 绑定银行卡
                                this.resetpass.active = false
                                this.bindyinhangka.active = true
                                this.officelogin.active = false
                                this.ensurebtn.node.setPositionEx(this.ensurebtn.node.getPosition().x, -300);
                                // // this.back.height = 665
                                this.ensurefunc = this.bindyinhangkaEnsure
                                if (hqq.app.pinpai == "fuxin") {
                                        let bpath = "base/fuxin/img/"
                                        let hpath = "fuxin/img/"
                                        let hlpath = "language/" + hqq.language + "/fuxin/"
                                        let bindyinhangka = cc.find("Canvas/bigsublayer/bindyinhangka")
                                        hqq.setNode(bindyinhangka, { y: -10 })
                                        hqq.addNode(bindyinhangka, { path: bpath + "srk", zIndex: -2, x: 150, y: 188, width: 500, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(bindyinhangka, { path: bpath + "srk", zIndex: -2, x: 150, y: 120, width: 500, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(bindyinhangka, { path: bpath + "srk", zIndex: -2, x: 150, y: 52, width: 500, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(bindyinhangka, { path: bpath + "srk", zIndex: -2, x: 150, y: -12, width: 500, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(bindyinhangka, { path: bpath + "srk", zIndex: -2, x: 150, y: -82, width: 500, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(bindyinhangka, { path: bpath + "srk", zIndex: -2, x: 150, y: -150, width: 500, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(bindyinhangka, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "yhkkh", zIndex: -1, x: -225, y: 188, })
                                        hqq.addNode(bindyinhangka, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "skrxm", zIndex: -1, x: -225, y: 120, })
                                        hqq.addNode(bindyinhangka, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "kfs", zIndex: -1, x: -250, y: 52, })
                                        hqq.addNode(bindyinhangka, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "kfshi", zIndex: -1, x: -250, y: -12, })
                                        hqq.addNode(bindyinhangka, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "khyh", zIndex: -1, x: -240, y: -82, })
                                        hqq.addNode(bindyinhangka, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "khhzh", zIndex: -1, x: -225, y: -150, })
                                        hqq.setSprite(this.title_bdbankcard, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "bdyhkbiaoti" })
                                        hqq.setBtn(this.kaihushengbtn, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "anniu6" })
                                        hqq.setBtn(this.kaihushibtn, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "anniu6" })
                                        hqq.setBtn(this.yinhangnamebtn, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "anniu6" })
                                        hqq.addNode(bindyinhangka, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "ts", zIndex: -1, y: -190, })
                                } else if (hqq.app.pinpai == "juding") {
                                        let bpath = "base/juding/img/"
                                        let hpath = "juding/img/"
                                        let hlpath = "language/" + hqq.language + "/juding/"
                                        this.back.getComponent(cc.UITransform).height = 609
                                        let bindyinhangka = cc.find("Canvas/bigsublayer/bindyinhangka")
                                        hqq.setNode(bindyinhangka, { y: -10 })
                                        hqq.addNode(bindyinhangka, { path: bpath + "jd_p_inputBox_1", zIndex: -2, x: 100, y: 188, width: 500, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(bindyinhangka, { path: bpath + "jd_p_inputBox_1", zIndex: -2, x: 100, y: 120, width: 500, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(bindyinhangka, { path: bpath + "jd_p_inputBox_1", zIndex: -2, x: 100, y: 52, width: 500, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(bindyinhangka, { path: bpath + "jd_p_inputBox_1", zIndex: -2, x: 100, y: -12, width: 500, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(bindyinhangka, { path: bpath + "jd_p_inputBox_1", zIndex: -2, x: 100, y: -82, width: 500, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(bindyinhangka, { path: bpath + "jd_p_inputBox_1", zIndex: -2, x: 100, y: -150, width: 500, type: cc.Sprite.Type.SLICED })
                                        let kaihusheng = cc.find("Canvas/bigsublayer/bindyinhangka/kaihusheng");
                                        kaihusheng.setPositionEx(105, kaihusheng.getPosition().y);
                                        let kaihushi = cc.find("Canvas/bigsublayer/bindyinhangka/kaihushi");
                                        kaihushi.setPositionEx(105, kaihushi.getPosition().y);
                                        let yinhangname = cc.find("Canvas/bigsublayer/bindyinhangka/yinhangname");
                                        yinhangname.setPositionEx(105, yinhangname.getPosition().y);
                                        hqq.addNode(bindyinhangka, { string: "yhkkh", zIndex: -1, x: -275, y: 188, fontSize: 32, color: cc.color(72, 94, 154, 255), bold: true })
                                        hqq.addNode(bindyinhangka, { string: "skrxm", zIndex: -1, x: -275, y: 120, fontSize: 32, color: cc.color(72, 94, 154, 255), bold: true })
                                        hqq.addNode(bindyinhangka, { string: "kfs", zIndex: -1, x: -300, y: 52, fontSize: 32, color: cc.color(72, 94, 154, 255), bold: true })
                                        hqq.addNode(bindyinhangka, { string: "kfshi", zIndex: -1, x: -300, y: -12, fontSize: 32, color: cc.color(72, 94, 154, 255), bold: true })
                                        hqq.addNode(bindyinhangka, { string: "khyh", zIndex: -1, x: -290, y: -82, fontSize: 32, color: cc.color(72, 94, 154, 255), bold: true })
                                        hqq.addNode(bindyinhangka, { string: "khhzh", zIndex: -1, x: -275, y: -150, fontSize: 32, color: cc.color(72, 94, 154, 255), bold: true })
                                        hqq.setSprite(this.title_bdbankcard, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "bangding3", x: -320, y: 265 })
                                        hqq.setBtn(this.kaihushengbtn, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "anniu6" })
                                        hqq.setBtn(this.kaihushibtn, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "anniu6" })
                                        hqq.setBtn(this.yinhangnamebtn, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "anniu6" })
                                        hqq.addNode(bindyinhangka, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "ts", zIndex: -1, y: -210, })
                                        this.ensurebtn.node.setPositionEx(this.ensurebtn.node.getPosition().x, -272);

                                        cc.find("Canvas/bigsublayer/bindyinhangka/kahaoeditbox").x = 105;
                                        cc.find("Canvas/bigsublayer/bindyinhangka/kahaoeditbox/TEXT_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/bindyinhangka/kahaoeditbox/TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
                                        cc.find("Canvas/bigsublayer/bindyinhangka/kahaoeditbox/TEXT_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT
                                        cc.find("Canvas/bigsublayer/bindyinhangka/kahaoeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(133, 147, 186, 255);
                                        cc.find("Canvas/bigsublayer/bindyinhangka/kahaoeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
                                        cc.find("Canvas/bigsublayer/bindyinhangka/kahaoeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT

                                        cc.find("Canvas/bigsublayer/bindyinhangka/nameediftox").x = 105;
                                        cc.find("Canvas/bigsublayer/bindyinhangka/nameediftox/TEXT_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/bindyinhangka/nameediftox/TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
                                        cc.find("Canvas/bigsublayer/bindyinhangka/nameediftox/TEXT_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT
                                        cc.find("Canvas/bigsublayer/bindyinhangka/nameediftox/PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(133, 147, 186, 255);
                                        cc.find("Canvas/bigsublayer/bindyinhangka/nameediftox/PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
                                        cc.find("Canvas/bigsublayer/bindyinhangka/nameediftox/PLACEHOLDER_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT

                                        cc.find("Canvas/bigsublayer/bindyinhangka/zhihang").x = 105;
                                        cc.find("Canvas/bigsublayer/bindyinhangka/zhihang/TEXT_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/bindyinhangka/zhihang/TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
                                        cc.find("Canvas/bigsublayer/bindyinhangka/zhihang/TEXT_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT
                                        cc.find("Canvas/bigsublayer/bindyinhangka/zhihang/PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(133, 147, 186, 255);
                                        cc.find("Canvas/bigsublayer/bindyinhangka/zhihang/PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
                                        cc.find("Canvas/bigsublayer/bindyinhangka/zhihang/PLACEHOLDER_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT

                                        cc.find("Canvas/bigsublayer/bindyinhangka/kaihusheng/kaihushenglabel").getComponent(cc.Label).color = cc.color(133, 147, 186, 255);
                                        cc.find("Canvas/bigsublayer/bindyinhangka/kaihushi/kaihushilabel").getComponent(cc.Label).color = cc.color(133, 147, 186, 255);
                                        cc.find("Canvas/bigsublayer/bindyinhangka/yinhangname/yinhanglabel").getComponent(cc.Label).color = cc.color(133, 147, 186, 255);
                                } else if (hqq.app.pinpai == "xingui") {
                                        this.exitbtn.x = 415
                                        this.exitbtn.y = 255
                                        let hpath = "xingui/img/"
                                        let hlpath = "language/" + hqq.language + "/xingui/"
                                        hqq.setSprite(this.title_bdbankcard, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "bdyhk" })
                                        hqq.setBtn(this.kaihushengbtn, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "btn_0" })
                                        hqq.addNode(this.kaihushengbtn, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "jiant" })
                                        hqq.setBtn(this.kaihushibtn, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "btn_0" })
                                        hqq.addNode(this.kaihushibtn, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "jiant" })
                                        hqq.setBtn(this.yinhangnamebtn, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "btn_0" })
                                        hqq.addNode(this.yinhangnamebtn, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "jiant" })
                                        hqq.addNode(this.back, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "srk_2", x: 150, y: 198, width: 500 })
                                        hqq.addNode(this.back, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "srk_2", x: 150, y: 130, width: 500 })
                                        hqq.addNode(this.back, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "srk_2", x: 150, y: 62, width: 500 })
                                        hqq.addNode(this.back, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "srk_2", x: 150, y: -2, width: 500 })
                                        hqq.addNode(this.back, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "srk_2", x: 150, y: -72, width: 500 })
                                        hqq.addNode(this.back, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "srk_2", x: 150, y: -140, width: 500 })
                                        hqq.addNode(this.back, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "yhkkh", x: -200, y: 198 })
                                        hqq.addNode(this.back, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "skrxm", x: -200, y: 130 })
                                        hqq.addNode(this.back, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "khs", x: -200, y: 62 })
                                        hqq.addNode(this.back, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "khsh", x: -200, y: -2 })
                                        hqq.addNode(this.back, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "khyh", x: -200, y: -72 })
                                        hqq.addNode(this.back, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "khhzh", x: -200, y: -140 })
                                        this.ensurebtn.node.y = -255
                                        hqq.addNode(this.back, { string: "wxts", fontSize: 23, x: 50, y: -200, color: cc.color(255, 0, 0) })
                                } else if (hqq.app.pinpai == "xinsheng") {
                                        this.back.getComponent(cc.UITransform).height = 665
                                        this.exitbtn.x = 450
                                        this.exitbtn.y = 280
                                        let xpath = "base/xinsheng/img/"
                                        let xlpath = "base/language/" + hqq.language + "/xinsheng/"
                                        hqq.setBtn(this.kaihushengbtn, { path: xpath + "xiabtn" })
                                        hqq.setBtn(this.kaihushibtn, { path: xpath + "xiabtn" })
                                        hqq.setBtn(this.yinhangnamebtn, { path: xpath + "xiabtn" })
                                        hqq.setSprite(this.title_bdbankcard, { path: xlpath + "bdyhk", position: { x: -230, y: 269 } })
                                } else if (hqq.app.pinpai == "xinlong") {
                                        let bpath = "base/xinlong/img/"
                                        let hpath = "xinlong/img/"
                                        let hlpath = "language/" + hqq.language + "/xinlong/"
                                        let bindyinhangka = cc.find("Canvas/bigsublayer/bindyinhangka")
                                        hqq.setNode(bindyinhangka, { y: -10 })
                                        hqq.addNode(bindyinhangka, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "jd_p_inputBox_1", zIndex: -2, x: 100, y: 188, width: 500, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(bindyinhangka, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "jd_p_inputBox_1", zIndex: -2, x: 100, y: 120, width: 500, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(bindyinhangka, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "jd_p_inputBox_1", zIndex: -2, x: 100, y: 52, width: 500, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(bindyinhangka, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "jd_p_inputBox_1", zIndex: -2, x: 100, y: -12, width: 500, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(bindyinhangka, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "jd_p_inputBox_1", zIndex: -2, x: 100, y: -82, width: 500, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(bindyinhangka, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "jd_p_inputBox_1", zIndex: -2, x: 100, y: -150, width: 500, type: cc.Sprite.Type.SLICED })
                                        cc.find("Canvas/bigsublayer/bindyinhangka/kaihusheng").x = 105;
                                        cc.find("Canvas/bigsublayer/bindyinhangka/kaihushi").x = 105;
                                        cc.find("Canvas/bigsublayer/bindyinhangka/yinhangname").x = 105;
                                        hqq.addNode(bindyinhangka, { string: "yhkkh", zIndex: -1, x: -275, y: 188, fontSize: 32, color: cc.color(72, 94, 154, 255), bold: true })
                                        hqq.addNode(bindyinhangka, { string: "skrxm", zIndex: -1, x: -275, y: 120, fontSize: 32, color: cc.color(72, 94, 154, 255), bold: true })
                                        hqq.addNode(bindyinhangka, { string: "kfs", zIndex: -1, x: -300, y: 52, fontSize: 32, color: cc.color(72, 94, 154, 255), bold: true })
                                        hqq.addNode(bindyinhangka, { string: "kfshi", zIndex: -1, x: -300, y: -12, fontSize: 32, color: cc.color(72, 94, 154, 255), bold: true })
                                        hqq.addNode(bindyinhangka, { string: "khyh", zIndex: -1, x: -290, y: -82, fontSize: 32, color: cc.color(72, 94, 154, 255), bold: true })
                                        hqq.addNode(bindyinhangka, { string: "khhzh", zIndex: -1, x: -275, y: -150, fontSize: 32, color: cc.color(72, 94, 154, 255), bold: true })
                                        hqq.setSprite(this.title_bdbankcard, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "bangding3", x: -320, y: 265 })
                                        hqq.setBtn(this.kaihushengbtn, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "anniu6", x: 209, y: 5 })
                                        hqq.setBtn(this.kaihushibtn, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "anniu6", x: 209, y: 5 })
                                        hqq.setBtn(this.yinhangnamebtn, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "anniu6", x: 209, y: 5 })
                                        hqq.addNode(bindyinhangka, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "ts", zIndex: -1, y: -210, })
                                        this.ensurebtn.node.y = -280;

                                        cc.find("Canvas/bigsublayer/bindyinhangka/kahaoeditbox").x = 105;
                                        cc.find("Canvas/bigsublayer/bindyinhangka/kahaoeditbox/TEXT_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/bindyinhangka/kahaoeditbox/TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
                                        cc.find("Canvas/bigsublayer/bindyinhangka/kahaoeditbox/TEXT_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT
                                        cc.find("Canvas/bigsublayer/bindyinhangka/kahaoeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(133, 147, 186, 255);
                                        cc.find("Canvas/bigsublayer/bindyinhangka/kahaoeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
                                        cc.find("Canvas/bigsublayer/bindyinhangka/kahaoeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT

                                        cc.find("Canvas/bigsublayer/bindyinhangka/nameediftox").x = 105;
                                        cc.find("Canvas/bigsublayer/bindyinhangka/nameediftox/TEXT_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/bindyinhangka/nameediftox/TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
                                        cc.find("Canvas/bigsublayer/bindyinhangka/nameediftox/TEXT_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT
                                        cc.find("Canvas/bigsublayer/bindyinhangka/nameediftox/PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(133, 147, 186, 255);
                                        cc.find("Canvas/bigsublayer/bindyinhangka/nameediftox/PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
                                        cc.find("Canvas/bigsublayer/bindyinhangka/nameediftox/PLACEHOLDER_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT

                                        cc.find("Canvas/bigsublayer/bindyinhangka/zhihang").x = 105;
                                        cc.find("Canvas/bigsublayer/bindyinhangka/zhihang/TEXT_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/bindyinhangka/zhihang/TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
                                        cc.find("Canvas/bigsublayer/bindyinhangka/zhihang/TEXT_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT
                                        cc.find("Canvas/bigsublayer/bindyinhangka/zhihang/PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(133, 147, 186, 255);
                                        cc.find("Canvas/bigsublayer/bindyinhangka/zhihang/PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
                                        cc.find("Canvas/bigsublayer/bindyinhangka/zhihang/PLACEHOLDER_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT

                                        cc.find("Canvas/bigsublayer/bindyinhangka/kaihusheng/kaihushenglabel").getComponent(cc.Label).color = cc.color(133, 147, 186, 255);
                                        cc.find("Canvas/bigsublayer/bindyinhangka/kaihushi/kaihushilabel").getComponent(cc.Label).color = cc.color(133, 147, 186, 255);
                                        cc.find("Canvas/bigsublayer/bindyinhangka/yinhangname/yinhanglabel").getComponent(cc.Label).color = cc.color(133, 147, 186, 255);
                                } else if (hqq.app.pinpai == "huaxing") {
                                        let bpath = "base/huaxing/img/"
                                        let hpath = "huaxing/img/"
                                        let hlpath = "language/" + hqq.language + "/huaxing/"
                                        let bindyinhangka = cc.find("Canvas/bigsublayer/bindyinhangka")
                                        hqq.setNode(bindyinhangka, { y: -10 })
                                        hqq.addNode(bindyinhangka, { path: bpath + "4", zIndex: -2, x: 100, y: 198, width: 523, height: 64, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(bindyinhangka, { path: bpath + "4", zIndex: -2, x: 100, y: 130, width: 523, height: 64, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(bindyinhangka, { path: bpath + "4", zIndex: -2, x: 100, y: 60, width: 523, height: 64, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(bindyinhangka, { path: bpath + "4", zIndex: -2, x: 100, y: -12, width: 523, height: 64, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(bindyinhangka, { path: bpath + "4", zIndex: -2, x: 100, y: -82, width: 523, height: 64, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(bindyinhangka, { path: bpath + "4", zIndex: -2, x: 100, y: -150, width: 523, height: 64, type: cc.Sprite.Type.SLICED })
                                        cc.find("Canvas/bigsublayer/bindyinhangka/kaihushengscrorll").x = 110;
                                        let kaihusheng = cc.find("Canvas/bigsublayer/bindyinhangka/kaihusheng");
                                        kaihusheng.x = 120;
                                        kaihusheng.y = 60;
                                        kaihusheng.getComponent(cc.UITransform).width = 523;
                                        cc.find("Canvas/bigsublayer/bindyinhangka/kaihushiscrorll").x = 110;
                                        let kaihushi = cc.find("Canvas/bigsublayer/bindyinhangka/kaihushi");
                                        kaihushi.x = 120;
                                        kaihushi.y = -12;
                                        kaihushi.getComponent(cc.UITransform).width = 523;
                                        cc.find("Canvas/bigsublayer/bindyinhangka/yinghangnamescrorll").x = 110;
                                        let yinhangname = cc.find("Canvas/bigsublayer/bindyinhangka/yinhangname");
                                        yinhangname.x = 120;
                                        yinhangname.getComponent(cc.UITransform).width = 523;
                                        hqq.addNode(bindyinhangka, { string: "yhkkh", zIndex: -1, x: -275, y: 198, fontSize: 32, color: cc.color(232, 169, 98), bold: true })
                                        hqq.addNode(bindyinhangka, { string: "skrxm", zIndex: -1, x: -275, y: 130, fontSize: 32, color: cc.color(232, 169, 98), bold: true })
                                        hqq.addNode(bindyinhangka, { string: "kfs", zIndex: -1, x: -300, y: 60, fontSize: 32, color: cc.color(232, 169, 98), bold: true })
                                        hqq.addNode(bindyinhangka, { string: "kfshi", zIndex: -1, x: -300, y: -12, fontSize: 32, color: cc.color(232, 169, 98), bold: true })
                                        hqq.addNode(bindyinhangka, { string: "khyh", zIndex: -1, x: -290, y: -82, fontSize: 32, color: cc.color(232, 169, 98), bold: true })
                                        hqq.addNode(bindyinhangka, { string: "khhzh", zIndex: -1, x: -275, y: -150, fontSize: 32, color: cc.color(232, 169, 98), bold: true })
                                        hqq.setSprite(this.title_bdbankcard, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "14", x: 0, y: 295 })
                                        hqq.setBtn(this.kaihushengbtn, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "8" })
                                        hqq.setBtn(this.kaihushibtn, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "8" })
                                        hqq.setBtn(this.yinhangnamebtn, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "8" })
                                        hqq.addNode(bindyinhangka, { string: "wxts2", zIndex: -1, fontSize: 23, lineHeight: 30, y: -210, color: cc.color(239, 216, 143) })
                                        this.ensurebtn.node.y = -280;

                                        cc.find("Canvas/bigsublayer/bindyinhangka/kahaoeditbox").x = 105;
                                        // // cc.find("Canvas/bigsublayer/bindyinhangka/kahaoeditbox/TEXT_LABEL").color = cc.color(84,98,119,255);
                                        cc.find("Canvas/bigsublayer/bindyinhangka/kahaoeditbox/TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
                                        cc.find("Canvas/bigsublayer/bindyinhangka/kahaoeditbox/TEXT_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT
                                        // // cc.find("Canvas/bigsublayer/bindyinhangka/kahaoeditbox/PLACEHOLDER_LABEL").color = cc.color(133,147,186,255);
                                        cc.find("Canvas/bigsublayer/bindyinhangka/kahaoeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
                                        cc.find("Canvas/bigsublayer/bindyinhangka/kahaoeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT

                                        cc.find("Canvas/bigsublayer/bindyinhangka/nameediftox").x = 105;
                                        // // cc.find("Canvas/bigsublayer/bindyinhangka/nameediftox/TEXT_LABEL").color = cc.color(84,98,119,255);
                                        cc.find("Canvas/bigsublayer/bindyinhangka/nameediftox/TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
                                        cc.find("Canvas/bigsublayer/bindyinhangka/nameediftox/TEXT_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT
                                        // // cc.find("Canvas/bigsublayer/bindyinhangka/nameediftox/PLACEHOLDER_LABEL").color = cc.color(133,147,186,255);
                                        cc.find("Canvas/bigsublayer/bindyinhangka/nameediftox/PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
                                        cc.find("Canvas/bigsublayer/bindyinhangka/nameediftox/PLACEHOLDER_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT

                                        cc.find("Canvas/bigsublayer/bindyinhangka/zhihang").x = 105;
                                        // // cc.find("Canvas/bigsublayer/bindyinhangka/zhihang/TEXT_LABEL").color = cc.color(84,98,119,255);
                                        cc.find("Canvas/bigsublayer/bindyinhangka/zhihang/TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
                                        cc.find("Canvas/bigsublayer/bindyinhangka/zhihang/TEXT_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT
                                        // // cc.find("Canvas/bigsublayer/bindyinhangka/zhihang/PLACEHOLDER_LABEL").color = cc.color(133,147,186,255);
                                        cc.find("Canvas/bigsublayer/bindyinhangka/zhihang/PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
                                        cc.find("Canvas/bigsublayer/bindyinhangka/zhihang/PLACEHOLDER_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT

                                        // // cc.find("Canvas/bigsublayer/bindyinhangka/kaihusheng/kaihushenglabel").color = cc.color(133,147,186,255);
                                        // // cc.find("Canvas/bigsublayer/bindyinhangka/kaihushi/kaihushilabel").color = cc.color(133,147,186,255);
                                        // // cc.find("Canvas/bigsublayer/bindyinhangka/yinhangname/yinhanglabel").color = cc.color(133,147,186,255);
                                } else {
                                        this.back.getComponent(cc.UITransform).height = 665
                                        this.exitbtn.y = 315
                                }
                                break;
                        case 3: // 注册正式账号
                                this.resetpass.active = false
                                this.bindyinhangka.active = false
                                this.officelogin.active = true
                                this.panelInit(2)
                                this.ensurefunc = this.officeloginEnsure
                                if (hqq.app.pinpai == "fuxin") {
                                        let bpath = "base/fuxin/img/"
                                        let hpath = "fuxin/img/"
                                        let officelogin = cc.find("Canvas/bigsublayer/officelogin")
                                        hqq.addNode(officelogin, { path: bpath + "srk", zIndex: -2, width: 630, x: 30, y: 145, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(officelogin, { path: bpath + "srk", zIndex: -2, width: 420, x: -75, y: 45, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(officelogin, { path: bpath + "srk", zIndex: -2, width: 420, x: -75, y: -55, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(officelogin, { path: bpath + "srk", zIndex: -2, width: 630, x: 30, y: -150, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(officelogin, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "phone", zIndex: -1, x: -250, y: 145 })
                                        hqq.addNode(officelogin, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "aq", zIndex: -1, x: -250, y: 45 })
                                        hqq.addNode(officelogin, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "yj", zIndex: -1, x: -250, y: -55 })
                                        hqq.addNode(officelogin, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "lock", zIndex: -1, x: -250, y: -150 })
                                        let info_form = cc.find("Canvas/bigsublayer/officelogin/info_form")
                                        info_form.active = false
                                        this.btnlabel2.getComponent(cc.Label).color = cc.color(255, 255, 255)
                                        let lao2 = this.btnlabel2.getComponent(cc.LabelOutline)
                                        lao2.color = cc.color(67, 0, 0)
                                        lao2.width = 2
                                } else if (hqq.app.pinpai == "juding") {
                                        let bpath = "base/juding/img/"
                                        let hpath = "juding/img/"
                                        let officelogin = cc.find("Canvas/bigsublayer/officelogin")
                                        hqq.addNode(officelogin, { path: bpath + "jd_p_inputBox_1", zIndex: -2, width: 630, x: 30, y: 170, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(officelogin, { path: bpath + "jd_p_inputBox_1", zIndex: -2, width: 420, x: -75, y: 60, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(officelogin, { path: bpath + "jd_p_inputBox_1", zIndex: -2, width: 420, x: -75, y: -50, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(officelogin, { path: bpath + "jd_p_inputBox_1", zIndex: -2, width: 630, x: 30, y: -160, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(officelogin, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "shoujid", zIndex: -1, x: -250, y: 170 })
                                        hqq.addNode(officelogin, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "fang", zIndex: -1, x: -250, y: 60 })
                                        hqq.addNode(officelogin, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "duanxin", zIndex: -1, x: -250, y: -50 })
                                        hqq.addNode(officelogin, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "suotou", zIndex: -1, x: -250, y: -160 })

                                        hqq.addNode(officelogin, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "jd_lisp_line", zIndex: -1, width: 620, x: 30, y: 110 })
                                        hqq.addNode(officelogin, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "jd_lisp_line", zIndex: -1, width: 620, x: 30, y: 0 })
                                        hqq.addNode(officelogin, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "jd_lisp_line", zIndex: -1, width: 620, x: 30, y: -110 })

                                        cc.find("Canvas/bigsublayer/officelogin/phoneeditbox").y = 170;
                                        cc.find("Canvas/bigsublayer/officelogin/phoneeditbox/TEXT_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/officelogin/phoneeditbox/TEXT_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.CENTER;
                                        cc.find("Canvas/bigsublayer/officelogin/phoneeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/officelogin/phoneeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.CENTER;

                                        cc.find("Canvas/bigsublayer/officelogin/yanzheneditbox").y = 60;
                                        cc.find("Canvas/bigsublayer/officelogin/yanzheneditbox/TEXT_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/officelogin/yanzheneditbox/TEXT_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.CENTER;
                                        cc.find("Canvas/bigsublayer/officelogin/yanzheneditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/officelogin/yanzheneditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.CENTER;

                                        cc.find("Canvas/bigsublayer/officelogin/capchaeditbox").y = -50;
                                        cc.find("Canvas/bigsublayer/officelogin/capchaeditbox/TEXT_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/officelogin/capchaeditbox/TEXT_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.CENTER;
                                        cc.find("Canvas/bigsublayer/officelogin/capchaeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/officelogin/capchaeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.CENTER;

                                        cc.find("Canvas/bigsublayer/officelogin/passeditbox").y = -160;
                                        cc.find("Canvas/bigsublayer/officelogin/passeditbox/TEXT_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/officelogin/passeditbox/TEXT_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT;
                                        cc.find("Canvas/bigsublayer/officelogin/passeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/officelogin/passeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT;

                                        let info_form = cc.find("Canvas/bigsublayer/officelogin/info_form")
                                        info_form.active = false
                                        this.btnlabel2.getComponent(cc.Label).color = cc.color(255, 255, 255)
                                        let lao2 = this.btnlabel2.getComponent(cc.LabelOutline)
                                        lao2.color = cc.color(67, 0, 0)
                                        lao2.width = 2
                                } else if (hqq.app.pinpai == "xingui") {
                                        this.exitbtn.x = 415
                                        this.exitbtn.y = 230
                                } else if (hqq.app.pinpai == "xinsheng") {
                                        this.exitbtn.x = 440
                                        this.exitbtn.y = 255
                                } else if (hqq.app.pinpai == "xinlong") {
                                        let bpath = "base/xinlong/img/"
                                        let hpath = "xinlong/img/"
                                        let officelogin = cc.find("Canvas/bigsublayer/officelogin")
                                        hqq.addNode(officelogin, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "jd_p_inputBox_1", zIndex: -2, width: 630, x: 30, y: 170, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(officelogin, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "jd_p_inputBox_1", zIndex: -2, width: 420, x: -75, y: 60, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(officelogin, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "jd_p_inputBox_1", zIndex: -2, width: 420, x: -75, y: -50, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(officelogin, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "jd_p_inputBox_1", zIndex: -2, width: 630, x: 30, y: -160, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(officelogin, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "shoujid", zIndex: -1, x: -250, y: 170 })
                                        hqq.addNode(officelogin, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "fang", zIndex: -1, x: -250, y: 60 })
                                        hqq.addNode(officelogin, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "duanxin", zIndex: -1, x: -250, y: -50 })
                                        hqq.addNode(officelogin, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "suotou", zIndex: -1, x: -250, y: -160 })

                                        hqq.addNode(officelogin, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "jd_lisp_line", zIndex: -1, width: 620, x: 30, y: 110 })
                                        hqq.addNode(officelogin, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "jd_lisp_line", zIndex: -1, width: 620, x: 30, y: 0 })
                                        hqq.addNode(officelogin, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "jd_lisp_line", zIndex: -1, width: 620, x: 30, y: -110 })

                                        cc.find("Canvas/bigsublayer/officelogin/phoneeditbox").y = 170;
                                        cc.find("Canvas/bigsublayer/officelogin/phoneeditbox/TEXT_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/officelogin/phoneeditbox/TEXT_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT;
                                        cc.find("Canvas/bigsublayer/officelogin/phoneeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/officelogin/phoneeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT;

                                        cc.find("Canvas/bigsublayer/officelogin/yanzheneditbox").y = 60;
                                        cc.find("Canvas/bigsublayer/officelogin/yanzheneditbox/TEXT_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/officelogin/yanzheneditbox/TEXT_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT;
                                        cc.find("Canvas/bigsublayer/officelogin/yanzheneditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/officelogin/yanzheneditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT;

                                        cc.find("Canvas/bigsublayer/officelogin/capchaeditbox").y = -50;
                                        cc.find("Canvas/bigsublayer/officelogin/capchaeditbox/TEXT_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/officelogin/capchaeditbox/TEXT_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT;
                                        cc.find("Canvas/bigsublayer/officelogin/capchaeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/officelogin/capchaeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT;

                                        cc.find("Canvas/bigsublayer/officelogin/passeditbox").y = -160;
                                        cc.find("Canvas/bigsublayer/officelogin/passeditbox/TEXT_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/officelogin/passeditbox/TEXT_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT;
                                        cc.find("Canvas/bigsublayer/officelogin/passeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                                        cc.find("Canvas/bigsublayer/officelogin/passeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT;

                                        let info_form = cc.find("Canvas/bigsublayer/officelogin/info_form")
                                        info_form.active = false
                                        this.btnlabel2.getComponent(cc.Label).color = cc.color(255, 255, 255)
                                        // // let lao2 = this.btnlabel2.getComponent(cc.LabelOutline)
                                        // // lao2.color = cc.color(67, 0, 0)
                                        // // lao2.width = 2
                                } else if (hqq.app.pinpai == "huaxing") {
                                        let bpath = "base/huaxing/img/"
                                        let hpath = "huaxing/img/"
                                        let officelogin = cc.find("Canvas/bigsublayer/officelogin")
                                        hqq.addNode(officelogin, { path: bpath + "4", zIndex: -2, width: 630, x: 30, y: 170, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(officelogin, { path: bpath + "4", zIndex: -2, width: 420, x: -75, y: 60, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(officelogin, { path: bpath + "4", zIndex: -2, width: 420, x: -75, y: -50, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(officelogin, { path: bpath + "4", zIndex: -2, width: 630, x: 30, y: -160, type: cc.Sprite.Type.SLICED })
                                        hqq.addNode(officelogin, { path: bpath + "19", zIndex: -1, x: -250, y: 170 })
                                        hqq.addNode(officelogin, { path: bpath + "21", zIndex: -1, x: -250, y: 60 })
                                        hqq.addNode(officelogin, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "20", zIndex: -1, x: -250, y: -50 })
                                        hqq.addNode(officelogin, { path: bpath + "18", zIndex: -1, x: -250, y: -160 })

                                        // // hqq.addNode(officelogin, { path: hpath + "jd_lisp_line", zIndex: -1, width:620 , x: 30, y: 110 })
                                        // // hqq.addNode(officelogin, { path: hpath + "jd_lisp_line", zIndex: -1, width:620 , x: 30, y: 0 })
                                        // // hqq.addNode(officelogin, { path: hpath + "jd_lisp_line", zIndex: -1, width:620 , x: 30, y: -110 })

                                        cc.find("Canvas/bigsublayer/officelogin/phoneeditbox").y = 170;
                                        // // cc.find("Canvas/bigsublayer/officelogin/phoneeditbox/TEXT_LABEL").color = cc.color(84,98,119,255);
                                        // // cc.find("Canvas/bigsublayer/officelogin/phoneeditbox/TEXT_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.CENTER;
                                        // // cc.find("Canvas/bigsublayer/officelogin/phoneeditbox/PLACEHOLDER_LABEL").color = cc.color(84,98,119,255);
                                        // // cc.find("Canvas/bigsublayer/officelogin/phoneeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.CENTER;

                                        cc.find("Canvas/bigsublayer/officelogin/yanzheneditbox").y = 60;
                                        // // cc.find("Canvas/bigsublayer/officelogin/yanzheneditbox/TEXT_LABEL").color = cc.color(84,98,119,255);
                                        // // cc.find("Canvas/bigsublayer/officelogin/yanzheneditbox/TEXT_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.CENTER;
                                        // // cc.find("Canvas/bigsublayer/officelogin/yanzheneditbox/PLACEHOLDER_LABEL").color = cc.color(84,98,119,255);
                                        // // cc.find("Canvas/bigsublayer/officelogin/yanzheneditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.CENTER;

                                        cc.find("Canvas/bigsublayer/officelogin/capchaeditbox").y = -50;
                                        // // cc.find("Canvas/bigsublayer/officelogin/capchaeditbox/TEXT_LABEL").color = cc.color(84,98,119,255);
                                        // // cc.find("Canvas/bigsublayer/officelogin/capchaeditbox/TEXT_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.CENTER;
                                        // // cc.find("Canvas/bigsublayer/officelogin/capchaeditbox/PLACEHOLDER_LABEL").color = cc.color(84,98,119,255);
                                        // // cc.find("Canvas/bigsublayer/officelogin/capchaeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.CENTER;

                                        cc.find("Canvas/bigsublayer/officelogin/passeditbox").y = -160;
                                        // // cc.find("Canvas/bigsublayer/officelogin/passeditbox/TEXT_LABEL").color = cc.color(84,98,119,255);
                                        // // cc.find("Canvas/bigsublayer/officelogin/passeditbox/TEXT_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT;
                                        // // cc.find("Canvas/bigsublayer/officelogin/passeditbox/PLACEHOLDER_LABEL").color = cc.color(84,98,119,255);
                                        // // cc.find("Canvas/bigsublayer/officelogin/passeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT;

                                        let info_form = cc.find("Canvas/bigsublayer/officelogin/info_form")
                                        info_form.active = false
                                } else if (hqq.app.pinpai == "ninetwo") {
                                        let bpath = "base/ninetwo/img/"
                                        let hpath = "ninetwo/img/"
                                        let hlpath2 = "language/" + hqq.language + "/ninetwo/"
                                        // // let officelogin = cc.find("Canvas/bigsublayer/officelogin")
                                        // // hqq.addNode(officelogin, { path: bpath + "kuangti1", zIndex: -2, width: 750,height:350, x: 0, y: 0, type: cc.Sprite.Type.SLICED })
                                        // // let input1 = hqq.addNode(officelogin, { path: bpath + "yjks", zIndex: -2, width: 513*(750/576),height:36*(450/273), x: 0, y: 135, type: cc.Sprite.Type.SLICED })
                                        // // hqq.addNode(input1,{path:hpath + "shouji",x:-310})
                                        // // let input2 = hqq.addNode(officelogin, { path: bpath + "yjks", zIndex: -2, width: 290*(750/576), height: 36*(450/273),x:-145, y: 45, type: cc.Sprite.Type.SLICED })
                                        // // hqq.addNode(input2,{path:hpath + "34w",x:-167})
                                        // // let input3 = hqq.addNode(officelogin, { path: bpath + "yjks", zIndex: -2, width: 390*(750/576),height:36*(450/273), x: -82, y: -45, type: cc.Sprite.Type.SLICED })
                                        // // hqq.addNode(input3,{path:hpath + "twtrew",x:-226})
                                        // // let input4 = hqq.addNode(officelogin, { path: bpath + "yjks", zIndex: -2, width: 513*(750/576),height:36*(450/273), x: 0, y: -135, type: cc.Sprite.Type.SLICED })
                                        // // hqq.addNode(input4,{path:bpath + "gfdsg",x:-310})

                                        let phoneeditbox = cc.find("Canvas/bigsublayer/officelogin/phoneeditbox");
                                        hqq.setNode(phoneeditbox, { width: 470, height: 50, x: 55, y: 119 });
                                        hqq.setNode(phoneeditbox.getChildByName("BACKGROUND_SPRITE"), { width: 470, height: 50 });
                                        hqq.setNode(phoneeditbox.getChildByName("TEXT_LABEL"), { width: 470, height: 50 });
                                        hqq.setNode(phoneeditbox.getChildByName("PLACEHOLDER_LABEL"), { width: 470, height: 50, color: cc.color(129, 129, 126, 255) });

                                        let yanzheneditbox = cc.find("Canvas/bigsublayer/officelogin/yanzheneditbox");
                                        hqq.setNode(yanzheneditbox, { width: 290, height: 50, x: -35, y: 38 });
                                        hqq.setNode(yanzheneditbox.getChildByName("BACKGROUND_SPRITE"), { width: 290, height: 50 });
                                        hqq.setNode(yanzheneditbox.getChildByName("TEXT_LABEL"), { width: 290, height: 50 });
                                        hqq.setNode(yanzheneditbox.getChildByName("PLACEHOLDER_LABEL"), { width: 290, height: 50, color: cc.color(129, 129, 126, 255) });

                                        let capchaeditbox = cc.find("Canvas/bigsublayer/officelogin/capchaeditbox");
                                        hqq.setNode(capchaeditbox, { width: 360, height: 50, x: 0, y: -44 });
                                        hqq.setNode(capchaeditbox.getChildByName("BACKGROUND_SPRITE"), { width: 360, height: 50 });
                                        hqq.setNode(capchaeditbox.getChildByName("TEXT_LABEL"), { width: 360, height: 50 });
                                        hqq.setNode(capchaeditbox.getChildByName("PLACEHOLDER_LABEL"), { width: 360, height: 50, color: cc.color(129, 129, 126, 255) });

                                        let passeditbox = cc.find("Canvas/bigsublayer/officelogin/passeditbox");
                                        hqq.setNode(passeditbox, { width: 470, height: 50, x: 55, y: -122 });
                                        hqq.setNode(passeditbox.getChildByName("BACKGROUND_SPRITE"), { width: 470, height: 50 });
                                        hqq.setNode(passeditbox.getChildByName("TEXT_LABEL"), { width: 470, height: 50 });
                                        hqq.setNode(passeditbox.getChildByName("PLACEHOLDER_LABEL"), { width: 470, height: 50, color: cc.color(129, 129, 126, 255) });

                                        let surecg = cc.find("Canvas/bigsublayer/surecg")
                                        hqq.setBtn(surecg, { Res: hqq["hall_" + hqq.app.pinpai], normal: hlpath2 + "setting_btn_register/", aniname: "animation", loop: true, timeScale: 0.95, x: 0, y: -230 })
                                        // // hqq.addNode(surecg, { string: "bindphone",fontSize:22,lineHeight:25,y:10,bold:true,color:cc.color(72,47,7) })
                                        // // hqq.addNode(surecg, { string: "REGISTER",fontSize:10,lineHeight:12,y:-10,bold:true,color:cc.color(72,47,7) })

                                        let imageback = cc.find("Canvas/bigsublayer/officelogin/imgback");
                                        hqq.setNode(imageback, { width: 240, height: 80 })
                                        hqq.setNode(imageback.getChildByName("captchaimg"), { width: 240, height: 80 })
                                        imageback.setPositionEx(240, 35);
                                        // // hqq.setNode(imageback,{width:106,height:42,x:200,y:33})
                                        // // hqq.setNode(imageback.getChildByName("captchaimg"),{width:106,height:42,x:0,y:0})
                                        this.btnlabel2.parent.setPositionEx(250, -43);
                                        this.btnlabel2.getComponent(cc.Label).fontSize = 18;
                                } else {
                                        this.exitbtn.y = 290
                                }
                                break;
                }
        }
        onClickKaihushengXiala() {
                var results = hqq.getTip("results")
                if (!this.kaihushengSelect) {
                        for (var i = 0; i < results.length; i++) {
                                for (var i = 0; i < results.length; i++) {
                                        var node = cc.instantiate(this.BankSelectItem);
                                        if (hqq.app.pinpai == "fuxin") {
                                                hqq.setSprite(node, { path: "base/fuxin/img/srk", width: 500, type: cc.Sprite.Type.SLICED })
                                        } else if (hqq.app.pinpai == "juding") {
                                                hqq.setSprite(node, { Res: hqq["hall_" + hqq.app.pinpai], path: "juding/img/kuang", width: 500, type: cc.Sprite.Type.SLICED, color: cc.color(84, 98, 119, 255) })
                                        } else if (hqq.app.pinpai == "xinlong") {
                                                hqq.setSprite(node, { Res: hqq["hall_" + hqq.app.pinpai], path: "xinlong/img/kuang", width: 500, type: cc.Sprite.Type.SLICED, color: cc.color(84, 98, 119, 255) })
                                        }
                                        this.selectKaihushengContent.addChildEx(node);
                                        node.getChildByName('label').getComponent(cc.Label).string = results[i];
                                        var clickEventHandler = new cc.EventHandler();
                                        clickEventHandler.target = this.node;
                                        clickEventHandler.component = this.getClassName();
                                        clickEventHandler.customEventData = results[i];
                                        clickEventHandler.handler = "onClickKaihushengItem";
                                        let button = node.getComponent(cc.Button);
                                        button.clickEvents.push(clickEventHandler);
                                }
                        }
                        this.kaihushengSelect = true;
                } else {
                        let templabel = this.bindyinhangka.getChildByName("kaihushi").getChildByName('kaihushilabel')
                        templabel.getComponent(cc.Label).string = hqq.getTip("kaihushi")
                        if (hqq.app.pinpai === "juding" || hqq.app.pinpai === "xinlong") {
                                templabel.getComponent(cc.Label).color = cc.color(133, 147, 186, 255);
                        } else {
                                templabel.getComponent(cc.Label).color = cc.color(187, 187, 187, 255);
                        }
                        templabel = this.bindyinhangka.getChildByName("yinhangname").getChildByName('yinhanglabel')
                        templabel.getComponent(cc.Label).string = hqq.getTip("yinhangname")
                        if (hqq.app.pinpai === "juding" || hqq.app.pinpai === "xinlong") {
                                templabel.getComponent(cc.Label).color = cc.color(133, 147, 186, 255);
                        } else {
                                templabel.getComponent(cc.Label).color = cc.color(187, 187, 187, 255);
                        }
                        this.selectKaihushengContent.removeAllChildren();
                        this.kaihushengSelect = false;
                }
        }
        onClickKaihushengItem(event: any, custom: any) {
                let templabel = this.bindyinhangka.getChildByName("kaihusheng").getChildByName('kaihushenglabel')
                templabel.getComponent(cc.Label).string = custom
                if (hqq.app.pinpai === "juding" || hqq.app.pinpai === "xinlong") {
                        templabel.getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                } else {
                        templabel.getComponent(cc.Label).color = cc.color(255, 255, 255)
                }
                this.onClickKaihushengXiala()
        }
        onClickKaihushiXiala() {
                let sheng = this.bindyinhangka.getChildByName("kaihusheng").getChildByName('kaihushenglabel').getComponent(cc.Label).string
                if (!sheng || sheng == hqq.getTip("kaihusheng")) {
                        hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip22"))
                        return
                }
                var results = this.cities[sheng]
                if (!this.kaihushiSelect) {
                        for (var i = 0; i < results.length; i++) {
                                var node = cc.instantiate(this.BankSelectItem);
                                if (hqq.app.pinpai == "fuxin") {
                                        hqq.setSprite(node, { path: "base/fuxin/img/srk", width: 500, type: cc.Sprite.Type.SLICED })
                                } else if (hqq.app.pinpai == "juding") {
                                        hqq.setSprite(node, { Res: hqq["hall_" + hqq.app.pinpai], path: "juding/img/kuang", width: 500, type: cc.Sprite.Type.SLICED, color: cc.color(84, 98, 119, 255) })
                                } else if (hqq.app.pinpai == "xinlong") {
                                        hqq.setSprite(node, { Res: hqq["hall_" + hqq.app.pinpai], path: "xinlong/img/kuang", width: 500, type: cc.Sprite.Type.SLICED, color: cc.color(84, 98, 119, 255) })
                                }
                                this.selectKaihushiContent.addChildEx(node);
                                node.getChildByName('label').getComponent(cc.Label).string = results[i];
                                var clickEventHandler = new cc.EventHandler();
                                clickEventHandler.target = this.node;
                                clickEventHandler.component = this.getClassName();
                                clickEventHandler.customEventData = results[i];
                                clickEventHandler.handler = "onClickKaihushiItem";
                                let button = node.getComponent(cc.Button);
                                button.clickEvents.push(clickEventHandler);
                        }
                        this.kaihushiSelect = true;
                } else {
                        let templabel = this.bindyinhangka.getChildByName("yinhangname").getChildByName('yinhanglabel')
                        templabel.getComponent(cc.Label).string = hqq.getTip("yinhangname")
                        if (hqq.app.pinpai === "juding" || hqq.app.pinpai === "xinlong") {
                                templabel.getComponent(cc.Label).color = cc.color(133, 147, 186, 255);
                        } else {
                                templabel.getComponent(cc.Label).color = cc.color(187, 187, 187, 255);
                        }
                        this.selectKaihushiContent.removeAllChildren();
                        this.kaihushiSelect = false;
                }
        }
        onClickKaihushiItem(event: any, custom: any) {
                let templabel = this.bindyinhangka.getChildByName("kaihushi").getChildByName('kaihushilabel')
                templabel.getComponent(cc.Label).string = custom
                if (hqq.app.pinpai === "juding" || hqq.app.pinpai === "xinlong") {
                        templabel.getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                } else {
                        templabel.getComponent(cc.Label).color = cc.color(255, 255, 255)
                }
                this.onClickKaihushiXiala()
        }
        onClickKaihuhangXiala() {
                if (!this.kaihuhangSelect) {
                        let url = hqq.gameGlobal.pay.pay_host + "/api/payment_account/getbankName"
                        let dataStr = "?token=e40f01afbb1b9ae3dd6747ced5bca532"
                        let callback = (response) => {
                                if (response.status == 0) {
                                        // let results:string[] = Object.values(response.data);
                                        for (let key in response.data) {
                                                let node: cc.Node = cc.instantiate(this.BankSelectItem);
                                                if (hqq.app.pinpai == "fuxin") {
                                                        hqq.setSprite(node, { path: "base/fuxin/img/srk", width: 500, type: cc.Sprite.Type.SLICED })
                                                } else if (hqq.app.pinpai == "juding") {
                                                        hqq.setSprite(node, { Res: hqq["hall_" + hqq.app.pinpai], path: "juding/img/kuang", width: 500, type: cc.Sprite.Type.SLICED, color: cc.color(84, 98, 119, 255) })
                                                } else if (hqq.app.pinpai == "xinlong") {
                                                        hqq.setSprite(node, { Res: hqq["hall_" + hqq.app.pinpai], path: "xinlong/img/kuang", width: 500, type: cc.Sprite.Type.SLICED, color: cc.color(84, 98, 119, 255) })
                                                }
                                                this.selectKaihuhangContent.addChildEx(node);
                                                node.getChildByName('label').getComponent(cc.Label).string = response.data[key];
                                                var clickEventHandler = new cc.EventHandler();
                                                clickEventHandler.target = this.node;
                                                clickEventHandler.component = this.getClassName();
                                                clickEventHandler.customEventData = response.data[key];
                                                clickEventHandler.handler = "onClickKaihuhangItem";
                                                let button = node.getComponent(cc.Button);
                                                button.clickEvents.push(clickEventHandler);
                                        }
                                        this.kaihuhangSelect = true;
                                } else {
                                        var results = hqq.getTip("kaihuhang")
                                        for (var i = 0; i < results.length; i++) {
                                                var node = cc.instantiate(this.BankSelectItem);
                                                hqq.setSprite(node, { Res: hqq["hall_" + hqq.app.pinpai], path: "xinlong/img/kuang", width: 500, type: cc.Sprite.Type.SLICED, color: cc.color(84, 98, 119, 255) })
                                                this.selectKaihuhangContent.addChildEx(node);
                                                node.getChildByName('label').getComponent(cc.Label).string = results[i];
                                                var clickEventHandler = new cc.EventHandler();
                                                clickEventHandler.target = this.node;
                                                clickEventHandler.component = this.getClassName();
                                                clickEventHandler.customEventData = results[i];
                                                clickEventHandler.handler = "onClickKaihuhangItem";
                                                let button = node.getComponent(cc.Button);
                                                button.clickEvents.push(clickEventHandler);
                                        }
                                        this.kaihuhangSelect = true;
                                }
                        }
                        let failcallback = (status, forcejump, url, err, readyState) => {
                                var results = hqq.getTip("kaihuhang")
                                for (var i = 0; i < results.length; i++) {
                                        var node = cc.instantiate(this.BankSelectItem);
                                        hqq.setSprite(node, { Res: hqq["hall_" + hqq.app.pinpai], path: "xinlong/img/kuang", width: 500, type: cc.Sprite.Type.SLICED, color: cc.color(84, 98, 119, 255) })
                                        this.selectKaihuhangContent.addChildEx(node);
                                        node.getChildByName('label').getComponent(cc.Label).string = results[i];
                                        var clickEventHandler = new cc.EventHandler();
                                        clickEventHandler.target = this.node;
                                        clickEventHandler.component = this.getClassName();
                                        clickEventHandler.customEventData = results[i];
                                        clickEventHandler.handler = "onClickKaihuhangItem";
                                        let button = node.getComponent(cc.Button);
                                        button.clickEvents.push(clickEventHandler);
                                }
                                this.kaihuhangSelect = true;
                        }
                        hqq.http.sendXMLHttpRequest({
                                method: 'GET',
                                urlto: url,
                                endurl: dataStr,
                                callback: callback,
                                needJsonParse: true,
                                failcallback: failcallback,
                        })
                } else {
                        this.selectKaihuhangContent.removeAllChildren();
                        this.kaihuhangSelect = false;
                }
        }
        onClickKaihuhangItem(event: any, custom: any) {
                let templabel = this.bindyinhangka.getChildByName("yinhangname").getChildByName('yinhanglabel')
                templabel.getComponent(cc.Label).string = custom
                if (hqq.app.pinpai === "juding" || hqq.app.pinpai === "xinlong") {
                        templabel.getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
                } else {
                        templabel.getComponent(cc.Label).color = cc.color(255, 255, 255)
                }
                this.onClickKaihuhangXiala()
        }
        yinhangkaChange(event: any) {
                this.bindyinhangka.getChildByName("kahaoeditbox").getComponent(cc.EditBox).string = event.string.replace(/\s+/g, "")
        }
        isChinese(s: any) {
                var ret = true;
                for (var i = 0; i < s.length; i++) {//遍历每一个文本字符bai
                        ret = ret && (s.charCodeAt(i) >= 10000 || s.charCodeAt(i) == 183); //判断文本字符的unicode值 ,183 为 ·
                }
                return ret
        }
        bindyinhangkaEnsure() {
                this.ensurebtn.interactable = false
                let card_num = this.bindyinhangka.getChildByName("kahaoeditbox").getComponent(cc.EditBox).string
                if (card_num.length == 0) {
                        this.ensurebtn.interactable = true
                        return hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip23"))
                }
                if (card_num.length < 15 || card_num.length > 19) {
                        this.ensurebtn.interactable = true
                        return hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip24"))
                }
                let card_name = this.bindyinhangka.getChildByName("nameediftox").getComponent(cc.EditBox).string
                if (card_name.length == 0) {
                        this.ensurebtn.interactable = true
                        return hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip25"))
                } else if (!this.isChinese(card_name)) {
                        this.ensurebtn.interactable = true
                        return hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip26"))
                }
                let sheng = this.bindyinhangka.getChildByName("kaihusheng").getChildByName('kaihushenglabel').getComponent(cc.Label).string
                if (sheng == hqq.getTip("kaihusheng") || sheng.length == 0) {
                        this.ensurebtn.interactable = true
                        return hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip27"))
                }
                let shi = this.bindyinhangka.getChildByName("kaihushi").getChildByName('kaihushilabel').getComponent(cc.Label).string
                if (shi == hqq.getTip("kaihushi") || shi.length == 0) {
                        this.ensurebtn.interactable = true
                        return hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip28"))
                }
                let bank_name = this.bindyinhangka.getChildByName("yinhangname").getChildByName('yinhanglabel').getComponent(cc.Label).string
                if (bank_name == hqq.getTip("yinhangname") || bank_name.length == 0) {
                        this.ensurebtn.interactable = true
                        return hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip29"))
                }
                let branch_name = this.bindyinhangka.getChildByName("zhihang").getComponent(cc.EditBox).string
                if (branch_name.length == 0) {
                        this.ensurebtn.interactable = true
                        return hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip30"))
                } else if (!this.isChinese(branch_name)) {
                        this.ensurebtn.interactable = true
                        return hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip31"))
                }

                let obj = {};
                obj = {
                        card_num: card_num.replace(/\s+/g, ""),
                        card_name: card_name,
                        bank_name: bank_name,
                        branch_name: branch_name,
                        bank_province: sheng,
                        bank_city: shi,
                };
                let info = JSON.stringify(obj);
                let dataStr = "user_id=" + hqq.gameGlobal.pay.user_id
                dataStr += "&user_name=" + hqq.gameGlobal.pay.user_name
                dataStr += "&action=add&type=3&info=" + info
                dataStr += "&client=" + hqq.gameGlobal.pay.client
                dataStr += "&proxy_user_id=" + hqq.gameGlobal.pay.proxy_user_id
                dataStr += "&proxy_name=" + hqq.gameGlobal.pay.proxy_name
                dataStr += "&package_id=" + hqq.gameGlobal.pay.package_id
                dataStr += "&token=e40f01afbb1b9ae3dd6747ced5bca532"
                dataStr += "&version=1"
                dataStr += "&center_auth=" + hqq.gameGlobal.token
                let callback = (response) => {
                        this.ensurebtn.interactable = true
                        if (response.status == 0) {
                                hqq.eventMgr.dispatch(hqq.eventMgr.getPayInfo)
                                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("actsuccess"))
                                this.onClickExit()
                        } else {
                                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, response.msg)
                        }
                }
                let failcallback = (status, forcejump, url, err, readyState) => {
                        hqq.logMgr.log("bindyinhangkaEnsure failcallback", status, forcejump, url, err, readyState)
                        this.ensurebtn.interactable = true
                        hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("requestfail") + status + ",err:" + err)
                }
                let url = hqq.gameGlobal.pay.pay_host + "/api/payment_account/saveAccount"
                hqq.http.sendXMLHttpRequest({
                        method: 'POST',
                        urlto: url,
                        param: dataStr,
                        callback: callback,
                        needJsonParse: true,
                        failcallback: failcallback,
                })
        }
        onClickCaptcha() {
                this.panelInit(this.subtype)
        }
        panelInit(mtype: any) {
                if (JSB) {
                        let fullPath = jsb.fileUtils.getWritablePath() + "yanzhenma.png";
                        jsb.fileUtils.isFileExist(fullPath) && jsb.fileUtils.removeFile(fullPath);
                        if (this.temptex) {
                                cc.assetManager.releaseAsset(this.temptex);
                        }
                }

                if (!hqq.app.gameUser) {
                        cc.log("没有中心服数据")
                        return
                }
                let imgurl = ''
                if (hqq.app.server.indexOf("http:") == -1 && hqq.app.server.indexOf("https:") == -1) {
                        imgurl = "http://" + hqq.app.server + "/Game/Verify/createCaptcha?"
                } else {
                        imgurl = hqq.app.server + "/Game/Verify/createCaptcha?"
                }
                imgurl += "id=" + hqq.app.gameUser.id;
                imgurl += "&token=" + hqq.gameGlobal.token;
                let self = this;
                var xhr = new XMLHttpRequest();
                xhr.open("get", imgurl, true);
                if (JSB) {
                        xhr.responseType = "arraybuffer";
                } else {
                        xhr.responseType = "blob";
                }
                xhr.onload = function () {
                        if (this.status == 200) {
                                if (JSB) {
                                        var fullPath = jsb.fileUtils.getWritablePath() + "yanzhenma.png";
                                        if (jsb.fileUtils.isFileExist(fullPath) && jsb.fileUtils.removeFile(fullPath)) {
                                                if (jsb.fileUtils.writeDataToFile(new Uint8Array(this.response), fullPath)) {
                                                        cc.assetManager.loadRemote(fullPath, function (err, tex: cc.Texture2D) {
                                                                if (err) {
                                                                        cc.error(err);
                                                                        return;
                                                                } else {
                                                                        if (!cc.isValid(self.captchaimg1) || !cc.isValid(self.captchaimg2)) return;
                                                                        self.temptex = tex
                                                                        let mspriteFrame = new cc.SpriteFrame();
                                                                        mspriteFrame.texture = tex;
                                                                        if (mspriteFrame) {
                                                                                if (mtype == 1) {
                                                                                        self.captchaimg1.spriteFrame = mspriteFrame;
                                                                                } else {
                                                                                        self.captchaimg2.spriteFrame = mspriteFrame;
                                                                                }
                                                                        }
                                                                }
                                                        });
                                                } else {
                                                        cc.log('Remote write file failed.');
                                                }
                                        } else {
                                                if (jsb.fileUtils.writeDataToFile(new Uint8Array(this.response), fullPath)) {
                                                        cc.assetManager.loadRemote(fullPath, function (err, tex: cc.Texture2D) {
                                                                if (err) {
                                                                        cc.error(err);
                                                                        return;
                                                                } else {
                                                                        if (!cc.isValid(self.captchaimg1) || !cc.isValid(self.captchaimg2)) return;
                                                                        self.temptex = tex
                                                                        let mspriteFrame = new cc.SpriteFrame();
                                                                        mspriteFrame.texture = tex;
                                                                        if (mspriteFrame) {
                                                                                if (mtype == 1) {
                                                                                        self.captchaimg1.spriteFrame = mspriteFrame;
                                                                                } else {
                                                                                        self.captchaimg2.spriteFrame = mspriteFrame;
                                                                                }
                                                                        }
                                                                }
                                                        });
                                                } else {
                                                        cc.log('Remote write file failed.');
                                                }
                                        }
                                } else {
                                        var blob = this.response;
                                        let oFileReader = new FileReader();
                                        oFileReader.onloadend = function (e) {
                                                let base64 = e.target.result;
                                                var img = new Image();
                                                img.src = base64.toString();
                                                img.onload = function () {
                                                        if (!cc.isValid(self.captchaimg1) || !cc.isValid(self.captchaimg2)) return;
                                                        let imgAsset = new cc.ImageAsset();//重置此图像资源使用的原始图像源
                                                        imgAsset.reset(img);
                                                        var texture = new cc.Texture2D();
                                                        texture.image = imgAsset;
                                                        var newframe = new cc.SpriteFrame();
                                                        if (mtype == 1) {
                                                                self.captchaimg1.spriteFrame = newframe;
                                                        } else {
                                                                self.captchaimg2.spriteFrame = newframe;
                                                        }
                                                }
                                        };
                                        oFileReader.readAsDataURL(blob);
                                }
                                xhr.abort()
                        }
                }
                xhr.ontimeout = () => {
                        xhr.abort()
                }
                xhr.onerror = () => {
                        xhr.abort()
                }
                xhr.send();
        }
        onClickGetCaptcha(event: any, custom: any) {
                let phonenum
                let yanzhenmanum
                if (custom == 1) {
                        phonenum = this.resetpass.getChildByName("phoneeditbox").getComponent(cc.EditBox).string
                        yanzhenmanum = this.resetpass.getChildByName("yanzheneditbox").getComponent(cc.EditBox).string
                } else {
                        phonenum = this.officelogin.getChildByName("phoneeditbox").getComponent(cc.EditBox).string
                        yanzhenmanum = this.officelogin.getChildByName("yanzheneditbox").getComponent(cc.EditBox).string
                }
                if (phonenum == "") {
                        hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip32"))
                        return
                }
                if (phonenum[0] != "1") {
                        hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip33"))
                        return
                }
                if (yanzhenmanum == "") {
                        hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("entercode"))
                        return
                }
                let self = this
                let callback = (data) => {
                        if (!cc.isValid(this.node)) return;
                        if (data.code == 200) {
                                let btn
                                if (custom == 1) {
                                        btn = self.resetpass.getChildByName("getcodebtn").getComponent(cc.Button)
                                } else {
                                        btn = self.officelogin.getChildByName("getcodebtn").getComponent(cc.Button)
                                }
                                btn.interactable = false
                                let btnlabel = btn.node.getChildByName('btnlabel')
                                let la = btnlabel.getComponent(cc.Label)
                                la.string = hqq.getTip("str0") + "（60）"
                                let lao = btnlabel.getComponent(cc.LabelOutline)
                                if (hqq.app.pinpai == "xingui") {
                                        btnlabel.color = cc.color(255, 0, 0)
                                        lao.color = cc.color(255, 0, 0)
                                } else {
                                        btnlabel.color = cc.color(67, 67, 67)
                                        lao.color = cc.color(67, 67, 67)
                                }
                                let time2 = 0
                                this.timer = setInterval(() => {
                                        if (!cc.isValid(this.node)) return;
                                        if (!cc.isValid(la)) return;
                                        time2++
                                        let t = 60 - time2
                                        la.string = hqq.getTip("str0") + "（" + t + "）"
                                        if (time2 >= 60) {
                                                clearInterval(this.timer);
                                                btn.interactable = true
                                                la.string = hqq.getTip("getcode")
                                                if (hqq.app.pinpai == "xingui") {
                                                        btnlabel.color = cc.color(255, 255, 255)
                                                        lao.color = cc.color(255, 255, 255)
                                                } else {
                                                        btnlabel.color = cc.color(67, 0, 0)
                                                        lao.color = cc.color(67, 0, 0)
                                                }
                                        }
                                }, 1000)
                        } else {
                                if (data.code == 203 && data.msg == "图片验证码错误") {
                                        hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip34"))
                                } else if (data.msg == "can only be sent once in 60s") {
                                        hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip35") + hqq.getTip("smstoomany"))
                                } else {
                                        hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip35") + data.msg)
                                }
                        }
                }
                let failcallback = (status, forcejump, url, err, readyState) => {
                        hqq.logMgr.log("onClickGetCaptcha failcallback", status, forcejump, url, err, readyState)
                        hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("requestfail") + status + ",err:" + err)
                }
                let endurl = hqq.app.getIpPostEndUrl(7);
                let data = {
                        id: hqq.gameGlobal.player.id,
                        token: hqq.gameGlobal.token,
                        phone_number: phonenum,
                        captcha: yanzhenmanum,
                }

                hqq.http.sendXMLHttpRequest({
                        method: 'POST',
                        urlto: hqq.app.server + endurl,
                        param: data,
                        callback: callback,
                        failcallback: failcallback,
                        needJsonParse: true,
                })
        }
        passJudge(str: any) {
                if (str.length < 6 || str.length > 12 || !str.match(/[0-9]/g) || !str.match(/[a-zA-Z]/g)) {
                        return true
                }
                return false
        }
        officeloginEnsure() {
                let phonenum = this.officelogin.getChildByName("phoneeditbox").getComponent(cc.EditBox).string
                let yanzhenmanum = this.officelogin.getChildByName("yanzheneditbox").getComponent(cc.EditBox).string
                let capchanum = this.officelogin.getChildByName("capchaeditbox").getComponent(cc.EditBox).string
                let passnum = this.officelogin.getChildByName("passeditbox").getComponent(cc.EditBox).string
                if (phonenum == "") {
                        hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip32"))
                        return
                }
                if (capchanum == "") {
                        hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("capchaed"))
                        return
                }
                if (passnum == "" || this.passJudge(passnum)) {
                        hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip36"))
                        return
                }
                this.ensurebtn.interactable = false
                let callback = (responsedata) => {
                        cc.log("responsedata", responsedata)
                        if (this.timer) {
                                // //不要重设计时器
                                // //clearInterval(this.timer);
                        }
                        if (responsedata.status != 0) {
                                hqq.logMgr.log("officeloginEnsure callback responsedata", JSON.stringify(responsedata), " phonenum=", phonenum, " userid=", hqq.gameGlobal.pay.user_id)
                                this.ensurebtn.interactable = true
                                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip37"));
                        } else {
                                if (hqq.app.pinpai == 'debi') {
                                        hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip38"));
                                } else if (hqq.app.pinpai == "ninetwo") {
                                        hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("bindphonesucess"));
                                } else if (hqq.app.pinpai == "tianqi") {
                                        hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("bindphonesucess"));
                                } else {
                                        hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("bindphonesucess"));
                                }
                                hqq.app.setPlayerinfo({ phone_number: phonenum });
                                this.onClickExit();
                        }
                }
                let failcallback = (status, forcejump, url, err, readyState) => {
                        hqq.logMgr.log("officeloginEnsure failcallback", status, forcejump, url, err, readyState)
                        this.ensurebtn.interactable = true
                        hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip40") + status);
                }
                let payUrl = hqq.gameGlobal.pay.pay_host + "/api/activity/bindPhone";
                let dataStr = "user_id=" + hqq.gameGlobal.pay.user_id;
                if (hqq.gameGlobal.pay.user_name) {
                        dataStr = dataStr + "&user_name=" + hqq.gameGlobal.pay.user_name;
                } else {
                        dataStr = dataStr + "&user_name=" + hqq.gameGlobal.pay.user_id; //if user_name is null, take the user_id instead, otherwise will get error.
                }
                dataStr = dataStr + "&package_id=" + hqq.gameGlobal.pay.package_id;
                dataStr = dataStr + "&token=e40f01afbb1b9ae3dd6747ced5bca532";
                dataStr = dataStr + "&phone_number=" + phonenum;
                dataStr = dataStr + "&captcha=" + yanzhenmanum;
                dataStr = dataStr + "&code=" + capchanum;
                dataStr = dataStr + "&password=" + passnum;
                dataStr = dataStr + "&center_token=" + hqq.gameGlobal.token;
                dataStr = dataStr + "&center_auth=" + hqq.gameGlobal.token
                hqq.http.sendXMLHttpRequest({
                        method: 'POST',
                        urlto: payUrl,
                        param: dataStr,
                        callback: callback,
                        needJsonParse: true,
                        failcallback: failcallback,
                })
        }
        resetpassEnsure() {
                this.ensurebtn.interactable = false
                let phonenum = this.resetpass.getChildByName("phoneeditbox").getComponent(cc.EditBox).string
                let yanzhenmanum = this.resetpass.getChildByName("yanzheneditbox").getComponent(cc.EditBox).string
                let capchanum = this.resetpass.getChildByName("capchaeditbox").getComponent(cc.EditBox).string
                let passnum = this.resetpass.getChildByName("passeditbox").getComponent(cc.EditBox).string
                if (phonenum == "") {
                        hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip32"))
                        return
                }
                if (yanzhenmanum == "") {
                        hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("entercode"))
                        return
                }
                if (capchanum == "") {
                        hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("capchaed"))
                        return
                }
                if (passnum == "" || this.passJudge(passnum)) {
                        hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip36"))
                        return
                }

                let callback = (data) => {
                        if (data.code == 200) {
                                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip41"))
                                this.onClickExit()
                        } else {
                                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip42") + data.msg)
                        }
                }

                let failcallback = (status, forcejump, url, err, readyState) => {
                        hqq.logMgr.log("officeloginEnsure failcallback", status, forcejump, url, err, readyState)
                        this.ensurebtn.interactable = true
                        hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("requestfail") + status + ",err:" + err)
                }

                let endurl = hqq.app.getIpPostEndUrl(4)
                let data = {
                        phone_number: phonenum,
                        id: hqq.gameGlobal.player.id,
                        code: capchanum,
                        password: passnum,
                        captcha: yanzhenmanum,
                        token: hqq.gameGlobal.token,
                }
                hqq.http.sendXMLHttpRequest({
                        method: 'POST',
                        urlto: hqq.app.server + endurl,
                        param: data,
                        callback: callback,
                        failcallback: failcallback,
                        needJsonParse: true,
                })
        }
        onClickExit() {
                if (JSB) {
                        let fullPath = jsb.fileUtils.getWritablePath() + "yanzhenma.png";
                        jsb.fileUtils.isFileExist(fullPath) && jsb.fileUtils.removeFile(fullPath);
                        if (this.temptex) {
                                cc.assetManager.releaseAsset(this.temptex);
                        }
                }
                this.node.destroy()
        }
        onClickSure() {
                this.ensurefunc()
        }
}