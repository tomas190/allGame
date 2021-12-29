var Database = require("../public_script/Database");
let gHandler = require("gHandler");
// let toFloat = require("./proxy-changeFloat");
let commonVal = require("../public_script/proxy-http");
cc.Class({
    extends: cc.Component,

    properties: {
        frame: {
            default: null,
            type: cc.Node,
        },
        game_tag: {
            default: null,
            type: cc.Label,
        },
        content: {
            default: null,
            type: cc.Node,
        },
        amount: {
            default: null,
            type: cc.Label,
        },
        percent: {
            default: null,
            type: cc.Label,
        },
        new_gz: {
            default: null,
            type: cc.Node,
        },
        tittle: {
            default: null,
            type: cc.Label,
        },
        chnNumChar: [],
        chnUnitSection: [],
        chnUnitChar: [],
        data: null,
        now_id: null,//当前下级用户id
        gz_length: 1,//用户所有规则长度

    },



    onLoad() {


    }
    ,
    getmyDividendRule(poxy_id) {
        cc.log('自己的规则1')
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        // PARAMS { 
        //     account_name 用户ID         
        //     token 密匙         
        //     id 用户ID - 
        //     type 分红类型(1.流失 2.亏损) 可选 
        //     - game_tag 游戏分类 可选
        //  }
        xhr_test.open("GET", host + `/proxy/user/getDividendRule?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&id=${poxy_id}&game_tag=${commonVal.gametags}&type=1`, true);

        xhr_test.send();
        xhr_test.onreadystatechange = () => {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log('自己的规则2', resData.msg);
                //得到数据渲染
                let data = resData.msg;
                this.setmydata(data)
            }
            xhr_test.abort();
        };
    },
    setmydata(obj) {

        if (obj != null) {
            for (let i = 0; i < obj.length; i++) {

                if (obj[i].game_tag == commonVal.gametags && obj[i].type == 1) {
                    let content = ''
                    if (obj[i].demand_type == 1) {
                        content = '流水'
                    }
                    if (obj[i].demand_type == 2) {
                        content = '亏损'
                    }
                    let tag = ''
                    if (obj[i].demand_tag == 1) {
                        tag = '当前游戏类型'
                    }
                    if (obj[i].demand_tag == 2) {
                        tag = '所有游戏类型'
                    }
                    this.tittle.string = '统计方式: ' + content + ', 统计范围: ' + tag + ". ";
                }

            }
        }

        this.node.active = true;

    },
    //得到规则并渲染
    getDividendRule(poxy_id) {
        this.now_id = poxy_id;//得到传来的下级用户id
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        // PARAMS { 
        //     account_name 用户ID         
        //     token 密匙         
        //     id 用户ID - 
        //     type 分红类型(1.流失 2.亏损) 可选 
        //     - game_tag 游戏分类 可选
        //  }
        xhr_test.open("GET", host + `/proxy/user/getDividendRule?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&id=${poxy_id}&game_tag=${commonVal.gametags}&type=1`, true);
        xhr_test.send();

        // xhr_test.open("GET", host + `/proxy/user/getDividendRule?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&id=${id}&game_tag==${game_tag}`, true);
        // xhr_test.send();
        xhr_test.onreadystatechange = () => {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                //cc.log("/proxy/user/getDividendRule返回", resData);
                //得到数据渲染
                let data = resData.msg;
                cc.log('流水 sort ===', data);
                this.getmyDividendRule(gHandler.gameGlobal.player.account_name)
                this.setdata(data)


            }
            // xhr_test.abort(); 
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

    setdata(obj) {
        this.content.removeAllChildren() //设置前先清空
        //正常用
        this.data = obj

        //正常可以

        this.chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
        this.chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
        this.chnUnitChar = ["", "十", "百", "千"];
        if (this.data == null) {
            this.gz_length = 1;
        } else {
            this.gz_length = this.data.length + 1;
        }


        switch (commonVal.gametags) {
            case 1:
                this.game_tag.string = '棋牌类游戏'
                break;
            case 2:
                this.game_tag.string = '彩票类游戏'
                break;
            case 3:
                this.game_tag.string = '体育类游戏'
                break;
            case 4:
                this.game_tag.string = '视讯类游戏'
                break;
            default:
                break;
        }


        this.content.removeAllChildren();
        if (this.data != [] && this.data != null) {
            this.data = this.data.sort(Database.compare("amount"))
            for (let index = 0; index < this.data.length; index++) {

                let item = cc.instantiate(this.frame);
                item.active = true;
                let NUM = index + 1
                let st = this.NumberToChinese(NUM)
                let content = ''
                if (this.data[index].demand_type == 1) {
                    content = '流水'
                }
                if (this.data[index].demand_type == 2) {
                    content = '亏损'
                }
                let tag = ''
                if (this.data[index].demand_tag == 1) {
                    tag = '当前游戏类型'
                }
                if (this.data[index].demand_tag == 2) {
                    tag = '所有游戏类型'
                }
                this.tittle.string = '统计方式: ' + content + ', 统计范围: ' + tag + ". ";
                if (gHandler.app.pinpai != 'ninetwo') {
                    item.getComponent(cc.Label).string = "规则" + st + "：周期量(日量)大于等于";
                } else {
                    item.getComponent(cc.Label).string = "规则" + st + "：";
                }

                item.getComponent('wdksfh_label').setstring(this.data[index].amount, this.data[index].percent)
                // //显示对应的钱
                let EditBox_money = item.getChildByName("EditBox_money").getComponent(cc.EditBox)
                // //显示对应的比例
                let EditBox_proportion = item.getChildByName('EditBox_proportion').getComponent(cc.EditBox)
                //修改规则按钮
                let btn = item.getChildByName('agent_pop_btn_edit')
                EditBox_money.string = this.data[index].amount //规则对应的钱
                let dwb = Math.floor(this.data[index].percent * 0.05 * 0.5 * 100 * 100) / 100;
                EditBox_proportion.string = dwb //规则对应的比例
                btn.on("touchend", (eve) => { //绑定函数
                    //音效
                    Database.clickSound(Database.hall_sound)
                    let amountsedit = eve.target.parent
                    //比例设定界面
                    let amounts = amountsedit.getChildByName("EditBox_money").getChildByName("TEXT_LABEL").getComponent(cc.Label).string //输入值money
                    let percents = amountsedit.getChildByName("EditBox_proportion").getChildByName("TEXT_LABEL").getComponent(cc.Label).string //输入值 percent
                    //重置
                    amountsedit.getChildByName("EditBox_money").getChildByName("TEXT_LABEL").getComponent(cc.Label).string = ''
                    amountsedit.getChildByName("EditBox_proportion").getChildByName("TEXT_LABEL").getComponent(cc.Label).string = ''
                    cc.log('p4 amounts===', amounts);
                    // 点控 点位控制
                    function isInteger(obj) {
                        return obj % 1 === 0
                    }
                    if (parseFloat(percents) <= 0) {
                        console.log('超出区间设置失败 点控 0');
                        gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '设置失败')
                        return
                    }
                    if (gHandler.app.pinpai == 'huangshi') {
                        if (parseFloat(Database.hs_p4_gz) - parseFloat(percents) < 10) {
                            //  恢复原始正常值
                            let EdBox_money = cc.find('EditBox_money', amountsedit).getComponent(cc.EditBox)
                            let EdBox_proportion = cc.find('EditBox_proportion', amountsedit).getComponent(cc.EditBox)

                            EdBox_money.string = this.data[index].amount
                            EdBox_proportion.string = Math.floor(this.data[index].percent * 0.05 * 0.5 * 100 * 100) / 100;

                            console.log('超出区间 修改失败 10', '原始 amount==', this.data[index].amount, '原始 amount==', Math.floor(this.data[index].percent * 0.05 * 0.5 * 100 * 100) / 100);


                            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '超出区间,修改失败')

                            return
                        }
                    }
                    if (gHandler.app.pinpai == 'tianqi') {
                        if (parseFloat(Database.hs_p4_gz) - parseFloat(percents) < 5) {
                            //  恢复原始正常值
                            let EdBox_money = cc.find('EditBox_money', amountsedit).getComponent(cc.EditBox)
                            let EdBox_proportion = cc.find('EditBox_proportion', amountsedit).getComponent(cc.EditBox)

                            EdBox_money.string = this.data[index].amount
                            EdBox_proportion.string = Math.floor(this.data[index].percent * 0.05 * 0.5 * 100 * 100) / 100;

                            console.log('超出区间 修改失败 5', '原始 amount==', this.data[index].amount, '原始 amount==', Math.floor(this.data[index].percent * 0.05 * 0.5 * 100 * 100) / 100);


                            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '超出区间,修改失败')

                            return
                        }
                    }


                    if (isInteger(percents)) {
                        let percentss = percents / 0.05 / 0.5 / 100
                        this.setDividendRule(this.data[index].id, this.data[index]._id, amounts, percentss, amountsedit, index)
                    } else {
                        //  恢复原始正常值
                        let EdBox_money = cc.find('EditBox_money', amountsedit).getComponent(cc.EditBox)
                        let EdBox_proportion = cc.find('EditBox_proportion', amountsedit).getComponent(cc.EditBox)

                        EdBox_money.string = this.data[index].amount
                        EdBox_proportion.string = Math.floor(this.data[index].percent * 0.05 * 0.5 * 100 * 100) / 100;

                        console.log('超出区间 修改失败 5', '原始 amount==', this.data[index].amount, '原始 amount==', Math.floor(this.data[index].percent * 0.05 * 0.5 * 100 * 100) / 100);

                        console.log('请输入整数');
                        gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '请输入整数')
                    }


                })
                this.content.addChild(item);

            }
        }

        this.node.active = true;

        this.new_gz.on("touchend", (event) => {
            //音效
            Database.clickSound(Database.hall_sound)
            //比例设定界面
            //let xjfhmx_pop = this.node.getChildByName("xjfhmx_pop");
            let gzsd_pop = this.node.parent.getChildByName('gzsd_pop')
            //    gzsd_pop.active = true;
            // 当前下级用户id,用户所有规则长度 储存gzsd_pop<gzsd_pop >
            //cc.log(gzsd_pop.getComponent("gzsd_script"));
            gzsd_pop.getComponent("gzsd_script").savedata(this.now_id, this.gz_length)

            gzsd_pop.getComponent("gzsd_script").setdata() //设置规则设定中自己的界面
            //  this.node.active = false;
            gzsd_pop.active = true;

        })

    },
    //修改规则id  rule_id 规则ID(规则的_id字段)     amount 统计金额要求    percent   node 节点
    setDividendRule(id, ruleId, amount, percent, node, index) {
        //edbox1 2
        let EdBox_money = cc.find('EditBox_money', node).getComponent(cc.EditBox)
        let EdBox_proportion = cc.find('EditBox_proportion', node).getComponent(cc.EditBox)


        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("POST", host + "/proxy/user/setDividendRule", true);
        xhr_test.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var sendData = `account_name=${gHandler.gameGlobal.player.account_name
            }&token=${commonVal.token}&rule_id=${ruleId}&amount=${amount}&percent=${percent}`;
        // { 
        // account_name 用户ID        
        // token 密匙        
        // rule_id 规则ID(规则的_id字段)        
        // amount 统计金额要求        
        // percent 分红比例 }  

        cc.log("/proxy/user/setDividendRule请求:", host + "/proxy/user/setDividendRule", sendData);
        xhr_test.send(sendData);
        xhr_test.onreadystatechange = () => {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("/proxy/user/setDividendRule返回", resData);
                if (resData.code != 200) {
                    EdBox_money.string = this.data[index].amount
                    EdBox_proportion.string = this.data[index].percent * 0.05 * 0.5 * 100

                    if (resData.code == 404) {
                        let txt = Database.Switchtext(resData.msg)
                        cc.log(txt);
                        gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, txt)
                    }
                } else {

                    this.data[index].amount = resData.msg.amount
                    this.data[index].percent = resData.msg.percent

                    EdBox_money.string = resData.msg.amount //规则对应的钱
                    EdBox_proportion.string = resData.msg.percent * 0.05 * 0.5 * 100 //规则对应的比例 
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '修改成功')

                }
            }
            xhr_test.abort();
        };
    },
    close() {
        //音效
        Database.clickSound(Database.hall_sound)
        this.content.removeAllChildren();
        this.node.active = false;
    },

    start() {

    },

    // update (dt) {},
});
