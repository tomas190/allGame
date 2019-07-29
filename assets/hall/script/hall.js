/*
 * @Author: burt
 * @Date: 2019-07-27 14:58:41
 * @LastEditors: burt
 * @LastEditTime: 2019-07-29 09:42:19
 * @Description: 大厅场景
 */
const hallConfig = require('hallConfig');
cc.Class({
    extends: cc.Component,

    properties: {
        itembtn: cc.Node, // 子游戏按钮
        subgameview: cc.ScrollView, // 子游戏按钮缓动面板
    },

    /** 脚本组件初始化，可以操作this.node // use this for initialization */
    onLoad() {
        for (let i = 0; i < hallConfig.gamelist.length; i++) {
            let tempdata = hallConfig.gamelist[i];
            let itembtn = cc.instantiate(this.itembtn);
            itembtn.x = -this.itembtn.width * 1.5 + Math.floor(i / 2) * (this.itembtn.width + 5);
            itembtn.y = -i % 2 * this.itembtn.height - this.itembtn.height * 0.5;
            itembtn.active = true;
            this.subgameview.content.addChild(itembtn);
            let namelabel = itembtn.getChildByName("namelabel");
            namelabel.getComponent(cc.Label).string = tempdata.name;
            var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node;
            clickEventHandler.component = "hall";
            clickEventHandler.handler = "onClickSubgame";
            clickEventHandler.customEventData = tempdata;
            let button = itembtn.getComponent(cc.Button);
            button.clickEvents.push(clickEventHandler);
        }
    },
    /** enabled和active属性从false变为true时 */
    // onEnable() { },
    /** 通常用于初始化中间状态操作 */
    start() {

    },

    onClickSubgame(event, subgameconfig) {
        cc.director.loadScene(subgameconfig.lanchscene);
    }

    /** 每帧调用一次 // called every frame */
    // update(dt) { },
    /** 所有组件update执行完之后调用 */
    // lateUpdate() { },
    /** 调用了 destroy() 时回调，当帧结束统一回收组件 */
    // onDestroy() { },
});
