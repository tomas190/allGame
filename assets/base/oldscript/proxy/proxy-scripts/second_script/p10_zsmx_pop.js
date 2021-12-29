let Database = require("../public_script/Database");
let commonVal = require("proxy-http");
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
        mid: {
            default: null,
            type: cc.Node,
        },

    },



    onLoad() {
        this.content.removeAllChildren();
        this.mid.active = true;

    },


    setdata(date, ids, page) {
        this.mid.active = true;
        // cc.log('进入函数setdata', date, ids, page);
        Database.p10_dates = date
        Database.p10_ids = ids
        if (ids.length > 10 && page == 1) {
            ids = Database.p10_ids.slice(0, 10)
        } else {
            ids = Database.p10_ids.slice((page - 1) * 10, page * 10)
        }
        // console.log('进入函数setdata2', ids);
        //let xjmx = Database.wxd
        // 日期date  直属ID= 上级id 个人业绩GetGameUserInductions接口搞   直属团队业绩 amount    团队返佣 money 字段
        let nums = 0;
        console.log('进入函数setdata3', ids.length);
        for (let s = 0; s < ids.length; s++) {
            function check() {
                return new Promise((resolve, reject) => {
                    //  请求直个人业绩 
                    commonVal.p10_GetGameUserInductions(ids[s], date, resolve)
                })

            }
            check().then(
                (values) => {
                    nums++
                    
                    if (nums == ids.length) {
                        console.log('进入函数setdata4', ids.length, Database.wxd.length);
                        for (let i = 0; i < ids.length; i++) {
                            for (let ss = 0; ss < Database.wxd.length; ss++) {
                                if (Database.wxd[ss].date == date && Database.wxd[ss].id == ids[i]) {
                                    cc.log('个人业绩是什么', Database.wxd[ss]);
                                    let item = cc.instantiate(this.frame);
                                    item.active = true;

                                    // //日期
                                    cc.find("label1", item).getComponent(cc.Label).string = date;;
                                    // //id
                                    cc.find("label2", item).getComponent(cc.Label).string = Database.wxd[ss].id;
                                    //个人业绩
                                    if (Database.wxd[ss].zswjyj) {
                                        cc.find("label3", item).getComponent(cc.Label).string = Database.countCoinsShowLabel(Database.wxd[ss].zswjyj);
                                    } else {
                                        cc.find("label3", item).getComponent(cc.Label).string = '0'
                                    }

                                    //直属团队业绩 
                                    cc.find("label4", item).getComponent(cc.Label).string = Database.countCoinsShowLabel((parseFloat(Database.wxd[ss].amount)))
                                    // //团队返佣

                                    cc.find("label5", item).getComponent(cc.Label).string = Database.countCoinsShowLabel(Database.wxd[ss].money);

                                    this.content.addChild(item);


                                }

                            }


                        }


                    }


                })


        }

        this.node.active = true;

    },
    agentDetails(event) {
       
        if (event.getScrollOffset().y > (470 * Database.p10_page) - 500) {
            console.log(event.getScrollOffset().y ,'滚动了y > (470 * Database.page) - 342) ',(470 * Database.p10_page) - 470);
            Database.p10_page++;
            if (Database.p10_ids.length < (Database.p10_page - 1) * 10) {
                console.log('没那么多数据！');
                return
            }

            this.setdata(Database.p10_dates, Database.p10_ids, Database.p10_page)


        }


    },

    close() {
        //音效
        Database.clickSound(Database.hall_sound)
        this.content.removeAllChildren();
        this.mid.active = false;
        this.node.active = false;
        Database.p10_ids = [];
        Database.p10_dates = 0;
        Database.p10_page = 1;


    },

    start() {

    },

    // update (dt) {},
});
