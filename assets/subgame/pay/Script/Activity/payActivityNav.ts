
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

    @property(cc.Prefab)
    RechargeRebate: cc.Prefab = null;//充值返利
    @property(cc.Prefab)
    RecommendFriends: cc.Prefab = null;//推荐好友

    @property(cc.Prefab)
    FirstGiveGold: cc.Prefab = null;

    @property(cc.Prefab)
    ChongZhiManESong: cc.Prefab = null;
    @property(cc.Prefab)
    KaiYeZhuCeSong: cc.Prefab = null;
    @property(cc.Prefab)
    TestRechargeRebate: cc.Prefab = null;

    @property
    app = null;
    name = null;
    id = null ;
    data = null;
    title = null;
    public init(data){
        this.name =data.name;
        this.id = data.id;
        this.data = data;
        //显示导航
        if(data.name == '流水闯关活动'){
            this.app.loadIcon('activity/btn_huodong2',this.normalIcon,242,86)
            this.app.loadIcon('activity/btn_huodong1',this.currentIcon,249,86);
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
        else if(data.name == "充值返利"){
            this.app.loadIcon('activity/btn_cashback2',this.normalIcon,242,86)
            this.app.loadIcon('activity/btn_cashback1',this.currentIcon,249,86);
            
        }
        else if(data.name == "推荐好友"){
            this.app.loadIcon('activity/btn_referralFee2',this.normalIcon,242,86)
            this.app.loadIcon('activity/btn_referralFee1',this.currentIcon,249,86);
            
        }
        else if(data.name == "首充赠金1"){
            this.app.loadIcon('activity/btn_firstR2',this.normalIcon,242,86)
            this.app.loadIcon('activity/btn_firstR1',this.currentIcon,249,86);
            
        }
        else if(data.name == "开业注册送1"){
            this.app.loadIcon('activity/btn_sugb2',this.normalIcon,242,86)
            this.app.loadIcon('activity/btn_sugb1',this.currentIcon,249,86);
            
        }
        else if(data.name == "次日存送1"){
            this.app.loadIcon('activity/btn_fgwp2',this.normalIcon,242,86)
            this.app.loadIcon('activity/btn_fgwp1',this.currentIcon,249,86);
            
        }
        else if(data.name == "充值返利1"){
            this.app.loadIcon('activity/btn_cashback2',this.normalIcon,242,86)
            this.app.loadIcon('activity/btn_cashback1',this.currentIcon,249,86);
            
        }
    }
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.title = cc.find("Canvas/Activity/header/txt_title").getComponent(cc.Sprite)
    }

    onClick(){
        //按键音效
        this.app.clickClip.play();
        if(this.name == '流水闯关活动'){
            this.app.showLoading();
            this.addContent('ChuangGuan',JSON.parse(this.data.info),this.id)
        }else if(this.name == '救济金活动'){
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
            this.app.showLoading();
            this.addContent('每周佣金奖励',JSON.parse(this.data.info),this.id);
        }
        else if(this.name == "15天送58元") {
            this.addNewPlayerGift('15天送58元')
        }
        else if(this.name == "充值返利") {
            this.addNewPlayerGift('充值返利')
        }
        else if(this.name == "推荐好友") {
            this.addNewPlayerGift('推荐好友')
        }
        else if(this.name == "首充赠金1") {
            this.addNewPlayerGift('首充赠金1')
        }
        else if(this.name == "开业注册送1") {
            this.addNewPlayerGift('开业注册送1')
        }
        else if(this.name == "次日存送1") {
            this.addNewPlayerGift('次日存送1')
        }
        else if(this.name == "充值返利1") {
            this.addNewPlayerGift('充值返利1')
        }
    }

    addContent(data,info,id){
        var content = cc.find('Canvas/Activity/Content');
        if(data == 'ChuangGuan'){
            var node = cc.instantiate(this.ChuangGuan);
            content.removeAllChildren();
            node.getComponent('payChuangGuan').setId(id,'流水闯关活动');
            content.addChild(node);
            this.app.loadTitle('title/txt_title02',this.title);
        }else if(data == 'FreeGold'){
            var node = cc.instantiate(this.FreeGold);
            content.removeAllChildren();
            node.getComponent('payFreeGold').setIdInfo(id,info);
            content.addChild(node);
            this.app.loadTitle('title/alms_zi2',this.title);
        }else if(data == 'DailyActivity'){
            var node = cc.instantiate(this.DailyActivity);
            content.removeAllChildren();
            node.getComponent('payDailyActivity').setIdInfo(id,info);
            content.addChild(node);
            this.app.loadTitle('title/dm_title',this.title);
        }else if(data == '每周佣金奖励'){
            var node = cc.instantiate(this.OnceWeekGift);
            content.removeAllChildren();
            node.getComponent('payOnceWeekGift').setIdInfo(id,info);
            content.addChild(node);
            this.app.loadTitle('title/dm_title_weeklyCms',this.title);
        }
    }
    addContentFirstRechargeSendGold(){
        var content = cc.find('Canvas/Activity/Content');
        var node = cc.instantiate(this.FirstRechargeSendGold)
        content.removeAllChildren();
        content.addChild(node);
        this.app.loadTitle('title/scsj',this.title);
    }
    addNewPlayerGift(name){
        var content = cc.find('Canvas/Activity/Content');
        if (name == "新人大礼包"){
            var node = cc.instantiate(this.NewPlayerGift)
            this.app.loadTitle('title/dm_title_starterPack',this.title);
        }else if(name == "月入百万"){
            var node = cc.instantiate(this.OneMonthMillion)
            this.app.loadTitle('title/dm_title_millionIncome',this.title);
        }else if (name == "15天送58元") {
            var node = cc.instantiate(this.HalfMonthGift)
            this.app.loadTitle('title/dm_title_58for15days',this.title);
        }else if (name == "充值返利") {
            var node = cc.instantiate(this.RechargeRebate)
            this.app.loadTitle('title/dm_title_cashback',this.title);
        }else if (name == "推荐好友") {
            var node = cc.instantiate(this.RecommendFriends)
            this.app.loadTitle('title/dm_title_referralFee',this.title);
        }else if (name == "首充赠金1") {
            var node = cc.instantiate(this.FirstGiveGold)
            this.app.loadTitle('title/dm_title_firstR',this.title);
        }else if (name == "开业注册送1") {
            var node = cc.instantiate(this.KaiYeZhuCeSong)
            this.app.loadTitle('title/dm_title_sugb',this.title);
        }else if (name == "次日存送1") {
            var node = cc.instantiate(this.ChongZhiManESong)
            this.app.loadTitle('title/dm_title_fgwp',this.title);
        }else if (name == "充值返利1") {
            var node = cc.instantiate(this.TestRechargeRebate)
            this.app.loadTitle('title/dm_title_cashback',this.title);
        }
        content.removeAllChildren();
        content.addChild(node);
    }
    // update (dt) {}
}
