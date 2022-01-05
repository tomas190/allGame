const gHandler = require("../../../../common/gHandler");

let Database = {
    a_num: 0,
    moveBalanceToGames: true,//p1 佣金限制开关
    //流水玩家数据
    Allrule: [],
    balance: 0,
    StatementDividendInfo: null,
    keys1: [],//排好顺序的 流水分红key值
    page5Data: null,
    page6Data: null,//页面6数据
    data1: [],//流水分红界面数据
    xjdl: [],//流水分红界面所有下级代理数据
    xjdlmx: [],//下级代理注册时间等信息  。。。
    xjdlmxs: [],//下级代理注册时间等信息  。。。

    xjfhsd_id: null,//下级分红设定 id
    demand_tag: 1,
    demand_type: 0, //统计类型 1 流水 2 亏损
    first_date: null,//流水起始查询时间
    end_date: null,//流水终止查询时间
    data2: [],
    data3: [],
    xjksdl: [],//流水分红界面所有下级代理数据
    keys2: [],//排好顺序的 亏损分红key值

    yf_demand_tag: 0, //一键发放所需要的傻参数
    yf_demand_type: 0, //一键发放所需要的傻参数
    page: 1,//页码

    page9_wjmx: [],//玩家所需数据
    page9_ids: [],//请求所需ids
    page9_plaumont: 190,//记录自己比例
    page9_aumont: 90,//记录下级比例
    p9_qp_aumont: 0,//棋牌
    p9_dz_aumont: 0,//电子
    p9_yjcx_gr: 0,//佣金明细个人
    p9_yjcx_td: 0,//佣金 团队
    p9_dlsj: {},//查询后的单列数据


    page9_gz_plaumont: 80,//记录对比用浮动值

    data10: [],
    wxd: [],//页面10无限带数据
    page10Data: null,//页面10数据

    game_tag: [],//只用于记录 流水分红的gametag区分菜  s单栏
    ttpnum: 0,//p10 当页标记
    ttpnums: 0,//p10 合计标记

    p6_fx_percent: 0,//富鑫用数据
    zsxjwjzs: 0,//直属下级玩家总数


    p10_data: [],//p10电子数据

    p1_seven_info: {},//p1七天数据
    base_dividend_discount: 1,//不同品牌折扣比例
    base_dividend_control: 0,//点控
    base_dividend_n: 0,//税收比例


    p10_dates: 0,//p10 zsmx存日期
    p10_ids: [],//p10 zsmx 存ids
    p10_page: 1,//p10 zsmx存页码
    p10_num: 0,
    p9_jd_xjgz: 0,//聚鼎专用下级规则

    hx_p6_gz: null,//华兴专用p6规则
    hs_p4_gz: null,//皇室专用p4规则


    p12_data: [],//p12页面数据
    p12_view_data: [],//p12页面数据

    loadview: null,//加载界面


    n2_jrygj_qp: 0,//92 今日预估金 qp p1
    n2_jrygj_dz: 0,//92 今日预估金 dz p1

    n2_zsyj_qp: 0,//92 直属佣金qp p1
    n2_zsyj_dz: 0,//92 直属佣金dz p1
    n2_tdyj_qp: 0,//92 团队佣金qp p1
    n2_tdyj_dz: 0,//92 团队佣金dz p1

    n2_zrzyj_qp: 0,//92 昨日总佣金 qp p1
    n2_zrzyj_dz: 0,//92 昨日总佣金 dz p1


    n2_bzzyj_qp: 0,//92 本周总佣金qp p1
    n2_bzzyj_dz: 0,//92 本周总佣金dz p1

    n2_zyj_qp: 0,//92 总业绩qp p10
    n2_zyj_dz: 0,//92 总业绩dz p10

    n2_zsyj_qp10: 0,//92 直属业绩qp p10
    n2_zsyj_dz10: 0,//92 直属业绩dz p10

    n2_tdyj_qp10: 0,//92 团队业绩qp p10
    n2_tdyj_dz10: 0,//92 团队业绩dz p10

    n2_fy_qp: 0,//92 返佣qp p10
    n2_fy_dz: 0,//92 返佣dz p10

    n2_date_p9: 0,//92 p9 日期标志 （0 -1 week  lastweek month）
    page9_n2dz_aumont: 0,//92 p9 保底设置 电子 下级比例
    page9_n2qp_aumont: 0,//92 p9 保得设置 棋牌 下级比例

    p9_n2_xjgz: '-',//92 规则设置成功后返回

    p14_n2_gfdj_t: 0,//92 14 股份单价 本周
    p14_n2_gfdj_l: 0,//92 14 股份单价 上周

    p14_n2_yxyj_t: 0,//92 14 有效业绩 本周
    p14_n2_yxyj_l: 0,//92 14 有效业绩 上周

    p14_n2_gffe_t: 0,//92 14 股份份额 本周
    p14_n2_gffe_l: 0,//92 14 股份份额 上周

    p14_n2_gfsy_t: 0,//92 14 股份收益 本周
    p14_n2_gfsy_l: 0,//92 14 股份收益 上周

    p14_n2_gffh_t: 0,//92 14 股份分红 本周
    p14_n2_gffh_l: 0,//92 14 股份分红 上周

    p14_n2_zyj_qp_t: 0,//92 总业绩qp p14 本周
    p14_n2_zyj_dz_t: 0,//92 总业绩dz p14 本周

    p14_n2_zyj_qp_l: 0,//92 总业绩qp p14 上周
    p14_n2_zyj_dz_l: 0,//92 总业绩dz p14 上周



    p14_n2_gf_t: 0,//92 股份所有数据 本周 下级详情界面所有数据
    p14_n2_gf_l: 0,//92 股份所有数据 p14 上周  下级详情界面所有数据

    p14_show_flag: 0,//92 p14是否展示股东分红
    p14_n2_order_l: 0,// 92 上周自己订单号 领取佣金
    p14_n2_status: 0,//92 展示自己领取佣金
    n2_p9_zsxjwjzs: [],//92获取p9 p15 数据





    n2_lqyj_data: [],//92领取佣金记录数据 

    //数组去重
    unique(arr) {
        return Array.from(new Set(arr))

    },
    //排序
    sortbydata(map) {
        let keys = [];
        Object.keys(map).forEach((key) => {
            // cc.log(key, this.StatementDividendInfo[key]);
            keys.push(key);
        });
        keys.sort(function (a, b) {
            return a < b ? 1 : -1;
        });
        return keys
        // cc.log('keysdata',keysdata);
    },
    // 指定排序的比较函数
    compare(property) {
        return function (obj1, obj2) {
            var value1 = obj1[property];
            var value2 = obj2[property];
            return value1 - value2;     // 升序
        }
    },
    formatData1(msg) {

        this.StatementDividendInfo = msg;
        this.xjdl = []
        this.data1 = []
        this.keys1 = this.sortbydata(this.StatementDividendInfo)

        for (let index = 0; index < this.keys1.length; index++) {
            if (this.StatementDividendInfo[this.keys1[index]] == null) {
                cc.log('msg没有数据')
                this.keys1 = []
                this.data1 = []
                this.xjdl = []
                continue;
            } else {
                let akey = this.keys1[index]
                let _dd_ = this.StatementDividendInfo[akey][0]
                this.data1.push(_dd_);
                let _TT_ = this.StatementDividendInfo[akey]
                for (let index = 1; index < _TT_.length; index++) {
                    this.xjdl.push(_TT_[index]);
                }
            }


        }
        // cc.log('formatData1', this.data1);
    },

    formatData2(msg) {
        //this.page5Data = testData
        //正常模式
        this.data2 = []
        this.xjksdl = []
        this.page5Data = msg;
        Object.keys(this.page5Data).forEach((key) => {
            if (this.page5Data[key] == null) {
                this.data2 = []
                this.xjksdl = []
            } else {
                this.data2 = this.page5Data[key]
                for (let index = 1; index < this.page5Data[key].length; index++) {
                    this.xjksdl.push(this.page5Data[key][index]);
                }
                //  cc.log('data2========', this.data2);
            }

        });
    },
    formatData3(msg) {
        this.data3 = []
        this.xjksdl = []
        this.page6Data = msg;
        Object.keys(this.page6Data).forEach((key) => {
            if (this.page6Data[key] == null) {
                this.data3 = []
                this.xjksdl = []
            } else {
                this.data3 = this.page6Data[key]
                for (let index = 1; index < this.page6Data[key].length; index++) {
                    this.xjksdl.push(this.page6Data[key][index]);
                }
                //  cc.log('data2========', this.data2);
            }

        });
    },
    formatData10(msg) {

        this.StatementDividendInfo = msg;
        this.wxd = []
        this.data10 = []
        this.keys10 = this.sortbydata(this.StatementDividendInfo)
        if (msg == null) {
            return
        }
        for (let index = 0; index < this.keys10.length; index++) {
            if (this.StatementDividendInfo[this.keys10[index]] == null) {
                cc.log('msg没有数据')
                this.keys10 = []
                this.data10 = []
                this.wxd = []
                continue;
            } else {
                let akey = this.keys10[index]
                let _dd_ = this.StatementDividendInfo[akey][0]
                this.data10.push(_dd_);
                let _TT_ = this.StatementDividendInfo[akey]
                for (let index = 1; index < _TT_.length; index++) {
                    this.wxd.push(_TT_[index]);
                }
            }


        }
    },
    getData1() {
        return this.data1;
    },
    getxjdl() {
        return this.xjdl;
    },
    getData10() {
        return this.data10;
    },

    getAllData1() {
        return this.StatementDividendInfo;
    },

    getAllData2() {
        return this.page5Data;
    },
    //查询流水分红下级 明细 按日期
    searchByIdAndDate(date, id) {
        let data = this.StatementDividendInfo[date]
        cc.log('data', data);
        let arr = []
        for (let index = 0; index < data.length; index++) {
            if (id == data[index].id) {
                arr.push(data[index])
            }
        }
        return arr;
    },
    //查询流水分红下级 明细
    searchById(id) {

        let arr = []
        for (let index = 0; index < this.xjdl.length; index++) {
            if (id == this.xjdl[index].id) {
                arr.push(this.xjdl[index])
            }
        }
        return arr;
    },
    searchByIds(id) {//查询流水分红下级 明细
        let arr = []
        for (let index = 0; index < this.xjdlmx.length; index++) {
            if (id == this.xjdlmx[index].id) {
                arr.push(this.xjdlmx[index])
            }
        }
        return arr;
    },
    //查询亏损分红下级 明细
    searchLossById(id) {

        let arr = []
        for (let index = 0; index < this.xjksdl.length; index++) {
            if (id == this.xjksdl[index].id) {
                arr.push(this.xjksdl[index])
            }
        }
        return arr;
    },
    getData2() {
        return this.data2;
    },
    getData3() {
        return this.data3;
    },
    //查询亏损分红下级 明细
    searchksById(id) {
        let arr = []
        for (let index = 0; index < this.data2.length; index++) {
            if (id == this.data2[index].id) {
                arr.push(this.data2[index])
            }
        }
        return arr;
    },
    //p6查询亏损分红下级 明细
    searchksByIdp6(id) {
        let arr = []
        for (let index = 0; index < this.data3.length; index++) {
            if (id == this.data3[index].id) {
                arr.push(this.data3[index])
            }
        }
        return arr;
    },

    /**
       * 金币数值若小数点后为0,则不显示小数点 规则：请以后台所显示的金额小数点后第7位四舍五入到第6位，然后截取小数点后二位
       * @param coins 用户金币
       */
    countCoinsShowLabel(coins) {

        let coinsStr = Math.floor((parseFloat(coins) * 100).toFixed(10)) / 100;
        return coinsStr + '';
    },
    /**
    * 金币数值若小数点后为0,则不显示小数点 规则：请以后台所显示的金额小数点后第7位四舍五入到第6位，然后截取小数点后二位
    * @param coins 用户金币
    */
    countCoinsShowLabelss(coins) {
        //let coinsStr = coins.toFixed(6);改为直接截取后两位
        let coinsStr = coins + '';

        if (coinsStr.indexOf('.') > -1) {
            let coinsArr = coinsStr.split('.');
            let decimalStr = coinsArr[1];
            if (Number(decimalStr) == 0) {
                coinsStr = coinsArr[0];

            }
        }
        // if (Number(coinsStr) <= 0) {
        //     coinsStr = '0';
        // } else {
        //正则 公式      /([0-9]+.[0-9]{2})[0-9]*/;
        let re_fixed = /([0-9]+.[0-9]{2})[0-9]*/
        coinsStr = coinsStr.replace(re_fixed, "$1")
        // if (Number(coinsStr) <= 0) {
        //     coinsStr = '0';
        // }
        // }
        if (coinsStr + '' == '-0') {
            coinsStr = "0.00"
        }
        if (coinsStr + '' == '0') {
            coinsStr = "0.00"
        }
        if (coinsStr.indexOf('.') == -1) {
            coinsStr = coinsStr + ".00"
        }


        return coinsStr;
    },
    /**
      * 金币数值若小数点后为0,则不显示小数点 规则：请以后台所显示的金额小数点后第7位四舍五入到第6位，然后截取小数点后四位
      * @param coins 用户金币
      */
    countCoinsShowLabels(coins) {

        let coinsStr = Math.floor(parseFloat(coins) * 100) / 100;
        return coinsStr + '';
    },
    //时间戳得到时间
    add0(m) { return m < 10 ? '0' + m : m },
    format(shijianchuo) {
        //shijianchuo是整数，否则要parseInt转换
        var time = new Date(shijianchuo);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();

        return y + '-' + this.add0(m) + '-' + this.add0(d)
    },
    //提示文字
    Switchtext(text) {
        let txt;
        switch (text) {
            case "child amount already exists":
                txt = '设置周期量已经存在'
                break;
            case "child percent is too big":
                txt = '分红比例设置百分比太大'
                break;
            case "proxy amount already exists":
                txt = '上级周期量已存在'
                break;
            case "proxy percent is too big":
                txt = '超过上级分红比例设置'
                break;
            case "percent must be great than original":
                txt = '分红比例必须大于原始值'
                break;
            case "amount must great than 0":
                txt = '周期量必须大于零'
                break;
            case "amount must be less than original":
                txt = '周期量必须小于原始周期量'
                break;
            case "last date is too big":
                txt = '查询日期超过当前日期'
                break;
            case "proxy user balance is not enough":
                txt = ' 佣金账号余额不足'
                break;
            case "last date is too small":
                txt = ' 结束时间小于开始时间'
                break;
            case "game user balance is not enough":
                txt = ' 游戏账户金额不足'
                break;
            case "proxy amount is too small":
                txt = '周期量设置太小'
                break;
            case "round id is empty":
                txt = '请选择需要发放的分红信息'
                break;
            case "can not less than origin income":
                txt = '不能低于原收益'
                break;
            case "can not greater than proxy user income":
                txt = '不能大于代理用户收益'
                break;
            case "proxy user base dividend rule is not exists":
                txt = '规则不存在'
                break;
            case "round id is empty":
                txt = '请选择需要发放的分红信息'
                break;
            case "to proxy must be directly":
                txt = '非直属下级'
                break;
            case "account name and id is the same":
                txt = '不能和自己转账'
                break;
            case "proxy user balance is not enough":
                txt = '代理账号余额不足'
                break;
            default:
                txt = '设置失败'
                break;
        }
        return txt;
    },
    //提示文字
    Switchtext2(text) {
        let txt;
        switch (text) {


            case "to proxy must be directly":
                txt = '非直属下级'
                break;
            case "account name and id is the same":
                txt = '不能和自己转账'
                break;
            case "proxy user balance is not enough":
                txt = '代理账号余额不足'
                break;
            default:
                txt = '交易失败'
                break;
        }
        return txt;
    },
    /** 获取某个月的总天数 */
    getDaysOfMonth(year, month) {
        var date = new Date(year, month, 0);
        var days = date.getDate();
        return days;
    },
    //前端要做的事情之默认当前时间计算2天前
    Sb_DATA(a) {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let first_day = '';
        let first_month = '';
        let first_year = '';


        //同月份 同年分
        if (parseInt(day) - a >= 1) {
            console.log('不同日');
            first_day = parseInt(day) - a;
            first_month = parseInt(month);
            first_year = parseInt(year);
        }
        //同年不同月
        if (parseInt(day) - a < 1 && parseInt(month) - 1 >= 1) {
            let last_days = this.getDaysOfMonth(year, month - 1)
            first_day = last_days + parseInt(day) - a;
            first_month = parseInt(month) - 1;
            first_year = parseInt(year);

        }
        //不同年 
        if (parseInt(day) - a < 1 && parseInt(month) - 1 == 0) {
            console.log('不同年');
            let last_days = this.getDaysOfMonth(year - 1, 12)
            first_day = last_days + parseInt(day) - a;
            first_month = 12;
            first_year = parseInt(year) - 1;
        }
        if (first_day < 10) {
            first_day = '0' + first_day
        }
        if (first_month < 10) {
            first_month = '0' + first_month;
        }
        let page10_first_date = first_year + '-' + first_month + '-' + first_day;
        return page10_first_date


    },
    //获取23:59点秒级时间戳
    getUnixtimestamp(time) {
        var strtime = time + ' 23:59:59';
        var date = new Date(strtime); //传入一个时间格式，如果不传入就是获取现在的时间了，这样做不兼容火狐。
        // 可以这样做
        var date = new Date(strtime.replace(/-/g, '/'));

        // 有三种方式获取，在后面会讲到三种方式的区别

        let time3 = Date.parse(date) / 1000;
        return time3

    },
    //获取 00:00点秒级时间戳
    getUnixtimestamp0(time) {
        var strtime = time + ' 00:00';
        var date = new Date(strtime); //传入一个时间格式，如果不传入就是获取现在的时间了，这样做不兼容火狐。
        // 可以这样做
        var date = new Date(strtime.replace(/-/g, '/'));

        // 有三种方式获取，在后面会讲到三种方式的区别

        let time3 = Date.parse(date) / 1000;
        return time3

    },
    hall_sound: true,
    //点击音效
    clickSound(bol) {
        if (bol) {
            if (gHandler.app.pinpai == 'chaofan'){
                // proxy_chaofan.load("img/sicbo_click1", cc.AudioClip, (err, audioClip) => {
                //     if (err) {
                //         cc.log("资源加载失败！");
                //         return;
                //     }

                //     cc.audioEngine.playEffect(audioClip, false);
                // })
            }
                
        }
    },
    //获取当天日期
    getNowFormatDate(n) {
        var date = new Date();
        if (n == 'month') {
            date.setTime(date.getTime() + 0 * 24 * 60 * 60 * 1000);
        } else {
            date.setTime(date.getTime() + n * 24 * 60 * 60 * 1000);
        }
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        if (n == 'month') { //month直接给本月1号
            strDate = "01"
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate
        return currentdate;
    },
    //获取本周一日期
    getThisweekDate() {
        var date = new Date();
        //本周一的日期
        let a = date.getDay()

        if (a == 0) {
            console.log(date.getDate());
            date.setDate(date.getDate() - 7 + 1);
        } else {
            date.setDate(date.getDate() - date.getDay() + 1);
        }
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var thisweek = year + seperator1 + month + seperator1 + strDate
        return thisweek
    },
    //获取上周一日期
    getlastweekDate() {
        var date = new Date();
        //本周一的日期

        let a = date.getDay()
        if (a == 0) {
            console.log(date.getDate());
            date.setDate(date.getDate() - 14 + 1);
        } else {
            date.setDate(date.getDate() - 7 - date.getDay() + 1);
        }
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var thisweek = year + seperator1 + month + seperator1 + strDate
        return thisweek
    },
    //获取上周日
    getlastweekDate7() {
        var date = new Date();
        //本周一的日期
        let a = date.getDay()
        if (a == 0) {
            console.log(date.getDate());
            date.setDate(date.getDate() - 14 + 1 + 6);
        } else {
            date.setDate(date.getDate() - 7 - date.getDay() + 1 + 6);
        }

        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var lastweek = year + seperator1 + month + seperator1 + strDate
        console.log(lastweek);
        return lastweek
    },
    //时间戳转时间
    getUxToTime(num) {
        // 比如需要这样的格式 yyyy-MM-dd 
        num = num * 1000
        var date = new Date(num);
        let Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() + ' ';
        if (M >= 1 && month <= 9) {
            M = "0" + M;
        }
        if (D >= 0 && D <= 9) {
            D = "0" + D;
        }
        var time = Y + M + D
        return time

    },
    //时间戳转时间
    getUxToTimes(num) {
        // 比如需要这样的格式 yyyy-MM-dd hh:mm
        num = num * 1000
        let date = new Date(num);
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() ;
        let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        var time = Y + M + D + '  ' + h  + ':'+ m;
        return time

    }

};
module.exports = Database;
