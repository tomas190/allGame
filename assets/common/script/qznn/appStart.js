/*
 * @Author: burt
 * @Date: 2019-08-13 13:18:16
 * @LastEditors: burt
 * @LastEditTime: 2019-08-14 08:25:48
 * @Description: 
 */
/**
 * Dawnson 2019-08-01
 * 15302765815@163.com
 */
cc.Class({
    extends: cc.Component,

    properties: {

    },
    onLoad: function() {
        cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE)
            //e.width / 750 < 1 && this.node_center.setScale(e.width / 750, e.height / 1334);
        this.initMgr();
    },

    initMgr: function() {
        cc.gg = {};

        cc.debug.setDisplayStats(false);


        // The core communication
        var Http = require('Http');
        cc.gg.http = new Http();
        var Net = require('Socket');
        cc.gg.net = new Net();

        //utils
        var Utils = require('Common');
        cc.gg.utils = new Utils();


        var AudioMgr = require('AudioMgr');
        cc.gg.audioMgr = new AudioMgr();

        var Global = require('Global');
        cc.gg.global = new Global;

        var ProtoBuf = require('Protobuf');
        cc.gg.protoBuf = new ProtoBuf();
        cc.gg.protoBuf.connect(cc.gg.global.socket, false)
    },


    onDestroy: function() {
        //注销掉所有监听事件
        cc.gg.protoBuf.removeAllHandler();
    }
});