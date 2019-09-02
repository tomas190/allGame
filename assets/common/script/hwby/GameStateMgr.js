//游戏状态管理器用于记录游戏相关状态
var connection = require('Connection');
var msgSender = require('msgSender');
var commTools = require('CommTools');
var BaseDef = require('BaseDef');
var clientMessage = require('ClientMessage');
var NoticeDef = require('NoticeDef');
var Notification = require('Notification');
var playerManager = require('PlayerManager');
var debugManager = require('DebugManager');
var msg_pb = require('msg_pb_by');
let gHandler = require("gHandler");

//游戏状态~
var Em_Game_State = {
    None:0,
    Hall:1,         //大厅厅中
    Game:2          //在游戏中(即在房间中)
}

var GameStatMgr = cc.Class({
    ctor()
    {
        cc.log("this instance of GameStatMgr");
        this.bConnected = false;
        this.bLogined = false;
        this.eState = Em_Game_State.None;
        this.score = 0;
        this.sUserNick = "";
        this.sHeadImg = "";

        this.sServerVersion = "0.0.0";

        //当前场景根节点
        this.curRootNode = null;

        //当前房间等级
        this.uRoomLevel = 0;

        //每级房间对应基础分
        this.arrLevel2Score = [0,0.01,0.1,1];
        //当前房间基础分
        this.uCurRoomScore = 0;

        this.tickBreathe = null;

        //禁止行动，主要是禁止发射子弹
        this.bDisbelAction = false;

        this.nSelfChair = -1;

        //用户信息
        //644425956--508344
        //this.userid = 463421440;
        this.userid = 644425956
        this.userpassword = "508344"
        //this.userid = 458508906; //灰度服
        //this.userid = 980021298;  //正式服
        //服务器地址
        this.server_url = "ws://127.0.0.1:3653";
        //this.server_url = "ws://47.75.183.211:3653";  //开发服
        //this.server_url = "ws://buyu.0351sxzc.com:80"; //开发服
        //this.server_url = "ws://playallgames.sempxw.com/buyu"; //灰度服
        //this.server_url = "ws://amusement.cnhgye9.com/buyu";  //正式服


    },  
    
    getClassName()
    {
        return "GameStatMgr";
    },

    getHallName()
    {
        let curPlatform = BaseDef.eCurPlatform;
        let sHallName = BaseDef.Platform2Hall[curPlatform];
        cc.log("sHallName",sHallName);
        return sHallName;
    },

    EnabelAction() {
        this.bDisbelAction = false;
    },

    DisbelAction() {
        this.bDisbelAction = true;
    },

    IsDisbelAction() {
        return this.bDisbelAction;
    },

    TakeGameUrlPara()
    {
        let urlPara = location.search;        
        cc.log("urlPara",urlPara);
        debugManager.DebugInfo("urlPara:",urlPara);     
        if (urlPara.indexOf("?") != -1) 
        {
            cc.log("purePara",urlPara.substr(1))
        
            let Paramap = commTools.ParaUrlString(urlPara.substr(1),"&","=");
            cc.log("info",Paramap["info"]); 
            if(Paramap["userid"])
            {
                this.userid = Paramap["userid"];
            }

            cc.log("iconPath",Paramap["iconPath"]); 
            if(Paramap["iconPath"])
            {
                this.headiconPath = Paramap["iconPath"];
            }

            if(Paramap["info"])
            {
                let infostring = atob(Paramap["info"]);
                let info = JSON.parse(infostring);
                this.userid = String(info.id);
                this.server_url = info.server_url;
                this.userpassword = info.password;
                debugManager.DebugInfo("infostring:",infostring);
                debugManager.DebugInfo("userid:",this.userid);
                debugManager.DebugInfo("server_url:",this.server_url);                
            }      
        }
    },

    getIconPath() {
        if(this.headiconPath) {
            return this.headiconPath
        }

        return "";
    },


    setCurSceneRootNode(node)
    {
        this.curRootNode = node;
    },
    
    setScene(scene)
    {
        this.oScene = scene;
    },

    ShowWaiting(type)
    {
        //cc.log(new Error().stack);
        cc.log("this.curRootNode",this.curRootNode);
        cc.log("ShowWaiting~~~！！！");
        commTools.ShowWaiting(this.curRootNode,type);
    },    
    
    CloseWaiting(type)
    {
        commTools.CloseWaiting(type);
    },

    IsGameState()
    {
        return this.eState == Em_Game_State.Game;
    },

    ReqExitLeaveGameReq() 
    {
        if(this.IsGameState())
        {
            this.DisbelAction();
            Notification.SendNotify(NoticeDef.ReqLeavaGame);
            
            this.ShowWaiting(BaseDef.WaitType.WT_ExitGame);
            cc.log("sendLeaveGameReq~~!!!!");
            msgSender.sendLeaveGameReq();
        }
    },

    SwitchParentHall()
    {
        let cbSceneLoaded = function() {
            cc.log("load Parenthall ok!");
        }

        cc.log("gHandler",gHandler)
        cc.log("gHandler.gameConfig.hallconfig.lanchscene",gHandler.gameConfig.hallconfig.lanchscene);        
        cc.log("ready switch to Hall~~!!");
        let bLoad = cc.director.loadScene("hall", cbSceneLoaded);
        cc.log("loadscene",bLoad);
        //cc.log("gHandler.player.name",gHandler.player.name);
    },

    SwitchHall()
    {
        let cbSceneLoaded = function() {
            if(cc.sys.isBrowser) {
                clientMessage.sendPostMessage(BaseDef.ClientWindowEvent.CLIENT_DONE,{});
            }
            cc.log("load hall ok!");
        }

        this.eState = Em_Game_State.Hall;

        cc.log("ready switch to Hall~~!!");
        let bLoad = cc.director.loadScene(this.getHallName(), cbSceneLoaded);
        cc.log("loadscene",bLoad);
    },

    getRoomScore()
    {
        return this.uCurRoomScore;
    },

    SwitchGame(roomlevel)
    {
        let cbSceneLoaded = function() {
            cc.log("load game ok!");
            
            msgSender.sendGameEnterReq(roomlevel);
        }

        this.eState = Em_Game_State.Game;
        this.uRoomLevel = roomlevel;
        this.uCurRoomScore = this.arrLevel2Score[this.uRoomLevel];
        //cc.log("cur room score is ",this.uCurRoomScore);

        

        if(this.bConnected) {
            this.ShowWaiting(BaseDef.WaitType.WT_EnterGame);
            cc.director.loadScene('Buyu_game', cbSceneLoaded.bind(this)); 
        } else {
            this.Reconnect();
        }      
    },
    
    RegsiterNotifies()
    {
        Notification.Regsiter(NoticeDef.LoginRsp,this,this.onLogin);
        
        Notification.Regsiter(NoticeDef.Score,this,this.onSetScore);
        Notification.Regsiter(NoticeDef.EnterGame,this,this.onEnterGame);
        Notification.Regsiter(NoticeDef.Breathe,this,this.onServerBreathe);
        Notification.Regsiter(NoticeDef.ServerVersion,this,this.onSetServerVersion); 
        Notification.Regsiter(NoticeDef.PlayerLeave,this,this.onPlayerLeave);
        //Notification.Regsiter(NoticeDef.RefrshUserInfo,this,this.SetPlayerInfo); 
    },

    Init()
    {
        cc.log("cc.sys.platform",cc.sys.platform);
        cc.log("cc.sys.isBrowser",cc.sys.isBrowser);
        if(cc.sys.isBrowser) {
            //debugManager.DebugInfo("GameStateMgr Init~~~11111");  
            clientMessage.sendPostMessage(BaseDef.ClientWindowEvent.CLIENT_DONE,{});
            //clientMessage.sendPostMessage(BaseDef.ClientWindowEvent.CLIENT_LOAD,{});
            //取得游戏url参数
            this.TakeGameUrlPara();
        }
 
        cc.log("Regsiter NoticeDef.Score~~!!");
        this.RegsiterNotifies();
        

        this.InitConnect(); 
        let fnCallBack = function() {
            cc.log('Hall scene preloaded~!!!');
            this.SwitchHall();   
                  
        }

        cc.director.preloadScene(this.getHallName(),fnCallBack.bind(this));       
        
        debugManager.DebugInfo("GameStateMgr Init~~~2222222"); 
    },

    RestoreBreathe()
    {
        //没有心跳tick就注册心跳tick
        if(this.tickBreathe == null)
        {
            this.tickBreathe = setInterval(this.ActiveBreathe.bind(this),3000);
        }
        
        //服务器活跃值，这样子来使用
        //每次收到服务器心跳，置零，自己发送心跳加1。
        //如果这个数值累计过多，证明服务器已经很久没有响应，
        //恢复心跳（就是该函数）在每次服务器心跳到来时调用
        this.nServerDelay = 0;
    },

    StopBreathe()
    {
        if(this.tickBreathe != null)
        {
            clearInterval(this.tickBreathe);
        }
        
        this.tickBreathe = null;
    },

    ActiveBreathe()
    {
        if(this.bConnected)
        {
            //cc.log("客户端心跳~！！！");
            this.nServerDelay++;
    
            msgSender.sendBreathe();
    
            //cc.log("this.nServerDelay",this.nServerDelay);
            
            //已经很久没有收到服务器心跳，自己心跳也停自己
            if(this.nServerDelay > 3 )
            {
                this.ShowWaiting(BaseDef.WaitType.WT_Breath);
                this.StopBreathe();
            }
        }
    },

 
    onServerBreathe()
    {        
        this.CloseWaiting(BaseDef.WaitType.WT_Breath);
        this.RestoreBreathe();
    },

    TestShow()
    {
        cc.log("this is TestShow!!!");
    },

    onEnterGame(msg)
    {
        this.CloseWaiting(BaseDef.WaitType.WT_EnterGame);
        if(this.IsGameState())
        {
            let userinfo = msg.getSelf();            
            let chair = userinfo.getChair();
            this.nSelfChair = chair;
            cc.log("userinfo========================")
            cc.log(userinfo);
            playerManager.SetPlayerModeToManual(chair);
            playerManager.SetPlayerScore(chair,userinfo.getScore());
            playerManager.SetPlayerNick(chair,userinfo.getNick());
            playerManager.SetPlayerHead(chair,userinfo.getHeadimg());
            playerManager.SetPlayerCannonLevel(chair,userinfo.getCannonlevel());
            playerManager.SetPlayerCannonType(chair,userinfo.getCannontype());
            let others = msg.getOthersList();
            for(let i in others)
            {               
                let other = others[i];
                cc.log("other========================",i)
                cc.log(other);                 
                let otherchair = other.getChair();
                playerManager.SetPlayerModeToRemote(otherchair);
                playerManager.SetPlayerScore(otherchair,other.getScore());
                playerManager.SetPlayerNick(otherchair,other.getNick());
                playerManager.SetPlayerHead(otherchair,other.getHeadimg());                
                playerManager.SetPlayerCannonLevel(otherchair,other.getCannonlevel());
                cc.log(otherchair,"other cannon type",other.getCannontype());
                playerManager.SetPlayerCannonType(otherchair,other.getCannontype());  
            }
            //game.SyncUserInfo(userinfo.getScore(),userinfo.getCannonlevel())
            let sceneninfo = msg.getSceneinfo();
            this.oScene.SetSceneImg(sceneninfo.getSceneindex());
            this.SetSceneInfo(sceneninfo);
            cc.log("sceneninfo.getState:",sceneninfo.getState());
            cc.log("sceneninfo.getTime:",sceneninfo.getTime());            
        }
    },

    onPlayerLeave(msg) {
        if(this.nSelfChair == msg.getChair()) {
            this.CloseWaiting(BaseDef.WaitType.WT_ExitGame);
            this.SwitchHall();
        }
    },

    SimSetSceneInfo() {
        cc.log("SimSetSceneInfo 111!!!!!!!!!!!!!!!!!!!!!!!!");
        Notification.SendNotify(NoticeDef.WaitFishGroup,12);    
    },

    onSetServerVersion(sServerversion) {
        this.sServerVersion = sServerversion;
    }, 

    GetServerVersion() {
        return this.sServerVersion;
    },

    SetSceneInfo(info) {
        this.bDisbelAction = false;
        let eStat = info.getState();
        //cc.log("eStat",eStat);
        //cc.log("msg_pb.EmRoomRunState.EMRS_SPECIAL",msg_pb.EmRoomRunState.EMRS_SPECIAL);
        if(eStat == msg_pb.EmRoomRunState.EMRS_SPECIAL) { 
            this.bDisbelAction = true;
            let callback = function() {
                this.bDisbelAction = false;
            }  

            setTimeout(callback.bind(this),info.getTime() * 1000);

            //cc.log("Notification.SendNotify(NoticeDef.WaitFishGroup");
            Notification.SendNotify(NoticeDef.WaitFishGroup,info.getTime());     
        }
    },      

    getScore()
    {
        return this.score;        
    },

    onSetScore(score,id)
    {
        cc.log("this noticeid is ",id)
        cc.log("this gamestatemgr setscore is ",score);
        this.TestShow();
        this.score = score;
    },

    getUserNick() 
    {
        return this.sUserNick;
    },

    getUserHead()
    {
        let sHead = "";
        cc.log("this.headiconPath:",this.headiconPath);
        cc.log("this.sHeadImg:",this.sHeadImg);
        if (this.headiconPath) {
            sHead = this.headiconPath + this.sHeadImg
        } else {
            sHead = this.sHeadImg
        }

        cc.log("sHead:",sHead);
        
        return sHead;
    },

    SetPlayerInfo(msg) 
    {
        cc.log("SetPlayerInfo~!!!",msg);
        this.score = msg.getScore();
        this.sUserNick = msg.getNick(); 
        this.sHeadImg = msg.getHeadimg();        
    },

    ExitFromGame()
    {
        this.SwitchParentHall();

        this.StopBreathe();

        Notification.ClearAll();

        connection.setConnectedCallBack(null);
        connection.setDisconnectedCallBack(null);        
        connection.Close();

        this.bConnected = false

        this.eState = Em_Game_State.None;
        

        if(cc.sys.isBrowser) {
            clientMessage.sendPostMessage(BaseDef.ClientWindowEvent.CLIENT_RETURN,{});
        }
        
    },

    ReSendLogin() {
        this.CloseWaiting(BaseDef.WaitType.WT_Login);
        let fnCallbackOK = function() {
            cc.log("退出游戏到大厅~！");
            this.ExitFromGame();
        }

        let fnCallbackNo = function() {
            this.SendLogin();
        }

        commTools.showMessageBoxWithTwoOption(this.curRootNode,"未登录成功，是否返回游戏大厅",fnCallbackOK.bind(this),fnCallbackNo.bind(this));          
    },

    SendLogin() {
        this.ShowWaiting(BaseDef.WaitType.WT_Login);
        msgSender.sendLogin(0,String(this.userid),this.userpassword); 
        let callback = function() {
            if (!this.bLogined) {
                cc.log("还没有登录成功~！");
                this.ReSendLogin();                
            }    
        }

        setTimeout(callback.bind(this),5000);
    },

    LoginCheck() {
        if (!this.bLogined && this.bConnected ) {
            this.SendLogin()
        }
    },

    onLogin(msg) 
    {
        this.CloseWaiting(BaseDef.WaitType.WT_Login);
        cc.log("onLogin 222222222222222222");
        this.bLogined = true;
        //clientMessage.sendPostMessage(BaseDef.ClientWindowEvent.CLIENT_DONE,{});
        //cc.log("this gamestatemgr setscore is ",msg.getScore());       
        cc.log("msg",msg); 
        this.score = msg.getScore();
        this.sUserNick = msg.getNick(); 
        this.sHeadImg = msg.getHeadimg();          
    },

    Reconnect()
    {
        this.ShowWaiting(BaseDef.WaitType.WT_Connecting);
        connection.Create(this.server_url);
    },

    InitConnect()
    {
        if(!this.bConnected)
        {
            this.ShowWaiting(BaseDef.WaitType.WT_Connecting);

            connection.setConnectedCallBack(this.onConnected.bind(this));
            connection.setDisconnectedCallBack(this.onDisconnected.bind(this));

            connection.Create(this.server_url);
        }
    },

    //这个函数由connection连接成功之后调用
    onConnected()
    {
        this.CloseWaiting(BaseDef.WaitType.WT_Connecting);
        cc.log("GameStatMgr onConnected~!!!");
        this.bConnected = true;
        cc.log("连上服务器，从这里开始~！");
        //msgSender.sendLogin(0,String(this.userid));  
        // if( this.eState = Em_Game_State.Hall) {
        //     // let callback = function() {
        //     //     this.SendLogin();
        //     // }
        //     // setTimeout(callback.bind(this),5000);
        //     this.SendLogin();
        // }
        

        if(cc.sys.isBrowser) {
            clientMessage.sendPostMessage(BaseDef.ClientWindowEvent.CLIENT_ENTER,{});
        }
        
        cc.log("连接成功，开始心跳~！");
        this.RestoreBreathe();
    },

    onDisconnected()
    {
        this.CloseWaiting(BaseDef.WaitType.WT_Connecting);
        this.StopBreathe();

        cc.log("已经和服务器断开~！");
        this.bConnected = false;

        let fnCallback = function() {
            cc.log("disconnect callback to here");
            //断线时如果在游戏中就踢回大厅
            if (this.IsGameState())
            {
                this.SwitchHall();
            }
            
            this.Reconnect();
        }

        commTools.showMessagebox(this.curRootNode,"已经和游戏服务器断开连接，请重新连接",fnCallback.bind(this),true);        
    },
    
    
    showMessagebox()
    {
        let fnCallback = function() {
            cc.log("test callback to here");
        }
        commTools.showMessagebox(this.curRootNode,"已经和游戏服务器断开连接，请重新连接",fnCallback.bind(this),true);                
    }
})


module.exports=new GameStatMgr();