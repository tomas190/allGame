import comTools from "./CommonTool"
import Desk from "./Desk"
import BaseDef from "./BaseDef";

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
export default class AnimationView extends cc.Component {

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

    @property(cc.Node)
    light1:cc.Node = null;

    @property(cc.Node)
    light2:cc.Node = null;
    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
    notice_start:cc.Node = null;

    @property(cc.Node)
    notice_wait:cc.Node = null;

    @property(cc.Prefab)
    poker:cc.Prefab = null;

    @property
    parent:any = 0;

    @property
    loseside:number = 0;

    @property
    MyScheduler:any = null;

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
        this.parent = this.node.getParent().getComponent("Game");
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
        this.maskVisible(true);
        this.stopCount();
        let len =  Desk.getUserNum();
        let users = Desk.getUsers();
        Desk.refreshIndexs();
        let totalPoker = len*3;//总共发多少张牌
        let tcount = totalPoker;
        this.parent.setBanker(data.zhuang);
        for(let i=0; i<totalPoker;++i){
            let chair = this.parent.getViewIndex(users[i%len].chair);
            let pos:cc.Vec2 = this.parent.getPokerPosByChair(users[i%len].chair);
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
                this.parent.handCards[chair].getComponent("HandPoker").sendPoker();
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
        ske.setCompleteListener(()=>{
            this.maskVisible(false);
        })
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
        let func = (x: number,d: any,url: string)=>{
            let list = this["nodes"+x];
            comTools.loadSpriteFrame(list[3],url);
            let path = d.headUrl;
            // cc.loader.load(path,function (err, texture) {
            //     if(err) return;
            //     var frame = new cc.SpriteFrame(texture);
            //     list[2].spriteFrame = frame;
            // });
            if(d.cards){
                let children = list[1].getChildren();
                for(let i=0; i<children.length; ++i){
                    let poker = children[i].getComponent("Poker");
                    poker.setLogicValue(d.cards[i]);
                    poker.backVisible(false);
                }
            }

        }

        func(config[Index1],winnerData,"win");
        func(config[Index2],loserData,"lose");

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
            this.light1.active = true;
            this.light2.active = true;
        })
        let delay = cc.delayTime(0.5);
        let call2 =  cc.callFunc(()=>{
            this.light2.active = false;
            this.nodes1[3].active = true;
            this.nodes2[3].active = true;
            this.grey();
            let p1 = this.parent.getPokerPosByChair(data.win);
            let p2 =this.parent.getPokerPosByChair(data.lose);
            p1 = this.parent.node.convertToWorldSpaceAR(p1);
            p2 = this.parent.node.convertToWorldSpaceAR(p2);
            p1 = this["nodes"+config[Index1]][0].convertToNodeSpaceAR(p1);
            p2 = this["nodes"+config[Index2]][0].convertToNodeSpaceAR(p2);
            let cardm1 = cc.moveTo(0.5,p1.x+50,p1.y);
            let cardm2 = cc.moveTo(0.5,p2.x+50,p2.y);
            let delay = cc.delayTime(1.0)
            let call_1 = cc.callFunc(()=>{
                this.normal();
                this.parent.handCards[Index1].active = true;
                this.parent.handCards[Index2].active = true;
                this.parent.playerWin(data.win);
                this.parent.playerLose(data.lose,3);
                this.reset();
                this.nodes1[0].setPosition(pos1);
                this.nodes2[0].setPosition(pos2);
                this.nodes1[1].setPosition(cardpos1);
                this.nodes2[1].setPosition(cardpos2);
            })
            this["nodes"+config[Index1]][1].runAction(cardm1);
            this["nodes"+config[Index2]][1].runAction(cc.sequence(cardm2,call_1));

        })
  
       this.nodes1[0].runAction(cc.sequence(mb1,mb3,mb4)); 
       this.nodes2[0].runAction(cc.sequence(mb2,call,mb4,mb3,delay,call2)); 
    }

    reset(){
        this.nodes1[0].active = false;
        this.nodes2[0].active = false;
        this.nodes1[3].active = false;
        this.nodes2[3].active = false;
        this.light1.active = false;
        this.light2.active = false;
        this.loseside = 0;
        this.maskVisible(false);
        for(let i=1; i<=2; ++i){
            let cards = this["nodes"+i][1].getChildren();
            for(let j=0; j < cards.length; ++j){
                cards[j].getComponent("Poker").backVisible(true);
            }
        }
    }

    grey(){
        let list = this["nodes"+this.loseside];
        comTools.Sprite2Grey(list[0].getComponent(cc.Sprite));
        comTools.Sprite2Grey(list[2].getComponent(cc.Sprite));
        comTools.Sprite2Grey(list[4].getComponent(cc.Sprite));
        let cards = list[1].getChildren();
        cards.forEach(poker => {
           poker.getComponent("Poker").grey();
       });
       let cSpr = cc.instantiate(list[3]);
       cSpr.setPosition(list[3].getPosition());
       list[3].parent.addChild(cSpr);
       let mb = cc.moveBy(1,0,-120);
       let fadeOut = cc.fadeOut(1);
       let call = cc.callFunc((sender)=>{
            sender.destroy();
       })
       let spw = cc.spawn(mb,fadeOut);
       let seq = cc.sequence(spw,call);
       cSpr.runAction(seq);
    }

    normal(){
        let list = this["nodes"+this.loseside];
        comTools.Sprite2Normal(list[0].getComponent(cc.Sprite));
        comTools.Sprite2Normal(list[2].getComponent(cc.Sprite));
        comTools.Sprite2Normal(list[4].getComponent(cc.Sprite));
        let cards = list[1].getChildren();
        cards.forEach(poker => {
           poker.getComponent("Poker").normal();
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

    startCount(time:number){
        this.notice_wait.active = false;
        this.notice_start.active = true;
        let endTime  = new Date().getTime()+time*1000;
        let count = this.notice_start.getChildByName("count").getComponent(cc.Label);
        count.string = String(time);
        let func = ()=>{
            let curTime = new Date().getTime();
            let rTime = Math.floor((endTime-curTime)/1000);
            count.string = String(rTime);
            if(rTime <= 0){
                this.stopCount();
                this.startAnimation();
            }
        }
        this.MyScheduler = func;
        this.schedule(func,0.2);
    }

    stopCount(){
        if(this.MyScheduler){
            this.unschedule(this.MyScheduler);
            this.MyScheduler = null;
            this.notice_start.active = false;
        }
    }

    waitNotice(id:number){
        this.maskVisible(false);
        this.stopCount();
        let noticeSpr = this.notice_wait.getChildByName("txt_join");
        comTools.loadSpriteFrame(noticeSpr,"desk/wait_"+id);
        this.notice_wait.active = true;
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
