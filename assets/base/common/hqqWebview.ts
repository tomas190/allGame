import * as cc from 'cc';
const { ccclass, property } = cc._decorator;

@ccclass('hqqWebview')
export default class hqqWebview extends cc.Component {
    @property(cc.WebView)
    web: cc.WebView | null = null;
    jiazai: cc.Label | null = null;
    loadcount: number = 0;
    jiaziTimerID: number = null;
    start() {
        if (cc.isValid(this.web)) {
            if( !cc.isValid(this.web.node.getComponent(cc.UIOpacity))){
                this.web.addComponent(cc.UIOpacity);
            }
            this.web.node.getComponent(cc.UIOpacity).opacity = 0;
            this.web.node.getComponent(cc.UITransform).width = 0;
            this.web.node.getComponent(cc.UITransform).height = 0;
        }
        let tempnode = new cc.Node("event_popupWin_loading");
        this.node.addChildEx(tempnode);
        hqq.setSkeleton(tempnode, { path: "bigimg/event_popupWin_loading/", aniname: "animation", loop: true });
        hqq.addNode(tempnode, { normal: "base/img/btn_close", x: 200, y: 200, callback: "onForceClose", script: this });
        tempnode = null;
        // this.scheduleOnce(()=>{
        //     this.onClose();
        // },8)
    }
    public onWebviewEvent(webview: cc.WebView, eventType: cc.__private._cocos_web_view_web_view_enums__EventType): void {
        if (eventType === cc.__private._cocos_web_view_web_view_enums__EventType.LOADED) {
            this.loadcount++;
            cc.log("onWebviewEvent cc.WebView.EventType.LOADED")
            if (cc.isValid(this.web)) {
                if (this.jiaziTimerID) {
                    clearInterval(this.jiaziTimerID);
                }
                if (cc.isValid(this.jiazai)) {
                    cc.Tween.stopAllByTarget(this.jiazai)
                    this.jiazai.node.active = false;
                }
                this.web.node.getComponent(cc.UIOpacity).opacity = 255;
                this.web.node.getComponent(cc.UITransform).width = 1030;
                this.web.node.getComponent(cc.UITransform).height = 570;
                this.web.node.setPosition( 0 , 0 );
                if (hqq.app.pinpai == "fuxin") {
                    hqq.setSprite(this.node.getChildByName("main_top"), { path: "bigimg/fx_banner_top", width: 1030, height: 84, x: 0, y: 322 });
                    // hqq.setSkeleton( this.node.getChildByName("eff_top_btn_back"),{path:"bigimg/fx_fh_hk/",aniname:"animation",x:-458,y:335,loop:true});
                    this.node.getChildByName("eff_top_btn_back").active = false;
                    hqq.setBtn(this.node.getChildByName("back"), { normal: "/base/img/fx_hd_btn_close", callback: "onClose", script: this });
                    hqq.setSprite(cc.find("main_top/title", this.node), { path: "base/language/" + hqq.language + "/img/fx_top_banner_hd", width: 375, height: 88, y: 5 });
                    hqq.setSprite(cc.find("di", this.node), { path: "bigimg/fx_hd_di", width: 1040, height: 665, x: 0, y: 40 });
                    hqq.setSprite(cc.find("mask", this.node), { path: "bigimg/fx_hd_mask1", width: 1032, height: 657, x: 0, y: 40 });
                } else if (hqq.app.pinpai == "juding") {
                    this.node.getChildByName("eff_top_btn_back").active = false;
                    hqq.setBtn(this.node.getChildByName("back"), { normal: "base/juding/img/jd_popup_btn_close", callback: "onClose", script: this, x: 485, y: 320 });
                    hqq.setSprite(cc.find("main_top/title", this.node), { Res: hqq["hall_" + hqq.app.pinpai], path: "language/" + hqq.language + "/juding/jd_popup_event_title", width: 332, height: 72, y: -10 });
                    hqq.setSprite(cc.find("mask", this.node), { Res: hqq["hall_" + hqq.app.pinpai], path: "juding/bigimg/jd_popup_bg", width: 1047, height: 646, x: 0, y: 30 });
                } else if (hqq.app.pinpai == "xinlong") {
                    this.node.getChildByName("eff_top_btn_back").active = false;
                    hqq.setBtn(this.node.getChildByName("back"), { normal: "base/xinlong/img/jd_popup_btn_close", callback: "onClose", script: this, x: 485, y: 320 });
                    hqq.setSprite(cc.find("main_top/title", this.node), { Res: hqq["hall_" + hqq.app.pinpai], path: "language/" + hqq.language + "/xinlong/jd_popup_event_title", width: 332, height: 72, y: -10 });
                    hqq.setSprite(cc.find("mask", this.node), { Res: hqq["hall_" + hqq.app.pinpai], path: "xinlong/bigimg/jd_popup_bg", width: 1047, height: 646, x: 0, y: 30 });
                } else if (hqq.app.pinpai == "xinsheng") {
                    hqq.setSprite(this.node.getChildByName("main_top"), { path: "bigimg/zhibo_banner_top", width: 1030, height: 84, x: 0, y: 322 });
                    // hqq.setSkeleton( this.node.getChildByName("eff_top_btn_back"),{path:"bigimg/fx_fh_hk/",aniname:"animation",x:-458,y:335,loop:true});
                    this.node.getChildByName("eff_top_btn_back").active = false;
                    hqq.setBtn(this.node.getChildByName("back"), { normal: "/base/img/hj_hd_btn_close1", callback: "onClose", script: this });
                    hqq.setSprite(cc.find("main_top/title", this.node), { path: "base/language/" + hqq.language + "/img/top_banner_hd", width: 375, height: 88, y: 5 });
                    hqq.setSprite(cc.find("di", this.node), { path: "bigimg/hj_hd_di", width: 1040, height: 665, x: 0, y: 40 });
                    hqq.setSprite(cc.find("mask", this.node), { path: "bigimg/fx_hd_mask1", width: 1032, height: 657, x: 0, y: 40 });
                } else if (hqq.app.pinpai == "huaxing") {
                    this.node.getChildByName("eff_top_btn_back").active = false;
                    hqq.setBtn(this.node.getChildByName("back"), { normal: "/base/huaxing/img/btn_x", callback: "onClose", script: this, x: 510, y: 335 });
                    hqq.setSprite(cc.find("main_top/title", this.node), { Res: hqq["hall_" + hqq.app.pinpai], path: "language/" + hqq.language + "/huaxing/16", width: 224, height: 61 });
                    hqq.addNode(cc.find("main_top", this.node), { path: "base/huaxing/img/d_tit", width: 458, height: 87, x: 0, zIndex: -1, type: cc.Sprite.Type.SLICED });
                    hqq.setSprite(cc.find("main_top", this.node), { Res: hqq["hall_" + hqq.app.pinpai], path: "huaxing/bigimg/di", width: 1030, height: 84 });
                } else if (hqq.app.pinpai == "ninetwo") {
                    this.node.getChildByName("eff_top_btn_back").active = false;
                    hqq.setBtn(this.node.getChildByName("back"), { normal: "/base/ninetwo/img/guanbi", callback: "onClose", script: this, x: 510, y: 350 });
                    hqq.setSprite(cc.find("main_top/title", this.node), { Res: hqq["hall_" + hqq.app.pinpai], path: "language/" + hqq.language + "/ninetwo/img/92event_frame_title", width: 322, height: 46 });
                    hqq.setSprite(cc.find("main_top", this.node), { Res: hqq["hall_" + hqq.app.pinpai], path: "ninetwo/bigimg/92event_frame_top", width: 1030, height: 84 });
                    hqq.setSprite(cc.find("di", this.node), { Res: hqq["hall_" + hqq.app.pinpai], path: "ninetwo/bigimg/92event_frame_bg", width: 1040, height: 665, x: 0, y: 40 });
                } else if (hqq.app.pinpai == "tianqi") {
                    hqq.setSprite(this.node.getChildByName("main_top"), { path: "bigimg/tianqi/hj_hd_banner_top2", width: 1030, height: 84 });
                    // hqq.setSkeleton( this.node.getChildByName("eff_top_btn_back"),{path:"bigimg/zhibo_top_btn_back/",aniname:"animation",loop:true});
                    this.node.getChildByName("eff_top_btn_back").active = false;
                    hqq.setBtn(this.node.getChildByName("back"), { normal: "/base/img/hj_hd_btn_close2", callback: "onClose", script: this });
                    hqq.setSprite(cc.find("main_top/title", this.node), { path: "base/language/" + hqq.language + "/img/hj_top_banner_hd2", width: 375, height: 88 });
                    hqq.setSprite(cc.find("di", this.node), { path: "bigimg/hj_hd_di", width: 1040, height: 665, x: 0, y: 40 });
                    hqq.setSprite(cc.find("mask", this.node), { path: "bigimg/fx_hd_mask1", width: 1032, height: 657, x: 0, y: 40 });
                } else {
                    hqq.setSprite(this.node.getChildByName("main_top"), { path: "bigimg/hj_hd_banner_top2", width: 1030, height: 84 });
                    // hqq.setSkeleton( this.node.getChildByName("eff_top_btn_back"),{path:"bigimg/zhibo_top_btn_back/",aniname:"animation",loop:true});
                    this.node.getChildByName("eff_top_btn_back").active = false;
                    hqq.setBtn(this.node.getChildByName("back"), { normal: "/base/img/hj_hd_btn_close2", callback: "onClose", script: this });
                    hqq.setSprite(cc.find("main_top/title", this.node), { path: "base/language/" + hqq.language + "/img/hj_top_banner_hd2", width: 375, height: 88 });
                    hqq.setSprite(cc.find("di", this.node), { path: "bigimg/hj_hd_di", width: 1040, height: 665, x: 0, y: 40 });
                    hqq.setSprite(cc.find("mask", this.node), { path: "bigimg/fx_hd_mask1", width: 1032, height: 657, x: 0, y: 40 });
                }
                this.unscheduleAllCallbacks();
                this.node.getChildByName("event_popupWin_loading").active = false;
                if (!cc.sys.isBrowser) {
                    this.web.setJavascriptInterfaceScheme('closewebview');
                    let jsCallback = () => {
                        hqq.eventMgr.dispatch(hqq.eventMgr.showPayActivityWeb, false);
                    }
                    this.web.setOnJSCallback(jsCallback);
                }
                else if (this.loadcount > 1) {
                    hqq.eventMgr.dispatch(hqq.eventMgr.showPayActivityWeb, false);
                }
            }
        }
    }
    onDestroy() {
        if (this.jiaziTimerID) {
            clearInterval(this.jiaziTimerID);
        }
    }
    onClose() {
        if (this.jiaziTimerID) {
            clearInterval(this.jiaziTimerID);
        }
        this.loadcount = 0;
        hqq.eventMgr.dispatch(hqq.eventMgr.showPayActivityWeb, false);
        hqq.eventMgr.dispatch(hqq.eventMgr.refreshPlayerGold, null);
    }
    onForceClose() {
        if (this.jiaziTimerID) {
            clearInterval(this.jiaziTimerID);
        }
        this.loadcount = 0;
        hqq.eventMgr.dispatch(hqq.eventMgr.showPayActivityWeb, false, true);
        hqq.eventMgr.dispatch(hqq.eventMgr.refreshPlayerGold, null);
    }
}