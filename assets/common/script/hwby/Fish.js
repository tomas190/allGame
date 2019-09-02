// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var commTools = require('CommTools');
var playerManager = require('PlayerManager');
var fishManager = require('FishManager');
var BaseDef = require('BaseDef');
var NoticeDef = require('NoticeDef');
var Notification = require('Notification');
var msg_pb = require('msg_pb_by');

const FishType = {
    SpiderCrab:18,
    Sturgeon:20,
}


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
        NotRoot:{
            default:false,
            displayName:"非根节点",
            tooltip: "如果鱼不是此预制的根节点，闪红等操作需要寻找子节点'fish'进行",            
        },
        bAllBlinkRed:{
            default:false,
            displayName:"整体闪红",
            tooltip: "勾选此标记，对鱼的所有节点都作闪红操作",     
        },
        flipX:{
            default:false,
            displayName:"水平翻转",
            tooltip: "如果有朝向修正，可能需要决定这条鱼在大概横行移动时在是否进行相对原图的水平翻转。",
        },
        flipY:{
            default:false,
            displayName:"垂直翻转",
            tooltip: "如果没有朝向修正，可能需要决定这条鱼在大概横行移动时在是否进行相对原图的垂直翻转。",
        },

        ration_fix:{
            default: 0,
            displayName: "角度修正",
            tooltip: "有一些鱼的图片并不是头向右，需要最终修正一个角度使其运时头朝向运动方向。",
        },

        fix_rotation:{
            default:false,
            displayName:"固定朝向",
            tooltip: "有一些鱼朝向需要固定不变，比如大螃蟹",
        },
        
        DeadRation:{
            default: 0,
            displayName: "死亡旋转",
            tooltip: "如果死亡动画不够丰富，可以增加死亡时旋转一个角度。",            
        },

        DeadShake:{
            default: false,
            displayName: "死亡抖动",
            tooltip: "选中后，死亡以抖动方式进行，默认播放爆炸动画。",   
        },
   
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad ()
    {
        //cc.log("this onLoad of fish~!!!");
        //this.node.runAction(cc.moveBy(3,300,300));
        //cc.log("this fish name is " + this.node.name);
        this.aniIndex = this.node.name.substring(7,9);        
        this.AniComponet = this.node.getComponent(cc.Animation);

        if(this.NotRoot) {
            this.FishNode = this.node.getChildByName("Fish");
            this.AniComponet = this.node.getComponent(cc.Animation);
        }

        this.bDestroyed = false;

        this.posTrack = new Array();
        this.bAlive = true;

        this.score = 10;

        this.oLightningHit = null;

        //锁定有点复杂，要看一下有几个电塔在锁定自己，把玩家ID和电塔本身都引用住算了
        //锁定此鱼的玩家
        this.arrLockTower = [];
        //如果没有一个人锁定，则为非锁定状态
        this.bLocked = false;

        //如果处于逃跑状态，不再使用原始速度
        this.bEscape = false;

        //两秒钟逃跑
        this.uEscapetime = 2;

        //this.node.on(cc.Node.EventType.TOUCH_START, fnDecTouchStart,this);   
        
        //气泡时间控制
        this.BubbleTimectl = 0;     
        
        //blink red控制
        this.BlinkRedTimectl = 0;

        //this.nOriZIndex 保存原始的Z坐标
        this.nOriZIndex = 1;

        //是否在屏幕中
        this.bInScreen = true;

        this.sRes = "";
    },

    onBubbleUpdate(dt) {
        this.BubbleTimectl += dt;
        if(this.BubbleTimectl > 1) {
            this.game.PlayBubble(this.node.getPosition());
            this.BubbleTimectl = 0;
            

            // if(!this.bEscape) {
            //     let msg = {}
            //     msg.fishtype =  this.fishType;
            //     msg.zIndex = this.node.zIndex;
            //     msg.ID = this.ID;
            //     Notification.SendNotify(NoticeDef.FishZIndex,msg);
            // }
        }
    },      

    setType(type)
    {
        this.fishType = type;
    },

    setID(id)
    {
        this.ID = id;
        var BorenDate = new Date();
        this.borenTime = BorenDate.getTime();
    },    

    MarkSelf()
    {
        let node = this.GetRootNode();
        node.stopAllActions();
        node.scale = 10;

        var nowDate = new Date();
        cc.log("this fish type:",this.fishType);
        cc.log("fish born time:",this.borenTime);
        cc.log("now time:",nowDate.getTime());
        cc.log("have live time:",nowDate.getTime() - this.borenTime);        
    },

    GetFishNode() {
        let node = this.node;
        if(this.NotRoot) {
            node = this.FishNode;
        }

        return node;
    },

    ShowCoord()
    {
        let node = this.GetFishNode();

        //cc.log("this fish pos is ",node.getPosition());
        let x = node.getPosition().x;
        let y = node.getPosition().y;
        let perx = x/cc.winSize.width;
        let pery = y/cc.winSize.height;
        cc.log("this pos relative parent pos percent is",perx,pery);
    },

    ShowTarckInfo()
    {
        cc.log("ShowTarckInfo fishtype",this.fishType);
        //cc.log(this);
        //cc.log("tracklines:",this.TrackLines);
        let totaltime = 0;
        let desc = "fish " + this.fishType + "time step:"
        if (this.TrackLines)
        {
            for (let i=0;i<this.TrackLines.length;i++) {
                desc += i + ":" + this.TrackLines[i].time;
                totaltime += this.TrackLines[i].time
            }
        }
        else
        {
            desc += "this is fishgroup fish for Cricle~!"
        }
 

        desc += "all time is " + totaltime;
        cc.log(desc);
    },

    enabledHit(bEnable)
    {
        // let fnTouchme = function(event)
        // {
        //     cc.log("hit fish~~~",this.node.name,this.ID);
        //     this.Lockme()
        //     //event.stopPropagation();
        // }

        // let fnDecTouchStart =  function(event)
        // {
        //     //event.stopPropagation();            
        // }   
        
        
        let node = this.GetFishNode();
    
        if (bEnable)
        {
            //cc.log("start on touch fish~!",this.ID);
            //this.node.on(cc.Node.EventType.TOUCH_END, fnTouchme,this);
           
            node.on(cc.Node.EventType.TOUCH_END, this.Lockme,this);
        }
        else
        {
            //cc.log("off touch fish~!",this.ID);
            node.off(cc.Node.EventType.TOUCH_END, this.Lockme,this);
        }
        
    },

    // SetLightningHitEffect(aniEffect)
    // {
    //     this.oLightningHit = aniEffect
    //     //this.oLightningHit.parent = this.node
    // },

    //检查是否仍在屏幕中
    CheckInScreen()
    {
        this.bInScreen = true;
        // cc.log("this fish node.x",this.node.x);
        // cc.log("Math.abs(this.node.x)",Math.abs(this.node.x))
        // cc.log("cc.winSize.width * 0.6:",cc.winSize.width * 0.6);

        // cc.log("this fish node.y",this.node.y);
        // cc.log("cc.winSize.height * 0.6:",cc.winSize.height * 0.6);  

        if (Math.abs(this.node.x) > cc.winSize.width * 0.6)
        {
            this.bInScreen = false;
        } 
        else if(Math.abs(this.node.y) > cc.winSize.height * 0.6)
        {
            this.bInScreen = false;
        }

        return this.bInScreen
    },

    Lockme(event)
    {
        //cc.log("lock fish~!",this.ID);
        event.stopPropagation();
        if(this.CheckInScreen()) {
            this.game.LockFish(this);
        }
                               
    },

    Locked(chair,tower)
    {        
        cc.log("fish call locked",chair);
        this.arrLockTower[chair] = tower;
        this.bLocked = true;
        this.node.zIndex = 3;
        
        

        this.GetFishNode().color = new cc.Color(255, 0, 0);
        this.CheckFollowFishNodeColor();
    },

    GetLockTowerNum()
    {
        let length = 0;
        //cc.log("this.arrLockTower.length",this.arrLockTower.length);
        for(let i in this.arrLockTower) {
            length++;
            //cc.log("this.arrLockTower[i]",i,this.arrLockTower[i]);
        }        
        return length;
    },

    UnLock(chair,bDead)
    {
        cc.log("fish call unlock~!");
        if(!bDead){
            cc.log("fish call unlock~1111!",chair);
            delete this.arrLockTower[chair];
            
            if(this.GetLockTowerNum() == 0){
                this.bLocked = false;
                this.GetFishNode().color = new cc.Color(255, 255, 255);
                this.CheckFollowFishNodeColor();
                
                this.node.zIndex = this.nOriZIndex;
            }             
        }
         
      
        
    },

    ReleaseLockTower(bResetColor) {        
        if (this.bLocked){
            for(let i in this.arrLockTower){
                this.arrLockTower[i].ReleaseFish(this,true);
            }

            this.arrLockTower = [];

            this.node.zIndex = this.nOriZIndex;

            
            if (bResetColor && !this.bDestroyed) {
                this.GetFishNode().color = new cc.Color(255, 255, 255);   
                this.CheckFollowFishNodeColor(); 
            }         
         
        }
    },    

    setGame(game)
    {
        this.game = game;
    },

    haveLightningMark()
    {
        if (this.spcialmark & msg_pb.EmSpcialFishMark.EMSFM_KILLOTHERS != 0)
        {
            return true;
        }

        return false;
    },

    IsBossAnglerFish() 
    {
        //cc.log("this.spcialmark",this.spcialmark);
        let rst = this.spcialmark & msg_pb.EmSpcialFishMark.EMSFM_FISHMARK02;
        //cc.log("this.spcialmark & msg_pb.EmSpcialFishMark.EMSFM_FISHMARK02:",rst );
        if (rst != 0)
        {
            //cc.log("111111111111111111111111111");
            return true;
        }

        return false;        
    },

    IsBossSturgeon() 
    {
        //cc.log("this.spcialmark",this.spcialmark);
        let rst = this.spcialmark & msg_pb.EmSpcialFishMark.EMSFM_FISHMARK04;
        //cc.log("this.spcialmark & msg_pb.EmSpcialFishMark.EMSFM_FISHMARK02:",rst );
        if (rst != 0)
        {
            //cc.log("111111111111111111111111111");
            return true;
        }

        return false;        
    },    

    GenLightningShere()
    {

        let node = this.GetFishNode();
        let lnSphere = cc.instantiate(this.game.LightningSphere);
        // cc.log("newFish.width:",this.node.width);
        // cc.log("newFish.height:",this.node.height);        

        // cc.log("lnSphere.width:",lnSphere.width);
        // cc.log("lnSphere.height:",lnSphere.height);   
        
        let scaleX = node.width/lnSphere.width;
        let scaleY = node.height/lnSphere.height;
        //lnSphere.width = newFish.width;
        //lnSphere.height = newFish.height;
        let scalef = scaleX > scaleY?scaleX:scaleY;

        lnSphere.setScale(scalef);

        node.addChild(lnSphere);           
    },

    //引用的资源，在死亡时要看释放.
    SetRes(sRes)
    {
        this.sRes = sRes;
    },

    setSpcialMark(spcialmark)
    {
        this.spcialmark = spcialmark
        //cc.log("this.spcialmark:",this.spcialmark)
        if(this.haveLightningMark())
        {//如果是特殊鱼，产生闪电球
            this.GenLightningShere();
        }
    },

    setTriggerLightning(triggerLightning)
    {
        //由其它鱼打过来的触发闪电，自己dstroy的时候要一并删除
        this.TriggerLightning = triggerLightning;
    },

    LightningStrike(other)
    {
        //cc.log("other.node.x",other.node.x);
        //cc.log("other.node.y",other.node.y);
        let LtChain = cc.instantiate(this.game.LightningChain[1]);
        this.game.node.addChild(LtChain,3);  
        let node = this.node;
        let srcPos =  node.getPosition()
        LtChain.setPosition(srcPos);

        let nAngel = commTools.CalAngel(srcPos.x,srcPos.y,other.node.x,other.node.y); 
        //cc.log("nAngel",nAngel)
        LtChain.angle = -(nAngel + 90);
        let nLtclen = LtChain.position.sub(other.node.position).mag();
        cc.log("nLtclen:",nLtclen);
        LtChain.height = nLtclen;
        other.setTriggerLightning(LtChain);
    },

    //闪电球爆炸，命中其它同类鱼
    LightningSphereBlast(others)
    {
        //cc.log("lightning others",others);
        
        for(let i in others)
        {
            if (others[i].ID != this.ID)
            {
                //cc.log("lightning to fish ",others[i].ID)
                this.LightningStrike(others[i]);
            }
        }
    },

    onKilled(charid,score,multiple)
    {
        let killer = playerManager.getPlayer(charid);
        this.finalscore = score;
        //cc.log("this.finalscore",this.finalscore);
        this.multiple = multiple;
        this.killer = killer;
        //cc.log("set fish.multiple to",this.multiple)
        this.DoDead(); 
    },

    PlayCatchSound() {
        //有三成的机率播放语音
        if (Math.random() > 0.95) {
            let SOUND_DEF = BaseDef.SOUND_DEF;
            let resID = SOUND_DEF.SUD_CATCHFISH01;
            switch(this.ID%3) {
                case 0:
                    resID = SOUND_DEF.SUD_CATCHFISH01;
                    break;
                case 1:
                    resID = SOUND_DEF.SUD_CATCHFISH02;
                    break;
                case 2:
                    resID = SOUND_DEF.SUD_CATCHFISH03;
                    break;
            }

            Notification.SendNotify(NoticeDef.PlayEffect,resID);
        }        
    },

    EnableFish(bEnable)
    {
        this.GetFishNode().getComponent(cc.Collider).enabled = bEnable;   
        this.enabledHit(bEnable);

        if(!bEnable) {
            this.ReleaseLockTower(true);
        }        
    },

    DoDead()
    {
        //cc.log("doDead~~~!!");        
        this.bAlive = false;
        let node = this.node;
        //this.ReleaseLockTower();
        node.stopAllActions();
        this.ReadyDead(false);   
        this.PlayCatchSound();
        //this.PopCoin();  
        //this.GetFishNode().getComponent(cc.Collider).enabled = false;   
        //this.enabledHit(false);
        this.EnableFish(false);
    },

    ScoreAddPlayer()
    {
        //cc.log("ScoreAddPlayer~~!!!");
    },

    PopCoin()
    {
        let node = this.node;
        //cc.log("this",this);
        //cc.log("this.finalscore:",this.finalscore);
        //cc.log("this.killer:",this.killer);
        this.game.PopCoin(node.getPosition(),this.finalscore,this.killer,this.multiple);
    },

    onPlayDeadEnd()
    {
        //cc.log("Fish " + this.ID + " call PlayDeadEnd go to destroy~!!!");
        if(this.killer) {
            this.PopCoin();
        }
        
        this.node.destroy();
    },

    CheckFollowFishNodeColor()
    {
        if(this.bAllBlinkRed)
        {
            //cc.log("CheckFollowFishNodeColor is true~!!!");
            let node = this.node;
            let children = node.children;
            for(let i in children)
            {
                children[i].color = node.color;                
            }            
        }
    },

    //被命中的时候闪烁红色
    BlinkRed()
    {
        //cc.log("BlinkRed~~~!!!!");
        //被命中会吐泡泡
        let node = this.GetFishNode();
        this.onBubbleUpdate(0.5);    
        node.color = new cc.Color(255, 0, 0);
        this.BlinkRedTime = 0.2;
        this.CheckFollowFishNodeColor();
  
    },

    onBlinkRedTick(dt)
    {
        if(this.BlinkRedTime > 0) {
            this.BlinkRedTime -= dt;
            if ( this.BlinkRedTime <= 0) {
                let node = this.GetFishNode();                
                node.color = new cc.Color(255, 255, 255);  
                this.CheckFollowFishNodeColor();          
            }
        }
    },

    onCollisionEnter(other, self)
    {
        //cc.log("onCollisionEnter 111111111111111");
        if(this.bAlive)
        {
            //cc.log("onCollisionEnter 222222222222222 ");
            let scriptbullet = other.node.getComponent("Bullet");
            if(scriptbullet.CanHitFish())
            {
                //cc.log("onCollisionEnter 3333333333333333333 ");
                scriptbullet.player.BulletHitFish(this.ID,scriptbullet.score,scriptbullet.id); 
                scriptbullet.setHited(true);

                
                //cc.log("this fish zIndex",this.node.zIndex);
                //cc.log("fish parent",this.node.getParent());

                this.BlinkRed();
            }
            
            //console.log('on collision enter by fish~!!');
            // if(Math.random() < 0.05)
            // {
            //     //cc.log("by killed bullet",other.node.name);
            //     let scriptbullet = other.node.getComponent("Bullet");
            //     scriptbullet.player.BulletHitFish(scriptbullet.score);     
            //     //cc.log("this.score")             
            //     this.finalscore = this.score * scriptbullet.score; 
            //     //scriptbullet.player.onScoreChange(this.finalscore);                     
            //     this.DoDead(scriptbullet.player);
            // }
        }        
    },  
    
    autoAdjustDirction(tx,ty)
    {
        //计算鱼的角度
        //cc.log("fish cal angel",this.node.x,this.node.y,tx,ty)
        let node = this.node;
        let nAngel = commTools.CalAngel(node.x,node.y,tx,ty);

        nAngel += this.ration_fix;

        if (nAngel > 360){
            nAngel -= 360;
        }
               
        if ((this.flipY) && (nAngel > 90 && nAngel < 270)) {
            //cc.log(this.node.name,"flipY");
            node.runAction(cc.flipY(true));
        } 

        if((this.flipX) && (nAngel > 180 && nAngel < 360)){
            //cc.log(this.node.name,"flipX");
            node.runAction(cc.flipX(true));
        }
                            

        //cc.log("set new rotation:" + nAngel);
        
        if (this.bDircteRotation )
        {   
            //如果是旋转鱼阵，就不要转向动画了。。。
            node.angle = -nAngel;
        }
        else
        {
            node.runAction(cc.rotateTo(0.5,nAngel));
        }

        //this.node.rotation = nAngel;
    },

    //设置步长时间
    SetTimePerstep(time)
    {
        //使用步长时间标志
        this.bUseSteptime = true;
        //步长时间
        this.uSteptime = time;
    },

    SetDircteRotation(bDircte)
    {
        this.bDircteRotation = bDircte
    },

    //设置循环轨迹,start为开始步，end为结束步，从0到length - 1表示每一个点
    //end可以以负数表示，-1表示倒数第二个点，即length - 2，end为零表示最后一个点即length-1 
    //time表示循环次数，为1表示多循环从start到end一遍
    SetCirclestep(start,end,times,Steptime)
    {
        this.bUseCircle = true;
        this.bDircteRotation = true;
        this.uStartCircleStep = start;

        this.uCircleTimes = times;
        //循环内步长时间
        this.uCircleSteptime = Steptime;

        //进入循环
        this.bEnterCircle = false;

        if(end < 0) {
            this.uEndCircleStep = this.posTrack.length - 1 + end;
        }else if(end == 0) {
            this.uEndCircleStep = this.posTrack.length - 1;
        } else if( end > 0 ) {
            this.uEndCircleStep = end;
        }        
    },

    //这个函数要在设置轨迹之后调用，然后来计算每条路径需要多少时间
    SetLiveTime(liveTime)
    {
        //cc.log("setLiveTime:",liveTime);
        //记录每段长度
        this.TrackLines = [];

        this.liveTime = liveTime;
        let startPos = this.posTrack[0];
        //路径总长
        let totallength = 0;

        for (let i=1;i<this.posTrack.length;i++){
            let endPos = this.posTrack[i];
            this.TrackLines[i-1] = {};
            this.TrackLines[i-1].linlen = endPos.sub(startPos).mag();
            totallength += this.TrackLines[i-1].linlen;
            startPos = endPos;
        }

        for (let i=0;i<this.TrackLines.length;i++) {
            let percent = this.TrackLines[i].linlen/totallength;
            //cc.log("percent:",percent);
            this.TrackLines[i].time = this.liveTime * percent;

            //cc.log(i,"linlen:",this.TrackLines[i].linlen);
            //cc.log(i,"time:",this.TrackLines[i].time);
        }        
    },

    moveStep()
    {
        //cc.log(this.ID,"moveStep~~11111111111111111");
        let node = this.node;
        node.runAction(cc.flipY(false));
        // if(this.IsBossAnglerFish()) {
        //     cc.log("this.posTrack.length",this.posTrack.length);
        //     cc.log("this.nMoveStep",this.nMoveStep);
        // }
        
        if( this.nMoveStep < this.posTrack.length)
        {
            let pos = this.posTrack[this.nMoveStep];
            //cc.log("pos index:" + this.nMoveStep + " pos:" + pos.x + " " + pos.y);
            let time = 5;

            if(this.bEscape) {
                time = 1.5;
                // if(this.posTrack.length > this.nMoveStep) {
                //     time = 1/(this.posTrack.length - this.nMoveStep);
                // } else {
                //     time = 1;
                // }
                
                //cc.log("rest time:",time);
            } else {
                //如果有步长时间使用步长时间
                if(this.bUseSteptime) {
                    //如果进入循环步长内，采用循环步长时间
                    if (this.bEnterCircle) {                        
                        time = this.uCircleSteptime;
                    } else {
                        //否则单步步长时间
                        time = this.uSteptime;
                    }                                      
                } else {
                    time = this.TrackLines[this.nMoveStep - 1].time;
                }                                
            }

            let fnMoveto = cc.moveTo(time,pos);
            this.nMoveStep++;

            // if(this.IsBossAnglerFish()) {
            //     cc.log("this.posTrack.length",this.posTrack.length);
            //     cc.log("this.nMoveStep",this.nMoveStep);
            //     cc.log("this.nMoveStep >= this.posTrack.length",this.nMoveStep >= this.posTrack.length)
            // }            


            if(this.nMoveStep >= this.posTrack.length) {
                this.CheckCloseDark();
            }

            if (this.bUseCircle && this.uCircleTimes > 0)
            {
                if(this.nMoveStep >= this.uStartCircleStep)
                {
                    this.bEnterCircle = true;
                    if (this.nMoveStep == this.uEndCircleStep)
                    {
                        this.nMoveStep = this.uStartCircleStep;
                        this.uCircleTimes--;
                    }                    
                }
            }

            if(this.uCircleTimes == 0 && this.nMoveStep > this.uEndCircleStep)
            {
                this.bEnterCircle = false;
            }

            let callback = cc.callFunc(this.moveStep, this);
            node.runAction(cc.sequence(fnMoveto, callback));

            if(!this.fix_rotation) {
                this.autoAdjustDirction(pos.x,pos.y);
            }
            
        }
        else
        {
            this.ReadyDead(true);
        }

        //cc.log(this.ID,"moveStep~~22222222222222222");
    },

    setTrack(arrPos,tracktype)
    {
        let node = this.node;
        this.posTrack = arrPos;
        this.eTrackType = tracktype;

        //cc.log("pos",this.posTrack);
        //第一个点直接当出生坐标
        node.setPosition(arrPos[0].x,arrPos[0].y);
        this.nMoveStep = 1;
    },    

    playAniMove()
    {        
        this.AniComponet.play('Normal');        
    },

    playAniMovebyChangeSpeed(speed)
    {
        //cc.log(this.ID,"playAniMovebyChangeSpeed~~~")
        if(this.IsBossSturgeon()) {
            //cc.log(this.ID,"playAniMovebyChangeSpeed~1111111111111111")
            this.SturgeonExit();
        } else {
            //cc.log(this.ID,"playAniMovebyChangeSpeed~2222222222222222")
            let aniState = this.AniComponet.play('Normal');            
            aniState.speed = speed;
            //cc.log(this.ID,"playAniMovebyChangeSpeed",aniState.speed);
        }

    },

    ReadyDead(bDircte) {
        if(bDircte) {
            this.onPlayDeadEnd();
        } else {
            this.playAniDead();
        }       
    },

    // ReadyDead(bDircte) {
    //     cc.log("ReadyDead~~~!!!",bDircte)
    //     if(bDircte){
    //         if(this.IsBossAnglerFish()){
    //             cc.log("onPlayDeadEnd~11111111!!!")
    //             let callback = cc.callFunc(this.onPlayDeadEnd, this); 
    //             this.FadeOut4MaskLayer(callback);
    //         } else {               
    //             this.onPlayDeadEnd();
    //         }
                       
    //     } else {
    //         if(this.IsBossAnglerFish()){
    //             cc.log("playAniDead~11111111!!!")
    //             let callback = cc.callFunc(this.playAniDead, this); 
    //             this.FadeOut4MaskLayer(callback);
    //         } else {
    //             this.playAniDead();
    //         }
    //     }
    // },

    onAddBlastToSelf() {
        //cc.log("onAddBlastToSelf 11111111111111111");  
        let x = (Math.random() - 0.5) * this.node.width/2;
        let y = (Math.random() - 0.5) * this.node.height/2;
        let pos = cc.v2(x,y);
        let blast = cc.instantiate(this.game.BlastPrefab)
        this.node.addChild(blast);
        blast.setPosition(pos);
    },

    onDeadShakeOnce(dt) {
        //cc.log("onDeadShakeOnce 1111111111111111",this.nAbleTime4DeadShake);
        this.nAbleTime4DeadShake += dt;    
        if(this.nAbleTime4DeadShake >= 0.2) {
            //cc.log("onDeadShakeOnce 2222222222222222222");
            this.nAbleTime4DeadShake = 0;
                        
            if (this.nShakeCount > 0 && this.bDeadAniReadyOK)
            {        
                //cc.log("onDeadShakeOnce 33333333333333333");                
                this.nShakeCount--;           
                this.onAddBlastToSelf();
    
                let oriPos = this.GetFishNode().getPosition();
                this.bDeadAniReadyOK = false;
                let shakeLeft = cc.moveBy(0.02,cc.v2(-10,-10));
                let shakeRestore = cc.moveTo(0.02,oriPos);
                let shakeRight = cc.moveBy(0.02,cc.v2(10,10));
                let callback = function() {
                    this.bDeadAniReadyOK = true;
                }
                let execb = cc.callFunc(callback,this);
                            
                let actionf = cc.sequence(shakeLeft,shakeRestore,shakeRight,shakeRestore,execb);
                //this.node.runAction(actionf);
                this.GetFishNode().runAction(actionf);
                if(this.nShakeCount ==  1 && !this.IsBossSturgeon()) {
                    cc.log("destroy 4444444444444444444");      
                    //this.AniComponet.resume("Normal");
                    this.AniComponet.resume();
                }        
            }
            else
            {     
                cc.log("destroy 555555555555555555555");              
                this.onPlayDeadEnd();
            }            

        }
  
    },

    SpeicalDead()
    {
        cc.log("SpeicalDead ！！！！！！！！！！！！！");
        //this.AniComponet.pause("Normal");
        this.AniComponet.pause();
        this.nShakeCount = 10;
        this.nAbleTime4DeadShake = 0.1;
        this.bDeadAniReadyOK = true;
    },
    
    playAniDead()
    {
        this.CheckCloseDark();

        //cc.log("playAniDead~~!!!",this.spcialmark);


        if (this.DeadShake) {
            this.SpeicalDead();

        } else {
            this.AniComponet.play("Dead");
        }

        let node = this.node;

        if(this.DeadRation != 0) {
            node.runAction(cc.rotateBy(0.5,this.DeadRation));
        }                      
    },

    FadeOut4MaskLayer() {
        cc.log("FadeOut4MaskLayer");
        this.bInDark = false;
        let masknode = this.node.getChildByName("Shadow_AnglerFish");
        masknode.runAction(cc.fadeTo(0.5,0));
    },

    FadeIn4MaskLayer() {
        this.bInDark = true;
        let masknode = this.node.getChildByName("Shadow_AnglerFish");
        masknode.runAction(cc.fadeTo(0.5,200));
    },

    SturgeonEnd() {
        this.nMoveStep++;
        if(this.nMoveStep * 2 + 1 > this.posTrack.length) {
            this.onPlayDeadEnd();
        } else {
            this.SturgeonEnter();
        }
    },

    SturgeonExit() {
        this.EnableFish(false);
        // this.enabledHit(false);
        // this.GetFishNode().getComponent(cc.Collider).enabled = false;
        // this.ReleaseLockTower();
        this.SturgenState = 3;
        this.AniComponet.play("Exit");
    },

    SturgeonSwiming() {
        this.SturgenState = 2;
        let animState = this.AniComponet.play("Swiming");
        let time = animState.duration;
        cc.log("animState.speed",animState.speed);
        time /= animState.speed;
        cc.log("play swiming time",time);
        
        let posPair = this.GetPosPair4Sturgeon();
        let pos = posPair[1];
        let fnMoveto = cc.moveTo(time,pos);
        //this.autoAdjustDirction(pos.x,pos.y);    
        this.node.runAction(fnMoveto);
    },

    onPlayFinished() {
        switch(this.SturgenState) {
            case 1:
                this.SturgeonSwiming();
                break;
            case 2:
                this.SturgeonExit();
                break;
            case 3:
                this.SturgeonEnd();
                break;
        }
    },

    StartSturgeonAction() {
        this.nMoveStep = 0;
        this.SturgeonEnter();
    }, 

    GetPosPair4Sturgeon() {
        let step = this.nMoveStep * 2;
        let posPair = [];
        posPair[0] = this.posTrack[step];
        posPair[1] = this.posTrack[step + 1];
        return posPair;
    },

    SturgeonEnter() {
        this.SturgenState = 1;

        this.EnableFish(true);

        // this.enabledHit(true);
        // this.GetFishNode().getComponent(cc.Collider).enabled = true;        

        let posPair = this.GetPosPair4Sturgeon();

        this.node.setPosition(posPair[0].x,posPair[0].y);
        let pos = posPair[1];
        this.autoAdjustDirction(pos.x,pos.y);

        this.AniComponet.on('finished',  this.onPlayFinished,    this); 
        this.AniComponet.play("Enter");
    },

    DrawDebugLine() {
        if (this.bNeedDrawDebugLine && this.CheckInScreen())
        {
            let graphics = this.node.getParent().getComponent(cc.Graphics);
            graphics.lineWidth = 2;
            graphics.strokeColor.fromHEX('#ff0000');   
            
            cc.log("DrawDebugLine start",this.posTrack);           
            for(let i=1;i<3;i++) {
                graphics.moveTo(this.posTrack[i].x,this.posTrack[i].y);
                graphics.lineTo(this.posTrack[i+1].x,this.posTrack[i+1].y);            
    
            }            
            graphics.stroke();  
    
            graphics.strokeColor.fromHEX('#00ff00'); 
            graphics.moveTo(this.posTrack[1].x,this.posTrack[1].y);
            graphics.quadraticCurveTo(this.posTrack[2].x,this.posTrack[2].y,this.posTrack[3].x,this.posTrack[3].y);

            cc.log("DrawDebugLine end",this.posTrack);            
            
            graphics.stroke();  
        }
    },    

    ArcMove() 
    {
        if(this.posTrack.length > 2) {
            // let winSize = cc.winSize;
            // //放大弧度
            // if(this.posTrack[1].x > 0) {
            //     this.posTrack[1].x += winSize.width;
            // } else {
            //     this.posTrack[1].x -= winSize.width;
            // }

            // if(this.posTrack[1].y > 0) {
            //     this.posTrack[1].y += winSize.height;
            // } else {
            //     this.posTrack[1].y -= winSize.height;
            // }

            this.bNeedDrawDebugLine = true;

            //cc.log("fix pos start",this.posTrack);
            
            // if ( this.posTrack[1].x > 0) {
            //     this.posTrack[1].x += cc.winSize.width/3;
            // } else {
            //     this.posTrack[1].x -= cc.winSize.width/3;
            // }

            // if ( this.posTrack[1].y > 0) {
            //     this.posTrack[1].y += cc.winSize.height/3;
            // } else {
            //     this.posTrack[1].y -= cc.winSize.height/3;
            // }       
                
            // this.posTrack[1].x *= 2;
            // this.posTrack[1].y *= 2;
            //cc.log("fix pos end",this.posTrack);

            //this.DrawDebugLine();
            let tmpArr = new Array();
            for(let i = 1;i<=3; i++) {
                tmpArr.push(cc.v2( this.posTrack[i].x,  this.posTrack[i].y));
            }
            let fnMoveto1 = cc.moveTo(3, this.posTrack[1]);  
            let fnMoveto = cc.bezierTo(this.liveTime, tmpArr);  
            let fnMoveto2 = cc.moveTo(3, this.posTrack[4]);  
            let callback = cc.callFunc(this.ReadyDead, this);
            this.node.runAction(cc.sequence(fnMoveto1,fnMoveto,fnMoveto2,callback));  
        } else {
            let fnMoveto = cc.moveTo(this.liveTime, this.posTrack[1]);  
            let callback = cc.callFunc(this.ReadyDead, this);
            this.node.runAction(cc.sequence(fnMoveto, callback));              
        }
 
        this.nLastX = this.node.x;
        this.nLastY = this.node.y;                        
    },

    AutoAdjustRotation()
    {
        let node = this.node;
        let nAngel = commTools.CalAngel(this.nLastX,this.nLastY,node.x,node.y);

        this.nLastX = this.node.x;
        this.nLastY = this.node.y;          

        nAngel += this.ration_fix;

        if (nAngel > 360){
            nAngel -= 360;
        }
               
        if ((this.flipY) && (nAngel > 90 && nAngel < 270)) {
            //cc.log(this.node.name,"flipY");
            node.runAction(cc.flipY(true));
        } 

        if((this.flipX) && (nAngel > 180 && nAngel < 360)){
            //cc.log(this.node.name,"flipX");
            node.runAction(cc.flipX(true));
        }

        node.angle = -nAngel;
    },

    IsBezierTarck()
    {
        return this.eTrackType == 1;
    },

    SetZIndex(zIndex) {
        this.nOriZIndex = zIndex;
        this.node.zIndex = zIndex;        
    },    

    ScaleIn(times)
    {
        this.bScaleIn = true;
        this.node.scale = 0;
        let scaleup = cc.scaleTo(times,1,1);
        this.node.runAction(scaleup);
    },

    startActionByNormal() {
        switch(this.eTrackType) {
            case 0:
                this.SetZIndex(1);
                this.nMoveStep = 1;
                this.moveStep();
                break;
            case 1:
                this.SetZIndex(1);
                this.ArcMove();
                break;
            case 2:
                this.SetZIndex(2);                
                this.ScaleIn(2);
                break;
        }
            
        if(this.IsBossAnglerFish()){
            this.SetZIndex(2);
            this.FadeIn4MaskLayer();
        } 
      
    },

    startAction()
    {
        //this.playAniMove();
        //cc.log("startAction",this.runtime);
        if(this.game.eSceneState == msg_pb.EmRoomRunState.EMRS_NORMAL) {
            switch(this.fishType) {
                case FishType.Sturgeon:    //黄金虎鲨                    
                    this.SetZIndex(1);    
                    this.StartSturgeonAction();
                    break;
                case FishType.SpiderCrab:    //大螃蟹                    
                    this.SetZIndex(1);    
                    this.nMoveStep = 1;
                    this.moveStep();
                    break;
                default:
                    this.startActionByNormal();
            }
        } else {
            switch(this.eTrackType) {
                case 0:
                    this.SetZIndex(1);                        
                    this.nMoveStep = 1;
                    this.moveStep();
                    break;
                case 1:
                    this.SetZIndex(1);                        
                    this.ArcMove();
                    break;
                case 2:
                    this.SetZIndex(2);                        
                    this.ScaleIn(2);
                    break;
            }
        }



        // if(this.IsBossSturgeon()) {
        //     this.StartSturgeonAction();
        //     //this.SturgeonEnter();
        // } else {
        //     if(this.IsBezierTarck()) {
        //         this.ArcMove();

        //         //this.nMoveStep = 1;
        //         //this.moveStep();                
        //     } else {
        //         this.nMoveStep = 1;
        //         this.moveStep();
        //     }

        //     if(this.IsBossAnglerFish()){
        //         this.node.zIndex = 2;
        //         this.FadeIn4MaskLayer();
        //     } else {
        //         this.node.zIndex = 1;
        //     }
        // }
    },

    RushToEnd()
    {
        //cc.log(this.ID,"RushToEnd~~~~",this.bAlive);
        if(this.bAlive) 
        {
            //cc.log(this.ID,"1111111111111111111")
            if(this.bScaleIn) {
                //cc.log(this.ID,"2222222222222222")
                this.EnableFish(false);
                let scaleout = cc.scaleTo(1,0,0);
                let fdestroy = cc.callFunc(this.ReadyDead,this);
                this.node.runAction(cc.sequence(scaleout,fdestroy));

            } else {
                //cc.log(this.ID,"333333333333333333333")
                this.node.stopAllActions();
                this.bEscape = true;
                this.nMoveStep = this.posTrack.length - 1;
                this.moveStep(); 
                //cc.log(this.ID,"44444444444444444")
                this.playAniMovebyChangeSpeed(2);
            }
        }
    },

    start()
    {
        //cc.log("this start of fish~!!!");
        // let windowSize=cc.winSize;
        // cc.log("WinSize width="+windowSize.width+",height="+windowSize.height);
        // let halfwidth = windowSize.width/2;
        // let halfheight = windowSize.height/2;

        // this.posTrack.push(cc.v2(-halfwidth, 0));
        // this.posTrack.push(cc.v2(-halfwidth,halfheight));
        // this.posTrack.push(cc.v2(halfwidth,halfheight));
        // this.posTrack.push(cc.v2(halfwidth,-halfheight));
        // this.posTrack.push(cc.v2(-halfwidth,-halfheight));
        // this.posTrack.push(cc.v2(-halfwidth,0));
    },

    onDestroy()
    {
        this.bDestroyed = true
        this.ReleaseLockTower(false);
        
        //cc.log("Fish " + this.ID + " onDestroy!! ready DelFish for self from fishManager!!!");
        fishManager.DelFish(this);
        if(this.TriggerLightning)
        {
            this.TriggerLightning.destroy();
        }

        if(this.BlinkRedTimerId)
        {
            clearTimeout(this.BlinkRedTimerId);
            this.BlinkRedTimerId =  null;
        }
        
        //cc.log("onDestroy",this.ID)
    },

    CheckCloseDark() {
        if(this.bInDark && this.IsBossAnglerFish()) {
            this.FadeOut4MaskLayer();      
        }
    },

    

    update (dt)
    {
        try {
            //在游戏中要随机吐泡泡
            if(this.game) {
                this.onBubbleUpdate(dt);
            }    

            if(this.IsBezierTarck())
            {
                this.AutoAdjustRotation();
            }
            
            //如果已经死亡要死亡振动（如果有的话）
            if(!this.bAlive) {
                this.onDeadShakeOnce(dt);
            }

            //如果在锁定中要检查是否在屏幕中
            if(this.bLocked) {
                this.CheckInScreen();
            } else {
                //如果非锁定鱼要进行，闪红检查
                this.onBlinkRedTick(dt);
            }            

        } catch(e) {

        }
    }

});
