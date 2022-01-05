let gHandler = {
    isOtherGame: false, // 是否是接入的第三方
    needShowNotice: false, // 是否需要显示公告界面
    needShowBubble: false, // 是否显示公告泡泡提示讯息
    language: "CN", // 语言种类   汉语 CN 英语 EN 越南语 VI 泰语 TH
    isDebug: true, // 是否是子游戏开发调试状态
    gameGlobal: {
        gameNow: "hall", // 当前游戏的名字
        iconPath: "", // 头像地址前缀
        playerKey: "playerKey",
        tokenKey: "tokenKey",
        token: "", // 通信token
        huanjin: "", // dev pre online
        loginHistory: [], // 子游戏最近一周登陆历史sub
        player: { // 玩家信息
            gold: "", // 金币
            nick: "", // 昵称
            sex: 0,// 男 0  女 1
            headurl: "1.png", // 头像
            account_name: 0, // number类型 账号
            account_pass: "", // string类型 密码
            proxy_pid: 0, // 代理id
            uuid: 0,
            id: 0,
            code: 0, // 上级id  邀请码
            phonenum: "", // 手机号码
            alipay: "", //  支付宝账号
            yinhangka: "", //  银行卡
            deviceid: "", // 设备id
            usdtaddr: "", // usdt钱包地址
        },
        im_host: "",
        proxy: { // 全民代理数据结构
            package_id: null, // number类型
            balance: null, // number类型
            temp_host: "", // string类型
            proxy_host: "", // proxy_host
            token:null, // 全民代理通信TOKEN
        },
        pay: { // 充提数据结构
            from_scene: "", // 跳转过来的场景名
            client: "",
            pay_host: "",
            user_id: "",
            user_name: "",
            proxy_user_id: "",
            proxy_name: "",
            package_id: null, // number类型
        },
        noticeList: [], // 公告列表
        emailList: [], // 邮件列表
        slideNoticeList: [], // 滚动公告
        imReceive: 0, // im收到的消息
        payReceive: 0, // 收益消息
        ipList: [], // 本地ip地址列表
        ipapiData: null, // 通过ipapi获得的数据
        regin_ip: "", // 注册ip
        ipCheck: false, // 是否通过ip
        ipinfoData: null, // 登陆ip信息2号方案
        subGameType: 0, // 沙巴体育和真人视讯子游戏类别
        zhibo:{
            GameCode:"",
            RoomCode:"",
            ZhiBoUrl:"",
            WebViewSize:null,
            WebViewPosition:null,
        },
        jdb:{
            MType:null,//JDB子游戏ID
        },
        showPayActivityWeb:true,// 是否开启活动页面用网页显示功能
        pgwinrate:0,
        pg2winrate:0,
    },
    agaGame: {
        zhname: "aga游戏", // 中文游戏名
        enname: "aga", // 英文游戏名 （子游戏文件路径，更新子路径）
        lanchscene: "", // 跳转场景名
        game_id: "5b1f3a3cb76a451e7f251738",
        serverUrl: "", // 游戏服务器地址
        endUrl: "", // 游戏服务器地址
        hasAccount: false, // 是否已创建子游戏账号
        remoteData: null, // 服务端发送过来的游戏数据
        hallid: 30,
        resPath: "/btnanimation/aga",
        isDown: false,
        gameType: 4, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
        loginHistory: [], // 子游戏最近一周登陆历史
        hasRes: true,
    },
    agaSubGameList: {
        "duofuduocai": {
            zhname: "多福多财", // 中文游戏名
            enname: "duofuduocai", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "duofuduocai", // 跳转场景名
            fuxin_lanchscene: "duofuduocai", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251731",
            serverUrl: "/duofuduocai", // 游戏服务器地址
            endUrl: "/duofuduocai", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 0,
            resPath: "/btnanimation/duofuduocai",
            isDown: false,
            gameType: 1, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "cbzb": {
            zhname: "城堡争霸", // 中文游戏名 
            enname: "cbzb", // 英文游戏名 （子游戏文件路径，更新子路径） 
            lanchscene: "cbzb", // 跳转场景名 
            fuxin_lanchscene: "cbzb", // 跳转场景名 
            game_id: "5b1f3a3cb76a591e7f251729",
            serverUrl: "/castcraft", // 游戏服务器地址 
            endUrl: "/castcraft", // 游戏服务器地址 
            hasAccount: false, // 是否已创建子游戏账号 
            remoteData: null, // 服务端发送过来的游戏数据 
            hallid: 1,
            resPath: "/btnanimation/icon_castleCrush",
            isDown: false,
            gameType: 4, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4 
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "ygxb": {
            zhname: "云谷寻宝", // 中文游戏名 
            enname: "ygxb", // 英文游戏名 （子游戏文件路径，更新子路径） 
            lanchscene: "ygxbHall", // 跳转场景名 
            fuxin_lanchscene: "ygxbHall", // 跳转场景名 
            game_id: "5b1f3a3cb76a591e7f251728",
            serverUrl: "/ygxb", // 游戏服务器地址 
            endUrl: "/ygxb", // 游戏服务器地址 
            hasAccount: false, // 是否已创建子游戏账号 
            remoteData: null, // 服务端发送过来的游戏数据 
            hallid: 2,
            resPath: "/btnanimation/ygxb_datingicon2",
            isDown: false,
            gameType: 4, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4 
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: false,
        },
        "fkxw": {
            zhname: "疯狂漩涡", // 中文游戏名
            enname: "fkxw", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "fkxw", // 跳转场景名
            fuxin_lanchscene: "fkxw", // 跳转场景名
            game_id: "5b1f3a3cb76a59n210407n738",
            serverUrl: "", // 游戏服务器地址
            endUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 3,
            resPath: "/btnanimation/datingicon_fkxw",
            isDown: false,
            gameType: 4, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
    },
    // // 子游戏配置列表
    subGameList: {
        "ermj": {
            zhname: "二人麻将", // 中文游戏名
            enname: "ermj", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "ERMJHallScene", // 跳转场景名
            fuxin_lanchscene: "ERMJHallScene", // 跳转场景名
            xingui_lanchscene: "ERMJHallScene", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f25170",
            serverUrl: "/ermj", // 游戏服务器地址
            endUrl: "/ermj", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 0,
            resPath: "/btnanimation/2rmj",
            isDown: false,
            gameType: 0, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "21d": {
            zhname: "二十一点", // 中文游戏名
            enname: "21d", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "21dRoomList", // 跳转场景名
            fuxin_lanchscene: "21dRoomList", // 跳转场景名
            xingui_lanchscene: "21dRoomList", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251722",
            serverUrl: "/21d", // 游戏服务器地址
            endUrl: "/21d", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 1,
            resPath: "/btnanimation/21dian",
            isDown: false,
            gameType: 0, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "ebg": {
            zhname: "二八杠", // 中文游戏名
            enname: "ebg", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "ebg", // 跳转场景名
            fuxin_lanchscene: "ebg", // 跳转场景名
            xingui_lanchscene: "ebg", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251720",
            serverUrl: "/erbg", // 游戏服务器地址
            endUrl: "/erbg", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 2,
            resPath: "/btnanimation/28gang",
            isDown: false,
            gameType: 1, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "bcbm": {
            zhname: "奔驰宝马", // 中文游戏名
            enname: "bcbm", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "bcbmloading", // 跳转场景名
            fuxin_lanchscene: "bcbmloading", // 跳转场景名
            xingui_lanchscene: "bcbmloading", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251716",
            serverUrl: "/bcbm", // 游戏服务器地址
            endUrl: "/bcbm", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 3,
            resPath: "/btnanimation/bcbm",
            isDown: false,
            gameType: 4, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "bjl": {
            zhname: "百家乐", // 中文游戏名
            enname: "bjl", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "bjl_baccarat_hall", // 跳转场景名
            fuxin_lanchscene: "bjl_baccarat_hall", // 跳转场景名
            // fuxin_lanchscene: "bjl_fuxin_hall", // 跳转场景名 皮肤更新还没好暂时拿掉
            xingui_lanchscene: "bjl_baccarat_hall", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251721",
            serverUrl: "/baijl", // 游戏服务器地址
            endUrl: "/baijl", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 4,
            resPath: "/btnanimation/bjl",
            isDown: false,
            gameType: 1, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "brnn": {
            zhname: "百人牛牛", // 中文游戏名
            enname: "brnn", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "brnn", // 跳转场景名
            fuxin_lanchscene: "brnn", // 跳转场景名
            xingui_lanchscene: "brnn", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251718",
            serverUrl: "/bairennn", // 游戏服务器地址
            endUrl: "/bairennn", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 5,
            resPath: "/btnanimation/brnn",
            isDown: false,
            gameType: 1, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "hwby": {
            zhname: "海王捕鱼", // 中文游戏名
            enname: "hwby", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "hwby", // 跳转场景名
            fuxin_lanchscene: "hwby", // 跳转场景名
            xingui_lanchscene: "hwby", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f2517a6",
            serverUrl: "/haiwangby", // 游戏服务器地址
            endUrl: "/haiwangby", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 6,
            resPath: "/btnanimation/buyu",
            isDown: false,
            gameType: 4, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "cyqp": {
            zhname: "彩源棋牌", // 中文游戏名 
            enname: "cyqp", // 英文游戏名 （子游戏文件路径，更新子路径） 
            lanchscene: "CaiYuanQP", // 跳转场景名 
            fuxin_lanchscene: "CaiYuanQP", // 跳转场景名 
            xingui_lanchscene: "CaiYuanQP", // 跳转场景名 
            game_id: "5b1f3a3cb76a591e7f251726",
            serverUrl: "/caiyuanqp", // 游戏服务器地址 
            endUrl: "/caiyuanqp", // 游戏服务器地址 
            hasAccount: false, // 是否已创建子游戏账号 
            remoteData: null, // 服务端发送过来的游戏数据 
            hallid: 7,
            resPath: "/btnanimation/cyqp",
            isDown: false,
            gameType: 3, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4 
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: false,
        },
        "ddz": {
            zhname: "斗地主", // 中文游戏名
            enname: "ddz", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "ddzroom", // 跳转场景名
            fuxin_lanchscene: "ddzroom", // 跳转场景名
            xingui_lanchscene: "ddzroom", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251711",
            serverUrl: "/landlord", // 游戏服务器地址
            endUrl: "/landlord", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 8,
            resPath: "/btnanimation/doudizhu",
            isDown: false,
            gameType: 0, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "dzpk": {
            zhname: "德州扑克", // 中文游戏名
            enname: "dzpk", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "dzpk_load", // 跳转场景名
            fuxin_lanchscene: "dzpk_load", // 跳转场景名
            xingui_lanchscene: "dzpk_load", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f25176",
            serverUrl: "/dezhoupoker", // 游戏服务器地址
            endUrl: "/dezhoupoker", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 9,
            resPath: "/btnanimation/dzpk",
            isDown: false,
            gameType: 0, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "hbld": {
            zhname: "红包乱斗", // 中文游戏名
            enname: "hbld", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "hbldGame", // 跳转场景名
            fuxin_lanchscene: "hbldGame", // 跳转场景名
            xingui_lanchscene: "hbldGame", // 跳转场景名
            game_id: "5c6a62be7ff587m117d446aa",
            serverUrl: "/hongbaold", // 游戏服务器地址
            endUrl: "/hongbaold", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 10,
            resPath: "/btnanimation/hbld",
            isDown: false,
            gameType: 1, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        // "hbsl": {
        //     zhname: "新红包扫雷", // 中文游戏名
        //     enname: "hbsl", // 英文游戏名 （子游戏文件路径，更新子路径）
        //     lanchscene: "hbslGame", // 跳转场景名
        //     fuxin_lanchscene: "hbslGame", // 跳转场景名
        //     xingui_lanchscene: "hbslGame", // 跳转场景名
        //     game_id: "5b1f3a3cb76alkje7f25170",
        //     serverUrl: "/hongbaosl", // 游戏服务器地址
        //     endUrl: "/hongbaosl", // 游戏服务器地址
        //     hasAccount: false, // 是否已创建子游戏账号
        //     remoteData: null, // 服务端发送过来的游戏数据
        //     hallid: 11,
        //     resPath: "/btnanimation/hbsl",
        //     isDown: false,
        //     gameType: 0, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
        //     loginHistory: [], // 子游戏最近一周登陆历史
        //     hasRes: true,
        // },
        "hh": {
            zhname: "红黑大战", // 中文游戏名
            enname: "hh", // 英文游戏名 （子游戏文件路径，更新子路径）ssss
            lanchscene: "hhlobby", // 跳转场景名
            fuxin_lanchscene: "hhlobby", // 跳转场景名
            xingui_lanchscene: "hhlobby", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251719",
            serverUrl: "/redblackwar", // 游戏服务器地址
            endUrl: "/redblackwar", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 12,
            resPath: "/btnanimation/honhei",
            isDown: false,
            gameType: 1, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "cbzb": {
            zhname: "城堡争霸", // 中文游戏名 
            enname: "cbzb", // 英文游戏名 （子游戏文件路径，更新子路径） 
            lanchscene: "cbzb", // 跳转场景名 
            fuxin_lanchscene: "cbzb", // 跳转场景名 
            xingui_lanchscene: "cbzb", // 跳转场景名 
            game_id: "5b1f3a3cb76a591e7f251729",
            serverUrl: "/castcraft", // 游戏服务器地址 
            endUrl: "/castcraft", // 游戏服务器地址 
            hasAccount: false, // 是否已创建子游戏账号 
            remoteData: null, // 服务端发送过来的游戏数据 
            hallid: 13,
            resPath: "/btnanimation/icon_castleCrush",
            isDown: false,
            gameType: 4, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4 
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "jbpby": {
            zhname: "聚宝盆", // 中文游戏名
            enname: "jbpby", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "jbpby", // 跳转场景名
            fuxin_lanchscene: "jbpby", // 跳转场景名
            xingui_lanchscene: "jbpby", // 跳转场景名
            game_id: "5c6a62be56209ac117d446aa",
            serverUrl: "/jbpby", // 游戏服务器地址
            endUrl: "/jbpby", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 14,
            resPath: "/btnanimation/jbp",
            isDown: false,
            gameType: 4, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "szwg": {
            zhname: "狮子王国", // 中文游戏名
            enname: "szwg", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "szwg_Hall", // 跳转场景名
            fuxin_lanchscene: "szwg_Hall", // 跳转场景名
            xingui_lanchscene: "szwg_Hall", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251725",
            serverUrl: "/szwg", // 游戏服务器地址
            endUrl: "/szwg", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 15,
            resPath: "/btnanimation/lionKingdom",
            isDown: false,
            gameType: 4, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "lhd": {
            zhname: "龙虎斗", // 中文游戏名 彩源龙虎斗
            enname: "lhd", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "lhd", // 跳转场景名
            // fuxin_lanchscene: "lhd_fuxin", // 跳转场景名
            fuxin_lanchscene: "lhd", // 跳转场景名
            xingui_lanchscene: "lhd", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251717",
            serverUrl: "/go_lhd", // 游戏服务器地址
            endUrl: "/go_lhd", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 16,
            resPath: "/btnanimation/longhudou",
            isDown: false,
            gameType: 1, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "lp": {
            zhname: "轮盘游戏", // 中文游戏名
            enname: "lp", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "lp", // 跳转场景名
            fuxin_lanchscene: "lp", // 跳转场景名
            xingui_lanchscene: "lp", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251713",
            serverUrl: "/lunpan", // 游戏服务器地址
            endUrl: "/lunpan", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 17,
            resPath: "/btnanimation/luanpan",
            isDown: false,
            gameType: 1, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "pccp": {
            zhname: "派彩", // 中文游戏名
            enname: "pccp", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "PaiCai", // 跳转场景名
            fuxin_lanchscene: "PaiCai", // 跳转场景名
            xingui_lanchscene: "PaiCai", // 跳转场景名
            game_id: "569a62be7ff123m117d446aa",
            serverUrl: "/paicai", // 游戏服务器地址
            endUrl: "/paicai", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 18,
            resPath: "/btnanimation/paicai",
            isDown: false,
            gameType: 3, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: false,
        },
        "pdk": {
            zhname: "跑得快", // 中文游戏名
            enname: "pdk", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "pdkroom", // 跳转场景名
            fuxin_lanchscene: "pdkroom", // 跳转场景名
            xingui_lanchscene: "pdkroom", // 跳转场景名
            game_id: "5c6a62be7ff09a54amb446aa",
            serverUrl: "/paodekuai", // 游戏服务器地址
            endUrl: "/paodekuai", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 19,
            resPath: "/btnanimation/paodekuai",
            isDown: false,
            gameType: 0, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "qznn": {
            zhname: "抢庄牛牛", // 中文游戏名
            enname: "qznn", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "NNGame", // 跳转场景名
            fuxin_lanchscene: "NNGame", // 跳转场景名
            xingui_lanchscene: "NNGame", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251714",
            serverUrl: "/qznn", // 游戏服务器地址
            endUrl: "/qznn", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 20,
            resPath: "/btnanimation/qznn",
            isDown: false,
            gameType: 0, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "sbty1": {
            zhname: "沙巴体育", // 中文游戏名 
            enname: "sbty1", // 英文游戏名 （子游戏文件路径，更新子路径） 
            lanchscene: "ShaBaGame", // 跳转场景名 
            fuxin_lanchscene: "ShaBaGame", // 跳转场景名 
            xingui_lanchscene: "ShaBaGame", // 跳转场景名 
            game_id: "5b1f3a3cb76a591e7f25179",
            serverUrl: "/shabaty", // 游戏服务器地址 
            endUrl: "/shabaty", // 游戏服务器地址 
            hasAccount: false, // 是否已创建子游戏账号 
            remoteData: null, // 服务端发送过来的游戏数据 
            hallid: 21,
            resPath: "/btnanimation/sbty_icon",
            isDown: false,
            gameType: 3, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4 
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: false,
        },
        "sbty2": {
            zhname: "电竞", // 中文游戏名  电竞
            enname: "sbty2", // 英文游戏名 （子游戏文件路径，更新子路径） 
            lanchscene: "ShaBaGame", // 跳转场景名 
            fuxin_lanchscene: "ShaBaGame", // 跳转场景名 
            xingui_lanchscene: "ShaBaGame", // 跳转场景名 
            game_id: "5b1f3a3cb76a591e7f25179",
            serverUrl: "/shabaty", // 游戏服务器地址 
            endUrl: "/shabaty", // 游戏服务器地址 
            hasAccount: false, // 是否已创建子游戏账号 
            remoteData: null, // 服务端发送过来的游戏数据 
            hallid: 22,
            resPath: "/btnanimation/tycp_esports",
            isDown: false,
            gameType: 3, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4 
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: false,
        },
        "sgj": {
            zhname: "水果机", // 中文游戏名
            enname: "sgj", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "FruitGame", // 跳转场景名
            fuxin_lanchscene: "FruitGame", // 跳转场景名
            xingui_lanchscene: "FruitGame", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251712",
            serverUrl: "/shuigj", // 游戏服务器地址
            endUrl: "/shuigj", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 23,
            resPath: "/btnanimation/sgj",
            isDown: false,
            gameType: 4, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "sss": {
            zhname: "十三水", // 中文游戏名
            enname: "sss", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "SSSLoad", // 跳转场景名
            fuxin_lanchscene: "SSSLoad", // 跳转场景名
            xingui_lanchscene: "SSSLoad", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f25171",
            serverUrl: "/shisanshui", // 游戏服务器地址
            endUrl: "/shisanshui", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 24,
            resPath: "/btnanimation/shisanshui",
            isDown: false,
            gameType: 0, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "shaibao": {
            zhname: "骰宝", // 中文游戏名
            enname: "shaibao", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "shaibao_Hall", // 跳转场景名
            fuxin_lanchscene: "shaibao_Hall", // 跳转场景名
            xingui_lanchscene: "shaibao_Hall", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251724",
            serverUrl: "/shaibao", // 游戏服务器地址
            endUrl: "/shaibao", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 25,
            resPath: "/btnanimation/sicbo",
            isDown: false,
            gameType: 1, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "zrsx1": {
            zhname: "真人视讯-百家乐", // 中文游戏名
            enname: "zrsx1", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "LiveGame", // 跳转场景名
            fuxin_lanchscene: "LiveGame", // 跳转场景名
            xingui_lanchscene: "LiveGame", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f25173",
            serverUrl: "/zhenrensx", // 游戏服务器地址
            endUrl: "/zhenrensx", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 26,
            resPath: "/btnanimation/sxbjl",
            isDown: false,
            gameType: 2, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: false,
        },
        "zrsx2": {
            zhname: "真人视讯-龙虎斗", // 中文游戏名
            enname: "zrsx2", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "LiveGame", // 跳转场景名
            fuxin_lanchscene: "LiveGame", // 跳转场景名
            xingui_lanchscene: "LiveGame", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f25173",
            serverUrl: "/zhenrensx", // 游戏服务器地址
            endUrl: "/zhenrensx", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 27,
            resPath: "/btnanimation/zrsx",
            isDown: false,
            gameType: 2, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: false,
        },
        "ygxb": {
            zhname: "云谷寻宝", // 中文游戏名 
            enname: "ygxb", // 英文游戏名 （子游戏文件路径，更新子路径） 
            lanchscene: "ygxbHall", // 跳转场景名 
            fuxin_lanchscene: "ygxbHall", // 跳转场景名 
            xingui_lanchscene: "ygxbHall", // 跳转场景名 
            game_id: "5b1f3a3cb76a591e7f251728",
            serverUrl: "/ygxb", // 游戏服务器地址 
            endUrl: "/ygxb", // 游戏服务器地址 
            hasAccount: false, // 是否已创建子游戏账号 
            remoteData: null, // 服务端发送过来的游戏数据 
            hallid: 28,
            resPath: "/btnanimation/ygxb_datingicon2",
            isDown: false,
            gameType: 4, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4 
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: false,
        },
        "zjh": {
            zhname: "扎金花", // 中文游戏名
            enname: "zjh", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "ZJHLoad", // 跳转场景名
            fuxin_lanchscene: "ZJHLoad", // 跳转场景名
            xingui_lanchscene: "ZJHLoad", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251715",
            serverUrl: "/zhajh", // 游戏服务器地址
            endUrl: "/zhajh", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 29,
            resPath: "/btnanimation/zhajinhua",
            isDown: false,
            gameType: 0, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "caishendao": {
            zhname: "财神到", // 中文游戏名
            enname: "caishendao", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "caishendao", // 跳转场景名
            fuxin_lanchscene: "caishendao", // 跳转场景名
            xingui_lanchscene: "caishendao", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251730",
            serverUrl: "/caishendao", // 游戏服务器地址
            endUrl: "/caishendao", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 30,
            resPath: "/btnanimation/csd_dating",
            isDown: false,
            gameType: 4, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "suoha": {
            zhname: "梭哈", // 中文游戏名
            enname: "suoha", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "suoha_Hall", // 跳转场景名
            fuxin_lanchscene: "suoha_Hall", // 跳转场景名
            xingui_lanchscene: "suoha_Hall", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251732",
            serverUrl: "/suoha", // 游戏服务器地址
            endUrl: "/suoha", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 31,
            resPath: "/btnanimation/suoha_datingicon",
            isDown: false,
            gameType: 0, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "duofuduocai": {
            zhname: "多福多财", // 中文游戏名
            enname: "duofuduocai", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "duofuduocai", // 跳转场景名
            fuxin_lanchscene: "duofuduocai", // 跳转场景名
            xingui_lanchscene: "duofuduocai", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251731",
            serverUrl: "/duofuduocai", // 游戏服务器地址
            endUrl: "/duofuduocai", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 32,
            resPath: "/btnanimation/duofuduocai",
            isDown: false,
            gameType: 1, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "cylhd": {
            zhname: "彩源龙虎斗", // 中文游戏名
            enname: "cylhd", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "cylhd", // 跳转场景名
            fuxin_lanchscene: "cylhd", // 跳转场景名
            xingui_lanchscene: "cylhd", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251733",
            serverUrl: "/cylhd", // 游戏服务器地址
            endUrl: "/cylhd", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 33,
            resPath: "/btnanimation/tylhd",
            isDown: false,
            gameType: 1, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "cdx": {
            zhname: "彩源猜大小", // 中文游戏名 分分彩猜大小
            enname: "cdx", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "cdx_load", // 跳转场景名
            fuxin_lanchscene: "cdx_load", // 跳转场景名
            xingui_lanchscene: "cdx_load", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251734",
            serverUrl: "/caidaxiao", // 游戏服务器地址
            endUrl: "/caidaxiao", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 34,
            resPath: "/btnanimation/tycdx",
            isDown: false,
            gameType: 1, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "fkxw": {
            zhname: "疯狂漩涡", // 中文游戏名
            enname: "fkxw", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "fkxw", // 跳转场景名
            fuxin_lanchscene: "fkxw", // 跳转场景名
            xingui_lanchscene: "fkxw", // 跳转场景名
            game_id: "5b1f3a3cb76a59n210407n738",
            serverUrl: "/xwby", // 游戏服务器地址
            endUrl: "/xwby", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 35,
            resPath: "/btnanimation/datingicon_fkxw",
            isDown: false,
            gameType: 4, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "ag": {
            zhname: "AG", // 中文游戏名
            enname: "ag", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "ag_main", // 跳转场景名
            fuxin_lanchscene: "ag_main", // 跳转场景名
            xingui_lanchscene: "ag_main", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251736",
            serverUrl: "/ag", // 游戏服务器地址
            endUrl: "/ag", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 36,
            resPath: "/btnanimation/ag",
            isDown: false,
            gameType: 4, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "cq9": {
            zhname: "CQ9", // 中文游戏名
            enname: "cq9", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "cq9Scene", // 跳转场景名
            fuxin_lanchscene: "cq9Scene", // 跳转场景名
            xingui_lanchscene: "cq9Scene", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251735",
            serverUrl: "/cq9", // 游戏服务器地址
            endUrl: "/cq9", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 37,
            resPath: "/btnanimation/cq9",
            isDown: false,
            gameType: 4, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "pt": {
            zhname: "PT", // 中文游戏名
            enname: "pt", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "pt_main", // 跳转场景名
            fuxin_lanchscene: "pt_main", // 跳转场景名
            xingui_lanchscene: "pt_main", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251737",
            serverUrl: "/pt", // 游戏服务器地址
            endUrl: "/pt", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 38,
            resPath: "/btnanimation/pt",
            isDown: false,
            gameType: 4, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "jdb": {
            zhname: "JDB", // 中文游戏名
            enname: "jdb", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "jdb_main", // 跳转场景名
            fuxin_lanchscene: "jdb_main", // 跳转场景名
            xingui_lanchscene: "jdb_main", // 跳转场景名
            game_id: "5b1f3a3cb76a451e7f251739",
            serverUrl: "/jdb", // 游戏服务器地址
            endUrl: "/jdb", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 39,
            resPath: "/btnanimation/jdb",
            isDown: false,
            gameType: 4, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "pg": {
            zhname: "PG", // 中文游戏名
            enname: "pg", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "pg_main", // 跳转场景名
            fuxin_lanchscene: "pg_main", // 跳转场景名
            xingui_lanchscene: "pg_main", // 跳转场景名
            game_id: "5b1f3a3cb1005251736",
            serverUrl: "/pg", // 游戏服务器地址
            endUrl: "/pg", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 40,
            resPath: "/btnanimation/datingicon_pg",
            isDown: false,
            gameType: 4, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "pg2": {
            zhname: "PG2", // 中文游戏名
            enname: "pg2", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "pg2_main", // 跳转场景名
            fuxin_lanchscene: "pg2_main", // 跳转场景名
            xingui_lanchscene: "pg2_main", // 跳转场景名
            game_id: "5b1f3a3cb76a451e210629",
            serverUrl: "/pg2", // 游戏服务器地址
            endUrl: "/pg2", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 41,
            resPath: "/btnanimation/datingicon_pg2",
            isDown: false,
            gameType: 4, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "fctbj": {
            zhname: "发财推币机", // 中文游戏名
            enname: "fctbj", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "fctbjloading", // 跳转场景名
            fuxin_lanchscene: "fctbjloading", // 跳转场景名
            xingui_lanchscene: "fctbjloading", // 跳转场景名
            game_id: "5b1f3a3cb76a451e7f0622",
            serverUrl: "/fctbj", // 游戏服务器地址
            endUrl: "/fctbj", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 42,
            resPath: "/btnanimation/fctbj",
            isDown: false,
            gameType: 4, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "zhibo": {
            zhname: "直播", // 中文游戏名
            enname: "zhibo", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "zhibo_main", // 跳转场景名
            fuxin_lanchscene: "zhibo_main", // 跳转场景名
            xingui_lanchscene: "zhibo_main", // 跳转场景名
            game_id: "5b1f3a3cb76a451e210726",
            serverUrl: "/zhibo", // 游戏服务器地址
            endUrl: "/zhibo", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 43,
            resPath: "/btnanimation/zhibo",
            isDown: false,
            gameType: 2, // 游戏类型：棋牌游戏：0，电子游戏：1，真人视讯：2，彩票投注：3，体育赛事：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        // "szffc": {
        //     zhname: "szffc", // 中文游戏名
        //     enname: "szffc", // 英文游戏名 （子游戏文件路径，更新子路径）
        //     lanchscene: "szffc_load", // 跳转场景名
        //     fuxin_lanchscene: "szffc_load", // 跳转场景名
        //     xingui_lanchscene: "szffc_load", // 跳转场景名
        //     game_id: "5b1f3a3cb76a451e210820",
        //     serverUrl: "/szffc", // 游戏服务器地址
        //     endUrl: "/szffc", // 游戏服务器地址
        //     hasAccount: false, // 是否已创建子游戏账号
        //     remoteData: null, // 服务端发送过来的游戏数据
        //     hallid: 44,
        //     resPath: "/btnanimation/szffc",
        //     isDown: false,
        //     gameType: 1, // 游戏类型：棋牌游戏：0，电子游戏：1，真人视讯：2，彩票投注：3，体育赛事：4
        //     loginHistory: [], // 子游戏最近一周登陆历史
        //     hasRes: true,
        // },
        // "mg": {
        //     zhname: "MG", // 中文游戏名
        //     enname: "mg", // 英文游戏名 （子游戏文件路径，更新子路径）
        //     lanchscene: "mg_main", // 跳转场景名
        //     fuxin_lanchscene: "mg_main", // 跳转场景名
        //     xingui_lanchscene: "mg_main", // 跳转场景名
        //     game_id: "5b1f3a3cb76a451e210821",
        //     serverUrl: "/mg", // 游戏服务器地址
        //     endUrl: "/mg", // 游戏服务器地址
        //     hasAccount: false, // 是否已创建子游戏账号
        //     remoteData: null, // 服务端发送过来的游戏数据
        //     hallid: 45,
        //     resPath: "/btnanimation/mg",
        //     isDown: false,
        //     gameType: 4, // 游戏类型：棋牌游戏：0，电子游戏：1，真人视讯：2，彩票投注：3，体育赛事：4
        //     loginHistory: [], // 子游戏最近一周登陆历史
        //     hasRes: true,
        // },
        // "qt": {
        //     zhname: "QT", // 中文游戏名
        //     enname: "qt", // 英文游戏名 （子游戏文件路径，更新子路径）
        //     lanchscene: "qt_main", // 跳转场景名
        //     fuxin_lanchscene: "qt_main", // 跳转场景名
        //     xingui_lanchscene: "qt_main", // 跳转场景名
        //     game_id: "5b1f3a3cb76a451e210822",
        //     serverUrl: "/qt", // 游戏服务器地址
        //     endUrl: "/qt", // 游戏服务器地址
        //     hasAccount: false, // 是否已创建子游戏账号
        //     remoteData: null, // 服务端发送过来的游戏数据
        //     hallid: 46,
        //     resPath: "/btnanimation/qt",
        //     isDown: false,
        //     gameType: 4, // 游戏类型：棋牌游戏：0，电子游戏：1，真人视讯：2，彩票投注：3，体育赛事：4
        //     loginHistory: [], // 子游戏最近一周登陆历史
        //     hasRes: true,
        // },
        // "lhd2": {
        //     zhname: "龙虎斗", // 中文游戏名 彩源龙虎斗
        //     enname: "lhd2", // 英文游戏名 （子游戏文件路径，更新子路径）
        //     lanchscene: "lhd", // 跳转场景名
        //     fuxin_lanchscene: "lhd", // 跳转场景名
        //     xingui_lanchscene: "lhd", // 跳转场景名
        //     game_id: "5b1f3a3cb76a451e210910",
        //     serverUrl: "/go_lhd2", // 游戏服务器地址
        //     endUrl: "/go_lhd2", // 游戏服务器地址
        //     hasAccount: false, // 是否已创建子游戏账号
        //     remoteData: null, // 服务端发送过来的游戏数据
        //     hallid: 16,
        //     resPath: "/btnanimation/longhudou",
        //     isDown: false,
        //     gameType: 1, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
        //     loginHistory: [], // 子游戏最近一周登陆历史
        //     hasRes: true,
        // },
        // "ebg2": {
        //     zhname: "新二八杠", // 中文游戏名
        //     enname: "ebg2", // 英文游戏名 （子游戏文件路径，更新子路径）
        //     lanchscene: "ebg", // 跳转场景名
        //     fuxin_lanchscene: "ebg", // 跳转场景名
        //     xingui_lanchscene: "ebg", // 跳转场景名
        //     game_id: "5b1f3a3cb76a451e210911",
        //     serverUrl: "/erbg2", // 游戏服务器地址
        //     endUrl: "/erbg2", // 游戏服务器地址
        //     hasAccount: false, // 是否已创建子游戏账号
        //     remoteData: null, // 服务端发送过来的游戏数据
        //     hallid: 2,
        //     resPath: "/btnanimation/28gang",
        //     isDown: false,
        //     gameType: 1, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
        //     loginHistory: [], // 子游戏最近一周登陆历史
        //     hasRes: true,
        // },
        // "zjh2": {
        //     zhname: "扎金花", // 中文游戏名
        //     enname: "zjh2", // 英文游戏名 （子游戏文件路径，更新子路径）
        //     lanchscene: "ZJHLoad", // 跳转场景名
        //     fuxin_lanchscene: "ZJHLoad", // 跳转场景名
        //     xingui_lanchscene: "ZJHLoad", // 跳转场景名
        //     game_id: "5b1f3a3cb76a451e210912",
        //     serverUrl: "/zhajh2", // 游戏服务器地址
        //     endUrl: "/zhajh2", // 游戏服务器地址
        //     hasAccount: false, // 是否已创建子游戏账号
        //     remoteData: null, // 服务端发送过来的游戏数据
        //     hallid: 29,
        //     resPath: "/btnanimation/zhajinhua",
        //     isDown: false,
        //     gameType: 0, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
        //     loginHistory: [], // 子游戏最近一周登陆历史
        //     hasRes: true,
        // },
        // "hbld2": {
        //     zhname: "红包乱斗", // 中文游戏名
        //     enname: "hbld2", // 英文游戏名 （子游戏文件路径，更新子路径）
        //     lanchscene: "hbldGame", // 跳转场景名
        //     fuxin_lanchscene: "hbldGame", // 跳转场景名
        //     xingui_lanchscene: "hbldGame", // 跳转场景名
        //     game_id: "5b1f3a3cb76a451e210913",
        //     serverUrl: "/hongbaold2", // 游戏服务器地址
        //     endUrl: "/hongbaold2", // 游戏服务器地址
        //     hasAccount: false, // 是否已创建子游戏账号
        //     remoteData: null, // 服务端发送过来的游戏数据
        //     hallid: 10,
        //     resPath: "/btnanimation/hbld",
        //     isDown: false,
        //     gameType: 1, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
        //     loginHistory: [], // 子游戏最近一周登陆历史
        //     hasRes: true,
        // },
        // "suoha2": {
        //     zhname: "梭哈", // 中文游戏名
        //     enname: "suoha2", // 英文游戏名 （子游戏文件路径，更新子路径）
        //     lanchscene: "suoha_Hall", // 跳转场景名
        //     fuxin_lanchscene: "suoha_Hall", // 跳转场景名
        //     xingui_lanchscene: "suoha_Hall", // 跳转场景名
        //     game_id: "5b1f3a3cb76a451e210914",
        //     serverUrl: "/suoha2", // 游戏服务器地址
        //     endUrl: "/suoha2", // 游戏服务器地址
        //     hasAccount: false, // 是否已创建子游戏账号
        //     remoteData: null, // 服务端发送过来的游戏数据
        //     hallid: 31,
        //     resPath: "/btnanimation/suoha_datingicon",
        //     isDown: false,
        //     gameType: 0, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
        //     loginHistory: [], // 子游戏最近一周登陆历史
        //     hasRes: true,
        // },
        // "szwg2": {
        //     zhname: "狮子王国", // 中文游戏名
        //     enname: "szwg2", // 英文游戏名 （子游戏文件路径，更新子路径）
        //     lanchscene: "szwg_Hall", // 跳转场景名
        //     fuxin_lanchscene: "szwg_Hall", // 跳转场景名
        //     xingui_lanchscene: "szwg_Hall", // 跳转场景名
        //     game_id: "5b1f3a3cb76a451e210915",
        //     serverUrl: "/szwg2", // 游戏服务器地址
        //     endUrl: "/szwg2", // 游戏服务器地址
        //     hasAccount: false, // 是否已创建子游戏账号
        //     remoteData: null, // 服务端发送过来的游戏数据
        //     hallid: 15,
        //     resPath: "/btnanimation/lionKingdom",
        //     isDown: false,
        //     gameType: 4, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
        //     loginHistory: [], // 子游戏最近一周登陆历史
        //     hasRes: true,
        // },
        // "brnn2": {
        //     zhname: "新百人牛牛", // 中文游戏名
        //     enname: "brnn2", // 英文游戏名 （子游戏文件路径，更新子路径）
        //     lanchscene: "brnn", // 跳转场景名
        //     fuxin_lanchscene: "brnn", // 跳转场景名
        //     xingui_lanchscene: "brnn", // 跳转场景名
        //     game_id: "5b1f3a3cb76a451e210916",
        //     serverUrl: "/bairenniuni2", // 游戏服务器地址
        //     endUrl: "/bairenniuni2", // 游戏服务器地址
        //     hasAccount: false, // 是否已创建子游戏账号
        //     remoteData: null, // 服务端发送过来的游戏数据
        //     hallid: 5,
        //     resPath: "/btnanimation/brnn",
        //     isDown: false,
        //     gameType: 1, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
        //     loginHistory: [], // 子游戏最近一周登陆历史
        //     hasRes: true,
        // },
        // "ddz2": {
        //     zhname: "斗地主", // 中文游戏名
        //     enname: "ddz2", // 英文游戏名 （子游戏文件路径，更新子路径）
        //     lanchscene: "ddzroom", // 跳转场景名
        //     fuxin_lanchscene: "ddzroom", // 跳转场景名
        //     xingui_lanchscene: "ddzroom", // 跳转场景名
        //     game_id: "5b1f3a3cb76a451e210917",
        //     serverUrl: "/landlord2", // 游戏服务器地址
        //     endUrl: "/landlord2", // 游戏服务器地址
        //     hasAccount: false, // 是否已创建子游戏账号
        //     remoteData: null, // 服务端发送过来的游戏数据
        //     hallid: 8,
        //     resPath: "/btnanimation/doudizhu",
        //     isDown: false,
        //     gameType: 0, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
        //     loginHistory: [], // 子游戏最近一周登陆历史
        //     hasRes: true,
        // },
        // "bcbm2": {
        //     zhname: "奔驰宝马", // 中文游戏名
        //     enname: "bcbm2", // 英文游戏名 （子游戏文件路径，更新子路径）
        //     lanchscene: "bcbmloading", // 跳转场景名
        //     fuxin_lanchscene: "bcbmloading", // 跳转场景名
        //     xingui_lanchscene: "bcbmloading", // 跳转场景名
        //     game_id: "5b1f3a3cb76a451e210918",
        //     serverUrl: "/bcbm2", // 游戏服务器地址
        //     endUrl: "/bcbm2", // 游戏服务器地址
        //     hasAccount: false, // 是否已创建子游戏账号
        //     remoteData: null, // 服务端发送过来的游戏数据
        //     hallid: 3,
        //     resPath: "/btnanimation/bcbm",
        //     isDown: false,
        //     gameType: 4, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
        //     loginHistory: [], // 子游戏最近一周登陆历史
        //     hasRes: true,
        // },
        // "hh2": {
        //     zhname: "新红黑大战", // 中文游戏名
        //     enname: "hh2", // 英文游戏名 （子游戏文件路径，更新子路径）ssss
        //     lanchscene: "hhlobby", // 跳转场景名
        //     fuxin_lanchscene: "hhlobby", // 跳转场景名
        //     xingui_lanchscene: "hhlobby", // 跳转场景名
        //     game_id: "5b1f3a3cb76a451e210919",
        //     serverUrl: "/redblackwar2", // 游戏服务器地址
        //     endUrl: "/redblackwar2", // 游戏服务器地址
        //     hasAccount: false, // 是否已创建子游戏账号
        //     remoteData: null, // 服务端发送过来的游戏数据
        //     hallid: 12,
        //     resPath: "/btnanimation/honhei",
        //     isDown: false,
        //     gameType: 1, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
        //     loginHistory: [], // 子游戏最近一周登陆历史
        //     hasRes: true,
        // },
        // "dzpk2": {
        //     zhname: "德州扑克", // 中文游戏名
        //     enname: "dzpk2", // 英文游戏名 （子游戏文件路径，更新子路径）
        //     lanchscene: "dzpk_load", // 跳转场景名
        //     fuxin_lanchscene: "dzpk_load", // 跳转场景名
        //     xingui_lanchscene: "dzpk_load", // 跳转场景名
        //     game_id: "5b1f3a3cb76a451e210920",
        //     serverUrl: "/dezhoupoker2", // 游戏服务器地址
        //     endUrl: "/dezhoupoker2", // 游戏服务器地址
        //     hasAccount: false, // 是否已创建子游戏账号
        //     remoteData: null, // 服务端发送过来的游戏数据
        //     hallid: 9,
        //     resPath: "/btnanimation/dzpk",
        //     isDown: false,
        //     gameType: 0, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
        //     loginHistory: [], // 子游戏最近一周登陆历史
        //     hasRes: true,
        // },
        // "shaibao2": {
        //     zhname: "骰宝", // 中文游戏名
        //     enname: "shaibao2", // 英文游戏名 （子游戏文件路径，更新子路径）
        //     lanchscene: "shaibao_Hall", // 跳转场景名
        //     fuxin_lanchscene: "shaibao_Hall", // 跳转场景名
        //     xingui_lanchscene: "shaibao_Hall", // 跳转场景名
        //     game_id: "5b1f3a3cb76a451e210921",
        //     serverUrl: "/shaibao2", // 游戏服务器地址
        //     endUrl: "/shaibao2", // 游戏服务器地址
        //     hasAccount: false, // 是否已创建子游戏账号
        //     remoteData: null, // 服务端发送过来的游戏数据
        //     hallid: 25,
        //     resPath: "/btnanimation/sicbo",
        //     isDown: false,
        //     gameType: 1, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
        //     loginHistory: [], // 子游戏最近一周登陆历史
        //     hasRes: true,
        // },
        // "sss2": {
        //     zhname: "十三水", // 中文游戏名
        //     enname: "sss2", // 英文游戏名 （子游戏文件路径，更新子路径）
        //     lanchscene: "SSSLoad", // 跳转场景名
        //     fuxin_lanchscene: "SSSLoad", // 跳转场景名
        //     xingui_lanchscene: "SSSLoad", // 跳转场景名
        //     game_id: "5b1f3a3cb76a451e210922",
        //     serverUrl: "/shisanshui2", // 游戏服务器地址
        //     endUrl: "/shisanshui2", // 游戏服务器地址
        //     hasAccount: false, // 是否已创建子游戏账号
        //     remoteData: null, // 服务端发送过来的游戏数据
        //     hallid: 24,
        //     resPath: "/btnanimation/shisanshui",
        //     isDown: false,
        //     gameType: 0, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
        //     loginHistory: [], // 子游戏最近一周登陆历史
        //     hasRes: true,
        // },
        // "ermj2": {
        //     zhname: "二人麻将", // 中文游戏名
        //     enname: "ermj2", // 英文游戏名 （子游戏文件路径，更新子路径）
        //     lanchscene: "ERMJHallScene", // 跳转场景名
        //     fuxin_lanchscene: "ERMJHallScene", // 跳转场景名
        //     xingui_lanchscene: "ERMJHallScene", // 跳转场景名
        //     game_id: "5b1f3a3cb76a451e210923",
        //     serverUrl: "/ermj2", // 游戏服务器地址
        //     endUrl: "/ermj2", // 游戏服务器地址
        //     hasAccount: false, // 是否已创建子游戏账号
        //     remoteData: null, // 服务端发送过来的游戏数据
        //     hallid: 0,
        //     resPath: "/btnanimation/2rmj",
        //     isDown: false,
        //     gameType: 0, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
        //     loginHistory: [], // 子游戏最近一周登陆历史
        //     hasRes: true,
        // },
        // "pdk2": {
        //     zhname: "跑得快", // 中文游戏名
        //     enname: "pdk2", // 英文游戏名 （子游戏文件路径，更新子路径）
        //     lanchscene: "pdkroom", // 跳转场景名
        //     fuxin_lanchscene: "pdkroom", // 跳转场景名
        //     xingui_lanchscene: "pdkroom", // 跳转场景名
        //     game_id: "5b1f3a3cb76a451e210924",
        //     serverUrl: "/paodekuai2", // 游戏服务器地址
        //     endUrl: "/paodekuai2", // 游戏服务器地址
        //     hasAccount: false, // 是否已创建子游戏账号
        //     remoteData: null, // 服务端发送过来的游戏数据
        //     hallid: 19,
        //     resPath: "/btnanimation/paodekuai",
        //     isDown: false,
        //     gameType: 0, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
        //     loginHistory: [], // 子游戏最近一周登陆历史
        //     hasRes: true,
        // },
        // "21d2": {
        //     zhname: "二十一点", // 中文游戏名
        //     enname: "21d2", // 英文游戏名 （子游戏文件路径，更新子路径）
        //     lanchscene: "21dRoomList", // 跳转场景名
        //     fuxin_lanchscene: "21dRoomList", // 跳转场景名
        //     xingui_lanchscene: "21dRoomList", // 跳转场景名
        //     game_id: "5b1f3a3cb76a451e210925",
        //     serverUrl: "/21d2", // 游戏服务器地址
        //     endUrl: "/21d2", // 游戏服务器地址
        //     hasAccount: false, // 是否已创建子游戏账号
        //     remoteData: null, // 服务端发送过来的游戏数据
        //     hallid: 1,
        //     resPath: "/btnanimation/21dian",
        //     isDown: false,
        //     gameType: 0, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
        //     loginHistory: [], // 子游戏最近一周登陆历史
        //     hasRes: true,
        // },
        "bjl2": {
            zhname: "百家乐", // 中文游戏名
            enname: "bjl2", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "bjl_baccarat_hall", // 跳转场景名
            fuxin_lanchscene: "bjl_baccarat_hall", // 跳转场景名
            // fuxin_lanchscene: "bjl_fuxin_hall", // 跳转场景名 皮肤更新还没好暂时拿掉
            xingui_lanchscene: "bjl_baccarat_hall", // 跳转场景名
            game_id: "5b1f3a3cb76a451e210926",
            serverUrl: "/baijl2", // 游戏服务器地址
            endUrl: "/baijl2", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 4,
            resPath: "/btnanimation/bjl",
            isDown: false,
            gameType: 1, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "lp2": {
            zhname: "轮盘游戏", // 中文游戏名
            enname: "lp2", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "lp", // 跳转场景名
            fuxin_lanchscene: "lp", // 跳转场景名
            xingui_lanchscene: "lp", // 跳转场景名
            game_id: "5b1f3a3cb76a451e210927",
            serverUrl: "/lunpan2", // 游戏服务器地址
            endUrl: "/lunpan2", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 17,
            resPath: "/btnanimation/luanpan",
            isDown: false,
            gameType: 1, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "qznn2": {
            zhname: "抢庄牛牛", // 中文游戏名
            enname: "qznn2", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "NNGame", // 跳转场景名
            fuxin_lanchscene: "NNGame", // 跳转场景名
            xingui_lanchscene: "NNGame", // 跳转场景名
            game_id: "5b1f3a3cb76a451e211018",
            serverUrl: "/qznn2", // 游戏服务器地址
            endUrl: "/qznn2", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 20,
            resPath: "/btnanimation/qznn",
            isDown: false,
            gameType: 0, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "wlby": {
            zhname: "五龙捕鱼", // 中文游戏名
            enname: "wlby", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "jdb_main", // 跳转场景名
            fuxin_lanchscene: "jdb_main", // 跳转场景名
            xingui_lanchscene: "jdb_main", // 跳转场景名
            game_id: "5b1f3a3cb76a451e7f251739",
            serverUrl: "/jdb", // 游戏服务器地址
            endUrl: "/jdb", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 47,
            resPath: "/btnanimation/wlby",
            isDown: false,
            gameType: 4, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "csby": {
            zhname: "财神捕鱼", // 中文游戏名
            enname: "csby", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "jdb_main", // 跳转场景名
            fuxin_lanchscene: "jdb_main", // 跳转场景名
            xingui_lanchscene: "jdb_main", // 跳转场景名
            game_id: "5b1f3a3cb76a451e7f251739",
            serverUrl: "/jdb", // 游戏服务器地址
            endUrl: "/jdb", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 48,
            resPath: "/btnanimation/csby",
            isDown: false,
            gameType: 4, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "sanshengtiyu": {
            zhname: "三昇体育", // 中文游戏名
            enname: "sanshengtiyu", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "sanshengtiyu_main", // 跳转场景名
            fuxin_lanchscene: "sanshengtiyu_main", // 跳转场景名
            xingui_lanchscene: "sanshengtiyu_main", // 跳转场景名
            game_id: "5b1f3a3cb76a451e211109",
            serverUrl: "/sanshengtiyu", // 游戏服务器地址
            endUrl: "/sanshengtiyu", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 49,
            resPath: "/btnanimation/sanshengtiyu",
            isDown: false,
            gameType: 4, // 游戏类型：棋牌游戏：0，电子游戏：1，真人视讯：2，彩票投注：3，体育赛事：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        "ppdz": {
            zhname: "PP", // 中文游戏名
            enname: "ppdz", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "ppdz_main", // 跳转场景名
            fuxin_lanchscene: "ppdz_main", // 跳转场景名
            xingui_lanchscene: "ppdz_main", // 跳转场景名
            game_id: "5b1f3a3cb76a451e211110",
            serverUrl: "/pp", // 游戏服务器地址
            endUrl: "/pp", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 46,
            resPath: "/btnanimation/ppdz",
            isDown: false,
            gameType: 4, // 游戏类型：棋牌游戏：0，电子游戏：1，真人视讯：2，彩票投注：3，体育赛事：4
            loginHistory: [], // 子游戏最近一周登陆历史
            hasRes: true,
        },
        // "pq": {
        //     zhname: "PQ", // 中文游戏名
        //     enname: "pq", // 英文游戏名 （子游戏文件路径，更新子路径）
        //     lanchscene: "pq_main", // 跳转场景名
        //     fuxin_lanchscene: "pq_main", // 跳转场景名
        //     xingui_lanchscene: "pq_main", // 跳转场景名
        //     game_id: "5b1f3a3cb76a451e211229",
        //     serverUrl: "/pq", // 游戏服务器地址
        //     endUrl: "/pq", // 游戏服务器地址
        //     hasAccount: false, // 是否已创建子游戏账号
        //     remoteData: null, // 服务端发送过来的游戏数据
        //     hallid: 46,
        //     resPath: "/btnanimation/pq",
        //     isDown: false,
        //     gameType: 4, // 游戏类型：棋牌游戏：0，电子游戏：1，真人视讯：2，彩票投注：3，体育赛事：4
        //     loginHistory: [], // 子游戏最近一周登陆历史
        //     hasRes: true,
        // },
    },
    // 大厅配置
    hallConfig: {
        zhname: "大厅", // 中文游戏名
        enname: "hall", // 英文游戏名 （子游戏文件路径，更新子路径）
        lanchscene: "hall", // 跳转场景名
    },
    // 子模块配置列表
    subModel: {
        "pay": {
            zhname: "充值", // 中文名
            enname: "pay", // 英文名 （子游戏文件路径，更新子路径）
            lanchscene: "payRecharge", // 跳转场景名
        },
        "cash": {
            zhname: "提现", // 中文名
            enname: "cash", // 英文名 （子游戏文件路径，更新子路径）
            lanchscene: "payCash", // 跳转场景名
        },
        "im": {
            zhname: "聊天", // 中文名
            enname: "im", // 英文名 （子游戏文件路径，更新子路径）
            lanchscene: "IMappStart", // 跳转场景名
        },
        "proxy": {
            zhname: "全民代理", // 中文名
            enname: "proxy", // 英文名 （子游戏文件路径，更新子路径）
            lanchscene: "proxy-proxy", // 跳转场景名
        },
        "payActivity": {
            zhname: "精彩活动", // 中文名
            enname: "payActivity", // 英文名 （子游戏文件路径，更新子路径）
            lanchscene: "payActivity", // 跳转场景名
        },
    },
    // 老游戏配置列表
    oldGameList: {
        "bjl": {
            zhname: "百家乐",
            enname: "bjl",
            game_id: "5b1f3a3cb76a591e7f2517a5",
            remoteData: null,
            hasAccount: false, // 是否已创建子游戏账号
        },
        'brnn': {
            zhname: "百人牛牛",
            enname: "brnn",
            game_id: "5bd00260e847f16fb65a13c1",
            remoteData: null,
            hasAccount: false, // 是否已创建子游戏账号
        },
        'hh': {
            zhname: "红黑大战",
            enname: "hh",
            game_id: "5b306af74f435269eea74b94",
            remoteData: null,
            hasAccount: false, // 是否已创建子游戏账号
        },
        'ebg': {
            zhname: "二八杠",
            enname: "ebg",
            game_id: "5bd0022be847f16fb65a137d",
            remoteData: null,
            hasAccount: false, // 是否已创建子游戏账号
        },
        'lhd': {
            zhname: "龙虎斗",
            enname: "lhd",
            game_id: "5b1f3a98b76a591e7f2517b6",
            remoteData: null,
            hasAccount: false, // 是否已创建子游戏账号
        },
        'hbsl': {
            zhname: "红包扫雷",
            enname: "hbsl",
            game_id: "5c5b8c3a7ff09ac117c3a7c2",
            remoteData: null,
            hasAccount: false, // 是否已创建子游戏账号
        },
        'ddz': {
            zhname: "斗地主",
            enname: "ddz",
            game_id: "5c6a62be7ff09ac117d446aa",
            remoteData: null,
            hasAccount: false, // 是否已创建子游戏账号
        },
    },
    gameUser: {}, // 中心服返回的玩家信息
    //结算有延时的游戏，金币显示需要减去其锁定的金币
    delaySub: {
        ag: "5b1f3a3cb76a591e7f251736",
        pg: "5b1f3a3cb1005251736",
        pg2: "5b1f3a3cb76a451e210629",
        cq9: "5b1f3a3cb76a591e7f251735",
        jdb: "5b1f3a3cb76a451e7f251739",
        pt: "5b1f3a3cb76a591e7f251737",
        zrsx: "5b1f3a3cb76a591e7f25173", // zrsx1 zrsx2
        pccp: "569a62be7ff123m117d446aa",
        sbty: "5b1f3a3cb76a591e7f25179", // sbty1 sbty2
        mg: "5b1f3a3cb76a451e210821",
        qt: "5b1f3a3cb76a451e210822",
        sanshengtiyu:"5b1f3a3cb76a451e211109",
        ppdz:"5b1f3a3cb76a451e211110",
    },
	//有分皮肤加载的子游戏
    pinpaiSubGameList:{
        "fuxin":["lhd","bjl"]
    },
    // 禁用字
    unusestrlist:[
        "中共",
        "共铲党",
        "共残党",
        "共惨党",
        "裆中央",
        "聚鼎娱乐",
        "聚鼎",
        "聚鼎",
        "  聚鼎 ",
        "习近平",
        "三个代表",
        "一党",
        "多党",
        "民主",
        "专政",
        "行房",
        "自慰",
        "吹萧",
        "色狼",
        "胸罩",
        "内裤",
        "底裤",
        "私处",
        "爽死",
        "变态",
        "妹疼",
        "妹痛",
        "弟疼",
        "弟痛",
        "姐疼",
        "姐痛",
        "哥疼",
        "哥痛",
        "同房",
        "打炮",
        "造爱",
        "性交",
        "性爱",
        "作爱",
        "做爱",
        "操你",
        "日你",
        "日批",
        "日逼",
        "鸡巴",
        "我操",
        "操死",
        "乳房",
        "阴茎",
        "阳具",
        "开苞",
        "肛门",
        "阴道",
        "阴蒂",
        "肉棍",
        "肉棒",
        "肉洞",
        "荡妇",
        "阴囊",
        "睾丸",
        "捅你",
        "捅我",
        "插我",
        "插你",
        "插她",
        "插他",
        "干你",
        "干她",
        "干他",
        "妓女",
        "射精",
        "口交",
        "手淫",
        "口淫",
        "屁眼",
        "阴户",
        "阴门",
        "下体",
        "龟头",
        "阴毛",
        "避孕套",
        "你妈逼",
        "大鸡巴",
        "性高潮",
        "性虐待",
        "性高潮",
        "大法",
        "弟子",
        "大纪元",
        "真善忍",
        "明慧",
        "大法",
        "洪志",
        "红志",
        "洪智",
        "红智",
        "法轮",
        "法论",
        "法沦",
        "法伦",
        "发轮",
        "发论",
        "发沦",
        "发伦",
        "轮功",
        "轮公",
        "轮攻",
        "沦功",
        "沦公",
        "沦攻",
        "论攻",
        "论功",
        "论公",
        "伦攻",
        "伦功",
        "伦公",
        "打倒",
        "民运",
        "六四",
        "台独",
        "王丹",
        "柴玲",
        "李鹏",
        "天安门",
        "江泽民",
        "朱容基",
        "朱镕基",
        "李长春",
        "李瑞环",
        "胡锦涛",
        "魏京生",
        "台湾独立",
        "藏独",
        "西藏独立",
        "疆独",
        "新疆独立",
        "警察",
        "民警",
        "公安",
        "邓小平",
        "嫖",
        "大盖帽",
        "革命",
        "武警",
        "黑社会",
        "交警",
        "消防队",
        "刑警",
        "夜总会",
        "妈个",
        "公款",
        "首长",
        "书记",
        "坐台",
        "腐败",
        "城管",
        "暴动",
        "暴乱",
        "李远哲",
        "司法警官",
        "高干",
        "高干子弟",
        "高干子女",
        "人大",
        "尉健行",
        "李岚清",
        "黄丽满",
        "于幼军",
        "文字狱",
        "宋祖英",
        "天安门",
        "自焚",
        "骗局",
        "猫肉",
        "吸储",
        "张五常",
        "张丕林",
        "空难",
        "温家宝",
        "吴邦国",
        "曾庆红",
        "黄菊",
        "罗干",
        "吴官正",
        "贾庆林",
        "专制",
        "卖淫",
        "三個代表",
        "一黨",
        "多黨",
        "民主",
        "專政",
        "行房",
        "自慰",
        "吹蕭",
        "色狼",
        "胸罩",
        "內褲",
        "底褲",
        "私處",
        "爽死",
        "變態",
        "妹疼",
        "妹痛",
        "弟疼",
        "弟痛",
        "姐疼",
        "姐痛",
        "哥疼",
        "哥痛",
        "同房",
        "打炮",
        "造愛",
        "性交",
        "性愛",
        "作愛",
        "做愛",
        "操你",
        "日你",
        "日批",
        "日逼",
        "雞巴",
        "我操",
        "操死",
        "乳房",
        "陰莖",
        "陽具",
        "開苞",
        "肛門",
        "陰道",
        "陰蒂",
        "肉棍",
        "肉棒",
        "肉洞",
        "蕩婦",
        "陰囊",
        "睾丸",
        "捅你",
        "捅我",
        "插我",
        "插你",
        "插她",
        "插他",
        "幹你",
        "幹她",
        "幹他",
        "妓女",
        "射精",
        "口交",
        "屁眼",
        "陰戶",
        "陰門",
        "下體",
        "龜頭",
        "陰毛",
        "避孕套",
        "你媽逼",
        "大雞巴",
        "性高潮",
        "性虐待",
        "性高潮",
        "大法",
        "弟子",
        "大紀元",
        "真善忍",
        "明慧",
        "大法",
        "洪志",
        "紅志",
        "洪智",
        "紅智",
        "法輪",
        "法論",
        "法淪",
        "法倫",
        "發輪",
        "發論",
        "發淪",
        "發倫",
        "輪功",
        "輪公",
        "輪攻",
        "淪功",
        "淪公",
        "淪攻",
        "論攻",
        "論功",
        "論公",
        "倫攻",
        "倫功",
        "倫公",
        "打倒",
        "民運",
        "六四",
        "台獨",
        "王丹",
        "柴玲",
        "李鵬",
        "天安門",
        "江澤民",
        "朱容基",
        "朱鎔基",
        "李長春",
        "李瑞環",
        "胡錦濤",
        "魏京生",
        "臺灣獨立",
        "藏獨",
        "西藏獨立",
        "疆獨",
        "新疆獨立",
        "警察",
        "民警",
        "公安",
        "鄧小平",
        "嫖",
        "大蓋帽",
        "革命",
        "武警",
        "黑社會",
        "交警",
        "消防隊",
        "刑警",
        "夜總會",
        "媽個",
        "公款",
        "首長",
        "書記",
        "坐台",
        "腐敗",
        "城管",
        "暴動",
        "暴亂",
        "李遠哲",
        "司法警官",
        "高幹",
        "高幹子弟",
        "高幹子女",
        "人大",
        "尉健行",
        "李嵐清",
        "黃麗滿",
        "於幼軍",
        "文字獄",
        "天安門",
        "自焚",
        "騙局",
        "貓肉",
        "吸儲",
        "張五常",
        "張丕林",
        "空難",
        "溫家寶",
        "吳邦國",
        "曾慶紅",
        "黃菊",
        "羅幹",
        "賈慶林",
        "專制",
        "賣淫",
        "八九",
        "八老",
        "巴赫",
        "白立朴",
        "白梦",
        "白皮书",
        "保钓",
        "鲍戈",
        "鲍彤",
        "暴乱",
        "暴政",
        "北大三角地论坛",
        "北韩",
        "北京当局",
        "北京之春",
        "北美自由论坛",
        "博讯",
        "蔡崇国",
        "藏独",
        "曹长青",
        "曹刚川",
        "柴玲",
        "常劲",
        "陈炳基",
        "陈军",
        "陈蒙",
        "陈破空",
        "陈希同",
        "陈小同",
        "陈宣良",
        "陈一谘",
        "陈总统",
        "程凯",
        "程铁军",
        "程真",
        "迟浩田",
        "持不同政见",
        "赤匪",
        "赤化",
        "春夏自由论坛",
        "达赖",
        "大参考",
        "大法",
        "大纪元",
        "大纪元新闻网",
        "大纪园",
        "大家论坛",
        "大史",
        "大史记",
        "大史纪",
        "大中国论坛",
        "大中华论坛",
        "大众真人真事",
        "戴相龙",
        "弹劾",
        "登辉",
        "邓笑贫",
        "迪里夏提",
        "地下教会",
        "地下刊物",
        "弟子",
        "第四代",
        "电视流氓",
        "钓鱼岛",
        "丁关根",
        "丁元",
        "丁子霖",
        "东北独立",
        "东方红时空",
        "东方时空",
        "东南西北论谈",
        "东社",
        "东土耳其斯坦",
        "东西南北论坛",
        "动乱",
        "独裁",
        "独裁政治",
        "独夫",
        "独立台湾会",
        "杜智富",
        "多维",
        "屙民",
        "俄国",
        "发愣",
        "发轮",
        "发正念",
        "法愣",
        "法抡",
        "法仑",
        "法伦",
        "法轮",
        "法论",
        "法十轮十功",
        "法十轮十功",
        "法谪",
        "法谪功",
        "反封锁技术",
        "反腐败论坛",
        "反攻",
        "反共",
        "反人类",
        "反社会",
        "方励之",
        "方舟子",
        "飞扬论坛",
        "斐得勒",
        "费良勇",
        "分家在",
        "分裂",
        "粉饰太平",
        "风雨神州",
        "风雨神州论坛",
        "封从德",
        "封杀",
        "冯东海",
        "冯素英",
        "佛展千手法",
        "付申奇",
        "傅申奇",
        "傅志寰",
        "高官",
        "高文谦",
        "高薪养廉",
        "高瞻",
        "高自联",
        "戈扬",
        "鸽派",
        "歌功颂德",
        "蛤蟆",
        "个人崇拜",
        "工自联",
        "功法",
        "共产",
        "共党",
        "共匪",
        "共狗",
        "共军",
        "关卓中",
        "贯通两极法",
        "广闻",
        "郭伯雄",
        "郭罗基",
        "郭平",
        "郭岩华",
        "国家安全",
        "国家机密",
        "国军",
        "国贼",
        "韩东方",
        "韩联潮",
        "汉奸",
        "何德普",
        "何勇",
        "河殇",
        "红灯区",
        "红色恐怖",
        "宏法",
        "洪传",
        "洪吟",
        "洪哲胜",
        "洪志",
        "胡紧掏",
        "胡锦涛",
        "胡锦滔",
        "胡锦淘",
        "胡景涛",
        "胡平",
        "胡总书记",
        "护法",
        "花花公子",
        "华建敏",
        "华通时事论坛",
        "华夏文摘",
        "华语世界论坛",
        "华岳时事论坛",
        "黄慈萍",
        "黄祸",
        "黄菊",
        "黄菊",
        "黄翔",
        "回民暴动",
        "悔过书",
        "鸡毛信文汇",
        "姬胜德",
        "积克馆",
        "基督",
        "贾庆林",
        "贾廷安",
        "贾育台",
        "建国党",
        "江core",
        "江八点",
        "江流氓",
        "江罗",
        "江绵恒",
        "江青",
        "江戏子",
        "江则民",
        "江泽慧",
        "江泽民",
        "江澤民",
        "江贼",
        "江贼民",
        "江折民",
        "江猪",
        "江猪媳",
        "江主席",
        "姜春云",
        "将则民",
        "僵贼",
        "僵贼民",
        "疆独",
        "讲法",
        "酱猪媳",
        "交班",
        "教养院",
        "接班",
        "揭批书",
        "金尧如",
        "锦涛",
        "禁看",
        "经文",
        "开放杂志",
        "看中国",
        "抗议",
        "邝锦文",
        "劳动教养所",
        "劳改",
        "劳教",
        "老江",
        "老毛",
        "老人政治",
        "黎安友",
        "李长春",
        "李大师",
        "李登辉",
        "李红痔",
        "李宏志",
        "李洪宽",
        "李继耐",
        "李兰菊",
        "李岚清",
        "李老师",
        "李录",
        "李禄",
        "李鹏",
        "李瑞环",
        "李少民",
        "李淑娴",
        "李旺阳",
        "李文斌",
        "李小朋",
        "李小鹏",
        "李月月鸟",
        "李志绥",
        "李总理",
        "李总统",
        "连胜德",
        "联总",
        "廉政大论坛",
        "炼功",
        "梁光烈",
        "梁擎墩",
        "两岸关系",
        "两岸三地论坛",
        "两个中国",
        "两会",
        "两会报道",
        "两会新闻",
        "廖锡龙",
        "林保华",
        "林长盛",
        "林樵清",
        "林慎立",
        "凌锋",
        "刘宾深",
        "刘宾雁",
        "刘刚",
        "刘国凯",
        "刘华清",
        "刘俊国",
        "刘凯中",
        "刘千石",
        "刘青",
        "刘山青",
        "刘士贤",
        "刘文胜",
        "刘晓波",
        "刘晓竹",
        "刘永川",
        "流亡",
        "六四",
        "龙虎豹",
        "陆委会",
        "吕京花",
        "吕秀莲",
        "抡功",
        "伦功",
        "轮大",
        "轮功",
        "轮奸",
        "罗干",
        "罗礼诗",
        "马大维",
        "马良骏",
        "马三家",
        "马时敏",
        "卖国",
        "毛厕洞",
        "毛片",
        "毛贼东",
        "美国参考",
        "美国之音",
        "蒙独",
        "蒙古独立",
        "密穴",
        "绵恒",
        "民国",
        "民进党",
        "民联",
        "民意",
        "民意论坛",
        "民运",
        "民阵",
        "民猪",
        "民主",
        "民主墙",
        "民族矛盾",
        "明慧",
        "莫伟强",
        "木犀地",
        "木子论坛",
        "南大自由论坛",
        "闹事",
        "倪育贤",
        "你说我说论坛",
        "潘国平",
        "泡沫经济",
        "迫害",
        "祁建",
        "齐墨",
        "钱达",
        "钱国梁",
        "钱其琛",
        "抢粮记",
        "乔石",
        "亲美",
        "亲日",
        "钦本立",
        "秦晋",
        "青天白日旗",
        "轻舟快讯",
        "情妇",
        "庆红",
        "全国两会",
        "热比娅",
        "热站政论网",
        "人民报",
        "人民内情真相",
        "人民真实",
        "人民之声论坛",
        "人权",
        "忍",
        "日内瓦金融",
        "瑞士金融大学",
        "色情",
        "善恶有报",
        "上海帮",
        "上海孤儿院",
        "邵家健",
        "射精",
        "神通加持法",
        "沈彤",
        "升天",
        "盛华仁",
        "盛雪",
        "师父",
        "石戈",
        "时代论坛",
        "时事论坛",
        "世界经济导报",
        "事实独立",
        "双十节",
        "水扁",
        "税力",
        "司马晋",
        "司马璐",
        "司徒华",
        "斯诺",
        "四川独立",
        "宋xx",
        "宋平",
        "宋书元",
        "宋祖英",
        "苏绍智",
        "苏晓康",
        "台独",
        "台盟",
        "台湾独立",
        "台湾狗",
        "台湾建国运动组织",
        "台湾青年独立联盟",
        "台湾政论区",
        "台湾自由联盟",
        "太子党",
        "汤光中",
        "唐柏桥",
        "唐捷",
        "滕文生",
        "天安门录影带",
        "天安门事件",
        "天安门屠杀",
        "天安门一代",
        "天怒",
        "天葬",
        "童屹",
        "统独",
        "统独论坛",
        "统战",
        "屠杀",
        "外交论坛",
        "外交与方略",
        "万润南",
        "万维读者论坛",
        "万晓东",
        "汪岷",
        "王宝森",
        "王炳章",
        "王策",
        "王超华",
        "王丹",
        "王辅臣",
        "王刚",
        "王涵万",
        "王沪宁",
        "王军涛",
        "王力雄",
        "王瑞林",
        "王润生",
        "王若望",
        "王希哲",
        "王秀丽",
        "王冶坪",
        "网特",
        "尉健行",
        "魏京生",
        "魏新生",
        "温家宝",
        "温元凯",
        "文革",
        "无界浏览器",
        "吴百益",
        "吴邦国",
        "吴方城",
        "吴官正",
        "吴弘达",
        "吴宏达",
        "吴仁华",
        "吴学灿",
        "吴学璨",
        "吾尔开希",
        "五不",
        "伍凡",
        "西藏",
        "西藏独立",
        "洗脑",
        "下体",
        "项怀诚",
        "项小吉",
        "小参考",
        "肖强",
        "邪恶",
        "谢长廷",
        "谢选骏",
        "谢中之",
        "辛灏年",
        "新观察论坛",
        "新华举报",
        "新华内情",
        "新华通论坛",
        "新疆独立",
        "新生网",
        "新闻封锁",
        "新语丝",
        "信用危机",
        "邢铮",
        "熊炎",
        "熊焱",
        "修炼",
        "徐邦秦",
        "徐才厚",
        "徐匡迪",
        "徐水良",
        "许家屯",
        "薛伟",
        "学潮",
        "学联",
        "学习班",
        "学运",
        "学自联",
        "雪山狮子",
        "严家其",
        "严家祺",
        "阎明复",
        "颜射",
        "央视内部晚会",
        "杨怀安",
        "杨建利",
        "杨巍",
        "杨月清",
        "杨周",
        "姚月谦",
        "夜话紫禁城",
        "一中一台",
        "义解",
        "亦凡",
        "异见人士",
        "异议人士",
        "易丹轩",
        "易志熹",
        "淫穴",
        "尹庆民",
        "由喜贵",
        "游行",
        "幼齿",
        "幼女",
        "于大海",
        "于浩成",
        "余英时",
        "舆论",
        "舆论反制",
        "宇明网",
        "圆满",
        "远志明",
        "岳武",
        "在十月",
        "则民",
        "择民",
        "泽民",
        "贼民",
        "曾培炎",
        "曾庆红",
        "张伯笠",
        "张钢",
        "张宏堡",
        "张健",
        "张林",
        "张万年",
        "张伟国",
        "张昭富",
        "张志清",
        "赵海青",
        "赵南",
        "赵品潞",
        "赵晓微",
        "赵紫阳",
        "哲民",
        "真善忍",
        "真相",
        "真象",
        "镇压",
        "争鸣论坛",
        "正见网",
        "正义党论坛",
        "郑义",
    ],

    // 游戏2转游戏1映射表
    game2to1:{
        "lhd2":"lhd",
        "ebg2":"ebg",
        "zjh2":"zjh",
        "hbld2":"hbld",
        "suoha2":"suoha",
        "szwg2":"szwg",
        "brnn2":"brnn",
        "ddz2":"ddz",
        "bcbm2":"bcbm",
        "hh2":"hh",
        "dzpk2":"dzpk",
        "shaibao2":"shaibao",
        "sss2":"sss",
        "ermj2":"ermj",
        // "pdk2":"pdk",
        // "21d2":"21d",
        "bjl2":"bjl",
        "lp2":"lp",
        "qznn2":"qznn",
    },
    //游戏1转游戏2映射表
    game1to2:{
        "lhd":"lhd2",
        "ebg":"ebg2",
        "zjh":"zjh2",
        "hbld":"hbld2",
        "suoha":"suoha2",
        "szwg":"szwg2",
        "brnn":"brnn2",
        "ddz":"ddz2",
        "bcbm":"bcbm2",
        "hh":"hh2",
        "dzpk":"dzpk2",
        "shaibo":"shaibao2",
        "sss":"sss2",
        "ermj":"ermj2",
        // "pdk":"pdk2",
        // "21d":"21d2",
        "bjl":"bjl2",
        "lp":"lp2",
        "qznn":"qznn2",
    },
    resetNineTwoSort:false,
    spriteResMap: {}, //记录载过的图  减少重复加载
    setFuxinHallIdType() {
        // this.menuBtnInfoList = ["all", "duizhan", "touzhu", "shixun", "zuqiu", "jieji", "remen"]
        let alllist = {
            "cdx": 0,
            "aga": 1,
            "cylhd": 2,
            "cq9": 3,
            "caishendao": 4,
            "jdb": 5,
            "sgj": 6,
            "pg2":7,
            "jbpby": 8,
            "pg": 9,
            "hwby": 10,
            "ag": 11,
            "lhd": 12,
            "pt": 13,
            "qznn": 14,
            "lp": 15,
            "sss": 16,
            "ebg": 17,
            "dzpk": 18,
            "hh": 19,
            "21d": 20,
            "bcbm": 21,
            "suoha": 22,
            "bjl": 23,
            "ddz": 24,
            "brnn": 25,
            "zjh": 26,
            "hbld": 27,
            "pdk": 28,
            "szwg": 29,
            "ermj": 30,
            "shaibao": 31,
            "hbsl": -1,
            "pccp": 32,
            "zrsx1": 33,
            "sbty1": 34,
            "zrsx2": 35,
            "sbty2": 36,
            "fctbj": 37,
            "cyqp": -1, // 不显示
            "zhibo":38,
        }
        for (let k in this.subGameList) {
            if (alllist[k] == -1) {
                delete this.subGameList[k]
            } else {
                this.subGameList[k].hallid = alllist[k]
            }
        }
        let duizhan = {
            "lhd": 0,
            "bjl": 1,
            "lp": 2,
            "brnn": 3,
            "ebg": 4,
            "hbld": 5,
            "hh": 6,
            "shaibao": 7,
            "bcbm": 8,
        }
        for (let k in duizhan) {
            if(this.subGameList[k]){
                this.subGameList[k].duizhan = duizhan[k]
            }
        }
        let touzhu = {
            "qznn": 0,
            "ddz": 1,
            "sss": 2,
            "zjh": 3,
            "dzpk": 4,
            "pdk": 5,
            "21d": 6,
            "ermj": 7,
            "suoha": 8,
            // "hbsl": 9
        }
        for (let k in touzhu) {
            if(this.subGameList[k]){
                this.subGameList[k].touzhu = touzhu[k]
            }
        }
        let shixun = {
            "zrsx1": 0,
            "zrsx2": 1,
        }
        for (let k in shixun) {
            if(this.subGameList[k]){
                this.subGameList[k].shixun = shixun[k]
            }
        }
        let zuqiu = {
            "pccp": 0,
            "sbty2": 1,
            "sbty1": 2
        }
        for (let k in zuqiu) {
            if(this.subGameList[k]){
                this.subGameList[k].zuqiu = zuqiu[k]
            }
        }
        let jieji = {
            "aga": 0,
            "caishendao": 1,
            "cq9": 2,
            "sgj": 3,
            "jdb": 4,
            "jbpby": 5,
            "pg2": 6,
            "hwby": 7,
            "pg": 8,
            "bcbm": 9,
            "ag": 10,
            "szwg": 11,
            "pt": 12,
            "fctbj": 13,
        }
        for (let k in jieji) {
            if(this.subGameList[k]){
                this.subGameList[k].jieji = jieji[k]
            }
        }
        let remen = {
            "cdx": 0,
            "aga": 1,
            "cylhd": 2,
            "pg2": 3,
            "caishendao": 4,
            "pg": 5,
            "sgj": 6,
            "cq9": 7,
            "lhd":8,
            "jdb": 9,
            "hwby": 10,
            "ag": 11,
            "jbpby": 12,
            "pt": 13,
            "zhibo":14,
        }
        for (let k in remen) {
            if(this.subGameList[k]){
                this.subGameList[k].remen = remen[k]
            }
        }
        let agalist = {
            "duofuduocai": 0,
            "cbzb": 1,
            "fkxw": 2,
            "ygxb": 3,
        }
        for (let k in this.agaSubGameList) {
            if(this.agaSubGameList[k]){
                this.agaSubGameList[k].hallid = agalist[k]
            }
        }
    },
    setJudingHallIdType() {
        // this.menuBtnInfoList = ["all", "duizhan", "touzhu", "shixun", "zuqiu", "jieji", "remen"]
        let alllist = {
            "lhd": 0,
            "pg": 11,
            "bjl": 2,
            "cq9": 3,
            "brnn": 4,
            "jdb": 5,
            "lp": 6,
            "mg":7,
            "ebg": 8,
            "qt": 9,
            "hbld": 10,
            "ag": 15,
            "hh": 12,
            "pt": 13,
            "shaibao": 14,
            "pg2": 1,
            "bcbm": 16,
            "caishendao": 17,
            "szffc": 18,
            "sgj": 19,
            "cylhd": 20,
            "duofuduocai": 21,
            "cdx": -1,
            "qznn": 22,
            "fkxw": 23,
            "ddz": 24,
            "jbpby": 27,
            "sss": 26,
            "hwby": 25,
            "zjh": 28,
            "szwg": 29,
            "dzpk": 30,
            "cbzb": 31,
            "pdk": 32,
            "pccp": -1,
            "ermj": 33,
            "sbty1": -1,
            "suoha": 34,
            "sbty2": -1,
            "21d": 35,
            "fctbj":36,
            "zhibo":37,
        }
        for (let k in this.subGameList) {
            if (alllist[k] == -1) {
                delete this.subGameList[k]
            } else {
                this.subGameList[k].hallid = alllist[k]
            }
        }
        let duizhan = {
            "szffc": 0,
            "cylhd": 1,
            "lhd": 2,
            "qznn": 3,
            "bjl": 4,
            "ddz": 5,
            "brnn": 6,
            "sss": 7,
            "lp": 8,
            "zjh":9,
            "ebg":10,
            "dzpk":11,
            "hbld":12,
            "pdk":13,
            "hh":14,
            "ermj":15,
            "shaibao":16,
            "suoha":17,
            "bcbm":18,
            "21d":19,
            "caishendao":20,
            "fkxw":21,
            "sgj":22,
            "jbpby":25,
            "duofuduocai":24,
            "hwby":23,
            "szwg":26,
            "cbzb":27,
            "fctbj":28,
        }
        for (let k in duizhan) {
            if(this.subGameList[k]){
                this.subGameList[k].duizhan = duizhan[k]
            }
        }
        let touzhu = {
            // "pccp": 0,
        }
        for (let k in touzhu) {
            if(this.subGameList[k]){
                this.subGameList[k].touzhu = touzhu[k]
            }
        }
        
        let tiyu = {
            // "sbty1": 0,
            // "sbty2": 1,
        }
        for (let k in tiyu) {
            if(this.subGameList[k]){
                this.subGameList[k].tiyu = tiyu[k]
            }
        }
        let dianzi = {
            "pg": 5,
            "mg": 1,
            "cq9": 2,
            "qt": 3,
            "jdb": 4,
            "ag": 6,
            "pg2": 0,
            "pt": 7,
        }
        for (let k in dianzi) {
            if(this.subGameList[k]){
                this.subGameList[k].dianzi = dianzi[k]
            }
        }
        let remen = {
            "szffc": 0,
            "pg": 11,
            "cylhd": 2,
            "cq9": 3,
            "caishendao": 4,
            "jdb": 5,
            "sgj": 6,
            "mg": 7,
            "duofuduocai":8,
            "qt": 9,
            "fkxw": 10,
            "ag": 15,
            "jbpby": 14,
            "pt": 13,
            "hwby":12,
            "pg2":1,
            "fctbj":16,
            "zhibo":17,
        }
        for (let k in remen) {
            if(this.subGameList[k]){
                this.subGameList[k].remen = remen[k]
            }
        }
    },
    // 加载图片 SpriteFrame
    getSpriteFrame(path,Res=null) {
        if (!path) {
            cc.log("getSpriteFrame 传入的资源路径为空")
            return
        }
        let tempRes = cc.resources;
        if(Res)
        {
            tempRes = Res;
        }
        tempRes.load(path, cc.SpriteFrame, (err, frame) => {
            if (err) {
                cc.log("getSpriteFrame 加载图片失败", err)
                return;
            }
            return frame;
        })
    },
    // UI图片动态加载
    imgLoad(node, path,Res = null) {
        if (!node) {
            cc.log("imgLoad 传入的节点是空")
            return
        }
        if (!path) {
            cc.log("imgLoad 传入的资源路径为空")
            return
        }
        if (node instanceof cc.Node) {
        } else {
            cc.log("imgLoad 传入的节点不是cc.node")
            return
        }
        let widget
        let children
        if (typeof path == "object") {
            if (path.widget) {
                widget = path.widget
            }
            if (path.children) {
                children = path.children
            }
            path = path.path
        }
        let sprite = node.getComponent(cc.Sprite)
        if (!sprite) {
            // console.warn("节点不存在Sprite组件")
            sprite = node.addComponent(cc.Sprite)
        }
        widget && this.setWidget(node, widget)
        let tempRes = cc.resources;
        if(Res)
        {
            tempRes = Res;
        }
        tempRes.load(path, cc.SpriteFrame, (err, frame) => {
            if (err) {
                cc.log("imgLoad 加载图片失败", err)
                return;
            }
            if (!cc.isValid(node)) {
                return
            }
            sprite.spriteFrame = frame;
            if (children) {
                for (let i = 0; i < children.length; i++) {
                    this.addNode(node, children[i])
                }
            }
        })
    },
    // 获取文本
    getTip(tipname) {
        if (!tipname) {
            return
        }
        if (!this.languageTip) {
            cc.log("没有加载语言提示模块")
            return ""
        }
        if (!this.languageTip[this.language]) {
            cc.log("没有此语言的提示信息")
            return ""
        }
        if (!this.languageTip[this.language][tipname]) {
            cc.log("没有此条提示的配置", tipname)
            return ""
        }
        return this.languageTip[this.language][tipname]
    },
    // 多语言按钮图片加载
    btnLoad(node, normal, pressed, interactable,Res = null ) { //, hover, disabled 只做两个图片
        if(!cc.isValid(node)){
            cc.log("btnLoad 节点不存在");
            return;
        }
        let btn = node.getComponent(cc.Button)
        if (!btn) {
            btn = node.addComponent(cc.Button)
        }
        let sprite = node.getComponent(cc.Sprite)
        if (!sprite) {
            sprite = node.addComponent(cc.Sprite)
        }
        let widget
        let children
        if (typeof normal == "object") {
            if (normal.pressed) {
                pressed = normal.pressed
            }
            if (typeof normal.interactable == "boolean") {
                interactable = normal.interactable
            }
            if (normal.widget) {
                widget = normal.widget
            }
            if (normal.children) {
                children = normal.children
            }
            normal = normal.normal
        }
        let tempRes = cc.resources;
        if(Res)
        {
            tempRes = Res;
        }
        tempRes.load(normal, cc.SpriteFrame, (err, frame) => {
            if (err) {
                cc.log("加载图片失败", err)
                return;
            }
            if (!cc.isValid(node)) {
                return
            }
            btn.normalSprite = frame;
            btn.hoverSprite = frame;
            if (sprite) {
                sprite.spriteFrame = frame;
            }
            pressed = pressed ? pressed : normal
            widget && this.setWidget(node, widget)
            tempRes.load(pressed, cc.SpriteFrame, (err, frame) => {
                if (err) {
                    cc.log("加载图片失败", err)
                    return;
                }
                if (!cc.isValid(node)) {
                    return
                }
                btn.pressedSprite = frame;
                btn.disabledSprite = frame;
                if (typeof interactable == "boolean") {
                    btn.interactable = interactable
                }
                if (children) {
                    for (let i = 0; i < children.length; i++) {
                        this.addNode(node, children[i])
                    }
                }
            })
        })
    },
    // editbox 提示语设置
    editboxTipLoad(node, tipname) {
        if(!cc.isValid(node)){
            cc.log("editboxTipLoad 节点不存在")
            return;
        }
        let editbox = node.getComponent(cc.EditBox)
        if (!editbox) {
            cc.log("节点下不存在editbox组件")
            return
        }
        editbox.placeholder = hqq.getTip(tipname)
    },
    // 骨骼动画设置
    skeletonLoad(node, path, aniname, loop,Res=null) {
        if (node instanceof cc.Node) {
        } else {
            cc.log("传入的节点不是cc.node")
            return
        }
        let children
        if (typeof path == "object") {
            if (path.aniname) {
                aniname = path.aniname
            }
            if (typeof path.loop == "boolean") {
                loop = path.loop
            }
            if (path.children) {
                children = path.children
            }
            path = path.skeleton
        }
        let ani = node.getComponent(sp.Skeleton)
        if (!ani) {
            // console.warn("节点不含骨骼组件")
            ani = node.addComponent(sp.Skeleton)
            ani.premultipliedAlpha = false
        }
        let tempRes = cc.resources;
        if(Res)
        {
            tempRes = Res;
        }
        tempRes.loadDir(path, sp.SkeletonData, (err, Data) => {
            if (err) {
                cc.log("加载骨骼动画失败", err)
                return;
            }

            if(!Data)
            {
                cc.log("路径下没有加载到资源")
                return
            }
            if (!cc.isValid(node)) {
                return
            }
            for (let i = 0; i < Data.length; i++) {
                if (Data[i].__classname__ == "sp.SkeletonData") {
                    ani.skeletonData = Data[i];
                }
            }
            if (aniname) {
                loop = !!loop
                ani.setAnimation(0, aniname, loop);
            }
        });
    },
    // 为节点设置停靠
    setWidget(node, config) { //  top, left, bottom, right, horizontalCenter, verticalCenter
        if (!node) {
            cc.log("nodeSetWidget 传入的节点为空")
            return
        }
        if (node instanceof cc.Node) {
        } else {
            cc.log("nodeSetWidget 传入的节点不是cc.Node")
            return
        }
        let widget = node.getComponent(cc.Widget)
        if (!widget) {
            widget = node.addComponent(cc.Widget)
            // cc.log("!widget", widget)
        }
        if(config.alignMode){
            widget.alignMode = config.alignMode
        } else{
            widget.alignMode = cc.Widget.AlignMode.ON_WINDOW_RESIZE
        }

        if (config.closetop) {
            widget.isAlignTop = false
        }

        if (config.closeleft) {
            widget.isAlignLeft = false
        }

        if (config.closeright) {
            widget.isAlignRight = false
        }

        if (config.closebottom) {
            widget.isAlignBottom = false
        }

        if (typeof config.top == "number") {
            widget.isAlignTop = true
            widget.top = config.top
        }

        if (typeof config.left == "number") {
            widget.isAlignLeft = true
            widget.left = config.left
        }

        if (typeof config.bottom == "number") {
            widget.isAlignBottom = true
            widget.bottom = config.bottom
        }
       
        if (typeof config.right == "number") {
            widget.isAlignRight = true
            widget.right = config.right
        }
        
        if (typeof config.horizontalCenter == "number") {
            widget.isAlignHorizontalCenter = true
            widget.horizontalCenter = config.horizontalCenter
        }
        else
        {
            widget.isAlignHorizontalCenter = false
        }
        if (typeof config.verticalCenter == "number") {
            widget.isAlignVerticalCenter = true
            widget.verticalCenter = config.verticalCenter
        }
        else
        {
            widget.isAlignVerticalCenter = false
        }

        if(config.target){
            widget.target = config.target;
        }
        widget.updateAlignment()
    },
    // 添加节点
    addNode(node, cfg) { // name,
        if(!cc.isValid(node)){
            cc.log("addNode 节点不存在");
            return;
        }
        // cc.log("cfg", cfg)
        let newnode
        if (typeof cfg.name == "string") {
            newnode = new cc.Node(cfg.name)
        } else {
            newnode = new cc.Node()
        }
        this.setNode(newnode, cfg)

        if (typeof cfg.zIndex == "number") {
            node.addChild(newnode, cfg.zIndex)
        } else {
            node.addChild(newnode)
        }
        if (typeof cfg.path == "string") {
            this.setSprite(newnode, cfg)
        } else if (typeof cfg.normal == "string") {
            this.setBtn(newnode, cfg)
        } else if (typeof cfg.skeleton == "string") {
            this.setSkeleton(newnode, cfg)
        } else if (typeof cfg.string == "string") {
            this.setLabel(newnode, cfg)
        } else if (cfg.ScrollView) { // ScrollView content
            cc.log("if (cfg.ScrollView)")
            this.setScrollView(newnode, cfg)
        } else if ( typeof cfg.videopath == "string" ) {
            this.setVideoPlayer(newnode, cfg)
        } else if (cfg.widget) {
            this.setWidget(newnode, cfg.widget)
        }
        return newnode
    },
    setSprite(node, cfg) { // path
        if (!this.checkNode(node)) {
            cc.log("setSprite 节点错误")
            // for (let k in cfg) {
            //     cc.log(k, cfg[k])
            // }
            return
        }
        if (!cfg.normal) {
            cfg.normal = cfg.path
        }
        if (!cfg.path) {
            cfg.path = cfg.normal
        }
        if (!cfg.normal && !cfg.path) {
            cc.log("setSprite 传入的资源路径为空")
            return
        }
        let sprite = node.getComponent(cc.Sprite)
        if (!sprite) {
            sprite = node.addComponent(cc.Sprite)
        }
        let self = this
        let tempRes = cc.resources;
        if(cfg.Res )
        {
            tempRes = cfg.Res;
        }
        if(this.spriteResMap[cfg.path]) {
            if (!cc.isValid(node)) {
                return
            }
            sprite.spriteFrame = this.spriteResMap[cfg.path];
            this.setNode(node, cfg);
            if (cfg.type) {
                sprite.type = cfg.type
            }
        } else {
            tempRes.load(cfg.path, cc.SpriteFrame, (err, frame) => {
                if (err) {
                    cc.log("setSprite 加载图片失败", err , cfg.Res , tempRes)
                    return;
                }
                if (!cc.isValid(node)) {
                    return
                }
                this.spriteResMap[cfg.path] = frame;
                sprite.spriteFrame = frame;
                this.setNode(node, cfg);
                if (cfg.type) {
                    sprite.type = cfg.type
                }
            })
        }
        
    },
    setBtn(node, cfg) { // normal == path, pressed, interactable, callback，widget
        if (!node) {
            cc.log("setBtn 传入的节点是空", cfg)
            return
        }
        if (!cfg.normal) {
            cfg.normal = cfg.path
        }
        if (!cfg.path) {
            cfg.path = cfg.normal
        }
        // if (!cfg.normal && !cfg.path) {
        //     cc.log("setBtn 传入的资源路径为空")
        //     return
        // }
        if (node instanceof cc.Node) {
            if (typeof cfg.x == "number") {
                node.x = cfg.x
            }
            if (typeof cfg.y == "number") {
                node.y = cfg.y
            }

        } else {
            cc.log("setBtn 传入的节点不是cc.node")
            return
        }
        let btn = node.getComponent(cc.Button)
        if (!btn) {
            btn = node.addComponent(cc.Button)
        }
        if (cfg.callback) {
            let clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = cfg.script.node;
            clickEventHandler.component = cfg.script.__classname__;
            if (typeof cfg.custom != "undefined") {
                clickEventHandler.customEventData = cfg.custom;
            }
            clickEventHandler.handler = cfg.callback;
            btn.clickEvents.push(clickEventHandler);
        }
        btn.target = node
        btn.transition = cfg.transition || cc.Button.Transition.SCALE
        if (btn.transition == cc.Button.Transition.SCALE) {
            if (cfg.aniname) {
                this.setSkeleton(node, cfg)
            } else if (cfg.path) {
                this.setSprite(node, cfg)
            }
        } else if (cfg.transition == cc.Button.Transition.SPRITE) {
            if (!cfg.pressed) {
                cc.log("setBtn 缺少点击时图片路径")
            }
            let tempRes = cc.resources;
            if(cfg.Res )
            {
                tempRes = cfg.Res;
            }
            tempRes.load(cfg.normal, cc.SpriteFrame, (err, frame) => {
                if (err) {
                    cc.log("setBtn 加载图片失败", err)
                    return;
                }
                btn.normalSprite = frame;
                btn.hoverSprite = frame;
                cfg.pressed = cfg.pressed ? cfg.pressed : cfg.normal
                //cfg.widget && this.setWidget(node, cfg.widget)
                this.setNode(node,cfg);
				tempRes.load(cfg.pressed, cc.SpriteFrame, (err, frame) => {
                    if (err) {
                        cc.log("setBtn 加载图片失败", err)
                        return;
                    }
                    if (!cc.isValid(node)) {
                        return
                    }
                    btn.pressedSprite = frame;
                    btn.disabledSprite = frame;
                    if (typeof cfg.interactable == "boolean") {
                        btn.interactable = cfg.interactable
                    }
                })
            })
        }
    },
    setLabel(node, cfg) {
        // cc.log("setLabel", cfg)
        if (!this.checkNode(node)) {
            cc.log("setLabel 节点错误")
            return
        }
        this.setNode(node, cfg)
        let label = node.getComponent(cc.Label)
        if (!label) {
            label = node.addComponent(cc.Label)
        }
        if (typeof cfg == "object") {
            if (cfg.horizontalAlign) { // cc.macro.TextAlignment. LEFT CENTER RIGHT
                label.horizontalAlign = cfg.horizontalAlign
            }
            if (cfg.verticalAlign) { // cc.macro.VerticalTextAlignment. TOP CENTER BOTTOM
                label.verticalAlign = cfg.verticalAlign
            }
            if (cfg.fontSize) {
                label.fontSize = cfg.fontSize
            }
            if (cfg.lineHeight) {
                label.lineHeight = cfg.lineHeight
            }
            if (cfg.overflow) { // cc.Label.Overflow. NONE CLAMP SHRINK RESIZE_HEIGHT
                label.overflow = cfg.overflow
            }
            if (cfg.font) {
                label.font = cfg.font
            }
            if (cfg.bold) {
                label.enableBold = cfg.bold
            }
            if(cfg.fontFamily){
                label.fontFamily = cfg.fontFamily;
            } else{
                label.fontFamily = "Microsoft YaHei";
            }
            if (typeof cfg.string == "string") {
                if (this.getTip(cfg.string)) {
                    label.string = this.getTip(cfg.string)
                } else {
                    label.string = cfg.string
                }
            }
            // cfg.widget && this.setWidget(node, cfg.widget)
        } else if (typeof cfg == "string") {
            label.string = this.getTip(cfg)
        } else {
            cc.log("无法解析传入的参数")
        }
        if (cc.ENGINE_VERSION == "2.1.3") {
            label._updateRenderData(true) // 2.1.3
        } else {
            label._forceUpdateRenderData(true) // 2.2.2
        }
    },
    setSkeleton(node, cfg) { // path aniname loop
        if (!cc.isValid(node)) {
            return
        }
        if (!cfg.path) {
            if(!cfg.skeleton){
                cc.log("setSkeleton 传入的资源路径为空")
                return
            }
            cfg.path = cfg.skeleton;
        }
        if (node instanceof cc.Node) {
            if (typeof cfg.x == "number") {
                node.x = cfg.x
            }
            if (typeof cfg.y == "number") {
                node.y = cfg.y
            }
        } else {
            cc.log("setSkeleton 传入的节点不是cc.node")
            return
        }
        let tempbool = node.active;
        if( !tempbool ){
            node.active = true;
        }
        let sprite = node.getComponent(cc.Sprite)
        sprite && node._removeComponent(sprite)
        let ani = node.getComponent(sp.Skeleton)
        if (!ani) {
            ani = node.addComponent(sp.Skeleton)
        }

        if( cfg.premultipliedAlpha != undefined && cfg.premultipliedAlpha != null )
        {
            ani.premultipliedAlpha = cfg.premultipliedAlpha && true;
        }
        else
        {
            ani.premultipliedAlpha = false;
        }
        ani.setAnimationCacheMode(sp.Skeleton.AnimationCacheMode.PRIVATE_CACHE);
        ani.enableBatch = true;
        if(cfg.timeScale){
            ani.timeScale = cfg.timeScale;
        }
        if( !tempbool ){
            node.active = false;
        }
        let tempRes = cc.resources;
        if(cfg.Res )
        {
            tempRes = cfg.Res;
        }
        tempRes.loadDir(cfg.path, sp.SkeletonData, (err, Data) => {
            if (err) {
                cc.log("加载骨骼动画失败", err)
                return;
            }
            if (!Data) {
                cc.log("路径下没有加载到资源")
                return
            }
            if (!cc.isValid(node)) {
                return
            }
            if( !tempbool ){
                node.active = true;
            }
            for (let i = 0; i < Data.length; i++) {
                if (Data[i].__classname__ == "sp.SkeletonData") {
                    ani.skeletonData = Data[i];
                }
            }
            cfg.aniname && cc.isValid(ani) && ani.setAnimation(0, cfg.aniname, !!cfg.loop);
            this.setNode(node, cfg);
            if( !tempbool ){
                node.active = false;
            }
            if( cfg.skeletoncallback ){
                cfg.skeletoncallback();
            }
        });
    },
    setEditbox() {

    },
    setScrollView(node, cfg) {
        if (!this.checkNode(node)) {
            cc.log("setScrollView 节点错误")
            return
        }
        let component = node.getComponent(cc.ScrollView)
        if (!component) {
            component = node.addComponent(cc.ScrollView)
        }
        this.setNode(node, cfg)
        component._view.width = node.width
        component._view.height = node.height
        if (cfg.content) {
            component.content.width = cfg.content.width
            component.content.height = cfg.content.height
        } else {
            component.content.width = node.width
            component.content.height = node.height
        }
    },
    // 检查节点
    checkNode(node) {
        if (!node) {
            cc.log("传入的节点是空")
            return false
        }
        if (node instanceof cc.Node) {
        } else {
            cc.log("传入的节点不是cc.node")
            return false
        }
        if( !cc.isValid( node ) )
        {
            cc.log("传入的节点已经被销毁")
            return false;
        }
        return true
    },
    // 设置节点属性
    setNode(node, cfg) {
        if (!this.checkNode(node)) {
            cc.log("setNode 节点错误")
            return
        }

        if (typeof cfg.active == "boolean") {
            node.active = cfg.active
        }
        if (cfg.widget) {
            this.setWidget(node, cfg.widget)
        } else if (cfg.position) {
            node.x = cfg.position.x
            node.y = cfg.position.y
        }
        if (typeof cfg.x == "number") {
            node.x = cfg.x
        }
        if (typeof cfg.y == "number") {
            node.y = cfg.y
        }
        if (cfg.size) {
            if (cfg.size.width) {
                node.width = cfg.size.width
            }
            if (cfg.size.height) {
                node.height = cfg.size.height
            }
        }
        if (cfg.width) {
            node.width = cfg.width
        }
        if (cfg.height) {
            node.height = cfg.height
        }
        if (cfg.scale) {
            node.scale = cfg.scale
        }
        if (cfg.scaleX) {
            node.scaleX = cfg.scaleX
        }
        if (cfg.scaleY) {
            node.scaleY = cfg.scaleY
        }
        if (cfg.anchorX) {
            node.anchorX = cfg.anchorX
        }
        if (cfg.anchorY) {
            node.anchorY = cfg.anchorY
        }
        if (cfg.color) {
            node.color = cfg.color
        }
        if (cfg.zIndex) {
            node.zIndex = cfg.zIndex
        }
        if (cfg.opacity || 0 == cfg.opacity) {
            node.opacity = cfg.opacity
        }
        if (cfg.widget) {
            this.setWidget(node, cfg.widget)
        }
    },

    setVideoPlayer(node, cfg) { // path
        if (!this.checkNode(node)) {
            console.log("setVideoPlayer 节点错误")
            return
        }
        if (!cfg.videopath ) {
            console.log("setVideoPlayer 传入的资源路径为空")
            return
        }
        let video = node.getComponent(cc.VideoPlayer)
        if (!video) {
            video = node.addComponent(cc.VideoPlayer)
        }

        let tempbool = node.active;
        if(!tempbool){
            node.active = true;
        }
        if (cfg.callback) {
            let videoEventHandler = new cc.Component.EventHandler();
            videoEventHandler.target = cfg.script.node;
            videoEventHandler.component = cfg.script.__classname__;
            if (typeof cfg.custom != "undefined") {
                videoEventHandler.customEventData = cfg.custom;
            }
            videoEventHandler.handler = cfg.callback;
            video.videoPlayerEvent.push(videoEventHandler);
        }
        if( cfg.isFullscreen ){
            video.isFullscreen = true;
        }
        video.keepAspectRatio = false;
        if(!tempbool){
            node.active = false;
        }
        let tempRes = cc.resources;
        if(cfg.Res )
        {
            tempRes = cfg.Res;
        }
        tempRes.load(cfg.videopath, cc.Asset, (err, asset) => {
            if (err) {
                console.log("setVideoPlayer 加载影片失败", err)
                return;
            }
            if (!cc.isValid(node)) {
                console.log("setVideoPlayer 节点不存在", cfg.videopath)
                return
            }
            if(!tempbool){
                node.active = true;
            }
            video.resourceType = cc.VideoPlayer.ResourceType.LOCAL;
            video.clip = asset;
            // video._impl.setURL(asset.nativeUrl, this._mute || this._volume === 0);
            // video.play();
            this.setNode(node, cfg)
            if(!tempbool){
                node.active = false;
            }
        })
    },

    // 检查是否是aga子游戏
    checkIsAgaSubgame(key) {
        if ((hqq.app.pinpai == "fuxin" ) && hqq.subGameList["aga"] && (key == "cbzb" || key == "duofuduocai" || key == "ygxb" || key == "fkxw")) {
            return true
        } else {
            return false
        }
    },

    /**
     * 圆运动
     * @param {Number} duration
     * @param {cc.Node|cc.p} dot 圆心点坐标或者node
     * @param {Number}   半径 如果为负数, 反时钟方向
     * @param {Number}  旋转角度
     * @param {Number}  初始角度
     * @returns {cc.CardinalSplineTo}
     */
    circleBy(duration, dot, r, angle, initangle) {
        let dp = angle || 20, init = initangle || 0, dpr = 1, ary = [];
        let rad = Math.PI / 180
        r = r || 20;
        r = Math.abs(r);
        dp = Math.abs(dp)
        init = Math.abs(init)
        // cc.log(dp, init)
        if (angle < 0) {
            for (let i = init; i > (init - dp); i--) {
                ary.push(cc.v2(Math.cos(dpr * i * rad) * r + dot.x, Math.sin(dpr * i * rad) * r + dot.y));
            }
        } else {
            for (let i = init; i < (dp + init); i++) {
                ary.push(cc.v2(Math.cos(dpr * i * rad) * r + dot.x, Math.sin(dpr * i * rad) * r + dot.y));
            }
        }
        // ary.push(cc.v2(Math.sin(dpr * init * rad) * r + dot.x, Math.cos(dpr * init * rad) * r + dot.y));
        return cc.cardinalSplineTo(duration, ary, 0);
    }

}

module.exports = gHandler