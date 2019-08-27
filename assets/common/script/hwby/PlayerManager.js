// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var BaseDef = require('BaseDef');
var NoticeDef = require('NoticeDef');
var Notification = require('Notification');

var PlayerManager = cc.Class({

    init(game)
    {
        this.playerList = [];
        this.game = game;

        this.RegsiterNotifies();
    },

    RegsiterNotifies()
    {
        Notification.Regsiter(NoticeDef.PlayerJoin,this,this.onPlayerJoin);
        Notification.Regsiter(NoticeDef.Fire,this,this.onPlayerFire);
        Notification.Regsiter(NoticeDef.PlayerLeave,this,this.onPlayerLeave);
        Notification.Regsiter(NoticeDef.CannonLevel,this,this.onPlayerConnonLevel);
        Notification.Regsiter(NoticeDef.CannonType,this,this.onPlayerConnonType);
        Notification.Regsiter(NoticeDef.LockFish,this,this.onPlayerLockFish);
        Notification.Regsiter(NoticeDef.CoinChange,this,this.onPlayerCoinChange);
        Notification.Regsiter(NoticeDef.HitInvalid,this,this.onPlayerCoinChange);  
    },

    getClassName()
    {
        return "PlayerManager";
    },     

    PushPlayer(player)
    {
        cc.log("this playermanager pushplayer~!!");
        player.setChair(this.playerList.length)
        this.playerList.push(player);
    },

    // LockFish(fish)
    // {
    //     for (let i in this.playerList) 
    //     {
    //         if (this.playerList[i].isPlayerSelf())
    //         {
    //             this.playerList[i].LockFish(fish);
    //         }
    //     }
    // },

    // ReleaseFish(fish)
    // {
    //     for (let i in this.playerList) 
    //     {
    //         if (this.playerList[i].isPlayerSelf())
    //         {
    //             this.playerList[i].ReleaseFish(fish);
    //         }
    //     }
    // },

    SetPlayerModeToManual(index)
    {
        this.playerList[index].setControlMode(BaseDef.PlayerMode.Manual);
        this.game.SetPlayerSelf(this.playerList[index]);
    },

    SetPlayerModeToRemote(index)
    {
        this.playerList[index].setControlMode(BaseDef.PlayerMode.Remote);
    },    

    SetPlayerModeToAI(index)
    {
        this.playerList[index].setControlMode(BaseDef.PlayerMode.AI);
    },

    SetPlayerModeToNone(index)
    {
        this.playerList[index].setControlMode(BaseDef.PlayerMode.None);
    },

    SetPlayerScore(index,score)
    {
        this.playerList[index].SetScore(score);      
    },

    SetPlayerNick(index,nick)
    {
        this.playerList[index].SetNick(nick);  
    },

    SetPlayerHead(index,head)
    {
        this.playerList[index].SetHead(head);  
    }, 

    PlayerCoinChange(index,score)
    {
        this.playerList[index].onScoreChange(score);      
    },

    SetPlayerCannonLevel(index,level)
    {
        this.playerList[index].SetCannonLevel(level);
    },

    SetPlayerCannonType(index,type)
    {
        cc.log("SetPlayerCannonType",type)
        this.playerList[index].SetCannonType(type);
    },

    PlayerDoFire(index,pos)
    {
        this.playerList[index].DoFire(pos);
    },

    PlayerLockFish(index,fishid)
    {
        this.playerList[index].LockFishById(fishid);
    },

    onPlayerFire(msg)
    {
        let chair = msg.getChair();
        let pos = cc.v2(msg.getPos().getX(),msg.getPos().getY());
        this.PlayerDoFire(chair,pos);
    },

    onPlayerJoin(msg)
    {
        let userinfo = msg.getUserinfo();
        let chair = userinfo.getChair();
        this.SetPlayerModeToRemote(chair);
        this.SetPlayerScore(chair,userinfo.getScore());
        this.SetPlayerNick(chair,userinfo.getNick());
        this.SetPlayerHead(chair,userinfo.getHeadimg());
        this.SetPlayerCannonType(chair,userinfo.getCannontype());
        this.SetPlayerCannonLevel(chair,userinfo.getCannonlevel());        
    },

    onPlayerLeave(msg)
    {
        let chair = msg.getChair();    
        this.SetPlayerModeToNone(chair);
    },

    onPlayerConnonLevel(msg)
    {
        let chair = msg.getChair();
        let level = msg.getLevel();
        this.SetPlayerCannonLevel(chair,level);
    },

    onPlayerConnonType(msg)
    {
        let chair = msg.getChair();
        let type = msg.getType();
        this.SetPlayerCannonType(chair,type);
    },

    onPlayerLockFish(msg)
    {
        let chair = msg.getChair();
        let fishid = msg.getFishid();
        this.PlayerLockFish(chair,fishid);        
    },

    onPlayerCoinChange(msg)
    {
        let chair = msg.getChair();
        let score = msg.getScore();
        //cc.log("player coinchange:",score);
        this.PlayerCoinChange(chair,score);        
    },

    getPlayer(index)
    {
        return this.playerList[index]
    },

    start () 
    {
        cc.log("this is palyermanager start~!!");
        // this.SetPlayerModeToManual(0);
        // this.SetPlayerModeToAI(1);
        // this.SetPlayerModeToAI(2);
        // this.SetPlayerModeToAI(3);
    },

    onExitGame()
    {
        Notification.UnRegAll(this);
    },

    // update (dt) 
    // {

    // },
});

module.exports = new PlayerManager();
