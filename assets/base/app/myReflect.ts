import * as cc from 'cc';
export let myReflect = {
    framesise: {
        width: 0,
        height: 0
    },
    Cocos2dGameContainer_style: "",
    Cocos2dGameContainer_portrait_style: "transform: rotate(90deg); width: 788px; height: 1385px; margin: 0px 0px 0px 1385px; padding: 0px; display: block; transform-origin: 0px 0px 0px;",
    GameCanvas_style: "",
    requestFastUrl(urllist) {
        let ret
        if (cc.sys.isBrowser) {
        } else {
            if (cc.sys.os === cc.sys.OS.ANDROID) {
                // ret = jsb.reflection.callStaticMethod("com/cocos/game/NativeAndroidClass", "getUniqueIdAction", "()Ljava/lang/String;");
            } else if (cc.sys.os === cc.sys.OS.IOS) {
                ret = jsb.reflection.callStaticMethod("AppController", "requestUrl:", urllist);
            }
        }
        return ret
    },
    /** 获取设备id */
    getDeviceId() {
        let ret
        if (cc.sys.isBrowser) {
        } else {
            if (cc.sys.os === cc.sys.OS.ANDROID) {
                ret = jsb.reflection.callStaticMethod("com/cocos/game/NativeAndroidClass", "getUniqueIdAction", "()Ljava/lang/String;");
            } else if (cc.sys.os === cc.sys.OS.IOS) {
                ret = jsb.reflection.callStaticMethod("NativeOcClass", "getIDFAAction",null);
            }
        }
        return ret
    },
    /** 获取粘贴文字 成功返回粘贴文字，失败返回空 */
    getClipboard() {
        let ret = ""
        if (cc.sys.isBrowser) {
        } else {
            if (cc.sys.os === cc.sys.OS.ANDROID) {
                ret = jsb.reflection.callStaticMethod("com/cocos/game/AppActivity", "getClipBoardText", "()Ljava/lang/String;");
            } else if (cc.sys.os === cc.sys.OS.IOS) {
                ret = jsb.reflection.callStaticMethod("NativeOcClass", "getClipBoardText",null);
            }
        }
        return ret
    },
    /** 粘贴文字 成功true 失败false */
    setClipboard(text) {
        let ret
        if (cc.sys.isBrowser) {
            const input = document.createElement('input');
            document.body.appendChild(input);
            input.setAttribute('readonly', 'readonly');
            input.setAttribute('value', text);
            input.select();
            input.setSelectionRange(0, 9999);
            if (document.execCommand('copy')) {
                document.execCommand('copy');
                ret = true
            }
            document.body.removeChild(input);
        } else {
            if (cc.sys.os === cc.sys.OS.ANDROID) {
                ret = jsb.reflection.callStaticMethod("com/cocos/game/AppActivity", "clipBoardAction", "(Ljava/lang/String;)Z", text.toString());
            } else if (cc.sys.os === cc.sys.OS.IOS) {
                ret = jsb.reflection.callStaticMethod("NativeOcClass", "clipBoardAction:", text);
            }
        }
        return ret;
    },
    /** 设置屏幕横竖切换 portrait 竖屏 landscape 横屏 */
    setOrientation(orientation, width, height) {
        orientation = orientation || 'landscape'
        if (cc.sys.isBrowser) {
            var bsize = cc.view.getVisibleSize();
            if (this.framesise.width < bsize.width) {
                this.framesise.width = bsize.width
            }
            if (this.framesise.height < bsize.height) {
                this.framesise.height = bsize.height
            }
            width = width || this.framesise.width;
            height = height || this.framesise.height;
            cc.log("设置屏幕横竖切换", JSON.stringify(this.framesise))
            if (orientation == "portrait") {
                cc.log("设置屏幕横竖切换 portrait", width, height)
                cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT)
                // cc.view.setFrameSize(750 / 1334 * height, height);
            } else {
                cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE)
                // cc.view.setFrameSize(width, height);
            }
        } else {
            var bsize = cc.view.getVisibleSize();
            if (this.framesise.width < bsize.width) {
                this.framesise.width = bsize.width
            }
            if (this.framesise.height < bsize.height) {
                this.framesise.height = bsize.height
            }
            width = width || this.framesise.width;
            height = height || this.framesise.height;
            if (orientation == "portrait") {
                cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT)
            } else {
                cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE)
            }
            cc.view.setFrameSize(width, height);
            cc.view.setDesignResolutionSize(width, height, cc.ResolutionPolicy.SHOW_ALL);
            if (cc.sys.os === cc.sys.OS.ANDROID) {
                if (orientation == "portrait") {
                    jsb.reflection.callStaticMethod("com/cocos/game/AppActivity", "setOrientation", "(Ljava/lang/String;)V", "V");
                } else {
                    jsb.reflection.callStaticMethod("com/cocos/game/AppActivity", "setOrientation", "(Ljava/lang/String;)V", "L");
                }
            } else if (cc.sys.os === cc.sys.OS.IOS) {
                if (orientation == "portrait") {
                    jsb.reflection.callStaticMethod("AppController", "setOritation:",null, true);
                } else {
                    jsb.reflection.callStaticMethod("AppController", "setOritation:",null, false);
                }
            }
        }
    },
    /**
     * @Description: 保存base64图片
     */
    saveBase64Png(base64png) {
        let ret
        if (cc.sys.isBrowser) {
        } else {
            if (cc.sys.os === cc.sys.OS.ANDROID) {
                ret = jsb.reflection.callStaticMethod("com/cocos/game/NativeAndroidClass", "savePicture", "(Ljava/lang/String;)Z", base64png.toString());
            } else if (cc.sys.os === cc.sys.OS.IOS) {

            }
        }
        return ret;
    },
    /**
     * @Description: 保存texture纹理到本地
     */
    saveTextureToLocal(pngPath) {
        if (cc.sys.isBrowser) {
        } else {
            if (cc.sys.os === cc.sys.OS.ANDROID) {
                jsb.reflection.callStaticMethod("com/cocos/game/AppActivity", "saveTextureToLocal", "(Ljava/lang/String;)V", pngPath.toString());
            } else if (cc.sys.os === cc.sys.OS.IOS) {
                let ret = jsb.reflection.callStaticMethod("AppController", "saveTextureToLocal:", pngPath);
            }
        }
    },
    /**
     * @Description: 获取app版本号
     */
    getAppVersion() {
        let versionname
        if (cc.sys.isBrowser) {
        } else {
            if (cc.sys.os === cc.sys.OS.ANDROID) {
                versionname = jsb.reflection.callStaticMethod("com/cocos/game/AppActivity", "getAppVersionName", "()Ljava/lang/String;");
            } else if (cc.sys.os === cc.sys.OS.IOS) {
                versionname = jsb.reflection.callStaticMethod("NativeOcClass", "getAppBuildVersion",null);
            }
        }
        return versionname;
    },
    /**
     * @Description: 获取存储权限
     */
    getPermission() {
        let permission
        if (cc.sys.isBrowser) {
            permission = true
        } else {
            if (cc.sys.os === cc.sys.OS.ANDROID) {
                permission = jsb.reflection.callStaticMethod("com/cocos/game/AppActivity", "isHasStoragePermission", "()Z");
                if (!permission) {
                    jsb.reflection.callStaticMethod("com/cocos/game/AppActivity", "requestPermissionAction", "()V");
                }
            } else if (cc.sys.os === cc.sys.OS.IOS) {

            }
        }
        return permission
    },
    /**
     * @Description: 移动重命名文件
     */
    renameTo(oldpath, newpath) {
        if (cc.sys.isBrowser) {
            return false;
        } else {
            if (cc.sys.os === cc.sys.OS.ANDROID) {
                return jsb.reflection.callStaticMethod("com/cocos/game/AppActivity", "renameFile", "(Ljava/lang/String;Ljava/lang/String;)Z", oldpath.toString(), newpath.toString());
            } else if (cc.sys.os === cc.sys.OS.IOS) {
                return false;
            }
            return false;
        }
    },
    /**
     * @Description: 获取app包名
     */
    getAppPackageName() {
        let name
        if (cc.sys.isBrowser) {
        } else {
            if (cc.sys.os === cc.sys.OS.ANDROID) {
                name = jsb.reflection.callStaticMethod("com/cocos/game/AppActivity", "getAppPackageName", "()Ljava/lang/String;");
            } else if (cc.sys.os === cc.sys.OS.IOS) {
                name = jsb.reflection.callStaticMethod("NativeOcClass", "getAppPackageName",null);
            }
        }
        return name;
    },
    /**
     * @Description: 获取本地ip地址
     */
    getLocalIpAddress() {
        let localip
        if (cc.sys.isBrowser) {
        } else {
            if (cc.sys.os === cc.sys.OS.ANDROID) {
                localip = jsb.reflection.callStaticMethod("com/cocos/game/AppActivity", "getLocalIpAddress", "()Ljava/lang/String;");
            } else if (cc.sys.os === cc.sys.OS.IOS) {
                localip = jsb.reflection.callStaticMethod("NativeOcClass", "getIPAddress",null);
            }
        }
        return localip;
    },
    /**
     * @Description: 获取安装包固定信息
     */
    getHqqPackageInfo() {
        let packageinfo
        if (cc.sys.isBrowser) {
            // return '{"pinpai":"test","huanjin":"dev","system":"android","version":"1.0.9","proxyid":"123456"}';
        } else {
            if (cc.sys.os === cc.sys.OS.ANDROID) {
                packageinfo = jsb.reflection.callStaticMethod("com/cocos/game/AppActivity", "getHqqPackageInfo", "()Ljava/lang/String;");
            } else if (cc.sys.os === cc.sys.OS.IOS) {
                packageinfo = jsb.reflection.callStaticMethod("NativeOcClass", "getHqqPackageInfo",null);
            }
        }
        return packageinfo;
    },
}
