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

    // onLoad () {},

    Close() {
        this.node.destroy();
    },

    PlayEnd() {
        this.AniCtrl = this.node.getComponent(cc.Animation);
        this.AniCtrl.on("finished",this.Close,this);
        this.AniCtrl.play("LogoutTip4IdleClose");
    },

    Run() {
        let timenode =  cc.find("msg_txt/time",this.node);
        //cc.log('111111timenode',timenode);
        this.timelabel = timenode.getComponent(cc.Label);
        //cc.log('111111timenode',this.timelabel);      
        this.refreshTime();  

        let ontick = function() {
            cc.log("time dec 11111~~~!!!");
            if(this.time > 0) {
                this.time--;
            } else {
                this.stopTick();
            }

            cc.log("time dec 222222222222~~~!!!");
            cc.log("this.time:",this.time);
            
            this.refreshTime();                        
        }
        this.ticker = setInterval(ontick.bind(this),1000);        
    },

    stopTick() {
        cc.log("stopTick 11111111111111111111~!!!");
        clearInterval(this.ticker);
        this.ticker =  null;
        this.PlayEnd();
        cc.log("stopTick 222222222222222222~!!!");
    },

    refreshTime() {
        cc.log("refreshTime this.time:",this.time);
        this.timelabel.string = this.time;
    },    

    setTime(time) {
        this.time = time;
        //this.refreshTime();
    },

    onDestroy() {
        clearInterval(this.ticker);
        this.ticker =  null;
    },  

    // start () {

    // },

    // update (dt) {},
});
