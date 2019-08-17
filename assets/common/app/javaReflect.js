/*
 * @Author: burt
 * @Date: 2019-08-05 16:17:41
 * @LastEditors: burt
 * @LastEditTime: 2019-08-07 08:38:27
 * @Description: java原生调用
 */

let javaReflect = {
    /** 获取设备id */
    getDeviceId() {
        let ret = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeAndroidClass", "getUniqueIdAction", "()Ljava/lang/String;");
        return ret
    },
    /** 获取粘贴文字 成功返回粘贴文字，失败返回空 */
    getClipboard() {
        let ret = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeAndroidClass", "getClipBoardText", "()Ljava/lang/String;");
        return ret
    },
    /** 粘贴文字 成功true 失败false */
    setClipboard(text) {
        let ret = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeAndroidClass", "clipBoardAction", "(Ljava/lang/String;)Z", text.toString());
        return ret;
    },
}

module.exports = javaReflect;