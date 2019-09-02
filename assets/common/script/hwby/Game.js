// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var fishManager = require('FishManager');
var commTools = require('CommTools');
var playerManager = require('PlayerManager');
var connection = require('Connection');
var msgSender = require('msgSender');
var BaseDef = require('BaseDef');
var bulletManager = require('BulletManager');
var NoticeDef = require('NoticeDef');
var Notification = require('Notification');
//var gameStatMgr = require('GameStateMgr');
var baseNodeFun = require('BaseNodeFun');
var debugManager = require('DebugManager');
var msg_pb = require('msg_pb_by');

cc.Class({
    extends: cc.Component,
    mixins:[baseNodeFun],

    properties: {

        CoinIcon:{
            default: [],
            type: cc.SpriteFrame

        },

        //子弹
        BulletPrefab: {
            default: null,
            type: cc.Prefab
        }, 
        
        //所有鱼
        FishPrefab:
        {
            default:[],
            type:[cc.Prefab]
        },

        //鱼游过产生气泡
        BubblePrefab:
        {
            default:null,
            type:cc.Prefab
        },          

        //爆炸特效
        BlastPrefab:
        {
            default:null,
            type:cc.Prefab
        },

        BlastCoinPrefab:
        {
            default:null,
            displayName: "金币爆炸",
            tooltip: "打死鱼10倍以上效果",            
            type:cc.Prefab            
        },

        BlastCoinPlusPrefab:
        {
            default:null,
            displayName: "华丽金币爆炸",
            tooltip: "打死鱼100倍以上效果",                
            type:cc.Prefab            
        },        

        //闪电命中特效
        LightningHit:
        {
            default:null,
            type:cc.Prefab
        },

        //命中分数
        ScorePrefab:
        {
            default:null,
            type:cc.Prefab
        },

        ScoreSilverPrefab:
        {
            default:null,
            type:cc.Prefab
        },

        //钱币回位后的简单分数弹出显示
        ScoreSimplePrefab:
        {
            default:null,
            type:cc.Prefab
        },

        LightningChain:
        {
            default:[],
            type:[cc.Prefab]
        },

        //弹出金币
        CoinRollPrefab:
        {
            default:[],
            type:[cc.Prefab]
        },

        //各位置等待加入提示
        Wait4JoinPrefab:
        {
            default:null,
            type:cc.Prefab 
        },

        //闪电球
        LightningSphere:
        {
            default:null,
            type:cc.Prefab
        },

        //鱼潮来袭
        FishGroupComingPrefab:
        {
            default:null,
            type:cc.Prefab            
        },        
        
        Time:0,
        GenFishInterval:1,
    },

    getClassName()
    {
        return "Game";
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() 
    {
        fishManager.init(this);
        playerManager.init(this);
        bulletManager.init();
        this.init();

        //cc.log("WinSize width="+windowSize.width+",height="+windowSize.height);              

        //this.InitScreenUI();

        this.bLockMode = false;
        this.oLightningHit = null;
        this.oLockFish = null;

        //是否禁用Lock按钮，防止玩家连点
        this.bDisenableLockBtn = false;

        //待加入标志
        this.mapWait4Join = {}

        this.FishZIndex = {}

        Notification.Regsiter(NoticeDef.ChangeScene,this,this.onChangeScene);
        Notification.Regsiter(NoticeDef.EnterGame,this,this.onEnterGame);
        Notification.Regsiter(NoticeDef.GenFish,this,this.onGenFish);
        Notification.Regsiter(NoticeDef.GenBatchFishes,this,this.onGenBatchFishes);
        Notification.Regsiter(NoticeDef.SwitchFireMode,this,this.onSwitchFireMode);  
        Notification.Regsiter(NoticeDef.FishZIndex,this,this.onFishZIndex); 
        //Notification.Regsiter(NoticeDef.ClearFishZIndex,this,this.onClearFishZIndex);      
          
    },

    ClearFishZIndex()
    {
        this.FishZIndex = {}
    },

    GetCurCoinIcon()
    {
        cc.log("this.CoinIcon",this.CoinIcon);
        cc.log("this.CoinIcon[BaseDef.eCurPlatform];",this.CoinIcon[BaseDef.eCurPlatform]);
        return this.CoinIcon[BaseDef.eCurPlatform];
    },

    onFishZIndex(data)
    {
        if(!this.FishZIndex[data.fishtype]) {
            this.FishZIndex[data.fishtype] = {}
        }

        if(!this.FishZIndex[data.fishtype][data.zIndex]) {
            this.FishZIndex[data.fishtype][data.zIndex] = {}
        }

        if(!this.FishZIndex[data.fishtype][data.zIndex][data.ID]) {
            this.FishZIndex[data.fishtype][data.zIndex][data.ID] = true;
        }

        //this.FishZIndex[data.fishtype][data.zIndex]++;
        this.onRefreshZIndexInfo();

        cc.log("this.FishZIndex",this.FishZIndex);
    },

    onRefreshZIndexInfo()
    {
        this.sFishZIndexInfo = ""
        for(let ft in this.FishZIndex) {
            this.sFishZIndexInfo += "FishType:";
            this.sFishZIndexInfo += ft;
            this.sFishZIndexInfo += "--";
            let FishZIndexData = this.FishZIndex[ft];
            for(let fz in FishZIndexData) {
                this.sFishZIndexInfo += "ZIndex:";
                this.sFishZIndexInfo += fz;
                this.sFishZIndexInfo += " @ ";    
                let oFishSet =  FishZIndexData[fz];
                let count = 0;
                for (let fi in oFishSet) {
                    count++;
                }           
                this.sFishZIndexInfo += count;
            }
            this.sFishZIndexInfo += "\r\n";
        }

        debugManager.SetDebugInfo(this.sFishZIndexInfo);
    },

    CloseWait4Join(chair)
    {
        if(this.mapWait4Join[chair]){
            this.mapWait4Join[chair].active =false;
        }
    },

    ShowWait4Join(chair,pos)
    {
        if(!this.mapWait4Join[chair]){
            this.mapWait4Join[chair] = this.InstantiatePrefab(pos,this.Wait4JoinPrefab);
        }

        this.mapWait4Join[chair].active = true;        
    },

    //设置玩家自己，方便操作
    SetPlayerSelf(self)
    {
        this.playerSelf = self
    },

    LockFish(fish)
    {
        cc.log("lock fish",fish.ID)
        // if(this.oLockFish != null && this.oLockFish.ID != fish.ID)
        // {
        //     this.ReleaseFish(this.oLockFish);
        // }

        // if (this.oLightningHit == null)
        // {
        //     cc.log("new lightning~!!")
        //     this.oLightningHit = cc.instantiate(this.LightningHit);
        //     this.oLightningHit.zIndex = 3;
        //     this.node.addChild(this.oLightningHit)
        // }

        // //this.oLightningHit.active = true
        
        // this.oLightningHit.active = true;
        // fish.SetLightningHitEffect(this.oLightningHit);
        // this.oLightningHit.fishID = fish.ID;
        this.playerSelf.LockFish(fish);

        //this.oLockFish = fish;
    },

    SwitchFireMode2Manual()
    {
        this.SwitchLockMode(false);
        this.SwitchAutoMode(false);
    },

    SwitchFireMode2Auto()
    {
        this.SwitchLockMode(false);
        this.SwitchAutoMode(true);
    },

    SwitchFireMode2Lock()
    {
        this.SwitchLockMode(true);
        this.SwitchAutoMode(false);
    },

    onSwitchFireMode(emFireMode)
    {
        switch(emFireMode){
            case BaseDef.FireMode.Manual:
            this.SwitchFireMode2Manual();
            cc.log("Game BaseDef.FireMode.Manual")
            break;
            case BaseDef.FireMode.Auto:
            this.SwitchFireMode2Auto();
            cc.log("Game BaseDef.FireMode.Auto")
            break;
            case BaseDef.FireMode.Lock:
            this.SwitchFireMode2Lock();
            cc.log("Game BaseDef.FireMode.Lock")
            break;
        }
    },

    // ReleaseFish(fish)
    // {
    //     //cc.log("fish",fish.ID)
    //     //console.log(new Error().stack);

    //     // if (this.oLightningHit != null && fish.oLightningHit != null && fish.oLightningHit.fishID == this.oLightningHit.fishID)
    //     // {
    //     //     cc.log("reset lightning parent to gamenode!");
    //     //     //console.log(new Error().stack);
    //     //     //this.oLightningHit.parent = this.node;
    //     //     this.oLightningHit.active = false;
            
    //     // }

    //     // fish.oLightningHit = null;
    //     // if(this.oLockFish != null && this.oLockFish.ID == fish.ID)
    //     // {
    //     //     this.oLockFish.UnLock();
    //     //     this.oLockFish = null;
    //     // }

    //     this.playerSelf.ReleaseFish(fish);
    // },

    SwitchLockMode(enable)
    {
        this.bLockMode = enable;
        fishManager.EnableHitFish(enable);
        this.playerSelf.SwitchLockMode(enable);
        let cannontype = msg_pb.EmCannonType.NORMAL;
        if(enable)
        {
            cannontype = msg_pb.EmCannonType.TOWER;
        }     
        msgSender.sendCannonType(cannontype);
    },

    SwitchAutoMode(enable)
    {
        this.playerSelf.SwitchAutoMode(enable);
    },

    // InitScreenUI()
    // {
    //     this.lockMode =  this.node.getChildByName("LockMode"); 
    //     cc.log("lockbutton pos is",this.lockMode.x,this.lockMode.y);
    //     this.lockMode.zIndex = 20;
        
    //     let fnLockTouch = function(event)
    //     {            
    //         this.SwitchLockMode();
    //         cc.log("change lock mode~~~!",this.bLockMode);
    //         event.stopPropagation();
    //     }

    //     let fnLockTouchStart =  function(event)
    //     {
    //         event.stopPropagation();            
    //     }

    //     this.lockMode.on(cc.Node.EventType.TOUCH_END, fnLockTouch,this);
    //     this.lockMode.on(cc.Node.EventType.TOUCH_START, fnLockTouchStart,this);     
    // },

    //连上服务器才执行初始化函数
    init()
    {
        cc.log("切换到游戏场景，初始化碰撞管理器~");
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;                 

        //fishManager.genFishTest(0,0,cc.v2(0,0),1);

        //fishManager.genFishTest(1,0,cc.v2(100,100));
    },

    start () 
    {
        //debugManager.PopDebugPanel(this.node);
        playerManager.start();
        connection.setGame(this);        
        //connection.send("this is test message~!!!");
        //this.genFish();
        //cc.log("commTools.randomBool:" + commTools.randomBool());
        //this.PlayLightningChain(cc.v2(0,0),cc.v2(100,100))
    },

    PlayLightningChain(pos1,pos2)
    {
        cc.log("PlayLightningChain 11111")
        let lightning = cc.instantiate(this.LightningChain[0]);
        this.node.addChild(lightning,3)
        let rotation = commTools.CalAngel(pos1.x,pos1.y,pos2.x,pos2.y)
        lightning.setPosition(pos1);
        lightning.angle = rotation;
        length = pos1.sub(pos2).mag();
        lightning.height = length
        let lnaa = lightning.getComponent(cc.Animation);
        lnaa.play("thick");
        cc.log("PlayLightningChain 2222");

    },

    // PushPlayer(player)
    // {
    //     playerManager.PushPlayer(player);
    // },

    getNewFishPosition()
    {
        let randX = Math.random()* 100;
        let randY = Math.random()* 100;

        //randX = 0;
        //randY = 0;

        return cc.v2(randX, randY);
    },

    onEnterGame(msg)
    {
        this.eSceneState = msg.getSceneinfo().getState();
    },

    onChangeScene(msg)
    {
        this.ClearFishZIndex();
        //需要保存场景状态
        this.eSceneState = msg.getState();
    },

    onGenFish(msg)
    {
        // if(this.eSceneState != msg_pb.EmRoomRunState.EMRS_NORMAL)
        // {
        //     //如果场景状态不是普通，不作任何处理
        //     return;
        // }

        let arrPos = new Array();
        let listpos = msg.getTrack().getPosList();
        let tracktype = msg.getTrack().getType();
        for(let i in listpos)
        {
            arrPos.push(cc.v2(listpos[i].getX(), listpos[i].getY()));
            //cc.log("x,y",listpos[i].getX(),listpos[i].getY());
        }
    
        //cc.log("msg fish id",msg.getFishid())
        this.genFishFromMsg(msg.getFishid(),msg.getFishtype(),arrPos,tracktype,msg.getLivetime(),msg.getSpecialmark());
    },

    onGenBatchFishes(msg)
    {
        let fishes = msg.getFishesList();
        for(let i in fishes) {
            this.onGenFish(fishes[i])
        }
    },

    genFishFromMsg(finshID,finshType,arrPos,tracktype,liveTime,spcialmark)
    {
        //cc.log("genFishFromMsg arrPos",arrPos);
        fishManager.genFish(finshID,finshType,commTools.covertTrackCoord(arrPos),tracktype,liveTime,spcialmark)
    },

    PlayBlastAni(pos,zIndex)
    {   
        this.InstantiatePrefab(pos,this.BlastPrefab,zIndex);          
    },

    PopCoinScore(pos,score,scorePrefab,multiple)
    {
        let ScoreGain = cc.instantiate(scorePrefab);
        //cc.log("play pop Score",score);       
        this.node.addChild(ScoreGain,20);
        ScoreGain.setPosition(pos);
        //let scoreLabel = ScoreGain.getChildByName("ScoreLable");
        ScoreGain.getComponent(cc.Label).string = score.toFixed(2);
        // ScoreGain.setScale(0.1);
        // let fnScaleTo1 = cc.scaleTo(0.5,1.2);
        // let fnScaleTo2 = cc.scaleTo(0.5,1);
        // let fnScale = cc.sequence(fnScaleTo1,fnScaleTo2);
        let fnMoveup = cc.moveBy(1.5,cc.v2(0,200));
        fnMoveup.easing(cc.easeInOut(3));
        // let fnPopAction = cc.spawn(fnScale,fnMoveup);
        // fnPopAction.easing(cc.easeOut(3));
        let fnDestroy = cc.callFunc(ScoreGain.destroy, ScoreGain);
        //let fsAction = cc.sequence(fnPopAction,cc.delayTime(0.5),fnDestroy);  
        let fsAction; 
        if (multiple >= 100) {
            let scaleRepeat = cc.repeat(
                cc.sequence(
                    cc.scaleTo(0.5,1.2,1.2),
                    cc.scaleTo(0.5,1.8,1.8)
                ), 3);            
            fsAction = cc.sequence(fnMoveup,scaleRepeat,cc.fadeOut(0.5),fnDestroy);
        } else {
            fsAction = cc.sequence(fnMoveup,cc.fadeOut(0.5),fnDestroy);
        }  

        let SOUND_DEF = BaseDef.SOUND_DEF;

        if(multiple >= 500 ) {
            Notification.SendNotify(NoticeDef.PlayEffect,SOUND_DEF.SUD_CATCHBOSS);
        } else if(multiple >= 100) {
            Notification.SendNotify(NoticeDef.PlayEffect,SOUND_DEF.SUD_COINJUMP3);
        }  else if(multiple >= 10) {
            Notification.SendNotify(NoticeDef.PlayEffect,SOUND_DEF.SUD_COINJUMP2);
        } else {
            Notification.SendNotify(NoticeDef.PlayEffect,SOUND_DEF.SUD_COIN);
        }
        
        //let fsAction = cc.sequence(fnScaleTo1,fnScaleTo2);
        ScoreGain.runAction(fsAction);
        //cc.log("play pop Score end 555555~!!!!"); 
    },

    RandomCoinRollPosOffset(index,sum)
    {
        let x = 0;
        let y = 0; 
        let offset = 200;
        switch(sum) {
            case 1:
                y = offset;
                break;
            case 2:
                if(index == 0) {
                    x = -offset;
                } else {
                    x = offset;
                }
                break;
            case 3:
                switch(index) {
                    case 0:
                        x = -offset;
                        break;
                    case 1:
                        y = offset;
                        break;
                    case 2:
                        x = offset;                    
                }
        }
        // let x = 0;
        // let y = 50; //金币向上蹦出50像素
        // //然后再随机偏移
        // x += (Math.random() -0.5) * 100;  
        // y += (Math.random() -0.5) * 100;  
        
        return cc.v2(x,y);
    },

    PopCoinRollAni(pos,score,num,player)
    {        
        //cc.log("final coin num is",num);
        let prefabCoinRoll = this.CoinRollPrefab[0];
    
        if(num >= 10) {
            prefabCoinRoll = this.CoinRollPrefab[1];
            num /= 10;
            //cc.log("now coin set gold num is",num);
        }

        num = Math.ceil(num / 3);

        if(num > 3) {
            num  = 3;
        }

        for(let i=0;i<num;++i)
        {
            let CoinRoll = cc.instantiate(prefabCoinRoll);
            this.node.addChild(CoinRoll);
            let newPos = this.RandomCoinRollPosOffset(i,num);
            //生成坐标取下偏移量
            CoinRoll.setPosition(pos);  
            
            let fnMoveup = cc.moveBy(0.5,newPos);
            fnMoveup.easing(cc.easeOut(3.0))
            let fnMovetoPlayer = cc.moveTo(0.5,player.node.getPosition());
            let fnDestroy = cc.callFunc(CoinRoll.destroy, CoinRoll);
            let moveAni = cc.sequence(fnMoveup,cc.delayTime(0.5),fnMovetoPlayer,fnDestroy);
            CoinRoll.runAction(moveAni);         
        }

        let fnCallBack = function() 
        {
            // let SOUND_DEF = BaseDef.SOUND_DEF;
            // //cc.log("玩家分数变动",score)
            // if( num >= 100) {
            //     Notification.SendNotify(NoticeDef.PlayEffect,SOUND_DEF.SUD_COINBACK2);
            // } else {
            //     Notification.SendNotify(NoticeDef.PlayEffect,SOUND_DEF.SUD_COINBACK1);
            // }
            
            player.onScoreChange(score);
            player.AddPopScoreList(score);
            //this.PlayScoreSimple(player.node,score);
            //cc.log("玩家现在击杀鱼之后有 ",player.score,);
        }

        this.scheduleOnce(fnCallBack.bind(this),1.5);
        //cc.log("game call player.onScoreChange on timer");           
    },

    // PlayScoreSimple(node,score)
    // {
    //     //cc.log("PlayScoreSimple this.pos is",pos);
    //     let scoreLable = cc.instantiate(this.ScoreSimplePrefab);
    //     node.addChild(scoreLable);
    //     scoreLable.getComponent(cc.Label).string = "+" + score.toFixed(2) + "元";        
    // },

    PlayBubble(pos)
    {
        this.InstantiatePrefab(pos,this.BubblePrefab);   
    },

    PlayBlastCoin(pos)    
    {
        this.InstantiatePrefab(pos,this.BlastCoinPrefab,3);         
    },   
    
    PlayBlastCoinPlus(pos)
    {
        this.InstantiatePrefab(pos,this.BlastCoinPlusPrefab,3);        
    },

    PopCoin(pos,score,player,multiple)
    {    
        //cc.log("PopCoin multiple",multiple)
        let scorePrefab = this.ScoreSilverPrefab;
        if(multiple > 100) {
            this.PlayBlastCoinPlus(pos);
            scorePrefab = this.ScorePrefab;
        } else if(multiple >= 10) {
            this.PlayBlastCoin(pos);
            scorePrefab = this.ScorePrefab;
        } 
        this.PopCoinScore(pos,score,scorePrefab,multiple);
        //let num =  1 + multiple/10;
        //cc.log("num",num)
        this.PopCoinRollAni(pos,score,multiple,player);
    },

    FireBullet()
    {
        cc.log("FireBullet~~~~~");
    },

    //玩家入座，这个玩家表示客户端自己，如果是其它人用其它玩家“Other”表示
    PlayerSitdown(charid)
    {
        //所以，把该椅子玩家设为手动控制表示自己
        playerManager.SetPlayerModeToManual(charid)  
    },

    ClientSimGenFish(dt)
    {
       //cc.log("cur dt:" + dt);
       this.Time += dt;
       //cc.log("cur Time:" + this.Time);
       if (this.Time > this.GenFishInterval)
       {
           // //cc.log("commTools.randomBool:" + commTools.randomBool());            
           // let newBullet = cc.instantiate(this.BulletPrefab);
           // //cc.log("newFish name:" + newFish.name)
           // this.node.addChild(newBullet);  
           // newBullet.setPosition(100,100);

           this.genFish();
           this.Time = 0;
       }
    },

    onDestroy() {
        fishManager.onExitGame();
        playerManager.onExitGame();
        Notification.UnRegAll(this);
    },    

    update (dt)
    {
        //this.ClientSimGenFish(dt);
        fishManager.update(dt);
    },

    // covertTrackCoord(arrPos)
    // {
    //     //cc.log("covertTrackCoord~11111");

    //     //let arrRes = new Array(); 
    //     for(let i=0; i<arrPos.length;++i)
    //     {
    //         //arrRes.push(commTools.convertCoord(arrPos[i]));
    //         arrPos[i].x = commTools.convertPosX(arrPos[i].x);
    //         arrPos[i].y = commTools.convertPosY(arrPos[i].y);

    //     }

    //     // for(let i=0;i<arrPos.length;++i)
    //     // {
    //     //     //cc.log("converted Res pos",arrRes[i].x,arrRes[i].y);
    //     //     //cc.log("converted Src Pos",arrPos[i].x,arrPos[i].y);
    //     // }

    //     return arrPos;
        
    // },      

  //生成出点和轨迹,以后这个函数的内容从服务器接收，由服务器实现
    // genPosAndTrack()
    // {//考虑到最终坐标是由服务器发过来，先简单考虑一种点的表示方法。
    // //由于在cocos中坐标0，0在屏幕正中心，用-0.5~0.5表示屏幕内全部坐标，超出这个坐标则在屏幕外
    // //X=-0.5表示在屏幕最左边，X=0.5表示在屏幕最右边，y=-0.5表示屏幕最下边，y=0.5表示屏幕最上边。
    // //为了让鱼都能在屏幕外产生并且尽可能通过屏幕长路径而不是在屏幕边缘路径很快通过，起止点订规则如下
    // //为了保证起止点均在屏幕外，起点坐标必需在区间-0.5~0.5之外，终点坐标直接起点坐标取反
    // //途经点在区间-0.3~0.3之间取点，尽量让鱼儿游到屏幕中，速度问题在鱼儿身上说明。

    //     let arrPos = new Array();
    //     //具体取点尊循这样的规则，先确定x和y哪条坐标在屏幕之外，在屏幕之外只取值-0.6和0.6.然后另条坐标在-0.6和0.6之间随机
    //     let startx = 0;
    //     let starty = 0;

    //     //我们这样来随机点，先来两个数，一个直接取 0.6或-0.6。另一个在-0.5~0.5之间取值。
    //     //稍后来看这两个数哪个当Y，哪个当X
    //     let num1 = 0.8;
    //     let num2 = Math.random() - 0.5;

    //     if(commTools.randomBool())
    //     {
    //         num1 *= -1;
    //     }

        
    //     if(commTools.randomBool())
    //     {
    //         startx = num1;
    //         starty = num2;
    //     }
    //     else
    //     {
    //         startx = num2;
    //         starty = num1;
    //     }
    //     let endx = -startx;
    //     let endy = -starty;
    //     //cc.log("startPos:",startx,starty);
    //     //cc.log("endPos:",endx,endy);

    //     arrPos.push(cc.v2(startx, starty));

    //     //缩放活动区域，如果写1，则在满屏幕中取中间点，如果0.5，则在屏幕中一半的位置，如果0.1则在屏幕中心1/10的区域
    //     //以此类推
    //     let scaleArea = 0.6;

    //     //起止点取了，现在来取中间一个点，取值从-0.3~0.3(现在这个位置用scaleArea控制);
    //     //先把区间-0.5把从0~1变成从-0.5~0.5,然后乘以0.6就刚好在区间内
    //     for(let i=0;i<1;++i)
    //     {
    //         let midx = (Math.random() - 0.5) * scaleArea;
    //         let midy = (Math.random() - 0.5) * scaleArea;
    //         //cc.log("midPos",midx,midy);
    //         arrPos.push(cc.v2(midx, midy));
    //     }

    //     arrPos.push(cc.v2(endx, endy));

    //     return arrPos;
    // },
 
    // genFish()
    // {   
    //     //cc.log("this.FishPrefab.length:" + this.FishPrefab.length);

    //     let nIndex = Math.round(Math.random() * 100) % this.FishPrefab.length;
    //     //cc.log("nIndex:" + nIndex);

    //     fishManager.genFish(0,nIndex,this.covertTrackCoord(this.genPosAndTrack()))
        
    //     // let PrefabFish = this.FishPrefab[nIndex];        
    //     // //let PrefabFish = this.FishPrefab[1];        
    //     // cc.log("PrefabFish name:" + PrefabFish.name)
    //     // let aniIndex = PrefabFish.name.substring(7,9);
    //     // cc.log("AniIndex:" + aniIndex);

    //     // let newFish = cc.instantiate(PrefabFish);
    //     // cc.log("newFish name:" + newFish.name)
    //     // //let aniFish = newFish.getComponent(cc.Animation);
    //     // // cc.log("aniFish name:" + aniFish.name)
        
    //     // //aniFish.play('Fish' + aniIndex);
    //     // // 将新增的节点添加到 Canvas 节点下面
    //     // this.node.addChild(newFish);
    //     // // 为鱼设置一个随机位置
    //     // newFish.setPosition(this.getNewFishPosition());        
    // },  
});
