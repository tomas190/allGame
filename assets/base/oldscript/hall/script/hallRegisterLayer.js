
cc.Class({
    extends: cc.Component,

    properties: {
        numfont: cc.LabelAtlas,
        xsnumfont: cc.LabelAtlas,
        goldlabel: cc.Label,
        chongzhi: cc.Label,
        xhnumfont: cc.LabelAtlas,
    },

    onLoad() {
        this.data = null;
        this.UILoad()
    },

    start() {

    },
    // UI动态加载
    UILoad() {
        let givejinbi = cc.find("registerlayer/aninode/givejinbi")
        let registerbtn = cc.find("registerlayer/aninode/registerbtn")
        if (hqq.app.pinpai != "xinsheng" ){
            hqq.btnLoad(registerbtn, "base/language/" + hqq.language + "/img/registerbtn")
        }
        let aninode = cc.find("registerlayer/aninode")
        let closebtn = cc.find("registerlayer/aninode/p_close")
        if (hqq.app.pinpai == "fuxin" ) {
            registerbtn.active = false
            hqq.setBtn(closebtn, { path: "base/img/btn_close", x: 360, y: 250 })
            hqq.skeletonLoad(aninode, "language/" + hqq.language + "/fuxinregisterani", "animation", true,hqq["hall_"+hqq.app.pinpai])
        } else if (hqq.app.pinpai == "juding" ) {
            registerbtn.active = false
            hqq.setBtn(closebtn, { Res:hqq["hall_"+hqq.app.pinpai],path: "juding/btn_close", x: 360, y: 250 })
            hqq.skeletonLoad(aninode, "language/" + hqq.language + "/fuxinregisterani", "animation", true,hqq["hall_"+hqq.app.pinpai])
        } else if (hqq.app.pinpai == "xinsheng" ) {
            this.chongzhi.font = this.xsnumfont
            this.chongzhi.fontSize = 50
            this.chongzhi.string = "3-"
            this.chongzhi.node.x = -35
            this.chongzhi.node.y = -70
            this.goldlabel.font = this.xsnumfont
            this.goldlabel.fontSize = 50
            this.goldlabel.string = "388"
            this.goldlabel.node.x = 80
            this.goldlabel.node.y = -70
            hqq.setSprite(aninode, {Res:hqq["hall_"+hqq.app.pinpai],path:"language/" + hqq.language + "/bigimg/d",width:1096,height:750,widget:{horizontalCenter:0,verticalCenter:0}})
            hqq.setSprite(registerbtn, { Res:hqq["hall_"+hqq.app.pinpai],path: "language/" + hqq.language + "/xinsheng/btn", position: { x: 0, y: -230 } })
            hqq.setBtn(closebtn, { path: "base/xinsheng/img/exit" })
        } else if ( hqq.app.pinpai == "xinlong" ) {
            this.chongzhi.font = this.xsnumfont
            this.chongzhi.fontSize = 65
            this.chongzhi.string = "200"
            this.chongzhi.node.x = -40
            this.chongzhi.node.y = -180
            this.goldlabel.font = this.xsnumfont
            this.goldlabel.fontSize = 80
            this.goldlabel.string = "28"
            this.goldlabel.node.x = 270
            this.goldlabel.node.y = -174
            hqq.setSprite(givejinbi, { path: "base/language/" + hqq.language + "/img/givejinbi3", position: { x: 400, y: -205 } })
            hqq.skeletonLoad(aninode, "language/" + hqq.language + "/huodong_signupbonus", "xunhuan", true,hqq["hall_"+hqq.app.pinpai])
            hqq.setBtn(closebtn, { path: "base/xinsheng/img/exit" })
        } else if ( hqq.app.pinpai == "xingui") {
            this.chongzhi.font = this.xsnumfont
            this.chongzhi.fontSize = 65
            this.chongzhi.string = "200"
            this.chongzhi.node.x = -45
            this.chongzhi.node.y = -180
            this.goldlabel.font = this.xsnumfont
            this.goldlabel.fontSize = 80
            this.goldlabel.string = "60"
            this.goldlabel.node.x = 270
            this.goldlabel.node.y = -174
            hqq.setSprite(givejinbi, { path: "base/language/" + hqq.language + "/img/givejinbi3", position: { x: 400, y: -205 } })
            hqq.skeletonLoad(aninode, "language/" + hqq.language + "/huodong_signupbonus2", "xunhuan", true,hqq["hall_"+hqq.app.pinpai])
            hqq.setBtn(closebtn, { path: "base/xinsheng/img/exit" })
        } else if (hqq.app.pinpai == "debi") {
            this.goldlabel.font = this.xsnumfont
            this.goldlabel.fontSize = 80
            this.goldlabel.string = "2"
            this.goldlabel.node.x = 220
            this.goldlabel.node.y = -174
            hqq.setSprite(givejinbi, { path: "base/language/" + hqq.language + "/img/givejinbi", position: { x: 345, y: -194 } })
            hqq.skeletonLoad(aninode, "bigimg/language/" + hqq.language + "/xinshenghuodong", "xunhuan", true)
            hqq.setBtn(closebtn, { path: "base/xinsheng/img/exit" })
        } else if(hqq.app.pinpai == "xinhao"){
            this.chongzhi.font = this.xhnumfont
            this.chongzhi.fontSize = 65
            this.chongzhi.string = "3-"
            this.chongzhi.node.x = 15
            this.chongzhi.node.y = -180
            this.goldlabel.font = this.xhnumfont
            this.goldlabel.fontSize = 65
            this.goldlabel.string = "388"
            this.goldlabel.node.x = 180
            this.goldlabel.node.y = -180
            hqq.setSprite(givejinbi, { Res:hqq["hall_test"],path: "language/" + hqq.language + "/xinhao/givejinbi4", position: { x: 380, y: -185 } })
            hqq.skeletonLoad(aninode, "language/" + hqq.language + "/huodong_signupbonus3", "xunhuan", true,hqq["hall_test"])
            hqq.setBtn(closebtn, { path: "base/xinsheng/img/exit" })
        } else if(hqq.app.pinpai=="nineone"){
            this.goldlabel.font = this.numfont
            this.goldlabel.fontSize = 60
            this.goldlabel.node.x = 240
            this.goldlabel.node.y = -185
            this.goldlabel.string = "10"
            hqq.setSprite(givejinbi, { path: "base/language/" + hqq.language + "/img/givejinbi", position: { x: 400, y: -210 } })
            hqq.skeletonLoad(aninode, "language/" + hqq.language + "/huodong_signupbonus4", "xunhuan", true,hqq["hall_test"])
            hqq.setBtn(closebtn, { path: "base/img/p_close" })
        } else {
            this.goldlabel.font = this.numfont
            this.goldlabel.fontSize = 60
            this.goldlabel.node.x = 220
            this.goldlabel.node.y = -185
            this.goldlabel.string = "3"
            hqq.setSprite(givejinbi, { path: "base/language/" + hqq.language + "/img/givejinbi", position: { x: 380, y: -210 } })
            hqq.skeletonLoad(aninode, "language/" + hqq.language + "/huodong", "xunhuan", true,hqq["hall_test"])
            hqq.setBtn(closebtn, { path: "base/img/p_close" })
        }
    },
    init(data) {
        if(data)
        {
            if (data.exitfunc) {
                this.onClickExit = () => {
                    this.node.destroy()
                    data.exitfunc()
                }
            }
        }
    },

    onClickExit() {
        this.node.destroy()
    },

    onClickRegister() {
        if (hqq.gameGlobal.player.phonenum != "") {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip43"))
        } else {
            hqq.eventMgr.dispatch(hqq.eventMgr.showBiglayer, 3)
            this.node.destroy()
        }
    },

    // update (dt) {},
});
