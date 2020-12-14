/*
 * @Author: burt
 * @Date: 2019-08-13 13:18:16
 * @LastEditors: burt
 * @LastEditTime: 2020-11-01 15:11:53
 * @Description: 
 */
/**
 * Dawnson 2019-08-01
 * 15302765815@163.com
 */
var cmd = require("QZNNCMD")
cc.Class({
    extends: cc.Component,

    properties: {

    },
    onLoad: function () {
        cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE)
        //e.width / 750 < 1 && this.node_center.setScale(e.width / 750, e.height / 1334);
        this.initMgr();
    },


    initMgr: function () {
        cmd.CANSWITCH = true;
        cc.gg = {};
        cc.debug.setDisplayStats(false);
        // The core communication
        //utils
        var Utils = require('Common');
        cc.gg.utils = new Utils();


        var AudioMgr = require('AudioMgr');
        cc.gg.audioMgr = new AudioMgr();
        cc.gg.audioMgr.init()
        var Global = require('Global');
        cc.gg.global = new Global;
        cc.gg.global.socket = "ws://no1tyo.lymrmfyp.com:12351/qznn"//hqq.subGameList.qznn.serverUrl
        cc.gg.global.account_name = hqq.gameGlobal.player.nick
        var ProtoBuf = require("QZNNConnection");
        cc.gg.protoBuf = new ProtoBuf();
        cc.gg.protoBuf.isAutoConnect = true;
        cc.gg.protoBuf.connect(cc.gg.global.socket, false)
    },

    onDestroy: function () {
        //注销掉所有监听事件
        cc.gg.protoBuf.removeAllHandler();
    }
});