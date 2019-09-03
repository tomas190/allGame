import connection from "./ZJHnet/ZJHConnection"
import Notification from "./ZJHnet/ZJHNotification"
import Event from "./ZJHnet/ZJHEventCustom"
import msgSender from "./ZJHnet/ZJHmsgSender"
import CommonTool = require("./ZJHCommonTool")
import MySelf = require("./ZJHMySelf")
import Desk = require("./ZJHDesk");
import gHander = require("../common/gHandler")

let GameState = {
   None:0,
   InHall:1,
   InGame:2
}
class ZJHGameController{

   private static Instance:ZJHGameController = null;

   state = GameState.None;//当前游戏阶段

   server_url:string = "ws://zjh.0351sxzc.com";//服务器地址 47.75.183.211-10.63.90.72:9999-zjh.0351sxzc.com
   //用户信息
   //801293400 251107980 685519527 101186036 249806068
   //615423748 277048904  149881909 524274603
   userId:number = null;

   passWord:string = null;

   tickBreath:number = null;//心跳定时器

   game:any = null;

   totalTime:number = 20;

   countTime:number = -1;

   backHall:boolean = false;

   private constructor(){
      this.userId = gHander.gameGlobal.player.uuid;
      this.passWord = gHander.gameGlobal.player.pass;
      MySelf.setId(this.userId)
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

   Init(userId: number){
      this.userId = userId
      this.passWord = "123456";
      MySelf.setId(this.userId)
      connection.Create(this.server_url);
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
         Notification.register(Event.EVENT_BACK_TO_HALL,this,this.back);//返回大厅 
         Notification.register(Event.EVENT_USERLEAVEINGAME_RSP,this,this.switchHall2);
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
      if(data.lkwjyzh == MySelf.getChair()){//自己退出
         this.switchHall()
      }else{
         if(this.game && this.game.node) this.game.userLeave(data);
      }
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
      if(!data) return; //在大厅重连data为null
      this.totalTime = data.roominfo.thinktime;
      for(let i=0; i<data.userinfo.length; ++i){
         Desk.addUser(data.userinfo[i]);
      }
      let func = ()=>{
         if(this.game){
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
      MySelf.setId(this.userId);
      Desk.setRoomData(data.roomlist);
      this.switchHall()
   }

   heartbeat(){
      this.tickBreath = setInterval(()=>{msgSender.sendBreatheHall()},1000);
   }

   stopHeartbeat(){
      if(this.tickBreath){
         clearInterval(this.tickBreath);
         this.tickBreath = null;
      }
   }

   switchHall2(){
      Desk.clearAll();//清除桌子内玩家数据
      if( this.isINGame() && this.game.node) this.game.onGameExit();
      this.game = null;
      let func = function(){
         cc.log("Switch To Hall!")
         this.state = GameState.InHall;
         this.countTime = -1;
      }
      cc.director.loadScene("ZJHHall",func.bind(this))
   }

   switchHall(){
      Desk.clearAll();//清除桌子内玩家数据
      if( this.isINGame() && this.game && this.game.node) this.game.onGameExit();
      this.game = null;
      let func = function(){
         cc.log("Switch To Hall!")
         this.state = GameState.InHall;
         this.countTime = -1;
         msgSender.recoverGameScene();//请求恢复场景
      }
      cc.director.loadScene("ZJHHall",func.bind(this))
   }

   back(){
      this.backHall = true;
      this.stopHeartbeat();//停止心跳
      msgSender.userLogout();
      connection.close();
      cc.director.loadScene(gHander.gameConfig.hallconfig.lanchscene)
   }

   //与服务器连接成功
   onConnectedSuccess(){
      cc.log("Connnectec success~~~!")
      this.heartbeat()//开始心跳
      msgSender.userLogin(this.userId,this.passWord);//发送登录请求
   }

   //与服务器连接失败
   onConnectedFailed(){
      cc.log("Connnectec failed~~~!",this.backHall)
      this.stopHeartbeat()//停止心跳
      if(this.isINGame()) this.switchHall();
      if(!this.backHall){
         this.ReConnect();
      }
   }

   ReConnect(){
      connection.Create(this.server_url);
   }

}

export = ZJHGameController.getInstance();