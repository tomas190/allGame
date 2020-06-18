let appGlobal = require("appGlobal");
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
        let url = mydata.urlto
        if (url.indexOf("http:") == -1 && url.indexOf("https:") == -1) {
            url = "http://" + url;
        }
        url = url.replace(/\s+/g, "");
        if (mydata.head) {
            url = mydata.head + url;
        }
        if (mydata.endurl) {
            url += mydata.endurl;
        }
        let xhr = new XMLHttpRequest();
        let hascall = false
        let timer = setTimeout(() => {
            if (mydata.failcallback) {
                let status = xhr.status;
                xhr.abort();
                if (hascall) {
                    return
                }
                hascall = true
                mydata.failcallback(status, true, mydata.urlto, "setTimeout");
            } else {
                xhr.abort();
            }
            mydata = null;
        }, mydata.failtimeout ? mydata.failtimeout : 4000)
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                clearTimeout(timer);
                if (xhr.status >= 200 && xhr.status < 400) {
                    if (mydata.callback) {
                        if (mydata.needJsonParse) {
                            let responseText = xhr.responseText;
                            xhr.abort();
                            if (hascall) {
                                return
                            }
                            hascall = true
                            mydata.callback(JSON.parse(responseText), mydata.urlto);
                        } else {
                            let responseText = xhr.responseText;
                            xhr.abort();
                            if (hascall) {
                                return
                            }
                            hascall = true
                            mydata.callback(responseText, mydata.urlto);
                        }
                    }
                } else {
                    console.log("mgr --- xhr.status", xhr.status, mydata.urlto)
                    if (mydata.failcallback) {
                        let status = xhr.status;
                        xhr.abort();
                        if (hascall) {
                            return
                        }
                        hascall = true
                        mydata.failcallback(status, false, mydata.urlto, "ontimeout");
                    } else {
                        xhr.abort();
                    }
                }
            }
        }
        xhr.ontimeout = () => {
            console.log("mgr --- ontimeout", mydata.urlto)
            if (mydata.failcallback) {
                let status = xhr.status;
                xhr.abort();
                if (hascall) {
                    return
                }
                hascall = true
                mydata.failcallback(status, false, mydata.urlto, "ontimeout");
            } else {
                xhr.abort();
            }
        }
        xhr.onerror = () => {
            console.log("mgr --- onerror", mydata.urlto)
            if (mydata.failcallback) {
                let status = xhr.status;
                xhr.abort();
                if (hascall) {
                    return
                }
                hascall = true
                mydata.failcallback(status, false, mydata.urlto, "onerror");
            } else {
                xhr.abort();
            }
        }
        xhr.open(mydata.method, encodeURI(url), true); // 初始化一个请求 针对特殊字符进行  encodeURIComponent 编码转换 
        if (mydata.contenttype) {
            xhr.setRequestHeader("Content-Type", mydata.contenttype);
        } else {
            xhr.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
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
        xhr.timeout = mydata.timeout ? mydata.timeout : 3000 // 超时 xhr.readyState = 4，调用failcallback
        xhr.send(mydata.param ? str : null); // 发送请求，默认是异步请求，请求发送后立刻返回
        return xhr
    },
    /**
     * @Description: ip方式get请求
     */
    sendRequestIpGet(urlto, endurl, callback, failcallback) {
        let data = {
            method: 'GET',
            urlto: urlto,
            endurl: endurl,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: false,
        }
        this.sendXMLHttpRequest(data);
    },
    /**
     * @Description: 发送日志
     */
    sendRequestLogPost(urlto, param, filepath, callBack) {
        let xhr = new XMLHttpRequest();
        let m_url = urlto;
        if (urlto.indexOf("http:") == -1 && urlto.indexOf("https:") == -1) {
            m_url = "http://" + urlto
        }
        xhr.open("POST", m_url, true); // 初始化一个请求
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    xhr.abort()
                    callBack && callBack(true, filepath)
                } else {
                    xhr.abort()
                    callBack && callBack(false, null, "status")
                }
            }
        }
        xhr.ontimeout = () => {
            xhr.abort();
            callBack && callBack(false, null, "ontimeout")
        }
        xhr.onerror = () => {
            xhr.abort();
            callBack && callBack(false, null, "onerror")
        }
        let str = '';
        xhr.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded')
        for (const key in param) {
            str += `${key}=${param[key]}&`
        }
        str = str.slice(0, -1)
        xhr.timeout = 7000
        xhr.send(str); // 发送请求，默认是异步请求，请求发送后立刻返回
    },
    /** 单线线路选择
     * @param {array} urllist url列表
     * @param {string} head url前缀
     * @param {string} endurl url尾缀
     * @param {function} callback 回调函数
     * @param {function} merrcallback 失败回调函数
     */
    requestFastestUrlLine(data) {
        if (!data.urllist) {
            return console.log("请配置http列表地址")
        }
        let checknum = 0;
        let hasreceive = false;
        let callback = (responseText, urlto, checknum) => {
            if (!hasreceive && urlto) {
                hasreceive = true;
                data.callback && data.callback(responseText, urlto, checknum)
            }
        }
        let needJsonParse = data.needJsonParse
        let errcallback = (status, forcejump, url, err) => {
            // console.log("请求失败", checknum, data.urllist.length, data.urllist[checknum])
            checknum++
            if (data.tipcallback) {
                data.tipcallback(checknum)
            }
            if (hasreceive) {
                return
            }
            if (checknum < data.urllist.length) {
                this.sendXMLHttpRequest({
                    method: 'GET',
                    urlto: data.urllist[checknum],
                    head: data.head,
                    endurl: data.endurl,
                    callback: callback,
                    needJsonParse: needJsonParse,
                    failcallback: errcallback,
                    timeout: data.timeout,
                    failtimeout: data.failtimeout,
                })
            } else {
                data.failcallback && data.failcallback(status, forcejump, url, err)
            }
        }
        this.sendXMLHttpRequest({
            method: 'GET',
            urlto: data.urllist[checknum],
            head: data.head,
            endurl: data.endurl,
            callback: callback,
            needJsonParse: needJsonParse,
            failcallback: errcallback,
            timeout: data.timeout,
            failtimeout: data.failtimeout,
        })
    },
    /**
     * @Description: 线路恒定检测
     */
    requestStableUrlLine(data) {
        let checknum = 0;
        let interval = 3000;
        let callback = (returnList, url, isserver) => {
            // console.log("一条线路检测结束", url)
            let choiceob = JSON.parse(JSON.stringify(returnList.serverList))
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
            returnList.stable = ob[0]
            data.callback && data.callback(returnList, checknum, isserver)
            checknum++
            for (let k = 0; k < returnList.serverList.length; k++) {
                if (returnList.serverList[k].status == 0) {
                    // console.log("没测试完一轮", new Date().getSeconds())
                    setTimeout(() => {
                        this.sendrequestStableUrlLine(returnList, checknum, callback, isserver)
                    }, interval)
                    return // 有线路没有测完
                }
            }
            for (let k = 0; k < returnList.serverList.length; k++) {
                returnList.serverList[k].status = 0
            }
            checknum = 0;
            if (isserver) {
                isserver = !isserver
                setTimeout(() => {
                    this.sendrequestStableUrlLine(data.hotserverList, checknum, callback, isserver)
                }, interval)
            } else {
                isserver = !isserver
                setTimeout(() => {
                    this.sendrequestStableUrlLine(data.storageList, checknum, callback, isserver)
                }, interval)
            }
        }
        this.sendrequestStableUrlLine(data.storageList, checknum, callback, true)
    },
    sendrequestStableUrlLine(data, checknum, callback, isserver) {
        // console.log("线路检测开始", data.serverList)
        // console.log("线路检测开始", checknum, isserver, data.serverList[checknum].url, new Date().getSeconds())
        let xhr = new XMLHttpRequest()
        xhr.timeout = 1000
        data.serverList[checknum].testnum++
        let avnernum = data.serverList[checknum].testnum
        if (data.serverList[checknum].testnum >= 100) {
            data.serverList[checknum].errnum = data.serverList[checknum].errnum - 0.01 > 0 ? data.serverList[checknum].errnum - 0.01 : data.serverList[checknum].errnum
            avnernum = 99
        }
        let timestart
        xhr.onloadstart = () => {
            timestart = Date.now()
        }
        xhr.ontimeout = () => {
            xhr.abort()
            let spendtime = 100000
            data.serverList[checknum].maxGetTime = spendtime
            data.serverList[checknum].averageTime = (avnernum * data.serverList[checknum].averageTime + spendtime) / (avnernum + 1)
            data.serverList[checknum].errnum++
            data.serverList[checknum].status = 1
            callback(data, data.serverList[checknum].url, isserver)
        }
        xhr.onerror = () => {
            xhr.abort()
            let spendtime = 100000
            data.serverList[checknum].maxGetTime = spendtime
            data.serverList[checknum].averageTime = (avnernum * data.serverList[checknum].averageTime + spendtime) / (avnernum + 1)
            data.serverList[checknum].errnum++
            data.serverList[checknum].status = 1
            callback(data, data.serverList[checknum].url, isserver)
        }
        xhr.onload = () => {
            let spendtime = Date.now() - timestart
            if (spendtime > data.serverList[checknum].maxGetTime) {
                data.serverList[checknum].maxGetTime = spendtime
            }
            if (data.serverList[checknum].minGetTime == 0) {
                data.serverList[checknum].minGetTime = spendtime
            } else if (spendtime < data.serverList[checknum].minGetTime) {
                data.serverList[checknum].minGetTime = spendtime
            }
            if (data.serverList[checknum].maxGetTime * 0.99 > data.serverList[checknum].minGetTime * 1.01) {
                data.serverList[checknum].maxGetTime *= 0.99
                data.serverList[checknum].minGetTime *= 1.01
            }
            data.serverList[checknum].averageTime = (avnernum * data.serverList[checknum].averageTime + spendtime) / (avnernum + 1)
            data.serverList[checknum].status = 1
            xhr.abort()
            callback(data, data.serverList[checknum].url, isserver)
        }
        if (isserver) {
            xhr.open("GET", data.serverList[checknum].url + "/checked", true);
        } else {
            xhr.open("GET", data.serverList[checknum].url + "/" + appGlobal.hotupdatePath + "/" + 'version.json?' + Math.floor(Math.random() * 10000), true);
        }
        xhr.send();
    }
}

module.exports = hqqHttp;
