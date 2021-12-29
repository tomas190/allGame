import { mproto } from "../../../IM_proto/im_proto_msg";
import { EventKind, events } from "../../IM_tools/IM_event";
import IM_global from "../../IM_util/IM_global";

/**
 * 搜索列表🔍
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class SearchList extends cc.Component {

    @property({ type: cc.Prefab, tooltip: "搜索用户预制体" })
    searchUserFab: cc.Prefab = null;
    @property({ type: cc.Prefab, tooltip: "搜索下级用户预制体" })
    searchSubUserFab: cc.Prefab = null;
    @property({ type: cc.EditBox, tooltip: "搜索输入框" })
    searchEditBox: cc.EditBox = null;
    @property({ type: cc.Node, tooltip: "搜索用户节点" })
    searchUserNode: cc.Node = null;
    @property({ type: cc.Node, tooltip: "搜索下级节点" })
    searchSubNdoe: cc.Node = null;
    @property({ type: cc.ScrollView, tooltip: "搜索结果Scroll" })
    searchScroll: cc.ScrollView = null;

    recordText: number = 0;
    // LIFE-CYCLE CALLBACKS:

    loadSubLimit: number = 10;
    loadSubSkip: number = 0;

    onLoad() {
        this.searchSubNdoe.active = false;
        this.searchUserNode.active = false;
        this.responseAction();
    }

    onDestroy() {
        this.removeListenerAction();
    }

    responseAction() {
        events.register(EventKind.S2C_SEARCH_USER, "searchList", this.searchUserResultAction.bind(this));
        events.register(EventKind.S2C_MSG_ERR_MSG_PUSH, "searchList", this.onErrorMsgAction.bind(this));
        events.register(EventKind.S2C_SEARCH_SUB_USER, "searchList", this.searchSubUserResultAction.bind(this));
        events.register(EventKind.S2C_GET_SUB_USER_LIST, "searchList", this.getSubUserListAction.bind(this));
    }

    removeListenerAction() {
        events.unregister(EventKind.S2C_SEARCH_USER, "searchList");
        events.unregister(EventKind.S2C_MSG_ERR_MSG_PUSH, "searchList");
        events.unregister(EventKind.S2C_SEARCH_SUB_USER, "searchList");
        events.unregister(EventKind.S2C_GET_SUB_USER_LIST, "searchList");
    }


    /**
     * 搜索用户成功回调
     * @param searchData 
     */
    searchUserResultAction(searchData: mproto.IRespSearchUser) {
        if (searchData.userInfo) {
            let userFab = cc.instantiate(this.searchUserFab);
            userFab.getComponent("searchUserFab").updateUserFab(searchData.userInfo);
            this.searchScroll.content.removeAllChildren();
            this.searchScroll.content.addChild(userFab);
        }
    }

    /**
     * 搜索下级用户
     * @param searchSubUser 
     */
    searchSubUserResultAction(searchSubUser: mproto.IRespSearchSubUser) {
        if (searchSubUser.userInfo) {
            let userFab = cc.instantiate(this.searchSubUserFab);
            userFab.getComponent("searchUserFab").updateUserFab(searchSubUser.userInfo);
            this.searchScroll.content.removeAllChildren();
            this.searchScroll.content.addChild(userFab);
        }
    }

    /**
     * 加载下级用户列表
     * @param subUserListData 
     */
    getSubUserListAction(subUserListData: mproto.IRespGetSubUserList) {
        if (subUserListData.userInfo.length > 0) {
            console.log("加载下级用户：", subUserListData.userInfo.length);
            let userList = subUserListData.userInfo;
            for (let i = 0; i < userList.length; i++) {
                const userInfo = userList[i];
                let userFab = cc.instantiate(this.searchSubUserFab);
                userFab.getComponent("searchUserFab").updateUserFab(userInfo);
                this.searchScroll.content.removeAllChildren();
                this.searchScroll.content.addChild(userFab);
            }
        }
    }

    /**
     * 消息错误提示
     * @param errMsgData 
     */
    onErrorMsgAction(errMsgData: mproto.IErrMsg) {
        let wrongId = errMsgData.msgId;
        if (wrongId == 109 || wrongId == 110 || wrongId == 111) {
            let userFab = cc.instantiate(this.searchUserFab);
            let promptStr = "没有该用户，请重新输入";
            switch (wrongId) {
                case 109:
                    promptStr = "没有该用户，请重新输入";
                    break;
                case 110:
                    promptStr = "对方不是你的下级";
                    break;
                case 111:
                    promptStr = "你还没有下级";
                    break;
                default:
                    break;
            }
            userFab.getComponent("searchUserFab").showWrongMsgAction(promptStr);
            this.searchScroll.content.removeAllChildren();
            this.searchScroll.content.addChild(userFab);
        }
    }

    /**
     * 搜索用户按钮点击方法
     */
    touchSearchUserAction() {
        //{userId,searchUserId}
        let searchUserId = this.searchEditBox.textLabel.string;
        events.dispatch(EventKind.C2S_SEARCH_USER, {
            userId: IM_global.userInfo.userId,
            searchUserId: searchUserId
        });
        console.log("搜索用户按钮id：", searchUserId);
    }

    /**
     * 搜索下级按钮点击方法
     */
    touchSearSubUserAction() {
        console.log("搜索下级id：", this.searchEditBox.textLabel.string);
        let searchUserId = this.searchEditBox.textLabel.string;
        events.dispatch(EventKind.C2S_SEARCH_SUB_USER, {
            userId: IM_global.userInfo.userId,
            searchUserId: searchUserId
        });
    }

    /**
     * 加载下级用户点击方法
     */
    loadSubUserAction() {
        let loadSubParams = { userId: IM_global.userInfo.userId, skip: this.loadSubSkip, limit: this.loadSubLimit };
        console.log("loadSubParams", loadSubParams);
        events.dispatch(EventKind.C2S_GET_SUB_USER_LIST, loadSubParams);
    }

    /**
     * 输入框变化时方法
     * @param textObj 
     */
    changeEditTextAction(textNum) {
        let textString = String(textNum);
        // if(textString.length == 11) {
        //     this.recordText = textNum;
        // }
        // if(textString.length > 11) {
        //     this.searchEditBox.blur();
        //     console.log("this.recordText == ", this.recordText);
        //     this.searchEditBox.string = String(this.recordText);
        //     this.searchEditBox.textLabel.string = String(this.recordText);
        // }
        if (textString.length > 7) {
            if (!this.searchUserNode.active) {
                this.searchUserNode.active = true;
                this.searchSubNdoe.active = true;
            }

        } else {
            if (this.searchUserNode.active) {
                this.searchUserNode.active = false;
                this.searchSubNdoe.active = false;
            }
        }
    }

    /**
     * 回到用户列表
     */
    backToUserListAction() {
        this.node.active = false;
        this.searchScroll.content.removeAllChildren();
        this.searchEditBox.string = "";
    }



    // update (dt) {}
}
