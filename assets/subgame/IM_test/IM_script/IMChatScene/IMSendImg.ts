import { app } from "../IM_tools/IM_config";
import { EventKind, events } from "../IM_tools/IM_event";
import IM_DataTool from "../IM_util/IM_DataTool";
import IM_global from "../IM_util/IM_global";

/**
 * 发送图片
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class IMSendImg extends cc.Component {

    @property({ type: cc.Node, tooltip: "图片节点" })
    imgNode: cc.Node = null;

    imgLocalData = null;//web端本地图片地址
    imgFileName = ''; //原生端上传图片成功后文件名

    onLoad() {

        this.responseAction();
    }

    responseAction() {
        events.register(EventKind.Get_LocalImgPath, "IMSendImg", this.getLocalImgPath.bind(this));
        events.register(EventKind.Get_ImgPath_Native, "IMSendImg", this.getImagPathNative.bind(this));

    }

    onDestroy() {
        events.unregister(EventKind.Get_LocalImgPath, "IMSendImg");
        console.log(EventKind.Get_ImgPath_Native, "IMSendImg");

    }


    /**
     * 获取本地图片Web端
     * @param imgDataObj 
     */
    getLocalImgPath(imgDataObj) {
        if (imgDataObj && imgDataObj.imgData) {
            this.imgLocalData = imgDataObj.imgData;
            // this.sendImgAction();
            IM_DataTool.changeSpriteFrameWithServerUrlForWeb(this.imgNode, imgDataObj.imgData);
        }
    }
    /**
     * 原生上传图片成功回调
     * @param data 
     */
    getImagPathNative(imgDataObj) {
        if (imgDataObj && imgDataObj.imgFileName) {
            this.imgFileName = imgDataObj.imgFileName;
            // this.sendImgAction();
            let imgUrl = app.AppImgUrl + app.AppImgPath + imgDataObj.imgFileName;
            console.log("图片链接：", imgUrl);
            
            IM_DataTool.changeSpriteFrameWithServerUrlForWeb(this.imgNode, imgUrl);
        }
    }

    /**
    * 发送图片方法
    */
    sendImgAction() {
        this.node.active = false;
        if (cc.sys.isNative) {
            if (this.imgFileName.length > 0) {
                this.sendImgToOther(this.imgFileName);
                this.imgFileName = '';
            }
        } else {
            if (this.imgLocalData) {
                this.uploadImgAction();
            }
        }
    }

    /**
     * 取消发送图片
     */
    cancelSendImg() {
        console.log("取消发送");
        this.node.active = false;
        if (cc.sys.isNative) {

        } else {
            document.getElementById("file").value = "";
        }
    }

    /**
     * 上传图片到服务器
     */
    uploadImgAction() {
        let fileObj = document.getElementById("file").files[0];
        let fileDom = document.getElementById("file");
        let url = app.UploadImgURL;
        if (!fileObj) {
            console.log("未选择文件");

        } else {
            let self = this;
            let from = new FormData();
            from.append("file", fileObj);
            let xhr = new XMLHttpRequest();
            xhr.upload.addEventListener("progress", function (evt) {
                if (evt.lengthComputable) {
                    var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                    console.log('上传中' + percentComplete + "%");
                    //派发上传事件

                } else {
                    console.log("计算失败")
                }
            }, false);
            xhr.onload = function (data) {
                fileDom.value = "";
                let dataObj = data.target.response;
                if (dataObj.code == 200) {
                    let imgUrl = dataObj.data.file_name;
                    //图片发送成功后，发送消息给后台
                    self.sendImgToOther(imgUrl);
                }

            };
            xhr.onerror = function (data) {
                //cc.gg.global.isfiles = true
                fileDom.select();
                fileDom.value = "";

            };
            xhr.upload.onloadstart = function (data) {
                fileDom.select();
                fileDom.value = "";

            };
            xhr.responseType = 'json';
            xhr.open("post", url);
            xhr.send(from);
        }
    }

    /**
     * 发送图片
     * @param fileName 上传成功后的图片
     */
    sendImgToOther(fileName: string) {
        //图片发送成功后，发送消息给后台
        let currentUser = IM_global.userInfo;
        let toUserInfo = IM_global.currentChat;
        let uuid = IM_DataTool.creatUUid();
        let sendTime = Math.round(new Date().getTime() / 1000);
        let sendMsgParams = {
            userHeadImg: currentUser.userHeadImg, userId: currentUser.userId,
            userNick: currentUser.userNick, toUserHeadImg: toUserInfo.toUserHeadImg,
            toUserId: toUserInfo.toUserId, toUserNick: toUserInfo.toUserNick,
            contentType: 2, content: fileName,
            msgType: 1, msgKind: 1,
            msgId: uuid, sendTime: sendTime
        };
        // console.log("sendMsgParams == ", sendMsgParams);
        events.dispatch(EventKind.C2S_SEND_CHAT_MSG, sendMsgParams);
    }

}
