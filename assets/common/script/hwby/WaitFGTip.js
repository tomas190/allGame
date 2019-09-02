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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {
    // },

    // start () {

    // },

    Close() {
        cc.log("Close wait fish group runing tip");
        this.node.destroy();
    },

    refreshTime() {
        this.timelabel.string = this.time;
    },

    PlayEnd() {
        let moveleft = cc.moveBy(0.5,cc.v2(-1280,0));
        let closePanel = function() {
            let closeByScaleY = cc.scaleTo(0.3, 1, 0.1);            
            let fnDestroy = cc.callFunc(this.Close, this);
            let fend = cc.sequence(closeByScaleY,fnDestroy);
            this.node.runAction(fend);
            
        }

        let callbackCP = cc.callFunc(closePanel,this);

        let fs = cc.sequence(moveleft,callbackCP);
        this.msgTxtNode.runAction(fs);       
    },

    Run() {
        this.msgTxtNode = this.node.getChildByName("msg_txt");
        let timenode =  this.msgTxtNode.getChildByName("time");
        this.timelabel = timenode.getComponent(cc.Label);
        this.refreshTime();

        let callback = function() {
            cc.log("time dec~~~!!!")
            if(this.time > 0) {
                this.time--;
            } else {
                clearInterval(this.ticker);
                this.ticker =  null;
                this.PlayEnd();
            }
            
            this.refreshTime();                        
        }
        this.ticker = setInterval(callback.bind(this),1000);
        
    },

    setTime(time) {
        this.time = time;
    },

    onDestroy() {
        if(this.ticker) {
            clearInterval(this.ticker);
            this.ticker =  null;
        }
    },    

    // update (dt) {},
});
