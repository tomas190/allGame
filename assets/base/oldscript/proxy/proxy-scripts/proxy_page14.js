var Database = require("./public_script/Database");
let gHandler = require("gHandler");
// let toFloat = require("./proxy-changeFloat");
let commonVal = require("./public_script/proxy-http");
cc.Class({
    extends: cc.Component,

    properties: {
        Yj1: {
            default: null,
            type: cc.Node,
        },

        Yj2: {
            default: null,
            type: cc.Node,
        },
        gjfh: { //股金分红遮罩
            default: null,
            type: cc.Node,
        },
        xjxq: {//下级详情
            default: null,
            type: cc.Node,
        },
        btn4: {//已领取按钮
            default: null,
            type: cc.Node,
        },
        page14_btn :true,



    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {


    },

    checkMyAgent(event, num) {
        if (this.page14_btn) {
            this.page14_btn = false
            this.scheduleOnce(() => {
                // 这里的 this 指向 component
                this.page14_btn = true
            }, 0.6);
            cc.log('进14', num);
            //获取所有下级ID
            Database.xjdlmxs = []
            commonVal.getallchilds()
            this.checkMyAgents(num.num)


       
        }
    },

    checkMyAgents(event, num) {
        //股份单价
        Database.p14_n2_gfdj_t = 0
        //有效业绩
        Database.p14_n2_yxyj_t = 0


        //股份份额
        Database.p14_n2_gffe_t = 0

        //股份受益
        Database.p14_n2_gfsy_t = 0

        //股东分红
        Database.p14_n2_gffh_t = 0

        Database.p14_n2_gf_t = []



        //股份单价
        Database.p14_n2_gfdj_l = 0
        //有效业绩
        Database.p14_n2_yxyj_l = 0
        // 股份份额 小于0 显示为 0 

        Database.p14_n2_gffe_l = 0
        //股份受益
        Database.p14_n2_gfsy_l = 0
        //股东分红
        Database.p14_n2_gffh_l = 0

        Database.p14_n2_gf_l = []



        Database.clickSound(Database.hall_sound)
        if (gHandler.app.pinpai == 'ninetwo' && Database.loadview != null) {
            Database.loadview.active = true;
            this.scheduleOnce(() => {
                // 这里的 this 指向 component
                Database.loadview.active = false;
            }, 1);
        }
        if (gHandler.app.pinpai == 'ninetwo' && Database.loadview != null) {
            Database.loadview.active = true;
            this.scheduleOnce(() => {
                // 这里的 this 指向 component
                Database.loadview.active = false;
            }, 1);
        }
        //先检查是否显示股东分红
        function check() {
            return new Promise((resolve, reject) => {
                Database.p14_show_flag = 0
                commonVal.n2_GetStockBonusAccountByID_p14(resolve)
            })
        }
        //得到前两列数据后请求后两列数据
        check().then(
            (value) => {
                cc.log('进入此处');
                if (Database.p14_show_flag == gHandler.gameGlobal.player.account_name) {
                    this.gjfh.active = false
                } else {
                    this.gjfh.active = true

                }

            },
            function (error) {
                cc.error("出错了", error);
            },


        )





        const promise1 = new Promise((resolve) => {

            commonVal.n2_GetStockDividendInfo14('week', resolve)

        });
        const promise2 = new Promise((resolve) => {
            //暂定默认显示今天
            commonVal.n2_GetBaseDividendInfo2_p14('week', resolve, 1)

        });
        const promise3 = new Promise((resolve) => {
            //暂定默认显示今天
            commonVal.n2_GetBaseDividendInfo2_p14('week', resolve, 5)

        });
        const promise4 = new Promise((resolve) => {

            commonVal.n2_GetStockDividendInfo14('lastweek', resolve)

        });
        const promise5 = new Promise((resolve) => {
            //暂定默认显示今天
            commonVal.n2_GetBaseDividendInfo2_p14('lastweek', resolve, 1)

        });
        const promise6 = new Promise((resolve) => {
            //暂定默认显示今天
            commonVal.n2_GetBaseDividendInfo2_p14('lastweek', resolve, 5)

        });//promise1,promise4,
        Promise.all([promise1, promise2, promise3, promise4, promise5, promise6]).then((values) => {
            if(Database.p14_n2_status==1){
                this.btn4.active = true
            }
            // 股份单价 小于0 显示为 0 
            if (parseFloat(Database.p14_n2_gfdj_t) < 0) {
                Database.p14_n2_gfdj_t = 0
            }
            //股份单价
            this.Yj2.getChildByName('gedj').getComponent("cc.Label").string = Math.floor(parseFloat(Database.p14_n2_gfdj_t) * 100) / 100 + ''
            //有效业绩
            cc.log('Database.p14_n2_yxyj_t=====', Database.p14_n2_yxyj_t);
            this.Yj2.getChildByName('wdyxyj').getComponent("cc.Label").string = Math.floor(parseFloat(Database.p14_n2_yxyj_t) * 100) / 100 + ''
            // 股份份额 小于0 显示为 0 
            if (parseFloat(Database.p14_n2_gffe_t) < 0) {
                Database.p14_n2_gffe_t = 0
            }
            //股份份额
            this.Yj2.getChildByName('wdgffe').getComponent("cc.Label").string = Math.floor(parseFloat(Database.p14_n2_gffe_t) * 100) / 100 + ''
            // 股份受益 小于0 显示为 0 
            if (parseFloat(Database.p14_n2_gfsy_t) < 0) {
                Database.p14_n2_gfsy_t = 0
            }
            //股份受益
            this.Yj2.getChildByName('gfsy').getComponent("cc.Label").string = Math.floor(parseFloat(Database.p14_n2_gfsy_t) * 100) / 100 + ''
            // 股东分红 小于0 显示为 0 
            if (parseFloat(Database.p14_n2_gffh_t) < 0) {
                Database.p14_n2_gffh_t = 0
            }
            //股东分红
            this.Yj2.getChildByName('gdfh').getComponent("cc.Label").string = Math.floor(parseFloat(Database.p14_n2_gffh_t) * 100) / 100 + ''



            // 股份单价 小于0 显示为 0 
            if (parseFloat(Database.p14_n2_gfdj_l) < 0) {
                Database.p14_n2_gfdj_l = 0
            }
            //股份单价
            this.Yj1.getChildByName('gedj').getComponent("cc.Label").string = Math.floor(parseFloat(Database.p14_n2_gfdj_l) * 100) / 100 + ''
            //有效业绩
            cc.log('Database.p14_n2_yxyj_l===============', Database.p14_n2_yxyj_l);
            this.Yj1.getChildByName('wdyxyj').getComponent("cc.Label").string = Math.floor(parseFloat(Database.p14_n2_yxyj_l) * 100) / 100 + ''
            // 股份份额 小于0 显示为 0 
            if (parseFloat(Database.p14_n2_gffe_l) < 0) {
                Database.p14_n2_gffe_l = 0
            }
            //股份份额
            this.Yj1.getChildByName('wdgffe').getComponent("cc.Label").string = Math.floor(parseFloat(Database.p14_n2_gffe_l) * 100) / 100 + ''
            // 股份受益 小于0 显示为 0 
            if (parseFloat(Database.p14_n2_gfsy_l) < 0) {
                Database.p14_n2_gfsy_l = 0
            }
            //股份受益
            this.Yj1.getChildByName('gfsy').getComponent("cc.Label").string = Math.floor(parseFloat(Database.p14_n2_gfsy_l) * 100) / 100 + ''
            // 股东分红 小于0 显示为 0 
            if (parseFloat(Database.p14_n2_gffh_l) < 0) {
                Database.p14_n2_gffh_l = 0
            }
            //股东分红
            this.Yj1.getChildByName('gdfh').getComponent("cc.Label").string = Math.floor(parseFloat(Database.p14_n2_gffh_l) * 100) / 100 + ''

        })



        // Promise.all([promise4, promise5, promise6]).then((values) => {



        // })




    },



    OPenCalendar(event, num) { //打开夏季明细
        //音效
        Database.clickSound(Database.hall_sound)
        this.xjxq.getComponent('p14_xjxq').setdata(num)
        this.xjxq.active = true

    },
    //领取佣金
    getbalance() {

        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        // PARAMS { 
        //     account_name 用户ID         
        //     token 密匙         
        //     first_date 用户ID -  
        //     last_date 
        //      game_tag 游戏分类 可选1 棋牌 5电子
        // 

        xhr_test.open("POST", host + "/proxy/user/GrantStockDividendByRoundID", true);
        xhr_test.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");


        var sendData = `account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&round_id=${Database.p14_n2_order_l}`;


        cc.log("POST", sendData);

        xhr_test.send(sendData);

        xhr_test.onreadystatechange = () => {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("----p14 n2 GrantStockDividendByRoundID 返回=", resData);
                //得到数据渲染
                if (resData.msg == 'round id had already done') {
                    cc.log('福利分红已领取');
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '福利分红已领取')
                }
                if (resData.msg == 'not time yet') {
                    cc.log('尚未在可领取时间范围内');
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '尚未在可领取时间范围内')
                }
                if (resData.msg == 'dividend money is invalid') {
                    cc.log('尚未拥有领取资格');
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '尚未拥有领取资格')
                }
                if (resData.msg) {
                    if (resData.msg.balance) {
                        cc.log('福利分红领取成功');
                        gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '福利分红领取成功')
                        this.btn4.active = true
                    }
                }

                xhr_test.abort();
            }


        }



    }
    // start () {

    // },

    // update (dt) {},
});