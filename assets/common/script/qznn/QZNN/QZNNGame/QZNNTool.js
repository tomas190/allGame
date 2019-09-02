var o = require("QZNNCMD")
var tool = {};

tool.getLocalIndex = function(e) {
    var t = o.MY_SEAT,
        i = this.getSeatByID(e),
        a = o.GAME_PLAYER;
    console.log((i - t + a + 2) % a + "座位号");
    return t < -1 ? i - 1 : (i - t + a + 2) % a
};
tool.getAccountId = function(e) {
    if (8 == o._playMode)
        for (var t = o.PLAYER_DATAS, i = 0; i < t.length; i++)
            if (t[i]) { var a = t[i]; if (e == this.getLocalIndex(a.account_id)) return a.account_id }
};
tool.getSeatByID = function(e) {
    console.log(o.PLAYER_DATAS);
    for (var t = o.PLAYER_DATAS, i = 0; i < t.length; i++)
        if (t[i]) { var a = t[i]; if (e == a.account_id) return parseInt(a.serial_num) }
};
tool.getPlayerDataByID = function(e) {
    for (var t = o.PLAYER_DATAS, i = 0; i < t.length; i++)
        if (t[i]) { var a = t[i]; if (e == a.account_id) return a }
};
tool.UserisExist = function() {
    return true;
    !(o.MY_SEAT < 0 || o.MY_SEAT > o.GAME_PLAYER)
};
tool.getPlayerCount = function(e) { for (var t = 0, i = 0; i < o.GAME_PLAYER; i++) e[i] && null != e[i] && (t += 1); return t };
tool.getUserSexByID = function(e) {
    for (var t = o.PLAYER_DATAS, i = 0; i < t.length; i++)
        if (t[i]) {
            var a = t[i];
            if (e == a.account_id)
                return 1 == a.sex ? "male" : (a.sex, "female")
        }
};
tool.timestampToTime = function(e) { var t = new Date(1e3 * e); return t.getFullYear() + "-" + ((t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1) + "-") + (t.getDate() + " ") + (t.getHours() + ":") + (t.getMinutes() + ":") + t.getSeconds() };

module.exports = tool;