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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {
    //     this.sEnterEndAniName = "Scene_05_Run";
    // },

    FadeOutSelf() {
        let callback = cc.callFunc(this.FadeInSelf, this);
        this.node.runAction(cc.sequence(cc.fadeTo(2,0), callback));
    },

    FadeInSelf() {
        let callback = cc.callFunc(this.FadeOutSelf, this);
        this.node.runAction(cc.sequence(cc.fadeTo(2,255), callback));
    },

    onEnterEnd() {
        this.FadeOutSelf()
    },    

    ExitScenePre() {
        this.node.stopAllActions();
    },

    start () {

    },

    // update (dt) {},
});
