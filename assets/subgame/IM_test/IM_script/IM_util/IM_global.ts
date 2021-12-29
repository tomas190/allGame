import { mproto } from "../../IM_proto/im_proto_msg";

class global {
    vv: Object = {
        http: {},
    };
    localVersion: number;
    //正在观战中
    isWatching: boolean = false;
    isShowHouseBead: boolean = false;
    //加载节点
    loadingBgNode: cc.Node;
    isNetWorkBreakDown: boolean = false; // 是否断网
    //当前用户
    userInfo: mproto.IUserInfo = null;
    //当前聊天
    currentChat = null;
    //播放音效
    isPlayrAudio: boolean = true;
    //是否在房间内
    isInRoom: boolean = false;
    //是否自动进入房间
    isAutoEnterRoom: boolean = false;
    //两秒后才结束会话
    isCanTouchEnd: boolean = true;
}

export default new global();