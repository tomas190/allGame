var Database = require("../public_script/Database");
let commonVal = require("../public_script/proxy-http");
let gHandler = require("gHandler");

cc.Class({
    extends: cc.Component,

    properties: {

        frame: {
            default: null,
            type: cc.Node,
        },
        uid: {
            default: null,
            type: cc.Label,
        },
        sv: {
            default: null,
            type: cc.ScrollView,
        },
        gz: {
            default: null,
            type: cc.Label,
        },
        content: {
            default: null,
            type: cc.Node,
        },
        close: {
            default: null,
            type: cc.Node,
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
        nums: 0,


    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        // this.agentDetails(1);

    },
    setdata(num) {
        this.nums = num
        this.pageNodes = [];
        this.currentPage = 1; //当前页码
        this.minPage = 1; //最小页码
        console.log('Database.p14_n2_gf_t===', Database.p14_n2_gf_t, 'Database.p14_n2_gf_l===', Database.p14_n2_gf_l);
        Database.p14_n2_gf_l
        //本周
        if (num == 1) {

            this.content.removeAllChildren();
            //翻页渲染
            let endIndex
            let startIndex
            //删除滴一条数据
            Database.p14_n2_gf_t.shift()
            //this.data 是所有的个人信息 也就是每个日期的第一条数据
            if (gHandler.app.pinpai == 'ninetwo') {
                this.maxPage = Math.ceil(Database.p14_n2_gf_t.length / 20);

                endIndex = this.currentPage * 20;
                startIndex = (this.currentPage - 1) * 20
            }

            endIndex = endIndex > Database.p14_n2_gf_t.length ? Database.p14_n2_gf_t.length : endIndex;

            this.sv.content.removeAllChildren();
            this.sv.scrollToTop();

            //渲染本页数据

            for (var s = startIndex; s < endIndex; s++) {
                console.log('Database.p14_n2_gf_t[s].id====', Database.p14_n2_gf_t[s].id);
                this.setItemData(Database.p14_n2_gf_t[s])

                // let newItem = cc.instantiate(this.frame);

                // newItem.active = true;
                // newItem.getChildByName('u_ids').getComponent("cc.Label").string = Database.p14_n2_gf_t[s].id + ''
                // newItem.getChildByName('gffe').getComponent("cc.Label").string = Math.floor(parseFloat(Database.p14_n2_gf_t[s].amount) * 100) / 100 + ''
                // this.content.addChild(newItem);

            }
            this.setPageIndex();

        }
        //上周
        if (num == 2) {
            this.content.removeAllChildren();
            //删除滴一条数据
            Database.p14_n2_gf_l.shift()
            //翻页渲染
            let endIndex
            let startIndex

            if (gHandler.app.pinpai == 'ninetwo') {
                this.maxPage = Math.ceil(Database.p14_n2_gf_l.length / 20);
                endIndex = this.currentPage * 20;
                startIndex = (this.currentPage - 1) * 20
            }

            endIndex = endIndex > Database.p14_n2_gf_l.length ? Database.p14_n2_gf_l.length : endIndex;
            this.sv.content.removeAllChildren();
            this.sv.scrollToTop();
            //渲染本页数据
            for (var s = startIndex; s < endIndex; s++) {
                console.log('Database.p14_n2_gf_l[s].id===', Database.p14_n2_gf_l[s].id);
                this.setItemData(Database.p14_n2_gf_l[s])
                // let newItem = cc.instantiate(this.frame);
                // newItem.active = true;
                // newItem.getChildByName('u_ids').getComponent("cc.Label").string = Database.p14_n2_gf_l[s].id + ''
                // newItem.getChildByName('gffe').getComponent("cc.Label").string = Math.floor(parseFloat(Database.p14_n2_gf_l[s].amount) * 100) / 100 + ''
                // this.content.addChild(newItem);


            }

            this.setPageIndex();
        }
    },
    closed() {
        //音效
        Database.clickSound(Database.hall_sound)
        this.node.active = false;

        this.content.removeAllChildren();

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
        if (this.nums == 1) {
            endIndex = endIndex > Database.p14_n2_gf_t.length ? Database.p14_n2_gf_t.length : endIndex;


        }
        if (this.nums == 2) {
            endIndex = endIndex > Database.p14_n2_gf_l.length ? Database.p14_n2_gf_l.length : endIndex;
        }



        this.sv.content.removeAllChildren();
        this.sv.scrollToTop();

        //用所有数据来算数据{11:[{},{}],12:[{},{}]}

        for (var i = startIndex; i < endIndex; ++i) {
            if (this.nums == 1) {
                this.setItemData(Database.p14_n2_gf_t[i]);
            }
            if (this.nums == 2) {
                this.setItemData(Database.p14_n2_gf_l[i]);
            }



        }


    },
    //设置条目数据
    setItemData(data) {
        let newItem = cc.instantiate(this.frame);
        newItem.active = true;
        newItem.getChildByName('u_ids').getComponent("cc.Label").string = data.id + ''
        newItem.getChildByName('gffe').getComponent("cc.Label").string = Math.floor(parseFloat(data.amount) * 100) / 100 + ''
        this.content.addChild(newItem);

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

    start() {

    },


    // update (dt) {},
});
