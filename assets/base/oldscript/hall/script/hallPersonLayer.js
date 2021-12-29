

cc.Class({
    extends: cc.Component,

    properties: {
        txt_se: cc.Node,
        txt_bgm: cc.Node,
        versionlabel: cc.Label,
        phonebindbtn: cc.Node,
        alipaybindbtn: cc.Node,
        yinhangkabindbtn: cc.Node,

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
        this.UILoad()
        this.num0 = 0
        this.num1 = 0
        let str = "版本m:" + (hqq.localStorage.globalGet(hqq.app.versionKey) || "1.0.0")
        // if (cc.sys.isNative && cc.sys.os != "Windows" && hqq.reflect.getClipboard()) {
        //     str += "\n剪切板：" + hqq.reflect.getClipboard()
        // }
        if (hqq.app.reginIpData) {
            str += "\n注册ip-api:" + hqq.app.reginIpData.query + ",地址:" + hqq.app.reginIpData.regionName
        }
        if (hqq.app.reginIpData2) {
            str += "\n注册ipinfo:" + hqq.app.reginIpData2.ip + "地址:" + hqq.app.reginIpData2.region
        }
        if (hqq.gameGlobal.ipapiData) {
            str += "\n登陆ip-api:" + hqq.gameGlobal.ipapiData.query + ",地址" + hqq.gameGlobal.ipapiData.regionName
        }
        if (hqq.gameGlobal.ipinfoData) {
            str += "\n登陆ipinfo:" + hqq.gameGlobal.ipinfoData.ip + ",地址" + hqq.gameGlobal.ipinfoData.region
        }
        this.versionlabel.string = str
        if (cc.Button.prototype.setSoundEffect) {
            this.txt_bgm.getComponent(cc.Button).setSoundEffect(false)
            this.txt_se.getComponent(cc.Button).setSoundEffect(false)
        }
    },

    start() {
    },
    // UI动态加载
    UILoad() {
        if(!cc.isValid(this.node)){
            console.log("hallPersonLayer UILoad 节点不存在")
            return;
        }
        let title_personal = cc.find("personallayer/title_personal")
        let personal_form = cc.find("personallayer/person/personal_form")
        let phone = cc.find("personallayer/person/personal_form/phone")
        let alipay = cc.find("personallayer/person/personal_form/alipay")
        let yinhangka = cc.find("personallayer/person/personal_form/yinhangka")
        phone.getComponent(cc.Label).string = hqq.getTip("notbindphone")
        // alipay.getComponent(cc.Label).string = hqq.getTip("notbindaliypay")
        alipay.getComponent(cc.Label).string = hqq.getTip("notbindusdt")
        yinhangka.getComponent(cc.Label).string = hqq.getTip("notbindyinhangka")

        let headfram3 = cc.find("personallayer/person/headfram3")
        let changebt = cc.find("personallayer/person/changebt")
        let btn_copy = cc.find("personallayer/person/btn_copy")
        let phone_btn_bind = cc.find("personallayer/person/phone_btn_bind")
        let alipay_btn_bind = cc.find("personallayer/person/alipay_btn_bind")
        let yinghangka_btn_bind = cc.find("personallayer/person/yinghangka_btn_bind")
        let qiehuan = cc.find("personallayer/person/qiehuan")
        let txt_se = cc.find("personallayer/set/txt_se")
        let txt_bgm = cc.find("personallayer/set/txt_bgm")
        let yinyuetogglenode = cc.find("personallayer/set/yinyuetoggle")
        let yinyuetoggle = yinyuetogglenode.getComponent(cc.Toggle)
        let yinxiaotogglenode = cc.find("personallayer/set/yinxiaotoggle")
        let yinxiaotoggle = yinxiaotogglenode.getComponent(cc.Toggle)

        let closebtn = cc.find("personallayer/p_new_saver_return")
        let background = cc.find("personallayer/personal_di")

        if (hqq.app.pinpai == "fuxin" ) {
            let xpath = "base/fuxin/img/"
            let blpath = "base/language/" + hqq.language + "/fuxin/"
            let hpath = "fuxin/img/"
            let hlpath = "language/" + hqq.language + "/fuxin/"
            hqq.addNode(background, { path: xpath + "bg", widget: { left: 0, right: cc.winSize.width / 2 }, anchorX: 1, type: cc.Sprite.Type.SLICED })
            hqq.addNode(background, { path: xpath + "bg", widget: { right: 0, left: cc.winSize.width / 2, }, anchorX: 1, scaleX: -1, type: cc.Sprite.Type.SLICED })
            hqq.setSprite(title_personal, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "biaoti", widget: { top: 13 } })
            hqq.addNode(background, { path: xpath + "di4", widget: { left: 300, right: 20, top: 100, bottom: 20 }, type: cc.Sprite.Type.SLICED })
            hqq.addNode(background, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "fgx", widget: { right: 400 } })
            // let personal = cc.find("personallayer/person")
            hqq.addNode(personal_form, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "nc", x: -110, y: 190 })
            hqq.addNode(personal_form, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "id", x: -100, y: 100 })
            hqq.addNode(personal_form, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "sj", x: -110, y: 5 })
            hqq.addNode(personal_form, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "ustd", x: -120, y: -90 })
            hqq.addNode(personal_form, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "yhk", x: -125, y: -190 })
            hqq.addNode(personal_form, { path: xpath + "srk", x: 55, y: 190, width: 250, zIndex: -1, type: cc.Sprite.Type.SLICED })
            hqq.addNode(personal_form, { path: xpath + "srk", x: 55, y: 100, width: 250, zIndex: -1, type: cc.Sprite.Type.SLICED })
            hqq.addNode(personal_form, { path: xpath + "srk", x: 55, y: 5, width: 250, zIndex: -1, type: cc.Sprite.Type.SLICED })
            hqq.addNode(personal_form, { path: xpath + "srk", x: 55, y: -90, width: 250, zIndex: -1, type: cc.Sprite.Type.SLICED })
            hqq.addNode(personal_form, { path: xpath + "srk", x: 80, y: -190, width: 300, zIndex: -1, type: cc.Sprite.Type.SLICED })

            hqq.setBtn(closebtn, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "fanhui", widget: { top: 0, left: 0 } })
            hqq.setBtn(changebt, { path: xpath + "anniu3", widget: { left: 31 } })
            hqq.addNode(changebt, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "djqhtx" })
            hqq.setBtn(btn_copy, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "anniu5" })
            hqq.addNode(btn_copy, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "fz" })
            hqq.setBtn(phone_btn_bind, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "anniu5" })
            hqq.addNode(phone_btn_bind, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "bd" })
            hqq.setBtn(alipay_btn_bind, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "anniu5" })
            hqq.addNode(alipay_btn_bind, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "bd" })
            hqq.setBtn(yinghangka_btn_bind, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "anniu5" })
            hqq.addNode(yinghangka_btn_bind, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "bd" })

            hqq.setBtn(qiehuan, { path: xpath + "anniu4", x: -120 })
            hqq.addNode(qiehuan, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "qhzh" })

            hqq.setSprite(txt_se, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "yx" })
            hqq.setSprite(txt_bgm, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "yy" })

            hqq.setSprite(headfram3, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "txk" })
            hqq["hall_"+hqq.app.pinpai].load(hlpath + "k", cc.SpriteFrame, (err, frame) => {
                if (err) {
                    cc.log("加载图片失败", err)
                    return;
                }
                if(!cc.isValid(this.node))return;
                yinyuetoggle.checkMark.spriteFrame = frame;
                yinxiaotoggle.checkMark.spriteFrame = frame;
            })
            hqq["hall_"+hqq.app.pinpai].load(hlpath + "g", cc.SpriteFrame, (err, frame) => {
                if (err) {
                    cc.log("加载图片失败", err)
                    return;
                }
                if(!cc.isValid(this.node))return;
                yinyuetoggle.target.getComponent(cc.Sprite).spriteFrame = frame;
                yinxiaotoggle.target.getComponent(cc.Sprite).spriteFrame = frame;
            })

        } else if (hqq.app.pinpai == "xingui") {
            let xpath = "xingui/img/"
            let xlpath = "language/" + hqq.language + "/xingui/"
            hqq.setSprite(title_personal, { Res:hqq["hall_"+hqq.app.pinpai],path: xpath + "d_title", widget: { top: 15, left: 30 } })
            hqq.addNode(title_personal, { Res:hqq["hall_"+hqq.app.pinpai],path: xlpath + "gerxx", y: -5 })
            hqq.setSprite(background, { Res:hqq["hall_"+hqq.app.pinpai],path: "xingui/bg2", widget: { left: 0, right: 0, top: 0, bottom: 0 } })
            hqq.addNode(background, { Res:hqq["hall_"+hqq.app.pinpai],path: xpath + "xian", widget: { right: 400 } })

            hqq.setBtn(closebtn, { Res:hqq["hall_"+hqq.app.pinpai],path: xpath + "btn_fh", widget: { closeleft: true, right: 10, top: 10 } })
            hqq.setSprite(personal_form, { Res:hqq["hall_"+hqq.app.pinpai],path: xlpath + "personform" })
            hqq.setWidget(headfram3, { left: 41, top: 100 })
            hqq.setBtn(changebt, { Res:hqq["hall_"+hqq.app.pinpai],path: xpath + "btn_4", widget: { left: 31, top: 290 } })
            hqq.addNode(changebt, { string: "personch", fontSize: 30, y: -9 })
            hqq.setBtn(btn_copy, { Res:hqq["hall_"+hqq.app.pinpai],path: xpath + "btn_3" })
            hqq.addNode(btn_copy, { string: "fz", fontSize: 25, y: -9 })
            hqq.setBtn(phone_btn_bind, { Res:hqq["hall_"+hqq.app.pinpai],path: xpath + "btn_3" })
            hqq.addNode(phone_btn_bind, { string: "bd", fontSize: 25, y: -9 })
            hqq.setBtn(alipay_btn_bind, { Res:hqq["hall_"+hqq.app.pinpai],path: xpath + "btn_3" })
            hqq.addNode(alipay_btn_bind, { string: "bd", fontSize: 25, y: -9 })
            hqq.setBtn(yinghangka_btn_bind, { Res:hqq["hall_"+hqq.app.pinpai],path: xpath + "btn_3" })
            hqq.addNode(yinghangka_btn_bind, { string: "bd", fontSize: 25, y: -9 })
            hqq.setBtn(qiehuan, { path: "base/xingui/img/btn_1", x: -120 })
            hqq.addNode(qiehuan, { Res:hqq["hall_"+hqq.app.pinpai],path: xlpath + "qiehzh" })

            hqq.setSprite(txt_se, { Res:hqq["hall_"+hqq.app.pinpai],path: xlpath + "yx" })
            hqq.setSprite(txt_bgm, { Res:hqq["hall_"+hqq.app.pinpai],path: xlpath + "yy" })

            hqq["hall_"+hqq.app.pinpai].load(xlpath + "k", cc.SpriteFrame, (err, frame) => {
                if (err) {
                    cc.log("加载图片失败", err)
                    return;
                }
                if(!cc.isValid(this.node))return;
                yinyuetoggle.checkMark.spriteFrame = frame;
                yinxiaotoggle.checkMark.spriteFrame = frame;
            })
            hqq["hall_"+hqq.app.pinpai].load(xlpath + "g", cc.SpriteFrame, (err, frame) => {
                if (err) {
                    cc.log("加载图片失败", err)
                    return;
                }
                if(!cc.isValid(this.node))return;
                yinyuetoggle.target.getComponent(cc.Sprite).spriteFrame = frame;
                yinxiaotoggle.target.getComponent(cc.Sprite).spriteFrame = frame;
            })
        } else if (hqq.app.pinpai == "xinsheng") {
            let xpath = "base/xinsheng/img/"
            let xlpath = "language/" + hqq.language + "/xinsheng/"
            hqq.setWidget(headfram3, { left: 83 })
            hqq.setBtn(closebtn, { Res:hqq["hall_"+hqq.app.pinpai],path: "xinsheng/img/btnclose", widget: { left: 0, top: 0 } })
            hqq.setSprite(background, { Res:hqq["hall_"+hqq.app.pinpai],path: "xinsheng/bigimg/personback2", widget: { left: 0, right: 0, top: 0, bottom: 0 } })
            hqq.setSprite(title_personal, { Res:hqq["hall_"+hqq.app.pinpai],path: xlpath + "grxx", widget: { top: 15, left: 330 } })
            hqq.setSprite(personal_form, { Res:hqq["hall_"+hqq.app.pinpai],path: xlpath + "personform" }) // , position: { x: -149, y: 20 }
            hqq.setBtn(changebt, { Res:hqq["hall_"+hqq.app.pinpai],path: xlpath + "changebt", widget: { left: 80 } })
            hqq.setBtn(btn_copy, { Res:hqq["hall_"+hqq.app.pinpai],path: xlpath + "btn_copy" }) // , position: { x: 117, y: 120 }
            hqq.setBtn(phone_btn_bind, { Res:hqq["hall_"+hqq.app.pinpai],path: xlpath + "btn_bind" }) // , position: { x: 117, y: 25 }
            hqq.setBtn(alipay_btn_bind, { Res:hqq["hall_"+hqq.app.pinpai],path: xlpath + "btn_bind" })
            hqq.setBtn(yinghangka_btn_bind, { Res:hqq["hall_"+hqq.app.pinpai],path: xlpath + "btn_bind" }) // , position: { x: 130, y: -170 }
            hqq.setBtn(qiehuan, { path: xpath + "btnback" })
            let node = new cc.Node();
            hqq.setSprite(node, { Res:hqq["hall_"+hqq.app.pinpai],path: xlpath + "qhzh" ,y:10})
            qiehuan.addChild(node)
            hqq.setSprite(txt_se, { Res:hqq["hall_"+hqq.app.pinpai],path: xlpath + "txt_se" })
            hqq.setSprite(txt_bgm, { Res:hqq["hall_"+hqq.app.pinpai],path: xlpath + "txt_bgm" })
            hqq["hall_"+hqq.app.pinpai].load(xlpath + "opensp", cc.SpriteFrame, (err, frame) => {
                if (err) {
                    cc.log("加载图片失败", err)
                    return;
                }
                if(!cc.isValid(this.node))return;
                yinyuetoggle.checkMark.spriteFrame = frame;
                yinxiaotoggle.checkMark.spriteFrame = frame;
            })
            hqq["hall_"+hqq.app.pinpai].load(xlpath + "closesp", cc.SpriteFrame, (err, frame) => {
                if (err) {
                    cc.log("加载图片失败", err)
                    return;
                }
                if(!cc.isValid(this.node))return;
                yinyuetoggle.target.getComponent(cc.Sprite).spriteFrame = frame;
                yinxiaotoggle.target.getComponent(cc.Sprite).spriteFrame = frame;
            })

        } else if (hqq.app.pinpai == "xinlong") {
            let xpath = "base/xinsheng/img/"
            let xlpath = "language/" + hqq.language + "/xinlong/"
            hqq.setWidget(headfram3, { left: 83 })
            hqq.setBtn(closebtn, { Res:hqq["hall_"+hqq.app.pinpai],path: "xinlong/img/btnclose", widget: { left: 0, top: 0 } })
            hqq.setSprite(background, { Res:hqq["hall_"+hqq.app.pinpai],path: "xinlong/bigimg/personback2", widget: { left: 0, right: 0, top: 0, bottom: 0 } })
            hqq.setSprite(title_personal, { Res:hqq["hall_"+hqq.app.pinpai],path: xlpath + "grxx", widget: { top: 15, left: 330 } })
            hqq.setSprite(personal_form, { Res:hqq["hall_"+hqq.app.pinpai],path: xlpath + "personform" }) // , position: { x: -149, y: 20 }
            hqq.setBtn(changebt, { Res:hqq["hall_"+hqq.app.pinpai],path: xlpath + "changebt", widget: { left: 80 } })
            hqq.setBtn(btn_copy, { Res:hqq["hall_"+hqq.app.pinpai],path: xlpath + "btn_copy" }) // , position: { x: 117, y: 120 }
            hqq.setBtn(phone_btn_bind, { Res:hqq["hall_"+hqq.app.pinpai],path: xlpath + "btn_bind" }) // , position: { x: 117, y: 25 }
            hqq.setBtn(alipay_btn_bind, { Res:hqq["hall_"+hqq.app.pinpai],path: xlpath + "btn_bind" })
            hqq.setBtn(yinghangka_btn_bind, { Res:hqq["hall_"+hqq.app.pinpai],path: xlpath + "btn_bind" }) // , position: { x: 130, y: -170 }
            hqq.setBtn(qiehuan, { path: xpath + "btnback" })
            let node = new cc.Node();
            hqq.setSprite(node, { Res:hqq["hall_"+hqq.app.pinpai],path: xlpath + "qhzh",y:10 })
            qiehuan.addChild(node)
            hqq.setSprite(txt_se, { Res:hqq["hall_"+hqq.app.pinpai],path: xlpath + "txt_se" })
            hqq.setSprite(txt_bgm, { Res:hqq["hall_"+hqq.app.pinpai],path: xlpath + "txt_bgm" })
            hqq["hall_"+hqq.app.pinpai].load(xlpath + "opensp", cc.SpriteFrame, (err, frame) => {
                if (err) {
                    cc.log("加载图片失败", err)
                    return;
                }
                if(!cc.isValid(this.node))return;
                yinyuetoggle.checkMark.spriteFrame = frame;
                yinxiaotoggle.checkMark.spriteFrame = frame;
            })
            hqq["hall_"+hqq.app.pinpai].load(xlpath + "closesp", cc.SpriteFrame, (err, frame) => {
                if (err) {
                    cc.log("加载图片失败", err)
                    return;
                }
                if(!cc.isValid(this.node))return;
                yinyuetoggle.target.getComponent(cc.Sprite).spriteFrame = frame;
                yinxiaotoggle.target.getComponent(cc.Sprite).spriteFrame = frame;
            })

        } else if (hqq.app.pinpai == "juding" ) {
            let xpath = "base/juding/img/"
            let blpath = "base/language/" + hqq.language + "/juding/"
            let hpath = "juding/img/"
            let hbpath = "juding/bigimg/"
            let hlpath = "language/" + hqq.language + "/juding/"
            hqq.setSprite(background, { Res:hqq["hall_"+hqq.app.pinpai],path: hbpath + "jd_personal_bg" ,widget: { left: 0, right: 0, top: 0, bottom: 0 }})
            // hqq.addNode(background, { path: xpath + "bg", widget: { right: 0, left: cc.winSize.width / 2, }, anchorX: 1, scaleX: -1, type: cc.Sprite.Type.SLICED })
            hqq.setSprite(title_personal, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "jd_title_personal", widget: { top: 11,left:162 } })
            cc.find("personallayer/person/personal_form/nick").color = cc.color("#546277");
            cc.find("personallayer/person/personal_form/nick").y = 180;
            cc.find("personallayer/person/personal_form/nick").x = -50;
            cc.find("personallayer/person/personal_form/id").color = cc.color("#546277");
            cc.find("personallayer/person/personal_form/id").y = 90;
            cc.find("personallayer/person/personal_form/id").x = -50;
            cc.find("personallayer/person/personal_form/phone").color = cc.color("#546277");
            cc.find("personallayer/person/personal_form/phone").y = 0;
            cc.find("personallayer/person/personal_form/phone").x = -50;
            cc.find("personallayer/person/personal_form/alipay").color = cc.color("#546277");
            cc.find("personallayer/person/personal_form/alipay").x = -50;
            cc.find("personallayer/person/personal_form/yinhangka").color = cc.color("#546277");
            cc.find("personallayer/person/personal_form/yinhangka").x = -50;
            cc.find("personallayer/person/personal_form/yinhangka").y = -175;
            hqq.setSprite(personal_form, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "jd_personal_form"})

            hqq.setBtn(closebtn, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "jd_p_btn_return", widget: { top: 0, left: 0 } })
            hqq.setBtn(changebt, { path: xpath + "jd_p_btn_1_2", widget: { left: 90 } })
            hqq.addNode(changebt, { string:"personch" , fontSize:24,color:cc.color("#94510A"),y:-10,bold:true})
            hqq.setBtn(btn_copy, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "jd_p_btn_1_1" })
            hqq.addNode(btn_copy, { string:"fz" , fontSize:24,color:cc.color("#94510A"),y:-10,bold:true })
            hqq.setBtn(phone_btn_bind, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "jd_p_btn_1_1" })
            hqq.addNode(phone_btn_bind, { string: "bd" , fontSize:24,color:cc.color("#94510A"),y:-10,bold:true })
            hqq.setBtn(alipay_btn_bind, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "jd_p_btn_1_1" })
            hqq.addNode(alipay_btn_bind, { string: "bd" , fontSize:24,color:cc.color("#94510A"),y:-10,bold:true })
            hqq.setBtn(yinghangka_btn_bind, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "jd_p_btn_1_1" })
            hqq.addNode(yinghangka_btn_bind, { string: "bd" , fontSize:24,color:cc.color("#94510A"),y:-10,bold:true })

            hqq.setBtn(qiehuan, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "jd_p_btn_2", x: 120 })
            hqq.addNode(qiehuan, { string:"qiehuan" ,fontSize:24,color:cc.color("#FFFFFF"),y:-10,bold:true})

            hqq.setSprite(txt_se, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "jd_personal_txt_se" ,x:375,y:-61})
            hqq.setSprite(txt_bgm, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "jd_personal_txt_music",x:375,y:51 })

            hqq.setSprite(headfram3, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "jd_personal_headframe_1",widget: { left: 90 } })
            yinyuetoggle.node.setPosition(532,46);
            yinxiaotoggle.node.setPosition(532,-62);
            
            hqq["hall_"+hqq.app.pinpai].load(hlpath + "jd_personal_turnOn", cc.SpriteFrame, (err, frame) => {
                if (err) {
                    console.log("加载图片失败", err)
                    return;
                }
                if(!cc.isValid(this.node))return;
                yinyuetoggle.checkMark.spriteFrame = frame;
                yinxiaotoggle.checkMark.spriteFrame = frame;
                if( hqq.audioMgr && hqq.audioMgr.getBgState()){
                    yinyuetoggle.node.getChildByName("Background").active = false;
                } else {
                    yinyuetoggle.node.getChildByName("Background").active = true;
                }
    
                if( hqq.audioMgr && hqq.audioMgr.getEffectState()){
                    yinxiaotoggle.node.getChildByName("Background").active = false;
                } else {
                    yinxiaotoggle.node.getChildByName("Background").active = true;
                }
            })
            hqq["hall_"+hqq.app.pinpai].load(hlpath + "jd_personal_turnOff", cc.SpriteFrame, (err, frame) => {
                if (err) {
                    console.log("加载图片失败", err)
                    return;
                }
                if(!cc.isValid(this.node))return;
                yinyuetoggle.target.getComponent(cc.Sprite).spriteFrame = frame;
                yinxiaotoggle.target.getComponent(cc.Sprite).spriteFrame = frame;
                if( hqq.audioMgr && hqq.audioMgr.getBgState()){
                    yinyuetoggle.node.getChildByName("Background").active = false;
                } else {
                    yinyuetoggle.node.getChildByName("Background").active = true;
                }
    
                if( hqq.audioMgr && hqq.audioMgr.getEffectState()){
                    yinxiaotoggle.node.getChildByName("Background").active = false;
                } else {
                    yinxiaotoggle.node.getChildByName("Background").active = true;
                }
            })

        }  else if (hqq.app.pinpai == "huaxing" ) {
            let xpath = "base/huaxing/img/"
            let blpath = "base/language/" + hqq.language + "/huaxing/"
            let hpath = "huaxing/img/"
            let hbpath = "huaxing/bigimg/"
            let hlpath = "language/" + hqq.language + "/huaxing/"
            let scalex = cc.view.getVisibleSize().width/cc.view.getDesignResolutionSize().width;
            hqq.setSprite(background, { Res:hqq["hall_"+hqq.app.pinpai],path: hbpath + "bg" ,widget: { left: 0, right: 0, top: 0, bottom: 0 }})
            let leftd_ggtc = hqq.addNode(background, { path: xpath + "d_ggtc", type: cc.Sprite.Type.SLICED,width:(763 * scalex)+((493 * scalex)-493 ),height:616 })
            hqq.setWidget(leftd_ggtc,{ left:17,top:114})
            let rightd_ggtc = hqq.addNode(background, { path: xpath + "d_ggtc", type: cc.Sprite.Type.SLICED,width:493,height:616 })
            hqq.setWidget(rightd_ggtc,{ top:114 ,right:32})
            hqq.addNode(background, { Res:hqq["hall_"+hqq.app.pinpai],path: hbpath + "d_top", widget: { top:0,left:0,right:0 } })
            hqq.setSprite(title_personal, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "grxx", widget: { top: 11,horizontalCenter:0 } })
            // cc.find("personallayer/person/personal_form/nick").color = cc.color("#546277");
            hqq.addNode(cc.find("personallayer/person/personal_form"),{path: xpath + "4",x:-10,y:180,width:230,height:40, type: cc.Sprite.Type.SLICED,zIndex: -1});
            hqq.addNode(cc.find("personallayer/person/personal_form"),{string: "grxxnick",x:-165,y:168, color: cc.color(232,169,98),zIndex: -2,fontSize:24,bold:true});
            cc.find("personallayer/person/personal_form/nick").y = 180;
            cc.find("personallayer/person/personal_form/nick").x = -120;
            // cc.find("personallayer/person/personal_form/id").color = cc.color("#546277");
            hqq.addNode(cc.find("personallayer/person/personal_form"),{path: xpath + "4",x:-10,y:90,width:230,height:40, type: cc.Sprite.Type.SLICED,zIndex: -1});
            hqq.addNode(cc.find("personallayer/person/personal_form"),{string: "grxxid",x:-165,y:78, color: cc.color(232,169,98),zIndex: -2,fontSize:24,bold:true});
            cc.find("personallayer/person/personal_form/id").y = 90;
            cc.find("personallayer/person/personal_form/id").x = -120;
            // cc.find("personallayer/person/personal_form/phone").color = cc.color("#546277");
            hqq.addNode(cc.find("personallayer/person/personal_form"),{path: xpath + "4",x:-10,y:0,width:230,height:40, type: cc.Sprite.Type.SLICED,zIndex: -1});
            hqq.addNode(cc.find("personallayer/person/personal_form"),{string: "grxxphone",x:-165,y:-12, color: cc.color(232,169,98),zIndex: -2,fontSize:24,bold:true});
            cc.find("personallayer/person/personal_form/phone").y = 0;
            cc.find("personallayer/person/personal_form/phone").x = -120;
            // cc.find("personallayer/person/personal_form/alipay").color = cc.color("#546277");
            hqq.addNode(cc.find("personallayer/person/personal_form"),{path: xpath + "4",x:5,y:-90,width:265,height:40, type: cc.Sprite.Type.SLICED,zIndex: -1});
            hqq.addNode(cc.find("personallayer/person/personal_form"),{string: "grxxusdt",x:-195,y:-102, color: cc.color(232,169,98),zIndex: -2,fontSize:24,bold:true});
            cc.find("personallayer/person/personal_form/alipay").x = -120;
            // cc.find("personallayer/person/personal_form/yinhangka").color = cc.color("#546277");
            hqq.addNode(cc.find("personallayer/person/personal_form"),{path: xpath + "4",x:5,y:-175,width:265,height:40, type: cc.Sprite.Type.SLICED,zIndex: -1});
            hqq.addNode(cc.find("personallayer/person/personal_form"),{string: "grxxyhk",x:-175,y:-187, color: cc.color(232,169,98),zIndex: -2,fontSize:24,bold:true});
            cc.find("personallayer/person/personal_form/yinhangka").x = -120;
            cc.find("personallayer/person/personal_form/yinhangka").y = -175;

            hqq.setBtn(closebtn, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "btn_fh", widget: { top: 0, left: 0 } })
            hqq.setBtn(changebt, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "7", widget: { left: 90 } })
            hqq.setBtn(btn_copy, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "12" ,x:30})
            hqq.setBtn(phone_btn_bind, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "11" ,x:30})
            hqq.setBtn(alipay_btn_bind, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "11" ,x:30})
            hqq.setBtn(yinghangka_btn_bind, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "11" ,x:30,y:-175})

            hqq.setBtn(qiehuan, { path: xpath + "btn_2", x: -150 })
            hqq.addNode(qiehuan, { string:"qiehuan" ,fontSize:45,lineHeight:50,y:-5,bold:true})

            hqq.setSprite(txt_se, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "2" ,x:303,y:-31})
            hqq.setSprite(txt_bgm, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "1",x:303,y:81 })

            hqq.setSprite(headfram3, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "3",widget: { left: 80 } })
            yinyuetoggle.node.setPosition(460,76);
            yinxiaotoggle.node.setPosition(460,-32);

            hqq.addNode(yinyuetoggle.node.getChildByName("Background"),{Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "24" ,x:40})
            hqq.addNode(yinyuetoggle.node.getChildByName("checkmark"),{Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "24" ,x:-40})
            hqq.addNode(yinxiaotoggle.node.getChildByName("Background"),{Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "24" ,x:40})
            hqq.addNode(yinxiaotoggle.node.getChildByName("checkmark"),{Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "24" ,x:-40})
            
            hqq["hall_"+hqq.app.pinpai].load(hpath + "23", cc.SpriteFrame, (err, frame) => {
                if (err) {
                    console.log("加载图片失败", err)
                    return;
                }
                if(!cc.isValid(this.node))return;
                yinyuetoggle.checkMark.spriteFrame = frame;
                yinxiaotoggle.checkMark.spriteFrame = frame;
                if( hqq.audioMgr && hqq.audioMgr.getBgState()){
                    yinyuetoggle.node.getChildByName("Background").active = false;
                } else {
                    yinyuetoggle.node.getChildByName("Background").active = true;
                }
    
                if( hqq.audioMgr && hqq.audioMgr.getEffectState()){
                    yinxiaotoggle.node.getChildByName("Background").active = false;
                } else {
                    yinxiaotoggle.node.getChildByName("Background").active = true;
                }
            })
            hqq["hall_"+hqq.app.pinpai].load(hpath + "22", cc.SpriteFrame, (err, frame) => {
                if (err) {
                    console.log("加载图片失败", err)
                    return;
                }
                if(!cc.isValid(this.node))return;
                yinyuetoggle.target.getComponent(cc.Sprite).spriteFrame = frame;
                yinxiaotoggle.target.getComponent(cc.Sprite).spriteFrame = frame;
                if( hqq.audioMgr && hqq.audioMgr.getBgState()){
                    yinyuetoggle.node.getChildByName("Background").active = false;
                } else {
                    yinyuetoggle.node.getChildByName("Background").active = true;
                }
    
                if( hqq.audioMgr && hqq.audioMgr.getEffectState()){
                    yinxiaotoggle.node.getChildByName("Background").active = false;
                } else {
                    yinxiaotoggle.node.getChildByName("Background").active = true;
                }
            })

        } else if(hqq.app.pinpai == "tianqi") {
            let hlpath = "language/" + hqq.language + "/img/"
            let hlbpath = "language/" + hqq.language + "/bigimg/"
            hqq.setWidget(headfram3, { left: 83 })
            hqq.setBtn(closebtn, { path: "base/tianqi/img/p_new_saver_return" })
            hqq.setSprite(background, { path: "bigimg/tianqi/personal_di", widget: { left: 0, right: 0, top: 0, bottom: 0 } })
            hqq.setSprite(title_personal, { Res:hqq["hall_test"],path: hlbpath + "title_personal" })
            hqq.setSprite(personal_form, { Res:hqq["hall_test"],path: hlpath + "personal_form" })

            hqq.setBtn(changebt, { Res:hqq["hall_test"],path: hlpath + "changebt", widget: { left: 86 } })
            hqq.setBtn(btn_copy, { Res:hqq["hall_test"],path: hlpath + "btn_copy" })
            hqq.setBtn(phone_btn_bind, { Res:hqq["hall_test"],path: hlpath + "btn_bind" })
            hqq.setBtn(alipay_btn_bind, { Res:hqq["hall_test"],path: hlpath + "btn_bind" })
            hqq.setBtn(yinghangka_btn_bind, { Res:hqq["hall_test"],path: hlpath + "btn_bind" })
            hqq.setBtn(qiehuan, { Res:hqq["hall_test"],path: hlpath + "qiehuan" })
            hqq.setSprite(txt_se, { Res:hqq["hall_test"],path: hlpath + "txt_se" })
            hqq.setSprite(txt_bgm, { Res:hqq["hall_test"],path: hlpath + "txt_bgm" })
            hqq["hall_test"].load(hlpath + "opensp", cc.SpriteFrame, (err, frame) => {
                if (err) {
                    console.log("加载图片失败", err)
                    return;
                }
                if(!cc.isValid(this.node))return;
                yinyuetoggle.checkMark.spriteFrame = frame;
                yinxiaotoggle.checkMark.spriteFrame = frame;
            })
            hqq["hall_test"].load(hlpath + "closesp", cc.SpriteFrame, (err, frame) => {
                if (err) {
                    console.log("加载图片失败", err)
                    return;
                }
                if(!cc.isValid(this.node))return;
                yinyuetoggle.target.getComponent(cc.Sprite).spriteFrame = frame;
                yinxiaotoggle.target.getComponent(cc.Sprite).spriteFrame = frame;
            })
        } else {
            let hlpath = "language/" + hqq.language + "/img/"
            let hlbpath = "language/" + hqq.language + "/bigimg/"
            hqq.setWidget(headfram3, { left: 83 })
            hqq.setBtn(closebtn, { Res:hqq["hall_test"],path: "test/img/p_new_saver_return" })
            hqq.setSprite(background, { Res:hqq["hall_test"],path: "test/bigimg/personal_di", widget: { left: 0, right: 0, top: 0, bottom: 0 } })
            hqq.setSprite(title_personal, {Res:hqq["hall_test"],path: hlbpath + "title_personal" })
            hqq.setSprite(personal_form, {Res:hqq["hall_test"],path: hlpath + "personal_form" })

            hqq.setBtn(changebt, {Res:hqq["hall_test"],path: hlpath + "changebt", widget: { left: 86 } })
            hqq.setBtn(btn_copy, {Res:hqq["hall_test"],path: hlpath + "btn_copy" })
            hqq.setBtn(phone_btn_bind, {Res:hqq["hall_test"],path: hlpath + "btn_bind" })
            hqq.setBtn(alipay_btn_bind, {Res:hqq["hall_test"],path: hlpath + "btn_bind" })
            hqq.setBtn(yinghangka_btn_bind, {Res:hqq["hall_test"],path: hlpath + "btn_bind" })
            hqq.setBtn(qiehuan, {Res:hqq["hall_test"],path: hlpath + "qiehuan" })
            hqq.setSprite(txt_se, {Res:hqq["hall_test"],path: hlpath + "txt_se" })
            hqq.setSprite(txt_bgm, {Res:hqq["hall_test"],path: hlpath + "txt_bgm" })
            hqq["hall_test"].load(hlpath + "opensp", cc.SpriteFrame, (err, frame) => {
                if (err) {
                    cc.log("加载图片失败", err)
                    return;
                }
                if(!cc.isValid(this.node))return;
                yinyuetoggle.checkMark.spriteFrame = frame;
                yinxiaotoggle.checkMark.spriteFrame = frame;
            })
            hqq["hall_test"].load(hlpath + "closesp", cc.SpriteFrame, (err, frame) => {
                if (err) {
                    cc.log("加载图片失败", err)
                    return;
                }
                if(!cc.isValid(this.node))return;
                yinyuetoggle.target.getComponent(cc.Sprite).spriteFrame = frame;
                yinxiaotoggle.target.getComponent(cc.Sprite).spriteFrame = frame;
            })
        }
    },

    init(data) {
        let player = hqq.gameGlobal.player
        hqq.commonTools.loadHeadRes(player.headurl, this.headimg)
        this.goldlabel.string = player.gold.toString().replace(".", "/")
        this.nicklabel.string = player.nick
        this.idlabel.string = player.id
        cc.find("person/change1",this.node).active = false;
        if(hqq.app.pinpai=="juding"){
            if(player.nick == player.id.toString() || player.nick.match(/\d+/g)){
                cc.find("person/change1",this.node).active = true;
            }
        }
        if (player.phonenum) {
            this.phonelabel.string = player.phonenum
            if(hqq.app.pinpai!="juding"){
                this.phonelabel.node.color = new cc.Color(225, 225, 225)
            }
            this.phonebindbtn.active = false
        }
        // if (player.alipay) {
        //     this.alipaylabel.string = player.alipay.substring(0, 2) + "** **** **" + player.alipay.substring(player.alipay.length - 2, player.alipay.length)
        //     this.alipaylabel.node.color = new cc.Color(225, 225, 225)
        //     // this.alipaybindbtn.active = false
        // }
        if (player.usdtaddr) {
            this.alipaylabel.string = player.usdtaddr.substring(0, 3) + "* **** **" + player.usdtaddr.substring(player.usdtaddr.length - 4, player.usdtaddr.length)
            if(hqq.app.pinpai!="juding"){
                this.alipaylabel.node.color = new cc.Color(225, 225, 225)
            }
            this.alipaybindbtn.active = false

        }
        if (player.yinhangka) {
            let kahaostr = player.yinhangka.toString()
            this.yinghangkalabel.string = kahaostr.substring(0, 3) + "* **** **** " + kahaostr.substring(kahaostr.length - 4, kahaostr.length)
            if(hqq.app.pinpai!="juding"){
                this.yinghangkalabel.node.color = new cc.Color(225, 225, 225)
            }
            this.yinhangkabindbtn.active = false
        }
        hqq.audioMgr && hqq.audioMgr.bgIsOpen ? this.musictoggle.check() : this.musictoggle.uncheck()
        hqq.audioMgr && hqq.audioMgr.effectIsOpen ? this.audiotoggle.check() : this.audiotoggle.uncheck()
        hqq.eventMgr.register(hqq.eventMgr.refreshPlayerinfo, "hallPersonLayer", this.setPlayerInfo.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.getPayInfo, "hallPersonLayer", this.getPayInfo.bind(this))
        this.getPayInfo(); // 存在解绑的情况，所以每次进来都重新拉取一次支付宝和银行卡信息
    },

    getPayInfo() {
        let endurl = "/api/with_draw/index?user_id=" + hqq.gameGlobal.pay.user_id
        endurl += "&token=e40f01afbb1b9ae3dd6747ced5bca532&package_id=" + hqq.gameGlobal.pay.package_id
        endurl += "&version=1"
        let callback = (data) => {
            if (data && data.status == 0) {
                cc.log("data", data)
                let list = data.data.list
                let isNoAlipay = true
                let isNotyinhang = true
                for (let i = 0; i < list.length; i++) {
                    if (list[i].type == "3") {
                        hqq.gameGlobal.player.yinhangka = JSON.parse(list[i].info).card_num
                        let kahaostr = hqq.gameGlobal.player.yinhangka.toString()
                        this.yinghangkalabel.string = kahaostr.substring(0, 3) + "* **** **** " + kahaostr.substring(kahaostr.length - 4, kahaostr.length)
                        if(hqq.app.pinpai != "juding" ){
                            this.yinghangkalabel.node.color = new cc.Color(225, 225, 225)
                        }
                        this.yinhangkabindbtn.active = false
                        isNotyinhang = false
                        // } else if (list[i].type == "2") {
                        // hqq.gameGlobal.player.alipay = JSON.parse(list[i].info).account_card
                        // let alistr = hqq.gameGlobal.player.alipay
                        // this.alipaylabel.string = alistr.substring(0, 2) + "** **** **" + alistr.substring(alistr.length - 2, alistr.length)
                        // this.alipaylabel.node.color = new cc.Color(225, 225, 225)
                        // // this.alipaybindbtn.active = false
                        // isNoAlipay = false
                    } else if (list[i].type == "4") {
                        hqq.gameGlobal.player.usdtaddr = JSON.parse(list[i].info).wallet_addr
                        let usdtaddr = JSON.parse(list[i].info).wallet_addr.toString()
                        this.alipaylabel.string = usdtaddr.substring(0, 3) + "* **** **** " + usdtaddr.substring(usdtaddr.length - 4, usdtaddr.length)
                        if( hqq.app.pinpai != "juding" ){
                            this.alipaylabel.node.color = new cc.Color(225, 225, 225)
                        }
                        isNoAlipay = false
                        this.alipaybindbtn.active = false
                    }
                }
                if (isNoAlipay && cc.isValid(this.alipaylabel)) {
                    // this.alipaylabel.string = hqq.getTip("notbindaliypay")
                    this.alipaylabel.string = hqq.getTip("notbindusdt")
                    if( hqq.app.pinpai != "juding" ){
                        this.alipaylabel.node.color = new cc.Color(152, 152, 152)
                    }
                    this.alipaybindbtn.active = true
                }
                if (isNotyinhang && cc.isValid(this.yinghangkalabel)) {
                    this.yinghangkalabel.string = hqq.getTip("notbindyinhangka")
                    if( hqq.app.pinpai != "juding" ){
                        this.yinghangkalabel.node.color = new cc.Color(152, 152, 152)
                    }
                    this.yinhangkabindbtn.active = true
                }
            } else {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("revisefail") + data.msg)
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("requestfail") + status + ",err:" + err, forcejump, readyState)
        }
        if (hqq.gameGlobal.pay.pay_host == "") {
            hqq.logMgr.time("最快的pay地址")
            let qcallback = (data, url) => {
                hqq.logMgr.timeEnd("最快的pay地址", url)
                hqq.gameGlobal.pay.pay_host = url;
                hqq.http.sendXMLHttpRequest({
                    method: "GET",
                    urlto: url,
                    endurl: endurl,
                    callback: callback,
                    failcallback: failcallback,
                    needJsonParse: true,
                });
            }
            hqq.http.requestFastestUrlLine({
                urllist: hqq.app.remoteSeverinfo.pay_host,
                endurl: "/checked",
                callback: qcallback,
                needJsonParse: false,
            })
        } else {
            hqq.http.sendXMLHttpRequest({
                method: "GET",
                urlto: hqq.gameGlobal.pay.pay_host,
                endurl: endurl,
                callback: callback,
                failcallback: failcallback,
                needJsonParse: true,
            });
        }
    },

    setPlayerInfo(msg) {
        if (msg.game_nick) {
            this.nicklabel.string = msg.game_nick;
            hqq.gameGlobal.player.nick = msg.game_nick;
            hqq.gameGlobal.pay.game_nick = msg.game_nick;

            cc.find("person/change1",this.node).active = false;
            if(hqq.app.pinpai=="juding"){
                let player = hqq.gameGlobal.player
                if(player.nick == player.id.toString() || player.nick.match(/\d+/g)){
                    cc.find("person/change1",this.node).active = true;
                }
            }
        }
        if (msg.game_gold || msg.game_gold == 0) {
            this.goldlabel.string = msg.game_gold.toString().replace(".", "/")
        }
        if (msg.game_img) {
            hqq.commonTools.loadHeadRes(msg.game_img, this.headimg)
        }
        if (msg.phone_number) {
            this.phonelabel.string = msg.phone_number
            if(hqq.app.pinpai != "juding"){
                this.phonelabel.node.color = new cc.Color(225, 225, 225)
            }
            this.phonebindbtn.active = false
        } else if (msg.ischangeAccount) {
            this.phonelabel.string = hqq.getTip("showtip71")
            if(hqq.app.pinpai != "juding"){
                this.phonelabel.node.color = new cc.Color(152, 152, 152)
            }
            this.phonebindbtn.active = true
        }
        // if (msg.alipay) {
        //     this.alipaylabel.string = msg.alipay.substring(0, 2) + "** **** **" + msg.alipay.substring(msg.alipay.length - 2, msg.alipay.length)
        //     this.alipaylabel.node.color = new cc.Color(225, 225, 225)
        //     // this.alipaybindbtn.active = false
        // }
        if (msg.usdtaddr) {
            this.alipaylabel.string = msg.usdtaddr.substring(0, 3) + "* **** **" + msg.usdtaddr.substring(msg.usdtaddr.length - 4, msg.usdtaddr.length)
            if(hqq.app.pinpai!="juding"){
                this.alipaylabel.node.color = new cc.Color(225, 225, 225)
            }
            this.alipaybindbtn.active = false
        }
        if (msg.yinhangka) {
            this.yinghangkalabel.string = msg.yinhangka.substring(0, 3) + "* **** **** " + msg.yinhangka.substring(msg.yinhangka.length - 4, msg.yinhangka.length)
            if(hqq.app.pinpai!="juding"){
                this.yinghangkalabel.node.color = new cc.Color(225, 225, 225)
            }
            this.yinhangkabindbtn.active = false
        }
        if (msg.ischangeAccount) {
            this.idlabel.string = msg.id
            if (!msg.usdtaddr || !msg.yinhangka) {
                this.getPayInfo();
            }
        }
    },

    onClickExit() {
        // cc.log("关闭")
        this.node.destroy()
    },

    onClickChangeHeadImg() {
        hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, { type: 1 })
    },

    onClickNick() {
        hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, { type: 3 })
    },

    onClickCopy() {
        if (hqq.reflect) {
            if (hqq.reflect.setClipboard(this.idlabel.string)) {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip20"))
            } else {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip21"))
            }
        }
    },

    obnClickPhoneBind() {
        hqq.eventMgr.dispatch(hqq.eventMgr.showBiglayer, 3)
    },

    onClickAlipayBind() {
        hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, { type: 14 })
    },

    onClickYinHangKaBind() {
        hqq.eventMgr.dispatch(hqq.eventMgr.showBiglayer, 2)
    },

    onClickChangeAccount() {
        hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, { type: 4 })
    },

    onClickMusic(event) {
        hqq.audioMgr && hqq.audioMgr.setBgState(event.isChecked)
        if(hqq.app.pinpai == "juding" || hqq.app.pinpai == "huaxing" ){
            if(event.isChecked){
                event.node.getChildByName("Background").active = false;
            } else{
                event.node.getChildByName("Background").active = true;
            }
        }
    },

    onClickAudio(event) {
        hqq.audioMgr && hqq.audioMgr.setEffectState(event.isChecked)
        if(hqq.app.pinpai == "juding" || hqq.app.pinpai == "huaxing" ){
            if(event.isChecked){
                event.node.getChildByName("Background").active = false;
            } else{
                event.node.getChildByName("Background").active = true;
            }
        }
    },

    onClicktxt_se() {
        this.num0++
        if (this.num0 > 10 && this.num1 > 10) {
            hqq.eventMgr.dispatch(hqq.eventMgr.showConsole, null)
        }

        if( this.num0 > 15 && this.num1 > 15 )
        {
            let str = "版本m:" + (hqq.localStorage.globalGet(hqq.app.versionKey) || "1.0.0")
            if (cc.sys.isNative && cc.sys.os != "Windows" && hqq.reflect.getClipboard()) {
                str += "\n剪切板：" + hqq.reflect.getClipboard()
            }
            if (hqq.app.reginIpData) {
                str += "\n注册ip-api:" + hqq.app.reginIpData.query + ",地址:" + hqq.app.reginIpData.regionName
            }
            if (hqq.app.reginIpData2) {
                str += "\n注册ipinfo:" + hqq.app.reginIpData2.ip + "地址:" + hqq.app.reginIpData2.region
            }
            if (hqq.gameGlobal.ipapiData) {
                str += "\n登陆ip-api:" + hqq.gameGlobal.ipapiData.query + ",地址" + hqq.gameGlobal.ipapiData.regionName
            }
            if (hqq.gameGlobal.ipinfoData) {
                str += "\n登陆ipinfo:" + hqq.gameGlobal.ipinfoData.ip + ",地址" + hqq.gameGlobal.ipinfoData.region
            }
            str += "\n大厅版号:" + hqq.app.hallVersion;
            this.versionlabel.string = str
        }
    },
    onClicktxt_bgm() {
        this.num1++
        if (this.num0 > 10 && this.num1 > 10) {
            hqq.eventMgr.dispatch(hqq.eventMgr.showConsole, null)
        }

        if( this.num0 > 15 && this.num1 > 15 )
        {
            let str = "版本m:" + (hqq.localStorage.globalGet(hqq.app.versionKey) || "1.0.0")
            if (cc.sys.isNative && cc.sys.os != "Windows" && hqq.reflect.getClipboard()) {
                str += "\n剪切板：" + hqq.reflect.getClipboard()
            }
            if (hqq.app.reginIpData) {
                str += "\n注册ip-api:" + hqq.app.reginIpData.query + ",地址:" + hqq.app.reginIpData.regionName
            }
            if (hqq.app.reginIpData2) {
                str += "\n注册ipinfo:" + hqq.app.reginIpData2.ip + "地址:" + hqq.app.reginIpData2.region
            }
            if (hqq.gameGlobal.ipapiData) {
                str += "\n登陆ip-api:" + hqq.gameGlobal.ipapiData.query + ",地址" + hqq.gameGlobal.ipapiData.regionName
            }
            if (hqq.gameGlobal.ipinfoData) {
                str += "\n登陆ipinfo:" + hqq.gameGlobal.ipinfoData.ip + ",地址" + hqq.gameGlobal.ipinfoData.region
            }
            str += "\n大厅版号:" + hqq.app.hallVersion;
            this.versionlabel.string = str
        }
    },

    onclickDownApk() {
        hqq.app.idDownApk = true
        cc.director.loadScene('loading')
    },

    // update (dt) {},

    onEnable() {
        hqq.eventMgr.register(hqq.eventMgr.refreshPlayerinfo, "hallPersonLayer", this.setPlayerInfo.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.getPayInfo, "hallPersonLayer", this.getPayInfo.bind(this))
    },

    onDisable() {
        hqq.eventMgr.unregister(hqq.eventMgr.getPayInfo, "hallPersonLayer")
        hqq.eventMgr.unregister(hqq.eventMgr.refreshPlayerinfo, "hallPersonLayer")
    },

    onDestroy() {
        hqq.eventMgr.unregister(hqq.eventMgr.getPayInfo, "hallPersonLayer")
        hqq.eventMgr.unregister(hqq.eventMgr.refreshPlayerinfo, "hallPersonLayer")
    },
});
