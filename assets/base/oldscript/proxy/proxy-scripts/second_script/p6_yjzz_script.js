var Database = require("../public_script/Database");
var gHandler = require("gHandler");
var commonVal = require("../public_script/proxy-http");
cc.Class({
    extends: cc.Component,

    properties: {
        wdyjye: {//我的佣金余额
            default: null,
            type: cc.Label,
        },
        mid: {
            default: null,
            type: cc.Node,
        },
        IdText: { //默认的id
            default: null,
            type: cc.Node,
        },
        cofID: { //输入的id
            default: null,
            type: cc.Label,
        },
        MoneyText: { //默认的钱
            default: null,
            type: cc.Node,
        },
        CofAmount: { //实际输入金钱
            default: null,
            type: cc.Label,
        },
        page1: { //修改p1参数
            default: null,
            type: cc.Node,
        },
        as: true,
        id: 0,//传过来的下级id

    },

    onLoad() {
        this.wdyjye.string = '您的佣金余额：' + Database.countCoinsShowLabel(Database.balance)


    },

    close() {
        //音效
        Database.clickSound(Database.hall_sound)
        this.IdText.getComponent(cc.EditBox).string = ''
        this.cofID.string = ''
        this.MoneyText.getComponent(cc.EditBox).string = ''
        this.CofAmount.string = ''
        this.mid.active = false;
        this.node.active = false;
    },
    //点位控制 点控
    confirm() {
        //音效
        Database.clickSound(Database.hall_sound)
        let id = this.cofID.string
        let money = this.CofAmount.string
        if (id == '') {
            let txt = '请输入玩家id'
            cc.log(txt);
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, txt)
            return
        }
        if (money == '') {
            let txt = '请输转账金额'
            cc.log(txt);
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, txt)
            return
        }
        if(100>parseFloat(money)||5000<parseFloat(money) ){
            let txt = '交易失败'
            cc.log(txt);
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, txt)
            return
        }
        this.MoveBalanceToProxy(id, money)


    },
    MoveBalanceToProxy(id, money) {
        //id 是玩家id
        // account_name 用户ID
        // token 密匙
        // money 转移的金额

        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("POST", host + "/proxy/user/MoveBalanceToProxy", true);
        xhr_test.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var sendData = `account_name=${gHandler.gameGlobal.player.account_name
            }&token=${commonVal.token}&money=${money}&id=${id}`;


        cc.log("/proxy/user/MoveBalanceToProxy:", host + "/proxy/user/MoveBalanceToProxy", sendData);
        xhr_test.send(sendData);
        xhr_test.onreadystatechange = () => {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("/proxy/user/MoveBalanceToProxy返回", resData);

                if (resData.code == 200) {

                    this.wdyjye.string = '您的佣金余额：' + Database.countCoinsShowLabel(parseFloat(Database.balance) - parseFloat(money))
                    //重置金额
                    Database.balance = parseFloat(Database.balance) - parseFloat(money);
                    commonVal.balance= parseFloat(Database.balance) - parseFloat(money);
                    //初始化界面
                    this.IdText.getComponent(cc.EditBox).string = ''
                    this.cofID.string = ''
                    this.MoneyText.getComponent(cc.EditBox).string = ''
                    this.CofAmount.string = ''

                    //取得佣金余额
                     this.page1.getChildByName('middle').getChildByName('grid').getChildByName('yjye').getComponent("cc.Label").string = Database.countCoinsShowLabel(Database.balance);
                     this.page1.getChildByName('modal').getChildByName('balance').getChildByName('label').getComponent("cc.Label").string = Database.countCoinsShowLabel(Database.balance);
                    //cc.find("Canvas/baseView/home/page1/modal/balance/label").getComponent("cc.Label").string = Database.countCoinsShowLabel(Database.balance);
                    cc.log('佣金转账成功');
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "佣金转账成功")


                }
                if (resData.code == 404) {

                    //初始化界面
                    this.IdText.getComponent(cc.EditBox).string = ''
                    this.cofID.string = ''
                    this.MoneyText.getComponent(cc.EditBox).string = ''
                    this.CofAmount.string = ''
                    let txt = Database.Switchtext2(resData.msg)
                    cc.log(txt);
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, txt)
                }



            }
            xhr_test.abort();
        };

    },
    start() {
    },
});

