import baseDef from "./BaseDef"
import commonTool from "./CommonTool"

let GameLogic = {

    //返回牌型
    getCardType(list:number[]):number{
        let arr = commonTool.reConversion(list);
        arr.sort(function(a,b){return a-b});
        if(this.isBoom(arr)) return baseDef.CARD_TYPE.LEOPARD;
        if(this.isStarightFlower(arr)) return baseDef.CARD_TYPE.STRAIGHT_FLOWER;
        if(this.isFloower(arr)) return baseDef.CARD_TYPE.FLOWER;
        if(this.isStaright(arr)) return baseDef.CARD_TYPE.STRAIGHT;
        if(this.isTwain(arr)) return baseDef.CARD_TYPE.TWAIN;
        return baseDef.CARD_TYPE.SINGLE;
    },

    //判断豹子
    isBoom(list): boolean{
        if(Math.floor(list[0]/4) == Math.floor(list[1]/4) && Math.floor(list[1]/4) == Math.floor(list[2]/4)) return true
        return false;
    },

    //判断金花
    isFloower(list): boolean{
        if(list[0]%4 == list[1]%4 && list[1]%4 == list[2]%4) return true;
        return false;
    },

    //判断顺子
    isStaright(list): boolean{
        if(Math.floor(list[0]/4)+1 == Math.floor(list[1]/4) && Math.floor(list[1]/4)+1 == Math.floor(list[2]/4)) return true;
        return false
    },

    //判断顺金
    isStarightFlower(list): boolean{
        if(this.isFloower(list) && this.isStaright(list)) return true;
        return false;
    },

    //判断对子
    isTwain(list):boolean{
        if(Math.floor(list[0]/4) == Math.floor(list[1]/4) || Math.floor(list[1]/4) == Math.floor(list[2]/4)) return true
        return false;
    },

}

export default GameLogic;