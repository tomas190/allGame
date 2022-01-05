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
        geme_money: { //佣金余额
            default: null,
            type: cc.Label,
        },
        account_name: { //玩家id
            default: null,
            type: cc.Label,
        },
        pl_account_name: { //默认玩家id
            default: null,
            type: cc.Label,
        },
        input_money: { //转走金额
            default: null,
            type: cc.Label,
        },
        pl_input_money: { //转走金额
            default: null,
            type: cc.Label,
        },
        p1_money: {  //p1 界面金额
            default: null,
            type: cc.Label,
        },

    },


    onLoad() {

    },

    setData() {

        this.geme_money.string = '';


        //正式
        let num = (Database.balance + '').split(".")
        this.geme_money.string = num[0] + '';


        this.node.active = true;

    },
    close() {
        //音效
        Database.clickSound(Database.hall_sound)
        this.pl_account_name.string = ''
        this.pl_input_money.string = ''
        this.input_money.string = ''
        this.account_name.string = ''
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
        let id = this.account_name.string
        let num = parseInt(this.input_money.string)
        console.log(id, num);


        this.pl_account_name.string = ''
        this.pl_input_money.string = ''
        this.input_money.string = ''
        this.account_name.string = ''
        let ed1 = cc.find('content/id_EditBox', this.node)
        let ed2 = cc.find('content/zz_EditBox', this.node)
        ed1.getComponent(cc.EditBox).string = '';
        ed2.getComponent(cc.EditBox).string = '';
        if (num > 0 && num) {
            let iso = parseFloat(this.geme_money.string)
            if (iso < 500) {
                console.log('佣金余额不足500');
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "佣金余额不足500金币, 无法转账")
            } else {
                let that = this
                function check() {
                    return new Promise((resolve, reject) => {
                        that.MoveBalanceToProxy(id, num, resolve)
                    })
                }
                //得到前两列数据后请求后两列数据
                check().then(
                    (value) => {

                        that.SaveMoneyFlowDetail(id, num)

                    },
                    function (error) {
                        console.error("出错了", error);
                    },


                )

            }

        }

    },

    start() {

    },
    MoveBalanceToProxy(id, money, a) {
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
                cc.log("p9 /proxy/user/MoveBalanceToProxy返回", resData);

                if (resData.code == 200) {


                    cc.log('佣金转账成功');
                    a()
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "佣金转账成功")


                }
                if (resData.code == 404) {

                    let txt = Database.Switchtext2(resData.msg)
                    cc.log(txt);
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, txt)
                }



            }
            xhr_test.abort();
        };

    },
    SaveMoneyFlowDetail(ID, num) {
        // id (edit时必传)
        // user_id     // 收款玩家ID
        // amount        //转账金额
        // rate  提现所需倍数  1
        // link_id (关联id)   1
        // remark （备注）  账号内互转
        // action (add 或 edit)   默认为 add
        // operator (操作者，来源)   默认为test1

        let host = gHandler.gameGlobal.pay.pay_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("POST", host + "/api/backend/SaveMoneyFlowDetail", true);
        xhr_test.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var sendData = `user_id=${ID}&rate=${1}&amount=${num}&link_id=${1}&remark=${'账号内互转'}&action=${'add'}&operator=${'test1'}&token=${'e40f01afbb1b9ae3dd6747ced5bca532'}`;


        cc.log(host + "/api/backend/SaveMoneyFlowDetail:", sendData);
        xhr_test.send(sendData);
        xhr_test.onreadystatechange = () => {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("SaveMoneyFlowDetail返回", resData);

                if (resData.msg == "操作成功") {

                    cc.log('resData.msg===', resData);


                    //正式
                    console.log('1', Database.balance, num);
                    Database.balance = parseFloat(Database.balance) - parseFloat(num)
                    console.log('2', Database.balance, num);
                    let nums = (Database.balance + '').split(".")

                    this.geme_money.string = nums[0] + '';
                    // this.p1_money.string = Database.countCoinsShowLabel(Database.balance);
                    this.node.parent.parent.getChildByName('page1').getChildByName('middle').getChildByName('grid').getChildByName('yjye').getComponent(cc.Label).string = num[0] + '';
                    console.log('互转成功');
                    if (gHandler.app.pinpai != 'ninetwo') {
                        commonVal.SaveEmailDetail(ID, num)
                    }
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "账户内互转成功")
                } else {
                    console.log('error resData.msg===', resData);

                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '账户内互转失败')
                }




            }
            xhr_test.abort();
        };

    }


});
