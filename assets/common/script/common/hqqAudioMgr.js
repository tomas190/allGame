/*
 * @Author: burt
 * @Date: 2019-08-10 10:32:38
 * @LastEditors  : burt
 * @LastEditTime : 2019-12-27 11:31:01
 * @Description: 音效管理器，子游戏音效管理器需实现getMusic(name)获取cc.AudionClip资源的函数接口
 */
let gHandler = require("gHandler");
let audioMgr = {
    bgIsOpen: true,
    bgVolume: 1,
    bgId: -1,
    effectIsOpen: true,
    effectVolume: 1,
    nameToMusicPath: null, // 音效名字与id对照表
    resMap: {}, // 缓存资源列表
    bgchip: null, // 当前背景音乐资源
    init() {
        this.bgVolume = gHandler.localStorage.globalGet("bgVolumeKey") || 1;
        this.effectVolume = gHandler.localStorage.globalGet("effectVolumeKey") || 1;
        if (typeof gHandler.localStorage.globalGet("bgIsOpenKey") == 'boolean') {
            this.bgIsOpen = !!gHandler.localStorage.globalGet("bgIsOpenKey");
        }
        if (typeof gHandler.localStorage.globalGet("effectIsOpenKey") == 'boolean') {
            this.effectIsOpen = !!gHandler.localStorage.globalGet("effectIsOpenKey");
        }
        if (!this.nameToMusicPath) {
            this.nameToMusicPath = {
                hallbg: '/hall/audio/backgroud01',
                hallclick: '/hall/audio/Click',
            }
        }
        return this;
    },
    register(name, path) {
        this.nameToMusicPath[name] = path;
    },
    unregister(name) {
        if (this.resMap[name]) {
            cc.loader.releaseRes(this.nameToMusicPath[name]);
            delete this.resMap[name]
        }
        delete this.nameToMusicPath[name]
    },
    playAudio(name, type) {
        if (this.resMap[name]) {
            if (type == 'bg') {
                if (this.bgIsOpen) {
                    this.bgchip = this.resMap[name]
                    this.bgId = cc.audioEngine.playMusic(this.resMap[name], true, this.bgVolume);
                }
            } else {
                if (this.effectIsOpen) {
                    cc.audioEngine.playEffect(this.resMap[name], false, this.effectVolume);
                }
            }
        } else {
            if (this.nameToMusicPath[name]) {
                cc.loader.loadRes(this.nameToMusicPath[name], cc.AudioClip, (err, t) => {
                    if (err) {
                        console.log(err)
                    } else {
                        this.resMap[name] = t
                        if (type == 'bg') {
                            if (this.bgIsOpen) {
                                this.bgchip = this.resMap[name]
                                this.bgId = cc.audioEngine.playMusic(this.resMap[name], true, this.bgVolume);
                            }
                        } else {
                            if (this.effectIsOpen) {
                                cc.audioEngine.playEffect(this.resMap[name], false, this.effectVolume);
                            }
                        }
                    }
                })
            } else {
                console.log('没有这个音效')
            }
        }
    },
    setBgState(bgof) {
        this.bgIsOpen = !!bgof
        gHandler.localStorage.globalSet("bgIsOpenKey", this.bgIsOpen)
        if (!this.bgIsOpen) {
            this.stopBg()
        } else {
            this.bgId = cc.audioEngine.playMusic(this.bgchip, true, this.bgVolume);
        }
    },
    setEffectState(efof) {
        this.effectIsOpen = !!efof
        gHandler.localStorage.globalSet("effectIsOpenKey", this.effectIsOpen)
        if (!this.effectIsOpen) {
            cc.audioEngine.stopAllEffects()
        } else {
            cc.audioEngine.resumeAllEffects()
        }
    },
    setBgVolume(num) {
        if (gHandler.commonTools.isNumber(num)) {
            this.bgVolume = num;
            cc.audioEngine.setVolume(this.bgId, this.bgVolume);
            gHandler.localStorage.globalSet("bgVolumeKey", this.bgVolume);
        }
    },
    setEffectVolume(num) {
        if (gHandler.commonTools.isNumber(num)) {
            this.effectVolume = num;
            gHandler.localStorage.globalSet("effectVolumeKey", this.effectVolume);
        }
    },
    playBg(name = "hallbg") {
        this.playAudio(name, 'bg');
    },
    pauseBg() {
        if (this.bgId || (this.bgId === 0)) {
            cc.audioEngine.pauseMusic()
        }
    },
    resumeBg() {
        if (this.bgIsOpen && this.bgId || (this.bgId === 0)) {
            cc.audioEngine.resumeMusic()
        }
    },
    stopBg() {
        if (this.bgId || (this.bgId === 0)) {
            cc.audioEngine.stopMusic()
        }
    },
    playEffect(name) {
        this.playAudio(name, 'effect');
    },
}

module.exports = audioMgr;