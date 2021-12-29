var Database = require("./public_script/Database");
let gHandler = require("gHandler");
// let toFloat = require("./proxy-changeFloat");
let commonVal = require("./public_script/proxy-http");

cc.Class({
    extends: cc.Component,

    properties: {
        Item: { //棋牌表格
            default: null,
            type: cc.Node,
        },

        pageItem: { //页码预制体类型节点
            default: null,
            type: cc.Node,
        },

        sv: { //滑动展示
            default: null,
            type: cc.ScrollView,
        },

        totalPage: { //总页数
            default: null,
            type: cc.Label,
        },
        nowdate: { //当前时间
            default: null,
            type: cc.Label,
        },
        pageLayout: { //页码数
            default: null,
            type: cc.Node,
        },
        mid: { //中间遮盖
            default: null,
            type: cc.Node,
        },


        jumpIndex: { //跳转页面
            default: null,
            type: cc.Label,
        },
        firstdate: { //开始查询时间
            default: null,
            type: cc.Label,
        },
        enddate: { //结束查询时间
            default: null,
            type: cc.Label,
        },
        xjbl_btn: { //直属明细按钮
            default: null,
            type: cc.Node,
        },
        DzItem: { //电子棋牌表格
            default: null,
            type: cc.Node,
        },
        Bl_btn: {//比例按钮
            default: null,
            type: cc.Node,
        },
        QP_tittle: {//表格抬头
            default: null,
            type: cc.Node,

        },
        wddy: {//我的待遇
            default: null,
            type: cc.Node,
        },
        gssm: {//公式说明
            default: null,
            type: cc.Node,
        },
        pageNodes: [],
        p10_nowdate: '',
        page10_game_tag: 0,
        page10_btn:true,


    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        if (gHandler.app.pinpai == 'ninetwo') {

            let status = this.node.getChildByName("btn_search");
            status.active = false

        } else {
            //显示对应二级菜单栏 //game_tag 游戏分类1  棋牌类型游戏 2. 彩票类型游戏 3. 体育类型游戏   4. 视讯类型游戏
            let game_1 = this.node.getChildByName('banner').getChildByName('Newlay').getChildByName('qp')
            //    let game_2 = this.node.getChildByName('banner').getChildByName('Newlay').getChildByName('cp')
            //    let game_3 = this.node.getChildByName('banner').getChildByName('Newlay').getChildByName('ty')
            let game_5 = this.node.getChildByName('banner').getChildByName('Newlay').getChildByName('dz')
            //    game_1.active = false
            //    game_2.active = false
            //    game_3.active = false
            game_5.active = false

            for (let i = 0; i < Database.game_tag.length; i++) {
                if (Database.game_tag[i] == 1) {
                    game_1.active = true

                }
                if (Database.game_tag[i] == 5) {
                    game_5.active = true

                }
                //    if (Database.game_tag[i] == 3) {

                //        game_3.active = true

                //    }
                //    if (Database.game_tag[i] == 4) {

                //        game_4.active = true
                //    }

            }
            if (gHandler.app.pinpai == 'juding' || gHandler.app.pinpai == 'huaxing') {
                game_5.active = true
            }
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            this.nowdate.string = year + "/" + month + '/' + day;
            if (day < 10) {
                day = '0' + day
            }
            if (month < 10) {
                month = '0' + month;
            }
            this.p10_nowdate = year + "-" + month + '-' + day;


        }


    },
    search_p10(event, num) {
        //每次请求数据先重置
        //表示棋牌电子都请求完了
        //q总业绩
        Database.n2_zyj_qp = 0
        //q直属业绩
        Database.n2_zsyj_qp10 = 0
        //q团队业绩
        Database.n2_tdyj_qp10 = 0
        //q总返佣
        Database.n2_fy_qp = 0

        //d总业绩
        Database.n2_zyj_dz = 0
        //d直属业绩
        Database.n2_zsyj_dz10 = 0
        //q团队业绩
        Database.n2_tdyj_dz10 = 0
        //q总返佣
        Database.n2_fy_dz = 0


        //抬头节点
        let tittle = this.node.getChildByName('yjcx_form').getChildByName('tittle_content');
        //t总业绩
        let tit_zye = tittle.getChildByName('zyj').getComponent("cc.Label")
        //t直属业绩
        let tit_zsyj = tittle.getChildByName('zsyj').getComponent("cc.Label")
        //t总返佣
        let tit_zfy = tittle.getChildByName('zfy').getComponent("cc.Label")
        //t团队业绩
        let tit_tdyj = tittle.getChildByName('tdyj').getComponent("cc.Label")
        //棋牌
        let qp_tittle = this.node.getChildByName('yjcx_form').getChildByName('qp_content');
        //q总业绩
        let q_zye = qp_tittle.getChildByName('zyj').getComponent("cc.Label")
        //q直属业绩
        let q_zsyj = qp_tittle.getChildByName('zsyj').getComponent("cc.Label")
        //q总返佣
        let q_zfy = qp_tittle.getChildByName('fy').getComponent("cc.Label")
        //q团队业绩
        let q_tdyj = qp_tittle.getChildByName('tdyj').getComponent("cc.Label")

        //电子
        let dz_tittle = this.node.getChildByName('yjcx_form').getChildByName('dz_content');
        //d总业绩
        let d_zye = dz_tittle.getChildByName('zyj').getComponent("cc.Label")
        //d直属业绩
        let d_zsyj = dz_tittle.getChildByName('zsyj').getComponent("cc.Label")
        //d总返佣
        let d_zfy = dz_tittle.getChildByName('fy').getComponent("cc.Label")
        //q团队业绩
        let d_tdyj = dz_tittle.getChildByName('tdyj').getComponent("cc.Label")
        //查询日期状态


        let status = this.node.getChildByName("btn_search");
        status.active = false;


        let data_type = this.node.getChildByName("btn_choose").getChildByName('date').getComponent("cc.Label");
        if (num == 0) {
            data_type.string = '今日预估'
        } else if (num == -1) {
            data_type.string = '昨天'
        } else if (num == 'week') {
            data_type.string = '本周'
        } else if (num == 'lastweek') {
            data_type.string = '上周'
        } else if (num == 'month') {
            data_type.string = '本月'
        }


        const promise1 = new Promise((resolve) => {
            //先 棋牌 num 表示 日期进度
            commonVal.n2_today_GetBaseDividendInfo2_p10(num, resolve, 1)
        });
        const promise2 = new Promise((resolve) => {
            // 电子 num 表示 日期进度
            commonVal.n2_today_GetBaseDividendInfo2_p10(num, resolve, 5)
        });
        Promise.all([promise1, promise2]).then((values) => {
         
            //表示棋牌电子都请求完了
            //q总业绩
            q_zye.string = Math.floor(parseFloat(Database.n2_zyj_qp) * 100) / 100 + ''
            //q直属业绩
            q_zsyj.string = Math.floor(parseFloat(Database.n2_zsyj_qp10) * 100) / 100 + ''
            //q团队业绩
            q_tdyj.string = Math.floor(parseFloat(Database.n2_tdyj_qp10) * 100) / 100 + ''


            //q总返佣
            q_zfy.string = Math.floor(parseFloat(Database.n2_fy_qp) * 100) / 100 + ''


            //d总业绩
            d_zye.string = Math.floor(parseFloat(Database.n2_zyj_dz) * 100) / 100 + ''

            //d直属业绩
            d_zsyj.string = Math.floor(parseFloat(Database.n2_zsyj_dz10) * 100) / 100 + ''


            //d团队业绩
            d_tdyj.string = Math.floor(parseFloat(Database.n2_tdyj_dz10) * 100) / 100 + ''


            //q总返佣
            d_zfy.string = Math.floor(parseFloat(Database.n2_fy_dz) * 100) / 100 + ''

            //tit总业绩
            tit_zye.string = Math.floor((parseFloat(Database.n2_zyj_dz) + parseFloat(Database.n2_zyj_qp)) * 100) / 100 + ''

            //tit直属业绩
            tit_zsyj.string = Math.floor((parseFloat(Database.n2_zsyj_qp10) + parseFloat(Database.n2_zsyj_dz10)) * 100) / 100 + ''


            //tit团队业绩
            tit_tdyj.string = Math.floor((parseFloat(Database.n2_tdyj_dz10) + parseFloat(Database.n2_tdyj_qp10)) * 100) / 100 + ''


            //tit总返佣
            tit_zfy.string = Math.floor((parseFloat(Database.n2_fy_dz) + parseFloat(Database.n2_fy_qp)) * 100) / 100 + ''



        })



    },
    checkMyAgent(event, num) {
        if (gHandler.app.pinpai == 'ninetwo') {
            if (this.page10_btn) {
                this.page10_btn = false
                this.scheduleOnce(() => {
                    // 这里的 this 指向 component
                    this.page10_btn = true
                }, 0.6);
                if (Database.loadview != null) {
                    Database.loadview.active = true;
                }
                this.scheduleOnce(() => {
                    // 这里的 this 指向 component
                    Database.loadview.active = false;
                }, 1);
                this.search_p10(0, 0) // 默认是今天
            }


        } else {
            if (gHandler.app.pinpai == 'huaxing' && Database.loadview != null) {
                Database.loadview.active = true;
                this.scheduleOnce(() => {
                    // 这里的 this 指向 component
                    Database.loadview.active = false;
                }, 1);
            }
            //音效
            this.wddy.active = false
            Database.clickSound(Database.hall_sound)
            Database.page = 1;//每次调用都将滑动事件重置为1
            this.xjbl_btn.active = false;
            commonVal.demand_type = 1;
            commonVal.gametags = parseInt(num)
            cc.log('进入 第十页 第', commonVal.gametags, '游戏', 'token', commonVal.token);
            Database.p10_num = num;
            if (gHandler.app.pinpai == 'juding' || gHandler.app.pinpai == 'huaxing') {

                function A() {
                    cc.log('请求规则');
                }
                commonVal.jd_p9_GetBaseDividendRule(num, A)
                if (num == 1) {
                    this.page10_game_tag = num;


                    //先换图和抬头 棋牌类 关闭显示
                    this.Bl_btn.getChildByName("agent_btn_txt_webl").active = false
                    this.QP_tittle.getChildByName("agent-profit6-frameTitle").active = false
                    //电子类开启现实
                    this.Bl_btn.getChildByName("agent_btn_txt_wddy").active = true
                    this.QP_tittle.getChildByName("agent-profit4-frameTitle").active = true
                    //更换抬头标签
                    let game_1 = this.node.getChildByName('banner').getChildByName('Newlay').getChildByName('qp').getChildByName('qp_di')
                    game_1.active = true
                    let game_5 = this.node.getChildByName('banner').getChildByName('Newlay').getChildByName('dz').getChildByName('dz_di')
                    game_5.active = false
                    //请求数据
                    let first_date_p10 = Database.Sb_DATA(1);//默认获取前1天
                    let last_date_p10 = this.p10_nowdate;
                    function check() {
                        return new Promise((resolve, reject) => {
                            commonVal.jd_GetBaseDividendInfo(first_date_p10, last_date_p10, 1, resolve)
                        })
                    }
                    check().then(
                        (value) => {
                            if (gHandler.app.pinpai == 'huaxing' && Database.loadview != null) {
                                Database.loadview.active = false;
                            }

                            this.data = Database.getData10();

                            this.currentPage = 1; //当前页码
                            this.minPage = 1; //最小页码
                            this.maxPage = Math.ceil(this.data.length / 10); //最大页码
                            this.totalPage.string = "共 " + this.maxPage + " 页";
                            this.setPageData();

                            this.setPageIndex();
                        }
                    )


                }
                if (num == 5) {
                    this.page10_game_tag = num;

                    //先换图和抬头 棋牌类 关闭显示
                    this.Bl_btn.getChildByName("agent_btn_txt_webl").active = false
                    this.QP_tittle.getChildByName("agent-profit6-frameTitle").active = false
                    //电子类开启现实
                    this.Bl_btn.getChildByName("agent_btn_txt_wddy").active = true
                    this.QP_tittle.getChildByName("agent-profit4-frameTitle").active = true
                    //更换抬头标签
                    let game_1 = this.node.getChildByName('banner').getChildByName('Newlay').getChildByName('qp').getChildByName('qp_di')
                    game_1.active = false
                    let game_5 = this.node.getChildByName('banner').getChildByName('Newlay').getChildByName('dz').getChildByName('dz_di')
                    game_5.active = true
                    //请求数据
                    let first_date_p10 = Database.Sb_DATA(1);//默认获取前1天
                    let last_date_p10 = this.p10_nowdate;
                    function check() {
                        return new Promise((resolve, reject) => {
                            commonVal.jd_GetBaseDividendInfo(first_date_p10, last_date_p10, 5, resolve)
                        })
                    }
                    check().then(
                        (value) => {

                            if (gHandler.app.pinpai == 'huaxing' && Database.loadview != null) {
                                Database.loadview.active = false;
                            }
                            this.data = Database.getData10();

                            this.currentPage = 1; //当前页码
                            this.minPage = 1; //最小页码
                            this.maxPage = Math.ceil(this.data.length / 10); //最大页码
                            this.totalPage.string = "共 " + this.maxPage + " 页";
                            this.setPageData();

                            this.setPageIndex();
                        }
                    )


                }
            } else {
                if (num == 1) {
                    this.page10_game_tag = num;
                    Database.p10_num = num;

                    //先换图和抬头 棋牌类 关闭显示
                    this.Bl_btn.getChildByName("agent_btn_txt_webl").active = false
                    this.QP_tittle.getChildByName("agent-profit6-frameTitle").active = false
                    //电子类开启现实
                    this.Bl_btn.getChildByName("agent_btn_txt_wddy").active = true
                    this.QP_tittle.getChildByName("agent-profit4-frameTitle").active = true
                    //更换抬头标签
                    let game_1 = this.node.getChildByName('banner').getChildByName('Newlay').getChildByName('qp').getChildByName('qp_di')
                    game_1.active = true
                    let game_5 = this.node.getChildByName('banner').getChildByName('Newlay').getChildByName('dz').getChildByName('dz_di')
                    game_5.active = false
                    //请求数据
                    let first_date_p10 = Database.Sb_DATA(1);//默认获取前1天
                    let last_date_p10 = this.p10_nowdate;
                    function check() {
                        return new Promise((resolve, reject) => {
                            commonVal.GetBaseDividendInfo(first_date_p10, last_date_p10, resolve)
                        })
                    }
                    check().then(
                        (value) => {


                            this.data = Database.getData10();

                            this.currentPage = 1; //当前页码
                            this.minPage = 1; //最小页码
                            this.maxPage = Math.ceil(this.data.length / 10); //最大页码
                            this.totalPage.string = "共 " + this.maxPage + " 页";
                            this.setPageData();

                            this.setPageIndex();
                        }
                    )


                }
            }
        }




    },
    setalldata() {
        Database.ttpnums = 0
        // 团队总业绩 直属玩家业绩 团队返佣 直属返佣 我的返佣
        cc.find("bottom/qplabel", this.node).active = false;
        cc.find("bottom/dzlabel", this.node).active = true;

        let data = Database.getData10();
        let wdxj = Database.wxd;
        //团队总业绩
        let tdzyj = 0;
        //直属玩家业绩
        let zswjyj = 0;
        //团队返佣
        let tdfy = 0;
        //直属返佣
        let zsfy = 0;
        //我的返佣
        let wdfy = 0;
        let num = Database.p10_num
        // 团队总业绩：  第一条记录（id=查询ID）的 amount 字段， 前端显示  需要用这个字段的值 x80%， 显示的值为 490000x80%= 392000, 计算结果前端只截取显示整数部分

        // 团队返佣：  第一条记录（id=查询ID）的 money 字段， 显示的值为 13328

        // 直属返佣： 除第一条记录外的 money 字段 之和 ， 960+6960+3360= 11280

        // 我的返佣： 团队返佣 - 直属返佣


        cc.log('设置页面合集');
        for (let i = 0; i < data.length; i++) {
            let ids = [] //给中心服传
            //团队总业绩
            tdzyj += parseFloat(data[i].amount)
            //团队返佣
            tdfy += parseFloat(data[i].money)
            //计算直属返佣
            for (let s = 0; s < wdxj.length; s++) {
                if (wdxj[s].date == data[i].date) {
                    zsfy += wdxj[s].money
                    ids.push(wdxj[s].id)
                }

            }
            //我的反佣
            wdfy = parseFloat(tdfy) - parseFloat(zsfy)
            cc.log('我的返佣合计==', wdfy, 'tdfy', tdfy, 'zsfy', zsfy)
            function check() {

                return new Promise((resolve, reject) => {
                    if (gHandler.app.pinpai == 'juding' || gHandler.app.pinpai == 'huaxing') {
                        //直属玩家业绩 
                        commonVal.jd_GetGameUserInductions(ids, i, data.length, data[i].date, num, resolve)
                    } else {
                        //直属玩家业绩 
                        commonVal.GetGameUserInductions(ids, i, data.length, data[i].date, resolve)
                    }

                })


            }
            check().then(
                (values) => {
                    Database.ttpnums++
                    if (Database.ttpnums == Database.data10.length) {
                        for (let i = 0; i < Database.data10.length; i++) {
                            if (Database.data10[i].zswjyj != undefined) {
                                data[i].zswjyj = Database.data10[i].zswjyj
                                zswjyj += parseFloat(data[i].zswjyj)
                            } else {
                                data[i].zswjyj = 0
                                zswjyj += 0
                            }


                        }


                        //团队总业绩 
                        cc.find("bottom/dzlabel/Label6", this.node).getComponent(cc.Label).string = Database.countCoinsShowLabel(tdzyj) + '';
                        //直属玩家业绩 
                        if (zswjyj) {
                            cc.find("bottom/dzlabel/Label7", this.node).getComponent(cc.Label).string = Database.countCoinsShowLabel(zswjyj);
                        } else {
                            cc.find("bottom/dzlabel/Label7", this.node).getComponent(cc.Label).string = '0'
                        }

                        //团队返佣 
                        cc.find("bottom/dzlabel/Label8", this.node).getComponent(cc.Label).string = Database.countCoinsShowLabel(tdfy);
                        //直属返佣
                        cc.find("bottom/dzlabel/Label9", this.node).getComponent(cc.Label).string = Database.countCoinsShowLabel(zsfy);
                        // 我的返佣
                        cc.find("bottom/dzlabel/Label10", this.node).getComponent(cc.Label).string = Database.countCoinsShowLabel(wdfy);
                    }

                })


        }



    },
    //设置页面数据
    setPageData() {
        cc.log('this.currentPage', this.currentPage);
        //this.data 是所有的个人信息 也就是每个日期的第一条数据
        let endIndex = this.currentPage * 10;
        endIndex = endIndex > this.data.length ? this.data.length : endIndex;
        let startIndex = (this.currentPage - 1) * 10
        this.sv.content.removeAllChildren();
        this.sv.scrollToTop();
        //本页合计数据

        //团队总业绩
        let tdzyj = 0;
        //直属玩家业绩
        let zswjyj = 0;
        //团队返佣
        let tdfy = 0;
        //直属返佣
        let zsfy = 0;
        //我的返佣
        let wdfy = 0;

        //用所有数据来算数据{11:[{},{}],12:[{},{}]}
        let wdxj = Database.wxd
        let data = Database.getData10();
        Database.ttpnum = startIndex;//重制标记
        for (var i = startIndex; i < endIndex; ++i) {

            let ids = [] //给中心服传
            //团队总业绩
            tdzyj += parseFloat(data[i].amount)
            //团队返佣
            tdfy += parseFloat(data[i].money)
            for (let s = 0; s < wdxj.length; s++) {
                if (wdxj[s].date == data[i].date) {
                    zsfy += wdxj[s].money
                    ids.push(wdxj[s].id)
                }

            }
            //我的反佣
            wdfy = parseFloat(tdfy) - parseFloat(zsfy)
            function check() {
                return new Promise((resolve, reject) => {
                    let num = Database.p10_num
                    if (gHandler.app.pinpai == 'juding' || gHandler.app.pinpai == 'huaxing') {
                        //直属玩家业绩 
                        commonVal.jd_GetGameUserInductions(ids, i, data.length, data[i].date, num, resolve)
                    } else {//直属玩家业绩 
                        commonVal.GetGameUserInductions(ids, i, endIndex, data[i].date, resolve)
                    }


                })

            }
            check().then(
                (values) => {
                    Database.ttpnum++;

                    if (Database.ttpnum == endIndex) {
                        cc.log('开始渲染', Database.data10);
                        for (let i = startIndex; i < endIndex; i++) {
                            if (Database.data10[i].zswjyj) {
                                data[i].zswjyj = Database.data10[i].zswjyj
                                zswjyj += parseFloat(data[i].zswjyj)
                            } else {
                                Database.data10[i].zswjyj = 0
                                data[i].zswjyj = 0
                                zswjyj += 0
                            }
                            this.setItemData(data[i]);

                        }
                        //本页团队总业绩 
                        cc.find("bottom/dzlabel/Label1", this.node).getComponent(cc.Label).string = Database.countCoinsShowLabel(tdzyj);
                        //本页玩家业绩 
                        if (zswjyj) {
                            cc.find("bottom/dzlabel/Label2", this.node).getComponent(cc.Label).string = Database.countCoinsShowLabel(zswjyj);
                        } else {
                            cc.find("bottom/dzlabel/Label2", this.node).getComponent(cc.Label).string = '0'
                        }

                        //本页团队返佣 
                        cc.find("bottom/dzlabel/Label3", this.node).getComponent(cc.Label).string = Database.countCoinsShowLabel(tdfy);
                        //本页直属返佣
                        cc.find("bottom/dzlabel/Label4", this.node).getComponent(cc.Label).string = Database.countCoinsShowLabel(zsfy);
                        // 本页我的返佣
                        if (wdfy >= 0) {
                            cc.find("bottom/dzlabel/Label5", this.node).getComponent(cc.Label).string = Database.countCoinsShowLabel(wdfy);
                        } else {
                            cc.find("bottom/dzlabel/Label5", this.node).getComponent(cc.Label).string = '0'
                        }

                        this.setalldata();

                    }

                })

        }




    },

    //设置条目数据
    setItemData(data, i) {

        cc.log('itemdata===', data);
        let newItem = cc.instantiate(this.DzItem);
        newItem.active = true;

        //日期
        cc.find("date", newItem).getComponent(cc.Label).string = data.date;
        //团队总业绩
        cc.find("dllzls", newItem).getComponent(cc.Label).string = Database.countCoinsShowLabel(parseFloat(data.amount))


        //团队返佣
        cc.find("dllfh", newItem).getComponent(cc.Label).string = Database.countCoinsShowLabel(parseFloat(data.money));

        //算直属返佣
        let wdxj = Database.wxd
        let zsfy = 0;
        let ids = [];
        for (let s = 0; s < wdxj.length; s++) {
            if (wdxj[s].date == data.date) {
                zsfy += parseFloat(wdxj[s].money)
                ids.push(wdxj[s].id)
            }

        }
        //直属返佣
        cc.find("xjfh", newItem).getComponent(cc.Label).string = Database.countCoinsShowLabel(parseFloat(zsfy));


        //我的返佣： 团队返佣 - 直属返佣
        if (parseFloat(data.money) - zsfy >= 0) {
            cc.find("wdfh", newItem).getComponent(cc.Label).string = Database.countCoinsShowLabel(parseFloat(data.money) - zsfy);
        } else {
            cc.find("wdfh", newItem).getComponent(cc.Label).string = '0';
        }


        //状态
        if (data.status == 1) {
            cc.find("zt", newItem).getComponent(cc.Label).string = '已发';
        } else {
            cc.find("zt", newItem).getComponent(cc.Label).string = '未发';
        }
        //直属玩家业绩 -----
        let dwb = 1;


        cc.find("wddwb", newItem).getComponent(cc.Label).string = Database.countCoinsShowLabel(parseFloat(data.zswjyj));
        let btn = newItem.getChildByName("agent_btn_s2")
        btn.active = true;
        btn.on("touchend", () => {
            //音效
            Database.clickSound(Database.hall_sound)
            //把日期和直属id传进去

            let zsmx_pop = this.node.getChildByName("zsmx_pop");
            zsmx_pop.getComponent("p10_zsmx_pop").setdata(data.date, ids, 1)

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
                // this.pageNodes[i].getChildByName("pageIndex").getComponent(cc.Label).string = pageNum;
                this.pageNodes[this.pageNodes.length - 1].getChildByName("agent_di_chosen").active = true;
            }
            this.currentMaxPage = this.currentPage;
            this.currentMinPage++;
        } else if (this.currentPage < this.currentMinPage) {
            for (var i = 0; i < this.pageNodes.length; ++i) {
                let pageNum = this.currentMaxPage - this.pageNodes.length + i;
                // this.pageNodes[i].getChildByName("pageIndex").getComponent(cc.Label).string = pageNum;
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
            //  this.pageNodes[i].getChildByName("pageIndex").getComponent(cc.Label).string = pageNum;

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

        if (date_if) {

            if (gHandler.app.pinpai == "juding" || gHandler.app.pinpai == 'huaxing') {
                let num = Database.p10_num
                function check() {
                    return new Promise((resolve, reject) => {

                        let firstdate = firstdt[0] + "-" + fristmonth + "-" + firstday
                        let lastdate = enddt[0] + "-" + lastmonth + "-" + lasttday
                        commonVal.jd_GetBaseDividendInfo(firstdate, lastdate, num, resolve)

                    })
                }
                //得到前两列数据后请求后两列数据
                check().then(
                    (value) => {
                        this.pageNodes = [];
                        this.data = Database.getData10();

                        this.currentPage = 1; //当前页码
                        this.minPage = 1; //最小页码
                        this.maxPage = Math.ceil(this.data.length / 10); //最大页码
                        this.totalPage.string = "共 " + this.maxPage + " 页";
                        this.setPageData();

                        this.setPageIndex();



                    },
                    function (error) {
                        console.error("出错了", error);
                    },
                )
            } else {
                function check() {
                    return new Promise((resolve, reject) => {
                        let firstdate = firstdt[0] + "-" + fristmonth + "-" + firstday
                        let lastdate = enddt[0] + "-" + lastmonth + "-" + lasttday
                        commonVal.GetBaseDividendInfo(firstdate, lastdate, resolve)
                    })
                }
                check().then(
                    (value) => {


                        this.data = Database.getData10();

                        this.currentPage = 1; //当前页码
                        this.minPage = 1; //最小页码
                        this.maxPage = Math.ceil(this.data.length / 10); //最大页码
                        this.totalPage.string = "共 " + this.maxPage + " 页";
                        cc.log('this.data===', this.data, 'this.wxd ==', Database.wxd);
                        this.setPageData();
                        this.setPageIndex();
                    }
                )
            }

        }


    },

    //我的比例 
    mybl() {
        //音效
        Database.clickSound(Database.hall_sound)
        let num = Database.p10_num
        //得到自己的比例
        this.wddy.getComponent("p10_wddy_script").openself_pop(num)

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

        // xjbl_pop.getComponent("xjbl_pop").search()


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
    openguze() { //打开计算公式
        cc.log('展示');
        if (this.gssm.active) {
            this.gssm.active = false
        } else {
            this.gssm.active = true
        }
    },
    n2_openchoose() {
        let status = this.node.getChildByName("btn_search");
        status.active = !status.active

    }
    // start () {

    // },

    // update (dt) {},
});