


cc.Class({
    extends: cc.Component,

    properties: {
        label: cc.Label,
        spine: sp.Skeleton,
    },

    onLoad() {
        this.UILoad()
    },
    // start() {},
    // UI动态加载
    UILoad() {
        let aninode = cc.find("congratulation/aninode")
        hqq.skeletonLoad(aninode, "bigimg/language/" + hqq.language + "/gongxihuode", "chuxian", true,hqq["hall_"+hqq.app.pinpai])

        let ensurebtn = cc.find("congratulation/aninode/ensurebtn")
        hqq.btnLoad(ensurebtn, "language/" + hqq.language + "/img/p_btn_confirm2",null, true,hqq["hall_"+hqq.app.pinpai])
    },
    init(data) {
        this.spine.setCompleteListener(this.completeListener.bind(this))
        this.label.string = data + hqq.getTip("str6")
    },
    onClickEnsure() {
        this.node.destroy()
    },
    completeListener() {
        this.spine.setAnimation(0, 'xunhuan', true)
        this.spine.setCompleteListener(null)
    },

    // update (dt) {},
});
