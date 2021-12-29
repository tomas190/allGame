import { mproto } from "../../../../IM_proto/im_proto_msg";
import { EventKind, events } from "../../../IM_tools/IM_event";
import IM_DataTool from "../../../IM_util/IM_DataTool";
import IM_global from "../../../IM_util/IM_global";

/**
 * 搜索用户预制体
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class SearchUserFab extends cc.Component {

    @property({ type: cc.Label, tooltip: "用户昵称" })
    userNameLabel: cc.Label = null;
    @property({ type: cc.Label, tooltip: "用户Id" })
    userIdLabel: cc.Label = null;
    @property({ type: cc.Sprite, tooltip: "用户头像" })
    userHeadPic: cc.Sprite = null;
    @property({ type: cc.Node, tooltip: "错误提示" })
    errorNode: cc.Node = null;

    userData: mproto.IUserInfo = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    // update (dt) {}

    /**
     * 更新用户展示界面
     * @param userData 用户数据
     */
    updateUserFab(userData: mproto.IUserInfo) {
        // console.log("userData == ", userData);
        
        this.userNameLabel.string = userData.userNick;
        this.userIdLabel.string = userData.userId;
        if (userData && userData.userHeadImg.length > 0) {
            IM_DataTool.getPlayerHeadPictureByAtlas(userData.userHeadImg, (error, spriteFrame) => {
                if (error) {
                    return;
                }
                this.userHeadPic.spriteFrame = spriteFrame;
            });
        }
        this.userData = userData;
    }

    showWrongMsgAction(promtStr: string) {
        this.userHeadPic.node.active = false;
        this.userIdLabel.node.active = false;
        this.userNameLabel.node.active = false;
        this.errorNode.active = true;
        this.errorNode.getComponent(cc.Label).string = promtStr;
    }

    /**
     * 进入房间
     */
    enterChatRoom() {
        // console.log("userData == ", this.userData);
        //断网后不能进入房间
        if (IM_global.isNetWorkBreakDown) {
            return;
        }
        IM_global.currentChat = {
            toUserId: this.userData.userId, toUserNick: this.userData.userNick,
            toUserHeadImg: this.userData.userHeadImg
        };
        // cc.director.loadScene("IMChatScene");
        events.dispatch(EventKind.SHOWCHATSCENE,{});
    }
}
