import gameController from "./GameController"
import BaseDef from "./BaseDef";
import msgSender from "./net/msgSender";
import MySelf from "./MySelf"
import Desk from "./Desk"
import CommonTool from "./CommonTool";
import localData from "./LocalData"
const {ccclass, property} = cc._decorator;

let GameState = {
    WAITTING:0,
    ONGOING:1,
    OVER:2
}

@ccclass
export default class Game extends cc.Component {

    @property
    gamestage: any = GameState.WAITTING;

    @property
    chipPool: any = null;

    @property
    myIndex: number = 0;

    @property
    preChair: number = null;

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

    @property(cc.Prefab)
    flyNum: cc.Prefab = null;

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

    @property
    PlayerInGame:number [] = [];

    @property
    someOneAllIn:boolean  = false;

    @property
    totalRound:number = 20;

    @property
    chipConfig:any = null;

    onLoad(){ 
        this.init();
        CommonTool.resize(); 
    }

    init(){
        this.initPool();
        this.maskClick();
        gameController.initView(this);
        this.setBgm();
        this.setBtnVoice();
    }

    maskClick(){
        CommonTool.addBtnEvent(this.mask,null,null,()=>{
            this.mask.active = false;
            this.handCards.forEach(element => {
                element.getComponent("HandPoker").offClick();
                element.zIndex = BaseDef.ZOrder.BOTTOM;
            });
        },null,this);
    }


    onEnterGame(data: any){
        let roominfo = data.roominfo ;
        this.difen.string = "底注:" + roominfo.basepoint;
        this.totalRound = roominfo.totalround;
        this.updateRound(roominfo.currround);
        this.option.getComponent("Option").initConfig(roominfo.chiplist);
        this.chipConfig = roominfo.chiplist;
        switch(data.currstate){
            case 10://等待开始
                this.aniView.getComponent("AnimationView").waitNotice(1);//提示等待玩家进入
                if(data.countdown > 0) this.aniView.getComponent("AnimationView").startCount(data.countdown);
                break;
            case 20:
            case 21:
            case 22://已经开始玩游戏
                this.pool.string = String(CommonTool.cutNum(data.total,2));//设置底池
                let chips_ = this.splitChips(data.total);//设置桌面筹码
                for(let i=0; i<chips_.length; ++i){
                    let chip = this.getChip();
                    let k = this.chipConfig.indexOf(chips_[i]);
                    chip.getComponent("Chip").setValue(chips_[i],k);
                    let x = Math.random()*400-200;
                    let y = Math.random()*120;
                    chip.setPosition(cc.v2(x,y));
                    this.node.addChild(chip);
                    this.deskChip.push(chip);
                }
                this.turn({chair:data.currbetchair,round:roominfo.currround,minmoney:data.MinXZMoney},roominfo.thinktime,data.countdown);
                break;
            case 29:{//结束
                break;
            }        
        }
        
    }

    BasePoint(data: any){
        let list = data.playermoney;
        for(let i=0; i<list.length; ++i){
            this.players[list[i].chair].getComponent("Player").updateUserGold(list[i].money);
            let index = this.getViewIndex(list[i].chair);
            this.bbb(index,data.guodi);
        }
    }

    initUsers(data: any,stage: number){
        for(let i=0; i<data.length; ++i){
            if(data[i].uid == CommonTool.getMyselfId()){
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
            this.players[index].getComponent("Player").setInfo(data[i]);
            this.handCards[index].getComponent("HandPoker").saveChair(data[i].chair);
            if(index == 0){
                if(data[i].hasseen) this.handCards[index].getComponent("HandPoker").showPoker(data[i].cardsinfo);//我自己看牌
            }else{
                if(data[i].hasseen) this.handCards[index].getComponent("HandPoker").checkAnimation();// 别人看牌
            }

            if(data[i].hasdiscard){//是否弃牌
                this.players[index].getComponent("Player").lose()
                this.handCards[index].getComponent("HandPoker").lose(2);
            }
            if(stage == 10 || stage == 29){ //等待阶段
                Desk.pushUser(data[i].chair);
            }

            if(stage >= 20 && stage <= 22){//玩牌阶段
                this.gamestage = GameState.ONGOING;
                this.handCards[index].getComponent("HandPoker").pokersVisible(true);
                if(!data[i].hasFaild){
                    Desk.pushUser(data[i].chair);
                }
                if(index == 0 && !data[i].isingame) this.aniView.getComponent("AnimationView").waitNotice(2);//提示等待下一局
            } 
        }
    }

    startCount(time: number){
        this.gamestage = GameState.WAITTING;
        this.aniView.getComponent("AnimationView").startCount(time)
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
        if(this.banker) {
            this.banker.removeFromParent();
        }else{
            this.banker = cc.instantiate(this.bankerPrefab);
        }
        this.players[index].addChild(this.banker);
        let size = this.players[index].getChildByName("headBg").getContentSize();
        this.banker.setPosition(-size.width/2+15,size.height/2-15);
    }

    getPlayer(chair: number){
        let index = this.getViewIndex(chair);
        return this.players[index];
    }

    getPlayerData(chair: number){
        let index = this.getViewIndex(chair);
        return this.players[index].getComponent("Player");
    }
    
    //发牌
    dealCard(data: any){
        this.gamestage = GameState.ONGOING;
        this.aniView.getComponent("AnimationView").dealCard(data);
    }

    playerWin(chair:number){
        let index = this.getViewIndex(chair);
        this.handCards[index].getComponent("HandPoker").win();
    }

    playerLose(chair:number,id:number){
        let index = this.getViewIndex(chair);
        this.handCards[index].getComponent("HandPoker").lose(id);
        this.players[index].getComponent("Player").lose();
    }

    btnEvent(event: any,id: string){
        switch(id){
            case "1":
                // this.aniView.getComponent("AnimationView").startAnimation()
                msgSender.leaveRoomReq(this.myIndex);
                break;
            case "2":
                break;
            case "3":
                let on_off = localData.getData("on_off");
                let state = on_off == false ? true : false;
                localData.setData("on_off",state);
                this.setBtnVoice();
                this.setBgm();
                break;
            case "4":
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
        let handPoker = this.handCards[index].getComponent("HandPoker")
        let pos = handPoker.getPokerPos();
        pos = this.node.convertToNodeSpaceAR(pos);
        return pos;
    }

    //亮牌
    showCard(data:any){
        let index = this.getViewIndex(data.chair)
        if(index!=0) this.handCards[index].getComponent("HandPoker").showPoker(data.cardsinfo);
    }

    //玩家弃牌
    playerFold(data:any){
        let chair = this.getViewIndex(data.chair);
        this.players[chair].getComponent("Player").fold();
        this.players[chair].getComponent("Player").funcnotice(5);
        this.handCards[chair].getComponent("HandPoker").lose(2);
        Desk.removeUserByChair(data.chair);  
    }

    //玩家看牌
    userCheck(data: any,totalTime: number, remainTime: number){
        let chair = this.getViewIndex(data.chair);
        this.players[chair].getComponent("Player").funcnotice(3);
        if(data.newctd != -1){//重置看牌人倒计时
            this.players[chair].getComponent("Player").reCountDown(totalTime,remainTime);
        }
        if(chair == 0){//自己看牌
            this.handCards[chair].getComponent("HandPoker").showPoker(data.cardsinfo);
            this.option.getComponent("Option").updateCheck(true);
            if(!this.preChair) this.preChair = chair;//上一个下注的人
            this.players[this.preChair].getComponent("Player").stopCountDown();//停止上一个下注的人的倒计时
            this.players[chair].getComponent("Player").countDown(totalTime,data.newctd)//开始倒计时
            this.option.getComponent("Option").updateBtn(true, Desk.getUserNumInGame() == 2, this.someOneAllIn);
            return;
        }
        this.handCards[chair].getComponent("HandPoker").checkAnimation();//别人看牌
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

    //下注
    betting(data: any, type?: number){
        let index = this.getViewIndex(data.chair);
        let value = data.betmoney;
        this.pool.string = String(CommonTool.cutNum(Number(this.pool.string)+value,2));//设置底池
        if(data.residuemoney) this.players[index].getComponent("Player").updateUserGold(data.residuemoney);//更新个人剩余金币
        this.players[index].getComponent("Player").stopCountDown();//先停止下注的人的倒计时
        this.bbb(index,value);
    }

    bbb(index: number,val:number){
        this.handCards[index].getComponent("HandPoker").setBets(val)//更新个人下注总量
        this.players[index].getComponent("Player").stopCountDown();//先停止下注的人的倒计时
        let pos = this.getPosByChair(index);
        let chips_ = this.splitChips(val);
        for(let i=0; i<chips_.length; ++i){
            let chip = this.getChip();
            let k = this.chipConfig.indexOf(chips_[i]);
            chip.getComponent("Chip").setValue(chips_[i],k);
            this.node.addChild(chip);
            chip.setPosition(pos);
            let x = Math.random()*400-200;
            let y = Math.random()*120;
            let m2 = cc.moveTo(0.2,cc.v2(x,y));
            chip.runAction(m2);
            this.deskChip.push(chip);
        }
    }

    settle(data: any){
        this.stopAllUserCount();
        let settleinfo = data.settleinfo;
        let cardsinfo = data.cardsinfo;
        for(let i=0; i<cardsinfo.length; ++i){
            let index = this.getViewIndex(cardsinfo[i].chair);
            this.handCards[index].getComponent("HandPoker").showPoker(cardsinfo[i]);
        }

        for(let i=0; i<settleinfo.length; ++i){
            let chair =this.getViewIndex(settleinfo[i].chair);
            let player = this.players[chair].getComponent("Player");
            player.flyNumber(settleinfo[i].moneychange);
            player.updateUserGold(settleinfo[i].money);
            if(settleinfo[i].moneychange > 0){//赢家
                let pos = this.getPosByChair(chair);
                for(let i=0; i<this.deskChip.length; ++i){//飞筹码
                    let de = Math.floor(i/5)
                    let delay = cc.delayTime(de*0.1);
                    let m2 = cc.moveTo(0.1,pos);
                    let call = cc.callFunc((sender)=>{
                        this.chipPool.put(sender);
                    })
                    let seq = cc.sequence(delay,m2,call);
                    this.deskChip[i].runAction(seq);
                }
                player.win();
                if(chair == 0){//我自己播赢钱动画
                    this.aniView.getComponent("AnimationView").playerWin();
                }else{//播输钱动画
                    this.aniView.getComponent("AnimationView").playerLose();
                }
            }

            if(chair == 0) {
                this.handCards[chair].getComponent("HandPoker").ActiveShowCard();
                MySelf.updateMoney(settleinfo[i].money);
            }
        }
        this.option.getComponent("Option").reSetBtns();//重置按钮
        let seq = cc.sequence(cc.delayTime(3),cc.callFunc(()=>{this.reStart()}))
        this.node.runAction(seq);
    }

    updateRound(count:number){
        this.round.string = "第"+count+"/"+this.totalRound+"轮";  
    }

    //轮谁下注
    turn(data: any,totalTime: number,remainTime: number){
        let chair = this.getViewIndex(data.chair);
        this.updateRound(data.round);
        if(!this.preChair) this.preChair = chair;//上一个下注的人
        this.players[this.preChair].getComponent("Player").stopCountDown();//停止上一个下注的人的倒计时
        this.players[chair].getComponent("Player").countDown(totalTime,remainTime)//开始倒计时
        this.option.getComponent("Option").updateBtn(chair == 0,Desk.getUserNumInGame() == 2,this.someOneAllIn,data.minmoney);
    }
    
    //玩家加入房间
    userJoin(data:any){
        let chair = this.getViewIndex(data.chair);
        let player = this.players[chair];
        player.active = true;
        player.getComponent("Player").setInfo(data);
        this.handCards[chair].getComponent("HandPoker").saveChair(data.chair);
        let oldPos = player.getPosition();
        let newpos = cc.v2(cc.winSize.width/2+player.getChildByName("headBg").getContentSize().width/2,oldPos.y);
        if(chair > 2){
            newpos = cc.v2(-cc.winSize.width/2-player.getChildByName("headBg").getContentSize().width/2,oldPos.y);
        }
        if(chair == 0){
            newpos = cc.v2(oldPos.x,-cc.winSize.height/2-player.getChildByName("headBg").getContentSize().height/2); 
        }
        player.setPosition(newpos);
        player.runAction(cc.moveTo(0.2,oldPos));
        if(this.gamestage != GameState.ONGOING) Desk.pushUser(data.chair);
    }

    //重新开始
    reStart(){
        this.gamestage = GameState.OVER;
        for(let i=0; i<this.players.length; ++i){
            this.players[i].getComponent("Player").reSet();
            this.handCards[i].getComponent("HandPoker").reSet();
        }
        this.option.getComponent("Option").reSetBtns();//重置按钮
        this.option.getComponent("Option").updateCheck(false);
        this.updateRound(0);
        this.pool.string = "";
        this.deskChip.length = 0;
        this.someOneAllIn = false;
    }

    stopAllUserCount(){
        for(let i=0; i<this.players.length; ++i){
            this.players[i].getComponent("Player").stopCountDown();
        }
    }
    //亮牌
    userShowCard(data:any){
        let index = this.getViewIndex(data.chair);
        this.handCards[index].getComponent("HandPoker").showPoker(data.cardsinfo); 
    }

    //玩家退出房间
    userLeave(data:any){
        let chair = this.getViewIndex(data.lkwjyzh);
        let player = this.players[chair]
        player.getComponent("Player").onExit();
        this.handCards[chair].getComponent("HandPoker").saveChair(-1);
        let oldPos = player.getPosition();
        let newpos = cc.v2(cc.winSize.width/2+player.getChildByName("headBg").getContentSize().width/2,oldPos.y)
        if(chair > 2){
            newpos =cc.v2(-cc.winSize.width/2-player.getChildByName("headBg").getContentSize().width/2,oldPos.y)
        }
        let call = cc.callFunc(()=>{
            player.getComponent("Player").onExit();
            this.handCards[chair].getComponent("HandPoker").onExit();
        })
        let seq = cc.sequence(cc.moveTo(0.2,newpos),call)
        player.runAction(seq);
        if(Desk.getUserNum() < 2){
            this.aniView.getComponent("AnimationView").waitNotice(1);
        }
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
            this.handCards[index].getComponent("HandPoker").onClick();
        }
    }
    
    //玩家All In
    AllIn(data: any){
        this.someOneAllIn = true;
        //播全压动画
        let index = this.getViewIndex(data.chair);
        let player = this.players[index].getComponent("Player");
        player.funcnotice(6);
        player.updateUserGold(data.residuemoney);//更新个人剩余金币
        this.pool.string = String(CommonTool.cutNum(Number(this.pool.string)+data.betmoney,2));//设置底池
        this.handCards[index].getComponent("HandPoker").setBets(data.betmoney)//更新个人下注总量
        //飞十个最大面值的筹码出去
        let val = this.chipConfig[this.chipConfig.length-1]*10;
        this.bbb(index,val);
        if(data.win != -1)  this.startCompare({chair:data.chair,win:data.win,lose:data.lose,residuemoney:data.residuemoney});
    }

    //开始比牌
    startCompare(data:any){
        //先扔筹码
        this.mask.active = false;
        this.handCards.forEach(element => {
            element.getComponent("HandPoker").offClick();
            element.zIndex = BaseDef.ZOrder.BOTTOM;
        });
        let index = this.getViewIndex(data.chair);
        this.players[index].getComponent("Player").updateUserGold(data.residuemoney);
        this.bbb(index,data.betmoney);
        this.aniView.getComponent("AnimationView").compareAnimation(data);
    }
    
    setBgm(){
        let on_off = localData.getData("on_off");
       if(on_off){
           this.bgm.getComponent(cc.AudioSource).play();
       }else{
            this.bgm.getComponent(cc.AudioSource).stop();
        }
    }

    setBtnVoice(){
        let on_off = localData.getData("on_off");
        let sprite_normal = on_off == false ? this.sprite_2_normal : this.sprite_1_normal;
        let sprite_pressed = on_off == false ? this.sprite_2_pressed : this.sprite_1_pressed;
        let voiceBtn = cc.find("btns/btn_voice",this.node);
        voiceBtn.getComponent(cc.Button).normalSprite = sprite_normal;
        voiceBtn.getComponent(cc.Button).pressedSprite = sprite_pressed;
        voiceBtn.getComponent(cc.Button).hoverSprite = sprite_normal;
        voiceBtn.getComponent(cc.Button).disabledSprite = sprite_normal;
    }

    onGameExit(){
        let antionManager = cc.director.getActionManager();
        antionManager.removeAllActions();//移除所有正在执行的动作
        for(let i=0; i<5; ++i){
            this.players[i].getComponent("Player").onExit();
            this.handCards[i].getComponent("HandPoker").onExit();
        }
    }

    
}
