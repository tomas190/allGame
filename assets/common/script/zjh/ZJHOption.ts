import msgSender from "./ZJHnet/ZJHmsgSender"
import Desk = require("./ZJHDesk")
const {ccclass, property} = cc._decorator;

@ccclass
export default class ZJHOption extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    @property
    minBet:number = null;

    @property
    round:number = 0;

    @property
    keepBet:boolean = false;

    @property
    isCheck:boolean = false;

    @property
    config1:any = [];

    @property
    config2:any = [];

    @property
    timer:any = null;

    @property
    myTurn:boolean = false;

    @property
    anyOneAllIn:boolean = false;

    @property([cc.Node])
    btns:cc.Node[] = [];

    updateCheck(flag:boolean){
         this.isCheck =  flag;  
    }

    //下注
    bet(event:any,id:number){
        let index = Number(id);
        switch(index)
        {
            case 0://全押
                msgSender.playerAllInReq();
                break;
            case 1://比牌
                let indexs = Desk.getUsersInGame();
                if(indexs.length === 2){
                    let myIndex = this.node.getParent().getComponent("ZJHGame").myIndex;
                    for(let i=0; i<indexs.length; ++i){
                        if(indexs[i]!== myIndex){
                            msgSender.playerCmpWithOther(indexs[i]);
                            return;
                        }
                    }
                }
                this.node.getParent().getComponent("ZJHGame").compareReq();
                break;
            case 2:{
                    let list = this.isCheck ? this.config2 : this.config1;
                    msgSender.playerBetReq(list[1]);
                }
                break;
            case 3:{
                    let list = this.isCheck ? this.config2 : this.config1;
                    msgSender.playerBetReq(list[2]);
                 }
                break;
            case 4:{
                    let list = this.isCheck ? this.config2 : this.config1;
                    msgSender.playerBetReq(list[3]);
                }
                break;
            case 5://看牌
                msgSender.playerSeeCardReq();
                break;
            case 6://跟注
                msgSender.playerBetReq(this.minBet)
                break;
            case 7://跟到底
                this.markeepFollow();
                if(this.myTurn) this.updateBtn(this.round,this.myTurn,Desk.getUserNumInGame() == 2,this.anyOneAllIn,this.minBet,true);
                break;
            case 8://弃牌
                msgSender.playerDisCardReq();
                break;
        }
    }
    
    followBet(){
        this.timer = setTimeout(()=>{ 
            msgSender.playerBetReq(this.minBet);
            clearTimeout(this.timer);//跟到底情况下再次点击 取消跟到底
            this.timer = null; 
        },1000)
    }

    markeepFollow(){
        let mark = this.btns[7].getChildByName("checkMark");
        if(mark.active && this.timer){
            clearTimeout(this.timer);//跟到底情况下再次点击 取消跟到底
            this.timer = null;
        }
        mark.active = mark.active ? false : true;
        this.keepBet = mark.active;
    }

    initConfig(list:number []){
        for(let i=0; i<list.length;++i){//第一个是低注 不用考虑
            this.config1[i] = list[i];
            this.config2[i] = list[i]*2;
            if(i == 0) continue;
            let lblStr = cc.find("layout/lbl",this.btns[i+1]);
            let str =String(list[i]).replace(".","/");
            lblStr.getComponent(cc.Label).string = str;
        }
        
    }

    //更新加注按钮
    updateAdd(){
        let list = this.isCheck ? this.config2 : this.config1;
        for(let i=1; i<list.length;++i){//第一个是低注 不用考虑
            let lblStr = cc.find("layout/lbl",this.btns[i+1]);
            let str =String(list[i]).replace(".","/");
            lblStr.getComponent(cc.Label).string = str;
        }
    }

    hideCheck(bVisible: boolean){
        this.btns[5].active = bVisible;// 看牌
    }

    updateBtn(round:number,isMe: boolean,allIn:boolean,someOneAllIn:boolean,currentBet?:number,flag ?:boolean){
        this.round = round;
        this.myTurn = isMe;
        this.anyOneAllIn = someOneAllIn;
        if(!flag && currentBet){
                this.minBet = this.isCheck ? currentBet*2 : currentBet;//自己看牌下双倍注
        }else if(!flag && this.minBet){
            this.minBet = this.isCheck ? this.minBet*2 : this.minBet;//自己看牌下双倍注
        }
        this.updateAdd();
        if(round >= 2 && !this.isCheck) this.btns[5].active = true;// 看牌
        if(!isMe) {//不是我 只显示弃牌和跟到底
            this.btns[0].active = false;// 全押
            this.btns[1].active = false;// 比牌
            this.btns[2].active = false;// 加注1
            this.btns[3].active = false;// 加注2
            this.btns[4].active = false;// 加注3
            this.btns[5].active = false;// 看牌
            this.btns[6].active = false;// 跟注
            this.btns[7].active = true;// 跟到底
        }else{//是我 根据回合数和当前下注 显示按钮
            if(this.keepBet && !someOneAllIn){//跟到底
                this.followBet();
            }else{
                let list = this.isCheck ? this.config2 : this.config1;
                let index = list.indexOf(this.minBet);
                for(let i=2; i<=4; ++i){
                    if(index == -1) {
                        this.btns[i].active = false;
                    }else{
                        if(i<=index+1) {
                            this.btns[i].active = false;
                            continue; 
                        }
                        this.btns[i].active = true;
                    }
                }
                this.btns[6].active = true;// 轮到我始终要显示跟注
                this.btns[7].active = false;//跟到底
                if(round > 2){
                    this.btns[1].active = true;// 比牌
                    if(allIn) this.btns[0].active = true;// 全押
                }
                if(someOneAllIn){//有人ALLIN
                    this.btns[0].active = true;// 全押
                    this.btns[1].active = false;// 比牌
                    this.btns[2].active = false;// 加注1
                    this.btns[3].active = false;// 加注2
                    this.btns[4].active = false;// 加注3
                    this.btns[5].active = false;// 看牌
                    this.btns[6].active = false;// 跟注
                    this.btns[7].active = false;// 跟到底
                    this.markeepFollow();
                }
            }
        }
    }
    
    reSetBtns(){
        this.btns[0].active = false;// 全押
        this.btns[1].active = false;// 比牌
        this.btns[2].active = false;// 加注1
        this.btns[3].active = false;// 加注2
        this.btns[4].active = false;// 加注3
        this.btns[5].active = false;// 看牌
        this.btns[6].active = false;// 跟注
        this.btns[7].active = true;// 跟到底
        this.btns[7].getChildByName("checkMark").active = false;
        this.minBet = null;
        this.keepBet = false;
        this.isCheck = false;
        this.myTurn = false;
        this.round = 0
        this.anyOneAllIn = false;
    }
}
