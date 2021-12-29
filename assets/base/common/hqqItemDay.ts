const {ccclass, property} = cc._decorator;

@ccclass
export default class hqqItemDay extends cc.Component{
    @property(cc.Label)
    lbDay:cc.Label = null;
    @property(cc.Sprite)
    spSel:cc.Sprite = null;
    @property(cc.Sprite)
    spSel2:cc.Sprite = null;

    index:number = null;
    year:number = null;
    month:number = null;
    day:number = null;
    cb:Function = null;

    setDay(index, year, month, day, sel, sel2,cb) {
        this.index = index;
        this.year = year;
        this.month = month;
        this.day = day;
        this.cb = cb;

        this.lbDay.string = day;
        this.spSel.enabled = sel;
        this.spSel2.enabled = sel2;
    }

    onClickItem() {
        if (this.cb) {
            cc.log("this.index=",this.index, " this.year=",this.year, " this.month=",this.month, " this.day=",this.day," this.spSel2.enabled=",this.spSel2.enabled)
            this.cb(this.index, this.year, this.month, this.day,this.spSel2.enabled);
        }
    }
}