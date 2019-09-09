/*
 * @Author: burt
 * @Date: 2019-07-27 16:57:02
 * @LastEditors: burt
 * @LastEditTime: 2019-09-09 16:33:05
 * @Description: 通用加载场景
 */
let gHandler = require("gHandler");
cc.Class({
    extends: cc.Component,

    properties: {
        label: cc.Label,
        progresslabel: cc.Label,
        hallmanifest: {
            type: cc.Asset,
            default: null
        }
    },

    /** 脚本组件初始化，可以操作this.node // use this for initialization */
    onLoad() {
        this.tempTime = 0;
        this.state = 0;
        this.info = "资源加载中";
        switch (gHandler.gameGlobal.gameNow) {
            case gHandler.gameConfig.hallconfig.enname:
                if (gHandler.gameGlobal.isdev) {
                    cc.director.loadScene('hall')
                } else {
                    let loginSript = require("appLogin")
                    loginSript.init({
                        callback: (str, state) => {
                            this.info = str || this.info;
                            this.state = state || this.state
                        },
                        hallmanifest: this.hallmanifest,
                    })
                }
                break;
            case gHandler.gameConfig.gamelist[0].enname:
                // 抢庄牛牛
                break;
        }
    },

    /** enabled和active属性从false变为true时 */
    // onEnable() { },
    /** 通常用于初始化中间状态操作 */
    start() {
    },

    /** 每帧调用一次 // called every frame */
    update(dt) {
        this.tempTime += dt;
        if (this.tempTime >= 0.2) {
            this.tempTime = 0;
            if (this.state == 0) {
                if (this.label.string.length >= 8) {
                    this.label.string = this.info;
                } else {
                    this.label.string = this.label.string + ".";
                }
            } else if (this.state == 1) {
                this.progresslabel.string = this.progresslabel.string + ">";
                if (this.label.string.length >= 8) {
                    this.label.string = this.info;
                } else {
                    this.label.string = this.label.string + ".";
                }
            } else if (this.state == 2) {
                this.label.string = this.info;
                this.progresslabel.string = ""
            }
        }
    },
    /** 所有组件update执行完之后调用 */
    // lateUpdate() { },
    /** 调用了 destroy() 时回调，当帧结束统一回收组件 */
    // onDestroy() { },
});

