var Database = require("../public_script/Database");
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:
    // onLoad () {},

    initComboBox (cb) {
        this.cb = cb;
    },

    itemBtn (event) {
        // 子项点击后改变下拉按钮上的文本
        this.cb.comboLabel.string = event.target.children[0].getComponent(cc.Label).string;
        let string = this.cb.comboLabel.string
        if (string == "当前游戏列表"){
           Database.demand_tag = 1 
        }else{
            Database.demand_tag = 2
        }
        cc.log('string', string, Database.demand_tag);
        // 选择后改变小三角和下拉框显示
        this.cb.comboboxClicked();
    },

    // update (dt) {},
});
