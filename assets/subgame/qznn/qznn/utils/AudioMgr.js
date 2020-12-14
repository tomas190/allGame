cc.Class({
    extends: cc.Component,
    properties: {
        bgmVolume: 1,
        sfxVolume: 1,
        bgmAudioID: -1
    },
    init: function () {
        var e;
        null != (e = cc.sys.localStorage.getItem('bgmVolume')) &&
            (this.bgmVolume = parseFloat(e));
        null != (e = cc.sys.localStorage.getItem('sfxVolume')) &&
            (this.sfxVolume = parseFloat(e));
        cc.game.on(cc.game.EVENT_HIDE, function () {
            //cc.gg.utils.ccLog('cc.audioEngine.pauseAll'),
            //cc.audioEngine.pauseAll()
        });
        cc.game.on(cc.game.EVENT_SHOW, function () {
            //cc.gg.utils.ccLog('cc.audioEngine.resumeAll'),
            //cc.audioEngine.resumeAll()
        })
    },
    getUrl: function (e) {
        return cc.url.raw('resources/public/music' + e)
    },
    getAudioChip: function (e) {
        var chip = hqq.qznnRes.load('sounds/' + e, cc.AudioClip, function (err, clip) {
            return clip
        });
        return chip
    },

    playMusic: function (e) {
        let on_off = hqq.audioMgr.getBgState();
        if (on_off == false) return;
        hqq.qznnRes.load('sounds/' + e, cc.AudioClip, function (err, clip) {
            cc.audioEngine.play(clip, false, 0.5);
        });
    },

    playBGM: function (e) {
        var self = this;
        e = e ? e : 'language/CN/nnMusic/Click'
        if (0 < this.sfxVolume && e) {
            hqq.qznnRes.load(e, cc.AudioClip, function (err, clip) {
                if (err) {
                    console.log(err);
                    return
                }
                cc.audioEngine.play(clip, true, self.sfxVolume)
            });
        }
    },
    playSFX: function (e) {
        let on_off = hqq.audioMgr.getBgState();
        if (on_off == false) return;
        var self = this;
        e = e ? e : 'language/CN/nnMusic/Click'
        if (0 < this.sfxVolume && e) {
            hqq.qznnRes.load(e, cc.AudioClip, function (err, clip) {
                if (err) {
                    console.log(err);
                    return
                }

                cc.audioEngine.play(clip, false, self.sfxVolume)
            });
        }
    },
    playEffectSFX: function (e, t) {
        let on_off = hqq.audioMgr.getBgState();
        if (on_off == false) return;
        var i = this.getUrl(e)
        if (0 < this.sfxVolume) var a = cc.audioEngine.play(i, t, this.sfxVolume)
        return a
    },
    setSFXVolume: function (e) {
        this.sfxVolume != e && (cc.sys.localStorage.setItem('sfxVolume', e), this.sfxVolume = e)
    },
    setBGMVolume: function (e, t) {
        0 <= this.bgmAudioID &&
            (0 < e ? cc.audioEngine.resume(this.bgmAudioID) :
                cc.audioEngine.pause(this.bgmAudioID)),
            (this.bgmVolume != e || t) &&
            (cc.sys.localStorage.setItem('bgmVolume', e),
                this.bgmVolume = e,
                cc.audioEngine.setVolume(this.bgmAudioID, e))
    },
    pauseAll: function () {
        cc.audioEngine.pauseAll()
    },
    resumeAll: function () {
        cc.audioEngine.resumeAll()
    },
    stopAllEffects: function () {
        cc.audioEngine.stopAllEffects()
    },
    stopEffect: function (e) {
        cc.audioEngine.stopEffect(e)
    },
    changeAudio: function () {
        if (this.sfxVolume > 0) {
            cc.audioEngine.pauseAll();
            this.sfxVolume = -1
        } else {
            cc.audioEngine.resumeAll();
            this.sfxVolume = 1
        }
    }
})