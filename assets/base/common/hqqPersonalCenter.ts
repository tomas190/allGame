import * as cc from 'cc';
const { ccclass, property } = cc._decorator;

// /**游戏类型*/
enum enumServerGameType {
    // /** 棋牌1*/
    enumServerGameType_QiPai = 1,
    // /** 派彩2*/
    enumServerGameType_PaiCai = 2,
    // /** 体育3*/
    enumServerGameType_TiYu = 3,
    // /** 视讯4*/
    enumServerGameType_ShiXun = 4,
    // /** 电子5*/
    enumServerGameType_Dianzi = 5,
}
enum enumClientGameType {
    // /** 棋牌0*/
    enumClientGameType_QiPai = 0,
    // /** 电子1*/
    enumClientGameType_Dianzi = 1,
    // /** 视讯2*/
    enumClientGameType_ShiXun = 2,
    // /** 派彩3*/
    enumClientGameType_PaiCai = 3,
    // /** 体育4*/
    enumClientGameType_TiYu = 4,
}
let server2clientGameType = {
    1: 0,
    2: 3,
    3: 1,
    4: 2,
    5: 4,
}
let client2serverGameType = {
    0: 1,
    1: 3,
    2: 4,
    3: 2,
    4: 5,
}
// /**游戏分类 */
interface YXFL {
    // /**游戏ID */
    gameID: string;
    // /**游戏名称 */
    gameName: string;
}

@ccclass('hqqPersonalCenter')
export default class hqqPersonalCenter extends cc.Component {
    @property(cc.Prefab)
    selectDatePrefab: cc.Prefab | null = null;
    uidlabel: cc.Label | null = null;
    parentidlabel: cc.Label | null = null;
    accountlabel: cc.Label | null = null;
    phonelabel: cc.Label | null = null;
    headimg: cc.Sprite | null = null;
    loading: cc.Node | null = null;
    /**
    * 投注总额
    */
    tzcount: cc.Label | null = null;
    /**
    * 派彩总额
    */
    pccount: cc.Label | null = null;
    /**
    * 订单数
    */
    ddcount: cc.Label | null = null;
    /**
    * 盈利总额
    */
    income: cc.Label | null = null;
    /**
    * 盈利概括查询天数选单列表
    */
    YLGKDayList: cc.Node | null = null;
    /**
    * 盈利概括查询天数LABEL
    */
    YLGKDayLabel: cc.Label | null = null;
    /**
    * 盈利概括查询天数
    */
    YLGKDay: number = 0;
    /**
    * 盈利概括当前页签
    */
    YLGKTabIndex: number = 1;
    /**
    * 投注记录当前页签
    */
    TZJLTabIndex: number = 1;
    /**
    * 投注记录暂无数据节点
    */
    zwsj: cc.Node | null = null;
    /**
    * 投注记录内容节点
    */
    TZJLCotent: cc.Node | null = null;
    /**
    * 投注记录当前页数
    */
    TZJLPage: number = 1;
    /**
    * 投注记录当前页数文本
    */
    TZJLPageLabel: cc.Label | null = null;
    /**
    * 投注记录最大页数
    */
    TZJLMaxPage: number = 1;
    /**投注记录最大页数文本*/
    TZJLMaxPageLabel: cc.Label | null = null;

    /**投注记录游戏分类清单*/
    YXFLList: Array<Array<YXFL>> = [[], [], [], [], [], []];
    /**投注记录选择日期文本 */
    TZJLSelectDateLabel: cc.Label | null = null;
    /**投注记录选择日期节点 */
    TZJLSelectDateNode: cc.Node | null = null;
    /**投注记录选择日期节点 */
    TZJLSelectDatePanel: cc.Node | null = null;
    /**投注记录选择游戏名称文本 */
    TZJLSelectGameLabel: cc.Label | null = null;
    /**投注记录选择游戏名称清单节点 */
    TZJLSelectGameList: cc.Node | null = null;
    /**投注记录选择游戏名称 */
    TZJLSelectGameID: string = "";
    /**投注记录选择排序文本 */
    TZJLSelectSortLabel: cc.Label | null = null;
    /**投注记录选择排序文本清单节点 */
    TZJLSelectSortList: cc.Node | null = null;
    /**投注记录当页资料 */
    TZJLPageData: Array<any> = [];
    /**投注记录开始日期 */
    TZJLStartDate: string = "";
    /**投注记录结束日期 */
    TZJLEndDate: string = "";
    /**本周业绩 */
    BZYJ: number = 0;
    /**本周业绩文本 */
    BZYJLabel: cc.Label | null = null;

    /**本周充值 */
    BZCZ: number = 0;
    /**本周充值文本 */
    BZCZLabel: cc.Label | null = null;

    /**本周提现 */
    BZTX: number = 0;
    /**本周提现文本 */
    BZTXLabel: cc.Label | null = null;

    /**棋牌待遇 */
    QPDY: number = 200;
    /**棋牌待遇文本 */
    QPDYLabel: cc.Label | null = null;
    /**电子待遇 */
    DZDY: number = 130;
    /**电子待遇文本 */
    DZDYLabel: cc.Label | null = null;
    start() {
        if (hqq.app.pinpai == "ninetwo") {
            hqq.setSprite(cc.find("personalcenter/exitbtn"), { Res: hqq["hall_" + hqq.app.pinpai], path: "language/" + hqq.language + "/ninetwo/img/fanhui" });
            hqq.setSprite(cc.find("personalcenter/title"), { Res: hqq["hall_" + hqq.app.pinpai], path: "language/" + hqq.language + "/ninetwo/img/titlegrzx" });

            let scalex = cc.view.getVisibleSize().width / cc.view.getDesignResolutionSize().width;
            let scaley = cc.view.getVisibleSize().height / cc.view.getDesignResolutionSize().height;
            let grxx = cc.find("personalcenter/btncontainer/grxx/checkmark/basicInfo_bg");
            grxx.scale = cc.v3(scalex, scaley, 1);
            let grxx2 = cc.find("personalcenter/btncontainer/grxx/checkmark/basicInfo_bg2");
            grxx2.scale = cc.v3(scalex, scaley, 1);
            let grxx3 = cc.find("personalcenter/btncontainer/grxx/checkmark/personalInfo_bg");
            grxx3.scale = cc.v3(scalex, scaley, 1);
            let tzjl = cc.find("personalcenter/btncontainer/tzjl/checkmark/basicInfo_bg");
            tzjl.scale = cc.v3(scalex, scaley, 1);
            let ylgk = cc.find("personalcenter/btncontainer/ylgk/checkmark/basicInfo_bg");
            ylgk.scale = cc.v3(scalex, scaley, 1);

            let grxxmenu = cc.find("personalcenter/btncontainer/grxx");
            if (cc.isValid(grxxmenu)) {
                grxxmenu.getComponent(cc.UITransform).width *= scalex;
                grxxmenu.getComponent(cc.UITransform).height *= scalex;
            }
            let grxxunselect = cc.find("personalcenter/btncontainer/grxx/Background");
            if (cc.isValid(grxxunselect)) {
                grxxunselect.getComponent(cc.UITransform).width *= scalex;
                grxxunselect.getComponent(cc.UITransform).height *= scalex;
            }

            let grxxunselectzi = cc.find("personalcenter/btncontainer/grxx/Background/zi");
            if (cc.isValid(grxxunselectzi)) {
                grxxunselectzi.getComponent(cc.UITransform).width *= scalex;
                grxxunselectzi.getComponent(cc.UITransform).height *= scalex;
            }

            let grxxselect = cc.find("personalcenter/btncontainer/grxx/checkmark/dating_menu_btn_selected");
            if (cc.isValid(grxxselect)) {
                grxxselect.scale = cc.v3(scalex, scalex, 1);
            }

            let tzjlmenu = cc.find("personalcenter/btncontainer/tzjl");
            if (cc.isValid(tzjlmenu)) {
                tzjlmenu.getComponent(cc.UITransform).width *= scalex;
                tzjlmenu.getComponent(cc.UITransform).height *= scalex;
            }

            let tzjlunselect = cc.find("personalcenter/btncontainer/tzjl/Background");
            if (cc.isValid(tzjlunselect)) {
                tzjlunselect.getComponent(cc.UITransform).width *= scalex;
                tzjlunselect.getComponent(cc.UITransform).height *= scalex;
            }

            let tzjlunselectzi = cc.find("personalcenter/btncontainer/tzjl/Background/zi");
            if (cc.isValid(tzjlunselectzi)) {
                tzjlunselectzi.getComponent(cc.UITransform).width *= scalex;
                tzjlunselectzi.getComponent(cc.UITransform).height *= scalex;
            }

            let tzjlselect = cc.find("personalcenter/btncontainer/tzjl/checkmark/dating_menu_btn_selected");
            if (cc.isValid(tzjlselect)) {
                tzjlselect.scale = cc.v3(scalex, scalex, 1);
            }

            let ylgkmenu = cc.find("personalcenter/btncontainer/ylgk");
            if (cc.isValid(ylgkmenu)) {
                ylgkmenu.getComponent(cc.UITransform).width *= scalex;
                ylgkmenu.getComponent(cc.UITransform).height *= scalex;
            }

            let ylgkunselect = cc.find("personalcenter/btncontainer/ylgk/Background");
            if (cc.isValid(ylgkunselect)) {
                ylgkunselect.getComponent(cc.UITransform).width *= scalex;
                ylgkunselect.getComponent(cc.UITransform).height *= scalex;
            }

            let ylgkunselectzi = cc.find("personalcenter/btncontainer/ylgk/Background/zi");
            if (cc.isValid(ylgkunselectzi)) {
                ylgkunselectzi.getComponent(cc.UITransform).width *= scalex;
                ylgkunselectzi.getComponent(cc.UITransform).height *= scalex;
            }

            let ylgkselect = cc.find("personalcenter/btncontainer/ylgk/checkmark/dating_menu_btn_selected");
            if (cc.isValid(ylgkselect)) {
                ylgkselect.scale = cc.v3(scalex, scalex, 1);
            }

            this.tzcount = cc.find("personalcenter/btncontainer/ylgk/checkmark/basicInfo_bg/tzcount").getComponent(cc.Label);
            this.pccount = cc.find("personalcenter/btncontainer/ylgk/checkmark/basicInfo_bg/pccount").getComponent(cc.Label);
            this.ddcount = cc.find("personalcenter/btncontainer/ylgk/checkmark/basicInfo_bg/ddcount").getComponent(cc.Label);
            this.income = cc.find("personalcenter/btncontainer/ylgk/checkmark/basicInfo_bg/income").getComponent(cc.Label);

            this.YLGKDayList = cc.find("personalcenter/btncontainer/ylgk/checkmark/basicInfo_bg/combotimelist");
            this.YLGKDayLabel = cc.find("personalcenter/btncontainer/ylgk/checkmark/basicInfo_bg/combotime/zi1").getComponent(cc.Label);

            this.zwsj = cc.find("personalcenter/btncontainer/tzjl/checkmark/basicInfo_bg/dataScrollView/view/zwsj")

            this.TZJLCotent = cc.find("personalcenter/btncontainer/tzjl/checkmark/basicInfo_bg/dataScrollView/view/content");
            this.TZJLMaxPageLabel = cc.find("personalcenter/btncontainer/tzjl/checkmark/basicInfo_bg/pagezi/totalpage").getComponent(cc.Label);
            this.TZJLPageLabel = cc.find("personalcenter/btncontainer/tzjl/checkmark/basicInfo_bg/curpage").getComponent(cc.Label);

            /**投注记录选择日期文本 */
            this.TZJLSelectDateLabel = cc.find("personalcenter/btncontainer/tzjl/checkmark/basicInfo_bg/combotime/zi1").getComponent(cc.Label);

            /**投注记录选择游戏名称文本 */
            this.TZJLSelectGameLabel = cc.find("personalcenter/btncontainer/tzjl/checkmark/basicInfo_bg/combogame/zi1").getComponent(cc.Label);

            this.TZJLSelectDatePanel = cc.find("personalcenter/hqqDatePicker");

            /**投注记录选择排序文本 */
            this.TZJLSelectSortLabel = cc.find("personalcenter/btncontainer/tzjl/checkmark/basicInfo_bg/combosort/zi1").getComponent(cc.Label);

            this.TZJLSelectGameList = cc.find("personalcenter/btncontainer/tzjl/checkmark/basicInfo_bg/combogameList");
            this.TZJLSelectSortList = cc.find("personalcenter/btncontainer/tzjl/checkmark/basicInfo_bg/combosortList")
            for (let i = 1; i <= 5; i++) {
                this.YXFLList[i].push({ gameID: "", gameName: "全部游戏" });
            }

            for (let key in hqq.subGameList) {
                this.YXFLList[client2serverGameType[hqq.subGameList[key].gameType]].push({ gameID: hqq.subGameList[key].game_id, gameName: hqq.subGameList[key].zhname })
            }

            this.TZJLStartDate = this.getRangeDate(0);
            this.TZJLEndDate = this.getRangeDate(0);
            this.TZJLSelectDateLabel.string = this.TZJLStartDate + "-" + this.TZJLEndDate;

            this.BZYJLabel = cc.find("personalcenter/btncontainer/grxx/checkmark/basicInfo_bg2/yjd/bzyj").getComponent(cc.Label);
            this.BZCZLabel = cc.find("personalcenter/btncontainer/grxx/checkmark/basicInfo_bg2/yjd/bzcz").getComponent(cc.Label);
            this.BZTXLabel = cc.find("personalcenter/btncontainer/grxx/checkmark/basicInfo_bg2/yjd/bztx").getComponent(cc.Label);
            this.QPDYLabel = cc.find("personalcenter/btncontainer/grxx/checkmark/basicInfo_bg2/daiyu/qpdy").getComponent(cc.Label);
            this.DZDYLabel = cc.find("personalcenter/btncontainer/grxx/checkmark/basicInfo_bg2/daiyu/dzdy").getComponent(cc.Label);

        }
        this.uidlabel = cc.find("personalcenter/btncontainer/grxx/checkmark/basicInfo_bg/uidvalue").getComponent(cc.Label);

        this.parentidlabel = cc.find("personalcenter/btncontainer/grxx/checkmark/basicInfo_bg/parentidvalue").getComponent(cc.Label);


        this.accountlabel = cc.find("personalcenter/btncontainer/grxx/checkmark/basicInfo_bg/accountvalue").getComponent(cc.Label);


        this.phonelabel = cc.find("personalcenter/btncontainer/grxx/checkmark/basicInfo_bg/phoneidvalue").getComponent(cc.Label);

        this.headimg = cc.find("personalcenter/btncontainer/grxx/checkmark/basicInfo_bg/headsprite").getComponent(cc.Sprite);

        this.loading = cc.find("personalcenter/Loading");
        this.loading.active = true;
        let toggle = cc.find("personalcenter/btncontainer").children[0].getComponent(cc.Toggle);
        toggle.isChecked = true;
        this.onMenuClick(toggle, 1);
    }
    init() {
        if (cc.isValid(this.node)) {
            this.node.active = true;
        }
    }
    onClose() {
        if (cc.isValid(this.node)) {
            this.node.active = false;
        }
    }
    onTXKClick() {
        hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, { type: 1 })
    }
    onEnable() {
        hqq.eventMgr.register(hqq.eventMgr.refreshPlayerinfo, "hqqPersonalCenter", this.setPlayerInfo.bind(this))
        if (!cc.isValid(this.loading)) return;
        let toggle = cc.find("personalcenter/btncontainer").children[0].getComponent(cc.Toggle);
        toggle.isChecked = true;
        this.onMenuClick(toggle, 1);
    }
    onDisable() {
        this.BZYJ = 0;
        hqq.eventMgr.unregister(hqq.eventMgr.refreshPlayerinfo, "hqqPersonalCenter")
    }
    onDestroy() {
        hqq.eventMgr.unregister(hqq.eventMgr.refreshPlayerinfo, "hqqPersonalCenter")
    }
    setPlayerInfo(msg) {
        if (msg.game_img) {
            hqq.commonTools.loadHeadRes(msg.game_img, this.headimg, 113)
        }
        if (msg.phone_number) {
            this.phonelabel.string = msg.phone_number
        }
    }
    onMenuClick(toggle, customEventData) {
        cc.find("checkmark/dating_menu_btn_selected", toggle.node).getComponent(cc.sp.Skeleton).setAnimation(0, "animation", true);
        if (Number(customEventData) === 1) {
            if (cc.isValid(this.uidlabel)) {
                this.loading.active = true;
                this.uidlabel.string = hqq.gameGlobal.player.id;
                this.parentidlabel.string = hqq.gameGlobal.pay.proxy_user_id;
                let accountnamelength = hqq.gameGlobal.player.account_name.toString().length;
                this.accountlabel.string = hqq.gameGlobal.player.account_name.toString().slice(0, 2) + "**" + hqq.gameGlobal.player.account_name.toString().slice(accountnamelength - 3, accountnamelength - 1);
                let phonelength = hqq.gameGlobal.player.phonenum.toString().length;
                if (phonelength != "") {
                    this.phonelabel.string = hqq.gameGlobal.player.phonenum.toString().slice(0, 3) + "*****" + hqq.gameGlobal.player.phonenum.toString().slice(phonelength - 3, phonelength);
                } else {
                    this.phonelabel.string = "";
                }
                hqq.commonTools.loadHeadRes(hqq.gameGlobal.player.headurl, this.headimg, 113)

                this.BZYJ = 0;
                let fincallback = () => {
                    if (cc.isValid(this.loading)) {
                        this.loading.active = false;
                    }
                }
                let fincallback4 = () => {
                    this.requestDaiyu(5, fincallback, fincallback);
                }

                let fincallback3 = () => {
                    this.requestDaiyu(1, fincallback4, fincallback4);
                }

                let fincallback2 = () => {
                    this.BZYJLabel.string = hqq.commonTools.formatGold2(this.BZYJ, 3);
                    this.requestPayData(fincallback3, fincallback3);
                }
                this.requestBZYJ(1, () => {
                    this.requestBZYJ(5, fincallback2, fincallback2);
                }, fincallback2)

            }
        } else if (Number(customEventData) === 2) {
            cc.find("personalcenter/btncontainer/tzjl/checkmark/basicInfo_bg/tabScrollView/view/tabToggleContainer").children[0].getComponent(cc.Toggle).isChecked = true;
            this.onTZJLTabClick(cc.find("personalcenter/btncontainer/tzjl/checkmark/basicInfo_bg/tabScrollView/view/tabToggleContainer/toggle1").getComponent(cc.Toggle), "1");
        } else if (Number(customEventData) === 3) {
            cc.find("personalcenter/btncontainer/ylgk/checkmark/basicInfo_bg/tabScrollView/view/tabToggleContainer").children[0].getComponent(cc.Toggle).isChecked = true;
            this.onYLGKTabClick(cc.find("personalcenter/btncontainer/ylgk/checkmark/basicInfo_bg/tabScrollView/view/tabToggleContainer/toggle1").getComponent(cc.Toggle), "1");
        }
    }
    requestDaiyu(gametag, finishcallback, finishcallback2) {
        let callback = (response, url) => {
            if (cc.isValid(this.node)) {
                if (gametag === 1) {
                    this.QPDYLabel.string = hqq.commonTools.formatGold2(this.QPDY, 3);
                } else if (gametag === 5) {
                    this.DZDYLabel.string = hqq.commonTools.formatGold2(this.DZDY, 3);
                }
                if (response.code == 200) {
                    if (response.msg != null) {
                        if (gametag === 1) {
                            if (response.msg.income != null) {
                                this.QPDYLabel.string = hqq.commonTools.formatGold2(response.msg.income, 3);
                            } else {
                                this.QPDYLabel.string = hqq.commonTools.formatGold2(this.QPDY, 3);
                            }
                        } else if (gametag === 5) {
                            if (response.msg.income != null) {
                                this.DZDYLabel.string = hqq.commonTools.formatGold2(response.msg.income, 3);
                            } else {
                                this.DZDYLabel.string = hqq.commonTools.formatGold2(this.DZDY, 3);
                            }
                        }

                    }
                    if (finishcallback) {
                        finishcallback();
                    }
                } else if (response.code === 404 && response.msg === "token not match") {
                    let callback2 = (response, url) => {
                        if (!cc.isValid(this.node)) return;
                        if (response.code === 200) {
                            hqq.gameGlobal.proxy.token = response.msg.token;
                            this.requestDaiyu(gametag, finishcallback, finishcallback2);
                        } else {
                            if (finishcallback2) {
                                finishcallback2();
                            }
                        }
                    }
                    let failcallback2 = (status, forcejump, url, err, readyState) => {
                        if (finishcallback2) {
                            finishcallback2();
                        }
                    }
                    let url = hqq.gameGlobal.proxy.proxy_host + "/Proxy/User/login";

                    hqq.http.sendXMLHttpRequest({
                        method: 'POST',
                        urlto: url,
                        param: `account_name=${hqq.gameGlobal.player.account_name}&token=${hqq.gameGlobal.token}`,
                        callback: callback2,
                        failcallback: failcallback2,
                        needJsonParse: true,
                    })
                    return;
                }
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            if (gametag === 1) {
                this.QPDYLabel.string = hqq.commonTools.formatGold2(this.QPDY, 3);
            } else if (gametag === 5) {
                this.DZDYLabel.string = hqq.commonTools.formatGold2(this.DZDY, 3);
            }
            if (finishcallback2) {
                finishcallback2();
            }
        }
        let today = new Date();
        let todayWeek = today.getDay();
        let monday = today.setHours(0, 0, 0, 0) - (todayWeek - 1) * (86400 * 1000);
        let sunday = today.setHours(23, 59, 59, 999) + (7 - todayWeek) * (86400 * 1000);
        let url = hqq.gameGlobal.proxy.proxy_host + "/Proxy/User/GetBaseDividendRule2";
        url += "?token=" + hqq.gameGlobal.proxy.token;
        url += "&account_name=" + hqq.gameGlobal.player.account_name;
        url += "&id=" + hqq.gameGlobal.player.id;
        url += "&game_tag=" + gametag;
        hqq.http.sendXMLHttpRequest({
            method: 'GET',
            urlto: url,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: true,
        })
    }
    requestPayData(finishcallback, finishcallback2) {
        let callback = (response, url) => {
            if (cc.isValid(this.node)) {
                if (response.code == 200) {
                    if (response.msg != null) {
                        if (response.msg.user_top_up_total != null) {
                            this.BZCZ = response.msg.user_top_up_total;
                            this.BZCZLabel.string = hqq.commonTools.formatGold2(this.BZCZ, 3);
                        }
                        if (response.msg.user_withdraw_total != null) {
                            if (response.msg.user_withdraw_total < 0) {
                                this.BZTX = response.msg.user_withdraw_total * -1;
                            } else {
                                this.BZTX = response.msg.user_withdraw_total;
                            }
                            this.BZTXLabel.string = this.BZTX.toString();
                        }
                    }
                    if (finishcallback) {
                        finishcallback();
                    }
                } else if (response.code === 404 && response.msg === "token not match") {
                    let callback2 = (response, url) => {
                        if (!cc.isValid(this.node)) return;
                        if (response.code === 200) {
                            hqq.gameGlobal.proxy.token = response.msg.token;
                            this.requestPayData(finishcallback, finishcallback2);
                        } else {
                            if (finishcallback2) {
                                finishcallback2();
                            }
                        }
                    }
                    let failcallback2 = (status, forcejump, url, err, readyState) => {
                        if (finishcallback2) {
                            finishcallback2();
                        }
                    }
                    let url = hqq.gameGlobal.proxy.proxy_host + "/Proxy/User/login";

                    hqq.http.sendXMLHttpRequest({
                        method: 'POST',
                        urlto: url,
                        param: `account_name=${hqq.gameGlobal.player.account_name}&token=${hqq.gameGlobal.token}`,
                        callback: callback2,
                        failcallback: failcallback2,
                        needJsonParse: true,
                    })
                    return;
                }
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            if (finishcallback2) {
                finishcallback2();
            }
        }
        let today = new Date();
        let todayWeek = today.getDay();
        let monday = today.setHours(0, 0, 0, 0) - (todayWeek - 1) * (86400 * 1000);
        let sunday = today.setHours(23, 59, 59, 999) + (7 - todayWeek) * (86400 * 1000);
        if (todayWeek === 0) {
            monday = today.setHours(0, 0, 0, 0) - (6) * (86400 * 1000);
            sunday = today.setHours(0, 0, 0, 0);
        }
        let url = hqq.gameGlobal.proxy.proxy_host + "/Proxy/User/GetProxyLinkPayInfo";
        url += "?token=" + hqq.gameGlobal.proxy.token;
        url += "&account_name=" + hqq.gameGlobal.player.account_name;
        url += "&start_time=" + Math.floor(monday / 1000);
        url += "&end_time=" + Math.floor(sunday / 1000);
        url += "&id=" + hqq.gameGlobal.player.id;
        hqq.http.sendXMLHttpRequest({
            method: 'GET',
            urlto: url,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: true,
        })
    }
    requestBZYJ(gametag, finishcallback, finishcallback2) {
        let callback = (response, url) => {
            if (cc.isValid(this.node)) {
                if (response.code == 200) {
                    if (response.msg != null) {
                        // //得到数据所有的key
                        let c = []
                        let fy = 0;
                        for (var key in response.msg) {
                            c.push(key)
                        }

                        // //分别遍历key
                        if (c.length > 0) {
                            for (let i = 0; i < c.length; i++) {
                                let key = c[i]
                                // //对应的第一条数据

                                if (response.msg[key].length > 0) {
                                    // //总业绩 = 第一条的团队业绩
                                    this.BZYJ += response.msg[key][0].amount
                                }
                            }
                        }

                        if (finishcallback) {
                            finishcallback();
                        }
                    }
                } else if (response.code === 404 && response.msg === "token not match") {
                    let callback2 = (response, url) => {
                        if (!cc.isValid(this.node)) return;
                        if (response.code === 200) {
                            hqq.gameGlobal.proxy.token = response.msg.token;
                            this.requestBZYJ(gametag, finishcallback, finishcallback2);
                        } else {
                            if (finishcallback2) {
                                finishcallback2();
                            }
                        }
                    }
                    let failcallback2 = (status, forcejump, url, err, readyState) => {
                        if (finishcallback2) {
                            finishcallback2();
                        }
                    }
                    let url = hqq.gameGlobal.proxy.proxy_host + "/Proxy/User/login";

                    hqq.http.sendXMLHttpRequest({
                        method: 'POST',
                        urlto: url,
                        param: `account_name=${hqq.gameGlobal.player.account_name}&token=${hqq.gameGlobal.token}`,
                        callback: callback2,
                        failcallback: failcallback2,
                        needJsonParse: true,
                    })
                    return;
                } else {
                    if (finishcallback2) {
                        finishcallback2();
                    }
                }
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            if (finishcallback2) {
                finishcallback2();
            }
        }
        let today = new Date();
        let todayWeek = today.getDay();
        cc.log("requestBZYJ todayWeek=", todayWeek);
        let monday = today.getTime() - (todayWeek - 1) * (86400 * 1000);
        let sunday = today.getTime() + (7 - todayWeek) * (86400 * 1000);
        if (todayWeek === 0) {
            monday = today.getTime() - (6) * (86400 * 1000);
            sunday = today.getTime();
        }
        let url = hqq.gameGlobal.proxy.proxy_host + "/Proxy/User/GetBaseDividendInfo2";
        url += "?token=" + hqq.gameGlobal.proxy.token;
        url += "&account_name=" + hqq.gameGlobal.player.account_name;
        url += "&game_tag=" + gametag;
        url += "&first_date=" + this.formatDate(monday);
        url += "&last_date=" + this.formatDate(sunday);
        hqq.http.sendXMLHttpRequest({
            method: 'GET',
            urlto: url,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: true,
        })
    }
    onTZJLTabClick(toggle, customEventData) {
        let gametag = Number(customEventData);
        if (gametag !== this.TZJLTabIndex || customEventData === "1") {
            this.TZJLSelectGameList.active = false;
            this.TZJLSelectGameID = this.YXFLList[this.TZJLTabIndex][0].gameID;
            this.TZJLSelectGameLabel.string = this.YXFLList[this.TZJLTabIndex][0].gameName;
            this.TZJLStartDate = this.getRangeDate(0);
            this.TZJLEndDate = this.getRangeDate(0);
            this.TZJLSelectDateLabel.string = this.TZJLStartDate + "-" + this.TZJLEndDate;

            this.TZJLSelectSortList.active = false;
            this.TZJLSelectSortLabel.string = "时间";
        }
        this.TZJLTabIndex = gametag;
        this.loading.active = true;

        // //https://proxy.lymrmfyp.com/Proxy/User/GetStatementTotalByID

        if (gametag === 1) {
            let callback = (response, url) => {
                if (cc.isValid(this.node)) {
                    if (response.code == 200) {
                        if (response.msg.statements) {
                            this.TZJLPageData = response.msg.statements;
                            if (response.msg.count % 20 === 0) {
                                this.TZJLMaxPage = Math.floor(response.msg.count / 20);
                            } else {
                                this.TZJLMaxPage = Math.floor(response.msg.count / 20) + 1;
                            }
                            this.TZJLMaxPageLabel.string = this.TZJLMaxPage + "";
                            if (this.TZJLPage === 0) {
                                this.TZJLPage = 1;
                            }
                            this.TZJLPageLabel.string = this.TZJLPage + "";
                            this.zwsj.active = false;
                            let i = 0;
                            for (i = 0; i < 20 && i < response.msg.statements.length; i++) {
                                this.TZJLCotent.children[i].getChildByName("zi1").getComponent(cc.Label).string = response.msg.statements[i].game_name;
                                this.TZJLCotent.children[i].getChildByName("zi2").getComponent(cc.Label).string = hqq.commonTools.formatGold2(response.msg.statements[i].bet_money);
                                this.TZJLCotent.children[i].getChildByName("zi3").getComponent(cc.Label).string = hqq.commonTools.formatGold2(response.msg.statements[i].income);
                                this.TZJLCotent.children[i].getChildByName("zi4").getComponent(cc.Label).string = this.formatDateTime(response.msg.statements[i].create_time * 1000);
                                this.TZJLCotent.children[i].active = true;
                            }

                            for (i; i < 20; i++) {
                                this.TZJLCotent.children[i].active = false;
                            }
                            this.loading.active = false;
                            return
                        } else {
                            this.TZJLMaxPage = 0;
                            this.TZJLPage = 0;
                            this.TZJLMaxPageLabel.string = this.TZJLMaxPage + "";
                            this.TZJLPageLabel.string = this.TZJLPage + "";
                            this.zwsj.active = true;

                        }
                    } else if (response.code === 404 && response.msg === "token not match") {
                        let callback2 = (response, url) => {
                            if (!cc.isValid(this.node)) return;
                            if (response.code === 200) {
                                hqq.gameGlobal.proxy.token = response.msg.token;
                                this.onTZJLTabClick(toggle, customEventData);
                            } else {
                                for (let i = 0; i < 20; i++) {
                                    this.TZJLCotent.children[i].active = false;
                                }
                                this.TZJLMaxPage = 0;
                                this.TZJLPage = 0;
                                this.TZJLMaxPageLabel.string = this.TZJLMaxPage + "";
                                this.TZJLPageLabel.string = this.TZJLPage + "";
                                this.zwsj.active = true;
                                this.loading.active = false;
                            }
                        }
                        let failcallback2 = (status, forcejump, url, err, readyState) => {
                            for (let i = 0; i < 20; i++) {
                                this.TZJLCotent.children[i].active = false;
                            }
                            this.TZJLMaxPage = 0;
                            this.TZJLPage = 0;
                            this.TZJLMaxPageLabel.string = this.TZJLMaxPage + "";
                            this.TZJLPageLabel.string = this.TZJLPage + "";

                            this.zwsj.active = true;
                            this.loading.active = false;
                        }
                        let url = hqq.gameGlobal.proxy.proxy_host + "/Proxy/User/login";

                        hqq.http.sendXMLHttpRequest({
                            method: 'POST',
                            urlto: url,
                            param: `account_name=${hqq.gameGlobal.player.account_name}&token=${hqq.gameGlobal.token}`,
                            callback: callback2,
                            failcallback: failcallback2,
                            needJsonParse: true,
                        })
                        return;
                    }
                    this.TZJLPageData = [];
                    for (let i = 0; i < 20; i++) {
                        this.TZJLCotent.children[i].active = false;
                    }
                    this.TZJLMaxPage = 0;
                    this.TZJLPage = 0;
                    this.TZJLMaxPageLabel.string = this.TZJLMaxPage + "";
                    this.TZJLPageLabel.string = this.TZJLPage + "";

                    this.zwsj.active = true;
                    this.loading.active = false;
                }
            }
            let failcallback = (status, forcejump, url, err, readyState) => {
                if (cc.isValid(this.node)) {
                    for (let i = 0; i < 20; i++) {
                        this.TZJLCotent.children[i].active = false;
                    }
                    this.TZJLMaxPage = 0;
                    this.TZJLPage = 0;
                    this.TZJLMaxPageLabel.string = this.TZJLMaxPage + "";
                    this.TZJLPageLabel.string = this.TZJLPage + "";
                    this.loading.active = false;
                    this.zwsj.active = true;
                }
            }
            let today = new Date();
            let url = hqq.gameGlobal.proxy.proxy_host + "/Proxy/User/GetStatementByID";
            url += "?token=" + hqq.gameGlobal.proxy.token;
            url += "&account_name=" + hqq.gameGlobal.player.account_name;
            url += "&game_tag=" + gametag;
            url += "&start_date=" + this.TZJLStartDate;
            url += "&end_date=" + this.TZJLEndDate;
            if (this.TZJLPage == 0) {
                url += "&page=1";
            } else {
                url += "&page=" + this.TZJLPage;
            }

            url += "&limit=" + 20;
            if (this.TZJLSelectGameID) {
                url += "&game_id=" + this.TZJLSelectGameID;
            }
            // // url += "&start_time="  + new Date(new Date().toLocaleDateString()).getTime()/1000;
            // // url += "&end_time="  + Date.parse(new Date().toString())/1000;
            hqq.http.sendXMLHttpRequest({
                method: 'GET',
                urlto: url,
                callback: callback,
                failcallback: failcallback,
                needJsonParse: true,
            })
        } else {
            let callback = (response, url) => {
                if (cc.isValid(this.node)) {
                    if (response.code === 0) {
                        if (response.data.statements) {
                            this.TZJLPageData = response.data.statements;
                            if (response.data.count % 20 === 0) {
                                this.TZJLMaxPage = Math.floor(response.data.count / 20);
                            } else {
                                this.TZJLMaxPage = Math.floor(response.data.count / 20) + 1;
                            }
                            this.TZJLMaxPageLabel.string = this.TZJLMaxPage + "";
                            if (this.TZJLPage === 0) {
                                this.TZJLPage = 1;
                            }
                            this.TZJLPageLabel.string = this.TZJLPage + "";
                            this.zwsj.active = false;
                            let i = 0;
                            for (i = 0; i < 20 && i < response.data.statements.length; i++) {
                                this.TZJLCotent.children[i].getChildByName("zi1").getComponent(cc.Label).string = response.data.statements[i].game_name;
                                this.TZJLCotent.children[i].getChildByName("zi2").getComponent(cc.Label).string = hqq.commonTools.formatGold2(response.data.statements[i].bet_money);
                                this.TZJLCotent.children[i].getChildByName("zi3").getComponent(cc.Label).string = hqq.commonTools.formatGold2(response.data.statements[i].income);
                                this.TZJLCotent.children[i].getChildByName("zi4").getComponent(cc.Label).string = this.formatDateTime(response.data.statements[i].create_time * 1000);
                                this.TZJLCotent.children[i].active = true;
                            }

                            for (i; i < 20; i++) {
                                this.TZJLCotent.children[i].active = false;
                            }
                            this.loading.active = false;
                            return
                        }
                    }
                    for (let i = 0; i < 20; i++) {
                        this.TZJLCotent.children[i].active = false;
                    }

                    this.TZJLPageData = [];

                    this.TZJLMaxPage = 0;
                    this.TZJLPage = 0;
                    this.TZJLMaxPageLabel.string = this.TZJLMaxPage + "";
                    this.TZJLPageLabel.string = this.TZJLPage + "";

                    this.zwsj.active = true;
                    this.loading.active = false;
                }
            }
            let failcallback = (status, forcejump, url, err, readyState) => {
                if (cc.isValid(this.node)) {
                    for (let i = 0; i < 20; i++) {
                        this.TZJLCotent.children[i].active = false;
                    }

                    this.TZJLMaxPage = 0;
                    this.TZJLPage = 0;
                    this.TZJLMaxPageLabel.string = this.TZJLMaxPage + "";
                    this.TZJLPageLabel.string = this.TZJLPage + "";

                    this.loading.active = false;
                    this.zwsj.active = true;
                }
            }
            let today = new Date();
            let nottimemap = Date.parse(new Date().toString()) / 1000;
            let url = hqq.app.server.replace("center", "game") + "/thirdgamedetail/api/getStatementByID";
            url += "?user_id=" + hqq.gameGlobal.player.id;
            url += "&game_tag=" + gametag;
            url += "&start_time=" + new Date(this.TZJLStartDate).setHours(0, 0, 0, 0) / 1000;
            url += "&end_time=" + Math.floor(new Date(this.TZJLEndDate).setHours(23, 59, 59, 999) / 1000);
            if (this.TZJLPage == 0) {
                url += "&page=1";
            } else {
                url += "&page=" + this.TZJLPage;
            }
            url += "&limit=" + 20;
            if (this.TZJLSelectGameID) {
                url += "&game_id=" + this.TZJLSelectGameID;
            }
            hqq.http.sendXMLHttpRequest({
                method: 'GET',
                urlto: url,
                callback: callback,
                failcallback: failcallback,
                needJsonParse: true,
            })
        }

        for (let i = 1; i <= 5; i++) {
            let skeleton = cc.find("personalcenter/btncontainer/tzjl/checkmark/basicInfo_bg/tabScrollView/view/tabToggleContainer/toggle" + i + "/Background").getComponent(cc.sp.Skeleton);
            if (cc.isValid(skeleton)) {
                skeleton.setAnimation(0, "animation", true);
            }
        }
        if (cc.isValid(toggle)) {
            cc.find("checkmark/setting_tabselect", toggle.node).getComponent(cc.sp.Skeleton).setAnimation(0, "animation", true);
        }
    }
    onTZJLFirstPageClick() {
        this.TZJLPage = 1;
        this.onTZJLTabClick(cc.find("personalcenter/btncontainer/tzjl/checkmark/basicInfo_bg/tabScrollView/view/tabToggleContainer/toggle" + this.TZJLTabIndex).getComponent(cc.Toggle), this.TZJLTabIndex)
    }
    onTZJLLastPageClick() {
        this.TZJLPage = this.TZJLMaxPage;
        this.onTZJLTabClick(cc.find("personalcenter/btncontainer/tzjl/checkmark/basicInfo_bg/tabScrollView/view/tabToggleContainer/toggle" + this.TZJLTabIndex).getComponent(cc.Toggle), this.TZJLTabIndex)
    }
    onTZJLNextPageClick() {
        this.TZJLPage++;
        if (this.TZJLPage > this.TZJLMaxPage) {
            this.TZJLPage = this.TZJLMaxPage;
            return;
        }
        this.onTZJLTabClick(cc.find("personalcenter/btncontainer/tzjl/checkmark/basicInfo_bg/tabScrollView/view/tabToggleContainer/toggle" + this.TZJLTabIndex).getComponent(cc.Toggle), this.TZJLTabIndex)
    }
    onTZJLPreviousPageClick() {
        this.TZJLPage--;
        if (this.TZJLPage < 1) {
            this.TZJLPage = 1;
            return;
        }
        this.onTZJLTabClick(cc.find("personalcenter/btncontainer/tzjl/checkmark/basicInfo_bg/tabScrollView/view/tabToggleContainer/toggle" + this.TZJLTabIndex).getComponent(cc.Toggle), this.TZJLTabIndex)
    }
    onTZJLSelectDateClick(event, customEventData) {
        if (!cc.isValid(this.TZJLSelectDatePanel)) {
            this.TZJLSelectGameList.active = false;
            this.TZJLSelectSortList.active = false;
            this.TZJLSelectDatePanel = cc.instantiate(this.selectDatePrefab);
            this.TZJLSelectDatePanel.getComponent("hqqDatePicker").setPickDateCallback(this.onTZJLSelectDateCallback.bind(this));
            this.node.addChildEx(this.TZJLSelectDatePanel);
        }
    }
    onTZJLSelectDateCallback(selectyear: number, selectmonth: number, selectday: number, selectyear2: number, selectmonth2: number, selectday2: number) {
        if (cc.isValid(this.TZJLSelectDateLabel) && selectyear != null &&
            selectmonth != null && selectday != null &&
            selectyear2 != null && selectmonth2 != null &&
            selectday2 != null) {
            this.TZJLStartDate = selectyear + "-";
            if (selectmonth < 10) {
                this.TZJLStartDate += "0" + selectmonth + "-";
            } else {
                this.TZJLStartDate += selectmonth + "-";
            }
            if (selectday < 10) {
                this.TZJLStartDate += "0" + selectday;
            } else {
                this.TZJLStartDate += selectday;
            }
            this.TZJLEndDate = selectyear2 + "-";
            if (selectmonth2 < 10) {
                this.TZJLEndDate += "0" + selectmonth2 + "-";
            } else {
                this.TZJLEndDate += selectmonth2 + "-";
            }
            if (selectday2 < 10) {
                this.TZJLEndDate += "0" + selectday2;
            } else {
                this.TZJLEndDate += selectday2;
            }
            if (new Date(this.TZJLStartDate) > new Date(this.TZJLEndDate)) {
                let tempdate = this.TZJLEndDate
                this.TZJLEndDate = this.TZJLStartDate;
                this.TZJLStartDate = tempdate;
            }
            this.TZJLSelectDateLabel.string = this.TZJLStartDate + "-" + this.TZJLEndDate;
            this.onTZJLTabClick(cc.find("personalcenter/btncontainer/tzjl/checkmark/basicInfo_bg/tabScrollView/view/tabToggleContainer/toggle" + this.TZJLTabIndex).getComponent(cc.Toggle), this.TZJLTabIndex);
        }
    }
    onTZJLGameXiaLaClick(event, customEventData) {
        if (cc.isValid(this.TZJLSelectGameList)) {
            if (cc.isValid(this.TZJLSelectDatePanel)) {
                this.TZJLSelectDatePanel.active = false;
            }
            if (cc.isValid(this.TZJLSelectSortList)) {
                this.TZJLSelectSortList.active = false;
            }

            this.TZJLSelectGameList.active = !this.TZJLSelectGameList.active;
            if (this.TZJLSelectGameList.active) {
                let content = cc.find("view/content", this.TZJLSelectGameList);
                content.removeAllChildren();
                for (let i = 0; i < this.YXFLList[this.TZJLTabIndex].length; i++) {
                    this.scheduleOnce(() => {
                        let tempgame = cc.instantiate(cc.find("personalcenter/btncontainer/tzjl/checkmark/basicInfo_bg/combogameitem"));
                        tempgame.active = true;
                        if (!this.YXFLList[this.TZJLTabIndex][i]) return;
                        tempgame.getChildByName("zi1").getComponent(cc.Label).string = this.YXFLList[this.TZJLTabIndex][i].gameName;
                        let tempgamebtn = tempgame.getComponent(cc.Button);
                        if (tempgamebtn.clickEvents.length === 0) {
                            let gameclickEventHandler = new cc.EventHandler();
                            gameclickEventHandler.target = this.node;
                            gameclickEventHandler.component = "hqqPersonalCenter";
                            gameclickEventHandler.handler = "onTZJLGameClick";
                            gameclickEventHandler.customEventData = i.toString();
                            tempgamebtn.clickEvents.push(gameclickEventHandler);
                        }
                        content.addChildEx(tempgame);
                    }, i * 0.1)
                }
            } else {
                this.unscheduleAllCallbacks();
                let content = cc.find("view/content", this.TZJLSelectGameList);
                content.removeAllChildren();
            }
        }
    }
    onTZJLGameClick(event, customEventData) {
        if (cc.isValid(this.TZJLSelectGameList)) {
            this.unscheduleAllCallbacks();
            let content = cc.find("view/content", this.TZJLSelectGameList);
            content.removeAllChildren();
            this.TZJLSelectGameList.active = false;
            this.TZJLSelectGameID = this.YXFLList[this.TZJLTabIndex][Number(customEventData)].gameID;
            this.TZJLSelectGameLabel.string = this.YXFLList[this.TZJLTabIndex][Number(customEventData)].gameName;
            this.onTZJLTabClick(cc.find("personalcenter/btncontainer/tzjl/checkmark/basicInfo_bg/tabScrollView/view/tabToggleContainer/toggle" + this.TZJLTabIndex).getComponent(cc.Toggle), this.TZJLTabIndex)
        }
    }
    onTZJLSortXiaLaClick(event, customEventData) {
        if (cc.isValid(this.TZJLSelectSortList)) {
            if (cc.isValid(this.TZJLSelectGameList)) {
                this.TZJLSelectGameList.active = false;
            }
            if (cc.isValid(this.TZJLSelectDatePanel)) {
                this.TZJLSelectDatePanel.active = false;
            }

            this.TZJLSelectSortList.active = !this.TZJLSelectSortList.active;
        }
    }
    onTZJLSortClick(event, customEventData) {
        if (cc.isValid(this.TZJLSelectSortList)) {
            this.loading.active = true;
            this.TZJLSelectSortList.active = false;
            // // if(this.TZJLTabIndex === 1 ){
            // //     if( customEventData === "income" ){
            // //         customEventData = "final_pay"
            // //     }
            // // }
            cc.log("onTZJLSortClick customEventData=", customEventData, " this.TZJLPageData=", this.TZJLPageData)
            this.TZJLPageData.sort((a, b) => {
                if (a[customEventData] > b[customEventData]) {
                    return -1;
                } else if (a[customEventData] < b[customEventData]) {
                    return 1;
                }
                return 0;
            })
            let i = 0;
            if (this.TZJLTabIndex === 1) {
                for (i; i < this.TZJLPageData.length; i++) {
                    this.TZJLCotent.children[i].getChildByName("zi1").getComponent(cc.Label).string = this.TZJLPageData[i].game_name;
                    this.TZJLCotent.children[i].getChildByName("zi2").getComponent(cc.Label).string = hqq.commonTools.formatGold2(this.TZJLPageData[i].bet_money);
                    this.TZJLCotent.children[i].getChildByName("zi3").getComponent(cc.Label).string = hqq.commonTools.formatGold2(this.TZJLPageData[i].income);
                    this.TZJLCotent.children[i].getChildByName("zi4").getComponent(cc.Label).string = this.formatDateTime(this.TZJLPageData[i].create_time * 1000);
                    this.TZJLCotent.children[i].active = true;
                }
            } else {
                for (i; i < this.TZJLPageData.length; i++) {
                    this.TZJLCotent.children[i].getChildByName("zi1").getComponent(cc.Label).string = this.TZJLPageData[i].game_name;
                    this.TZJLCotent.children[i].getChildByName("zi2").getComponent(cc.Label).string = hqq.commonTools.formatGold2(this.TZJLPageData[i].bet_money);
                    this.TZJLCotent.children[i].getChildByName("zi3").getComponent(cc.Label).string = hqq.commonTools.formatGold2(this.TZJLPageData[i].income);
                    this.TZJLCotent.children[i].getChildByName("zi4").getComponent(cc.Label).string = this.formatDateTime(this.TZJLPageData[i].create_time * 1000);
                    this.TZJLCotent.children[i].active = true;
                }
            }

            for (i; i < this.TZJLCotent.children.length; i++) {
                this.TZJLCotent.children[i].active = false;
            }
            let tempsortname = { "create_time": "时间", "income": "输赢", "bet_money": "投注金额", "final_pay": "输赢" }
            this.TZJLSelectSortLabel.string = tempsortname[customEventData];
            this.loading.active = false;
        }
    }
    onYLGKDayXiaLaClick(event, customEventData) {
        if (cc.isValid(this.YLGKDayList)) {
            this.YLGKDayList.active = !this.YLGKDayList.active;
        }
    }
    onYLGKDayClick(event: cc.EventTouch, customEventData) {
        this.YLGKDay = Number(customEventData);
        if (cc.isValid(this.YLGKDayList)) {
            this.YLGKDayList.active = false;
        }
        if (cc.isValid(event)) {
            this.YLGKDayLabel.string = event.target.children[0].getComponent(cc.Label).string;
        }
        this.onYLGKTabClick(cc.find("personalcenter/btncontainer/ylgk/checkmark/basicInfo_bg/tabScrollView/view/tabToggleContainer/toggle" + this.YLGKTabIndex).getComponent(cc.Toggle), this.YLGKTabIndex)
    }
    onYLGKTabClick(toggle, customEventData) {
        let gametag = Number(customEventData);
        if (gametag != this.YLGKTabIndex || customEventData === "1") {
            this.YLGKDay = 0;
            if (cc.isValid(this.YLGKDayList)) {
                this.YLGKDayList.active = false;
            }
            let target = cc.find("personalcenter/btncontainer/ylgk/checkmark/basicInfo_bg/combotimelist").children[0].children[0];
            if (cc.isValid(target)) {
                this.YLGKDayLabel.string = target.getComponent(cc.Label).string;
            }
        }
        this.YLGKTabIndex = gametag;
        this.loading.active = true;

        //https://proxy.lymrmfyp.com/Proxy/User/GetStatementTotalByID

        if (gametag === 1) {
            let callback = (response, url) => {
                if (cc.isValid(this.node)) {
                    if (response.code === 200) {
                        if (response.msg) {
                            this.tzcount.string = hqq.commonTools.formatGold2(response.msg.bet_total);
                            this.pccount.string = hqq.commonTools.formatGold2(response.msg.win_income_total);
                            this.ddcount.string = response.msg.bet_times;
                            this.income.string = hqq.commonTools.formatGold2((response.msg.win_income_total + response.msg.lose_income_total)) + "";
                            this.loading.active = false;
                            return;
                        }
                    } else if (response.code === 404 && response.msg === "token not match") {
                        let callback2 = (response, url) => {
                            if (!cc.isValid(this.node)) return;
                            if (response.code === 200) {
                                hqq.gameGlobal.proxy.token = response.msg.token;
                                this.onYLGKTabClick(toggle, customEventData);
                            } else {
                                this.loading.active = false;
                                this.tzcount.string = hqq.commonTools.formatGold2(0);
                                this.pccount.string = hqq.commonTools.formatGold2(0);
                                this.ddcount.string = 0 + "";
                                this.income.string = hqq.commonTools.formatGold2(0);
                            }
                        }
                        let failcallback2 = (status, forcejump, url, err, readyState) => {
                            if (!cc.isValid(this.node)) return;
                            this.loading.active = false;
                            this.tzcount.string = hqq.commonTools.formatGold2(0);
                            this.pccount.string = hqq.commonTools.formatGold2(0);
                            this.ddcount.string = 0 + "";
                            this.income.string = hqq.commonTools.formatGold2(0);
                        }
                        let url = hqq.gameGlobal.proxy.proxy_host + "/Proxy/User/login";

                        hqq.http.sendXMLHttpRequest({
                            method: 'POST',
                            urlto: url,
                            param: `account_name=${hqq.gameGlobal.player.account_name}&token=${hqq.gameGlobal.token}`,
                            callback: callback2,
                            failcallback: failcallback2,
                            needJsonParse: true,
                        })
                        return;
                    }
                    this.loading.active = false;
                    this.tzcount.string = "0";
                    this.pccount.string = "0";
                    this.ddcount.string = "0";
                    this.income.string = "0";
                }
            }
            let failcallback = (status, forcejump, url, err, readyState) => {
                if (cc.isValid(this.node)) {
                    this.loading.active = false;
                    this.tzcount.string = "0";
                    this.pccount.string = "0";
                    this.ddcount.string = "0";
                    this.income.string = "0";
                }
            }
            let today = new Date();
            let url = hqq.gameGlobal.proxy.proxy_host + "/Proxy/User/GetStatementTotalByID";
            url += "?token=" + hqq.gameGlobal.proxy.token;
            url += "&account_name=" + hqq.gameGlobal.player.account_name;
            url += "&game_tag=" + gametag;
            if (this.YLGKDay === 0) {
                url += "&start_date=" + this.getRangeDate(0);
                url += "&end_date=" + this.getRangeDate(0);
            } else if (this.YLGKDay === 1) {
                url += "&start_date=" + this.getRangeDate(-1);
                url += "&end_date=" + this.getRangeDate(-1);
            } else if (this.YLGKDay === 2) {
                url += "&start_date=" + this.getRangeDate(-3);
                url += "&end_date=" + this.getRangeDate(-1);
            }
            // url += "&start_time="  + new Date(new Date().toLocaleDateString()).getTime()/1000;
            // url += "&end_time="  + Date.parse(new Date().toString())/1000;
            hqq.http.sendXMLHttpRequest({
                method: 'GET',
                urlto: url,
                callback: callback,
                failcallback: failcallback,
                needJsonParse: true,
            })
        } else {
            let callback = (response, url) => {
                if (cc.isValid(this.node)) {
                    if (response.code === 0) {
                        if (response.data) {
                            this.tzcount.string = hqq.commonTools.formatGold2(response.data.bet_total);
                            this.pccount.string = hqq.commonTools.formatGold2(response.data.win_total);
                            this.ddcount.string = response.data.bet_times;
                            this.income.string = hqq.commonTools.formatGold2((response.data.win_total + response.data.lose_total)) + "";
                            this.loading.active = false;
                            return;
                        }
                    }
                    this.loading.active = false;
                    this.tzcount.string = hqq.commonTools.formatGold2(0);
                    this.pccount.string = hqq.commonTools.formatGold2(0);
                    this.ddcount.string = 0 + "";
                    this.income.string = hqq.commonTools.formatGold2(0);
                }
            }
            let failcallback = (status, forcejump, url, err, readyState) => {
                if (cc.isValid(this.node)) {
                    this.loading.active = false;
                    this.tzcount.string = hqq.commonTools.formatGold2(0);
                    this.pccount.string = hqq.commonTools.formatGold2(0)
                    this.ddcount.string = 0 + "";
                    this.income.string = hqq.commonTools.formatGold2(0);
                }
            }
            let today = new Date();
            let nottimemap = Date.parse(new Date().toString()) / 1000;
            let url = hqq.app.server.replace("center", "game") + "/thirdgamedetail/api/getStatementTotalByID";
            url += "?user_id=" + hqq.gameGlobal.player.id;
            url += "&game_tag=" + gametag;
            if (this.YLGKDay === 0) {
                url += "&start_time=" + new Date(this.getRangeDate(0)).setHours(0, 0, 0, 0) / 1000;
                url += "&end_time=" + Math.floor(new Date(this.getRangeDate(0)).setHours(23, 59, 59, 999) / 1000);
            } else if (this.YLGKDay === 1) {
                url += "&start_time=" + new Date(this.getRangeDate(-1)).setHours(0, 0, 0, 0) / 1000;
                url += "&end_time=" + Math.floor(new Date(this.getRangeDate(-1)).setHours(23, 59, 59, 999) / 1000);
            } else if (this.YLGKDay === 2) {
                url += "&start_time=" + new Date(this.getRangeDate(-3)).setHours(0, 0, 0, 0) / 1000;
                url += "&end_time=" + Math.floor(new Date(this.getRangeDate(-1)).setHours(23, 59, 59, 999) / 1000);
            }

            hqq.http.sendXMLHttpRequest({
                method: 'GET',
                urlto: url,
                callback: callback,
                failcallback: failcallback,
                needJsonParse: true,
            })
        }

        for (let i = 1; i <= 5; i++) {
            let skeleton = cc.find("personalcenter/btncontainer/ylgk/checkmark/basicInfo_bg/tabScrollView/view/tabToggleContainer/toggle" + i + "/Background").getComponent(cc.sp.Skeleton);
            if (cc.isValid(skeleton)) {
                skeleton.setAnimation(0, "animation", true);
            }
        }
        if (cc.isValid(toggle)) {
            cc.find("checkmark/setting_tabselect", toggle.node).getComponent(cc.sp.Skeleton).setAnimation(0, "animation", true);
        }
    }
    formatDateTime(time: any) {
        // 格式化日期，获取今天的日期
        const Dates = new Date(time);
        let hour = Dates.getHours();
        let strHour = (hour < 10 ? "0" + hour : hour).toString();
        let minute = Dates.getMinutes();
        let strMinute = (minute < 10 ? "0" + minute : minute).toString();
        let second = Dates.getSeconds();
        let strSecond = (second < 10 ? "0" + second : second).toString();
        return this.formatDate(time) + ' ' + strHour + ':' + strMinute + ':' + strSecond;
    };

    formatDate(time: any) {
        // 格式化日期，获取今天的日期
        const Dates = new Date(time);
        const year: number = Dates.getFullYear();
        const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
        const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
        return year + '-' + month + '-' + day;
    };

    /**
    * @param {number} range
    * @param {string} [type]
    * @memberOf VehicleOverviewComponent
    * @description 获取今天及前后天
    */
    getRangeDate(range: number, type?: string) {
        const now = this.formatDate(new Date().getTime()); // 当前时间
        const resultArr: Array<any> = [];
        let changeDate: string;
        if (range) {
            if (type) {
                if (type === 'one') {
                    changeDate = this.formatDate(new Date().getTime() + (1000 * 3600 * 24 * range));
                    return changeDate;
                }
            } else {
                changeDate = this.formatDate(new Date().getTime() + (1000 * 3600 * 24 * range));
                return changeDate;
            }
        } else {
            return now;
        }
    }
}