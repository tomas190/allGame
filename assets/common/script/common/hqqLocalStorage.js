/*
 * @Author: burt
 * @Date: 2019-07-30 10:44:15
 * @LastEditors: burt
 * @LastEditTime: 2019-08-10 13:15:16
 * @Description: 本地化保存
 */
let gameConfig = require("gameConfig");
let localStorage = {
    subgameKey: "subgameKey",
    subdata: {},
    globalKey: "globalKey",
    global: {},
    /** 初始化每个游戏名一个保存键值对 */
    init() {
        if (cc.sys.localStorage.getItem(this.subgameKey)) {
            this.subdata = JSON.parse(cc.sys.localStorage.getItem(this.subgameKey));
        } else {
            for (let i = 0; i < gameConfig.gamelist.length; i++) {
                this.subdata[gameConfig.gamelist[i].enname] = gameConfig.gamelist[i];
            }
            cc.sys.localStorage.setItem(this.subgameKey, JSON.stringify(this.subdata));
        }
        if (cc.sys.localStorage.getItem(this.globalKey)) {
            this.global = JSON.parse(cc.sys.localStorage.getItem(this.globalKey));
        } else {
            cc.sys.localStorage.setItem(this.globalKey, JSON.stringify(this.global));
        }
        return this;
    },
    set(subgame, key, data) {
        this.subdata[subgame][key] = data;
        this.savaLocal();
    },
    has(subgame, key) {
        if (this.subdata[subgame][key]) {
            return true;
        } else {
            return false;
        }
    },
    get(subgame, key) {
        return this.subdata[subgame][key]
    },
    remove(subgame, key) {
        this.subdata[subgame][key] = null;
    },
    clear() {
        cc.sys.localStorage.clear();
    },
    savaLocal() {
        cc.sys.localStorage.setItem(this.subgameKey,JSON.stringify(this.subdata));
        cc.sys.localStorage.setItem(this.globalKey, JSON.stringify(this.global));
    },
    globalSet(key, value) {
        this.global[key] = value;
        this.savaLocal();
    },
    globalGet(key) {
        return this.global[key];
    },
    getGlobal(){
        return this.global;
    },
}
module.exports = localStorage;