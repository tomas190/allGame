/*
 * @Author: burt
 * @Date: 2019-08-05 16:17:41
 * @LastEditors  : burt
 * @LastEditTime : 2020-01-20 19:12:28
 * @Description: java原生调用
 */

let myReflect = {
    /** 获取设备id */
    getDeviceId() {
        let ret
        if (cc.sys.isBrowser) {
        } else {
            if (cc.sys.os === cc.sys.OS_ANDROID) {
                ret = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeAndroidClass", "getUniqueIdAction", "()Ljava/lang/String;");
            } else if (cc.sys.os === cc.sys.OS_IOS) {
                ret = jsb.reflection.callStaticMethod("NativeOcClass", "getIDFAAction");
            }
        }
        return ret
    },
    /** 获取粘贴文字 成功返回粘贴文字，失败返回空 */
    getClipboard() {
        let ret
        if (cc.sys.isBrowser) {
        } else {
            if (cc.sys.os === cc.sys.OS_ANDROID) {
                ret = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getClipBoardText", "()Ljava/lang/String;");
            } else if (cc.sys.os === cc.sys.OS_IOS) {
                ret = jsb.reflection.callStaticMethod("NativeOcClass", "getClipBoardText");
            }
        }
        console.log("getClipboard", ret)
        return ret
    },
    /** 粘贴文字 成功true 失败false */
    setClipboard(text) {
        let ret
        if (cc.sys.isBrowser) {
        } else {
            if (cc.sys.os === cc.sys.OS_ANDROID) {
                ret = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "clipBoardAction", "(Ljava/lang/String;)Z", text.toString());
            } else if (cc.sys.os === cc.sys.OS_IOS) {
                ret = jsb.reflection.callStaticMethod("NativeOcClass", "clipBoardAction:", text);
            }
        }
        console.log("setClipboard", ret)
        return ret;
    },
    /** 设置屏幕横竖切换 portrait 竖屏 landscape 横屏 */
    setOrientation(orientation, width, height) {
        var size = cc.view.getFrameSize();
        width = width || size.width;
        height = height || size.height;
        if (orientation == "portrait") {
            width = 750;
            height = 1334;
            cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT)
        } else {
            width = 1334;
            height = 750;
            cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE)
        }
        cc.view.setFrameSize(width, height);
        cc.view.setDesignResolutionSize(width, height, cc.ResolutionPolicy.SHOW_ALL);
        if (cc.sys.isBrowser) {
        } else {
            if (cc.sys.os === cc.sys.OS_ANDROID) {
                if (orientation == "portrait") {
                    jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "setOrientation", "(Ljava/lang/String;)V", "V");
                } else {
                    jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "setOrientation", "(Ljava/lang/String;)V", "L");
                }
            } else if (cc.sys.os === cc.sys.OS_IOS) {
                if (orientation == "portrait") {
                    jsb.reflection.callStaticMethod("AppController", "setOritation:", true);
                } else {
                    jsb.reflection.callStaticMethod("AppController", "setOritation:", false);
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
            if (cc.sys.os === cc.sys.OS_ANDROID) {
                ret = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeAndroidClass", "savePicture", "(Ljava/lang/String;)Z", base64png.toString());
            } else if (cc.sys.os === cc.sys.OS_IOS) {

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
            if (cc.sys.os === cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "saveTextureToLocal", "(Ljava/lang/String;)V", pngPath.toString());
            } else if (cc.sys.os === cc.sys.OS_IOS) {

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
            if (cc.sys.os === cc.sys.OS_ANDROID) {
                versionname = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getAppVersionName", "()Ljava/lang/String;");
            } else if (cc.sys.os === cc.sys.OS_IOS) {
                versionname = jsb.reflection.callStaticMethod("NativeOcClass", "getAppBuildVersion");
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
        } else {
            if (cc.sys.os === cc.sys.OS_ANDROID) {
                permission = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "isHasStoragePermission", "()Z");
                if (!permission) {
                    jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "requestPermissionAction", "()V");
                }
            } else if (cc.sys.os === cc.sys.OS_IOS) {

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
            if (cc.sys.os === cc.sys.OS_ANDROID) {
                return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "renameFile", "(Ljava/lang/String;Ljava/lang/String;)Z", oldpath.toString(), newpath.toString());
            } else if (cc.sys.os === cc.sys.OS_IOS) {
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
            if (cc.sys.os === cc.sys.OS_ANDROID) {
                name = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getAppPackageName", "()Ljava/lang/String;");
            } else if (cc.sys.os === cc.sys.OS_IOS) {
                name = jsb.reflection.callStaticMethod("NativeOcClass", "getAppPackageName");
            }
        }
        return name;
    },
}

module.exports = myReflect;