cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad() {},
    setLabels: function (labels) {
        this.node.getChildByName("cell1").getComponent("cc.Label").string =
            labels.label1;
        this.node.getChildByName("cell2").getComponent("cc.Label").string =
            labels.label2;
        this.node.getChildByName("cell4").getComponent("cc.Label").string =
            labels.label4;
        //通过脚本添加按钮回调
        var targetNode = cc.find("Canvas/baseView/home/page2");
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = targetNode; // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = "proxy-page2"; // 这个是代码文件名
        clickEventHandler.handler = "check_income_details";
        clickEventHandler.customEventData =  labels.label1;

        var button = this.node
            .getChildByName("button")
            .getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);
    },
    start() {},

    // update (dt) {},
});
