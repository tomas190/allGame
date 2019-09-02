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
        // let sceneNode = this.node.getParent();
        // this.scene = sceneNode.getComponent("Scene");
        // this.AniCtrl = this.node.getComponent(cc.Animation);      
        
        this.sEnterAniName = "Scene_03_Enter";
        //this.sEnterEndAniName = "None";
        this.sExitAniName = "Scene_03_Exit";
        //this.sExitEndAniName = "None";        
    },

    ready() {
        cc.log("scene03ctrl ready!!!");
        this.LeftStone.x = -1200;
        this.RightStone.x = 1200;
    },

    // EnterScene() {
    //     this.AniCtrl.play("Scene_03_Enter");
    // },

    // ExitScene() {
    //     this.AniCtrl.play("Scene_03_Exit");
    // },

    // onEnterEnd() {
    //     this.scene.onSceneEnterDone(2);
    // },

    // onExitEnd() {
    //     this.scene.onSceneExitDone(2);
    // },

    InitAllChildren() {
        cc.log("scene03ctrl InitAllChildren!!!");
        this.LeftStone = this.node.getChildByName("1");
        this.RightStone = this.node.getChildByName("2");
    },

    start () {
    },

    // update (dt) {},
});
