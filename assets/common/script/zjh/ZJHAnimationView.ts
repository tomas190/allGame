import comTools = require("./ZJHCommonTool");
import Desk = require("./ZJHDesk");
import BaseDef from "./ZJHBaseDef";
import MySelf = require("./ZJHMySelf")

let dataConfig = {
    "1#2":{1:2,2:1},
    "2#1":{1:2,2:1},
    "1#4":{1:2,4:1},
    "4#1":{1:2,4:1},
    "1#3":{1:2,3:1},
    "3#1":{1:2,3:1},
    "0#1":{0:1,1:2},
    "1#0":{0:1,1:2},
    "0#2":{0:1,2:2},
    "2#0":{0:1,2:2},
    "2#3":{2:2,3:1},
    "3#2":{2:2,3:1},
    "2#4":{2:1,4:2},
    "4#2":{2:1,4:2},
    "3#4":{3:2,4:1},
    "4#3":{3:2,4:1},
    "0#3":{0:2,3:1},
    "3#0":{0:2,3:1},
    "0#4":{0:2,4:1},
    "4#0":{0:2,4:1},
}


const {ccclass, property} = cc._decorator;

@ccclass
export default class ZJHAnimationView extends cc.Component {

    @property(cc.Node)
    kaishiAni:cc.Node = null;

    @property(cc.Node)
    lose:cc.Node = null;

    @property(cc.Node)
    mask:cc.Node = null;

    @property([cc.Node])
    nodes1:cc.Node [] = [null];

    @property([cc.Node])
    nodes2:cc.Node []= [null];

    @property([cc.Node])
    wins:cc.Node []= [null];

    @property(sp.Skeleton)
    vsAni:sp.Skeleton = null;
    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
    notice_start:cc.Node = null;

    @property(cc.Node)
    notice_wait:cc.Node = null;

    @property(cc.Prefab)
    poker:cc.Prefab = null;

    @property([cc.Node])
    fire: cc.Node [] = [null];

    @property(cc.SpriteAtlas)
    atals:cc.SpriteAtlas = null;

    @property
    parent:any = 0;

    @property
    loseside:number = 0;

    @property
    deskPoker:any [] = null;

    @property
    pokerPool:any = null;

    onLoad () {
        this.node.zIndex = BaseDef.ZOrder.TOP;
        this.deskPoker = [];
        this.pokerPool = new cc.NodePool();
        for(let i=0; i<15; ++i){
            let poker = cc.instantiate(this.poker);
            poker.scale = 0.5;
            this.pokerPool.put(poker);
        }
        comTools.addBtnEvent(this.mask,()=>{return},null,null,null,this)
        this.parent = this.node.getParent().getComponent("ZJHGame");
    }

    maskVisible(bVisible: boolean){
        this.mask.active = bVisible;
    }

    getPoker(){
        let poker = undefined
        if(this.pokerPool.size()>0){
            poker = this.pokerPool.get()
        }else{
            poker =  cc.instantiate(this.poker);
        }
        return poker;
    }

    dealCard(data: any){
        let len =  Desk.getUserNum();
        let totalPoker = len*3;//总共发多少张牌
        let tcount = totalPoker;
        this.parent.setBanker(data.zhuang);
        let userList = Desk.getDealSequence(data.zhuang);
        for(let i=0; i<totalPoker;++i){
            let chair = this.parent.getViewIndex(userList[i%len]);
            let pos:cc.Vec2 = this.parent.getPokerPosByChair(userList[i%len]);
            pos = this.parent.node.convertToWorldSpaceAR(pos);
            pos = this.node.convertToNodeSpaceAR(pos);
            let poker = this.getPoker();
            this.deskPoker.push(poker);
            this.node.addChild(poker);
            poker.zIndex = tcount--;
            poker.setPosition(cc.v2(0,200-i*1));
            let m2 = cc.moveTo(0.1,pos);
            let delay = cc.delayTime(0.1*i);
            let call = cc.callFunc((sender: any)=>{
                this.parent.handCards[chair].getComponent("ZJHHandPoker").sendPoker();
                this.pokerPool.put(sender);
                if(i == totalPoker-1){
                    this.maskVisible(false);
                    this.deskPoker.length = 0;
                }
            });
            let seq = cc.sequence(delay,m2,call);
            poker.runAction(seq);
        }
    }

    startAnimation(){
        this.maskVisible(true);
        this.kaishiAni.active = true;
        let ske = this.kaishiAni.getComponent(sp.Skeleton);
        ske.setAnimation(1,"ani_kaishiyouxi",false);
    }

    compareAnimation(data: any){
        this.maskVisible(true);
        let Index1 = this.parent.getViewIndex(data.win);
        let Index2 = this.parent.getViewIndex(data.lose);

        this.parent.handCards[Index1].active = false;
        this.parent.handCards[Index2].active = false;

        let config = dataConfig[Index1+"#"+Index2];
        let winnerData = this.parent.getPlayerData(Index1);
        let loserData = this.parent.getPlayerData(Index2);
        this.loseside = config[Index2];
        let func = (x: number,d: any,url: string, Index:number)=>{
            let list = this["nodes"+x];
            list[3].getComponent(cc.Sprite).spriteFrame = this.atals.getSpriteFrame(url);
            let path = d.headUrl;
            if(CC_BUILD){
                cc.loader.load(path,function (err, texture) {
                    if(err) return;
                    var frame = new cc.SpriteFrame(texture);
                    list[2].spriteFrame = frame;
                });
            }
            if(Index === 0){//我自己参与比牌
                let cards =  MySelf.getCards()
                if(cards){
                    let children = list[1].getChildren();
                    for(let i=0; i<children.length; ++i){
                        let poker = children[i].getComponent("ZJHPoker");
                        poker.setLogicValue(cards[i]);
                        poker.backVisible(false);
                    }
                }
            }
        }

        func(config[Index1],winnerData,"win",Index1);
        func(config[Index2],loserData,"lose",Index2);

        this.nodes1[0].active = true;
        this.nodes2[0].active = true;
        let pos1 = this.nodes1[0].getPosition();
        let pos2 = this.nodes2[0].getPosition();

        let cardpos1 = this.nodes1[1].getPosition();
        let cardpos2 = this.nodes2[1].getPosition();
   
        let mb1 = cc.moveBy(0.1,200,0);
        let mb2 = cc.moveBy(0.1,-200,0);
        let mb3 = cc.moveBy(0.1,-50,0);
        let mb4 = cc.moveBy(0.1,50,0);
        let call = cc.callFunc(()=>{
            this.vsAni.node.active = true;
            this.vsAni.setAnimation(1,"ani_VS_light",false);
            this.vsAni.setCompleteListener(()=>{
                this.vsAni.node.active = false;
            })
        })
        let delay = cc.delayTime(0.5);
        let call2 =  cc.callFunc(()=>{
            this.nodes1[3].active = true;
            this.nodes2[3].active = true;
            this.grey();
            let p1 = this.parent.handCards[Index1].getPosition()
            let p2 = this.parent.handCards[Index2].getPosition()
            p1 = this.parent.node.convertToWorldSpaceAR(p1);
            p2 = this.parent.node.convertToWorldSpaceAR(p2);
            p1 = this["nodes"+config[Index1]][0].convertToNodeSpaceAR(p1);
            p2 = this["nodes"+config[Index2]][0].convertToNodeSpaceAR(p2);
            let cardm1 = cc.moveTo(0.5,p1.x,p1.y);
            let cardm2 = cc.moveTo(0.5,p2.x,p2.y);
            let delay = cc.delayTime(0.5)
            let call_11 = cc.callFunc(()=>{
                this["nodes"+this.loseside][5].active = false;
            })
            let call_1 = cc.callFunc(()=>{
                this.normal();
                this.reset();
                this.parent.playerWin(data.win);
                this.parent.playerLose(data.lose,3);
                this.nodes1[0].setPosition(pos1);
                this.nodes2[0].setPosition(pos2);
                this.nodes1[1].setPosition(cardpos1);
                this.nodes2[1].setPosition(cardpos2);
                this.parent.handCards[Index1].active = true;
                this.parent.handCards[Index2].active = true;
            })
            this["nodes"+config[Index1]][1].runAction(cc.sequence(delay,call_11,cardm1));
            this["nodes"+config[Index2]][1].runAction(cc.sequence(delay,cardm2,delay,call_1));

        })
  
       this.nodes1[0].runAction(cc.sequence(mb1,mb3,mb4)); 
       this.nodes2[0].runAction(cc.sequence(mb2,call,mb4,mb3,delay,call2)); 
    }

    reset(){
        this.nodes1[0].active = false;
        this.nodes2[0].active = false;
        this.nodes1[3].active = false;
        this.nodes2[3].active = false;
        this.loseside = 0;
        this.maskVisible(false);
        this.OutFire();
        for(let i=1; i<=2; ++i){
            let cards = this["nodes"+i][1].getChildren();
            for(let j=0; j < cards.length; ++j){
                cards[j].getComponent("ZJHPoker").backVisible(true);
            }
        }
        MySelf.clearCards();//清除上局暂存的牌
    }

    grey(){
        let list = this["nodes"+this.loseside];
        list[5].active = true;
        comTools.Sprite2Grey(list[0].getComponent(cc.Sprite));
        comTools.Sprite2Grey(list[2].getComponent(cc.Sprite));
        comTools.Sprite2Grey(list[4].getComponent(cc.Sprite));
        let cards = list[1].getChildren();
        cards.forEach(poker => {
           poker.getComponent("ZJHPoker").grey();
       });
       let cSpr = cc.instantiate(list[3]);
       cSpr.setPosition(list[3].getPosition());
       list[3].parent.addChild(cSpr);
       let mb = cc.moveBy(1,0,-150);
       let fadeOut = cc.fadeOut(1);
       let call = cc.callFunc((sender)=>{
            sender.destroy();
       })
       let spw = cc.spawn(mb,fadeOut);
       let seq = cc.sequence(spw,call);
       cSpr.runAction(seq);
       let winSide = this.loseside == 1 ? 2 : 1;
       let wSpr = this["nodes"+winSide][3];
       wSpr.scale = 3.5;
       let s2 = cc.scaleTo(0.3,0.7);
       let s2_ = cc.scaleTo(0.3,1);
       let seq2 = cc.sequence(s2,s2_);
       wSpr.runAction(seq2);
    }

    normal(){
        let list = this["nodes"+this.loseside];
        comTools.Sprite2Normal(list[0].getComponent(cc.Sprite));
        comTools.Sprite2Normal(list[2].getComponent(cc.Sprite));
        comTools.Sprite2Normal(list[4].getComponent(cc.Sprite));
        list[5].active = false;
        let cards = list[1].getChildren();
        cards.forEach(poker => {
           poker.getComponent("ZJHPoker").normal();
       });
    }

    playerLose(){
        this.lose.active = true;
        let fadeOut= cc.fadeOut(1.5);
        let call = cc.callFunc((sender)=>{
            sender.active = false;
            this.lose.opacity = 255;
        });
        let seq = cc.sequence(fadeOut,call);
        this.lose.runAction(seq);
    }

    playerWin(){
        let delta = 0.1;
        for(let i=0; i<this.wins.length; ++i){
            let sc2 = cc.scaleTo(0.1,1.2);
            let sc2_ = cc.scaleTo(0.1,1);
            let delay = cc.delayTime(delta*i);
            let call = cc.callFunc(()=>{
                this.wins[i].active = true;
            });
            let call2 = null;
            let delay2 = cc.delayTime(1.5);
            if(i==this.wins.length-1){
                call2 = cc.callFunc(()=>{
                    this.wins.forEach(element => {
                        element.scale = 0;
                    });
                })
            }
            let seq = cc.sequence(delay,call,sc2,sc2_,delay2,call2);
            this.wins[i].runAction(seq);
        }
    }

    startCount(time: number){
        this.hideNotice()
        this.notice_start.active = true;
        let endTime  = new Date().getTime()+time*1000;
        let count = this.notice_start.getChildByName("count").getComponent(cc.Label);
        count.string = String(time);
        let MyScheduler = ()=>{
            let curTime = new Date().getTime();
            let rTime = Math.floor((endTime-curTime)/1000);
            count.string = String(rTime);
            if(rTime <= 0){
                this.stopCount();
                this.startAnimation();
            }
        }
        this.schedule(MyScheduler,0.2);
    }

    stopCount(){
        this.unscheduleAllCallbacks()
        this.notice_start.active = false;
    }

    waitNotice(id:number){
        this.maskVisible(false);
        this.stopCount();
        let noticeSpr1 = this.notice_wait.getChildByName("txt_join");
        let noticeSpr2 = this.notice_wait.getChildByName("txt_wait");
        let animState = this.notice_wait.getComponent(cc.Animation).play();
        animState.wrapMode = cc.WrapMode.Loop;
        if(id ==1 ) {
            noticeSpr1.active = true;
            noticeSpr2.active = false;
        }else if(id == 2){
            noticeSpr1.active = false;
            noticeSpr2.active = true;
        }
        this.notice_wait.active = true;
    }

    hideNotice(){
        this.notice_wait.getComponent(cc.Animation).stop();
        this.notice_wait.active = false;
    }

    AllInFire(){
        this.fire.forEach(f => {
            f.active = true;
        });
    }

    OutFire(){
        this.fire.forEach(f => {
            f.active = false;
        });
    }


    onExit(){
        this.reset();
        this.stopCount();
        this.deskPoker.forEach(poker => {
            this.pokerPool.put(poker);
        });
        this.lose.active = false;
        this.deskPoker.length = 0;
    }
    
}
