var Database = require("../public_script/Database");
// let toFloat = require("./proxy-changeFloat");
let commonVal = require("../public_script/proxy-http");
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
        date: null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

    },

    setdata(date) {
      
        this.date = date
        this.content.removeAllChildren();
       
        console.log('p12date==',date);
        function check() {
            return new Promise((resolve, reject) => {
                
                commonVal.GetPaymentInfoDetail(date, resolve)
            })
        }
        //得到前两列数据后请求后两列数据
        check().then(
            (value) => {

                this. searchsetdata(commonVal.p12_view_data)
              
            },
            function (error) {
                console.error("出错了", error);
            },


        )
        this.node.active = true;

    },
    searchsetdata(obj) {
        cc.log("searchsetdata####", obj);
        this.content.removeAllChildren();
        if (obj != null) {
            for (let index = 0; index < obj.length; index++) {
                let item = cc.instantiate(this.frame);
                item.active = true;
                
                //日期
                cc.find("label1", item).getComponent(cc.Label).string =''+ this.date;
                //id
                cc.find("label2", item).getComponent(cc.Label).string = ''+obj[index].game_user_id;
                //分红
                cc.find("label3", item).getComponent(cc.Label).string = Database.countCoinsShowLabel(parseFloat(obj[index].income));
                
                this.content.addChild(item);


            }
        }

        this.node.active = true;

    },
    close() {
         //音效
         Database.clickSound(Database.hall_sound)
        this.content.removeAllChildren();
        this.mid.active = false;
        this.node.active = false;

    },
   
    start() {

    },

    // update (dt) {},
});
