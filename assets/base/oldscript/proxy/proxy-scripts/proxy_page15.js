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
        page9_frame: {
            default: null,
            type: cc.Node,
        },
        // page9_frame_n2: {
        //     default: null,
        //     type: cc.Node,
        // },
        page9_sv: {
            default: null,
            type: cc.ScrollView,
        },
        page9_content: {
            default: null,
            type: cc.Node,
        },
        page9_search_str: {
            default: null,
            type: cc.Label,
        },
        page9_bdsz: {
            default: null,
            type: cc.Node,
        },
        page15_btn: true,

    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //显示对应二级菜单栏 //game_tag 游戏分类1  棋牌类型游戏 2. 彩票类型游戏 3. 体育类型游戏   4. 视讯类型游戏

    },
    checkMyAgent(event, num) {
        if (this.page15_btn) {
            this.page15_btn = false
            this.scheduleOnce(() => {
                // 这里的 this 指向 component
                this.page15_btn = true
            }, 0.6);
            if (gHandler.app.pinpai == 'huaxing' && Database.loadview != null) {
                Database.loadview.active = true;
            }
            if (gHandler.app.pinpai == 'ninetwo' && Database.loadview != null) {
                Database.loadview.active = true;
                Database.n2_date_p9 = 0
                this.scheduleOnce(() => {
                    // 这里的 this 指向 component
                    Database.loadview.active = false;
                }, 1);
            }
            //聚鼎无规则不显示 资金转入 帐内互转
            if (gHandler.app.pinpai == "juding") {
                if (Database.p9_dz_aumont == '100元。' && Database.p9_qp_aumont == '100元。') {
                    cc.log('无规则');
                    let agent_zjzr = cc.find('agent_wdwj/jd_agent_btn_zjzr', this.node)
                    let azhnhz = cc.find('agent_wdwj/jd_agent_btn_zhnhz', this.node)
                    agent_zjzr.active = false
                    azhnhz.active = false
                }

            }

            if (gHandler.app.pinpai == 'ninetwo') {
                let status = this.node.getChildByName("btn_search");
                status.active = false
            }

            this.btn = true;
            Database.page9_wjmx = [];


            if (gHandler.app.pinpai == 'ninetwo') {
                let data_type = this.node.getChildByName("bg").getChildByName("btn_choose").getChildByName('type').getComponent("cc.Label");

                data_type.string = '今日预估'

                function check() {
                    // this.currentPage = 1; //当前页码
                    // this.minPage = 1; //最小页码

                    return new Promise((resolve, reject) => {
                        commonVal.n2_GetProxyGroupInfo_p9(Database.n2_date_p9, resolve, Database.page9_ids)
                    })


                }

                check().then(
                    (value) => {
                        this.data = Database.n2_p9_zsxjwjzs;
                        Database.page9_ids = [];
                        this.page9_sv.content.removeAllChildren();
                        this.page9_sv.scrollToTop();
                        cc.log('n2 p9-------------1', Database.n2_p9_zsxjwjzs);
                        this.currentPage = 1; //当前页码
                        this.datapage = 1;//数据分页
                        this.minPage = 1; //最小页码

                        this.maxPage = Math.ceil(Database.n2_p9_zsxjwjzs.length / 20);
                        this.totalPage.string = "每页20条 共 " + this.maxPage + " 页";
                        this.page9setPageData()
                        cc.log('进来了2');
                        this.page9setPageIndex();

                    },
                    function (error) {
                        console.error("出错了", error);
                    },


                )
            } else {
                function check() {
                    // this.currentPage = 1; //当前页码
                    // this.minPage = 1; //最小页码

                    return new Promise((resolve, reject) => {
                        commonVal.getallchilds9(commonVal.account_name, resolve, num)
                    })


                }

                check().then(
                    (value) => {

                        this.data = Database.page9_wjmx;
                        Database.page9_ids = [];
                        this.page9_sv.content.removeAllChildren();
                        this.page9_sv.scrollToTop();

                        this.currentPage = 1; //当前页码
                        this.datapage = 1;//数据分页
                        this.minPage = 1; //最小页码

                        this.maxPage = Math.ceil(Database.zsxjwjzs / 8);

                        //Database.zsxjwjzs 是玩家总数最大页码
                        const promise1 = new Promise((resolve) => {
                            if (Database.page9_wjmx != []) {
                                for (let index = 0; index < Database.page9_wjmx.length; index++) {
                                    Database.page9_ids.push(Database.page9_wjmx[index].id)
                                }
                                commonVal.getProxyUserNumber(Database.page9_ids, resolve)
                            }
                        });
                        Promise.all([promise1]).then((values) => {

                            cc.log('进来了1');
                            this.page9setPageData()
                            cc.log('进来了2');
                            this.page9setPageIndex();
                        })




                    },
                    function (error) {
                        console.error("出错了", error);
                    },


                )
            }


        }




    },
    checkMyAgents(num) {
        //聚鼎无规则不显示 资金转入 帐内互转
        if (gHandler.app.pinpai == "juding") {
            if (Database.p9_dz_aumont == '100元。' && Database.p9_qp_aumont == '100元。') {
                cc.log('无规则');
                let agent_zjzr = cc.find('agent_wdwj/jd_agent_btn_zjzr', this.node)
                let azhnhz = cc.find('agent_wdwj/jd_agent_btn_zhnhz', this.node)
                agent_zjzr.active = false
                azhnhz.active = false
            }

        }



        this.btn = true;
        Database.page9_wjmx = [];

        if (gHandler.app.pinpai == 'ninetwo') {

            function check() {
                // this.currentPage = 1; //当前页码
                // this.minPage = 1; //最小页码

                return new Promise((resolve, reject) => {
                    commonVal.n2_GetProxyGroupInfo_p9(Database.n2_date_p9, resolve, Database.page9_ids)
                })


            }

            check().then(
                (value) => {
                    this.data = Database.n2_p9_zsxjwjzs;
                    Database.page9_ids = [];
                    this.page9_sv.content.removeAllChildren();
                    this.page9_sv.scrollToTop();
                    cc.log('n2 p9-------------1', Database.n2_p9_zsxjwjzs);
                    this.currentPage = 1; //当前页码
                    this.datapage = 1;//数据分页
                    this.minPage = 1; //最小页码

                    this.maxPage = Math.ceil(Database.n2_p9_zsxjwjzs.length / 20);
                    this.totalPage.string = "每页20条 共 " + this.maxPage + " 页";
                    this.page9setPageData()
                    cc.log('进来了2');
                    this.page9setPageIndex();

                },
                function (error) {
                    console.error("出错了", error);
                },


            )
        } else {
            function check() {
                // this.currentPage = 1; //当前页码
                // this.minPage = 1; //最小页码

                return new Promise((resolve, reject) => {
                    commonVal.getallchilds9(commonVal.account_name, resolve, num)
                })


            }

            check().then(
                (value) => {

                    this.data = Database.page9_wjmx;
                    Database.page9_ids = [];
                    this.page9_sv.content.removeAllChildren();
                    this.page9_sv.scrollToTop();

                    this.currentPage = 1; //当前页码
                    this.datapage = 1;//数据分页
                    this.minPage = 1; //最小页码
                    this.maxPage = Math.ceil(Database.zsxjwjzs / 8);



                    const promise1 = new Promise((resolve) => {
                        if (Database.page9_wjmx != []) {
                            for (let index = 0; index < Database.page9_wjmx.length; index++) {
                                Database.page9_ids.push(Database.page9_wjmx[index].id)
                            }
                            commonVal.getProxyUserNumber(Database.page9_ids, resolve)
                        }
                    });
                    Promise.all([promise1]).then((values) => {
                        this.page9setPageData()
                        this.page9setPageIndex();
                    })




                },
                function (error) {
                    console.error("出错了", error);
                },


            )
        }



    },

    //page9 设置页面数据
    page9setPageData() {
        //this.data 是所有的个人信息 也就是每个日期的第一条数据

        let endIndex
        let startIndex
        if (gHandler.app.pinpai != 'ninetwo') {
            endIndex = this.currentPage * 8;
            startIndex = (this.currentPage - 1) * 8
            endIndex = endIndex > Database.page9_wjmx.length ? Database.page9_wjmx.length : endIndex;

            this.page9_sv.content.removeAllChildren();
            this.page9_sv.scrollToTop();

            for (var i = startIndex; i < endIndex; ++i) {

                this.page9setItemData(Database.page9_wjmx[i]);


            }
        } else {
            endIndex = this.currentPage * 20;
            startIndex = (this.currentPage - 1) * 20

            endIndex = endIndex > Database.n2_p9_zsxjwjzs.length ? Database.n2_p9_zsxjwjzs.length : endIndex;

            this.page9_sv.content.removeAllChildren();
            this.page9_sv.scrollToTop();


            for (var i = startIndex; i < endIndex; ++i) {
                this.page9setItemData(Database.n2_p9_zsxjwjzs[i]);

            }
        }



    },
    //page9 翻页后设置页面数据
    page9ctsetPageData() {
        //this.data 是所有的个人信息 也就是每个日期的第一条数据
        let currentP = this.currentPage - (this.datapage - 1) * 3

        let endIndex = currentP * 8;
        let startIndex = (currentP - 1) * 8
        if (gHandler.app.pinpai != 'ninetwo') {
            endIndex = currentP * 8;
            startIndex = (currentP - 1) * 8

            endIndex = endIndex > Database.page9_wjmx.length ? Database.page9_wjmx.length : endIndex;


            cc.log('startIndex===', startIndex, 'endIndex==', endIndex);
            this.page9_sv.content.removeAllChildren();
            this.page9_sv.scrollToTop();
            for (var i = startIndex; i < endIndex; ++i) {
                this.page9setItemData(Database.page9_wjmx[i]);
            }
        } else {
            endIndex = currentP * 20;
            startIndex = (currentP - 1) * 20

            endIndex = endIndex > Database.n2_p9_zsxjwjzs.length ? Database.n2_p9_zsxjwjzs.length : endIndex;

            this.page9_sv.content.removeAllChildren();
            this.page9_sv.scrollToTop();


            for (var i = startIndex; i < endIndex; ++i) {
                this.page9setItemData(Database.n2_p9_zsxjwjzs[i]);

            }
        }



    },

    //page9 设置单个条目数据
    page9setItemData(data) {

        let newItem = cc.instantiate(this.page9_frame);
        newItem.active = true;

        //玩家id
        cc.find("label1", newItem).getComponent(cc.Label).string = data.id
        //注册时间
        let time = Database.format(parseInt(data.login_time) * 1000)
        if (gHandler.app.pinpai == 'juding') {
            cc.find("label2", newItem).getComponent(cc.Label).string = data.proxy_nick
        } else {
            cc.find("label2", newItem).getComponent(cc.Label).string = time
        }
        if (gHandler.app.pinpai != 'ninetwo') {
            // //直属人数

            cc.find("label3", newItem).getComponent(cc.Label).string = data.direct_number + ''
            //团队人数
            if (data.count) {
                cc.find("label4", newItem).getComponent(cc.Label).string = data.count + ''
            } else {
                cc.find("label4", newItem).getComponent(cc.Label).string = '0'
            }


            let btn = newItem.getChildByName("label5")
            let btn2 = newItem.getChildByName("label6")
            let btn3 = newItem.getChildByName("label7")
            if (gHandler.app.pinpai == 'juding') {
                btn3.on("touchend", () => {
                    cc.log('juding55555=', data.id);
                    //音效
                    Database.clickSound(Database.hall_sound)
                    //展示保底设置
                    let p9_yjcx = this.node.getChildByName('yjcx')
                    p9_yjcx.active = true;
                    p9_yjcx.getComponent("yjcx_p9").get_data(data.id)

                })
            }


            if (gHandler.app.pinpai == "fuxin" || gHandler.app.pinpai == "nineone" || gHandler.app.pinpai == "xingui" || gHandler.app.pinpai == "debi" || gHandler.app.pinpai == "xinhao" || gHandler.app.pinpai == "xinlong") {
                cc.log('Database.page9_plaumont==', Database.page9_plaumont);
                if (Database.page9_plaumont == '80元。') {
                    btn.active = false;
                } else {
                    btn.on("touchend", () => {
                        //音效
                        Database.clickSound(Database.hall_sound)
                        //展示保底设置
                        this.page9_bdsz.active = true;
                        this.page9_bdsz.getComponent("p9_bdsz_script").setdata(data.id)

                    })
                }

            } else if (gHandler.app.pinpai == "huanshi" && Database.page9_plaumont == '100元。') {
                btn.active = false;
            } else {
                if (gHandler.app.pinpai == "juding" || gHandler.app.pinpai == "huaxing") {
                    btn.on("touchend", () => {
                        cc.log('juding111111');
                        //音效
                        Database.clickSound(Database.hall_sound)
                        //展示保底设置


                        this.page9_bdsz.active = true;
                        this.page9_bdsz.getComponent("p9_bdsz_script").setdata(data.id, 1)


                        //let xjfhmx_pop = this.page9_bdsz.getChildByName("xjfhmx_pop");
                        // let allData = Database.getAllData1()
                        // this.mid.active = true;
                        // xjfhmx_pop.active=true;

                    })

                    btn2.on("touchend", () => {
                        //音效
                        Database.clickSound(Database.hall_sound)
                        //展示保底设置


                        this.page9_bdsz.active = true;
                        this.page9_bdsz.getComponent("p9_bdsz_script").setdata(data.id, 5)


                        //let xjfhmx_pop = this.page9_bdsz.getChildByName("xjfhmx_pop");
                        // let allData = Database.getAllData1()
                        // this.mid.active = true;
                        // xjfhmx_pop.active=true;

                    })



                } else {
                    btn.on("touchend", () => {
                        //音效
                        Database.clickSound(Database.hall_sound)
                        //展示保底设置


                        this.page9_bdsz.active = true;
                        this.page9_bdsz.getComponent("p9_bdsz_script").setdata(data.id, 0)


                        //let xjfhmx_pop = this.page9_bdsz.getChildByName("xjfhmx_pop");
                        // let allData = Database.getAllData1()
                        // this.mid.active = true;
                        // xjfhmx_pop.active=true;

                    })
                }

            }
            if (gHandler.app.pinpai == "juding") {
                if (Database.p9_qp_aumont == '100元。') {
                    btn.active = false;
                }

                if (Database.p9_dz_aumont == '100元。') {
                    btn2.active = false;
                }
            }
            if (gHandler.app.pinpai == "huaxing") {
                if (Database.p9_qp_aumont == '160元。') {
                    btn.active = false;
                }

                if (Database.p9_dz_aumont == '80元。') {
                    btn2.active = false;
                }
            }
            this.page9_sv.content.addChild(newItem);
        } else {


            //玩家id
            cc.find("label1", newItem).getComponent(cc.Label).string = data.user_id

            let times = Database.format(parseInt(data.user_create_time) * 1000)

            //团队总人数
            cc.find("label2", newItem).getComponent(cc.Label).string = data.user_link_num





            //投注额
            if (data.user_link_bet_total) {
                cc.find("label3", newItem).getComponent(cc.Label).string = Math.floor(parseFloat(data.user_link_bet_total) * 100) / 100 + ''
            } else {
                cc.find("label3", newItem).getComponent(cc.Label).string = '0'
            }

            //充值
            if (data.user_link_top_up_total) {
                cc.find("label4", newItem).getComponent(cc.Label).string = Math.floor(parseFloat(data.user_link_top_up_total) * 100) / 100 + ''
            } else {
                cc.find("label4", newItem).getComponent(cc.Label).string = '0'
            }



            let btn = newItem.getChildByName("label5")


            btn.on("touchend", () => {
                //音效
                Database.clickSound(Database.hall_sound)
                //展示保底设置
                this.page9_bdsz.active = true;
                this.page9_bdsz.getComponent("p9_bdsz_script").n2_setdata(data.user_id, times, Database.balance, data.user_link_direct_num, data.user_link_num)

            })


            this.page9_sv.content.addChild(newItem);


        }


    },




    //page9 设置页码显示
    page9setPageIndex() {
        cc.log('page9setPageIndex设置页面');
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
    // page9 翻页函数
    pageUporDown(event, flag) {
        //音效
        Database.clickSound(Database.hall_sound)
        if (this.btn) {
            if (flag == "1") {
                if (this.currentPage >= this.maxPage) return;
                this.currentPage++;
            } else {
                if (this.currentPage <= this.minPage) return;
                this.currentPage--;
            }

            cc.log('this.currentPage====', this.currentPage, 'this.currentMinPage==', this.currentMinPage);

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
            this.page9ctsetPageData()
        }



    },
    //page9 页面数据查询
    page9search() {
        if (gHandler.app.pinpai == 'huaxing' && Database.loadview != null) {
            Database.loadview.active = true;
        }
        //音效
        Database.clickSound(Database.hall_sound)
        cc.log('id======', this.page9_search_str.string);
        this.page9_sv.content.removeAllChildren();
        this.page9_sv.scrollToTop();
        let strid = this.page9_search_str.string
        if (this.page9_search_str.string != '') {
            if (gHandler.app.pinpai == 'ninetwo') {
                for (let i = 0; i < Database.n2_p9_zsxjwjzs.length; i++) {
                    if (Database.n2_p9_zsxjwjzs[i].user_id == this.page9_search_str.string) {
                        this.page9setItemData(Database.n2_p9_zsxjwjzs[i]);
                    }

                }

            } else {
                function check() {
                    return new Promise((resolve, reject) => {

                        commonVal.p9_GetProxyUser(strid, resolve)
                    })
                }
                //得到前两列数据后请求后两列数据
                check().then(
                    (value) => {
                        if (gHandler.app.pinpai == 'huaxing' && Database.loadview != null) {
                            Database.loadview.active = false;
                        }
                            const promise1 = new Promise((resolve) => {
                                commonVal.p9_getProxyUserNumber(strid, resolve)

                            });


                            Promise.all([promise1]).then((values) => {
                                // this.page9setPageData()
                                // this.page9setPageIndex();
                                cc.log('Database.page9_wjmx[1]===', Database.page9_wjmx[1]);
                                cc.log(' Database.p9_dlsj===', Database.p9_dlsj);
                                if (Database.p9_dlsj != "proxy user is not found") {
                                    this.page9setItemData(Database.p9_dlsj);
                                }

                            })
                      

                    },
                    function (error) {
                        console.error("出错了", error);
                    },
                )
            }


            let input = this.node.getChildByName("agent_wdwj").getChildByName('input').getChildByName("New EditBox")
            input.getComponent(cc.EditBox).string = '' //清空输入框最有效方法
            if (Database.p9_dlsj != "proxy user is not found") {
                //重设页码
                this.pageNodes = [];
                this.pageLayout.removeAllChildren();
                var pItem = cc.instantiate(this.pageItem);
                pItem.active = true;
                pItem.getChildByName("pageIndex").getComponent(cc.Label).string = 1;
                pItem.getChildByName("agent_di_chosen").active = true;
                this.pageLayout.addChild(pItem);
                this.pageNodes.push(pItem);
                this.page9_search_str.string = ''
                //翻页不可用
                this.btn = false;
            }

        } else {
            this.checkMyAgents(1)
        }


    },



    //设置页码显示
    setPageIndex() {
        cc.log('设置页面');
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
                        this.maxPage = Math.ceil(this.data.length / 10); //
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



                        cc.log('得到前两列数据后请求后两列数据', this.data);
                        this.pageNodes = [];
                        this.data = Database.getData1();
                        this.currentPage = 1; //当前页码
                        this.minPage = 1; //最小页码
                        this.maxPage = Math.ceil(this.data.length / 10); //最大页码
                        // this.totalPage.string = "共 " + this.maxPage + " 页";
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
                        this.maxPage = Math.ceil(this.data.length / 10); //最大页码
                        this.totalPage.string = "共 " + this.maxPage + " 页";
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
        this.mid.active = true;
        // let xjfhmx_pop = this.node.getChildByName("xjfhmx_pop");
        // let allData = Database.getAllData()
        // xjfhmx_pop.getComponent("xjfhmx_pop").setdata(data.date, allData[data.date])
        let xjbl_pop = this.node.getChildByName("xjbl_pop");

        xjbl_pop.getComponent("xjbl_pop").search()


    },
    //资金转入
    zjzr() {
        //音效
        Database.clickSound(Database.hall_sound)
        let zjzr_pop = this.node.getChildByName("zjzr_pop");
        this.mid.active = true
        cc.log('资金转入比例');
        zjzr_pop.getComponent("zjzr_pop_p9").setData()
    },
    //账内互转
    znzjhz() {
        //音效
        Database.clickSound(Database.hall_sound)
        let num = (Database.balance + '').split(".")
        let nums = num[0];
        if (parseFloat(nums) < 500) {
            cc.log('佣金余额不足500');
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "佣金余额不足500金币, 无法转账")
        } else {
            let znzjhz = this.node.getChildByName("znzjhz");
            this.mid.active = true
            cc.log('资金转入比例');
            znzjhz.getComponent("zhnhz_pop").setData()
        }

    },
    OPenCalendar(event, num) { //打开日历
        if (num == "1") {
            let status = this.node.getChildByName("UIDatePicker1").active;
            this.node.getChildByName("UIDatePicker1").active = !status;
        }
        if (num == "2") {
            let status = this.node.getChildByName("UIDatePicker2").active;
            this.node.getChildByName("UIDatePicker2").active = !status;
        }

    },
    //点开日期选择
    n2_openchoose() {
        let status = this.node.getChildByName("btn_search");
        status.active = !status.active

    },
    search_p10(event, num) {


        //查询日期状态
        let status = this.node.getChildByName("btn_search");
        status.active = false;
        let data_type = this.node.getChildByName("bg").getChildByName("btn_choose").getChildByName('type').getComponent("cc.Label");
        if (num == 0) {
            data_type.string = '今日预估'
            Database.n2_date_p9 = num
        } else if (num == -1) {
            data_type.string = '昨天'
            Database.n2_date_p9 = num
        } else if (num == 'week') {
            data_type.string = '本周'
            Database.n2_date_p9 = num
        } else if (num == 'lastweek') {
            data_type.string = '上周'
            Database.n2_date_p9 = num
        } else if (num == 'month') {
            data_type.string = '本月'
            Database.n2_date_p9 = num
        }

        this.checkMyAgents(1)
    },
    // start () {

    // },

    // update (dt) {},
});