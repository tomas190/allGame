
const {ccclass, property} = cc._decorator;

@ccclass
export default class ZJHAudioMgr extends cc.Component {

    @property({type:cc.AudioClip})
    audioCompare: cc.AudioClip [] = [null];//比牌语音
   


    playEffect(){
        
    }
  
}
 