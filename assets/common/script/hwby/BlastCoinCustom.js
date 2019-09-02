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

cc.Class({
    extends: cc.Component,

    properties: {
        Coin:
        {
            default:null,
            type:cc.Prefab
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.Anictrl = this.node.getComponent(cc.Animation);    
        this.radius = 800;   
        this.Fadeoutradius = 500; 
        this.arrCricyPos = [];
        this.arrCricyFadePos = [];
        this.Cricystep = 32;

        //发射数
        this.EmitMax = 5;
        //当前数
        this.EmitCount = 0;

        //发射时间间隔
        this.Emitinterval = 0.1;
        //间隔
        this.abletime = 0;       

        //圆24等分
        for(let i=0;i<this.Cricystep;i++)
        {
            let radian = 2 * Math.PI/this.Cricystep * i;// 2*PI/32 = PI/16
            let x = this.radius * Math.cos(radian);
            let y = this.radius * Math.sin(radian);
            this.arrCricyPos.push(cc.v2(x,y));
        }  
        
        for(let i=0;i<this.Cricystep;i++)
        {
            let radian = 2 * Math.PI/this.Cricystep * i;// 2*PI/32 = PI/16
            let x = this.Fadeoutradius * Math.cos(radian);
            let y = this.Fadeoutradius * Math.sin(radian);
            this.arrCricyFadePos.push(cc.v2(x,y));
        }         
    },

    EmitCoin360() {
        for(let i in this.arrCricyPos) {
            let coin = cc.instantiate(this.Coin);
            coin.scale = 0.5;
            
            let pos = this.arrCricyFadePos[i];
            let nAngel = commTools.CalAngel(0,0,pos.x,pos.y);
            coin.angle = -(nAngel + 90);
            this.node.getParent().addChild(coin,4);
            coin.setPosition(this.node.getPosition());

            let action1 = cc.moveBy(1,pos);
            //action1.easing(cc.easeInOut(3));
            let actionfade = cc.fadeOut(0.5);
            let aciontmove = cc.moveBy(0.5,this.arrCricyPos[i]);
            let action2 = cc.spawn(actionfade,aciontmove);
            let fnDestroy = cc.callFunc(coin.destroy, coin);
            let actionf = cc.sequence(action1,action2,fnDestroy);
            coin.runAction(actionf);
        }
    },

    PlayCoinBlast() {
        
    },

    Close() {
        this.node.destroy();
    },

    start () {
        this.Anictrl.on("finished",this.Close,this);
        this.Anictrl.play("BlastCoinBig");
    },

    update (dt) {
        this.abletime += dt;
        if(this.abletime > this.Emitinterval && this.EmitCount < this.EmitMax) {
            this.abletime = 0;
            this.EmitCount++;
            this.EmitCoin360();
        }
    },
});
