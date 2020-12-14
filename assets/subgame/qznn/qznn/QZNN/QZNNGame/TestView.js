var msgSender = require("QZNNMsgSender");
var CMD = require("QZNNCMD");
cc.Class({
    extends: cc.Component,

    properties: {
        pokerLayout:{
            default:null,
            type:cc.Node
        },

        list:[],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    initPokers(){
        if(CMD.REGISTER){
            let nodes = this.pokerLayout.children;
            let index = 0;
            for(let i=0; i<4; ++i){
                let k = 16*Math.pow(2,i) + 1;
                let g = k+13
                for(k; k < g; ++k){
                    nodes[index].getComponent("createPoker").createPoker(k);
                    let p = k,
                        f = index
                    cc.gg.utils.addClickEventALL(nodes[index],null,null,()=>{
                        cc.log("################@@@@@====>>=============>>",p,this.list)
                        if(this.list.length < 5){
                            let x = this.list.indexOf(p);
                            if(x ==-1){
                                this.list.push(p);
                                nodes[f].getChildByName("card_bg").color = new cc.Color(255,0,255)
                            }else{
                                this.list.splice(x,1);
                                nodes[f].getChildByName("card_bg").color = new cc.Color(255,255,255)
                            }
                        }
                    },null)
                    index++;
                }
            }
            CMD.REGISTER = false;
        }
    },

    open(){
        this.node.active = true;
    },

    cancel(){
        this.list.length = 0;
        this.node.active = false;
        let nodes = this.pokerLayout.children;
        for(let i=0; i<nodes.length; ++i){
            nodes[i].getChildByName("card_bg").color = new cc.Color(255,255,255)
        }
    },

    submit(){
        msgSender.sendConfigCard(this.list);
        CMD.ISCONFIG = true;
        let nodes = this.pokerLayout.children;
        for(let i=0; i<nodes.length; ++i){
            nodes[i].getChildByName("card_bg").color = new cc.Color(255,255,255)
        }
        this.list.length = 0;
        this.node.active = false;
    },

    start () {

    },

    // update (dt) {},
});
