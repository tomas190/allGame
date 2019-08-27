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
var Notification = require('Notification');
var NoticeDef = require('NoticeDef');

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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        //cc.log("this node name:" + this.node.name);
        // let curPos = this.node.getPosition();
        // cc.log("cannon pos",curPos.x,curPos.y);
        // let worldPos = this.node.convertToWorldSpaceAR(curPos)
        // cc.log("convert world pos",worldPos.x,worldPos.y);

        this.BulletSpeed = 10,
        this.bulletscore = 10,        

        //如果处于按下状态，持续开炮
        this.bPressed = false;

        //如果处于自动模式，持续开炮
        this.bAutoMode = false;

        //this.posTarget = this.node.getPosition();

        this.fireInterval = 0.2;
        this.fireTime = 0;

        this.node.getParent().zIndex = 20;

        //每次子弹消费分数
        //cc.log("Cannon init bulletscore to 10~!!");
        //this.bulletscore = 10;
        
        this.player = this.node.getParent().getComponent("Player");
        this.Anicompent = this.node.getComponent(cc.Animation);

        this.saveTargetPos(cc.v2(cc.winSize.width/2,cc.winSize.height/2));
    },

    CalBulletFirePos()
    {
        let x = this.node.getParent().x + this.node.x;
        let y = this.node.getParent().y + this.node.y;   
        //cc.log("this cannon srcBulletPos",x,y);     
        this.srcBulletPos = cc.v2(x,y);
    },

    //初始化监听事件
    initTouchListen()
    {
        let touchReceiver = cc.Canvas.instance.node;
        touchReceiver.on('touchstart', this.onTouchStart, this);
        touchReceiver.on('touchmove', this.onTouchMove, this);        
        touchReceiver.on('touchend', this.onTouchEnd, this);
        touchReceiver.on('touchcancel', this.onTouchEnd, this);   
    },

    setAutoMode(bAuto)
    {
        this.bAutoMode = bAuto;
    },

    setControlMode(mode)
    {
        this.controlMode = mode;
        if(this.controlMode == BaseDef.PlayerMode.Manual )
        {
            this.initTouchListen();
        }
    },

    setBulletScore(score)
    {
        //cc.log("cannon set bullet score",score);
        this.bulletscore = score;
    },

    ActiveFireStart(pos)
    {
        let x = pos.x * cc.winSize.width;
        let y = pos.y * cc.winSize.height;
        let screenPos = cc.v2(x,y);
        this.saveTargetPos(screenPos);
        this.bPressed = true;
    },

    ActiveFireEnd()
    {
        this.bPressed = false;
    },

    LightningChainChage()
    {
        cc.log("test calangel",this.srcBulletPos.x,this.srcBulletPos.y,this.posBulletTarget.x,this.posBulletTarget.y)
        let nAngel = commTools.CalAngel(this.srcBulletPos.x,this.srcBulletPos.y,this.posBulletTarget.x,this.posBulletTarget.y);
        cc.log("angel",nAngel)
        this.LtChain.angle = -(nAngel + 90);
        let nLtclen = this.srcBulletPos.sub(this.posBulletTarget).mag();
        this.LtChain.height = nLtclen
        
    },

    ActiveLightning()
    {
        this.LtChain = cc.instantiate(this.LightningChain[0]);
        this.gameNode.addChild(this.LtChain,3); 
        this.LtChain.getComponent(cc.Animation).play("thick")
        this.LtChain.setPosition(this.srcBulletPos)
        this.LightningChainChage()
    },

    StopLightning()
    {

    },

    

    FireOnce(bNeedCost)
    {
        // cc.log("FireOnce~！！！！！1111");
        if(this.player.CanFireBullet())
        {
            this.CalBulletFirePos();
            //cc.log("FireOnce~！！！！！22222");
            let newBullet = cc.instantiate(this.BulletPrefab);
            //cc.log("newFish name:" + newFish.name)
            this.gameNode.addChild(newBullet,3);  
            //这里需要设子弹的原始位置，实际上子弹和炮台都是挂在game节点中，只是炮台位于game的子节点内
            //拿取所有子节点的坐标相加
            //let x = this.node.getParent().getParent().x + this.node.getParent().x + this.node.x;
            //let y = this.node.getParent().getParent().y + this.node.getParent().x + this.node.y;
            //cc.log("bullet src pos",this.srcBulletPos.x,this.srcBulletPos.y);
            newBullet.setPosition(this.srcBulletPos); 

    
            //图片本身需要再转90度，如果本身角度加90度已经超过360，直接减270。。
            //因为现面炮管也需要转，所以在算角度时一起转了，这里不再转了
            cc.log("this.node.angle",this.node.angle);
            newBullet.angle = this.node.angle;
            
            let scriptBullet = newBullet.getComponent("Bullet");
            
            scriptBullet.setRunPos(this.srcBulletPos,this.posBulletTarget);
            //scriptBullet.setRunPos(this.srcBulletPos,this.posTarget);
            scriptBullet.setSpeed(this.BulletSpeed);
            scriptBullet.setGameNode(this.gameNode);
            scriptBullet.setPlayer(this.player);
            scriptBullet.setScore(this.bulletscore);
    
            if(bNeedCost) {
                this.player.onScoreChange(-this.bulletscore);  
            }
            
            
            this.Anicompent.play("Shoot");   
            Notification.SendNotify(NoticeDef.PlayEffect,BaseDef.SOUND_DEF.SUD_SHOOT);
            
            return true;
        }

        return false;

        // cc.log("FireOnce~！！！！33333");
    },

    saveTargetPos(pos)
    {
        this.screenPos = pos
        this.posTarget = this.node.getParent().convertToNodeSpaceAR(pos);
        //cc.log("touhc cannon x,y",this.posTarget.x,this.posTarget.y);

        //posTarget是相对炮台底坐的位置，子弹是添加在game节点上，还要再取父节点的偏移
        this.posBulletTarget = cc.v2(this.posTarget.x,this.posTarget.y);
        this.posBulletTarget.x += this.node.getParent().x;
        //this.posBulletTarget.x += this.node.getParent().getParent().x;

        this.posBulletTarget.y += this.node.getParent().y;
        //this.posBulletTarget.y += this.node.getParent().getParent().y;    
        //cc.log("Bullet Target pos",this.posBulletTarget.x,this.posBulletTarget.y)    
    },

    onTouchStart(event)
    {
        let touchLoc = event.getLocation();
        //cc.log("touch x,y",touchLoc.x,touchLoc.y);
        this.saveTargetPos(touchLoc);
        
        //cc.log("touhc cannon111 x,y",this.posTarget.x,this.posTarget.y);

        this.bPressed = true;

        //this.ActiveLightning();
        //this.lockfish = null;
        // this.LightningChainChage();
        //this.onFire();
    },

    onTouchMove(event)
    {
        if (this.bPressed)
        {
            let touchLoc = event.getLocation();
            this.saveTargetPos(touchLoc);            
            //this.LightningChainChage()            
        }
        
        //cc.log("touhc cannon222 x,y",this.posTarget.x,this.posTarget.y);
        //cc.log("touch x,y",touchLoc.x,touchLoc.y);        
        //this.posTarget = this.node.getParent().convertToNodeSpaceAR(touchLoc);
        //cc.log("touhc cannon x,y",posLocal.x,posLocal.y);
    },

    onTouchEnd()
    {
        this.bPressed = false;
        this.fireTime = 0;
    },    

    PlayShootEnd()
    {
        this.Anicompent.play("Normal");
    },

    start () {
        this.gameNode = this.node.getParent().getParent();
        cc.log("3rd parent:",this.gameNode.name)
        let gameScript = this.gameNode.getComponent("Game");        
        this.BulletPrefab = gameScript.BulletPrefab; 

        //this.CalBulletFirePos();
    },

    //主动开火一次，一般是响应服务器端消息
    ActiveFireOnce(pos)
    {
        let x = pos.x * cc.winSize.width;
        let y = pos.y * cc.winSize.height;
        let screenPos = cc.v2(x,y);
        this.saveTargetPos(screenPos);

        this.AdjustRotation();

        this.player.onScoreChange(-this.bulletscore); 

        this.FireOnce(false);
    },    

    onFire()
    {
        if (this.FireOnce(true))
        {
            //这里开始发射击消息到服务器端
            //只需要发送目标点坐标，转换成百分比用由0到1的浮点数表示
            if (this.player.isPlayerSelf())
            {
                //只有自己才发消息
                //cc.log("this.posBulletTarget",this.screenPos.x,this.screenPos.y)
                let pos = commTools.revConvertPos(this.screenPos);
                //cc.log("onFire",pos.x,pos.y)
                msgSender.sendFire(pos);                  
            }              
        }       
    },

    AdjustRotation()
    {
        let nAngel = commTools.CalAngel(this.node.x,this.node.y,this.posTarget.x,this.posTarget.y);
        //cc.log("res angel:",nAngel);

        if(nAngel > 270)
        {
            nAngel = nAngel - 270;            
        }   
        else
        {
            nAngel =  nAngel + 90; 
        }

        this.node.angle = -nAngel;
    },

    update (dt) 
    {
        if(this.bPressed || this.bAutoMode)
        {
            //cc.log("cal angel:",this.node.x,this.node.y,this.posTarget.x,this.posTarget.y);
            this.AdjustRotation()

            if(this.fireTime == 0)
            {
                this.onFire();
            }             

            this.fireTime += dt;
            if(this.fireTime > this.fireInterval)
            {
                this.fireTime = 0;
            }                             
        }
    },
});
