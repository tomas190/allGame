cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad() {},
    setLabels: function (labels, action) {
        for (let i = 1; i <= 4; i++) {
            this.node.getChildByName(`label${i}`).getComponent("cc.Label").string =
                labels[`label${i}`];
        }
        //根据action判断该栏能否点击
        if (action && action.isNextLevelClickable === true) {
            this.node.getChildByName("checkNextLevel").active = true;
            //通过脚本添加按钮回调
            var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = cc.find("Canvas/baseView/home/page1"); // 这个 node 节点是你的事件处理代码组件所属的节点
            clickEventHandler.component = "proxy-page1"; // 这个是代码文件名
            clickEventHandler.handler = "checkCustomers";
            clickEventHandler.customEventData = labels.id;

            var button = this.node.getChildByName("checkNextLevel").getComponent(cc.Button);
            button.clickEvents.push(clickEventHandler);
        } else {
            this.node.getChildByName("checkNextLevel").active = false;
        }
        // if (action && action.isfirstlevel === true) {
        //     this.node.getChildByName("label5").active = true;
        //     //通过脚本添加按钮回调
        //     var clickEventHandler2 = new cc.Component.EventHandler();
        //     clickEventHandler2.target = cc.find("Canvas/baseView/home/page1"); // 这个 node 节点是你的事件处理代码组件所属的节点
        //     clickEventHandler2.component = "proxy-page1"; // 这个是代码文件名
        //     clickEventHandler2.handler = "popup_transfermoney_modal";
        //     clickEventHandler2.customEventData = labels.id;

        //     var button2 = this.node.getChildByName("label5").getComponent(cc.Button);
        //     button2.clickEvents.push(clickEventHandler2);
        // } else {
        //     this.node.getChildByName("label5").active = false;
        // }
    },
    start() {},

    // update (dt) {},
});
