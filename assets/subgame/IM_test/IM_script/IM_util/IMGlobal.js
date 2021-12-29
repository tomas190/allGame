const { events, EventKind } = require("../IM_tools/IM_event");
let gHandler = require("gHandler");
/**
 * 原生监听
 */
cc.Class({
    extends: cc.Component,

    /**
      * android 原生上传图片回调
      * @param {*} code 1上传图片成功，2上传图片失败，3上传图片中
      * @param {*} imageStr 上传图片成功返回的图片链接，其他情况为提示信息
      */
    onUploadImageCallback(code, imageStr) {
        if (code == 1) {
            console.log("原生发送图片成功返回信息 == ", imageStr);
            events.dispatch(EventKind.Get_ImgPath_Native, { imgFileName: imageStr });
        } else {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "请重新选择图片" + code);
        }
    },

    onUploadImageCallbackIOS(imgStr) {
        if (imgStr) {
            let imgData = JSON.parse(imgStr);
            if (imgData.code == 200) {
                let imageStr = imgData.data.file_name;
                events.dispatch(EventKind.Get_ImgPath_Native, { imgFileName: imageStr });
            } else {
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "请重新选择图片");
            }
        }
    }
});
