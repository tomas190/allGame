/*
 * @Author: burt
 * @Date: 2019-10-08 18:13:19
 * @LastEditors: burt
 * @LastEditTime: 2019-10-10 16:19:42
 * @Description: 
 */

cc.Class({
    extends: cc.Component,

    properties: {
        bg: cc.Node,
        label: cc.RichText,
    },

    onLoad() {
        this.dataList = []
        this.isRun = false
        this.flytime = 0.8
        this.delaytime = 1.5
        this.movedis = 200
    },

    start() {

    },

    init(data) {
        for (let i = 0; i < this.dataList.length; i++) {
            if (this.dataList[i] == data) {
                return
            }
        }
        if (this.isRun) {
            this.dataList.push(data)
        } else {
            this.node.active = true
            this.showTip(data)
        }
    },

    showTip(data) {
        this.isRun = true
        this.label.string = data
        this.label._updateRichText()
        this.bg.width = this.label.node.width + 100
        this.bg.heigth = this.label.node.heigth

        this.node.setPosition(0, -this.movedis)
        this.node.opacity = 200
        let m0 = cc.moveBy(this.flytime, cc.v2(0, this.movedis))
        let f0 = cc.fadeTo(this.flytime, 255)
        let d0 = cc.delayTime(this.delaytime)
        let m1 = cc.moveBy(this.flytime, cc.v2(0, this.movedis))
        let f1 = cc.fadeTo(this.flytime, 200)
        let ca = cc.callFunc(() => {
            if (this.dataList.length > 0) {
                this.showTip(this.dataList.shift())
            } else {
                this.isRun = false
                this.node.active = false
            }
        }, this)
        this.node.runAction(cc.sequence(cc.spawn(m0, f0), d0, cc.spawn(m1, f1), ca))
    },

    // update (dt) {},
});
