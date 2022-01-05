var Database = require("../public_script/Database");
var gHandler = require("gHandler");
var commonVal = require("../public_script/proxy-http");
cc.Class({
    extends: cc.Component,

    properties: {
        Wddyjm: {//我的待遇pop
            default: null,
            type: cc.Node,
        },
        PlayerId: { //直属玩家ID
            default: null,
            type: cc.Label,
        },
        DyAmount: { //待遇金钱
            default: null,
            type: cc.Label,
        },
        Amount: { //预设金钱
            default: null,
            type: cc.Label,
        },
        CofAmount: { //实际输入金钱
            default: null,
            type: cc.Label,
        },
        as: true,
        id: 0,//传过来的下级id
        nums: 0,//传过来的下级渠道 gametag

    },

    onLoad() {
        this.node.active = false;
        function check() {
            return new Promise((resolve, reject) => {
                commonVal.c_GetBaseDividendRule(resolve)
            })
        }
        check().then(
            (value) => {
                // console.log('展开数据---------',Database.page9_gz_plaumont);
                this.node.active = true;
            })

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
        xhr_test.open("GET", host + `/proxy/user/getDividendRule?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&id=${poxy_id}&game_tag=${commonVal.gametags}&type=1`, true);
        xhr_test.send();

        // xhr_test.open("GET", host + `/proxy/user/getDividendRule?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&id=${id}&game_tag==${game_tag}`, true);
        // xhr_test.send();
        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("/proxy/user/getDividendRule返回", resData);
                //得到数据渲染
                let data = resData.msg;
                this.setdata(data, this.nums)
                // "msg": [{ "_id": "5f446f609feced528ffffcb2", "id": 426163657, "proxy_user_id": 319010216, "type": 1, "game_tag": 1, "demand_type": 1, "demand_tag": 1, "amount": 30000, "percent": 30 }, { "_id": "5f4470259feced528ffffcb3", "id": 426163657, "proxy_user_id": 319010216, "type": 1, "game_tag": 1, "demand_type": 1, "demand_tag": 1, "amount": 60000, "percent": 80 }, { "_id": "5f4470519feced528ffffcb4", "id": 426163657, "proxy_user_id": 319010216, "type": 1, "game_tag": 1, "demand_type": 1, "demand_tag": 1, "amount": 100000, "percent": 90 }] 

            }
            xhr_test.abort();
        };
    },
    //打开自己规则pop
    openself_pop() {
        console.log('this.nums===', this.nums);
        let num = this.nums
        //音效
        Database.clickSound(Database.hall_sound)
        if (this.as) {
            if (gHandler.app.pinpai == 'juding' || gHandler.app.pinpai == 'huaxing' || gHandler.app.pinpai == 'test' || gHandler.app.pinpai == 'tianqi') {
                function check() {
                    return new Promise((resolve, reject) => {
                        commonVal.jd_p9_GetBaseDividendRule(num, resolve)
                    })


                }
                check().then(
                    (value) => {
                        if (num == 1) {
                            this.DyAmount.string = Database.p9_qp_aumont + ''

                        }
                        if (num == 5) {
                            this.DyAmount.string = Database.p9_dz_aumont + ''

                        }
                        this.Wddyjm.active = true;
                        this.as = false;
                    })
            } else {
                function check() {
                    return new Promise((resolve, reject) => {
                        commonVal.GetBaseDividendRule(resolve)
                    })


                }
                check().then(
                    (value) => {
                        this.DyAmount.string = Database.page9_plaumont + ''
                        this.Wddyjm.active = true;
                        this.as = false;
                    })
            }

        } else {
            this.Wddyjm.active = false;
            this.as = true;
        }

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
    setdata(id, num) {
        //this.content.removeAllChildren();
        cc.log('p9_bdsz下级id==', id, num);
        this.id = id;
        this.nums = num
        if (gHandler.app.pinpai != 'juding' && gHandler.app.pinpai != 'huaxing' && gHandler.app.pinpai != 'test' && gHandler.app.pinpai != 'tianqi') {
            console.log('1般渠道' + gHandler.app.pinpai);
            //获取下级规则
            function check() {
                // this.gamerule = 90;

                return new Promise((resolve, reject) => {
                    commonVal.Center_GetBaseDividendRule(id, resolve)
                })


            }
            check().then(
                (value) => {
                    this.Amount.string = Database.page9_aumont + ''
                    this.CofAmount.string = Database.page9_aumont + ''
                    this.PlayerId.string = id + '';
                    this.node.active = true;
                })

        } else {

            //获取下级规则
            function check() {
                // this.gamerule = 90;

                return new Promise((resolve, reject) => {
                    commonVal.JD_Center_GetBaseDividendRule(id, num, resolve)
                })


            }
            check().then(
                (value) => {
                    this.Amount.string = Database.page9_aumont + ''
                    this.CofAmount.string = Database.page9_aumont + ''
                    Database.p9_jd_xjgz = Database.page9_aumont
                    if (num == 1) {
                        console.log('----------');
                        this.node.getChildByName("content").getChildByName('game_name').getComponent(cc.Label).string = '棋牌类型'
                        if (gHandler.app.pinpai == 'huaxing') {
                            this.node.getChildByName("zg").getChildByName('labels').getComponent(cc.Label).string = '*提示：棋牌保底返佣最低金额为160元，并且不能高于自己的规则，保底返佣金额不能小于用户当前保底返佣金额，一旦设置只能上升，不能降低'
                        }
                    }
                    if (num == 5) {
                        console.log('123123123123123');
                        this.node.getChildByName("content").getChildByName('game_name').getComponent(cc.Label).string = '电子类型'
                        if (gHandler.app.pinpai == 'huaxing') {
                            this.node.getChildByName("zg").getChildByName('labels').getComponent(cc.Label).string = '*提示：电子保底返佣最低金额为80元，并且不能高于自己的规则，保底返佣金额不能小于用户当前保底返佣金额，一旦设置只能上升，不能降低'
                        }
                    }

                    this.PlayerId.string = id + '';
                    this.node.active = true;
                })
        }


    },
    savedata(a, b) {//储存下级 id 和 下级规则长度
        this.now_id = a;//当前下级用户id
        this.gz_length = b;// 用户所有规则长度
    },
    close() {
        //音效
        Database.clickSound(Database.hall_sound)
        // this.content.removeAllChildren();
        this.CofAmount.string = ''
        this.Wddyjm.active = false;
        this.node.active = false;
        this.as = true;
    },
    //点位控制 点控
    confirm() {
        //音效
        Database.clickSound(Database.hall_sound)
        let box = cc.find('New EditBox', this.node).getComponent(cc.EditBox)
        // this.node.getChildByName('New_EditBox').getComponent('EditBox')
        console.log('box.string = ', box);
        let mon = this.CofAmount.string;
        if (gHandler.app.pinpai == 'juding' || gHandler.app.pinpai == 'huaxing' || gHandler.app.pinpai == 'test' || gHandler.app.pinpai == 'tianqi') {
            let qp = parseFloat(Database.p9_qp_aumont.split("元", 1)[0])

            let dz = parseFloat(Database.p9_dz_aumont.split("元", 1)[0])
            cc.log('mon==', mon, 'Database.p9_qp_aumont=', qp, 'Database.p9_dz_aumont==', dz)
            if (this.nums == 1) {

                Database.page9_gz_plaumont = qp
            }
            if (this.nums == 5) {
                Database.page9_gz_plaumont = dz

            }
        }

        if (this.CofAmount.string.indexOf(".") > -1) {

            this.CofAmount.string = ''
            box.string = Database.page9_aumont + ''
            this.CofAmount.string = Database.page9_aumont + ''
            this.Amount.string = Database.page9_aumont + ''
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '请输入整数')
        } else {


            let id = this.id;

            cc.log('设置', mon);
            // 91 80   // fx 80     // Xg 80                // Db 80             // Xh 80    // Xl 80    // hs 100
            if (mon == undefined) {
                this.CofAmount.string = ''
                this.CofAmount.string = Database.page9_aumont + ''
                this.Amount.string = Database.page9_aumont + ''
                return
            }
            if (parseInt(mon) <= Database.page9_aumont) {
                this.CofAmount.string = ''
                box.string = Database.page9_aumont + ''
                this.CofAmount.string = Database.page9_aumont + ''
                this.Amount.string = Database.page9_aumont + ''
            }
            if (gHandler.app.pinpai == 'nineone' || gHandler.app.pinpai == 'fuxin' || gHandler.app.pinpai == 'xingui' || gHandler.app.pinpai == 'debi' || gHandler.app.pinpai == 'xinhao' || gHandler.app.pinpai == 'xinlong') {
                //  富鑫点控为 不超过280
                if (parseInt(mon) <= 80) {

                    cc.log('设置失败');
                    this.CofAmount.string = ''
                    this.CofAmount.string = Database.page9_aumont + ''
                    box.string = Database.page9_aumont + ''
                    // this.CofAmount.active =false
                    this.Amount.string = Database.page9_aumont + ''
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '超出设置区间,设置失败')
                    return

                }

            }
            if (gHandler.app.pinpai == 'huangshi') {
                //  富鑫点控为 不超过280
                if (parseInt(mon) < 100) {

                    cc.log('设置失败', mon);
                    this.CofAmount.string = ''

                    box.string = Database.page9_aumont + ''
                    this.CofAmount.string = Database.page9_aumont + ''
                    // this.CofAmount.active =false
                    this.Amount.string = Database.page9_aumont + ''
                    // if(Database.p10_num == )

                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '超出设置区间,设置失败')
                    return

                }

            }
            if (gHandler.app.pinpai == 'huaxing' && this.nums == 1) {

                if (parseInt(mon) >= 160 && parseInt(mon) <= 370) {
                    if (parseInt(Database.page9_gz_plaumont) - parseInt(mon) < 10) {
                        cc.log('设置失败 160 - 370,点控10===', mon);
                        this.CofAmount.string = ''

                        box.string = Database.p9_jd_xjgz + ''
                        this.CofAmount.string = Database.p9_jd_xjgz + ''
                        // this.CofAmount.active =false
                        this.Amount.string = Database.p9_jd_xjgz + ''


                        gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '超出设置区间,设置失败')
                        return
                    }

                } else {
                    console.log('超出区间', mon);
                    this.CofAmount.string = ''

                    box.string = Database.p9_jd_xjgz + ''
                    this.CofAmount.string = Database.p9_jd_xjgz + ''
                    // this.CofAmount.active =false
                    this.Amount.string = Database.p9_jd_xjgz + ''


                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '超出设置区间,设置失败')
                    return
                }
            }
            if (gHandler.app.pinpai == 'juding') {
                //  富鑫点控为 不超过280
                if (parseInt(mon) <= 100) {

                    cc.log('设置失败 100以内', mon);
                    this.CofAmount.string = ''



                    box.string = Database.p9_jd_xjgz + ''
                    this.CofAmount.string = Database.p9_jd_xjgz + ''
                    // this.CofAmount.active =false
                    this.Amount.string = Database.p9_jd_xjgz + ''


                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '超出设置区间,设置失败')
                    return

                }

            }
            if (gHandler.app.pinpai == 'fuxin' && 300 <= parseInt(Database.page9_gz_plaumont) && parseInt(Database.page9_gz_plaumont) <= 330) {
                // cc.log(
                //     'Database.page9_gz_plaumont==', Database.page9_gz_plaumont,
                //     'mon====', mon,
                //     'Database.base_dividend_control==', Database.base_dividend_control, '剪完', parseInt(Database.page9_gz_plaumont) - parseInt(mon));
                // parseInt(Database.page9_gz_plaumont) - parseInt(mon) < parseInt(Database.base_dividend_control)
                //  富鑫点控为 不超过280
                if (parseInt(mon) > 280) {

                    cc.log('设置失败');
                    this.CofAmount.string = ''
                    box.string = Database.page9_aumont + ''
                    this.CofAmount.string = Database.page9_aumont + ''
                    // this.CofAmount.active =false
                    this.Amount.string = Database.page9_aumont + ''
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '超出设置区间,设置失败')

                } else {
                    function check() {

                        return new Promise((resolve, reject) => {
                            commonVal.SetBaseDividendRule(id, mon, resolve)
                        })


                    }
                    check().then(
                        (value) => {
                            cc.log('Database.page9_aumont====', Database.page9_aumont);
                            this.CofAmount.string = ''
                            box.string = Database.page9_aumont + ''
                            this.CofAmount.string = Database.page9_aumont + ''
                            this.Amount.string = Database.page9_aumont + ''

                        })

                }

            } else if (gHandler.app.pinpai == 'xingui' && 330 <= parseInt(Database.page9_gz_plaumont) && parseInt(Database.page9_gz_plaumont) <= 360) {
                cc.log(
                    'Database.page9_gz_plaumont==', Database.page9_gz_plaumont,
                    'mon====', mon,
                    'Database.base_dividend_control==', Database.base_dividend_control, '剪完', parseInt(Database.page9_gz_plaumont) - parseInt(mon));


                if (parseInt(Database.page9_gz_plaumont) - parseInt(mon) < parseInt(Database.base_dividend_control)) {

                    cc.log('设置失败');
                    this.CofAmount.string = ''
                    this.CofAmount.string = Database.page9_aumont + ''
                    box.string = Database.page9_aumont + ''
                    // this.CofAmount.active =false
                    this.Amount.string = Database.page9_aumont + ''
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '超出设置区间,设置失败')

                } else {
                    function check() {

                        return new Promise((resolve, reject) => {
                            commonVal.SetBaseDividendRule(id, mon, resolve)
                        })


                    }
                    check().then(
                        (value) => {
                            cc.log('Database.page9_aumont====', Database.page9_aumont);
                            this.CofAmount.string = ''
                            box.string = Database.page9_aumont + ''
                            this.CofAmount.string = Database.page9_aumont + ''
                            this.Amount.string = Database.page9_aumont + ''

                        })

                }

            } else if (gHandler.app.pinpai == 'xinhao' && 200 <= parseInt(Database.page9_gz_plaumont) && parseInt(Database.page9_gz_plaumont) <= 2400) {
                cc.log(
                    'Database.page9_gz_plaumont==', Database.page9_gz_plaumont,
                    'mon====', mon,
                    'Database.base_dividend_control==', Database.base_dividend_control, '剪完', parseInt(Database.page9_gz_plaumont) - parseInt(mon));


                if (parseInt(Database.page9_gz_plaumont) - parseInt(mon) < parseInt(Database.base_dividend_control)) {

                    cc.log('设置失败');
                    this.CofAmount.string = ''
                    this.CofAmount.string = Database.page9_aumont + ''
                    box.string = Database.page9_aumont + ''
                    // this.CofAmount.active =false
                    this.Amount.string = Database.page9_aumont + ''
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '超出设置区间,设置失败')

                } else {
                    function check() {

                        return new Promise((resolve, reject) => {
                            commonVal.SetBaseDividendRule(id, mon, resolve)
                        })


                    }
                    check().then(
                        (value) => {
                            cc.log('Database.page9_aumont====', Database.page9_aumont);
                            this.CofAmount.string = ''
                            box.string = Database.page9_aumont + ''
                            this.CofAmount.string = Database.page9_aumont + ''
                            this.Amount.string = Database.page9_aumont + ''

                        })

                }

            } else if (gHandler.app.pinpai == 'xinlong' && 241 <= parseInt(Database.page9_gz_plaumont) && parseInt(Database.page9_gz_plaumont) <= 260) {
                cc.log(
                    'Database.page9_gz_plaumont==', Database.page9_gz_plaumont,
                    'mon====', mon,
                    'Database.base_dividend_control==', Database.base_dividend_control, '剪完', parseInt(Database.page9_gz_plaumont) - parseInt(mon));


                if (parseInt(Database.page9_gz_plaumont) - parseInt(mon) < 30) {

                    cc.log('设置失败');
                    this.CofAmount.string = ''
                    box.string = Database.page9_aumont + ''
                    this.CofAmount.string = Database.page9_aumont + ''
                    // this.CofAmount.active =false
                    this.Amount.string = Database.page9_aumont + ''
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '超出设置区间,设置失败')

                } else {
                    function check() {

                        return new Promise((resolve, reject) => {
                            commonVal.SetBaseDividendRule(id, mon, resolve)
                        })


                    }
                    check().then(
                        (value) => {
                            cc.log('Database.page9_aumont====', Database.page9_aumont);
                            this.CofAmount.string = ''
                            box.string = Database.page9_aumont + ''
                            this.CofAmount.string = Database.page9_aumont + ''
                            this.Amount.string = Database.page9_aumont + ''

                        })

                }


            } else if (gHandler.app.pinpai == 'xinlong' && 201 <= parseInt(Database.page9_gz_plaumont) && parseInt(Database.page9_gz_plaumont) <= 240) {
                cc.log(
                    'Database.page9_gz_plaumont==', Database.page9_gz_plaumont,
                    'mon====', mon,
                    'Database.base_dividend_control==', Database.base_dividend_control, '剪完', parseInt(Database.page9_gz_plaumont) - parseInt(mon));


                if (parseInt(Database.page9_gz_plaumont) - parseInt(mon) < 10) {

                    cc.log('设置失败');
                    this.CofAmount.string = ''
                    box.string = Database.page9_aumont + ''
                    this.CofAmount.string = Database.page9_aumont + ''
                    // this.CofAmount.active =false
                    this.Amount.string = Database.page9_aumont + ''
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '超出设置区间,设置失败')

                } else {
                    function check() {

                        return new Promise((resolve, reject) => {
                            commonVal.SetBaseDividendRule(id, mon, resolve)
                        })


                    }
                    check().then(
                        (value) => {
                            cc.log('Database.page9_aumont====', Database.page9_aumont);
                            this.CofAmount.string = ''
                            box.string = Database.page9_aumont + ''
                            this.CofAmount.string = Database.page9_aumont + ''
                            this.Amount.string = Database.page9_aumont + ''

                        })

                }


            } else if (gHandler.app.pinpai == 'huangshi' && 100 <= parseInt(Database.page9_gz_plaumont) && parseInt(Database.page9_gz_plaumont) <= 330) {
                cc.log(
                    'Database.page9_gz_plaumont==', Database.page9_gz_plaumont,
                    'mon====', mon,
                    'Database.base_dividend_control==', Database.base_dividend_control, '剪完', parseInt(Database.page9_gz_plaumont) - parseInt(mon));


                if (parseInt(Database.page9_gz_plaumont) - parseInt(mon) < 10) {

                    cc.log('设置失败区间=', parseInt(Database.page9_gz_plaumont) - parseInt(mon));
                    this.CofAmount.string = ''
                    box.string = Database.page9_aumont + ''
                    this.CofAmount.string = Database.page9_aumont + ''
                    // this.CofAmount.active =false
                    this.Amount.string = Database.page9_aumont + ''
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '超出设置区间,设置失败')

                } else {
                    function check() {

                        return new Promise((resolve, reject) => {
                            commonVal.SetBaseDividendRule(id, mon, resolve)
                        })


                    }
                    check().then(
                        (value) => {
                            cc.log('Database.page9_aumont====', Database.page9_aumont);
                            this.CofAmount.string = ''
                            box.string = Database.page9_aumont + ''
                            this.CofAmount.string = Database.page9_aumont + ''
                            this.Amount.string = Database.page9_aumont + ''

                        })

                }

            } else if (gHandler.app.pinpai == 'nineone' && 301 <= parseInt(Database.page9_gz_plaumont) && parseInt(Database.page9_gz_plaumont) <= 320) {
                cc.log(
                    'Database.page9_gz_plaumont==', Database.page9_gz_plaumont,
                    'mon====', mon,
                    'Database.base_dividend_control==', Database.base_dividend_control, '剪完', parseInt(Database.page9_gz_plaumont) - parseInt(mon));


                if (parseInt(Database.page9_gz_plaumont) - parseInt(mon) < 10) {

                    cc.log('设置失败区间=', parseInt(Database.page9_gz_plaumont) - parseInt(mon));
                    this.CofAmount.string = ''
                    box.string = Database.page9_aumont + ''
                    this.CofAmount.string = Database.page9_aumont + ''
                    // this.CofAmount.active =false
                    this.Amount.string = Database.page9_aumont + ''
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '超出设置区间,设置失败')

                } else {
                    function check() {

                        return new Promise((resolve, reject) => {
                            commonVal.SetBaseDividendRule(id, mon, resolve)
                        })


                    }
                    check().then(
                        (value) => {
                            cc.log('Database.page9_aumont====', Database.page9_aumont);
                            this.CofAmount.string = ''
                            box.string = Database.page9_aumont + ''
                            this.CofAmount.string = Database.page9_aumont + ''
                            this.Amount.string = Database.page9_aumont + ''

                        })

                }

            } else if (gHandler.app.pinpai == 'nineone' && 300 == parseInt(Database.page9_gz_plaumont)) {
                cc.log(
                    'Database.page9_gz_plaumont==', Database.page9_gz_plaumont,
                    'mon====', mon,
                    'Database.base_dividend_control==', Database.base_dividend_control, '剪完', parseInt(Database.page9_gz_plaumont) - parseInt(mon));


                if (parseInt(Database.page9_gz_plaumont) - parseInt(mon) < 20) {

                    cc.log('设置失败区间=', parseInt(Database.page9_gz_plaumont) - parseInt(mon));
                    this.CofAmount.string = ''
                    box.string = Database.page9_aumont + ''
                    this.CofAmount.string = Database.page9_aumont + ''
                    // this.CofAmount.active =false
                    this.Amount.string = Database.page9_aumont + ''
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '超出设置区间,设置失败')

                } else {
                    function check() {

                        return new Promise((resolve, reject) => {
                            commonVal.SetBaseDividendRule(id, mon, resolve)
                        })


                    }
                    check().then(
                        (value) => {
                            cc.log('Database.page9_aumont====', Database.page9_aumont);
                            this.CofAmount.string = ''
                            box.string = Database.page9_aumont + ''
                            this.CofAmount.string = Database.page9_aumont + ''
                            this.Amount.string = Database.page9_aumont + ''

                        })

                }

            } else if (gHandler.app.pinpai == 'juding' && 301 <= parseInt(Database.page9_gz_plaumont) && parseInt(Database.page9_gz_plaumont) <= 350) {

                if (parseInt(mon) > 300 || parseInt(mon) < 100) {

                    cc.log('设置失败区间= 350 301', mon);

                    box.string = Database.p9_jd_xjgz + ''
                    this.CofAmount.string = Database.p9_jd_xjgz + ''
                    // this.CofAmount.active =false
                    this.Amount.string = Database.p9_jd_xjgz + ''


                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '超出设置区间,设置失败')

                } else {
                    let num = this.nums
                    function check() {

                        return new Promise((resolve, reject) => {
                            commonVal.jd_SetBaseDividendRule(id, mon, num, resolve)
                        })


                    }
                    check().then(
                        (value) => {

                            this.CofAmount.string = ''
                            box.string = Database.p9_jd_xjgz + ''
                            this.CofAmount.string = Database.p9_jd_xjgz + ''
                            this.Amount.string = Database.p9_jd_xjgz + ''
                            cc.log('Database.p9_jd_xjgz====', Database.p9_jd_xjgz);

                        })

                }

            } else if (gHandler.app.pinpai == 'huaxing' && 90 <= parseInt(Database.page9_gz_plaumont) && parseInt(Database.page9_gz_plaumont) <= 290 && this.nums == 5) {

                if (parseInt(Database.page9_gz_plaumont) - parseInt(mon) < 10) {

                    cc.log('设置失败区间= 410 170', mon);

                    box.string = Database.p9_jd_xjgz + ''
                    this.CofAmount.string = Database.p9_jd_xjgz + ''
                    // this.CofAmount.active =false
                    this.Amount.string = Database.p9_jd_xjgz + ''


                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '超出设置区间,设置失败')

                } else {
                    let num = this.nums
                    function check() {

                        return new Promise((resolve, reject) => {
                            commonVal.jd_SetBaseDividendRule(id, mon, num, resolve)
                        })


                    }
                    check().then(
                        (value) => {

                            this.CofAmount.string = ''
                            box.string = Database.p9_jd_xjgz + ''
                            this.CofAmount.string = Database.p9_jd_xjgz + ''
                            this.Amount.string = Database.p9_jd_xjgz + ''
                            cc.log('Database.p9_jd_xjgz====', Database.p9_jd_xjgz);

                        })

                }

            } else {
                cc.log('进改');
                if (gHandler.app.pinpai == 'juding' || gHandler.app.pinpai == 'huaxing' || gHandler.app.pinpai == 'test' || gHandler.app.pinpai == 'tianqi') {
                    let qp = parseFloat(Database.p9_qp_aumont.split("元", 1)[0])

                    let dz = parseFloat(Database.p9_dz_aumont.split("元", 1)[0])
                    cc.log('mon==', mon, 'Database.p9_qp_aumont=', qp, 'Database.p9_dz_aumont==', dz)
                    if (this.nums == 1 && parseInt(mon) >= qp) {
                        cc.log('else 2设置失败', mon);
                        box.string = Database.p9_jd_xjgz + ''
                        this.CofAmount.string = Database.p9_jd_xjgz + ''
                        // this.CofAmount.active =false
                        this.Amount.string = Database.p9_jd_xjgz + ''
                        gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '超出设置区间,设置失败')
                        return
                    }
                    if (this.nums == 5 && parseInt(mon) >= dz) {
                        cc.log('else 3设置失败', mon);
                        box.string = Database.p9_jd_xjgz + ''
                        this.CofAmount.string = Database.p9_jd_xjgz + ''
                        // this.CofAmount.active =false
                        this.Amount.string = Database.p9_jd_xjgz + ''
                        gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '超出设置区间,设置失败')
                        return
                    }
                    if (gHandler.app.pinpai == 'tianqi') {
                        console.log('this.nums ==',this.nums,'parseInt(qp) - parseInt(mon)====',parseInt(qp) - parseInt(mon),'parseInt(mon)====',parseInt(mon));
                        if (this.nums == 1 && parseInt(qp) - parseInt(mon) < 10 ) {
                            cc.log('else 4设置失败', mon);
                            box.string = Database.p9_jd_xjgz + ''
                            this.CofAmount.string = Database.p9_jd_xjgz + ''
                            // this.CofAmount.active =false
                            this.Amount.string = Database.p9_jd_xjgz + ''
                            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '超出设置区间,设置失败')
                            return
                        }
                        if (this.nums == 5 && parseInt(dz) - parseInt(mon) < 10 ) {
                            cc.log('else 5设置失败', mon);
                            box.string = Database.p9_jd_xjgz + ''
                            this.CofAmount.string = Database.p9_jd_xjgz + ''
                            // this.CofAmount.active =false
                            this.Amount.string = Database.p9_jd_xjgz + ''
                            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '超出设置区间,设置失败')
                            return
                        }
                        if(parseInt(mon) < 90){
                            cc.log('else 6设置失败', mon);
                            box.string = Database.p9_jd_xjgz + ''
                            this.CofAmount.string = Database.p9_jd_xjgz + ''
                            // this.CofAmount.active =false
                            this.Amount.string = Database.p9_jd_xjgz + ''
                            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '超出设置区间,设置失败')
                            return
                        }
                        if(parseInt(mon) > 290){
                            cc.log('else 7设置失败', mon);
                            box.string = Database.p9_jd_xjgz + ''
                            this.CofAmount.string = Database.p9_jd_xjgz + ''
                            // this.CofAmount.active =false
                            this.Amount.string = Database.p9_jd_xjgz + ''
                            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '超出设置区间,设置失败')
                            return
                        }
                    }
                    let num = this.nums
                    function check() {

                        return new Promise((resolve, reject) => {
                            commonVal.jd_SetBaseDividendRule(id, mon, num, resolve)
                        })


                    }
                    check().then(
                        (value) => {

                            this.CofAmount.string = ''
                            box.string = Database.p9_jd_xjgz + ''
                            this.CofAmount.string = Database.p9_jd_xjgz + ''
                            this.Amount.string = Database.p9_jd_xjgz + ''
                            cc.log('Database.page9_aumont====', Database.page9_aumont);



                        })


                } else {

                    function check() {

                        return new Promise((resolve, reject) => {
                            commonVal.SetBaseDividendRule(id, mon, resolve)
                        })


                    }
                    check().then(
                        (value) => {
                            cc.log('Database.page9_aumont====', Database.page9_aumont);
                            this.CofAmount.string = ''
                            box.string = Database.page9_aumont + ''
                            this.CofAmount.string = Database.page9_aumont + ''
                            // this.CofAmount.active =false
                            this.Amount.string = Database.page9_aumont + ''

                        })
                }

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
            }&token=${commonVal.token}&child_id=${child_id}&type=1&game_tag=${game_tag}&demand_type=${this.demand_type}&demand_tag=${demand_tag}&amount=${amount}&percent=${percent}`;

        // cc.log("/proxy/user/createDividendRule请求:", sendData);

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

                    // this.edit1.SetWindowText("")
                    // this.edit2.SetWindowText("")
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
                    xjfhsd_pop.getComponent("xjfhsd_pop").getDividendRule(child_id)
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '规则设定成功')

                    this.node.active = false;
                }


            }
            xhr_test.abort();
        };
    },
    start() {
    },
    n2_setdata(id, date, gryj, zsrs, tdrs) {
        //this.content.removeAllChildren();
        cc.log('ninetwo p9_bdsz下级id==', id);
        this.id = id;


        //获取下级规则

        // this.gamerule = 90;
        const promise1 = new Promise((resolve) => {
            //棋牌 
            commonVal.n2_Center_GetBaseDividendRule(id, 1, resolve)

        });
        const promise2 = new Promise((resolve) => {
            //电子
            commonVal.n2_Center_GetBaseDividendRule(id, 5, resolve)


        });

        Promise.all([promise1, promise2]).then((values) => {
            //渲染棋牌规则
            this.Amount.string = Database.page9_n2qp_aumont + ''
            this.CofAmount.string = Database.page9_n2qp_aumont + ''
            //渲染电子规则
            // Database.p9_jd_xjgz = Database.page9_aumont
            this.node.getChildByName('dz_EditBox').getChildByName('text_dz').getComponent(cc.Label).string = Database.page9_n2dz_aumont + ''
            this.node.getChildByName('dz_EditBox').getChildByName('pla_dz').getComponent(cc.Label).string = Database.page9_n2dz_aumont + ''
            //uid
            this.PlayerId.string = id + '';
            //日期
            this.node.getChildByName('content').getChildByName('agent_pop_frame_di_1').getChildByName('date').getComponent(cc.Label).string = date + ''
            //上级id
            this.node.getChildByName('content').getChildByName('agent_pop_frame_di_1').getChildByName('up_id').getComponent(cc.Label).string = gHandler.gameGlobal.player.account_name + ''
            //个人佣金
            this.node.getChildByName('content').getChildByName('agent_pop_frame_di_1').getChildByName('gryj').getComponent(cc.Label).string = Math.floor(parseFloat(gryj) * 100) / 100 + ''
            //直属人数
            this.node.getChildByName('content').getChildByName('agent_pop_frame_di_1').getChildByName('zsrs').getComponent(cc.Label).string = zsrs + ''
            //团队人数
            if (tdrs) {
                this.node.getChildByName('content').getChildByName('agent_pop_frame_di_1').getChildByName('tdrs').getComponent(cc.Label).string = tdrs + ''
            } else {
                this.node.getChildByName('content').getChildByName('agent_pop_frame_di_1').getChildByName('tdrs').getComponent(cc.Label).string = 0 + ''
            }

            this.node.active = true;
        })





    },
    //n2 专用点位控制 点控
    n2confirm1(event, num) {
        //音效
        Database.clickSound(Database.hall_sound)
        let box = cc.find('qp_EditBox', this.node).getComponent(cc.EditBox)
        // this.node.getChildByName('New_EditBox').getComponent('EditBox')
        let dz_box = cc.find('dz_EditBox', this.node).getComponent(cc.EditBox)
        //电子输入值
        let dz_CofAmount = cc.find('dz_EditBox/text_dz', this.node).getComponent(cc.Label)
        //电子预设值
        let dz_plaAmount = cc.find('dz_EditBox/pla_dz', this.node).getComponent(cc.Label)
        // this.node.getChildByName('New_EditBox').getComponent('EditBox')

        let mon;


        let qp = parseFloat(Database.p9_qp_aumont.split("元", 1)[0])

        let dz = parseFloat(Database.p9_dz_aumont.split("元", 1)[0])


        if (num == 1) {
            //上级规则
            mon = this.CofAmount.string;
            Database.page9_gz_plaumont = qp
        }
        if (num == 5) {
            mon = dz_CofAmount.string;
            Database.page9_gz_plaumont = dz

        }

        let cos_s = parseInt(this.CofAmount.string)
        cc.log('mon==', mon, 'Database.p9_qp_aumont=', qp, 'Database.p9_dz_aumont==', dz)
        if (cos_s % 10 != 0) {
            //棋牌 
            box.string = Database.page9_n2qp_aumont + ''
            this.CofAmount.string = Database.page9_n2qp_aumont + ''
            this.Amount.string = Database.page9_n2qp_aumont + ''
            //电子
            dz_box.string = Database.page9_n2dz_aumont + ''
            dz_CofAmount.string = Database.page9_n2dz_aumont + ''
            dz_plaAmount.string = Database.page9_n2dz_aumont + ''
            console.log('请输入10的倍数');

            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '请输入10的倍数')
            return
        }

        if (this.CofAmount.string.indexOf(".") > -1) {
            //棋牌 
            box.string = Database.page9_n2qp_aumont + ''
            this.CofAmount.string = Database.page9_n2qp_aumont + ''
            this.Amount.string = Database.page9_n2qp_aumont + ''
            //电子
            dz_box.string = Database.page9_n2dz_aumont + ''
            dz_CofAmount.string = Database.page9_n2dz_aumont + ''
            dz_plaAmount.string = Database.page9_n2dz_aumont + ''

            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '请输入整数')
            return
        }


        let id = this.id;

        cc.log('设置', mon);
        // 91 80   // fx 80     // Xg 80                // Db 80             // Xh 80    // Xl 80    // hs 100
        if (mon == undefined) {
            //棋牌 /个人规则
            box.string = Database.page9_n2qp_aumont + ''
            this.CofAmount.string = Database.page9_n2qp_aumont + ''
            this.Amount.string = Database.page9_n2qp_aumont + ''
            //电子
            dz_box.string = Database.page9_n2dz_aumont + ''
            dz_CofAmount.string = Database.page9_n2dz_aumont + ''
            dz_plaAmount.string = Database.page9_n2dz_aumont + ''
            return
        }
        if (num == 1) {
            if (parseInt(mon) <= Database.page9_n2qp_aumont) {
                //棋牌 /个人规则
                box.string = Database.page9_n2qp_aumont + ''
                this.CofAmount.string = Database.page9_n2qp_aumont + ''
                this.Amount.string = Database.page9_n2qp_aumont + ''
                return
            }
        }
        if (num == 5) {
            if (parseInt(mon) <= Database.page9_n2dz_aumont) {
                //电子
                dz_box.string = Database.page9_n2dz_aumont + ''
                dz_CofAmount.string = Database.page9_n2dz_aumont + ''
                dz_plaAmount.string = Database.page9_n2dz_aumont + ''
                return
            }
        }


        //  92点控为 不小于100
        if (parseInt(mon) < 100 && num == 1) {

            cc.log('设置失败 小于100 ', mon);
            box.string = Database.page9_n2qp_aumont + ''
            this.CofAmount.string = Database.page9_n2qp_aumont + ''
            this.Amount.string = Database.page9_n2qp_aumont + ''

            //电子
            dz_box.string = Database.page9_n2dz_aumont + ''
            dz_CofAmount.string = Database.page9_n2dz_aumont + ''
            dz_plaAmount.string = Database.page9_n2dz_aumont + ''

            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '超出设置区间,设置失败')
            return

        }
        //  92点控为 不超过300
        if (parseInt(mon) > 300 && num == 1) {

            cc.log('设置失败 大于300', mon);


            box.string = Database.page9_n2qp_aumont + ''
            this.CofAmount.string = Database.page9_n2qp_aumont + ''
            this.Amount.string = Database.page9_n2qp_aumont + ''




            //电子
            dz_box.string = Database.page9_n2dz_aumont + ''
            dz_CofAmount.string = Database.page9_n2dz_aumont + ''
            dz_plaAmount.string = Database.page9_n2dz_aumont + ''


            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '超出设置区间,设置失败')
            return

        }

        //  电子点控为 不小于130
        if (parseInt(mon) < 130 && num == 5) {

            cc.log('设置失败 小于110 ', mon);
            this.CofAmount.string = ''

            //棋牌 
            box.string = Database.page9_n2qp_aumont + ''
            this.CofAmount.string = Database.page9_n2qp_aumont + ''
            this.Amount.string = Database.page9_n2qp_aumont + ''

            //电子
            dz_box.string = Database.page9_n2dz_aumont + ''
            dz_CofAmount.string = Database.page9_n2dz_aumont + ''
            dz_plaAmount.string = Database.page9_n2dz_aumont + ''



            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '超出设置区间,设置失败')
            return

        }
        //  富鑫点控为 不超过230
        if (parseInt(mon) > 230 && num == 5) {

            cc.log('设置失败 大于230', mon);
            this.CofAmount.string = ''

            //棋牌 
            box.string = Database.page9_n2qp_aumont + ''
            this.CofAmount.string = Database.page9_n2qp_aumont + ''
            this.Amount.string = Database.page9_n2qp_aumont + ''

            //电子
            dz_box.string = Database.page9_n2dz_aumont + ''
            dz_CofAmount.string = Database.page9_n2dz_aumont + ''
            dz_plaAmount.string = Database.page9_n2dz_aumont + ''



            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '超出设置区间,设置失败')
            return

        }
        cc.log('n2 进改');


        cc.log('mon==', mon, 'Database.p9_qp_aumont=', qp, 'Database.p9_dz_aumont==', dz)
        if (num == 1 && qp - parseInt(mon) < 0) {
            cc.log('else 2设置失败', mon);
            //棋牌 /个人规则
            box.string = Database.page9_n2qp_aumont + ''
            this.CofAmount.string = Database.page9_n2qp_aumont + ''
            this.Amount.string = Database.page9_n2qp_aumont + ''

            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '超出设置区间,设置失败')
            return
        }
        if (num == 5 && dz - parseInt(mon) < 0) {
            cc.log('else 3设置失败', mon);
            //电子
            dz_box.string = Database.page9_n2dz_aumont + ''
            dz_CofAmount.string = Database.page9_n2dz_aumont + ''
            dz_plaAmount.string = Database.page9_n2dz_aumont + ''

            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '超出设置区间,设置失败')
            return
        }

        function check() {

            return new Promise((resolve, reject) => {
                commonVal.n2_SetBaseDividendRule(id, mon, num, resolve)
            })


        }
        check().then(
            (value) => {
                if (num == 5) {
                    //电子
                    dz_box.string = Database.p9_n2_xjgz + ''
                    dz_CofAmount.string = Database.p9_n2_xjgz + ''
                    dz_plaAmount.string = Database.p9_n2_xjgz + ''
                    Database.page9_n2dz_aumont = Database.p9_n2_xjgz
                    cc.log('设置成功====', Database.p9_n2_xjgz);
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '设置成功')

                }
                if (num == 1) {
                    //棋牌
                    this.CofAmount.string = ''
                    box.string = Database.p9_n2_xjgz + ''
                    this.CofAmount.string = Database.p9_n2_xjgz + ''
                    this.Amount.string = Database.p9_n2_xjgz + ''
                    Database.page9_n2qp_aumont = Database.p9_n2_xjgz
                    cc.log('设置成功====', Database.p9_n2_xjgz);
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '设置成功')

                }

            })

    }

}





);

