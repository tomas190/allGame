let gHandler = require('gHandler')
let commonVal = require('./public_script/proxy-http')
var Database = require("./public_script/Database");


cc.Class({
  extends: cc.Component,
  properties: {
    messagePrefab: {
      type: cc.Prefab,
      default: null
    },
    // xs_viewPrefab: {
    //   type: cc.Prefab,
    //   default: null
    // },
    // xg_viewPrefab: {
    //   type: cc.Prefab,
    //   default: null
    // },

    // fx_viewPrefab: {
    //   type: cc.Prefab,
    //   default: null
    // },

    // xh_viewPrefab: {
    //   type: cc.Prefab,
    //   default: null
    // },
    // xl_viewPrefab: {
    //   type: cc.Prefab,
    //   default: null
    // },
    // nineone_viewPrefab: {
    //   type: cc.Prefab,
    //   default: null
    // },
    // huangshi_viewPrefab: {
    //   type: cc.Prefab,
    //   default: null
    // },
    // juding_viewPrefab: {
    //   type: cc.Prefab,
    //   default: null
    // },
    // huaxing_viewPrefab: {
    //   type: cc.Prefab,
    //   default: null
    // },
    // ninetwo_viewPrefab: {
    //   type: cc.Prefab,
    //   default: null
    // },
    // test_viewPrefab: {
    //   type: cc.Prefab,
    //   default: null
    // },
    massage: {
      type: cc.Prefab,
      default: null
    }
  },
  onLoad() {
    commonVal.account_name = gHandler.gameGlobal.player.account_name

    commonVal.package_id = gHandler.gameGlobal.proxy.package_id
    console.log(gHandler.app.pinpai);
    if (gHandler.app.pinpai == 'debi') {
      Database.base_dividend_n = 0.02

    }
    //获取大厅音效开关状态 true开 false 关
    // if (gHandler.audioMgr) {
    //   Database.hall_sound = gHandler.audioMgr.getBgState();
    // }
    Database.hall_sound = true;//根据需求默认开启
    // "package_id": 1      特斯特游戏     100% 1
    // "package_id": 2      德比游戏        100% 1
    // "package_id": 3      杏吧娱乐    100%   1
    // "package_id": 6      渔鱼游戏      100%
    // "package_id": 8      新盛游戏     100%  1
    // "package_id": 9      新贵游戏      80%   0.8
    // "package_id": 10    富鑫II游戏     80%
    if (gHandler.app.pinpai == 'xinsheng') {
      gHandler["proxy_xinsheng"].load("baseView", cc.Prefab, (err, prefab) => {
        if (err) {
          cc.log(err);
          return;
        }
        Database.base_dividend_discount = 1;
        let baseview = cc.instantiate(prefab)
        cc.find('Canvas').addChild(baseview)
        let mas = cc.instantiate(this.massage)
        cc.find('Canvas').addChild(mas)
        Database.base_dividend_n = 0.02
      })


    } else if (gHandler.app.pinpai == 'xingui') {
      gHandler["proxy_xingui"].load("baseView", cc.Prefab, (err, prefab) => {
        if (err) {
          cc.log(err);
          return;
        }
      Database.base_dividend_discount = 0.8;
      Database.base_dividend_control = 10;
      Database.base_dividend_n = 0.03;


      let baseview = cc.instantiate(prefab)
      cc.find('Canvas').addChild(baseview)
      let mas = cc.instantiate(this.massage)
      cc.find('Canvas').addChild(mas)
      })

    } else if (gHandler.app.pinpai == 'xinhao') {
      gHandler["proxy_xinhao"].load("baseView", cc.Prefab, (err, prefab) => {
        if (err) {
          cc.log(err);
          return;
        }
      Database.base_dividend_discount = 0.8;
      Database.base_dividend_control = 5;
      Database.base_dividend_n = 0.03;


      let baseview = cc.instantiate(prefab)
      cc.find('Canvas').addChild(baseview)
      let mas = cc.instantiate(this.massage)
      cc.find('Canvas').addChild(mas)
      })

    } else if (gHandler.app.pinpai == 'fuxin' || gHandler.app.pinpai == 'yuyu') {
      gHandler["proxy_fuxin"].load("baseView", cc.Prefab, (err, prefab) => {
        if (err) {
          cc.log(err);
          return;
        }
        if (gHandler.app.pinpai == 'yuyu') {
          Database.base_dividend_discount = 1;
          Database.base_dividend_n = 0

        } else {
          Database.base_dividend_discount = 0.8;
          Database.base_dividend_control = 5;
        }

        let baseview = cc.instantiate(prefab)
        cc.find('Canvas').addChild(baseview)
        let mas = cc.instantiate(this.massage)
        cc.find('Canvas').addChild(mas)
      })



    } else if (gHandler.app.pinpai == 'juding') {
      gHandler["proxy_juding"].load("baseView", cc.Prefab, (err, prefab) => {
        if (err) {
          cc.log(err);
          return;
        }
      console.log('巨鼎');
      Database.base_dividend_discount = 0.8;
      Database.base_dividend_control = 5;

      let baseview = cc.instantiate(prefab)
      cc.find('Canvas').addChild(baseview)
      let mas = cc.instantiate(this.massage)
      cc.find('Canvas').addChild(mas)
      })

    }

    else if (gHandler.app.pinpai == 'xinlong') {
      gHandler["proxy_xinlong"].load("baseView", cc.Prefab, (err, prefab) => {
        if (err) {
          cc.log(err);
          return;
        }
      Database.base_dividend_discount = 1;
      let baseview = cc.instantiate(prefab)
      cc.find('Canvas').addChild(baseview)
      let mas = cc.instantiate(this.massage)
      cc.find('Canvas').addChild(mas)
      })

    } else if (gHandler.app.pinpai == 'nineone') {
      gHandler["proxy_nineone"].load("baseView", cc.Prefab, (err, prefab) => {
        if (err) {
          cc.log(err);
          return;
        }
      Database.base_dividend_discount = 0.8;
      let baseview = cc.instantiate(prefab)
      cc.find('Canvas').addChild(baseview)
      let mas = cc.instantiate(this.massage)
      cc.find('Canvas').addChild(mas)
      })

    } else if (gHandler.app.pinpai == 'tianqi') {
      gHandler["proxy_tianqi"].load("baseView", cc.Prefab, (err, prefab) => {
        if (err) {
          cc.log(err);
          return;
        }
      Database.base_dividend_discount = 0.8;
      let baseview = cc.instantiate(prefab)
      cc.find('Canvas').addChild(baseview)
      let mas = cc.instantiate(this.massage)
      cc.find('Canvas').addChild(mas)
      })

    }  else if (gHandler.app.pinpai == 'huangshi') {
      gHandler["proxy_huangshi"].load("baseView", cc.Prefab, (err, prefab) => {
        if (err) {
          cc.log(err);
          return;
        }
      Database.base_dividend_discount = 1;
      let baseview = cc.instantiate(prefab)
      cc.find('Canvas').addChild(baseview)
      let mas = cc.instantiate(this.massage)
      cc.find('Canvas').addChild(mas)
      Database.base_dividend_n = 0.05
      })



    } else if (gHandler.app.pinpai == 'huaxing') {
      gHandler["proxy_huaxing"].load("baseView", cc.Prefab, (err, prefab) => {
        if (err) {
          cc.log(err);
          return;
        }
      Database.base_dividend_discount = 0.8;
      let baseview = cc.instantiate(prefab)
      cc.find('Canvas').addChild(baseview)
      let mas = cc.instantiate(this.massage)
      cc.find('Canvas').addChild(mas)
      })


    } else if (gHandler.app.pinpai == 'ninetwo') {
      gHandler["proxy_ninetwo"].load("baseView", cc.Prefab, (err, prefab) => {
        if (err) {
          cc.log(err);
          return;
        }
      Database.base_dividend_discount = 0.8;
      let baseview = cc.instantiate(prefab)
      let curDR;

      var cvs = cc.find('Canvas').getComponent(cc.Canvas);
      //保存原始设计分辨率，供屏幕大小变化时使用
      if (!curDR) {
        curDR = cvs.designResolution;
      }
      var dr = curDR;
      var s = cc.view.getFrameSize();
      var rw = s.width;
      var rh = s.height;

      if ((rw / rh) > (dr.width / dr.height)) {
        baseview.scaleX = (rw / rh) / (dr.width / dr.height)
        baseview.getChildByName('leftSide').getChildByName('btn_box').scaleY = (rw / rh) / (dr.width / dr.height)
        //!#zh: 是否优先将设计分辨率高度撑满视图高度。 */
        cvs.fitHeight = true;
        //如果更长，则用定高
      } else {
        /*!#zh: 是否优先将设计分辨率宽度撑满视图宽度。 */
        cvs.fitWidth = true;
      }

      cc.find('Canvas').addChild(baseview)

      let mas = cc.instantiate(this.massage)
      cc.find('Canvas').addChild(mas)
    })


    } else if (gHandler.app.pinpai == 'test') {
      gHandler["proxy_test"].load("baseView", cc.Prefab, (err, prefab) => {
        if (err) {
          cc.log(err);
          return;
        }
      Database.base_dividend_discount = 0.8;
      Database.base_dividend_control = 5;

      let baseview = cc.instantiate(prefab)
      cc.find('Canvas').addChild(baseview)
      let mas = cc.instantiate(this.massage)
      cc.find('Canvas').addChild(mas)
      })

    } else {
      gHandler["proxy_xingba"].load("baseView", cc.Prefab, (err, prefab) => {
        if (err) {
          cc.log(err);
          return;
        }
      Database.base_dividend_discount = 1;
      let baseview = cc.instantiate(prefab)
      cc.find('Canvas').addChild(baseview)
      let mas = cc.instantiate(this.massage)
      cc.find('Canvas').addChild(mas)
      })
    }

  },
  onMessagePrefabNeeded: function (e, string) {
    cc.log('onMessagePrefabNeeded', e, string)
    var message = cc.instantiate(this.messagePrefab)
    //获取预制资源中的js组件，并作出相应操作
    var messageScript = message.getComponent('proxy-messagePrefab')
    //开始操作JS组件脚本
    messageScript.setMessage(string) //开始为JS组件进行初始化操作,action 为自定义初始化方法
    //将预制资源添加到父节点
    cc.find('Canvas/message').addChild(message)
  },
  onCopyClick: function (e, string) {
    //web平台复制到剪切板
    // var save = function(e) {
    //   e.clipboardData.setData("text/plain", "待复制本文");
    //   e.preventDefault();
    // }.bind(this);
    // document.addEventListener("copy", save);
    // document.execCommand("copy");
    // document.removeEventListener("copy", save);

    //音效
    Database.clickSound(Database.hall_sound)

    if (gHandler.reflect) {
      if (gHandler.reflect.setClipboard(string)) {
        // gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "复制id成功");
        // this.onMessagePrefabNeeded(null, '复制成功')
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "复制成功!")
      } else {
        // gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "复制id失败");
        // this.onMessagePrefabNeeded(null, '复制失败')
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "复制失败!")

      }
    } else {
      // this.onMessagePrefabNeeded(null, '操作失败')
      gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "操作失败!")

    }
    // gHandler.Reflect && gHandler.Reflect.setClipboard(string);
  },
  start() { },
  onExit() {
    //音效
    Database.clickSound(Database.hall_sound)
    Database.a_num = 0;
    gHandler.eventMgr.dispatch(hqq.eventMgr.showJumpScene,"hall");
  }

  // update (dt) {},
})