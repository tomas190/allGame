/*
 * @Author: burt
 * @Date: 2019-07-29 18:38:29
 * @LastEditors: burt
 * @LastEditTime: 2019-10-28 13:31:27
 * @Description: 大厅动态资源管理器
 */
let gHandler = require("gHandler");
cc.Class({
    extends: cc.Component,
    properties: {
        hallHeadFramePlist: [cc.SpriteFrame],
        hallHeadFrame: [cc.SpriteFrame],
        hallMusic: {
            default: [],
            type: [cc.AudioClip],
        },
        spineAnimation: {
            default: [],
            type: [sp.SkeletonData],
        },
        hallBtnName: {
            default: [],
            type: [cc.SpriteFrame],
        },
    },
    /** 脚本组件初始化，可以操作this.node // use this for initialization */
    onLoad() {
        this.nameToMusicId = { // 音效名字与id对照表
            hallbg: 0,
        }
        gHandler.hallResManager = this;
    },
    /** enabled和active属性从false变为true时 */
    // onEnable() { },
    /** 通常用于初始化中间状态操作 */
    start() {

    },
    getHallHeadFramePlistLength() {
        return this.hallHeadFramePlist.length;
    },
    getHallHeadFramePlist(id) {
        if (typeof id == "string" && id.indexOf(".") != -1) {
            id = id.substring(0, id.indexOf("."))
        }
        id = parseInt(id) - 1
        if (this.hallHeadFramePlist[id]) {
            return this.hallHeadFramePlist[id]
        } else {
            id = id % 10
            if (this.hallHeadFramePlist[id]) {
                return this.hallHeadFramePlist[id]
            } else {
                cc.log("没有找到头像")
            }
        }
    },

    getHallHeadFrameLength() {
        return this.hallHeadFrame.length
    },
    getHallHeadFrame(id) {
        if (typeof id == "string" && id.indexOf(".") != -1) {
            id = id.substring(0, id.indexOf("."))
        }
        id = parseInt(id) - 1
        if (this.hallHeadFrame[id]) {
            return this.hallHeadFrame[id]
        } else {
            if (this.hallHeadFrame[id - 20]) {
                return this.hallHeadFrame[id - 20]
            } else {
                cc.log("没有找到头像")
            }
        }
    },
    getHallBtnAni(id) {
        if (this.spineAnimation[id]) {
            return this.spineAnimation[id];
        } else {

        }
    },
    getHallBtnImg(id) {
        if (this.hallBtnName[id]) {
            return this.hallBtnName[id];
        } else {

        }
    },
    getMusic(name) {
        let id = this.nameToMusicId[name];
        if (this.hallMusic[id]) {
            return this.hallMusic[id];
        } else {
            cc.log("没有这个音效");
        }
    },

    /** 每帧调用一次 // called every frame */
    // update(dt) { },
    /** 所有组件update执行完之后调用 */
    // lateUpdate() { },
    /** 调用了 destroy() 时回调，当帧结束统一回收组件 */
    // onDestroy() { },
});
