
import ACM from "./AC/ACCYLHDMain";
// import SceneMgr from "./LHDSceneMgr";
import * as Conf from "./CYLHDStateConfig";
import StateTools from "./CYLHDStateTools";
import State from "./CYLHDState";
import * as Com from "./CYLHDStateCommon";
import AssistFunc from './CYLHDAssistFunc';
import { msg } from "./proto/CYLHDproto_msg";
import { GameUtil } from "./CYLHDGameUtils";
import { cylhd_language } from '../language/cylhd_language';

const {ccclass, property} = cc._decorator;

@ccclass
export default class CYLHDSceneLobby extends cc.Component {

    // @property(cc.Prefab)
    // roomitem: cc.Prefab = null;//房间预制体
    // @property(cc.ScrollView)
    // scrollListRooms: cc.ScrollView = null;//滑动
    @property(cc.Button)
    btnBack: cc.Button = null;
    @property(cc.Label)
    lbNick: cc.Label = null;
    @property(cc.Button)
    btnEdit: cc.Button = null;
    @property(cc.Label)
    lbBalance: cc.Label = null;
    @property(cc.Node)
    btnRecharge:cc.Node = null;
    @property(cc.Node)
    iconNetwork:cc.Node = null;
	@property(cc.Node)
	rooms: cc.Node[] = [];// 房间数组
    @property(cc.Node)
    boardHelp:cc.Node = null;
    @property(cc.Node)
    head:cc.Node = null;
    @property(cc.Node)
    hallnoticeboard:any = null;

    // private tickProgressRooms: ACTick;
    private roomNumAlready:string;// 申请进入其它房间前未结算的某个房间

    enterScene() {
        if(!cc.isValid(this.node))return;
        this.setNick()
        this.setHead()
        this.updateBalance()
        this.registerEvts()
        this.initRooms(State.roomListInfo)
        this.node.active = true
        ACM.getEvtMgrIns.dispatch(Conf.EventKind.PLAY_AUDIO, {type:Com.EAudioType.BG_LOBBY,loop:true})
        let temphallNoticeBoard = this.hallnoticeboard.getChildByName("sp_trumpet_bg").getComponent("hallNoticeBoard");
        hqq.eventMgr.register(hqq.eventMgr.addSliderNotice, "hallNoticeBoard", temphallNoticeBoard.addSliderNotice.bind(temphallNoticeBoard));

        if(hqq.gameGlobal.zhibo)
        {
            if(hqq.gameGlobal.zhibo.GameCode=="cylhd")
            {
                this.sendJoinRoom(hqq.gameGlobal.zhibo.RoomCode)
            }
        }
        console.log("版本號 1.0.0")
    }
    exitScene() {
        this.node.active = false;
        this.hideTipInOtherRoom();
        this.unRegisterEvts();
        this.stopAnimationOfRooms();
        
        hqq.eventMgr.unregister(hqq.eventMgr.addSliderNotice, "hallNoticeBoard");
    }

    onLoad () {
        if(hqq && hqq.isOtherGame) {// 非大厅游戏
            this.btnRecharge.active = this.btnBack.node.active = this.btnEdit.node.active = false
        }

        if(hqq.eventMgr.showNetStateNode) {
            hqq.eventMgr.dispatch(hqq.eventMgr.showNetStateNode, { 
                parent: this.iconNetwork,
                position: { x: 0, y: 0 } 
            })
        }
    }

    start () {
        // this.resize();
    }

    onEnable() {
    }

    onDisable() {
    }

    // update (dt) {
    // }

    onLogined() {

    }

	onSocketClosed() {
        
    }

    private initRooms(list) {
        if(!cc.isValid(this.node))return;
		list = list.sort((a,b)=>{
			return parseInt(a.roomNumber) - parseInt(b.roomNumber)
        })
        
		for(let i=0; i<list.length; i++) {
            let isOpen = list[i].open==1
                , roomNode = this.rooms[i]
            if(!roomNode) break

            roomNode.getChildByName("opened").active = isOpen
            roomNode.getChildByName("closed").active = !isOpen
            GameUtil.loadSpine( roomNode , "language/" + cylhd_language.getCurLanguage() + "/lhd_roomlist/lhd_roomlist" , null , "lhd_room"+(i+1) , true );
            // roomNode.getComponent(sp.Skeleton).setAnimation(0, "lhd_room"+(i+1), true)
        }
        
        // 多余的隐藏掉
        if(this.rooms.length<=list.length) {
            return
        }
        for(let j=list.length; j<this.rooms.length; j++) {
            let r = this.rooms[j]
            r.getChildByName("opened").active = false
            r.getChildByName("closed").active = true
            r.getComponent(sp.Skeleton).setAnimation(0, "lhd_room"+(j+1), true)
        }
    }

    private stopAnimationOfRooms() {
        if(!cc.isValid(this.node))return;
        this.rooms.forEach(v=>{
            if(cc.isValid(v)){
                v.getComponent(sp.Skeleton).clearTracks()
            }
        })
    }

    tapEdit() {
		ACM.callHallPerson();
        ACM.getEvtMgrIns.dispatch(Conf.EventKind.PLAY_AUDIO, {type:Com.EAudioType.CLICK});
    }

    tapIconHelp() {
        this.showBoardHelp(true)
    }

    tapCloseHelp() {
        this.showBoardHelp(false)
    }

    tapRecharge() {
        ACM.getEvtMgrIns.dispatch(Conf.EventKind.PLAY_AUDIO, { type: Com.EAudioType.CLICK });
        ACM.getEvtMgrIns.dispatch(Conf.EventKind.TO_PAY_SCENE);
    }

    tapBack() {
        ACM.getEvtMgrIns.dispatch(Conf.EventKind.PLAY_AUDIO, { type: Com.EAudioType.CLICK });
        ACM.getEvtMgrIns.dispatch(Conf.EventKind.BACK_HALL);
    }

    tapRoom(evt, data) {
        ACM.getEvtMgrIns.dispatch(Conf.EventKind.PLAY_AUDIO, {type:Com.EAudioType.CLICK});
        if(!this.isRoomOpen(""+data)) {
			hqq.eventMgr.dispatch(hqq.eventMgr.showTip, "敬请期待！")
            return
        }
        this.sendJoinRoom("" + data);
    }

    tapBackInLoadPage() {// 在未收到进房消息返回前按了返回键

    }

    onRoomListLobbyPush() {
        this.initRooms(State.roomListInfo)
    }
    // 点击进入房间按钮事件
    sendJoinRoom(roomNum:string) {
        if(!State.clientIntInfo.logined)return;//没登入成功不能发进入房间请求
		const bd = this.node.getChildByName('EnterRoomAlert')
        if(bd.active)	return
        
        // cc.log('join:', roomNum);
        let l = cc.find('Canvas/load');
        if(l.active)    return;

        l.active = true;
        ACM.getSocketInst.sendMessage(Conf.MsgKind.JoinRoom, {
            roomNumber: roomNum
        });
    }
    private onJoinRoomR(dataR:msg.JoinRoomResponse) {
        let l = cc.find('Canvas/load');
		if(!l.active && dataR.code==0){// 中途取消了进房，如果成功进房的话需要发送退房申请
			cc.warn("中途取消了进房，如果成功进房的话需要发送退房申请");
			ACM.getSocketInst.sendMessage(Conf.MsgKind.ExitRoom, {});
			return;
		}

        l.active = false;
		if(dataR.code!=0) {// TODO 进房失败处理 - 如在其它房间···
			if(dataR.code==Conf.ErrCode.IN_OTHER_ROOM) {
                this.roomNumAlready = dataR.roomNumber;
                this.showTipInOtherRoom(dataR.roomNumber);
			}
		} else
            if( dataR.timeInterval )
            {
                if(dataR.timeInterval.length>2)
                {
                    Conf.GamePlayWay.BLOCK_BETTING_TIME = dataR.timeInterval[0];
                    Conf.GamePlayWay.ACCOUNTING_TIME = dataR.timeInterval[0]+dataR.timeInterval[1];
                    Conf.GamePlayWay.BEFOREBLOCKTIME = dataR.timeInterval[2];
                }
            }
			ACM.getEvtMgrIns.dispatch(Conf.EventKind.CHANGE_SCENE, Com.SceneIndex.GAME);

    }
    private setHead() {
		AssistFunc.setHeadIcon(Conf.AppConfig.HeadUrl, this.head, 82, 82);
    }
    private setNick() {
        this.lbNick.string = State.myComInfo.userName;
    }
    private updateBalance() {
        this.lbBalance.string = StateTools.balanceShow(State.balanceAvailable());
    }

    private showTipInOtherRoom(roomNum:string) {
        if(!cc.isValid(this.node))return;
        const bd = this.node.getChildByName('EnterRoomAlert'),
            lb = bd.getChildByName('Label');
        lb.getComponent(cc.Label).string = '您正在河内分分彩-龙虎斗'+roomNum+'房间游戏中，点确定继续游戏';
        bd.active = true;
    }
    private hideTipInOtherRoom() {
        this.node.getChildByName('EnterRoomAlert').active = false;
    }

    private showBoardHelp(s:boolean) {
        this.boardHelp.active = s
    }
    
    touchBtnSureEnterRoom() {
        ACM.getEvtMgrIns.dispatch(Conf.EventKind.PLAY_AUDIO, {type:Com.EAudioType.BACK_BTN});
        const bd = this.node.getChildByName('EnterRoomAlert');
        bd.active = false;

        this.sendJoinRoom(this.roomNumAlready);
    }

    private isRoomOpen(roomNum:string) {
        let o = false
        State.roomListInfo.forEach(v=>{
            if(v.roomNumber==roomNum)   o = v.open==1
        })
        return o
    }

	private registerEvts() {        
        // this.node.on('size-changed', this.resize, this)
		ACM.getSocketInst.registerEvtModel(Conf.MsgKind.RoomListLobbyP, this.onRoomListLobbyPush.bind(this));// 断线重连时会被推送
		ACM.getSocketInst.registerEvtModel(Conf.MsgKind.JoinRoomR, this.onJoinRoomR.bind(this));
        ACM.getSocketInst.registerEvtModel(Conf.MsgKind.UpdateBalanceP, this.updateBalance.bind(this));
		ACM.getEvtMgrIns.register(Conf.EventKind.UPDATE_BALANCE_AVAILABLE, "CYLHDLobby", this.updateBalance.bind(this));
    }
    
	private unRegisterEvts() {
        // this.tickProgressRooms.stop();
        // this.node.off('size-changed', this.resize, this)
        
		ACM.getEvtMgrIns.dispatch(Conf.EventKind.STOP_ALL_LOOP_AUDIO);
		// scrollListRooms.content.removeChildren();
		ACM.getSocketInst.unregisterEvtModel(Conf.MsgKind.RoomListLobbyP);// 断线重连时会被推送
		ACM.getSocketInst.unregisterEvtModel(Conf.MsgKind.JoinRoomR);
		ACM.getSocketInst.unregisterEvtModel(Conf.MsgKind.UpdateBalanceP);
		ACM.getEvtMgrIns.unregisterInComp("CYLHDLobby");
		cc.log("onDestroy-SceneLobby")
	}

    onDestroy() {
        // this.exitScene();
    }

}
