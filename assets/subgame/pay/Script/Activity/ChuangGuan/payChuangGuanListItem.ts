
import payMain from '../../payMain';
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    date:cc.Label = null

    @property(cc.Label)
    statement:cc.Label = null;

    @property(cc.Label)
    gold:cc.Label = null;

    @property(cc.Label)
    time:cc.Label = null;
    app :payMain= null;

    onLoad(){
        this.app = cc.find('Canvas/Main').getComponent('payMain');
    }
    init(data){
        // this.date.string = data.date;
        this.date.string = this.app.config.getDate(data.time);
        this.statement.string = this.app.config.toDecimal(data.statement);
        this.gold.string = data.gold;
        this.time.string = this.app.config.getTime2(data.time);
    }
}
