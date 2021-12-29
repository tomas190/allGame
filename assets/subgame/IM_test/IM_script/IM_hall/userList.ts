import { mproto } from "../../IM_proto/im_proto_msg";
import { EventKind, events } from "../IM_tools/IM_event";
import IM_global from "../IM_util/IM_global";

/**
 * 用户列表业务
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class UserList extends cc.Component {

    @property({ type: cc.Node, tooltip: "搜索列表节点" })
    searchListNode: cc.Node = null;
    @property({ type: cc.Node, tooltip: "聊天室节点" })
    IMChatSceneNode: cc.Node = null;
    @property({ type: cc.Node, tooltip: "房间列表节点" })
    IMHallSceneNode: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:
    start() {
        this.responseAction();
        console.log("IM_global.isAutoEnterRoom == ", IM_global.isAutoEnterRoom);
        this.scheduleOnce(() => {
            if (IM_global.isAutoEnterRoom) {
                IM_global.isAutoEnterRoom = false;
                events.dispatch(EventKind.SHOWCHATSCENE, {});
            }
        }, 1);

    }

    onDestroy() {
        this.removeListenAction();
    }

    responseAction() {
        events.register(EventKind.SHOWCHATSCENE, "UserList", this.showChatSceneAction.bind(this));
    }

    removeListenAction() {
        events.unregister(EventKind.SHOWCHATSCENE, "UserList");
    }


    /**
    * 搜索按钮方法
    */
    searchBtnAction() {
        //充值自动跳转时，不能点击搜索
        if (IM_global.isAutoEnterRoom) {
            return;
        }
        this.searchListNode.active = true;
    }

    showChatSceneAction() {
        this.IMChatSceneNode.active = true;
    }

}
