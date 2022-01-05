import { events, EventKind } from "./tools/zhibo_event";
import { app } from "./tools/zhibo_config";
import { language, textID } from "./language/zhibo_language";
import Client from "./net/zhibo_client";
import { msg } from "./proto/ZHIBOproto_msg";

const { ccclass, property } = cc._decorator;
const zhiboList = `龙虎斗	lhd	至尊厅01	01
龙虎斗	lhd	至尊厅02	02
龙虎斗	lhd	至尊厅03	03
龙虎斗	lhd	至尊厅04	04
彩源龙虎斗	cylhd	河内分分彩	01
彩源龙虎斗	cylhd	奇趣分分彩	02
彩源龙虎斗	cylhd	加拿大30秒	03
彩源龙虎斗	cylhd	河内五分彩	04
彩源猜大小	cdx	河内分分彩	1
彩源猜大小	cdx	奇趣分分彩	2`;

@ccclass
export default class zhibo_main extends cc.Component {

    @property(cc.Node)
    private hall: cc.Node = null;
    @property(cc.Node)
    private tip: cc.Node = null;
    @property(cc.Node)
    private gameList: cc.Node = null;
    @property(cc.Node)
    private loading: cc.Node = null;
    @property(cc.Label)
    private labelId: cc.Label = null;
    @property(cc.Label)
    private labelTime: cc.Label = null;
    @property(cc.Label)
    private labelVersion: cc.Label = null;
    @property(cc.Prefab)
    private iconPrefab: cc.Prefab = null;
    @property(cc.SpriteFrame)
    private noImg: cc.SpriteFrame = null;

    private list: msg.IRoomInfo[] = null;
    private listIconSp: {sp:cc.Sprite,url:string}[] = null;
    private textureMap:Map<string,cc.Texture2D> = new Map();
    private clint: Client = null;
    private content: cc.Node = null;
    private domainUrl:string = null; // 直播方測速用
    private roomUrl:string = null; // 房間號
    private loadUrl:string = null; 

    private isOpenZhibo:boolean = false;
    private isExitZhibo:boolean = false;
    private isDelayClick:boolean = false;

    private updateTimer:Function = null;

    private tipAry:messageObj[] = [];
    private tipNetRule:object = {}; // tip - 来自net的执行事件

    private repeatSendLoginId:number = 0;
    private netLoadingBtnShowId:number = 0; // 延迟显示返回按钮

    private timeSpent:number = 0; // 紀錄花費時間(毫秒)
    
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        events.register(EventKind.S2C_Connect, "zhibo_main", this.receiveConnected.bind(this));
        events.register(EventKind.S2C_Login, "zhibo_main", this.receiveLogin.bind(this));
        events.register(EventKind.TIP_Message, "zhibo_main", this.onTipMessage.bind(this));
        events.register(EventKind.CLI_Reconnect, "zhibo_main", this.onReconnect.bind(this));
        if(hqq?.eventMgr?.refreshHallChongFuDenLu){
            hqq.eventMgr.register(hqq.eventMgr.refreshHallChongFuDenLu, "zhibo_main", this.onTouchLogOutExit.bind(this));
        }
        if(!hqq.isDebug && hqq.gameGlobal.zhibo?.ZhiBoUrl) hqq.gameGlobal.zhibo.ZhiBoUrl = '';
        this.clint = Client.getInstance();
        language.UI_Language_init();
    }

    onDestroy() {
        events.unregister(EventKind.S2C_Connect, "zhibo_main");
        events.unregister(EventKind.S2C_Login, "zhibo_main");
        events.unregister(EventKind.TIP_Message, "zhibo_main");
        events.unregister(EventKind.CLI_Reconnect, "zhibo_main");
        if(hqq?.eventMgr?.refreshHallChongFuDenLu){
            hqq.eventMgr.unregister( hqq.eventMgr.refreshHallChongFuDenLu , "zhibo_main" );
        }
        this.unschedule(this.updateTimer);
        clearTimeout(this.repeatSendLoginId);
        clearTimeout(this.netLoadingBtnShowId);
        this.iconsRelease();
        this.clint.clear();
    }
    
    start() {
        this.hall.active = true;
        this.tip.active = false;
        this.labelId.string = "ID:"+app.UserID;
        this.labelVersion.string = `${app.serverVersion}-${app.Version}`;
        this.gameLoading(true); // 显示游戏列表
        this.initTimer();
        this.initRule();

        setTimeout(()=>{
            let headid = hqq.gameUser.game_img || '0';
            if (headid.includes(".")) {
                headid = headid.substring(0, headid.indexOf("."));
            }
            headid = parseInt(headid) % 10;
            
            // 新贵 - /head/xingui/tx + (headid + 1) 
            // https://upgrade.lymrmfyp.com/head/xingui/tx1.png
            // 92 - /head/92/x(headid)
            // https://upgrade.lymrmfyp.com/head/92/x0.png
            // 特斯特(其他) - Avatar + headid
            // https://upgrade.lymrmfyp.com/head/Avatar0.png
            app.imgUrl = ({
                'xingui':():string=>{
                    return `https://upgrade.lymrmfyp.com/head/xingui/tx${headid+1}.png`;
                },
                'ninetwo':():string=>{
                    return `https://upgrade.lymrmfyp.com/head/92/x${[0,0,0,1,1,1,2,2,3,3][headid]}.png`;
                }
            })[hqq.app.pinpai]?.() || `https://upgrade.lymrmfyp.com/head/Avatar${headid}.png`;
             
            this.clint.init(); // 登入初始化
        },0);
    }

    // update (dt) {}

    // --- init ---
    private initTimer(){
        this.updateTimer = ()=>{
            if(!cc.isValid(this.labelTime)) return
            let date = language.getDate();
            this.labelTime.string = `${date.year}-${date.month}-${date.date}  ${date.hour}:${date.min}:${date.sec}`;
        }
        this.schedule(this.updateTimer,1);
    }

    private initIcon(){
        /* color
             #eb6100  橘色
             #22ac38  绿色
             #feb500  黄色
        */

        // code convert cn
        let codeMap = new Map();
        let colorAry = ['#eb6100','#22ac38','#feb500'];
        let colorRule = {'lhd':1,'cylhd':0,'cdx':2};
        let listAry = zhiboList.split('\n');
        listAry.forEach((val)=>{
            let ary= val.split('\t');
            codeMap.set(ary[1],ary[0]);
            codeMap.set(ary[1]+ary[3],ary[2]);
        });
        // cc.log('codeMap=>',codeMap);

        /* example
        gameCode: "lhd"
        liveUserAvatar: "http://h5.downlaod.bar/image/0005636100"
        liveUserName: "123"
        roomCode: "1"
        roomUrl: "http://h5.downlaod.bar/tMobile/game/index.html?webMobileType=WEBMOBILE_PLATFORM_T&roomId=60e2c42e279a962020872bf9&accountName=platformQ~128222027&token=60dfea0d-80ae-4074-a5d4-b71cb214ed38"
        */
        if(hqq.app.pinpai=='juding') this.list = this.list.filter(el=>el['gameCode']!='cdx');
        cc.log("roomList=>",this.list);
        this.content = cc.find("gameList/content",this.hall);
        this.listIconSp = []; // init
        for(let i =0;i<this.list.length;i++){
            let prefab = cc.instantiate(this.iconPrefab);
            let evtSelectGame:cc.Component.EventHandler = new cc.Component.EventHandler();
            let info = this.list[i];
            evtSelectGame.target = this.node;
            evtSelectGame.component = 'zhibo_main';
            evtSelectGame.handler = 'selectGame';
            evtSelectGame.customEventData = i+'';
            if(cc.isValid(prefab)){
                let top = prefab.getChildByName('top'),
                    board = top.getChildByName('baseboard'),
                    base = board.getChildByName('base'),
                    game = top.getChildByName('game'),
                    room = top.getChildByName('room'),
                    alt = colorRule[info.gameCode] || 0;
                
                prefab.getComponent(cc.Button).clickEvents.push(evtSelectGame);
                prefab.getChildByName('name').getComponent(cc.Label).string = info.liveUserName;
                // 先放文字
                game.getComponent(cc.Label).string = codeMap.get(info.gameCode);
                room.getComponent(cc.Label).string = codeMap.get(info.gameCode + info.roomCode);
                // 后取宽度
                setTimeout(()=>{
                    game.x = 10;
                    base.width = game.width + 20;
                    base.color = base.color.fromHEX(colorAry[alt]);
                    room.x = base.width + 10;
                    board.width = base.width + room.width + 20;
                },0);
            }
            
            let headSp = prefab.getChildByName('mask').getChildByName('head').getComponent(cc.Sprite);
            this.listIconSp[i] = {sp:headSp,url:info.liveUserAvatar};
            if(cc.isValid(headSp)) headSp.spriteFrame = this.noImg;
            if(cc.isValid(this.content)){
                prefab.parent = this.content;
                prefab.setSiblingIndex(0);
            }
        }
        this.loadIcon();
        
        // 调整 间距
        this.content.getComponent(cc.Widget).updateAlignment();
        this.content.getComponent(cc.Layout).spacingX = 
            ((this.content.width - 40) % 300) / (Math.floor((this.content.width - 40) / 300)-1);
    }

    private initRule(){
        this.tipNetRule[textID.CONNECTION_TIME_OUT] = 
            this.tipNetRule[textID.KICK_PLAYER] = (ms:messageObj)=>{
                ms.okFn = ()=>{
                    this.clint.destroy();
                }
                app.isKicked = true;
                this.clint.clear();
                this.updateMessage(ms);
            }
        this.tipNetRule[textID.KICK_API] = ()=>{
            let time = 0;
            app.apiKickID = setInterval(()=>{
                if(++time > 3){
                    clearInterval(app.apiKickID);
                    Client.getInstance().destroy();
                    return
                }
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, language.getTextByID(textID.RECONNECT));
            },2800);
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, language.getTextByID(textID.RECONNECT));
            app.isKicked = true;
            this.clint.clear();
        }
        
        this.tipNetRule[textID.NO_ROOM_LIST] = (ms:messageObj)=>{
            this.updateMessage(ms);
        }
    }

    // Tip - Message
    private onTipMessage(id:number){
        let message:messageObj= {
            str:language.getTextByID(id), // 讯息设定
        }
        cc.log("onTipMessage=>",message.str);
        this.tipNetRule[id]?.(message); // 自订行为
    }
    // message tip
    private updateMessage(data:messageObj = {str:""}){
        let {str,okFn,noFn,closeFn} = data;
        let txt = str;
        let isOk = Boolean(okFn); 
        let isNo = Boolean(noFn);
        let isClose = Boolean(closeFn);
        // 记录讯息
        str.length > 0 && this.tipAry.unshift(data);
        // 判断讯息池
        let isTipAryNull = this.tipAry.length == 0;
        this.tip.active = !isTipAryNull;
        if(isTipAryNull) return
        // 代入下一则讯息
        let msg:messageObj = this.tipAry[0];
        txt = msg.str;
        isOk = Boolean(msg.okFn);
        isNo = Boolean(msg.noFn);
        isClose = Boolean(msg.closeFn);
        // change
        let text = cc.find("body/text",this.tip).getComponent(cc.Label);
        text.string = txt;
        cc.find("cancel",this.tip).active = isNo;
        cc.find("close",this.tip).active = isClose;

        let sure:cc.Node = cc.find("sure",this.tip);
        sure.active = isOk;
        if(isOk) sure.x = isNo? -160:0;
        
        // always show tip
        let isSomeBtnShow = isOk || isNo || isClose;
        cc.find("block",this.tip).active = isSomeBtnShow
        text.node.y = isSomeBtnShow ? 60:0;
        text.fontSize = isSomeBtnShow ? 36:42;
        text.lineHeight = isSomeBtnShow ? 40:60;
        text.node.height = isSomeBtnShow ? 240:360;
    }

    private onMessageBtn(evt:cc.Event,data:string){
        this.tipAry[0][["str","okFn","noFn","closeFn"][+data]]?.();
        this.tipAry.shift();
        this.updateMessage();
    }

    private loadIcon(){
        if(!(this.listIconSp && this.domainUrl)) return
        if(cc.isValid(this.node)){
            for(let i in this.listIconSp){
                let target:cc.Sprite = this.listIconSp[i].sp;
                if(!target) continue;
                let url = this.domainUrl + this.listIconSp[i].url;
                cc.assetManager.loadRemote(url, {ext: '.png'},(err,texture:cc.Texture2D)=>{
                    err && cc.log("zhibo - 图片载入失败=>",url);
                    if(!cc.isValid(target) || err){
                        if(texture) cc.assetManager.releaseAsset(texture);
                        return
                    }
                    target.spriteFrame = new cc.SpriteFrame(texture);
                    this.textureMap.set(url,texture);
                });
            }
        }
    }

    private iconsRelease():void{
        this.textureMap.forEach((texture,key) => {
            cc.assetManager.releaseAsset(texture);
        });
    }

    private checkJumpScene():void {
        if(!(this.roomUrl && this.domainUrl)) return
        hqq.gameGlobal.zhibo.ZhiBoUrl = this.domainUrl + this.roomUrl;
        // hqq.gameGlobal.zhibo.ZhiBoUrl = this.domainUrl 
        this.initLoadUrl();
        hqq.eventMgr.dispatch(hqq.eventMgr.showJumpScene,null);
    }
    
    // 选择跟随直播
    private selectGame(evt:TouchEvent,data:string):void {
        if(this.isDelayClick) return
        this.isDelayClick = true;
        this.scheduleOnce(()=>{
            this.isDelayClick = false;
        },1);
        let info:msg.IRoomInfo = this.list[parseInt(data)];
        cc.log('zhibo - selectGame=>',info);
        this.roomUrl = info.roomUrl;
        if(!hqq.gameGlobal.zhibo){
            hqq.gameGlobal.zhibo = {
                GameCode:info.gameCode,
                RoomCode:info.roomCode,
                WebViewSize:1,
                WebViewPosition:cc.v3(cc.winSize.width-240,600,0),
            }
        }else{
            hqq.gameGlobal.zhibo.GameCode = info.gameCode;
            hqq.gameGlobal.zhibo.RoomCode = info.roomCode;
            hqq.gameGlobal.zhibo.WebViewSize = hqq.gameGlobal.zhibo.WebViewSize?hqq.gameGlobal.zhibo.WebViewSize:1;
            hqq.gameGlobal.zhibo.WebViewPosition = hqq.gameGlobal.zhibo.WebViewPosition?hqq.gameGlobal.zhibo.WebViewPosition:cc.v3(cc.winSize.width-240,600,0);
        }
        this.checkJumpScene();
        // this.gameLoading(true);
    }

    private initLoadUrl(){
        if(!this.isOpenZhibo){
            this.isOpenZhibo = true;
            if(!hqq.gameGlobal.zhibo) hqq.gameGlobal.zhibo = {}
            hqq.gameGlobal.zhibo.LoadUrl = this.domainUrl + this.loadUrl;
            hqq.eventMgr.dispatch(hqq.eventMgr.openZhiBoPanel,true);
            cc.log('zhibo - open loadUrl');
        }
    }

    private closeZhiBoPanel(){
        if(this.isOpenZhibo && !this.isExitZhibo){
            this.isExitZhibo = true;
            hqq.gameGlobal.zhibo.LoadUrl = '';
            hqq.gameGlobal.zhibo.GameCode= '';
            hqq.gameGlobal.zhibo.RoomCode= '';
            hqq.eventMgr.dispatch(hqq.eventMgr.openZhiBoPanel,false);
            cc.log('zhibo - close loadUrl');
        }
    }

    private onTouchExit(): void {
        this.closeZhiBoPanel();
        this.gameLoading(true);
        this.clint.destroy();
    }

    private onTouchLogOutExit():void{
        this.closeZhiBoPanel();
        this.clint.destroy();
    }

    // receive
    private receiveConnected(): void {
        this.gameLoading(true);
        this.timeSpent = new Date().getTime();
        events.dispatch(EventKind.C2S_Login);
    }

    private receiveLogin(data: msg.LoginResp): void {
        cc.log("zhibo - 收到登入",data);
        cc.log(`登入花費 ${new Date().getTime() - this.timeSpent}ms`);
        clearTimeout(this.repeatSendLoginId);
        this.repeatSendLoginId = 0;


        app.isKicked = false;
        app.serverVersion = data.version;
        this.labelId.string = "ID:"+app.UserID;
        this.labelVersion.string = `${app.serverVersion}-${app.Version}`;
        
        this.list = data.roomList;
        this.loadUrl = data.loadUrl;

        if(this.list.length==0){
            // no - room
            this.onTipMessage(textID.NO_ROOM_LIST);
        }
        // 假资料
        /* let room = msg.RoomInfo.create({
            gameCode: "lhd",
            liveUserAvatar: "http://h5.downlaod.bar/image/0005636100",
            liveUserName: "主播名称",
            roomCode: "03",
            roomUrl: "http://h5.downlaod.bar/tMobile/game/index.html?webMobileType=WEBMOBILE_PLATFORM_T&roomId=60e2c42e279a962020872bf9&accountName=platformQ~128222027&token=60dfea0d-80ae-4074-a5d4-b71cb214ed38"
        });
        this.list = [room,room,room,room,room,room,room]; */

        this.clint.clear();
        this.gameLoading(false);
        this.initIcon();
        this.testLine(data.lineList);
    }

    private testLine(lineList:string[]){
        cc.log('===== zhibo - 測速開始 =====');
        cc.log(`偵測線路共 ${lineList.length}條`);
        let self = this;
        this.timeSpent = new Date().getTime();
        let isFirst:boolean = true;
        getFastestDomain(lineList,(url:string) =>{
            // 输出响应最快的域名
            cc.log(`使用线路 ${url}`);
            this.domainUrl = url;
            if(isFirst){
                isFirst = false;
                this.loadIcon();
                this.checkJumpScene();
                return
            }
        });

        /**
         * @method getFastestDomain 获取最快响应域名
         * @param {Array} urlList 域名地址数组
         * @param {Function} callBack 处理回调（异步）
         * @callBack {string} 接收响应最快的域名
         */
        function getFastestDomain(urlList, callBack) {
            let urlObject = [];
            let domainPing;
            for (let i = 0; i < urlList.length; i++) {
                urlTest(urlList[i]).then((res:{url:String,ping:String}) => {
                    cc.log(`${i+1}/${urlList.length} - ${res.ping=='err'?'連線失敗':res.ping+'ms'} (${res.url})`);
                    urlObject.push(res);
                    if(!domainPing || domainPing.ping > res.ping){
                        domainPing = res;
                        callBack(domainPing.url);
                    }
                    if(urlObject.length == urlList.length){
                        cc.log(`最終使用 (${domainPing.url})`);
                        cc.log(`總共花費 ${new Date().getTime() - self.timeSpent}ms`);
                        cc.log('===== zhibo - 測速結束 =====');
                        self.initLoadUrl();
                    }
                })
            }
            function urlTest(url) {
                return new Promise((resolve, reject) => {
                    let sendTime = new Date().getTime();
                    let ping;
                    let request = new XMLHttpRequest();
                    request.onload = ()=>{
                        ping = new Date().getTime() - sendTime;
                        resolve({ url, ping });
                    }; 
                    request.onerror = ()=>{
                        ping = "err";
                        reject({ url, ping });
                    };
                    request.open('get', url+'/api/upload/clientResource/game/clientConfigs', true);
                    request.send();
                })
            }
        }
    }

    // 进入子游戏 与 回到游戏列表
    private gameLoading(show:boolean){
        this.loading.active = show;
        this.gameList.active = !show;
    }

    private onReconnect():void {
        clearTimeout(this.repeatSendLoginId);
        this.repeatSendLoginId = 0;
    }
}
