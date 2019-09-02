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
var msgSender = require('msgSender');
var fishManager = require('FishManager');
var playerManager = require('PlayerManager');
var gameStatMgr = require('GameStateMgr');
var NoticeDef = require('NoticeDef');
var Notification = require('Notification');
var msg_pb = require('msg_pb_by');

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        emControlMode:0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        cc.log("this node name",this.node.name);
        cc.log("11111111111111111111111111111111111111111111111");
        //玩家当前分数
        this.score = 100000;
        this.CannonLevel = 0;
        //大炮一共等级，每等级翻倍数
        this.LevelScore = [1,2,3,4,5,6,7,8,9];

        this.CannonNode = this.node.getChildByName("Cannon");
        //cc.log("this.CannonNode:",this.CannonNode)
        this.Cannon = this.CannonNode.getComponent("Cannon");
        this.CannonBaseAniCtrl = this.node.getChildByName("CannonBack").getComponent(cc.Animation);
        this.CannonBaseAniCtrl.on('finished',  this.onFireEnd,  this);
        

        //等级控制
        this.LevelCtrl = this.node.getChildByName("LevelCtl").getComponent("LevelCtrl");
        this.LevelCtrl.SetRoomScore(gameStatMgr.getRoomScore());

        let callback = function(level,cost) {
            this.onCannonLevelChange(level,cost)
        }
        
        this.LevelCtrl.setLevelChangeCallBack(callback.bind(this));

        this.UserInfo = this.node.getChildByName("UserInfo").getComponent("UserInfo");
                
        let cenode = this.CannonNode.getChildByName("ChangBlast");
        if (cenode )
        {            
            this.CannonEffect = cenode.getComponent(cc.Animation);
            //cc.log("this.CannonEffect is",this.CannonEffect);
        }
        

        this.TowerNode = this.node.getChildByName("LightningTower");
        this.Tower = this.TowerNode.getComponent("LightningTower");

        if(this.Cannon) {
            this.Cannon.setControlMode(this.emControlMode);
        }

        if(this.Tower) {
            this.Tower.setControlMode(this.emControlMode);
        }        

        this.HereTip = this.node.getChildByName("youareheretip");
        this.HereTip.active = false;

        this.popscorelist =new Array();
        this.nPopScoreWaitTime = 0
        
        this.Game = this.node.getParent().getComponent("Game");
        this.SetSimpleScorePrefab(this.Game.ScoreSimplePrefab);

        this.CoinIcon = cc.find("UserInfo/Frame/CoinFrame/coinico",this.node);
        cc.log("coinicon~~!!!!!!");
        if(this.CoinIcon) {
            cc.log("coinicon~~11111111111111111111111");
            this.CoinIcon.getComponent(cc.Sprite).spriteFrame = this.Game.GetCurCoinIcon();
        }
    
        this.EffectGunChangePrefab = this.Game.GunChangePrefab;

        playerManager.PushPlayer(this);

        //初始化玩家全都不可见
        this.setControlMode(BaseDef.PlayerMode.None);

        //子弹数
        this.nBulletNum = 0;

        //已经闲置时间
        this.nIdleTime = 0;

        //最大闲置时间，超过了将弹出退出倒计时,再次超出将退出游戏
        this.nMaxIdelTime = 60;
        

        //已经处于闲置状态
        this.bIdleState = false;

        //调试用
        this.debugScoreInfo = {};
        this.debugScoreInfo.sumadd = 0;
        this.debugScoreInfo.sumdec = 0;
        this.debugScoreInfo.dectime = 0;
        this.debugScoreInfo.mapaddscore = [];

        cc.log("22222222222222222222222222222222222222222222222222");
    },

    InitMaskLayer() {
        this.StartMaskLayer = this.node.getParent().getChildByName("MaskLayerStart");        
        this.StartMaskLayer.zIndex = 99;
        this.StartMaskLayer.opacity = 200;
        this.node.zIndex = 100;

        this.bHaveMaskLayer = true;
    },

    onMaskOut() {
        cc.log("onMaskOut~!!")
        this.node.zIndex = 90;
    },

    CloseMaskLayer() {
        if(this.bHaveMaskLayer) {
            this.bHaveMaskLayer = false;   
            let fnFadeOutEnd = cc.callFunc(this.onMaskOut, this);
            //let fsAction = cc.sequence(fnPopAction,cc.delayTime(0.5),fnDestroy);        
            let fsAction = cc.sequence(cc.fadeOut(0.5),fnFadeOutEnd);   
            this.StartMaskLayer.runAction(fsAction);
        }
    },
 
    onCannonLevelChange(level,cost) {
        cc.log("onCannonLevelChange",level,cost);
        msgSender.sendCannonLevel(level);
        this.CannonNode.getComponent("Cannon").setBulletScore(cost);
    },

    setChair(chair)
    {
        this.chair = chair;
        this.Tower.setChair(chair);
    },

    SwitchLockMode(bLock)
    {

        cc.log(this.chair,"SwitchLockMode",bLock)
        this.bLockMode = bLock
        cc.log("SwitchLockMode11111111111111111");
        if(bLock)
        {     
            cc.log("SwitchLockMode2222222222222222222222");       
            this.TowerNode.active = true;
            this.CannonNode.active = false;
        }
        else
        {
            cc.log("SwitchLockMode3333333333333333333");    
            this.Tower.CloseTower();
            this.TowerNode.active = false;
            this.CannonNode.active = true;
            
            cc.log("play ani ~~!!!!");
            this.CannonEffect.node.active = true;
            this.CannonEffect.play("ChangBlast");
            this.StopBodyFire();
        }                
    }, 

    SwitchAutoMode(bAuto)
    {
        this.Cannon.setAutoMode(bAuto);
    },

    LockFishById(fishID)
    {
        if(fishID > 0) {
            let fish = fishManager.getFish(fishID);
            if(fish) {
                this.Tower.LockFish(fish);
                this.StartPlayBodyFire();
            }
        } else {
            this.Tower.Release(); 
        }
        
        
    },

    LockFish(fish)
    {
        if(this.bLockMode && this.CanFireBullet())
        {
            this.StartPlayBodyFire();
            cc.log("player lock fish~~",fish.ID,fish.fishType);
            msgSender.sendLockFish(fish.ID);
            this.Tower.LockFish(fish);
            this.HereTip.active = false;     
        }

        this.Cannon.onTouchEnd();
    },

    ReleaseFish(fish)
    {
        cc.log("player release fish~~!!",fish.ID);
        this.Tower.ReleaseFish(fish);     
        this.StopBodyFire();
    },

    OnlyShowWaitJoin()
    {
        let children = this.node.children;
        for (let i = 0; i < children.length; ++i) {  
            if(children[i].name == "waitfjoin") {
                children[i].active = true;
            } else {
                children[i].active = false;
            }                
        }   
    },

    setControlMode(mode)
    {
        this.emControlMode = mode;
        if(this.Cannon) {
            this.Cannon.setControlMode(mode);
        }

        if(this.Tower) {
            this.Tower.setControlMode(mode);
        }
               
        this.LevelCtrl.setSelf(this.isPlayerSelf());

        cc.log(this.node.name,"PlayerMode.controlMode:",this.emControlMode)

        switch (this.emControlMode) {
            case BaseDef.PlayerMode.Manual:
            //手动控制的就是玩家自己了，打开所有玩家控件
                this.node.active = true;
                this.HereTip.active = true;  
                this.Game.CloseWait4Join(this.chair);              
                break;
            case BaseDef.PlayerMode.None:
            //表示还没有玩家，隐藏玩家
                //this.OnlyShowWaitJion();
                this.Tower.CloseTower();
                this.node.active = false;                
                this.Game.ShowWait4Join(this.chair,this.node.getPosition());
                break;
            default:
                this.Game.CloseWait4Join(this.chair);   
            //其它玩家~~包括客户端AI
                this.node.active = true;          
        }
    },

    RefreshScoreForUI()
    {
        //cc.log("this.score:",this.score);
        //cc.log("toFixed 2:",this.score.toFixed(2))
        
        this.UserInfo.SetCoinNum(this.score);
        //this.scoreLabel.string = this.score.toFixed(2) + "元";
    },

    SetScore(score)
    {
        this.score = score;
        this.RefreshScoreForUI();
    },

    SetNick(nick)
    {
        this.UserInfo.SetNick(nick);   
    },

    SetHead(head)
    {
        let fullPath = gameStatMgr.getIconPath() + head;
        cc.log("fullPath:",fullPath);
        this.UserInfo.SetHeadImg(fullPath);
    },

    SetCannonLevel(level)
    {
        this.LevelCtrl.setLevel(level);
        this.CannonNode.getComponent("Cannon").setBulletScore(this.LevelCtrl.getCost());
    },

    SetCannonType(type)
    {
        let bLock = type == msg_pb.EmCannonType.TOWER;
        this.SwitchLockMode(bLock);
    },

    SetSimpleScorePrefab(prefab)
    {
        this.smiplescoreprefab = prefab;        
    },

    AddPopScoreList(score)
    {
        this.popscorelist.unshift(score);
    },

    onScorePopUpdate(dt)
    {
        this.nPopScoreWaitTime += dt;
        if (this.nPopScoreWaitTime > 0.2 && this.popscorelist.length > 0) {
            let score = this.popscorelist.pop()
            this.PlayScoreSimple(score);
            this.nPopScoreWaitTime = 0;
        }
    },

    PlayScoreSimple(score)
    {
        let scoreLable = cc.instantiate(this.smiplescoreprefab);
        this.node.addChild(scoreLable);
        scoreLable.getComponent(cc.Label).string = "+" + score.toFixed(2) + "元";          
    },

    onScoreChange(score)
    {
        //cc.log("onScoreChange",score);
        this.score += score;
        //cc.log("cost:%s and rest:%s",score.toFixed(2),this.score.toFixed(2));

        if(score > 0)
        {
            this.debugScoreInfo.sumadd += score;
            if (this.debugScoreInfo.mapaddscore[score]) {
                this.debugScoreInfo.mapaddscore[score]++
            } else {
                this.debugScoreInfo.mapaddscore[score] = 1
            }
            
        }
        else
        {
            this.debugScoreInfo.sumdec += score;  
            this.debugScoreInfo.dectime++;          
        }

        this.onCostCoin();

        this.RefreshScoreForUI();
    },

    BulletHitFish(fishid,score,bulletid)
    {
        //this score is hited fish,not current cannon level
        //cc.log("Do send hit message by only self hit fish!!!!");
        if(this.isPlayerSelf())
        {
            //cc.log("hited fish~!!!bulletid and fishid:",bulletid,fishid)
            msgSender.sendHitFish(fishid,score,bulletid)
        }
    },

    getCurFireCost()
    {
        // cc.log("gameStatMgr.getRoomScore():",gameStatMgr.getRoomScore())
        // cc.log("this.LevelScore[this.CannonLevel]:",this.LevelScore[this.CannonLevel])
        // cc.log("final score:",this.LevelScore[this.CannonLevel] * gameStatMgr.getRoomScore())
        //return this.LevelScore[this.CannonLevel] * gameStatMgr.getRoomScore();
        return this.LevelCtrl.getCost();
    },   

    initAIdata()
    {
        //考虑一个简单的机器人AI，从屏幕中简单取一个点，射击一断时间后，换一个点继续
        //需要的数据如下，是否开火，射击目标点，随机生成本次行动结束时间（即持续时间），射击时限(1~10秒)或停止射击时限(1~3秒)
        //再用一个值记录本次行动已经进行时间
        this.AIData = {}
        this.AIData.bFire = false;
        this.AIData.TargetPos = cc.v2(0.5,0.5);
        this.AIData.OverTime = 0;
        this.AIData.Times = 0;
    },

    DoFire(pos)
    {
        if(this.HaveInGame())
        {
            this.Cannon.ActiveFireOnce(pos); 
        }        
    },

    AIThinkingOnce()
    {
        this.AIData.Times = 0;
        if(this.AIData.bFire)
        {
            this.AIData.TargetPos.x = Math.random();
            this.AIData.TargetPos.y = Math.random();   
            let time = Math.random() * 10;
            this.AIData.OverTime = Math.round(time);  
            this.Cannon.ActiveFireStart(this.AIData.TargetPos);                                   
        }
        else
        {
            let time = Math.random() * 3;
            this.AIData.OverTime = Math.round(time);   
            this.Cannon.ActiveFireEnd();                                 
        }

        this.AIData.bFire = !this.AIData.bFire;
    },

    updateAI(dt)
    {
        this.AIData.Times += dt;

        if(this.AIData.Times > this.AIData.OverTime)
        {
            this.AIThinkingOnce();
        }
    },

    CanFireBullet()
    {
        if(gameStatMgr.IsDisbelAction())
        {
            return false;
        }

        //没钱不能发射
        if(this.isPlayerSelf() && this.score < this.getCurFireCost())
        {

            let tips = "你的余额已不足";
            Notification.SendNotify(NoticeDef.ShowCommTips,tips);
            
            return false;
        }

        //cc.log("this.nBulletNum",this.nBulletNum);

        //屏幕上最多10发子弹
        return this.nBulletNum < 10;
    },

    StartPlayBodyFire() {
        this.bLoopBodyFire = true;
        this.CannonBaseAniCtrl.play("BodyFire");
    },

    StopBodyFire() {
        this.bLoopBodyFire = false;
        this.CannonBaseAniCtrl.stop("BodyFire");
        this.CannonBaseAniCtrl.play("Body");
    },

    onFireEnd() {
        //cc.log("onFireEnd");
        if( this.bLoopBodyFire ) {
            this.CannonBaseAniCtrl.play("BodyFire");
        }else{
            this.CannonBaseAniCtrl.play("Body");
        }
    },

    onSelfFire()
    {
        this.HereTip.active = false;    
        this.CloseMaskLayer();
    },

    IsOverIdelTime() {
        //只有玩家自己才判断
        return this.isPlayerSelf() && this.nIdleTime > this.nMaxIdelTime
    },

    //花了钱就算有动作
    onCostCoin() {
        if(this.isPlayerSelf() ) {
            if(this.bIdleState) {
                Notification.SendNotify(NoticeDef.PlayerWakeUp);  
                this.bIdleState = false;   
            }  
            
            this.nIdleTime = 0;  
            this.onSelfFire(); 
        }        
    },

    onBulletFire()
    {
        //this.CannonBaseAniCtrl.stop("Body");
        this.CannonBaseAniCtrl.play("BodyFire");
        //cc.log("onFire~~~!!!");
        this.nBulletNum++;  
        //cc.log("current bulletNum:",this.nBulletNum);
    },

    OnBulletBlast()
    {
        //cc.log("palyer OnBulletBlast~~!!!!");
        this.nBulletNum--; 
        //cc.log("current bulletNum:",this.nBulletNum);
    },

    //是否在游戏中
    HaveInGame()
    {
        return this.emControlMode != BaseDef.PlayerMode.None;
    },

    //是否是玩家自己
    isPlayerSelf()
    {
        return this.emControlMode == BaseDef.PlayerMode.Manual;
    },

    onDestroy()
    {
        if(this.isPlayerSelf()){
            cc.log("sum dec:",this.debugScoreInfo.sumdec);
            cc.log("sum add:",this.debugScoreInfo.sumadd);
            cc.log("dec time:",this.debugScoreInfo.dectime);
            cc.log("mapaddscore list",this.debugScoreInfo.mapaddscore);
        }

    },

    start() 
    {
        this.CannonNode.getComponent("Cannon").setBulletScore(this.getCurFireCost());
        this.initAIdata();
        this.InitMaskLayer();
        this.RefreshScoreForUI();
    },    

    update (dt)
    {
        if(this.emControlMode == BaseDef.PlayerMode.AI)
        {
            this.updateAI(dt);
        }

        this.onScorePopUpdate(dt);

        this.nIdleTime += dt;


        if(this.IsOverIdelTime()) {
            cc.log("IsOverIdelTime~!!!!");
            if(this.bIdleState) {
                cc.log("gameStatMgr.SwitchHall()~!!!");
                //已经在闲置状态再次超时退回捕鱼大厅
                //gameStatMgr.SwitchHall();
                gameStatMgr.ReqExitLeaveGameReq()
                this.bIdleState = false; 
            } else {
                this.bIdleState = true;                
                cc.log("NoticeDef.IdleOverTip");
                Notification.SendNotify(NoticeDef.IdleOverTip,this.nMaxIdelTime);
            }

            this.nIdleTime = 0;
              
        }
    },
});
