let gHandler = require("../../../../base/common/gHandler");
import { mproto } from "../../IM_proto/im_proto_msg";
import { closeWebSocket, initWebSocket, resetConnetTime } from "../IM_net/IM_client";
import { app } from "../IM_tools/IM_config";
import { EventKind, events } from "../IM_tools/IM_event";
import IM_global from "../IM_util/IM_global";

/**
 * IM加载页（初始页面）
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class IMStartScene extends cc.Component {

    @property({ type: cc.ProgressBar, tooltip: "加载节点" })
    progressBar: cc.ProgressBar = null;

    @property({ type: cc.Label, tooltip: "提示文本" })
    promptLabel: cc.Label = null;


    onLoad() {
        resetConnetTime();
        this.promptLabel.string = "登录中";
        initWebSocket((isSuccess) => {
            console.log("isSuccess == ", isSuccess);
        });
        this.responseAction();
        IM_global.isNetWorkBreakDown = false;
        //上传图片链接及图片显示
        if (gHandler.gameGlobal.im_host) {
            console.log("gHandler.gameGlobal.im_host == ", gHandler.gameGlobal.im_host);

            app.UploadImgURL = gHandler.gameGlobal.im_host + "/im/api/upload";
            app.AppImgUrl = gHandler.gameGlobal.im_host;
            console.log("UploadImgURL == ", app.UploadImgURL);
            console.log("app.AppImgUrl == ", app.AppImgUrl);
        }
    }

    start() {

    }

    onDestroy() {
        this.unRegisgerAction();
    }

    // update (dt) {}

    responseAction() {
        events.register(EventKind.S2C_Login, "IMStartScene", this.loginSuccess.bind(this));
        events.register(EventKind.PushAutoEnterConversion, "IMStartScene", this.pushAutoEnterConversion.bind(this));
        events.register(EventKind.S2C_MSG_ERR_MSG_PUSH, "IMStartScene", this.onErrorMsgAction.bind(this));

    }

    unRegisgerAction() {
        events.unregister(EventKind.S2C_Login, "IMStartScene");
        events.unregister(EventKind.PushAutoEnterConversion, "IMStartScene");
        events.unregister(EventKind.S2C_MSG_ERR_MSG_PUSH, "IMStartScene");
    }

    /**
   * 登录成功
   * @param {'*'} loginData 
   */
    loginSuccess(loginData) {
        this.promptLabel.string = "登录成功";
        console.log("loginData == ", loginData);
        IM_global.userInfo = loginData;
    }

    onErrorMsgAction(errMsgData) {
        console.log("服务器报错信息：", errMsgData);
    }

    /**
     * 收到人工代充消息
     * @param pushData 
     */
    pushAutoEnterConversion(pushData: mproto.IPushAutoEnterConversion) {
        console.log("pushData == ", pushData);
        console.log("pushData IsExist: ", pushData.isExist);

        if (pushData.isExist && pushData.conversion) {
            IM_global.currentChat = pushData.conversion;
            IM_global.isAutoEnterRoom = true;
            IM_global.isInRoom = true;
            this.progressBarCode(true);

        } else {
            IM_global.isAutoEnterRoom = false;
            this.progressBarCode(false);
        }
    }



    /**
     * 返回大厅
     */
    backToHallAction() {
        gHandler.reflect.setOrientation("landscape", 1334, 750);
        cc.director.loadScene("hall");
        closeWebSocket();
    }

    /**
     * loading加载
     * @param isOrderMsg 人工代充直接进聊天
     */
    progressBarCode(isOrderMsg: boolean) {
        let enterRoom = "IMHallScene";
        cc.director.preloadScene(enterRoom, (e, t, i) => {
            //资源监听器
            if (this.progressBar) {
                this.progressBar.progress = e / t;
                var a = Math.round(e / t * 100) + "%";
                this.promptLabel.string = "加载中" + a;
                if (e / t == 1) {
                    this.scheduleOnce(() => {
                        cc.director.loadScene(enterRoom);
                    }, 0.8);
                }
            }
        }, (error, asset) => {
            if (error) {
                console.log("error: ", error);
            }
        })
    }
}
