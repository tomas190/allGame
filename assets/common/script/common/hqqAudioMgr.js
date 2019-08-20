/*
 * @Author: burt
 * @Date: 2019-08-10 10:32:38
 * @LastEditors: burt
 * @LastEditTime: 2019-08-17 17:02:24
 * @Description: 音效管理器，子游戏音效管理器需实现getMusic(name)获取cc.AudionClip资源的函数接口
 */
let gHandler = require("gHandler");
let audioMgr = {
    bgVolume: 1,
    bgId: -1,
    effectVolume: 1,
    resMgr: null, // 子游戏资源管理器节点
    init(resmgr) {
        this.resMgr = resmgr;
        this.bgVolume = gHandler.localStorage.globalGet("bgVolumeKey") || 1;
        this.effectVolume = gHandler.localStorage.globalGet("effectVolumeKey") || 1;
        return this;
    },
    setBgVolume(num) {
        if (gHandler.commonTools.isNumber()) {
            this.bgVolume = num;
            cc.audioEngine.setVolume(this.bgId, this.bgVolume);
            gHandler.localStorage.globalSet("bgVolumeKey", this.bgVolume);
        }
    },
    setEffectVolume(num) {
        if (gHandler.commonTools.isNumber()) {
            this.effectVolume = num;
            gHandler.localStorage.globalSet("effectVolumeKey", this.effectVolume);
        }
    },
    playBg(name) {
        if (this.resMgr) {
            let bgchip = this.resMgr.getMusic(name);
            if (bgchip) {
                if(this.bgId){
                    cc.audioEngine.stopMusic();
                }
                this.bgId = cc.audioEngine.playMusic(bgchip, true, this.bgVolume);
            }
        } else {
            console.log("未定义音效资源管理器")
        }
        return this;
    },
    pauseBg() {
        if (this.bgId || (this.bgId === 0)) {
            cc.audioEngine.pauseMusic()
        }
    },
    resumeBg() {
        if (this.bgId || (this.bgId === 0)) {
            cc.audioEngine.resumeMusic()
        }
    },
    stopBg() {
        if (this.bgId || (this.bgId === 0)) {
            cc.audioEngine.stopMusic()
        }
    },
    playEffect(name) {
        if (this.resMgr) {
            let effectchip = this.resMgr.getMusic(name);
            if (effectchip) {
                cc.audioEngine.playEffect(effectchip, false, this.effectVolume);
            }
        } else {
            console.log("未定义音效资源管理器")
        }
    },
}

module.exports = audioMgr;