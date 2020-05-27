let gHandler = require('gHandler')
let commonVal = require('proxy-http')
cc.Class({
  extends: cc.Component,
  properties: {
    messagePrefab: {
      type: cc.Prefab,
      default: null
    }
  },
  onLoad() {
    commonVal.account_name = gHandler.gameGlobal.player.account_name
    commonVal.package_id = gHandler.gameGlobal.proxy.package_id
  },
  onMessagePrefabNeeded: function(e, string) {
    console.log('onMessagePrefabNeeded', e, string)
    var message = cc.instantiate(this.messagePrefab)
    //获取预制资源中的js组件，并作出相应操作
    var messageScript = message.getComponent('proxy-messagePrefab')
    //开始操作JS组件脚本
    messageScript.setMessage(string) //开始为JS组件进行初始化操作,action 为自定义初始化方法
    //将预制资源添加到父节点
    cc.find('Canvas/message').addChild(message)
  },
  onCopyClick: function(e, string) {
    //web平台复制到剪切板
    // var save = function(e) {
    //   e.clipboardData.setData("text/plain", "待复制本文");
    //   e.preventDefault();
    // }.bind(this);
    // document.addEventListener("copy", save);
    // document.execCommand("copy");
    // document.removeEventListener("copy", save);
    console.log(string)
    if (gHandler.Reflect) {
      if (gHandler.Reflect.setClipboard(string)) {
        // gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "复制id成功");
        this.onMessagePrefabNeeded(null, '复制成功')
      } else {
        // gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "复制id失败");
        this.onMessagePrefabNeeded(null, '复制失败')
      }
    } else {
      this.onMessagePrefabNeeded(null, '操作失败')
    }
    // gHandler.Reflect && gHandler.Reflect.setClipboard(string);
  },
  start() {},
  onExit() {
    cc.director.loadScene(gHandler.gameConfig.hallconfig.lanchscene)
  }

  // update (dt) {},
})
