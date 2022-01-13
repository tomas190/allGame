var Database = require("../public_script/Database");
let gHandler = require("gHandler");
let commonVal = require("../public_script/proxy-http");
cc.Class({
    extends: cc.Component,

    properties: {
        mid: {
            default: null,
            type: cc.Node,
        },
        geme_money: {
            default: null,
            type: cc.Label,
        },
        account_money: {
            default: null,
            type: cc.Label,
        },
        input_money: {
            default: null,
            type: cc.Label,
        },
        p1_money: {
            default: null,
            type: cc.Label,
        },

    },


    onLoad() {

    },

    setData() {

        this.geme_money.string = '';
        this.account_money.string = '';
        this.input_money.string = '';

        //正式
        cc.log('gHandler.gameGlobal.player.gold==',gHandler.gameGlobal.player.gold);
        let gamenum = (gHandler.gameGlobal.player.gold + '').split(".")
        this.geme_money.string = gamenum[0];
        let num = (Database.balance + '').split(".")
        this.account_money.string = num[0] + '';

        this.node.active = true;

    },
    close() {
        //音效
        Database.clickSound(Database.hall_sound)
        this.geme_money.string = '';
        this.account_money.string = '';
        this.input_money.string = '';
        this.mid.active = false;
        this.node.active = false;
    },
    confirm(eve, num) {
        
        //音效
        Database.clickSound(Database.hall_sound)
        let a = parseInt(this.input_money.string)
        if (a > 0 && a) {
            this.input_money.string = a + parseInt(num)
        } else {
            this.input_money.string = parseInt(num)
        }



    },
    sureconfirm() {
         //音效
         Database.clickSound(Database.hall_sound)
        let num = parseInt(this.input_money.string)
        if (num > 0 && num) {
            this.MoveBalanceToGameUser(num)
        }

    },
    cancelconfirm() {
        //音效
        Database.clickSound(Database.hall_sound)
        this.input_money.string = ''
    },
    start() {

    },
    MoveBalanceToGameUser(num) {
        //num 是准入金额PARAMS {
        // account_name 用户ID
        // token 密匙
        // money 转移的金额

        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("POST", host + "/proxy/user/MoveBalanceToProxyUser", true);
        xhr_test.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var sendData = `account_name=${gHandler.gameGlobal.player.account_name
            }&token=${commonVal.token}&money=${num}`;


        cc.log("/proxy/user/MoveBalanceToProxyUser:", host + "/proxy/user/MoveBalanceToProxyUser", sendData);
        xhr_test.send(sendData);
        xhr_test.onreadystatechange = () => {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("/proxy/user/MoveBalanceToProxyUser返回", resData);

                if (resData.code == 200) {
                    let gamenum = (resData.msg.game_gold + '').split(".")
                    this.geme_money.string = gamenum[0];
                    cc.log('resData.msg===', resData.msg.balance);

                    let num = (resData.msg.balance + '').split(".")
                    this.account_money.string = num[0] + '';
                    Database.balance = resData.msg.balance;
                    commonVal.balance = resData.msg.balance;
                    gHandler.gameGlobal.player.gold = resData.msg.game_gold

                    // this.p1_money.string = Database.countCoinsShowLabel(Database.balance);
                    this.node.parent.parent.getChildByName('page1').getChildByName('middle').getChildByName('grid').getChildByName('yjye').getComponent(cc.Label).string = num[0] + '';
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "资金转入成功")
                }
                if (resData.code == 404) {
                    let txt = Database.Switchtext(resData.msg)
                    cc.log(txt);
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, txt)
                }



            }
            xhr_test.abort();
        };

    }

    
});
