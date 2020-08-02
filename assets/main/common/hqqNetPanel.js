let gHandler = require("gHandler");
cc.Class({
    extends: cc.Component,

    properties: {
        upnode: cc.Node,
        centernode: cc.Node,
        fresnbtn: cc.Node,

        upprocess: cc.Label,
        cneterprocess: cc.Label,

        tiplabelnode: cc.Node,
        exitbtn: cc.Node,
        curUpLine: cc.Node,
        curCenterLine: cc.Node,

        item: cc.Node,
        upScrollview: cc.ScrollView,
        centerScrollview: cc.ScrollView,
    },

    onLoad() {
        this.upgradeTempList = []
        this.upgradeListTemp = []
        this.upgradeList = []
        this.centerTempList = []
        this.centerList = []
        this.upgradeItemList = []
        this.centerItemList = []
        this.data = null
        this.upchoice = 0
        this.centerchoice = 0
        this.exitFunc = () => {
            gHandler.hasLineChoiceLayer = false
            this.node.removeFromParent(true);
            gHandler.http.stopTestLint();
            gHandler.appGlobal.checkSubServer();
        }

        this.upCurLineLabelNode = this.curUpLine.getChildByName('curlinelabel')
        this.cCurLineLabelNode = this.curCenterLine.getChildByName('curlinelabel')

        this.startUpTestBtn = this.curUpLine.getChildByName('startbtn').getComponent(cc.Button)
        this.startCenterTestBtn = this.curCenterLine.getChildByName('startbtn').getComponent(cc.Button)
    },

    start() {

    },
    init(data) {
        this.data = data
        if (data.exitFunc) {
            if (data.restartGame) {
                this.exitFunc = () => {
                    gHandler.hasLineChoiceLayer = false
                    data.exitFunc();
                    this.node.removeFromParent(true);
                    gHandler.http.stopTestLint();
                    gHandler.appGlobal.checkSubServer();
                    cc.audioEngine.stopAll();
                    cc.game.restart();
                }
            } else {
                this.exitFunc = () => {
                    gHandler.hasLineChoiceLayer = false
                    data.exitFunc();
                    this.node.removeFromParent(true);
                    gHandler.http.stopTestLint();
                    gHandler.appGlobal.checkSubServer();
                }
            }
        } else if (data.restartGame) {
            this.exitFunc = () => {
                gHandler.hasLineChoiceLayer = false
                this.node.removeFromParent(true);
                gHandler.http.stopTestLint();
                gHandler.appGlobal.checkSubServer();
                cc.audioEngine.stopAll();
                cc.game.restart();
            }
        }
        let upgradelist = gHandler.localStorage.globalGet(gHandler.appGlobal.hotServerKey)
        if (data.upgradeList) {
            upgradelist = data.upgradeList
        }
        for (let i = 0; i < upgradelist.length; i++) {
            this.upgradeTempList.push(upgradelist[i] + "/" + gHandler.appGlobal.hotupdatePath + "/" + 'version.json')
            this.upgradeTempList.push(upgradelist[i] + "/" + gHandler.appGlobal.hotupdatePath + "/" + 'version.json?' + Math.floor(Math.random() * 10000))
        }
        this.upCurLineLabelNode.getComponent(cc.Label).string = "线路" + (gHandler.appGlobal.hotServerIndex + 1);
        gHandler.http.testLine(this.upgradeTempList, this.testUpgradeCallBack.bind(this), 2);

        if (cc.director.getScene().name == "loading") {
            this.centernode.active = false
            this.upnode.x = 0
            this.fresnbtn.x = 160
        } else {
            let centerList = gHandler.localStorage.globalGet(gHandler.appGlobal.serverListKey)
            if (data.centerList) {
                centerList = data.centerList
            }
            for (let i = 0; i < centerList.length; i++) {
                this.centerTempList.push(centerList[i] + "/checked")
            }
            this.cCurLineLabelNode.getComponent(cc.Label).string = "线路" + (gHandler.appGlobal.serverIndex + 1);
            gHandler.http.testLine(this.centerTempList, this.testCenterCallBack.bind(this), 1);
        }

        this.exitbtn.active = !data.notshowexitbtn
        this.tiplabelnode.active = !data.notshowexitbtn

        if (data && data.uptime && data.centertime) {
            this.refreshCurUpLine(data.uptime, gHandler.appGlobal.hotServerIndex);
            this.refreshCurCenterLine(data.centertime, gHandler.appGlobal.serverIndex);
        }
    },
    testUpgradeCallBack(url, index, spendtime, err) {
        // err && console.log("err", err)
        let stime = 0
        let myindex = Math.floor(index / 2)
        if (this.upgradeListTemp[myindex]) {
            stime = this.upgradeListTemp[myindex].time < spendtime ? spendtime : this.upgradeListTemp[myindex].time
            err = err ? err : this.upgradeListTemp[myindex].err
            this.upgradeList.push({ url: url, index: myindex, time: stime, err: err })
            if (gHandler.appGlobal.hotServerIndex == myindex) {
                this.refreshCurUpLine(stime, myindex)
            }
            this.upgradeList.sort(function (a, b) {
                if (a.err) {
                    return 1
                } else if (b.err) {
                    return -1
                } else {
                    return a.time - b.time
                }
            })
            this.refreshUpScrollView(this.upgradeList)
            this.refreshUpProcess(this.upgradeList.length)
        } else {
            this.upgradeListTemp[myindex] = { url: url, index: myindex, time: spendtime, err: err }
        }
        // if ((index + 1) == this.upgradeTempList.length) {
        //     this.startUpTestBtn.interactable = true
        // }
    },
    testCenterCallBack(url, index, spendtime, err) {
        this.centerList.push({ url: url, index: index, time: spendtime, err: err })
        this.centerList.sort(function (a, b) {
            if (a.err) {
                return 1
            } else if (b.err) {
                return -1
            } else {
                return a.time - b.time
            }
        })
        if (gHandler.appGlobal.serverIndex == index) {
            this.refreshCurCenterLine(spendtime, index)
        }
        this.refreshCenterScrollView(this.centerList)
        this.refreshCenterProcess(this.centerList.length)
        // if ((index + 1) == this.centerTempList.length) {
        //     this.startCenterTestBtn.interactable = true
        // }
    },
    refreshCurUpLine(spendtime, index) {
        let color = this.getColor(spendtime)
        this.upCurLineLabelNode.color = color
        this.upCurLineLabelNode.getComponent(cc.Label).string = "线路" + (index + 1)
        let speed = this.curUpLine.getChildByName('speed')
        speed.color = color
        speed.getComponent(cc.Label).string = spendtime + "ms"
    },
    refreshCurCenterLine(spendtime, index) {
        let color = this.getColor(spendtime)
        this.cCurLineLabelNode.color = color
        this.cCurLineLabelNode.getComponent(cc.Label).string = "线路" + (index + 1)
        let speed = this.curCenterLine.getChildByName('speed')
        speed.color = color
        speed.getComponent(cc.Label).string = spendtime + "ms"
    },
    refreshUpScrollView(list) {
        this.upScrollview.content.height = list.length * this.item.height
        for (let i = 0; i < list.length; i++) {
            if (this.upgradeItemList[i]) {
                this.upgradeItemList[i].active = true
            } else if (i >= this.upgradeItemList.length) {
                let item = cc.instantiate(this.item)
                let x = 0
                let y = -i * this.item.height
                item.setPosition(x, y)
                item.active = true
                this.upScrollview.content.addChild(item)
                this.upgradeItemList.push(item)
                var clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node;
                clickEventHandler.component = "hqqNetPanel";
                clickEventHandler.handler = "onClickChoiceCurUpLine";
                let button = item.getChildByName('choicebtn').getComponent(cc.Button);
                button.clickEvents.push(clickEventHandler);
            }
            let color = this.getColor(list[i].time)
            let curline = this.upgradeItemList[i].getChildByName('curline')
            curline.color = color
            curline.getComponent(cc.Label).string = "线路" + (list[i].index + 1)
            let speed = this.upgradeItemList[i].getChildByName('speed')
            speed.color = color
            let btn = this.upgradeItemList[i].getChildByName('choicebtn').getComponent(cc.Button)
            btn._myinfo = list[i]
            btn.clickEvents[0].customEventData = i + "/" + list[i].index
            if (list[i].err) {
                btn.interactable = false
                speed.getComponent(cc.Label).string = "-----"
            } else {
                btn.interactable = true
                speed.getComponent(cc.Label).string = list[i].time + "ms"
            }
        }
    },
    refreshCenterScrollView(list) {
        this.centerScrollview.content.height = list.length * this.item.height
        for (let i = 0; i < list.length; i++) {
            if (this.centerItemList[i]) {
                this.centerItemList[i].active = true
            } else if (i >= this.centerItemList.length) {
                let item = cc.instantiate(this.item)
                let x = 0
                let y = -i * this.item.height
                item.setPosition(x, y)
                item.active = true
                this.centerScrollview.content.addChild(item)
                this.centerItemList.push(item)
                var clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node;
                clickEventHandler.component = "hqqNetPanel";
                clickEventHandler.handler = "onClickChoiceCurCenterLine";
                let button = item.getChildByName('choicebtn').getComponent(cc.Button);
                button.clickEvents.push(clickEventHandler);
            }
            let color = this.getColor(list[i].time)
            let curline = this.centerItemList[i].getChildByName('curline')
            curline.color = color
            curline.getComponent(cc.Label).string = "线路" + (list[i].index + 1)
            let speed = this.centerItemList[i].getChildByName('speed')
            speed.color = color
            let btn = this.centerItemList[i].getChildByName('choicebtn').getComponent(cc.Button)
            btn._myinfo = list[i]
            btn.clickEvents[0].customEventData = i + "/" + list[i].index
            if (list[i].err) {
                btn.interactable = false
                speed.getComponent(cc.Label).string = "-----"
            } else {
                btn.interactable = true
                speed.getComponent(cc.Label).string = list[i].time + "ms"
            }
        }
    },
    getColor(time) {
        if (time <= gHandler.appGlobal.netState.outstanding) {
            return cc.color(146, 255, 24)
        } else if (time <= gHandler.appGlobal.netState.good) {
            return cc.color(255, 185, 29)
        } else if (time <= gHandler.appGlobal.netState.kind) {
            return cc.color(255, 21, 36)
        } else if (time <= gHandler.appGlobal.netState.bad) {
            return cc.color(145, 145, 145)
        } else {
            return cc.color(255, 255, 255)
        }
    },
    onClickExit() {
        this.exitFunc()
    },
    onClickQuikLogin() {
        if (this.upgradeList[0] && !this.upgradeList[0].err) {
            gHandler.appGlobal.hotServerIndex = this.upgradeList[0].index;
            gHandler.localStorage.globalSet(gHandler.appGlobal.hotServerIndexKey, gHandler.appGlobal.hotServerIndex);
            gHandler.appGlobal.canHotServer = this.data.upgradeList[this.upgradeList[0].index];
            gHandler.localStorage.globalSet(gHandler.appGlobal.canHotServerKey, gHandler.appGlobal.canHotServer);
        } else {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "暂未检测到可用线路，请稍后...")
            return
            // gHandler.appGlobal.canHotServer = this.data.upgradeList[gHandler.appGlobal.hotServerIndex];
        }
        if (cc.director.getScene().name != "loading") {
            if (this.centerList[0] && !this.centerList[0].err) {
                gHandler.appGlobal.server = this.data.centerList[this.centerList[0].index];
                gHandler.localStorage.globalSet(gHandler.appGlobal.serverKey, gHandler.appGlobal.server);
                gHandler.appGlobal.serverIndex = this.centerList[0].index;
                gHandler.localStorage.globalSet(gHandler.appGlobal.serverIndexKey, this.centerList[0].index);
            } else {
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "暂未检测到可用线路，请稍后...")
                return
                // gHandler.appGlobal.server = this.data.centerList[gHandler.appGlobal.serverIndex];
            }
        }
        this.onClickExit()
    },
    onClickChoiceCurUpLine(event, customEventData) {
        for (let i = 0; i < this.upgradeItemList.length; i++) {
            let btn = this.upgradeItemList[i].getChildByName('choicebtn').getComponent(cc.Button)
            if (btn.clickEvents[0].customEventData == customEventData || btn._myinfo.err) {
                btn.interactable = false
            } else {
                btn.interactable = true
            }
        }
        let infolist = customEventData.split("/")
        let index0 = parseInt(infolist[0])
        let index1 = parseInt(infolist[1])
        this.upchoice = index0 + 1
        gHandler.appGlobal.canHotServer = this.data.upgradeList[index1];
        gHandler.localStorage.globalSet(gHandler.appGlobal.canHotServerKey, gHandler.appGlobal.canHotServer);

        gHandler.appGlobal.hotServerIndex = index1;
        gHandler.localStorage.globalSet(gHandler.appGlobal.hotServerIndexKey, index1);
        this.refreshCurUpLine(this.upgradeList[index0].time, index1)

        if (cc.director.getScene().name == "loading" || this.centerchoice) {
            this.onClickExit()
        }
    },
    onClickChoiceCurCenterLine(event, customEventData) {
        for (let i = 0; i < this.centerItemList.length; i++) {
            let btn = this.centerItemList[i].getChildByName('choicebtn').getComponent(cc.Button)
            if (btn.clickEvents[0].customEventData == customEventData || btn._myinfo.err) {
                btn.interactable = false
            } else {
                btn.interactable = true
            }
        }
        let infolist = customEventData.split("/")
        let index0 = parseInt(infolist[0])
        let index1 = parseInt(infolist[1])
        this.centerchoice = index0 + 1
        gHandler.appGlobal.server = this.data.centerList[index1];
        gHandler.localStorage.globalSet(gHandler.appGlobal.serverKey, gHandler.appGlobal.server);

        gHandler.appGlobal.serverIndex = index1;
        gHandler.localStorage.globalSet(gHandler.appGlobal.serverIndexKey, index1);
        this.refreshCurCenterLine(this.centerList[index0].time, index1)
        if (this.upchoice) {
            this.onClickExit()
        }
    },

    // onClickStartUpTest() {
    //     this.startUpTestBtn.interactable = false
    //     for (let i = 0; i < this.upgradeItemList.length; i++) {
    //         this.upgradeItemList[i].active = false
    //     }
    //     this.upgradeList = []
    //     this.upgradeListTemp = []
    //     gHandler.http.testLine(this.upgradeTempList, this.testUpgradeCallBack.bind(this), 2)
    // },
    // onClickStartCenterTest() {
    //     this.startCenterTestBtn.interactable = false
    //     for (let i = 0; i < this.centerItemList.length; i++) {
    //         this.centerItemList[i].active = false
    //     }
    //     this.centerList = []
    //     gHandler.http.testLine(this.centerTempList, this.testCenterCallBack.bind(this), 1)
    // },

    refreshUpProcess(curnun) {
        let len = this.upgradeTempList.length / 2
        if (curnun < len) {
            this.upprocess.string = curnun + "/" + len + " 线路检测中，请稍候..."
        } else {
            this.upprocess.string = "线路检测完毕"
        }
    },
    refreshCenterProcess(curnun) {
        if (curnun < this.centerTempList.length) {
            this.cneterprocess.string = curnun + "/" + this.centerTempList.length + " 线路检测中，请稍候..."
        } else {
            this.cneterprocess.string = "线路检测完毕"
        }
    },
    refreshTest() {
        this.onClickExit()
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showLineChoiceLayer, this.data)
    }
    // update (dt) {},
});
