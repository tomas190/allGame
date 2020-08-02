cc.Class({
  extends: cc.Component,

  properties: {},
  onLeftSideSwich: function(e, num) {
    console.log(num, `btn${num}_active`);
    this.node.getChildByName("btn1_active").active = false;
    this.node.getChildByName("btn2_active").active = false;
    this.node.getChildByName("btn3_active").active = false;
    this.node.getChildByName(`btn${num}_active`).active = true;
    cc.find("Canvas/baseView/home/page2/detailTable").removeAllChildren();
    cc.find("Canvas/baseView/home/page2/basePage").active = true;
    cc.find("Canvas/baseView/home/page1").getComponent("proxy-page1").count = 0;
    this.node
      .getParent()
      .getChildByName("home")
      .getChildByName(`page1`).active = false;
    this.node
      .getParent()
      .getChildByName("home")
      .getChildByName(`page2`).active = false;
    this.node
      .getParent()
      .getChildByName("home")
      .getChildByName(`page3`).active = false;
    this.node
      .getParent()
      .getChildByName("home")
      .getChildByName(`page${num}`).active = true;
  },
  // onLoad () {},

  start() {}

  // update (dt) {},
});
