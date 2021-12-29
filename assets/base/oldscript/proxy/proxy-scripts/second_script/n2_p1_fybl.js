var Database = require("../public_script/Database");
cc.Class({
    extends: cc.Component,


        properties: {
            qpoff: {
                default: null,
                type: cc.Node,
            },
            qpon: {
                default: null,
                type: cc.Node,
            },
            dzoff: {
                default: null,
                type: cc.Node,
            },
            dzon: {
                default: null,
                type: cc.Node,
            },
            qpgz: {
                default: null,
                type: cc.Node,
            },
            dzgz: {
                default: null,
                type: cc.Node,
            },
            mid: {//组织点击
                default: null,
                type: cc.Node,
            },
            close: {//关闭按钮
                default: null,
                type: cc.Node,
            },
            sv: { //滑动展示
                default: null,
                type: cc.ScrollView,
            },

        },
    

    // LIFE-CYCLE CALLBACKS:

    //onLoad () {},

    start() {

    },
    onopen(){
        this.mid.active = true
        this.node.active = true
    },
    closed() {
        this.qpon.active = true
        this.qpoff.active = false
        this.dzon.active = false
        this.dzoff.active = true
        this.qpgz.active = true
        this.dzgz.active = false
        this.mid.active = false
        this.node.active = false
    },
    //按钮规则
    guze(event, num) {
        //1棋牌 5 电子
        if (num = 1) {
           console.log(' 进入1');
          
            this.qpon.active = true
            this.qpoff.active = false
            this.dzon.active = false
            this.dzoff.active = true
            this.qpgz.active = true
            this.dzgz.active = false
            this.sv.scrollToTop()
        }
       

    },
    guze2(event, num) {
       
        if (num = 5) {
            console.log(' 进入5');
            this.sv.scrollToTop()
            this.dzon.active = true
            this.qpoff.active = true
            this.qpon.active = false
            this.dzoff.active = false
            this.qpgz.active = false
            this.dzgz.active = true

        }

    }
});
