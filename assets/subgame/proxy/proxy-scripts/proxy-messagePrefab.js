cc.Class({
  extends: cc.Component,

  properties: {
    message: cc.Label
  },
  // onLoad () {},
  start: function() {
    // 2 秒后销毁目标节点
    this.timer = setTimeout(
      function() {
        this.node.destroy();
        // console.log("destroyed!");
      }.bind(this),
      2000
    );
  },
  setMessage: function(string) {
    this.message.string = string;
    //动态更改弹窗背景长度以适应文字长度
    this.node
      .getChildByName("bg")
      .getChildByName("message")
      .getComponent("cc.Label")
      ._forceUpdateRenderData(true);
    let newWidth = this.node.getChildByName("bg").getChildByName("message")
      .width;
    this.node.getChildByName("bg").setContentSize(newWidth + 40, 40);
  },
  // update (dt) {},
  onDestroy() {
    clearTimeout(this.timer);
  }
});
