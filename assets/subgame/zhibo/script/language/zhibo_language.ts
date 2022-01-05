class zhibo_language{
    protected static instance: zhibo_language;
    // 资源UI
    private resMap:Map<string,object> = new Map();

    public static getInstance(): zhibo_language {
        if (!this.instance) {
            this.instance = new zhibo_language();
        }
        return this.instance;
    }
    
    private language = {
        "CN":{
            0:"连接超时，请您返回游戏大厅后重新进入",
            1:"网络断开，正在努力连接中",
            2:"余额不能低于%n,当前余额%n",
            3:"停机维护中，预计维护时间为 20分钟，\n请维护结束后再进行游戏，感谢您参与！", // 踢人 - 备注:讯息与之相同
            4:"", // 提示断线三次后 回大厅
            5:"彩源龙虎斗主播时间：\n早上9点到凌晨1点\n\n龙虎斗和彩源猜大小主播时间：\n晚上7点到凌晨1点", // 無房間
        },
    }

    public getCurLanguage():string {
        return "CN";
    }

    public getTextByID( id:number ):string {
        // 替代文字 - 勿数字代数字...
        let value = this.language[ this.getCurLanguage() ][ id.toString() ];
        if(parseInt(value)>=0) value = this.language[ this.getCurLanguage() ][ value.toString() ];
        return value;
    }

    public getDate():dateObj{
        let t = new Date();
        return {
            year:t.getFullYear()+"",
            month:this.getDateFormat(t.getMonth()+1),
            date:this.getDateFormat(t.getDate()),
            hour:this.getDateFormat(t.getHours()),
            min:this.getDateFormat(t.getMinutes()),
            sec:this.getDateFormat(t.getSeconds())
        }
    }

    public releaseIconsRes(key:string,type:any):void{
        hqq.zhiboRes.release(key,type);
        this.resMap.delete(key);
    }

    public releaseRes():void{
        hqq.zhiboRes.releaseAll();
        this.resMap.clear();
    }

    public loadRes(resUrl:string,ccType:any,fun:Function):void{
        hqq.zhiboRes.load(resUrl,ccType,(err,res)=>{
            !err && this.resMap.set(resUrl,res);
            fun?.(err,res);
        });
    }

    private getDateFormat(n:number):string{
        return n<10?"0"+n:""+n;
    }
    
    private loadResByString(ccUrl:string,resUrl:string):void{
        let node:cc.Node = cc.find(ccUrl);
        if(!node){
            cc.log("%c"+"loadRes not found node => %s / %s",'color:white;background:red;', ccUrl, resUrl);
            return
        }
        let comp = node.getComponent(cc.Sprite);
        this.loadRes(resUrl,cc.SpriteFrame,(err,res)=>{
            if(err){
                cc.log("loadRes " + resUrl + " Error");
                return
            }
            comp.spriteFrame = res;
        });
    }

    // 多語言配置初始化
    public UI_Language_init():void{
        cc.log("@@@UI_Language_init");
        let path:string = `language/${language.getCurLanguage()}`;

        // loading
        let loadAry = [
            cc.find("Canvas/loading/load")
        ]
        this.loadRes("bigResources/"+path+"/animation/zhibo_loading",sp.SkeletonData,(err,res)=>{
            if(err){
                console.log("zhibo_loading Res Error");
                return
            }
            // 占时开启后关闭 使动画的loop能初始能成功执行
            for(let i in loadAry){
                let val = loadAry[i];
                if(!val) continue;
                let bool = val.parent.active;
                val.parent.active = true;
                let sk:sp.Skeleton = val.getComponent(sp.Skeleton);
                sk.skeletonData = res;
                sk.setAnimation(0,"animation",true);
                val.parent.active = bool;
            }
        });
        
        // zhibo loading
        this.loadResByString("Canvas/loading/logo"      ,path+"/zhibo_loading_dec");

        // message
        this.loadResByString("Canvas/tip/sure"  ,path+"/zhibo_surebtn"  ); // 确定 
        this.loadResByString("Canvas/tip/cancel",path+"/zhibo_cancelbtn"); // 取消
    }
}

export const language = zhibo_language.getInstance();
export const enum textID {
    CONNECTION_TIME_OUT=0,
    RECONNECT,
    LOGIN_BELOW_MINIMUM,
    KICK_PLAYER,
    KICK_API,
    NO_ROOM_LIST,
}