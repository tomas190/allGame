let gHandler = require("gHandler");
var Database = require("./Database");
let md5 = require('../md5-node/index');
let commonVal = {
    account_name: "",
    token: "",
    package_id: "",
    balance: "",
    ids: [],
    gametags: '1',
    page: 1,
    // 1. 接口 user/createDividendRule   
    createDividendRule() {
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("POST", host + "/proxy/user/createDividendRule", true);
        xhr_test.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        //     URL http://161.117.178.174:12350/proxy/user/createDividendRule
        //     METHOD POST
        //     CONTEXT - TYPE application / x - www - form - urlencoded
        //     PARAMS {
        //       account_name 用户ID
        //       token 密匙
        //       child_id 下级ID
        //       type 分红类型(1.流失 2.亏损)
        //       game_tag 游戏分类
        //       demand_type 统计类型(1.流失 2.亏损)
        //       demand_tag 统计类型方式(1.当前游戏分类 2.所有游戏分类)
        //       amount 统计金额要求
        //       percent 分红比例
        //     }

        // child_id ：  你可以使用  564929217,  845605930,  这两个
        // type 分红类型(1.流失 2.亏损)   随你设置,  设置后不能修改
        //game_tag 游戏分类1  棋牌类型游戏 2. 彩票类型游戏 3. 体育类型游戏   4. 视讯类型游戏
        //amount 统计金额要求         30000        
        //percent 分红比例                  30


        //本地测试
        var sendData = `account_name=${gHandler.gameGlobal.player.account_name
            }&token=${commonVal.token}&child_id=526136062&type=1&game_tag=1&demand_type=1&demand_tag=2&amount=30000&percent=30`;


        cc.log("/proxy/user/createDividendRule请求:", sendData);

        xhr_test.send(sendData);

        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);

                cc.log("/proxy/user/createDividendRule返回", resData);
                xhr_test.abort();

            }
        };
    },
    // //2 接口2  .setDividendRule  
    setDividendRule() {
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("POST", host + "/proxy/user/setDividendRule", true);
        xhr_test.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // { 
        // account_name 用户ID        
        // token 密匙        
        // rule_id 规则ID(规则的_id字段)        
        // amount 统计金额要求        
        // percent 分红比例 }  

        var sendData = `account_name=${gHandler.gameGlobal.player.account_name
            }&token=${commonVal.token}&rule_id=2&amount=30000&percent=30`;

        cc.log('sendData', sendData);
        cc.log("/proxy/user/setDividendRule请求:", sendData);
        xhr_test.send(sendData);
        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("/proxy/user/setDividendRule返回", resData);
                xhr_test.abort();

            }
        };
    },
    // // 3. 接口 getDividendRule 
    getDividendRule(poxy_id, a) {
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        // PARAMS { 
        //     account_name 用户ID         
        //     token 密匙         
        //     id 用户ID - 
        //     type 分红类型(1.流失 2.亏损) 可选 
        //     - game_tag 游戏分类 可选  &game_tag=${commonVal.gametags}
        //  }
        xhr_test.open("GET", host + `/proxy/user/getDividendRule?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&id=${poxy_id}`, true);
        console.log(`3. 接口 getDividendRule?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}`);
        xhr_test.send();


        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                if (resData.msg != null) {
                    Database.Allrule = resData.msg;

                    for (let i = 0; i < resData.msg.length; i++) {
                        if (resData.msg[i].demand_type == 1) {
                            Database.game_tag.push(resData.msg[i].game_tag)
                        }

                    }
                    Database.game_tag = Database.unique(Database.game_tag)//去重
                    a(resData.msg)
                }

                cc.log("http 公用方法返回getDividendRule返回", resData, Database.game_tag);

                xhr_test.abort();

            }
        };
    },
    // //4 接口 // 获取流水分红信息 GetStatementDividendInfo
    GetStatementDividendInfo(game_num, token, first_date, last_date, a) {

        //  URL http: //161.117.178.174:12350/proxy/user/GetStatementDividendInfo
        //  METHOD GET
        //  PARAMS {
        //      account_name 用户ID
        //      token 密匙
        //      game_tag 游戏分类
        //      first_date 开始时间(2020-05-18)
        //      last_date 结束时间
        //  }
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("GET", host + `/proxy/user/GetStatementDividendInfo?account_name=${gHandler.gameGlobal.player.account_name}&token=${token}&game_tag=${game_num}&first_date=${first_date}&last_date=${last_date}`, true);

        console.log('4 num===', game_num, `GetStatementDividendInfo?account_name=${gHandler.gameGlobal.player.account_name}&token=${token}`);
        xhr_test.send();
        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status == 200) {

                var resData = JSON.parse(xhr_test.responseText);
                if (resData.code == 404) {
                    let txt = Database.Switchtext(resData.msg)
                    cc.log(txt);
                    // gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, txt)
                }
                cc.log("p4 /proxy/user/GetStatementDividendInfo返回", resData);
                if (resData.msg) {
                    Database.formatData1(resData.msg);
                }

                a();
                xhr_test.abort();

            }
        }

    },
    //5 接口 // 获取亏损分红信息 GetDeficitDividendInfo
    GetDeficitDividendInfo(game_num, first_date, last_date, a) {
        //  URL http: //161.117.178.174:12350/proxy/user/GetDeficitDividendInfo
        //  METHOD GET
        //  PARAMS {
        //      account_name 用户ID
        //      token 密匙
        //      game_tag 游戏分类
        //      first_date 开始时间(2020 - 05 - 18)
        //      last_date 结束时间
        //  }
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("GET", host + `/proxy/user/GetDeficitDividendInfo?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&game_tag=${game_num}&first_date=${first_date}&last_date=${last_date}`, true);

        console.log(`5接口 GetDeficitDividendInfo?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}`);

        xhr_test.send();
        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("/proxy/user/GetDeficitDividendInfo返回", resData);
                Database.formatData2(resData.msg)
                a()
                xhr_test.abort();

            }
        };
    },
    //6 接口 // 获取亏损分红信息 GetDeficitDividendInfo
    GetPaymentDividendInfo(game_num, first_date, last_date, a) {
        //  URL http: //161.117.178.174:12350/proxy/user/GetPaymentDividendInfo
        //  METHOD GET
        //  PARAMS {
        //      account_name 用户ID
        //      token 密匙
        //      game_tag 游戏分类
        //      first_date 开始时间(2020 - 05 - 18)
        //      last_date 结束时间
        //  }
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("GET", host + `/proxy/user/GetPaymentDividendInfo?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&game_tag=0&first_date=${first_date}&last_date=${last_date}`, true);
        console.log(`p6 获取亏损分 GetPaymentDividendInfo?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}`);

        xhr_test.send();
        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("/proxy/user/GetPaymentDividendInfo返回", resData);
                Database.formatData3(resData.msg)
                a()
                // xhr_test.abort();
            }

        };
    },
    getchild(id, a) { //得到下级
        let host = gHandler.gameGlobal.proxy.proxy_host;
        let account_name = commonVal.account_name;
        let token = commonVal.token;
        let page = 1;
        const url = host +
            `/Proxy/User/getChildren?id=${account_name}&account_name=${account_name}&&page=${page}&limit=30&token=${token}`;
        cc.log('得到下级', url);
        var xhr = new XMLHttpRequest(); //readyState===0
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status === 200) {
                const res = JSON.parse(xhr.responseText);
                if (res.code === 200) {
                    cc.log("getchild 返回内容", res);

                    if (res.msg) {
                        Database.xjdlmx = res.msg
                    } else {
                        Database.xjdlmx = []
                    }

                    a()

                }
                xhr.abort();
            }

        };
        xhr.open("GET", url, true);
        xhr.send();
    },

    // // 6. 接口 getDividendRule  只为获得 规则
    getDividendRuleonetype(game_tag, typen, a) {
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        // PARAMS { 
        //     account_name 用户ID         
        //     token 密匙         
        //     id 用户ID - 
        //     type 分红类型(1.流失 2.亏损) 可选 
        //     - game_tag 游戏分类 可选  &game_tag=${commonVal.gametags}
        //  }
        xhr_test.open("GET", host + `/proxy/user/getDividendRule?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&id=${gHandler.gameGlobal.player.account_name}&type=${typen}&game_tag=${game_tag}`, true);
        xhr_test.send();

        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                if (resData.msg != null) {
                    a(resData.msg)
                    if (resData.msg != []) {
                        Database.yf_demand_tag = resData.msg[0].demand_tag
                        Database.yf_demand_type = resData.msg[0].demand_type

                    }
                }
                cc.log("用方法返回getDividendRule返回 傻傻的 参数", resData, Database.yf_demand_tag, Database.yf_demand_type);

                xhr_test.abort();

            }

        };
    },
    getallchilds(id) { //得到下级
        let host = gHandler.gameGlobal.proxy.proxy_host;
        let account_name = commonVal.account_name;
        let token = commonVal.token;

        const url = host +
            `/Proxy/User/getChildren?id=${account_name}&account_name=${account_name}&&page=${this.page}&limit=30&token=${token}`;

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status === 200) {
                const res = JSON.parse(xhr.responseText);
                if (res.code === 200) {
                    this.page++;

                    if (res.msg != null) {
                        for (let i = 0; i < res.msg.length; i++) {
                            Database.xjdlmxs.push(res.msg[i]);
                        }
                        if (res.msg.length == 30) {
                            this.getallchilds(id)
                        }
                    }

                }

            }


        };
        xhr.open("GET", url, true);

        xhr.send();
    },
    getchilder(id, a) { //得到下级
        let host = gHandler.gameGlobal.proxy.proxy_host;
        let account_name = commonVal.account_name;
        let page = 1;
        const url = host +
            `/Proxy/User/getChildren?id=${account_name}&account_name=${account_name}&&page=${page}&limit=30&token=${commonVal.token}&proxy_user_id=${id}`;
        cc.log('得到下级', url);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status === 200) {
                const res = JSON.parse(xhr.responseText);
                if (res.code === 200) {
                    cc.log("getchild 返回内容", res);

                    if (res.msg) {
                        Database.xjdlmx = res.msg
                    } else {
                        Database.xjdlmx = []
                    }

                    a()

                }
                xhr.abort();
            }

        };
        xhr.open("GET", url, true);
        xhr.send();
    },
    getallchilds9(id, a, page) { //得到下级
        let host = gHandler.gameGlobal.proxy.proxy_host;
        let account_name = commonVal.account_name;


        const url = host +
            `/Proxy/User/getChildren?id=${account_name}&account_name=${account_name}&page=${page}&limit=24&token=${commonVal.token}`;

        console.log('getallchilds9 次数', url);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status === 200) {
                const res = JSON.parse(xhr.responseText);
                if (res.code === 200) {

                    cc.log("getalllchild9 返回内容", this.page, res);
                    if (gHandler.app.pinpai == 'huaxing' && Database.loadview != null) {
                        Database.loadview.active = false;
                    }
                    if (res.msg != null) {

                        Database.page9_wjmx = res.msg;

                        a()

                    }

                }

            }

        };
        xhr.open("GET", url, true);
        xhr.send();
    },
    getProxyUserNumber(ids, a) { //得到下级团队人数
        let host = gHandler.gameGlobal.proxy.proxy_host;
        let account_name = commonVal.account_name;
        //http://proxy.lymrmfyp.com/proxy/User/GetProxyUserNumber?account_name=375087785&ids=%5B622106574,643129297%5D&token=d26a4fcc9c15354a1a9227ab32e9b2bc
        const url = host +
            `/Proxy/User/GetProxyUserNumber?ids=[${ids}]&account_name=${account_name}&token=${commonVal.token}`;
        cc.log('GetProxyUserNumber', url);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status === 200) {
                const res = JSON.parse(xhr.responseText);
                if (res.code === 200) {

                    cc.log("GetProxyUserNumber 返回内容", res.msg);

                    if (res.msg != null) {
                        cc.log(Database.page9_wjmx, '======Database.page9_wjmx');
                        for (let index = 0; index < res.msg.length; index++) {
                            for (let i = 0; i < Database.page9_wjmx.length; i++) {
                                if (Database.page9_wjmx[i].id == res.msg[index].id) {
                                    Database.page9_wjmx[i].count = res.msg[index].count
                                }

                            }

                        }

                    }
                    a()

                }

            }

        };
        xhr.open("GET", url, true);
        xhr.send();
    },
    //查询下级的查询保底分成规则
    Center_GetBaseDividendRule(id, a) {


        let host = gHandler.gameGlobal.proxy.proxy_host;
        var xhr_test = new XMLHttpRequest();

        xhr_test.open("GET", host + `/proxy/user/GetBaseDividendRule?id=${id}&account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}`, true);

        cc.log(host + `/proxy/user/GetBaseDividendRule?id=${id}&account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}`);


        xhr_test.send();
        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);

                //得到数据渲染
                if (resData.msg == null) {
                    if (gHandler.app.pinpai == 'xinlong') {
                        Database.page9_aumont = '60'
                    } else if (gHandler.app.pinpai == 'huangshi' || gHandler.app.pinpai == 'juding') {
                        //默认100
                        Database.page9_aumont = '100'
                    } else {
                        //默认80 
                        Database.page9_aumont = '80'
                    }

                } else {
                    Database.page9_aumont = '' + resData.msg.income
                }
                cc.log('Database.page9_aumont===', Database.page9_aumont);
                a()
                xhr_test.abort();
            }

        };

    },
    //查询自己的查询保底分成规则 无限代保底分红
    GetBaseDividendRule(a) {

        // http://proxy.lymrmfyp.com/proxy/User/GetBaseDividendRule?token=3dbcddb1bc40623a0370ca87a64b5f96&account_name=750086613


        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();

        xhr_test.open("GET", host + `/proxy/user/GetBaseDividendRule?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&id=${gHandler.gameGlobal.player.account_name}`, true);
        xhr_test.send();




        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("/proxy/user/GetBaseDividendRule 测试返回", resData);

                if (resData.msg == null) {
                    if (gHandler.app.pinpai == 'xinlong') {
                        Database.page9_plaumont = '60元。'
                    } else if (gHandler.app.pinpai == 'huangshi' || gHandler.app.pinpai == 'juding') {
                        Database.page9_plaumont = '100元。'
                    } else {
                        Database.page9_plaumont = '80元。'
                    }


                } else {
                    Database.page9_plaumont = resData.msg.income + '元.'

                }

                a();
                xhr_test.abort();
            }

        };



    },
    //查询自己的查询保底分成规则
    c_GetBaseDividendRule(a) {

        // http://proxy.lymrmfyp.com/proxy/User/GetBaseDividendRule?token=3dbcddb1bc40623a0370ca87a64b5f96&account_name=750086613
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();

        xhr_test.open("GET", host + `/proxy/user/GetBaseDividendRule?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&id=${gHandler.gameGlobal.player.account_name}`, true);
        xhr_test.send();


        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("/proxy/user/c_GetBaseDividendRule返回", resData);

                if (resData.msg == null) {
                    if (gHandler.app.pinpai == 'xinlong') {
                        Database.page9_gz_plaumont = 60
                    } else if (gHandler.app.pinpai == 'huangshi') {
                        Database.page9_gz_plaumont = 100
                    } else {
                        Database.page9_gz_plaumont = 80
                    }

                } else {
                    Database.page9_gz_plaumont = resData.msg.income
                }

                a();
                xhr_test.abort();
            }

        };



    },
    SetBaseDividendRule(ids, money, a) {
        // http://proxy.lymrmfyp.com/proxy/User/SetBaseDividendRule
        // account_name = 917942181  //当前玩家ID
        // token =        //当前玩家token
        // child_id =    //直属玩家ID
        // income =    //每万 多少元


        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("POST", host + "/proxy/user/SetBaseDividendRule", true);
        xhr_test.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");


        var sendData = `account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&child_id=${ids}&income=${money}`;




        xhr_test.send(sendData);

        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("SetBaseDividendRule返回", resData);
                if (resData.status == "SUCCESS") {
                    Database.page9_aumont = money;
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '设置成功')
                } else {
                    if (resData.msg.indexOf('income between') == -1) {
                        gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '超出设置区间, 设置失败')
                    } else {
                        cc.log('报错了');
                        let txt = resData.msg
                        cc.log(txt);
                        gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, txt)
                    }

                }


                a();
                xhr_test.abort();
            }

        };
    },
    //page10 获取保底分红发放详情
    GetBaseDividendInfo(first, last, a) {
        cc.log('first===', first, 'last===', last);

        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();

        xhr_test.open("GET", host + `/proxy/user/GetBaseDividendInfo?account_name=${gHandler.gameGlobal.player.account_name}&first_date=${first}&last_date=${last}&token=${commonVal.token}`, true);




        xhr_test.send();


        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                // //得到数据渲染

                if (resData.code == 404) {
                    let txt = Database.Switchtext(resData.msg) //检索提示
                    cc.log(txt);
                    // gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, txt)//发起提示
                }
                cc.log("p10       /proxy/user/GetBaseDividendInfo", resData);
                if (resData.msg) {
                    Database.formatData10(resData.msg);
                }

                a();
                xhr_test.abort();
            }

        };

    },
    //p10 获取直属玩家业绩接口
    GetGameUserInductions(ids, ic, ends, end_time, a) {
        // http://proxy.lymrmfyp.com/proxy/User/GetGameUserInductions?account_name=716896002&ids=%5B368964697,325209954%5D&start_time=1619020800&end_time=1619107200&game_tags=%5B1%5D&token=3c4188260e602ac0af93dadb68c723bb
        //时间戳每日差 86400

        //改为 GetGameUserInductionsSortByGameTag 接口
        let end = Database.getUnixtimestamp(end_time)
        let start = Database.getUnixtimestamp0(end_time);

        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        if (gHandler.app.pinpai == 'xinlong') {
            xhr_test.open("GET", host + `/proxy/user/GetGameUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&ids=[${ids}]&start_time=${start}&end_time=${end}&token=${commonVal.token}&game_tags=[1]`, true);
        } else {
            xhr_test.open("GET", host + `/proxy/user/GetGameUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&ids=[${ids}]&start_time=${start}&end_time=${end}&token=${commonVal.token}&game_tags=[1,5]`, true);
        }



        xhr_test.send();


        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("p10   /proxy/user/GetGameUserInductionsSortByGameTag 返回", resData);
                // //得到数据渲染

                let zswj = 0;

                if (resData.msg != null) {
                    let data_key = Object.keys(resData.msg)
                    let data_msg = resData.msg;
                    for (let a = 0; a < data_key.length; a++) {
                        for (let i = 0; i < data_msg[data_key[a]].length; i++) {
                            if (data_msg[data_key[a]][i].base_dividend_type == 1) {
                                zswj += (parseFloat(data_msg[data_key[a]][i].win_total) + Math.abs(parseFloat(data_msg[data_key[a]][i].lose_total))) * data_msg[data_key[a]][i].base_dividend_discount / 100
                            } else if (data_msg[data_key[a]][i].base_dividend_type == 2) {
                                zswj += parseFloat(data_msg[data_key[a]][i].bet_total * data_msg[data_key[a]][i].base_dividend_discount / 100)
                            }

                        }

                    }

                    for (let s = 0; s < Database.data10.length; s++) {

                        if (Database.data10[s].date == end_time) {

                            Database.data10[s].zswjyj = zswj
                        }


                    }

                } else {
                    cc.log('没有值', end_time);
                }

                a();
                xhr_test.abort();

            }

        };

    },

    //p10 xj 获取下级某个直属玩家业绩接口
    p10_GetGameUserInductions(ids, end_time, a) {
        console.log('p10 xj 获取下级某个直属玩家业绩接口');
        // http://proxy.lymrmfyp.com/proxy/User/GetGameUserInductions?account_name=716896002&ids=%5B368964697,325209954%5D&start_time=1619020800&end_time=1619107200&game_tags=%5B1%5D&token=3c4188260e602ac0af93dadb68c723bb
        //时间戳每日差 86400
        let end = Database.getUnixtimestamp(end_time)
        let start = Database.getUnixtimestamp0(end_time)

        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        if (gHandler.app.pinpai == 'xinlong') {
            xhr_test.open("GET", host + `/proxy/user/GetGameUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&ids=[${ids}]&start_time=${start}&end_time=${end}&token=${commonVal.token}&game_tags=[1]`, true);
        } else if (gHandler.app.pinpai == 'juding' || gHandler.app.pinpai == 'huaxing' || gHandler.app.pinpai == 'tianqi') {
            xhr_test.open("GET", host + `/proxy/user/GetGameUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&ids=[${ids}]&start_time=${start}&end_time=${end}&token=${commonVal.token}&game_tags=[${Database.p10_num}]`, true);

        } else {
            xhr_test.open("GET", host + `/proxy/user/GetGameUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&ids=[${ids}]&start_time=${start}&end_time=${end}&token=${commonVal.token}&game_tags=[1,5]`, true);
        }


        xhr_test.send();


        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                // cc.log("p10 下级脚本 /proxy/user/GetGameUserInductionsSortByGameTag 返回", resData);
                // //得到数据渲染

                let zswj = 0;
                if (resData.msg != null) {
                    let data_key = Object.keys(resData.msg)
                    let data_msg = resData.msg;
                    for (let a = 0; a < data_key.length; a++) {
                        for (let i = 0; i < data_msg[data_key[a]].length; i++) {
                            if (data_msg[data_key[a]][i].bet_total != 0 || data_msg[data_key[a]][i].lose_total != 0 || data_msg[data_key[a]][i].win_total != 0) {
                                console.log('id = ', data_key[a], 'win_total=', data_msg[data_key[a]][i].win_total, 'lose_total=', data_msg[data_key[a]][i].lose_total, 'bet_money=', data_msg[data_key[a]][i].bet_total);
                            }
                            if (data_msg[data_key[a]][i].base_dividend_type == 1) {
                                zswj += (parseFloat(data_msg[data_key[a]][i].win_total) + Math.abs(parseFloat(data_msg[data_key[a]][i].lose_total))) * data_msg[data_key[a]][i].base_dividend_discount / 100
                            } else if (data_msg[data_key[a]][i].base_dividend_type == 2) {
                                zswj += parseFloat(data_msg[data_key[a]][i].bet_total * data_msg[data_key[a]][i].base_dividend_discount / 100)
                            }

                        }

                    }
                    for (let s = 0; s < Database.wxd.length; s++) {
                        // console.log('请求数据 ids===',ids);
                        if (Database.wxd[s].id == ids && Database.wxd[s].date == end_time) {

                            Database.wxd[s].zswjyj = zswj
                        }

                    }
                } else {
                    cc.log('没有值', end_time);
                    for (let s = 0; s < Database.wxd.length; s++) {
                        if (Database.wxd[s].id == ids && Database.wxd[s].date == end_time) {

                            Database.wxd[s].zswjyj = 0
                        }

                    }
                }

                a();
                xhr_test.abort();
            }


        };

    },
    //p6富鑫得到 我的比例用于比较
    p6sgetDividendRule() {
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        // PARAMS { 
        //     account_name 用户ID         
        //     token 密匙         
        //     id 用户ID -  
        //     type 分红类型(1.流失 2.亏损) 可选 
        //     - game_tag 游戏分类 可选
        //  }
        xhr_test.open("GET", host + `/proxy/user/getDividendRule?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&id=${gHandler.gameGlobal.player.account_name}&game_tag=0&type=3`, true);
        xhr_test.send();

        xhr_test.onreadystatechange = () => {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("/proxy/user/getDividendRule返回   p6自己比例", resData);
                //得到数据渲染
                Database.p6_fx_percent = parseInt(resData.msg[0].percent);
                xhr_test.abort();
            }

        };
    },
    //p1 新规则查询7日详情
    GetProxyUserLinkBet(start, end, a) {
        Database.p1_seven_info = {} //重置
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();

        xhr_test.open("GET", host + `/proxy/user/GetProxyUserLinkBet?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&id=${gHandler.gameGlobal.player.account_name}&start_time=${start}&end_time=${end}`, true);
        xhr_test.send();

        cc.log("查询7日链接", host + `/proxy/user/GetProxyUserLinkBet?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&id=${gHandler.gameGlobal.player.account_name}&start_time=${start}&end_time=${end}`);
        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("p1      /proxy/user/GetProxyUserLinkBet返回", resData);
                Database.p1_seven_info = resData.msg

                a();
                xhr_test.abort();
            }

        };



    },
    //新隆7日查询接口
    GetProxyUserLinkstatement(start, end, a) {
        Database.p1_seven_info = {} //重置
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();

        xhr_test.open("GET", host + `/proxy/user/GetProxyUserLinkstatement?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&id=${gHandler.gameGlobal.player.account_name}&start_time=${start}&end_time=${end}`, true);
        xhr_test.send();

        cc.log("查询7日链接", host + `/proxy/user/GetProxyUserLinkstatement?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&id=${gHandler.gameGlobal.player.account_name}&start_time=${start}&end_time=${end}`);
        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("p1      /proxy/user/GetProxyUserLinkstatement返回", resData);
                Database.p1_seven_info = resData.msg

                a();
                xhr_test.abort();
            }

        };
    },
    //p12  查询玩家分红数据总额
    GetPaymentInfo(first_date, last_date, a) {

        //  URL http: //161.117.178.174:12350/proxy/user/GetPaymentInfo
        //  METHOD GET
        //  PARAMS {
        //      account_name 用户ID
        //      token 密匙
        //      first_date 开始时间(2020-05-18)
        //      last_date 结束时间
        //  }
        let end = Database.getUnixtimestamp0(last_date)
        let start = Database.getUnixtimestamp0(first_date);
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("GET", host + `/proxy/user/GetPaymentInfo?id=${gHandler.gameGlobal.player.account_name}&account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&start_time=${start}&end_time=${end}`, true);
        console.log(first_date, last_date);

        xhr_test.send();
        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status == 200) {

                var resData = JSON.parse(xhr_test.responseText);
                // if (resData.code == 404) {
                //     let txt = Database.Switchtext(resData.msg)
                //     cc.log(txt);
                //     gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, txt)
                // }
                commonVal.p12_data = resData.msg;
                cc.log("p12 /proxy/user/GetPaymentInfo返回", commonVal.p12_data);
                if (commonVal.p12_data != null) {
                    //根据日期进行排序
                    commonVal.p12_data.sort(function (a, b) {
                        a = new Date(a.date);
                        b = new Date(b.date);
                        return a > b ? -1 : a < b ? 1 : 0;
                    });
                }


                //Database.formatData1(resData.msg);
                a();
                xhr_test.abort();
            }

        }

    },
    //p12 子页面 查询玩家分红数据总额
    GetPaymentInfoDetail(date, a) {

        //  URL http: //161.117.178.174:12350/proxy/user/GetPaymentInfoDetail
        //  METHOD GET
        //  PARAMS {
        //      account_name 用户ID
        //      token 密匙
        //      date  时间
        //  }

        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("GET", host + `/proxy/user/GetPaymentInfoDetail?id=${gHandler.gameGlobal.player.account_name}&account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&date=${date}`, true);
        console.log(host + `/proxy/user/GetPaymentInfoDetail?id=${gHandler.gameGlobal.player.account_name}&account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&date=${date}`);


        xhr_test.send();
        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status == 200) {

                var resData = JSON.parse(xhr_test.responseText);
                if (resData.code == 404) {
                    let txt = Database.Switchtext(resData.msg)
                    cc.log(txt);
                    // gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, txt)
                }
                console.log('p12 GetPaymentInfoDetail', resData);
                commonVal.p12_view_data = resData.msg;

                cc.log("p12 /proxy/user/GetPaymentInfoDetail?", commonVal.p12_view_data);
                a();
                xhr_test.abort();
            }

        }

    },
    SaveEmailDetail(ID, num) {

        //user_id:              //  下级ID

        //title:                  //  账户内互转

        //content:                    //亲爱的玩家，您收到上级转入 ****（金额）金币已到账，请前往全民代理-月入百万界面领取。祝您游戏愉快，多多盈利！

        //范例:  亲爱的玩家，您收到上级转入 100.00 金币已到账，请前往全民代理-月入百万界面领取。祝您游戏愉快，多多盈利！

        //金额  就是  转账金额

        //action:add               固定
        //pass = md5(user_id + token)
        let content = "亲爱的玩家，您收到上级转入" + num + "金币已到账，请前往全民代理-月入百万界面领取。祝您游戏愉快，多多盈利！"
        let tok = "e40f01afbb1b9ae3dd6747ced5bca532"
        let pass = md5(ID + "e40f01afbb1b9ae3dd6747ced5bca532")
        let host = gHandler.gameGlobal.pay.pay_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("POST", host + "/api/backend/SaveEmailDetail", true);
        xhr_test.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var sendData = `user_id=${ID}&title=${"账户内互转"}&content=${content}&action=add&token=${tok}&pass=${pass}`;
        console.log('save sendData=', sendData);

        xhr_test.send(sendData);
        xhr_test.onreadystatechange = () => {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("SaveMoneyFlowDetail返回", resData);

                if (resData.msg == "操作成功") {

                    cc.log('resData.msg===', resData);



                    console.log('邮件发送成功');
                } else {
                    console.log('邮件发送失败 resData.msg===', resData);

                }


                xhr_test.abort();

            }

        };

    },
    p1_SaveEmailDetail(ID, num) {

        //user_id:              //  下级ID

        //title:                  //  账户内互转

        //content:                    //亲爱的玩家，您收到上级转入 ****（金额）金币已到账，请前往全民代理-月入百万界面领取。祝您游戏愉快，多多盈利！

        //范例:  亲爱的玩家，您收到上级转入 100.00 金币已到账，请前往全民代理-月入百万界面领取。祝您游戏愉快，多多盈利！

        //金额  就是  转账金额

        //action:add               固定
        let content = "亲爱的玩家，您收到佣金收益" + num + "金币已到账，请前往全民代理-月入百万界面领取。祝您游戏愉快，多多盈利！"
        let tok = "e40f01afbb1b9ae3dd6747ced5bca532"
        let host = gHandler.gameGlobal.pay.pay_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("POST", host + "/api/backend/SaveEmailDetail", true);
        xhr_test.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var sendData = `user_id=${ID}&title=${"佣金收益"}&content=${content}&action=add&token=${tok}&center_auth=${gHandler.gameGlobal.token}`;
        console.log('p1 save sendData=', sendData);

        cc.log(host + "/api/backend/SaveEmailDetail  佣金领取：", sendData);
        xhr_test.send(sendData);
        xhr_test.onreadystatechange = () => {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("SaveMoneyFlowDetail返回", resData);

                if (resData.msg == "操作成功") {

                    cc.log('resData.msg===', resData);



                    console.log('邮件发送成功');
                } else {
                    console.log('邮件发送失败 resData.msg===', resData);

                }

                xhr_test.abort();


            }

        };

    },
    //查询自己的查询保底分成规则 无限代保底分红
    jd_p9_GetBaseDividendRule(num, a) {

        // http://proxy.lymrmfyp.com/proxy/User/GetBaseDividendRule?token=3dbcddb1bc40623a0370ca87a64b5f96&account_name=750086613
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();

        xhr_test.open("GET", host + `/proxy/user/GetBaseDividendRule1?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&id=${gHandler.gameGlobal.player.account_name}&game_tag=${num}`, true);
        xhr_test.send();
        console.log("GET", `jd GetBaseDividendRule1?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&id=${gHandler.gameGlobal.player.account_name}&game_tag=${num}`);

        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("/proxy/user/jd_GetBaseDividendRule1返回", resData);
                if (num == 1) {
                    if (resData.msg == null) {
                        if (gHandler.app.pinpai == 'juding') {
                            Database.p9_qp_aumont = '100元。'
                        }
                        if (gHandler.app.pinpai == 'huaxing') {
                            Database.p9_qp_aumont = '160元。'
                        }
                        if (gHandler.app.pinpai == 'tianqi') {
                            Database.p9_qp_aumont = '90元。'
                        }

                    } else {
                        Database.p9_qp_aumont = resData.msg.income + '元.'

                    }
                    console.log('Database.p9_qp_aumont=', Database.p9_qp_aumont);
                }
                if (num == 5) {
                    if (!resData.msg) {
                        if (gHandler.app.pinpai == 'juding') {
                            Database.p9_dz_aumont = '100元。'
                        }
                        if (gHandler.app.pinpai == 'huaxing') {
                            Database.p9_dz_aumont = '80元。'
                        }
                        if (gHandler.app.pinpai == 'tianqi') {
                            Database.p9_dz_aumont = '90元。'
                        }


                    } else {
                        Database.p9_dz_aumont = resData.msg.income + '元.'

                    }
                    console.log('Database.p9_dz_aumont=', Database.p9_dz_aumont);
                }

                a();
                xhr_test.abort();
            }

        };



    },
    //查询下级的查询保底分成规则
    JD_Center_GetBaseDividendRule(id, num, a) {


        let host = gHandler.gameGlobal.proxy.proxy_host;
        var xhr_test = new XMLHttpRequest();

        xhr_test.open("GET", host + `/proxy/user/GetBaseDividendRule1?id=${id}&account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&game_tag=${num}`, true);

        cc.log(`jd   GetBaseDividendRule1?id=${id}&account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}`);


        xhr_test.send();
        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                console.log('DividendRule1 resData.msg===', resData.msg);
                if (resData.msg == null) {
                    console.log('无数据');
                    //默认100
                    Database.page9_aumont = '100'
                    if (num == 1 && gHandler.app.pinpai == 'huaxing') {
                        Database.page9_aumont = '160'
                    }
                    if (num == 5 && gHandler.app.pinpai == 'huaxing') {
                        Database.page9_aumont = '80'
                    }
                    //92 预设
                    if (num == 1 && gHandler.app.pinpai == 'ninetwo') {
                        Database.page9_n2qp_aumont = '' + 100
                    }
                    if (num == 5 && gHandler.app.pinpai == 'ninetwo') {
                        Database.page9_n2dz_aumont = '' + 100
                    }
                    if (num == 1 && gHandler.app.pinpai == 'tianqi') {
                        Database.page9_aumont = '' + 90
                        Database.page9_n2qp_aumont = '' + 90
                    }
                    if (num == 5 && gHandler.app.pinpai == 'tianqi') {
                        Database.page9_aumont = '' + 90
                        Database.page9_n2qp_aumont = '' + 90
                    }

                } else {
                    if (num == 1 && gHandler.app.pinpai == 'ninetwo') {
                        Database.page9_n2qp_aumont = '' + resData.msg.income
                    }
                    if (num == 5 && gHandler.app.pinpai == 'ninetwo') {
                        Database.page9_n2dz_aumont = '' + resData.msg.income
                    }
                    Database.page9_aumont = '' + resData.msg.income
                }

                cc.log('下级  Database.page9_aumont===', Database.page9_aumont);
                a()
                xhr_test.abort();
            }

        };

    },
    jd_SetBaseDividendRule(ids, money, num, a) {
        // http://proxy.lymrmfyp.com/proxy/User/SetBaseDividendRule
        // account_name = 917942181  //当前玩家ID
        // token =        //当前玩家token
        // child_id =    //直属玩家ID
        // income =    //每万 多少元


        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("POST", host + "/proxy/user/SetBaseDividendRule1", true);
        xhr_test.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");


        var sendData = `account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&child_id=${ids}&income=${money}&game_tag=${num}`;

        console.log(`jd_SetBaseDividendRule account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}`);


        xhr_test.send(sendData);

        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("jd_SetBaseDividendRule返回", resData);
                if (resData.status == "SUCCESS") {

                    Database.p9_jd_xjgz = money
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '设置成功')
                } else {
                    if (resData.msg.indexOf('income between') == -1) {
                        gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '超出设置区间, 设置失败')
                    } else {
                        cc.log('报错了');
                        let txt = resData.msg
                        cc.log(txt);
                        gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, txt)
                    }

                }


                a();
                xhr_test.abort();
            }

        };
    },
    //page10 获取保底分红发放详情
    jd_GetBaseDividendInfo(first, last, num, a) {
        // cc.log('first===', first, 'last===', last, 'commonVal.token==', commonVal.token);

        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();

        xhr_test.open("GET", host + `/proxy/user/GetBaseDividendInfo1?account_name=${gHandler.gameGlobal.player.account_name}&first_date=${first}&last_date=${last}&token=${commonVal.token}&game_tag=${num}`, true);

        console.log("jd GET", `GetBaseDividendInfo1?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}`);


        xhr_test.send();


        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                // //得到数据渲染

                if (resData.code == 404) {
                    let txt = Database.Switchtext(resData.msg) //检索提示
                    // cc.log(txt);
                    // gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, txt)//发起提示
                }
                cc.log("jd p10       /proxy/user/GetBaseDividendInfo1  resData.code,===", resData.code, 'resData.msg length===', resData.msg.length, 'resData.status===', resData.status);
                Database.formatData10(resData.msg);
                a();
                xhr_test.abort();
            }

        };

    },
    //p10 获取直属玩家业绩接口
    jd_GetGameUserInductions(ids, ic, ends, end_time, nums, a) {
        // http://proxy.lymrmfyp.com/proxy/User/GetGameUserInductions?account_name=716896002&ids=%5B368964697,325209954%5D&start_time=1619020800&end_time=1619107200&game_tags=%5B1%5D&token=3c4188260e602ac0af93dadb68c723bb
        //时间戳每日差 86400

        //改为 GetGameUserInductionsSortByGameTag 接口
        let end = Database.getUnixtimestamp(end_time)
        let start = Database.getUnixtimestamp0(end_time);

        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();


        xhr_test.open("GET", host + `/proxy/user/GetGameUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&ids=[${ids}]&start_time=${start}&end_time=${end}&token=${commonVal.token}&game_tags=[${nums}]`, true);




        xhr_test.send();


        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("p10   /proxy/user/GetGameUserInductionsSortByGameTag1" + nums + " 返回", resData);
                // //得到数据渲染

                let zswj = 0;

                if (resData.msg != null) {
                    let data_key = Object.keys(resData.msg)
                    let data_msg = resData.msg;
                    for (let a = 0; a < data_key.length; a++) {
                        for (let i = 0; i < data_msg[data_key[a]].length; i++) {
                            if (data_msg[data_key[a]][i].base_dividend_type == 1) {
                                zswj += (parseFloat(data_msg[data_key[a]][i].win_total) + Math.abs(parseFloat(data_msg[data_key[a]][i].lose_total))) * data_msg[data_key[a]][i].base_dividend_discount / 100
                            } else if (data_msg[data_key[a]][i].base_dividend_type == 2) {
                                zswj += parseFloat(data_msg[data_key[a]][i].bet_total * data_msg[data_key[a]][i].base_dividend_discount / 100)
                            }

                        }

                    }

                    for (let s = 0; s < Database.data10.length; s++) {

                        if (Database.data10[s].date == end_time) {

                            Database.data10[s].zswjyj = zswj
                        }


                    }

                } else {
                    cc.log('没有值', end_time);
                }

                a();
                xhr_test.abort();


            }
        };

    },
    //p9 xj 获取下级某个直属玩家业绩接口
    p9_GetGameUserInductions(ids, end_time, a) {
        console.log('p9 xj 获取下级某个直属玩家业绩接口');
        // http://proxy.lymrmfyp.com/proxy/User/GetGameUserInductions?account_name=716896002&ids=%5B368964697,325209954%5D&start_time=1619020800&end_time=1619107200&game_tags=%5B1%5D&token=3c4188260e602ac0af93dadb68c723bb
        //时间戳每日差 86400
        let end = Database.getUnixtimestamp(end_time)
        let start = Database.getUnixtimestamp0(end_time)

        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();

        xhr_test.open("GET", host + `/proxy/user/GetGameUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&ids=[${ids}]&start_time=${start}&end_time=${end}&token=${commonVal.token}&game_tags=[1,5]`, true);
        console.log(host + `/proxy/user/GetGameUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&ids=[${ids}]&start_time=${start}&end_time=${end}&token=${commonVal.token}&game_tags=[1,5]`);



        xhr_test.send();


        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("p9 下级脚本 /proxy/user/GetGameUserInductionsSortByGameTag 返回", resData);
                // //得到数据渲染

                let zswj = 0;
                if (resData.msg != null) {
                    let data_key = Object.keys(resData.msg)
                    let data_msg = resData.msg;
                    for (let a = 0; a < data_key.length; a++) {
                        for (let i = 0; i < data_msg[data_key[a]].length; i++) {
                            if (data_msg[data_key[a]][i].bet_total != 0 || data_msg[data_key[a]][i].lose_total != 0 || data_msg[data_key[a]][i].win_total != 0) {
                                console.log('id = ', data_key[a], 'win_total=', data_msg[data_key[a]][i].win_total, 'lose_total=', data_msg[data_key[a]][i].lose_total, 'bet_money=', data_msg[data_key[a]][i].bet_total);
                            }
                            if (data_msg[data_key[a]][i].base_dividend_type == 1) {
                                zswj += (parseFloat(data_msg[data_key[a]][i].win_total) + Math.abs(parseFloat(data_msg[data_key[a]][i].lose_total))) * data_msg[data_key[a]][i].base_dividend_discount / 100
                            } else if (data_msg[data_key[a]][i].base_dividend_type == 2) {
                                zswj += parseFloat(data_msg[data_key[a]][i].bet_total * data_msg[data_key[a]][i].base_dividend_discount / 100)
                            }

                        }

                    }
                    Database.p9_yjcx_gr = zswj
                } else {
                    cc.log('没有值', end_time);
                    Database.p9_yjcx_gr = 0
                }

                a();
                xhr_test.abort();

            }

        };

    },
    //p9 xj 获取下级某个直属团队业绩接口
    p9_GetProxyUserInductionsSortByGameTag(ids, end_time, a) {
        console.log('p9 xj 获取下级某个直属玩家团队业绩接口');
        // http://proxy.lymrmfyp.com/proxy/User/GetProxyUserInductionsSortByGameTag?account_name=716896002&ids=%5B368964697,325209954%5D&start_time=1619020800&end_time=1619107200&game_tags=%5B1%5D&token=3c4188260e602ac0af93dadb68c723bb
        //时间戳每日差 86400
        let end = Database.getUnixtimestamp(end_time)
        let start = Database.getUnixtimestamp0(end_time)

        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();

        xhr_test.open("GET", host + `/proxy/user/GetProxyUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&ids=[${ids}]&start_time=${start}&end_time=${end}&token=${commonVal.token}&game_tags=[1,5]`, true);
        console.log(host + `/proxy/user/GetProxyUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&ids=[${ids}]&start_time=${start}&end_time=${end}&token=${commonVal.token}&game_tags=[1,5]`);



        xhr_test.send();


        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("p9 下级脚本团队 /proxy/user/GetProxyUserInductionsSortByGameTag 返回", resData);
                // //得到数据渲染

                let zswj = 0;
                if (resData.msg != null) {
                    let data_key = Object.keys(resData.msg)
                    let data_msg = resData.msg;
                    for (let a = 0; a < data_key.length; a++) {
                        for (let i = 0; i < data_msg[data_key[a]].length; i++) {
                            if (data_msg[data_key[a]][i].bet_total != 0 || data_msg[data_key[a]][i].lose_total != 0 || data_msg[data_key[a]][i].win_total != 0) {
                                console.log('id = ', data_key[a], 'win_total=', data_msg[data_key[a]][i].win_total, 'lose_total=', data_msg[data_key[a]][i].lose_total, 'bet_money=', data_msg[data_key[a]][i].bet_total);
                            }
                            if (data_msg[data_key[a]][i].base_dividend_type == 1) {
                                zswj += (parseFloat(data_msg[data_key[a]][i].win_total) + Math.abs(parseFloat(data_msg[data_key[a]][i].lose_total))) * data_msg[data_key[a]][i].base_dividend_discount / 100
                            } else if (data_msg[data_key[a]][i].base_dividend_type == 2) {
                                zswj += parseFloat(data_msg[data_key[a]][i].bet_total * data_msg[data_key[a]][i].base_dividend_discount / 100)
                            }

                        }

                    }
                    Database.p9_yjcx_td = zswj
                } else {
                    cc.log('没有值', end_time);
                    Database.p9_yjcx_td = 0
                }

                a();
                xhr_test.abort();

            }

        };

    },


    //p9 xj 获取下级某个直属玩家业绩接口
    hj_p9_GetGameUserInductions(ids, end_time, a) {
        console.log('p9 xj 获取下级某个直属玩家业绩接口');
        // http://proxy.lymrmfyp.com/proxy/User/GetGameUserInductions?account_name=716896002&ids=%5B368964697,325209954%5D&start_time=1619020800&end_time=1619107200&game_tags=%5B1%5D&token=3c4188260e602ac0af93dadb68c723bb
        //时间戳每日差 86400
        let end = Database.getUnixtimestamp(end_time)
        let start = Database.getUnixtimestamp0(end_time)

        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();

        xhr_test.open("GET", host + `/proxy/user/GetGameUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&ids=[${ids}]&start_time=${start}&end_time=${end}&token=${commonVal.token}&game_tags=[${commonVal.gametags}]`, true);
        console.log(host + `/proxy/user/GetGameUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&ids=[${ids}]&start_time=${start}&end_time=${end}&token=${commonVal.token}&game_tags=[${commonVal.gametags}]`);



        xhr_test.send();


        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("p9 下级脚本 /proxy/user/GetGameUserInductionsSortByGameTag 返回", resData);
                // //得到数据渲染

                let zswj = 0;
                if (resData.msg != null) {
                    let data_key = Object.keys(resData.msg)
                    let data_msg = resData.msg;
                    for (let a = 0; a < data_key.length; a++) {
                        for (let i = 0; i < data_msg[data_key[a]].length; i++) {
                            if (data_msg[data_key[a]][i].bet_total != 0 || data_msg[data_key[a]][i].lose_total != 0 || data_msg[data_key[a]][i].win_total != 0) {
                                console.log('id = ', data_key[a], 'win_total=', data_msg[data_key[a]][i].win_total, 'lose_total=', data_msg[data_key[a]][i].lose_total, 'bet_money=', data_msg[data_key[a]][i].bet_total);
                            }
                            if (data_msg[data_key[a]][i].base_dividend_type == 1) {
                                zswj += (parseFloat(data_msg[data_key[a]][i].win_total) + Math.abs(parseFloat(data_msg[data_key[a]][i].lose_total))) * data_msg[data_key[a]][i].base_dividend_discount / 100
                            } else if (data_msg[data_key[a]][i].base_dividend_type == 2) {
                                zswj += parseFloat(data_msg[data_key[a]][i].bet_total * data_msg[data_key[a]][i].base_dividend_discount / 100)
                            }

                        }

                    }
                    Database.p9_yjcx_gr = zswj
                } else {
                    cc.log('没有值', end_time);
                    Database.p9_yjcx_gr = 0
                }

                a();
                xhr_test.abort();

            }

        };

    },
    //p9 xj 获取下级某个直属团队业绩接口
    hj_p9_GetProxyUserInductionsSortByGameTag(ids, end_time, a) {
        console.log('p9 xj 获取下级某个直属玩家团队业绩接口');
        // http://proxy.lymrmfyp.com/proxy/User/GetProxyUserInductionsSortByGameTag?account_name=716896002&ids=%5B368964697,325209954%5D&start_time=1619020800&end_time=1619107200&game_tags=%5B1%5D&token=3c4188260e602ac0af93dadb68c723bb
        //时间戳每日差 86400
        let end = Database.getUnixtimestamp(end_time)
        let start = Database.getUnixtimestamp0(end_time)

        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();

        xhr_test.open("GET", host + `/proxy/user/GetProxyUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&ids=[${ids}]&start_time=${start}&end_time=${end}&token=${commonVal.token}&game_tags=[${commonVal.gametags}]`, true);
        console.log(host + `/proxy/user/GetProxyUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&ids=[${ids}]&start_time=${start}&end_time=${end}&token=${commonVal.token}&game_tags=[${commonVal.gametags}]`);



        xhr_test.send();


        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("p9 下级脚本团队 /proxy/user/GetProxyUserInductionsSortByGameTag 返回", resData);
                // //得到数据渲染

                let zswj = 0;
                if (resData.msg != null) {
                    let data_key = Object.keys(resData.msg)
                    let data_msg = resData.msg;
                    for (let a = 0; a < data_key.length; a++) {
                        for (let i = 0; i < data_msg[data_key[a]].length; i++) {
                            if (data_msg[data_key[a]][i].bet_total != 0 || data_msg[data_key[a]][i].lose_total != 0 || data_msg[data_key[a]][i].win_total != 0) {
                                console.log('id = ', data_key[a], 'win_total=', data_msg[data_key[a]][i].win_total, 'lose_total=', data_msg[data_key[a]][i].lose_total, 'bet_money=', data_msg[data_key[a]][i].bet_total);
                            }
                            if (data_msg[data_key[a]][i].base_dividend_type == 1) {
                                zswj += (parseFloat(data_msg[data_key[a]][i].win_total) + Math.abs(parseFloat(data_msg[data_key[a]][i].lose_total))) * data_msg[data_key[a]][i].base_dividend_discount / 100
                            } else if (data_msg[data_key[a]][i].base_dividend_type == 2) {
                                zswj += parseFloat(data_msg[data_key[a]][i].bet_total * data_msg[data_key[a]][i].base_dividend_discount / 100)
                            }

                        }

                    }
                    Database.p9_yjcx_td = zswj
                } else {
                    cc.log('没有值', end_time);
                    Database.p9_yjcx_td = 0
                }

                a();
                xhr_test.abort();

            }

        };

    },


    //xj 获取下级某个日期直属个人业绩接口
    p9_GetGameUserInductionds(ids, first, last, a) {
        cc.log('first===', first, 'last===', last);

        let end = Database.getUnixtimestamp(last)
        let start = Database.getUnixtimestamp0(first)

        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("GET", host + `/proxy/user/GetGameUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&ids=[${ids}]&start_time=${start}&end_time=${end}&token=${commonVal.token}&game_tags=[1,5]`, true);
        console.log(host + `/proxy/user/GetGameUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&ids=[${ids}]&start_time=${start}&end_time=${end}&token=${commonVal.token}&game_tags=[1,5]`);



        xhr_test.send();


        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("p9 下级脚本个人期区间 /proxy/user/GetGameUserInductionsSortByGameTag 返回", resData);
                // //得到数据渲染

                let zswj = 0;
                if (resData.msg != null) {
                    let data_key = Object.keys(resData.msg)
                    let data_msg = resData.msg;
                    for (let a = 0; a < data_key.length; a++) {
                        for (let i = 0; i < data_msg[data_key[a]].length; i++) {
                            if (data_msg[data_key[a]][i].bet_total != 0 || data_msg[data_key[a]][i].lose_total != 0 || data_msg[data_key[a]][i].win_total != 0) {
                                console.log('id = ', data_key[a], 'win_total=', data_msg[data_key[a]][i].win_total, 'lose_total=', data_msg[data_key[a]][i].lose_total, 'bet_money=', data_msg[data_key[a]][i].bet_total);
                            }
                            if (data_msg[data_key[a]][i].base_dividend_type == 1) {
                                zswj += (parseFloat(data_msg[data_key[a]][i].win_total) + Math.abs(parseFloat(data_msg[data_key[a]][i].lose_total))) * data_msg[data_key[a]][i].base_dividend_discount / 100
                            } else if (data_msg[data_key[a]][i].base_dividend_type == 2) {
                                zswj += parseFloat(data_msg[data_key[a]][i].bet_total * data_msg[data_key[a]][i].base_dividend_discount / 100)
                            }

                        }

                    }
                    Database.p9_yjcx_gr = zswj
                } else {
                    cc.log('没有值', end_time);
                    Database.p9_yjcx_gr = 0
                }

                a();
                xhr_test.abort();

            }

        };

    },
    //xj 获取下级某个日期团队业绩接口
    p9_GetProxyUserInductionsSortByGameTagdt(ids, first, last, a) {
        cc.log('团队 first===', first, 'last===', last);

        let end = Database.getUnixtimestamp(last)
        let start = Database.getUnixtimestamp0(first)

        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();

        xhr_test.open("GET", host + `/proxy/user/GetProxyUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&ids=[${ids}]&start_time=${start}&end_time=${end}&token=${commonVal.token}&game_tags=[1,5]`, true);
        console.log(host + `/proxy/user/GetProxyUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&ids=[${ids}]&start_time=${start}&end_time=${end}&token=${commonVal.token}&game_tags=[1,5]`);



        xhr_test.send();


        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("p9 下级脚本团队日期区间 /proxy/user/GetProxyUserInductionsSortByGameTag 返回", resData);
                // //得到数据渲染

                let zswj = 0;
                if (resData.msg != null) {
                    let data_key = Object.keys(resData.msg)
                    let data_msg = resData.msg;
                    for (let a = 0; a < data_key.length; a++) {
                        for (let i = 0; i < data_msg[data_key[a]].length; i++) {
                            if (data_msg[data_key[a]][i].bet_total != 0 || data_msg[data_key[a]][i].lose_total != 0 || data_msg[data_key[a]][i].win_total != 0) {
                                console.log('id = ', data_key[a], 'win_total=', data_msg[data_key[a]][i].win_total, 'lose_total=', data_msg[data_key[a]][i].lose_total, 'bet_money=', data_msg[data_key[a]][i].bet_total);
                            }
                            if (data_msg[data_key[a]][i].base_dividend_type == 1) {
                                zswj += (parseFloat(data_msg[data_key[a]][i].win_total) + Math.abs(parseFloat(data_msg[data_key[a]][i].lose_total))) * data_msg[data_key[a]][i].base_dividend_discount / 100
                            } else if (data_msg[data_key[a]][i].base_dividend_type == 2) {
                                zswj += parseFloat(data_msg[data_key[a]][i].bet_total * data_msg[data_key[a]][i].base_dividend_discount / 100)
                            }

                        }

                    }
                    Database.p9_yjcx_td = zswj
                } else {
                    cc.log('没有值', end_time);
                    Database.p9_yjcx_td = 0
                }

                a();
                xhr_test.abort();

            }

        };

    },
    //查询单个id
    p9_GetProxyUser(id, a) {
        //https://proxy.lymrmfyp.com/proxy/User/GetProxyUser?account_name=454266606&token&id=495199413

        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();


        xhr_test.open("GET", host + `/proxy/user/GetProxyUser?account_name=${gHandler.gameGlobal.player.account_name}&id=${id}&token=${commonVal.token}`, true);

        console.log(host + `/proxy/user/GetProxyUser?account_name=${gHandler.gameGlobal.player.account_name}&id=${id}&token=${commonVal.token}`);


        xhr_test.send();


        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                if (resData.code != 404) {
                    cc.log(" p9_GetProxyUser返回 查询单个ID", resData);

                    Database.p9_dlsj = resData.msg
                } else {
                    cc.log(" p9_GetProxyUser返回 查询单个ID 404", resData);


                }

                a();
                xhr_test.abort();


            }
        };
    },
    p9_getProxyUserNumber(ids, a) { //得到下级团队人数
        let host = gHandler.gameGlobal.proxy.proxy_host;
        let account_name = commonVal.account_name;
        let token = commonVal.token;
        //http://proxy.lymrmfyp.com/proxy/User/GetProxyUserNumber?account_name=375087785&ids=%5B622106574,643129297%5D&token=d26a4fcc9c15354a1a9227ab32e9b2bc
        const url = host +
            `/Proxy/User/GetProxyUserNumber?ids=[${ids}]&account_name=${account_name}&token=${token}`;
        cc.log('p9 GetProxyUserNumber', url);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status === 200) {
                const res = JSON.parse(xhr.responseText);
                if (res.code === 200) {

                    cc.log("p9得到下级团队人数 GetProxyUserNumber 返回内容", res);

                    if (res.msg != null && res.msg[0].count != 0) {
                        Database.p9_dlsj.count = res.msg[0].count
                        console.log('可以玩耍');


                    }
                    a()

                }

            }

        };
        xhr.open("GET", url, true);
        xhr.send();
    },
    //华兴专用
    huaxing_getDividendRule(b) {
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        // PARAMS { 
        //     account_name 用户ID         
        //     token 密匙         
        //     id 用户ID -  
        //     type 分红类型(1.流失 2.亏损) 可选 
        //     - game_tag 游戏分类 可选
        //  }
        xhr_test.open("GET", host + `/proxy/user/getDividendRule?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&id=${gHandler.gameGlobal.player.account_name}&game_tag=0&type=3`, true);
        xhr_test.send();

        xhr_test.onreadystatechange = () => {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("p6 load 我的比例 /proxy/user/getDividendRule返回", resData);
                //得到数据渲染

                if (resData.msg != null) {
                    let a = []
                    // console.log('getDividendRule返回resData.msg.length=', resData.msg.length, a);
                    for (let index = 0; index < resData.msg.length; index++) {
                        a[index] = parseInt(resData.msg[index].percent)

                    }
                    //从大到小排序
                    if (a.length > 1) {
                        a.sort(function (a, b) {
                            return a - b
                        })
                    }

                    Database.hx_p6_gz = a[0];

                    // console.log('a=====',a, Database.hx_p6_gz);
                }
                b()
                xhr_test.abort();
            }

        };
    },
    //92专用 n 表示日期 加1 是明天  减一是昨天  week表示周一
    n2_today_GetBaseDividendInfo2(ns, b, tag) {
        let data = Database.getNowFormatDate(ns);
        let last = Database.getNowFormatDate(ns);
        if (ns == 'week') {
            data = Database.getThisweekDate();
            last = Database.getNowFormatDate(0);
        }
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr = new XMLHttpRequest();

        xhr.open("GET", host + `/proxy/user/GetBaseDividendInfo2?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&first_date=${data}&last_date=${last}&game_tag=${tag}`, true);


        xhr.send();

        xhr.onreadystatechange = () => {//
            if (xhr.readyState == 4 && xhr.status === 200) {
                var resData = JSON.parse(xhr.responseText);
                //得到数据渲染

                if (resData.msg != null) {
                    //算出今日所需数据
                    if (ns == 0) {

                        //当日数据长度大于0
                        if (resData.msg[data].length > 1) {
                            for (let i = 1; i < resData.msg[data].length; i++) {
                                if (tag == 1) {
                                    //92 直属佣金 qp
                                    Database.n2_zsyj_qp += resData.msg[data][i].money
                                }
                                if (tag == 5) {
                                    //92 直属佣金dz
                                    Database.n2_zsyj_dz += resData.msg[data][i].money
                                }


                            }
                        }
                        //当日数据长度大于0
                        if (resData.msg[data].length > 0) {
                            if (tag == 1) {
                                //92 团队佣金 qp
                                Database.n2_tdyj_qp += resData.msg[data][0].money
                                //今日预估金 = 团队佣金- 直属佣金
                                Database.n2_jrygj_qp = Database.n2_tdyj_qp - Database.n2_zsyj_qp
                            }
                            if (tag == 5) {
                                //92 团队佣金 dz
                                Database.n2_tdyj_dz += resData.msg[data][0].money
                                //今日预估金 = 团队佣金- 直属佣金
                                Database.n2_jrygj_dz = Database.n2_tdyj_dz - Database.n2_zsyj_dz
                            }

                        }


                    }
                    //算出昨日的
                    if (ns == -1) {

                        let td = 0
                        let zs = 0
                        //当日数据长度大于0
                        if (resData.msg[data].length > 1) {
                            for (let i = 1; i < resData.msg[data].length; i++) {
                                //92 直属佣金
                                zs += resData.msg[data][i].money

                            }
                        }
                        //当日数据长度大于0
                        if (resData.msg[data].length > 0) {
                            //92 团队佣金
                            td = resData.msg[data][0].money
                            console.log('昨日佣金 直属下级值=', zs, '团队总值=', td);
                            if (tag == 1) {
                                //昨日预估金 = 团队佣金- 直属佣金
                                Database.n2_zrzyj_qp = td - zs
                            }
                            if (tag == 5) {
                                //昨日预估金 = 团队佣金- 直属佣金
                                Database.n2_zrzyj_dz = td - zs
                            }


                        }
                    }
                    //算出本周的
                    if (ns == 'week') {
                        if (tag == 1) {
                            cc.log("---------------n2 today_GetBaseDividendInfo2 本周 返回=", resData);
                        }

                        //得到数据所有的ke
                        let c = []
                        for (var key in resData.msg) {
                            c.push(key)
                        }

                        //所有本人数据
                        let all_br_data = 0
                        //所有的下级数据
                        let all_xj_data = 0
                        //分别遍历key  
                        if (c.length > 0) {
                            for (let i = 0; i < c.length; i++) {
                                let key = c[i]
                                //对应的第一条数据
                                if (resData.msg[key].length > 0) {

                                    all_br_data += resData.msg[key][0].money

                                }
                                //和第一条后的所有数据
                                if (resData.msg[key].length > 1) {
                                    for (let s = 1; s < resData.msg[key].length; s++) {
                                        all_xj_data += resData.msg[key][s].money


                                    }
                                }

                            }

                        }


                        if (tag == 1) {
                            //昨日预估金 = 团队佣金- 直属佣金
                            Database.n2_bzzyj_qp = all_br_data - all_xj_data
                            console.log('p1 Database.n2_bzzyj_qp ===', Database.n2_bzzyj_qp, 'all_br_data===', all_br_data, 'all_xj_data==', all_xj_data);

                        }
                        if (tag == 5) {
                            //预估金 = 团队佣金- 直属佣金
                            Database.n2_bzzyj_dz = all_br_data - all_xj_data
                            console.log('p1 Database.n2_bzzyj_dz ===', Database.n2_bzzyj_dz);

                        }

                    }

                }
                b()
                xhr.abort();
            }


        }

        // 

    },
    //92专用 领取记录 暂定7天
    n2_GetMoveBalanceToGameUserInfo(b) {
        let start = Database.getNowFormatDate(-7);
        start = Database.getUnixtimestamp0(start);
        let end = Database.getNowFormatDate(0);
        end = Database.getUnixtimestamp(end);
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        // PARAMS { 
        //     account_name 用户ID         
        //     token 密匙         
        //     start_time 时间戳
        //     end_time   时间戳
        //      game_tag 游戏分类 可选1 棋牌 5电子
        //  }
        xhr_test.open("GET", host + `/proxy/user/GetMoveBalanceToGameUserInfo?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&start_time=${start}&end_time=${end}&id=${gHandler.gameGlobal.player.account_name}`, true);
        xhr_test.send();

        xhr_test.onreadystatechange = () => {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("---n2 领取记录 GetMoveBalanceToGameUserInfo  =", resData);
                //得到数据渲染

                if (resData.msg != null) {
                    Database.n2_lqyj_data = resData.msg

                }
                b()
                xhr_test.abort();
            }


        }


    },
    //92专用 n 表示日期 加1 是明天  减一是昨天  week表示周一
    n2_today_GetBaseDividendInfo2_p10(n, b, tag) {
        let data = Database.getNowFormatDate(n);
        let last = Database.getNowFormatDate(n);
        if (n == 'week') {
            data = Database.getThisweekDate();
            last = Database.getNowFormatDate(0);
        }
        if (n == 'lastweek') {
            data = Database.getlastweekDate()
            last = Database.getlastweekDate7()
        }
        if (n == 'month') {
            data = Database.getNowFormatDate(n)
            last = Database.getNowFormatDate(0);
        }




        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        // PARAMS { 
        //     account_name 用户ID         
        //     token 密匙         
        //     first_date 用户ID -  
        //     last_date 
        //      game_tag 游戏分类 可选1 棋牌 5电子
        // 
        xhr_test.open("GET", host + `/proxy/user/GetBaseDividendInfo2?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&first_date=${data}&last_date=${last}&game_tag=${tag}`, true);
        xhr_test.send();
        // console.log("GET", host + `/proxy/user/GetBaseDividendInfo2?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&first_date=${data}&last_date=${last}&game_tag=${tag}`);
        xhr_test.onreadystatechange = () => {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("----p10 n2 today_GetBaseDividendInfo2返回=", resData);
                //得到数据渲染

                if (resData.msg != null) {
                    //得到数据所有的key
                    let c = []
                    let fy = 0;
                    for (var key in resData.msg) {
                        c.push(key)
                    }

                    //分别遍历key  
                    if (c.length > 0) {
                        for (let i = 0; i < c.length; i++) {
                            let key = c[i]
                            //对应的第一条数据

                            if (resData.msg[key].length > 0) {
                                if (tag == 1) {
                                    //总业绩 = 第一条的团队业绩
                                    Database.n2_zyj_qp += resData.msg[key][0].amount
                                    //返佣
                                    Database.n2_fy_qp += resData.msg[key][0].money
                                    console.log("Database.n2_zyj_qp=======", Database.n2_zyj_qp);

                                }
                                if (tag == 5) {
                                    //总业绩 = 第一条的团队业绩
                                    Database.n2_zyj_dz += resData.msg[key][0].amount
                                    //返佣
                                    Database.n2_fy_dz += resData.msg[key][0].money
                                    console.log("Database.n2_zyj_dz=======", Database.n2_zyj_dz);


                                }
                            }
                            //和第一条后的所有数据
                            if (resData.msg[key].length > 1) {
                                for (let s = 1; s < resData.msg[key].length; s++) {
                                    fy += resData.msg[key][s].money
                                    if (tag == 1) {
                                        //团队业绩 = 第二条开始的团队业绩总和
                                        Database.n2_tdyj_qp10 += resData.msg[key][s].amount
                                    }
                                    if (tag == 5) {
                                        //团队业绩 = 第二条开始的团队业绩总和
                                        Database.n2_tdyj_dz10 += resData.msg[key][s].amount
                                    }
                                }
                            }
                        }

                    }
                    if (tag == 1) { //棋牌
                        //直属业绩= 总业绩 - 团队业绩
                        if (Database.n2_tdyj_qp10 > Database.n2_zyj_qp) {
                            Database.n2_tdyj_qp10 = Database.n2_zyj_qp
                            Database.n2_zsyj_qp10 = 0
                        } else {
                            Database.n2_zsyj_qp10 = Database.n2_zyj_qp - Database.n2_tdyj_qp10
                        }
                        let c = Math.floor(parseFloat(Database.n2_zsyj_qp10) * 100) / 100
                        if (c <= 0) {
                            Database.n2_zsyj_qp10 = 0
                        }
                        console.log(' Database.n2_zsyj_qp10====', Database.n2_zsyj_qp10);

                        //返佣 = 第一条的money - 第二条总和的money
                        Database.n2_fy_qp = Database.n2_fy_qp - fy
                    }
                    if (tag == 5) { //电子
                        //直属业绩= 总业绩 - 团队业绩
                        if (Database.n2_tdyj_dz10 > Database.n2_zyj_dz) {
                            Database.n2_tdyj_dz10 = Database.n2_zyj_dz
                            Database.n2_zsyj_dz10 = 0
                        } else {
                            Database.n2_zsyj_dz10 = Database.n2_zyj_dz - Database.n2_tdyj_dz10
                        }
                        let c = Math.floor(parseFloat(Database.n2_zsyj_dz10) * 100) / 100
                        if (c <= 0) {
                            Database.n2_zsyj_dz10 = 0
                        }

                        console.log(' Database.n2_zsyj_dz10====', Database.n2_zsyj_dz10);

                        //返佣 = 第一条的money - 第二条总和的money
                        Database.n2_fy_dz = Database.n2_fy_dz - fy

                    }



                }
                b()
                xhr_test.abort();
            }


        }


    },
    //92 p9搜索时间内投注额 https://proxy.lymrmfyp.com/proxy/user/GetGameUserInductionsSortByGameTag
    n2_today_GetGameUserInductionsSortByGameTag_p9(n, b, id) {
        let data = Database.getUnixtimestamp0(Database.getNowFormatDate(n));
        let last = Database.getUnixtimestamp(Database.getNowFormatDate(n));
        if (n == 'week') {
            data = Database.getUnixtimestamp0(Database.getThisweekDate());
            last = Database.getUnixtimestamp(Database.getNowFormatDate(0));
        }
        if (n == 'lastweek') {
            data = Database.getUnixtimestamp0(Database.getlastweekDate())
            last = Database.getUnixtimestamp(Database.getlastweekDate7())
        }
        if (n == 'month') {
            data = Database.getUnixtimestamp0(Database.getNowFormatDate(n))
            last = Database.getUnixtimestamp(Database.getNowFormatDate(0));
        }


        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        // PARAMS { 
        //     account_name 用户ID         
        //     token 密匙         
        //     start_time 开始时间 -  时间戳
        //     end_time 结束时间 -   时间戳
        //      game_tag 游戏分类[1,2,3,4,5] 可选1 棋牌 5电子
        //      ids [] 传入下级ID
        xhr_test.open("GET", host + `/proxy/user/GetGameUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&start_time=${data}&end_time=${last}&game_tags=[1,2,3,4,5]&ids=[${id}]`, true);
        xhr_test.send();
        // cc.log("GET", host + `/proxy/user/GetGameUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&start_time=${data}&end_time=${last}&game_tag=[1,2,3,4,5]&ids=[${id}]`)
        xhr_test.onreadystatechange = () => {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("----p9 n2 时间段内投注额 GetGameUserInductionsSortByGameTag返回=", resData);
                //得到数据渲染

                if (resData.msg != null) {
                    //得到数据所有的key
                    let c = []

                    for (var key in resData.msg) {
                        c.push(key)
                    }
                    //分别遍历key  
                    if (c.length > 0) {
                        for (let i = 0; i < c.length; i++) {
                            let key = c[i]
                            let tze = 0;//单个id投注额
                            if (resData.msg[key].length > 0) {
                                for (let s = 0; s < resData.msg[key].length; s++) {
                                    if (resData.msg[key][s].bet_total) {
                                        tze += resData.msg[key][s].bet_total
                                        console.log('tze=====', tze);
                                    }

                                }
                                //遍历数据找到相同id 赋值给 数据
                                for (let i = 0; i < Database.page9_wjmx.length; i++) {
                                    if (Database.page9_wjmx[i].id == key) {
                                        Database.page9_wjmx[i].bet_total = tze
                                        console.log(Database.page9_wjmx[i].bet_total, Database.page9_wjmx[i].id);
                                    }

                                }
                            }

                        }

                    }

                }
                // xhr_test.abort();
                b()
            }


        }


    },
    //92 p9搜索时间内充值额 PrGetProxyLinkPayInfo
    n2_today_GetProxyLinkPayInfo_p9(n, b, id) {
        let data = Database.getUnixtimestamp0(Database.getNowFormatDate(n));
        let last = Database.getUnixtimestamp(Database.getNowFormatDate(n));
        if (n == 'week') {
            data = Database.getUnixtimestamp0(Database.getThisweekDate());
            last = Database.getUnixtimestamp(Database.getNowFormatDate(0));
        }
        if (n == 'lastweek') {
            data = Database.getUnixtimestamp0(Database.getlastweekDate())
            last = Database.getUnixtimestamp(Database.getlastweekDate7())
        }
        if (n == 'month') {
            data = Database.getUnixtimestamp0(Database.getNowFormatDate(n))
            last = Database.getUnixtimestamp(Database.getNowFormatDate(0));
        }


        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        // PARAMS { 
        //     account_name 用户ID         
        //     token 密匙         
        //     start_time 开始时间 -  时间戳
        //     end_time 结束时间 -   时间戳
        //      ids  传入下级ID
        xhr_test.open("GET", host + `/proxy/user/GetProxyLinkPayInfo?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&start_time=${data}&end_time=${last}&id=${id}`, true);

        xhr_test.send();

        xhr_test.onreadystatechange = () => {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                // cc.log("----p9 n2 充值额 GetProxyLinkPayInfo 返回=", resData);
                //得到数据渲染

                if (resData.msg != null) {
                    if (resData.msg.user_top_up_total) {
                        console.log('id ===', id, 'user_top_up_total===', resData.msg.user_link_top_up_total, 'Database.page9_wjmx', Database.page9_wjmx);
                        //遍历数据找到相同id 赋值给 数据
                        for (let i = 0; i < Database.page9_wjmx.length; i++) {
                            if (Database.page9_wjmx[i].id == id) {
                                Database.page9_wjmx[i].user_top_up_total = resData.msg.user_top_up_total
                            }
                        }

                    }


                    if (resData.msg.user_link_top_up_total) {
                        console.log('id ===', id, 'user_link_top_up_total===', resData.msg.user_link_top_up_total, 'Database.page9_wjmx', Database.page9_wjmx);
                        //遍历数据找到相同id 赋值给 数据
                        for (let i = 0; i < Database.page9_wjmx.length; i++) {
                            if (Database.page9_wjmx[i].id == id) {
                                Database.page9_wjmx[i].user_link_top_up_total = resData.msg.user_link_top_up_total
                            }
                        }

                    }

                } else {
                    Database.page9_wjmx[i].user_top_up_total = 0
                }
                b()
                xhr_test.abort();
            }


        }


    },
    //92设置规则 SetBaseDividendRule2
    n2_SetBaseDividendRule(ids, money, num, a) {
        // http://proxy.lymrmfyp.com/proxy/User/SetBaseDividendRule
        // account_name = 917942181  //当前玩家ID
        // token =        //当前玩家token
        // child_id =    //直属玩家ID
        // income =    //每万 多少元


        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("POST", host + "/proxy/user/SetBaseDividendRule2", true);
        xhr_test.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");


        var sendData = `account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&child_id=${ids}&income=${money}&game_tag=${num}`;

        console.log(`---n2 设置规则返回 account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&child_id=${ids}&income=${money}&game_tag=${num}`);


        xhr_test.send(sendData);

        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("---n2_SetBaseDividendRule2返回", resData);
                if (resData.status == "SUCCESS") {

                    Database.p9_n2_xjgz = money

                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '设置成功')
                } else {
                    if (resData.msg.indexOf('income between') == -1) {
                        gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '超出设置区间, 设置失败 -1')
                    } else {
                        cc.log('报错了');
                        let txt = resData.msg
                        cc.log(txt);
                        gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, txt)
                    }

                }
                xhr_test.abort();

                a();
            }

        };
    },
    //92 p15 搜索团队 时间内投注额 http://proxy.lymrmfyp.com/Proxy/User/GetProxyUserInductionsSortByGameTag
    n2_today_GetProxyUserInductionsSortByGameTag_p9(n, b, id) {
        let data = Database.getUnixtimestamp0(Database.getNowFormatDate(n));
        let last = Database.getUnixtimestamp(Database.getNowFormatDate(n));
        if (n == 'week') {
            data = Database.getUnixtimestamp0(Database.getThisweekDate());
            last = Database.getUnixtimestamp(Database.getNowFormatDate(0));
        }
        if (n == 'lastweek') {
            data = Database.getUnixtimestamp0(Database.getlastweekDate())
            last = Database.getUnixtimestamp(Database.getlastweekDate7())
        }
        if (n == 'month') {
            data = Database.getUnixtimestamp0(Database.getNowFormatDate(n))
            last = Database.getUnixtimestamp(Database.getNowFormatDate(0));
        }


        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        // PARAMS { 
        //     account_name 用户ID         
        //     token 密匙         
        //     start_time 开始时间 -  时间戳
        //     end_time 结束时间 -   时间戳
        //      game_tag 游戏分类[1,2,3,4,5] 可选1 棋牌 5电子
        //      ids [] 传入下级ID
        xhr_test.open("GET", host + `/proxy/user/GetProxyUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&start_time=${data}&end_time=${last}&game_tags=[1,2,3,4,5]&ids=[${id}]`, true);
        xhr_test.send();
        // cc.log("GET", host + `/proxy/user/GetGameUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&start_time=${data}&end_time=${last}&game_tag=[1,2,3,4,5]&ids=[${id}]`)
        xhr_test.onreadystatechange = () => {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("----p9 n2 时间段内投注额 GetProxyUserInductionsSortByGameTag 返回=", resData);
                //得到数据渲染

                if (resData.msg != null) {
                    //得到数据所有的key
                    let c = []

                    for (var key in resData.msg) {
                        c.push(key)
                    }
                    //分别遍历key  
                    if (c.length > 0) {
                        for (let i = 0; i < c.length; i++) {
                            let key = c[i]
                            let tze = 0;//单个id投注额
                            if (resData.msg[key].length > 0) {
                                for (let s = 0; s < resData.msg[key].length; s++) {
                                    if (resData.msg[key][s].bet_total) {
                                        tze += resData.msg[key][s].bet_total
                                        console.log('tze=====', tze);
                                    }

                                }
                                //遍历数据找到相同id 赋值给 数据
                                for (let i = 0; i < Database.page9_wjmx.length; i++) {
                                    if (Database.page9_wjmx[i].id == key) {
                                        Database.page9_wjmx[i].p_bet_total = tze
                                        console.log(Database.page9_wjmx[i].p_bet_total, Database.page9_wjmx[i].id);
                                    }

                                }
                            }

                        }

                    }

                }
                // xhr_test.abort();
                b()
            }


        }


    },
    //92专用 n 表示日期 加1 是明天  减一是昨天  week表示周一 https://proxy.lymrmfyp.com/proxy/user/GetStockDividendInfo
    n2_GetStockDividendInfo14(n, b) {
        let data = Database.getNowFormatDate(n);
        let last = Database.getNowFormatDate(n);
        if (n == 'week') {
            data = Database.getThisweekDate();
            last = Database.getNowFormatDate(0);
        }
        if (n == 'lastweek') {
            data = Database.getlastweekDate()
            last = Database.getlastweekDate7()
        }

        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        // PARAMS { 
        //     account_name 用户ID         
        //     token 密匙         
        //     first_date 用户ID -  
        //     last_date 
        //  }


        xhr_test.open("GET", host + `/proxy/user/GetStockDividendInfo?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&first_date=${data}&last_date=${last}`, true);

        xhr_test.send();

        xhr_test.onreadystatechange = () => {
            console.log('xhr_test.status====', xhr_test.status);
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("n2 _GetStockDividendInfo返回=", resData);
                //得到数据渲染
                //得到数据所有的key
                let c = []

                for (var key in resData.msg) {
                    c.push(key)
                }
                let da = c[0]
                let zjfe = 0//自己的份额
                if (resData.msg != null) {
                    //记录所有数据
                    if (n == 'week') {
                        //股份份额 下级详情界面所有数据
                        Database.p14_n2_gf_t = resData.msg[da]


                    }
                    if (n == 'lastweek') {
                        //股份份额
                        Database.p14_n2_gf_l = resData.msg[da]
                    }
                    //当日数据长度大于1
                    console.log('111111111', da, resData.msg[da], resData.msg[da].length);
                    if (resData.msg[da].length > 1) {
                        for (let i = 1; i < resData.msg[da].length; i++) {
                            if (n == 'week') {
                                //股份份额
                                Database.p14_n2_gffe_t += resData.msg[da][i].amount


                            }
                            if (n == 'lastweek') {
                                //股份份额
                                Database.p14_n2_gffe_l += resData.msg[da][i].amount
                            }





                        }
                    }
                    //当日数据长度大于0
                    if (resData.msg[da].length > 0) {
                        zjfe = resData.msg[da][0].amount
                        if (n == 'week') {
                            //股份单价
                            Database.p14_n2_gfdj_t = resData.msg[da][0].price
                            //股份分红
                            Database.p14_n2_gffh_t = resData.msg[da][0].bonus
                            //有效业绩
                            if (resData.msg[da][0].share == 0) {
                                Database.p14_n2_yxyj_t = 0
                            } else {
                                Database.p14_n2_yxyj_t = resData.msg[da][0].amount / resData.msg[da][0].share * 10000
                            }



                        }
                        if (n == 'lastweek') {
                            Database.p14_n2_status = resData.msg[da][0].status
                            console.log('Database.p14_n2_status====', Database.p14_n2_status);
                            Database.p14_n2_order_l = resData.msg[da][0]._id
                            //股份单价
                            Database.p14_n2_gfdj_l = resData.msg[da][0].price
                            //股份收益
                            Database.p14_n2_gfsy_l = resData.msg[da][0].money - resData.msg[da][0].bonus
                            if (Database.p14_n2_gfsy_l < 0) {
                                Database.p14_n2_gfsy_l = 0
                            }
                            //股份分红
                            Database.p14_n2_gffh_l = resData.msg[da][0].bonus
                            //有效业绩
                            if (resData.msg[da][0].share == 0) {
                                Database.p14_n2_yxyj_l = 0
                            } else {
                                Database.p14_n2_yxyj_l = resData.msg[da][0].amount / resData.msg[da][0].share * 10000
                            }
                        }



                    }

                    if (n == 'week') {
                        //股份份额
                        Database.p14_n2_gffe_t = zjfe - Database.p14_n2_gffe_t
                        // 股份收益
                        Database.p14_n2_gfsy_t = Database.p14_n2_gffe_t * Database.p14_n2_gfdj_t

                    }
                    if (n == 'lastweek') {

                        //股份份额
                        Database.p14_n2_gffe_l = zjfe - Database.p14_n2_gffe_l
                    }



                }
                b()
                xhr_test.abort();
            }


        }


    },
    //92专用 n 表示日期 加1 是明天  减一是昨天  week表示周一
    n2_GetBaseDividendInfo2_p14(n, b, tag) {
        let data = Database.getNowFormatDate(n);
        let last = Database.getNowFormatDate(n);
        if (n == 'week') {
            data = Database.getThisweekDate();
            last = Database.getNowFormatDate(0);
        }
        if (n == 'lastweek') {
            data = Database.getlastweekDate()
            last = Database.getlastweekDate7()
        }


        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        // PARAMS { 
        //     account_name 用户ID         
        //     token 密匙         
        //     first_date 用户ID -  
        //     last_date 
        //      game_tag 游戏分类 可选1 棋牌 5电子
        // 
        xhr_test.open("GET", host + `/proxy/user/GetBaseDividendInfo2?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&first_date=${data}&last_date=${last}&game_tag=${tag}`, true);
        xhr_test.send();

        xhr_test.onreadystatechange = () => {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("----p14 n2 today_GetBaseDividendInfo2返回=", resData);
                //得到数据渲染

                if (resData.msg != null) {
                    //得到数据所有的key
                    let c = []
                    for (var key in resData.msg) {
                        c.push(key)
                    }

                    //分别遍历key  
                    if (c.length > 0) {
                        for (let i = 0; i < c.length; i++) {
                            let key = c[i]
                            //对应的第一条数据

                            if (resData.msg[key].length > 0) {
                                if (tag == 1) {
                                    if (n == 'week') {
                                        Database.p14_n2_zyj_qp_t = resData.msg[key][0].amount
                                    }
                                    if (n == 'lastweek') {
                                        //总业绩 = 第一条的团队业绩
                                        Database.p14_n2_zyj_qp_l = resData.msg[key][0].amount
                                    }



                                }
                                if (tag == 5) {
                                    if (n == 'week') {
                                        Database.p14_n2_zyj_dz_t = resData.msg[key][0].amount
                                    }
                                    if (n == 'lastweek') {
                                        //总业绩 = 第一条的团队业绩
                                        Database.p14_n2_zyj_dz_l = resData.msg[key][0].amount
                                    }


                                }
                            }


                        }

                    }




                }
                b()
                xhr_test.abort();
            }


        }


    },///
    //92专用 n 表示日期 加1 是明天  减一是昨天  week表示周一
    n2_GetStockBonusAccountByID_p14(b) {


        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        // PARAMS { 
        //     account_name 用户ID         
        //     token 密匙         
        //     first_date 用户ID -  
        //     last_date 
        //      game_tag 游戏分类 可选1 棋牌 5电子
        // 
        xhr_test.open("GET", host + `/proxy/user/GetStockBonusAccountByID?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&id=${gHandler.gameGlobal.player.account_name}`, true);
        xhr_test.send();

        xhr_test.onreadystatechange = () => {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("----p14 n2 GetStockBonusAccountByID 返回=", resData);
                //得到数据渲染
                if (resData.msg) {
                    console.log('1');
                    if (resData.msg.id) {
                        console.log('2');
                        Database.p14_show_flag = resData.msg.id
                    }

                }

                b()
                xhr_test.abort();
            }


        }


    },
    //查询自己的查询保底分成规则 无限代保底分红
    n2_p9_GetBaseDividendRule(num, a) {

        // http://proxy.lymrmfyp.com/proxy/User/GetBaseDividendRule?token=3dbcddb1bc40623a0370ca87a64b5f96&account_name=750086613
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();

        xhr_test.open("GET", host + `/proxy/user/GetBaseDividendRule2?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&id=${gHandler.gameGlobal.player.account_name}&game_tag=${num}`, true);
        xhr_test.send();
        console.log("GET", host + `/proxy/user/GetBaseDividendRule1?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&id=${gHandler.gameGlobal.player.account_name}&game_tag=${num}`);

        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("/proxy/user/jd_GetBaseDividendRule1返回", resData);
                if (num == 1) {
                    if (resData.msg == null) {

                        if (gHandler.app.pinpai == 'ninetwo') {
                            Database.p9_qp_aumont = '200元。'
                        }

                    } else {
                        Database.p9_qp_aumont = resData.msg.income + '元.'

                    }
                    console.log('Database.p9_qp_aumont=', Database.p9_qp_aumont);
                }
                if (num == 5) {
                    if (!resData.msg) {

                        if (gHandler.app.pinpai == 'ninetwo') {
                            Database.p9_dz_aumont = '130元。'
                        }


                    } else {
                        Database.p9_dz_aumont = resData.msg.income + '元.'

                    }
                    console.log('n2    Database.p9_dz_aumont=', Database.p9_dz_aumont);
                }

                a();
                xhr_test.abort();
            }

        };



    },
    //查询下级的查询保底分成规则
    n2_Center_GetBaseDividendRule(id, num, a) {


        let host = gHandler.gameGlobal.proxy.proxy_host;
        var xhr_test = new XMLHttpRequest();

        xhr_test.open("GET", host + `/proxy/user/GetBaseDividendRule2?id=${id}&account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&game_tag=${num}`, true);

        cc.log(host + `/proxy/user/GetBaseDividendRule2?id=${id}&account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&game_tag=${num}`);


        xhr_test.send();
        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                console.log('DividendRule1 resData.msg===', resData.msg);
                if (resData.msg == null) {
                    console.log('无数据');
                    //默认100
                    Database.page9_aumont = '100'

                    //92 预设
                    if (num == 1 && gHandler.app.pinpai == 'ninetwo') {
                        Database.page9_n2qp_aumont = '' + 200
                    }
                    if (num == 5 && gHandler.app.pinpai == 'ninetwo') {
                        Database.page9_n2dz_aumont = '' + 130
                    }

                } else {
                    if (num == 1 && gHandler.app.pinpai == 'ninetwo') {
                        Database.page9_n2qp_aumont = '' + resData.msg.income
                    }
                    if (num == 5 && gHandler.app.pinpai == 'ninetwo') {
                        Database.page9_n2dz_aumont = '' + resData.msg.income
                    }
                }

                if (num == 1 && gHandler.app.pinpai == 'ninetwo') {
                    cc.log('下级 n2 电子 Database.page9_aumont===', Database.page9_n2qp_aumont);
                }
                if (num == 5 && gHandler.app.pinpai == 'ninetwo') {
                    cc.log('下级 n2 棋牌 Database.page9_aumont===', Database.page9_n2dz_aumont)
                }
                cc.log('下级  Database.page9_aumont===', Database.page9_aumont);
                a()
                xhr_test.abort();
            }

        };

    },
    //皇室专用    p4
    huangshi_getDividendRule() {
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        // PARAMS { 
        //     account_name 用户ID         
        //     token 密匙         
        //     id 用户ID -  
        //     type 分红类型(1.流失 2.亏损) 可选 
        //     - game_tag 游戏分类 可选
        //  }

        xhr_test.open("GET", host + `/proxy/user/getDividendRule?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&id=${gHandler.gameGlobal.player.account_name}&game_tag=${commonVal.gametags}&type=1`, true);

        xhr_test.send();

        xhr_test.onreadystatechange = () => {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("p4 load 我的比例 游戏类型=", commonVal.gametags, " /proxy/user/getDividendRule返回", resData);
                //得到数据渲染

                if (resData.msg != null) {
                    let a = []
                    // console.log('getDividendRule返回resData.msg.length=', resData.msg.length, a);
                    for (let index = 0; index < resData.msg.length; index++) {
                        a[index] = parseFloat(resData.msg[index].percent)

                    }
                    //从大到小排序
                    if (a.length > 1) {
                        a.sort(function (a, b) {
                            return a - b
                        })
                    }
                    console.log('a[0]====', a[0]);
                    Database.hs_p4_gz = Math.floor(a[0] * 0.05 * 0.5 * 100 * 100) / 100;

                    cc.log(' Database.hs_p4_gz ===', Database.hs_p4_gz);

                    // console.log('a=====',a, Database.hx_p6_gz);
                }

                xhr_test.abort();
            }

        };
    },
    //92 nice 接口 专捞取个人 团队 数据 GetProxyGroupInfo p9 p15
    n2_GetProxyGroupInfo_p9(n, b) {
        // Proxy/User/GetProxyGroupInfo
        // *@****************************
        // *@description:團隊投注充值資訊
        // *@author: rosco
        // *@create: 2021-12-07 22:40
        // *@****************************
        // *@ [input]
        // *@ start_date 开始时间
        // *@ end_date 结束时间
        // *@ id 玩家id
        // *@ sort_rule (可選)ex.Asc(小到大).Desc(大到小)
        // *@ sort_key (可選)排序欄位(回傳欄位)
        // *@ page (可選)当前页
        // *@ limit (可選)每页条数
        // *@****************************
        // *@ [output] Array
        // *@ user_id 用戶id
        // *@ user_create_time 註冊時間
        // *@ user_top_up_total 個人充值
        // *@ user_bet_total 個人下注
        // *@ user_link_num 團隊總人數
        // *@ user_link_top_up_total 團隊充值
        // *@ user_link_bet_total 團隊下注
        // *@ user_link_direct_num 直屬下級人數

        let data = Database.getUnixtimestamp0(Database.getNowFormatDate(n));
        let last = Database.getUnixtimestamp(Database.getNowFormatDate(n));
        if (n == 'week') {
            data = Database.getUnixtimestamp0(Database.getThisweekDate());
            last = Database.getUnixtimestamp(Database.getNowFormatDate(0));
        }
        if (n == 'lastweek') {
            data = Database.getUnixtimestamp0(Database.getlastweekDate())
            last = Database.getUnixtimestamp(Database.getlastweekDate7())
        }
        if (n == 'month') {
            data = Database.getUnixtimestamp0(Database.getNowFormatDate(n))
            last = Database.getUnixtimestamp(Database.getNowFormatDate(0));
        }


        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        // PARAMS { 
        //     account_name 用户ID         
        //     token 密匙         
        //     start_time 开始时间 -  时间戳
        //     end_time 结束时间 -   时间戳
        //      ids [] 传入下级ID
        xhr_test.open("GET", host + `/proxy/user/GetProxyGroupInfo?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&start_time=${data}&end_time=${last}&id=${gHandler.gameGlobal.player.account_name}`, true);
        xhr_test.send();
        cc.log("GET", host + `/proxy/user/GetProxyGroupInfo?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&start_time=${data}&end_time=${last}&id=${gHandler.gameGlobal.player.account_name}`)
        xhr_test.onreadystatechange = () => {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("----p9 n2 捞取个人 团队 数据 返回=", resData);
                //得到数据渲染

                if (resData.msg != null) {

                    Database.n2_p9_zsxjwjzs = resData.msg
                }
                // xhr_test.abort();
                b()
            }


        }


    },
};
module.exports = commonVal;
