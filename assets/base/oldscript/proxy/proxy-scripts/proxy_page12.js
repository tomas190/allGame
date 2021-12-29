var Database = require("./public_script/Database");
let gHandler = require("gHandler");
// let toFloat = require("./proxy-changeFloat");
let commonVal = require("./public_script/proxy-http");
cc.Class({
    extends: cc.Component,

    properties: {
        Item: {
            default: null,
            type: cc.Node,
        },

        pageItem: {
            default: null,
            type: cc.Node,
        },

        sv: {
            default: null,
            type: cc.ScrollView,
        },

        totalPage: {
            default: null,
            type: cc.Label,
        },
        nowdate: {
            default: null,
            type: cc.Label,
        },
        pageLayout: {
            default: null,
            type: cc.Node,
        },
        mid: {
            default: null,
            type: cc.Node,
        },


        jumpIndex: {
            default: null,
            type: cc.Label,
        },
        firstdate: {
            default: null,
            type: cc.Label,
        },
        enddate: {
            default: null,
            type: cc.Label,
        },
        xjbl_btn: {
            default: null,
            type: cc.Node,
        },
        pageNodes: [],


    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        this.nowdate.string = year + "/" + month + '/' + day;

    },
    checkMyAgent(event, num) {
        cc.log('进12', num);
        this.checkMyAgents()
    },

    checkMyAgents(event, num) {
        //音效
        Database.clickSound(Database.hall_sound)
        Database.page = 1;//每次调用都将滑动事件重置为1
        if (gHandler.app.pinpai != "juding") {
            this.xjbl_btn.active = false;
        }



        commonVal.demand_type = 1;

        cc.log('进入 第12页 第', '游戏', 'token', commonVal.token);




        function check() {
            return new Promise((resolve, reject) => {
                cc.log('请求第一页数据');
                //默认请求 第一页 棋牌 
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                let newday = day - 3
                month = month < 10 ? '0' + month : month
                day = day < 10 ? '0' + day : day

                function mGetDate(year, month) { //通过年月 获取准确天数
                    var d = new Date(year, month, 0);
                    return d.getDate();
                }
                let firstdate
                if (newday <= 0) {
                    newday = mGetDate(year, (month - 1))
                    let newmonth = (month - 1) < 10 ? '0' + (month - 1) : (month - 1)
                    firstdate = year + "-" + newmonth + "-" + (newday - 3)
                    if (month == 1) {
                        firstdate = (year - 1) + "-" + 12 + "-" + (newday - 3)
                    }
                } else {
                    newday = newday < 10 ? '0' + newday : newday
                    firstdate = year + "-" + month + "-" + newday

                }


                let lastdate = year + "-" + month + "-" + day
                cc.log('firstdate=', firstdate, 'lastdate=', lastdate);
                commonVal.GetPaymentInfo(firstdate, lastdate, resolve)
            })
        }
        //得到前两列数据后请求后两列数据
        check().then(
            (value) => {

                if (commonVal.p12_data != null) {
                    // this.data = Database.getData1();

                    this.currentPage = 1; //当前页码
                    this.minPage = 1; //最小页码
                    this.maxPage = Math.ceil(commonVal.p12_data.length / 3); //最大页码
                    this.totalPage.string = "共 " + this.maxPage + " 页";
                    this.setPageData();
                    this.setPageIndex();
                }

            },
            function (error) {
                console.error("出错了", error);
            },


        )
    },

    //设置页面数据
    setPageData() {
        cc.log('this.currentPage', this.currentPage);
        //this.data 是所有的个人信息 也就是每个日期的第一条数据
        let endIndex = this.currentPage * 3;
        endIndex = endIndex > commonVal.p12_data.length ? commonVal.p12_data.length : endIndex;
        let startIndex = (this.currentPage - 1) * 3
        this.sv.content.removeAllChildren();
        this.sv.scrollToTop();
        //本页合计数据
        let hj = 0;
        let alldatas = commonVal.p12_data;
        for (var i = startIndex; i < endIndex; ++i) {
            //设置本页数据
            this.setItemData(alldatas[i]);
            hj += alldatas[i].payment_income

        }

        //本页合计
        cc.find("middle/mid_btn/byhj", this.node).getComponent(cc.Label).string = Database.countCoinsShowLabel(hj);



    },

    //设置条目数据
    setItemData(data) {
        let newItem = cc.instantiate(this.Item);
        newItem.active = true;


        //我的分红
        cc.find("date", newItem).getComponent(cc.Label).string = Database.countCoinsShowLabel(data.date);

        cc.find("wdfh", newItem).getComponent(cc.Label).string = Database.countCoinsShowLabel(data.payment_income);

        let btn = newItem.getChildByName("agent_btn_s2")
        btn.on("touchend", () => {
            //音效
            Database.clickSound(Database.hall_sound)
            let xjfhmx_pop = this.node.getChildByName("xjfhmx_pop");
            // let allData = Database.getAllData1()
            this.mid.active = true;
            xjfhmx_pop.getComponent("p12_dqmx").setdata(data.date)
        })
        this.sv.content.addChild(newItem);

    },

    //翻页函数
    pageUporDown(event, flag) {
        //音效
        Database.clickSound(Database.hall_sound)
        if (flag == "1") {
            if (this.currentPage >= this.maxPage) return;
            this.currentPage++;
        } else {
            if (this.currentPage <= this.minPage) return;
            this.currentPage--;
        }
        if (this.currentPage > this.currentMaxPage) {
            for (var i = 0; i < this.pageNodes.length; ++i) {
                let pageNum = this.currentPage - this.pageNodes.length + 1 + i;
                this.pageNodes[i].getChildByName("pageIndex").getComponent(cc.Label).string = pageNum;
                this.pageNodes[this.pageNodes.length - 1].getChildByName("agent_di_chosen").active = true;
            }
            this.currentMaxPage = this.currentPage;
            this.currentMinPage++;
        } else if (this.currentPage < this.currentMinPage) {
            for (var i = 0; i < this.pageNodes.length; ++i) {
                let pageNum = this.currentMaxPage - this.pageNodes.length + i;
                this.pageNodes[i].getChildByName("pageIndex").getComponent(cc.Label).string = pageNum;
                this.pageNodes[0].getChildByName("agent_di_chosen").active = true;
            }
            this.currentMinPage = this.currentPage;
            this.currentMaxPage--;
        } else {
            for (var i = 0; i < this.pageNodes.length; ++i) {
                let index = (this.currentPage - this.currentMinPage);
                this.pageNodes[i].getChildByName("agent_di_chosen").active = (i == index);
            }
        }
        this.setPageData()
    },

    //设置页码显示
    setPageIndex() {
        this.pageNodes = [];
        this.pageLayout.removeAllChildren();
        let pageNum = this.maxPage > 3 ? 3 : this.maxPage;
        this.currentMinPage = 1;
        this.currentMaxPage = pageNum;
        if (pageNum < 1) pageNum = 1;
        for (var i = 0; i < pageNum; ++i) {
            var pItem = cc.instantiate(this.pageItem);
            pItem.active = true;
            pItem.getChildByName("pageIndex").getComponent(cc.Label).string = i + 1;
            pItem.getChildByName("agent_di_chosen").active = (i == 0);
            this.pageLayout.addChild(pItem);
            this.pageNodes.push(pItem);
        }
    },

    //跳转页面
    jumpToIndex() {
        //音效
        Database.clickSound(Database.hall_sound)
        let targetIndex = Number(this.jumpIndex.string);
        if (targetIndex > this.maxPage || targetIndex < 1) return;
        this.currentPage = targetIndex;
        this.currentMaxPage = targetIndex < 3 ? 3 : targetIndex;
        this.currentMinPage = targetIndex < 3 ? 1 : targetIndex - 2;
        for (var i = 0; i < this.pageNodes.length; ++i) {
            let pageNum = null;
            if (targetIndex < 3) {
                pageNum = 3 - 2 + i
                this.pageNodes[i].getChildByName("agent_di_chosen").active = (this.currentPage - 1) == i;
            } else {
                pageNum = this.currentPage - this.pageNodes.length + 1 + i;
                this.pageNodes[i].getChildByName("agent_di_chosen").active = (this.pageNodes.length - 1) == i;
            }
            this.pageNodes[i].getChildByName("pageIndex").getComponent(cc.Label).string = pageNum;

        }
        this.setPageData();
    },

    //按日期查询接口
    searchByDate() {
        //音效
        Database.clickSound(Database.hall_sound)
        let firstdt = []
        let enddt = []
        if (this.firstdate.string != "年/月/日") {
            firstdt = this.firstdate.string.split("/")
        }
        enddt = this.enddate.string.split("/")
        //默认请求 
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

        if (fifteenDays) {
            if (parseInt(enddt[1]) - parseInt(firstdt[1]) == 1 && parseInt(firstdt[2]) - parseInt(enddt[2]) >= 0 && parseInt(firstdt[1]) != 0) {

                function check() {
                    return new Promise((resolve, reject) => {

                        let firstdate = firstdt[0] + "-" + fristmonth + "-" + firstday
                        let lastdate = enddt[0] + "-" + lastmonth + "-" + lasttday
                        commonVal.GetPaymentInfo(firstdate, lastdate, resolve)

                    })
                }
                //得到前两列数据后请求后两列数据
                check().then(
                    (value) => {

                        this.currentPage = 1; //当前页码
                        this.minPage = 1; //最小页码
                        this.maxPage = Math.ceil(commonVal.p12_data.length / 3); //最大页码
                        this.totalPage.string = "共 " + this.maxPage + " 页";
                        this.setPageData();
                        this.setPageIndex();
                    },
                    function (error) {
                        console.error("出错了", error);
                    },
                )
            } else if (parseInt(enddt[1]) - parseInt(firstdt[1]) == 0 && parseInt(enddt[2]) - parseInt(firstdt[2]) >= 0) {

                function check() {
                    return new Promise((resolve, reject) => {

                        let firstdate = firstdt[0] + "-" + fristmonth + "-" + firstday
                        let lastdate = enddt[0] + "-" + lastmonth + "-" + lasttday
                        commonVal.GetPaymentInfo(firstdate, lastdate, resolve)

                    })
                }
                //得到前两列数据后请求后两列数据
                check().then(
                    (value) => {

                        this.currentPage = 1; //当前页码
                        this.minPage = 1; //最小页码
                        this.maxPage = Math.ceil(commonVal.p12_data.length / 3); //最大页码
                        this.totalPage.string = "共 " + this.maxPage + " 页";
                        this.setPageData();
                        this.setPageIndex();

                    },
                    function (error) {
                        console.error("出错了", error);
                    },
                )
            } else if (parseInt(enddt[0]) - parseInt(firstdt[0]) == 1 && parseInt(enddt[1]) == 1 && parseInt(firstdt[1]) == 12 && parseInt(firstdt[2]) - parseInt(enddt[2]) >= 0) {
                function check() {
                    return new Promise((resolve, reject) => {


                        let firstdate = firstdt[0] + "-" + fristmonth + "-" + firstday
                        let lastdate = enddt[0] + "-" + lastmonth + "-" + lasttday
                        commonVal.GetPaymentInfo(firstdate, lastdate, resolve)

                    })
                }
                //得到前两列数据后请求后两列数据
                check().then(
                    (value) => {

                        this.currentPage = 1; //当前页码
                        this.minPage = 1; //最小页码
                        this.maxPage = Math.ceil(commonVal.p12_data.length / 3); //最大页码
                        this.totalPage.string = "共 " + this.maxPage + " 页";
                        this.setPageData();
                        this.setPageIndex();

                    },
                    function (error) {
                        console.error("出错了", error);
                    },
                )
            } else if (parseInt(enddt[1]) - parseInt(firstdt[1]) == 0 && parseInt(enddt[2]) - parseInt(firstdt[2]) < 0) {
                cc.log("结束时间小于开始时间");
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "结束时间小于开始时间")

            } else {
                cc.log("日期输入有误...");
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "日期输入有误...")
            }
        } else {
            cc.log("日期输入超过15天...");
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "日期输入有误...")
        }



    },

    //我的比例 
    mybl() {
        //音效
        Database.clickSound(Database.hall_sound)
        // let xjfhmx_pop = this.node.getChildByName("xjfhmx_pop");
        // let allData = Database.getAllData()
        // xjfhmx_pop.getComponent("xjfhmx_pop").setdata(data.date, allData[data.date])
        let wdbl_pop = this.node.getChildByName("wdbl_pop");
        //实际用 
        this.mid.active = true;
        wdbl_pop.getComponent("wdbl_pop").getDividendRule(gHandler.gameGlobal.player.account_name)

        //测试用
        // let data = [{ "_id": "5f446f609feced528ffffcb2", "id": 426163657, "proxy_user_id": 319010216, "type": 1, "game_tag": 1, "demand_type": 1, "demand_tag": 1, "amount": 30000, "percent": 30 }, { "_id": "5f4470259feced528ffffcb3", "id": 426163657, "proxy_user_id": 319010216, "type": 1, "game_tag": 1, "demand_type": 1, "demand_tag": 1, "amount": 60000, "percent": 80 }, { "_id": "5f4470519feced528ffffcb4", "id": 426163657, "proxy_user_id": 319010216, "type": 1, "game_tag": 1, "demand_type": 1, "demand_tag": 1, "amount": 100000, "percent": 90 }];
        //wdbl_pop.getComponent("wdbl_pop").setdata(Database.Allrule)
        //wdbl_pop.active = true;

    },
    //下级比例
    xjbl() {
        //音效
        Database.clickSound(Database.hall_sound)
        this.mid.active = true;
        // let xjfhmx_pop = this.node.getChildByName("xjfhmx_pop");
        // let allData = Database.getAllData()
        // xjfhmx_pop.getComponent("xjfhmx_pop").setdata(data.date, allData[data.date])
        let xjbl_pop = this.node.getChildByName("xjbl_pop");

        xjbl_pop.getComponent("xjbl_pop").search()


    },
    OPenCalendar(event, num) { //打开日历
        //音效
        Database.clickSound(Database.hall_sound)
        if (num == "1") {
            let status = this.node.getChildByName("UIDatePicker1").active;
            this.node.getChildByName("UIDatePicker1").active = !status;
        }
        if (num == "2") {
            let status = this.node.getChildByName("UIDatePicker2").active;
            this.node.getChildByName("UIDatePicker2").active = !status;
        }

    },

    // start () {

    // },

    // update (dt) {},
});