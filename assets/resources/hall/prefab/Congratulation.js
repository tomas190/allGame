/*
 * @Author: burt
 * @Date: 2019-10-11 18:07:01
 * @LastEditors: burt
 * @LastEditTime: 2019-10-12 13:00:38
 * @Description: 恭喜获得金币
 */


cc.Class({
    extends: cc.Component,

    properties: {
        label: cc.Label,
        spine: sp.Skeleton,
    },

    onLoad() {
        this.spine.setCompleteListener(this.completeListener.bind(this))
        this.spine.setAnimation(0, 'chuxian', true)
    },
    // start() {},
    init(data) {
        this.label.string = data + "金"
    },
    onClickEnsure() {
        this.node.removeFromParent(true)
    },
    completeListener() {
        this.spine.setAnimation(0, 'xunhuan', true)
        this.spine.setCompleteListener(null)
    },

    // update (dt) {},
});
