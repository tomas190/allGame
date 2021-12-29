
cc.Class({
    extends: cc.Component,

    properties: {
        cxtime: cc.Label,
        fftime: cc.Label,
        totalgold: cc.Label,
    },

    onLoad() {
        this.UILoad()
    },

    start() {

    },
    // UI动态加载
    UILoad() {
        if(!cc.isValid(this.node)){
            console.log("hallHBY UILoad 节点不存在")
            return;
        }
        let hdcxsj = cc.find("hbylayer/hdcxsj")
        hqq.imgLoad(hdcxsj, "base/language/" + hqq.language + "/img/hdcxsj")
        let hdffsj = cc.find("hbylayer/hdffsj")
        hqq.imgLoad(hdffsj, "base/language/" + hqq.language + "/img/hdffsj")
        let hdyzje = cc.find("hbylayer/hdyzje")
        hqq.imgLoad(hdyzje, "base/language/" + hqq.language + "/img/hdyzje")
        let tjhby = cc.find("hbylayer/tjhby")
        hqq.imgLoad(tjhby, "base/language/" + hqq.language + "/img/tjhby")
        let zi = cc.find("hbylayer/zi")
        hqq.imgLoad(zi, "base/language/" + hqq.language + "/img/zi")
        let intro = cc.find("hbylayer/intro")
        intro.getComponent(cc.Label).string = hqq.getTip("intro")

    },

    init(data) {
        this.cxtime.string = data.start_date + hqq.getTip("showtip82") + data.end_date
        this.fftime.string = data.start + ":00"
        this.totalgold.string = data.total + ":00" + hqq.getTip("showtip83")
    },

    onClickExit() {
        this.node.destroy()
    },
    // update (dt) {},
});
