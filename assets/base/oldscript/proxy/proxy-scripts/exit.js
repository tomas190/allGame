var Database = require("./public_script/Database");
let gHandler = require('gHandler');
cc.Class({
    extends: cc.Component,

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

    // onLoad () {},

    start () {

    },
    onExit() {
        cc.log('tuichu')
        Database.a_num=0;
        cc.director.loadScene(gHandler.hallConfig.lanchscene)
      },
      onfybl() {
        cc.log('返佣比例')
        let fybl = this.node.parent.getChildByName('n2_fybl')
        fybl.getComponent("n2_p1_fybl").onopen()
      } ,
      onlqyj() {
        cc.log('资金转入比例')
        let lqyj = this.node.parent.getChildByName('n2_lqyj')
        lqyj.getComponent("n2_p1_lqyj").onopen()
      },
    // update (dt) {},
});
