let commonVal = require("../public_script/proxy-http");
let Database = require("../public_script/Database");
let gHandler = require("gHandler");
cc.Class({
    extends: cc.Component,


    properties: {
        mid: {//组织点击
            default: null,
            type: cc.Node,
        },
        close: {//关闭按钮
            default: null,
            type: cc.Node,
        },
        zwsj: {//暂无数据
            default: null,
            type: cc.Node,
        },
        frame: {//表格
            default: null,
            type: cc.Node,
        },
        content: {//内容
            default: null,
            type: cc.Node,
        },
        sv: {
            default: null,
            type: cc.ScrollView,
        },
        pageItem: {
            default: null,
            type: cc.Node,
        },
        pageLayout: {
            default: null,
            type: cc.Node,
        },
        pageNodes: [],


    },


    // LIFE-CYCLE CALLBACKS:

    //onLoad () {},

    start() {

    },
    onopen() {
        this.mid.active = true
        this.node.active = true

        this.pageNodes = [];
        this.currentPage = 1; //当前页码
        this.minPage = 1; //最小页码
        this.maxPage = 1;//最小页码
        function check1() {
            return new Promise((resolve, reject) => {

                commonVal.n2_GetMoveBalanceToGameUserInfo(resolve)
            })
        }
        check1().then(
            (value) => {
                if (Database.n2_lqyj_data.length > 0) {
                    this.zwsj.active = false//关闭暂无数据界面

                    let endIndex
                    let startIndex
                  
                    //this.data 是所有的个人信息 也就是每个日期的第一条数据
                    if (gHandler.app.pinpai == 'ninetwo') {
                        this.maxPage = Math.ceil(Database.n2_lqyj_data.length / 20);

                        endIndex = this.currentPage * 20;
                        startIndex = (this.currentPage - 1) * 20
                    }

                    endIndex = endIndex > Database.n2_lqyj_data.length ? Database.n2_lqyj_data.length : endIndex;

                    this.sv.content.removeAllChildren();
                    this.sv.scrollToTop();
                    //渲染本页数据
                    for (var s = startIndex; s < endIndex; s++) {
                        console.log('Database.n2_lqyj_data[s].id====', Database.n2_lqyj_data[s].id);
                        this.setItemData(Database.n2_lqyj_data[s])
        
        
                    }
                    this.setPageIndex();
                   
                }


            }
        )
    },
    closed() {
        this.zwsj.active = true
        this.mid.active = false
        this.node.active = false
        this.content.removeAllChildren()

    },
    //设置页面数据
    setPageData() {
        let endIndex
        let startIndex
        //this.data 是所有的个人信息 也就是每个日期的第一条数据
        if (gHandler.app.pinpai == 'ninetwo') {
            endIndex = this.currentPage * 20;
            startIndex = (this.currentPage - 1) * 20
        }
       
            endIndex = endIndex > Database.n2_lqyj_data.length ? Database.n2_lqyj_data.length : endIndex;


    



        this.sv.content.removeAllChildren();
        this.sv.scrollToTop();

        //用所有数据来算数据{11:[{},{}],12:[{},{}]}

        for (var i = startIndex; i < endIndex; ++i) {
           
                this.setItemData(Database.n2_lqyj_data[i]);
            
           


        }


    },
    //设置条目数据
    setItemData(data) {
        let money = Database.countCoinsShowLabel(data.final_pay)
        let date = Database.getUxToTimes(data.create_time)

        let item = cc.instantiate(this.frame);

        item.getChildByName("je").getComponent(cc.Label).string = money+'';
        item.getChildByName("rq").getComponent(cc.Label).string = date+ '';
        item.active = true
        this.content.addChild(item);

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
            pItem.getChildByName("pageIndex").getComponent(cc.Label).string = i + 1 + '';
            pItem.getChildByName("agent_di_chosen").active = (i == 0);
            this.pageLayout.addChild(pItem);
            this.pageNodes.push(pItem);
        }
    },

});
