
import { events, EventKind } from "./conf/cdx_event";
import { msg } from "./proto/proto_cdx_msg";
import Sound from "./cdx_Sound";
import Storage from "./cdx_Storage";
import gHandler = require("../../../base/common/gHandler")

const {ccclass, property} = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {
    // 定时器
    ticker: any = null;
    // 操作时长
    timer: number = 15;
    // 间隔时间0.05秒
    intervalTime: number = 16;

    bankerTime: number = 0;
    downBetTime: number = 0;

    IsClickBanker : boolean = false // 是否点击庄家阶段按钮(true不显示按钮)

    func: any;  // 时间回调函数

    playerInfo: msg.IPlayerInfo = null  // 用于记录头像框玩家信息

    num_arrPot1: cc.Node[] = []; // 筹码记录池，方便后期清空
    num_arrPot2: cc.Node[] = []; // 筹码记录池，方便后期清空
    num_arrPot3: cc.Node[] = []; // 筹码记录池，方便后期清空
    num_arrPot4: cc.Node[] = []; // 筹码记录池，方便后期清空
    num_arrPot5: cc.Node[] = []; // 筹码记录池，方便后期清空
    num_arrPot6: cc.Node[] = []; // 筹码记录池，方便后期清空
    num_arrPot7: cc.Node[] = []; // 筹码记录池，方便后期清空
    // 记录庄家发给pot筹码数组
    banker1_arrPot: cc.Node[] = []; // 筹码记录池，方便后期清空
    banker2_arrPot: cc.Node[] = []; // 筹码记录池，方便后期清空
    banker3_arrPot: cc.Node[] = []; // 筹码记录池，方便后期清空
    banker4_arrPot: cc.Node[] = []; // 筹码记录池，方便后期清空
    banker5_arrPot: cc.Node[] = []; // 筹码记录池，方便后期清空
    banker6_arrPot: cc.Node[] = []; // 筹码记录池，方便后期清空
    banker7_arrPot: cc.Node[] = []; // 筹码记录池，方便后期清空
    

    private playerS: cc.Node = null;       // 桌面玩家自己
    private player1: cc.Node = null;       // 桌面player1
    private player2: cc.Node = null;       // 桌面player2
    private player3: cc.Node = null;       // 桌面player3
    private player4: cc.Node = null;       // 桌面player4
    private player5: cc.Node = null;       // 桌面player5
    private player6: cc.Node = null;       // 桌面player6
    private bankerInfo: cc.Node = null;    // 庄家信息
    private bankerList: cc.Node = null;    // 庄家列表
    private downBanker: cc.Node = null;    // 庄家下庄
    private notBanker: cc.Node = null;     // 不抢庄
    private banker2000: cc.Node = null;    // 抢庄2000
    private banker5000: cc.Node = null;    // 抢庄5000
    private banker10000: cc.Node = null;   // 抢庄10000
    private banker20000: cc.Node = null;   // 抢庄20000
    private bankerFont: cc.Node = null;    // 请抢庄字体
    private downBetFont: cc.Node = null;   // 请下注字体
    private ActionNum: cc.Node = null;     // 阶段倒计时
    private chips1: cc.Node = null;        // chips1
    private chips1up: cc.Node = null;      // chips1up
    private chips1Back: cc.Node = null;    // chips1Back
    private chips5: cc.Node = null;        // chips5
    private chips5up: cc.Node = null;      // chips5up
    private chips5Back: cc.Node = null;    // chips5Back
    private chips10: cc.Node = null;       // chips10
    private chips10up: cc.Node = null;     // chips10up
    private chips10Back: cc.Node = null;   // chips10Back
    private chips50: cc.Node = null;       // chips50
    private chips50up: cc.Node = null;     // chips50up
    private chips50Back: cc.Node = null;   // chips50Back
    private chips100: cc.Node = null;      // chips100
    private chips100up: cc.Node = null;    // chips100up
    private chips100Back: cc.Node = null;  // chips100Back
    private chips500: cc.Node = null;      // chips500
    private chips500up: cc.Node = null;    // chips500up
    private chips500Back: cc.Node = null;  // chips500Back
    private chips1000: cc.Node = null;     // chips1000
    private chips1000up: cc.Node = null;   // chips1000up
    private chips1000Back: cc.Node = null; // chips1000Back

    private backTime: number = 0;          // 返回间隔时间
    private emojTime: number = 0;          // 聊天表情时间
    private AniEmojTime: number = 0;       // 聊天表情时间

    timerChip: any = null;  // 下注延时器

    onLoad () {
        // 注册事件
        this.RegisterEvent()
        // 获取节点
        this.GetEventNode()
        // 渲染桌面玩家
        this.ShowTablePlayer()
        // 显示桌面数据
        this.ShowTableData()
    }

    private RegisterEvent() {
        events.register(EventKind.S2C_JoinRoom, "cdx_Room", this.JoinRoom.bind(this));
        events.register(EventKind.S2C_LeaveRoom, "cdx_Room", this.LeaveRoom.bind(this));
        events.register(EventKind.S2C_ActionTime, "cdx_Room", this.ActionTime.bind(this));
        events.register(EventKind.S2C_PlayerAction, "cdx_Room", this.PlayerAction.bind(this));
        events.register(EventKind.S2C_PotChangeMoney, "cdx_Room", this.PotChangeMoney.bind(this));
        events.register(EventKind.S2C_UptPlayerList, "cdx_Room", this.UptPlayerList.bind(this));
        events.register(EventKind.S2C_ResultData, "cdx_Room", this.ResultData.bind(this));
        events.register(EventKind.S2C_BankerData, "cdx_Room", this.BankerData.bind(this));
        events.register(EventKind.S2C_EmojiChat, "cdx_Room", this.EmojiChat.bind(this));
        events.register(EventKind.S2C_SendActTime, "cdx_Room", this.SendActTime.bind(this));
    }

    GetEventNode() {
        this.playerS =  cc.find("Canvas/roomScens/cdx_infoBox/playerS")
        this.player1 =  cc.find("Canvas/roomScens/cdx_playerList/player1")
        this.player2 =  cc.find("Canvas/roomScens/cdx_playerList/player2")
        this.player3 =  cc.find("Canvas/roomScens/cdx_playerList/player3")
        this.player4 =  cc.find("Canvas/roomScens/cdx_playerList/player4")
        this.player5 =  cc.find("Canvas/roomScens/cdx_playerList/player5")
        this.player6 =  cc.find("Canvas/roomScens/cdx_playerList/player6")
        this.bankerInfo =  cc.find("Canvas/roomScens/cdx_bankerInfo")
        this.bankerList =  cc.find("Canvas/roomScens/banker/bankerList")
        this.downBanker =  cc.find("Canvas/roomScens/banker/downBanker")
        this.notBanker =  cc.find("Canvas/roomScens/banker/notBanker")
        this.banker2000 =  cc.find("Canvas/roomScens/banker/banker2000")
        this.banker5000 =  cc.find("Canvas/roomScens/banker/banker5000")
        this.banker10000 =  cc.find("Canvas/roomScens/banker/banker10000")
        this.banker20000 =  cc.find("Canvas/roomScens/banker/banker20000")
        this.bankerFont =  cc.find("Canvas/roomScens/gameStep/bankerFont")
        this.downBetFont =  cc.find("Canvas/roomScens/gameStep/downBetFont")
        this.ActionNum =  cc.find("Canvas/roomScens/gameStep/tickerNum")
        this.chips1 = cc.find("Canvas/roomScens/cdx_infoBox/chips/chips1")
        this.chips1up = cc.find("Canvas/roomScens/cdx_infoBox/chips/chips1up")
        this.chips1Back = cc.find("Canvas/roomScens/cdx_infoBox/chips/chips1Back")
        this.chips5 = cc.find("Canvas/roomScens/cdx_infoBox/chips/chips5")
        this.chips5up = cc.find("Canvas/roomScens/cdx_infoBox/chips/chips5up")
        this.chips5Back = cc.find("Canvas/roomScens/cdx_infoBox/chips/chips5Back")
        this.chips10 = cc.find("Canvas/roomScens/cdx_infoBox/chips/chips10")
        this.chips10up = cc.find("Canvas/roomScens/cdx_infoBox/chips/chips10up")
        this.chips10Back = cc.find("Canvas/roomScens/cdx_infoBox/chips/chips10Back")
        this.chips50 = cc.find("Canvas/roomScens/cdx_infoBox/chips/chips50")
        this.chips50up = cc.find("Canvas/roomScens/cdx_infoBox/chips/chips50up")
        this.chips50Back = cc.find("Canvas/roomScens/cdx_infoBox/chips/chips50Back")
        this.chips100 = cc.find("Canvas/roomScens/cdx_infoBox/chips/chips100")
        this.chips100up = cc.find("Canvas/roomScens/cdx_infoBox/chips/chips100up")
        this.chips100Back = cc.find("Canvas/roomScens/cdx_infoBox/chips/chips100Back")
        this.chips500 = cc.find("Canvas/roomScens/cdx_infoBox/chips/chips500")
        this.chips500up = cc.find("Canvas/roomScens/cdx_infoBox/chips/chips500up")
        this.chips500Back = cc.find("Canvas/roomScens/cdx_infoBox/chips/chips500Back")
        this.chips1000 = cc.find("Canvas/roomScens/cdx_infoBox/chips/chips1000")
        this.chips1000up = cc.find("Canvas/roomScens/cdx_infoBox/chips/chips1000up")
        this.chips1000Back = cc.find("Canvas/roomScens/cdx_infoBox/chips/chips1000Back")
    }
    
    update(dt) {
        if (this.backTime - dt >= 0) {
            this.backTime -= dt;
        } else {
            this.backTime = 0;
        }
        if (this.emojTime - dt >= 0) {
            this.emojTime -= dt;
        } else {
            this.emojTime = 0;
        }
        if (this.AniEmojTime - dt >= 0) {
            this.AniEmojTime -= dt;
        } else {
            this.AniEmojTime = 0;
        }
    }
    // 进入房间
    private JoinRoom(data: msg.IJoinRoom_S2C){
        if (data == null) {
            return;
        }
        Storage.SetRoomData(data.roomData);
        Storage.SetTablePlayer(data.roomData.tablePlayer) 
        console.log("JoinRoom 玩家 :",Storage.PlayerData.playerInfo.Id);
        console.log("JoinRoom 桌面玩家 :",Storage.RoomData.tablePlayer);
    }

    // 离开房间
    private LeaveRoom(data: msg.ILeaveRoom_S2C){
        if (data == null) {
            return;
        }
        //this.DestoryPlayer()
        
        if (Storage.UserInfo.Id == data.playerInfo.Id) {
            Storage.SetUserInfo(data.playerInfo)

            cc.director.preloadScene("cdx_roomList", function () {
                events.unregister(EventKind.S2C_LeaveRoom, "cdx_Game");
                console.log("cdx_roomList界面 预加载完成");
                cc.director.loadScene("cdx_roomList");
            });
        }
    }
    
    // 行动时间
    private ActionTime(data: msg.IActionTime_S2C){
        if (data == null) {
            return;
        }
        Storage.SetRoomData(data.roomData)

        let gameStep = cc.find("Canvas/roomScens/gameStep")
        let bankerStep = gameStep.getChildByName("bankerStep")
        let downBetStep = gameStep.getChildByName("downBetStep")

        if (data.gameStep == msg.GameStep.Banker) { // 抢庄阶段
            // 更新显示桌面玩家
            this.UpdateTablePlayer() 
            bankerStep.active = true
            this.IsClickBanker = false
            // 判断玩家如果是庄家就关闭下注按钮
            if (Storage.PlayerData.IsBanker == true) {
                this.CloseChipsButton()
            }
        }else if (data.gameStep == msg.GameStep.Banker2) { // 连庄阶段
            // 更新显示桌面玩家
            this.UpdateTablePlayer() 
            // 判断玩家如果是庄家就关闭下注按钮
            if (Storage.PlayerData.IsBanker == true) {
                this.CloseChipsButton()
            }
            // 显示庄家阶段
            let bankerLian = cc.find("Canvas/roomScens/gameStep/bankerLian")
            bankerLian.active = true
            for (let i = 0; i < Storage.RoomData.playerData.length; i++) {
                if (Storage.RoomData.playerData[i] != null && Storage.RoomData.playerData[i].IsBanker == true) {
                    let player = Storage.RoomData.playerData[i]
                    console.log("连庄:",player);
                    bankerLian.getChildByName("name").getComponent(cc.Label).string = player.playerInfo.nickName
                    let node1 = bankerLian.getChildByName("image")
                    let url1 = Storage.GetPlayerHead(player.playerInfo.headImg) 
                    Storage.loadSpriteAtlas(node1, url1)
                    // 显示庄家
                    this.ShowBankerInfo(player)
                }
            }
            setTimeout(() => {
                let bankerLian = cc.find("Canvas/roomScens/gameStep/bankerLian")
                bankerLian.active = false
            }, 2800);
        }else if (data.gameStep == msg.GameStep.DownBet) { // 下注阶段
            if (Storage.PlayerData.IsBanker == true) {
                this.downBanker.active = true
            }
            // 下注音效
            Sound.PlayAudio(Sound.LoadAudio(3))
            setTimeout(() => {
                // 显示阶段动画
                downBetStep.active = true
            }, 1000);
            setTimeout(() => {
                downBetStep.active = false
            }, 2000);
        }else if (data.gameStep == msg.GameStep.Settle) {
            // 下注音效
            Sound.PlayAudio(Sound.LoadAudio(4))
            this.downBetFont.active = false
            this.ActionNum.active = false
        }
    }

    // 玩家行动
    private PlayerAction(data: msg.IPlayerAction_S2C){
        if (data == null) {
            return;
        }
        // 获取节点
        this.GetEventNode()
        // 下注音效
        Sound.PlayAudio(Sound.LoadAudio(1))
        // 获取目标注池
        let typePots = cc.find("Canvas/roomScens/cdx_table/typePots")
        let bigPot = typePots.getChildByName("bigPot")
        let smallPot = typePots.getChildByName("smallPot")
        let singlePot = typePots.getChildByName("singlePot")
        let pairPot = typePots.getChildByName("pairPot")
        let straightPot = typePots.getChildByName("straightPot")
        let leopardPot = typePots.getChildByName("leopardPot")
        let doublePot = typePots.getChildByName("doublePot")
        let goalSeat = null
        if (data.downPot == 1) {
            goalSeat = bigPot
        }else if (data.downPot == 2) {
            goalSeat = smallPot
        }else if (data.downPot == 3) {
            goalSeat = singlePot
        }else if (data.downPot == 4) {
            goalSeat = doublePot
        }else if (data.downPot == 5) {
            goalSeat = pairPot
        }else if (data.downPot == 6) {
            goalSeat = straightPot
        }else if (data.downPot == 7) {
            goalSeat = leopardPot
        }
        // 获取行动筹码
        let actChips = cc.find("Canvas/roomScens/cdx_table/actChips")
        let chips1 = actChips.getChildByName("chips1")
        let chips5 = actChips.getChildByName("chips5")
        let chips10 = actChips.getChildByName("chips10")
        let chips50 = actChips.getChildByName("chips50")
        let chips100 = actChips.getChildByName("chips100")
        let chips500 = actChips.getChildByName("chips500")
        let chips1000 = actChips.getChildByName("chips1000")
        let chipsNode = null
        if (data.downBet == 1) {
            chipsNode = chips1
        }else if (data.downBet == 5) {
            chipsNode = chips5
        }else if (data.downBet == 10) {
            chipsNode = chips10
        }else if (data.downBet == 50) {
            chipsNode = chips50
        }else if (data.downBet == 100) {
            chipsNode = chips100
        }else if (data.downBet == 500) {
            chipsNode = chips500
        }else if (data.downBet == 1000) {
            chipsNode = chips1000
        }

        // 下注行动
        if (data.Id == Storage.PlayerData.playerInfo.Id) { // 玩家自己
            let money = this.playerS.getChildByName("goldBox").getChildByName("money")
            money.getComponent(cc.Label).string = Storage.ShowMoney(data.account)
            let potsBox = cc.find("Canvas/roomScens/cdx_table/potsBox")
            if (data.downPot == 1) { // 大
                potsBox.getChildByName("bigBox").active = true
            }else if (data.downPot == 2) { // 小
                potsBox.getChildByName("smallBox").active = true
            }else if (data.downPot == 3) { // 单
                potsBox.getChildByName("singleBox").active = true
            }else if (data.downPot == 4) { // 双
                potsBox.getChildByName("doubleBox").active = true
            }else if (data.downPot == 5) { // 对
                potsBox.getChildByName("pairBox").active = true
            }else if (data.downPot == 6) { // 顺
                potsBox.getChildByName("straightBox").active = true
            }else if (data.downPot == 7) { // 豹
                potsBox.getChildByName("leopardBox").active = true
            }
            setTimeout(() => {
                potsBox.getChildByName("bigBox").active = false
                potsBox.getChildByName("smallBox").active = false
                potsBox.getChildByName("singleBox").active = false
                potsBox.getChildByName("doubleBox").active = false
                potsBox.getChildByName("pairBox").active = false
                potsBox.getChildByName("straightBox").active = false
                potsBox.getChildByName("leopardBox").active = false
            }, 400);
            this.SendChipsAction(this.playerS, data.downPot ,chipsNode)
        }else { // 其他玩家
            if (data.Id == Storage.RoomData.tablePlayer[0].playerInfo.Id) { // 桌面玩家一
                let money = this.player1.getChildByName("goldBox").getChildByName("money")
                money.getComponent(cc.Label).string = Storage.ShowMoney(data.account)
                this.SendChipsAction(this.player1, data.downPot ,chipsNode)
                this.PlayerBoxAction(this.player1, 1)
            }else if (data.Id == Storage.RoomData.tablePlayer[1].playerInfo.Id) { // 桌面玩家二
                let money = this.player2.getChildByName("goldBox").getChildByName("money")
                money.getComponent(cc.Label).string = Storage.ShowMoney(data.account)
                this.SendChipsAction(this.player2, data.downPot ,chipsNode)
                this.PlayerBoxAction(this.player2, 2)
            }else if (data.Id == Storage.RoomData.tablePlayer[2].playerInfo.Id) { // 桌面玩家三
                let money = this.player3.getChildByName("goldBox").getChildByName("money")
                money.getComponent(cc.Label).string = Storage.ShowMoney(data.account)
                this.SendChipsAction(this.player3, data.downPot ,chipsNode)
                this.PlayerBoxAction(this.player3, 3)
            }else if (data.Id == Storage.RoomData.tablePlayer[3].playerInfo.Id) { // 桌面玩家四
                let money = this.player4.getChildByName("goldBox").getChildByName("money")
                money.getComponent(cc.Label).string = Storage.ShowMoney(data.account)
                this.SendChipsAction(this.player4, data.downPot ,chipsNode)
                this.PlayerBoxAction(this.player4, 4)
            }else if (data.Id == Storage.RoomData.tablePlayer[4].playerInfo.Id) { // 桌面玩家五
                let money = this.player5.getChildByName("goldBox").getChildByName("money")
                money.getComponent(cc.Label).string = Storage.ShowMoney(data.account)
                this.SendChipsAction(this.player5, data.downPot ,chipsNode)
                this.PlayerBoxAction(this.player5, 5)
            }else if (data.Id == Storage.RoomData.tablePlayer[5].playerInfo.Id) { // 桌面玩家六
                let money = this.player6.getChildByName("goldBox").getChildByName("money")
                money.getComponent(cc.Label).string = Storage.ShowMoney(data.account)
                this.SendChipsAction(this.player6, data.downPot ,chipsNode)
                this.PlayerBoxAction(this.player6, 6)
            }else { // 列表玩家
                let userList = cc.find("Canvas/roomScens/cdx_infoBox/userList")
                this.SendChipsAction(userList, data.downPot ,chipsNode)
            }
        }
    }

    // 注池变更
    private PotChangeMoney(data: msg.IPotChangeMoney_S2C){
        if (data == null) {
            return;
        }
        // 显示注池金额
        this.ShowPotsMoney(data.potMoneyCount)
    }

    // 注池变更
    private UptPlayerList(data: msg.IUptPlayerList_S2C){
        if (data.playerList == null) {
            return;
        }
        // 更新玩家列表
        // Storage.RoomData.playerData = data.playerList
    }

    // 结算数据
    private ResultData(data: msg.IResultData_S2C){
        if (data == null) {
            return;
        }
        Storage.SetRoomData(data.roomData)
        
        console.log("ResultData:", data.roomData);
        console.log("ResultData 玩家 :",Storage.PlayerData.playerInfo.Id);
    }
    

    private BankerData(data: msg.IBankerData_S2C){
        if (data == null) {
            return;
        }
        // 显示庄家阶段
        let banker = cc.find("Canvas/roomScens/gameStep/banker")
        banker.active = true
        if (data.banker.IsRobot == true) {
            banker.getChildByName("name").getComponent(cc.Label).string = "系统坐庄"
        }else {
            banker.getChildByName("name").getComponent(cc.Label).string = data.banker.playerInfo.nickName
        }
        let node1 = banker.getChildByName("image")
        let url1 = Storage.GetPlayerHead(data.banker.playerInfo.headImg) 
        Storage.loadSpriteAtlas(node1, url1)
        
        // 显示庄家
        this.ShowBankerInfo(data.banker)
    }

    // 聊天表情动画
    private EmojiChat(data: msg.IEmojiChat_S2C) {
        if (data == null) {
            return
        }
        // 获取节点
        this.GetEventNode()
        console.log("获取动画行动:", data);
        
        if (data.actNum > 0 && data.actNum <= 20) {
            if (data.actId == Storage.PlayerData.playerInfo.Id) {
                this.ShowEmojChat(data.actNum, this.playerS)
            }else {
                let actPlayer = null
                if (Storage.RoomData.tablePlayer[0].playerInfo.Id == data.actId) {
                    actPlayer = this.player1
                }else if (Storage.RoomData.tablePlayer[1].playerInfo.Id == data.actId) {
                    actPlayer = this.player2
                }else if (Storage.RoomData.tablePlayer[2].playerInfo.Id == data.actId) {
                    actPlayer = this.player3
                }else if (Storage.RoomData.tablePlayer[3].playerInfo.Id == data.actId) {
                    actPlayer = this.player4
                }else if (Storage.RoomData.tablePlayer[4].playerInfo.Id == data.actId) {
                    actPlayer = this.player5
                }else if (Storage.RoomData.tablePlayer[5].playerInfo.Id == data.actId) {
                    actPlayer = this.player6
                }
                this.ShowEmojChat(data.actNum, actPlayer)
            }
        }else if (data.actNum >= 21 && data.actNum <= 24) {
            if (data.actId == Storage.PlayerData.playerInfo.Id) {
                let goalPlayer = null
                if (Storage.RoomData.tablePlayer[0].playerInfo.Id == data.goalId) {
                    goalPlayer = this.player1
                }else if (Storage.RoomData.tablePlayer[1].playerInfo.Id == data.goalId) {
                    goalPlayer = this.player2
                }else if (Storage.RoomData.tablePlayer[2].playerInfo.Id == data.goalId) {
                    goalPlayer = this.player3
                }else if (Storage.RoomData.tablePlayer[3].playerInfo.Id == data.goalId) {
                    goalPlayer = this.player4
                }else if (Storage.RoomData.tablePlayer[4].playerInfo.Id == data.goalId) {
                    goalPlayer = this.player5
                }else if (Storage.RoomData.tablePlayer[5].playerInfo.Id == data.goalId) {
                    goalPlayer = this.player6
                }
                this.EmojiChatAction(this.playerS,goalPlayer,data.actNum)
                this.ShowEmojAction(goalPlayer,data.actNum)
            }else {
                let actPlayer = null
                if (Storage.RoomData.tablePlayer[0].playerInfo.Id == data.actId) {
                    actPlayer = this.player1
                }else if (Storage.RoomData.tablePlayer[1].playerInfo.Id == data.actId) {
                    actPlayer = this.player2
                }else if (Storage.RoomData.tablePlayer[2].playerInfo.Id == data.actId) {
                    actPlayer = this.player3
                }else if (Storage.RoomData.tablePlayer[3].playerInfo.Id == data.actId) {
                    actPlayer = this.player4
                }else if (Storage.RoomData.tablePlayer[4].playerInfo.Id == data.actId) {
                    actPlayer = this.player5
                }else if (Storage.RoomData.tablePlayer[5].playerInfo.Id == data.actId) {
                    actPlayer = this.player6
                }
                let goalPlayer = null
                if (Storage.RoomData.tablePlayer[0].playerInfo.Id == data.goalId) {
                    goalPlayer = this.player1
                }else if (Storage.RoomData.tablePlayer[1].playerInfo.Id == data.goalId) {
                    goalPlayer = this.player2
                }else if (Storage.RoomData.tablePlayer[2].playerInfo.Id == data.goalId) {
                    goalPlayer = this.player3
                }else if (Storage.RoomData.tablePlayer[3].playerInfo.Id == data.goalId) {
                    goalPlayer = this.player4
                }else if (Storage.RoomData.tablePlayer[4].playerInfo.Id == data.goalId) {
                    goalPlayer = this.player5
                }else if (Storage.RoomData.tablePlayer[5].playerInfo.Id == data.goalId) {
                    goalPlayer = this.player6
                }
                if (actPlayer != null && goalPlayer != null) {
                    this.EmojiChatAction(actPlayer,goalPlayer,data.actNum)
                    this.ShowEmojAction(goalPlayer,data.actNum)
                }
            }
        }
    }

    // 阶段时间更新
    private SendActTime(data: msg.ISendActTime_S2C) {
        if (data == null) {
            return
        }
        if (data.gameStep == msg.GameStep.Banker) {
            this.bankerFont.active = true
            this.ActionNum.active = true
            this.ActionNum.getComponent(cc.Label).string = (data.gameTime - data.startTime) + ''
            if (data.startTime == 1) {
                // 关闭庄家阶段Tip
                let bankerStep = cc.find("Canvas/roomScens/gameStep/bankerStep")
                bankerStep.active = false
                // 开启抢庄按钮
                this.ShowBankerButton()
            }
            if (data.startTime == 2) { 
                if (this.IsClickBanker == false) {
                    // 开启抢庄按钮
                    this.ShowBankerButton()
                } 
            }
            if (data.startTime == 3) {
                if (this.IsClickBanker == false) {
                    // 开启抢庄按钮
                    this.ShowBankerButton()
                } 
            }
            if (data.startTime == 4) { 
                if (this.IsClickBanker == false) {
                    // 开启抢庄按钮
                    this.ShowBankerButton()
                } 
            }
            if (data.startTime == 5) {
                this.bankerList.active = false
                this.notBanker.active = false
                this.banker2000.active = false
                this.banker5000.active = false
                this.banker10000.active = false
                this.banker20000.active = false   
            }
        }
        if (data.gameStep == msg.GameStep.DownBet) {
            let banker = cc.find("Canvas/roomScens/gameStep/banker")
            banker.active = false
            this.bankerFont.active = false
            this.downBetFont.active = true
            this.ActionNum.active = true
            this.ActionNum.getComponent(cc.Label).string = (data.gameTime - data.startTime) + ''
            // 显示下注筹码按钮
            this.ShowChipsButton(Storage.PlayerData.playerInfo.account)
        }
        if (data.gameStep == msg.GameStep.Settle) {
            // 关闭下注筹码
            this.CloseChipsButton()
            // 显示阶段动画
            let gameStep = cc.find("Canvas/roomScens/gameStep")
            let fengpanStep = gameStep.getChildByName("fengpanStep")
            let resultStep = gameStep.getChildByName("resultStep")
            if (data.startTime == 1) {
                fengpanStep.active = true
                fengpanStep.getComponent(sp.Skeleton).setAnimation(1, "ani_tqfp", true)
            }
            if (data.startTime == 2) {
                fengpanStep.active = true
                fengpanStep.getComponent(sp.Skeleton).setAnimation(1, "ani_tqfp", true)
            }
            if (data.startTime == 3) {
                fengpanStep.active = true
                fengpanStep.getComponent(sp.Skeleton).setAnimation(1, "ani_tqfp", true)
            }
            if (data.startTime == 4) {
                fengpanStep.active = true
                fengpanStep.getComponent(sp.Skeleton).setAnimation(1, "ani_tqfp", true)
            }
            if (data.startTime == 5) {
                fengpanStep.active = true
                fengpanStep.getComponent(sp.Skeleton).setAnimation(1, "ani_tqfp", true)
            }
            if (data.startTime == 6) {
                fengpanStep.active = true
                fengpanStep.getComponent(sp.Skeleton).setAnimation(1, "ani_tqfp", true)
            }
            if (data.startTime == 7) {
                fengpanStep.active = false
                resultStep.active = true
                resultStep.getComponent(sp.Skeleton).setAnimation(1, "ani_kjjghqz", true)
            }
            if (data.startTime == 8) {
                resultStep.active = true
                resultStep.getComponent(sp.Skeleton).setAnimation(1, "ani_kjjghqz", true)
            }
            if (data.startTime == 9) {
                resultStep.active = true
                resultStep.getComponent(sp.Skeleton).setAnimation(1, "ani_kjjghqz", true)
            }
            if (data.startTime == 10) {
                resultStep.active = true
                resultStep.getComponent(sp.Skeleton).setAnimation(1, "ani_kjjghqz", true)
            }
            if (data.startTime == 11) {
                resultStep.active = true
                resultStep.getComponent(sp.Skeleton).setAnimation(1, "ani_kjjghqz", true)
            }
            if (data.startTime == 12) {
                resultStep.active = true
                resultStep.getComponent(sp.Skeleton).setAnimation(1, "ani_kjjghqz", true)
            }
            if (data.startTime == 13) {
                resultStep.active = true
                resultStep.getComponent(sp.Skeleton).setAnimation(1, "ani_kjjghqz", true)
            }
            if (data.startTime == 14) {
                resultStep.active = true
                resultStep.getComponent(sp.Skeleton).setAnimation(1, "ani_kjjghqz", true)
            }
            if (data.startTime == 15) {
                resultStep.active = true
                resultStep.getComponent(sp.Skeleton).setAnimation(1, "ani_kjjghqz", true)
            }
            if (data.startTime == 16) {
                resultStep.active = true
                resultStep.getComponent(sp.Skeleton).setAnimation(1, "ani_kjjghqz", true)
            }
            if (data.startTime == 17) {
                resultStep.active = true
                resultStep.getComponent(sp.Skeleton).setAnimation(1, "ani_kjjghqz", true)
            }
            if (data.startTime == 18) {
                resultStep.active = true
                resultStep.getComponent(sp.Skeleton).setAnimation(1, "ani_kjjghqz", true)
            }
            // 显示结算数字
            if (data.startTime == 19) {
                resultStep.active = false
                let res03 = cc.find("Canvas/roomScens/resultNum/res03")
                res03.active = true
                let number01 = res03.getChildByName("number01")
                let number02 = res03.getChildByName("number02")
                let number03 = res03.getChildByName("number03")
                let number04 = res03.getChildByName("number04")
                number01.getChildByName("s0").active = true
                number02.getChildByName("s0").active = true
                number03.getChildByName("s0").active = true
                number04.getChildByName("sk").active = true
                setTimeout(() => {
                    number01.getChildByName("s0").active = false
                    number02.getChildByName("s0").active = false
                    number03.getChildByName("s0").active = false
                    number01.getChildByName("s2").active = true
                    number02.getChildByName("s7").active = true
                    number03.getChildByName("s9").active = true
                }, 150);
                setTimeout(() => {
                    number01.getChildByName("s2").active = false
                    number02.getChildByName("s7").active = false
                    number03.getChildByName("s9").active = false
                    number01.getChildByName("s8").active = true
                    number02.getChildByName("s1").active = true
                    number03.getChildByName("s5").active = true
                }, 300);
                setTimeout(() => {
                    number01.getChildByName("s8").active = false
                    number02.getChildByName("s1").active = false
                    number03.getChildByName("s5").active = false
                    number01.getChildByName("s4").active = true
                    number02.getChildByName("s6").active = true
                    number03.getChildByName("s3").active = true
                }, 450);
                setTimeout(() => {
                    number01.getChildByName("s4").active = false
                    number02.getChildByName("s6").active = false
                    number03.getChildByName("s3").active = false 
                    let num01 = Storage.RoomData.resultInt[0]
                    this.ShowResultNum(num01,number01)
                    let num02 = Storage.RoomData.resultInt[1]
                    this.ShowResultNum(num02,number02)
                    let num03 = Storage.RoomData.resultInt[2]
                    this.ShowResultNum(num03,number03)
                }, 600);
                setTimeout(() => {
                    let num = Storage.RoomData.potWinList.length
                    let resData = Storage.RoomData.potWinList[num-1]
                    this.ShowResultNum(resData.resultNum,number04)
                    number04.getChildByName("sk").active = false
                }, 650);
            }
            if (data.startTime == 20) {
                // 显示上两期开奖
                this.ShowHistoryData()
                // 显示开奖类型数据
                this.ShowResutltType()
                let res01 = cc.find("Canvas/roomScens/resultNum/res01")
                res01.active = true
                let number = res01.getChildByName("number")
                let num = Storage.RoomData.potWinList.length
                let resData = Storage.RoomData.potWinList[num-1]
                // 显示结果数字
                this.ShowResultNum(resData.resultNum,number)
                // 显示闪烁结算框
                this.ShowResultPox(resData)
            }
            if (data.startTime == 21) {
                // 显示第三期数字和类型
                let res01 = cc.find("Canvas/roomScens/resultNum/res01")
                let res03 = cc.find("Canvas/roomScens/resultNum/res03")
                // this.ResultNumAction(res03,res02,res03)  todo
                res01.active = false
                res03.active = false
                // 显示结算数字框2
                this.ShowResultNumber2()
                // 金币回收动画
                this.TableChipsToBanker()
                // 处理庄家筹码到注池
                setTimeout(() => {
                    // 筹码返回声音
                    Sound.PlayAudio(Sound.LoadAudio(2))
                    this.BankerChipsToTable()
                }, 300);
                // 处理注池筹码到玩家
                setTimeout(() => {
                    // 筹码返回声音
                    Sound.PlayAudio(Sound.LoadAudio(2))
                    this.PotChipsToPlayer()
                }, 900);
            }
            if (data.startTime == 22) {
                // 桌面6个玩家金币浮动
                let player01 = Storage.RoomData.tablePlayer[0]
                let player02 = Storage.RoomData.tablePlayer[1]
                let player03 = Storage.RoomData.tablePlayer[2]
                let player04 = Storage.RoomData.tablePlayer[3]
                let player05 = Storage.RoomData.tablePlayer[4]
                let player06 = Storage.RoomData.tablePlayer[5]
                this.ShowPlayerMoney(player01,this.player1,true)
                this.ShowPlayerMoney(player02,this.player2,true)
                this.ShowPlayerMoney(player03,this.player3,true)
                this.ShowPlayerMoney(player04,this.player4,true)
                this.ShowPlayerMoney(player05,this.player5,true)
                this.ShowPlayerMoney(player06,this.player6,true)
                for (let i = 0; i < Storage.RoomData.playerData.length; i++) {
                    if (Storage.RoomData.playerData[i] != null) {
                        if (Storage.RoomData.playerData[i].playerInfo.Id == Storage.UserInfo.Id) {
                            this.ShowPlayerMoney(Storage.RoomData.playerData[i],this.playerS,false)
                        }
                        if (Storage.RoomData.playerData[i].IsBanker == true) {
                            this.ShowPlayerMoney(Storage.RoomData.playerData[i],this.bankerInfo,false)
                        }
                    }
                }
                setTimeout(() => {
                    // 清空桌面筹码
                    this.ClearTableChips()
                }, 150);
            }
            if (data.startTime == 24) {
                // 关闭赢钱动画
                this.player1.getChildByName("winAni").active = false
                this.player2.getChildByName("winAni").active = false
                this.player3.getChildByName("winAni").active = false
                this.player4.getChildByName("winAni").active = false
                this.player5.getChildByName("winAni").active = false
                this.player6.getChildByName("winAni").active = false
                // 关闭输赢的字体
                this.player1.getChildByName("winMoney").active = false
                this.player1.getChildByName("loseMoney").active = false
                this.player2.getChildByName("winMoney").active = false
                this.player2.getChildByName("loseMoney").active = false
                this.player3.getChildByName("winMoney").active = false
                this.player3.getChildByName("loseMoney").active = false
                this.player4.getChildByName("winMoney").active = false
                this.player4.getChildByName("loseMoney").active = false
                this.player5.getChildByName("winMoney").active = false
                this.player5.getChildByName("loseMoney").active = false
                this.player6.getChildByName("winMoney").active = false
                this.player6.getChildByName("loseMoney").active = false
                this.playerS.getChildByName("winMoney").active = false
                this.playerS.getChildByName("loseMoney").active = false
                this.bankerInfo.getChildByName("winMoney").active = false
                this.bankerInfo.getChildByName("loseMoney").active = false
                // 更新桌面6个玩家金额
                for (let i = 0; i < Storage.RoomData.tablePlayer.length; i++) {
                    if (Storage.RoomData.tablePlayer[i] != null) {
                        if (i == 0) {
                            let money = this.player1.getChildByName("goldBox").getChildByName("money")
                            money.getComponent(cc.Label).string = Storage.ShowMoney(Storage.RoomData.tablePlayer[i].playerInfo.account)
                        }
                        if (i == 1) {
                            let money = this.player2.getChildByName("goldBox").getChildByName("money")
                            money.getComponent(cc.Label).string = Storage.ShowMoney(Storage.RoomData.tablePlayer[i].playerInfo.account)
                        }
                        if (i == 2) {
                            let money = this.player3.getChildByName("goldBox").getChildByName("money")
                            money.getComponent(cc.Label).string = Storage.ShowMoney(Storage.RoomData.tablePlayer[i].playerInfo.account)
                        }
                        if (i == 3) {
                            let money = this.player4.getChildByName("goldBox").getChildByName("money")
                            money.getComponent(cc.Label).string = Storage.ShowMoney(Storage.RoomData.tablePlayer[i].playerInfo.account)
                        }
                        if (i == 4) {
                            let money = this.player5.getChildByName("goldBox").getChildByName("money")
                            money.getComponent(cc.Label).string = Storage.ShowMoney(Storage.RoomData.tablePlayer[i].playerInfo.account)
                        }
                        if (i == 5) {
                            let money = this.player6.getChildByName("goldBox").getChildByName("money")
                            money.getComponent(cc.Label).string = Storage.ShowMoney(Storage.RoomData.tablePlayer[i].playerInfo.account)
                        }
                    }
                }
                // 更新桌面玩家自己和庄家的金额
                for (let i = 0; i < Storage.RoomData.playerData.length; i++) {
                    if (Storage.RoomData.playerData[i] != null) {
                        if (Storage.RoomData.playerData[i].playerInfo.Id == Storage.UserInfo.Id) {
                            let money = this.playerS.getChildByName("goldBox").getChildByName("money")
                            money.getComponent(cc.Label).string = Storage.ShowMoney(Storage.RoomData.playerData[i].playerInfo.account)
                        }
                        if (Storage.RoomData.playerData[i].IsBanker == true) {
                            let money = this.bankerInfo.getChildByName("goldBox").getChildByName("money")
                            money.getComponent(cc.Label).string = Storage.ShowMoney(Storage.RoomData.playerData[i].bankerMoney)
                        }
                    }
                }
            }
            if (data.startTime == 25) {
                // 显示结算数字框2
                this.ShowResultNumber2()
                let num = Storage.RoomData.potWinList.length
                let resData = Storage.RoomData.potWinList[num-1]
                // 显示闪烁结算框
                this.ShowResultPox(resData)
            }
            if (data.startTime == 26) {
                // 显示结算数字框2
                this.ShowResultNumber2()
                let num = Storage.RoomData.potWinList.length
                let resData = Storage.RoomData.potWinList[num-1]
                // 显示闪烁结算框
                this.ShowResultPox(resData)
            }
            if (data.startTime == 27) {
                // 显示结算数字框2
                this.ShowResultNumber2()
                let num = Storage.RoomData.potWinList.length
                let resData = Storage.RoomData.potWinList[num-1]
                // 显示闪烁结算框
                this.ShowResultPox(resData)
            }
            if (data.startTime == 28) {
                // 显示结算数字框2
                this.ShowResultNumber2()
                let num = Storage.RoomData.potWinList.length
                let resData = Storage.RoomData.potWinList[num-1]
                // 显示闪烁结算框
                this.ShowResultPox(resData)
            }
            if (data.startTime == 29) {
              
                // 清除桌面数据
                this.ClearTableData()
            }
        }
    }

    ClearTableData() {
        // 清空桌面缓存数据
        Storage.RoomData = null
        // 清除奖池框动画
        let potsBox = cc.find("Canvas/roomScens/cdx_table/potsBox")
        potsBox.getChildByName("singleBox").active = false
        potsBox.getChildByName("doubleBox").active = false
        potsBox.getChildByName("bigBox").active = false
        potsBox.getChildByName("smallBox").active = false
        potsBox.getChildByName("pairBox").active = false
        potsBox.getChildByName("straightBox").active = false
        potsBox.getChildByName("leopardBox").active = false
        // 清除结算数字动画
        let res01 = cc.find("Canvas/roomScens/resultNum/res01")
        res01.active = false
        res01.getChildByName("sinDouble").getChildByName("single").active = false
        res01.getChildByName("sinDouble").getChildByName("double").active = false
        res01.getChildByName("smallBig").getChildByName("big").active = false
        res01.getChildByName("smallBig").getChildByName("small").active = false
        let res01Num = res01.getChildByName("number")
        this.ClearResNumber(res01Num) 

        let res02 = cc.find("Canvas/roomScens/resultNum/res02")
        res02.active = false
        let res02Num01 = res02.getChildByName("number01")
        let res02Num02 = res02.getChildByName("number02")
        let res02Num03 = res02.getChildByName("number03")
        let res02Num04 = res02.getChildByName("number04")
        this.ClearResNumber(res02Num01) 
        this.ClearResNumber(res02Num02) 
        this.ClearResNumber(res02Num03) 
        this.ClearResNumber(res02Num04) 

        let res03 = cc.find("Canvas/roomScens/resultNum/res03")
        res03.active = false
        let res03Num01 = res03.getChildByName("number01")
        let res03Num02 = res03.getChildByName("number02")
        let res03Num03 = res03.getChildByName("number03")
        let res03Num04 = res03.getChildByName("number04")
        this.ClearResNumber(res03Num01) 
        this.ClearResNumber(res03Num02) 
        this.ClearResNumber(res03Num03) 
        this.ClearResNumber(res03Num04) 
        res03Num04.getChildByName("sk").active = false

        // 庄家下庄显示
        this.downBanker.active = false

        // 清空庄家数据
        this.ClearBankerInfo()

        // 清空桌面筹码
        this.ClearTableChips()
    }

    // 清空庄家数据
    ClearBankerInfo() {
        this.bankerInfo.getChildByName("goldBox").getChildByName("money").active = false
        this.bankerInfo.getChildByName("name").active = false
        this.bankerInfo.getChildByName("image").active = false
        this.bankerInfo.getChildByName("bankerLable").active = false
    }

    // 清除结算数字动画
    ClearResNumber(numNode) {
        numNode.getChildByName("s0").active = false
        numNode.getChildByName("s1").active = false
        numNode.getChildByName("s2").active = false
        numNode.getChildByName("s3").active = false
        numNode.getChildByName("s4").active = false
        numNode.getChildByName("s5").active = false
        numNode.getChildByName("s6").active = false
        numNode.getChildByName("s7").active = false
        numNode.getChildByName("s8").active = false
        numNode.getChildByName("s9").active = false
    }

    // 清除num_arrPot桌面筹码
    ClearNumArrChips() {
        if (this.num_arrPot1.length > 0) {
            for (let i = 0; i < this.num_arrPot1.length; i++) {
                if (cc.isValid(this.num_arrPot1[i])) {
                    this.num_arrPot1[i].destroy();
                }
            }
        }
        if (this.num_arrPot2.length > 0) {
            for (let i = 0; i < this.num_arrPot2.length; i++) {
                if (cc.isValid(this.num_arrPot2[i])) {
                    this.num_arrPot2[i].destroy();
                }
            }
        }
        if (this.num_arrPot3.length > 0) {
            for (let i = 0; i < this.num_arrPot3.length; i++) {
                if (cc.isValid(this.num_arrPot3[i])) {
                    this.num_arrPot3[i].destroy();
                }
            }
        }
        if (this.num_arrPot4.length > 0) {
            for (let i = 0; i < this.num_arrPot4.length; i++) {
                if (cc.isValid(this.num_arrPot4[i])) {
                    this.num_arrPot4[i].destroy();
                }
            }
        }
        if (this.num_arrPot5.length > 0) {
            for (let i = 0; i < this.num_arrPot5.length; i++) {
                if (cc.isValid(this.num_arrPot5[i])) {
                    this.num_arrPot5[i].destroy();
                }
            }
        }
        if (this.num_arrPot6.length > 0) {
            for (let i = 0; i < this.num_arrPot6.length; i++) {
                if (cc.isValid(this.num_arrPot6[i])) {
                    this.num_arrPot6[i].destroy();
                }
            }
        }
        if (this.num_arrPot7.length > 0) {
            for (let i = 0; i < this.num_arrPot7.length; i++) {
                if (cc.isValid(this.num_arrPot7[i])) {
                    this.num_arrPot7[i].destroy();
                }
            }
        }
    }

    // 清除banker_arrPot桌面筹码
    ClearBankerArrChips() {
        if (this.banker1_arrPot.length > 0) {
            for (let i = 0; i < this.banker1_arrPot.length; i++) {
                if (cc.isValid(this.banker1_arrPot[i])) {
                    this.banker1_arrPot[i].destroy();
                }
            }
        }
        if (this.banker2_arrPot.length > 0) {
            for (let i = 0; i < this.banker2_arrPot.length; i++) {
                if (cc.isValid(this.banker2_arrPot[i])) {
                    this.banker2_arrPot[i].destroy();
                }
            }
        }
        if (this.banker3_arrPot.length > 0) {
            for (let i = 0; i < this.banker3_arrPot.length; i++) {
                if (cc.isValid(this.banker3_arrPot[i])) {
                    this.banker3_arrPot[i].destroy();
                }
            }
        }
        if (this.banker4_arrPot.length > 0) {
            for (let i = 0; i < this.banker4_arrPot.length; i++) {
                if (cc.isValid(this.banker4_arrPot[i])) {
                    this.banker4_arrPot[i].destroy();
                }
            }
        }
        if (this.banker5_arrPot.length > 0) {
            for (let i = 0; i < this.banker5_arrPot.length; i++) {
                if (cc.isValid(this.banker5_arrPot[i])) {
                    this.banker5_arrPot[i].destroy();
                }
            }
        }
        if (this.banker6_arrPot.length > 0) {
            for (let i = 0; i < this.banker6_arrPot.length; i++) {
                if (cc.isValid(this.banker6_arrPot[i])) {
                    this.banker6_arrPot[i].destroy();
                }
            }
        }
        if (this.banker7_arrPot.length > 0) {
            for (let i = 0; i < this.banker7_arrPot.length; i++) {
                if (cc.isValid(this.banker7_arrPot[i])) {
                    this.banker7_arrPot[i].destroy();
                }
            }
        }
    }

    // 清除桌面筹码
    ClearTableChips() {
        // 清除num_arrPot桌面筹码
        this.ClearNumArrChips()
        // 清除banker_arrPot桌面筹码
        this.ClearBankerArrChips()
    }

    UpdateTablePlayer() {
            let player1 = Storage.RoomData.tablePlayer[0]
            let player2 = Storage.RoomData.tablePlayer[1]
            let player3 = Storage.RoomData.tablePlayer[2]
            let player4 = Storage.RoomData.tablePlayer[3]
            let player5 = Storage.RoomData.tablePlayer[4]
            let player6 = Storage.RoomData.tablePlayer[5]
            this.player1.getChildByName("name").getComponent(cc.Label).string = player1.playerInfo.nickName
            this.player1.getChildByName("goldBox").getChildByName("money").getComponent(cc.Label).string = Storage.ShowMoney(player1.playerInfo.account)
            let node1 = this.player1.getChildByName("image")
            let url1 = Storage.GetPlayerHead(player1.playerInfo.headImg) 
            Storage.loadSpriteAtlas(node1, url1)
            this.player2.getChildByName("name").getComponent(cc.Label).string = player2.playerInfo.nickName
            this.player2.getChildByName("goldBox").getChildByName("money").getComponent(cc.Label).string = Storage.ShowMoney(player2.playerInfo.account)
            let node2 = this.player2.getChildByName("image")
            let url2 = Storage.GetPlayerHead(player2.playerInfo.headImg) 
            Storage.loadSpriteAtlas(node2, url2)
            this.player3.getChildByName("name").getComponent(cc.Label).string = player3.playerInfo.nickName
            this.player3.getChildByName("goldBox").getChildByName("money").getComponent(cc.Label).string = Storage.ShowMoney(player3.playerInfo.account)
            let node3 = this.player3.getChildByName("image")
            let url3 = Storage.GetPlayerHead(player3.playerInfo.headImg) 
            Storage.loadSpriteAtlas(node3, url3)
            this.player4.getChildByName("name").getComponent(cc.Label).string = player4.playerInfo.nickName
            this.player4.getChildByName("goldBox").getChildByName("money").getComponent(cc.Label).string = Storage.ShowMoney(player4.playerInfo.account)
            let node4 = this.player4.getChildByName("image")
            let url4 = Storage.GetPlayerHead(player4.playerInfo.headImg) 
            Storage.loadSpriteAtlas(node4, url4)
            this.player5.getChildByName("name").getComponent(cc.Label).string = player5.playerInfo.nickName
            this.player5.getChildByName("goldBox").getChildByName("money").getComponent(cc.Label).string = Storage.ShowMoney(player5.playerInfo.account)
            let node5 = this.player5.getChildByName("image")
            let url5 = Storage.GetPlayerHead(player5.playerInfo.headImg) 
            Storage.loadSpriteAtlas(node5, url5)
            this.player6.getChildByName("name").getComponent(cc.Label).string = player6.playerInfo.nickName
            this.player6.getChildByName("goldBox").getChildByName("money").getComponent(cc.Label).string = Storage.ShowMoney(player6.playerInfo.account)
            let node6 = this.player6.getChildByName("image")
            let url6 = Storage.GetPlayerHead(player6.playerInfo.headImg) 
            Storage.loadSpriteAtlas(node6, url6)
            this.playerAnimaLeft(this.player1.getChildByName("image"))
            this.playerAnimaLeft(this.player2.getChildByName("image"))
            this.playerAnimaLeft(this.player3.getChildByName("image"))
            this.playerAnimaLeft(this.player4.getChildByName("image"))
            this.playerAnimaLeft(this.player5.getChildByName("image"))
            this.playerAnimaLeft(this.player6.getChildByName("image"))
    }

    playerAnimaLeft(player: cc.Node) {  // 主要处理桌面纸牌
        let time: number;
        time = 0.13

        let scale = player.getScale(cc.v2());
        if (scale.x != 1 || scale.y != 1) {
            scale.x = 1
            scale.y = 1
        }
        let s2 = cc.scaleTo(time, 0, scale.y) 
        let sk2 = cc.skewTo(time, 0, -5)
        let spawn1 = cc.spawn(s2, sk2)
        let _s2 = cc.scaleTo(time, scale.x, scale.y);
        let _sk2 = cc.skewTo(time, 0, 0)
        let spawn2 = cc.spawn(_s2, _sk2)
        let call = cc.callFunc(() => {
            // card.getComponent('hh_pocker').backVisible(false);
        })
        let seq = cc.sequence(spawn1, call, spawn2)
        player.runAction(seq);
    }
    
    // 显示玩家赢钱输钱金额
    ShowPlayerMoney(player: msg.IPlayerData, playerNode, IsWinAni) {
        if (player.resultMoney > 0) {
            let winMoney = playerNode.getChildByName("winMoney")
            winMoney.active = true
            winMoney.getComponent(cc.Label).string = "+" +player.resultMoney 
            if (IsWinAni == true) {
                playerNode.getChildByName("winAni").active = true
                playerNode.getChildByName("winAni").getComponent(sp.Skeleton).setAnimation(1, "win", true) 
            }
        }
        if (player.resultMoney < 0) {
            let loseMoney = playerNode.getChildByName("loseMoney")
            loseMoney.active = true
            loseMoney.getComponent(cc.Label).string = player.resultMoney 
        }
    }

    // 显示桌面注池金额
    ShowPotsMoney(data: msg.IDownBetMoney) {
        let bigPot = cc.find("Canvas/roomScens/cdx_table/typePots/bigPot")
        bigPot.getChildByName("bets").getComponent(cc.Label).string = 0 + "/" + data.BigDownBet
        let smallPot = cc.find("Canvas/roomScens/cdx_table/typePots/smallPot")
        smallPot.getChildByName("bets").getComponent(cc.Label).string = 0 + "/" + data.SmallDownBet
        let singlePot = cc.find("Canvas/roomScens/cdx_table/typePots/singlePot")
        singlePot.getChildByName("bets").getComponent(cc.Label).string = 0 + "/" + data.SingleDownBet
        let pairPot = cc.find("Canvas/roomScens/cdx_table/typePots/pairPot")
        pairPot.getChildByName("bets").getComponent(cc.Label).string = 0 + "/" + data.PairDownBet
        let straightPot= cc.find("Canvas/roomScens/cdx_table/typePots/straightPot")
        straightPot.getChildByName("bets").getComponent(cc.Label).string = 0 + "/" + data.StraightDownBet
        let leopardPot = cc.find("Canvas/roomScens/cdx_table/typePots/leopardPot")
        leopardPot.getChildByName("bets").getComponent(cc.Label).string = 0 + "/" + data.LeopardDownBet
        let doublePot = cc.find("Canvas/roomScens/cdx_table/typePots/doublePot")
        doublePot.getChildByName("bets").getComponent(cc.Label).string = 0 + "/" + data.DoubleDownBet
    }

    // 显示结算数字
    ShowResultNum(num,numNode) {
        switch (num) {
            case 0:
                numNode.getChildByName("s0").active = true
                break;
            case 1:
                numNode.getChildByName("s1").active = true
                break;
            case 2:
                numNode.getChildByName("s2").active = true
                break;
            case 3:
                numNode.getChildByName("s3").active = true
                break;
            case 4:
                numNode.getChildByName("s4").active = true
                break;
            case 5:
                numNode.getChildByName("s5").active = true
                break;
            case 6:
                numNode.getChildByName("s6").active = true
                break;
            case 7:
                numNode.getChildByName("s7").active = true
                break;
            case 8:
                numNode.getChildByName("s8").active = true
                break;
            case 9:
                numNode.getChildByName("s9").active = true
                break;
            default:
                break;
        }
    }

    // 显示庄家阶段按钮
    ShowBankerButton() {
        this.bankerList.active = true
        this.notBanker.active = true
        this.banker2000.active = true
        this.banker5000.active = true
        this.banker10000.active = true
        this.banker20000.active = true
    }

    // 显示庄家信息
    ShowBankerInfo(player: msg.IPlayerData) {
        this.bankerInfo.getChildByName("goldBox").getChildByName("money").active = true
        this.bankerInfo.getChildByName("goldBox").getChildByName("money").getComponent(cc.Label).string = Storage.ShowMoney(player.bankerMoney)
        this.bankerInfo.getChildByName("name").active = true
        if (player.IsRobot == true) {
           this.bankerInfo.getChildByName("name").getComponent(cc.Label).string = "系统坐庄"
        }else {
           this.bankerInfo.getChildByName("name").getComponent(cc.Label).string = player.playerInfo.nickName
        }
        let node2 = this.bankerInfo.getChildByName("image")
        node2.active = true
        let url2 = Storage.GetPlayerHead(player.playerInfo.headImg) 
        Storage.loadSpriteAtlas(node2, url2)
        this.bankerInfo.getChildByName("bankerLable").active = true
        this.bankerInfo.getChildByName("bankerLable").getComponent(cc.Label).string = "连庄"+ player.bankerCount +"/3"
    }

    // 显示聊天表情动画
    ShowEmojChat(actNum,player) {
        switch (actNum) {
            case 1:
                player.getChildByName("chat_duan").active = true
                player.getChildByName("chat_duan").getChildByName("01").active = true
                setTimeout(() => {
                    player.getChildByName("chat_duan").active = false
                    player.getChildByName("chat_duan").getChildByName("01").active = false
                }, 1500);
                break;
            case 2:
                player.getChildByName("chat_duan").active = true
                player.getChildByName("chat_duan").getChildByName("02").active = true
                setTimeout(() => {
                    player.getChildByName("chat_duan").active = false
                    player.getChildByName("chat_duan").getChildByName("02").active = false
                }, 1500);
                break;
            case 3:
                player.getChildByName("chat_duan").active = true
                player.getChildByName("chat_duan").getChildByName("03").active = true
                setTimeout(() => {
                    player.getChildByName("chat_duan").active = false
                    player.getChildByName("chat_duan").getChildByName("03").active = false
                }, 1500);
                break;
            case 4:
                player.getChildByName("chat_chang").active = true
                player.getChildByName("chat_chang").getChildByName("04").active = true
                setTimeout(() => {
                    player.getChildByName("chat_chang").active = false
                    player.getChildByName("chat_chang").getChildByName("04").active = false
                }, 1500);
                break;
            case 5:
                player.getChildByName("chat_chang").active = true
                player.getChildByName("chat_chang").getChildByName("05").active = true
                setTimeout(() => {
                    player.getChildByName("chat_chang").active = false
                    player.getChildByName("chat_chang").getChildByName("05").active = false
                }, 1500);
                break;
            case 6:
                player.getChildByName("chat_duan").active = true
                player.getChildByName("chat_duan").getChildByName("06").active = true
                setTimeout(() => {
                    player.getChildByName("chat_duan").active = false
                    player.getChildByName("chat_duan").getChildByName("06").active = false
                }, 1500);
                break;
            case 7:
                player.getChildByName("chat_chang").active = true
                player.getChildByName("chat_chang").getChildByName("07").active = true
                setTimeout(() => {
                    player.getChildByName("chat_chang").active = false
                    player.getChildByName("chat_chang").getChildByName("07").active = false
                }, 1500);
                break;
            case 8:
                player.getChildByName("chat_duan").active = true
                player.getChildByName("chat_duan").getChildByName("08").active = true
                setTimeout(() => {
                    player.getChildByName("chat_duan").active = false
                    player.getChildByName("chat_duan").getChildByName("08").active = false
                }, 1500);
                break;
            case 9:
                player.getChildByName("emoj_Act").active = true
                let daxiao = player.getChildByName("emoj_Act").getChildByName("daxiao")
                daxiao.active = true
                daxiao.getComponent(sp.Skeleton).setAnimation(1, "Animation1", false)
                setTimeout(() => {
                    daxiao.active = false
                }, 1500);
                break;
            case 10:
                player.getChildByName("emoj_Act").active = true
                let liuhan = player.getChildByName("emoj_Act").getChildByName("liuhan")
                liuhan.active = true
                liuhan.getComponent(sp.Skeleton).setAnimation(1, "Animation1", false)
                setTimeout(() => {
                    liuhan.active = false
                }, 1500);
                break;
            case 11:
                player.getChildByName("emoj_Act").active = true
                let zhuakuang = player.getChildByName("emoj_Act").getChildByName("zhuakuang")
                zhuakuang.active = true
                zhuakuang.getComponent(sp.Skeleton).setAnimation(1, "Animation1", false)
                setTimeout(() => {
                    zhuakuang.active = false
                }, 1500);
                break;
            case 12:
                player.getChildByName("emoj_Act").active = true
                let kun = player.getChildByName("emoj_Act").getChildByName("kun")
                kun.active = true
                kun.getComponent(sp.Skeleton).setAnimation(1, "Animation1", false)
                setTimeout(() => {
                    kun.active = false
                }, 1500);
                break;
            case 13:
                player.getChildByName("emoj_Act").active = true
                let shangbai = player.getChildByName("emoj_Act").getChildByName("shangbai")
                shangbai.active = true
                shangbai.getComponent(sp.Skeleton).setAnimation(1, "Animation1", false)
                setTimeout(() => {
                    shangbai.active = false
                }, 1500);
                break;
            case 14:
                player.getChildByName("emoj_Act").active = true
                let liukoushui = player.getChildByName("emoj_Act").getChildByName("liukoushui")
                liukoushui.active = true
                liukoushui.getComponent(sp.Skeleton).setAnimation(1, "Animation1", false)
                setTimeout(() => {
                    liukoushui.active = false
                }, 1500);
                break;
            case 15:
                player.getChildByName("emoj_Act").active = true
                let yaobaiqi = player.getChildByName("emoj_Act").getChildByName("yaobaiqi")
                yaobaiqi.active = true
                yaobaiqi.getComponent(sp.Skeleton).setAnimation(1, "Animation1", false)
                setTimeout(() => {
                    yaobaiqi.active = false
                }, 1500);
                break;
            case 16:
                player.getChildByName("emoj_Act").active = true
                let damuzhi = player.getChildByName("emoj_Act").getChildByName("damuzhi")
                damuzhi.active = true
                damuzhi.getComponent(sp.Skeleton).setAnimation(1, "Animation1", false)
                setTimeout(() => {
                    damuzhi.active = false
                }, 1500);
                break;
            case 17:
                player.getChildByName("emoj_Act").active = true
                let maohuo = player.getChildByName("emoj_Act").getChildByName("maohuo")
                maohuo.active = true
                maohuo.getComponent(sp.Skeleton).setAnimation(1, "Animation1", false)
                setTimeout(() => {
                    maohuo.active = false
                }, 1500);
                break;
            case 18:
                player.getChildByName("emoj_Act").active = true
                let jiong = player.getChildByName("emoj_Act").getChildByName("jiong")
                jiong.active = true
                jiong.getComponent(sp.Skeleton).setAnimation(1, "Animation1", false)
                setTimeout(() => {
                    jiong.active = false
                }, 1500);
                break;
            case 19:
                player.getChildByName("emoj_Act").active = true
                let jingxia = player.getChildByName("emoj_Act").getChildByName("jingxia")
                jingxia.active = true
                jingxia.getComponent(sp.Skeleton).setAnimation(1, "Animation1", false)
                setTimeout(() => {
                    jingxia.active = false
                }, 1500);
                break;
            case 20:
                player.getChildByName("emoj_Act").active = true
                let yun = player.getChildByName("emoj_Act").getChildByName("yun")
                yun.active = true
                yun.getComponent(sp.Skeleton).setAnimation(1, "Animation1", false)
                setTimeout(() => {
                    yun.active = false
                }, 1500);
                break;
        }
    }

    // 显示表情动画
    ShowEmojAction(players,actNum) {
        players.getChildByName("emoj_Anima").active = true
        // 声音
        // Sound.PlayAudio(Sound.LoadEmojAduio(data.actNum))
        if (actNum == 21) {
            setTimeout(() => {
                let jianjiaoji = players.getChildByName("emoj_Anima").getChildByName("jianjiaoji")
                setTimeout(() => {
                    jianjiaoji.active = true
                    jianjiaoji.getComponent(sp.Skeleton).setAnimation(1,"Animation2", false)
                }, 500);
                setTimeout(() => {
                    jianjiaoji.active = false
                }, 2000);
            }, 500);
        }else if (actNum == 22) {
            setTimeout(() => {
                let meiguihua = players.getChildByName("emoj_Anima").getChildByName("meiguihua")
                setTimeout(() => {
                    meiguihua.active = true
                    meiguihua.getComponent(sp.Skeleton).setAnimation(1, "Animation1", false)
                }, 500);
                setTimeout(() => {
                    meiguihua.active = false
                }, 2000);
            }, 500);
        }else if (actNum == 23) {
            setTimeout(() => {
                let pijiubei = players.getChildByName("emoj_Anima").getChildByName("pijiubei")
                setTimeout(() => {
                    pijiubei.active = true
                    pijiubei.getComponent(sp.Skeleton).setAnimation(1, "Animation1", false)
                }, 500);
                setTimeout(() => {
                    pijiubei.active = false
                }, 2000);
            }, 500);
        }else if (actNum == 24) {
            setTimeout(() => {
                let tuoxie = players.getChildByName("emoj_Anima").getChildByName("tuoxie")
                tuoxie.getComponent(sp.Skeleton).setAnimation(1, "null", false)
                setTimeout(() => {
                    tuoxie.active = true
                    tuoxie.getComponent(sp.Skeleton).setAnimation(1, "Animation1", false)
                }, 500);
                tuoxie.getComponent(sp.Skeleton).setAnimation(1, "Animation2", false)
                setTimeout(() => {
                    tuoxie.active = false
                }, 2000);
            }, 500);
        }
    }

    ShowTablePlayer() {
        // 显示桌面个人信息
        this.playerS.getChildByName("name").getComponent(cc.Label).string = Storage.PlayerData.playerInfo.nickName
        this.playerS.getChildByName("goldBox").getChildByName("money").getComponent(cc.Label).string = Storage.ShowMoney(Storage.PlayerData.playerInfo.account)
        let node = this.playerS.getChildByName("image")
        let url = Storage.GetPlayerHead(Storage.PlayerData.playerInfo.headImg) 
        Storage.loadSpriteAtlas(node, url)

        // 显示6个桌面玩家信息
        let player1 = Storage.RoomData.tablePlayer[0]
        let player2 = Storage.RoomData.tablePlayer[1]
        let player3 = Storage.RoomData.tablePlayer[2]
        let player4 = Storage.RoomData.tablePlayer[3]
        let player5 = Storage.RoomData.tablePlayer[4]
        let player6 = Storage.RoomData.tablePlayer[5]
        this.player1.getChildByName("name").getComponent(cc.Label).string = player1.playerInfo.nickName
        this.player1.getChildByName("goldBox").getChildByName("money").getComponent(cc.Label).string = Storage.ShowMoney(player1.playerInfo.account)
        let node1 = this.player1.getChildByName("image")
        let url1 = Storage.GetPlayerHead(player1.playerInfo.headImg) 
        Storage.loadSpriteAtlas(node1, url1)
        this.player2.getChildByName("name").getComponent(cc.Label).string = player2.playerInfo.nickName
        this.player2.getChildByName("goldBox").getChildByName("money").getComponent(cc.Label).string = Storage.ShowMoney(player2.playerInfo.account)
        let node2 = this.player2.getChildByName("image")
        let url2 = Storage.GetPlayerHead(player2.playerInfo.headImg) 
        Storage.loadSpriteAtlas(node2, url2)
        this.player3.getChildByName("name").getComponent(cc.Label).string = player3.playerInfo.nickName
        this.player3.getChildByName("goldBox").getChildByName("money").getComponent(cc.Label).string = Storage.ShowMoney(player3.playerInfo.account)
        let node3 = this.player3.getChildByName("image")
        let url3 = Storage.GetPlayerHead(player3.playerInfo.headImg) 
        Storage.loadSpriteAtlas(node3, url3)
        this.player4.getChildByName("name").getComponent(cc.Label).string = player4.playerInfo.nickName
        this.player4.getChildByName("goldBox").getChildByName("money").getComponent(cc.Label).string = Storage.ShowMoney(player4.playerInfo.account)
        let node4 = this.player4.getChildByName("image")
        let url4 = Storage.GetPlayerHead(player4.playerInfo.headImg) 
        Storage.loadSpriteAtlas(node4, url4)
        this.player5.getChildByName("name").getComponent(cc.Label).string = player5.playerInfo.nickName
        this.player5.getChildByName("goldBox").getChildByName("money").getComponent(cc.Label).string = Storage.ShowMoney(player5.playerInfo.account)
        let node5 = this.player5.getChildByName("image")
        let url5 = Storage.GetPlayerHead(player5.playerInfo.headImg) 
        Storage.loadSpriteAtlas(node5, url5)
        this.player6.getChildByName("name").getComponent(cc.Label).string = player6.playerInfo.nickName
        this.player6.getChildByName("goldBox").getChildByName("money").getComponent(cc.Label).string = Storage.ShowMoney(player6.playerInfo.account)
        let node6 = this.player6.getChildByName("image")
        let url6 = Storage.GetPlayerHead(player6.playerInfo.headImg) 
        Storage.loadSpriteAtlas(node6, url6)

        // 显示庄家阶段
        console.log("进来了 11111111111111111");
        for (let i = 0; i < Storage.RoomData.playerData.length; i++) {
            if (Storage.RoomData.playerData[i] != null && Storage.RoomData.playerData[i].IsBanker == true) {
                let player = Storage.RoomData.playerData[i]
                console.log("进来了 222222222222222222222222");
                // 显示庄家
                this.ShowBankerInfo(player)
            }
        }
    }

    ShowTableData() {
        // 显示桌面筹码
        this.ShowTableChips(Storage.PlayerData.playerInfo.account)
        // 显示上两期开奖
        this.ShowHistoryData()
        // 显示开奖类型数据
        this.ShowResutltType()
        // 显示注池筹码和数量
        this.ShowPotsMoney(Storage.RoomData.potMoneyCount)
        // 显示耐心等待
        // if (Storage.RoomData.gameStep == msg.GameStep.Settle) {
        //     let waiting = cc.find("Canvas/roomScens/gameStep/waiting")
        //     waiting.active = true
        // }
    }

    ShowTableChips(money: number) {
        // 判断当前阶段显示对应筹码
        if (Storage.RoomData.gameStep == msg.GameStep.DownBet) {
            if (Storage.PlayerData.IsBanker == true) {
                // 关闭下注筹码
                this.CloseChipsButton()
            }else {
                // 显示下注按钮
                this.ShowChipsButton(money)
            }
        }else {
            // 关闭下注筹码
            this.CloseChipsButton()
        }
    }

    ShowHistoryData() {
        // 显示上两期开奖
        let number = Storage.RoomData.historyData.length
        if (Storage.RoomData.historyData.length >= 2) {
            let data1 = Storage.RoomData.historyData[number-1]
            let num1 = data1.resNum[0]
            let num2 = data1.resNum[1]
            let num3 = data1.resNum[2]
            let data2 = Storage.RoomData.historyData[number-2]
            let num4 = data2.resNum[0]
            let num5 = data2.resNum[1]
            let num6 = data2.resNum[2]
            let dataText01 = cc.find("Canvas/roomScens/cdx_historyRes/dataText01")
            let dataText02 = cc.find("Canvas/roomScens/cdx_historyRes/dataText02")
            let dataText03 = cc.find("Canvas/roomScens/cdx_historyRes/dataText03")
            let dataText04 = cc.find("Canvas/roomScens/cdx_historyRes/dataText04")
            let dataText05 = cc.find("Canvas/roomScens/cdx_historyRes/dataText05")
            let dataText06 = cc.find("Canvas/roomScens/cdx_historyRes/dataText06")
            let dataText07 = cc.find("Canvas/roomScens/cdx_historyRes/dataText07")
            dataText01.getComponent(cc.Label).string = num1 + ''
            dataText02.getComponent(cc.Label).string = num2 + ''
            dataText03.getComponent(cc.Label).string = num3 + ''
            dataText04.getComponent(cc.Label).string = '/'
            dataText05.getComponent(cc.Label).string = num4 + ''
            dataText06.getComponent(cc.Label).string = num5 + ''
            dataText07.getComponent(cc.Label).string = num6 + ''
        }
    }

    ShowResutltType() {
        let resBox = cc.find("Canvas/roomScens/cdx_resBox")
        let res1 = resBox.getChildByName("res1")
        let res2 = resBox.getChildByName("res2")
        let res3 = resBox.getChildByName("res3")
        let res4 = resBox.getChildByName("res4")
        let res5 = resBox.getChildByName("res5")
        let res6 = resBox.getChildByName("res6")
        this.ClearResutltType(res1)
        this.ClearResutltType(res2)
        this.ClearResutltType(res3)
        this.ClearResutltType(res4)
        this.ClearResutltType(res5)
        this.ClearResutltType(res6)
        res6.getChildByName("font").active = false

        let pot1 = Storage.RoomData.potWinList[0]
        if (pot1 != null) {
          
            this.HandleResutltType(pot1, res1)
        }
        let pot2 = Storage.RoomData.potWinList[1]
        if (pot2 != null) {
            this.HandleResutltType(pot2, res2)
        }
        let pot3 = Storage.RoomData.potWinList[2]
        if (pot3 != null) {
            this.HandleResutltType(pot3, res3)
        }
        let pot4 = Storage.RoomData.potWinList[3]
        if (pot4 != null) {
            this.HandleResutltType(pot4, res4)
        }
        let pot5 = Storage.RoomData.potWinList[4]
        if (pot5 != null) {
            this.HandleResutltType(pot5, res5)
        }
        let pot6 = Storage.RoomData.potWinList[5]
        if (pot6 != null) {
            res6.getChildByName("font").active = true
            this.HandleResutltType(pot6, res6)
        }
    }

    // 显示结算闪烁框
    ShowResultPox(resData) {
        let potsBox = cc.find("Canvas/roomScens/cdx_table/potsBox")
        let res01 = cc.find("Canvas/roomScens/resultNum/res01")
        let smallBig = res01.getChildByName("smallBig")
        let sinDouble = res01.getChildByName("sinDouble")
        if (resData.sinDouble == 1) { // 单
            sinDouble.getChildByName("single").active = true
            if (potsBox.getChildByName("singleBox").active == false) {
                potsBox.getChildByName("singleBox").active = true
                potsBox.getChildByName("singleBox").getComponent(sp.Skeleton).setAnimation(1, "dan", true)
            }
        }else if (resData.sinDouble == 2) { // 双
            sinDouble.getChildByName("double").active = true
            if (potsBox.getChildByName("doubleBox").active == false) {
                potsBox.getChildByName("doubleBox").active = true
                potsBox.getChildByName("doubleBox").getComponent(sp.Skeleton).setAnimation(1, "shuang", true)
            }
        }
        if (resData.bigSmall == 1) { // 小
            smallBig.getChildByName("small").active = true
            if (potsBox.getChildByName("smallBox").active == false) {
                potsBox.getChildByName("smallBox").active = true
                potsBox.getChildByName("smallBox").getComponent(sp.Skeleton).setAnimation(1, "xiao", true)
            }
        }else  if (resData.bigSmall == 2) { // 大
            smallBig.getChildByName("big").active = true
            if (potsBox.getChildByName("bigBox").active == false) {
                potsBox.getChildByName("bigBox").active = true
                potsBox.getChildByName("bigBox").getComponent(sp.Skeleton).setAnimation(1, "da", true)
            }
        }
        if (resData.cardType == msg.CardsType.Pair) {
            if (potsBox.getChildByName("pairBox").active == false) {
                potsBox.getChildByName("pairBox").active = true
                potsBox.getChildByName("pairBox").getComponent(sp.Skeleton).setAnimation(1, "duizi", true)
            }
        }else if (resData.cardType == msg.CardsType.Straight) { 
            if (potsBox.getChildByName("straightBox").active == false) {
                potsBox.getChildByName("straightBox").active = true
                potsBox.getChildByName("straightBox").getComponent(sp.Skeleton).setAnimation(1, "shunzi", true)
            }
        }else if (resData.cardType == msg.CardsType.Leopard) { 
            if (potsBox.getChildByName("leopardBox").active == false) {
                potsBox.getChildByName("leopardBox").active = true
                potsBox.getChildByName("leopardBox").getComponent(sp.Skeleton).setAnimation(1, "baozi", true)
            }
        }
    }

    // 显示结算数字框2
    ShowResultNumber2() {
        let res02 = cc.find("Canvas/roomScens/resultNum/res02")
        res02.active = true
        let number01 = res02.getChildByName("number01")
        let number02 = res02.getChildByName("number02")
        let number03 = res02.getChildByName("number03")
        let number04 = res02.getChildByName("number04")
        let num01 = Storage.RoomData.resultInt[0]
        this.ShowResultNum(num01,number01)
        let num02 = Storage.RoomData.resultInt[1]
        this.ShowResultNum(num02,number02)
        let num03 = Storage.RoomData.resultInt[2]
        this.ShowResultNum(num03,number03)
        let num = Storage.RoomData.potWinList.length
        let resData = Storage.RoomData.potWinList[num-1]
        this.ShowResultNum(resData.resultNum,number04)
    }

    HandleResutltType(pot: msg.IPotWinList, potNode) {
        if (pot.cardType == msg.CardsType.Leopard) {
            potNode.getChildByName("bao").active = true
            return
        }
        if (pot.bigSmall == 1) { // 小
            if (pot.sinDouble == 1) { // 单
                potNode.getChildByName("smallS").active = true
            }else if (pot.sinDouble == 2) { // 双 
                potNode.getChildByName("smallD").active = true
            }
        }
        if (pot.bigSmall == 2) { // 大
            if (pot.sinDouble == 1) { // 单
                potNode.getChildByName("bigS").active = true
            }else if (pot.sinDouble == 2) { // 双 
                potNode.getChildByName("bigD").active = true
            }
        }
    }

    ClearResutltType(res) {
        res.getChildByName("smallS").active = false
        res.getChildByName("smallD").active = false
        res.getChildByName("bigS").active = false
        res.getChildByName("bigD").active = false
        res.getChildByName("bao").active = false
    }

    // 庄家事件点击
    bankerClick(eve,num: number) { 
        // 播放音效
        Sound.PlayAudio(Sound.LoadAudio(0))

        let bankerTip = cc.find("Canvas/roomScens/banker/bankerTip")
        let zhedangwu = cc.find("Canvas/roomScens/banker/zhedangwu")
        let tipBox = bankerTip.getChildByName("tipBox")
        if (num == 0) { // 庄家列表
            bankerTip.active = true
            zhedangwu.active = true
            // 显示抢庄列表 todo
        }
        if (num == 1) { // 不抢
            this.IsClickBanker = true
            this.CloseBankerButton()
        }
        if (num == 2) { // 抢庄2000
            let data : msg.IBankerData_C2S = {
                status: 2,
                takeMoney: 2000,
            }
            events.dispatch(EventKind.C2S_BankerData, data);
            this.IsClickBanker = true
            this.CloseBankerButton()
        }
        if (num == 3) { // 抢庄5000
            let data : msg.IBankerData_C2S = {
                status: 2,
                takeMoney: 5000,
            }
            events.dispatch(EventKind.C2S_BankerData, data);
            this.IsClickBanker = true
            this.CloseBankerButton()
        }
        if (num == 4) { // 抢庄10000
            let data : msg.IBankerData_C2S = {
                status: 2,
                takeMoney: 10000,
            }
            events.dispatch(EventKind.C2S_BankerData, data);
            this.IsClickBanker = true
            this.CloseBankerButton()
        }
        if (num == 5) { // 抢庄20000
            let data : msg.IBankerData_C2S = {
                status: 2,
                takeMoney: 20000,
            }
            events.dispatch(EventKind.C2S_BankerData, data);
            this.IsClickBanker = true
            this.CloseBankerButton()
        }
        if (num == 6) {
            bankerTip.active = false
            zhedangwu.active = false
        }
        if (num == 7) {
            tipBox.active = true
        }
        if (num == 8) {
            tipBox.active = false
        }
        if (num == 9) {
            tipBox.active = false
        }
    }

    // 下庄点击
    downBankerClick(eve,num: number) { 
        if (num == 1) {
            let data : msg.IBankerData_C2S = {
                status: 3,
            }
            events.dispatch(EventKind.C2S_BankerData, data);
        }
    }
    // 关闭庄家按钮
    CloseBankerButton() {
        this.bankerList.active = false
        this.notBanker.active = false
        this.banker2000.active = false
        this.banker5000.active = false
        this.banker10000.active = false
        this.banker20000.active = false
    }

    // 返回房间点击
    backRoomClick(eve,num: number) {
        // 播放音效
        Sound.PlayAudio(Sound.LoadAudio(0))

        if (this.backTime != 0) {return;}
        this.backTime = 3;
        console.log("玩家状态:",Storage.RoomData)
        if (num == 1) { // 返回点击
            if (Storage.PlayerData.IsAction == true && Storage.PlayerData.IsBanker == true) {
                // 显示是否返回提示框
                let backTip = cc.find("Canvas/roomScens/promptBox/backTip")
                backTip.active = true
                let zhedangwu = cc.find("Canvas/roomScens/promptBox/zhedangwu")
                zhedangwu.active = true
            }else {
                let data: msg.ILeaveRoom_C2S = {
                }
                events.dispatch(EventKind.C2S_LeaveRoom, data);
            }
        }
        if (num == 2) { // 返回框确认点击
            let backTip = cc.find("Canvas/roomScens/promptBox/backTip")
            backTip.active = false
            let zhedangwu = cc.find("Canvas/roomScens/promptBox/zhedangwu")
            zhedangwu.active = false
        }
    }
    // 桌面箭头点击
    jiantouClick(eve,num: number) {
        // 播放音效
        Sound.PlayAudio(Sound.LoadAudio(0))
        if (num == 1) {
            let menuList = cc.find("Canvas/roomScens/cdx_menu/menuList")
            menuList.active = true
            menuList.getChildByName("cancelClick").active = true
        }
    }
    // 菜单点击事件
    menuListClick(eve,num: number) {
        // 播放音效
        Sound.PlayAudio(Sound.LoadAudio(0))
        let menuList = cc.find("Canvas/roomScens/cdx_menu/menuList")
        if (num == 1) { // 背景点击事件
            menuList.active = false
            menuList.getChildByName("cancelClick").active = false
        }
        if (num == 2) { // 背景音乐
            let musicClose = menuList.getChildByName("music").getChildByName("close")
            if (musicClose.active) { // 开启
                Sound.IsBackMusic = true
                musicClose.active = false
                // 开启播放音乐
                // gHandler.audioMgr.setBgState(true);
                // console.log("大厅音效开关状态:",gHandler.audioMgr.getBgState())
                cc.audioEngine.resumeMusic ();
            }else { // 关闭
                Sound.IsBackMusic = false
                musicClose.active = true
                // 停止播放所以音效
                // gHandler.audioMgr.setBgState(false);
                // console.log("大厅音效开关状态:",gHandler.audioMgr.getBgState())
                cc.audioEngine.pauseMusic();
            }
             
        }
        if (num == 3) { // 场景音效
            let yinliangClose = menuList.getChildByName("yinliang").getChildByName("close")
            if (yinliangClose.active) { // 开启
                Sound.IsOpenMusic = true
                yinliangClose.active = false
            }else { // 关闭
                Sound.IsOpenMusic = false
                yinliangClose.active = true
            }
        }
        if (num == 4) { // 规则
            let ruleBox = cc.find("Canvas/roomScens/cdx_menu/ruleBox")
            ruleBox.active = true
            menuList.active = false
            menuList.getChildByName("cancelClick").active = false
        }
        if (num == 5) { // 商城

        }
    }
    // 规则框点击事件
    ruleBoxClick(eve,num: number) {
        // 播放音效
        Sound.PlayAudio(Sound.LoadAudio(0))
        if (num == 1) { 
            let ruleBox = cc.find("Canvas/roomScens/cdx_menu/ruleBox")
            ruleBox.active = false
        }
    }
    // 网址点击
    internetClick(eve,num: number) {
        if (num == 1) {
            cc.sys.openURL("http://77tj.org/tencent")
        }
    }
    // 玩家列表点击
    playerListClick(eve,num: number) {
        // 播放音效
        Sound.PlayAudio(Sound.LoadAudio(0))
        if (num == 1) {
            // 显示玩家列表
            this.ShowUserList()
        }
    }

    userList_arr: cc.Node[] = []
    ShowUserList() {
        let userListBox = cc.find("Canvas/roomScens/userListBox")
        userListBox.active = true
        let content = userListBox.getChildByName("listView").getChildByName("view").getChildByName("content")
        let playerInfo = content.getChildByName("playerInfo")
        let posX = playerInfo.x
        let posY = playerInfo.y
        let num = null
        for (let i = 0; i < Storage.RoomData.playerData.length; i++) {
            if (Storage.RoomData.playerData[i] != null) {
                if (num >= 50) {
                    return
                }
                let player = Storage.RoomData.playerData[i]
                let usersInfo = cc.instantiate(playerInfo);
                usersInfo.active = true;
                usersInfo.getChildByName("numberNum").getComponent(cc.Label).string = (i+1) + ''
                let node = usersInfo.getChildByName("image")
                let url = Storage.GetPlayerHead(player.playerInfo.headImg) 
                Storage.loadSpriteAtlas(node, url)
                usersInfo.getChildByName("name").getComponent(cc.Label).string = player.playerInfo.nickName
                let money = usersInfo.getChildByName("moneyBox").getChildByName("money")
                money.getComponent(cc.Label).string = Storage.ShowMoney(player.playerInfo.account)
                let downBet = usersInfo.getChildByName("downBet").getChildByName("number")
                downBet.getComponent(cc.Label).string = player.totalDownBet + ''
                let winNum = usersInfo.getChildByName("winNum").getChildByName("number")
                winNum.getComponent(cc.Label).string = player.winTotalCount + ''
                usersInfo.setPosition(posX,posY-(i*110))
                content.addChild(usersInfo);
                this.userList_arr.push(usersInfo)
                num++
            }
        }
    }
    // 玩家列表关闭点击
    playersCloseClick(eve,num: number) {
        // 播放音效
        Sound.PlayAudio(Sound.LoadAudio(0))
        if (num == 1) {
            let userListBox = cc.find("Canvas/roomScens/userListBox")
            userListBox.active = false
            // 清除玩家列表
            if (this.userList_arr.length > 0) {
                for (let i = 0; i < this.userList_arr.length; i++) {
                    if (cc.isValid(this.userList_arr[i])) {
                        this.userList_arr[i].destroy();
                    }
                }
            }
        }
    }

    downBet_arr: cc.Node[] = []
    // 下注记录点击事件
    downBetDataClick(eve,num: number) {
        // 播放音效
        Sound.PlayAudio(Sound.LoadAudio(0))
        if (num == 1) { // 开启
            // 显示下注记录
            this.ShowDownBetData()
        }
        if (num == 2) { // 关闭
            let downBetBox = cc.find("Canvas/roomScens/downBetBox")
            downBetBox.active = false
            // 清除玩家列表
            if (this.downBet_arr.length > 0) {
                for (let i = 0; i < this.downBet_arr.length; i++) {
                    if (cc.isValid(this.downBet_arr[i])) {
                        this.downBet_arr[i].destroy();
                    }
                }
            }
        }
    }

    // 显示下注记录
    ShowDownBetData() {
        let downBetBox = cc.find("Canvas/roomScens/downBetBox")
        downBetBox.active = true
        let content = downBetBox.getChildByName("dataView").getChildByName("view").getChildByName("content")
        let playerData = content.getChildByName("playerData")
        let posX = playerData.x
        let posY = playerData.y
        let num = null
        if (Storage.PlayerData.downBetHistory.length > 0) {
            downBetBox.getChildByName("notBetFont").active = false
            for (let i = 0; i < Storage.PlayerData.downBetHistory.length; i++) {
                if (Storage.PlayerData.downBetHistory[i] != null ) {
                    if (num >= 70) {
                        return
                    }
                    let hisData = Storage.PlayerData.downBetHistory[i]
                    let usersData = cc.instantiate(playerData);
                    usersData.active = true;
                    usersData.getChildByName("time").getComponent(cc.Label).string = hisData.timeFmt
                    let resNum = usersData.getChildByName("resNum")
                    let str = hisData.resNum[0]+"+"+ hisData.resNum[1]+"+"+ hisData.resNum[2]+"="+hisData.result
                    resNum.getComponent(cc.Label).string = str
                    let big = usersData.getChildByName("big").getChildByName("money")
                    if (hisData.downBetMoney.BigDownBet > 0) {
                        big.getComponent(cc.Label).string = hisData.downBetMoney.BigDownBet + ''
                    }
                    let small = usersData.getChildByName("small").getChildByName("money")
                    if (hisData.downBetMoney.BigDownBet > 0) {
                        small.getComponent(cc.Label).string = hisData.downBetMoney.SmallDownBet + ''
                    }
                    let single = usersData.getChildByName("single").getChildByName("money")
                    if (hisData.downBetMoney.BigDownBet > 0) {
                        single.getComponent(cc.Label).string = hisData.downBetMoney.SingleDownBet + ''
                    }
                    let double = usersData.getChildByName("double").getChildByName("money")
                    if (hisData.downBetMoney.BigDownBet > 0) {
                        double.getComponent(cc.Label).string = hisData.downBetMoney.DoubleDownBet + ''
                    }
                    let pair = usersData.getChildByName("pair").getChildByName("money")
                    if (hisData.downBetMoney.BigDownBet > 0) {
                        pair.getComponent(cc.Label).string = hisData.downBetMoney.PairDownBet + ''
                    }
                    let straight = usersData.getChildByName("straight").getChildByName("money")
                    if (hisData.downBetMoney.BigDownBet > 0) {
                        straight.getComponent(cc.Label).string = hisData.downBetMoney.StraightDownBet + ''
                    }
                    let leopard = usersData.getChildByName("leopard").getChildByName("money")
                    if (hisData.downBetMoney.BigDownBet > 0) {
                        leopard.getComponent(cc.Label).string = hisData.downBetMoney.LeopardDownBet + ''
                    }
                    if (hisData.bigSmall == 1) {
                        usersData.getChildByName("smallBig").getComponent(cc.Label).string = "小"
                    }else if (hisData.bigSmall == 2) {
                        usersData.getChildByName("smallBig").getComponent(cc.Label).string = "大"
                    }
                    if (hisData.sinDouble == 1) {
                        usersData.getChildByName("sinDouble").getComponent(cc.Label).string = "单"
                    }else if (hisData.sinDouble == 2) {
                        usersData.getChildByName("sinDouble").getComponent(cc.Label).string = "双"
                    }
                    if (hisData.cardType == 1) {
                        usersData.getChildByName("luckType").getComponent(cc.Label).string = "对子"
                    }else if (hisData.cardType == 2) {
                        usersData.getChildByName("luckType").getComponent(cc.Label).string = "顺子"
                    }else if (hisData.cardType == 3) {
                        usersData.getChildByName("luckType").getComponent(cc.Label).string = "豹子"
                    }
                    usersData.setPosition(posX,posY-(i*75))
                    content.addChild(usersData);
                    this.downBet_arr.push(usersData)
                    num++
                }
            }
        }else {
            downBetBox.getChildByName("notBetFont").active = true
        }
    }

    history_arr: cc.Node[] = []
    // 历史记录点击
    historyDataClick(eve,num: number) {
        if (num == 1) { // 打开
            this.ShowHistoryRecord()
        }
        if (num == 2) { // 关闭
            let historyBox = cc.find("Canvas/roomScens/historyBox")
            historyBox.active = false
            // 清除玩家列表
            if (this.history_arr.length > 0) {
                for (let i = 0; i < this.history_arr.length; i++) {
                    if (cc.isValid(this.history_arr[i])) {
                        this.history_arr[i].destroy();
                    }
                }
            }
        }
    }

    // 显示历史记录
    ShowHistoryRecord() {
        let historyBox = cc.find("Canvas/roomScens/historyBox")
        historyBox.active = true
        let content = historyBox.getChildByName("dataView").getChildByName("view").getChildByName("content")
        let historyData = content.getChildByName("historyData")
        let posX = historyData.x
        let posY = historyData.y
        let num = null
        if (Storage.RoomData.historyData.length > 0) {
            for (let i = 0; i < Storage.RoomData.historyData.length; i++) {
                if (Storage.RoomData.historyData[i] != null ) {
                    if (num >= 70) {
                        return
                    }
                    let hisData = Storage.RoomData.historyData[i]
                    let resData = cc.instantiate(historyData);
                    resData.active = true;
                    resData.getChildByName("time").getComponent(cc.Label).string = hisData.timeFmt
                    let resNum = resData.getChildByName("resNum")
                    let str = hisData.resNum[0]+"+"+ hisData.resNum[1]+"+"+ hisData.resNum[2]
                    resNum.getComponent(cc.Label).string = str
                    resData.getChildByName("result").getComponent(cc.Label).string = hisData.result + ''

                    if (hisData.cardType == 3) {
                        resData.getChildByName("smallBig").getComponent(cc.Label).string = "豹子"
                        resData.getChildByName("sinDouble").getComponent(cc.Label).string = "豹子"
                    }else {
                        if (hisData.bigSmall == 1) {
                            resData.getChildByName("smallBig").getComponent(cc.Label).string = "小"
                        }else if (hisData.bigSmall == 2) {
                            resData.getChildByName("smallBig").getComponent(cc.Label).string = "大"
                        }
                        if (hisData.sinDouble == 1) {
                            resData.getChildByName("sinDouble").getComponent(cc.Label).string = "单"
                        }else if (hisData.sinDouble == 2) {
                            resData.getChildByName("sinDouble").getComponent(cc.Label).string = "双"
                        }
                    }
                    resData.setPosition(posX,posY-(i*50))
                    content.addChild(resData);
                    this.history_arr.push(resData)
                    num++
                }
            }
        }
    }

    // 筹码点击事件
    chipsButtonClick(eve,num: number) { 
        this.chips1.active = false
        this.chips1up.active = false
        this.chips5.active = false
        this.chips5up.active = false
        this.chips10.active = false
        this.chips10up.active = false
        this.chips50.active = false
        this.chips50up.active = false
        this.chips100.active = false
        this.chips100up.active = false
        this.chips500.active = false
        this.chips500up.active = false
        this.chips1000.active = false
        this.chips1000up.active = false
        console.log("num:", num);
        if (num == 1) { // 1
            this.chips1up.active = true
            this.chips5.active = true
            this.chips10.active = true
            this.chips50.active = true
            this.chips100.active = true
            this.chips500.active = true
            this.chips1000.active = true
        }
        if (num == 2) { // 5
            this.chips5up.active = true
            this.chips1.active = true
            this.chips10.active = true
            this.chips50.active = true
            this.chips100.active = true
            this.chips500.active = true
            this.chips1000.active = true
        }
        if (num == 3) { // 10
            this.chips10up.active = true
            this.chips1.active = true
            this.chips5.active = true
            this.chips50.active = true
            this.chips100.active = true
            this.chips500.active = true
            this.chips1000.active = true
        }
        if (num == 4) { // 50
            this.chips50up.active = true
            this.chips1.active = true
            this.chips5.active = true
            this.chips10.active = true
            this.chips100.active = true
            this.chips500.active = true
            this.chips1000.active = true
        }
        if (num == 5) { // 100
            this.chips100up.active = true
            this.chips1.active = true
            this.chips5.active = true
            this.chips10.active = true
            this.chips50.active = true
            this.chips500.active = true
            this.chips1000.active = true
        }
        if (num == 6) { // 500
            this.chips500up.active = true
            this.chips1.active = true
            this.chips5.active = true
            this.chips10.active = true
            this.chips50.active = true
            this.chips100.active = true
            this.chips1000.active = true
        }
        if (num == 7) { // 1000
            this.chips1000up.active = true
            this.chips1.active = true
            this.chips5.active = true
            this.chips10.active = true
            this.chips50.active = true
            this.chips100.active = true
            this.chips500.active = true
        }
    }

    CloseChipsButton() {
        this.chips1.active = false
        this.chips1up.active = false
        this.chips1Back.active = true
        this.chips5.active = false
        this.chips5up.active = false
        this.chips5Back.active = true
        this.chips10.active = false
        this.chips10up.active = false
        this.chips10Back.active = true
        this.chips50.active = false
        this.chips50up.active = false
        this.chips50Back.active = true
        this.chips100.active = false
        this.chips100up.active = false
        this.chips100Back.active = true
        this.chips500.active = false
        this.chips500up.active = false
        this.chips500Back.active = true
        this.chips1000.active = false
        this.chips1000up.active = false
        this.chips1000Back.active = true
    }

    ShowChipsButton(money) {
        this.chips1.active = false
        this.chips1Back.active = false
        this.chips5.active = false
        this.chips5Back.active = false
        this.chips10.active = false
        this.chips10Back.active = false
        this.chips50.active = false
        this.chips50Back.active = false
        this.chips100.active = false
        this.chips100Back.active = false
        this.chips500.active = false
        this.chips500Back.active = false
        this.chips1000.active = false
        this.chips1000Back.active = false
        if (money >= 1) {
            this.chips1up.active = true
        }else{
            this.chips1Back.active = true
        }
        if (money >= 5) {
            if (this.chips5up.active) {
                this.chips5.active = false
            }else {
                this.chips5.active = true
            }
        }else{
            this.chips5Back.active = true
        }
        if (money >= 10) {
            if (this.chips10up.active) {
                this.chips10.active = false
            }else {
                this.chips10.active = true
            }
        }else{
            this.chips10Back.active = true
        }
        if (money >= 50) {
            if (this.chips50up.active) {
                this.chips50.active = false
            }else {
                this.chips50.active = true
            }
        }else{
            this.chips50Back.active = true
        }
        if (money >= 100) {
            if (this.chips100up.active) {
                this.chips100.active = false
            }else {
                this.chips100.active = true
            }
        }else{
            this.chips100Back.active = true
        }
        if (money >= 500) {
            if (this.chips500up.active) {
                this.chips500.active = false
            }else {
                this.chips500.active = true
            }
        }else{
            this.chips500Back.active = true
        }
        if (money >= 1000) {
            if (this.chips1000up.active) {
                this.chips1000.active = false
            }else {
                this.chips1000.active = true
            }
        }else{
            this.chips1000Back.active = true
        }
    }

    // 注池点击下注
    potDownBetClick(eve,num: number) {
        if (num == 1) { // bigPot
            this.DownBetPots(1)
        }
        if (num == 2) { // smallPot
            this.DownBetPots(2)
        }
        if (num == 3) { // singlePot
            this.DownBetPots(3)
        }
        if (num == 4) { // pairPot
            this.DownBetPots(5)
        }
        if (num == 5) { // straightPot
            this.DownBetPots(6)
        }
        if (num == 6) { // leopardPot
            this.DownBetPots(7)
        }
        if (num == 7) { // doublePot
            this.DownBetPots(4)
        }
    }

    DownBetPots(pot) {
        if (this.chips1up.active) { // 1
            let data : msg.IPlayerAction_C2S = {
                downBet: 1,
                downPot: pot,
                IsAction: true,
            }
            events.dispatch(EventKind.C2S_PlayerAction, data);
        }
        if (this.chips5up.active) { // 5
            let data : msg.IPlayerAction_C2S = {
                downBet: 5,
                downPot: pot,
                IsAction: true,
            }
            events.dispatch(EventKind.C2S_PlayerAction, data);
        }
        if (this.chips10up.active) { // 10
            let data : msg.IPlayerAction_C2S = {
                downBet: 10,
                downPot: pot,
                IsAction: true,
            }
            events.dispatch(EventKind.C2S_PlayerAction, data);
        }
        if (this.chips50up.active) { // 50
            let data : msg.IPlayerAction_C2S = {
                downBet: 50,
                downPot: pot,
                IsAction: true,
            }
            events.dispatch(EventKind.C2S_PlayerAction, data);
        }
        if (this.chips100up.active) { // 100
            let data : msg.IPlayerAction_C2S = {
                downBet: 100,
                downPot: pot,
                IsAction: true,
            }
            events.dispatch(EventKind.C2S_PlayerAction, data);
        }
        if (this.chips500up.active) { // 500
            let data : msg.IPlayerAction_C2S = {
                downBet: 500,
                downPot: pot,
                IsAction: true,
            }
            events.dispatch(EventKind.C2S_PlayerAction, data);
        }
        if (this.chips1000up.active) { // 1000
            let data : msg.IPlayerAction_C2S = {
                downBet: 1000,
                downPot: pot,
                IsAction: true,
            }
            events.dispatch(EventKind.C2S_PlayerAction, data);
        }
    }

    // 表情点击
    biaoqingClick(eve,num: number) {
        // 播放音效
        Sound.PlayAudio(Sound.LoadAudio(0))
        // 按钮点击
        let emoj = cc.find("Canvas/roomScens/emoj_back")
        let chat_on = emoj.getChildByName("chat_on")
        let chat_off = emoj.getChildByName("chat_off")
        let bq_on = emoj.getChildByName("bq_on")
        let bq_off = emoj.getChildByName("bq_off")
        let chat_back = emoj.getChildByName("chat_back")
        let emoj_back = emoj.getChildByName("emoj_back")
        chat_on.active = false
        chat_off.active = false
        bq_on.active = false
        bq_off.active = false
        chat_back.active = false
        emoj_back.active = false
        if (num == 0){
            // 显示表情包
            // Sound.PlayAudio(Sound.LoadAudio(13,"0"))
            emoj.active = true
            emoj.getChildByName("cancelClick").active = true
            chat_on.active = true
            bq_off.active = true
            chat_back.active = true
        }else if (num == 1) {  // 关闭
            console.log("表情包背景点击~")
            // 点击背景关闭表情背景
            emoj.active = false
            emoj.getChildByName("cancelClick").active = false
        }else if (num == 2) {  // 聊天按钮
            chat_on.active = true
            bq_off.active = true
            chat_back.active = true
        }else if (num == 3) {  // 聊天背景按钮
            chat_on.active = true
            bq_off.active = true
            chat_back.active = true
        }else if (num == 4) {  // 表情按钮
            chat_off.active = true
            bq_on.active = true
            emoj_back.active = true
        }else if (num == 5) {  // 表情背景按钮
            chat_off.active = true
            bq_on.active = true
            emoj_back.active = true
        }
    }
    // 聊天点击
    emojChatClick(eve,num: number) {
        if (num >= 1 && num <= 20) {
            if (this.emojTime != 0) {
                // 发言过于频繁 
                let messageTip = cc.find("Canvas/roomScens/promptBox/messageTip")
                messageTip.active = true
                // 定时器3秒关闭提示
                setTimeout(() => {
                 messageTip.active = false
                }, 2000);
                return
            }
            this.emojTime = 5;

            let data: msg.IEmojiChat_C2S = {
                actNum: num,
            }
            events.dispatch(EventKind.C2S_EmojiChat, data);
        }else if (num >= 21 && num <= 24) {
            if (this.AniEmojTime != 0) {
                // 冷却时间 
                let emojiTime = cc.find("Canvas/roomScens/promptBox/emojiTime")
                emojiTime.active = true
                // 定时器3秒关闭提示
                setTimeout(() => {
                    emojiTime.active = false
                }, 2000);
                return
            }
            this.AniEmojTime = 5;

            let data: msg.IEmojiChat_C2S = {
                actNum: num,
                goalId: this.playerInfo.Id,
            }
            events.dispatch(EventKind.C2S_EmojiChat, data);
        }
        let emoj = cc.find("Canvas/roomScens/emoj_back")
        emoj.active = false
        let playerInfo_Back = cc.find("Canvas/roomScens/playerInfo_Back")
        playerInfo_Back.active = false
    }

    // 玩家信息点击
    playerInfoClick(eve, num: number) {
        if (num >= 0) { //todo
            return
        }

        this.playerInfo = null
        this.playerInfo = Storage.RoomData.tablePlayer[num].playerInfo

        let playerInfo_Back = cc.find("Canvas/roomScens/playerInfo_Back")
        playerInfo_Back.active = true
        playerInfo_Back.getChildByName("cancelClick").active = true
        let infoBack_01 = playerInfo_Back.getChildByName("infoBack_01")
        infoBack_01.active = false
        let infoBack_02 = playerInfo_Back.getChildByName("infoBack_02")
        infoBack_02.active = false
        let infoBack_03 = playerInfo_Back.getChildByName("infoBack_03")
        infoBack_03.active = false
        let infoBack_04 = playerInfo_Back.getChildByName("infoBack_04")
        infoBack_04.active = false
        let infoBack_05 = playerInfo_Back.getChildByName("infoBack_05")
        infoBack_05.active = false
        let infoBack_06 = playerInfo_Back.getChildByName("infoBack_06")
        infoBack_06.active = false
        if (num == 0) {
            infoBack_01.active = true
            infoBack_01.getChildByName("name").active = true
            infoBack_01.getChildByName("name").getComponent(cc.Label).string = this.playerInfo.nickName;
            let node = infoBack_01.getChildByName("image")
            node.active = true
            let url = Storage.GetPlayerHead(this.playerInfo.headImg) 
            Storage.loadSpriteAtlas(node, url)
            infoBack_01.getChildByName("money").active = true      
            let showMoney = this.playerInfo.account 
            infoBack_01.getChildByName("money").getComponent(cc.Label).string = Storage.ShowMoney(showMoney)
            let chicken = infoBack_01.getChildByName("chicken").getChildByName("timer").getComponent(cc.ProgressBar)
            let flower = infoBack_01.getChildByName("flower").getChildByName("timer").getComponent(cc.ProgressBar)
            let beer = infoBack_01.getChildByName("beer").getChildByName("timer").getComponent(cc.ProgressBar)
            let tuoxie = infoBack_01.getChildByName("tuoxie").getChildByName("timer").getComponent(cc.ProgressBar)
            chicken.progress = 0
            flower.progress = 0
            beer.progress = 0
            tuoxie.progress = 0
            if (this.AniEmojTime != 0) {
                let emTicker: any = null            
                emTicker = setInterval(() => {
                    let a = 5 - this.AniEmojTime
                    let b = 5 - a 
                    let c = (1 / 5) * b 
                    chicken.progress = c
                    flower.progress = c
                    beer.progress = c
                    tuoxie.progress = c
                }, this.intervalTime);
            }
        }else if (num == 1) {
            infoBack_02.active = true
            infoBack_02.getChildByName("name").active = true
            infoBack_02.getChildByName("name").getComponent(cc.Label).string = this.playerInfo.nickName;
            let node = infoBack_02.getChildByName("image")
            node.active = true
            let url = Storage.GetPlayerHead(this.playerInfo.headImg) 
            Storage.loadSpriteAtlas(node, url)
            infoBack_02.getChildByName("money").active = true      
            let showMoney = this.playerInfo.account  
            infoBack_02.getChildByName("money").getComponent(cc.Label).string = Storage.ShowMoney(showMoney)
            let chicken = infoBack_02.getChildByName("chicken").getChildByName("timer").getComponent(cc.ProgressBar)
            let flower = infoBack_02.getChildByName("flower").getChildByName("timer").getComponent(cc.ProgressBar)
            let beer = infoBack_02.getChildByName("beer").getChildByName("timer").getComponent(cc.ProgressBar)
            let tuoxie = infoBack_02.getChildByName("tuoxie").getChildByName("timer").getComponent(cc.ProgressBar)
            chicken.progress = 0
            flower.progress = 0
            beer.progress = 0
            tuoxie.progress = 0
            if (this.AniEmojTime != 0) {
                let emTicker: any = null            
                emTicker = setInterval(() => {
                    let a = 5 - this.AniEmojTime
                    let b = 5 - a 
                    let c = (1 / 5) * b 
                    chicken.progress = c
                    flower.progress = c
                    beer.progress = c
                    tuoxie.progress = c
                }, this.intervalTime);
            }
        }else if (num == 2) {
           infoBack_03.active = true
           infoBack_03.getChildByName("name").active = true
           infoBack_03.getChildByName("name").getComponent(cc.Label).string = this.playerInfo.nickName;
           let node = infoBack_03.getChildByName("image")
           node.active = true
           let url = Storage.GetPlayerHead(this.playerInfo.headImg) 
           Storage.loadSpriteAtlas(node, url)
           infoBack_03.getChildByName("money").active = true     
           let showMoney = this.playerInfo.account     
           infoBack_03.getChildByName("money").getComponent(cc.Label).string = Storage.ShowMoney(showMoney)
           let chicken = infoBack_03.getChildByName("chicken").getChildByName("timer").getComponent(cc.ProgressBar)
           let flower = infoBack_03.getChildByName("flower").getChildByName("timer").getComponent(cc.ProgressBar)
           let beer = infoBack_03.getChildByName("beer").getChildByName("timer").getComponent(cc.ProgressBar)
           let tuoxie = infoBack_03.getChildByName("tuoxie").getChildByName("timer").getComponent(cc.ProgressBar)
           chicken.progress = 0
           flower.progress = 0
           beer.progress = 0
           tuoxie.progress = 0
           if (this.AniEmojTime != 0) {
                let emTicker: any = null            
                emTicker = setInterval(() => {
                    let a = 5 - this.AniEmojTime
                    let b = 5 - a 
                    let c = (1 / 5) * b 
                    chicken.progress = c
                    flower.progress = c
                    beer.progress = c
                    tuoxie.progress = c
                }, this.intervalTime);
            }
        }else if (num == 3) {
            infoBack_04.active = true
            infoBack_04.getChildByName("name").active = true
            infoBack_04.getChildByName("name").getComponent(cc.Label).string = this.playerInfo.nickName;
            let node = infoBack_04.getChildByName("image")
            node.active = true
            let url = Storage.GetPlayerHead(this.playerInfo.headImg) 
            Storage.loadSpriteAtlas(node, url)
            infoBack_04.getChildByName("money").active = true       
            let showMoney = this.playerInfo.account 
            infoBack_04.getChildByName("money").getComponent(cc.Label).string = Storage.ShowMoney(showMoney)
            let chicken = infoBack_04.getChildByName("chicken").getChildByName("timer").getComponent(cc.ProgressBar)
            let flower = infoBack_04.getChildByName("flower").getChildByName("timer").getComponent(cc.ProgressBar)
            let beer = infoBack_04.getChildByName("beer").getChildByName("timer").getComponent(cc.ProgressBar)
            let tuoxie = infoBack_04.getChildByName("tuoxie").getChildByName("timer").getComponent(cc.ProgressBar)
            chicken.progress = 0
            flower.progress = 0
            beer.progress = 0
            tuoxie.progress = 0
            if (this.AniEmojTime != 0) {
                let emTicker: any = null            
                emTicker = setInterval(() => {
                    let a = 5 - this.AniEmojTime
                    let b = 5 - a 
                    let c = (1 / 5) * b 
                    chicken.progress = c
                    flower.progress = c
                    beer.progress = c
                    tuoxie.progress = c
                }, this.intervalTime);
            }
        }else if (num == 4) {
            infoBack_05.active = true
            infoBack_05.getChildByName("name").active = true
            infoBack_05.getChildByName("name").getComponent(cc.Label).string = this.playerInfo.nickName;
            let node = infoBack_05.getChildByName("image")
            node.active = true
            let url = Storage.GetPlayerHead(this.playerInfo.headImg) 
            Storage.loadSpriteAtlas(node, url)
            infoBack_05.getChildByName("money").active = true       
            let showMoney = this.playerInfo.account 
            infoBack_05.getChildByName("money").getComponent(cc.Label).string = Storage.ShowMoney(showMoney)
            let chicken = infoBack_05.getChildByName("chicken").getChildByName("timer").getComponent(cc.ProgressBar)
            let flower = infoBack_05.getChildByName("flower").getChildByName("timer").getComponent(cc.ProgressBar)
            let beer = infoBack_05.getChildByName("beer").getChildByName("timer").getComponent(cc.ProgressBar)
            let tuoxie = infoBack_05.getChildByName("tuoxie").getChildByName("timer").getComponent(cc.ProgressBar)
            chicken.progress = 0
            flower.progress = 0
            beer.progress = 0
            tuoxie.progress = 0
            if (this.AniEmojTime != 0) {
                let emTicker: any = null            
                emTicker = setInterval(() => {
                    let a = 5 - this.AniEmojTime
                    let b = 5 - a 
                    let c = (1 / 5) * b 
                    chicken.progress = c
                    flower.progress = c
                    beer.progress = c
                    tuoxie.progress = c
                }, this.intervalTime);
            }
        }else if (num == 5) {
            infoBack_06.active = true
            infoBack_06.getChildByName("name").active = true
            infoBack_06.getChildByName("name").getComponent(cc.Label).string = this.playerInfo.nickName;
            let node = infoBack_06.getChildByName("image")
            node.active = true
            let url = Storage.GetPlayerHead(this.playerInfo.headImg) 
            Storage.loadSpriteAtlas(node, url)
            infoBack_06.getChildByName("money").active = true     
            let showMoney = this.playerInfo.account
            infoBack_06.getChildByName("money").getComponent(cc.Label).string = Storage.ShowMoney(showMoney)
            let chicken = infoBack_06.getChildByName("chicken").getChildByName("timer").getComponent(cc.ProgressBar)
            let flower = infoBack_06.getChildByName("flower").getChildByName("timer").getComponent(cc.ProgressBar)
            let beer = infoBack_06.getChildByName("beer").getChildByName("timer").getComponent(cc.ProgressBar)
            let tuoxie = infoBack_06.getChildByName("tuoxie").getChildByName("timer").getComponent(cc.ProgressBar)
            chicken.progress = 0
            flower.progress = 0
            beer.progress = 0
            tuoxie.progress = 0    
            if (this.AniEmojTime != 0) {
                let emTicker: any = null            
                emTicker = setInterval(() => {
                    let a = 5 - this.AniEmojTime
                    let b = 5 - a 
                    let c = (1 / 5) * b 
                    chicken.progress = c
                    flower.progress = c
                    beer.progress = c
                    tuoxie.progress = c
                }, this.intervalTime);
            }
        }
        if (num == 6) { // cancelBack
            console.log("玩家信息背景点击~");
            playerInfo_Back.active = false
            infoBack_01.active = false
            infoBack_02.active = false
            infoBack_03.active = false
            infoBack_04.active = false
            infoBack_06.active = false
            playerInfo_Back.getChildByName("cancelClick").active = false
        }
    }

    // 聊天表情动画
    EmojiChatAction(actPlayer, goalPlayer, actNum) {  // index 玩家座位,start 动画起点
        let start = actPlayer.getChildByName("image").getPosition();
        let end = goalPlayer.getChildByName("image").getPosition();
        let actAnima: any = null
        if (actNum == 21) {
            // actAnima = cc.find("Canvas/roomScens/playerInfo_Back/infoBack_01/chicken/chicken")
            actAnima = goalPlayer.getChildByName("emoj_Anima").getChildByName("jianjiaoji")
        }else if (actNum == 22) {
            // actAnima = cc.find("Canvas/roomScens/playerInfo_Back/infoBack_01/flower/flower")
            actAnima = goalPlayer.getChildByName("emoj_Anima").getChildByName("meiguihua")
        }else if (actNum == 23) {
            actAnima = cc.find("Canvas/roomScens/playerInfo_Back/infoBack_01/beer/pijiubei")
            // actAnima = this.tableHead[goalSeat].getChildByName("emoj_Anima").getChildByName("pijiubei")
        }else if (actNum == 24) {
            // actAnima = cc.find("Canvas/roomScens/playerInfo_Back/infoBack_01/tuoxie/tuoxie")
            actAnima = goalPlayer.getChildByName("emoj_Anima").getChildByName("tuoxie2")
        }
        this.timerChip = this.scheduleOnce(() => {
            // 起点
            let pos1 = goalPlayer.convertToWorldSpaceAR(start);
            let pos2 = this.node.convertToNodeSpaceAR(pos1);

            // 终点
            let end1 = goalPlayer.convertToWorldSpaceAR(end);
            let end2 = this.node.convertToNodeSpaceAR(end1);

            // 克隆筹码
            let card = cc.instantiate(actAnima);
            card.active = true;
            card.setPosition(pos2);
            this.node.addChild(card);
            if (actNum == 24) {
                card.runAction(
                    cc.spawn(
                        cc.rotateTo(0.5,-1080),
                        cc.moveTo(0.4, cc.v2(end2.x, end2.y)),  // 筹码移动时间
                    ),
                )
                setTimeout(() => {
                    card.runAction(
                        cc.rotateTo(0.2,-1080),
                    )
                }, 400); 
                setTimeout(() => {
                    card.destroy()
                }, 1000);  
            }else {
                card.runAction(
                    cc.sequence(
                        cc.moveTo(0.4, cc.v2(end2.x, end2.y)),  // 筹码移动时间
                        cc.callFunc(() => {
                            card.destroy();
                        })
                    )
                )
            }
        }, 0.5)
    }

    // 结算数字动画
    ResultNumAction(actSeat, goalSeat, numBox) {  // index 玩家座位,start 动画起点
        this.timerChip = this.scheduleOnce(() => {
            // 起点
            let pos = actSeat.getPosition();
            let pos2 = actSeat.convertToWorldSpaceAR(pos);
            let startPos = this.node.convertToNodeSpaceAR(pos2);

            // 终点
            let end = goalSeat.getPosition();
            let end1 = goalSeat.convertToWorldSpaceAR(end);
            let end2 = this.node.convertToNodeSpaceAR(end1);

            // 克隆筹码
            let chip = cc.instantiate(numBox);
            chip.active = true;
            chip.setPosition(startPos);
            this.node.addChild(chip);

            chip.runAction(
                cc.sequence(
                    cc.scaleTo(0.2,0.5),
                    cc.moveTo(0.2, cc.v2(end2.x, end2.y)),  // 筹码移动时间
                    cc.callFunc(() => {
                        chip.destroy();
                    })
                )
            )
        },0)
    }

    // 桌面筹码到庄家
    TableChipsToBanker() {
        let potData = Storage.RoomData.potWinList[Storage.RoomData.potWinList.length - 1]
        if (potData.bigSmall == 1) { // 小
            if (this.num_arrPot1.length > 0) {
                for (let i = 0; i < this.num_arrPot1.length; i++) {
                    this.BankerChipsAction(this.num_arrPot1[i])
                }
            }
        }else if (potData.bigSmall == 2) { // 大 
            if (this.num_arrPot2.length > 0) {
                for (let i = 0; i < this.num_arrPot2.length; i++) {
                    this.BankerChipsAction(this.num_arrPot2[i])
                }
            }
        }
        if (potData.sinDouble == 1) { // 单
            if (this.num_arrPot4.length > 0) {
                for (let i = 0; i < this.num_arrPot4.length; i++) {
                    this.BankerChipsAction(this.num_arrPot4[i])
                }
            }
        }else if (potData.sinDouble == 2) { // 双
            if (this.num_arrPot3.length > 0) {
                for (let i = 0; i < this.num_arrPot3.length; i++) {
                    this.BankerChipsAction(this.num_arrPot3[i])
                }
            }
        }
        if (potData.cardType == msg.CardsType.XX_Card) {
            if (this.num_arrPot5.length > 0) {
                for (let i = 0; i < this.num_arrPot5.length; i++) {
                    this.BankerChipsAction(this.num_arrPot5[i])
                }
            }
            if (this.num_arrPot6.length > 0) {
                for (let i = 0; i < this.num_arrPot6.length; i++) {
                    this.BankerChipsAction(this.num_arrPot6[i])
                }
            }
            if (this.num_arrPot7.length > 0) {
                for (let i = 0; i < this.num_arrPot7.length; i++) {
                    this.BankerChipsAction(this.num_arrPot7[i])
                }
            }
        }
        if (potData.cardType == msg.CardsType.Pair) {
            if (this.num_arrPot6.length > 0) {
                for (let i = 0; i < this.num_arrPot6.length; i++) {
                    this.BankerChipsAction(this.num_arrPot6[i])
                }
            }
            if (this.num_arrPot7.length > 0) {
                for (let i = 0; i < this.num_arrPot7.length; i++) {
                    this.BankerChipsAction(this.num_arrPot7[i])
                }
            }
        }else if (potData.cardType == msg.CardsType.Straight) { 
            if (this.num_arrPot5.length > 0) {
                for (let i = 0; i < this.num_arrPot5.length; i++) {
                    this.BankerChipsAction(this.num_arrPot5[i])
                }
            }
            if (this.num_arrPot7.length > 0) {
                for (let i = 0; i < this.num_arrPot7.length; i++) {
                    this.BankerChipsAction(this.num_arrPot7[i])
                }
            }
        }else if (potData.cardType == msg.CardsType.Leopard) { 
            if (this.num_arrPot5.length > 0) {
                for (let i = 0; i < this.num_arrPot5.length; i++) {
                    this.BankerChipsAction(this.num_arrPot5[i])
                }
            }
            if (this.num_arrPot6.length > 0) {
                for (let i = 0; i < this.num_arrPot6.length; i++) {
                    this.BankerChipsAction(this.num_arrPot6[i])
                }
            }
        }
    }

    // 桌面筹码到庄家动画
    BankerChipsAction(chips) {
        let goldBox = this.bankerInfo.getChildByName("goldBox")
        let end1 = goldBox.getPosition()

        this.timerChip = this.scheduleOnce(() => {

            let end2 = goldBox.parent.convertToWorldSpaceAR(end1);
            let endPos = this.node.convertToNodeSpaceAR(end2);

            chips.runAction(
                cc.sequence(
                    cc.moveTo(0.3, cc.v2(endPos.x, endPos.y)),  // 筹码移动时间
                    cc.callFunc(() => {
                       chips.destroy();
                    })
                )
            )
        },0)
    }

    // 庄家筹码到桌面
    BankerChipsToTable() {
        let actChips = cc.find("Canvas/roomScens/cdx_table/actChips")
        let chip = actChips.getChildByName("chips1")

        let potData = Storage.RoomData.potWinList[Storage.RoomData.potWinList.length - 1]
        if (potData.bigSmall == 1) { // 大
            for (let i = 0; i < 2; i++) {
                this.BankerToPotAction(2, chip, 1)
                this.BankerToPotAction(2, chip, 2)
                this.BankerToPotAction(2, chip, 3)
                this.BankerToPotAction(2, chip, 4)
                this.BankerToPotAction(2, chip, 5)
                this.BankerToPotAction(2, chip, 6)
                this.BankerToPotAction(2, chip, 7)
            }
        }else if (potData.bigSmall == 2) { // 小
            for (let i = 0; i < 2; i++) {
                this.BankerToPotAction(1, chip, 1)
                this.BankerToPotAction(1, chip, 2)
                this.BankerToPotAction(1, chip, 3)
                this.BankerToPotAction(1, chip, 4)
                this.BankerToPotAction(1, chip, 5)
                this.BankerToPotAction(1, chip, 6)
                this.BankerToPotAction(1, chip, 7)
            }
        }
        if (potData.sinDouble == 1) { // 单
            for (let i = 0; i < 2; i++) {
                this.BankerToPotAction(3, chip, 1)
                this.BankerToPotAction(3, chip, 2)
                this.BankerToPotAction(3, chip, 3)
                this.BankerToPotAction(3, chip, 4)
                this.BankerToPotAction(3, chip, 5)
                this.BankerToPotAction(3, chip, 6)
                this.BankerToPotAction(3, chip, 7)
            }
        }else if (potData.sinDouble == 2) { // 双
            for (let i = 0; i < 2; i++) {
                this.BankerToPotAction(4, chip, 1)
                this.BankerToPotAction(4, chip, 2)
                this.BankerToPotAction(4, chip, 3)
                this.BankerToPotAction(4, chip, 4)
                this.BankerToPotAction(4, chip, 5)
                this.BankerToPotAction(4, chip, 6)
                this.BankerToPotAction(4, chip, 7)
            }
        }
        if (potData.cardType == msg.CardsType.Pair) {
            for (let i = 0; i < 2; i++) {
                this.BankerToPotAction(5, chip, 1)
                this.BankerToPotAction(5, chip, 2)
                this.BankerToPotAction(5, chip, 3)
                this.BankerToPotAction(5, chip, 4)
                this.BankerToPotAction(5, chip, 5)
                this.BankerToPotAction(5, chip, 6)
                this.BankerToPotAction(5, chip, 7)
            }
        }else if (potData.cardType == msg.CardsType.Straight) { 
            for (let i = 0; i < 2; i++) {
                this.BankerToPotAction(6, chip, 1)
                this.BankerToPotAction(6, chip, 2)
                this.BankerToPotAction(6, chip, 3)
                this.BankerToPotAction(6, chip, 4)
                this.BankerToPotAction(6, chip, 5)
                this.BankerToPotAction(6, chip, 6)
                this.BankerToPotAction(6, chip, 7)
            }
        }else if (potData.cardType == msg.CardsType.Leopard) { 
            for (let i = 0; i < 2; i++) {
                this.BankerToPotAction(7, chip, 1)
                this.BankerToPotAction(7, chip, 2)
                this.BankerToPotAction(7, chip, 3)
                this.BankerToPotAction(7, chip, 4)
                this.BankerToPotAction(7, chip, 5)
                this.BankerToPotAction(7, chip, 6)
                this.BankerToPotAction(7, chip, 7)
            }
        }
    }

    // 庄家筹码到桌面动画
    BankerToPotAction(downPot, chipsNode ,arrNum) {
        // 起点
        let goldBox = this.bankerInfo.getChildByName("goldBox")
        let start = goldBox.getPosition()

        // 终点
        let typePots = cc.find("Canvas/roomScens/cdx_table/typePots")
        let bigPot = typePots.getChildByName("bigPot")
        let smallPot = typePots.getChildByName("smallPot")
        let singlePot = typePots.getChildByName("singlePot")
        let pairPot = typePots.getChildByName("pairPot")
        let straightPot = typePots.getChildByName("straightPot")
        let leopardPot = typePots.getChildByName("leopardPot")
        let doublePot = typePots.getChildByName("doublePot")
        let goalSeat = null
        if (downPot == 1) {
            goalSeat = bigPot
        }else if (downPot == 2) {
            goalSeat = smallPot
        }else if (downPot == 3) {
            goalSeat = singlePot
        }else if (downPot == 4) {
            goalSeat = doublePot
        }else if (downPot == 5) {
            goalSeat = pairPot
        }else if (downPot == 6) {
            goalSeat = straightPot
        }else if (downPot == 7) {
            goalSeat = leopardPot
        }
        let end1 = goalSeat.getPosition()

        this.timerChip = this.scheduleOnce(() => {
            let pos1 = goldBox.convertToWorldSpaceAR(start);
            let pos2 = this.node.convertToNodeSpaceAR(pos1);

            let end2 = goalSeat.parent.convertToWorldSpaceAR(end1);
            let endPos = this.node.convertToNodeSpaceAR(end2);

            // 克隆筹码
            let chip = cc.instantiate(chipsNode);
            chip.active = true;
            chip.setPosition(pos2);
            let actChips = cc.find("Canvas/roomScens/cdx_table/actChips")
            actChips.addChild(chip);
            // this.node.addChild(chip);

            if (arrNum == 1) {
                this.banker1_arrPot.push(chip)
            }else if (arrNum == 2) {
                this.banker2_arrPot.push(chip)
            }else if (arrNum == 3) {
                this.banker3_arrPot.push(chip)
            }else if (arrNum == 4) {
                this.banker4_arrPot.push(chip)
            }else if (arrNum == 5) {
                this.banker5_arrPot.push(chip)
            }else if (arrNum == 6) {
                this.banker6_arrPot.push(chip)
            }else if (arrNum == 7) {
                this.banker7_arrPot.push(chip)
            }
            
            let a: number = 0;
            let b: number = 0;
            //随机范围
            if (downPot >= 1 && downPot <= 2) {
                a = 120
                b = 20
            }else if (downPot >= 3 && downPot <= 4) {
                a = 120
                b = 30
            }else if (downPot >= 5 && downPot <= 6) {
                a = 50
                b = 2
            }else if (downPot == 7) {
                a = 150
                b = 2
            }
            let x: number = Storage.random(-a, a);
            let y: number = Storage.random(-b, b);
            endPos.x += x;
            endPos.y += y;

            chip.runAction(
                cc.sequence(
                    cc.moveTo(0.3, cc.v2(endPos.x, endPos.y)),  // 筹码移动时间
                    cc.jumpBy(0.2, 4, 0, 2, 2),
                    cc.callFunc(() => {
                        // chip.destroy();
                    })
                )
            )
        },0)
    }

    // 桌面筹码到玩家
    PotChipsToPlayer() {
        let userList = cc.find("Canvas/roomScens/cdx_infoBox/userList")
        if (this.banker7_arrPot.length > 0) {
            for (let i = 0; i < this.banker7_arrPot.length; i++) {
                this.PotToUserListAction(this.banker7_arrPot[i],userList)
            }
        }
        let player1 = Storage.RoomData.tablePlayer[0]
        if (player1.resultMoney > 0) {
            if (this.banker1_arrPot.length > 0) {
                for (let i = 0; i < this.banker1_arrPot.length; i++) {
                    let playerGod1 = cc.find("Canvas/roomScens/cdx_infoBox/player1")
                    this.PotToPlayerAction(this.banker1_arrPot[i],playerGod1)
                }
            }
        }
        let player2 = Storage.RoomData.tablePlayer[1]
        if (player2.resultMoney > 0) {
            if (this.banker2_arrPot.length > 0) {
                for (let i = 0; i < this.banker2_arrPot.length; i++) {
                    let playerGod2 = cc.find("Canvas/roomScens/cdx_infoBox/player2")
                    this.PotToPlayerAction(this.banker2_arrPot[i],playerGod2)
                }
            }
        }
        let player3 = Storage.RoomData.tablePlayer[2]
        if (player3.resultMoney > 0) {
            if (this.banker3_arrPot.length > 0) {
                for (let i = 0; i < this.banker3_arrPot.length; i++) {
                    let playerGod3 = cc.find("Canvas/roomScens/cdx_infoBox/player3")
                    this.PotToPlayerAction(this.banker3_arrPot[i],playerGod3)
                }
            }
        }
        let player4 = Storage.RoomData.tablePlayer[3]
        if (player4.resultMoney > 0) {
            if (this.banker4_arrPot.length > 0) {
                for (let i = 0; i < this.banker4_arrPot.length; i++) {
                    let playerGod4 = cc.find("Canvas/roomScens/cdx_infoBox/player4")
                    this.PotToPlayerAction(this.banker4_arrPot[i],playerGod4)
                }
            }
        }
        let player5 = Storage.RoomData.tablePlayer[4]
        if (player5.resultMoney > 0) {
            if (this.banker5_arrPot.length > 0) {
                for (let i = 0; i < this.banker5_arrPot.length; i++) {
                    let playerGod5 = cc.find("Canvas/roomScens/cdx_infoBox/player5")
                    this.PotToPlayerAction(this.banker5_arrPot[i],playerGod5)
                }
            }
        }
        let player6 = Storage.RoomData.tablePlayer[5]
        if (player6.resultMoney > 0) {
            if (this.banker6_arrPot.length > 0) {
                for (let i = 0; i < this.banker6_arrPot.length; i++) {
                    let playerGod6 = cc.find("Canvas/roomScens/cdx_infoBox/player6")
                    this.PotToPlayerAction(this.banker6_arrPot[i],playerGod6)
                }
            }
        }
    }

    // 桌面筹码到玩家动画
    PotToPlayerAction(chips, player) {
        let goldBox = player.getChildByName("goldBox")
        let end1 = goldBox.getPosition()

        this.timerChip = this.scheduleOnce(() => {

            let end2 = goldBox.parent.convertToWorldSpaceAR(end1);
            let endPos = this.node.convertToNodeSpaceAR(end2);

            chips.runAction(
                cc.sequence(
                    cc.moveTo(0.3, cc.v2(endPos.x, endPos.y)),  // 筹码移动时间
                    cc.callFunc(() => {
                       chips.destroy();
                    })
                )
            )
        },0)
    }

    // 注池到玩家列表动画
    PotToUserListAction(chips, userList) {
        let goldBox = userList.getChildByName("goldBox")
        let end1 = goldBox.getPosition()

        this.timerChip = this.scheduleOnce(() => {

            let end2 = goldBox.parent.convertToWorldSpaceAR(end1);
            let endPos = this.node.convertToNodeSpaceAR(end2);

            chips.runAction(
                cc.sequence(
                    cc.moveTo(0.3, cc.v2(endPos.x, endPos.y)),  // 筹码移动时间
                    cc.callFunc(() => {
                       chips.destroy();
                    })
                )
            )
        },0)
    }

    // 玩家下注动画
    SendChipsAction(player, downPot, chipsNode) { 
        // 起点
        let start = player.getChildByName("goldBox").getPosition()
        // 终点
        let typePots = cc.find("Canvas/roomScens/cdx_table/typePots")
        let bigPot = typePots.getChildByName("bigPot")
        let smallPot = typePots.getChildByName("smallPot")
        let singlePot = typePots.getChildByName("singlePot")
        let pairPot = typePots.getChildByName("pairPot")
        let straightPot = typePots.getChildByName("straightPot")
        let leopardPot = typePots.getChildByName("leopardPot")
        let doublePot = typePots.getChildByName("doublePot")
        let goalSeat = null
        if (downPot == 1) {
            goalSeat = bigPot
        }else if (downPot == 2) {
            goalSeat = smallPot
        }else if (downPot == 3) {
            goalSeat = singlePot
        }else if (downPot == 4) {
            goalSeat = doublePot
        }else if (downPot == 5) {
            goalSeat = pairPot
        }else if (downPot == 6) {
            goalSeat = straightPot
        }else if (downPot == 7) {
            goalSeat = leopardPot
        }
        let end1 = goalSeat.getPosition()

        this.timerChip = this.scheduleOnce(() => {
            let pos1 = player.convertToWorldSpaceAR(start);
            let pos2 = this.node.convertToNodeSpaceAR(pos1);

            let end2 = goalSeat.parent.convertToWorldSpaceAR(end1);
            let endPos = this.node.convertToNodeSpaceAR(end2);

            // 克隆筹码
            let chip = cc.instantiate(chipsNode);
            chip.active = true;
            chip.setPosition(pos2);
            let actChips = cc.find("Canvas/roomScens/cdx_table/actChips")
            actChips.addChild(chip);
            // this.node.addChild(chip);
            
            //将筹码存在固定的数组
            if (downPot == 1) {
                this.num_arrPot1.push(chip);
            }else if (downPot == 2) {
                this.num_arrPot2.push(chip);
            }else if (downPot == 3) {
                this.num_arrPot3.push(chip);
            }else if (downPot == 4) {
                this.num_arrPot4.push(chip);
            }else if (downPot == 5) {
                this.num_arrPot5.push(chip);
            }else if (downPot == 6) {
                this.num_arrPot6.push(chip);
            }else if (downPot = 7) {
                this.num_arrPot7.push(chip);
            }

            let a: number = 0;
            let b: number = 0;
            //随机范围
            if (downPot >= 1 && downPot <= 2) {
                a = 120
                b = 20
            }else if (downPot >= 3 && downPot <= 4) {
                a = 120
                b = 30
            }else if (downPot >= 5 && downPot <= 6) {
                a = 50
                b = 2
            }else if (downPot == 7) {
                a = 150
                b = 2
            }
            let x: number = Storage.random(-a, a);
            let y: number = Storage.random(-b, b);
            endPos.x += x;
            endPos.y += y;

            chip.runAction(
                cc.sequence(
                    cc.moveTo(0.4, cc.v2(endPos.x, endPos.y)),  // 筹码移动时间
                    cc.jumpBy(0.2, 4, 0, 2, 2),
                    cc.callFunc(() => {
                        // chip.destroy();
                    })
                )
            )
        },0)
    }
    
    // 玩家头像框移动
    PlayerBoxAction(player, num) {
        //公用移动方法
        let pos = player.position;
        let moveDelay = cc.delayTime(0);
        let moveSeat: any;
        let moveBack: any;
        let moveCall = cc.callFunc(() => {
            player.setPosition(pos);
         
        })

        let moveAct: any;
        if (this.moveGetSeat(num) == 0) { // 右移
            moveSeat = cc.moveBy(0.05, -3, 0);
            moveBack = cc.moveBy(0.1, 3, 0);
            moveAct = cc.sequence(moveDelay, moveSeat, moveBack, moveCall);
            player.runAction(moveAct);
        } else { // 左移
            moveSeat = cc.moveBy(0.05, -3, 0);
            moveBack = cc.moveBy(0.1, 3, 0);
            moveAct = cc.sequence(moveDelay, moveSeat, moveBack, moveCall);
            player.runAction(moveAct);
        }
    }

    //判断左移动，右移动
    moveGetSeat(num: number) {
        if (num == 1 || num == 3 || num == 5) {
            return 0;
        } else {
            return 1;
        }
    }

    // 玩家赢钱金币飘动
    WinMoneyShow(player: msg.IPlayerData, playerNode) { 
        // start 动画起点, end 动画终点
        let start = playerNode.getChildByName("money").getPosition();
        let end = playerNode.getChildByName("name").getPosition();
        let showMoney = null
        if (player.resultMoney > 0) {
            console.log("金币浮动进来·····················");
            showMoney = playerNode.getChildByName("winMoney")
            if (player.IsBanker == false) {
                playerNode.getChildByName("winAni").active = true
                playerNode.getChildByName("winAni").getComponent(sp.Skeleton).setAnimation(1, "tou_eff_shiny", true) 
            }
        }else {
            showMoney = playerNode.getChildByName("loseMoney")
        }
        showMoney.active = true
        showMoney.getComponent(cc.Label).string = Storage.ShowMoney(player.resultMoney)

        this.timerChip = this.scheduleOnce(() => {
           // 起点
           let pos1 = playerNode.convertToWorldSpaceAR(start);
           let pos2 = this.node.convertToNodeSpaceAR(pos1);

           // 终点
           let end1 = playerNode.convertToWorldSpaceAR(end);
           let end2 = this.node.convertToNodeSpaceAR(end1);

           // 克隆显示金币
           let moneyAct = cc.instantiate(showMoney);
           moneyAct.active = true;
           moneyAct.setPosition(pos2);
           this.node.addChild(moneyAct);

            moneyAct.runAction(
                cc.sequence(
                    cc.moveTo(1.8, cc.v2(end2.x, end2.y)),  // 金币移动时间
                    cc.callFunc(() => {
                        moneyAct.destroy();
                    })
                )
            )
        }, 0.5)
    }

    onDestroy() {
        console.log("gameSences 场景销毁！！！")
        // 清除定时器
        this.timer = null;
        this.intervalTime = null;
        clearInterval(this.ticker);
        this.ticker = null;

        this.unschedule(this.timerChip);
        // 取消监听事件
        this.cancelEvents()
    }

    cancelEvents() {
        console.log("dzpk_Game 取消监听事件~")
        events.unregister(EventKind.S2C_JoinRoom, "cdx_Room");
        events.unregister(EventKind.S2C_LeaveRoom, "cdx_Room");
        events.unregister(EventKind.S2C_ActionTime, "cdx_Room");
        events.unregister(EventKind.S2C_PlayerAction, "cdx_Room");
        events.unregister(EventKind.S2C_PotChangeMoney, "cdx_Room");
        events.unregister(EventKind.S2C_UptPlayerList, "cdx_Room");
        events.unregister(EventKind.S2C_ResultData, "cdx_Room");
        events.unregister(EventKind.S2C_BankerData, "cdx_Room");
        events.unregister(EventKind.S2C_EmojiChat, "cdx_Room");
        events.unregister(EventKind.S2C_SendActTime, "cdx_Room");
    }
}
