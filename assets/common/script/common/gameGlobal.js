/*
 * @Author: burt
 * @Date: 2019-07-29 18:52:11
 * @LastEditors: burt
 * @LastEditTime: 2019-08-09 15:42:17
 * @Description: 游戏全局模块索引和数据
 */
let gameGlobal = {

    gameNowName: "", // 当前游戏的名字

    playerKey: "player",
    player: {
        gold: 1000,
        name: "",
        pass: 123456,
        code: 123456,
        uuid: 123456,
    },
}

module.exports = gameGlobal;