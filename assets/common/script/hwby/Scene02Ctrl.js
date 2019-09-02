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
        this.sEnterAniName = "Scene_02_ZoomIn";
        this.sEnterEndAniName = "Scene_02_Zoom";
        // this.sExitAniName = "None";
        // this.sExitEndAniName = "None";        
        //this.AniCtrl = this.node.getComponent(cc.Animation);   
    },

    // EnterScene() {
    //     cc.log("scene02 EnterScene");
    //     this.AniCtrl.play("Scene_02_ZoomIn");
    // },

    // ExitScene() {   
    //     this.scene.onSceneExitDone(1);    
    // },   
    
    // onEnterEnd() {
    //     this.AniCtrl.play("Scene_02_Zoom");
    // },   
    
    ready() {
        this.node.setScale(0);
    },

    // start () {

    // },

    // update (dt) {},
});
