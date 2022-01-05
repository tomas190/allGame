
const {ccclass, property} = cc._decorator;
import StateTools from "../../CYLHDStateTools"
import * as StCom from "../../CYLHDStateCommon"
import * as Conf from "../../CYLHDStateConfig"

@ccclass
export default class CYLHDBetRecordItem extends cc.Component {

    @property(cc.Label)
    issueID: cc.Label = null;

    @property(cc.Label)
    luckyNum: cc.Label = null;// 开奖号

    @property(cc.Label)
    positionSelect: cc.Label = null;

    @property(cc.Label)
    bets: cc.Label[] = [];// 7个类型值

    @property(cc.Label)
    luckyType: cc.Label = null;

    @property(cc.Label)
    offsetVal: cc.Label = null;

    private posIndex:number;// 选中位置 1~5：万～个

    // {"issueID":"2021-02-24 14:48:00","luckyNum":"7,5,0,3,1","bets":[{"type":4,"val":200,"position":5},{"type":3,"val":200,"position":5}],"offset":-10}
    init(index, sum, info):void{
        console.log('info = ', JSON.stringify(info))
        this.setPosition(info.bets)

        this.issueID.string = info.issueID.replace(/\s/, '\n')
        this.luckyNum.string = StateTools.getStringLucky(info.luckyNum)
        this.offsetVal.string = StateTools.valShow(info.offset)

        this.positionSelect.string = this.luckyNum.string[this.posIndex-1]
        this.updateLuckyTypes(info.luckyNum, this.posIndex)
        this.updateBets(info.bets)
        this.updateBorder(index, sum)

        if(hqq.cylhd_BetArea=="lhds"){
            this.bets[0].node.active=false;
            this.bets[3].node.active=false;
            this.bets[4].node.active=false;
            this.bets[1].node.y=0;
            this.bets[2].node.x=-42.532;
            this.bets[2].node.y=0;
            this.bets[5].node.y=0;
            this.bets[6].node.y=0;
        }else if(hqq.cylhd_BetArea=="lhdx"){
            this.bets[0].node.active=false;
            this.bets[5].node.active=false;
            this.bets[6].node.active=false;
            this.bets[1].node.y=0;
            this.bets[2].node.x=-42.532;
            this.bets[2].node.y=0;
            this.bets[3].node.x=53.71;
            this.bets[3].node.y=0;
            this.bets[4].node.x=151.48;
            this.bets[4].node.y=0;
        }
    }

    private updateLuckyTypes(luckyNum, position) {
		const tps = StateTools.getPrizeTypesFromLuckyNum(luckyNum, position)
		const animalType = tps[0]
			, smallBigType = tps[1]
			, oddEvenType = tps[2]

        let names = Conf.GamePlayWay.TypeName
        this.luckyType.string = names[animalType] + ' ' + names[smallBigType] + ' ' + names[oddEvenType];
        if(hqq.cylhd_BetArea=="lhds"){
            this.luckyType.string = names[animalType] + ' ' + names[oddEvenType];
        }else if(hqq.cylhd_BetArea=="lhdx"){
            this.luckyType.string = names[animalType] + ' ' + names[smallBigType];
        }
    }

    private updateBets(bets) {
        let a = [0, 0, 0, 0, 0, 0, 0]//new Array(StCom.TypeBet.Even+1)
        let s = new Array(a.length)
        a.forEach((v,k)=>{
            s[k] = this.getTypeBetVal(bets, k)
        })
        s.forEach((v,k)=>{
            this.bets[k].string += v
        })
    }

    private updateBorder(index, sum) {
        if(sum==1)  return
        if(index>0 && index<sum-1)  return

        let b0 = this.node.getChildByName('border0')
        let b1 = this.node.getChildByName('border1')
        b1.active = false
        b0.active = true
        b0.scaleY = index==0 ? 1 : -1
    }

    private getTypeBetVal(bets, type) :number {
        let v = 0
        bets.forEach(b=>{
            if(b.type==type) {
                v = b.val
            }
        })
        return v
    }

    private setPosition(bets) {
		let p = 5
		for(let i in bets) {
			let b = bets[i]
			if(b.type<StCom.TypeBet.Big)	continue
			p = b.position
			break
		}

        this.posIndex = p
    }

}
