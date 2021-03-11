import { initWebSocket, initio } from "./network/cdx_receive";
import { events, EventKind } from "./conf/cdx_event";
import { msg } from "./proto/proto_cdx_msg";
import Sound from "./cdx_Sound";
import Storage from "./cdx_Storage";
import gHandler = require("../../../base/common/gHandler")

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property({ type: cc.Label, tooltip: "昵称" })
    NickName: cc.Label = null;
    @property({ type: cc.Label, tooltip: "金币" })
    Money: cc.Label = null;
    @property({ type: cc.Sprite, tooltip: "头像" })
    Image: cc.Sprite = null;

    private joinTime: number = 0;   // 加入房间间隔时间

    onLoad () {
        // 注册事件
        this.RegisterEvent()
        // 渲染玩家信息
        this.ShowPlayerInfo()
        // 判断大厅音效是否关闭
        // this.JudgeHallAdudio()
        // 播放音乐
        Sound.PlayBackMusic()

        // 渲染房间动画
        let room = cc.find("Canvas/roombg/room")
        room.getComponent(sp.Skeleton).setAnimation(1, "cdx_room1", true)
    }

    private RegisterEvent() {
        events.register(EventKind.S2C_Login, "cdx_Room", this.Login.bind(this));
        events.register(EventKind.S2C_Logout, "cdx_Room", this.Logout.bind(this));
        events.register(EventKind.S2C_JoinRoom, "cdx_Room", this.JoinRoom.bind(this));
    }

    // 玩家登录
    private Login(data: msg.ILogin_S2C) {
        if (data == null) {
            return;
        }
        Storage.SetUserInfo(data.playerInfo); 

        console.log("玩家登录成功:", data.playerInfo)

        // 渲染玩家信息
        this.ShowPlayerInfo()
        // 显示房间类型
        this.ShowRoomType(data.PlayerNum)
    }
    
    // 返回大厅
    private Logout(data: msg.ILogout_S2C) {
        cc.director.loadScene("hall");
        initio();
    }

    // 进入房间
    private JoinRoom(data: msg.IJoinRoom_S2C) {
        if (data == null) {
            return;
        }
        Storage.SetRoomData(data.roomData); 

        // 关闭进入缓冲 todo

        if (Storage.UserInfo.Id == Storage.PlayerData.playerInfo.Id) {
            console.log("进入房间成功:", data)
    
            cc.director.preloadScene("cdx_gameScens", function () {
                console.log("cdx_gameScens界面 预加载完成");
                cc.director.loadScene("cdx_gameScens");
            });
        }
    }

    // 判断大厅的音效是否关闭
    JudgeHallAdudio() {
        let bool  = gHandler.audioMgr.getBgState()
        // todo 对自己的音乐资源进行操作
        if (bool == true) {
            // 全局控制音效
            Sound.IsOpenMusic = true;
        }
        if (bool == false) {
            // 全局控制音效
            Sound.IsOpenMusic = false;
        }
    }

    ShowPlayerInfo() {
        this.NickName.string = Storage.UserInfo.nickName
        this.Money.string = Storage.ShowMoney(Storage.UserInfo.account)
        // 加载头像
        let url = Storage.GetPlayerHead(Storage.UserInfo.headImg) 
        Storage.loadSpriteAtlas(this.Image, url)
    }
    ShowRoomType(num: number) {
        if (num >= 0 || num <= 50) {
            let yongji = cc.find("Canvas/roombg/room/yongji")
            yongji.active = true
        }
        if (num >= 51 || num <= 100) {
            let baoman = cc.find("Canvas/roombg/room/baoman")
            baoman.active = true
        }
        if (num >= 100) {
            let huobao = cc.find("Canvas/roombg/room/huobao")
            huobao.active = true
        }
    }
    // 房间点击事件
    onclick(eve,num: number) {
        Sound.PlayAudio(Sound.LoadAudio(0))
       
        if (this.joinTime != 0) {return;}
        this.joinTime = 2;

        // 1、返回大厅
        if (num == 1) {
            // 返回大厅点击事件
            let data : msg.ILogout_C2S = {
            }
            events.dispatch(EventKind.C2S_Logout, data);
        }
        // 2、规则
        if (num == 2) {
            let cdx_zhedangwu = cc.find("Canvas/roombg/cdx_zhedangwu")
            cdx_zhedangwu.active = true
            let rule = cc.find("Canvas/roombg/rule")
            rule.active = true
        }
        // 3、商城
        if (num == 3) {

        }
        // 4、房间点击
        if (num == 4) {
            let data : msg.IJoinRoom_C2S = {
                roomId: "1",
            }
            events.dispatch(EventKind.C2S_JoinRoom, data);

            // 开启进入房间缓冲
            let jiazai = cc.find("Canvas/roombg/jiazaiLoading")
            jiazai.active = true
        }
    }
    // 规则点击事件
    ruleClick(eve,num: number) {
        Sound.PlayAudio(Sound.LoadAudio(0))
        if (num == 1) {
            let cdx_zhedangwu = cc.find("Canvas/roombg/cdx_zhedangwu")
            cdx_zhedangwu.active = false
            let rule = cc.find("Canvas/roombg/rule")
            rule.active = false
        }
    }

    // 网址点击
    internetClick(eve,num: number) {
        if (num == 1) {
            cc.sys.openURL("http://77tj.org/tencent")
        }
    }

    update (dt) {
        if (this.joinTime - dt >= 0) {
            this.joinTime -= dt;
        } else {
            this.joinTime = 0;
        }
    }

    onDestroy() {
        console.log("roomList 场景销毁！！！")

        // 取消监听事件
        this.cancelEvents()
    }

    cancelEvents() {
        console.log("roomList 取消监听事件~")
        events.unregister(EventKind.S2C_Login, "cdx_Room");
        events.unregister(EventKind.S2C_Logout, "cdx_Room");
        events.unregister(EventKind.S2C_JoinRoom, "cdx_Room");
    }
}
