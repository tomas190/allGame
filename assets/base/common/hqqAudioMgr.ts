import * as cc from 'cc';
export let audioMgr = {
    bgIsOpen: true,
    bgVolume: 1,
    bgId: -1,
    effectIsOpen: true,
    effectVolume: 1,
    nameToMusicPath: null, // 音效名字与id对照表
    resMap: {}, // 缓存资源列表
    bgchip: null, // 当前背景音乐资源
     /**音效池 */
     _audios:[],
     /**音乐 */
     _Music: null,
    init() {
        this.bgVolume = hqq.localStorage.globalGet("bgVolumeKey") || 1;
        this.effectVolume = hqq.localStorage.globalGet("effectVolumeKey") || 1;
        if(hqq.app.pinpai != "ninetwo" ){
            this.bgVolume = 1;
            this.effectVolume = 1;
        }
        if (typeof hqq.localStorage.globalGet("bgIsOpenKey") == 'boolean') {
            this.bgIsOpen = !!hqq.localStorage.globalGet("bgIsOpenKey");
        }
        if (typeof hqq.localStorage.globalGet("effectIsOpenKey") == 'boolean') {
            this.effectIsOpen = !!hqq.localStorage.globalGet("effectIsOpenKey");
        }
        if (!this.nameToMusicPath) {
            this.nameToMusicPath = {
                hallbg: 'base/audio/backgroud01',
                hallbg_xinsheng: "/audio/backxinsheng",
                hallbg_xingui: "audio/backxingui",
                hallbg_fuxin: "audio/nobody",
                hallclick: 'base/audio/Click',
                hallbg_juding: "audio/jd_bgm48",
                hallbg_ninetwomodern: "audio/modern",
                hallbg_ninetwojazz: "audio/jazz",
                hallbg_ninetwolatin: "audio/latin",
                hallbg_huangshi:"audio/HS_bgm01_02-300k",
            }
        }
        return this;
    },
    /**
     * @Description: 
     * audiopath 只能是resource目录下的动态动态加载资源
     */
    setButtonEffect(b, audiopath) {
        let self = this
        if (b) {
            audiopath = audiopath || this.nameToMusicPath['hallclick']
            if (this.nameToMusicPath.btnclick && audiopath != this.nameToMusicPath.btnclick) {
                this.unregister('btnclick')
            }
            this.register('btnclick', audiopath)
            if (!cc.Button.prototype.tocheEndClose) {
                cc.Button.prototype.tocheEndClose = cc.Button.prototype._onTouchEnded
            }
            cc.Button.prototype._hqqSoundon = true;
            cc.Button.prototype.setSoundEffect = function (on) {
                if (typeof on == 'undefined') {
                    this._hqqSoundon = true
                } else {
                    this._hqqSoundon = on
                }
            }
            cc.Button.prototype.hqqEffect = function () {
                if (this.interactable && this.enabledInHierarchy && this._pressed && this._hqqSoundon) {
                    self.playEffect("btnclick");
                }
            }
            cc.Button.prototype._onTouchEnded = function (event) {
                if(!cc.isValid(event.target))return;
                if(!cc.isValid(this.node))return;
                if (this._hqqSoundon) {
                    this.hqqEffect()
                }
                this.tocheEndClose(event);
                if (this._hqqDelay) {
                    this.hqqDelay(event)
                }
            }
        } else {
            cc.Button.prototype._hqqSoundon = false;
        }
    },
    getBgVolume() {
        return this.bgVolume
    },
    getBgState() {
        return this.bgIsOpen
    },
    setBgState(bgof) {
        this.bgIsOpen = !!bgof
        hqq.localStorage.globalSet("bgIsOpenKey", this.bgIsOpen)
        if (cc.director.getScene().name == "hall") {
            if (!this.bgIsOpen) {
                this.stopBg()
            } else {
                this.playBg()
            }
        } else {
            hqq.eventMgr.dispatch(hqq.eventMgr.refreshBgState, this.bgIsOpen)
        }
    },
    getEffectVolume() {
        return this.effectVolume
    },
    getEffectState() {
        return this.effectIsOpen
    },
    setEffectState(efof) {
        this.effectIsOpen = !!efof
        hqq.localStorage.globalSet("effectIsOpenKey", this.effectIsOpen)
        if (cc.director.getScene().name == "hall") {
            if (!this.effectIsOpen) {
                this.stopEffect();
            } else {
                // cc.audioEngine.resumeAllEffects()
            }
        } else {
            hqq.eventMgr.dispatch(hqq.eventMgr.refreshEffectState, this.effectIsOpen)
        }
    },
    register(name, path) {
        this.nameToMusicPath[name] = path;
    },
    unregister(name) {
        if (this.resMap[name]) {
            cc.resources.release(this.nameToMusicPath[name]);
            delete this.resMap[name]
        }
        delete this.nameToMusicPath[name]
    },
    playAudio(name, type, subbundle ,isMultiTrack=true) {
        if (cc.isValid(this.resMap[name])) {
            if (type == 'bg') {
                if (this.bgIsOpen) {
                    this.bgchip = this.resMap[name];
                    if( !cc.isValid(this._Music) ){
                        this._Music = cc.find("Canvas").addComponent( cc.AudioSource );
                    }
                    this._Music.clip = this.bgchip;
                    this._Music.name = this.bgchip.name;
                    this._Music.loop = true;
                    this._Music.volume = this.bgVolume;
                    this._Music.play();
                }
            } else {
                if (this.effectIsOpen) {
                    let findid = -1;
                    for (let i = 0; i < this._audios.length; i++) {
                        if (name == this._audios[i].name) {
                            findid = i;
                            
                            if( !( this._audios[ i ].playing() ) || isMultiTrack == false )
                            {
                                this._audios[i].volume = this.effectVolume;
                                this._audios[i].play();
                                return;
                            }
                        }
                    }
                    if( findid >= 0 && findid < this._audios.length && isMultiTrack )
                    {
                        let audioSource = this._audios[ findid ].node.addComponent( cc.AudioSource );
                        audioSource.clip = this.resMap[name].clip;
                        audioSource.name = this.resMap[name].name;
                        audioSource.volume = this.effectVolume;
                        this._audios.push(audioSource);
                        audioSource.play();
                    }
                }
            }
        } else {
            if (this.nameToMusicPath[name]) {
                if (subbundle) {
                    subbundle.load(this.nameToMusicPath[name], cc.AudioClip, (err, t) => {
                        if (err) {
                            console.log(err)
                        } else {
                            this.resMap[name] = t
                            if (type == 'bg') {
                                if (this.bgIsOpen) {
                                    this.bgchip = this.resMap[name]
                                    if( !cc.isValid(this._Music) ){
                                        this._Music = cc.find("Canvas").addComponent( cc.AudioSource );
                                    }
                                    this._Music.clip = this.bgchip;
                                    this._Music.name = this.bgchip.name;
                                    this._Music.loop = true;
                                    this._Music.volume = this.bgVolume;
                                    this._Music.play();
                                }
                            } else {
                                if (this.effectIsOpen) {
                                    let audioSource = cc.find("Canvas").addComponent( cc.AudioSource );
                                    audioSource.clip = this.resMap[name];
                                    audioSource.name = this.resMap[name].name;
                                    this._audios.push(audioSource);
                                    audioSource.loop = false;
                                    audioSource.volume = this.effectVolume;
                                    audioSource.play();
                                }
                            }
                        }
                    })
                } else {
                    cc.resources.load(this.nameToMusicPath[name], cc.AudioClip, (err, t) => {
                        if (err) {
                            console.log(err)
                        } else {
                            this.resMap[name] = t
                            if (type == 'bg') {
                                if (this.bgIsOpen) {
                                    this.bgchip = this.resMap[name]
                                    if( !cc.isValid(this._Music) ){
                                        this._Music = cc.find("Canvas").addComponent( cc.AudioSource );
                                    }
                                    this._Music.clip = this.bgchip;
                                    this._Music.name = this.bgchip.name;
                                    this._Music.loop = true;
                                    this._Music.volume = this.bgVolume;
                                    this._Music.play();
                                }
                            } else {
                                if (this.effectIsOpen) {
                                    let audioSource = cc.find("Canvas").addComponent( cc.AudioSource );
                                    audioSource.clip = this.resMap[name];
                                    audioSource.name = this.resMap[name].name;
                                    this._audios.push(audioSource);
                                    audioSource.loop = false;
                                    audioSource.volume = this.effectVolume;
                                    audioSource.play();
                                }
                            }
                        }
                    })
                }
            } else {
                console.log('没有这个音效')
            }
        }
    },
    setBgVolume(num) {
        if (hqq.commonTools.isNumber(num)) {
            this.bgVolume = num;
            // cc.audioEngine.setVolume(this.bgId, this.bgVolume);
            if(cc.isValid(this._Music)){
                this._Music.volume = this.bgVolume;
            }
            hqq.localStorage.globalSet("bgVolumeKey", this.bgVolume);
        }
    },
    setEffectVolume(num) {
        if (hqq.commonTools.isNumber(num)) {
            this.effectVolume = num;
            for( let i = 0; i < this._audios.length; i++ ){
                if(cc.isValid(this._audios[i])){
                    this._audios[i].volume = this.effectVolume;
                }
            }
            hqq.localStorage.globalSet("effectVolumeKey", this.effectVolume);
        }
    },
    playBg(name = "hallbg", subbundle = null , musicIndex = null ) {
        if (name == "hallbg") {
            subbundle = hqq["hall_" + hqq.app.pinpai ]
            if (hqq.app.pinpai == "xinsheng" || hqq.app.pinpai == "xinlong" ) {
                name = "hallbg_xinsheng";
            } else if (hqq.app.pinpai == "xingui") {
                name = "hallbg_xingui";
            } else if (hqq.app.pinpai == "fuxin") {
                name = "hallbg_fuxin";
            } else if (hqq.app.pinpai == "juding") {
                name = "hallbg_juding";
            } else if (hqq.app.pinpai == "ninetwo"|| hqq.app.pinpai == "ninethree") {
                if( musicIndex == null ){
                    let musicindex = hqq.localStorage.globalGet( "musiceIndexKey" );
                    if( musicindex == null ){
                        musicindex = 1;
                    }
                    musicIndex = musicindex;
                }
                hqq.localStorage.globalSet( "musiceIndexKey" , musicIndex );
                if( musicIndex === 1 ){
                    name = "hallbg_ninetwomodern";
                } else if( musicIndex === 2 ){
                    name = "hallbg_ninetwojazz";
                } else if( musicIndex === 3 ){
                    name = "hallbg_ninetwolatin";
                }
            } else if (hqq.app.pinpai == "huangshi") {
                name = "hallbg_huangshi";
                subbundle = cc.resources;
            } else{
                subbundle = cc.resources;   
            }
        }
        this.playAudio(name, 'bg', subbundle );
    },
    pauseBg() {
        if (this.bgId || (this.bgId === 0)) {
            if( cc.isValid(this._Music)){
                this._Music.pause()
            }
        }
    },
    resumeBg() {
        if (this.bgIsOpen && this.bgId || (this.bgId === 0)) {
            if( cc.isValid(this._Music)){
                this._Music.play()
            }
        }
    },
    stopBg() {
        if (this.bgId || (this.bgId === 0)) {
            if( cc.isValid(this._Music)){
                this._Music.stop()
            }
        }
    },
    pauseEffect() {
        for(let i = 0; i < this._audios.length; i++ ){
            if(cc.isValid(this._audios[i])){
                this._audios[i].pause();
            }
        }
    },
    resumeEffect() {
        for(let i = 0; i < this._audios.length; i++ ){
            if(cc.isValid(this._audios[i])){
                this._audios[i].play();
            }
        }
    },
    stopEffect() {
        for(let i = 0; i < this._audios.length; i++ ){
            if(cc.isValid(this._audios[i])){
                this._audios[i].stop();
            }
        }
    },
    playEffect(name, subbundle) {
        this.playAudio(name, 'effect', subbundle);
    },
}
