const hqqLanguage = require("../common/hqqLanguage");


cc.Class({
    extends: cc.Component,

    properties: {
        bg: cc.Node,
        label: cc.RichText,
    },

    onLoad() {
        this.data = null;
        this.closeSprite = null;
    },

    start() {

    },

    UILoad(){
        if(hqq.app.pinpai === "ninetwo" ){
            hqq.setSprite(this.bg,{path:"base/ninetwo/img/psomf"});
            // if(!this.closeSprite){
            //     this.closeSprite = hqq.addNode(this.bg,{path:"base/ninetwo/img/x"});
            // }
        }
    },
    init(data) {
        this.data = data
        this.UILoad();
        let msg = data
        if (data && data.msg) {
            msg = data.msg
        }
        if (!this.dataList) {
            this.dataList = []
            this.isRun = false
            this.flytime = 0.6
            this.delaytime = 1.5
            this.movedis = 150
        }
        for (let i = 0; i < this.dataList.length; i++) {
            if (this.dataList[i] == msg) {
                return
            }
        }
        if (this.isRun) {
            this.dataList.push(msg)
        } else {
            this.node.active = true
            this.showTip(msg)
        }
    },

    showTip(data) {
        this.isRun = true
        this.label.string = data
        this.label._updateRichText()
        this.bg.width = this.label.node.width + 100
        this.bg.heigth = this.label.node.heigth
        if (this.data && this.data.position) {
            this.node.setPosition(this.data.position.x, this.data.position.y - this.movedis)
        } else {
            this.node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2 - this.movedis)
        }
        if(cc.isValid(this.closeSprite)){
            this.closeSprite.x = -((this.bg.width/2)-24);
        }
        this.node.opacity = 150
        let m0 = cc.moveBy(this.flytime, cc.v2(0, this.movedis))
        let f0 = cc.fadeTo(this.flytime, 255)
        let d0 = cc.delayTime(this.delaytime)
        let m1 = cc.moveBy(this.flytime, cc.v2(0, this.movedis))
        let f1 = cc.fadeTo(this.flytime, 150)
        let ca = cc.callFunc(() => {
            if (this.dataList.length > 0) {
                this.showTip(this.dataList.shift())
            } else {
                this.isRun = false
                this.node.destroy()
            }
        }, this)
        this.node.runAction(cc.sequence(cc.spawn(m0, f0), d0, cc.spawn(m1, f1), ca))
    },

    // update (dt) {},
});
