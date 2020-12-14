// Learn cc.Class:
cc.Class({
    extends: cc.Component,

    properties: {
        lbl_content:{
            default:null,
            type:cc.Label
        },

        cancel:{
            default:null,
            type:cc.Node
        },

    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {

    },

    start () {

    },

    updateData(args){
        this.cancel.active = args.close;
        this.cancel.getComponent(cc.Button).interactable = args.close;
        this.lbl_content.string = args.str;
        let call = args.callfunc;
        let obj = args.eObj;
        if( obj && call) this._call_ = call.bind(obj);
    },

    quxiao(){
        this.node.active = false;
    },

    callback(event,data){
        this._call_ && this._call_();
        this.node.active = false;
    },


    // update (dt) {},
});
