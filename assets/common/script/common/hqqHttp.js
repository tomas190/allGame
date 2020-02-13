/*
 * @Author: burt
 * @Date: 2019-07-29 16:40:03
 * @LastEditors  : burt
 * @LastEditTime : 2020-02-10 18:45:22
 * @Description: http 
 */
let gHandler = require("gHandler");
let hqqHttp = {
    m_remoteUrl: "",
    /**
     * @Description: 通用的XMLHttpRequest请求函数
     * method           方法
     * contenttype      Content-Type
     * urlto            地址
     * param            参数
     * callback         成功回调
     * outcallback      超时回调
     * failcallback     失败回调
     * needJsonParse    是否需要jsonparse返回值
     */
    sendXMLHttpRequest(mydata) {
        if (!mydata.urlto) {
            return cc.log("url 参数为空")
        }
        if (!mydata.method) {
            return cc.log("method 参数为空")
        }
        let xhr = new XMLHttpRequest();
        let alreadyCallBack = false;
        let timer = setTimeout(() => {
            if (mydata.outcallback && !alreadyCallBack) {
                xhr.abort(); // 如果请求已经被发送，则立刻终止请求
                mydata.outcallback(xhr.readyState, xhr.status);
                alreadyCallBack = true;
            }
            clearTimeout(timer);
        }, 3000)
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                clearTimeout(timer);
                if (xhr.status >= 200 && xhr.status < 400) {
                    if (mydata.callback) {
                        if (mydata.needJsonParse) {
                            mydata.callback(JSON.parse(xhr.responseText), mydata.urlto)
                        } else {
                            mydata.callback(xhr.responseText, mydata.urlto)
                        }
                        alreadyCallBack = true
                    }
                } else {
                    if (mydata.failcallback) {
                        mydata.failcallback(xhr.status)
                        alreadyCallBack = true
                    }
                }
            }
        }
        xhr.open(mydata.method, mydata.urlto, true); // 初始化一个请求        
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
    sendRequestPost(urlto, param, callback) {
        let data = {
            method: 'POST',
            urlto: urlto,
            param: param,
            callback: callback,
            needJsonParse: true,
        }
        this.sendXMLHttpRequest(data)
    },
    /**
     * @Description: 请求密码本
     */
    sendSecretRequestGet(urlto, param, callback) {
        let data = {
            method: 'GET',
            urlto: urlto,
            param: param,
            callback: callback,
        }
        this.sendXMLHttpRequest(data)
    },
    /**
     * @Description: ip方式get请求
     */
    sendRequestIpGet(urlto, endurl, callback, outcallback) {
        if (urlto.indexOf("http:") == -1 && urlto.indexOf("https:") == -1) {
            urlto = "http://" + urlto + endurl
        } else {
            urlto = urlto + endurl
        }
        let data = {
            method: 'GET',
            urlto: urlto,
            callback: callback,
            outcallback: outcallback,
            needJsonParse: true,
        }
        this.sendXMLHttpRequest(data)
    },
    /**
     * @Description: ip方式post请求
     */
    sendRequestIpPost(urlto, param, callback, outcallback) {
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
            outcallback: outcallback,
            needJsonParse: true,
        }
        this.sendXMLHttpRequest(data)
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
        let timer = setTimeout(() => {
            xhr.abort(); // 如果请求已经被发送，则立刻终止请求
            clearTimeout(timer);
        }, 3000)
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                clearTimeout(timer);
                if (xhr.status >= 200 && xhr.status < 400) {
                    callBack && callBack(true, filepath)
                } else {
                    callBack && callBack(false)
                }
            }
        }
        let str = '';
        if (gHandler.appGlobal.pinpai == 'test') {
            xhr.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded')
            for (const key in param) {
                str += `${key}=${param[key]}&`
            }
            str = str.slice(0, -1)
        } else {
            str = JSON.stringify(param);
        }
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
     * @Description: Content-Type  application/x-www-form-urlencoded 请求
     */
    ajax(method, url, data, successFn, faildFn) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var response = JSON.parse(xhr.responseText);
                    successFn(response)
                } else {
                    if (faildFn) {
                        faildFn(xhr.status)
                    }
                }
            }
        };
        xhr.open(method, url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(data);
    },
    /**
     * @Description: 专门测试线路的请求
     */
    ping(urlto, head, endurl, callback, errcallback) {
        head = head || ""
        endurl = endurl || null
        let xhr = new XMLHttpRequest();
        let m_url = urlto || this.m_remoteUrl;
        if (head) {
            m_url = head + m_url;
        }
        if (endurl) {
            m_url += endurl;
        }
        let timer = setTimeout(() => {
            xhr.abort(); // 如果请求已经被发送，则立刻终止请求
            if (xhr.readyState < 4 && errcallback) {
                errcallback("timeout");
            }
            clearTimeout(timer);
        }, 3000)
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                clearTimeout(timer);
                if (xhr.status >= 200 && xhr.status < 400) {
                    if (callback) {
                        callback(urlto);
                    }
                } else if (xhr.status >= 400 && xhr.status < 500) {
                    errcallback("connectError");
                } else if (xhr.status >= 500) {
                    errcallback("serverError");
                }
            }
        };
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
        // cc.log("requestFastestUrl", urllist)
        head = head || ""
        endurl = endurl || null
        let hasreceive = false;
        let callback = (url) => {
            if (!hasreceive && url) {
                hasreceive = true;
                mcallback && mcallback(url)
            }
        }
        let errcallback = (errstr) => {
            // cc.log(errstr)
            let t = 0
            let c = 0
            let s = 0
            if (errstr == 'timeout') {
                t++
            } else if (errstr == 'connectError') {
                c++
            } else if (errstr == 'serverError') {
                s++
            }
            if ((t + c + s) == urllist.length && merrcallback) {
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
}

module.exports = hqqHttp;
