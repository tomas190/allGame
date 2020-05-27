cc.Class({
    extends: cc.Component,
    properties: {
        Bloading: false,
        curUiName: new Array,
    },
    isLoading: function () {
        return this.Bloading;
    },
    add: function (e, t) {
        var i;
        var a = this.getItem(e);
        if (!a) {
            this.removeCurrentLoadingUI();
            cc.gg.utils.ccLog("没有保存在UIarray,加载中")
        }else{
            this.Bloading = false;
        }
    }
})