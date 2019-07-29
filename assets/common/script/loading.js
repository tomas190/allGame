/*
 * @Author: burt
 * @Date: 2019-07-27 16:57:02
 * @LastEditors: burt
 * @LastEditTime: 2019-07-27 18:47:36
 * @Description: 通用加载场景
 */

cc.Class({
    extends: cc.Component,

    properties: {

    },

    /** 脚本组件初始化，可以操作this.node // use this for initialization */
    onLoad() {

    },
    /** enabled和active属性从false变为true时 */
    // onEnable() { },
    /** 通常用于初始化中间状态操作 */
    start() {
        cc.director.loadScene("hall");
    },

    /** 每帧调用一次 // called every frame */
    // update(dt) { },
    /** 所有组件update执行完之后调用 */
    // lateUpdate() { },
    /** 调用了 destroy() 时回调，当帧结束统一回收组件 */
    // onDestroy() { },
});
