let gHandler = require("gHandler");
let toFloat = require("./proxy-changeFloat");
let commonVal = require("./public_script/proxy-http");
var Database = require("./public_script/Database");
cc.Class({
    extends: cc.Component,
    properties: {
        myCustomers: {
            type: cc.Prefab,
            default: null,
        },
        btn2: {//我的推广
            type: cc.Node,
            default: null,
        },
        btn3: {//我的规则
            type: cc.Node,
            default: null,
        },
        btn4: {//流水分红
            type: cc.Node,
            default: null,
        },
        btn5: {//亏损分红
            type: cc.Node,
            default: null,
        },
        btn6: {//亏损冲提差
            type: cc.Node,
            default: null,
        },
        btn7: {//推广介绍
            type: cc.Node,
            default: null,
        },
        btn8: {//彩票真人
            type: cc.Node,
            default: null,
        },
        btn9: {//我的玩家
            type: cc.Node,
            default: null,
        },
        btn10: {//我的业绩
            type: cc.Node,
            default: null,
        },
        grid_db: {
            type: cc.Node,
            default: null,
        },
        grid_all: {
            type: cc.Node,
            default: null,
        },
        dataTable_all: {
            type: cc.Node,
            default: null,
        },

        count: 0,
        btn_pp: true,
        acc: true,


        page3: {
            type: cc.Prefab,
            default: null,
        },
        page4: {
            type: cc.Prefab,
            default: null,
        },
        page5: {
            type: cc.Prefab,
            default: null,
        },
        page6: {
            type: cc.Prefab,
            default: null,
        },
        page7: {
            type: cc.Prefab,
            default: null,
        },
        page8: {
            type: cc.Prefab,
            default: null,
        },
        page9: {
            type: cc.Prefab,
            default: null,
        },
        page10: {
            type: cc.Prefab,
            default: null,
        },
        page11: {
            type: cc.Prefab,
            default: null,
        },
        page12: {
            type: cc.Prefab,
            default: null,
        },
        page13: {
            type: cc.Prefab,
            default: null,
        },
        page14: {
            type: cc.Prefab,
            default: null,
        },
        page15: {
            type: cc.Prefab,
            default: null,
        },
        page16: {
            type: cc.Prefab,
            default: null,
        },
        page17: {
            type: cc.Prefab,
            default: null,
        },
        jiazai: {
            type: cc.Prefab,
            default: null,
        },
    },
    //  92  专用刷新功能
    ntwo_updata() {

        if (this.btn_pp) {
            Database.n2_jrygj_qp = 0
            Database.n2_jrygj_dz = 0
            Database.n2_zsyj_qp = 0
            Database.n2_zsyj_dz = 0
            Database.n2_tdyj_qp = 0
            Database.n2_tdyj_dz = 0
            Database.n2_zrzyj_qp = 0
            Database.n2_zrzyj_dz = 0
            Database.n2_bzzyj_qp = 0
            Database.n2_bzzyj_dz = 0
            Database.loadview.active = true
            this.scheduleOnce(() => {
                // 这里的 this 指向 component
                Database.loadview.active = false;
            }, 2);
            let shuxian = this.node.getChildByName('tgzq_bg').getChildByName('shuaxin')
            this.scheduleOnce(() => {
                cc.Tween.stopAllByTarget(shuxian);
                shuxian.rotation = 0
                this.btn_pp = true

            }, 2)


            cc.tween(shuxian)
                .by(0.01, { angle: -6 })
                .repeatForever()
                .start();



            cc.log('进刷新界面功能');

            //获取需要展示参数 
            //拿表格
            let table = this.node.getChildByName('ninetwo')//.getComponent("cc.Label")
            // n2_jrygj: 0,//92 今日预估金
            let jrygj = table.getChildByName('jryg').getComponent("cc.Label")
            // n2_zsyj: 0,//92 直属佣金
            let zsyj = table.getChildByName('zsyj').getComponent("cc.Label")
            // n2_tdyj,//92 团队佣金
            let tdyj = table.getChildByName('tdyj').getComponent("cc.Label")
            // n2_zrzyj//92 昨日总佣金
            let zrzyj = table.getChildByName('zrzyj').getComponent("cc.Label")
            // n2_bzzyj //92 本周总佣金
            let bzzyj = table.getChildByName('bzzyj').getComponent("cc.Label")

            this.btn_pp = false
            const promise1 = new Promise((resolve) => {
                //先 棋牌
                commonVal.n2_today_GetBaseDividendInfo2(0, resolve, 1)
            });
            const promise2 = new Promise((resolve) => {
                commonVal.n2_today_GetBaseDividendInfo2(0, resolve, 5)

            });
            const promise3 = new Promise((resolve) => {
                //先 棋牌
                commonVal.n2_today_GetBaseDividendInfo2(-1, resolve, 1)
            });
            const promise4 = new Promise((resolve) => {
                //电子
                commonVal.n2_today_GetBaseDividendInfo2(-1, resolve, 5)

            });
            const promise5 = new Promise((resolve) => {
                //先 棋牌
                commonVal.n2_today_GetBaseDividendInfo2('week', resolve, 1)

            });
            const promise6 = new Promise((resolve) => {
                //电子
                commonVal.n2_today_GetBaseDividendInfo2('week', resolve, 5)

            });

            Promise.all([promise1, promise2, promise3, promise4, promise5, promise6]).then((values) => {

                //今日棋牌电子都请求完了
                jrygj.string = Database.countCoinsShowLabel(Database.n2_jrygj_qp + Database.n2_jrygj_dz)//92 今日预估金 
                zsyj.string = Database.countCoinsShowLabel(Database.n2_zsyj_qp + Database.n2_zsyj_dz)//92 直属佣金 
                tdyj.string = Database.countCoinsShowLabel(Database.n2_tdyj_qp + Database.n2_tdyj_dz)//92 团队佣金 

                //92 昨日总佣金
                zrzyj.string = Database.countCoinsShowLabel(Database.n2_zrzyj_qp + Database.n2_zrzyj_dz)

                //92 本周总佣金
                bzzyj.string = Database.countCoinsShowLabel(Database.n2_bzzyj_qp + Database.n2_bzzyj_dz)

                // 请求团队总人数数据 测试时屏蔽
                let dataTable = this.node.getChildByName("middle").getChildByName("rwer2");
                let urls
                urls = gHandler.gameGlobal.proxy.proxy_host + `/proxy/user/GetProxyUserNumber?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&ids=[${gHandler.gameGlobal.player.account_name}]`
                let xhr4 = new XMLHttpRequest(); //readyState===0
                xhr4.open("GET", urls, true); //readyState===1
                xhr4.send(); //readyState===2
                xhr4.onreadystatechange = () => {
                    if (xhr4.readyState == 4 && xhr4.status === 200) {

                        const res = JSON.parse(xhr4.responseText);
                        // cc.log(urls, "4444  GetProxyUserNumber 返回数据", res);
                        if (res.code === 200) {
                            if (!res.msg) {
                                dataTable.getChildByName("tdzwj").getComponent("cc.Label").string = '0';
                            } else {
                                //团队总玩家    
                                dataTable.getChildByName("tdzwj").getComponent("cc.Label").string = '' + res.msg[0].count;
                            }


                        }
                        this.scheduleOnce(() => {
                            console.log('this.btn_pp true');
                            this.btn_pp = true

                        }, 0.1);
                    }
                    xhr4.abort();
                };



            })




        }



    },
    onLoad() {
        console.log('版本号0.0.1');
        if (gHandler.app.pinpai == 'huaxing') {
            Database.loadview = this.node.parent.parent.getChildByName('jiazai')
            this.scheduleOnce(() => {
                // 这里的 this 指向 component
                Database.loadview.active = false;
            }, 2);
        }

        //是否展示代理界面  

        //获取显示我的ID
        let package_id = gHandler.gameGlobal.proxy.package_id;

        //如果是德比|| gHandler.app.pinpai == 'xinsheng'
        if (gHandler.app.pinpai == 'debi' || gHandler.app.pinpai == 'xinsheng') {

            if (gHandler.app.pinpai == 'debi') {
                this.scheduleOnce(() => {
                    let apage3 = cc.instantiate(this.page3);
                    let apage4 = cc.instantiate(this.page4);
                    let apage5 = cc.instantiate(this.page5);
                    let apage6 = cc.instantiate(this.page6);



                    apage3.active = false
                    apage4.active = false
                    apage5.active = false
                    apage6.active = false


                    cc.find("Canvas/baseView/home").addChild(apage3);
                    cc.find("Canvas/baseView/home").addChild(apage4);
                    cc.find("Canvas/baseView/home").addChild(apage5);
                    cc.find("Canvas/baseView/home").addChild(apage6);


                }, 0.01)
                console.log('1');
                this.grid_db.active = true;
                this.grid_all.active = false;
                this.dataTable_all.active = false;
                this.btn2.active = false;



            }
            this.btn2.active = false;
            this.grid_db.active = true;
            this.grid_all.active = false;
            this.dataTable_all.active = false;
        } else {
            if (gHandler.app.pinpai == 'xingba') {
                this.scheduleOnce(() => {
                    let apage3 = cc.instantiate(this.page3);
                    let apage4 = cc.instantiate(this.page4);
                    let apage5 = cc.instantiate(this.page5);
                    let apage6 = cc.instantiate(this.page6);



                    apage3.active = false
                    apage4.active = false
                    apage5.active = false
                    apage6.active = false


                    cc.find("Canvas/baseView/home").addChild(apage3);
                    cc.find("Canvas/baseView/home").addChild(apage4);
                    cc.find("Canvas/baseView/home").addChild(apage5);
                    cc.find("Canvas/baseView/home").addChild(apage6);


                }, 0.01)}
            this.btn2.active = true;
            this.grid_db.active = false;
            this.grid_all.active = true;
            this.dataTable_all.active = true;
        }
        // if (gHandler.app.pinpai == 'xinsheng') {
        //     this.btn3.active = false

        // }
        if (gHandler.app.pinpai == 'yuyu') {
            this.scheduleOnce(() => {
                let apage3 = cc.instantiate(this.page3);
                let apage4 = cc.instantiate(this.page4);
                let apage5 = cc.instantiate(this.page5);
                let apage6 = cc.instantiate(this.page6);

                let apage7 = cc.instantiate(this.page7);
                let apage8 = cc.instantiate(this.page8);
                let apage9 = cc.instantiate(this.page9);
                let apage10 = cc.instantiate(this.page10);



                apage3.active = false
                apage4.active = false
                apage5.active = false
                apage6.active = false

                apage7.active = false
                apage8.active = false
                apage9.active = false
                apage10.active = false
                cc.find("Canvas/baseView/home").addChild(apage3);
                cc.find("Canvas/baseView/home").addChild(apage4);
                cc.find("Canvas/baseView/home").addChild(apage5);
                cc.find("Canvas/baseView/home").addChild(apage6);

                cc.find("Canvas/baseView/home").addChild(apage7);
                cc.find("Canvas/baseView/home").addChild(apage8);
                cc.find("Canvas/baseView/home").addChild(apage9);
                cc.find("Canvas/baseView/home").addChild(apage10);
            }, 0.01);


            this.btn2.active = false
            this.grid_db.active = false;
            this.grid_all.active = false;
            this.dataTable_all.active = false;
            this.node.getChildByName("middle").getChildByName("rwer2").active = true;


            this.btn2.active = false;
            this.btn3.active = false;
            this.btn7.active = false;
            this.btn9.active = true;
            this.btn10.active = true;

        }
        if (gHandler.app.pinpai == 'fuxin' || gHandler.app.pinpai == 'juding') {
            if (gHandler.app.pinpai == 'fuxin') {
                this.scheduleOnce(() => {
                    let apage3 = cc.instantiate(this.page3);
                    let apage4 = cc.instantiate(this.page4);
                    let apage5 = cc.instantiate(this.page5);
                    let apage6 = cc.instantiate(this.page6);

                    let apage7 = cc.instantiate(this.page7);
                    let apage8 = cc.instantiate(this.page8);
                    let apage9 = cc.instantiate(this.page9);
                    let apage10 = cc.instantiate(this.page10);



                    apage3.active = false
                    apage4.active = false
                    apage5.active = false
                    apage6.active = false

                    apage7.active = false
                    apage8.active = false
                    apage9.active = false
                    apage10.active = false
                    cc.find("Canvas/baseView/home").addChild(apage3);
                    cc.find("Canvas/baseView/home").addChild(apage4);
                    cc.find("Canvas/baseView/home").addChild(apage5);
                    cc.find("Canvas/baseView/home").addChild(apage6);

                    cc.find("Canvas/baseView/home").addChild(apage7);
                    cc.find("Canvas/baseView/home").addChild(apage8);
                    cc.find("Canvas/baseView/home").addChild(apage9);
                    cc.find("Canvas/baseView/home").addChild(apage10);
                }, 0.01)

            }
            if (gHandler.app.pinpai == 'juding') {
                this.scheduleOnce(() => {
                    let apage3 = cc.instantiate(this.page3);
                    let apage4 = cc.instantiate(this.page4);
                    let apage5 = cc.instantiate(this.page5);
                    let apage6 = cc.instantiate(this.page6);

                    let apage7 = cc.instantiate(this.page7);
                    let apage8 = cc.instantiate(this.page8);

                    let apage10 = cc.instantiate(this.page10);
                    let apage12 = cc.instantiate(this.page12);


                    apage3.active = false
                    apage4.active = false
                    apage5.active = false
                    apage6.active = false

                    apage7.active = false
                    apage8.active = false
                    apage12.active = false
                    apage10.active = false
                    cc.find("Canvas/baseView/home").addChild(apage3);
                    cc.find("Canvas/baseView/home").addChild(apage4);
                    cc.find("Canvas/baseView/home").addChild(apage5);
                    cc.find("Canvas/baseView/home").addChild(apage6);

                    cc.find("Canvas/baseView/home").addChild(apage7);
                    cc.find("Canvas/baseView/home").addChild(apage8);
                    cc.find("Canvas/baseView/home").addChild(apage12);
                    cc.find("Canvas/baseView/home").addChild(apage10);
                }, 0.01)
            }

            this.grid_db.active = false;
            this.grid_all.active = false;
            this.dataTable_all.active = false;
            this.node.getChildByName("middle").getChildByName("rwer2").active = true;

            this.btn2.active = false;
            this.btn3.active = false;
            this.btn7.active = true;
            this.btn9.active = true;
            this.btn10.active = true;

        }
        if (gHandler.app.pinpai == 'test' || gHandler.app.pinpai == 'tianqi') {
            this.scheduleOnce(() => {
                let apage3 = cc.instantiate(this.page3);
                let apage4 = cc.instantiate(this.page4);
                let apage5 = cc.instantiate(this.page5);
                let apage6 = cc.instantiate(this.page6);

                let apage7 = cc.instantiate(this.page7);
                let apage8 = cc.instantiate(this.page8);
                let apage9 = cc.instantiate(this.page9);
                let apage10 = cc.instantiate(this.page10);
                let apage11 = cc.instantiate(this.page11);
                let apage16 = cc.instantiate(this.page16);
                let apage17 = cc.instantiate(this.page17);


                apage3.active = false
                apage4.active = false
                apage5.active = false
                apage6.active = false

                apage7.active = false
                apage8.active = false
                apage9.active = false
                apage10.active = false
                apage11.active = false
                apage16.active = false
                apage17.active = false
                cc.find("Canvas/baseView/home").addChild(apage3);
                cc.find("Canvas/baseView/home").addChild(apage4);
                cc.find("Canvas/baseView/home").addChild(apage5);
                cc.find("Canvas/baseView/home").addChild(apage6);

                cc.find("Canvas/baseView/home").addChild(apage7);
                cc.find("Canvas/baseView/home").addChild(apage8);
                cc.find("Canvas/baseView/home").addChild(apage9);
                cc.find("Canvas/baseView/home").addChild(apage10);
                cc.find("Canvas/baseView/home").addChild(apage11);
                cc.find("Canvas/baseView/home").addChild(apage16);
                cc.find("Canvas/baseView/home").addChild(apage17);
            }, 0.01)
            if (gHandler.app.pinpai == 'tianqi') {
                this.scheduleOnce(() => {
                    Database.loadview = this.node.parent.parent.getChildByName('jiazai')
                    cc.log('gHandler.app.pinpai====', gHandler.app.pinpai);
                    // 这里的 this 指向 component
                    Database.loadview.active = false;
                }, 2)
                this.node.parent.parent.getChildByName('templatePage').getChildByName('img1').getChildByName('n2label').getComponent("cc.Label").string = "上级ID:" + gHandler.gameGlobal.player.account_name;
                this.node.parent.parent.getChildByName('templatePage').getChildByName('img2').getChildByName('n2label').getComponent("cc.Label").string = "上级ID:" + gHandler.gameGlobal.player.account_name;
                this.node.parent.parent.getChildByName('templatePage').getChildByName('img3').getChildByName('n2label').getComponent("cc.Label").string = "上级ID:" + gHandler.gameGlobal.player.account_name;
            }            console.log('1');
            this.grid_db.active = true;
            this.grid_all.active = false;
            this.dataTable_all.active = false;
            this.btn2.active = false;
            if (gHandler.app.pinpai == 'tianqi') {
                this.node.parent.parent.getChildByName('templatePage').getChildByName('img1').getChildByName('n2label').getComponent("cc.Label").string = "上级ID:" + gHandler.gameGlobal.player.account_name;
                this.node.parent.parent.getChildByName('templatePage').getChildByName('img2').getChildByName('n2label').getComponent("cc.Label").string = "上级ID:" + gHandler.gameGlobal.player.account_name;
                this.node.parent.parent.getChildByName('templatePage').getChildByName('img3').getChildByName('n2label').getComponent("cc.Label").string = "上级ID:" + gHandler.gameGlobal.player.account_name;
            }
           


        }

        if (gHandler.app.pinpai == 'huaxing') {
            this.scheduleOnce(() => {
                let apage3 = cc.instantiate(this.page3);
                let apage4 = cc.instantiate(this.page4);
                let apage5 = cc.instantiate(this.page5);
                let apage6 = cc.instantiate(this.page6);

                let apage7 = cc.instantiate(this.page7);
                let apage8 = cc.instantiate(this.page8);
                let apage9 = cc.instantiate(this.page9);
                let apage10 = cc.instantiate(this.page10);
                let apage12 = cc.instantiate(this.page12);
                let apage13 = cc.instantiate(this.page13);



                apage3.active = false
                apage4.active = false
                apage5.active = false
                apage6.active = false

                apage7.active = false
                apage8.active = false
                apage9.active = false
                apage10.active = false
                apage12.active = false
                apage13.active = false
                cc.find("Canvas/baseView/home").addChild(apage3);
                cc.find("Canvas/baseView/home").addChild(apage4);
                cc.find("Canvas/baseView/home").addChild(apage5);
                cc.find("Canvas/baseView/home").addChild(apage6);

                cc.find("Canvas/baseView/home").addChild(apage7);
                cc.find("Canvas/baseView/home").addChild(apage8);
                cc.find("Canvas/baseView/home").addChild(apage9);
                cc.find("Canvas/baseView/home").addChild(apage10);
                cc.find("Canvas/baseView/home").addChild(apage12);
                cc.find("Canvas/baseView/home").addChild(apage13);
            }, 0.01)

            this.grid_db.active = false;
            this.grid_all.active = false;
            this.dataTable_all.active = false;
            this.btn6.active = false;
            this.node.getChildByName("middle").getChildByName("rwer2").active = true;

            this.btn2.active = true;

            this.btn7.active = true;
            this.btn9.active = true;
            this.btn10.active = true;

        }
        if (gHandler.app.pinpai == 'ninetwo') {
            this.scheduleOnce(() => {
                let ajiazai = cc.instantiate(this.jiazai);

                let apage3 = cc.instantiate(this.page3);
                let apage4 = cc.instantiate(this.page4);
                let apage5 = cc.instantiate(this.page5);
                let apage6 = cc.instantiate(this.page6);

                let apage7 = cc.instantiate(this.page7);
                let apage8 = cc.instantiate(this.page8);
                let apage9 = cc.instantiate(this.page9);
                let apage10 = cc.instantiate(this.page10);

                let apage12 = cc.instantiate(this.page12);
                let apage14 = cc.instantiate(this.page14);
                let apage15 = cc.instantiate(this.page15);
                let apage16 = cc.instantiate(this.page16);
                let apage17 = cc.instantiate(this.page17);

                apage3.active = false
                apage4.active = false
                apage5.active = false
                apage6.active = false

                apage7.active = false
                apage8.active = false
                apage9.active = false
                apage10.active = false

                apage12.active = false
                apage14.active = false
                apage15.active = false
                apage16.active = false
                apage17.active = false

                cc.find("Canvas/baseView/home").addChild(apage3);
                cc.find("Canvas/baseView/home").addChild(apage4);
                cc.find("Canvas/baseView/home").addChild(apage5);
                cc.find("Canvas/baseView/home").addChild(apage6);

                cc.find("Canvas/baseView/home").addChild(apage7);
                cc.find("Canvas/baseView/home").addChild(apage8);
                cc.find("Canvas/baseView/home").addChild(apage9);
                cc.find("Canvas/baseView/home").addChild(apage10);

                cc.find("Canvas/baseView/home").addChild(apage12);
                cc.find("Canvas/baseView/home").addChild(apage14);
                cc.find("Canvas/baseView/home").addChild(apage15);
                cc.find("Canvas/baseView").addChild(apage16);
                cc.find("Canvas/baseView").addChild(apage17);
                cc.find("Canvas/baseView").addChild(ajiazai);

                Database.loadview = this.node.parent.parent.getChildByName('jiazai')
                cc.log('gHandler.app.pinpai====', gHandler.app.pinpai);
                if (gHandler.app.pinpai == 'ninetwo' || gHandler.app.pinpai == 'huaxing') {
                    this.scheduleOnce(() => {
                        // 这里的 this 指向 component
                        Database.loadview.active = false;
                    }, 2);
                }
            }, 0.01)


            this.grid_db.active = false;
            this.grid_all.active = false;
            this.dataTable_all.active = false;
            this.node.getChildByName("middle").getChildByName("rwer2").active = true;
            this.btn2.active = false



            this.btn9.active = true;
            this.btn10.active = true;

        }
        if (gHandler.app.pinpai == 'xingui' || gHandler.app.pinpai == 'xinhao' || gHandler.app.pinpai == 'xinlong' || gHandler.app.pinpai == 'nineone' || gHandler.app.pinpai == 'huangshi') {

            if (gHandler.app.pinpai == 'xinlong') {
                this.scheduleOnce(() => {
                    let apage3 = cc.instantiate(this.page3);
                    let apage4 = cc.instantiate(this.page4);
                    let apage5 = cc.instantiate(this.page5);

                    let apage7 = cc.instantiate(this.page7);
                    let apage8 = cc.instantiate(this.page8);
                    let apage9 = cc.instantiate(this.page9);
                    let apage10 = cc.instantiate(this.page10);
                    let apage11 = cc.instantiate(this.page11);



                    apage3.active = false
                    apage4.active = false
                    apage5.active = false

                    apage7.active = false
                    apage8.active = false
                    apage9.active = false
                    apage10.active = false
                    apage11.active = false
                    cc.find("Canvas/baseView/home").addChild(apage3);
                    cc.find("Canvas/baseView/home").addChild(apage4);
                    cc.find("Canvas/baseView/home").addChild(apage5);

                    cc.find("Canvas/baseView/home").addChild(apage7);
                    cc.find("Canvas/baseView/home").addChild(apage8);
                    cc.find("Canvas/baseView/home").addChild(apage9);
                    cc.find("Canvas/baseView/home").addChild(apage10);
                    cc.find("Canvas/baseView/home").addChild(apage11);
                }, 0.01)
            } else {
                this.scheduleOnce(() => {
                    let apage3 = cc.instantiate(this.page3);
                    let apage4 = cc.instantiate(this.page4);
                    let apage5 = cc.instantiate(this.page5);
                    let apage6 = cc.instantiate(this.page6);

                    let apage7 = cc.instantiate(this.page7);
                    let apage8 = cc.instantiate(this.page8);
                    let apage9 = cc.instantiate(this.page9);
                    let apage10 = cc.instantiate(this.page10);
                    let apage11 = cc.instantiate(this.page11);



                    apage3.active = false
                    apage4.active = false
                    apage5.active = false
                    apage6.active = false

                    apage7.active = false
                    apage8.active = false
                    apage9.active = false
                    apage10.active = false
                    apage11.active = false
                    cc.find("Canvas/baseView/home").addChild(apage3);
                    cc.find("Canvas/baseView/home").addChild(apage4);
                    cc.find("Canvas/baseView/home").addChild(apage5);
                    cc.find("Canvas/baseView/home").addChild(apage6);

                    cc.find("Canvas/baseView/home").addChild(apage7);
                    cc.find("Canvas/baseView/home").addChild(apage8);
                    cc.find("Canvas/baseView/home").addChild(apage9);
                    cc.find("Canvas/baseView/home").addChild(apage10);
                    cc.find("Canvas/baseView/home").addChild(apage11);
                }, 0.01)
            }
            this.grid_db.active = true;
            this.grid_all.active = false;
            this.dataTable_all.active = false;
            // 月入百万
            // 推广介绍
            // 我的业绩
            // 我的玩家
            this.btn2.active = false;
            this.btn3.active = false;
            this.btn7.active = true;
            this.btn9.active = true;
            this.btn10.active = true;

        }



        let account_name = gHandler.gameGlobal.player.account_name;
        let myID = account_name.toString();
        var canvasScript = cc.find("Canvas").getComponent("proxy-canvas");
        this.node
            .getChildByName("bottom")
            .getChildByName("myID")
            .getChildByName("ID")
            .getComponent("cc.Label").string = myID;
        //给我的ID复制按钮绑定事件
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = cc.find("Canvas"); // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = "proxy-canvas"; // 这个是代码文件名
        clickEventHandler.handler = "onCopyClick";
        clickEventHandler.customEventData = myID;
        var button = this.node
            .getChildByName("bottom")
            .getChildByName("myID")
            .getChildByName("copy")
            .getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);
        cc.log('gHandler.gameGlobal.proxy.temp_host====', gHandler.gameGlobal.proxy.temp_host)
        //获取显示专属链接
        let temp_host = gHandler.gameGlobal.proxy.temp_host;
        let myURL =
            temp_host +
            "/?p=" +
            package_id +
            "&u=" +
            account_name +
            "&m=" +
            gHandler.gameGlobal.huanjin;
        //根据环境处理myURL
        if (gHandler.gameGlobal) {
            let huanjin = gHandler.gameGlobal.huanjin;
            if (huanjin == "online") {
                myURL = temp_host + "/?p=" + package_id + "&u=" + account_name;
            }
        }
        this.myURL = myURL;
        this.node
            .getChildByName("bottom")
            .getChildByName("myURL")
            .getChildByName("URL")
            .getComponent("cc.Label").string = myURL;
        this.node
            .getChildByName("bottom")
            .getChildByName("myURL")
            .getChildByName("URL")
            .getComponent("cc.Label")
            ._forceUpdateRenderData(true);
        //不显示im
        this.node
            .getChildByName("bottom")
            .getChildByName("myURL")
            .getChildByName("URL")
            .getChildByName("IM")
            .active = false;
        //给专属链接复制按钮绑定事件
        var URLEventHandler = new cc.Component.EventHandler();
        URLEventHandler.target = cc.find("Canvas"); // 这个 node 节点是你的事件处理代码组件所属的节点
        URLEventHandler.component = "proxy-canvas"; // 这个是代码文件名
        URLEventHandler.handler = "onCopyClick";
        URLEventHandler.customEventData = myURL;
        var button2 = this.node
            .getChildByName("bottom")
            .getChildByName("myURL")
            .getChildByName("URL")
            .getChildByName("copy")
            .getComponent(cc.Button);
        button2.clickEvents.push(URLEventHandler);
        //根据专属链接生成二维码
        this.init(myURL);

        //渲染中间的表格

        let host = gHandler.gameGlobal.proxy.proxy_host;
        let dataTable;
        //添加新品牌时 下面 还有个品牌绑定按钮需要注意
        if (gHandler.app.pinpai == 'debi' || gHandler.app.pinpai == 'xinsheng' || gHandler.app.pinpai == 'fuxin' || gHandler.app.pinpai == 'yuyu' || gHandler.app.pinpai == 'xingui' || gHandler.app.pinpai == 'xinhao' || gHandler.app.pinpai == 'xinlong' || gHandler.app.pinpai == 'nineone' || gHandler.app.pinpai == 'huangshi' || gHandler.app.pinpai == 'juding' || gHandler.app.pinpai == 'huaxing' || gHandler.app.pinpai == 'ninetwo' || gHandler.app.pinpai == 'test' || gHandler.app.pinpai == 'tianqi') {
            console.log('2');
            if (gHandler.app.pinpai == 'fuxin' || gHandler.app.pinpai == 'yuyu' || gHandler.app.pinpai == 'juding' || gHandler.app.pinpai == 'huaxing' || gHandler.app.pinpai == 'ninetwo') {
                console.log('3');
                dataTable = this.node.getChildByName("middle").getChildByName("rwer2");
            } else {
                dataTable = this.node.getChildByName("middle").getChildByName("grid");

            }
            let url = host + "/Proxy/User/login";
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                cc.log("------/Proxy/User/ login  xhr.status:", xhr.status);

                if (xhr.readyState == 4 && xhr.status === 200) {
                    var resData = JSON.parse(xhr.responseText);
                    cc.log("/Proxy/User/login返回:", resData);
                    if (resData.code === 200) {
                        if (gHandler.app.pinpai == 'huaxing' && Database.loadview != null) {
                            Database.loadview.active = false;
                        }

                        Database.balance = resData.msg.proxy_user.balance
                        commonVal.token = resData.msg.token;
                        console.log('p1 commonVal.token===',commonVal.token,'resData.msg.token==',resData.msg.token);
                        console.log('p1 id===',resData.msg.proxy_user.id);
                        commonVal.balance = resData.msg.proxy_user.balance
                        cc.log('Database.balance ===', Database.balance);
                        if (gHandler.app.pinpai == 'fuxin' || gHandler.app.pinpai == 'juding' || gHandler.app.pinpai == 'huaxing' || gHandler.app.pinpai == 'ninetwo') {
                            console.log('4');
                            function a() {
                                cc.log('拿到了个人规则', Database.page9_plaumont);
                            }
                            commonVal.GetBaseDividendRule(a)
                        }
                        if (gHandler.app.pinpai == 'juding' || gHandler.app.pinpai == 'huaxing' || gHandler.app.pinpai == 'test' || gHandler.app.pinpai == 'tianqi') {
                            console.log('5');
                            function a() {
                                cc.log('2拿到了棋牌规则');
                            }
                            function b() {
                                cc.log('2拿到了电子规则');
                            }
                            commonVal.jd_p9_GetBaseDividendRule(1, a)
                            commonVal.jd_p9_GetBaseDividendRule(5, b)
                        }

                        if (gHandler.app.pinpai == 'ninetwo') {

                            function a() {
                                cc.log('n2 2拿到了棋牌规则');
                            }
                            function b() {
                                cc.log('n2 2拿到了电子规则');
                            }
                            commonVal.n2_p9_GetBaseDividendRule(1, a)
                            commonVal.n2_p9_GetBaseDividendRule(5, b)
                        }
                        function check() {
                            return new Promise((resolve, reject) => {
                                commonVal.getDividendRule(account_name, resolve)//获取所有的规则
                                // commonVal.getallchilds(account_name) //请求所以下级功能
                            })
                        }
                        //type  1, 流水 2 亏损
                        // game_tag 游戏分类
                        // demand_type 统计类型(1.流失 2.亏损 3.亏损冲提差)
                        // demand_tag 统计类型方式(1.当前游戏分类 2.所有游戏分类)
                        check().then(//此处暂时不通
                            (value) => {
                                cc.log('1   value====', value)
                                if (value != [] && value != null) {
                                    for (let i = 0; i < value.length; i++) {
                                        if (gHandler.app.pinpai == 'fuxin' || gHandler.app.pinpai == 'juding') {

                                            if (value[i].type == 1) {
                                                cc.log('打开流水分红');
                                                this.btn8.active = true;
                                            }
                                            if (value[i].type == 2) {
                                                cc.log('打开亏损分红');
                                                this.btn5.active = true;

                                            }
                                            if (value[i].type == 3) {
                                                cc.log('打开亏损差分红');
                                                this.btn6.active = true;

                                            }
                                        } else if (gHandler.app.pinpai == 'yuyu') {
                                            if (value[i].type == 1) {
                                                cc.log('打开流水分红');
                                                this.btn8.active = true;
                                            }
                                            if (value[i].type == 2) {
                                                cc.log('打开亏损分红');
                                                this.btn5.active = true;

                                            }
                                            if (value[i].type == 3) {
                                                cc.log('打开亏损差分红');
                                                this.btn6.active = true;

                                            }
                                        } else if (gHandler.app.pinpai == 'ninetwo') {
                                            if (value[i].type == 1) {
                                                cc.log('NINETWO 打开流水分红');
                                                this.btn4.active = true;
                                            }

                                            if (value[i].type == 3) {
                                                cc.log(' NINE TWO 打开亏损差分红');
                                                this.btn6.active = false;

                                            }
                                        } else if (gHandler.app.pinpai == 'test' || gHandler.app.pinpai == 'tianqi') {
                                            console.log('6');
                                            if (value[i].type == 1) {
                                                cc.log('test 打开流水分红');
                                                this.btn4.active = true;
                                            }

                                            if (value[i].type == 3) {
                                                cc.log('test 打开亏损差分红');
                                                this.btn6.active = true;

                                            }
                                        } else if (gHandler.app.pinpai != 'xinsheng') {
                                            if (value[i].type == 1) {
                                                cc.log('打开流水分红');
                                                this.btn4.active = true;
                                            }
                                            if (value[i].type == 2) {
                                                cc.log('打开亏损分红');
                                                this.btn5.active = true;

                                            }
                                            if (value[i].type == 3) {
                                                cc.log('打开亏损差分红');
                                                this.btn6.active = true;

                                            }
                                        } else if (gHandler.app.pinpai != 'huaxing') {
                                            if (value[i].type == 1) {
                                                cc.log('打开流水分红');
                                                this.btn4.active = true;
                                            }

                                            if (value[i].type == 3) {
                                                cc.log('打开亏损差分红');
                                                this.btn6.active = true;

                                            }
                                        }


                                    }
                                }
                            }
                        )
                        //此处渲染预估金等操作
                        if (gHandler.app.pinpai == 'ninetwo') {
                            cc.log('--------进入nt------');
                            this.ntwo_updata()
                        }

                        //取得佣金余额
                        cc
                            .find("Canvas/baseView/home/page1/modal/balance/label")
                            .getComponent("cc.Label").string = Database.countCoinsShowLabel(resData.msg.proxy_user.balance);
                        //渲染表格数据
                        //上级id
                        dataTable.getChildByName("sjid").getComponent("cc.Label").string =
                            resData.msg.proxy_user.proxy_pid;
                        //  渲染92uid
                        if (gHandler.app.pinpai == 'ninetwo') {
                            this.node.parent.parent.getChildByName('templatePage').getChildByName('img1').getChildByName('n2label').getComponent("cc.Label").string = "上级ID:" + gHandler.gameGlobal.player.account_name;
                            this.node.parent.parent.getChildByName('templatePage').getChildByName('img2').getChildByName('n2label').getComponent("cc.Label").string = "上级ID:" + gHandler.gameGlobal.player.account_name;
                            this.node.parent.parent.getChildByName('templatePage').getChildByName('img3').getChildByName('n2label').getComponent("cc.Label").string = "上级ID:" + gHandler.gameGlobal.player.account_name;
                        }
                        //直属下级玩家数
                        dataTable.getChildByName("xjwjs").getComponent("cc.Label").string =
                            resData.msg.proxy_user.direct_number;

                        Database.zsxjwjzs = parseInt(resData.msg.proxy_user.direct_number)

                        //更新佣金余额
                        //如果是科学计数法的极小数
                        if (Database.balance < 0.001) {
                            Database.balance = 0.0;
                        }

                        dataTable.getChildByName("yjye").getComponent("cc.Label").string = Database.countCoinsShowLabel(Database.balance);


                        //请求第三列数据
                        url =
                            host +
                            `/Proxy/User/getAggregation?account_name=${account_name}&ids=[${account_name}]&token=${resData.msg.token}`;
                        var xhr2 = new XMLHttpRequest(); //readyState===0
                        xhr2.onreadystatechange = () => {
                            if (xhr2.readyState == 4 && xhr2.status === 200) {
                                const res = JSON.parse(xhr2.responseText);
                                cc.log("getAggregation返回数据", res);
                                if (res.code === 200 && res.msg) {
                                    const { history_income, children, tax_total } = res.msg[0];
                                    let player_sum = 0;
                                    for (const key in children) {
                                        player_sum += children[key];
                                    }


                                    let sum_income = 0;
                                    for (const key in history_income) {
                                        sum_income += history_income[key];
                                    }
                                    //作判断以调整佣金余额和累计收益小数点第二位可能不一样的问题

                                    //历史总佣金
                                    dataTable.getChildByName("lszyj").getComponent("cc.Label").string = sum_income
                                        ? toFloat(sum_income)
                                        : "0.00";


                                }
                            }
                            xhr2.abort();
                        };
                        xhr2.open("GET", url, true); //readyState===1
                        xhr2.send(); //readyState===2
                        //服务器响应，正在接收响应ing readyState===3
                        //完成响应readyState===4

                        // 请求第四列数据
                        url =
                            host +
                            `/Proxy/User/getProxyUserInductionListGroupByDate?account_name=${account_name}&page=1&limit=2&token=${resData.msg.token}`;

                        let xhr3 = new XMLHttpRequest(); //readyState===0
                        xhr3.open("GET", url, true); //readyState===1
                        xhr3.send(); //readyState===2
                        xhr3.onreadystatechange = () => {
                            if (xhr3.readyState == 4 && xhr3.status === 200) {
                                const res = JSON.parse(xhr3.responseText);
                                // cc.log("getProxyUserInductionListGroupByDate返回数据", res);
                                if (res.code === 200 && res.msg) {
                                    let today = new Date();
                                    today.setDate(today.getDate() - 1);
                                    let month = today.getMonth() + 1;
                                    let day = today.getDate();
                                    let arr = res.msg.map((item) => {
                                        return {
                                            date: item.date.split("-").map(Number),
                                            statement_income: item.statement_income,
                                        };
                                    });
                                    cc.log(arr, "昨日日期", month, day);
                                    arr.forEach((ele) => {
                                        if (ele.date[1] === month && ele.date[2] === day) {
                                            //昨日佣金
                                            dataTable.getChildByName("zryj").getComponent("cc.Label").string = toFloat(ele.statement_income);
                                        }
                                    });
                                }
                            }
                            xhr3.abort();
                        };

                        // 请求团队总人数数据 测试时屏蔽
                        let urls
                        urls = gHandler.gameGlobal.proxy.proxy_host + `/proxy/user/GetProxyUserNumber?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&ids=[${gHandler.gameGlobal.player.account_name}]`
                        cc.log(urls);
                        let xhr4 = new XMLHttpRequest(); //readyState===0
                        xhr4.open("GET", urls, true); //readyState===1
                        xhr4.send(); //readyState===2
                        xhr4.onreadystatechange = () => {
                            if (xhr4.readyState == 4 && xhr4.status === 200) {
                                const res = JSON.parse(xhr4.responseText);
                                cc.log(url, "4444  GetProxyUserNumber 返回数据", res);
                                if (res.code === 200) {
                                    if (!res.msg) {
                                        dataTable.getChildByName("tdzwj").getComponent("cc.Label").string = '0';
                                    } else {
                                        //团队总玩家    
                                        dataTable.getChildByName("tdzwj").getComponent("cc.Label").string = '' + res.msg[0].count;
                                    }


                                }
                            }
                            xhr4.abort();
                        };

                    } else {
                        canvasScript.onMessagePrefabNeeded(null, "获取数据失败");
                        xhr.abort();
                    }
                }

            };
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        } else {
            dataTable = this.dataTable_all;
            let url = host + "/Proxy/User/login";
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                cc.log("------/Proxy/User/ xhr.status:", xhr.status);
                if (xhr.readyState == 4 && xhr.status === 200) {
                    var resData = JSON.parse(xhr.responseText);
                    cc.log("------/Proxy/User/login返回:", resData);
                    if (resData.code === 200) {
                        Database.balance = resData.msg.proxy_user.balance
                        commonVal.token = resData.msg.token;
                        console.log('p1 commonVal.token===',commonVal.token,'resData.msg.token==',resData.msg.token);
                        console.log('p1 id===',resData.msg.proxy_user.id);
                        cc.log('Database.balance ===', Database.balance);
                        if (gHandler.app.pinpai == 'fuxin' || gHandler.app.pinpai == 'juding' || gHandler.app.pinpai == 'huaxing' || gHandler.app.pinpai == 'ninetwo') {
                            console.log('7');
                            function a() {
                                cc.log('拿到了个人规则');
                            }
                            commonVal.GetBaseDividendRule(a)
                        }
                        if (gHandler.app.pinpai == 'juding' || gHandler.app.pinpai == 'huaxing' || gHandler.app.pinpai == 'test' || gHandler.app.pinpai == 'tianqi') {
                            console.log('8');
                            cc.log('拿新规则');
                            function a() {
                                cc.log('拿到了棋牌规则');
                            }
                            function b() {
                                cc.log('拿到了电子规则');
                            }
                            commonVal.jd_p9_GetBaseDividendRule(1, a)
                            commonVal.jd_p9_GetBaseDividendRule(5, b)
                        }
                        if (gHandler.app.pinpai == 'ninetwo') {
                            cc.log('拿新规则');
                            function a() {
                                cc.log('n2 拿到了棋牌规则');
                            }
                            function b() {
                                cc.log('n2 拿到了电子规则');
                            }
                            commonVal.n2_p9_GetBaseDividendRule(1, a)
                            commonVal.n2_p9_GetBaseDividendRule(5, b)
                        }
                        function check() {
                            return new Promise((resolve, reject) => {
                                commonVal.getDividendRule(account_name, resolve)//获取所有的规则
                                // commonVal.getallchilds(account_name) //请求所以下级功能
                            })
                        }
                        //type  1, 流水 2 亏损
                        // game_tag 游戏分类
                        // demand_type 统计类型(1.流失 2.亏损)
                        // demand_tag 统计类型方式(1.当前游戏分类 2.所有游戏分类)
                        check().then(//此处暂时不通
                            (value) => {
                                cc.log('value====', value)
                                if (value != [] && value != null) {
                                    for (let i = 0; i < value.length; i++) {
                                        if (gHandler.app.pinpai == 'fuxin' || gHandler.app.pinpai == 'juding') {

                                            if (value[i].type == 1) {
                                                cc.log('打开流水分红');
                                                this.btn8.active = true;
                                            }
                                            if (value[i].type == 2) {
                                                cc.log('打开亏损分红');
                                                this.btn5.active = true;

                                            }
                                            if (value[i].type == 3) {
                                                cc.log('打开亏损差分红');
                                                this.btn6.active = true;

                                            }
                                        } else if (gHandler.app.pinpai == 'ninetwo') {
                                            if (value[i].type == 1) {
                                                cc.log('NINETWO 打开流水分红');
                                                this.btn4.active = true;
                                            }

                                            if (value[i].type == 3) {
                                                cc.log(' NINE TWO 打开亏损差分红');
                                                this.btn6.active = false;

                                            }
                                        } else if (gHandler.app.pinpai != 'xinsheng') {
                                            if (value[i].type == 1) {
                                                cc.log('打开流水分红');
                                                this.btn4.active = true;
                                            }
                                            if (value[i].type == 2) {
                                                cc.log('打开亏损分红');
                                                this.btn5.active = true;

                                            }
                                            if (value[i].type == 3) {
                                                cc.log('打开亏损差分红');
                                                this.btn6.active = true;

                                            }
                                        } else if (gHandler.app.pinpai != 'huaxing') {
                                            if (value[i].type == 1) {
                                                cc.log('打开流水分红');
                                                this.btn4.active = true;
                                            }

                                            if (value[i].type == 3) {
                                                cc.log('打开亏损差分红');
                                                this.btn6.active = true;

                                            }
                                        } else if (gHandler.app.pinpai == 'test' || gHandler.app.pinpai == 'tianqi') {
                                            console.log('9');
                                            if (value[i].type == 1) {
                                                cc.log('打开流水分红');
                                                this.btn4.active = true;
                                            }

                                            if (value[i].type == 3) {
                                                cc.log('打开亏损差分红');
                                                this.btn6.active = true;

                                            }
                                        }
                                    }
                                }
                            }
                        )



                        //取得佣金余额
                        cc
                            .find("Canvas/baseView/home/page1/modal/balance/label")
                            .getComponent("cc.Label").string = Database.countCoinsShowLabel(resData.msg.proxy_user.balance);
                        //渲染表格数据
                        dataTable.getChildByName("label1").getComponent("cc.Label").string =
                            resData.msg.proxy_user.proxy_pid;
                        dataTable.getChildByName("label2").getComponent("cc.Label").string =
                            resData.msg.proxy_user.direct_number;
                        Database.zsxjwjzs = parseInt(resData.msg.proxy_user.direct_number)
                        //请求第三列数据
                        url =
                            host +
                            `/Proxy/User/getAggregation?account_name=${account_name}&ids=[${account_name}]&token=${resData.msg.token}`;
                        var xhr2 = new XMLHttpRequest(); //readyState===0
                        xhr2.onreadystatechange = () => {
                            if (xhr2.readyState == 4 && xhr2.status === 200) {
                                const res = JSON.parse(xhr2.responseText);
                                cc.log("getAggregation返回数据", res);
                                if (res.code === 200 && res.msg) {
                                    const { children } = res.msg[0];
                                    let player_sum = 0;
                                    for (const key in children) {
                                        player_sum += children[key];
                                    }
                                    dataTable
                                        .getChildByName("label3")
                                        .getComponent("cc.Label").string = player_sum;
                                }
                            }
                            xhr2.abort();
                        };
                        xhr2.open("GET", url, true); //readyState===1
                        xhr2.send(); //readyState===2
                        //服务器响应，正在接收响应ing readyState===3
                        //完成响应readyState===4

                        // 请求第四列数据
                        let url =
                            host +
                            `/Proxy/User/getProxyUserInductionListGroupByDate?account_name=${account_name}&page=1&limit=2&token=${resData.msg.token}`;
                        let xhr3 = new XMLHttpRequest(); //readyState===0
                        xhr3.open("GET", url, true); //readyState===1
                        xhr3.send(); //readyState===2
                        xhr3.onreadystatechange = () => {
                            if (xhr3.readyState == 4 && xhr3.status === 200) {
                                const res = JSON.parse(xhr3.responseText);
                                cc.log("getProxyUserInductionListGroupByDate返回数据", res);
                                if (res.code === 200 && res.msg) {
                                    let today = new Date();
                                    today.setDate(today.getDate() - 1);
                                    let month = today.getMonth() + 1;
                                    let day = today.getDate();
                                    let arr = res.msg.map((item) => {
                                        return {
                                            date: item.date.split("-").map(Number),
                                            statement_income: item.statement_income,
                                        };
                                    });
                                    cc.log(arr, "昨日日期", month, day);
                                    arr.forEach((ele) => {
                                        if (ele.date[1] === month && ele.date[2] === day) {
                                            dataTable
                                                .getChildByName("label4")
                                                .getComponent("cc.Label").string = toFloat(
                                                    ele.statement_income,
                                                );
                                        }
                                    });
                                }
                            }
                            xhr3.abort();
                        };
                    } else {
                        canvasScript.onMessagePrefabNeeded(null, "获取数据失败");
                    }
                }
                xhr.abort();
            };
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        }

        //测试登录用 需改ghandler account //889223867gHandler.gameGlobal.player.account_name  616417114 jd        671627403 qt  818123207 - 富鑫II顶级号
        // 671627403  91顶级号
        // 649506476  聚鼎顶级号

        // var sendData = `account_name=${485148506}&password=123456`;
        //正式 149672574
        var sendData = `account_name=${gHandler.gameGlobal.player.account_name}&token=${gHandler.gameGlobal.token}`


        cc.log('login sendData', host + "/Proxy/User/login", sendData);


        xhr.send(sendData);

        //添加直属下级玩家数点击事件
        let label2node;
        if (gHandler.app.pinpai == 'debi' || gHandler.app.pinpai == 'xinsheng' || gHandler.app.pinpai == 'fuxin' || gHandler.app.pinpai == 'yuyu' || gHandler.app.pinpai == 'xingui' || gHandler.app.pinpai == 'xinhao' || gHandler.app.pinpai == 'xinlong' || gHandler.app.pinpai == 'nineone' || gHandler.app.pinpai == 'huangshi' || gHandler.app.pinpai == 'juding' || gHandler.app.pinpai == 'huaxing' || gHandler.app.pinpai == 'ninetwo' || gHandler.app.pinpai == 'test' || gHandler.app.pinpai == 'tianqi') {
            console.log('10');
            label2node = dataTable.getChildByName("xjwjs");
        } else {
            label2node = dataTable.getChildByName("label2");
        }
        if (gHandler.app.pinpai != 'xingui' && gHandler.app.pinpai != 'xinsheng' && gHandler.app.pinpai != 'xinhao' && gHandler.app.pinpai == 'xinlong' && gHandler.app.pinpai == 'nineone' && gHandler.app.pinpai != 'huaxing' && gHandler.app.pinpai != 'ninetwo' && gHandler.app.pinpai != 'debi' && gHandler.app.pinpai != 'xingba' && gHandler.app.pinpai != 'tianqi') {
            var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = cc.find("Canvas/baseView/home/page1"); // 这个node节点是你的事件处理代码组件所属的节点
            clickEventHandler.component = "proxy-page1"; // 这个是代码文件名
            clickEventHandler.handler = "checkCustomers";
            clickEventHandler.customEventData = account_name;
            var button3 = label2node.getComponent(cc.Button);
            button3.clickEvents.push(clickEventHandler);
        }

    },


    //领取佣金 
    moveBalanceToGame: function () {
        //音效
        Database.clickSound(Database.hall_sound)
        if (Database.moveBalanceToGames) {
            Database.moveBalanceToGames = false
            var self = this;
            let balances = Math.floor(commonVal.balance * 100) / 100;
            let token = commonVal.token;
            // gHandler.gameGlobal.proxy.balance
            var canvasScript = cc.find("Canvas").getComponent("proxy-canvas");
            let currentBalance = parseFloat(
                self.node.getChildByName("middle").getChildByName("grid").getChildByName("yjye").getComponent("cc.Label").string
            );
            cc.log("moveBalanceToGame", balances, currentBalance);
            if (balances == 0 && currentBalance == 0) {
                //如果为0，返回消息，没有更多佣金啦
                //操作canvas JS组件脚本
                canvasScript.onMessagePrefabNeeded(null, "暂无可领取佣金，快去推广赚佣金吧！");
                Database.moveBalanceToGames = true

            } else {
                //此处用于限制 91 佣金小于50时不可领取
                let nineone_balances;
                if (typeof balances == 'undefined') {
                    nineone_balances = currentBalance
                } else {
                    nineone_balances = balances
                }

                if (gHandler.app.pinpai == 'nineone' && nineone_balances <= 0) {
                    //如果为0，返回消息，没有更多佣金啦
                    //操作canvas JS组件脚本
                    cc.log("佣金不足，快去推广赚佣金吧！");
                    canvasScript.onMessagePrefabNeeded(null, "佣金不足，快去推广赚佣金吧！");
                    Database.moveBalanceToGames = true
                } else {
                    //如果有佣金余额，则发送领取佣金请求
                    let url = gHandler.gameGlobal.proxy.proxy_host + "/Proxy/User/moveBalanceToGameUser";
                    var xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
                            var response = xhr.responseText;
                            var resData = JSON.parse(response);
                            cc.log("http data返回:", resData);

                            Database.moveBalanceToGames = true
                            if (resData.code === 200) {
                                if (typeof balances !== 'undefined') {
                                    if (gHandler.app.pinpai != 'ninetwo') {
                                        commonVal.p1_SaveEmailDetail(commonVal.account_name, balances)
                                    }

                                } else {
                                    if (gHandler.app.pinpai != 'ninetwo') {
                                        commonVal.p1_SaveEmailDetail(commonVal.account_name, currentBalance)
                                    }
                                }

                                canvasScript.onMessagePrefabNeeded(null, "领取成功");
                                Database.balance = 0
                                commonVal.balance = 0
                                //获取佣金余额
                                self.node.getChildByName("middle").getChildByName("grid").getChildByName("yjye").getComponent("cc.Label").string = "0.00";

                                if (gHandler.app.pinpai == 'fuxin' || gHandler.app.pinpai == 'yuyu' || gHandler.app.pinpai == 'juding' || gHandler.app.pinpai == 'huaxing' || gHandler.app.pinpai == 'ninetwo') {
                                    console.log('11');
                                    //获取佣金余额
                                    self.node.getChildByName("middle").getChildByName("rwer2").getChildByName("yjye").getComponent("cc.Label").string = "0.00";
                                    Database.balance = 0


                                }
                            } else {
                                canvasScript.onMessagePrefabNeeded(null, "领取失败");
                            }
                        }
                        xhr.abort();
                    };
                    xhr.open("POST", url, true);
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    // var sendData = JSON.stringify({
                    //   account_name,
                    //   token,
                    //   money: balance
                    // });
                    let sendData
                    if (typeof balances !== 'undefined') {

                        sendData = `account_name=${commonVal.account_name}&token=${token}&money=${balances}`;
                    } else {

                        sendData = `account_name=${commonVal.account_name}&token=${token}&money=${currentBalance}`;
                    }

                    cc.log("领取余额发送的数据:", sendData);
                    xhr.send(sendData);
                }
            }

        }


    },
    //查看详情
    lookDetails() {
        //音效
        Database.clickSound(Database.hall_sound)
        let p1_nowdate = Database.Sb_DATA(1);
        let start_date = Database.Sb_DATA(7);
        let str = Database.getUnixtimestamp0(start_date);
        let end = Database.getUnixtimestamp0(p1_nowdate);

        function check() {
            if (gHandler.app.pinpai == 'xinlong') {
                return new Promise((resolve, reject) => {
                    commonVal.GetProxyUserLinkstatement(str, end, resolve)
                })
            } else {
                return new Promise((resolve, reject) => {
                    commonVal.GetProxyUserLinkBet(str, end, resolve)
                })
            }



        }

        check().then(
            (value) => {
                cc.log('p1七天成功了');
                let seven_view = this.node.getChildByName("proxy-seven_fx");
                seven_view.active = true
                seven_view.getComponent('proxy1-seven').setview();
            },
            function (error) {
                cc.log("出错了", error);
            },


        )



    },
    //我的客户界面
    checkCustomers: function (e, id) {
        if (gHandler.app.pinpai == 'fuxin' || gHandler.app.pinpai == 'juding' || gHandler.app.pinpai == 'test') {
            console.log('2');
            return
        } else {
            // if (this.count < 3) {
            this.count++;
            cc.log(this.count, id);
            let myCustomers = cc.instantiate(this.myCustomers);
            //获取预制资源中的js组件，并作出相应操作
            let detailScript = myCustomers.getComponent("proxy-detailScript");
            //开始操作JS组件脚本
            detailScript.initMycustomers(id, this.count); //开始为JS组件进行初始化操作,setLabels 为自定义初始化方法
            //将预制资源添加到父节点
            cc.find("Canvas/baseView/home/page1/others").addChild(myCustomers);
            //   cc.log("checkCustomers,count", this.count);
            // }
        }

    },
    closeCheckCustomers: function () {
        this.count--;
        let others = cc.find("Canvas/baseView/home/page1/others");
        cc.log("closeCheckCustomers,count", this.count);
        //因为次级客户表格和三级客户表格在关闭时不需要显示basePage,所以单独判断
        if (others.getChildByName("myCustomers")) {
            others.getChildByName("myCustomers").destroy();
        }
        if (this.count === 0) {
            cc.find("Canvas/baseView/home/page1").active = true;
        }
    },
    //弹出转账界面
    popup_transfermoney_modal: function (e, id) {
        this.node
            .getChildByName("modal")
            .getChildByName("user")
            .getChildByName("label")
            .getComponent("cc.Label").string = id;
        this.node.getChildByName("popup").active = true;
        this.node.getChildByName("modal").active = true;
    },
    close_transfermoney_modal: function () {
        this.node.getChildByName("popup").active = false;
        this.node.getChildByName("modal").active = false;
    },
    transfermoney: function () {
        let host = gHandler.gameGlobal.proxy.proxy_host;
        let id = parseInt(
            this.node
                .getChildByName("modal")
                .getChildByName("user")
                .getChildByName("label")
                .getComponent("cc.Label").string,
        );
        let canvasScript = cc.find("Canvas").getComponent("proxy-canvas");
        let money = this.node
            .getChildByName("modal")
            .getChildByName("input")
            .getChildByName("New EditBox")
            .getComponent(cc.EditBox).string;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", host + "/proxy/user/moveBalanceToProxy", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var sendData = `platform_key=123456&account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&money=${money}&id=${id}`;
        cc.log("/proxy/user/moveBalanceToProxy请求:", sendData);
        xhr.send(sendData);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status === 200) {
                var resData = JSON.parse(xhr.responseText);
                cc.log("/proxy/user/moveBalanceToProxy返回:", resData);
                if (resData.code === 200) {
                    canvasScript.onMessagePrefabNeeded(null, "转账成功");
                    cc
                        .find("Canvas/baseView/home/page1/modal/balance/label")
                        .getComponent("cc.Label").string = resData.msg.balance.toFixed(2);
                } else {
                    canvasScript.onMessagePrefabNeeded(null, "转账失败");
                }
            }
            xhr.abort();
        };
        this.node
            .getChildByName("modal")
            .getChildByName("input")
            .getChildByName("New EditBox")
            .getComponent(cc.EditBox).string = "";
    },
    //调出IM窗口
    popupIM() {
        //音效
        Database.clickSound(Database.hall_sound)
        var canvasScript = cc.find("Canvas").getComponent("proxy-canvas");
        canvasScript.onMessagePrefabNeeded(null, "跳转中...");
        let im_host = gHandler.gameGlobal.im_host;
        let url = `${im_host}/im/api/universalAgent`;
        let reqData = {
            user_id: gHandler.gameGlobal.player.id.toString(),
            token: "c7a9d6g21v87s",
            user_ip: gHandler.gameGlobal.ipList[0],
            user_ping: "-",
        };
        //url链接地址
        reqData.user_link =
            gHandler.gameGlobal.proxy.temp_host +
            "/?p=" +
            gHandler.gameGlobal.proxy.package_id +
            "&u=" +
            gHandler.gameGlobal.player.account_name +
            "&m=" +
            gHandler.gameGlobal.huanjin;
        if (gHandler.gameGlobal) {
            let huanjin = gHandler.gameGlobal.huanjin;
            if (huanjin == "online") {
                reqData.user_link =
                    gHandler.gameGlobal.proxy.temp_host +
                    "/?p=" +
                    gHandler.gameGlobal.proxy.package_id +
                    "&u=" +
                    gHandler.gameGlobal.player.account_name;
            }
        }
        var xhr = new XMLHttpRequest(); //readyState===0
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status === 200) {
                cc.log("IM调出接口返回数据：", JSON.parse(xhr.responseText));
                const res = JSON.parse(xhr.responseText);
                if (
                    res.code === 0
                    // && gHandler.gameGlobal.im_host != ""
                ) {

                    gHandler.gameGlobal.imReceive = 0;
                    gHandler.reflect && gHandler.reflect.setOrientation("portrait", 750, 1334);
                    cc.director.loadScene(gHandler.subModel.im.lanchscene);
                } else {
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "操作失败!")
                    // canvasScript.onMessagePrefabNeeded(null, res.msg || "操作失败");
                }
            } else if (xhr.status !== 200) {
                cc.log(xhr.statusText);
            }
            xhr.abort();
        };
        let ret = "";
        for (let it in reqData) {
            ret += encodeURIComponent(it) + "=" + encodeURIComponent(reqData[it]) + "&";
        }
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        cc.log("客服接口的请求数据:", reqData);
        xhr.send(ret);
    },
    //保存二维码按钮事件
    saveQRcode() {
        //音效
        Database.clickSound(Database.hall_sound)
        //保存功能
        cc.log("saveQRcodeAction");

        //保存功能
        if (cc.sys.os == cc.sys.OS_IOS) {
            cc.log("ios tragger");
            let targetNode;
            for (let i = 1; i < 4; i++) {
                if (cc.find(`Canvas/baseView/templatePage/img${i}/yjfx_gouxuan`).active) {
                    targetNode = cc.find(`Canvas/baseView/templatePage/img${i}`);
                }
            }
            targetNode.getChildByName("yjfx_gouxuan").active = false;
            this.screenShot(targetNode);
            this.timer = setTimeout(() => {
                targetNode.getChildByName("yjfx_gouxuan").active = true;
            }, 100);
        } else {
            let isPermitted = gHandler.reflect && gHandler.reflect.getPermission();
            if (isPermitted) {
                let targetNode;
                for (let i = 1; i < 4; i++) {
                    if (cc.find(`Canvas/baseView/templatePage/img${i}/yjfx_gouxuan`).active) {
                        targetNode = cc.find(`Canvas/baseView/templatePage/img${i}`);
                    }
                }
                targetNode.getChildByName("yjfx_gouxuan").active = false;
                this.screenShot(targetNode);
                this.timer = setTimeout(() => {
                    targetNode.getChildByName("yjfx_gouxuan").active = true;
                }, 100);
            }
        }
    },
    onPopupClose: function (e) {
        //音效
        Database.clickSound(Database.hall_sound)
        this.node.getChildByName("popup").active = !this.node.getChildByName("popup").active;
        this.node.getChildByName("guide").active = !this.node.getChildByName("guide").active;
    },
    onMobanPopupClose: function (e) {
        //音效
        Database.clickSound(Database.hall_sound)
        if (cc.find("Canvas/baseView/templatePage").active == false && Database.a_num == 0) {
            //根据package_id使用不同的图片模板
            // switch (gHandler.gameGlobal.proxy.package_id) {
            //     case 1:
            //         for (let i = 4; i < 7; i++) {
            //             cc.resources.load(`/proxy/language/CN/proxy-${i}`, cc.SpriteFrame, function (
            //                 err,
            //                 spriteFrame,
            //             ) {
            //                 cc.find(`Canvas/baseView/templatePage/img${i}/yjfx_gouxuan`);
            //                 cc
            //                     .find(`Canvas/baseView/templatePage/img${i - 3}`)
            //                     .getComponent(cc.Sprite).spriteFrame = spriteFrame;
            //             });
            //         }
            //         cc.resources.load(`/proxy/language/CN/yjfx_logo_test`, cc.SpriteFrame, function (
            //             err,
            //             spriteFrame,
            //         ) {
            //             for (let i = 1; i < 4; i++) {
            //                 cc
            //                     .find(`Canvas/baseView/templatePage/img${i}/yjfx_logo_db`)
            //                     .getComponent(cc.Sprite).spriteFrame = spriteFrame;
            //             }
            //         });
            //         break;
            //     case 2:
            //         cc.resources.load(`/proxy/language/CN/yjfx_logo_db`, cc.SpriteFrame, function (
            //             err,
            //             spriteFrame,
            //         ) {
            //             for (let i = 1; i < 4; i++) {
            //                 cc
            //                     .find(`Canvas/baseView/templatePage/img${i}/yjfx_logo_db`)
            //                     .getComponent(cc.Sprite).spriteFrame = spriteFrame;
            //             }
            //         });
            //         break;
            //     default:
            //         break;
            // }
            Database.a_num++;
            cc.log('绘制二维码', this.myURL)
            //绘制模板图片中的二维码
            var qrcodes = [];
            for (let i = 1; i < 4; i++) {
                qrcodes[i] = cc.find(`Canvas/baseView/templatePage/img${i}/qrcode`);
                qrcodes[i].active = true
                this.QRCreate(qrcodes[i].addComponent(cc.Graphics), this.myURL);
            }
        }

        cc.find("Canvas/baseView/templatePage").active = !cc.find("Canvas/baseView/templatePage").active;
    },

    onTemplateImgBeClicked(e, num) {
        if (this.acc) {
            this.acc = false
            for (let i = 1; i < 4; i++) {
                cc.find(`Canvas/baseView/templatePage/img${i}/yjfx_gouxuan`).active = false;
            }
            cc.find(`Canvas/baseView/templatePage/img${num}/yjfx_gouxuan`).active = true;
            this.scheduleOnce(() => {
                this.acc = true
            }, 0.4)
        }

    },
    init(url) {
        cc.log("initurl begin!!!", url);
        var qrcode0 = this.node
            .getChildByName("bottom")
            .getChildByName("qrImage")
            .getChildByName("qrcode");
        //注意 最好把qrImage与qrcode的节点长宽设置为2的倍数。不然可能会出现无法识别二维码
        var ctx = qrcode0.addComponent(cc.Graphics);
        if (typeof url !== "string") {
            cc.log("url is not string", url);
            return;
        }
        this.QRCreate(ctx, url);
    },
    QRCreate(ctx, url) {
        var self = this.node
            .getChildByName("bottom")
            .getChildByName("qrImage")
            .getChildByName("qrcode");
        cc.log("QRcreate start!!", ctx, url);
        var qrcode = new QRCode(-1, QRErrorCorrectLevel.H);
        qrcode.addData(url);
        qrcode.make();

        ctx.fillColor = cc.Color.BLACK;
        //块宽高
        var tileW = self.width / qrcode.getModuleCount();
        var tileH = self.height / qrcode.getModuleCount();
        cc.log('tileW=', tileW, 'tileH', tileH);
        // draw in the Graphics
        for (var row = 0; row < qrcode.getModuleCount(); row++) {
            for (var col = 0; col < qrcode.getModuleCount(); col++) {
                if (qrcode.isDark(row, col)) {
                    // ctx.fillColor = cc.Color.BLACK;
                    var w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW);
                    var h = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW);
                    ctx.rect(Math.round(col * tileW), Math.round(row * tileH), w, h);
                    ctx.fill();
                }
            }
        }
    },
    screenShot(target, fileName) {
        cc.log("screenShot start!", target, fileName);
        var canvasScript = cc.find("Canvas").getComponent("proxy-canvas");
        let gl = cc.game._renderContext; // gl.STENCIL_INDEX8 质量较高  gl.DEPTH_STENCIL 质量较低
        let render = new cc.RenderTexture();
        render.initWithSize(
            Math.floor(cc.visibleRect.width),
            Math.floor(cc.visibleRect.height),
            gl.DEPTH_STENCIL,
        );
        cc.Camera.main.targetTexture = render;
        let scaleAction = cc.scaleTo(0.5, 0.3);
        let targetPos = cc.v2(
            cc.visibleRect.width - cc.visibleRect.width / 6,
            cc.visibleRect.height / 4,
        );
        let moveAction = cc.moveTo(0.5, targetPos);
        let spawn = cc.spawn(scaleAction, moveAction);
        let node = new cc.Node();
        node.setPosition(
            cc.v2(cc.visibleRect.width / 2, cc.visibleRect.height / 2),
            // cc.v2(660,130)
        );
        node.zIndex = cc.macro.MAX_ZINDEX;
        node.on(cc.Node.EventType.TOUCH_START, () => {
            node.parent = null;
            node.destroy();
        });
        var date = new Date().getTime();
        var fileName = fileName || `cocosScreenShot${date}.png`;
        if (CC_JSB) {
            //路径的问题
            // var fullPath = jsb.fileUtils.getWritablePath() + fileName;
            // if (Environment && Environment.getExternalStorageDirectory()) {
            //   fullPath = Environment.getExternalStorageDirectory() + "/" + fileName;
            // } else {
            var fullPath = "/storage/emulated/0/" + fileName;
            if (cc.sys.os == cc.sys.OS_IOS) {
                fullPath = jsb.fileUtils.getWritablePath() + fileName;
            }
            // }
            // if (jsb.fileUtils.isFileExist(fullPath)) {
            //   jsb.fileUtils.removeFile(fullPath)
            // }
            target
                .getChildByName("qrcode")
                .getComponent(cc.Graphics)
                .scheduleOnce(
                    () => {
                        cc.Camera.main.targetTexture = null;
                        cc.log("这里是target.node！！", target);
                        // let qrcode = target.node.getParent()
                        let qrcodepos = cc.v3();
                        target.getWorldPosition(qrcodepos);
                        let data = render.readPixels(
                            null,
                            qrcodepos.x - 400 / 2,
                            qrcodepos.y - 400 / 2,
                            400,
                            400,
                        );
                        // let data = render.readPixels(null, 660, 108, 200, 200);
                        // let width = render.width;
                        // let height = render.height;
                        let width = 400;
                        let height = 400;
                        let picData = new Uint8Array(width * height * 4);
                        let rowBytes = width * 4;
                        for (let row = 0; row < height; row++) {
                            let srow = height - 1 - row;
                            let start = srow * width * 4;
                            let reStart = row * width * 4;
                            for (let i = 0; i < rowBytes; i++) {
                                picData[reStart + i] = data[start + i];
                            }
                        }
                        cc.log(picData);
                        let success = jsb.saveImageData(picData, width, height, fullPath);
                        cc.log(success);
                        if (success) {
                            cc.log("save image data success, file: " + fullPath);
                            gHandler.reflect && gHandler.reflect.saveTextureToLocal(fullPath);
                            // canvasScript.onMessagePrefabNeeded(null, "保存二维码到相册成功!");
                            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "保存二维码到相册成功!")
                        } else {
                            cc.error("save image data failed!" + fullPath);
                            // canvasScript.onMessagePrefabNeeded(null, "保存二维码到相册失败!");
                            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "保存二维码到相册失败!")
                        }
                        return;
                        // let texture = new cc.Texture2D();
                        // texture.initWithData(picData, 32, width, height);
                        // let spriteFrame = new cc.SpriteFrame();
                        // spriteFrame.setTexture(texture);
                        // let sprite = node.addComponent(cc.Sprite);
                        // sprite.spriteFrame = spriteFrame;
                        // node.parent = cc.director.getScene();
                        // node.runAction(spawn);
                    },
                    0,
                    0,
                );
        } else {
            return;
        }
    },
    onDestroy() {
        clearTimeout(this.timer);
    },
    onDisable() {
        cc.find("Canvas/baseView/home/page1/others").removeAllChildren();
    },
    ceshi() {
        commonVal.SaveEmailDetail(123123, 500)
    },

    // update() {
    //     let curDR;

    //     var cvs = cc.find('Canvas').getComponent(cc.Canvas);
    //     //保存原始设计分辨率，供屏幕大小变化时使用
    //     if (!curDR) {
    //         curDR = cvs.designResolution;
    //     }
    //     var dr = curDR;
    //     var s = cc.view.getFrameSize();
    //     var rw = s.width;
    //     var rh = s.height;

    //     if ((rw / rh) > (dr.width / dr.height)) {
    //         this.fk_node.getChildByName('leftSide').getChildByName('btn_box').scaleY = (rw / rh) / (dr.width / dr.height)
    //         //!#zh: 是否优先将设计分辨率高度撑满视图高度。 */
    //         cvs.fitHeight = true;
    //         //如果更长，则用定高
    //     } else {
    //         /*!#zh: 是否优先将设计分辨率宽度撑满视图宽度。 */
    //         cvs.fitWidth = true;
    //     }




    // },
});
