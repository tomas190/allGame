import msgSender from "./net/msgSender"
import Desk from "./Desk"

const {ccclass, property} = cc._decorator;

@ccclass
export default class Option extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    @property
    round:number = 1;

    @property
    minBet:number = null;

    @property
    keepBet:boolean = false;

    @property
    isCheck:boolean = false;

    @property
    config1:any = [];

    @property
    config2:any = [];

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
                    let myIndex = this.node.getParent().getComponent("Game").myIndex;
                    for(let i=0; i<indexs.length; ++i){
                        if(indexs[i]!== myIndex){
                            msgSender.playerCmpWithOther(indexs[i]);
                            return;
                        }
                    }
                }
                this.node.getParent().getComponent("Game").compareReq();
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
               this.followBet();
                break;
            case 7://跟到底
                let mark = this.btns[7].getChildByName("checkMark");
                mark.active = !mark.active;
                this.keepBet = mark.active;
                break;
            case 8://弃牌
                msgSender.playerDisCardReq();
                break;
        }
    }
    
    followBet(){
        msgSender.playerBetReq(this.minBet);
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

    updateBtn(isMe: boolean,allIn:boolean,someOneAllIn:boolean,currentBet?:number){
        if(currentBet){
            this.minBet = this.isCheck ? currentBet*2 : currentBet;//自己看牌下双倍注
        }else if(this.minBet){
            this.minBet = this.isCheck ? this.minBet*2 : this.minBet;//自己看牌下双倍注
        }
        this.updateAdd();
        if(this.keepBet){//跟到底
            this.followBet();
            return;
        }
        if(!isMe) {//不是我 只显示弃牌和跟到底
            this.btns[0].active = false;// 全押
            this.btns[1].active = false;// 比牌
            this.btns[2].active = false;// 加注1
            this.btns[3].active = false;// 加注2
            this.btns[4].active = false;// 加注3
            this.btns[5].active = false;// 看牌
            this.btns[6].active = false;// 跟注
            this.btns[7].active = true;// 跟到底
            if(this.round > 1 && !this.isCheck){//大于一回合且没有看牌则显示看牌按钮
                this.btns[5].active = true;  
            }
        }else{//是我 根据回合数和当前下注 显示按钮
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
            if(this.round == 1){
                this.btns[0].active = false;// 全押
                this.btns[1].active = false;// 比牌
                this.btns[5].active = false;// 看牌
            }else if(this.round == 2){
                this.btns[5].active = true;// 看牌
            }else{
                this.btns[1].active = true;// 比牌
            }
            if(allIn) this.btns[0].active = true;// 全押

            if(someOneAllIn){//有人ALLIN
                this.btns[1].active = false;// 比牌
                this.btns[2].active = false;// 加注1
                this.btns[3].active = false;// 加注2
                this.btns[4].active = false;// 加注3
                this.btns[5].active = false;// 看牌
                this.btns[6].active = false;// 跟注
                this.btns[7].active = false;// 跟到底
            }
            if(currentBet) this.round++;
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
        this.round = 1;
        this.minBet = null;
        this.keepBet = false;
        this.isCheck = false;
    }
}
