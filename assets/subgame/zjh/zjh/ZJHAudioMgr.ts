
import notifacition = require("./ZJHnet/ZJHNotification")
import Event = require("./ZJHnet/ZJHEventCustom")
class ZJHAudioMgr {

    private static Instance:ZJHAudioMgr = null;

    audioNode:any = null;

    _url2id:any = {};

    private constructor(){
        this.register();
    }

    public static getInstance(){
        if(!ZJHAudioMgr.Instance){
            ZJHAudioMgr.Instance = new ZJHAudioMgr();
        }
        return ZJHAudioMgr.Instance
    }

    register(){
        notifacition.register(Event.EVENT_MUSIC_EFFECT,this,this.playEffect);
        notifacition.register(Event.EVENT_MUSIC_STOPEFFECT,this,this.stopEffect);
    }
    
    //播放音效 
    /**
     * 
     * @param args.tag 区分哪种音效 1 男性音效 2 女性音效 3 表情音效 4 其他音效
     * @param args.mid 音效id
     * @param args.isLoop 是否循环
     */
    playEffect(args){
        let on_off = JSON.parse(cc.sys.localStorage.getItem("on_off"));
        if(!on_off) return;
        let url = "resources/"
        switch(args.tag){
            case 1:{
                //1跟注,2加注,3看牌 4比牌,5弃牌,6全押
                    if(args.mid === 2 || args.mid ===3 || args.mid ===6){
                        url = "ZJHAudio/male/m_"+ args.mid;
                    }else {
                        let index = Math.round(Math.random());
                        if(args.mid === 1){
                            url =  "ZJHAudio/male/follow"+index;
                        }else if(args.mid === 5){
                            url =  "ZJHAudio/male/giveup"+index;
                        }else if(args.mid === 4){
                            url =  "ZJHAudio/male/cmp"+index;
                        }
                    }
                    break;
                }
            case 2:{
                    //1跟注,2加注,3看牌 4比牌,5弃牌,6全押
                    if(args.mid ===2 || args.mid ===3 || args.mid === 6){
                        url = "ZJHAudio/female/f_"+ args.mid;
                    }else {
                        let index = Math.round(Math.random());
                        if(args.mid === 1){
                            url =  "ZJHAudio/female/follow"+index;
                        }else if(args.mid === 5){
                            url =  "ZJHAudio/female/giveup"+index;
                        }else if(args.mid === 4){
                            url =  "ZJHAudio/female/cmp"+index;
                        }
                    }
                    break;
                }
            case 3: //0 叫鸡 1 玫瑰花 2 啤酒 3 拖鞋
                url = "ZJHAudio/emojiVoice/zjh_emoji_" + args.mid;
                break;
            case 4://1 胜利 2 一堆筹码 3 开始 4 全押 5 比牌 6 比牌获胜 7 倒计时 8 发牌
                url = "ZJHAudio/other/other_" + args.mid;
                break;        
        }
        let loop = args.isLoop;
        if(cc.sys.isNative){
            cc.loader.loadRes(url,(error,clip)=>{
                let id = cc.audioEngine.playEffect(clip,loop);
                cc.log("@@@@@@@@1111111",url,id);
                this._url2id[url] = id;
            })
        }
    }

    //停止音效
    stopEffect(args){
        let url = "resources/"
        switch(args.tag){
            case 1:{
                //1跟注,2加注,3看牌 4比牌,5弃牌,6全押
                    if(args.mid === 2 || args.mid ===3 || args.mid ===6){
                        url = "ZJHAudio/male/m_"+ args.mid;
                    }else {
                        let index = Math.round(Math.random());
                        if(args.mid === 1){
                            url =  "ZJHAudio/male/follow"+index;
                        }else if(args.mid === 5){
                            url =  "ZJHAudio/male/giveup"+index;
                        }else if(args.mid === 4){
                            url =  "ZJHAudio/male/cmp"+index;
                        }
                    }
                    break;
                }
            case 2:{
                    //1跟注,2加注,3看牌 4比牌,5弃牌,6全押
                    if(args.mid ===2 || args.mid ===3 || args.mid === 6){
                        url = "ZJHAudio/female/f_"+ args.mid;
                    }else {
                        let index = Math.round(Math.random());
                        if(args.mid === 1){
                            url =  "ZJHAudio/female/follow"+index;
                        }else if(args.mid === 5){
                            url =  "ZJHAudio/female/giveup"+index;
                        }else if(args.mid === 4){
                            url =  "ZJHAudio/female/cmp"+index;
                        }
                    }
                    break;
                }
            case 3: //0 叫鸡 1 玫瑰花 2 啤酒 3 拖鞋
                url = "ZJHAudio/emojiVoice/zjh_emoji_" + args.mid;
                break;
            case 4://1 胜利 2 一堆筹码 3 开始 4 全押 5 比牌 6 比牌获胜 7 倒计时 8 发牌
                url = "ZJHAudio/other/other_" + args.mid;
                break;        
        }
        let audioId = this._url2id[url];
        if(audioId) cc.audioEngine.stopEffect(audioId);
    }

    playMusic(args){
        let url = "music/m_" + args.mid;
        if(cc.sys.isNative){
            cc.loader.loadRes(url,(error,clip)=>{
                cc.audioEngine.playMusic(clip,true);
            })
        }
    }

    stopMusic(args){
        cc.audioEngine.stopMusic();
    }

    stopAll(){
        cc.audioEngine.stopAll();
    }
}
 
export = ZJHAudioMgr.getInstance()