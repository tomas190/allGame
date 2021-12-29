var Database = require("../public_script/Database");
var gHandler = require("gHandler");
var commonVal = require("../public_script/proxy-http");
cc.Class({
    extends: cc.Component,

    properties: {
        frame: {
            default: null,
            type: cc.Node,
        },
        content: {
            default: null,
            type: cc.Node,
        },
        amount: { //设置金钱
            default: null,
            type: cc.Label,
        },
        edit1: {
            default: null,
            type: cc.Node,
        },
        edit2: {
            default: null,
            type: cc.Node,
        },
        percent: { // 设定比例
            default: null,
            type: cc.Label,
        },
        XJID: { // 下级id
            default: null,
            type: cc.Label,
        },
        Rule: { // 规则
            default: null,
            type: cc.Label,
        },

        infolabel: { //当前游戏范围或 全部游戏范围
            default: null,
            type: cc.Label,
        },
        infolabels: { //当前游戏范围或 全部游戏范围
            default: null,
            type: cc.Label,
        },
        chnNumChar: [],
        chnUnitSection: [],
        chnUnitChar: [],
        gz_length: 1,// 用户所有规则长度
        now_id: null,//当前下级用户id
        demand_type: 2,//当前统计规则
    },

    onLoad() {

        //正式用这个
        // this.getDividendRule(gHandler.account_name) 


    },
    getDividendRule(poxy_id) {
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        // PARAMS { 
        //     account_name 用户ID         
        //     token 密匙         
        //     id 用户ID - 
        //     type 分红类型(1.流失 2.亏损) 可选 
        //     - game_tag 游戏分类 可选
        //  }
        xhr_test.open("GET", host + `/proxy/user/getDividendRule?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&id=${poxy_id}&game_tag=0&type=3`, true);
        xhr_test.send();


        // xhr_test.open("GET", host + `/proxy/user/getDividendRule?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&id=${id}&game_tag==${game_tag}`, true);
        // xhr_test.send();
        xhr_test.onreadystatechange = () => {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("亏损分红2类 getDividendRule返回", resData.msg);
                //得到数据渲染
                let data = resData.msg;
                this.setdata(data)
                // "msg": [{ "_id": "5f446f609feced528ffffcb2", "id": 426163657, "proxy_user_id": 319010216, "type": 1, "game_tag": 1, "demand_type": 1, "demand_tag": 1, "amount": 30000, "percent": 30 }, { "_id": "5f4470259feced528ffffcb3", "id": 426163657, "proxy_user_id": 319010216, "type": 1, "game_tag": 1, "demand_type": 1, "demand_tag": 1, "amount": 60000, "percent": 80 }, { "_id": "5f4470519feced528ffffcb4", "id": 426163657, "proxy_user_id": 319010216, "type": 1, "game_tag": 1, "demand_type": 1, "demand_tag": 1, "amount": 100000, "percent": 90 }] 

            }
            xhr_test.abort();
        };
    },
    SectionToChinese(section) {
        var strIns = '', chnStr = '';
        var unitPos = 0;
        var zero = true;
        while (section > 0) {
            var v = section % 10;
            if (v === 0) {
                if (!zero) {
                    zero = true;
                    chnStr = this.chnNumChar[v] + chnStr;
                }
            } else {
                zero = false;
                strIns = this.chnNumChar[v];
                strIns += this.chnUnitChar[unitPos];
                chnStr = strIns + chnStr;
            }
            unitPos++;
            section = Math.floor(section / 10);
        }
        return chnStr;
    },
    NumberToChinese(num) {
        cc.log('mun', num);
        var unitPos = 0;
        var strIns = '', chnStr = '';
        var needZero = false;

        if (num == 0) {
            return this.chnNumChar[0];
        }

        while (num > 0) {
            var section = num % 10000;
            if (needZero) {
                chnStr = this.chnNumChar[0] + chnStr;
            }
            strIns = this.SectionToChinese(section);
            strIns += (section !== 0) ? this.chnUnitSection[unitPos] : this.chnUnitSection[0];
            chnStr = strIns + chnStr;
            needZero = (section < 1000) && (section > 0);
            num = Math.floor(num / 10000);
            unitPos++;
        }

        return chnStr;
    },
    setdata(data) {
        this.content.removeAllChildren();
        this.amount.string = ''
        this.percent.string = ''

        this.chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
        this.chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
        this.chnUnitChar = ["", "十", "百", "千"];

        let gznew = this.NumberToChinese(this.gz_length)
        this.Rule.string = '规则' + gznew //规则显示
        this.XJID.string = this.now_id + ''

        let obj = data;


        if (obj != [] && obj != null) {
            obj = obj.sort(Database.compare("amount"))
            let tags_allrule = []
            cc.log('统计类型', commonVal.demand_type, '游戏分类', commonVal.gametags);
            for (let index = 0; index < obj.length; index++) {
                if (obj[index].type == 3) {
                    tags_allrule.push(obj[index])
                }

            }
            cc.log('tags_allrule', tags_allrule);
            tags_allrule = tags_allrule.sort(Database.compare("amount"))
            for (let i = 0; i < tags_allrule.length; i++) {

                let item = cc.instantiate(this.frame);
                item.active = true;
                let NUM = i + 1
                let st = this.NumberToChinese(NUM)
                let content = '亏损'

                this.demand_type = 2

                this.infolabels.string = content;
                item.getComponent(cc.Label).string = "规则" + st + "：周期量(半月量)大于等于" + tags_allrule[i].amount + "元，分红比例 " + tags_allrule[i].percent + " %"
                this.content.addChild(item);
                Database.demand_tag = tags_allrule[i].demand_tag//1流水规则 2 亏损规则
                if (tags_allrule[i].demand_tag == 1) {
                    this.infolabel.string = "当前游戏类型"

                } else {
                    this.infolabel.string = "全部游戏类型"
                }

            }

        }


        this.node.active = true;
    },
    savedata(a, b) {//储存下级 id 和 下级规则长度
        this.now_id = a;//当前下级用户id
        this.gz_length = b;// 用户所有规则长度
    },
    close() {
        //音效
        Database.clickSound(Database.hall_sound)
        this.content.removeAllChildren();
        this.node.active = false;
        let xjfhsd_pop = this.node.parent.getChildByName('xjfhblsd_pop')
        xjfhsd_pop.active = true;
    },
    confirm() {
        //判断金额是整数
        function isInteger(obj) {

            return obj % 1 === 0
        }
        //音效
        Database.clickSound(Database.hall_sound)
        //下级id
        let xjid = this.now_id
        //游戏分类
        let game_tag = commonVal.gametags
        //统计类型方式
        let demand_tag = Database.demand_tag
        //统计金额要求
        let amounts = this.amount.string
        //分红比例
        let percents = this.percent.string
        if (parseFloat(percents) <= 0) {
            console.log('超出区间设置失败0');
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '设置失败')
            return
        }
        //点控 点位控制
        if (gHandler.app.pinpai == 'fuxin' || gHandler.app.pinpai == 'huaxing' || gHandler.app.pinpai == 'huangshi' || gHandler.app.pinpai == 'tianqi') {
            //此处限制只能输入0    || gHandler.app.pinpai == 'huangshi'
            if (gHandler.app.pinpai == 'fuxin') {
                amounts = 0;
            }

            if (gHandler.app.pinpai == 'huaxing' || gHandler.app.pinpai == 'huangshi' || gHandler.app.pinpai == 'tianqi') {
                Database.p6_fx_percent = Database.hx_p6_gz
            }
            if (parseFloat(Database.p6_fx_percent) - parseFloat(percents) < 5) {
                console.log('超出区间设置失败');
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '设置失败')
                return

            }
            if (isInteger(percents)) {
                this.createDividendRule(xjid, game_tag, demand_tag, amounts, percents)
            }else{
                console.log('请设置整数');
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '请设置整数')
                return
            }




        } else {
            if (isInteger(percents)) {
                this.createDividendRule(xjid, game_tag, demand_tag, amounts, percents)
            }else{
                console.log('请设置整数');
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '请设置整数')
                return
            }
           
        }



    },
    /**
     * 
     * @param {*} child_id 下级ID
     * @param {*} game_tag 游戏分类
     * @param {*} demand_tag 统计类型方式
     * @param {*} amount 统计金额要求
     * @param {*} percent 分红比例
     */
    createDividendRule(child_id, game_tag, demand_tag, amount, percent) {
        //         URL http://161.117.178.174:12350/proxy/user/createDividendRule
        //         METHOD POST
        //         CONTEXT - TYPE application / x - www - form - urlencoded
        //         PARAMS {
        //             account_name 用户ID
        //             token 密匙
        //             child_id 下级ID
        //             type 分红类型(1.流失 2.亏损)
        //             game_tag 游戏分类
        //             demand_type 统计类型(1.流失 2.亏损)
        //             demand_tag 统计类型方式(1.当前游戏分类 2.所有游戏分类)
        //             amount 统计金额要求
        //             percent 分红比例
        //          }
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("POST", host + "/proxy/user/createDividendRule", true);
        xhr_test.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        //正常用
        var sendData = `account_name=${gHandler.gameGlobal.player.account_name
            }&token=${commonVal.token}&child_id=${child_id}&type=3&game_tag=0&demand_type=3&demand_tag=${demand_tag}&amount=${amount}&percent=${percent}`;

        cc.log("/proxy/user/createDividendRule请求:", sendData);

        xhr_test.send(sendData);
        this.amount.string = ''
        this.percent.string = ''
        this.edit1.getComponent(cc.EditBox).string = ''
        this.edit2.getComponent(cc.EditBox).string = ''

        xhr_test.onreadystatechange = () => {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("/proxy/user/createDividendRule返回", resData);
                if (resData.code == 404) {
                    let txt = Database.Switchtext(resData.msg)
                    cc.log(txt);
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, txt)
                }
                if (resData.code == 200) {
                    cc.log('规则+1');
                    //规则+1
                    let newgznew = this.NumberToChinese(this.gz_length + 1)
                    this.Rule.string = '规则' + newgznew //规则显示
                    //更新下级规则界面
                    let xjfhsd_pop = this.node.parent.getChildByName('xjfhblsd_pop')
                    // 正常用这个
                    xjfhsd_pop.getComponent("ksxjfhsd_pop_p6").getDividendRule(child_id)
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '规则设定成功')
                    this.node.active = false;
                }


            }
            xhr_test.abort();
        };
    },
    start() {
    },
});
