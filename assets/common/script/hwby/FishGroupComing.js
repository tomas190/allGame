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
var Notification = require('Notification');
var NoticeDef = require('NoticeDef');

cc.Class({
    extends: cc.Component,

    properties: {
        ArrowPrefab:
        {
            default:null,
            type:cc.SpriteFrame
        },          
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.log("pop fishgroupcoming~~~");
        this.PlayArrowAniTime = 0;
        this.nAbleTime = 0;
    },

    ArrowMoving(offx,flipX) {       
        let arrow=new cc.Node('ArrowNode');
        //调用新建的node的addComponent函数，会返回一个sprite的对象  
        const sprite=arrow.addComponent(cc.Sprite); 
        //给sprite的spriteFrame属性 赋值  
        sprite.spriteFrame=this.ArrowPrefab;

        arrow.runAction(cc.flipX(flipX));

        //let arrow = cc.instantiate(this.ArrowPrefab);
        this.node.addChild(arrow); 
        let fnMoveLeft = cc.moveBy(0.5,cc.v2(offx,0));
        let fnDestroy = cc.callFunc(arrow.destroy, arrow);
        let fsAction = cc.sequence(fnMoveLeft,fnDestroy);
        arrow.runAction(fsAction);
    },

    ArrowLeftMoving() {
        this.ArrowMoving(-this.node.width/3,false);
    },

    ArrowRightMoving() {
        this.ArrowMoving(this.node.width/3,true);
    },

    StartPlayArrowMoving() {
        this.PlayArrowAniTime = 5;
    },

    onCloseAniEnd() {
        cc.log("destroy self~!!!!")
        this.Close();
    },

    onOpenAniEnd() {
        this.StartPlayArrowMoving();
        let callback = function() {
            let anicomment = this.node.getComponent(cc.Animation);
            anicomment.play("FishGroupComingClose");                                
        }
        //开始之后2秒结束关闭自己
        setTimeout(callback.bind(this),1500);        
    },

    Close() {
        this.node.destroy();
    },

    // start () {
    // },

    update (dt) {
        if(this.PlayArrowAniTime > 1 ){
            this.nAbleTime += dt;
            if(this.nAbleTime > 0.1) {
                this.ArrowLeftMoving();
                this.ArrowRightMoving();
                this.nAbleTime -= 0.1;
                this.PlayArrowAniTime--;
            }
        }
    },
});
