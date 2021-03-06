import * as cc from 'cc';
const { ccclass, property } = cc._decorator;

@ccclass('hallNoticeLayer_test')
export class hallNoticeLayer_test extends cc.Component {
    public subtitle: cc.Sprite | null = null;
    public subtime: cc.Label | null = null;
    public subtxt: cc.Label | null = null;
    public subscroll: cc.ScrollView | null = null;
    public email: cc.SpriteFrame | null = null;
    public notice: cc.SpriteFrame | null = null;
    public gonggaobtn: cc.Button | null = null;
    public emailbtn: cc.Button | null = null;
    public deletbtn: cc.Node | null = null;
    public sublayer: cc.Node | null = null;
    public item: cc.Node | null = null;
    public noticescroll: cc.ScrollView | null = null;
    public eamilscroll: cc.ScrollView | null = null;
    public hasreadframe: cc.SpriteFrame | null = null;
    public noreadframe: cc.SpriteFrame | null = null;
    public ehasreadframe: cc.SpriteFrame | null = null;
    public enoreadframe: cc.SpriteFrame | null = null;
    public subnoticeframe: cc.SpriteFrame | null = null;
    public subemailframe: cc.SpriteFrame | null = null;
    private subData: any = null;
    private noticedata: any = null;
    private emaildata: any = null;
    private noticeItemList: Array<cc.Node> = [];
    private emailItemList: Array<cc.Node> = [];
    private sublayertitle: any = null;
    private allread: cc.Node | null = null;
    private alldelete: cc.Node | null = null;
    private nodata: cc.Node | null = null;
    getClassName() {
        return "hallNoticeLayer_test";
    }
    onLoad() {
        this.subtitle = cc.find("Canvas/noticelayer/sublayer/back/titleimg").getComponent(cc.Sprite);
        this.subtime = cc.find("Canvas/noticelayer/sublayer/back/txtscroll/view/content/time").getComponent(cc.Label);
        this.subtxt = cc.find("Canvas/noticelayer/sublayer/back/txtscroll/view/content/txt").getComponent(cc.Label);
        this.subscroll = cc.find("Canvas/noticelayer/sublayer/back/txtscroll").getComponent(cc.ScrollView);
        this.gonggaobtn = cc.find("Canvas/noticelayer/btncontainer/notice").getComponent(cc.Button);
        this.emailbtn = cc.find("Canvas/noticelayer/btncontainer/email").getComponent(cc.Button);
        this.deletbtn = cc.find("Canvas/noticelayer/scroll/delet1")
        this.sublayer = cc.find("Canvas/noticelayer/sublayer")
        this.item = cc.find("Canvas/noticelayer/item");
        this.noticescroll = cc.find("Canvas/noticelayer/scroll/noticescroll").getComponent(cc.ScrollView);
        this.eamilscroll = cc.find("Canvas/noticelayer/scroll/emailscroll").getComponent(cc.ScrollView);

        cc.resources.load("base/test/img/letteropen/spriteFrame", cc.SpriteFrame, (err, spriteframe: cc.SpriteFrame) => {
            if (err) {
                cc.log(err)
                return
            }
            this.hasreadframe = spriteframe;
            cc.resources.load("base/test/img/letterclose/spriteFrame", cc.SpriteFrame, (err, spriteframe: cc.SpriteFrame) => {
                if (err) {
                    cc.log(err)
                    return
                }
                this.noreadframe = spriteframe;
                this.subData = null

                // this.noticedata = hqq.commonTools.jsonCopy(hqq.gameGlobal.noticeList)
                this.noticedata = hqq.gameGlobal.noticeList;
                this.emaildata = hqq.gameGlobal.emailList;
                cc.log("onLoad this.noticedata=", this.noticedata)
                cc.log("onLoad this.emaildata=", this.emaildata)
                cc.log("onLoad hqq.gameGlobal.emailList=", hqq.gameGlobal.emailList)

                this.noticeItemList = []
                this.emailItemList = []
                this.sublayertitle = null;
                this.allread = null;
                this.alldelete = null;
                this.nodata = null;
                this.getEmail();
                this.UILoad()
                this.initNoticeScroll()

                this.onClickGongGao()
            })
        })
    }
    start() {
    }
    UILoad() {
        if (!cc.isValid(this.node)) {
            console.log("hallNoticeLayer UILoad ???????????????")
            return;
        }
        let title_gonggao = cc.find("Canvas/noticelayer/title_gonggao")
        let notice = cc.find("Canvas/noticelayer/btncontainer/notice")
        let email = cc.find("Canvas/noticelayer/btncontainer/email")
        let subback = cc.find("Canvas/noticelayer/sublayer/back")
        let titleimg = cc.find("Canvas/noticelayer/sublayer/back/titleimg")
        let subclosebtn = cc.find("Canvas/noticelayer/sublayer/back/closebtn")
        let deletebtn = cc.find("Canvas/noticelayer/sublayer/back/deletebtn")
        let delet1 = cc.find("Canvas/noticelayer/scroll/delet1")
        let btnline0 = cc.find("Canvas/noticelayer/btncontainer/btnline0")
        let btnline1 = cc.find("Canvas/noticelayer/btncontainer/btnline1")
        let back = cc.find("Canvas/noticelayer")
        let closebtn = cc.find("Canvas/noticelayer/exitbtn")
        let scrollback = cc.find("Canvas/noticelayer/scroll/gonggao_di")
        email.active = false;

        hqq.setBtn(closebtn, { callback: "onClickExit", script: this })

        hqq.setBtn(notice, { callback: "onClickGongGao", script: this })
        hqq.setBtn(email, { callback: "onClickYouJian", script: this })

        if (hqq.app.pinpai == "fuxin") {
            let hpath = "fuxin/img/"
            let hlpath = "language/" + hqq.language + "/fuxin/"
            let bpath = "base/fuxin/img/"
            hqq.addNode(back, { path: bpath + "bg", zIndex: -1, widget: { left: 0, right: cc.view.getVisibleSize().width / 2 }, anchorX: 1, type: cc.Sprite.Type.SLICED })
            hqq.addNode(back, { path: bpath + "bg", zIndex: -1, widget: { right: 0, left: cc.view.getVisibleSize().width / 2, }, anchorX: 1, scaleX: -1, type: cc.Sprite.Type.SLICED })

            hqq.setSprite(title_gonggao, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "gonggaobiaoti" })
            hqq.setBtn(closebtn, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "fanhui", widget: { top: 0, left: 0 } })

            hqq.setBtn(notice, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "anniu1" })
            hqq.addNode(notice, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "gg" })
            hqq.setSprite(scrollback, { path: bpath + "di4", widget: { left: -(cc.view.getVisibleSize().width - 250), right: 18 }, active: true, type: cc.Sprite.Type.SLICED })

            let noticescroll = cc.find("Canvas/noticelayer/scroll/noticescroll")
            hqq.setWidget(noticescroll, { left: -(cc.view.getVisibleSize().width - 280), closeright: true })
            hqq.setSprite(this.item, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "di5", type: cc.Sprite.Type.SLICED })
        } else if (hqq.app.pinpai == "xingui") {
            let xpath = "xingui/img/"
            let xlpath = "language/" + hqq.language + "/xingui/"
            hqq.setSprite(back, { Res: hqq["hall_" + hqq.app.pinpai], path: "xingui/bg2", widget: { left: 0, right: 0, top: 0, bottom: 0 } })
            hqq.setSprite(title_gonggao, { Res: hqq["hall_" + hqq.app.pinpai], path: xpath + "d_title", widget: { left: 30, top: 15 } })
            hqq.addNode(title_gonggao, { pRes: hqq["hall_" + hqq.app.pinpai], path: xlpath + "gonggao", y: -5 })

            hqq.setBtn(notice, { Res: hqq["hall_" + hqq.app.pinpai], path: xpath + "btn_2" })
            hqq.addNode(notice, { string: "gg" })
            hqq.setBtn(email, { Res: hqq["hall_" + hqq.app.pinpai], path: xpath + "btn_2" })

            hqq.setBtn(closebtn, { Res: hqq["hall_" + hqq.app.pinpai], path: xpath + "btn_fh", widget: { closeleft: true, right: 10, top: 10 } })

            let hlpath = "language/" + hqq.language + "/img/"
            hqq.setBtn(delet1, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "delet1" })
        } else if (hqq.app.pinpai == "xinsheng") {
            let xbpath = "xinsheng/bigimg/"
            let xpath = "xinsheng/img/"
            let xlpath = "language/" + hqq.language + "/xinsheng/"
            hqq.setSprite(back, { Res: hqq["hall_" + hqq.app.pinpai], path: xbpath + "personback" })
            let hlpath = "language/" + hqq.language + "/img/"
            hqq.setSprite(title_gonggao, { Res: hqq["hall_" + hqq.app.pinpai], path: xlpath + "title_gonggao", widget: { left: 280, top: 15 } })
            let node = new cc.Node()
            hqq.setSprite(node, { Res: hqq["hall_" + hqq.app.pinpai], path: xlpath + "gonggao" })
            notice.addChildEx(node)
            hqq.setBtn(notice, { Res: hqq["hall_" + hqq.app.pinpai], path: xpath + "gongao1" })
            hqq.setBtn(email, { path: hlpath + "mail2", pressed: hlpath + "mail1" })
            hqq.setBtn(delet1, { path: hlpath + "delet1" })
            hqq.setBtn(closebtn, { Res: hqq["hall_" + hqq.app.pinpai], path: xpath + "btnclose", widget: { left: 0, top: 0 } })

            btnline0.active = false
            btnline1.active = false
        } else if (hqq.app.pinpai == "xinlong") {
            let hpath = "xinlong/img/";
            let hlpath = "language/" + hqq.language + "/xinlong/";
            let bpath = "base/xinlong/img/";
            let hbpath = "xinlong/bigimg/";
            let scalex = cc.view.getVisibleSize().width / cc.view.getDesignResolutionSize().width;
            let scaley = cc.view.getVisibleSize().height / cc.view.getDesignResolutionSize().height;
            hqq.setSprite(back, { Res: hqq["hall_" + hqq.app.pinpai], path: hbpath + "jd_p_main_bg" })
            hqq.addNode(back, { Res: hqq["hall_" + hqq.app.pinpai], path: hbpath + "jd_p_contain_bg", zIndex: -1, type: cc.Sprite.Type.SLICED, width: 1334 * scalex, height: 750 * scaley })
            hqq.addNode(back, { path: hpath + "jd_p_menu_bg", zIndex: -1, type: cc.Sprite.Type.SLICED, widget: { left: 0, top: 70 }, width: 300 * scalex, height: 681 * scaley })
            hqq.setSprite(title_gonggao, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "gonggaobiaoti", widget: { top: 15, left: 240 * scalex } })
            hqq.setBtn(closebtn, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "jd_p_btn_return", widget: { top: 0, left: 0 } })

            hqq.setBtn(notice, { Res: hqq["hall_" + hqq.app.pinpai], normal: hpath + "jd_p_menu_btn_2", pressed: hpath + "jd_p_menu_btn_1", transition: cc.Button.Transition.SPRITE, scaleX: 1.1 * scalex })
            hqq.addNode(notice, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "jd_menu_announce" })

            hqq.setBtn(email, { Res: hqq["hall_" + hqq.app.pinpai], normal: hpath + "jd_p_menu_btn_2", pressed: hpath + "jd_p_menu_btn_1", transition: cc.Button.Transition.SPRITE, scaleX: 1.1 * scalex })
            hqq.addNode(email, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "jd_menu_mailbox" })
            // hqq.setSprite(scrollback, { path: bpath + "di4", widget: { left: -(cc.view.getVisibleSize().width - 250), right: 18 }, active: true, type: cc.Sprite.Type.SLICED })
            // email.active = true;
            let noticescroll = cc.find("Canvas/noticelayer/scroll/noticescroll")
            hqq.setWidget(noticescroll, { horizontalCenter: -550 * (cc.view.getVisibleSize().width / 1334) })
            // let emailscroll = cc.find("Canvas/noticelayer/scroll/emailscroll")
            // hqq.setWidget(emailscroll, { horizontalCenter:-550*(cc.view.getVisibleSize().width/1334) })
            hqq.setSprite(this.item, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "jd_item_bg", type: cc.Sprite.Type.SLICED, width: 912, height: 180 })
            cc.find("Canvas/noticelayer/btncontainer").getComponent(cc.Layout).affectedByScale = true;
        } else if (hqq.app.pinpai == "juding") {
            let hpath = "juding/img/";
            let hlpath = "language/" + hqq.language + "/juding/";
            let bpath = "base/juding/img/";
            let hbpath = "juding/bigimg/";
            let scalex = cc.view.getVisibleSize().width / cc.view.getDesignResolutionSize().width;
            let scaley = cc.view.getVisibleSize().height / cc.view.getDesignResolutionSize().height;
            hqq.setSprite(back, { Res: hqq["hall_" + hqq.app.pinpai], path: hbpath + "jd_p_main_bg" })
            hqq.addNode(back, { Res: hqq["hall_" + hqq.app.pinpai], path: hbpath + "jd_p_contain_bg", zIndex: -1, type: cc.Sprite.Type.SLICED, width: 1334 * scalex, height: 750 * scaley })
            hqq.addNode(back, { path: hpath + "jd_p_menu_bg", zIndex: -1, type: cc.Sprite.Type.SLICED, widget: { left: 0, top: 70 }, width: 300 * scalex, height: 681 * scaley })
            hqq.setSprite(title_gonggao, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "gonggaobiaoti", widget: { top: 15, left: 240 * scalex } })
            hqq.setBtn(closebtn, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "jd_p_btn_return", widget: { top: 0, left: 0 } })

            hqq.setBtn(notice, { Res: hqq["hall_" + hqq.app.pinpai], normal: hpath + "jd_p_menu_btn_2", pressed: hpath + "jd_p_menu_btn_1", transition: cc.Button.Transition.SPRITE, scaleX: 1.1 * scalex })
            hqq.addNode(notice, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "jd_menu_announce" })

            hqq.setBtn(email, { Res: hqq["hall_" + hqq.app.pinpai], normal: hpath + "jd_p_menu_btn_2", pressed: hpath + "jd_p_menu_btn_1", transition: cc.Button.Transition.SPRITE, scaleX: 1.1 * scalex })
            hqq.addNode(email, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "jd_menu_mailbox" })
            // // hqq.setSprite(scrollback, { path: bpath + "di4", widget: { left: -(cc.view.getVisibleSize().width - 250), right: 18 }, active: true, type: cc.Sprite.Type.SLICED })
            email.active = true;
            let noticescroll = cc.find("Canvas/noticelayer/scroll/noticescroll")
            hqq.setWidget(noticescroll, { horizontalCenter: -550 * (cc.view.getVisibleSize().width / 1334) })
            let emailscroll = cc.find("Canvas/noticelayer/scroll/emailscroll")
            hqq.setWidget(emailscroll, { horizontalCenter: -550 * (cc.view.getVisibleSize().width / 1334) })
            hqq.setSprite(this.item, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "jd_item_bg", type: cc.Sprite.Type.SLICED, width: 912, height: 180 })
            cc.find("Canvas/noticelayer/btncontainer").getComponent(cc.Layout).affectedByScale = true;
        } else if (hqq.app.pinpai == "huaxing") {
            let hpath = "huaxing/img/";
            let hlpath = "language/" + hqq.language + "/huaxing/";
            let bpath = "base/huaxing/img/";
            let hbpath = "huaxing/bigimg/";
            let scalex = cc.view.getVisibleSize().width / cc.view.getDesignResolutionSize().width;
            let scaley = cc.view.getVisibleSize().height / cc.view.getDesignResolutionSize().height;
            hqq.setSprite(back, { Res: hqq["hall_" + hqq.app.pinpai], path: hbpath + "bg" })
            let d_ggtc = hqq.addNode(back, { path: bpath + "d_ggtc", zIndex: -1, width: 1007 * scalex, height: 567 * scaley, type: cc.Sprite.Type.SLICED })
            hqq.setWidget(d_ggtc, { right: 40, top: 120 })
            hqq.addNode(back, { Res: hqq["hall_" + hqq.app.pinpai], path: hbpath + "d_top", zIndex: -2, widget: { top: 0, left: 0, right: 0 } })
            hqq.setSprite(title_gonggao, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "tit_gg", widget: { top: 15, horizontalCenter: 1 }, fontSize: 28, lineHeight: 30 })
            hqq.setBtn(closebtn, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "btn_fh", widget: { top: 0, left: 0 } })

            hqq.setBtn(notice, { Res: hqq["hall_" + hqq.app.pinpai], normal: hpath + "bq1" })
            hqq.addNode(notice, { string: hqq.getTip("gg"), bold: true })
            // // hqq.setSprite(scrollback, { path: bpath + "di4", widget: { left: -(cc.view.getVisibleSize().width - 250), right: 18 }, active: true, type: cc.Sprite.Type.SLICED })
            email.active = true;
            let noticescroll = cc.find("Canvas/noticelayer/scroll/noticescroll")
            hqq.setWidget(noticescroll, { horizontalCenter: -550 * (cc.view.getVisibleSize().width / 1334) })
        } else if (hqq.app.pinpai == "ninetwo") {
            let hpath = "ninetwo/img/";
            let hlpath = "language/" + hqq.language + "/ninetwo/img/";
            let bpath = "base/ninetwo/img/";
            let hbpath = "ninetwo/bigimg/";
            let scalex = cc.view.getVisibleSize().width / cc.view.getDesignResolutionSize().width;
            let scaley = cc.view.getVisibleSize().height / cc.view.getDesignResolutionSize().height;
            // // hqq.setWidget(back,{closeleft:true,closeright:true,closetop:true,closebottom:true});
            hqq.addNode(back, { path: bpath + "popup_win_bg3", width: 813, height: 562, zIndex: -2 });
            let kuang = hqq.addNode(back, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "d1", width: 784, height: 382, zIndex: -1 })
            this.nodata = hqq.addNode(kuang, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "zwsj", width: 117, height: 111, zIndex: -1 })
            hqq.setSprite(title_gonggao, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "title", widget: { top: 100, horizontalCenter: 0 } })
            hqq.setBtn(closebtn, { path: bpath + "guanbi", widget: { closeleft: true, closeright: true, closetop: true, closebottom: true }, x: 400, y: 280 })

            let noticescroll = cc.find("Canvas/noticelayer/scroll/noticescroll")
            hqq.setWidget(cc.find("Canvas/noticelayer/scroll"), { closeright: true, closetop: true })
            hqq.setWidget(noticescroll, { closeright: true })
            noticescroll.getComponent(cc.UITransform).width = 784;
            noticescroll.getComponent(cc.UITransform).height = 382;
            hqq.setNode(noticescroll, { widget: { top: -190, right: 275 } })
            let view = noticescroll.getComponent(cc.ScrollView).content.parent;
            view.getComponent(cc.UITransform).width = 784;
            view.getComponent(cc.UITransform).height = 382;
            let content = noticescroll.getComponent(cc.ScrollView).content;
            content.getComponent(cc.UITransform).width = 784;
            content.getComponent(cc.UITransform).height = 382;
            content.setPositionEx(0, 191);

            this.allread = hqq.addNode(back, { Res: hqq["hall_" + hqq.app.pinpai], normal: hpath + "notice1", x: -300, y: -230, callback: "onClickReadAllItem", script: this });
            hqq.addNode(this.allread, { string: "allread", y: -10, color: cc.color(72, 47, 7), fontSize: 26, bold: true })
            this.alldelete = hqq.addNode(back, { Res: hqq["hall_" + hqq.app.pinpai], normal: hpath + "notice1", x: -140, y: -230, callback: "onClickAllDelete", script: this });
            hqq.addNode(this.alldelete, { string: "alldelete", y: -10, color: cc.color(72, 47, 7), fontSize: 26, bold: true })

            hqq.setSprite(deletebtn, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "xiaoanniu", width: 135, height: 51 });
            deletebtn.getComponent(cc.Sprite).color = cc.Color.WHITE;
            deletebtn.setPositionEx(320, 160)
            let richtext = deletebtn.getComponent(cc.RichText);
            if (cc.isValid(richtext)) {
                deletebtn._removeComponent(richtext);
                deletebtn._uiProps.uiComp = null;
            }
            deletebtn.getComponent(cc.UITransform).width = 135;
            deletebtn.getComponent(cc.UITransform).width = 51;

            hqq.addNode(deletebtn, { string: "delete", y: -10, color: cc.color(72, 47, 7), fontSize: 26, bold: true })

            let emailscroll = cc.find("Canvas/noticelayer/scroll/emailscroll")
            emailscroll.active = false;
        } else if (hqq.app.pinpai == "tianqi") {
            let hpath = "tianqi/img/"
            let blpath = "base/tianqi/language/" + hqq.language + "/img/"
            let bbpath = "bigimg/tianqi/";
            let bpath = "base/tianqi/img/";
            let hlbpath = "language/" + hqq.language + "/bigimg/"
            let blpath2 = "base/language/" + hqq.language + "/img/"
            scrollback.active = true
            btnline0.active = true
            btnline1.active = true
            hqq.setSprite(subback, { path: "base/tianqi/img/p_bandalibg2" })
            hqq.setSprite(back, { path: bbpath + "p_main_bg" })
            hqq.setSprite(title_gonggao, { Res: hqq["hall_test"], path: hlbpath + "title_gonggao", widget: { horizontalCenter: false, left: 0, right: 0, top: 0, bottom: 0 } })
            hqq.setBtn(notice, { path: blpath + "gonggao2", pressed: blpath + "gongao1" })
            hqq.setBtn(email, { path: blpath + "mail2", pressed: blpath + "mail1" })
            hqq.setSprite(titleimg, { path: blpath2 + "subicongg", y: 221 })
            hqq.setBtn(delet1, { path: blpath + "delet1" })
            hqq.setBtn(closebtn, { path: bpath + "p_new_saver_return", widget: { top: 0, left: 0 } })
            hqq.setSprite(subclosebtn, { path: bpath + "p_close", position: { x: 415, y: 255 } })
            deletebtn.getComponent(cc.RichText).string = hqq.getTip("deletebtn")
        } else {
            let hpath = "test/img/"
            let hlpath = "language/" + hqq.language + "/img/"
            let hlbpath = "language/" + hqq.language + "/bigimg/"
            scrollback.active = true
            btnline0.active = true
            btnline1.active = true
            hqq.setSprite(subback, { path: "base/img/p_bandalibg" })
            hqq.setSprite(back, { Res: hqq["hall_test"], path: "test/bigimg/p_main_bg" })
            hqq.setSprite(title_gonggao, { Res: hqq["hall_test"], path: hlbpath + "title_gonggao", widget: { horizontalCenter: false, left: 0, right: 0, top: 0, bottom: 0 } })
            hqq.setBtn(notice, { Res: hqq["hall_test"], path: hlpath + "gonggao2", pressed: hlpath + "gongao1" })
            hqq.setBtn(email, { Res: hqq["hall_test"], path: hlpath + "mail2", pressed: hlpath + "mail1" })
            hqq.setSprite(titleimg, { Res: hqq["hall_test"], path: hlpath + "subiconmail" })
            hqq.setBtn(delet1, { Res: hqq["hall_test"], path: hlpath + "delet1" })
            hqq.setBtn(closebtn, { Res: hqq["hall_test"], path: hpath + "p_new_saver_return", widget: { top: 0, left: 0 } })
            hqq.setSprite(subclosebtn, { path: "base/img/p_close", position: { x: 400, y: 225 } })
            deletebtn.getComponent(cc.RichText).string = hqq.getTip("deletebtn")
        }
    }
    init(data: any) {
        if (data == 1) {
            this.onClickGongGao();
        } else if (data == 2) {
            this.onClickYouJian();
        }
    }
    initNoticeScroll() {
        this.noticeItemList = []
        this.noticescroll.content.removeAllChildren()
        this.noticescroll.content.getComponent(cc.UITransform).height = (this.item.getComponent(cc.UITransform).height + 16) * this.noticedata.length + 44
        if (this.noticedata.length > 0) {
            if (cc.isValid(this.nodata)) {
                this.nodata.active = false;
            }
        }
        let scalex = cc.view.getVisibleSize().width / cc.view.getDesignResolutionSize().width;
        let scaley = cc.view.getVisibleSize().height / cc.view.getDesignResolutionSize().height;
        for (let i = 0; i < this.noticedata.length; i++) {
            let mitem = cc.instantiate(this.item)
            if (hqq.app.pinpai == "fuxin") {
                hqq.setSprite(mitem, { Res: hqq["hall_" + hqq.app.pinpai], path: "fuxin/img/di5", type: cc.Sprite.Type.SLICED })
            } else if (hqq.app.pinpai == "xingui") {
                hqq.setSprite(mitem, { Res: hqq["hall_" + hqq.app.pinpai], path: "xingui/img/d_gg" })
            } else if (hqq.app.pinpai == "juding") {
                hqq.setSprite(mitem, { Res: hqq["hall_" + hqq.app.pinpai], path: "juding/img/jd_item_bg", type: cc.Sprite.Type.SLICED, width: 912 * scalex, height: 180 * scaley })
            } else if (hqq.app.pinpai == "huaxing") {
                hqq.setSprite(mitem, { Res: hqq["hall_" + hqq.app.pinpai], path: "huaxing/img/d_gg0", type: cc.Sprite.Type.SLICED, width: 964, height: 165 })
            } else if (hqq.app.pinpai == "ninetwo") {
                hqq.setSprite(mitem, { Res: hqq["hall_" + hqq.app.pinpai], path: "ninetwo/img/d2", type: cc.Sprite.Type.SLICED, width: 763, height: 91 })
            } else if (hqq.app.pinpai == "tianqi") {
                hqq.setSprite(mitem, { path: "base/tianqi/noticelayer/itembg_tianqi", type: cc.Sprite.Type.SLICED })
            } else if (hqq.app.pinpai == "xinlong") {
                hqq.setSprite(mitem, { Res: hqq["hall_" + hqq.app.pinpai], path: "xinlong/img/jd_item_bg", type: cc.Sprite.Type.SLICED, width: 912 * scalex, height: 180 * scaley })
            }
            let readstate = mitem.getChildByName("readstate").getComponent(cc.Sprite)
            readstate.spriteFrame = this.noticedata[i].isread ? this.hasreadframe : this.noreadframe;
            let time = mitem.getChildByName("time").getComponent(cc.Label)
            let notice = mitem.getChildByName("notice")
            notice.active = true
            let email = mitem.getChildByName("email")
            email.active = false
            let title = notice.getChildByName("title").getComponent(cc.Label)
            title.string = this.noticedata[i].title
            this.noticedata[i].strtime = hqq.commonTools.formatDateToStr(this.noticedata[i].create_time)
            time.string = this.noticedata[i].strtime
            var clickEventHandler = new cc.EventHandler();
            clickEventHandler.target = this.node;
            clickEventHandler.component = this.getClassName();
            clickEventHandler.customEventData = this.noticedata[i];
            clickEventHandler.handler = "onClickReadItem";
            let btn = notice.getChildByName("btn").getComponent(cc.Button);
            btn.clickEvents.push(clickEventHandler);
            mitem.setPositionEx(0, -(0.5 + i) * (mitem.getComponent(cc.UITransform).height + 16) - 22)
            mitem.active = true
            if (hqq.app.pinpai == "juding") {
                if (this.noticedata[i].isread) {
                    hqq.setSprite(mitem.getChildByName("readstate"), { Res: hqq["hall_" + hqq.app.pinpai], path: "juding/img/jd_letterOpen" })
                } else {
                    hqq.setSprite(mitem.getChildByName("readstate"), { Res: hqq["hall_" + hqq.app.pinpai], path: "juding/img/jd_letteClose" })
                }
                mitem.getChildByName("readstate").setPositionEx(mitem.getChildByName("readstate").getPosition().x + 80, mitem.getChildByName("readstate").getPosition().y)

                title.node.setPositionEx(title.node.getPosition().x + 50, title.node.getPosition().y);
                title.color = cc.color(49, 98, 141);
                time.node.setPositionEx(time.node.getPosition().x - 15, time.node.getPosition().y);
                time.color = cc.color(49, 98, 141);

                if (btn.node.getComponent(cc.Sprite)) {
                    btn.node.getComponent(cc.Sprite).color = cc.color(49, 98, 141);
                } else if (btn.node.getComponent(cc.Label)) {
                    btn.node.getComponent(cc.Label).color = cc.color(49, 98, 141);
                }
            } else if (hqq.app.pinpai == "huaxing") {
                if (this.noticedata[i].isread) {
                    hqq.setSprite(mitem.getChildByName("readstate"), { Res: hqq["hall_" + hqq.app.pinpai], path: "huaxing/img/youjian2" })
                } else {
                    hqq.setSprite(mitem.getChildByName("readstate"), { Res: hqq["hall_" + hqq.app.pinpai], path: "huaxing/img/youjian1" })
                }
            } else if (hqq.app.pinpai == "ninetwo") {
                readstate.node.active = false;
                title.node.setPositionEx(-220, 0);
                time.node.setPositionEx(190, 30);
                time.fontSize = 20;
                time.lineHeight = 25;
                let label = btn.node.getComponent(cc.Label);
                let sprite = btn.node.getComponent(cc.Sprite);
                if (cc.isValid(label)) {
                    btn.node._removeComponent(label);
                    btn.node._uiProps.uiComp = null;
                }
                if (cc.isValid(sprite)) {
                    btn.node._removeComponent(sprite);
                    btn.node._uiProps.uiComp = null;
                }
                btn.node.getComponent(cc.UITransform).width = 763;
                btn.node.getComponent(cc.UITransform).height = 91;
                btn.node.setPositionEx(-381.5, 0);
                mitem.getComponent(cc.UITransform).width = 763;
                mitem.getComponent(cc.UITransform).height = 91;
                if (this.noticedata[i].isread) {
                    hqq.setSprite(mitem, { Res: hqq["hall_" + hqq.app.pinpai], path: "ninetwo/img/d4", type: cc.Sprite.Type.SLICED, width: 763, height: 91 })
                } else {
                    hqq.setSprite(mitem, { Res: hqq["hall_" + hqq.app.pinpai], path: "ninetwo/img/d2", type: cc.Sprite.Type.SLICED, width: 763, height: 91 })
                }
                mitem.setPositionEx(0, -(0.5 + i) * (mitem.getComponent(cc.UITransform).height + 9))
            } else if (hqq.app.pinpai == "xinlong") {
                if (this.noticedata[i].isread) {
                    hqq.setSprite(mitem.getChildByName("readstate"), { Res: hqq["hall_" + hqq.app.pinpai], path: "xinlong/img/jd_letterOpen" })
                } else {
                    hqq.setSprite(mitem.getChildByName("readstate"), { Res: hqq["hall_" + hqq.app.pinpai], path: "xinlong/img/jd_letteClose" })
                }
                mitem.getChildByName("readstate").setPositionEx(mitem.getChildByName("readstate").getPosition().x + 80, mitem.getChildByName("readstate").getPosition().y);
                title.node.setPositionEx(title.node.getPosition().x + 50, title.node.getPosition().y);
                title.color = cc.color(49, 98, 141);
                time.node.setPositionEx(time.node.getPosition().x - 15, time.node.getPosition().y);
                time.color = cc.color(49, 98, 141);
                if (btn.node.getComponent(cc.Sprite)) {
                    btn.node.getComponent(cc.Sprite).color = cc.color(49, 98, 141);
                } else if (btn.node.getComponent(cc.Label)) {
                    btn.node.getComponent(cc.Label).color = cc.color(49, 98, 141);
                }
            }
            this.noticescroll.content.addChildEx(mitem)
            this.noticeItemList.push(mitem)
        }
    }
    initEmailScroll() {
        this.emailItemList = []
        this.eamilscroll.content.removeAllChildren()
        this.eamilscroll.content.getComponent(cc.UITransform).height = (this.item.getComponent(cc.UITransform).height + 16) * this.emaildata.length + 44
        cc.log("initEmailScroll this.emaildata=", this.emaildata)
        let scalex = cc.view.getVisibleSize().width / cc.view.getDesignResolutionSize().width;
        let scaley = cc.view.getVisibleSize().height / cc.view.getDesignResolutionSize().height;
        for (let i = 0; i < this.emaildata.length; i++) {
            let mitem = cc.instantiate(this.item)
            if (hqq.app.pinpai == "fuxin") {
                hqq.setSprite(mitem, { Res: hqq["hall_" + hqq.app.pinpai], path: "fuxin/img/di5", type: cc.Sprite.Type.SLICED })
            } else if (hqq.app.pinpai == "xingui") {
                hqq.setSprite(mitem, { Res: hqq["hall_" + hqq.app.pinpai], path: "xingui/img/d_gg" })
            } else if (hqq.app.pinpai == "juding") {
                hqq.setSprite(mitem, { Res: hqq["hall_" + hqq.app.pinpai], path: "juding/img/jd_item_bg", type: cc.Sprite.Type.SLICED, width: 912 * scalex, height: 180 * scaley })
            } else if (hqq.app.pinpai == "huaxing") {
                hqq.setSprite(mitem, { Res: hqq["hall_" + hqq.app.pinpai], path: "huaxing/img/d_gg0", type: cc.Sprite.Type.SLICED, width: 964, height: 165 })
            } else if (hqq.app.pinpai == "xinlong") {
                hqq.setSprite(mitem, { Res: hqq["hall_" + hqq.app.pinpai], path: "xinlong/img/jd_item_bg", type: cc.Sprite.Type.SLICED, width: 912 * scalex, height: 180 * scaley })
            }
            let readstate = mitem.getChildByName("readstate").getComponent(cc.Sprite)
            readstate.spriteFrame = this.emaildata[i].isread ? this.hasreadframe : this.noreadframe;
            let time = mitem.getChildByName("time").getComponent(cc.Label)
            let notice = mitem.getChildByName("notice")
            notice.active = false
            let email = mitem.getChildByName("email")
            email.active = true
            let title = email.getChildByName("title").getComponent(cc.Label)
            title.string = this.emaildata[i].title
            this.emaildata[i].strtime = hqq.commonTools.formatDateToStr(this.emaildata[i].created_at)
            time.string = this.emaildata[i].strtime
            var clickEventHandler = new cc.EventHandler();
            clickEventHandler.target = this.node;
            clickEventHandler.component = this.getClassName();
            clickEventHandler.customEventData = this.emaildata[i];
            clickEventHandler.handler = "onClickReadEmailItem";
            let btnnode = email.getChildByName("btn")
            let btnsprite = btnnode.getComponent(cc.Sprite)
            // btnsprite.spriteFrame = this.emaildata[i].isread ? this.ehasreadframe : this.enoreadframe;
            let btn = btnnode.getComponent(cc.Button);
            btn.clickEvents.push(clickEventHandler);
            mitem.setPositionEx(0, -(0.5 + i) * (mitem.getComponent(cc.UITransform).height + 16) - 22)
            mitem.active = true
            if (hqq.app.pinpai == "juding") {
                if (this.emaildata[i].isread) {
                    hqq.setSprite(mitem.getChildByName("readstate"), { Res: hqq["hall_" + hqq.app.pinpai], path: "juding/img/jd_mailboxOpen" })
                } else {
                    hqq.setSprite(mitem.getChildByName("readstate"), { Res: hqq["hall_" + hqq.app.pinpai], path: "juding/img/jd_mailboxClose" })
                }

                mitem.getChildByName("readstate").setPositionEx(mitem.getChildByName("readstate").getPosition().x + 80, mitem.getChildByName("readstate").getPosition().y);
                title.node.setPositionEx(title.node.getPosition().x + 200, title.node.getPosition().y);
                title.color = cc.color(49, 98, 141);
                time.node.setPositionEx(time.node.getPosition().x - 20, time.node.getPosition().y);
                time.color = cc.color(49, 98, 141);
                if (btn.node.getComponent(cc.Sprite)) {
                    btn.node.getComponent(cc.Sprite).color = cc.color(49, 98, 141);
                } else if (btn.node.getComponent(cc.Label)) {
                    btn.node.getComponent(cc.Label).color = cc.color(49, 98, 141);
                }
            } else if (hqq.app.pinpai == "huaxing") {
                if (this.emaildata[i].isread) {
                    hqq.setSprite(mitem.getChildByName("readstate"), { Res: hqq["hall_" + hqq.app.pinpai], path: "huaxing/img/youjian2" })
                } else {
                    hqq.setSprite(mitem.getChildByName("readstate"), { Res: hqq["hall_" + hqq.app.pinpai], path: "huaxing/img/youjian1" })
                }
            } else if (hqq.app.pinpai == "xinlong") {
                if (this.emaildata[i].isread) {
                    hqq.setSprite(mitem.getChildByName("readstate"), { Res: hqq["hall_" + hqq.app.pinpai], path: "xinlong/img/jd_mailboxOpen" })
                } else {
                    hqq.setSprite(mitem.getChildByName("readstate"), { Res: hqq["hall_" + hqq.app.pinpai], path: "xinlong/img/jd_mailboxClose" })
                }
                mitem.getChildByName("readstate").setPositionEx(mitem.getChildByName("readstate").getPosition().x + 80, mitem.getChildByName("readstate").getPosition().y);
                title.node.setPositionEx(title.node.getPosition().x + 200, title.node.getPosition().y);
                title.color = cc.color(49, 98, 141);
                time.node.setPositionEx(time.node.getPosition().x - 20, time.node.getPosition().y);
                time.color = cc.color(49, 98, 141);
                if (btn.node.getComponent(cc.Sprite)) {
                    btn.node.getComponent(cc.Sprite).color = cc.color(49, 98, 141);
                } else if (btn.node.getComponent(cc.Label)) {
                    btn.node.getComponent(cc.Label).color = cc.color(49, 98, 141);
                }
                btn.node.setPositionEx(0, -41);
            }
            this.eamilscroll.content.addChildEx(mitem)
            this.emailItemList.push(mitem)
        }
    }
    onClickExit() {
        this.node.destroy()
    }
    onClickGongGao() {
        // // cc.log("??????")z
        this.gonggaobtn.interactable = false
        this.emailbtn.interactable = true
        this.noticescroll.node.active = true
        this.eamilscroll.node.active = false
        this.deletbtn.active = false
    }
    onClickYouJian() {
        // return
        // cc.log("??????")
        // this.emaildata[custom.key].isread = 1
        // this.noticeItemList[custom.key].getChildByName("readstate").getComponent(cc.Sprite).spriteFrame = this.emaildata[custom.key].isread ? this.hasreadframe : this.noreadframe;
        // this.emailItemList[custom.key].getChildByName("email").getChildByName("btn").getComponent(cc.Sprite).spriteFrame = this.emaildata[custom.key].isread ? this.ehasreadframe : this.enoreadframe;
        this.gonggaobtn.interactable = true
        this.emailbtn.interactable = false
        this.noticescroll.node.active = false
        this.eamilscroll.node.active = true
        this.deletbtn.active = true
    }
    onClickReadItem(event: any, custom: any) {
        cc.log("??????", custom)
        this.noticedata[custom.key].isread = 1
        this.noticeItemList[custom.key].getChildByName("readstate").getComponent(cc.Sprite).spriteFrame = this.noticedata[custom.key].isread ? this.hasreadframe : this.noreadframe;
        if (hqq.app.pinpai == "juding") {
            if (this.noticedata[custom.key].isread) {
                hqq.setSprite(this.noticeItemList[custom.key].getChildByName("readstate"), { Res: hqq["hall_" + hqq.app.pinpai], path: "juding/img/jd_letterOpen" })
            } else {
                hqq.setSprite(this.noticeItemList[custom.key].getChildByName("readstate"), { Res: hqq["hall_" + hqq.app.pinpai], path: "juding/img/jd_letteClose" })
            }
        } else if (hqq.app.pinpai == "ninetwo") {
            if (this.noticedata[custom.key].isread) {
                hqq.setSprite(this.noticeItemList[custom.key], { Res: hqq["hall_" + hqq.app.pinpai], path: "ninetwo/img/d4", type: cc.Sprite.Type.SLICED, width: 763, height: 91 })
            } else {
                hqq.setSprite(this.noticeItemList[custom.key], { Res: hqq["hall_" + hqq.app.pinpai], path: "ninetwo/img/d2", type: cc.Sprite.Type.SLICED, width: 763, height: 91 })
            }
            this.allread.getComponent(cc.Button).interactable = false;
            hqq.setSprite(this.allread, { Res: hqq["hall_" + hqq.app.pinpai], path: "ninetwo/img/notice2" })
            this.alldelete.getComponent(cc.Button).interactable = false;
            hqq.setSprite(this.alldelete, { Res: hqq["hall_" + hqq.app.pinpai], path: "ninetwo/img/notice2" })
        } else if (hqq.app.pinpai == "xinlong") {
            if (this.noticedata[custom.key].isread) {
                hqq.setSprite(this.noticeItemList[custom.key].getChildByName("readstate"), { Res: hqq["hall_" + hqq.app.pinpai], path: "xinlong/img/jd_letterOpen" })
            } else {
                hqq.setSprite(this.noticeItemList[custom.key].getChildByName("readstate"), { Res: hqq["hall_" + hqq.app.pinpai], path: "xinlong/img/jd_letteClose" })
            }
        }
        this.sublayer.active = true
        this.initSubLayer(custom)
        this.checkIsAllRead()
        // let noticehistory = hqq.localStorage.getGlobal().noticeKey
        // if (!noticehistory) {
        //     noticehistory = []
        // }
        // noticehistory.push(custom.create_time)
        // if (noticehistory.length > 200) {
        //     noticehistory.splice(0, 150)
        // }
        // hqq.localStorage.globalSet('noticeKey', noticehistory)
    }
    onClickReadAllItem() {
        for (let i = 0; i < this.noticedata.length; i++) {
            this.noticedata[i].isread = 1;
            if (hqq.app.pinpai == "ninetwo") {
                hqq.setSprite(this.noticeItemList[i], { Res: hqq["hall_" + hqq.app.pinpai], path: "ninetwo/img/d4", type: cc.Sprite.Type.SLICED, width: 763, height: 91 })
            }
        }

        this.checkIsAllRead()
    }
    onClickAllDelete() {
        let deleteNotice = hqq.localStorage.getGlobal().noticeDeleteKey
        if (!deleteNotice) {
            deleteNotice = []
        }
        for (let i = 0; i < this.noticedata.length; i++) {
            deleteNotice.push(this.noticedata[i].create_time)
        }

        if (deleteNotice.length > 200) {
            deleteNotice.splice(0, 150)
        }
        hqq.localStorage.globalSet('noticeDeleteKey', deleteNotice)
        this.noticeItemList = [];
        this.noticedata = [];
        hqq.gameGlobal.noticeList = [];
        this.initNoticeScroll()
        this.onClickSubClose()
    }
    checkIsAllRead() {
        for (let i = 0; i < this.noticedata.length; i++) {
            if (this.noticedata[i].isread == 0) {
                return
            }
        }
        hqq.eventMgr.dispatch(hqq.eventMgr.refreshHallTips, { hidenoticetip: true })
    }
    onClickReadEmailItem(event: any, custom: any) {
        cc.log("??????", custom)
        cc.log(this.emaildata)
        this.emaildata[custom.key].isread = 1
        if (this.emaildata[custom.key].isread) {
            hqq.setSprite(this.emailItemList[custom.key].getChildByName("readstate"), { Res: hqq["hall_" + hqq.app.pinpai], path: "juding/img/jd_mailboxOpen" })
        } else {
            hqq.setSprite(this.emailItemList[custom.key].getChildByName("readstate"), { Res: hqq["hall_" + hqq.app.pinpai], path: "juding/img/jd_mailboxClose" })
        }
        this.sublayer.active = true
        this.initSubLayer(custom, true)
        this.checkIsAllEmailRead()

        let emailKey = hqq.localStorage.getGlobal().emailKey
        if (!emailKey) {
            emailKey = []
        }
        emailKey.push(custom.id)
        hqq.localStorage.globalSet('emailKey', emailKey)
    }
    checkIsAllEmailRead() {
        for (let i = 0; i < this.emaildata.length; i++) {
            if (this.emaildata[i].isread == 0) {
                return
            }
        }
        hqq.eventMgr.dispatch(hqq.eventMgr.refreshHallTips, { hidenoticetip: true })
    }
    onClieckDeleteHasRead() {
        this.emaildata.shift()
        this.initEmailScroll()
    }
    onClickSubClose() {
        if (hqq.app.pinpai == "ninetwo") {
            this.allread.getComponent(cc.Button).interactable = true;
            hqq.setSprite(this.allread, { Res: hqq["hall_" + hqq.app.pinpai], path: "ninetwo/img/notice1" })
            this.alldelete.getComponent(cc.Button).interactable = true;
            hqq.setSprite(this.alldelete, { Res: hqq["hall_" + hqq.app.pinpai], path: "ninetwo/img/notice1" })
        }
        this.sublayer.active = false
    }
    onClickDelete() {
        if (this.subData.type == 2) {
            let deleteNotice = hqq.localStorage.getGlobal().noticeDeleteKey
            if (!deleteNotice) {
                deleteNotice = []
            }
            deleteNotice.push(this.subData.create_time)
            if (deleteNotice.length > 200) {
                deleteNotice.splice(0, 150)
            }
            hqq.localStorage.globalSet('noticeDeleteKey', deleteNotice)
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
    }
    onClickEmailDelete() {
        let callback = (data, url) => {
            console.log("???????????? callback", data)
            if (data.status == 0) {
                for (let i = 0; i < this.emaildata.length; i++) {
                    if (this.emaildata[i].id == this.subData.id) {
                        this.emaildata.splice(i, 1)
                        for (let j = 0; j < this.emaildata.length; j++) {
                            this.emaildata[j].key = j
                        }
                        let emailKey = hqq.localStorage.getGlobal().emailKey
                        if (!emailKey) {
                            emailKey = []
                        }
                        for (let k = 0; k < emailKey.length; k++) {
                            if (emailKey[k] == this.subData.id) {
                                emailKey.splice(k, 1);
                                break;
                            }
                        }
                        hqq.localStorage.globalSet('emailKey', emailKey)
                        this.initEmailScroll();
                        this.onClickSubClose();
                        return
                    }
                }
            } else {
                this.onClickSubClose();
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
        }
        let data = {
            token: "e40f01afbb1b9ae3dd6747ced5bca532",
            id: this.subData.id,
            center_auth: hqq.gameGlobal.token,
            action: "edit",
            user_id: hqq.gameGlobal.player.id,
        }
        hqq.http.sendXMLHttpRequest({
            method: "POST",
            urlto: hqq.gameGlobal.pay.pay_host + "/api/backend/SaveEmailDetail",
            param: data,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: true,
        });
    }
    initSubLayer(custom: any, isemail: boolean = false) {
        this.subData = custom
        // // this.subtime.node.active = isemail
        let subback = cc.find("Canvas/noticelayer/sublayer/back")
        let titleimg = cc.find("Canvas/noticelayer/sublayer/back/titleimg")
        let subclosebtn = cc.find("Canvas/noticelayer/sublayer/back/closebtn")
        let deletebtn = cc.find("Canvas/noticelayer/sublayer/back/deletebtn")
        hqq.setBtn(subclosebtn, { callback: "onClickSubClose", script: this });
        hqq.setBtn(deletebtn, { callback: "onClickDelete", script: this });

        if (isemail) {
            let bpath = "base/juding/img/";
            let hpath = "juding/img/";
            let hbpath = "juding/bigimg/";
            let hlpath = "language/" + hqq.language + "/juding/";
            hqq.setSprite(subback, { path: bpath + "jd_p_bandalibg_1" })
            hqq.addNode(subback, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "jd_popup_inBg", zIndex: -1 });
            hqq.setSprite(titleimg, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "jd_title_mailbox", x: -320, y: 217 })
            hqq.setSprite(subclosebtn, { path: bpath + "jd_popup_btn_close", x: 360, y: 215 })
            subclosebtn.getComponent(cc.UITransform).width = 119;
            subclosebtn.getComponent(cc.UITransform).height = 70;
            let tnode = hqq.addNode(subback, { normal: bpath + "jd_p_btn_1_2", x: 300, y: -220, callback: "onClickEmailDelete", script: this, })
            let labelnode = hqq.addNode(tnode, { string: hqq.getTip("dc"), y: -10, fontSize: 24, color: cc.color(148, 81, 10), bold: true })
            this.subtxt.color = cc.color(11, 52, 96, 255);
            this.subtxt.node.setPositionEx(this.subtxt.node.getPosition().x, -22)
            this.subtxt.isBold = true;
        } else {
            if (hqq.app.pinpai == "xingui") {
                let xlpath = "language/" + hqq.language + "/xingui/"
                let xpath = "xingui/img/"
                hqq.setSprite(titleimg, { Res: hqq["hall_" + hqq.app.pinpai], path: xlpath + "subgg", y: 205 })
                this.subscroll.content.parent.getComponent(cc.UITransform).height = 380
                let bpath = "base/xingui/img/"
                hqq.setSprite(subback, { path: bpath + "d_tc" })
                let newnode = hqq.addNode(subback, { Res: hqq["hall_" + hqq.app.pinpai], normal: xpath + "btn_3", widget: { top: 30, left: 50 }, callback: "onClickDelete", script: this })
                hqq.addNode(newnode, { string: "dc", fontSize: 25, y: -5 })
                hqq.setSprite(subclosebtn, { path: "base/xingui/img/btn_x", position: { x: 375, y: 195 } })
            } else if (hqq.app.pinpai == "fuxin") {
                let bpath = "base/fuxin/img/"
                let hlpath = "language/" + hqq.language + "/fuxin/"
                hqq.addNode(subback, { path: bpath + "tck", zIndex: -1, anchorX: 1, width: 420, height: 650, type: cc.Sprite.Type.SLICED })
                hqq.addNode(subback, { path: bpath + "tck", zIndex: -1, anchorX: 1, scaleX: -1, width: 420, height: 650, type: cc.Sprite.Type.SLICED })
                hqq.setSprite(titleimg, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "gonggaobiaoti", y: 285 })
                hqq.setSprite(subclosebtn, { path: bpath + "guanbi", x: 390, y: 280 })
                let tnode = hqq.addNode(subback, { normal: bpath + "anniu3", x: 280, y: -260, callback: "onClickDelete", script: this, })
                hqq.addNode(tnode, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "scct" })
                let subScrollback = cc.find("txtscroll", subback)
                hqq.setNode(subScrollback, { y: 20 })
            } else if (hqq.app.pinpai == "xinsheng") {
                let xlpath = "language/" + hqq.language + "/" + hqq.app.pinpai + "/img/"
                hqq.setSprite(subback, { path: "base/xinsheng/img/back1" })
                hqq.setSprite(titleimg, { Res: hqq["hall_" + hqq.app.pinpai], path: xlpath + "title_gonggao", position: { x: -290, y: 220 } })
                hqq.setSprite(subclosebtn, { path: "base/xinsheng/img/exit", position: { x: 400, y: 225 } })
                deletebtn.setPositionEx(270, deletebtn.getPosition().y);
                deletebtn.getComponent(cc.RichText).string = hqq.getTip("deletebtn")
            } else if (hqq.app.pinpai == "xinlong") {
                let bpath = "base/xinlong/img/";
                let hpath = "xinlong/img/";
                let hbpath = "xinlong/bigimg/";
                let hlpath = "language/" + hqq.language + "/xinlong/";
                hqq.setSprite(subback, { path: bpath + "jd_p_bandalibg_1" })
                hqq.addNode(subback, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "jd_popup_inBg", zIndex: -1 });

                hqq.setSprite(titleimg, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "gonggaobiaoti", x: -320, y: 217 })
                hqq.setSprite(subclosebtn, { path: bpath + "jd_popup_btn_close", x: 360, y: 215 })
                subclosebtn.getComponent(cc.UITransform).width = 119;
                subclosebtn.getComponent(cc.UITransform).height = 70;
                let tnode = hqq.addNode(subback, { normal: bpath + "jd_p_btn_1_2", x: 300, y: -220, callback: "onClickDelete", script: this, })
                let labelnode = hqq.addNode(tnode, { string: hqq.getTip("dc"), y: -10, fontSize: 24, color: cc.color(148, 81, 10, 255), bold: true })

                this.subtxt.color = cc.color(11, 52, 96, 255);
                this.subtxt.node.setPositionEx(this.subtxt.node.getPosition().x, -22)
                this.subtxt.isBold = true;
            } else if (hqq.app.pinpai == "juding") {
                let bpath = "base/juding/img/";
                let hpath = "juding/img/";
                let hbpath = "juding/bigimg/";
                let hlpath = "language/" + hqq.language + "/juding/";
                hqq.setSprite(subback, { path: bpath + "jd_p_bandalibg_1" })
                hqq.addNode(subback, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "jd_popup_inBg", zIndex: -1 });

                hqq.setSprite(titleimg, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "gonggaobiaoti", x: -320, y: 217 })
                hqq.setSprite(subclosebtn, { path: bpath + "jd_popup_btn_close", x: 360, y: 215 })
                subclosebtn.getComponent(cc.UITransform).width = 119;
                subclosebtn.getComponent(cc.UITransform).height = 70;
                let tnode = hqq.addNode(subback, { normal: bpath + "jd_p_btn_1_2", x: 300, y: -220, callback: "onClickDelete", script: this, })
                let labelnode = hqq.addNode(tnode, { string: hqq.getTip("dc"), y: -10, fontSize: 24, color: cc.color(148, 81, 10, 255), bold: true })

                this.subtxt.color = cc.color(11, 52, 96, 255);
                this.subtxt.node.setPositionEx(this.subtxt.node.getPosition().x, -22)
                this.subtxt.isBold = true;
            } else if (hqq.app.pinpai == "huaxing") {
                let bpath = "base/huaxing/img/";
                let hpath = "huaxing/img/";
                let hbpath = "huaxing/bigimg/";
                let hlpath = "language/" + hqq.language + "/huaxing/";
                hqq.setSprite(subback, { path: bpath + "d_ggtc", width: 857, height: 529 })
                hqq.setSprite(titleimg, { Res: hqq["hall_" + hqq.app.pinpai], path: hlpath + "tit_gg", x: 0, y: 240 })
                hqq.setSprite(subclosebtn, { path: bpath + "btn_x", x: 425, y: 250 })
                hqq.addNode(subback, { path: bpath + "d_tit", y: 240, zIndex: -1 });
                deletebtn.setPositionEx(-320, 220);
                deletebtn.getComponent(cc.RichText).string = hqq.getTip("deletebtn")
                // // let subScrollback = cc.find("txtscroll", subback)
                // // hqq.setNode(subScrollback, { y: 20 })
                // // this.subtxt.node.color = cc.color(11,52,96,255);
                this.subtxt.node.setPositionEx(this.subtxt.node.getPosition().x, -22)
                this.subtxt.isBold = true;
            } else if (hqq.app.pinpai == "ninetwo") {
                let bpath = "base/ninetwo/img/";
                let hpath = "ninetwo/img/";
                let hbpath = "ninetwo/bigimg/";
                let hlpath = "language/" + hqq.language + "/ninetwo/img/";
                hqq.setSprite(subback, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "d3", width: 784, height: 382, widget: { horizontalCenter: 0, verticalCenter: 0 } })
                // // hqq.setSprite(titleimg, { path: hlpath + "tit_gg", x:0,y:240 })
                hqq.setSprite(subclosebtn, { Res: hqq["hall_" + hqq.app.pinpai], path: hpath + "notice1", x: 300, y: -230 })
                hqq.addNode(subclosebtn, { string: "fanhui", y: -10, color: cc.color(72, 47, 7), fontSize: 26, bold: true })

                let subScrollback = cc.find("txtscroll", subback)
                subScrollback.setPositionEx(subScrollback.getPosition().x, 0);
                subScrollback.getComponent(cc.UITransform).width = 784;
                subScrollback.getComponent(cc.UITransform).height = 382
                let view = subScrollback.getComponent(cc.ScrollView).content.parent;
                view.getComponent(cc.UITransform).width = 784;
                view.getComponent(cc.UITransform).height = 382;
                let content = subScrollback.getComponent(cc.ScrollView).content;
                content.getComponent(cc.UITransform).width = 784;
                content.getComponent(cc.UITransform).height = 382;
                content.setPositionEx(content.getPosition().x, 191);

                this.subtxt.node.setPositionEx(this.subtxt.node.getPosition().x, -60)
                this.subtxt.isBold = true;
                this.subtime.isBold = true;
                this.subtime.node.setPositionEx(250, -25);
                this.subtime.node.getComponent(cc.UITransform).anchorX = 1;
                this.subtime.color = cc.Color.WHITE;
                if (!cc.isValid(this.sublayertitle)) {
                    this.sublayertitle = hqq.addNode(cc.find("Canvas/noticelayer/sublayer/back/txtscroll/view/content"), { string: "", x: -182, y: -40, anchorX: 0, fontSize: 26 })
                }
                this.sublayertitle.getComponent(cc.Label).isBold = true;
                this.sublayertitle.getComponent(cc.Label).string = this.subData.title;
            } else {
                this.subtitle.spriteFrame = this.notice
            }
        }
        this.subtxt.string = custom.words
        if (cc.VERSION == "2.1.3") {
            this.subtxt._updateRenderData(true) // 2.1.3
        } else if (cc.VERSION == "2.2.2") {
            this.subtxt._forceUpdateRenderData(true) // 2.2.2
        } else {
            this.subtxt.updateRenderData(true);
        }

        this.subscroll.content.getComponent(cc.UITransform).height = this.subtime.node.getComponent(cc.UITransform).height + this.subtxt.node.getComponent(cc.UITransform).height
    }
    /**
    * @Description: ????????????
    */
    getEmail() {
        if (hqq.app.pinpai != "juding") return;
        let callback = (data, url) => {
            console.log("?????? callback", data)
            if (data.status == 0) {
                if (!data.data || data.data.length == 0) {
                    // // console.log("111111111????????????????????????")
                } else {
                    // // console.log("222222222?????????????????????")
                    hqq.gameGlobal.emailList = [];
                    let i = 0;
                    let j = 0;
                    for (i = 0; i < data.data.length; i++) {
                        let email = {
                            key: hqq.gameGlobal.emailList.length,
                            isread: 0,
                            id: data.data[i].id,
                            title: data.data[i].title,
                            words: data.data[i].content,
                            created_at: data.data[i].created_at,
                        };
                        let emailKey = hqq.localStorage.getGlobal().emailKey
                        if (!emailKey) {
                            emailKey = []
                        }
                        for (let k = 0; k < emailKey.length; k++) {
                            if (emailKey[k] == email.id) {
                                email.isread = 1;
                                break;
                            }
                        }
                        hqq.gameGlobal.emailList.push(email);
                    }
                    i = null;
                    j = null;

                    this.emaildata = hqq.gameGlobal.emailList;
                    this.initEmailScroll();
                }
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
        }
        hqq.http.sendXMLHttpRequest({
            method: "GET",
            urlto: hqq.gameGlobal.pay.pay_host + "/api/backend/getEmailDetail?token=e40f01afbb1b9ae3dd6747ced5bca532&user_id=" + hqq.gameGlobal.player.id + "&center_auth=" + hqq.gameGlobal.token,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: true,
        });
    }
}
