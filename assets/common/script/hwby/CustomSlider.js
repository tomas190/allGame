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

    onLoad ()
    {
        cc.log("customslider onload!!");
        this.progressbar = this.node.getChildByName("progressBar").getComponent(cc.ProgressBar);
        this.slider = this.node.getComponent(cc.Slider);
    },

    setCallBackOnChange(callback) 
    {
        this.callback = callback;
    },

    setProgress(value)
    {
        //cc.log("customslider setProgress!!");
        this.progressbar.progress = value;
        this.slider.progress = value;        
    },

    onSliderChange(slider, customEventData)
    {
        //cc.log("slider.progress",slider.progress);
        this.progressbar.progress = slider.progress;
        if(this.callback) {
            this.callback(this.progressbar.progress);
        }
    },

    getProgress() {
        //cc.log("getProgress",this.progressbar.progress);
        return this.progressbar.progress;
    },

    start () {

    },

    // update (dt) {},
});
