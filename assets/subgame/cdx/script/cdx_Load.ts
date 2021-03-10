import { initWebSocket, initio } from "./network/receive";
import { events, EventKind } from "./conf/event";
import { msg } from "./proto/proto_cdx_msg";
import Storage from "./cdx_Storage";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    a : number[] = []
    onLoad () {
        // 初始socket并登录
        initWebSocket()
        // 注册事件
        this.RegisterEvent()
        // 显示加载
        this.ShowJiaZai()
        cc.assetManager.loadBundle("cdxRes", function (err) {
            if (err) {
                return console.error(err);
            }
            let cdxRes = cc.assetManager.getBundle("cdxRes");
            console.log('load subpackage script successfully.', "cdxRes");
        });
    }

    start () {

    }

    private RegisterEvent() {
        events.register(EventKind.S2C_Login, "cdx_Load", this.Login.bind(this));
        events.register(EventKind.S2C_EnterRoom, "cdx_Load", this.EnterRoom.bind(this));
    }

    private Login(data: msg.ILogin_S2C) {
        if (data == null) {
            return;
        }
        Storage.SetUserInfo(data.playerInfo); 

        console.log("玩家登录成功:",data.playerInfo)
        if (data.backroom == false) {
            let succFont = cc.find("Canvas/roomLoad/cdxSences/succFont")
            cc.director.preloadScene("cdx_roomList", function () {
                succFont.active = true
                console.log("cdx_roomList 预加载完成");
                cc.director.loadScene("cdx_roomList");
            });
        }
    }

    private EnterRoom(data: msg.IEnterRoom_S2C) {
        if (data == null) {
            return;
        }
        Storage.SetRoomData(data.roomData);

        console.log("玩家返回当前房间:",data)
        cc.director.preloadScene("cdx_gameScens", function () {
            console.log("cdx_gameScens界面 预加载完成");
            cc.director.loadScene("cdx_gameScens");
        });
    }

    ShowJiaZai() {
        let dian = "Canvas/roomLoad/cdxSences/dian/"
        for (let i = 0; i < 26; i++) {
            let str = "dian" + i 
            let dianAct = cc.find(dian+str)
            let qiu = dianAct.getChildByName("qiu")
            setTimeout(() => {
                qiu.active = true
            }, i * 30);
        }
    }

    cancelEvents() {
        console.log("cdx_Load 取消监听事件~")
        events.unregister(EventKind.S2C_Login, "cdx_Load");
    }

    onDestroy() {
        // 取消监听事件
        this.cancelEvents()
    }

    // update (dt) {}
}
