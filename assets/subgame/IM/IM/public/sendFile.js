cc.Class({
    extends: cc.Component,

    properties: {

    },
    onLoad: function () {
        this.initView();
        this.addEvenListener();
    },
    initView: function () {
        this.imgBox = this.node.getChildByName("imgBox");
        this.alertImg = this.imgBox.getChildByName("alertImg");
        this.botton = this.imgBox.getChildByName("botton");
        this.cancel = this.botton.getChildByName("cancel");
        this.send = this.botton.getChildByName("send");
    },
    /**
     * 
     * @param {img music vedio ..*} type 
     * @param {sizeX sizeY datas ..} data 
     */
    resetView: function (data) {
        var self = this;
        //这里存一下本地信息
        if (data.type == "img") {
            //图片展示
            this.fieData = data;            
            this.autoImg(data.datas, this.alertImg, function () {
                self.node.active = true;
            })
        } else {
            alert("暂不允许发送此文件");
        }
    },
    //精灵图片自适应算法
    autoImg: function (url, imgNode, callFun) {
        var img = new Image();
        img.src = url;
        // img.onload = function () {
        //     //取渲染节点宽高
        //     var width = imgNode.width;
        //     var height = imgNode.height;
        //     if (this.width > 0 && this.height > 0 && this.width && this.height) {
        //         var size = {
        //             X: 0,
        //             Y: 0,
        //         }
        //         if (this.width >= this.height) {
        //             //采取宽适配
        //             var scale = width / this.width;
        //             size.Y = this.height * scale;
        //             size.X = width
        //         } else {
        //             //采取高适配
        //             var scale = height / this.height;
        //             size.X = this.width * scale;
        //             size.Y = height;
        //         }
        //         imgNode.width = size.X;
        //         imgNode.height = size.Y;
        //         cc.gg.utils.changeSpriteFrameWithServerUrlForWeb(imgNode, url);
        //         callFun()
        //     }
        // }
        cc.gg.utils.changeSpriteFrameWithServerUrlForWeb(imgNode, url);
        callFun()
    },
    addEvenListener: function () {
        cc.gg.utils.addClickEventEND(this.cancel, this.cancelFun.bind(this));
        cc.gg.utils.addClickEventEND(this.send, this.sendFun.bind(this));
    },

    /**
     * 发送图片，弹框取消
     */
    cancelFun: function () {
        //隐藏节点 注销掉选择的文件
        this.node.active = false;
        document.getElementById("file").value = "";
        // if (cc.sys.isNative) {
        //     return;
        // }
    },
    /**
     * 发送图片弹框确认方法
     */
    sendFun: function () {
        var self = this;
        this.node.active = false;
        //派发创建本地精灵指令
        if (this.fieData) {
            let datas = {
                content: this.fieData.datas,
                content_type: 2,
                msg_type: 2,
                msg_id: cc.gg.utils.getUUid(),
                time: new Date().getTime()      
              };
            cc.gg.protoBuf.onmessage("CreateImg", this.fieData, true);
            if(cc.sys.isNative) {
                cc.gg.protoBuf.onmessage("UpLoad", datas, true);
            }
        } else {
            console.log("无数据")
            return
        }
        if (!cc.sys.isNative){
            console.log(2222222);
            //发送file
            cc.gg.file.upLoad();
        }
       
    },
});