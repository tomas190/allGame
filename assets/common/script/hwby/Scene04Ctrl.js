// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var sceneCtlBase = require('SceneCtlBase');

cc.Class({
    extends: cc.Component,
    mixins:[sceneCtlBase],

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //this.AniCtrl = this.node.getComponent(cc.Animation);         
        this.sEnterAniName = "Scene_04_FadeIn";        
    },

    ready() {
        cc.log("script04 ctl ready~~!!");
        let children = this.node.children;
        for (let i = 0; i < children.length; ++i) {
            cc.log("set children[i] set opacity to 0",children[i].name);
            children[i].opacity = 0;
        }  
    },

    // EnterScene() {
    //     this._super();
    //     cc.log("this.AniCtrl.play Scene_04_Run")        
    //     //this.AniCtrl.playAdditive("Scene_04_FadeIn");
    //     this.AniCtrl.playAdditive("Scene_04_Run");
    // },

    EnterSceneAdd() {
        this.AniCtrl.playAdditive("Scene_04_Run");
    },

    // ExitScene() {
    //     this.scene.onSceneExitDone(3);
    // }, 
    
    onFadeInEnd() {

    },

    // update (dt) {},
    // start () {}
});
