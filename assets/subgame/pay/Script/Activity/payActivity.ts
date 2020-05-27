
const {ccclass, property} = cc._decorator;
import gHandler = require("../../../../common/script/common/gHandler");
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    NavToggle: cc.Prefab = null;

    @property(cc.Node)
    ToggleContainer: cc.Node = null;

    @property(cc.Node)
    Content:cc.Node = null;

    @property()
    public results : any = {};
    public zfbResults : any = {};
    public app = null ;
    huodongConfig = null;
    arr : any= [];

    timer = null;
    canExit = false;
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.fetchIndex();
         //设置延迟，避免用户频繁操作导致报错
         this.timer = setTimeout(() => {
            this.canExit = true;
            clearTimeout(this.timer)
        }, 1000);
        let scalex = cc.winSize.width / 1334;
        var nav = cc.find('Canvas/Activity/nav');
        this.ToggleContainer.parent.parent.height = Number(this.ToggleContainer.parent.parent.height)-Number(this.ToggleContainer.parent.parent.height)*(scalex-1)+20
        nav.scaleX= scalex;
        nav.scaleY = scalex;

        this.getNotice() 
        
    }

    public exitBtnClick(){
        //返回大厅
        if(!this.canExit) return
        //按键音效
        this.app.clickClip.play()
        cc.director.preloadScene('hall',()=>{
            cc.director.loadScene('hall');
        })
    }

    public fetchIndex(){
        var url = `${this.app.UrlData.host}/api/activity_config/activityConfig?package_id=${this.app.UrlData.package_id}&token=${this.app.token}&version=${this.app.version}`;
        this.app.ajax('GET',url,'',(response)=>{
            this.app.hideLoading()
            if (response.status == 0) {
                this.app.hideLoading();
                this.huodongConfig = response;

                this.addHuodong();
                this.addNavToggle();
            }else{
                this.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            this.app.showAlert(`${errstatus}`)
        })
    }

    public addHuodong(){
        this.huodongConfig.data.forEach((e)=>{
            if(e.is_close == 2 && (e.name =='流水闯关活动' || e.name == '救济金活动' || e.name == "首充送金活动"||e.name == "每日任务"||e.name == "新人大礼包"||e.name == "月入百万"||e.name == "每周佣金奖励"||e.name == "15天送58元")){
                this.arr.push(e);
            }
        });

    }

    public addNavToggle(){
        this.arr.sort((a,b)=>a.order_by-b.order_by);
        for(let i:number = 0; i< this.arr.length; i++){
            let data = this.arr[i];
            var node = cc.instantiate(this.NavToggle);
            this.ToggleContainer.addChild(node);
            node.getComponent('payActivityNav').init(data)
        }
        if(this.arr.length==0) return;
        
        if(this.arr[0].name == '流水闯关活动'){
            node.getComponent('payActivityNav').addContent('ChuangGuan',JSON.parse(this.arr[0].info),this.arr[0].id);
        }else if(this.arr[0].name =='存送活动'){
            node.getComponent('payActivityNav').addContent('HuoDong',JSON.parse(this.arr[0].info),this.arr[0].id);
        }else if(this.arr[0].name =='救济金活动'){
            node.getComponent('payActivityNav').addContent('FreeGold',JSON.parse(this.arr[0].info),this.arr[0].id);
        }else if(this.arr[0].name =='首充送金活动'){
            node.getComponent('payActivityNav').addContentFirstRechargeSendGold();
        }else if(this.arr[0].name =='每日任务'){
            node.getComponent('payActivityNav').addContent('DailyActivity',JSON.parse(this.arr[0].info),this.arr[0].id);
        }else if(this.arr[0].name =='新人大礼包'){
            node.getComponent('payActivityNav').addNewPlayerGift('新人大礼包');
        }else if(this.arr[0].name =='月入百万'){
            node.getComponent('payActivityNav').addNewPlayerGift('月入百万');
        }else if(this.arr[0].name =='每周佣金奖励'){
            node.getComponent('payActivityNav').addNewPlayerGift('每周佣金奖励');
        }else if(this.arr[0].name =='15天送58元'){
            node.getComponent('payActivityNav').addNewPlayerGift('15天送58元');
        }
    }
    

    /**
         * @Description: 获取公告
         */
    getNotice() {
        if (gHandler.gameGlobal.noticeList.length > 0) {
                return
            }
        let callback = (data, url) => {
            // console.log("公告 callback", data)
            if (data.code == 200) {
                if (!data.msg || data.msg.length == 0) {
                    // console.log("没有公告需要显示")
                } else {
                    let deleteNotice = gHandler.localStorage.getGlobal().noticeDeleteKey
                    data.msg.sort((a, b) => a.sort - b.sort).forEach((e, i) => {
                        if (e.type === 2) { // type == 2 是公告 == 1 是活动  is_slider
                            let isdelete = false
                            if (deleteNotice) {
                                for (let j = 0; j < deleteNotice.length; j++) {
                                    if (deleteNotice[j] == e.create_time) {
                                        isdelete = true
                                        break
                                    }
                                }
                            }
                            if (!isdelete) {
                                let notice = {
                                    key: gHandler.gameGlobal.noticeList.length,
                                    isread: 0,
                                    type: e.type,
                                    title: e.title,
                                    words: e.words,
                                    create_time: e.create_time,
                                    end_time: e.end_time,
                                    start_time: e.start_time,
                                };
                                gHandler.gameGlobal.noticeList.push(notice)
                            }
                        }
                        if (e.is_slider === 1) { // 是否跑马灯
                            gHandler.gameGlobal.slideNoticeList.push({
                                time: 1,
                                rollforver: true,
                                notice: e.words.replace(/\s+/g, "")
                            })
                        }
                    })
                    if (gHandler.gameGlobal.noticeList.length > 0) {
                        if (gHandler.hqqisShowNotice) {
                            gHandler.hqqisShowNotice = false
                            gHandler.eventMgr.dispatch(gHandler.eventMgr.showNotice, null)
                        }
                    }
                    if (gHandler.gameGlobal.slideNoticeList.length > 0) {
                        gHandler.eventMgr.dispatch(gHandler.eventMgr.addSliderNotice, gHandler.gameGlobal.slideNoticeList)
                    }
                }
            }
        }
        let failcallback = (status) => {
        }
        let endurl = gHandler.appGlobal.getIpGetEndurl(4);
        gHandler.http.sendRequestIpGet(gHandler.appGlobal.server, endurl, callback, failcallback);
    }
}
