
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    normalIcon: cc.Node = null;

    @property(cc.Node)
    currentIcon: cc.Node = null;

    @property(cc.Prefab)
    ChuangGuan : cc.Prefab = null;

    @property(cc.Prefab)
    HuoDong : cc.Prefab = null;

    @property(cc.Prefab)
    FreeGold : cc.Prefab = null;

    @property(cc.Prefab)
    DailyActivity : cc.Prefab = null;

    @property(cc.Prefab)
    FirstRechargeSendGold: cc.Prefab = null;

    @property(cc.Prefab)
    NewPlayerGift: cc.Prefab = null;
    @property(cc.Prefab)
    HalfMonthGift: cc.Prefab = null;
    @property(cc.Prefab)
    OnceWeekGift: cc.Prefab = null;
    @property(cc.Prefab)
    OneMonthMillion: cc.Prefab = null;

    @property
    app = null;
    name = null;
    id = null ;
    data = null;
    public init(data){
        this.name =data.name;
        this.id = data.id;
        this.data = data;
        //显示导航
        if(data.name == '流水闯关活动'){
            this.app.loadIcon('activity/btn_huodong2',this.normalIcon,242,86)
            this.app.loadIcon('activity/btn_huodong1',this.currentIcon,249,86);
        }
        else if(data.name == '存送活动'){
            this.app.loadIcon('cash/menu/menu_ali_1',this.normalIcon,242,86)
            this.app.loadIcon('cash/menu/menu_ali_2',this.currentIcon,249,86);
        }
        else if(data.name == '救济金活动'){
            this.app.loadIcon('activity/menu_alms_2',this.normalIcon,242,86)
            this.app.loadIcon('activity/menu_alms_1',this.currentIcon,249,86);
        }
        else if(data.name == '首充送金活动'){
            this.app.loadIcon('activity/btn_scsj2',this.normalIcon,242,86)
            this.app.loadIcon('activity/btn_scsj',this.currentIcon,249,86);
        }
        else if(data.name == '每日任务'){
            this.app.loadIcon('activity/btn_dailyMission2',this.normalIcon,242,86)
            this.app.loadIcon('activity/btn_dailyMission1',this.currentIcon,249,86);
        }
        else if(data.name == '新人大礼包'){
            this.app.loadIcon('activity/btn_starterPack2',this.normalIcon,242,86)
            this.app.loadIcon('activity/btn_starterPack1',this.currentIcon,249,86);
        }
        else if(data.name == '月入百万'){
            this.app.loadIcon('activity/btn_millionIncome2',this.normalIcon,242,86)
            this.app.loadIcon('activity/btn_millionIncome1',this.currentIcon,249,86);
        }
        else if(data.name == '每周佣金奖励'){
            this.app.loadIcon('activity/btn_weeklyCms2',this.normalIcon,242,86)
            this.app.loadIcon('activity/btn_weeklyCms1',this.currentIcon,249,86);
        }
        else if(data.name == '15天送58元'){
            this.app.loadIcon('activity/btn_58for15days2',this.normalIcon,242,86)
            this.app.loadIcon('activity/btn_58for15days1',this.currentIcon,249,86);
        }
    }
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
    }

    onClick(){
        if(this.name == '流水闯关活动'){
            this.app.showLoading();
            this.addContent('ChuangGuan',JSON.parse(this.data.info),this.id)
        }else if(this.name == '存送活动'){
            this.addContent('HuoDong',JSON.parse(this.data.info),this.id)
        }
        else if(this.name == '救济金活动'){
            this.app.showLoading();
            this.addContent('FreeGold',JSON.parse(this.data.info),this.id)
        }
        else if(this.name == '首充送金活动'){
            this.addContentFirstRechargeSendGold()
        }
        else if(this.name == '每日任务'){
            this.app.showLoading();
            this.addContent('DailyActivity',JSON.parse(this.data.info),this.id)
        }
        else if(this.name == "新人大礼包") {
            this.addNewPlayerGift('新人大礼包')
        }
        else if(this.name == "月入百万") {
            this.addNewPlayerGift('月入百万')
        }
        else if(this.name == "每周佣金奖励") {
            this.addNewPlayerGift('每周佣金奖励')
        }
        else if(this.name == "15天送58元") {
            this.addNewPlayerGift('15天送58元')
        }
    }

    addContent(data,info,id){
        var content = cc.find('Canvas/Activity/Content');
        if(data == 'ChuangGuan'){
            var node = cc.instantiate(this.ChuangGuan);
            content.removeAllChildren();
            node.getComponent('payChuangGuan').setId(id,'流水闯关活动');
            content.addChild(node);
            
        }else if(data == 'HuoDong'){
            var node = cc.instantiate(this.HuoDong);
            content.removeAllChildren();
            content.addChild(node);
        }else if(data == 'FreeGold'){
            var node = cc.instantiate(this.FreeGold);
            content.removeAllChildren();
            node.getComponent('payFreeGold').setIdInfo(id,info);
            content.addChild(node);
        }else if(data == 'DailyActivity'){
            var node = cc.instantiate(this.DailyActivity);
            content.removeAllChildren();
            node.getComponent('payDailyActivity').setIdInfo(id,info);
            content.addChild(node);
        }
    }
    addContentFirstRechargeSendGold(){
        var content = cc.find('Canvas/Activity/Content');
        var node = cc.instantiate(this.FirstRechargeSendGold)
        content.removeAllChildren();
        content.addChild(node);
    }
    addNewPlayerGift(name){
        var content = cc.find('Canvas/Activity/Content');
        if (name == "新人大礼包"){
            var node = cc.instantiate(this.NewPlayerGift)
        }else if(name == "月入百万"){
            var node = cc.instantiate(this.OneMonthMillion)
        }else if (name == "每周佣金奖励") {
            var node = cc.instantiate(this.OnceWeekGift)
        }else if (name == "15天送58元") {
            var node = cc.instantiate(this.HalfMonthGift)
        }
        content.removeAllChildren();
        content.addChild(node);
    }
    // update (dt) {}
}
