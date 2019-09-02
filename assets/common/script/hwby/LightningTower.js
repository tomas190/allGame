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
var BaseDef = require('BaseDef');
var msgSender = require('msgSender');
// var Notification = require('Notification');
// var NoticeDef = require('NoticeDef');
var SoundPlayCtrl = require('SoundPlayCtrl');

cc.Class({
    extends: cc.Component,
    mixins:[SoundPlayCtrl],

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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {        
        this.node.active = false;
        this.LtChain = null;   
        this.LtHitEffect = null;

        cc.log("111111111111111111111111LightingTower onload~~~!!!");

        this.player = this.node.getParent().getComponent("Player");
    },

    start () 
    {
        this.gameNode = this.node.getParent().getParent();
        let gameScript = this.gameNode.getComponent("Game");
        this.LightningChain = gameScript.LightningChain;
        cc.log("this.LightningChain",this.LightningChain);
        this.LightningHit =  gameScript.LightningHit;
    },

    onTouchEnd()
    {
        cc.log("Tower onTouchEnd~~!!!");
        this.Release();
    },

    //初始化监听事件
    initTouchListen()
    {
        let touchReceiver = cc.Canvas.instance.node;
        //touchReceiver.on('touchstart', this.onTouchStart, this);
        //touchReceiver.on('touchmove', this.onTouchMove, this);        
        touchReceiver.on('touchend', this.onTouchEnd, this);
        touchReceiver.on('touchcancel', this.onTouchEnd, this);   
    },   
    
    setControlMode(mode)
    {
        this.controlMode = mode;
        if(this.controlMode == BaseDef.PlayerMode.Manual )
        {
            this.initTouchListen();
        }
    },
    

    //计算原点
    CalOriPos()
    {
        let offY = 116;
        if(this.chair > 1) {
            offY = -116;
        }

        let x = this.node.getParent().x + this.node.x;
        let y = this.node.getParent().y + this.node.y + offY;   
        cc.log("this cannon srcBulletPos",x,y);     
        this.srcBulletPos = cc.v2(x,y);            
    },

    setChair(chair)
    {
        this.chair = chair;
        //this.CalOriPos();      
    },

    LockFish(fish)
    {
        //this.StopEffectSound();

        this.CalOriPos();

        cc.log("Tower lock fish~~",fish.ID);
        this.PlaySoundCustom(BaseDef.SOUND_DEF.SUD_LASER);
   
        if(this.lockfishid !=  fish.ID )
        {
            cc.log("ready release fish~!")
            if (this.lockfish && this.lockfish.bAlive)
            {
                cc.log("unlock fish~!")
                this.lockfish.UnLock(this.chair,false);
            }
            

            fish.Locked(this.chair,this);
            //cc.log("11111111111111111")
            this.lockfish = fish
            this.lockfishid = fish.ID


            //生成闪电链~~
            if(this.LtChain == null)
            {
                this.LtChain = cc.instantiate(this.LightningChain[0]);
                this.gameNode.addChild(this.LtChain,4);
                this.LtChain.getComponent(cc.Animation).play("thick");
            }

            this.LtChain.active = true;                 
            this.LtChain.setPosition(this.srcBulletPos)     
                        

            //在鱼身上生成闪电命中特效
            if(this.LtHitEffect == null)
            {
                this.LtHitEffect = cc.instantiate(this.LightningHit); 
                this.gameNode.addChild(this.LtHitEffect,5);    
            }            
            
            this.LtHitEffect.active = true;            
            //fish.SetLightningHitEffect(this.LtHitEffect);           
        }
        
    },

    CloseTower()
    {
        this.Release();

        if(this.LtChain != null) {
            this.LtChain.destroy();
            this.LtChain = null;
        }

        if(this.LtHitEffect != null) {
            this.LtHitEffect.destroy();
            this.LtHitEffect = null
        }

        if(this.lockfish)
        {
            this.lockfish.UnLock(this.chair);
            this.lockfish = null;
            this.lockfishid = null;               
        }
    },

    Release()
    {
        if (this.LtChain && this.LtHitEffect) {
            this.LtChain.active = false;
            this.LtHitEffect.active = false;
        }

        if(this.lockfish)
        {
            this.lockfish.UnLock(this.chair,false)  
           //如果是玩家自己要发消息通知取消锁定
           if(this.player.isPlayerSelf())
            {
                msgSender.sendLockFish(0);
            }  
            
            this.player.StopBodyFire();
        }
        this.lockfish = null;
        this.lockfishid = null;  
        
        this.StopEffectSound();

        
    },

    ReleasePure()
    {
    
        //this.LtChain.destroy()
        if (this.LtChain && this.LtHitEffect) {
            this.LtChain.active = false;
            this.LtHitEffect.active = false;
        }

        //如果是玩家自己要发消息通知取消锁定
        if(this.player.isPlayerSelf()) {
            msgSender.sendLockFish(0);
        }

        this.player.StopBodyFire();

        this.lockfish = null;
        this.lockfishid = null;

       this.StopEffectSound();

    },

    ReleaseFish(fish,bDead)
    {
        cc.log("ReleaseFish:",fish.ID);
        if( fish.ID == this.lockfishid)
        {
            fish.UnLock(this.chair,bDead);
            //this.LtChain.destroy()
            if (this.LtChain && this.LtHitEffect) {
                this.LtChain.active = false;
                this.LtHitEffect.active = false;
            }

            //如果是玩家自己要发消息通知取消锁定
            if(this.player.isPlayerSelf()) {
                msgSender.sendLockFish(0);
            }

            this.player.StopBodyFire();

            this.lockfish = null;
            this.lockfishid = null;

            this.StopEffectSound();
        }
    },

    LightningEffectUpdate()
    {                 
        //cc.log("lightning cal angel",this.srcBulletPos.x,this.srcBulletPos.y,this.lockfish.node.x,this.lockfish.node.y)
        if(this.lockfish.node) {
            let nAngel = commTools.CalAngel(this.srcBulletPos.x,this.srcBulletPos.y,this.lockfish.node.x,this.lockfish.node.y); 
            //cc.log("nAngel",nAngel)
            this.LtChain.angle = nAngel + 90;
            let nLtclen = this.LtChain.position.sub(this.lockfish.node.position).mag();
            this.LtChain.height = nLtclen;    
            
            this.LtHitEffect.setPosition(this.lockfish.node.getPosition());
        } else {
            this.Release();
        }

    },

    onDestroy() {
        this.StopEffectSound();
    },

    update (dt) 
    {
        if(this.lockfish) {
            try{
                if(this.lockfish.bInScreen && this.lockfish.bAlive)
                {
                    if(this.LtChain && this.LtHitEffect)
                    {
                        this.LightningEffectUpdate();
                    }
                }
                else
                {
                    this.Release();
                }
            } catch(e) {
                cc.log(e);
                this.ReleasePure();
            }
        }
    },
});
