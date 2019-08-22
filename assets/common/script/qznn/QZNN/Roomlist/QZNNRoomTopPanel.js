/*
 * @Author: burt
 * @Date: 2019-08-17 14:52:57
 * @LastEditors: burt
 * @LastEditTime: 2019-08-21 15:45:05
 * @Description: 
 */
/*
 *  Dawnson 2019-8-01
 *  15302765815@163.com
 */
cc.Class({
    extends: cc.Component,

    properties: {

    },

    initzation: function(e, t) {
        this.node = e;
        this._GameView = t;
        this.initView();
        this.addEvenListener(this.node);
    },
    addEvenListener: function(e) {
        cc.gg.utils.addClickEventEND(this.headerLeft, this.funBack.bind(this), { flag: true });
        cc.gg.utils.addClickEventEND(this.modify, this.funModify.bind(this), { flag: true });
        cc.gg.utils.addClickEventEND(this.addGold, this.funAddGold.bind(this), { flag: true });
    },
    initView: function() {
        this.headerLeft = this.node.getChildByName("btn_left");
        //账号
        this.headerNameBox = this.node.getChildByName("name_box");
        this.account = this.headerNameBox.getChildByName("account");
        this.modify = this.headerNameBox.getChildByName("modify");

        //金币
        this.goldBox = this.node.getChildByName("gold_box");
        this.gold = this.goldBox.getChildByName("goldSum");
        this.addGold = this.goldBox.getChildByName("addGold");

    },
    resetView: function() {

    },
    funBack: function() {
        console.log("返回大厅")
        let gHandler = require("gHandler");
        cc.director.loadScene(gHandler.gameConfig.hallconfig.lanchscene)
            //cc.gg.client.send('__backtohall', {}, () => {})
    },
    funModify: function() {
        console.log("编辑信息")
            //this._GameView._rightPancel.toggleStatus()
    },
    funAddGold: function() {
        console.log("添加金币")
    },
    ModifyStr: function(str) {
        return str.replace(".", "/")
    }
});