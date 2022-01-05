
const {ccclass, property} = cc._decorator;
// import ebgMusicMgr from './ebgMusicMgr';
import StateTools from "../../CYLHDStateTools";
// import AssistFunc from "../../CYLHDAssistFunc";
@ccclass
export default class CYLHDPrizeHistoryItem extends cc.Component {

    @property(cc.Label)
    issueID: cc.Label = null;

    @property(cc.Label)
    luckyNum: cc.Label = null;// 开奖号

    @property(cc.Label)
    animal: cc.Label = null;

    init(index:number, sumItems:number, issueID:string, luckyNum:string, callBack?:Function):void{
        this.issueID.string = issueID
        this.luckyNum.string = StateTools.getStringLucky(luckyNum)
        this.animal.string = StateTools.getChineseAnimalFromLucky(luckyNum)

        this.updateBorder(index, sumItems)
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
}
