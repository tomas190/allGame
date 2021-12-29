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
        mid: {
            default: null,
            type: cc.Node,
        },
        pageLayout: {
            default: null,
            type: cc.Node,
        },

        jumpIndex: {
            default: null,
            type: cc.Label,
        },
        id: { //要查询的id
            default: null,
            type: cc.Label,
        },

        date: { //查询的月份
            default: null,
            type: cc.Label,
        },
        sx: { //查询周期上下
            default: null,
            type: cc.Label,
        },
        sfks: { //已发实发
            default: null,
            type: cc.Label,
        },
        MyLossDividend: {//我的亏损分红
            default: null,
            type: cc.Node,
        },
        xjbl_btn: {//下级比例按钮
            default: null,
            type: cc.Node,
        },
        fs_view: {//下级比例按钮
            default: null,
            type: cc.Node,
        },
        checkedItemIndex: [],
        minPage: 1,
        pageNodes: [],
        firstdates: '',
        lastdates: '',



    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.checkedItemIndex = [];//保存选中的条目
        this.minPage = 1; //最小页码

        // //先登录请求
        // let host = gHandler.gameGlobal.proxy.proxy_host;
        // let url = host + "/Proxy/User/login";
        // var xhr = new XMLHttpRequest();
        // xhr.onreadystatechange = () => {
        //     if (xhr.readyState == 4 && xhr.status === 200) {
        //         var resData = JSON.parse(xhr.responseText);
        //         cc.log("/Proxy/User/login返回:", resData);
        //         if (resData.code === 200) {
        //             commonVal.token = resData.msg.token;
        //             //登录成功后调用回调
        //             this.checkMyAgent(1, 1)
        //         } else {
        //             canvasScript.onMessagePrefabNeeded(null, "获取数据失败");
        //         }
        //     }
        //     xhr.abort();
        // };
        // xhr.open("POST", url, true);
        // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // // //平时 测试登录
        // var sendData = `account_name=${gHandler.gameGlobal.player.account_name}&password=123456`;

        // //上线
        // //var sendData = `account_name=${gHandler.gameGlobal.player.account_name}&token=${gHandler.gameGlobal.token}`
        // cc.log('login host', host + "/Proxy/User/login");
        // cc.log('login sendData', sendData);
        // xhr.send(sendData);
    },
    mGetDate(year, month) { //通过年月 获取准确天数
        var d = new Date(year, month, 0); s
        return d.getDate();
    },
    checkMyAgent(event, num) {
        //音效
        Database.clickSound(Database.hall_sound)
        Database.page = 1;//每次调用都将滑动事件重置为1
        this.reset() //重置页面
        this.sv.content.removeAllChildren();//重置玩家列表
        commonVal.gametags = parseInt(num)
        commonVal.demand_type = 2;
        let allrule = Database.Allrule
        this.xjbl_btn.active = false;
        cc.log('进入 第五页 第', commonVal.gametags, '游戏', 'token', commonVal.token);
        for (let i = 0; i < allrule.length; i++) {
            if (allrule[i].game_tag == commonVal.gametags && allrule[i].type == 2) {
                cc.log('allrule[i].game_tag===========', allrule[i].game_tag);
                this.xjbl_btn.active = true;
            }
        }
        function a() {
            cc.log("成功");
        }
        commonVal.getchild(gHandler.gameGlobal.player.account_name, a);//获取下级id
        commonVal.getDividendRuleonetype(commonVal.gametags, 2, a) //为获取冗余的参数
        let token = commonVal.token
        let game_1 = this.node.getChildByName('banner').getChildByName('qp_di')
        let game_2 = this.node.getChildByName('banner').getChildByName('cp_di')
        let game_3 = this.node.getChildByName('banner').getChildByName('ty_di')
        let game_4 = this.node.getChildByName('banner').getChildByName('sx_di')
        let game_btn = [game_1, game_2, game_3, game_4]
        for (let index = 0; index < game_btn.length; index++) {
            game_btn[index].active = false

        }
        game_btn[num - 1].active = true
        function mGetDate(year, month) { //通过年月 获取准确天数
            var d = new Date(year, month, 0);
            return d.getDate();
        }
        let firstdate;
        let lastdate;
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        month = month < 10 ? '0' + month : month
        if (day > 15) {
            day = day < 10 ? '0' + day : day
            firstdate = year + "-" + month + "-" + 16
            let days = mGetDate(year, month) //最大日期
            lastdate = year + "-" + month + "-" + days
        } else {
            day = day < 10 ? '0' + day : day
            firstdate = year + "-" + month + "-" + "01"
            lastdate = year + "-" + month + "-" + 15
        }
        this.firstdates = firstdate
        this.lastdates = lastdate

        function check() {
            return new Promise((resolve, reject) => {
                cc.log('请求第一页数据');
                //默认请求 第一页 棋牌
                commonVal.GetDeficitDividendInfo(num, firstdate, lastdate, resolve)
            })
        }
        //得到前两列数据后请求后两列数据
        check().then(
            (value) => {
                cc.log('youshuju',);

                this.data = Database.getData2();
                this.currentPage = 1; //当前页码
                this.minPage = 1; //最小页码
                this.maxPage = Math.ceil(this.data.length / 10); //最大页码
                this.totalPage.string = "共 " + this.maxPage + " 页";
                this.setallmoney();
                this.setMyItemData()
                this.setPageData();
                this.setPageIndex();
            },
            function (error) {
                console.error("出错了", error);
            },
        )
    },

    //设置页面数据
    setPageData() {  // 取数据从第二条开始去
        cc.log('data', this.data);
        this.sv.content.removeAllChildren();
        let endIndex = this.currentPage * 10;
        if (this.data.length == 0) return;
        endIndex = endIndex > this.data.length ? this.data.length - 1 : endIndex;
        let startIndex = (this.currentPage - 1) * 10 + 1
        this.sv.scrollToTop();
        for (var i = startIndex; i <= endIndex; ++i) {
            this.setItemData(this.data[i], i);
        }
    },
    reset() { //重置数据
        cc.find("label1", this.MyLossDividend).getComponent(cc.Label).string = ''; //周期
        cc.find("label2", this.MyLossDividend).getComponent(cc.Label).string = ''; //代理链总亏损
        cc.find("label3", this.MyLossDividend).getComponent(cc.Label).string = ''//流水分红扣除
        cc.find("label4", this.MyLossDividend).getComponent(cc.Label).string = '' //渠道费用扣除
        cc.find("label5", this.MyLossDividend).getComponent(cc.Label).string = '' //应发分红
        cc.find("label6", this.MyLossDividend).getComponent(cc.Label).string = '' //状态
        cc.find("label7", this.MyLossDividend).getComponent(cc.Label).string = '' //我的挡位
        cc.find("label8", this.MyLossDividend).getComponent(cc.Label).string = '' //周期量
        this.sfks.string = ''
        this.checkedItemIndex = [];//清空选择数组

    },
    setMyItemData() {
        let data = this.data[0]
        if (data != undefined && data != null) {
            let zqs = data.date.split(":") //得到周期的前断 2020-5-1
            let zq = zqs[0].split("-") //得到数组 [2020,5,1]
            let sjzq

            if (parseInt(zq[2]) <= 15) {
                sjzq = zq[0].slice(-2) + '/' + zq[1] + '上'
            } else {
                sjzq = zq[0].slice(-2) + '/' + zq[1] + '下'
            }

            let datazt;
            if (data.money != 0 && data.grant == data.money) {
                datazt = '已发'
            } else {
                cc.log('data.grant====', data.grant, 'data.money===', data.money);
                datazt = '未发'
            }
            if (parseFloat(data.money) <= 0) {
                cc.find("label5", this.MyLossDividend).getComponent(cc.Label).string = Database.countCoinsShowLabel(parseFloat(data.money))  //应发分红 //应发分红
                datazt = ''
            } else {
                cc.find("label5", this.MyLossDividend).getComponent(cc.Label).string = Database.countCoinsShowLabel(parseFloat(data.money))  //应发分红
            }
            cc.find("label1", this.MyLossDividend).getComponent(cc.Label).string = sjzq; //周期

            cc.find("label3", this.MyLossDividend).getComponent(cc.Label).string = Database.countCoinsShowLabel(parseFloat(data.statement_cost_money));//流水分红扣除
            cc.find("label4", this.MyLossDividend).getComponent(cc.Label).string = Database.countCoinsShowLabel(parseFloat(data.cost_money))  //渠道费用扣除

            cc.find("label6", this.MyLossDividend).getComponent(cc.Label).string = datazt //状态
            cc.find("label7", this.MyLossDividend).getComponent(cc.Label).string = data.percent + "%";
            cc.find("label8", this.MyLossDividend).getComponent(cc.Label).string = Database.countCoinsShowLabel(parseFloat(data.amount)) //周期量
            if (commonVal.gametags == 1) {
                cc.find("label3", this.MyLossDividend).getComponent(cc.Label).string = '0'//棋牌亏损流水分红扣除默认0
            }
            if (parseFloat(data.deficit) < 0) {
                cc.find("label2", this.MyLossDividend).getComponent(cc.Label).string = Database.countCoinsShowLabel(Math.abs(parseFloat(data.deficit))); //代理链总亏损
            } else {
                cc.find("label2", this.MyLossDividend).getComponent(cc.Label).string = '0'; //代理链总亏损
            }
        }


    },

    //设置条目数据 data 条目数据 i 当前页条目索引
    setItemData(data, i) {
        cc.log('展示DATA', data, i);
        let newItem = cc.instantiate(this.Item);
        newItem.active = true;

        newItem._myIndex_ = i;

        let zqs = data.date.split(":") //得到周期的前断 2020-5-1
        let zq = zqs[0].split("-") //得到数组 [2020,5,1]
        let sjzq
        // let day = parseInt(zq[2]) < 10 ? "0" + zq[2] : zq[2]
        // let mounth = parseInt(zq[1]) < 10 ? "0" + zq[1] : zq[1]

        if (parseInt(zq[2]) <= 15) {
            sjzq = zq[0].slice(-2) + '/' + zq[1] + '上'
        } else {
            sjzq = zq[0].slice(-2) + '/' + zq[1] + '下'
        }
        let datazt;
        if (data.grant == data.money && data.money != 0) {
            datazt = '已发'
            // newItem.getChildByName("checkBox").getComponent(cc.Toggle).interactable = true
        } else {
           
            // newItem.getChildByName("checkBox").getComponent(cc.Toggle).interactable = false
            cc.log('data.grant====', data.grant, 'data.money===', data.money);
            datazt = '未发'
            if (parseFloat(data.money) > 0) {
                let btn = newItem.getChildByName("checkBox")
                btn.on("touchend", () => {
                    let index = newItem._myIndex_
                    cc.log(index);
                    let flag = this.checkedItemIndex.indexOf(index);
                    if (flag == -1) {
                        btn.getChildByName("checkmark").active = true
                        this.checkedItemIndex.push(index);
                    } else {
                        btn.getChildByName("checkmark").active = false
                        this.checkedItemIndex.splice(flag, 1)
                    }
                    cc.log(this.checkedItemIndex)
                })
            }
        }
        if (parseFloat(data.money) <= 0) {
            // newItem.getChildByName("checkBox").getComponent(cc.Toggle).interactable = true
            cc.find("yffh", newItem).getComponent(cc.Label).string = Database.countCoinsShowLabel(parseFloat(data.money)); //应发分红
            datazt = ''
        } else {
            cc.find("yffh", newItem).getComponent(cc.Label).string = Database.countCoinsShowLabel(parseFloat(data.money));//应发分红
        }
        cc.find("xjd", newItem).getComponent(cc.Label).string = data.id;//下级id
        cc.find("zql", newItem).getComponent(cc.Label).string = Database.countCoinsShowLabel(parseFloat(data.amount));//周期量
        cc.find("zq", newItem).getComponent(cc.Label).string = sjzq; //周期
        cc.find("dwb", newItem).getComponent(cc.Label).string = data.percent + "%"; //挡位比
        cc.find("lsfhkc", newItem).getComponent(cc.Label).string = Database.countCoinsShowLabel(parseFloat(data.statement_cost_money));//流水分红扣除
        cc.find("qdfykc", newItem).getComponent(cc.Label).string = Database.countCoinsShowLabel(parseFloat(data.cost_money));//渠道费用扣除

        cc.find("zt", newItem).getComponent(cc.Label).string = datazt;
        // 
        newItem.getChildByName("checkBox").getComponent(cc.Toggle).isChecked = (this.checkedItemIndex.indexOf(i) != -1)
        if (commonVal.gametags == 1) {
            cc.find("lsfhkc", newItem).getComponent(cc.Label).string = '0'//棋牌亏损流水分红扣除默认0
        }
        cc.log('data.deficit==========', data.deficit);
        if (parseFloat(data.deficit) < 0) {
            cc.find("dllzks", newItem).getComponent(cc.Label).string = Database.countCoinsShowLabel(Math.abs(parseFloat(data.deficit))); //代理链总亏损
        } else {
            cc.find("dllzks", newItem).getComponent(cc.Label).string = '0'; //代理链总亏损
        }
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
        //先重置
        this.pageNodes.length = 0
        this.pageLayout.removeAllChildren()
        this.currentMinPage = 1;
        let pageNum = this.maxPage > 3 ? 3 : this.maxPage;
        if (pageNum < 1) pageNum = 1;
        this.currentMaxPage = pageNum;
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
        let ids = this.id.string;
        let a;
        let dates;
        let enddate;
        function mGetDate(year, month) { //通过年月 获取准确天数
            var d = new Date(year, month, 0);
            return d.getDate() + '';
        }
        if (this.date.string != '----年--月') {
            this.reset()
            a = this.date.string.split('-')
        } else {
            return
        }
        //限制 18天
        let myDate = new Date()
        let nowyear = myDate.getFullYear()
        let nowmonth = myDate.getMonth() + 1;
        let nowday = myDate.getDate();
        cc.log(nowyear, nowmonth, nowday);
        let fifteenDays = false;
        //同年同月
        if (parseInt(nowyear) == parseInt(a[0]) && parseInt(a[1]) == nowmonth) {
            fifteenDays = true;
            //上半个月限制 19日之前
            if (this.sx.string == '上') {
                if (nowday <= 18) {
                    fifteenDays = true;
                } else {
                    fifteenDays = false;
                }
            }

            //同年不同月可查18天
        } else if (parseInt(nowyear) == parseInt(a[0]) && parseInt(a[1]) - parseInt(nowmonth) == -1 && parseInt(nowday) <= 3 && this.sx.string == '下') {
            fifteenDays = true;
            //不同年不同月
        } else if (parseInt(nowyear) - parseInt(a[0]) == 1 && parseInt(a[1]) == 12 && parseInt(nowmonth) == 1 && parseInt(nowday) <= 3 && this.sx.string == '下') {
            fifteenDays = true;
        }

        if (fifteenDays) {
            let mounth = parseInt(a[1]) < 10 ? "0" + a[1] : a[1]
            if (this.sx.string == '上') {
                dates = a[0] + '-' + mounth + '-' + "01"
                enddate = a[0] + '-' + mounth + '-' + "15"
            } else {
                let days = mGetDate(a[0], a[1])
                dates = a[0] + '-' + mounth + '-' + "16"
                enddate = a[0] + '-' + mounth + '-' + days
            }
            this.firstdates = dates
            this.lastdates = enddate
            function check() {
                return new Promise((resolve, reject) => {
                    commonVal.GetDeficitDividendInfo(commonVal.gametags, dates, enddate, resolve)
                })
            }
            //得到前两列数据后请求后两列数据
            check().then(
                (value) => {
                    cc.log('进来了 check().then', Database.getData2());
                    this.data = [];
                    this.data = Database.getData2();
                    this.pageNodes = [];
                    this.currentPage = 1; //当前页码
                    this.minPage = 1; //最小页码
                    this.maxPage = Math.ceil(this.data.length / 10); //最大页码
                    this.totalPage.string = "共 " + this.maxPage + " 页";

                    this.setMyItemData();
                    this.setallmoney();
                    let searchdata = [];
                    if (ids != '' && ids != gHandler.gameGlobal.player.account_name) {
                        cc.log('ids==', ids);
                        searchdata = Database.searchksById(ids)  //对应id下级所有数组
                        let alldata = []
                        alldata = [this.data[0]];
                        this.data = alldata.concat(searchdata);
                    }


                    this.setPageData();
                    this.setPageIndex();

                },
                function (error) {
                    console.error("出错了", error);
                },
            )
        } else {
            cc.log("日期输入超过15天..");
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "日期输入有误...")
        }


    },
    setallmoney() {
        if (this.data) {
            if (this.data != [] && this.data != null && this.data.length > 1) {
                let sfmoney = 0;
                let yfmoney = 0;
                let data = this.data
                // Database.countCoinsShowLabel(parseFloat(data.money));//应发分红
                for (let i = 1; i < data.length; i++) {
                    if (parseFloat(data[i].money) > 0) {
                        yfmoney += parseFloat(data[i].money);
                    } else {
                        yfmoney += 0
                    }

                    sfmoney += parseFloat(data[i].grant);

                }
                let qf = yfmoney - sfmoney;
                this.sfks.string = "实发" + Database.countCoinsShowLabel(sfmoney) + "元，欠发" + Database.countCoinsShowLabel(qf) + "元"

            }
        }
    },
    //发放函数
    dispatch(event, flag) {
        //音效
        Database.clickSound(Database.hall_sound)
        let sendArr = [];
        let date = new Date()
        let nowyear = date.getFullYear();
        let nowmonth = date.getMonth() + 1;
        let nowday = date.getDate();

        let ynr = this.lastdates.split('-')
        let lastyear = parseInt(ynr[0])
        let lastmonth = parseInt(ynr[1])
        let lastday = parseInt(ynr[2])

        cc.log('nowyear', nowyear, "lastyear=", lastyear, 'lastmonth', lastmonth, "lastday", lastday);
        let psa = false;
        // cc.log("nowmonth========", nowyear, lastyear,nowmonth);
        if (nowyear <= lastyear) {
            //  cc.log("nowmonth========", nowmonth,lastmonth);
            if (nowmonth == lastmonth && nowday > lastday) {
                //  cc.log('222222222222222222222', nowmonth, lastmonth);
                psa = true
            }
            if (nowmonth > lastmonth) {
                // cc.log('1111111111111111111111', nowmonth, lastmonth);
                psa = true
            }

        }
        if (nowyear > lastyear) {
            psa = true
        }

        if (psa) {
            if (flag == "0") {//一键发放
                this.GrantDeficitDividendByDateAndGameTag()
                cc.log("Ejjjjjjjjjjjjj", sendArr)
            } else {//选择发放
                for (var i = 0; i < this.checkedItemIndex.length; ++i) {
                    sendArr.push(this.data[this.checkedItemIndex[i]]._id);//假设根据id发放
                }
                cc.log("xxxEEEEEEE", sendArr)
                if (sendArr.length == 0) {
                    cc.log('请选择需要发放的分红信息');
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '请选择需要发放的分红信息')
                }
                let ic = 0
                let func = this.schedule(() => {
                    cc.log('进入定时器', ic);
                    if (ic < sendArr.length) {
                        this.GrantDeficitDividendByRoundID(sendArr[ic])
                        ic++;
                    }
                }, 0.1, sendArr.length, 0)

            }
        } else {
            cc.log('当前周期大于可发放周期！');
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '当前周期大于可发放周期！')
        }



    },

    //选中事件
    checkClick(event, args) {
        let toggle = event.target.getComponent(cc.Toggle);
       
        // toggle.isChecked = toggle.isChecked ? false : true;
        // let index = event.target.parent._myIndex_
        // let flag = this.checkedItemIndex.indexOf(index);
        // if (flag == -1) {
        //     this.checkedItemIndex.push(index);
        // } else {
        //     this.checkedItemIndex.splice(flag, 1)
        // }
        if (toggle.isChecked) {
            toggle.check()
        } else {
            toggle.uncheck()
        }
        let index = event.target.parent._myIndex_
        let flag = this.checkedItemIndex.indexOf(index);
        if (!toggle.isChecked) {
            if (flag == -1) {
                this.checkedItemIndex.push(index);
            } else {
                this.checkedItemIndex.splice(flag, 1)
            }
        }else{
            if (flag != -1) {
                this.checkedItemIndex.splice(flag, 1)
            }
        }
    },
    OPenCalendar() { //打开日历
        //音效
        Database.clickSound(Database.hall_sound)
        let status = this.node.getChildByName("UIDatePickers").active;
        this.node.getChildByName("UIDatePickers").active = !status;


    },

    // start () {

    // },

    // update (dt) {},
    //我的比例
    mybl() {
        //音效
        Database.clickSound(Database.hall_sound)
        let wdbl_pop = this.node.getChildByName("wdbl_pop");
        this.mid.active = true
        //实际用 
        wdbl_pop.getComponent("ks_wdbl_pop").getDividendRule(gHandler.gameGlobal.player.account_name)



    },
    //下级比例
    xjbl() {
        //音效
        Database.clickSound(Database.hall_sound)
        let xjbl_pop = this.node.getChildByName("xjbl_pop");
        this.mid.active = true
        cc.log('下级比例');
        xjbl_pop.getComponent("ks_xjbl_pop").search()

    },
    //资金转入
    zjzr() {
        //音效
        Database.clickSound(Database.hall_sound)
        let zjzr_pop = this.node.getChildByName("zjzr_pop");
        this.mid.active = true
        cc.log('资金转入比例');
        zjzr_pop.getComponent("zjzr_pop").setData()
    },//一件发放
    GrantDeficitDividendByDateAndGameTag() {
        // 单个单号亏损分红
        // URL http://161.117.178.174:12350/proxy/user/GrantDeficitDividendByDateAndGameTag
        // METHOD POST
        // PARAMS {
        //     account_name 用户ID
        //     token 密匙
        //     first_date 2020 - 05 - 01
        //     last_date 2020 - 05 - 15
        //     game_tag 游戏分类
        //     demand_type
        //     demand_tag
        // }
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("POST", host + "/proxy/user/GrantDeficitDividendByDateAndGameTag", true);
        xhr_test.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");


        var sendData = `account_name=${gHandler.gameGlobal.player.account_name
            }&token=${commonVal.token}&first_date=${this.firstdates}&last_date=${this.lastdates}&game_tag=${commonVal.gametags}&demand_type=${Database.yf_demand_type}&demand_tag=${Database.yf_demand_tag}`;
        cc.log('sendData====', host + "/proxy/user/GrantDeficitDividendByDateAndGameTag" + sendData);
        xhr_test.send(sendData);
        xhr_test.onreadystatechange = () => {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("一键发放请求", resData);
                let success = this.fs_view.getChildByName('success').getComponent(cc.Label);
                let error = this.fs_view.getChildByName('error').getComponent(cc.Label);
                let suc_st = '暂无数据';
                let err_st = '暂无数据';
                if (resData.code == 200) {

                    if (resData.msg.success != null) {
                        suc_st = ''
                        for (let i = 0; i < resData.msg.success.length; i++) {
                            suc_st += resData.msg.success[i] + '    ';
                        }

                    }
                    if (resData.msg.error != null) {
                        err_st = ''
                        for (let i = 0; i < resData.msg.error.length; i++) {
                            err_st += resData.msg.error[i] + '    ';
                        }
                    }
                }
                success.string = suc_st
                error.string = err_st
                this.mid.active = true
                this.fs_view.active = true

            }
            xhr_test.abort();
        };

    },

    //选择发放
    GrantDeficitDividendByRoundID(round_id) {
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("POST", host + "/proxy/user/GrantDeficitDividendByRoundID", true);
        xhr_test.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // PARAMS {
        //     account_name 用户ID
        //     token 密匙
        //     round_id 
        // } 
        // let json_round_id = JSON.stringify(round_id)
        var sendData = `account_name=${gHandler.gameGlobal.player.account_name
            }&token=${commonVal.token}&round_id=${round_id}`;
        cc.log('sendData==============', sendData);
        xhr_test.send(sendData);
        xhr_test.onreadystatechange = () => {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("选择发放请求", resData);
                if (resData.code == 200) {
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '发放成功！')
                    this.searchByDate()
                }
                if (resData.code == 404 && resData.msg == "round id is empty") {
                    let txt = Database.Switchtext(resData.msg)
                    cc.log(txt);
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, txt)

                } else if (resData.code == 404) {
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '发放失败！')
                }



            }
            xhr_test.abort();
        };
    },
    closetip() {
        //音效
        Database.clickSound(Database.hall_sound)
        this.fs_view.getChildByName('success').getComponent(cc.Label).string = ''
        this.fs_view.getChildByName('error').getComponent(cc.Label).string = ''
        this.searchByDate()
        this.mid.active = false;
        this.fs_view.active = false
    }
});