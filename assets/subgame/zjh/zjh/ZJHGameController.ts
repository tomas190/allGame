import connection = require ("./ZJHnet/ZJHConnection")
import Notification = require ("./ZJHnet/ZJHNotification")
import Event = require("./ZJHnet/ZJHEventCustom")
import msgSender from "./ZJHnet/ZJHmsgSender"
import MySelf = require("./ZJHMySelf")
import Desk = require("./ZJHDesk");
import gHander = require("../../../common/script/common/gHandler")
import BaseDef from "./ZJHBaseDef";
import NoticeMgr = require("./ZJHNoticeMgr")
let GameState = {
   None:0,
   InHall:1,
   InGame:2
}
class ZJHGameController{

   private static Instance:ZJHGameController = null;

   state = GameState.None;//当前游戏阶段

   server_url:string ="ws://game.539316.com/zhajh";//服务器地址 47.75.183.211-10.63.90.72:9999-zjh.0351sxzc.com
   //用户信息
   tickBreath:number = null;//心跳定时器

   tickBreathHall:number = null;//大厅心跳

   game:any = null;

   totalTime:number = 20;

   countTime:number = -1;

   backHall:boolean = false;

   private constructor(){
      this.registerMessage();
   }

   public static getInstance(){
      if(!this.Instance){
         this.Instance = new ZJHGameController();
      }
      return this.Instance;
   }

   initView(game:any){
      this.game = game;
   }

   Init(){
      connection.Create(gHander.gameConfig.gamelist.zjh.serverUrl);
      connection.setConnectedCallBack(this.onConnectedSuccess.bind(this));
      connection.setDisconnectedCallBack(this.onConnectedFailed.bind(this));
   }

   registerMessage(){
         Notification.register(Event.EVENT_USER_LOGIN_RSP,this,this.onLoginSuccess);//登录成功进入房间列表
         Notification.register(Event.EVENT_ENTERGAME_RSP,this,this.onEnterGame);//进入游戏
         Notification.register(Event.EVENT_BET_BASEPOINT_RSP,this,this.BasePoint);//进玩家下锅底
         Notification.register(Event.EVENT_SENDCARD_RSP,this,this.dealCard);//开始发牌
         Notification.register(Event.EVENT_START_COUNTDOWN_RSP,this,this.startCountDown);//开始倒计时 
         Notification.register(Event.EVENT_OTHER_JOIN_RSP,this,this.userJoin);//新玩家加入
         Notification.register(Event.EVENT_USER_LEAVE_RSP,this,this.userLeave);//用户离开
         Notification.register(Event.EVENT_NOTIFY_BET_RSP,this,this.turnBet);// 用户下注
         Notification.register(Event.EVENT_USER_FOLD_RSP,this,this.userFold);//用户弃牌 
         Notification.register(Event.EVENT_USER_CHECK_RSP,this,this.userCheck);//用户看牌
         Notification.register(Event.EVENT_USER_SHOWCARD_RSP,this,this.userShowCard);//用户亮牌
         Notification.register(Event.EVENT_USER_COMPARE_RSP,this,this.userCompare);//比牌结果 
         Notification.register(Event.EVENT_USER_ALLIN_RSP,this,this.userAllIn);//比牌结果 
         Notification.register(Event.EVENT_USER_FOLLOW_RSP,this,this.userFollow);//用户下注  
         Notification.register(Event.EVENT_USER_ADDBET_RSP,this,this.userAddBet);//用户加注 
         Notification.register(Event.EVENT_USER_SETTLE_RSP,this,this.userSettle);//结算
         Notification.register(Event.EVENT_USER_EMOJI_RSP,this,this.emoji);//结算

         Notification.register(Event.EVENT_OTHER_LOGIN_RSP,this,this.RepeatLogin);//重复登录
         Notification.register(Event.EVENT_MATCHROOM_RSP,this,this.MatchRoom);//对话框
         Notification.register(Event.EVENT_ERROR_RSP,this,this.ERROR_NOTICE);

   }

   ERROR_NOTICE(data:any){
      NoticeMgr.openDialog({str:data,close:true});
   }

   MatchRoom(data:any){
      let func = function(){
         msgSender.recoverGameScene(data);//请求恢复场景
      }.bind(this);
      let config = {1:"体验场",2:"初级场",3:"中级场",4:"高级场"}
      let _str = BaseDef.LOCAL_TXT.CONTINUE.replace("level",config[data]);
      NoticeMgr.openDialog({str:_str,callfunc:func,obj:this,close:true});
   }

   RepeatLogin(data:any){
      this.backHall = true;
      NoticeMgr.openDialog({str:BaseDef.LOCAL_TXT.REPEAT_LOGIN,callfunc:this.back,obj:this,close:false});
   }
   
   emoji(data: any){
      if(this.game && this.game.node){
         if(data.srcchair === data.dstchair){//自己发表情
            this.game.getEmoji(data.emoji,data.srcchair);
         }else{//给别人发表情
            this.game.sendEmoji(data.srcchair,data.dstchair,data.emoji);
         }
      }
   }

   userSettle(data: any){
      if(this.game && this.game.node) this.game.settle(data);
   }

   userAddBet(data: any){
      if(this.game && this.game.node) this.game.betting(data,2);
   }

   userFollow(data: any){
      if(this.game && this.game.node) this.game.betting(data,1);
   }

   userAllIn(data: any){
      if(this.game && this.game.node) this.game.AllIn(data);
   }

   userCompare(data: any){
      Desk.removeUserByChair(data.lose);
      if(this.game && this.game.node) this.game.startCompare(data);
   }

   userShowCard(data: any){
      if(this.game && this.game.node) this.game.userShowCard(data);
   }

   userCheck(data: any){
      if(this.game && this.game.node) this.game.userCheck(data,this.totalTime,this.totalTime);
   }

   userFold(data: any){
      Desk.removeUserByChair(data.chair);
      if(this.game && this.game.node) this.game.playerFold(data);
   }

   turnBet(data: any){
      if(this.game && this.game.node) this.game.turnBet(data,this.totalTime,this.totalTime);
   }

   BasePoint(data: any){
      if(this.game && this.game.node) this.game.BasePoint(data);
   }

   userJoin(data: any){
      Desk.addUser(data);
      if(this.game && this.game.node) this.game.userJoin(data);
   }

   userLeave(data: any){
      Desk.removeUser(data.lkwjyzh);
      if(data.lkwjyzh == MySelf.getChair()){
        if(this.isINGame()) this.switchHall()
         return;
      }
      if(this.game && this.game.node) this.game.userLeave(data);
   }

   startCountDown(data: any){
      this.countTime = data.time;
      if(this.game && this.game.node){
         this.game.beginCount(data.time);
      } 
   }

   dealCard(data: any){
      if(cc.sys.isBrowser && data.zhuang == -1) alert("庄家为负一")
      if(this.game && this.game.node) this.game.dealCard(data)
   }

   onEnterGame(data:any){
      if(!data) {//在大厅重连data为null
         this.switchHall()
         return;
      }
      this.clearData();
      this.totalTime = data.roominfo.thinktime;
      for(let i=0; i<data.userinfo.length; ++i){
         Desk.addUser(data.userinfo[i]);
      }
      let func = ()=>{
         if(this.game){
            this.heartbeat()//开启游戏内心跳
            this.state = GameState.InGame;
            let users = Desk.getUsers();
            this.game.initUsers(users,data.currstate,data.countdown)
            this.game.onEnterGame(data);
            if(this.countTime != -1) {
               this.game.beginCount(this.countTime);
            }
         }
      }
      cc.director.loadScene("ZJHGame",func)
   }

   isINGame(){
      return this.state == GameState.InGame;
   }

   //登录成功
   onLoginSuccess(data:any){
      MySelf.setNick(data.nick);
      MySelf.setMoney(data.money);
      MySelf.setHeadURL(data.Avatar);
      MySelf.setId(Number(gHander.gameGlobal.player.account_name));
      Desk.setRoomData(data.roomlist);
      msgSender.recoverGameScene();//请求恢复场景
   }

   heartbeat(){
      this.stopHeartbeat()
      this.tickBreath = setInterval(()=>{msgSender.sendBreatheHall();},1000);
   }

   heartbeatHall(){
      this.stopHeartbeat()
      this.tickBreathHall = setInterval(()=>{msgSender.sendBreatheHall();},15000);
   }

   stopHeartbeat(){
      if(this.tickBreathHall){
         clearInterval(this.tickBreathHall);
         this.tickBreathHall = null;
      }
      if(this.tickBreath){
         clearInterval(this.tickBreath);
         this.tickBreath = null;
      }
   }
   
   switchHall(){
      Desk.clearAll();//清除桌子内玩家数据
      this.state = GameState.InHall;
      this.game = null;
      let func = function(){
         cc.log("Switch To Hall!")
         cc.audioEngine.stopAllEffects();//停止所有音效
         this.heartbeatHall();
         this.countTime = -1;
      }
      cc.director.loadScene("ZJHHall",func.bind(this))
   }

   back(){
      this.backHall = true;
      this.stopHeartbeat();//停止心跳
      msgSender.userLogout();
      connection.close();
      let baseNode = cc.director.getScene().getChildByName("persistNode");
      if(baseNode) cc.game.removePersistRootNode(baseNode);//移除常驻节点
      cc.director.loadScene(gHander.gameConfig.hallconfig.lanchscene)
   }

   //与服务器连接成功
   onConnectedSuccess(){
      cc.log("Connnectec success~~~!")
      if(this.isINGame()){
         this.heartbeat()
      }else{
         this.heartbeatHall();
      }
      msgSender.userLogin();//发送登录请求
      NoticeMgr.connectionSuccess()
   }

   //与服务器连接失败
   onConnectedFailed(){
      cc.log("Connnectec failed~~~!",this.backHall)
      this.stopHeartbeat()//停止心跳
      if(!this.backHall){
         NoticeMgr.connection()
         this.ReConnect();
      }
   }

   clearData(){
      this.countTime = -1;
      Desk.clearAll();//清除桌子内玩家数据
      if(this.isINGame() && this.game && this.game.node) this.game.onGameExit();
   }

   ReConnect(){
      connection.Create(this.server_url);
   }

}

export = ZJHGameController.getInstance();