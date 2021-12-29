var Database = require("../public_script/Database");
let gHandler = require("gHandler");
// let toFloat = require("./proxy-changeFloat");
let commonVal = require("../public_script/proxy-http");
cc.Class({
    extends: cc.Component,

    properties: {
        frame: {
            default: null,
            type: cc.Node,
        },
        game_tag: {
            default: null,
            type: cc.Label,
        },
       
    },

   
    setstring(a,b){
        this.frame.getComponent(cc.Label).string = a
        this.game_tag.getComponent(cc.Label).string = b
      
    },
 
    start () {
       
    },

    // update (dt) {},
});
