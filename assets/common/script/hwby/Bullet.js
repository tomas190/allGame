// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var bulletManager = require('BulletManager')
var BaseDef = require('BaseDef');
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
        //cc.log("bullet onload")
        this.speed = 5;

        let windowSize=cc.winSize;
        //cc.log("WinSize width="+windowSize.width+",height="+windowSize.height);

        this.leftLimit = -windowSize.width/2;
        this.rightLimit = windowSize.width/2;
        this.topLimit = windowSize.height/2;
        this.bottomLimit = -windowSize.height/2;

        //子弹基本分数
        this.score = 1;

        bulletManager.AddBullet(this);

        //为真表示已经命中鱼，不能再命中其它鱼。。
        this.bHited = false;

        //用时间而不是帧数来控制移动速度
        this.abletime = 0;
    },

    //设置是否已经为命中状态
    setHited(bHited)
    {
        this.bHited = bHited;
    },

    //是否还能命中鱼
    CanHitFish()
    {
        //只要没命中过就能命中鱼
        return !this.bHited;
    },

    setScore(score)
    {        
        this.score = score;
    },

    setPlayer(player)
    {
        this.player = player;
        this.player.onBulletFire();
    },


    setSpeed(speed)
    {
        this.speed =  speed;
    },

    //杀死鱼传入所得分
    killFish(score)
    {
        
    },

    setGameNode(game)
    {
        this.gameNode = game;
    },

    setRunPos(srcPos,desPos)
    {
        this.srcPos = srcPos;
        this.desPos = desPos;

        //cc.log("this.srcPos",srcPos.x,srcPos.y);
        //cc.log("this.desPos",desPos.x,desPos.y);

        this.BresenhamInit();

        for (let i=0;i<100;i++)
        {
            this.moveStep();
        }
    },

    //采用Bresenham算法走直线，先初始化
    BresenhamInit()
    {
        cc.log("BresenhamInit~~!!!");
        this.dataBresenham = {};
        this.dataBresenham.dx = this.desPos.x - this.srcPos.x;//x偏移量
        this.dataBresenham.dy = this.desPos.y - this.srcPos.y;//x偏移量
        this.dataBresenham.ux = this.dataBresenham.dx >0 ? 1:-1;//x伸展方向
        this.dataBresenham.uy = this.dataBresenham.dy >0 ? 1:-1;//y伸展方向
        this.dataBresenham.dx2 = this.dataBresenham.dx <<1;//x偏移量乘2
        this.dataBresenham.dy2 = this.dataBresenham.dy <<1;//y偏移量乘2
        this.dataBresenham.dx = Math.abs(this.dataBresenham.dx);
        this.dataBresenham.dy = Math.abs(this.dataBresenham.dy);

        this.dataBresenham.e = 0;

        // if(this.dataBresenham.dx>this.dataBresenham.dy)
        // {//以x为增量方向计算
        //     this.dataBresenham.e = -this.dataBresenham.dx; //e = -0.5 * 2 * dx,把e 用2 * dx* e替换             
        // }
        // else
        // {//以y为增量方向计算
        //     this.dataBresenham.e = -this.dataBresenham.dy; //e = -0.5 * 2 * dy,把e 用2 * dy* e替换
        // }

        this.node.setPosition(this.srcPos); 
    },

    start() 
    {
        //cc.log("bullet start")        
    },

    doBlast()
    {
        //cc.log("doBlast on",this.player.chair);
        let gameScript = this.gameNode.getComponent("Game");
        gameScript.PlayBlastAni(this.node.getPosition(),this.node.zIndex);
        Notification.SendNotify(NoticeDef.PlayEffect,BaseDef.SOUND_DEF.SUD_BOOM);

        //cc.log("bullet player OnBulletBlast!zIndex",this.node.zIndex);
        //cc.log("bullet parent",this.node.getParent());
        this.player.OnBulletBlast();
        
        //cc.log("hit fish",other.node.name);
        this.node.destroy();    
    },

    //玩家离场时调用
    onPlayerLeavaDestroy()
    {
        this.doBlast();
        if(this.player.isPlayerSelf()) {
            this.player.onScoreChange(this.score);            
        }
    },

    onCollisionEnter(other, self)
    {
        //console.log('on collision enter');
        //this.doBlast()
        this.node.getComponent(cc.Collider).enabled = false; 
        bulletManager.DelBullet(this.id);
        //this.player.BulletHitFish();  
    },

    moveStep()
    {
        if(this.dataBresenham.dx>this.dataBresenham.dy)
        {
            //cc.log("run by x~~~~dy is",this.dataBresenham.dy)
            this.node.x += this.dataBresenham.ux;
            this.dataBresenham.e += this.dataBresenham.dy;
            if(this.dataBresenham.e << 1 > this.dataBresenham.dx)
            {   
                //cc.log("y add this.dataBresenham.uy",this.dataBresenham.uy);                
                this.node.y += this.dataBresenham.uy;
                //cc.log("cur y is",this.node.y);
                this.dataBresenham.e -= this.dataBresenham.dx;
            }
        }
        else
        {
            //cc.log("run by y~~~~dx is",this.dataBresenham.dx);
            this.node.y += this.dataBresenham.uy;
            this.dataBresenham.e += this.dataBresenham.dx;
            if(this.dataBresenham.e << 1 > this.dataBresenham.dy)
            {
                //cc.log("x add this.dataBresenham.ux",this.dataBresenham.ux);       
                this.node.x += this.dataBresenham.ux;
                //cc.log("cur x is",this.node.x);
                this.dataBresenham.e -= this.dataBresenham.dy;
            }
        }

        //cc.log("cur pos",this.node.x,this.node.y);

        //好了，到这里位为止，已经可以用bresenham算法让炮弹走直线，我们现在考虑一下边界反弹
        //如果已经在x边界，ux取反
        //如果已经在y边界，uy取反
        //但是角度要分四种情况处理
        if(this.node.x >= this.rightLimit)
        {
            if(this.dataBresenham.ux > 0) 
            {
                this.dataBresenham.ux *= -1;
                this.node.angle *= -1;
            }

        }
        else if(this.node.x <= this.leftLimit)
        {
            if(this.dataBresenham.ux < 0) 
            {
                this.dataBresenham.ux *= -1;
                //this.node.scaleX *= -1;
                this.node.angle *= -1;
            }            

        }

        if( this.node.y >= this.topLimit)
        {
            if(this.dataBresenham.uy > 0)
            {
                this.dataBresenham.uy *= -1;
                //this.autoAdjustAngelByTop();
                this.node.angle = 180 - this.node.angle;
            }

        }
        else if(this.node.y <= this.bottomLimit)
        {
            if(this.dataBresenham.uy < 0)
            {
                this.dataBresenham.uy *= -1;
                //this.node.scaleY *= -1;
                this.node.angle = -180 - this.node.angle;
            }
        }
    },

    update (dt) 
    {
        //cc.log("dt",dt);        
        this.abletime += dt;
        //cc.log("this.abletime",this.abletime);

        while(this.abletime > 0.0015) {
            this.moveStep();
            this.abletime -= 0.0015;
        }
    },
});
