
'use strict';
const Os = require('os')
const Fs = require('fire-fs');
const Path = require('path');
const child_process = require("child_process");
const crypto = require('crypto');
const { exit } = require('process');
//配置资源所属模块，仅需要配置scene 和 resources文件夹中文件,会自动计算依赖
//支持一个文件配置多个模块 以 & 连接
//配置文件迁移，具体配置建项目中 project.txt文件
let m_projectPath = ''
let m_pngPath = ''
let m_icnsPath = ''
let m_icoPath = ''
let m_projPath = ''
let m_packageName = ''
let m_plateform = '' // web-mobile android
let m_gamename = ''
let m_pinpai = ''
let m_huanjin = ''
let m_versionjson = null
let m_language = 'CN'
let m_country = 'china'
let m_currency = 'rmb'
let m_buildPath = ''
let m_gitPath = "D:\\Burt\\cocos_game\\hotupdate\\upgrade-server\\"
let m_webGitPath = 'D:\\Burt\\cocos_game\\hotupdate\\web-mobile\\'
let m_pathTag = "/"
//有分皮肤加载的大厅
let hallPinPaiList=["fuxin","xingui","xinsheng","xinlong"];
//有分皮肤加载的子游戏品牌
let subGamePinPaiList = ["fuxin"];
//有分皮肤加载的子游戏资源
let subGamePinPaiResList = { 
                            "fuxin":{
                                        "bjl":["bjl_fuxin","bjlRes"],
                                        "lhd":["lhd_fuxin","lhdRes_fuxin"],
                                    }
                        };

function onBuildStart(options, callback) {
    // Editor.log("onBuildStart", options)
    m_projectPath = options.project
    m_buildPath = options.project + m_pathTag + "build" + m_pathTag + "jsb-link"
    m_pngPath = options.project + '/packages/hqq/icon/icon.png'
    m_icnsPath = options.project + '/packages/hqq/icon/Icon.icns'
    m_icoPath = options.project + '/packages/hqq/icon/game.ico'
    m_projPath = options.dest
    let tempstrArray = options.android.packageName.split(".");
    if( tempstrArray.length > 4 ){
        tempstrArray.splice(4,tempstrArray.length - 4 )
    }
    m_packageName = tempstrArray[0]+"."+tempstrArray[1]+"."+tempstrArray[2]+"."+tempstrArray[3];
    Editor.log("onBuildStart m_packageName", m_packageName)
    m_plateform = options.actualPlatform
    m_gamename = options.title
    if (m_plateform == "android") {
        if (m_packageName.match('dev') || m_packageName.match('Dev')) {
            m_huanjin = 'dev'
        } else if (m_packageName.match('pre') || m_packageName.match('Pre')) {
            m_huanjin = 'pre'
        } else {
            m_huanjin = 'online'
        }
        if (m_packageName.match("AG") || m_packageName.match("Test") || m_packageName.match("test")) {
            m_pinpai = 'test'
        } else if (m_packageName.match("debi" || m_gamename.match("Debi"))) {
            m_pinpai = 'debi'
        } else if (m_packageName.match("xingba") || m_packageName.match("Xingba")) {
            m_pinpai = 'xingba'
        } else if (m_packageName.match("yuyu") || m_packageName.match("Yuyu")) {
            m_pinpai = 'yuyu'
        } else if (m_packageName.match("xinsheng") || m_packageName.match("Xinsheng")) {
            m_pinpai = 'xinsheng'
        } else if (m_packageName.match("xingui") || m_packageName.match("Xingui")) {
            m_pinpai = 'xingui'
        } else if (m_packageName.match("fuxin") || m_packageName.match("Fuxin")) {
            m_pinpai = 'fuxin'
        } else if (m_packageName.match("xinhao") || m_packageName.match("Xinhao")) {
            m_pinpai = 'xinhao'
        } else if (m_packageName.match("xinlong") || m_packageName.match("Xinlong")) {
            m_pinpai = 'xinlong'
        } else if (m_packageName.match("nineone") ) {
            m_pinpai = 'nineone'
        } else if (m_packageName.match("Huangshi") || m_packageName.match("huangshi")) {
            m_pinpai = 'huangshi'
        } else if (m_packageName.match("Juding") || m_packageName.match("juding")) {
            m_pinpai = 'juding'
        } else if (m_packageName.match("Huaxing") || m_packageName.match("huaxing")) {
            m_pinpai = 'huaxing'
        } else if (m_packageName.match("Ninetwo") || m_packageName.match("ninetwo")) {
            m_pinpai = 'ninetwo'
        } else if (m_packageName.match("Tianqi") || m_packageName.match("tianqi")) {
            m_pinpai = 'tianqi'
        } else if (m_packageName.match("Chaofan") || m_packageName.match("chaofan")) {
            m_pinpai = 'chaofan'
        } else if (m_packageName.match("wansheng") || m_packageName.match("wansheng")) {
            m_pinpai = 'wansheng'
        }
    } else if (m_plateform == "web-mobile" || m_plateform == "web-desktop") {
        if (m_gamename.match('dev') || m_gamename.match('Dev')) {
            m_huanjin = 'dev'
        } else if (m_gamename.match('pre') || m_gamename.match('Pre')) {
            m_huanjin = 'pre'
        } else {
            m_huanjin = 'online'
        }
        if (m_gamename.match("Tst") || m_gamename.match("Test") || m_packageName.match("test")) {
            m_pinpai = 'test'
        } else if (m_gamename.match("debi") || m_gamename.match("Debi")) {
            m_pinpai = 'debi'
        } else if (m_gamename.match("xingba") || m_packageName.match("Xingba")) {
            m_pinpai = 'xingba'
        } else if (m_gamename.match("yuyu") || m_packageName.match("Yuyu")) {
            m_pinpai = 'yuyu'
        } else if (m_packageName.match("xinsheng") || m_packageName.match("Xinsheng")) {
            m_pinpai = 'xinsheng'
        } else if (m_packageName.match("xingui") || m_packageName.match("Xingui")) {
            m_pinpai = 'xingui'
        } else if (m_packageName.match("fuxin") || m_packageName.match("Fuxin")) {
            m_pinpai = 'fuxin'
        } else if (m_packageName.match("xinhao") || m_packageName.match("Xinhao")) {
            m_pinpai = 'xinhao'
        } else if (m_packageName.match("xinlong") || m_packageName.match("Xinlong")) {
            m_pinpai = 'xinlong'
        } else if (m_packageName.match("nineone") ) {
            m_pinpai = 'nineone'
        } else if (m_packageName.match("Huangshi") || m_packageName.match("huangshi")) {
            m_pinpai = 'huangshi'
        } else if (m_packageName.match("Juding") || m_packageName.match("juding")) {
            m_pinpai = 'juding'
        } else if (m_packageName.match("Huaxing") || m_packageName.match("huaxing")) {
            m_pinpai = 'huaxing'
        } else if (m_packageName.match("Ninetwo") || m_packageName.match("ninetwo")) {
            m_pinpai = 'ninetwo'
        } else if (m_packageName.match("Tianqi") || m_packageName.match("tianqi")) {
            m_pinpai = 'tianqi'
        } else if (m_packageName.match("Chaofan") || m_packageName.match("chaofan")) {
            m_pinpai = 'chaofan'
        } else if (m_packageName.match("wansheng") || m_packageName.match("wansheng")) {
            m_pinpai = 'wansheng'
        }
    }
    m_packageName = options.android.packageName
    Editor.log("<--Myplugin--> onBuildStart 品牌", m_packageName, m_pinpai, "环境", m_huanjin)
    if (Os.platform() == "win32") {
        m_pathTag = "\\"
    } else {
        m_pathTag = "/"
    }
    let tversionjson = Fs.readFileSync(m_projectPath + "/version.json", 'utf8')
    m_versionjson = JSON.parse(tversionjson)
    if (m_plateform == "android") {
        if (!Fs.existsSync(m_projPath) || !Fs.isDirSync(m_projPath)) {
            _changeTemplatesPackageName(options)
        } else {
            _checkPackageName(options)
        }
        _replaceIcons()
        _changePackageInfoInJava()
        _changeApkName()
    }
    callback()
}
/*
1. 若资源 A被大厅引用，又被其他游戏引用，则此资源属于大厅
2. 若资源 B被多个游戏同时引用，记录所有引用的模块，打包模块时包含此资源
*/
function onBuildFinish(options, callback) {
    // Editor.log("onBuildFinish", options)
    if (m_plateform == "android") {
        _buildHotUpdata243(options)
    }
    // Editor.log('<--Myplugin--> onBuildFinish')
    callback()
}
module.exports = {
    load() {
        // 当 package 被正确加载的时候执行
        Editor.Builder.on('build-start', onBuildStart);
        Editor.Builder.on('build-finished', onBuildFinish);
    },
    unload() {
        // 当 package 被正确卸载的时候执行
        Editor.Builder.removeListener('build-start', onBuildStart);
        Editor.Builder.removeListener('build-finished', onBuildFinish);
    },
    messages: {
        open() {
            // Editor.log("我的插件：1、热更新分包；2、替换应用图片")
            Editor.Panel.open('hqq');
        },
        'changeLanguage'(event, value) {
            Editor.log("我的插件 修改语言：", value)
            m_language = value
        },
        'changeCountry'(event, value) {
            Editor.log("我的插件 修改国家：", value)
            m_country = value
        },
        'changeCurrency'(event, value) {
            Editor.log("我的插件 修改币种：", value)
            m_currency = value
        },
        'changeGitPath'(event, value) {
            Editor.log("我的插件 修改git仓库路径：", value)
            m_gitPath = value
        },
        'editor:build-finished'(event, target) {
            _replaceSearchPaths(target.dest)
            if (m_plateform == "android") {
                if (Os.platform() == "win32") {
                    if (Os.userInfo().username == "Burt") {
                        moveFileToGitPath()
                        // _runPackgenBat() // 文件复制没有走完就开始上传git，不同步，bug
                    }
                } else {
                    Editor.log("<--Myplugin-->打包完成！！！win32系统之外的需要手动移动文件")
                }
            } else if (m_plateform == "web-mobile" || m_plateform == "web-desktop") {
                _replaceTitle(target.dest)
            }
            // Editor.log("<--Myplugin--> build-finished")
        }
    },
}
/**
 * @Description: 替换 index.html 中的title标签
 */
function _replaceTitle(dest) {
    Editor.log("<--Myplugin--> _replaceTitle", dest)
    var root = Path.normalize(dest);
    var url = Path.join(root, "index.html");
    Fs.readFile(url, "utf8", function (err, data) {
        if (err) {
            throw err
        }
        let i0 = data.indexOf("<title>") + 7
        let i1 = data.indexOf("</title>") + 8
        var newData = data.substring(0, i0) + m_gamename
            + "</title>\n" + '  <meta http-equiv="Content-Security-Policy" content="connect-src * " />'
            + data.substring(i1)
        Fs.writeFile(url, newData, function (error) {
            if (error) {
                throw error;
            }
            _changeCss(root)
        });
    });
}
/**
 * @Description: 修改网页版css文件
 */
function _changeCss(root) {
    Editor.log("<--Myplugin--> changeCss", root)
    // var readDir = Fs.readdirSync("./build/web-mobile/")
    var readDir = Fs.readdirSync(root)
    let desktoppath = ""
    let mobilepath = ""
    for (let i = 0; i < readDir.length; i++) {
        if (readDir[i].match('style-desktop')) {
            desktoppath = root + m_pathTag + readDir[i]
        } else if (readDir[i].match('style-mobile')) {
            mobilepath = root + m_pathTag + readDir[i]
        }
    }
    Fs.readFile(desktoppath, 'utf8', function (err, files) {
        if (!err) {
            let newfiles = files.replace("url(./splash.85cfd.png)", "")
            Fs.writeFile(desktoppath, newfiles, function (error) {
                if (error) {
                    throw error;
                } else {
                    Editor.log("<--Myplugin--> style-desktop修改成功")
                    Fs.readFile(mobilepath, 'utf8', function (err, files) {
                        if (!err) {
                            let newfiles = files.replace("url(./splash.85cfd.png)", "")
                            Fs.writeFile(mobilepath, newfiles, function (error) {
                                if (error) {
                                    throw error;
                                } else {
                                    Editor.log("<--Myplugin--> style-mobile修改成功")
                                    _copyWebMobileToGitPath()
                                }
                            });
                        } else {
                            Editor.log("<--Myplugin--> 读取style-mobile文件报错", err)
                        }
                    })
                }
            });
        } else {
            Editor.log("<--Myplugin--> 读取style-desktop文件报错", err)
        }
    })
}
// 复制打包好的web版本到指定路径的git仓库
function _copyWebMobileToGitPath() {
    // let gitpath = m_webGitPath + m_pinpai + '_' + m_huanjin
    // delDir(gitpath)
    // copyFile(m_projectPath + m_pathTag + "packages" + m_pathTag + "hqq" + m_pathTag + "index.html", gitpath + m_pathTag + "index.html")
    // copyDir(m_projectPath + m_pathTag + "build" + m_pathTag + "web-mobile", gitpath + m_pathTag + "webgame", (err) => {
    //     Editor.log("复制文件报错", err)
    // })
    Editor.log("<--Myplugin--> pack_web 成功 打包完成！！！✿✿ヽ(°▽°)ノ✿")
    // child_process.execFile("pack_web.bat", [m_pinpai, m_huanjin], { cwd: m_projectPath, maxBuffer: 1024 * 1024 * 20 }, function (error, stdout, stderr) {
    //     if (error !== null) {
    //         Editor.log("<--Myplugin--> exec error" + error)
    //     }
    //     if (stderr !== null) {
    //         Editor.log("<--Myplugin--> stderr " + stderr)
    //     }
    //     Editor.log("<--Myplugin--> pack_web 成功 打包完成！！！✿✿ヽ(°▽°)ノ✿")
    // })
}
/**
 * @Description: 替换 mian.js 中的文件读取路径
 */
function _replaceSearchPaths(dest) {
    console.log("<--Myplugin--> _replaceSearchPaths")
    var root = Path.normalize(dest);
    var url = Path.join(root, "main.js");
    Fs.readFile(url, "utf8", function (err, data) {
        if (err)
            throw err

        var newStr =
            "if (window.jsb) {\n" +
            "    window.__errorHandler = function (file, line, error) {\n" +
            "        if (file.indexOf('subGame') >= 0) {\n" +
            "            jsb.fileUtils.removeDirectory(jsb.fileUtils.getWritablePath() + 'subGame/res/')\n" +
            "            jsb.fileUtils.removeDirectory(jsb.fileUtils.getWritablePath() + 'subGame/src/')\n" +
            "            jsb.fileUtils.removeFile(jsb.fileUtils.getWritablePath() + 'subGame/hall_project.manifest')\n" +
            "            __restartVM();\n" +
            "        }\n" +
            "    };\n" +
            "    var searchPaths = jsb.fileUtils.getSearchPaths();\n" +
            "    var _storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'subGame/');\n" +
            "    searchPaths.unshift(_storagePath);\n" +
            "    jsb.fileUtils.setSearchPaths(searchPaths); \n" +
            "}\n";
        var newData = newStr + data
        Fs.writeFile(url, newData, function (error) {
            if (error) {
                throw error;
            }
        });
    });
}
/**
 * @Description: 热更新打包 bat
 */
function _runPackgenBat() {
    Editor.log("<--Myplugin--> _runPackgenBat")
    child_process.execFile("243update.bat", [m_pinpai, m_huanjin, m_versionjson.version["hall"]], { cwd: m_projectPath, maxBuffer: 1024 * 1024 * 20 }, function (error, stdout, stderr) {
        if (error !== null) {
            Editor.log("<--Myplugin--> exec error" + error)
        }
        if (stderr !== null) {
            Editor.log("<--Myplugin--> stderr " + stderr)
        }
        Editor.log("<--Myplugin--> 243update 成功 打包完成！！！✿✿ヽ(°▽°)ノ✿")
    })
}
// 构建manifest文件中的 assets 内容
function manifestReadDir(dir, obj, src) {
    var stat = Fs.statSync(dir);
    if (!stat.isDirectory()) {
        return;
    }
    var subpaths = Fs.readdirSync(dir), subpath, size, md5, compressed, relative;
    for (var i = 0; i < subpaths.length; ++i) {
        if (subpaths[i][0] === '.') {
            continue;
        }
        subpath = Path.join(dir, subpaths[i]);
        stat = Fs.statSync(subpath);
        if (stat.isDirectory()) {
            manifestReadDir(subpath, obj, src);
        } else if (stat.isFile()) {
            // Size in Bytes
            size = stat['size'];
            // md5 = crypto.createHash('md5').update(Fs.readFileSync(subpath, 'binary')).digest('hex');
            md5 = crypto.createHash('md5').update(Fs.readFileSync(subpath)).digest('hex');
            compressed = Path.extname(subpath).toLowerCase() === '.zip';
            relative = Path.relative(src, subpath);
            relative = relative.replace(/\\/g, '/');
            relative = encodeURI(relative);
            obj[relative] = {
                'size': size,
                'md5': md5
            };
            if (compressed) {
                obj[relative].compressed = true;
            }
        }
    }
}
// 根据完整的 manifest 构建 version.manifest
var getVersion = function (d) {
    return {
        packageUrl: d.packageUrl,
        remoteManifestUrl: d.remoteManifestUrl,
        remoteVersionUrl: d.remoteVersionUrl,
        version: d.version,
        module: d.module
    }
}
// 构建热更manifest文件
function _buildHotUpdata243(options) {
    let remoteUrl = "https://upgrade.gzzfhz.com"
    if (m_huanjin == "dev") {
        remoteUrl = "http://upgrade.539316.com"
    } else if (m_huanjin == "pre") {
        remoteUrl = "https://upgrade.gzzfhz.com"
    }
    let manifestList = {}
    for (let k in m_versionjson.version) {
        manifestList[k] = {
            packageUrl: remoteUrl,
            remoteManifestUrl: remoteUrl + '/project.manifest',
            remoteVersionUrl: remoteUrl + '/version.manifest',
            version: m_versionjson.version[k],
            assets: {},
            searchPaths: [],
            module: k,
        };
    }
    options.bundles.forEach(bundle => {
        if (!bundle.name) {
            return
        } else {
            let subGame = bundle.name
            let hasBundle = false
            Editor.log("bundle.name=",bundle.name);
            if (bundle.name == "main" || bundle.name == "resources" || bundle.name == "internal") {// 基础包
                subGame = "hall"
                hasBundle = true
            } else if(bundle.name.match("hall_")){// 大厅品牌包
                hasBundle = true;
                subGame = bundle.name.replace("Res","");
            } else {
                if( !hasBundle ) // 子游戏包
                {
                    for (let k in manifestList) {
                        if (bundle.name.match(k) ) {
                            subGame = k
                            hasBundle = true
                        }
                    }
                }

                // for(let i; i<= subGamePinPaiList.length;i++)
                // {
                //     if( bundle.name.match("_"+subGamePinPaiList[i]))
                //     {
                //         for (let k in manifestList) {
                //             if (bundle.name.match(k) || bundle.name.replace("Res","").match(k) ) {
                //                 subGame = k
                //                 Editor.log("分品牌子游戏 subGame=",subGame);
                //                 hasBundle = true
                //                 break;
                //             }
                //         }
                //     }
                // }
            }
            Editor.log("<--Myplugin-->manifestList ", subGame, "bundle.name", bundle.name)
            if (!hasBundle) {
                Editor.log("在version.json文件中没有匹配这个子游戏", subGame)
                return
            }
            if (bundle.name == "main") {
                manifestReadDir(options.dest + "/src/", manifestList[subGame].assets, options.dest + "/")
                // for( let i = 0;i<hallPinPaiList.length;i++)
                // {
                //     manifestReadDir(options.dest + "/src/", manifestList["hall_"+hallPinPaiList[i] ].assets, options.dest + "/")
                // }
            }
            manifestReadDir(options.dest + "/assets/" + bundle.name + "/", manifestList[subGame].assets, options.dest + "/")
            // for( let key in subGamePinPaiResList ){
            //     let key2 = null;
            //     for( key2 in subGamePinPaiResList[key] ){
            //         if( key2 == subGame ){
            //             for( let tempindex = 0; tempindex < subGamePinPaiResList[key][key2].length;tempindex++){
            //                 if( bundle.name == subGamePinPaiResList[key][key2][tempindex]){
            //                     if( manifestList[subGame+"_"+key] ){
            //                         manifestReadDir(options.dest + "/assets/" + bundle.name + "/", manifestList[subGame+"_"+key].assets, options.dest + "/")
            //                     } else{
            //                         Editor.log("在manifestList没有匹配这个子游戏", subGame+"_"+key)
            //                     }
            //                 }
            //             }
            //             break;
            //         }
            //     }
            //     if( key2 == subGame ){
            //         break;
            //     }
            // }
            // if(subGame=="hall")
            // {
            //     for( let i = 0;i<hallPinPaiList.length;i++)
            //     {
            //         manifestReadDir(options.dest + "/assets/" + bundle.name + "/", manifestList["hall_"+hallPinPaiList[i]].assets, options.dest + "/")
            //     }
            // }
        }
    });
    options.bundles.forEach(bundle => {
        if (!bundle.name || bundle.name == "resources" || bundle.name == "internal") {
            return
        } else {
            let subGame = bundle.name
            if (bundle.name == "main") {
                subGame = "hall"
            } else {
                for (let k in manifestList) {
                    if (bundle.name.match(k)) {
                        subGame = k
                    }
                }
            }
            Fs.writeFile(options.dest + "/" + subGame + "_project.manifest", JSON.stringify(manifestList[subGame]), (err) => {
                if (err) throw err;
                Fs.writeFile(options.dest + "/" + subGame + "_version.manifest", JSON.stringify(getVersion(manifestList[subGame])), (err) => {
                    if (err) throw err;
                });
            });
        }
    })
}
/**
 * @Description: 检查包名并修改
 */
function _checkPackageName(options) {
    // Editor.log("<--Myplugin--> _checkPackageName")
    var root = Path.normalize(options.project);
    var url = Path.join(root, m_pathTag + "build-templates" + m_pathTag + "jsb-link" + m_pathTag + "frameworks" + m_pathTag + "runtime-src" + m_pathTag + "proj.android-studio" + m_pathTag + "app");
    var url0 = Path.join(url, m_pathTag + "res" + m_pathTag + "xml" + m_pathTag + "file_paths.xml");
    Fs.readFile(url0, "utf8", function (err, data) {
        if (err) {
            throw err
        }
        var packageNameindex = data.indexOf(m_packageName)
        if (packageNameindex == -1) {
            _changeTemplatesPackageName(options)
        }
    });
}
// 改变 Templates 下模板文件的包名
function _changeTemplatesPackageName(options) {
    // Editor.log("<--Myplugin--> _changeTemplatesPackageName")
    var root = Path.normalize(options.project);
    var url = Path.join(root, m_pathTag + "build-templates" + m_pathTag + "jsb-link" + m_pathTag + "frameworks" + m_pathTag + "runtime-src" + m_pathTag + "proj.android-studio" + m_pathTag + "app");

    var url0 = Path.join(url, m_pathTag + "res" + m_pathTag + "xml" + m_pathTag + "file_paths.xml");
    Fs.readFile(url0, "utf8", function (err, data) {
        if (err) {
            throw err
        }
        var newStr =
            "<?xml version='1.0' encoding='utf-8'?>\n" +
            "<resources>\n" +
            "    <paths>\n" +
            "        <external-path path='Android/data/" + m_packageName + "/' name='files_root'/>\n" +
            "        <external-path path='.' name='external_storage_root'/>\n" +
            "    </paths>\n" +
            "    <path>\n" +
            "\n" +
            "        <root-path name='root_path' path='.'/>\n" +
            "\n" +
            "    </path>\n" +
            "</resources>"
        Fs.writeFile(url0, newStr, function (error) {
            if (err) {
                throw err;
            }
        });
    });

    var url2 = Path.join(url, m_pathTag + "AndroidManifest.xml");
    Fs.readFile(url2, "utf8", function (err, data) {
        if (err) {
            throw err
        }
        var newFile = data
        var n0 = newFile.indexOf('package=') + 8
        var n1 = newFile.indexOf('android:installLocation', n0)
        newFile = newFile.substring(0, n0) + "'" + m_packageName + "'" + "\n\t" + newFile.substring(n1)
        var v0 = newFile.indexOf('authorities=', n1) + 12
        var v1 = newFile.indexOf('android:exported=')
        newFile = newFile.substring(0, v0) + "'" + m_packageName + ".fileProvider'" + "\n\t\t\t" + newFile.substring(v1)
        Fs.writeFile(url2, newFile, function (error) {
            if (err) {
                throw err;
            }
        });
    });

    var url3 = Path.join(url, m_pathTag + "build.gradle");
    Fs.readFile(url3, "utf8", function (err, data) {
        if (err) {
            throw err
        }
        var n0 = data.indexOf('applicationId') + 13
        var n1 = data.indexOf('minSdkVersion', n0)
        var newFile = data.substring(0, n0) + " " + "'" + m_packageName + "'" + "\n\t\t" + data.substring(n1)
        Fs.writeFile(url3, newFile, function (error) {
            if (err) {
                throw err;
            }
        });
    });
}
/**
 * @Description: 替换icon图片
 */
function _replaceIcons() {
    // Editor.log("<--Myplugin--> _replaceIcons")
    copyFile(m_projectPath + "/packages/hqq/icon/" + m_pinpai + "/mipmap-hdpi/ic_launcher.png",
        m_projectPath + "/build-templates/jsb-link/frameworks/runtime-src/proj.android-studio/res/mipmap-hdpi/ic_launcher.png")
    copyFile(m_projectPath + "/packages/hqq/icon/" + m_pinpai + "/mipmap-mdpi/ic_launcher.png",
        m_projectPath + "/build-templates/jsb-link/frameworks/runtime-src/proj.android-studio/res/mipmap-mdpi/ic_launcher.png")
    copyFile(m_projectPath + "/packages/hqq/icon/" + m_pinpai + "/mipmap-xhdpi/ic_launcher.png",
        m_projectPath + "/build-templates/jsb-link/frameworks/runtime-src/proj.android-studio/res/mipmap-xhdpi/ic_launcher.png")
    copyFile(m_projectPath + "/packages/hqq/icon/" + m_pinpai + "/mipmap-xxhdpi/ic_launcher.png",
        m_projectPath + "/build-templates/jsb-link/frameworks/runtime-src/proj.android-studio/res/mipmap-xxhdpi/ic_launcher.png")
    copyFile(m_projectPath + "/packages/hqq/icon/" + m_pinpai + "/mipmap-ldpi/ic_launcher.png",
        m_projectPath + "/build-templates/jsb-link/frameworks/runtime-src/proj.android-studio/res/mipmap-ldpi/ic_launcher.png")
    copyFile(m_projectPath + "/packages/hqq/icon/" + m_pinpai + "/mipmap-xxxhdpi/ic_launcher.png",
        m_projectPath + "/build-templates/jsb-link/frameworks/runtime-src/proj.android-studio/res/mipmap-xxxhdpi/ic_launcher.png")
    copyFile(m_projectPath + "/packages/hqq/icon/" + m_pinpai + "/Icon.icns",
        m_projectPath + "/build-templates/jsb-link/frameworks/runtime-src/proj.ios_mac/mac/Icon.icns")
    copyFile(m_projectPath + "/packages/hqq/icon/" + m_pinpai + "/game.ico",
        m_projectPath + "/build-templates/jsb-link/frameworks/runtime-src/proj.win32/res/game.ico")
}
/**
 * @Description: 修改保存在java代码中的包信息
 */
function _changePackageInfoInJava() {
    // Editor.log("<--Myplugin--> _changePackageInfoInJava")
    Fs.readFile(m_projectPath + "/project.json", 'utf8', function (err, files0) {
        if (!err) {
            let projectjson = JSON.parse(files0)
            let cccversion = projectjson.version
            Fs.readFile(m_projectPath + "/version.json", "utf8", function (err, files) {
                if (err) {
                    Editor.log("<--Myplugin--> _changePackageInfoInJava version.json", err)
                    throw err
                }
                let jsonConfig = JSON.parse(files)
                let apkversion = jsonConfig.apkversion
                let proxyid = jsonConfig[m_pinpai][m_huanjin].proxyUserID
                let str = '\"{\\\"pinpai\\\":\\\"' + m_pinpai
                    + '\\\",\\\"huanjin\\\":\\\"' + m_huanjin
                    + '\\\",\\\"system\\\":\\\"android\\\",\\\"version\\\":\\\"' + apkversion
                    + '\\\",\\\"proxyid\\\":\\\"' + proxyid
                    + '\\\",\\\"language\\\":\\\"' + m_language
                    + '\\\",\\\"country\\\":\\\"' + m_country
                    + '\\\",\\\"currency\\\":\\\"' + m_currency
                    + '\\\",\\\"engine_version\\\":\\\"' + cccversion + '\\\"}\"'
                let path = m_projectPath + "/build-templates/jsb-link/frameworks/runtime-src/proj.android-studio/app/src/org/cocos2dx/javascript/AppActivity.java"
                Fs.readFile(path, "utf8", function (err, data) {
                    if (err) {
                        Editor.log("<--Myplugin--> _changePackageInfoInJava readFile", err)
                        throw err
                    }
                    let i0 = data.indexOf("getHqqPackageInfo")
                    let i1 = data.indexOf("return ", i0) + 7
                    let i2 = data.indexOf(";", i1)
                    let ndata = data.substring(0, i1) + str + data.substring(i2)
                    Fs.writeFile(path, ndata, function (error) {
                        if (err) {
                            Editor.log("<--Myplugin--> _changePackageInfoInJava writeFile", err)
                            throw err;
                        }
                    });
                });
            });
        } else {
            console.log(err);
        }
    })

}
/**
 * @Description: 修改app的名字
 */
function _changeApkName() {
    let path = m_projectPath + "/build-templates/jsb-link/frameworks/runtime-src/proj.android-studio/res/values/strings.xml"
    let end = ""
    if (m_huanjin == "dev" || m_huanjin == "pre") { // || m_huanjin == "pre"
        end = m_huanjin
    }
    let name = ""
    if (m_pinpai == 'test') {
        name = "特斯特游戏"
    } else if (m_pinpai == 'debi') {
        name = "德比游戏"
    } else if (m_pinpai == 'xingba') {
        name = "杏吧娱乐"
    } else if (m_pinpai == 'yuyu') {
        // name = "渔鱼游戏"
        name = "富鑫II测试版"
    } else if (m_pinpai == "xinsheng") {
        name = "大喜发"
    } else if (m_pinpai == "xingui") {
        name = "新贵游戏"
    } else if (m_pinpai == "fuxin") {
        name = "富鑫II"
    } else if (m_pinpai == "xinhao") {
        name = "新豪游戏"
    } else if (m_pinpai == "xinlong") {
        name = "乐派游戏"
    } else if (m_pinpai == "nineone") {
        name = "91游戏"
    } else if (m_pinpai == "huangshi") {
        name = "皇室游戏"
    } else if (m_pinpai == "juding") {
        name = "聚鼎娱乐"
    } else if (m_pinpai == "huaxing") {
        name = "华兴娱乐"
    } else if (m_pinpai == "ninetwo") {
        name = "92游戏"
    } else if (m_pinpai == "tianqi") {
        name = "天启游戏"
    } else if (m_pinpai == "chaofan") {
        name = "超凡娱乐"
    } else if (m_pinpai == "wansheng") {
        name = "万盛娱乐"
    }
    name += end
    let data = '<resources>\n' +
        '<string name="app_name" translatable="false">' + name + '</string>\n' +
        '</resources>'
    Fs.writeFile(path, data, function (error) {
        if (error) {
            throw error;
        }
    });
}
/*
 * 复制目录、子目录，及其中的文件
 * @param src {String} 要复制的目录
 * @param dist {String} 复制到目标目录
 */
function copyDir(src, dist, callback) {
    Fs.access(dist, function (err) {
        if (err) {
            // 目录不存在时创建目录
            Fs.mkdirSync(dist);
        }
        _copy(null, src, dist);
    });

    function _copy(err, src, dist) {
        if (err) {
            callback(err);
        } else {
            Fs.readdir(src, function (err, paths) {
                if (err) {
                    callback(err)
                } else {
                    paths.forEach(function (path) {
                        var _src = src + '/' + path;
                        var _dist = dist + '/' + path;
                        Fs.stat(_src, function (err, stat) {
                            if (err) {
                                callback(err);
                            } else {
                                // 判断是文件还是目录
                                if (stat.isFile()) {
                                    Fs.writeFileSync(_dist, Fs.readFileSync(_src));
                                } else if (stat.isDirectory()) {
                                    // 当是目录是，递归复制
                                    copyDir(_src, _dist, callback)
                                }
                            }
                        })
                    })
                }
            })
        }
    }
}
/**
 * @Description: 删除文件夹下所有内容
 */
function delDir(path) {
    if (Fs.existsSync(path)) {
        let files = Fs.readdirSync(path);
        files.forEach((file, index) => {
            let curPath = path + "/" + file;
            if (Fs.statSync(curPath).isDirectory()) {
                delDir(curPath); //递归删除文件夹
            } else {
                Fs.unlinkSync(curPath); //删除文件
            }
        });
        // Fs.rmdirSync(path);
    }
}
/**
 * @Description: 复制文件
 */
function copyFile(src, dist) {
    Fs.exists(src, function (exists) {
        if(exists){
            Fs.writeFileSync(dist, Fs.readFileSync(src));
        } else{
            Editor.log(src + "no file!")
        }
      });
}
/**
 * @Description: 复制更新文件到指定目录
 */
function moveFileToGitPath() {
    Fs.readFile(m_projectPath + "/project.json", 'utf8', function (err, files) {
        if (!err) {
            let projectjson = JSON.parse(files)
            let cccversion = projectjson.version
            Fs.access(m_gitPath, function (err) {
                if (err) {
                    Editor.log("不存在git仓库路径，请在插件面板设置git仓库路径", err)
                    return
                }
            })
            let gitPath = m_gitPath + "com." + m_pinpai + "." + m_huanjin + ".android"
            let destpath = gitPath + m_pathTag
            if (cccversion != '2.1.3') {
                destpath = gitPath + m_pathTag + "ccc" + cccversion + m_pathTag
            }
            Fs.access(destpath, function (err) {
                if (err) {
                    Fs.mkdirSync(destpath);
                }
                Fs.access(destpath + m_pathTag + m_versionjson.version["hall"], function (err) {
                    if (err) {
                        Fs.mkdirSync(destpath + m_pathTag + m_versionjson.version["hall"]);
                    }
                    Fs.readdir(m_buildPath, function (err, paths) {
                        paths.forEach(function (path) {
                            if (path.match("manifest")) {
                                copyFile(m_buildPath + m_pathTag + path, destpath + m_pathTag + m_versionjson.version["hall"] + m_pathTag + path)
                                copyFile(m_buildPath + m_pathTag + path, destpath + m_pathTag + path)
                            } else if (path.match("assets") || path.match("remote") || path.match("src")) {
                                copyDir(m_buildPath + m_pathTag + path, destpath + m_pathTag + m_versionjson.version["hall"] + m_pathTag + path, (err) => {
                                    Editor.log("复制文件报错", err)
                                })
                                copyDir(m_buildPath + m_pathTag + path, destpath + m_pathTag + path, (err) => {
                                    Editor.log("复制文件报错", err)
                                })
                            }
                        })
                    })
                    copyFile(m_projectPath + m_pathTag + "version.json", destpath + m_pathTag + m_versionjson.version["hall"] + m_pathTag + "version.json")
                    copyFile(m_projectPath + m_pathTag + "version.json", destpath + m_pathTag + "version.json")
                });
            });
        } else {
            Editor.log(err);
        }
    })
}
