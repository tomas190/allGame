cc.Class({
    extends: cc.Component,

    properties: {

    },
    onLoad: function() {
        this.initView();
        this.initNode();
    },
    initNode: function() {

    },
    initView: function() {

    },
    setView: function(type, text, node) {
        this.kind = {
            "net_content": 1,
            "game_err": 2,
            "game_hall": 3
        }
        this.button = this.node.getChildByName("button");
        this.cancel = this.node.getChildByName("cancel");
        this.text = this.node.getChildByName("text");
        this.text.getComponent(cc.Label).string = text;
        cc.gg.utils.addClickEventEND(this.cancel, this.funCancel.bind(this), { flag: true, type: type, node: node });
        cc.gg.utils.addClickEventEND(this.button, this.funButton.bind(this), { flag: true, type: type, node: node });

    },
    funCancel: function(node, data) {
        if (this.kind[data.type] == 1) {
            cc.gg.protoBuf.connect(cc.gg.global.socket, false)
        } else if (this.kind[data.type] == 2) {

        } else if (this.kind[data.type] == 3) {
            //cc.director.loadScene("NNGame");
            data.node.parent.getComponent("QZNNGameView").backRoomList()
        }
        data.node.removeAllChildren()
    },
    funButton: function(node, data) {
        if (this.kind[data.type] == 1) {
            // 重连网络
            cc.gg.protoBuf.connect(cc.gg.global.socket, false)
        } else if (this.kind[data.type] == 2) {

        } else if (this.kind[data.type] == 3) {
            //cc.director.loadScene("NNGame");
            data.node.parent.getComponent("QZNNGameView").backRoomList()
        }
        data.node.removeAllChildren()
    },
});