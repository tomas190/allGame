/*
 * @Author: burt
 * @Date: 2019-07-30 10:44:15
 * @LastEditors  : burt
 * @LastEditTime : 2020-02-12 14:14:02
 * @Description: 本地化保存
 */
let gHandler = require("gHandler");
let localStorage = {
    subgameKey: "subgameKey",
    subdata: {},
    globalKey: "globalKey",
    global: {},
    huanjinKey: 'huanjinKey',
    /** 初始化每个游戏名一个保存键值对 */
    init() {
        if (CC_DEBUG) {
            // cc.sys.localStorage.clear();
            if (cc.sys.localStorage.getItem(this.huanjinKey)) {
                let local = JSON.parse(cc.sys.localStorage.getItem(this.huanjinKey))
                if (local != gHandler.appGlobal.huanjin) {
                    cc.sys.localStorage.clear();
                    cc.sys.localStorage.setItem(this.huanjinKey, JSON.stringify(gHandler.appGlobal.huanjin))
                }
            } else {
                cc.sys.localStorage.setItem(this.huanjinKey, JSON.stringify(gHandler.appGlobal.huanjin))
            }
        }
        if (cc.sys.localStorage.getItem(this.subgameKey)) {
            this.subdata = JSON.parse(cc.sys.localStorage.getItem(this.subgameKey));
        } else {
            for (let i = 0; i < gHandler.gameConfig.gamelist.length; i++) {
                this.subdata[gHandler.gameConfig.gamelist[i].enname] = gHandler.commonTools.jsonCopy(gHandler.gameConfig.gamelist[i]);
            }
            cc.sys.localStorage.setItem(this.subgameKey, JSON.stringify(this.subdata));
        }
        if (cc.sys.localStorage.getItem(this.globalKey)) {
            this.global = JSON.parse(cc.sys.localStorage.getItem(this.globalKey));
        } else {
            cc.sys.localStorage.setItem(this.globalKey, JSON.stringify(this.global));
            cc.sys.localStorage.setItem("bgVolumeKey", 1);
            cc.sys.localStorage.setItem("effectVolumeKey", 1);
            cc.sys.localStorage.setItem("bgIsOpenKey", true);
            cc.sys.localStorage.setItem("effectIsOpenKey", true);
        }
        // console.log("log", JSON.parse(cc.sys.localStorage.getItem('log')))
        // console.log("elog", JSON.parse(cc.sys.localStorage.getItem('elog')))
        // if (typeof JSON.parse(cc.sys.localStorage.getItem('globalKey')).hotServerKey == "object") {
        //     let hotserver = this.globalGet("hotServerKey")[0]
        //     this.globalSet("hotServerKey", hotserver)
        // }
        // console.log("global", JSON.parse(cc.sys.localStorage.getItem('globalKey')))
        // console.log("subgame", JSON.parse(cc.sys.localStorage.getItem('subgameKey')))
        return this;
    },
    set(subgame, key, data) {
        if (!this.subdata[subgame]) {
            this.subdata[subgame] = {};
        }
        this.subdata[subgame][key] = data;
        this.savaLocal();
    },
    has(subgame, key) {
        if (this.subdata[subgame] && this.subdata[subgame][key]) {
            return true;
        } else {
            // gHandler.logMgr.log("localstorage don`t has:", subgame, key)
            return false;
        }
    },
    get(subgame, key) {
        if (this.has(subgame, key)) {
            return this.subdata[subgame][key]
        } else {
            return null;
        }
    },
    remove(subgame, key) {
        if (this.has(subgame, key)) {
            this.subdata[subgame][key] = null;
        }
    },
    clear() {
        this.subdata = {}
        this.global = {}
        cc.sys.localStorage.clear();
    },
    savaLocal() {
        cc.sys.localStorage.setItem(this.subgameKey, JSON.stringify(this.subdata));
        cc.sys.localStorage.setItem(this.globalKey, JSON.stringify(this.global));
    },
    globalSet(key, value) {
        this.global[key] = value;
        this.savaLocal();
    },
    globalGet(key) {
        return this.global[key];
    },
    getGlobal() {
        return this.global;
    },
}
module.exports = localStorage;