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
        cc.log('进14', num);
        this.careful()
    },
    careful() {

        //显示对应二级菜单栏 //game_tag 游戏分类1  棋牌类型游戏 2. 彩票类型游戏 3. 体育类型游戏   4. 视讯类型游戏
        let game_1, game_2, game_3, game_4, game_5;

        game_1 = this.node.getChildByName('banner').getChildByName('Newlay').getChildByName('qp')
        game_2 = this.node.getChildByName('banner').getChildByName('Newlay').getChildByName('cp')
        game_3 = this.node.getChildByName('banner').getChildByName('Newlay').getChildByName('ty')
        game_4 = this.node.getChildByName('banner').getChildByName('Newlay').getChildByName('sx')
        if (gHandler.app.pinpai == 'nineone' || gHandler.app.pinpai == 'huangshi') {
            game_5 = this.node.getChildByName('banner').getChildByName('Newlay').getChildByName('dz')
            game_5.active = false
        }


        game_1.active = false
        game_2.active = false
        game_3.active = false
        game_4.active = false
        for (let i = 0; i < Database.game_tag.length; i++) {
            if (Database.game_tag[i] == 1) {
                game_1.active = true

            }
            if (Database.game_tag[i] == 2) {
                game_2.active = true

            }
            if (Database.game_tag[i] == 3) {

                game_3.active = true

            }
            if (Database.game_tag[i] == 4) {

                game_4.active = true
            }
            if (gHandler.app.pinpai == 'nineone' && Database.game_tag[i] == 5) {
                game_5.active = true
            }
            if (gHandler.app.pinpai == 'huangshi' && Database.game_tag[i] == 5) {
                game_5.active = true
            }

        }
        if (gHandler.app.pinpai == 'ninetwo') {
            this.checkMyAgents(2, 2)
            return;
        }
        if (gHandler.app.pinpai == 'nineone' || gHandler.app.pinpai == 'huangshi') {
            let game_btn_ac = [game_1, game_2, game_3, game_4, game_5]
            for (let i = 0; i < game_btn_ac.length; i++) {
                if (game_btn_ac[i].active) {
                    let num = 0;
                    num = i + 1;
                    this.checkMyAgents(num, num)
                    return;
                }

            }
        } else {
            let game_btn_ac = [game_1, game_2, game_3, game_4]
            for (let i = 0; i < game_btn_ac.length; i++) {
                if (game_btn_ac[i].active) {
                    let num = 0;
                    num = i + 1;
                    this.checkMyAgents(num, num)
                    return;
                }

            }
        }

    },
    checkMyAgents(event, num) {


        //音效
        if (gHandler.app.pinpai == 'huaxing' && Database.loadview != null) {
            Database.loadview.active = true;
        }
        Database.clickSound(Database.hall_sound)
        Database.page = 1;//每次调用都将滑动事件重置为1
        this.xjbl_btn.active = false;
        commonVal.demand_type = 1;
        
        commonVal.gametags = parseInt(num)


        //在  commonVal.gametags  被赋值后 获取一下 个人规则
        commonVal.huangshi_getDividendRule()


        cc.log('进入 第八页 第', commonVal.gametags, '游戏', 'token', commonVal.token);
        //检查规则 决定是否显示 下级比例按钮
        let allrule = Database.Allrule

        for (let i = 0; i < allrule.length; i++) {
            cc.log('allrule====', allrule[i].game_tag, 'commonVal.gametags==', commonVal.gametags, 'allrule[i].type===', allrule[i].type);
            if (allrule[i].game_tag == commonVal.gametags && allrule[i].type == 1) {
                cc.log('allrule[i].game_tag', allrule[i].game_tag);

                this.xjbl_btn.active = true;
                cc.log(this.xjbl_btn);
            }
        }
        let token = commonVal.token
        let game_1, game_2, game_3, game_4, game_5;

        game_1 = this.node.getChildByName('banner').getChildByName('Newlay').getChildByName('qp').getChildByName('qp_di')
        game_2 = this.node.getChildByName('banner').getChildByName('Newlay').getChildByName('cp').getChildByName('cp_di')
        game_3 = this.node.getChildByName('banner').getChildByName('Newlay').getChildByName('ty').getChildByName('ty_di')
        game_4 = this.node.getChildByName('banner').getChildByName('Newlay').getChildByName('sx').getChildByName('sx_di')
        if (gHandler.app.pinpai == 'nineone' || gHandler.app.pinpai == 'huangshi') {
            game_5 = this.node.getChildByName('banner').getChildByName('Newlay').getChildByName('dz').getChildByName('dz_di')
        }

        if (gHandler.app.pinpai == 'nineone' || gHandler.app.pinpai == 'huangshi') {
            let game_btn = [game_1, game_2, game_3, game_4, game_5]
            for (let index = 0; index < game_btn.length; index++) {
                game_btn[index].active = false

            }
            game_btn[num - 1].active = true
        } else if (gHandler.app.pinpai == 'ninetwo') {
            cc.log('暂不处理')
         }
        else {
            let game_btn = [game_1, game_2, game_3, game_4]
            for (let index = 0; index < game_btn.length; index++) {
                game_btn[index].active = false

            }
            game_btn[num - 1].active = true
        }

        function a() {
            cc.log("成功");
        }
        commonVal.getchild(gHandler.gameGlobal.player.account_name, a);//获取下级id


        function check() {
            return new Promise((resolve, reject) => {
                cc.log('请求第一页数据');
                //默认请求 第一页 棋牌 
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                let newday = day - 1
                month = month < 10 ? '0' + month : month
                day = day < 10 ? '0' + day : day

                function mGetDate(year, month) { //通过年月 获取准确天数
                    var d = new Date(year, month, 0);
                    return d.getDate();
                }
                let firstdate
                if (newday == 0) {
                    newday = mGetDate(year, (month - 1))
                    let newmonth = (month - 1) < 10 ? '0' + (month - 1) : (month - 1)
                    firstdate = year + "-" + newmonth + "-" + newday
                    if (month == 1) {
                        firstdate = (year - 1) + "-" + 12 + "-" + newday
                    }

                } else {
                    newday = newday < 10 ? '0' + newday : newday
                    firstdate = year + "-" + month + "-" + newday

                }


                let lastdate = year + "-" + month + "-" + day
                commonVal.GetStatementDividendInfo(num, token, firstdate, lastdate, resolve)
            })
        }
        //得到前两列数据后请求后两列数据
        check().then(
            (value) => {

                if (gHandler.app.pinpai == 'huaxing' && Database.loadview != null) {
                    Database.loadview.active = false;
                }
                this.data = Database.getData1();

                this.currentPage = 1; //当前页码
                this.minPage = 1; //最小页码
                if(gHandler.app.pinpai == 'ninetwo'){
                    this.maxPage = Math.ceil(this.data.length / 20);
                    this.totalPage.string = "每页20条 共 " + this.maxPage + " 页";
                }else{
                     this.maxPage = Math.ceil(this.data.length / 10); //最大页码
                     this.totalPage.string = "共 " + this.maxPage + " 页";
                }
               
               
                this.setPageData();
                this.setalldata();
                this.setPageIndex();
            },
            function (error) {
                console.error("出错了", error);
            },


        )
    },
    setalldata() {
        cc.log('合计所有数据');
        //合计所有的数据
        let dllzls = 0;
        let dllfn = 0;
        let wdfhs = 0;
        let xjfhs = 0;
        let zql = 0;
        let alldatas = Database.getAllData1()
        cc.log('alldatas', alldatas);
        for (var i = 0; i < this.data.length; ++i) {
            dllzls += this.data[i].statement
            dllfn += this.data[i].money
            zql += this.data[i].amount
            for (let index = 1; index < alldatas[this.data[i].date].length; index++) {
                xjfhs += alldatas[this.data[i].date][index].money
            }

        }
        wdfhs = dllfn - xjfhs;
        cc.log();
        //代理链总流水
        cc.find("bottom/Label4", this.node).getComponent(cc.Label).string = Database.countCoinsShowLabel(dllzls);
        //周期量
        cc.find("bottom/Label10", this.node).getComponent(cc.Label).string = Database.countCoinsShowLabel(zql);
        //下级分红
        cc.find("bottom/Label5", this.node).getComponent(cc.Label).string = Database.countCoinsShowLabel(xjfhs);
        //我的分红
        cc.find("bottom/Label6", this.node).getComponent(cc.Label).string = Database.countCoinsShowLabel(wdfhs);
        //代理链分红
        cc.find("bottom/Label8", this.node).getComponent(cc.Label).string = Database.countCoinsShowLabel(dllfn);
    },
    //设置页面数据
    setPageData() {
        let endIndex
        let startIndex 
        //this.data 是所有的个人信息 也就是每个日期的第一条数据
        if(gHandler.app.pinpai == 'ninetwo'){
            endIndex = this.currentPage * 20;
            startIndex = (this.currentPage - 1) * 20
        }else{
            endIndex = this.currentPage * 10;
            startIndex = (this.currentPage - 1) * 10
        }
       
        endIndex = endIndex > this.data.length ? this.data.length : endIndex;
       
        this.sv.content.removeAllChildren();
        this.sv.scrollToTop();
        //本页合计数据
        let dllzls = 0; //代理链总流水
        let xjfhs = 0;//下级分红
        let wdfhs = 0;//我的分红
        let dllfn = 0;//代理链分红
        let zql = 0;//周期量

        //用所有数据来算数据{11:[{},{}],12:[{},{}]}
        let alldatas = Database.getAllData1()
        for (var i = startIndex; i < endIndex; ++i) {
            this.setItemData(this.data[i], i);
            dllzls += this.data[i].statement
            dllfn += this.data[i].money
            zql += this.data[i].amount
            for (let index = 1; index < alldatas[this.data[i].date].length; index++) {
                xjfhs += alldatas[this.data[i].date][index].money
            }

        }
        wdfhs = dllfn - xjfhs;
        //本页合计
        //代理链总流水
        cc.find("bottom/Label1", this.node).getComponent(cc.Label).string = Database.countCoinsShowLabel(dllzls);
        //周期量
        cc.find("bottom/Label9", this.node).getComponent(cc.Label).string = Database.countCoinsShowLabel(zql);
        //下级分红
        cc.find("bottom/Label2", this.node).getComponent(cc.Label).string = Database.countCoinsShowLabel(xjfhs);
        //我的分红
        cc.find("bottom/Label3", this.node).getComponent(cc.Label).string = Database.countCoinsShowLabel(wdfhs);
        //代理链分红
        cc.find("bottom/Label7", this.node).getComponent(cc.Label).string = Database.countCoinsShowLabel(dllfn);


    },

    //设置条目数据
    setItemData(data) {
        let newItem = cc.instantiate(this.Item);
        newItem.active = true;
        //下级分红  要计算所有数据得到
        let xjfh = 0;
        //用所有当日数据来算数据
        let alldatas = Database.getAllData1()

        for (let index = 1; index < alldatas[data.date].length; index++) {
            xjfh += alldatas[data.date][index].money
        }

        let datess = new Date() //当前日期
        let nowyear = datess.getFullYear();//当前年
        let nowmonth = datess.getMonth() + 1;//当前月
        let nowday = datess.getDate();//当前日

        let dates = (data.date + '').split('-')//数据时间年月日 

        let datazt;
        if (parseInt(dates[0]) == nowyear && parseInt(dates[1]) == nowmonth && parseInt(dates[2]) == nowday) {
            datazt = '未发'
        } else {
            if (parseFloat(data.grant) == parseFloat(data.money) - xjfh) {
                datazt = '已发'
            } else {
                datazt = '未发'
            }
        }

        let icedsb = dates[0] + ''
        icedsb = icedsb.substring(icedsb.length - 2)
        //日期
        cc.find("date", newItem).getComponent(cc.Label).string = icedsb + "." + dates[1] + "." + dates[2];
        //周期量
        cc.log('data.amount========', data.amount);
        cc.find("zql", newItem).getComponent(cc.Label).string = Database.countCoinsShowLabel(parseFloat(data.amount));
        //代理链总流水
        cc.find("dllzls", newItem).getComponent(cc.Label).string = Database.countCoinsShowLabel(parseFloat(data.statement));
        //我的挡位比
        let dwb = data.percent * 0.05 * 0.5 * 100
        cc.find("wddwb", newItem).getComponent(cc.Label).string = Database.countCoinsShowLabel(parseFloat(dwb));
        //代理链分红
        cc.find("dllfh", newItem).getComponent(cc.Label).string = Database.countCoinsShowLabel(parseFloat(data.money));
        //下级分红
        cc.find("xjfh", newItem).getComponent(cc.Label).string = Database.countCoinsShowLabel(parseFloat(xjfh));
        //我的分红
        cc.find("wdfh", newItem).getComponent(cc.Label).string = Database.countCoinsShowLabel(parseFloat(data.money - xjfh));
        if (Database.countCoinsShowLabel(parseFloat(data.money - xjfh)) == '0') {
            datazt = ''
        }
        //我的分红
        cc.find("zt", newItem).getComponent(cc.Label).string = datazt;

        let btn = newItem.getChildByName("agent_btn_s2")
        btn.on("touchend", () => {
            let xjfhmx_pop = this.node.getChildByName("xjfhmx_pop");
            let allData = Database.getAllData1()
            this.mid.active = true;
            xjfhmx_pop.getComponent("xjfhmx_pop").setdata(data.date, allData[data.date])
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

        if (fifteenDays) {
            if (parseInt(enddt[1]) - parseInt(firstdt[1]) == 1 && parseInt(firstdt[2]) - parseInt(enddt[2]) >= 0 && parseInt(firstdt[1]) != 0) {

                function check() {
                    return new Promise((resolve, reject) => {

                        let firstdate = firstdt[0] + "-" + fristmonth + "-" + firstday
                        let lastdate = enddt[0] + "-" + lastmonth + "-" + lasttday
                        commonVal.GetStatementDividendInfo(commonVal.gametags, commonVal.token, firstdate, lastdate, resolve)

                    })
                }
                //得到前两列数据后请求后两列数据
                check().then(
                    (value) => {
                        // this.data = [];
                        // for (var i = 0; i < 100; i++) {
                        //     let itemData = {
                        //         date: "第" + i + "条",
                        //         dlfh: 400,
                        //         xjfh: 200,
                        //         sjfh: 300,
                        //     };
                        //     this.data.push(itemData);
                        // }
                        // this.pageNodes = [];

                        this.pageNodes = [];
                        this.data = Database.getData1();
                        this.currentPage = 1; //当前页码
                        this.minPage = 1; //最小页码
                        if(gHandler.app.pinpai == 'ninetwo'){
                            this.maxPage = Math.ceil(this.data.length / 20);
                            this.totalPage.string = "每页20条 共 " + this.maxPage + " 页";
                        }else{
                             this.maxPage = Math.ceil(this.data.length / 10); //最大页码
                             this.totalPage.string = "共 " + this.maxPage + " 页";
                        }
                      
                        this.setalldata();
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
                        //默认请求 第一页 棋牌 
                        let firstdate = firstdt[0] + "-" + fristmonth + "-" + firstday
                        let lastdate = enddt[0] + "-" + lastmonth + "-" + lasttday
                        commonVal.GetStatementDividendInfo(commonVal.gametags, commonVal.token, firstdate, lastdate, resolve)

                    })
                }
                //得到前两列数据后请求后两列数据
                check().then(
                    (value) => {
                        // this.data = [];
                        // for (var i = 0; i < 100; i++) {
                        //     let itemData = {
                        //         date: "第" + i + "条",
                        //         dlfh: 400,
                        //         xjfh: 200,
                        //         sjfh: 300,
                        //     };
                        //     this.data.push(itemData);
                        // }
                        // this.pageNodes = [];
                        // this.currentPage = 1; //当前页码
                        // this.minPage = 1; //最小页码
                        // this.maxPage = Math.ceil(this.data.length / 10); //最大页码
                        // this.totalPage.string = "共 " + this.maxPage + " 页";
                        cc.log('得到前两列数据后请求后两列数据', this.data);
                        this.pageNodes = [];
                        this.data = Database.getData1();
                        this.currentPage = 1; //当前页码
                        this.minPage = 1; //最小页码
                        if(gHandler.app.pinpai == 'ninetwo'){
                            this.maxPage = Math.ceil(this.data.length / 20);
                            this.totalPage.string = "每页20条 共 " + this.maxPage + " 页";
                        }else{
                             this.maxPage = Math.ceil(this.data.length / 10); //最大页码
                             this.totalPage.string = "共 " + this.maxPage + " 页";
                        }
                       
                       
                        this.setalldata();
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
                        //默认请求 第一页 棋牌 

                        let firstdate = firstdt[0] + "-" + fristmonth + "-" + firstday
                        let lastdate = enddt[0] + "-" + lastmonth + "-" + lasttday
                        commonVal.GetStatementDividendInfo(commonVal.gametags, commonVal.token, firstdate, lastdate, resolve)

                    })
                }
                //得到前两列数据后请求后两列数据
                check().then(
                    (value) => {
                        // this.data = [];
                        // for (var i = 0; i < 100; i++) {
                        //     let itemData = {
                        //         date: "第" + i + "条",
                        //         dlfh: 400,
                        //         xjfh: 200,
                        //         sjfh: 300,
                        //     };
                        //     this.data.push(itemData);
                        // }
                        // this.pageNodes = [];
                        // this.currentPage = 1; //当前页码
                        // this.minPage = 1; //最小页码
                        // this.maxPage = Math.ceil(this.data.length / 10); //最大页码
                        // this.totalPage.string = "共 " + this.maxPage + " 页";
                        cc.log('得到前两列数据后请求后两列数据', this.data);
                        this.pageNodes = [];
                        this.data = Database.getData1();
                        this.currentPage = 1; //当前页码
                        this.minPage = 1; //最小页码
                        if(gHandler.app.pinpai == 'ninetwo'){
                            this.maxPage = Math.ceil(this.data.length / 20);
                            this.totalPage.string = "每页20条 共 " + this.maxPage + " 页";
                        }else{
                             this.maxPage = Math.ceil(this.data.length / 10); //最大页码 
                              this.totalPage.string = "共 " + this.maxPage + " 页";
                        }
                      
                        this.setalldata();
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
        // let xjfhmx_pop = this.node.getChildByName("xjfhmx_pop");
        // let allData = Database.getAllData()
        // xjfhmx_pop.getComponent("xjfhmx_pop").setdata(data.date, allData[data.date])

        //音效
        Database.clickSound(Database.hall_sound)
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