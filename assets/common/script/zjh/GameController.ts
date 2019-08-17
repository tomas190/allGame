import connection from "./net/Connection"
import Notification from "./net/Notification"
import Event from "./net/EventCustom"
import msgSender from "./net/msgSender"
import CommonTool from "./CommonTool";
import MySelf from "./MySelf"
import Desk from "./Desk"

let GameState = {
   None:0,
   InHall:1,
   InGame:2
}
class GameController{

   state = GameState.None;//当前游戏阶段

   server_url:string = "ws://10.63.90.72:9999";//服务器地址
   //用户信息 322769835-490418 
   //801293400 251107980 685519527 101186036 249806068
   //615423748 277048904 430121688 149881909 524274603
   userId:number = 430121688;

   passWord:string = "123456";

   tickBreath:number = null;//心跳定时器

   game:any = null;

   totalTime:number = 20;

   countTime:number = -1;

   constructor(){
      this.registerMessage();
      CommonTool.setMyselfId(this.userId);
   }

   initView(game:any){
      this.game = game;
   }

   Init(){
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
      if(this.game && this.game.node) this.game.startCompare(data);
   }

   userShowCard(data: any){
      if(this.game && this.game.node) this.game.userShowCard(data);
   }

   userCheck(data: any){
      if(this.game && this.game.node) this.game.userCheck(data,this.totalTime,this.totalTime);
   }

   userFold(data: any){
      if(this.game && this.game.node) this.game.playerFold(data);
   }

   turnBet(data: any){
      if(this.game && this.game.node) this.game.turn(data,this.totalTime,this.totalTime);
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
      if(this.game && this.game.node) this.game.startCount(data.time);
   }

   dealCard(data: any){
      if(this.game && this.game.node) this.game.dealCard(data)
   }
   onEnterGame(data:any){
      this.totalTime = data.roominfo.thinktime;
      for(let i=0; i<data.userinfo.length; ++i){
         Desk.addUser(data.userinfo[i]);
      }
      let func = ()=>{
         if(this.game){
            this.state = GameState.InGame;
            let users = Desk.getUsers();
            this.game.onEnterGame(data);
            this.game.initUsers(users,data.currstate,data.countdown)
            if(this.countTime != -1) this.game.startCount(this.countTime);
         }
      }
      cc.director.loadScene("Game",func)
   }

   isINGame(){
      return this.state == GameState.InGame;
   }

   //登录成功
   onLoginSuccess(data:any){
      MySelf.setNick(data.nick);
      MySelf.setMoney(data.money);
      MySelf.setHeadURL(data.Avatar);
      this.switchHall()
   }

   heartbeat(){
      this.tickBreath = setInterval(()=>{msgSender.sendBreatheHall()},3000);
   }

   stopHeartbeat(){
      if(this.tickBreath){
         clearInterval(this.tickBreath);
         this.tickBreath = null;
      }
   }

   switchHall(){
      Desk.clearAll();//清除桌子内玩家数据
      if( this.isINGame() && this.game.node) this.game.onGameExit();
      this.game = null;
      let func = function(){
         cc.log("Switch To Hall!")
         this.state = GameState.InHall;
         this.countTime = -1;
      }
      cc.director.loadScene("Hall",func.bind(this))
   }

   //与服务器连接成功
   onConnectedSuccess(){
      this.heartbeat()//开始心跳
      msgSender.userLogin(this.userId,this.passWord);//发送登录请求
   }

   //与服务器连接失败
   onConnectedFailed(){
      this.stopHeartbeat()//停止心跳
      if(this.isINGame()) this.switchHall();
      this.ReConnect();
   }

   ReConnect(){
      connection.Create(this.server_url);
   }

}

export default new GameController;