let commonVal = require("./public_script/proxy-http");
let gHandler = require("gHandler");
let toFloat = require("./proxy-changeFloat");
var Database = require("./public_script/Database");
let host, account_name, token;
cc.Class({
    extends: cc.Component,
    properties: {
        grid: {
            type: cc.Prefab,
            default: null,
        },
    },
    onLoad() { },
    init: function (date) {
        host = gHandler.gameGlobal.proxy.proxy_host;
        account_name = commonVal.account_name;
        token = commonVal.token;
        var self = this;

        let page = 1;
        let contentHeight = 0;
        let isStop = false;
        addMoreGrids();
        this.node.getComponent(cc.ScrollView).node.on("scrolling", callback, this);
        function callback(scrollView) {
            //   cc.log("在滑动！！！", JSON.stringify(scrollView.getScrollOffset()));
            let scrollOffsetHeight = scrollView.getScrollOffset().y;
            if (scrollOffsetHeight >= contentHeight - 48 * 15 && !isStop) {
                page++;
                cc.log("请求下一页", page);
                addMoreGrids();
                isStop = true;
            }
        }
        function addMoreGrids() {
            let gridData = [];
            let url =
                host +
                `/Proxy/User/getChildren?account_name=${account_name}&id=${account_name}&page=${page}&limit=50&token=${commonVal.token}`;
            let xhr = new XMLHttpRequest(); //readyState===0
            xhr.open("GET", url, true); //readyState===1
            xhr.send(); //readyState===2
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status === 200) {
                    const res = JSON.parse(xhr.responseText);
                    cc.log("-------------请求ids-------------", res);
                    if (res.code === 200 && res.msg) {
                        contentHeight += res.msg.length * 48;
                        self.node
                            .getChildByName("view")
                            .getChildByName("Content")
                            .setContentSize(996, contentHeight);
                        let ids = [];
                        res.msg.forEach((ele) => {
                            //4:总充值 5 团队赢 6团队输
                            gridData.push({ cell2: ele.id, cell3: 0, cell4: 0, cell5: 0, cell6: 0 });
                            ids.push(ele.id);
                        });
                        isStop = false;

                        //请求第三列佣金贡献数据
                        const p1 = new Promise((resolve) => {
                            let url2 =
                                host +
                                `/Proxy/User/getProxyUserInductionListGroupByID?account_name=${account_name}&ids=[${ids}]&page=${page}&limit=50&token=${commonVal.token}&date=${date}`;
                            cc.log("请求p1佣金贡献数据", url2, ids);
                            let xhr2 = new XMLHttpRequest(); //readyState===0
                            xhr2.open("GET", url2, true); //readyState===1
                            xhr2.send(); //readyState===2
                            xhr2.onreadystatechange = () => {
                                if (xhr2.readyState == 4 && xhr2.status === 200) {
                                    const res = JSON.parse(xhr2.responseText);
                                    cc.log("请求到的第三列p1佣金贡献数据", res);
                                    if (res.code === 200 && res.msg) {
                                        res.msg.forEach((ele) => {
                                            gridData.forEach((item) => {
                                                if (ele.proxy_user_id === item.cell2) {
                                                    if (date > "2020-06-29") {
                                                        item.cell3 += ele.statement_income * 0.35;
                                                    } else {
                                                        item.cell3 += ele.statement_income * 0.45;
                                                    }
                                                    cc.log(
                                                        "有收益的玩家是",
                                                        item.cell2,
                                                        ele.statement_income,
                                                    );
                                                }
                                            });
                                        });
                                    }
                                     resolve();
                                }
                                xhr2.abort();
                                
                            };
                        });
                        const p2 = new Promise((resolve) => {
                            let url2 =
                                host +
                                `/Proxy/User/getGameUserInductionListGroupByID?account_name=${account_name}&ids=[${ids}]&page=${page}&limit=50&token=${commonVal.token}&date=${date}`;
                            cc.log("请求p2佣金贡献数据", url2, ids);
                            let xhr2 = new XMLHttpRequest(); //readyState===0
                            xhr2.open("GET", url2, true); //readyState===1
                            xhr2.send(); //readyState===2
                            xhr2.onreadystatechange = () => {
                                if (xhr2.readyState == 4 && xhr2.status === 200) {
                                    const res = JSON.parse(xhr2.responseText);
                                    cc.log("请求第三列p2佣金贡献数据", res);
                                    if (res.code === 200 && res.msg) {
                                        res.msg.forEach((ele) => {
                                            gridData.forEach((item) => {
                                                if (ele.game_user_id === item.cell2) {
                                                    item.cell3 += ele.statement_income;
                                                    cc.log(
                                                        "有收益的玩家是",
                                                        item.cell2,
                                                        ele.statement_income,
                                                    );
                                                }
                                            });
                                        });
                                    }
                                     resolve();
                                }
                                xhr2.abort();
                                
                            };
                        });
                        const p3 = new Promise((resolve) => {
                            let num = 0;
                            for (let i = 0; i < ids.length; i++) {
                                let start_time = date + ' 00:00:00'
                                let end_time = date + ' 24:00:00'
                                let unixstart = Date.parse(start_time) / 1000
                                let unixendtime = Date.parse(end_time) / 1000
                                let url2 =
                                    host +
                                    `/Proxy/User/GetProxyLinkStatementAndPay?account_name=${account_name}&id=${ids[i]}&&token=${commonVal.token}&start_time=${unixstart}&end_time=${unixendtime}`;
                                cc.log("请求p3佣金贡献数据", url2, ids[i]);
                                let xhr2 = new XMLHttpRequest(); //readyState===0
                                xhr2.open("GET", url2, true); //readyState===1
                                xhr2.send(); //readyState===2
                              
                                xhr2.onreadystatechange = () => {
                                    if (xhr2.readyState == 4 && xhr2.status === 200) {
                                        const res = JSON.parse(xhr2.responseText);
                                        cc.log("请求第四列p3佣金贡献数据", res);
                                        if (res.code === 200 && res.msg) {
                                            num+=1;
                                            gridData.forEach((item) => {
                                                if (ids[i] === item.cell2) {
                                                    if (res.msg.pay == null) {
                                                        item.cell4 = 0
                                                    } else {
                                                        if (res.msg.pay.top_up_total != null) {
                                                            item.cell4 = res.msg.pay.top_up_total
                                                        } else {
                                                            item.cell4 = 0
                                                        }

                                                    }
                                                    if (res.msg.game == null) {
                                                        item.cell5 = 0
                                                        item.cell6 = 0
                                                    } else {
                                                        for (let o = 0; o < res.msg.game.length; o++) {
                                                            if (res.msg.game[o].lose_statement_total != null) {
                                                                item.cell5 += res.msg.game[o].lose_statement_total
                                                            } else {
                                                                item.cell5 += 0

                                                            }
                                                            if (res.msg.game[o].win_statement_total != null) {
                                                                item.cell6 += res.msg.game[o].win_statement_total
                                                            } else {
                                                                item.cell6 += 0
                                                            }
                                                        }

                                                    }
                                                    if (num == ids.length  ) {
                                                        xhr2.abort();
                                                        resolve();
                                                    }
                                                }
                                          
                                            });

                                           
                                        }
                                       
                                        
                                      

                                    }

                                };
                            }

                        });

                        Promise.all([p1, p2, p3]).then((values) => {
                            cc.log(
                                "--------Promise.all([ p1, p2，p3 ]).then((values)--------",
                                gridData,
                            );

                            gridData.forEach((item) => {
                                cc.log("promiseforEach+++++====",item)
                                let labels = {
                                    cell1: date,
                                    cell2: item.cell2,
                                    cell3: toFloat(item.cell3) || "0.00",
                                    cell4: Database.countCoinsShowLabel(item.cell4),
                                    cell5: Database.countCoinsShowLabel(item.cell5),
                                    cell6: Database.countCoinsShowLabel(item.cell6),
                                    // Database.countCoinsShowLabel(dllzls)
                                };
                                let grid = cc.instantiate(self.grid);
                                //获取预制资源中的js组件，并作出相应操作
                                let gridScript = grid.getComponent("proxy-incomedetails_grids");
                                //开始操作JS组件脚本
                                cc.log("promise+++++====",labels)
                                gridScript.setLabels(labels); //开始为JS组件进行初始化操作,setLabels 为自定义初始化方法
                                //将预制资源添加到父节点
                                self.node
                                    .getChildByName("view")
                                    .getChildByName("Content")
                                    .addChild(grid);
                            });
                        });
                    }
                    if (!res.msg) {
                        isStop = true;
                    }
                }
                xhr.abort();
            };
        }
    },
    onClose: function () {
        this.node.destroy();
    },
});
