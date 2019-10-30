const ZJHEventCustom = {
        //--------------service rsp------------------//
        EVENT_USER_NETCUT_RSP:100,//有玩家掉线
        EVENT_USER_LEAVE_RSP:101,//有玩家离开
        EVENT_USER_RECONNECT_RSP:102,//有玩家重新连接
        EVENT_OTHER_JOIN_RSP:103,//进入游戏

        EVENT_USER_LOGIN_RSP:111,//用户登录
        EVENT_USER_LOGOUT_RSP:112, // 用户登出
        EVENT_OTHER_LOGIN_RSP:113, // 其它地点登录
        EVENT_QUERY_RECORD_RSP:114, // 战绩查询
        EVENT_ROOMLIST_RSP:115, // 房间列表
        EVENT_MATCHROOM_RSP:116, // 匹配房间返回
        EVENT_ENTERGAME_RSP:130,//进入游戏
        EVENT_START_COUNTDOWN_RSP:131,//开始倒计时
        EVENT_SENDCARD_RSP:132,//开始发牌
        EVENT_BET_BASEPOINT_RSP:133,//投锅底
        EVENT_NOTIFY_BET_RSP:134,//用户下注通知
        EVENT_USER_FOLLOW_RSP:135,//用户跟注
        EVENT_USER_FOLD_RSP:136,//用户弃牌 
        EVENT_USER_CHECK_RSP:137,//用户弃牌
        EVENT_USER_COMPARE_RSP:138,//用户比牌
        EVENT_USER_ALLIN_RSP:139,//用户ALL IN
        EVENT_USER_SHOWCARD_RSP:140,//用户亮牌
        EVENT_USER_ADDBET_RSP:142,//用户加注
        EVENT_USER_SETTLE_RSP:143,//结算
        EVENT_USER_EMOJI_RSP:144,//互动表情
        //--------------service rsp------------------//

        // EVENT_SHOW_TOAST:350,//吐司
        EVENT_ERROR_RSP:400,//错误提示
        // EVENT_CONNECTING:410,//重连动画
        // EVENT_CONNECT_SUCCESS:411,//重连成功
        // EVENT_OPEN_DIALOG:500,//打开弹窗
        // EVENT_CLOSE_DIALOG:501,//关闭弹窗

        EVENT_SETBET_BTF:1000,//设置筹码
        EVENT_REMOVE_LOAD:1001,//移除加载界面
        //===============音效命令========================//
        EVENT_MUSIC_EFFECT:1200,//播放音效
        EVENT_MUSIC_STOPEFFECT:1201,//停止所有音效
        
}       

export = ZJHEventCustom
