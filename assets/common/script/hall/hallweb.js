/*
 * @Author: burt
 * @Date: 2019-09-17 09:02:11
 * @LastEditors: burt
 * @LastEditTime: 2019-09-17 15:57:53
 * @Description: 
 */

let gHandler = require("gHandler");
cc.Class({
    extends: cc.Component,

    properties: {
        web: cc.WebView, // 网页
    },

    onLoad() {
        cc.log("web界面")
        // this.web.active = true;
        // this.web.url = "https://www.baidu.com"
        // this.web.onEnable()
        let getIconPath = () => {
            let packageName = gHandler.appGlobal.packgeName;
            let pathName = packageName + "/images/icon";
            return gHandler.appGlobal.remoteSeverinfo.source_host[0] + "/" + pathName + "/";
        }

        let info = JSON.stringify({
            id: gHandler.gameGlobal.player.id, // 用户ID
            game_id: gHandler.gameConfig.oldGameList['brnn'].remoteData.game_id, // 游戏ID
            server_url: gHandler.gameConfig.oldGameList['brnn'].remoteData.game_host[0], // game_host
            password: gHandler.gameGlobal.player.account_pass // 用户密码
        });
        info = gHandler.base64.encode(info);

        let url = gHandler.appGlobal.remoteSeverinfo.temp_host[0] + gHandler.gameConfig.oldGameList['brnn'].remoteData.web_down_webgl +
            "?info=" + info +
            "&os=" + gHandler.appGlobal.os +
            "&iconPath=" + getIconPath() + // 头像资源地址(图片地址)
            "&version=" + gHandler.gameConfig.oldGameList['brnn'].remoteData.version +// 游戏版本号
            "&env=" + "dev" + // 环境 online dev pre
            "&time=" + new Date().getTime();// 时间戳
        cc.log(url)
        this.web.url = url;
        this.web.active = true;
        this.web.onRestore();
        this.web.onEnable();

        cc.log(this.web, this.web.node.x, this.web.node.y)
    },

    start() {

    },

    onClickExit() {
        cc.director.loadScene(gHandler.gameConfig.hallconfig.lanchscene)
    },

    // update (dt) {},
});
