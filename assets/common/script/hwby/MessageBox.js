// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
      //确定按钮
      ButtonOK:
      {
          default:null,
          type:cc.Node
      },   
      
      ButtonCancel:
      {
          default:null,
          type:cc.Node
      },       
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    close() {
        this.node.destroy();
    },

    SetConfirmMode(bConfirm) {
        if(bConfirm) {
            let x = (this.ButtonOK.x + this.ButtonCancel.x)/2;
            this.ButtonOK.x = x;
            this.ButtonCancel.active = false;
        }
    },

    setMessageTips(tips)
    {
        //let messagenode = this.node.getChildByName("Message");
        let messagenode = cc.find("FrameBox/Message",this.node);
        messagenode.getComponent(cc.Label).string = tips;
    },

    setCallBackOK(fnCallback)
    {
        this.fnCallbackOK = fnCallback;
    },

    setCallBackCancel(fnCallback) 
    {
        this.fnCallbackCancel = fnCallback;
    },

    onClickOK(event, customEventData) {
        cc.log("onClickOk");
        cc.log("click button:",event.target.name);
        if(this.fnCallbackOK) {
            this.fnCallbackOK();
        }

        this.close();
    },

    onClickCancel(event, customEventData) {
        cc.log("onClickCancel");
        cc.log("click button:",event.target.name);   
        if(this.fnCallbackCancel) {
            this.fnCallbackCancel();
        }
        
        this.close();     
    },    

    // update (dt) {},
});
