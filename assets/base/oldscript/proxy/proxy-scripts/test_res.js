let gHandler = require('gHandler')
let commonVal = require('proxy-http')
cc.Class({


  onload() {
    //进入先登录拿token 
    //渲染中间的表格
    let host = gHandler.gameGlobal.proxy.proxy_host;
    let url = host + "/Proxy/User/login";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //本地测试用此段代码
     var sendData = `account_name=${gHandler.gameGlobal.player.account_name}&password=123456`;
    //正常情况下
    //var sendData = `account_name=${gHandler.gameGlobal.player.account_name}&token=${gHandler.gameGlobal.token}`
    xhr.send(sendData);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status === 200) {
        var resData = JSON.parse(xhr.responseText);
        cc.log("/Proxy/User/login返回:", resData);
        if (resData.code === 200) {
          commonVal.token = resData.msg.token;
          //所有接口均在请求完毕后调用

        } else {
          canvasScript.onMessagePrefabNeeded(null, "获取数据失败");
        }
      }
      xhr.abort();
    };





  },
  // 1. 接口 user/createDividendRule  //创造规则  
  createDividendRule() {
    let host = gHandler.gameGlobal.proxy.proxy_host
    var xhr_test = new XMLHttpRequest();
    xhr_test.open("POST", host + "/proxy/user/createDividendRule", true);
    cc.log('host ===',host);
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

    // child_id ：  你可以使用  534590365,  845605930,  这两个
    // type 分红类型(1.流失 2.亏损)   随你设置,  设置后不能修改
    //game_tag 游戏分类1  棋牌类型游戏 2. 彩票类型游戏 3. 体育类型游戏   4. 视讯类型游戏
    //amount 统计金额要求         30000        
    //percent 分红比例                  30%






    var sendData = `account_name=${gHandler.gameGlobal.player.account_name
      }&token=${commonVal.token}&child_id=534590365&type=1&game_tag=1&demand_type=1&demand_tag=2&amount=30000&percent=30%`;

    cc.log("/proxy/user/createDividendRule请求:", sendData);

    xhr_test.send(sendData);

    xhr_test.onreadystatechange = function () {
      if (xhr_test.readyState == 4 && xhr_test.status === 200) {
        var resData = JSON.parse(xhr_test.responseText);

        cc.log("/proxy/user/createDividendRule返回", resData);
      }
      xhr_test.abort();
    };
  },
  //2 接口2  .setDividendRule  
  setDividendRule() {
    let host = gHandler.gameGlobal.proxy.proxy_host
    var xhr_test = new XMLHttpRequest();
    xhr_test.open("POST", host + "/proxy/user/setDividendRule ", true);
    xhr_test.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var sendData = `account_name=${gHandler.gameGlobal.player.account_name
      }&token=${commonVal.token}`;

    cc.log("/proxy/user/setDividendRule请求:", sendData);
    xhr_test.send(sendData);
    xhr_test.onreadystatechange = function () {
      if (xhr_test.readyState == 4 && xhr_test.status === 200) {
        var resData = JSON.parse(xhr_test.responseText);
        cc.log("/proxy/user/setDividendRule返回", resData);
      }
      xhr_test.abort();
    };
  },
  // 3. 接口 getDividendRule 
  getDividendRule() {
    let host = gHandler.gameGlobal.proxy.proxy_host
    var xhr_test = new XMLHttpRequest();

    xhr_test.open("GET", host + `/proxy/user/getDividendRule?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}`, true);
    xhr_test.send();
    xhr_test.onreadystatechange = function () {
      if (xhr_test.readyState == 4 && xhr_test.status === 200) {
        var resData = JSON.parse(xhr_test.responseText);
        cc.log("/proxy/user/getDividendRule返回", resData);
      }
      xhr_test.abort();
    };
  }
})
