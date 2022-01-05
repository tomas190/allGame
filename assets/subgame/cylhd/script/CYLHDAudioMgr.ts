
import * as Conf from "./CYLHDStateConfig";
import * as StateCom from "./CYLHDStateCommon";
import ACM from "./AC/ACCYLHDMain";
// import gHandler = require("../../../main/common/hqq")


module LHD {
    export class AudioMgr {

        private aIDLoops: Map<number, number> = null;
        constructor() {
            this.aIDLoops = new Map();
            ACM.getEvtMgrIns.register(Conf.EventKind.PLAY_AUDIO, "AudioMgr", this.playAudio.bind(this));
            ACM.getEvtMgrIns.register(Conf.EventKind.STOP_AUDIO, "AudioMgr", this.stopAudio.bind(this));
            ACM.getEvtMgrIns.register(Conf.EventKind.STOP_ALL_LOOP_AUDIO, "AudioMgr", this.stopAllLoopAudio.bind(this));
            ACM.getEvtMgrIns.register(Conf.EventKind.SWITCH_AUDIO, "AudioMgr", this.toggleSwitch.bind(this));
        }
        private playAudio(data: { type: StateCom.EAudioType, loop: boolean }) {
            if (!Conf.AppConfig.AUDIO_SWITCH) return;
            var url: string =  this.getAudioUrl(data.type);
            // cc.log("url", url)
            if (url == "") {
                cc.warn("音效类型未配置 Type=", data.type);
                return;
            }
            var tp = data.type;
            var lp = data.loop ? true : false;
            console.log("Charlie url : " + url + "loop : " + lp);
            hqq.cylhd.load(url, cc.AudioClip, (err, audioClip) => {
                if (Conf.AppConfig.AUDIO_SWITCH == false) return;
                if (err) {
                    console.log("资源加载失败！ Charlie Failed Type=", data.type);
                    return;
                }
                console.log("Charlie success！ Type=", data.type);
                this.stopAudio(tp);
                // 11/18 修正 遊戲列表要與大廳一致
                if (url == "audio/p_dating_rm_bgm") return hqq.audioMgr.playBg();
                if (url == "audio/lhd_bgm") hqq.audioMgr.stopBg();
                var aID: number = cc.audioEngine.playEffect(audioClip, lp);
                this.aIDLoops.set(tp, aID);
            });
        }
        private stopAudio(data: StateCom.EAudioType) {
            if (!this.aIDLoops.has(data)) {
                // cc.warn("不存在 Type=",data)
                return;
            }
            var aID: number = this.aIDLoops.get(data);
            cc.audioEngine.stop(aID);
            this.aIDLoops.delete(data);
        }
        private stopAllLoopAudio() {
            this.aIDLoops.forEach((v, k) => {
                this.stopAudio(k);
            }, this);
        }
        private toggleSwitch() {
            Conf.AppConfig.AUDIO_SWITCH = !Conf.AppConfig.AUDIO_SWITCH;
            if (Conf.AppConfig.AUDIO_SWITCH) {

            } else {
                var url: string = this.getAudioUrl(StateCom.EAudioType.CLICK);
                hqq.cylhd.load(url, cc.AudioClip, (err, audioClip) => {
                    if (err) {
                        console.log("资源加载失败！ Type=", url);
                        return;
                    }
                    cc.audioEngine.playEffect(audioClip, false);
                });
                this.stopAllLoopAudio();
            }
            if (hqq.audioMgr.setBgState)
                hqq.audioMgr.setBgState(Conf.AppConfig.AUDIO_SWITCH)
        }

        /**音乐资源 */
        private getAudioUrl(typeAudio: StateCom.EAudioType) {
            var str: string = "";
            switch (typeAudio) {
                case StateCom.EAudioType.BG_LOBBY:
                    str = "audio/p_dating_rm_bgm"
                    break;
                case StateCom.EAudioType.BG_GAME_ROOM:
                    str = "audio/lhd_bgm"
                    break;

                case StateCom.EAudioType.BACK_BTN:
                    str = "audio/back_btn"
                    break;

                case StateCom.EAudioType.BET_JET_S0:
                    str = "audio/p_bet_short"
                    break;
                case StateCom.EAudioType.BET_JET_S1:
                    str = "audio/p_bet_short2"
                    break;
                case StateCom.EAudioType.BET_JET_SM:
                    str = "audio/p_bet_mid"
                    break;
                case StateCom.EAudioType.BET_JET_SL:
                    str = "audio/p_bet_long"
                    break;

                case StateCom.EAudioType.JETS_COLLECT:
                    str = "audio/p_collectgold2"
                    break;
                case StateCom.EAudioType.BEGIN_BET:
                    str = "audio/p_start_bet"
                    break;
                case StateCom.EAudioType.END_BET:
                    str = "audio/p_stop_bet"
                    break;
                case StateCom.EAudioType.COUNT_DOWN:
                    str = "audio/p_countdown"
                    break;
                case StateCom.EAudioType.END_RING:
                    str = "audio/p_remind"
                    break;
                case StateCom.EAudioType.TIP_REMIND:
                    str = "audio/p_tip_remind"
                    break;

                case StateCom.EAudioType.N1:
                    str = "audio/lhd_point1"
                    break;
                case StateCom.EAudioType.N2:
                    str = "audio/lhd_point2"
                    break;
                case StateCom.EAudioType.N3:
                    str = "audio/lhd_point3"
                    break;
                case StateCom.EAudioType.N4:
                    str = "audio/lhd_point4"
                    break;
                case StateCom.EAudioType.N5:
                    str = "audio/lhd_point5"
                    break;
                case StateCom.EAudioType.N6:
                    str = "audio/lhd_point6"
                    break;
                case StateCom.EAudioType.N7:
                    str = "audio/lhd_point7"
                    break;
                case StateCom.EAudioType.N8:
                    str = "audio/lhd_point8"
                    break;
                case StateCom.EAudioType.N9:
                    str = "audio/lhd_point9"
                    break;
                case StateCom.EAudioType.N10:
                    str = "audio/lhd_point10"
                    break;
                case StateCom.EAudioType.N11:
                    str = "audio/lhd_point11"
                    break;
                case StateCom.EAudioType.N12:
                    str = "audio/lhd_point12"
                    break;
                case StateCom.EAudioType.N13:
                    str = "audio/lhd_point13"
                    break;

                case StateCom.EAudioType.RESULT_0:
                    str = "audio/lhd_result0"
                    break;
                case StateCom.EAudioType.RESULT_1:
                    str = "audio/lhd_result1"
                    break;
                case StateCom.EAudioType.RESULT_2:
                    str = "audio/lhd_result2"
                    break;
                case StateCom.EAudioType.YOU_WIN:
                    str = "audio/lhd_resultwin"
                    break;
                case StateCom.EAudioType.YOU_LOSE:
                    str = "audio/lhd_resultLose"
                    break;

                case StateCom.EAudioType.CHANGE_BANKER:
                    str = "audio/p_changebanker"
                    break;
                case StateCom.EAudioType.CARD_CLIP:
                    str = "audio/p_cardflip"
                    break;

                case StateCom.EAudioType.JETS_FLY_TO_USER:
                    str = "audio/jettonflytoplayer"
                    break;
                case StateCom.EAudioType.JETS_BANKER_SPIT:
                    str = "audio/zhuangjiatuntu"
                    break;
                // case StateCom.EAudioType.CLICK_AREA_BET: 
                //     str = "audio/clickArea"
                //     break;
                case StateCom.EAudioType.CLICK:
                    str = "audio/p_click"
                    break;
                case StateCom.EAudioType.CLICK_JET_FLOAT:
                    str = "audio/clickjetton"
                    break;

                // case StateCom.EAudioType.BALL_ROLL: 
                //     str=Conf.AppConfig.ResPath+"audio/lunpan_ball_roll"
                //     break;
                // case StateCom.EAudioType.BALL_STOP: 
                //     str=Conf.AppConfig.ResPath+"audio/lunpan_ball_stop"
                //     break;
                default:
                    break;
            }
            // return "cylhdRes/" + str;
            return str;
        }
    }

}
export default LHD.AudioMgr;