var Database = require("../public_script/Database");
let gHandler = require("gHandler");
let commonVal = require("../public_script/proxy-http");
cc.Class({
    extends: cc.Component,

    properties: {

        account_name: { //玩家id
            default: null,
            type: cc.Label,
        },
        gr_money: { //个人业绩
            default: null,
            type: cc.Label,
        },
        td_money: { //团队业绩
            default: null,
            type: cc.Label,
        },
        mid: {//阻止事件
            default: null,
            type: cc.Node,
        },
        data1: { //日期1
            default: null,
            type: cc.Node,
        },
        data1_st: { //日期文字
            default: null,
            type: cc.Label,
        },
        data2: {//日期2
            default: null,
            type: cc.Node,
        },
        data2_st: { //日期文字
            default: null,
            type: cc.Label,
        },

    },


    onLoad() {

    },
    get_data(ids) {//获取个人业绩 和团队业绩
        let date = new Date();
        this.account_name.string = ids + ''
        let a = date.getFullYear(); //获取完整的年份(4位)
        let b = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
        let c = date.getDate(); //获取当前日(1-31)
        let end_time = a + '/' + b + '/' + c
        this.data2_st.string = end_time;
        console.log(ids, end_time);


        function check1() {
            return new Promise((resolve, reject) => {
                //黑金系列单独请求
                if (gHandler.app.pinpai == 'test' || gHandler.app.pinpai == 'tiqnai') {
                    //  请求直个人业绩 
                    commonVal.hj_p9_GetGameUserInductions(ids, end_time, resolve)

                } else {
                    //  请求直个人业绩 
                    commonVal.p9_GetGameUserInductions(ids, end_time, resolve)

                }


            })

        }
        check1().then(
            (values) => {

                this.gr_money.string = Database.countCoinsShowLabel(parseFloat(Database.p9_yjcx_gr.toFixed(8))) + ''




            })

        function check2() {
            return new Promise((resolve, reject) => {
                //黑金系列单独请求
                if (gHandler.app.pinpai == 'test'  || gHandler.app.pinpai == 'tiqnai') {
                    //  请求直个人业绩 
                    commonVal.hj_p9_GetProxyUserInductionsSortByGameTag(ids, end_time, resolve)

                } else {
                    // 请求团队业绩
                    commonVal.p9_GetProxyUserInductionsSortByGameTag(ids, end_time, resolve)
                }


            })

        }
        check2().then(
            (values) => {

                this.td_money.string = Database.countCoinsShowLabel(parseFloat(Database.p9_yjcx_td.toFixed(8))) + ''




            })



    },
    //按日期查询接口
    searchByDate() {
        //音效
        Database.clickSound(Database.hall_sound)
        let firstdt = []
        let enddt = []
        console.log("1=", this.data1_st.string, this.data2_st.string);
        if (this.data1_st.string != "年/月/日") {
            firstdt = this.data1_st.string.split("/")
        } else {
            console.log('未选初始日期');
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "未选初始日期...")
            return
        }
        enddt = this.data2_st.string.split("/")
        //默认请求 第一页 棋牌 
        let fristmonth = parseInt(firstdt[1]) < 10 ? "0" + firstdt[1] : firstdt[1]
        let firstday = parseInt(firstdt[2]) < 10 ? "0" + firstdt[2] : firstdt[2]

        let lastmonth = parseInt(enddt[1]) < 10 ? "0" + enddt[1] : enddt[1]
        let lasttday = parseInt(enddt[2]) < 10 ? "0" + enddt[2] : enddt[2]

        //限制 15天
        let myDate = new Date()
        let nowyear = myDate.getFullYear()
        let nowmonth = myDate.getMonth() + 1;
        let nowday = myDate.getDate();
        let data_d = new Date(firstdt[0], firstdt[1], 0);
        cc.log('data_d==', data_d);
        let data_num = data_d.getDate()
        cc.log('data_num==', data_num);
        let dds = 15 - 30 + data_num;
        cc.log(firstdt[0], firstdt[1], data_num, nowyear, nowmonth, nowday, 'dds==', dds);

        let fifteenDays = false;
        // 同年月
        if (parseInt(firstdt[0]) == nowyear && parseInt(firstdt[1]) == nowmonth && parseInt(nowday) - parseInt(firstdt[2]) <= 15) {
            fifteenDays = true
            //同年不同月
        } else if (parseInt(firstdt[0]) == nowyear && parseInt(firstdt[1]) - parseInt(nowmonth) == -1 && parseInt(firstdt[2]) - parseInt(nowday) >= dds) {
            fifteenDays = true
            //不同年不同月
        } else if (parseInt(firstdt[0]) - parseInt(nowyear) == -1 && parseInt(firstdt[1]) == 12 && parseInt(nowmonth) == 1 && parseInt(firstdt[2]) - parseInt(nowday) >= dds) {
            fifteenDays = true
        } else {
            cc.log("日期输入超过15天");
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "日期输入有误...")
        }
        let date_if = false;//判断日期是否合规
        if (fifteenDays) {
            if (parseInt(enddt[1]) - parseInt(firstdt[1]) == 1 && parseInt(firstdt[2]) - parseInt(enddt[2]) >= 0 && parseInt(firstdt[1]) != 0) {
                date_if = true;

            } else if (parseInt(enddt[1]) - parseInt(firstdt[1]) == 0 && parseInt(enddt[2]) - parseInt(firstdt[2]) >= 0) {
                date_if = true;

            } else if (parseInt(enddt[0]) - parseInt(firstdt[0]) == 1 && parseInt(enddt[1]) == 1 && parseInt(firstdt[1]) == 12 && parseInt(firstdt[2]) - parseInt(enddt[2]) >= 0) {
                date_if = true;
            } else if (parseInt(enddt[1]) - parseInt(firstdt[1]) == 0 && parseInt(enddt[2]) - parseInt(firstdt[2]) < 0) {
                date_if = false;
                cc.log("结束时间小于开始时间");
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "结束时间小于开始时间")

            } else {
                date_if = false;
                cc.log("日期输入有误...");
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "日期输入有误...")
            }
        } else {
            date_if = false;
            cc.log("日期输入超过15天...");
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "日期输入有误...")
        }
        let ids = this.account_name.string
        if (date_if) {

            function check() {
                return new Promise((resolve, reject) => {

                    let firstdate = firstdt[0] + "-" + fristmonth + "-" + firstday
                    let lastdate = enddt[0] + "-" + lastmonth + "-" + lasttday
                    // commonVal.p9_GetGameUserInductions(ids, end_time, resolve)
                    commonVal.p9_GetGameUserInductionds(ids, firstdate, lastdate, resolve)
                })
            }
            check().then(
                (value) => {

                    console.log('个人明细==', Database.p9_yjcx_gr);
                    this.gr_money.string = Database.countCoinsShowLabel(parseFloat(Database.p9_yjcx_gr.toFixed(8))) + ''

                }
            )
            function check1() {
                return new Promise((resolve, reject) => {

                    let firstdate = firstdt[0] + "-" + fristmonth + "-" + firstday
                    let lastdate = enddt[0] + "-" + lastmonth + "-" + lasttday
                    // commonVal.p9_GetGameUserInductions(ids, end_time, resolve)
                    commonVal.p9_GetProxyUserInductionsSortByGameTagdt(ids, firstdate, lastdate, resolve)
                })
            }
            check1().then(
                (value) => {

                    console.log('团队明细==', Database.p9_yjcx_td);
                    this.td_money.string = Database.countCoinsShowLabel(parseFloat(Database.p9_yjcx_td.toFixed(8))) + ''

                }
            )


        }


    },
    setData() {

        //this.geme_money.string = '';


        //正式
        let num = (Database.balance + '').split(".")
        //this.geme_money.string = num[0] + '';


        this.node.active = true;

    },
    opendata1() {
        //音效
        Database.clickSound(Database.hall_sound)
        this.data1.active = true

    },
    opendata2() {
        //音效
        Database.clickSound(Database.hall_sound)
        this.data2.active = true

    },
    close() {
        //音效
        Database.clickSound(Database.hall_sound)
        let date = new Date();
        let a = date.getFullYear(); //获取完整的年份(4位)
        let b = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
        let c = date.getDate(); //获取当前日(1-31)
        this.data1_st.string = a + '/' + b + '/' + c
        this.mid.active = false;
        this.node.active = false;
        Database.p9_yjcx_gr = 0
        Database.p9_yjcx_td = 0
    },

    sureconfirm() {
        //音效
        Database.clickSound(Database.hall_sound)
        console.log(id, num);


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

                    //this.geme_money.string = nums[0] + '';
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

    },
    OPenCalendar(event, num) { //打开日历
        if (num == "1") {
            let status = this.node.getChildByName("UIDatePicker1").active;
            this.node.getChildByName("UIDatePicker1").active = !status;
        }
        if (num == "2") {
            let status = this.node.getChildByName("UIDatePicker2").active;
            this.node.getChildByName("UIDatePicker2").active = !status;
        }

    },


});
