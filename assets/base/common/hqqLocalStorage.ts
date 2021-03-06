import * as cc from "cc";
import { DEBUG, JSB } from "cc/env";

export let localStorage = {
    subgameKey: "subgameKey",
    subdata: {},
    globalKey: "globalKey",
    global: {},
    huanjinKey: 'huanjinKey',
    /** 初始化每个游戏名一个保存键值对 */
    init() {
        if (DEBUG) {
            // cc.sys.localStorage.clear();
            if (cc.sys.localStorage.getItem(this.huanjinKey)) {
                let local = JSON.parse(cc.sys.localStorage.getItem(this.huanjinKey))
                if (local != hqq.app.huanjin) {
                    cc.sys.localStorage.clear();
                    cc.sys.localStorage.setItem(this.huanjinKey, JSON.stringify(hqq.app.huanjin))
                }
            } else {
                cc.sys.localStorage.setItem(this.huanjinKey, JSON.stringify(hqq.app.huanjin))
            }
        }
        if (cc.sys.localStorage.getItem(this.subgameKey)) {
            this.subdata = JSON.parse(cc.sys.localStorage.getItem(this.subgameKey));
        } else {
            for (let i in hqq.subGameList) {
                this.subdata[hqq.subGameList[i].enname] = hqq.commonTools.jsonCopy(hqq.subGameList[i]);
            }
            cc.sys.localStorage.setItem(this.subgameKey, JSON.stringify(this.subdata));
        }
        if (cc.sys.localStorage.getItem(this.globalKey)) {
            this.global = JSON.parse(cc.sys.localStorage.getItem(this.globalKey));
        } else {
            cc.sys.localStorage.setItem(this.globalKey, JSON.stringify(this.global));
            cc.sys.localStorage.setItem("bgVolumeKey", "1");
            cc.sys.localStorage.setItem("effectVolumeKey", "1");
            cc.sys.localStorage.setItem("bgIsOpenKey", "true");
            cc.sys.localStorage.setItem("effectIsOpenKey", "true");
        }
        // cc.log("log", JSON.parse(cc.sys.localStorage.getItem('log')))
        // cc.log("elog", JSON.parse(cc.sys.localStorage.getItem('elog')))
        // cc.log("global", JSON.parse(cc.sys.localStorage.getItem('globalKey')))
        // cc.log("subgame", JSON.parse(cc.sys.localStorage.getItem('subgameKey')))
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

    getSize(){
        return ((this.calSzieforobj(this.global)+this.calSzieforobj(this.subdata))/(1024*1024)).toFixed(2) + "MB";
    },

    calSzieforobj( object ) {

        var objectList = [];
        var stack = [ object ];
        var bytes = 0;
    
        while ( stack.length ) {
            var value = stack.pop();
    
            if ( typeof value === 'boolean' ) {
                bytes += 4;
            }
            else if ( typeof value === 'string' ) {
                bytes += value.length * 2;
            }
            else if ( typeof value === 'number' ) {
                bytes += 8;
            }
            else if
            (
                typeof value === 'object'
                && objectList.indexOf( value ) === -1
            )
            {
                objectList.push( value );
    
                for( var i in value ) {
                    stack.push( value[ i ] );
                }
            }
        }
        return bytes;
    },
}