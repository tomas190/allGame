class NewClass {
    // 控制背景音效
    IsBackMusic: boolean = true 
    // 控制音效
    IsOpenMusic: boolean = true;

    // 播放背景音乐
    PlayBackMusic() {
        // 判断音效是否关闭,关闭状态则不开启音效
        if (!this.IsBackMusic) {
            return
        }
        let cdxRes = cc.assetManager.getBundle("cdxRes");
        cdxRes.load("sound/background", cc.AudioClip, function (err, clip) { 
            var audioID = cc.audioEngine.playMusic(clip, false);  
            cc.audioEngine.setLoop(audioID, true);
        });
    }
    
    /**
    * 动态播放音效
    * @param url  资源地址 "路径加资源名"
    */
    
    PlayAudio(url: string) {
        // 判断音效是否关闭,关闭状态则不开启音效
        if (!this.IsOpenMusic) {
            return
        }
        let cdxRes = cc.assetManager.getBundle("cdxRes");
        cdxRes.load(url, cc.AudioClip, (err, audioClip) => {
            if (err) {
                console.log("资源加载失败！");
                return;
            }
            cc.audioEngine.playEffect(audioClip, false);
        });
    }

    // 获取下注音效
    LoadAudio(index: number) {
        var str: string = "";
        if (index == 0) {
            str = "sound/click";          // 点击声音
        }else if (index == 1) {
            str = "sound/downbet";        // 下注声音
        }else if (index == 2) {
            str = "sound/backChips";      // 筹码返回声音
        }else if (index == 3) {
            str = "sound/startBet";       // 开始下注
        }else if (index == 4) {
            str = "sound/stopBet";        // 停止下注
        }
        return str;
    }

    LoadEmojAduio(num: number) {
        var str: string = "";
        if (num == 21) {
            str = "emoj_aduio/ani1"; 
        }else if (num == 22) {
            str = "emoj_aduio/ani2"; 
        }else if (num == 23) {
            str = "emoj_aduio/ani3"; 
        }else if (num == 24) {
            str = "emoj_aduio/ani4"; 
        }
        return str;
    }
}



export default new NewClass