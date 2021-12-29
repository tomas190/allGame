import { EventKind, events } from "../IM_tools/IM_event";
import global from "./IM_global";

class DataTool {

    fileDOM = document.getElementById("fileDOM");

    //公用去除小数点后两位方法
    re_fixed = /([0-9]+.[0-9]{2})[0-9]*/;

    /**
     * 根据给定数值计算随机范围
     * @param max 最大值
     * @param min 最小值
     */
    countRandomAction(max, min) {
        return Math.random() * (max - min + 1) + min;
    }

    /**
     * 分数组方法
     * @param arr 出入要分的数组
     * @param num 几个数组为一段
     */
    chunk(arr, num) {
        num = num * 1 || 1;
        var ret = [];
        arr.forEach(function (item, i) {
            if (i % num === 0) {
                ret.push([]);
            }
            ret[ret.length - 1].push(item);
        });
        // console.log(ret);
        return ret;
    };

    /**
    * 动态播放音效
    * @param url  资源地址 "路径加资源名"
    */
    playAudioAction(url: string, bol: boolean) {
        if (bol) {
            cc.resources.load(url, cc.AudioClip, (err, audioClip) => {
                if (err) {
                    cc.log("资源加载失败！", url);
                    return;
                }
                // console.log("==>" + typeof audioClip);
                cc.audioEngine.playEffect(audioClip, false);
            });
        }
    }

    /**音乐资源 */
    loadAudioAction(index: number) {
        var str: string = "";
        switch (index) {
            //收到聊天消息（房间）
            case 1: str = "IM/IM_sounds/chat"; break;
            //收到聊天消息（列表）
            case 2: str = "IM/IM_sounds/session"; break;
            default: break;
        }
        return str;
    }

    /**
     * 按钮点击音效
     */
    clickBtnAudioPlay() {
        let clickBtnUrl = this.loadAudioAction(32);
    }



    /**
     * 当前预制体等比缩放
     * @param designSize 屏幕的设计尺寸
     * @param frameSize 屏幕的物理尺寸
     */
    getScaleBySize(designSize: cc.Size, frameSize: cc.Size) {
        // 1. 先找到 SHOW_ALL 模式适配之后，本节点的实际宽高以及初始缩放值
        let scaleForShowAll = Math.min(
            frameSize.width / designSize.width,
            frameSize.height / designSize.height
        );
        let realWidth = designSize.width * scaleForShowAll;
        let realHeight = designSize.height * scaleForShowAll;

        // 2. 基于第一步的数据，再做缩放适配
        return Math.max(
            frameSize.width / realWidth,
            frameSize.height / realHeight
        );
    }

    /**
     * 获取玩家头像
     * @param playerImg 头像链接
     * @param callBack 回调
     */
    getPlayerHeadPictureByAtlas(playerImg: string, callBack: Function) {
        let playerImgNumber = Number(playerImg.split('.')[0]);
        playerImgNumber = Math.floor(playerImgNumber);
        if (playerImgNumber >= 10) {
            playerImgNumber = playerImgNumber % 10;
        }

        cc.resources.load("head/im_head", cc.SpriteAtlas, (err, t) => {
            let spriteFrame = t.getSpriteFrame(`Avatar${playerImgNumber}`);
            callBack(err, spriteFrame);
        })
    }

    /**
     * 创建UUID（用于实时聊天）
     */
    creatUUid() {
        let s = [];
        let hexDigits = "0123456789abcdef";
        for (let i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        let uuid = s.join("");
        return uuid;
    }

    /**
     * 显示时间
     * @param e 后台传的时间戳（秒）
     */
    timestampToTime(e) {
        let time = Math.round(new Date().getTime() / 1000);
        let t = new Date(e * 1000);
        if (time - e > 60 * 60 * 24) {
            //显示日期 t.getFullYear() + '-' +
            return ((t.getMonth() + 1 < 10 ? '0' + (t.getMonth() + 1) : t.getMonth() + 1) + '-') +
                ((t.getDate()) < 10 ? '0' + t.getDate() : t.getDate())
        } else {
            //显示时间
            return ((t.getHours()) < 10 ? '0' + t.getHours() + ":" : t.getHours() + ':') +
                ((t.getMinutes()) < 10 ? '0' + t.getMinutes() : t.getMinutes())
        }

    }

    /**
     * 上传图片到服务器（web）
     */
    uploadImgWeb() {
        if (!this.fileDOM) {
            this.createFile();
        }
        let file = document.getElementById("file");
        file.onchange = function (e) {
            if (window.FileReader) {
                console.log("onChange == ", e);
                let reader = new FileReader();
                reader.onload = function (e) {
                    console.log('图片选择回调：');
                    events.dispatch(EventKind.Get_LocalImgPath, { imgData: e.target.result });
                }
                reader.readAsDataURL(file.files[0])
            }
        }
    }

    createFile() {
        let GameDom = document.getElementById("Cocos2dGameContainer");
        let e = document.createElement("div");
        e.id = "fileDOM"
        var html = `<input type="file"  accept="image/*"  size="30"  id="file" name="myfile" style="opacity:0;width:45px;height:45px;position:absolute;bottom:0;left:0;background:red">`;
        e.innerHTML = html
        GameDom.appendChild(e);
    }

    urlParse(url) {
        let a = {};
        if (null == window.location) return a;
        if (url.indexOf("?") < 0) {
            url = "?" + url
        }
        let dataSum = url.split("?")[1].split("&");
        for (let i = 0; i < dataSum.length; i++) {
            let arr = dataSum[i].split("=");
            a[arr[0]] = arr[1];
        }
        return a;
    }

    /**
     * 加载本地图片
     * @param imgNode 图片节点
     * @param imgPath 图片本地路径
     */
    changeSpriteFrameWithServerUrlForWeb(imgNode, imgPath) {
        //iconPath = "https://cdnresource.sempxw.com/com.test.pre/icon/"
        // console.log(imgPath);
        // if (!cc.sys.isNative) {
        //     var iconPath = this.urlParse(window.location.href).iconPath;
        // } else {
        // }
        // if (imgPath.split("http://")[1] || imgPath.split("https://")[1] || imgPath.split('data:image')[1]) { } else {
        //     imgPath = iconPath + imgPath
        // }
        cc.assetManager.loadRemote({
            url: imgPath,
            type: "png"
        }, (err, texture) => {
            if (err) {
                return
            }
            imgNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
        })
    }

    /**
     * 计算图片尺寸
     * @param maxWidth 图片最大宽度
     * @param maxHeight 图片最大高度
     * @param imgSize 图片实际尺寸
     */
    countImgShowSize(maxWidth, maxHeight, imgSize: cc.Size): cc.Size {
        let imgWidth = imgSize.width;
        let imgHeight = imgSize.height;
        let tempWidth, tempHeight;
        //原图片宽高比例 大于 指定的宽高比，这就说明原图片的宽度必然大于高度
        let imgRatio = (imgWidth / imgHeight).toFixed(2);
        let maxRatio = (maxWidth / maxHeight).toFixed(2);
        // console.log("imgRatio: ", imgRatio);
        // console.log("maxRatio: ", maxRatio);
        // console.log("imgWi: ", imgWidth);
        // console.log("maxW: ", maxWidth);
        
        if (imgRatio >= maxRatio) {
            if (imgWidth > maxWidth) {
                tempWidth = maxWidth;
                //按原图的比例缩放
                tempHeight = ((imgHeight * maxWidth) / imgWidth).toFixed(2);
            } else {
                tempWidth = imgWidth;
                tempHeight = imgHeight;
            }
        } else {
            if (imgHeight > maxHeight) {
                tempHeight = maxHeight;
                tempWidth = ((imgWidth * maxHeight) / imgHeight).toFixed(2);
            } else {
                tempWidth = imgWidth;
                tempHeight = imgHeight;
            }
        }

        let tempImgSize = new cc.Size(Number(tempWidth), Number(tempHeight));
        return tempImgSize;
    }

    

}

export default new DataTool();