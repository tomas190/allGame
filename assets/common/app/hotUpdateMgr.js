/*
 * @Author: burt
 * @Date: 2019-08-29 10:46:50
 * @LastEditors  : burt
 * @LastEditTime : 2020-01-02 18:40:45
 * @Description: 
 */
let gHandler = require("gHandler");
let crypto = require('crypto');
let nodeJsBufferTool = require('buffer').Buffer;
let hotUpdateMgr = {
    manifestPre: "",
    _failCount: 0,
    _hallManifest: null,
    _data: {
        subname: "",
        version: "1.0.0",
        remotev: '1.0.0',
    },
    updataList: [],
    data: {},
    _progress: 0,
    _log: "",
    _tag: "\r\n",

    init(hallmanifest) {
        if (!cc.sys.isBrowser) {
            this._storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'subGame/');
        } else {
            this._storagePath = 'subGame/';
        }
        this._hallManifest = hallmanifest;
    },

    _checkCb: function (event) {
        let failed = false
        let retry = false
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:  // 0
                this.log("没有本地manifest文件," + event.getAssetId() + "," + event.getMessage())
                gHandler.eventMgr.dispatch(gHandler.eventMgr.hotFail, this.data.subname)
                failed = true
                retry = true
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:  // 1
                this.log("下载manifest文件错误," + event.getAssetId() + "," + event.getMessage())
                gHandler.eventMgr.dispatch(gHandler.eventMgr.hotCheckup, false, this.data.subname)
                failed = true
                retry = true
                break;
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:  // 2
                this.log("解析manifest文件错误," + event.getAssetId() + "," + event.getMessage())
                gHandler.eventMgr.dispatch(gHandler.eventMgr.hotCheckup, false, this.data.subname)
                failed = true
                retry = true
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:  // 3
                this.log("发现新的更新")
                gHandler.eventMgr.dispatch(gHandler.eventMgr.hotCheckup, true, this.data.subname)
                this.hotUpdate(this.data.subname)
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:  // 4
                this.log("已经是最新的版本")
                gHandler.eventMgr.dispatch(gHandler.eventMgr.hotCheckup, false, this.data.subname)
                failed = true
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:  // 5
                // this.log("更新进展")
                break;
            case jsb.EventAssetsManager.ASSET_UPDATED:  // 6
                this.log("需要更新cb")
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:  // 7
                this.log("更新错误")
                failed = true
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:  // 8
                this.log("更新完成")
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:  // 9
                this.log("更新失败")
                failed = true
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:  // 10
                this.log("解压失败")
                break;
        }

        if (failed) {
            this._am.setEventCallback(null);
            this._checkListener = null;
            this.sendlog()
            this._am = null;
            if (retry) {
                this.checkUpdate(this.data);
            } else if (this.updataList.length > 0) {
                let data = this.updataList.shift();
                this.checkUpdate(data);
            }
        }
    },

    _updateCb: function (event) {
        var failed = false;
        let retry = false
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:  // 0
                this.log("up没有本地manifest文件")
                failed = true;
                retry = true
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:  // 1
                this.log("up下载manifest文件错误," + event.getAssetId() + "," + event.getMessage())
                failed = true;
                retry = true
                break;
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:  // 2
                this.log("up解析manifest文件错误," + event.getAssetId() + "," + event.getMessage())
                gHandler.eventMgr.dispatch(gHandler.eventMgr.hotCheckup, false, this.data.subname)
                failed = true;
                retry = true
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:  // 3
                this.log("up发现新的更新")
                gHandler.eventMgr.dispatch(gHandler.eventMgr.hotCheckup, true, this.data.subname)
                this._am.update();
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:  // 4
                this.log("up已经是最新的版本")
                gHandler.eventMgr.dispatch(gHandler.eventMgr.hotCheckup, false, this.data.subname)
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:  // 5
                // let tempprogress = event.getDownloadedBytes() / event.getTotalBytes()
                let tempprogress = event.getPercentByFile() //event.getDownloadedFiles() / event.getTotalFiles()
                tempprogress = gHandler.commonTools.fixedFloat(tempprogress)
                if (this._progress != tempprogress) {
                    // this.log("up更新进展 文件数", event.getDownloadedFiles(), event.getTotalFiles(), event.getDownloadedBytes(), event.getTotalBytes())
                    this._progress = tempprogress
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.hotProgress, this._progress, this.data.subname)
                }
                break;
            case jsb.EventAssetsManager.ASSET_UPDATED:  // 6
                // this.log("up需要更新ub")
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:  // 7
                this.log("up更新错误," + this._failCount + "次," + event.getAssetId())
                this.log("up更新错误", event.getMessage(), "curleCode", event.getCURLECode(), "curlmCode", event.getCURLMCode())
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:  // 8
                this.log("up更新完成")
                this._progress = 0
                this._am.setEventCallback(null);
                this.m_updataAfter();
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:  // 9
                this.log("up更新失败," + this._failCount + "次")
                this._progress = 0
                this._failCount++;
                // if (this._failCount <= 5) {
                this.sendlog()
                this._canRetry = true;
                setTimeout(() => { // 失败后，延时一秒再开始下载更新失败的文件，防止被高防阻挡
                    this._retry();
                }, 1000)
                // } else {
                // gHandler.eventMgr.dispatch(gHandler.eventMgr.hotFail, this.data.subname)
                // }
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:  // 10
                this.log("up解压失败," + event.getAssetId() + "," + event.getMessage())
                break;
            default:
                break;
        }

        if (failed) {
            this._am.setEventCallback(null);
            this.data = this._data;
            this.sendlog()
            this._am = null;
            if (retry) {
                this.checkUpdate(this.data);
            } else if (this.updataList.length > 0) {
                let data = this.updataList.shift();
                this.checkUpdate(data);
            }
        }
    },
    // 更新前移除本地 *_temp  project.manifest  更新文件
    m_updataBefore() {
        let path = jsb.fileUtils.getWritablePath() + 'subGame_temp'
        let file = path + '/project.manifest.temp'
        if (jsb.fileUtils.isFileExist(file)) {
            this.log('remove preupdata temp file:' + jsb.fileUtils.removeFile(file))
        }
        let remoteManifest = this._storagePath + '/project.manifest'
        if (jsb.fileUtils.isFileExist(remoteManifest)) {
            this.log("本地project.manifest文件未删除")
            this.log('remove project file:' + jsb.fileUtils.removeFile(remoteManifest))
        }
    },
    /**
     * @Description: 子游戏进入验证
     */
    checkSubGame(checkManifest, callback, data) {
        let check = this.checkFile(checkManifest, callback, data)
        if (check.bool) {
            let remotestr = jsb.fileUtils.getStringFromFile(checkManifest)
            remotestr = JSON.parse(remotestr)
            remotestr.version = '0.0.0'
            remotestr.assets = check.manifest.asserts
            jsb.fileUtils.writeStringToFile(JSON.stringify(remotestr), checkManifest)
            if (this._am) {
                this.updataList.unshift(data);
                gHandler.eventMgr.dispatch(gHandler.eventMgr.hotWait, data.subname)
            } else {
                this.checkUpdate({
                    subname: data.subname,
                    version: "0.0.0",
                })
            }
        } else {
            callback && callback()
        }
    },
    /**
     * @Description: 遍历文件验证 文件是否存在
     */
    checkFile(checkManifest) {
        if (this.data.subname == "hall" || this.data.subname == "") {
            return { bool: false, manifest: null };
        }
        if (jsb.fileUtils.isFileExist(checkManifest)) {
            let remotestr = jsb.fileUtils.getStringFromFile(checkManifest)
            remotestr = JSON.parse(remotestr)
            let assets = remotestr.assets
            let needRetry = false
            let retryassets = {}
            for (let k in assets) {
                let assetpath = this._storagePath + k
                if (!jsb.fileUtils.isFileExist(assetpath)) {
                    this.log("本地丢失文件", k)
                    needRetry = true
                    retryassets[k] = {
                        'size': assets[k].size,
                        'md5': "0"
                    }
                } else {
                    // let dataBinary = jsb.fileUtils.getDataFromFile(assetpath);
                    // let sirData = nodeJsBufferTool.from(dataBinary)
                    // let localmd5 = crypto.createHash('md5').update(sirData).digest('hex');
                    // if (localmd5 != assets[k].md5) {
                    //     this.log("------- md5 不同", localmd5, assets[k].md5, assetpath);
                    //     needRetry = true
                    //     retryassets[k] = {
                    //         'size': assets[k].size,
                    //         'md5': "0"
                    //     }
                    // } else {
                    retryassets[k] = {
                        'size': assets[k].size,
                        'md5': assets[k].md5
                    }
                    // }
                }
            }
            this.log("是否有缺失", needRetry)
            if (needRetry) {
                remotestr.version = '0.0.0'
                remotestr.assets = retryassets
            }
            return { bool: needRetry, manifest: remotestr };
        }
        return { bool: false, manifest: null };
    },
    /**
     * @Description: 文件比对 失败重新更新
     */
    m_updataAfter() {
        this._am = null;
        gHandler.eventMgr.dispatch(gHandler.eventMgr.hotCheck, this.data.subname)
        let checkManifest = this._storagePath + '/project.manifest'
        let check = this.checkFile(checkManifest)
        this.log("check.bool", check.bool)
        if (check.bool) {
            this.log("比对后存在没有下载成功的文件")
            let rmanifest = new jsb.Manifest(JSON.stringify(check.manifest), this._storagePath);
            this._newAssetManeger();
            if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
                this._am.loadLocalManifest(rmanifest, this._storagePath);
            }
            if (!this._am.getLocalManifest() || !this._am.getLocalManifest().isLoaded()) {
                this.log('加载重新尝试的manifest文件失败 ...');
                gHandler.eventMgr.dispatch(gHandler.eventMgr.hotUp, this.data.subname)
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "更新文件出错，重新下载失败")
                return
            }
            this._am.setEventCallback(this._checkCb.bind(this));
            this.log("开始重新更新")
            this._am.checkUpdate();
        } else {
            this.m_renameManifest()
        }
    },
    /**
     * @Description: 修改下载的manifest文件
     */
    m_renameManifest() {
        this._log = ""
        let file = this._storagePath + '/version.manifest'
        let newfile = this._storagePath + '/' + this.manifestPre + 'version.manifest'
        if (jsb.fileUtils.isFileExist(file)) {
            this.log('version file exist')
            let str = jsb.fileUtils.getStringFromFile(file)
            let mod = JSON.parse(str).module
            if (mod) {
                if (file == newfile) {
                    this.log('rename same,so dont need to do')
                } else {
                    let re = jsb.fileUtils.renameFile(file, newfile)
                    this.log('rename project:' + re)
                    if (!re) {
                        if (gHandler.Reflect && gHandler.Reflect.renameTo) {
                            let isok = gHandler.Reflect.renameTo(file, newfile)
                            if (!isok) {
                                this.log('remove project file:' + jsb.fileUtils.removeFile(file))
                            }
                        } else {
                            this.log('remove project file:' + jsb.fileUtils.removeFile(file))
                        }
                    }
                }
            } else {
                this.log('remove project file:' + jsb.fileUtils.removeFile(file))
            }
        }

        file = this._storagePath + '/project.manifest'
        newfile = this._storagePath + '/' + this.manifestPre + 'project.manifest'
        if (jsb.fileUtils.isFileExist(file)) {
            let str = jsb.fileUtils.getStringFromFile(file)
            let mstr = JSON.parse(str)
            let mod = mstr.module
            if (mod == "hall" || mod == "") {
                gHandler.localStorage.globalSet(gHandler.appGlobal.versionKey, mstr.version)
            } else {
                gHandler.localStorage.set(mod, "versionKey", mstr.version)
            }
            if (mod) {
                if (file == newfile) {
                    this.log('rename same,so dont need to do')
                } else {
                    if (!jsb.fileUtils.renameFile(file, newfile)) {
                        if (!gHandler.Reflect.renameTo(file, newfile)) {
                            this.log('remove project file:' + jsb.fileUtils.removeFile(file))
                        }
                    }
                }
            } else {
                this.log('remove project file:' + jsb.fileUtils.removeFile(file))
            }
        } else {
            if (this.data.subname == "hall" || this.data.subname == "") {
                gHandler.localStorage.globalSet(gHandler.appGlobal.versionKey, this.data.version)
            } else {
                gHandler.localStorage.set(this.data.subname, "versionKey", this.data.version)
            }
        }

        gHandler.eventMgr.dispatch(gHandler.eventMgr.hotFinish, this.data.subname)
        if (this.updataList.length > 0) {
            let data = this.updataList.shift();
            this.checkUpdate(data);
        }
        if (this.data.subname == 'hall') {
            cc.audioEngine.stopAll();
            cc.game.restart();
        }
    },
    /**
     * @Description: 尝试重新更新 更新失败 的文件
     */
    _retry: function () {
        if (this._canRetry) {
            this._canRetry = false;
            this.log('Retry failed Assets...');
            this._am.downloadFailedAssets();
        }
    },
    /**
     * @Description: 获取本地 project.manifest 路径
     */
    getLocalManifestPath: function (subname) {
        return this._storagePath + subname + "_project.manifest"
    },

    _loadCustomManifest: function (subname) {
        this.manifestPre = (subname ? subname + "_" : "")
        // this.log("pre", this.manifestPre)
        let localpath = this.getLocalManifestPath(subname);  //本地project.manifest文件路径
        this.log("本地manifest路径：", localpath)
        if (cc.loader.md5Pipe) {
            localpath = cc.loader.md5Pipe.transformURL(localpath)
        }
        if (jsb.fileUtils.isFileExist(localpath)) {
            this._am.loadLocalManifest(localpath)
            this.log("使用本地存在的manifest文件")
        } else {
            if (subname == 'hall' && this._hallManifest) {
                var nurl = this._hallManifest.nativeUrl;
                this.log("native url", nurl)
                if (cc.loader.md5Pipe) {
                    nurl = cc.loader.md5Pipe.transformURL(nurl);
                }
                this._am.loadLocalManifest(nurl);
            } else {
                let url = gHandler.localStorage.getGlobal().hotServerKey + "/" + gHandler.appGlobal.packgeName + "/";
                this.log("url", url + this.manifestPre + "project.manifest")
                var customManifestStr = JSON.stringify({
                    "packageUrl": url,
                    "remoteManifestUrl": url + this.manifestPre + "project.manifest",
                    "remoteVersionUrl": url + this.manifestPre + "version.manifest",
                    "version": this.data.version,
                    "assets": {},
                    "searchPaths": []
                });
                var manifest = new jsb.Manifest(customManifestStr, this._storagePath);
                this._am.loadLocalManifest(manifest, this._storagePath);
                this.log('使用构建的manifest文件：', manifest);
            }
        }
    },
    /**
     * @Description: 本地资源md5码计算
     */
    calculateMD5(assetpath) {
        let dataBinary = jsb.fileUtils.getDataFromFile(assetpath);
        let sirData = nodeJsBufferTool.from(dataBinary)
        let localmd5 = crypto.createHash('md5').update(sirData).digest('hex'); // 与打包时的MD5码计算一致 CRLF LF 变化需要注意，会造成MD5不同
        return localmd5
    },
    /**
     * @Description: 构建一个新的热更管理器
     */
    _newAssetManeger() {
        this.versionCompareHandle = (versionA, versionB) => {
            this.log("版本对比: local version A is " + versionA + ', remote version B is ' + versionB);
            let m_remoteManifest = this._am.getRemoteManifest()
            if (m_remoteManifest) {
                this.log("热更地址", m_remoteManifest.getPackageUrl())
            }
            var vA = versionA.split('.');
            var vB = versionB.split('.');
            for (var i = 0; i < vA.length; ++i) {
                var a = parseInt(vA[i]);
                var b = parseInt(vB[i] || 0);
                if (a === b) {
                    continue;
                } else {
                    // return a - b;
                    return -1; // 只要版本不同即更新，保证可以版本回退
                }
            }
            if (vB.length > vA.length) {
                return -1;
            } else {
                return 0;
            }
        };
        this._am = new jsb.AssetsManager('', this._storagePath, this.versionCompareHandle);
        this._am.setVerifyCallback((storagePath, asset) => { // 资源检查
            let localmd5 = this.calculateMD5(storagePath)
            // var compressed = asset.compressed; // 是否为压缩文件
            // var relativePath = asset.path; // 服务器端相对路径
            if (localmd5 == asset.md5) {
                return true;
            }
            console.log("localmd5, asset.md5,", localmd5, asset.md5)
            console.log("storagePath", storagePath)
            return false
        });
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            this._am.setMaxConcurrentTask(2);
        }
        this._canRetry = false;
        this._failCount = 0;
        this._progress = 0
        this.m_updataBefore();
    },
    /**
     * @Description: 获取子游戏是否在更新列表中
     */
    getSubGameIsOnUp(subGameName) {
        for (let i = 0; i < this.updataList.length; i++) {
            if (subGameName == this.updataList[i].subname) {
                return true
            }
        }
        return false
    },
    /**
     * @Description: 开始更新
     */
    checkUpdate: function (data) {
        if (this._am) {
            let insert = true;
            if (data.subname == this.data.subname) {
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "正在下载中")
                return false
            }
            for (let i = 0; i < this.updataList.length; i++) {
                if (this.updataList[i].subname == data.subname) {
                    insert = false;
                    this.updataList.splice(i, 1);
                    this.log('取消更新 ...', data.subname);
                    break;
                }
            }
            insert && this.updataList.push(data);
            this.log('正在检查更新 或 正在更新中 ...', insert ? '插入' + data.subname : "");
            return insert;
        }
        for (let k in this._data) {
            this.data[k] = data[k] || this._data[k]
        }
        this._newAssetManeger()
        if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
            this._loadCustomManifest(this.data.subname);
        }
        if (!this._am.getLocalManifest() || !this._am.getLocalManifest().isLoaded()) {
            this.log('加载本地manifest文件失败 ...');
            return false;
        }
        // this._am.setEventCallback(this._checkCb.bind(this));
        // this._am.checkUpdate(); // downloadVersion

        this._am.setEventCallback(this._updateCb.bind(this));

        let hallversion = gHandler.localStorage.globalGet(gHandler.appGlobal.versionKey)
        this.log('开始更新 version', this.data.version, 'hallversion', hallversion)
        let verstr = ''
        if (this.data.subname == 'hall') {
            verstr = this.data.remotev + '/'
        } else if (hallversion) {
            verstr = hallversion + '/'
        }
        let packageUrl = gHandler.appGlobal.hotServer + "/" + gHandler.appGlobal.packgeName + "/" + verstr
        let callback = (responseText) => {
            this.log('responseText.packageUrl', responseText.packageUrl)
            responseText.packageUrl = packageUrl
            this.log("修改热更地址", packageUrl)
            var customManifestStr = JSON.stringify(responseText);
            var manifest = new jsb.Manifest(customManifestStr, this._storagePath);
            this.log('loadRemoteManifest', this._am.loadRemoteManifest(manifest))
        }
        let failcallback = (status) => {
            this.log("更新失败 status", status)
            this.log("packageUrl", packageUrl)
            gHandler.eventMgr.dispatch(gHandler.eventMgr.hotCheckup, false, this.data.subname)
            this._am.setEventCallback(null);
            this._checkListener = null;
            this._am = null;
            if (this.updataList.length > 0) {
                let data = this.updataList.shift();
                this.checkUpdate(data);
            }
        }
        gHandler.http.sendRequestGet(packageUrl + this.manifestPre + 'project.manifest', null, callback, failcallback)

        return true;
    },
    // 正式进行热更
    hotUpdate: function (subname) {
        if (this._am) {
            this._am.setEventCallback(this._updateCb.bind(this));
            if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
                this._loadCustomManifest(subname);
            }
            this._failCount = 0;
            this._am.update();
        }
    },
    /**
     * @Description: apk下载失败
     */
    downfail(task, errorCode, errorCodeInternal, errorStr) {
        this.log(task, errorCode, errorCodeInternal, errorStr)
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "apk更新错误 errorCode" + errorCode + "," + errorStr)
        gHandler.eventMgr.dispatch(gHandler.eventMgr.hotFail, "apk")
    },
    /**
     * @Description: apk下载过程
     */
    downprogress(task, bytesReceived, totalBytesReceived, totalBytesExpected) {
        // this.log("downprogress", totalBytesReceived / totalBytesExpected)
        let tempprogress = totalBytesReceived / totalBytesExpected
        tempprogress = gHandler.commonTools.fixedFloat(tempprogress)
        gHandler.eventMgr.dispatch(gHandler.eventMgr.hotProgress, tempprogress, 'apk')
    },
    /**
     * @Description: apk下载成功
     */
    dwonsuccess(task) {
        let dirpath = jsb.fileUtils.getWritablePath() + "data/";
        let filepath = dirpath + "app-release.apk";
        gHandler.eventMgr.dispatch(gHandler.eventMgr.hotFinish, "apk")
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity",
            "installApkAction",
            "(Ljava/lang/String;)V", filepath);
        this.log("down success!!!!");
        cc.game.end();
    },

    /**
     * @Description: 下载apk安装包
     */
    downloadApk(url) {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            // this.log("开始下载apk")
            gHandler.eventMgr.dispatch(gHandler.eventMgr.hotCheckup, true, "安装包")
            // let downloadUrl = "http://upgrade.539316.com/apk/allgame-debug.apk";
            let downloadUrl = url;
            let dirpath = jsb.fileUtils.getWritablePath() + "data/";
            let filepath = dirpath + "app-release.apk";
            let downloader = new jsb.Downloader();
            downloader.createDownloadFileTask(downloadUrl, filepath, "down_test");
            downloader.setOnTaskError(this.downfail.bind(this));
            downloader.setOnTaskProgress(this.downprogress.bind(this));
            downloader.setOnFileTaskSuccess(this.dwonsuccess.bind(this))
        }
    },
    log() {
        let data = ""
        for (let i = 0; i < arguments.length; i++) {
            data += arguments[i] + " "
        }
        cc.log("_HotLog_", data);
        this._log += data + this._tag;
    },
    sendlog() {
        if (gHandler.logMgr) {
            gHandler.logMgr.sendMLog(this._log)
            this._log = ""
        }
    },

}

module.exports = hotUpdateMgr
