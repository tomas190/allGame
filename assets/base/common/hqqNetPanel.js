cc.Class({
    extends: cc.Component,

    properties: {
        upnode: cc.Node,
        centernode: cc.Node,
        fresnbtn: cc.Node,

        upprocess: cc.Label,
        cneterprocess: cc.Label,

        tiplabelnode: cc.Node,
        exitbtn: cc.Node,
        curUpLine: cc.Node,
        curCenterLine: cc.Node,

        item: cc.Node,
        upScrollview: cc.ScrollView,
        centerScrollview: cc.ScrollView,

        Scrollview: cc.Prefab,
    },

    onLoad() {
        this.upgradeTempList = []
        this.upgradeListTemp = []
        this.upgradeList = []
        this.centerTempList = []
        this.centerList = []
        this.upgradeItemList = []
        this.centerItemList = []
        this.data = null
        this.upchoice = 0
        this.centerchoice = 0
        this.testEnd = false
        this.exitFunc = () => {
            hqq.app.hasLineChoiceLayer = false
            this.node.destroy();
            hqq.http.stopTestLint();
            hqq.app.checkSubServer();
        }

        this.upCurLineLabelNode = this.curUpLine.getChildByName('curlinelabel')
        this.cCurLineLabelNode = this.curCenterLine.getChildByName('curlinelabel')

    },
    start() { },
    // UI动态加载
    UILoad() {
        let background = cc.find("netpanel/back")
        let title_lt = cc.find("netpanel/title_lt")
        let btn_refresh = cc.find("netpanel/btn_refresh")
        let exitbtn = cc.find("netpanel/exitbtn")
        let btn_quickPick = cc.find("netpanel/btn_quickPick")
        let txt_t1 = cc.find("netpanel/up/txt_t1")
        let txt_t2 = cc.find("netpanel/center/txt_t2")
        let up = cc.find("netpanel/up")
        let center = cc.find("netpanel/center")
        let upinto = cc.find("netpanel/up/curline/info")
        let centerinfo = cc.find("netpanel/center/curline/info")
        if (hqq.app.pinpai == "fuxin" ) {
            let xpath = "base/fuxin/img/"
            let xlpath = "base/language/" + hqq.language + "/fuxin/"
            hqq.addNode(background, { path: xpath + "tck", anchorX: 1, y: -10, height: 614, type: cc.Sprite.Type.SLICED })
            hqq.addNode(background, { path: xpath + "tck", anchorX: 1, scaleX: -1, y: -10, height: 614, type: cc.Sprite.Type.SLICED })
            hqq.addNode(background, { path: xlpath + "ts", y: -175 })
            hqq.setSprite(title_lt, { path: xlpath + "biaoti", x: 0, y: 260, })
            hqq.setBtn(exitbtn, { normal: xpath + "guanbi", x: 343, y: 265, callback: "onClickExit", script: this })
            hqq.setBtn(btn_quickPick, { normal: xpath + "anniu3", x: 266, y: -264, callback: "onClickQuikLogin", script: this })
            hqq.addNode(btn_quickPick, { path: xlpath + "ksxz" })
            hqq.setBtn(btn_refresh, { normal: xpath + "sx", x: 155, y: 258, callback: "onClickRefreshTest", script: this })

            // let Scrollview = cc.instantiate(this.Scrollview)
            // hqq.setSprite(Scrollview, { path: xpath + "default_panel", width: 340, height: 270 })
            // hqq.setScrollView(Scrollview, { x: -176, y: -45, width: 340, height: 270, content: { width: 340, height: 270 } })
            // this.node.addChild(Scrollview)

            if ( this.data.choicetype ) {
                hqq.setSprite(up, { path: xpath + "di", x: 0, y: 18, width: 340, height: 360 })
            } else {
                hqq.setSprite(up, { path: xpath + "di", x: -175, y: 18, width: 340, height: 360 })
            }
            hqq.setSprite(center, { path: xpath + "di", x: 175, y: 18, width: 340, height: 360 })
            hqq.setSprite(txt_t1, { path: xlpath + "gx", y: 160 })
            hqq.setSprite(txt_t2, { path: xlpath + "yx", y: 160 })
            let upcurline = up.getChildByName("curline")
            hqq.setSprite(upcurline, { path: xpath + "srk", width: 340, y: 110, type: cc.Sprite.Type.SLICED })
            let centercurline = center.getChildByName("curline")
            hqq.setSprite(centercurline, { path: xpath + "srk", width: 340, y: 110, type: cc.Sprite.Type.SLICED })

            hqq.setNode(upinto, { x: -110 })
            hqq.setNode(centerinfo, { x: -110 })
            let curupline = cc.find("curline/curlinelabel", up)
            hqq.setNode(curupline, { x: 10 })
            let upspeed = cc.find("curline/speed", up)
            hqq.setNode(upspeed, { x: 110 })
            let curcenterline = cc.find("curline/curlinelabel", center)
            hqq.setNode(curcenterline, { x: 10 })
            let centerspeed = cc.find("curline/speed", center)
            hqq.setNode(centerspeed, { x: 110 })

            this.upScrollview.node.y = -40
            this.upScrollview.node.width = 340
            this.upScrollview.node.height = 250
            this.upScrollview._view.width = 340
            this.upScrollview._view.height = 250
            this.upScrollview.content.width = 340
            this.centerScrollview.node.y = -40
            this.centerScrollview.node.width = 340
            this.centerScrollview.node.height = 250
            this.centerScrollview._view.width = 340
            this.centerScrollview._view.height = 250
            this.centerScrollview.content.width = 340

            this.item.width = 340
            hqq.setNode(this.item.getChildByName("curline"), { x: -125 })
            hqq.setNode(this.item.getChildByName("choicebtn"), { x: 105 })

        } else if (hqq.app.pinpai == "xingui") {
            let xpath = "base/xingui/img/"
            let xlpath = "base/language/" + hqq.language + "/xingui/"
            hqq.setSprite(background, { path: xpath + "d_tc" })
            hqq.setSprite(title_lt, { path: xlpath + "xianljc", position: { x: 0, y: 250 }, })
            hqq.setBtn(exitbtn, { normal: xpath + "btn_x", position: { x: 412, y: 242 }, callback: "onClickExit", script: this })
            hqq.setBtn(btn_quickPick, { normal: xpath + "btn_2", size: { width: 170, height: 50 }, position: { x: -335, y: 240 }, callback: "onClickQuikLogin", script: this })
            hqq.addNode(btn_quickPick, { string: "ksxz", x: 0, y: -7.5, fontSize: 25 })
            if ( this.data.choicetype ) {
                hqq.setBtn(btn_refresh, { normal: xpath + "btn_sx", position: { x: 280, y: 185 }, callback: "onClickRefreshTest", script: this })
            } else {
                hqq.setBtn(btn_refresh, { normal: xpath + "btn_sx", position: { x: 300, y: 242 }, callback: "onClickRefreshTest", script: this })
            }
            hqq.setSprite(up, { path: xpath + "d_0" })
            hqq.setSprite(center, { path: xpath + "d_0" })
            hqq.setSprite(txt_t1, { path: xlpath + "gxfwq" })
            hqq.setSprite(txt_t2, { path: xlpath + "yxfwq" })
        } else if (hqq.app.pinpai == "xinsheng" || hqq.app.pinpai == "xinlong") {
            let xpath = "base/xinsheng/img/"
            let xlpath = "base/language/" + hqq.language + "/xinsheng/"
            hqq.setSprite(background, { path: xpath + "back1" })
            hqq.setSprite(title_lt, { path: xlpath + "xljc", position: { x: -270, y: 262 }, })
            hqq.setBtn(exitbtn, { normal: xpath + "exit", position: { x: 435, y: 267 }, callback: "onClickExit", script: this })
            hqq.setBtn(btn_quickPick, { normal: xlpath + "ksxz", position: { x: 270, y: 267 }, callback: "onClickQuikLogin", script: this })
            if ( this.data.choicetype ) {
                hqq.setBtn(btn_refresh, { normal: xlpath + "sx", position: { x: 280, y: 185 }, callback: "onClickRefreshTest", script: this })
            } else {
                hqq.setBtn(btn_refresh, { normal: xlpath + "sx", position: { x: 0, y: 185 }, callback: "onClickRefreshTest", script: this })
            }
            hqq.setSprite(up, { path: xpath + "layer9" })
            hqq.setSprite(center, { path: xpath + "layer9" })
            hqq.setSprite(txt_t1, { path: xlpath + "txt_t1" })
            hqq.setSprite(txt_t2, { path: xlpath + "txt_t2" })
        } else if (hqq.app.pinpai == "juding" ) {
            let xpath = "base/juding/img/";
            let xlpath = "base/language/" + hqq.language + "/juding/";
            hqq.setSprite(background, { path: xpath + "jd_p_bandalibg_2",width:897,height:609 })
            hqq.addNode(background, { path: xpath + "jd_lisp_bg_1" })
            // hqq.addNode(background, { path: xlpath + "ts", y: -175 })
            hqq.setSprite(title_lt, { path: xlpath + "jd_popup_title_lineInspect", x: -300, y: 260, })
            hqq.setBtn(exitbtn, { normal: xpath + "jd_popup_btn_close", x: 385, y: 258, callback: "onClickExit", script: this })
            hqq.setBtn(btn_quickPick, { path: xpath + "jd_p_btn_1_2", x: 330, y: -250, callback: "onClickQuikLogin", script: this })
            hqq.addNode(btn_quickPick, { string:"ksxz", fontSize:24,color:cc.color("#94510A"),y:-10,bold:true })
            hqq.setBtn(btn_refresh, { normal: xpath + "jd_btn_refresh", x: -140, y: 258, callback: "onClickRefreshTest", script: this })

            if (this.data.choicetype ) {
                hqq.setSprite(up, { path: xpath + "jd_lisp_bg_2", x: 0, y: -5, width: 399, height: 397 })
            } else {
                hqq.setSprite(up, { path: xpath + "jd_lisp_bg_2", x: -210, y: -5, width: 399, height: 397 })
            }
            hqq.setSprite(center, { path: xpath + "jd_lisp_bg_2", x: 210, y: -5, width: 399, height: 397 })
            hqq.setSprite(txt_t1, { path: xlpath + "gx", y: 160 })
            hqq.setSprite(txt_t2, { path: xlpath + "yx", y: 160 })
            let upcurline = up.getChildByName("curline")
            hqq.setSprite(upcurline, { path: xpath + "jd_lisp_bg_3", width: 399,height:47, y: 113, type: cc.Sprite.Type.SLICED })
            let centercurline = center.getChildByName("curline")
            hqq.setSprite(centercurline, { path: xpath + "jd_lisp_bg_3", width: 399,height:47, y: 113, type: cc.Sprite.Type.SLICED })

            hqq.setNode(upinto, { x: -110 })
            hqq.setNode(centerinfo, { x: -110 })
            let curupline = cc.find("curline/curlinelabel", up)
            hqq.setNode(curupline, { x: 10 })
            let upspeed = cc.find("curline/speed", up)
            hqq.setNode(upspeed, { x: 110 })
            let curcenterline = cc.find("curline/curlinelabel", center)
            hqq.setNode(curcenterline, { x: 10 })
            let centerspeed = cc.find("curline/speed", center)
            hqq.setNode(centerspeed, { x: 110 })

            this.upScrollview.node.y = -40
            this.upScrollview.node.width = 340
            this.upScrollview.node.height = 250
            this.upScrollview._view.width = 340
            this.upScrollview._view.height = 250
            this.upScrollview.content.width = 340
            this.centerScrollview.node.y = -40
            this.centerScrollview.node.width = 340
            this.centerScrollview.node.height = 250
            this.centerScrollview._view.width = 340
            this.centerScrollview._view.height = 250
            this.centerScrollview.content.width = 340

            this.item.width = 340
            hqq.setNode(this.item.getChildByName("curline"), { x: -125 })
            hqq.setNode(this.item.getChildByName("choicebtn"), { x: 105 })

        } else if (hqq.app.pinpai == "huaxing" ) {
            let xpath = "base/huaxing/img/";
            let xbpath = "bigimg/huaxing/";
            let xlpath = "base/language/" + hqq.language + "/huaxing/";
            hqq.setSprite(background, { path: xbpath + "dauang",width:1037,height:626 })
            hqq.addNode(background, { path: xpath + "d_tit" , y:300})
            // hqq.addNode(background, { path: hpath + "jd_lisp_bg_1" })
            // hqq.addNode(background, { path: xlpath + "ts", y: -175 })
            hqq.setSprite(title_lt, { path: xlpath + "xiankujiance", x: 0, y: 295, })
            hqq.setBtn(exitbtn, { normal: xpath + "btn_x", x: 515, y: 300, callback: "onClickExit", script: this })
            hqq.setBtn(btn_quickPick, { normal: xpath + "btn_2", x: 360, y: 270, callback: "onClickQuikLogin", script: this,width:159,height:52 })
            hqq.addNode(btn_quickPick, { string:"ksxz", fontSize:24,y:-10,bold:true })
            
            hqq.addNode(btn_refresh,{string:"str12",fontSize:24,color:cc.color(100,36,16),bold:true,y:-13})

            hqq.setSprite(center, { path: xpath + "xiaokuang", x: 250, y: -40, width: 486, height: 425 , type: cc.Sprite.Type.SLICED})
            
            hqq.setSprite(txt_t2, { path: xlpath + "yxfwxxl", y: 240 })
           
            hqq.setNode(upinto, { x: -110 })
            hqq.setNode(centerinfo, { x: -110 })
            let curupline = cc.find("curline/curlinelabel", up)
            hqq.setNode(curupline, { x: 10 })
            let upspeed = cc.find("curline/speed", up)
            hqq.setNode(upspeed, { x: 110 })
            let curcenterline = cc.find("curline/curlinelabel", center)
            hqq.setNode(curcenterline, { x: 10 })
            let centerspeed = cc.find("curline/speed", center)
            hqq.setNode(centerspeed, { x: 110 })

            if (this.data.choicetype ) {
                let upcurline = up.getChildByName("curline")
                hqq.setSprite(upcurline, { path: xpath + "taitoukuang", width: 630,height:46, y: 180, type: cc.Sprite.Type.SLICED })
                hqq.setSprite(up.getChildByName("frame_1"),{path:xpath+"shurukuang"})

                hqq.setBtn(btn_refresh, { normal: xpath + "btn_3", x: 180, y: 200, callback: "onClickRefreshTest", script: this })
                hqq.setSprite(up, { path: xpath + "xiaokuang", x: 0, y: -40, width: 648, height: 425 , type: cc.Sprite.Type.SLICED})
                hqq.setSprite(txt_t1, { path: xlpath + "gxfwxxl", x:-40,y: 240 })

                this.upScrollview.node.y = -20
                this.upScrollview.node.width = 620
                this.upScrollview.node.height = 360
                this.upScrollview._view.width = 620
                this.upScrollview._view.height = 360
                this.upScrollview.content.width = 620
                
                this.item.width = 620;
            } else {
                let upcurline = up.getChildByName("curline")
                hqq.setSprite(upcurline, { path: xpath + "taitoukuang", width: 466,height:46, y: 180, type: cc.Sprite.Type.SLICED })
                hqq.setSprite(up.getChildByName("frame_1"),{path:xpath+"shurukuang"})
                let centercurline = center.getChildByName("curline")
                hqq.setSprite(centercurline, { path: xpath + "taitoukuang", width: 466,height:46, y: 180, type: cc.Sprite.Type.SLICED })
                hqq.setSprite(center.getChildByName("frame_1"),{path:xpath+"shurukuang"})

                hqq.setBtn(btn_refresh, { normal: xpath + "btn_3", x: 0, y: 200, callback: "onClickRefreshTest", script: this })
                hqq.setSprite(up, { path: xpath + "xiaokuang", x: -250, y: -40, width: 486, height: 425 , type: cc.Sprite.Type.SLICED})
                hqq.setSprite(txt_t1, { path: xlpath + "gxfwxxl", x:0,y: 240 })

                this.upScrollview.node.y = -20
                this.upScrollview.node.width = 460
                this.upScrollview.node.height = 360
                this.upScrollview._view.width = 460
                this.upScrollview._view.height = 360
                this.upScrollview.content.width = 460
                this.centerScrollview.node.y = -20
                this.centerScrollview.node.width = 460
                this.centerScrollview.node.height = 360
                this.centerScrollview._view.width = 460
                this.centerScrollview._view.height = 360
                this.centerScrollview.content.width = 460

                this.item.width = 460
            }
            
            hqq.setNode(this.item.getChildByName("curline"), { x: -125 })
            hqq.setNode(this.item.getChildByName("choicebtn"), { x: 105 })

        } else if (hqq.app.pinpai == "ninetwo" ) {
            let xpath = "base/ninetwo/img/";
            let xlpath = "base/language/" + hqq.language + "/ninetwo/img/";
            hqq.setSprite(background, { path: xpath + "popup_win_bg3",width:813,height:562,x:0,y:0 })
            hqq.setSprite(title_lt, { path: xlpath + "fds", x: 0, y: 240, })
            hqq.setBtn(exitbtn, { normal: xpath + "guanbi", x: 400, y: 275, callback: "onClickExit", script: this })
            btn_quickPick.active = false;
            btn_quickPick = hqq.addNode(this.node, { normal: "base/ninetwo/dating_btn_orange_big",aniname:"animation",loop:true,timeScale:0.95, x: 250, y: 240, callback: "onClickQuikLogin", script: this })
            hqq.addNode(btn_quickPick, { string:"ksxz", fontSize:24,bold:true ,color:cc.color(59,31,11),y:-10})
            hqq.setBtn(btn_refresh,{path:"base/ninetwo/dating_btn_small",aniname:"animation",loop:true,timeScale:0.95, callback: "onClickRefreshTest", script: this})
            hqq.addNode(btn_refresh,{string:"str12",fontSize:24,color:cc.color(100,36,16),bold:true,y:-10})

            hqq.setSprite(center, { path: xpath + "xiaodifd", x: 190, y: -20, width: 366, height: 344 , type: cc.Sprite.Type.SLICED})
            
            hqq.setSprite(txt_t2, { path: xlpath + "yryr", x:20,y: 153 })
           

            if (this.data.choicetype ) {
                let upcurline = up.getChildByName("curline")
                upcurline.getComponent(cc.Sprite).spriteFrame = null;
                upcurline.width = 360;
                upcurline.setPosition(50,110);
                hqq.setSprite(up.getChildByName("frame_1"),{path:xpath+"shurukuang"})

                hqq.setNode(btn_refresh, { x: 250, y: 150 })
                hqq.setSprite(up, { path: xpath + "xiaodifd", x: 0, y: -40, width: 366, height: 344 , type: cc.Sprite.Type.SLICED})
                hqq.setSprite(txt_t1, { path: xlpath + "eqwq", x:0,y: 153 })

                this.upScrollview.node.setPosition(0,-45);
                this.upScrollview.node.width = 366
                this.upScrollview.node.height = 255
                this.upScrollview._view.width = 366
                this.upScrollview._view.height = 255
                this.upScrollview.content.width = 366
                this.upScrollview.content.y = 127.5
                
                this.item.width = 366;
            } else {
                let upcurline = up.getChildByName("curline")
                upcurline.getComponent(cc.Sprite).spriteFrame = null;
                upcurline.width = 360;
                upcurline.setPosition(50,110);
                hqq.setSprite(up.getChildByName("frame_1"),{path:xpath+"shurukuang"})
                let centercurline = center.getChildByName("curline")
                centercurline.getComponent(cc.Sprite).spriteFrame = null;
                centercurline.width = 360;
                centercurline.setPosition(50,110);
                hqq.setSprite(center.getChildByName("frame_1"),{path:xpath+"shurukuang"})

                hqq.setNode(btn_refresh, { x: 0, y: 175 })
                hqq.setSprite(up, { path: xpath + "xiaodifd", x: -190, y: -20, width: 366, height: 344 , type: cc.Sprite.Type.SLICED})
                hqq.setSprite(txt_t1, { path: xlpath + "eqwq", x:-20,y: 153 })

                this.upScrollview.node.setPosition(0,-45);
                this.upScrollview.node.width = 366
                this.upScrollview.node.height = 255
                this.upScrollview._view.width = 366
                this.upScrollview._view.height = 255
                this.upScrollview.content.width = 366
                this.upScrollview.content.y = 127.5

                this.centerScrollview.node.setPosition(0,-45)
                this.centerScrollview.node.width = 366
                this.centerScrollview.node.height = 255
                this.centerScrollview._view.width = 366
                this.centerScrollview._view.height = 255
                this.centerScrollview.content.width = 366
                this.centerScrollview.content.y = 127.5

                this.item.width = 366
            }
            
            hqq.setNode(this.item.getChildByName("curline"), { x: -125 })
            hqq.setNode(this.item.getChildByName("choicebtn"), { x: 105 })

        } else if(hqq.app.pinpai == "tianqi" ) {
            let tpath = "base/img/"
            let tlpath = "base/language/" + hqq.language + "/img/"
            hqq.setSprite(background, { path: "base/tianqi/img/p_bandalibg2" })
            hqq.setSprite(title_lt, { path: tlpath + "title_lt" })
            hqq.setBtn(exitbtn, { normal: "base/tianqi/img/p_close", callback: "onClickExit", script: this })
            hqq.setBtn(btn_quickPick, { normal: tlpath + "btn_quickPick", callback: "onClickQuikLogin", script: this })
            if ( this.data.choicetype ) {
                hqq.setBtn(btn_refresh, { normal: tlpath + "btn_refresh", position: { x: 160, y: 185 }, callback: "onClickRefreshTest", script: this })
            } else {
                hqq.setBtn(btn_refresh, { normal: tlpath + "btn_refresh", position: { x: 0, y: 185 }, callback: "onClickRefreshTest", script: this })
            }
            hqq.setSprite(txt_t1, { path: tlpath + "txt_t1" })
            hqq.setSprite(txt_t2, { path: tlpath + "txt_t2" })
            hqq.setSprite(up, { path: tpath + "bg_white" })
            hqq.setSprite(center, { path: tpath + "bg_white" })

        } else {
            let tpath = "base/img/"
            let tlpath = "base/language/" + hqq.language + "/img/"
            hqq.setSprite(background, { path: "base/img/p_bandalibg" })
            hqq.setSprite(title_lt, { path: tlpath + "title_lt" })
            hqq.setBtn(exitbtn, { normal: tpath + "p_close", callback: "onClickExit", script: this })
            hqq.setBtn(btn_quickPick, { normal: tlpath + "btn_quickPick", callback: "onClickQuikLogin", script: this })
            if ( this.data.choicetype ) {
                hqq.setBtn(btn_refresh, { normal: tlpath + "btn_refresh", position: { x: 160, y: 185 }, callback: "onClickRefreshTest", script: this })
            } else {
                hqq.setBtn(btn_refresh, { normal: tlpath + "btn_refresh", position: { x: 0, y: 185 }, callback: "onClickRefreshTest", script: this })
            }
            hqq.setSprite(txt_t1, { path: tlpath + "txt_t1" })
            hqq.setSprite(txt_t2, { path: tlpath + "txt_t2" })
            hqq.setSprite(up, { path: tpath + "bg_white" })
            hqq.setSprite(center, { path: tpath + "bg_white" })
        }

        hqq.setLabel(upinto, "curline")
        hqq.setLabel(centerinfo, "curline")
        let tiplabel = cc.find("netpanel/tiplabel")
        if (hqq.app.pinpai == "fuxin") {
            hqq.setLabel(tiplabel, { string: "" })
        } else if(hqq.app.pinpai == "juding"){
            hqq.setLabel(tiplabel, { string: "testtiplabel3", color: cc.color("#EC6941"), x:-30,y: -250 })
        } else if (hqq.app.pinpai == "xingui") {
            hqq.setLabel(tiplabel, { string: "testtiplabel2", color: cc.color(255, 0, 0,255), y: -270 })
        } else if (hqq.app.pinpai == "huaxing") {
            hqq.setLabel(tiplabel, { string: "testtiplabel", color: cc.color(255, 255, 255,255) })
        } else if(hqq.app.pinpai == "ninetwo"){
            hqq.setLabel(tiplabel, { string: "testtiplabel" ,y:-250})
        } else {
            hqq.setLabel(tiplabel, { string: "testtiplabel" })
        }
    },
    init(data) {
        this.data = data
        this.UILoad();
        if (data.exitFunc) {
            if (data.restartGame) {
                this.exitFunc = () => {
                    hqq.app.hasLineChoiceLayer = false
                    this.node.destroy()
                    data.exitFunc();
                    hqq.http.stopTestLint();
                    hqq.app.checkSubServer();
                    cc.audioEngine.stopAll();
                    cc.game.restart();
                }
            } else {
                this.exitFunc = () => {
                    hqq.app.hasLineChoiceLayer = false
                    this.node.destroy()
                    data.exitFunc();
                    hqq.http.stopTestLint();
                    hqq.app.checkSubServer();
                }
            }
        } else if (data.restartGame) {
            this.exitFunc = () => {
                hqq.app.hasLineChoiceLayer = false
                this.node.destroy()
                hqq.http.stopTestLint();
                hqq.app.checkSubServer();
                cc.audioEngine.stopAll();
                cc.game.restart();
            }
        }
        let upgradeList = hqq.localStorage.globalGet(hqq.app.hotServerKey)
        if (data.upgradeList) {
            upgradeList = data.upgradeList
        } else {
            this.data.upgradeList = upgradeList
        }
        if (upgradeList && upgradeList.length) {
            for (let i = 0; i < upgradeList.length; i++) {
                this.upgradeTempList.push(upgradeList[i] + "/" + hqq.app.hotupdatePath + "/" + 'version.json?' + Math.floor(Math.random() * 8888888))
            }
            this.upCurLineLabelNode.getComponent(cc.Label).string = hqq.getTip("line") + (hqq.app.hotServerIndex + 1);
            if ((cc.sys.os === cc.sys.OS_IOS && !cc.sys.isBrowser) || (hqq.app.packageInfo && hqq.app.packageInfo.system == "ios")) { //  
                hqq.iosReflect.setCallback(this.testWebSpeedAction.bind(this))
                let str = this.testListToStrAction(this.upgradeTempList)
                hqq.reflect.requestFastUrl(str)
            } else { // android  browser
                hqq.http.testLine(this.upgradeTempList, this.testUpgradeCallBack.bind(this), 10);
            }
        }
        if ( this.data.choicetype ) {
            this.centernode.active = false
            this.upnode.x = 0
            this.exitbtn.active = false
            this.tiplabelnode.active = false
        } else {
            this.exitbtn.active = true
            this.tiplabelnode.active = true
            let centerList = hqq.localStorage.globalGet(hqq.app.serverListKey)
            if (data.centerList) {
                centerList = data.centerList
            } else {
                this.data.centerList = centerList
            }
            if (centerList && centerList.length) {
                for (let i = 0; i < centerList.length; i++) {
                    this.centerTempList.push(centerList[i] + "/checked?" + Math.floor(Math.random() * 8888888))
                }
                this.cCurLineLabelNode.getComponent(cc.Label).string = hqq.getTip("line") + (hqq.app.serverIndex + 1);
                hqq.http.testLine(this.centerTempList, this.testCenterCallBack.bind(this), 1);
            }
        }
        // if (data && data.uptime && data.centertime) {
        //     this.refreshCurUpLine(data.uptime, hqq.app.hotServerIndex);
        //     this.refreshCurCenterLine(data.centertime, hqq.app.serverIndex);
        // }
    },
    testListToStrAction(upgradeTempList) {
        let str = "";
        if (upgradeTempList) {
            for (let i = 0; i < upgradeTempList.length; i++) {
                const urlStr = upgradeTempList[i];
                if (i == 0) {
                    str += urlStr
                } else {
                    str += ',' + urlStr
                }
            }
        }
        return str;
    },
    // ios 测速回调
    testWebSpeedAction(data) {
        let info = JSON.parse(data)
        for (let i = 0; i < this.upgradeTempList.length; i++) {
            if (this.upgradeTempList[i] == info.url) {
                if (info.timeDiff > 0) {
                    let time = info.timeDiff / 5
                    this.testUpgradeCallBack(info.url, i, time, null)
                } else {
                    this.testUpgradeCallBack(info.url, i, 3000, info.timeDiff)
                }
            }
        }
    },
    testUpgradeCallBack(url, index, spendtime, err) {
        if(!cc.isValid(this.node))return;
        // if (this.upgradeListTemp[index]) {
        if (!this.upgradeList) {
            this.upgradeList = []
        }
        this.upgradeList.push({ url: url, index: index, time: spendtime, err: err })
        if (hqq.app.hotServerIndex == index) {
            this.refreshCurUpLine(spendtime, index, err)
        }
        this.upgradeList.sort(function (a, b) {
            if (a.err) {
                return 1
            } else if (b.err) {
                return -1
            } else {
                return a.time - b.time
            }
        })
        this.refreshUpScrollView(this.upgradeList)
        this.refreshUpProcess(this.upgradeList.length)
        // } else {
        //     this.upgradeListTemp[index] = { url: url, index: index, time: spendtime, err: err }
        // }
    },
    testCenterCallBack(url, index, spendtime, err) {
        if(!cc.isValid(this.node))return;
        this.centerList.push({ url: url, index: index, time: spendtime, err: err })
        this.centerList.sort(function (a, b) {
            if (a.err) {
                return 1
            } else if (b.err) {
                return -1
            } else {
                return a.time - b.time
            }
        })
        if (hqq.app.serverIndex == index) {
            this.refreshCurCenterLine(spendtime, index, err)
        }
        this.refreshCenterScrollView(this.centerList)
        this.refreshCenterProcess(this.centerList.length)
        // if ((index + 1) == this.centerTempList.length) {
        //     this.startCenterTestBtn.interactable = true
        // }
    },
    refreshCurUpLine(spendtime, index, err) {
        if (err) {
            let color = cc.color(255, 255, 255)
            this.upCurLineLabelNode.color = color
            this.upCurLineLabelNode.getComponent(cc.Label).string = hqq.getTip("line") + (index + 1)
            let speed = this.curUpLine.getChildByName('speed')
            speed.color = color
            speed.getComponent(cc.Label).string = "-----"
        } else {
            let color = this.getColor(spendtime)
            this.upCurLineLabelNode.color = color
            this.upCurLineLabelNode.getComponent(cc.Label).string = hqq.getTip("line") + (index + 1)
            let speed = this.curUpLine.getChildByName('speed')
            speed.color = color
            speed.getComponent(cc.Label).string = spendtime + "ms"
        }
    },
    refreshCurCenterLine(spendtime, index, err) {
        if (err) {
            let color = cc.color(255, 255, 255)
            this.cCurLineLabelNode.color = color
            this.cCurLineLabelNode.getComponent(cc.Label).string = hqq.getTip("line") + (index + 1)
            let speed = this.curCenterLine.getChildByName('speed')
            speed.color = color
            speed.getComponent(cc.Label).string = "-----"
        } else {
            let color = this.getColor(spendtime)
            this.cCurLineLabelNode.color = color
            this.cCurLineLabelNode.getComponent(cc.Label).string = hqq.getTip("line") + (index + 1)
            let speed = this.curCenterLine.getChildByName('speed')
            speed.color = color
            speed.getComponent(cc.Label).string = spendtime + "ms"
        }
    },
    refreshUpScrollView(list) {
        this.upScrollview.content.height = list.length * this.item.height
        this.upScrollview.content.removeAllChildren();
        this.upgradeItemList = [];
        for (let i = 0; i < list.length; i++) {
            if (this.upgradeItemList[i]) {
                this.upgradeItemList[i].active = true
            } else if (i >= this.upgradeItemList.length) {
                let item = cc.instantiate(this.item)
                let choicebtn = item.getChildByName("choicebtn")
                if (hqq.app.pinpai == "fuxin" ) {
                    hqq.setBtn(choicebtn, { normal: "base/language/" + hqq.language + "/fuxin/xz", pressed: "base/language/" + hqq.language + "/fuxin/xz1", transition: cc.Button.Transition.SPRITE })
                } else if (hqq.app.pinpai == "xingui") {
                    hqq.setBtn(choicebtn, { normal: "base/xingui/img/btn_2", pressed: "base/xingui/img/btn_22", transition: cc.Button.Transition.SPRITE })
                    hqq.addNode(choicebtn, { string: "xz", fontSize: 22, y: -10 })
                } else if (hqq.app.pinpai == "xinsheng" || hqq.app.pinpai == "xinlong") {
                    hqq.btnLoad(choicebtn, "base/language/" + hqq.language + "/xinsheng/xzbtn")
                } else if (hqq.app.pinpai == "juding" ) {
                    hqq.setBtn(choicebtn, { normal: "base/language/" + hqq.language + "/juding/xz", pressed: "base/language/" + hqq.language + "/juding/xz1", transition: cc.Button.Transition.SPRITE })
                } else if (hqq.app.pinpai == "ninetwo" ) {
                    hqq.setBtn(choicebtn, { normal: "base/ninetwo/dating_btn_small", aniname:"animation",loop:true,timeScale:0.95 })
                    hqq.addNode(choicebtn, { string: "xz", fontSize: 22, y: -10 ,color:cc.color(59,31,11),bold:true})
                } else {
                    hqq.btnLoad(choicebtn, "base/language/" + hqq.language + "/img/btn_c1", "base/language/" + hqq.language + "/img/btn_c2")
                }
                let x = 0
                let y = -i * this.item.height
                item.setPosition(x, y)
                item.active = true
                this.upScrollview.content.addChild(item)
                if(hqq.app.pinpai == "huaxing"){
                    if (this.data.choicetype ) {
                        item.width = 620;
                    } else {
                        item.width = 460;
                    }
                }
                this.upgradeItemList.push(item)
                var clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node;
                clickEventHandler.component = "hqqNetPanel";
                clickEventHandler.handler = "onClickChoiceCurUpLine";
                let button = item.getChildByName('choicebtn').getComponent(cc.Button);
                button.clickEvents.push(clickEventHandler);
            }
            let color = this.getColor(list[i].time)
            let btn = this.upgradeItemList[i].getChildByName('choicebtn').getComponent(cc.Button)
            let speed = this.upgradeItemList[i].getChildByName('speed')
            let curline = this.upgradeItemList[i].getChildByName('curline')
            btn._myinfo = list[i]
            btn.clickEvents[0].customEventData = i + "/" + list[i].index
            if (list[i].err) {
                color = cc.color(255, 255, 255)
                btn.interactable = false
                speed.getComponent(cc.Label).string = "-----"
            } else {
                btn.interactable = true
                speed.getComponent(cc.Label).string = list[i].time + "ms"
            }
            curline.color = color
            curline.getComponent(cc.Label).string = hqq.getTip("line") + (list[i].index + 1)
            speed.color = color
        }
    },
    refreshCenterScrollView(list) {
        this.centerScrollview.content.height = list.length * this.item.height
        this.centerScrollview.content.removeAllChildren();
        this.centerItemList = [];
        for (let i = 0; i < list.length; i++) {
            if (this.centerItemList[i]) {
                this.centerItemList[i].active = true
            } else if (i >= this.centerItemList.length) {
                let item = cc.instantiate(this.item)
                let choicebtn = item.getChildByName("choicebtn")
                if (hqq.app.pinpai == "fuxin" ) {
                    hqq.setBtn(choicebtn, { normal: "base/language/" + hqq.language + "/fuxin/xz", pressed: "base/language/" + hqq.language + "/fuxin/xz1", transition: cc.Button.Transition.SPRITE })
                } else if (hqq.app.pinpai == "xingui") {
                    hqq.setBtn(choicebtn, { normal: "base/xingui/img/btn_2", pressed: "base/xingui/img/btn_22", transition: cc.Button.Transition.SPRITE })
                    hqq.addNode(choicebtn, { string: "xz", fontSize: 22, y: -10 })
                } else if (hqq.app.pinpai == "xinsheng" || hqq.app.pinpai == "xinlong") {
                    hqq.btnLoad(choicebtn, "base/language/" + hqq.language + "/xinsheng/xzbtn")
                } else if (hqq.app.pinpai == "juding" ) {
                    hqq.setBtn(choicebtn, { normal: "base/language/" + hqq.language + "/juding/xz", pressed: "base/language/" + hqq.language + "/juding/xz1", transition: cc.Button.Transition.SPRITE })
                } else if (hqq.app.pinpai == "ninetwo" ) {
                    hqq.setBtn(choicebtn, { normal: "base/ninetwo/dating_btn_small", aniname:"animation",loop:true,timeScale:0.95 })
                    hqq.addNode(choicebtn, { string: "xz", fontSize: 22, y: -10 ,color:cc.color(59,31,11),bold:true})
                } else {
                    hqq.btnLoad(choicebtn, "base/language/" + hqq.language + "/img/btn_c1", "base/language/" + hqq.language + "/img/btn_c2")
                }
                let x = 0
                let y = -i * this.item.height
                item.setPosition(x, y)
                item.active = true
                this.centerScrollview.content.addChild(item)
                if(hqq.app.pinpai == "huaxing"){
                    if (this.data.choicetype ) {
                        item.width = 620;
                    } else {
                        item.width = 460;
                    }
                }
                this.centerItemList.push(item)
                var clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node;
                clickEventHandler.component = "hqqNetPanel";
                clickEventHandler.handler = "onClickChoiceCurCenterLine";
                let button = item.getChildByName('choicebtn').getComponent(cc.Button);
                button.clickEvents.push(clickEventHandler);
            }
            let color = this.getColor(list[i].time)
            let curline = this.centerItemList[i].getChildByName('curline')
            let speed = this.centerItemList[i].getChildByName('speed')
            let btn = this.centerItemList[i].getChildByName('choicebtn').getComponent(cc.Button)
            btn._myinfo = list[i]
            btn.clickEvents[0].customEventData = i + "/" + list[i].index
            if (list[i].err) {
                color = cc.color(255, 255, 255)
                btn.interactable = false
                speed.getComponent(cc.Label).string = "-----"
            } else {
                btn.interactable = true
                speed.getComponent(cc.Label).string = list[i].time + "ms"
            }
            curline.color = color
            curline.getComponent(cc.Label).string = hqq.getTip("line") + (list[i].index + 1)
            speed.color = color
        }
    },
    getColor(time) {
        if (time <= hqq.app.netState.outstanding) {
            return cc.color(146, 255, 24)
        } else if (time <= hqq.app.netState.good) {
            return cc.color(255, 185, 29)
        } else if (time <= hqq.app.netState.kind) {
            return cc.color(255, 21, 36)
        } else if (time <= hqq.app.netState.bad) {
            return cc.color(145, 145, 145)
        } else {
            return cc.color(255, 255, 255)
        }
    },
    onClickExit() {
        hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, "closeChoiceLimeLayer");
        this.exitFunc()
    },
    onClickQuikLogin() {
        if (this.upgradeList && this.upgradeList[0] && !this.upgradeList[0].err) {
            hqq.app.hotServerIndex = this.upgradeList[0].index;
            hqq.localStorage.globalSet(hqq.app.hotServerIndexKey, hqq.app.hotServerIndex);
            hqq.app.canHotServer = this.data.upgradeList[this.upgradeList[0].index];
            hqq.localStorage.globalSet(hqq.app.canHotServerKey, hqq.app.canHotServer);
        } else {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("waittestline"))
            return
            // hqq.app.canHotServer = this.data.upgradeList[hqq.app.hotServerIndex];
        }
        if ( !this.data.choicetype ) {
            if (this.centerList && this.centerList[0] && !this.centerList[0].err) {
                hqq.app.server = this.data.centerList[this.centerList[0].index];
                hqq.localStorage.globalSet(hqq.app.serverKey, hqq.app.server);
                hqq.app.serverIndex = this.centerList[0].index;
                hqq.localStorage.globalSet(hqq.app.serverIndexKey, this.centerList[0].index);
            } else {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("waittestline"))
                return
                // hqq.app.server = this.data.centerList[hqq.app.serverIndex];
            }
        }
        this.onClickExit()
    },
    onClickChoiceCurUpLine(event, customEventData) {
        for (let i = 0; i < this.upgradeItemList.length; i++) {
            let btn = this.upgradeItemList[i].getChildByName('choicebtn').getComponent(cc.Button)
            if (btn.clickEvents[0].customEventData == customEventData || btn._myinfo.err) {
                btn.interactable = false
            } else {
                btn.interactable = true
            }
        }
        let infolist = customEventData.split("/")
        let index0 = parseInt(infolist[0])
        let index1 = parseInt(infolist[1])
        this.upchoice = index0 + 1
        hqq.app.canHotServer = this.data.upgradeList[index1];
        hqq.localStorage.globalSet(hqq.app.canHotServerKey, hqq.app.canHotServer);

        hqq.app.hotServerIndex = index1;
        hqq.localStorage.globalSet(hqq.app.hotServerIndexKey, index1);
        this.refreshCurUpLine(this.upgradeList[index0].time, index1)
        cc.log("选择情况", this.upchoice, this.centerchoice)
        if ( this.data.choicetype || this.centerchoice) {
            this.onClickExit()
        }
    },
    onClickChoiceCurCenterLine(event, customEventData) {
        for (let i = 0; i < this.centerItemList.length; i++) {
            let btn = this.centerItemList[i].getChildByName('choicebtn').getComponent(cc.Button)
            if (btn.clickEvents[0].customEventData == customEventData || btn._myinfo.err) {
                btn.interactable = false
            } else {
                btn.interactable = true
            }
        }
        let infolist = customEventData.split("/")
        let index0 = parseInt(infolist[0])
        let index1 = parseInt(infolist[1])
        this.centerchoice = index0 + 1
        hqq.app.server = this.data.centerList[index1];
        hqq.localStorage.globalSet(hqq.app.serverKey, hqq.app.server);

        hqq.app.serverIndex = index1;
        hqq.localStorage.globalSet(hqq.app.serverIndexKey, index1);
        this.refreshCurCenterLine(this.centerList[index0].time, index1)
        cc.log("选择情况", this.upchoice, this.centerchoice)
        if (this.upchoice) {
            this.onClickExit()
        }
    },
    refreshUpProcess(curnun) {
        let len = this.upgradeTempList.length
        if (curnun < len) {
            this.upprocess.string = curnun + "/" + len + hqq.getTip("testingline")
        } else {
            setTimeout(() => {
                this.testEnd = true
            }, 1000)
            this.upprocess.string = hqq.getTip("testedline")
        }
    },
    refreshCenterProcess(curnun) {
        if (curnun < this.centerTempList.length) {
            this.cneterprocess.string = curnun + "/" + this.centerTempList.length + hqq.getTip("testingline")
        } else {
            this.cneterprocess.string = hqq.getTip("testedline")
        }
    },
    onClickRefreshTest() {
        if (!this.testEnd) {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("waitfortestend"))
            return
        }
        hqq.hasLineChoiceLayer = false
        let data = hqq.commonTools.jsonCopy(this.data);
        data.exitFunc = this.data.exitFunc;
        this.node.destroy()
        hqq.http.stopTestLint();
        setTimeout(() => {
            hqq.eventMgr.dispatch(hqq.eventMgr.showLineChoiceLayer, data)
        }, 500);
    }
    // update (dt) {},
});