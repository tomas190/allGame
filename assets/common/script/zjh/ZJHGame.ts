import gameController = require("./ZJHGameController")
import BaseDef from "./ZJHBaseDef";
import msgSender from "./ZJHnet/ZJHmsgSender"
import MySelf = require("./ZJHMySelf")
import Desk = require("./ZJHDesk");
import CommonTool = require("./ZJHCommonTool")
import ZJHNoticeMgr = require("./ZJHNoticeMgr")
import ZJHNotifacition from "./ZJHnet/ZJHNotification"
import EVENT from "./ZJHnet/ZJHEventCustom"
const {ccclass, property} = cc._decorator;

let GameState = {
    WAITTING:0,
    ONGOING:1,
    OVER:2
}

@ccclass
export default class ZJHGame extends cc.Component {

    @property
    gamestage: any = GameState.WAITTING;

    @property
    chipPool: any = null;

    @property
    myIndex: number = -1;

    @property
    preChair: number = null;

    @property
    currentChair: number = null;

    @property
    deskChip:any [] = null;

    @property
    banker:any = null;

    @property(cc.Prefab)
    bankerPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    poker: cc.Prefab = null;

    @property(cc.Prefab)
    chip: cc.Prefab = null;

    @property([cc.Node])
    players: cc.Node[] = [null];

    @property([cc.Node])
    handCards: cc.Node[] = [null];

    @property(cc.Node)
    mask: cc.Node = null;

    @property(cc.Node)
    option:cc.Node = null;

    @property(cc.Label)
    difen:cc.Label = null;

    @property(cc.Label)
    round:cc.Label = null;

    @property(cc.Label)
    pool:cc.Label = null;

    @property(cc.Node)
    aniView:cc.Node = null;

    @property(cc.Node)
    bgm:cc.Node = null;

    @property(cc.SpriteFrame)
    sprite_1_normal: cc.SpriteFrame = null;  

    @property(cc.SpriteFrame)
    sprite_1_pressed: cc.SpriteFrame = null;  

    @property(cc.SpriteFrame)
    sprite_2_normal: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    sprite_2_pressed: cc.SpriteFrame = null;

    @property(cc.Node)
    rule: cc.Node = null;

    @property(cc.Node)
    emoji: cc.Node = null;

    @property([cc.Node])
    emojis: cc.Node [] = [null];

    @property([cc.Node])
    emojis2: cc.Node [] = [null];

    @property(cc.Node)
    InfoPanel: cc.Node = null; 

    @property
    PlayerInGame:number [] = [];

    @property
    someOneAllIn:boolean  = false;

    @property
    totalRound:number = 20;

    @property
    chipConfig:any = null;

    @property
    userPanel:any = null;

    @property
    curRound: number= 0

    onLoad(){ 
        CommonTool.resize();
        this.init();
    }

    init(){
        gameController.initView(this);
        let on_off = cc.sys.localStorage.getItem("on_off");
        if(on_off == null) cc.sys.localStorage.setItem("on_off",true);
        this.initPool();
        this.maskClick();
        this.setBgm();
        this.setBtnVoice();
        this.initHandCardsPos();
        ZJHNoticeMgr.initCurrentNode(this.node);
    }

    maskClick(){
        CommonTool.addBtnEvent(this.mask,null,null,()=>{
            this.mask.active = false;
            this.handCards.forEach(element => {
                element.getComponent("ZJHHandPoker").offClick();
                element.zIndex = BaseDef.ZOrder.BOTTOM;
            });
        },null,this);
        CommonTool.addBtnEvent(this.node,null,null,()=>{
           this.closeUserPanel();
           this.movePanel();
        },null,this);
    }

    movePanel(){
        this.rule.zIndex = BaseDef.ZOrder.TOP;
        this.emoji.zIndex = BaseDef.ZOrder.TOP;
        let size1 = this.rule.getContentSize();
        let size2 = this.emoji.getContentSize();
        let posx1 = cc.winSize.width/2+size1.width/2;
        let posx2 = cc.winSize.width/2+size2.width/2;
        let call = cc.callFunc((sender)=>{
            sender.active = false
        })
        let seq1 = cc.sequence(cc.moveTo(0.2,cc.v2(posx1,0)),call); 
        let seq2 = cc.sequence(cc.moveTo(0.2,cc.v2(posx2,0)),call); 
        this.rule.runAction(seq1);
        this.emoji.runAction(seq2)  
    }

    onEnterGame(data: any){
        let roominfo = data.roominfo ;
        this.difen.string = "底注:" + roominfo.basepoint;
        this.totalRound = roominfo.totalround;
        this.updateRound(roominfo.currround);
        this.option.getComponent("ZJHOption").initConfig(roominfo.chiplist);
        this.chipConfig = roominfo.chiplist;
        switch(data.currstate){
            case 10://等待开始
                if(data.countdown > 0) this.aniView.getComponent("ZJHAnimationView").startCount(data.countdown);
                break;
            case 20: case 21: case 22://已经开始玩游戏
                this.setBanker(data.banker);//设置庄位
                this.setPoolValue(data.total);
                let chips_ = this.splitChips(data.total);//设置桌面筹码
                for(let i=0; i<chips_.length; ++i){
                    let chip = this.getChip();
                    let k = this.chipConfig.indexOf(chips_[i]);
                    chip.getComponent("ZJHChip").setValue(chips_[i],k);
                    let x = Math.random()*400-200;
                    let y = Math.random()*120;
                    chip.setPosition(cc.v2(x,y));
                    this.node.addChild(chip);
                    this.deskChip.push(chip);
                }
                this.turnBet({chair:data.currbetchair,round:roominfo.currround,minmoney:data.MinXZMoney},roominfo.thinktime,data.countdown);
                break;
            case 29:{//结束
                break;
            }        
        }
        
    }

    //下锅底
    BasePoint(data: any){
        let list = data.playermoney;
        for(let i=0; i<list.length; ++i){
            let index = this.getViewIndex(list[i].chair);
            this.players[index].getComponent("ZJHPlayer").updateUserGold(list[i].money);
            this.bbb(index,data.guodi);
        }
        this.setPoolValue(data.guodi*list.length);
        this.option.active = true
    }

    initUsers(data: any,stage: number){
        this.option.active = false;//先隐藏操作按钮
        for(let i=0; i<data.length; ++i){
            if(data[i].uid == MySelf.getId()){
                this.myIndex = data[i].chair;
                MySelf.setChair(data[i].chair);
                if(data[i].isingame){
                    this.gamestage = GameState.ONGOING;
                }else{
                    this.gamestage = GameState.WAITTING; 
                }
            }
        }
        for(let i=0; i<data.length; ++i){
            let index = this.getViewIndex(data[i].chair)
            this.players[index].getComponent("ZJHPlayer").setInfo(data[i]);
            this.handCards[index].getComponent("ZJHHandPoker").saveChair(data[i].chair);
            if(index != 0 ){
                let size = this.players[i].getChildByName("headBg").getContentSize();
                let y = this.players[index].y;
                let x = index <= 2 ? cc.winSize.width/2 - size.width/2-10 : -cc.winSize.width/2 + size.width/2+10
                this.players[index].setPosition(cc.v2(x,y));
            }
            if(stage == 10 || stage == 29){ //等待阶段
                if(index == 0) this.aniView.getComponent("ZJHAnimationView").waitNotice(1);//提示等待玩家进入
                Desk.pushUser(data[i].chair);
            }
            if(stage >= 20 && stage <= 22){//玩牌阶段
                this.gamestage = GameState.ONGOING;
                if(data[i].isingame){//在游戏中
                    let handCard = this.handCards[index].getComponent("ZJHHandPoker")
                    handCard.pokersVisible(true);//在游戏中显示手牌
                    handCard.setBets(data[i].BetMoney);
                    if(index == 0){
                        this.option.getComponent("ZJHOption").updateCheck(data[i].hasseen);
                        if(data[i].hasseen) handCard.showPoker(data[i].cardsinfo);//我自己看牌
                    }else{
                        if(data[i].hasseen) handCard.checkAnimation();// 别人看牌
                    }
                    if(data[i].hasdiscard){//已经弃牌
                        this.handCards[index].getComponent("ZJHHandPoker").lose(2);
                    }else if(data[i].hasFaild){//比牌失败
                        this.handCards[index].getComponent("ZJHHandPoker").lose(3);
                    }else{
                        Desk.pushUser(data[i].chair)//加入正在玩牌玩家列表
                        if(index == 0) this.option.active = true; //我自己
                    }
                }else{//不在游戏中
                    if(index == 0) this.aniView.getComponent("ZJHAnimationView").waitNotice(2);
                    this.option.active = false;
                }
                
            } 
        }
    }

    beginCount(time: number){
        this.reStart();
        this.gamestage = GameState.WAITTING;
        this.aniView.getComponent("ZJHAnimationView").startCount(time)
    }

    initPool(){
        this.deskChip = [];
        this.chipPool = new cc.NodePool();
        for(let i=0; i<100; ++i){
            let chip = cc.instantiate(this.chip);
            this.chipPool.put(chip);
        }
    }

    getChip(){
        let chip = undefined
        if(this.chipPool.size()>0){
            chip = this.chipPool.get()
        }else{
            chip =  cc.instantiate(this.chip);
        }
        return chip;
    }

    //设置庄位
    setBanker(chair: number){
        let index = this.getViewIndex(chair);
        if(!this.banker) {
            this.banker = cc.instantiate(this.bankerPrefab);
            this.node.addChild(this.banker);
        }
        this.banker.zIndex = BaseDef.ZOrder.MIDDLE;
        this.banker.active = true;
        let pos = this.getPosByChair(index);
        let size = this.players[index].getChildByName("headBg").getContentSize();
        let newPos = cc.v2(pos.x-size.width/2+15,pos.y+size.height/2-15);
        this.banker.setPosition(newPos);
    }

    getPlayer(chair: number){
        let index = this.getViewIndex(chair);
        return this.players[index];
    }

    getPlayerData(chair: number){
        let index = this.getViewIndex(chair);
        return this.players[index].getComponent("ZJHPlayer");
    }
    
    //发牌
    dealCard(data: any){
        this.gamestage = GameState.ONGOING;
        this.aniView.getComponent("ZJHAnimationView").dealCard(data);
    }

    playerWin(chair:number){
        let index = this.getViewIndex(chair);
        this.handCards[index].getComponent("ZJHHandPoker").win();
    }

    playerLose(chair:number,id:number){
        let index = this.getViewIndex(chair);
        this.handCards[index].getComponent("ZJHHandPoker").lose(id);
        this.players[index].getComponent("ZJHPlayer").lose();
        if(index == 0) {
            this.option.getComponent("ZJHOption").reSetBtns();//重置按钮 
            this.option.active = false;
        }
    }

    getEmoji(id:number, chair:number){
        let index = this.getViewIndex(chair);
        let emoji = cc.instantiate(this.emojis[id]);
        let pos = this.getPosByChair(index);
        emoji.active = true;
        emoji.setPosition(cc.v2(pos.x,pos.y+30));
        if(id === 6)  emoji.setPosition(cc.v2(pos.x-30,pos.y+30));
        if(id === 5)  emoji.setPosition(cc.v2(pos.x,pos.y));
        this.node.addChild(emoji);
        emoji.getComponent(cc.Animation).play();
    }

    sendEmoji(sendChair:number, reveiveChair:number, id:number){
        let sendIndex = this.getViewIndex(sendChair);
        let receiveIndex = this.getViewIndex(reveiveChair);
        let emoji = cc.instantiate(this.emojis2[id]);
        let pos1 = this.getPosByChair(sendIndex);
        let pos2 = this.getPosByChair(receiveIndex);
        emoji.active = true;
         emoji.setPosition(pos1.x,pos1.y+30);
        this.node.addChild(emoji);
        let seq = null;
        let m2 = cc.moveTo(0.5,cc.v2(pos2.x,pos2.y+30));
        let call = cc.callFunc(()=>{
            emoji.getComponent(cc.Animation).play();
        });
        if(id === 3){//丟拖鞋
            let r2 = cc.rotateTo(0.5,-720);
            let spawn = cc.spawn(r2,m2);
            seq = cc.sequence(spawn,call)
        }else if(id === 1){//玫瑰花
            emoji.scale = 0.2;
            call = cc.callFunc(()=>{
                emoji.scale = 0.8;
                emoji.getComponent(cc.Animation).play();
            });
            seq = cc.sequence(m2,call)
        }else{
            seq = cc.sequence(m2,call)
        }
        emoji.runAction(seq);
    }

    btnEvent(event: any,id: string){
        switch(id){
            case "1":
                    // this.userJoin({chair:3})
                    msgSender.leaveRoomReq(this.myIndex);
                    ZJHNotifacition.sendNotify(EVENT.EVENT_USERLEAVEINGAME_RSP,{});
                break;
            case "2":{
                    // this.userJoin({chair:1})
                    let size = this.rule.getContentSize();
                    let pos = cc.v2(cc.winSize.width/2+size.width/2,0)
                    this.rule.setPosition(pos);
                    this.rule.active = true;
                    let posx = cc.winSize.width/2-size.width/2;
                    this.rule.runAction(cc.moveTo(0.2,cc.v2(posx,0)));
                }
                break;
            case "3":
                    let on_off =  JSON.parse(cc.sys.localStorage.getItem("on_off"));
                    let state = on_off == false ? true : false;
                    cc.sys.localStorage.setItem("on_off",state)
                    this.setBtnVoice();
                    this.setBgm();
                break;
            case "4":{
                    let size = this.emoji.getContentSize();
                    let pos = cc.v2(cc.winSize.width/2+size.width/2,0)
                    this.emoji.setPosition(pos);
                    this.emoji.active = true;
                    let posx = cc.winSize.width/2-size.width/2;
                    this.emoji.runAction(cc.moveTo(0.2,cc.v2(posx,0)));
                }
                break;    
        }
    }

    //根据索引得到玩家的位置
    getPosByChair(chair: number): cc.Vec2{
        let pos:cc.Vec2 =  this.players[chair].getPosition()
        return pos;
    }

    getPokerPosByChair(chair: number):cc.Vec2{
        let index = this.getViewIndex(chair)
        let handPoker = this.handCards[index].getComponent("ZJHHandPoker")
        let pos = handPoker.getPokerPos();
        pos = this.node.convertToNodeSpaceAR(pos);
        return pos;
    }

    //亮牌
    showCard(data:any){
        let index = this.getViewIndex(data.chair)
        if(index!=0) this.handCards[index].getComponent("ZJHHandPoker").showPoker(data.cardsinfo);
    }

    //玩家弃牌
    playerFold(data:any){
        let chair = this.getViewIndex(data.chair);
        this.players[chair].getComponent("ZJHPlayer").fold();
        this.players[chair].getComponent("ZJHPlayer").funcnotice(5);
        this.handCards[chair].getComponent("ZJHHandPoker").lose(2);
        if(chair == 0) {
            this.option.getComponent("ZJHOption").reSetBtns();//重置按钮 
            this.option.active = false;
        }
    }

    //玩家看牌
    userCheck(data: any,totalTime: number, remainTime: number){
        let chair = this.getViewIndex(data.chair);
        this.players[chair].getComponent("ZJHPlayer").funcnotice(3);
        if(data.newctd != -1){//重置看牌人倒计时
            this.players[chair].getComponent("ZJHPlayer").reCountDown(totalTime,remainTime);
        }
        if(chair == 0){//自己看牌
            this.handCards[chair].getComponent("ZJHHandPoker").showPoker(data.cardsinfo);
            MySelf.saveCards(data.cardsinfo.cards);
            this.option.getComponent("ZJHOption").updateCheck(true);
            this.option.getComponent("ZJHOption").hideCheck(false);//不是自己的回合 看牌后隐藏看牌按钮
            //自己的回合 看牌 更新操作按钮 更新倒计时
            if(this.currentChair == chair){
                if(!this.preChair) this.preChair = chair;//上一个下注的人
                this.players[this.preChair].getComponent("ZJHPlayer").stopCountDown();//停止上一个下注的人的倒计时
                this.players[chair].getComponent("ZJHPlayer").countDown(totalTime,data.newctd)//开始倒计时
                this.option.getComponent("ZJHOption").updateBtn(this.curRound,true, Desk.getUserNumInGame() == 2, this.someOneAllIn);
            }
            return;
        }
        this.handCards[chair].getComponent("ZJHHandPoker").checkAnimation();//别人看牌
    }

    splitChips(val:number){
        let len = this.chipConfig.length;
        val = val*100;
        let arr = {};
        for(let i = len-1; i>=0; --i){
            let x = (this.chipConfig[i]*100)
            if(val >= x ){
                let a = Math.floor(val/x);
                val = val%x;
                arr[i] = a;
            }
        }
        let s = [];
        for(let key in arr){
            for(let i=0; i < arr[key]; ++i){
                let value = this.chipConfig[key]
                s.push(value);
            }
        }
        return s;
    }

    //设置底池
    setPoolValue(val:number){
        let total = val + Number(this.pool.string);
        total = Math.round(total*100)/100;
        this.pool.string = ""+total;
    }

    //下注
    betting(data: any, type?: number){
        let index = this.getViewIndex(data.chair);
        let value = data.betmoney;
        this.setPoolValue(value)
        if(data.residuemoney) this.players[index].getComponent("ZJHPlayer").updateUserGold(data.residuemoney);//更新个人剩余金币
        this.players[index].getComponent("ZJHPlayer").stopCountDown();//先停止下注的人的倒计时
        this.players[index].getComponent("ZJHPlayer").funcnotice(type);
        this.bbb(index,value);
    }

    bbb(index: number,val:number){
        this.handCards[index].getComponent("ZJHHandPoker").setBets(val)//更新个人下注总量
        this.players[index].getComponent("ZJHPlayer").stopCountDown();//先停止下注的人的倒计时
        let pos = this.getPosByChair(index);
        let chips_ = this.splitChips(val);
        this.chipFly(chips_,pos);
    }

    settle(data: any){
        this.option.active = false;
        this.option.getComponent("ZJHOption").reSetBtns();//重置按钮
        this.aniView.getComponent("ZJHAnimationView").OutFire();//关火
        this.stopAllUserCount();
        let cardsinfo = data.cardsinfo;
        if(cardsinfo){//显示所有人的牌
            for(let i=0; i<cardsinfo.length; ++i){
                let index = this.getViewIndex(cardsinfo[i].chair);
                this.handCards[index].getComponent("ZJHHandPoker").showPoker(cardsinfo[i]);
            }
        }
        let settleinfo = data.settleinfo;
        let winners = [];
        for(let i=0; i<settleinfo.length; ++i){
            let chair =this.getViewIndex(settleinfo[i].chair);
            let player = this.players[chair].getComponent("ZJHPlayer");
            player.flyNumber(settleinfo[i].moneychange);
            player.updateUserGold(settleinfo[i].money);
            if(settleinfo[i].moneychange > 0) winners.push(settleinfo[i]);//多个赢家
            if(chair == 0) { //我自己
                if(settleinfo[i].moneychange > 0) {//赢钱动画
                    this.aniView.getComponent("ZJHAnimationView").playerWin();
                }else{//输钱动画
                    this.aniView.getComponent("ZJHAnimationView").playerLose();
                }
                this.handCards[chair].getComponent("ZJHHandPoker").ActiveShowCard();
                MySelf.setMoney(settleinfo[i].money);
            }
        }

        let perChips = Math.floor(this.deskChip.length/winners.length)//多个赢家平分筹码
        let cx =  perChips > 10 ? Math.round(perChips/10) : perChips;
        for(let i=0; i<winners.length; ++i){
            let s = i*perChips;
            let e = (i+1)*perChips;
            if( i == winners.length-1) e = this.deskChip.length;
            let chair =this.getViewIndex(winners[i].chair);
            let pos = this.getPosByChair(chair);
            for( let j=s; j < e; ++j){
                let x = j%perChips;
                let de = Math.round(x/cx)
                let delay = cc.delayTime(de*0.1);
                let m2 = cc.moveTo(0.2,pos);
                let call = cc.callFunc((sender)=>{
                    this.chipPool.put(sender)
                })
                let seq = cc.sequence(delay,m2,call);
                this.deskChip[j].runAction(seq);
            }
            this.players[chair].getComponent("ZJHPlayer").win();
        }
    }

    updateRound(count:number){
        this.curRound = count;
        this.round.string = "第"+count+"/"+this.totalRound+"轮";  
    }

    //轮谁下注
    turnBet(data: any,totalTime: number,remainTime: number){
        let chair = this.getViewIndex(data.chair);
        this.currentChair = chair;
        this.updateRound(data.round);
        if(this.currentChair == 0) {
            this.closeUserPanel();
        }
        this.players[this.currentChair].getComponent("ZJHPlayer").countDown(totalTime,remainTime)//开始倒计时
        this.option.getComponent("ZJHOption").updateBtn(data.round,this.currentChair == 0,Desk.getUserNumInGame() == 2,this.someOneAllIn,data.minmoney);

    }
    
    initHandCardsPos(){
        for(let i=1; i<this.handCards.length; ++i){
            let size1 = this.players[i].getChildByName("headBg").getContentSize();
            let size2 = this.handCards[i].getChildByName("light").getContentSize();
            let y = this.handCards[i].y;
            let x = i <= 2 ? cc.winSize.width/2 - size1.width - 10 - size2.width/2 : -cc.winSize.width/2 + size1.width + 10 + size2.width/2;
            this.handCards[i].setPosition(cc.v2(x,y));
        }
    }

    //玩家加入房间
    userJoin(data:any){
        if(Desk.getUserNumInGame() >= 2) this.aniView.getComponent("ZJHAnimationView").hideNotice();
        let chair = this.getViewIndex(data.chair);
        let player = this.players[chair];
        player.getComponent("ZJHPlayer").setInfo(data);
        this.handCards[chair].getComponent("ZJHHandPoker").saveChair(data.chair);
        let oldPos = player.getPosition();
        let size = player.getChildByName("headBg").getContentSize()
        let startPos = cc.v2(cc.winSize.width/2,oldPos.y);
        let targetPos = cc.v2(cc.winSize.width/2-size.width/2-10,oldPos.y)
        if(chair > 2){
            startPos = cc.v2(-cc.winSize.width/2,oldPos.y);
            targetPos = cc.v2(-cc.winSize.width/2+size.width/2+10,oldPos.y)
        }
        if(chair == 0) return;
        player.setPosition(startPos);
        player.runAction(cc.moveTo(0.2,targetPos));
        if(this.gamestage != GameState.ONGOING) Desk.pushUser(data.chair);
    }

    //玩家退出房间
    userLeave(data:any){
        let chair = this.getViewIndex(data.lkwjyzh);
        let player = this.players[chair]
        this.handCards[chair].getComponent("ZJHHandPoker").saveChair(-1);
        let oldPos = player.getPosition();
        let size =  player.getChildByName("headBg").getContentSize()
        let newpos = cc.v2(cc.winSize.width/2+size.width/2,oldPos.y)
        if(chair > 2){
            newpos =cc.v2(-cc.winSize.width/2-size.width/2,oldPos.y)
        }
        let call = cc.callFunc(()=>{
            player.getComponent("ZJHPlayer").onExit();
            this.handCards[chair].getComponent("ZJHHandPoker").onExit();
        })
        let seq = cc.sequence(cc.moveTo(0.2,newpos),call)
        player.runAction(seq);
        if(Desk.getUserNum() < 2){
            this.aniView.getComponent("ZJHAnimationView").waitNotice(1);
            this.reStart();
        }
    }

    //重新开始
    reStart(){
        this.gamestage = GameState.OVER;
        for(let i=0; i<this.players.length; ++i){
            this.players[i].getComponent("ZJHPlayer").reSet();
            this.handCards[i].getComponent("ZJHHandPoker").reSet();
        }
        // for(let i=0; i<this.deskChip.length; ++i){//飞筹码
        //     this.chipPool.put(this.deskChip[i]);
        // }
        this.option.getComponent("ZJHOption").updateCheck(false);
        this.updateRound(0);
        this.pool.string = "";
        this.deskChip.length = 0;
        this.someOneAllIn = false;
        this.currentChair = null;
        this.preChair = null;
        if(this.banker) this.banker.active = false;
        Desk.refreshIndexs();
    }

    stopAllUserCount(){
        for(let i=0; i<this.players.length; ++i){
            this.players[i].getComponent("ZJHPlayer").stopCountDown();
        }
    }
    //亮牌
    userShowCard(data:any){
        let index = this.getViewIndex(data.chair);
        this.handCards[index].getComponent("ZJHHandPoker").showPoker(data); 
    }

    getViewIndex(index: number):number
    {
        return (5-this.myIndex + index)%5;
    }

    //请求比牌
    compareReq(){
        this.mask.active = true;
        this.mask.zIndex =  BaseDef.ZOrder.MIDDLE;
        let users = Desk.getUsersInGame();
        for(let i=0; i<users.length; ++i){
            let index = this.getViewIndex(users[i]);
            if(index == 0) continue; 
            this.handCards[index].zIndex = BaseDef.ZOrder.TOP;
            this.players[index].zIndex = BaseDef.ZOrder.TOP;
            this.handCards[index].getComponent("ZJHHandPoker").onClick();
        }
        if(this.banker) this.banker.zIndex = BaseDef.ZOrder.TOP;
    }
    
    //玩家All In
    AllIn(data: any){
        this.someOneAllIn = true;
        //播全压动画
        this.aniView.getComponent("ZJHAnimationView").AllInFire();
        let index = this.getViewIndex(data.chair);
        if(index == 0) this.option.active = false;
        let player = this.players[index].getComponent("ZJHPlayer");
        player.stopCountDown();
        player.funcnotice(6);
        player.updateUserGold(data.residuemoney);//更新个人剩余金币
        this.setPoolValue(data.betmoney);
        this.handCards[index].getComponent("ZJHHandPoker").setBets(data.betmoney)//更新个人下注总量
        //飞30个最大面值的筹码出去
        let val = this.chipConfig[this.chipConfig.length-1]*30;
        let pos = this.getPosByChair(index);
        let chips_ = this.splitChips(val);
        this.chipFly(chips_,pos)
        //第二个人全押比牌
        if(data.win != -1) this.aniView.getComponent("ZJHAnimationView").compareAnimation({win:data.win,lose:data.lose});
    }

    chipFly(chips:number [],pos:cc.Vec2){
        for(let i=0; i<chips.length; ++i){
            let chip = this.getChip();
            let k = this.chipConfig.indexOf(chips[i]);
            chip.getComponent("ZJHChip").setValue(chips[i],k);
            this.node.addChild(chip);
            chip.setPosition(pos);
            let x = Math.random()*300-150;
            let y = Math.random()*100;
            let m2 = cc.moveTo(0.35,cc.v2(x,y));
            m2.easing(cc.easeOut(3.5))
            let call = cc.callFunc((sender)=>{
                cc.log("chipFlay===pos>",x,y,sender.parent.name,sender.getPosition());
            })
            let seq = cc.sequence(m2,call)
            chip.runAction(seq);
            this.deskChip.push(chip);
        }
    }

    //开始比牌
    startCompare(data:any){
        //先扔筹码
        this.mask.active = false;
        this.handCards.forEach(element => {
            element.getComponent("ZJHHandPoker").offClick();
            element.zIndex = BaseDef.ZOrder.BOTTOM;
        });
        let index = this.getViewIndex(data.chair);
        this.players[index].getComponent("ZJHPlayer").updateUserGold(data.residuemoney);
        if(data.betmoney) this.bbb(index,data.betmoney);//丢筹码
        this.aniView.getComponent("ZJHAnimationView").compareAnimation(data);
        //重置比牌玩家层级
        this.handCards[this.getViewIndex(data.lose)].zIndex = BaseDef.ZOrder.BOTTOM;
        this.players[this.getViewIndex(data.win)].zIndex = BaseDef.ZOrder.BOTTOM;
        if(this.banker) this.banker.zIndex = BaseDef.ZOrder.MIDDLE
    }
    
    setBgm(){
        let on_off = JSON.parse(cc.sys.localStorage.getItem("on_off"));
       if(on_off){
           this.bgm.getComponent(cc.AudioSource).play();
       }else{
            this.bgm.getComponent(cc.AudioSource).stop();
        }
    }

    setBtnVoice(){
        let on_off = JSON.parse(cc.sys.localStorage.getItem("on_off"));
        let sprite_normal = on_off == false ? this.sprite_2_normal : this.sprite_1_normal;
        let sprite_pressed = on_off == false ? this.sprite_2_pressed : this.sprite_1_pressed;
        let voiceBtn = cc.find("btn_voice",this.node);
        voiceBtn.getComponent(cc.Button).normalSprite = sprite_normal;
        voiceBtn.getComponent(cc.Button).pressedSprite = sprite_pressed;
        voiceBtn.getComponent(cc.Button).hoverSprite = sprite_normal;
        voiceBtn.getComponent(cc.Button).disabledSprite = sprite_normal;
    }

    openInfo(data:any){
        let index = this.getViewIndex(data.chair);
        if(index === 0) return;
        this.InfoPanel.active = true;
        this.InfoPanel.zIndex = BaseDef.ZOrder.MIDDLE;
        this.InfoPanel.getComponent("ZJHMagicEmoji").initView(data);
        let pos = this.getPosByChair(index);
        let playerSize = this.players[1].getChildByName("headBg").getContentSize();
        let panelSize = this.InfoPanel.getContentSize();
        let x = playerSize.width/2 + panelSize.width/2 + 10;
        let posx = index > 2 ? pos.x + x : pos.x - x;
        this.InfoPanel.setPosition(cc.v2(posx,pos.y));
    }

    closeUserPanel(){
        let size = this.InfoPanel.getContentSize();
        let x = cc.winSize.width+size.width;
        this.InfoPanel.setPosition(cc.v2(x,0));
    }

    onGameExit(){
        for(let i=0; i<5; ++i){
            this.players[i].getComponent("ZJHPlayer").onExit();
            this.handCards[i].getComponent("ZJHHandPoker").onExit();
        }
    }

}
