<<<<<<< HEAD

=======
/*
 * @Author: burt
 * @Date: 2019-07-29 16:40:03
 * @LastEditors  : burt
 * @LastEditTime : 2020-02-10 18:45:22
 * @Description: http 
 */
let gHandler = require("gHandler");
>>>>>>> 1d13304ef16cf6bd8851bc1c4693c3ec45597bd8
let hqqHttp = {
    m_remoteUrl: "",
    /**
     * @Description: 通用的XMLHttpRequest请求函数
     * method           方法
     * contenttype      Content-Type
     * urlto            地址
     * param            参数
     * callback         成功回调
     * failcallback     失败回调
     * needJsonParse    是否需要jsonparse返回值
     * timeout          超时
     * failtimeout      失败超时
     */
    sendXMLHttpRequest(mydata) {
        if (!mydata.urlto) {
            return cc.log("url 参数为空")
        }
        if (!mydata.method) {
            return cc.log("method 参数为空")
        }
<<<<<<< HEAD
=======
        let xhr = new XMLHttpRequest();
        let alreadyCallBack = false;
>>>>>>> 1d13304ef16cf6bd8851bc1c4693c3ec45597bd8
        let timer = setTimeout(() => {
            if (mydata.failcallback) {
                mydata.failcallback(xhr.status, true)
                mydata = null
            }
        }, mydata.failtimeout ? mydata.failtimeout : 4000)
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                clearTimeout(timer)
                if (xhr.status >= 200 && xhr.status < 400) {
                    if (mydata.callback) {
                        if (mydata.needJsonParse) {
                            mydata.callback(JSON.parse(xhr.responseText), mydata.urlto)
                        } else {
                            mydata.callback(xhr.responseText, mydata.urlto)
                        }
                    }
                } else {
                    if (mydata.failcallback) {
                        mydata.failcallback(xhr.status)
                    }
                }
            }
        }
<<<<<<< HEAD
        xhr.open(mydata.method, encodeURI(mydata.urlto), true); // 初始化一个请求 针对特殊字符进行  encodeURIComponent 编码转换 
        // xhr.open(mydata.method, mydata.urlto, true); // 初始化一个请求        
=======
        xhr.open(mydata.method, mydata.urlto, true); // 初始化一个请求        
>>>>>>> 1d13304ef16cf6bd8851bc1c4693c3ec45597bd8
        if (mydata.contenttype) {
            xhr.setRequestHeader("Content-Type", mydata.contenttype)
        } else {
            xhr.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded')
        }
        var str = ''
        if (typeof mydata.param == 'object') {
            for (const key in mydata.param) {
                str += `${key}=${mydata.param[key]}&`
            }
            str = str.slice(0, -1)
        } else {
            str = mydata.param
        }
<<<<<<< HEAD
        xhr.timeout = mydata.timeout ? mydata.timeout : 3000 // 超时 xhr.readyState = 4，调用failcallback
=======
>>>>>>> 1d13304ef16cf6bd8851bc1c4693c3ec45597bd8
        xhr.send(mydata.param ? str : null); // 发送请求，默认是异步请求，请求发送后立刻返回
    },
    /**
     * @Description: 域名get请求
     */
    sendRequestGet(urlto, param, callback, failcallback, outcallback) {
        let data = {
            method: 'GET',
            urlto: urlto,
            param: param,
            callback: callback,
            needJsonParse: true,
            failcallback: failcallback,
            outcallback: outcallback,
        }
        this.sendXMLHttpRequest(data)
    },
    /**
     * @Description: 域名post请求
     */
    sendRequestPost(urlto, param, callback, failcallback) {
        let data = {
            method: 'POST',
            urlto: urlto,
            param: param,
            callback: callback,
            needJsonParse: true,
            failcallback: failcallback,
        }
        this.sendXMLHttpRequest(data)
    },
    /**
     * @Description: 请求密码本
     */
    sendSecretRequestGet(urlto, param, callback, failcallback) {
        let data = {
            method: 'GET',
            urlto: urlto,
            param: param,
            callback: callback,
            failcallback: failcallback,
        }
        this.sendXMLHttpRequest(data)
    },
    /**
     * @Description: ip方式get请求
     */
<<<<<<< HEAD
    sendRequestIpGet(urlto, endurl, callback, failcallback) {
=======
    sendRequestIpGet(urlto, endurl, callback, outcallback) {
>>>>>>> 1d13304ef16cf6bd8851bc1c4693c3ec45597bd8
        if (urlto.indexOf("http:") == -1 && urlto.indexOf("https:") == -1) {
            urlto = "http://" + urlto + endurl
        } else {
            urlto = urlto + endurl
        }
        let data = {
            method: 'GET',
            urlto: urlto,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: true,
        }
        this.sendXMLHttpRequest(data)
    },
    /**
     * @Description: ip方式post请求
     */
<<<<<<< HEAD
    sendRequestIpPost(urlto, param, callback, failcallback) {
=======
    sendRequestIpPost(urlto, param, callback, outcallback) {
>>>>>>> 1d13304ef16cf6bd8851bc1c4693c3ec45597bd8
        if (urlto.indexOf("http:") == -1 && urlto.indexOf("https:") == -1) {
            urlto = "http://" + urlto
        } else {
            urlto = urlto
        }
        let data = {
            method: 'POST',
            urlto: urlto,
            param: param,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: true,
        }
        this.sendXMLHttpRequest(data)
    },
    /**
<<<<<<< HEAD
     * @Description: 详细配置的方式http请求
     * data.method           方法
     * data.contenttype      Content-Type
     * data.urlto            地址
     * data.param            参数
     * data.callback         成功回调
     * data.failcallback     失败回调
     * data.needJsonParse    是否需要jsonparse返回值
     * data.timeout          超时
     * data.failtimeout      失败超时
     */
    sendRequestDetail(data) {
        if (!data.urlto) {
            return console.log("请配置http地址")
        }
        if (!data.method) {
            return console.log("请配置http方法")
        }
        if (data.urlto.indexOf("http:") == -1 && data.urlto.indexOf("https:") == -1) {
            data.urlto = "http://" + data.urlto
        } else {
            data.urlto = data.urlto
        }
        let xmldata = {
            method: data.method,
            urlto: data.urlto,
            param: data.param,
            callback: data.callback,
            failcallback: data.failcallback,
            needJsonParse: data.needJsonParse,
            timeout: data.timeout,
            failtimeout: data.failtimeout,
        }
        this.sendXMLHttpRequest(xmldata)
    },
    /**
=======
>>>>>>> 1d13304ef16cf6bd8851bc1c4693c3ec45597bd8
     * @Description: 发送日志
     */
    sendRequestLogPost(urlto, param, filepath, callBack) {
        let xhr = new XMLHttpRequest();
        let m_url = urlto;
        if (urlto.indexOf("http:") == -1 && urlto.indexOf("https:") == -1) {
            m_url = "http://" + urlto
        }
        xhr.open("POST", m_url, true); // 初始化一个请求
<<<<<<< HEAD
=======
        let timer = setTimeout(() => {
            xhr.abort(); // 如果请求已经被发送，则立刻终止请求
            clearTimeout(timer);
        }, 3000)
>>>>>>> 1d13304ef16cf6bd8851bc1c4693c3ec45597bd8
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    callBack && callBack(true, filepath)
                } else {
                    xhr.abort(); // 如果请求已经被发送，则立刻终止请求
                    callBack && callBack(false)
                }
            }
        }
        let str = '';
<<<<<<< HEAD
        xhr.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded')
        for (const key in param) {
            str += `${key}=${param[key]}&`
        }
        str = str.slice(0, -1)
        xhr.timeout = 3000
=======
        if (gHandler.appGlobal.pinpai == 'test') {
            xhr.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded')
            for (const key in param) {
                str += `${key}=${param[key]}&`
            }
            str = str.slice(0, -1)
        } else {
            str = JSON.stringify(param);
        }
>>>>>>> 1d13304ef16cf6bd8851bc1c4693c3ec45597bd8
        xhr.send(str); // 发送请求，默认是异步请求，请求发送后立刻返回
    },
    majax(payUrl, dataStr, callback, outcallback) {
        let data = {
            method: 'POST',
            urlto: payUrl,
            param: dataStr,
            callback: callback,
            outcallback: outcallback,
            needJsonParse: true,
            failcallback: outcallback,
        }
        this.sendXMLHttpRequest(data)
    },
    /**
     * @Description: 专门测试线路的请求
     */
    ping(urlto, head, endurl, callback, errcallback) {
        head = head || ""
        endurl = endurl || null
        urlto = urlto.replace(/\s+/g, "")
        let xhr = new XMLHttpRequest();
        let m_url = urlto;
        if (head) {
            m_url = head + m_url;
        }
        if (endurl) {
            m_url += endurl;
        }
        let timer = setTimeout(() => {
            xhr.abort(); // 如果请求已经被发送，则立刻终止请求 Cancels any network activity.
            errcallback("dead", xhr.status)
        }, 4000)
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                clearTimeout(timer)
                if (xhr.status >= 200 && xhr.status < 400) {
                    if (callback) {
                        callback(urlto);
                    }
                } else if (xhr.status >= 400 && xhr.status < 500) {
                    errcallback("connectError", xhr.status);
                } else if (xhr.status >= 500) {
                    errcallback("serverError", xhr.status);
                } else {
                    xhr.abort(); // 如果请求已经被发送，则立刻终止请求
                    errcallback("timeout", xhr.status);
                }
            }
        };
        xhr.timeout = 3000
        xhr.open("GET", m_url, true);
        xhr.send();
    },

    /** 线路选择
     * @param {array} urllist url列表
     * @param {string} head url前缀
     * @param {string} endurl url尾缀
     * @param {function} mcallback 回调函数
     */
    requestFastestUrl(urllist, head, endurl, mcallback, merrcallback) {
        head = head || ""
        endurl = endurl || null
        let hasreceive = false;
        let callback = (url) => {
            if (!hasreceive && url) {
                hasreceive = true;
                mcallback && mcallback(url)
            }
        }
        let t = 0
        let c = 0
        let s = 0
        let d = 0
        let errcallback = (errstr, status) => {
            // cc.log(errstr, status)
            if (errstr == 'timeout') {
                t++
            } else if (errstr == 'connectError') {
                c++
            } else if (errstr == 'serverError') {
                s++
            } else if (errstr == 'serverError') {
                d++
            }
            if ((t + c + s + d) == urllist.length && merrcallback) {
                merrcallback()
                // let str = ""
                // if (t > 0) {
                //     str += "timeout "
                // }
                // if (c > 0) {
                //     str += "conerr "
                // }
                // if (s > 0) {
                //     str += "sererr "
                // }
                // let gHandler = require("gHandler");
                // console.log("urllist", urllist)
                // gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, str)
            }
        }
        for (let i = 0; i < urllist.length; i++) {
            this.ping(urllist[i], head, endurl, callback, errcallback)
        }
    },
    /**
     * @Description: 线路稳定性测试
     */
    stabilityPing(url, head, endurl, callback) {
        url = url.replace(/\s+/g, "")
        let m_url = url
        head && (m_url = head + m_url);
        endurl && (m_url += endurl);
        let timeout = 1000 // 超时时间
        let requesetTime = 100 // 测试次数
        let minGetTime = 0
        let maxGetTime = 0
        let averageTime = 0
        let timeNow = 0
        let error = { 'url': url, err: [] }
        function requesetOne() {
            let xhr = new XMLHttpRequest()
            xhr.timeout = timeout
            let timestart
            xhr.onloadstart = () => {
                timestart = Date.now()
            }
            xhr.ontimeout = (data) => {
                timeNow++
                error.err.push({ 'errtype': "timeout" + xhr.status, 'timeNow': timeNow })
                if (timeNow == requesetTime) {
                    callback(error, url, maxGetTime, minGetTime, averageTime)
                } else {
                    setTimeout(() => {
                        requesetOne()
                    }, 100);
                }
            }
            xhr.onerror = (data) => {
                timeNow++
                error.err.push({ 'errtype': "error" + xhr.status, 'timeNow': timeNow })
                if (timeNow == requesetTime) {
                    callback(error, url, maxGetTime, minGetTime, averageTime)
                } else {
                    setTimeout(() => {
                        requesetOne()
                    }, 100);
                }
            }
            xhr.onload = () => {
                let spendtime = Date.now() - timestart
                if (spendtime > maxGetTime) {
                    maxGetTime = spendtime
                }
                if (minGetTime == 0) {
                    minGetTime = spendtime
                }
                if (spendtime < minGetTime) {
                    minGetTime = spendtime
                }
                timeNow++
                if (timeNow == requesetTime) {
                    averageTime = averageTime / requesetTime
                    callback(error, url, maxGetTime, minGetTime, averageTime)
                } else {
                    averageTime += spendtime
                    setTimeout(() => {
                        requesetOne()
                    }, 100);
                }
            }
            xhr.open("GET", m_url, true);
            xhr.send();
        }
        requesetOne()
    },
    /**
     * @Description: 请求最稳定的线路
     */
    requestStabilityUrl(urllist, head, endurl, mcallback, merrcallback) {
        head = head || ""
        endurl = endurl || ""
        let len = urllist.length
        let sortarry = []
        let totalnum = 0
        let errnum = 0
        let merrarry = []
        let sortfunc = (resultlist, merrarry) => {
            resultlist.sort(function (a, b) {
                if (a.floatTime && b.floatTime) {
                    return a.floatTime - b.floatTime
                }
            })
            // console.log('resultlist', resultlist)
            // console.log('merrarry', merrarry)
            let stable = resultlist[0]
            if (resultlist[1]) {
                stable = resultlist[0].averageTime < resultlist[1].averageTime ? resultlist[0] : resultlist[1]
            }
            mcallback && mcallback(stable, resultlist, merrarry)
        }
        let callback = (errarry, url, maxGetTime, minGetTime, averageTime) => {
            totalnum++
            if (errarry.err.length > 0) { // 此条线路不行
                errnum++
                errarry.maxGetTime = maxGetTime
                errarry.minGetTime = minGetTime
                errarry.floatTime = maxGetTime - minGetTime
                errarry.averageTime = averageTime
                merrarry.push(errarry)
                if (errnum == len) {
                    merrcallback(errarry)
                } else if (totalnum == len) {
                    sortfunc(sortarry, merrarry)
                }
            } else { // 此条线路可以，记录
                sortarry.push({ "url": url, "maxGetTime": maxGetTime, "minGetTime": minGetTime, "floatTime": maxGetTime - minGetTime, "averageTime": averageTime })
                if (totalnum == len) {
                    sortfunc(sortarry, merrarry)
                }
            }
        }
        for (let i = 0; i < urllist.length; i++) {
            this.stabilityPing(urllist[i], head, endurl, callback)
        }
    },
    /**
     * @Description: 线路恒定检测
     */
    serverCheck(serverDB, callback) {
        function checkEnd() {
            for (let k = 0; k < serverDB.serverList.length; k++) {
                if (serverDB.serverList[k].status == 0) {
                    return // 有线路没有测完
                }
            }
            let choiceob = JSON.parse(JSON.stringify(serverDB.serverList))
            choiceob.sort(function (a, b) { // 错误排序
                return a.errnum - b.errnum
            })
            let ob = []
            for (let i = 0; i < choiceob.length; i++) {
                if (choiceob[i].errnum == 0) {
                    ob.push(choiceob[i])
                }
            }
            if (ob.length < 4) {
                ob = choiceob.slice(0, choiceob.length < 4 ? choiceob.length : 4)
            }
            // console.log("错误排序", ob)
            ob.sort(function (a, b) { // 浮动时间排序
                return (a.maxGetTime - a.minGetTime) - (b.maxGetTime - b.minGetTime)
            })
            ob = ob.slice(0, Math.floor(ob.length / 2) + 1)
            ob.sort(function (a, b) { // 平均时间排序
                return a.averageTime - b.averageTime
            })
            for (let i = 0; i < serverDB.serverList.length; i++) {
                serverDB.serverList[i].status = 0
            }
            serverDB.stable = ob[0]
            callback && callback(serverDB)
        }
        function checkOne(index, serverDB) {
            let xhr = new XMLHttpRequest()
            xhr.timeout = 1000 // 超时时间
            serverDB.serverList[index].testnum++
            let avnernum = serverDB.serverList[index].testnum
            if (serverDB.serverList[index].testnum >= 100) {
                serverDB.serverList[index].errnum = serverDB.serverList[index].errnum - 0.01 > 0 ? serverDB.serverList[index].errnum - 0.01 : serverDB.serverList[index].errnum
                avnernum = 99
            }

            let timestart
            xhr.onloadstart = () => {
                timestart = Date.now()
            }
            xhr.ontimeout = () => {
                let spendtime = 100000
                serverDB.serverList[index].maxGetTime = spendtime
                serverDB.serverList[index].averageTime = (avnernum * serverDB.serverList[index].averageTime + spendtime) / (avnernum + 1) // 加权平均
                serverDB.serverList[index].errnum++
                serverDB.serverList[index].status = 1 // 已测试
                checkEnd()
            }
            xhr.onerror = () => {
                let spendtime = 100000
                serverDB.serverList[index].maxGetTime = spendtime
                serverDB.serverList[index].averageTime = (avnernum * serverDB.serverList[index].averageTime + spendtime) / (avnernum + 1) // 加权平均
                serverDB.serverList[index].errnum++
                serverDB.serverList[index].status = 1 // 已测试
                checkEnd()
            }
            xhr.onload = () => {
                let spendtime = Date.now() - timestart
                if (spendtime > serverDB.serverList[index].maxGetTime) {
                    serverDB.serverList[index].maxGetTime = spendtime
                }
                if (serverDB.serverList[index].minGetTime == 0) {
                    serverDB.serverList[index].minGetTime = spendtime
                } else if (spendtime < serverDB.serverList[index].minGetTime) {
                    serverDB.serverList[index].minGetTime = spendtime
                }
                if (serverDB.serverList[index].maxGetTime * 0.99 > serverDB.serverList[index].minGetTime * 1.01) {
                    serverDB.serverList[index].maxGetTime *= 0.99
                    serverDB.serverList[index].minGetTime *= 1.01
                }
                serverDB.serverList[index].averageTime = (avnernum * serverDB.serverList[index].averageTime + spendtime) / (avnernum + 1) // 加权平均
                serverDB.serverList[index].status = 1 // 已测试
                checkEnd()
            }
            xhr.open("GET", serverDB.serverList[index].url + "/checked", true);
            xhr.send();
        }
        let checknum = 0
        let timer = setInterval(() => {
            if (checknum == serverDB.serverList.length) {
                clearInterval(timer)
                return
            }
            checkOne(checknum, serverDB)
            checknum++
        }, 100)
        // for (let i = 0; i < serverDB.serverList.length; i++) {
        //     checkOne(i, serverDB)
        // }
    },

}

module.exports = hqqHttp;
