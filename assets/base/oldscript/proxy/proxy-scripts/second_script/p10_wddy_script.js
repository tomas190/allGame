var Database = require("../public_script/Database");
var gHandler = require("gHandler");
var commonVal = require("../public_script/proxy-http");
cc.Class({
    extends: cc.Component,

    properties: {
        Dy_Amount: {//我的待遇pop
            default: null,
            type: cc.Label,
        },


    },

    onLoad() {

    },

    //打开自己规则pop
    openself_pop(num) {
        if (gHandler.app.pinpai == 'juding' && this.node.active == true) {
            this.node.active = false;
        } else {
            //音效
            Database.clickSound(Database.hall_sound)
            
            
            this.node.active = true;
            if (gHandler.app.pinpai == 'juding'  || gHandler.app.pinpai == 'huaxing' || gHandler.app.pinpai == 'test'|| gHandler.app.pinpai == 'tianqi') {
                if(num == 1){
                    this.Dy_Amount.string = Database.p9_qp_aumont + ''
                }
                if(num ==5){
                    this.Dy_Amount.string = Database.p9_dz_aumont + ''
                }
             
                
            } else {
                function check() {
                    return new Promise((resolve, reject) => {
                        commonVal.GetBaseDividendRule(resolve)
                    })


                }
                check().then(
                    (value) => {
                        this.Dy_Amount.string = Database.page9_plaumont + ''
                        this.node.active = true;

                    })
            }

        }



    },





    close() {
        //音效
        Database.clickSound(Database.hall_sound)
        // this.content.removeAllChildren();
        this.node.active = false;
        // let xjfhsd_pop = this.node.parent.getChildByName('xjfhblsd_pop')
        // xjfhsd_pop.active = true;

    },


    start() {
    },
});

