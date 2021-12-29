var Database = require("../public_script/Database");
cc.Class({
    extends: cc.Component,

    properties: {
        sv: {
            default: null,
            type: cc.ScrollView,
        },
        mid: {
            default: null,
            type: cc.Node,
        },
       
    },



    onLoad() {

    },


    close() {
        //音效
        Database.clickSound(Database.hall_sound)
        this.sv.scrollToTop();
        this.mid.active = false;
        this.node.active = false;

    },

    start() {

    },

    // update (dt) {},
});
