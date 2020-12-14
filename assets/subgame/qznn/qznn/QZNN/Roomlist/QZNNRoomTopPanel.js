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
        // this.addEvenListener(this.node);
    },

    addEvenListener: function(e) {
        cc.gg.utils.addClickEventALL(this.headerLeft, null,null,this.funBack.bind(this),null,null,{flag:true});
    },

    initView: function() {
        this.headerLeft = this.node.getChildByName("btn_left");
        //账号
        this.headerNameBox = this.node.getChildByName("name_box");
        this.account = this.headerNameBox.getChildByName("account");
        this.modify = this.headerNameBox.getChildByName("modify");
        this.updateUserName(cc.gg.global.account_name);
        //金币
        this.goldBox = this.node.getChildByName("gold_box");
        this.gold = this.goldBox.getChildByName("goldSum");
        // this.updateGold(cc.gg.global.gold);
        this.addGold = this.goldBox.getChildByName("addGold");

    },

    updateUserName(str){
        this.account.getComponent(cc.Label).string = str;
    },

    //更新大厅金币
    updateGold(money){
        var newMoney = money < 0 ? 0 : money
        this.gold.getComponent(cc.Label).string = String(~~(Number(newMoney.toFixed(6))*100)/100);
    },

    resetView: function() {

    },

    // funBack: function() {
    //     this._GameView.node.parent
    //     .getChildByName("noticeView")
    //     .getComponent("QZNNNoticeMgr")
    //     .backToHall();
    // },

});