var Database = require("../public_script/Database");
var gHandler = require("gHandler");
var commonVal = require("../public_script/proxy-http");
cc.Class({
    extends: cc.Component,

    properties: {

        qpgz: { //棋牌
            default: null,
            type: cc.Label,
        },
        dzgz: { //电子
            default: null,
            type: cc.Label,
        },


    },

    onLoad() {


    },


    close() {
        //音效
        Database.clickSound(Database.hall_sound)
        // this.content.removeAllChildren();
        this.qpgz.string = ''
        this.dzgz.string = ''
        this.node.active = false;
    },
    setData() {
        let qp = parseFloat(Database.p9_qp_aumont.split("元", 1)[0])

        let dz = parseFloat(Database.p9_dz_aumont.split("元", 1)[0])
        this.qpgz.string =qp+ ''
        this.dzgz.string = dz +''
        this.node.active = true
    }





},
);

