"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unload = exports.onAfterBuild = exports.onAfterCompressSettings = exports.onBeforeCompressSettings = exports.onBeforeBuild = exports.load = exports.throwError = void 0;
const Fs = __importStar(require("fs"));
const Path = __importStar(require("path"));
const crypto = __importStar(require("crypto"));
const child_process = __importStar(require("child_process"));
const Os = __importStar(require("os"));
const PACKAGE_NAME = 'hqq';
function log(...arg) {
    return console.log(`[${PACKAGE_NAME}] `, ...arg);
}
let allAssets = [];
//??????????????????????????????????????????scene ??? resources??????????????????,?????????????????????
//???????????????????????????????????? ??? & ??????
//????????????????????????????????????????????? project.txt??????
let m_projectPath = '';
let m_pngPath = '';
let m_icnsPath = '';
let m_icoPath = '';
let m_projPath = '';
let m_packageName = '';
let m_plateform = ''; // web-mobile android
let m_gamename = '';
let m_pinpai = '';
let m_huanjin = '';
let m_versionjson = null;
let m_language = 'CN';
let m_country = 'china';
let m_currency = 'rmb';
let m_buildPath = '';
let m_gitPath = "D:\\Burt\\cocos_game\\hotupdate\\upgrade-server\\";
let m_webGitPath = 'D:\\Burt\\cocos_game\\hotupdate\\web-mobile\\';
let m_pathTag = "/";
//???????????????????????????
let hallPinPaiList = ["fuxin", "xingui", "xinsheng", "xinlong"];
//????????????????????????????????????
let subGamePinPaiList = ["fuxin"];
//????????????????????????????????????
let subGamePinPaiResList = {
    "fuxin": {
        "bjl": ["bjl_fuxin", "bjlRes"],
        "lhd": ["lhd_fuxin", "lhdRes_fuxin"],
    }
};
exports.throwError = true;
const load = function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`[${PACKAGE_NAME}] Load cocos plugin example in builder.`);
        allAssets = yield Editor.Message.request('asset-db', 'query-assets');
    });
};
exports.load = load;
const onBeforeBuild = function (options, result) {
    return __awaiter(this, void 0, void 0, function* () {
        // Todo some thing
        log(`${PACKAGE_NAME}.webTestOption`, 'onBeforeBuild');
        log("onBeforeBuild", options, " result=", result, " Editor.Project.path=", Editor.Project.path);
        m_projectPath = Editor.Project.path;
        m_buildPath = Editor.Project.path + m_pathTag + "build" + m_pathTag + "jsb-link";
        m_pngPath = Editor.Project.path + '/extensions/hqq/icon/icon.png';
        m_icnsPath = Editor.Project.path + '/extensions/hqq/icon/Icon.icns';
        m_icoPath = Editor.Project.path + '/extensions/hqq/icon/game.ico';
        m_projPath = Editor.Project.path;
        let tempstrArray = options.packages.android.packageName.split(".");
        if (tempstrArray.length > 4) {
            tempstrArray.splice(4, tempstrArray.length - 4);
        }
        m_packageName = tempstrArray[0] + "." + tempstrArray[1] + "." + tempstrArray[2] + "." + tempstrArray[3];
        log("onBuildStart m_packageName", m_packageName);
        m_plateform = options.platform;
        m_gamename = options.name;
        if (m_plateform == "android") {
            if (m_packageName.match('dev') || m_packageName.match('Dev')) {
                m_huanjin = 'dev';
            }
            else if (m_packageName.match('pre') || m_packageName.match('Pre')) {
                m_huanjin = 'pre';
            }
            else {
                m_huanjin = 'online';
            }
            if (m_packageName.match("AG") || m_packageName.match("Test") || m_packageName.match("test")) {
                m_pinpai = 'test';
            }
            else if (m_packageName.match("debi") || m_gamename.match("Debi")) {
                m_pinpai = 'debi';
            }
            else if (m_packageName.match("xingba") || m_packageName.match("Xingba")) {
                m_pinpai = 'xingba';
            }
            else if (m_packageName.match("yuyu") || m_packageName.match("Yuyu")) {
                m_pinpai = 'yuyu';
            }
            else if (m_packageName.match("xinsheng") || m_packageName.match("Xinsheng")) {
                m_pinpai = 'xinsheng';
            }
            else if (m_packageName.match("xingui") || m_packageName.match("Xingui")) {
                m_pinpai = 'xingui';
            }
            else if (m_packageName.match("fuxin") || m_packageName.match("Fuxin")) {
                m_pinpai = 'fuxin';
            }
            else if (m_packageName.match("xinhao") || m_packageName.match("Xinhao")) {
                m_pinpai = 'xinhao';
            }
            else if (m_packageName.match("xinlong") || m_packageName.match("Xinlong")) {
                m_pinpai = 'xinlong';
            }
            else if (m_packageName.match("nineone")) {
                m_pinpai = 'nineone';
            }
            else if (m_packageName.match("Huangshi") || m_packageName.match("huangshi")) {
                m_pinpai = 'huangshi';
            }
            else if (m_packageName.match("Juding") || m_packageName.match("juding")) {
                m_pinpai = 'juding';
            }
            else if (m_packageName.match("Huaxing") || m_packageName.match("huaxing")) {
                m_pinpai = 'huaxing';
            }
            else if (m_packageName.match("Ninetwo") || m_packageName.match("ninetwo")) {
                m_pinpai = 'ninetwo';
            }
            else if (m_packageName.match("Tianqi") || m_packageName.match("tianqi")) {
                m_pinpai = 'tianqi';
            }
            else if (m_packageName.match("Chaofan") || m_packageName.match("chaofan")) {
                m_pinpai = 'chaofan';
            }
            else if (m_packageName.match("Wansheng") || m_packageName.match("wansheng")) {
                m_pinpai = 'wansheng';
            }
            else if (m_packageName.match("Jiaxing") || m_packageName.match("jiaxing")) {
                m_pinpai = 'jiaxing';
            }
            else if (m_packageName.match("Fiveone") || m_packageName.match("fiveone")) {
                m_pinpai = 'fiveone';
            }
            else if (m_packageName.match("Letian") || m_packageName.match("letian")) {
                m_pinpai = 'letian';
            }
            else if (m_packageName.match("Xingyao") || m_packageName.match("xingyao")) {
                m_pinpai = 'xingyao';
            }
        }
        else if (m_plateform == "web-mobile" || m_plateform == "web-desktop") {
            if (m_gamename.match('dev') || m_gamename.match('Dev')) {
                m_huanjin = 'dev';
            }
            else if (m_gamename.match('pre') || m_gamename.match('Pre')) {
                m_huanjin = 'pre';
            }
            else {
                m_huanjin = 'online';
            }
            if (m_gamename.match("Tst") || m_gamename.match("Test") || m_packageName.match("test")) {
                m_pinpai = 'test';
            }
            else if (m_gamename.match("debi") || m_gamename.match("Debi")) {
                m_pinpai = 'debi';
            }
            else if (m_gamename.match("xingba") || m_packageName.match("Xingba")) {
                m_pinpai = 'xingba';
            }
            else if (m_gamename.match("yuyu") || m_packageName.match("Yuyu")) {
                m_pinpai = 'yuyu';
            }
            else if (m_packageName.match("xinsheng") || m_packageName.match("Xinsheng")) {
                m_pinpai = 'xinsheng';
            }
            else if (m_packageName.match("xingui") || m_packageName.match("Xingui")) {
                m_pinpai = 'xingui';
            }
            else if (m_packageName.match("fuxin") || m_packageName.match("Fuxin")) {
                m_pinpai = 'fuxin';
            }
            else if (m_packageName.match("xinhao") || m_packageName.match("Xinhao")) {
                m_pinpai = 'xinhao';
            }
            else if (m_packageName.match("xinlong") || m_packageName.match("Xinlong")) {
                m_pinpai = 'xinlong';
            }
            else if (m_packageName.match("nineone")) {
                m_pinpai = 'nineone';
            }
            else if (m_packageName.match("Huangshi") || m_packageName.match("huangshi")) {
                m_pinpai = 'huangshi';
            }
            else if (m_packageName.match("Juding") || m_packageName.match("juding")) {
                m_pinpai = 'juding';
            }
            else if (m_packageName.match("Huaxing") || m_packageName.match("huaxing")) {
                m_pinpai = 'huaxing';
            }
            else if (m_packageName.match("Ninetwo") || m_packageName.match("ninetwo")) {
                m_pinpai = 'ninetwo';
            }
            else if (m_packageName.match("Tianqi") || m_packageName.match("tianqi")) {
                m_pinpai = 'tianqi';
            }
            else if (m_packageName.match("Chaofan") || m_packageName.match("chaofan")) {
                m_pinpai = 'chaofan';
            }
            else if (m_packageName.match("wansheng") || m_packageName.match("wansheng")) {
                m_pinpai = 'wansheng';
            }
            else if (m_packageName.match("Jiaxing") || m_packageName.match("jiaxing")) {
                m_pinpai = 'jiaxing';
            }
            else if (m_packageName.match("Fiveone") || m_packageName.match("fiveone")) {
                m_pinpai = 'fiveone';
            }
            else if (m_packageName.match("Letian") || m_packageName.match("letian")) {
                m_pinpai = 'letian';
            }
            else if (m_packageName.match("Xingyao") || m_packageName.match("xingyao")) {
                m_pinpai = 'xingyao';
            }
        }
        m_packageName = options.packages.android.packageName;
        log("<--Myplugin--> onBuildStart ??????", m_packageName, m_pinpai, "??????", m_huanjin);
        if (Os.platform() == "win32") {
            m_pathTag = "\\";
        }
        else {
            m_pathTag = "/";
        }
        let tversionjson = Fs.readFileSync(m_projectPath + "/version.json", 'utf8');
        m_versionjson = JSON.parse(tversionjson);
        if (m_plateform == "android") {
            if (!Fs.existsSync(m_projPath) || !(Fs.statSync(m_projPath).isDirectory())) {
                _changeTemplatesPackageName(options, result);
            }
            else {
                _checkPackageName(options, result);
            }
            _replaceIcons();
            _changePackageInfoInJava();
            _changeApkName();
        }
    });
};
exports.onBeforeBuild = onBeforeBuild;
const onBeforeCompressSettings = function (options, result) {
    return __awaiter(this, void 0, void 0, function* () {
        const pkgOptions = options.packages[PACKAGE_NAME];
        if (pkgOptions.webTestOption) {
            console.debug('webTestOption', true);
        }
        // Todo some thing
        console.debug('get settings test', result.settings);
    });
};
exports.onBeforeCompressSettings = onBeforeCompressSettings;
const onAfterCompressSettings = function (options, result) {
    return __awaiter(this, void 0, void 0, function* () {
        // Todo some thing
        console.log('webTestOption', 'onAfterCompressSettings');
    });
};
exports.onAfterCompressSettings = onAfterCompressSettings;
const onAfterBuild = function (options, result) {
    return __awaiter(this, void 0, void 0, function* () {
        // change the uuid to test
        // const uuidTestMap = {
        //     image: '57520716-48c8-4a19-8acf-41c9f8777fb0',
        // };
        // for (const name of Object.keys(uuidTestMap)) {
        //     const uuid = uuidTestMap[name];
        //     console.debug(`containsAsset of ${name}`, result.containsAsset(uuid));
        //     console.debug(`getAssetPathInfo of ${name}`, result.getAssetPathInfo(uuid));
        //     console.debug(`getRawAssetPaths of ${name}`, result.getRawAssetPaths(uuid));
        //     console.debug(`getJsonPathInfo of ${name}`, result.getJsonPathInfo(uuid));
        // }
        log("onAfterBuild options=", options, " result=", result);
        if (m_plateform == "android") {
            _buildHotUpdata243(options, result);
        }
        log('<--Myplugin--> onAfterBuild');
    });
};
exports.onAfterBuild = onAfterBuild;
const unload = function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`[${PACKAGE_NAME}] Unload cocos plugin example in builder.`);
    });
};
exports.unload = unload;
/**
 * @Description: ?????? index.html ??????title??????
 */
function _replaceTitle(dest) {
    log("<--Myplugin--> _replaceTitle", dest);
    var root = Path.normalize(dest);
    var url = Path.join(root, "index.html");
    Fs.readFile(url, "utf8", function (err, data) {
        if (err) {
            throw err;
        }
        let i0 = data.indexOf("<title>") + 7;
        let i1 = data.indexOf("</title>") + 8;
        var newData = data.substring(0, i0) + m_gamename
            + "</title>\n" + '  <meta http-equiv="Content-Security-Policy" content="connect-src * " />'
            + data.substring(i1);
        Fs.writeFile(url, newData, function (error) {
            if (error) {
                throw error;
            }
            _changeCss(root);
        });
    });
}
/**
 * @Description: ???????????????css??????
 */
function _changeCss(root) {
    log("<--Myplugin--> changeCss", root);
    // var readDir = Fs.readdirSync("./build/web-mobile/")
    var readDir = Fs.readdirSync(root);
    let desktoppath = "";
    let mobilepath = "";
    for (let i = 0; i < readDir.length; i++) {
        if (readDir[i].match('style-desktop')) {
            desktoppath = root + m_pathTag + readDir[i];
        }
        else if (readDir[i].match('style-mobile')) {
            mobilepath = root + m_pathTag + readDir[i];
        }
    }
    Fs.readFile(desktoppath, 'utf8', function (err, files) {
        if (!err) {
            let newfiles = files.replace("url(./splash.85cfd.png)", "");
            Fs.writeFile(desktoppath, newfiles, function (error) {
                if (error) {
                    throw error;
                }
                else {
                    log("<--Myplugin--> style-desktop????????????");
                    Fs.readFile(mobilepath, 'utf8', function (err, files) {
                        if (!err) {
                            let newfiles = files.replace("url(./splash.85cfd.png)", "");
                            Fs.writeFile(mobilepath, newfiles, function (error) {
                                if (error) {
                                    throw error;
                                }
                                else {
                                    log("<--Myplugin--> style-mobile????????????");
                                    _copyWebMobileToGitPath();
                                }
                            });
                        }
                        else {
                            log("<--Myplugin--> ??????style-mobile????????????", err);
                        }
                    });
                }
            });
        }
        else {
            log("<--Myplugin--> ??????style-desktop????????????", err);
        }
    });
}
// ??????????????????web????????????????????????git??????
function _copyWebMobileToGitPath() {
    // let gitpath = m_webGitPath + m_pinpai + '_' + m_huanjin
    // delDir(gitpath)
    // copyFile(m_projectPath + m_pathTag + "packages" + m_pathTag + "hqq" + m_pathTag + "index.html", gitpath + m_pathTag + "index.html")
    // copyDir(m_projectPath + m_pathTag + "build" + m_pathTag + "web-mobile", gitpath + m_pathTag + "webgame", (err) => {
    //     log("??????????????????", err)
    // })
    log("<--Myplugin--> pack_web ?????? ??????????????????????????????(???????)??????");
    // child_process.execFile("pack_web.bat", [m_pinpai, m_huanjin], { cwd: m_projectPath, maxBuffer: 1024 * 1024 * 20 }, function (error, stdout, stderr) {
    //     if (error !== null) {
    //         log("<--Myplugin--> exec error" + error)
    //     }
    //     if (stderr !== null) {
    //         log("<--Myplugin--> stderr " + stderr)
    //     }
    //     log("<--Myplugin--> pack_web ?????? ??????????????????????????????(???????)??????")
    // })
}
/**
 * @Description: ?????? mian.js ????????????????????????
 */
function _replaceSearchPaths(dest) {
    console.log("<--Myplugin--> _replaceSearchPaths");
    var root = Path.normalize(dest);
    var url = Path.join(root, "main.js");
    Fs.readFile(url, "utf8", function (err, data) {
        if (err)
            throw err;
        var newStr = "if (window.jsb) {\n" +
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
        var newData = newStr + data;
        Fs.writeFile(url, newData, function (error) {
            if (error) {
                throw error;
            }
        });
    });
}
/**
 * @Description: ??????????????? bat
 */
function _runPackgenBat() {
    log("<--Myplugin--> _runPackgenBat");
    child_process.execFile("243update.bat", [m_pinpai, m_huanjin, m_versionjson.version["hall"]], { cwd: m_projectPath, maxBuffer: 1024 * 1024 * 20 }, function (error, stdout, stderr) {
        if (error !== null) {
            log("<--Myplugin--> exec error" + error);
        }
        if (stderr !== null) {
            log("<--Myplugin--> stderr " + stderr);
        }
        log("<--Myplugin--> 243update ?????? ??????????????????????????????(???????)??????");
    });
}
// ??????manifest???????????? assets ??????
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
        }
        else if (stat.isFile()) {
            // Size in Bytes
            size = stat['size'];
            // md5 = crypto.createHash('md5').update(Fs.readFileSync(subpath, 'binary')).digest('hex');
            md5 = crypto.createHash('md5').update(Fs.readFileSync(subpath)).digest('hex');
            compressed = Path.extname(subpath).toLowerCase() === '.zip';
            // log("manifestReadDir relative=",relative)
            // log("manifestReadDir src=",src)
            // log("manifestReadDir subpath=",subpath)
            relative = Path.relative(src, subpath);
            // log("manifestReadDir after Path.relative relative=",relative)
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
// ??????????????? manifest ?????? version.manifest
var getVersion = function (d) {
    return {
        packageUrl: d.packageUrl,
        remoteManifestUrl: d.remoteManifestUrl,
        remoteVersionUrl: d.remoteVersionUrl,
        version: d.version,
        module: d.module
    };
};
// ????????????manifest??????
function _buildHotUpdata243(options, result) {
    let remoteUrl = "https://upgrade.gzzfhz.com";
    if (m_huanjin == "dev") {
        remoteUrl = "http://upgrade.0717996.com";
    }
    else if (m_huanjin == "pre") {
        remoteUrl = "https://upgrade.gzzfhz.com";
    }
    let manifestList = {};
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
    result.__task.result.bundles.forEach(bundle => {
        if (!bundle.name) {
            return;
        }
        else {
            let subGame = bundle.name;
            let hasBundle = false;
            log("bundle.name=", bundle.name);
            if (bundle.name == "main" || bundle.name == "resources" || bundle.name == "internal") { // ?????????
                subGame = "hall";
                hasBundle = true;
            }
            else if (bundle.name.match("hall_")) { // ???????????????
                hasBundle = true;
                subGame = bundle.name.replace("Res", "");
            }
            else {
                if (!hasBundle) // ????????????
                 {
                    for (let k in manifestList) {
                        if (bundle.name.match(k)) {
                            subGame = k;
                            hasBundle = true;
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
                //                 log("?????????????????? subGame=",subGame);
                //                 hasBundle = true
                //                 break;
                //             }
                //         }
                //     }
                // }
            }
            log("<--Myplugin-->manifestList ", subGame, "bundle.name", bundle.name);
            if (!hasBundle) {
                log("???version.json????????????????????????????????????", subGame);
                return;
            }
            if (bundle.name == "main") {
                // log("main====================start")
                // log(bundle.dest + "/")
                // log(manifestList[subGame].assets)
                // log(bundle.dest + "/")
                // log(result.__task.result.paths.dir)
                // log("main====================end")
                manifestReadDir(bundle.dest + "/", manifestList[subGame].assets, result.__task.result.paths.dir);
                // for( let i = 0;i<hallPinPaiList.length;i++)
                // {
                //     manifestReadDir(options.dest + "/src/", manifestList["hall_"+hallPinPaiList[i] ].assets, options.dest + "/")
                // }
            }
            // log("not main====================start")
            // log(bundle.dest + "/")
            // log(manifestList[subGame].assets)
            // log(bundle.dest + "/")
            // log(result.__task.result.paths.dir)
            // log("not main====================end")
            manifestReadDir(bundle.dest + "/", manifestList[subGame].assets, result.__task.result.paths.dir);
            // for( let key in subGamePinPaiResList ){
            //     let key2 = null;
            //     for( key2 in subGamePinPaiResList[key] ){
            //         if( key2 == subGame ){
            //             for( let tempindex = 0; tempindex < subGamePinPaiResList[key][key2].length;tempindex++){
            //                 if( bundle.name == subGamePinPaiResList[key][key2][tempindex]){
            //                     if( manifestList[subGame+"_"+key] ){
            //                         manifestReadDir(options.dest + "/assets/" + bundle.name + "/", manifestList[subGame+"_"+key].assets, options.dest + "/")
            //                     } else{
            //                         log("???manifestList???????????????????????????", subGame+"_"+key)
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
    result.__task.result.bundles.forEach(bundle => {
        if (!bundle.name || bundle.name == "resources" || bundle.name == "internal") {
            return;
        }
        else {
            let subGame = bundle.name;
            if (bundle.name == "main") {
                subGame = "hall";
            }
            else {
                for (let k in manifestList) {
                    if (bundle.name.match(k)) {
                        subGame = k;
                    }
                }
            }
            Fs.writeFile(bundle.dest + "/" + subGame + "_project.manifest", JSON.stringify(manifestList[subGame]), (err) => {
                if (err)
                    throw err;
                Fs.writeFile(bundle.dest + "/" + subGame + "_version.manifest", JSON.stringify(getVersion(manifestList[subGame])), (err) => {
                    if (err)
                        throw err;
                });
            });
        }
    });
}
/**
 * @Description: ?????????????????????
 */
function _checkPackageName(options, result) {
    // log("<--Myplugin--> _checkPackageName")
    var root = Path.normalize(Editor.Project.path);
    var url = Path.join(root, m_pathTag + "native" + m_pathTag + "engine" + m_pathTag + "android" + m_pathTag + "app");
    var url0 = Path.join(url, m_pathTag + "res" + m_pathTag + "xml" + m_pathTag + "file_paths.xml");
    Fs.readFile(url0, "utf8", function (err, data) {
        if (err) {
            throw err;
        }
        var packageNameindex = data.indexOf(m_packageName);
        if (packageNameindex == -1) {
            _changeTemplatesPackageName(options, result);
        }
    });
}
// ?????? Templates ????????????????????????
function _changeTemplatesPackageName(options, result) {
    // log("<--Myplugin--> _changeTemplatesPackageName")
    var root = Path.normalize(Editor.Project.path);
    var url = Path.join(root, m_pathTag + "native" + m_pathTag + "engine" + m_pathTag + "android" + m_pathTag + "app");
    var url0 = Path.join(url, m_pathTag + "res" + m_pathTag + "xml" + m_pathTag + "file_paths.xml");
    Fs.readFile(url0, "utf8", function (err, data) {
        if (err) {
            throw err;
        }
        var newStr = "<?xml version='1.0' encoding='utf-8'?>\n" +
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
            "</resources>";
        Fs.writeFile(url0, newStr, function (error) {
            if (err) {
                throw err;
            }
        });
    });
    var url2 = Path.join(url, m_pathTag + "AndroidManifest.xml");
    Fs.readFile(url2, "utf8", function (err, data) {
        if (err) {
            throw err;
        }
        var newFile = data;
        var n0 = newFile.indexOf('package=') + 8;
        var n1 = newFile.indexOf('android:installLocation', n0);
        newFile = newFile.substring(0, n0) + "'" + m_packageName + "'" + "\n\t" + newFile.substring(n1);
        var v0 = newFile.indexOf('authorities=', n1) + 12;
        var v1 = newFile.indexOf('android:exported=');
        newFile = newFile.substring(0, v0) + "'" + m_packageName + ".fileProvider'" + "\n\t\t\t" + newFile.substring(v1);
        Fs.writeFile(url2, newFile, function (error) {
            if (err) {
                throw err;
            }
        });
    });
    var url3 = Path.join(url, m_pathTag + "build.gradle");
    Fs.readFile(url3, "utf8", function (err, data) {
        if (err) {
            throw err;
        }
        var n0 = data.indexOf('applicationId') + 13;
        var n1 = data.indexOf('minSdkVersion', n0);
        var newFile = data.substring(0, n0) + " " + "'" + m_packageName + "'" + "\n\t\t" + data.substring(n1);
        Fs.writeFile(url3, newFile, function (error) {
            if (err) {
                throw err;
            }
        });
    });
}
/**
 * @Description: ??????icon??????
 */
function _replaceIcons() {
    // log("<--Myplugin--> _replaceIcons")
    copyFile(m_projectPath + m_pathTag + "extensions" + m_pathTag + "hqq" + m_pathTag + "icon" + m_pathTag + m_pinpai + "" + m_pathTag + "mipmap-hdpi" + m_pathTag + "ic_launcher.png", m_projectPath + m_pathTag + "native" + m_pathTag + "engine" + m_pathTag + "android" + m_pathTag + "res" + m_pathTag + "mipmap-hdpi" + m_pathTag + "ic_launcher.png");
    copyFile(m_projectPath + m_pathTag + "extensions" + m_pathTag + "hqq" + m_pathTag + "icon" + m_pathTag + m_pinpai + "" + m_pathTag + "mipmap-mdpi" + m_pathTag + "ic_launcher.png", m_projectPath + m_pathTag + "native" + m_pathTag + "engine" + m_pathTag + "android" + m_pathTag + "res" + m_pathTag + "mipmap-hdpi" + m_pathTag + "ic_launcher.png");
    copyFile(m_projectPath + m_pathTag + "extensions" + m_pathTag + "hqq" + m_pathTag + "icon" + m_pathTag + m_pinpai + "" + m_pathTag + "mipmap-xhdpi" + m_pathTag + "ic_launcher.png", m_projectPath + m_pathTag + "native" + m_pathTag + "engine" + m_pathTag + "android" + m_pathTag + "res" + m_pathTag + "mipmap-hdpi" + m_pathTag + "ic_launcher.png");
    copyFile(m_projectPath + m_pathTag + "extensions" + m_pathTag + "hqq" + m_pathTag + "icon" + m_pathTag + m_pinpai + "" + m_pathTag + "mipmap-xxhdpi" + m_pathTag + "ic_launcher.png", m_projectPath + m_pathTag + "native" + m_pathTag + "engine" + m_pathTag + "android" + m_pathTag + "res" + m_pathTag + "mipmap-hdpi" + m_pathTag + "ic_launcher.png");
    copyFile(m_projectPath + m_pathTag + "extensions" + m_pathTag + "hqq" + m_pathTag + "icon" + m_pathTag + m_pinpai + "" + m_pathTag + "mipmap-ldpi" + m_pathTag + "ic_launcher.png", m_projectPath + m_pathTag + "native" + m_pathTag + "engine" + m_pathTag + "android" + m_pathTag + "res" + m_pathTag + "mipmap-hdpi" + m_pathTag + "ic_launcher.png");
    copyFile(m_projectPath + m_pathTag + "extensions" + m_pathTag + "hqq" + m_pathTag + "icon" + m_pathTag + m_pinpai + "" + m_pathTag + "mipmap-xxxhdpi" + m_pathTag + "ic_launcher.png", m_projectPath + m_pathTag + "native" + m_pathTag + "engine" + m_pathTag + "android" + m_pathTag + "res" + m_pathTag + "mipmap-hdpi" + m_pathTag + "ic_launcher.png");
    copyFile(m_projectPath + m_pathTag + "extensions" + m_pathTag + "hqq" + m_pathTag + "icon" + m_pathTag + m_pinpai + "" + m_pathTag + "Icon.icns", m_projectPath + m_pathTag + "native" + m_pathTag + "engine" + m_pathTag + "android" + m_pathTag + "res" + m_pathTag + "Icon.icns");
    copyFile(m_projectPath + m_pathTag + "extensions" + m_pathTag + "hqq" + m_pathTag + "icon" + m_pathTag + m_pinpai + "" + m_pathTag + "game.ico", m_projectPath + m_pathTag + "native" + m_pathTag + "engine" + m_pathTag + "android" + m_pathTag + "res" + m_pathTag + "game.ico");
}
/**
 * @Description: ???????????????java?????????????????????
 */
function _changePackageInfoInJava() {
    // log("<--Myplugin--> _changePackageInfoInJava")
    Fs.readFile(m_projectPath + "/project.json", 'utf8', function (err, files0) {
        if (!err) {
            let projectjson = JSON.parse(files0);
            let cccversion = projectjson.version;
            Fs.readFile(m_projectPath + "/version.json", "utf8", function (err, files) {
                if (err) {
                    log("<--Myplugin--> _changePackageInfoInJava version.json", err);
                    throw err;
                }
                let jsonConfig = JSON.parse(files);
                let apkversion = jsonConfig.apkversion;
                let proxyid = jsonConfig[m_pinpai][m_huanjin].proxyUserID;
                let str = '\"{\\\"pinpai\\\":\\\"' + m_pinpai
                    + '\\\",\\\"huanjin\\\":\\\"' + m_huanjin
                    + '\\\",\\\"system\\\":\\\"android\\\",\\\"version\\\":\\\"' + apkversion
                    + '\\\",\\\"proxyid\\\":\\\"' + proxyid
                    + '\\\",\\\"language\\\":\\\"' + m_language
                    + '\\\",\\\"country\\\":\\\"' + m_country
                    + '\\\",\\\"currency\\\":\\\"' + m_currency
                    + '\\\",\\\"engine_version\\\":\\\"' + cccversion + '\\\"}\"';
                let path = m_projectPath + m_pathTag + "native" + m_pathTag + "engine" + m_pathTag + "android" + m_pathTag + "app" + m_pathTag + "src" + m_pathTag + "com" + m_pathTag + "cocos" + m_pathTag + "game" + m_pathTag + "AppActivity.java";
                Fs.readFile(path, "utf8", function (err, data) {
                    if (err) {
                        log("<--Myplugin--> _changePackageInfoInJava readFile", err);
                        throw err;
                    }
                    let i0 = data.indexOf("getHqqPackageInfo");
                    let i1 = data.indexOf("return ", i0) + 7;
                    let i2 = data.indexOf(";", i1);
                    let ndata = data.substring(0, i1) + str + data.substring(i2);
                    Fs.writeFile(path, ndata, function (error) {
                        if (err) {
                            log("<--Myplugin--> _changePackageInfoInJava writeFile", err);
                            throw err;
                        }
                    });
                });
            });
        }
        else {
            console.log(err);
        }
    });
}
/**
 * @Description: ??????app?????????
 */
function _changeApkName() {
    let path = m_projectPath + m_pathTag + "native" + m_pathTag + "engine" + m_pathTag + "android" + m_pathTag + "res" + m_pathTag + "values" + m_pathTag + "strings.xml";
    let end = "";
    if (m_huanjin == "dev" || m_huanjin == "pre") { // || m_huanjin == "pre"
        end = m_huanjin;
    }
    let name = "";
    if (m_pinpai == 'test') {
        name = "???????????????";
    }
    else if (m_pinpai == 'debi') {
        name = "????????????";
    }
    else if (m_pinpai == 'xingba') {
        name = "????????????";
    }
    else if (m_pinpai == 'yuyu') {
        // name = "????????????"
        name = "??????II?????????";
    }
    else if (m_pinpai == "xinsheng") {
        name = "?????????";
    }
    else if (m_pinpai == "xingui") {
        name = "????????????";
    }
    else if (m_pinpai == "fuxin") {
        name = "??????II";
    }
    else if (m_pinpai == "xinhao") {
        name = "????????????";
    }
    else if (m_pinpai == "xinlong") {
        name = "????????????";
    }
    else if (m_pinpai == "nineone") {
        name = "91??????";
    }
    else if (m_pinpai == "huangshi") {
        name = "????????????";
    }
    else if (m_pinpai == "juding") {
        name = "????????????";
    }
    else if (m_pinpai == "huaxing") {
        name = "????????????";
    }
    else if (m_pinpai == "ninetwo") {
        name = "92??????";
    }
    else if (m_pinpai == "tianqi") {
        name = "????????????";
    }
    else if (m_pinpai == "chaofan") {
        name = "????????????";
    }
    else if (m_pinpai == "wansheng") {
        name = "????????????";
    }
    else if (m_pinpai == "jiaxing") {
        name = "????????????";
    }
    else if (m_pinpai == "fiveo") {
        name = "51??????";
    }
    else if (m_pinpai == "letian") {
        name = "????????????";
    }
    else if (m_pinpai == "xingyao") {
        name = "????????????";
    }
    name += end;
    let data = '<resources>\n' +
        '<string name="app_name" translatable="false">' + name + '</string>\n' +
        '</resources>';
    Fs.writeFile(path, data, function (error) {
        if (error) {
            throw error;
        }
    });
}
/*
 * ?????????????????????????????????????????????
 * @param src {String} ??????????????????
 * @param dist {String} ?????????????????????
 */
function copyDir(src, dist, callback) {
    Fs.access(dist, function (err) {
        if (err) {
            // ??????????????????????????????
            Fs.mkdirSync(dist);
        }
        _copy(null, src, dist);
    });
    function _copy(err, src, dist) {
        if (err) {
            callback(err);
        }
        else {
            Fs.readdir(src, function (err, paths) {
                if (err) {
                    callback(err);
                }
                else {
                    paths.forEach(function (path) {
                        var _src = src + '/' + path;
                        var _dist = dist + '/' + path;
                        Fs.stat(_src, function (err, stat) {
                            if (err) {
                                callback(err);
                            }
                            else {
                                // ???????????????????????????
                                if (stat.isFile()) {
                                    Fs.writeFileSync(_dist, Fs.readFileSync(_src));
                                }
                                else if (stat.isDirectory()) {
                                    // ??????????????????????????????
                                    copyDir(_src, _dist, callback);
                                }
                            }
                        });
                    });
                }
            });
        }
    }
}
/**
 * @Description: ??????????????????????????????
 */
function delDir(path) {
    if (Fs.existsSync(path)) {
        let files = Fs.readdirSync(path);
        files.forEach((file, index) => {
            let curPath = path + "/" + file;
            if (Fs.statSync(curPath).isDirectory()) {
                delDir(curPath); //?????????????????????
            }
            else {
                Fs.unlinkSync(curPath); //????????????
            }
        });
        // Fs.rmdirSync(path);
    }
}
/**
 * @Description: ????????????
 */
function copyFile(src, dist) {
    Fs.stat(src, function (err, stats) {
        if (!err) {
            Fs.writeFileSync(dist, Fs.readFileSync(src));
        }
        else {
            log(src + "no file!");
        }
    });
}
/**
 * @Description: ?????????????????????????????????
 */
function moveFileToGitPath() {
    Fs.readFile(m_projectPath + "/project.json", 'utf8', function (err, files) {
        if (!err) {
            let projectjson = JSON.parse(files);
            let cccversion = projectjson.version;
            Fs.access(m_gitPath, function (err) {
                if (err) {
                    log("?????????git???????????????????????????????????????git????????????", err);
                    return;
                }
            });
            let gitPath = m_gitPath + "com." + m_pinpai + "." + m_huanjin + ".android";
            let destpath = gitPath + m_pathTag;
            if (cccversion != '2.1.3') {
                destpath = gitPath + m_pathTag + "ccc" + cccversion + m_pathTag;
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
                                copyFile(m_buildPath + m_pathTag + path, destpath + m_pathTag + m_versionjson.version["hall"] + m_pathTag + path);
                                copyFile(m_buildPath + m_pathTag + path, destpath + m_pathTag + path);
                            }
                            else if (path.match("assets") || path.match("remote") || path.match("src")) {
                                copyDir(m_buildPath + m_pathTag + path, destpath + m_pathTag + m_versionjson.version["hall"] + m_pathTag + path, (err) => {
                                    log("??????????????????", err);
                                });
                                copyDir(m_buildPath + m_pathTag + path, destpath + m_pathTag + path, (err) => {
                                    log("??????????????????", err);
                                });
                            }
                        });
                    });
                    copyFile(m_projectPath + m_pathTag + "version.json", destpath + m_pathTag + m_versionjson.version["hall"] + m_pathTag + "version.json");
                    copyFile(m_projectPath + m_pathTag + "version.json", destpath + m_pathTag + "version.json");
                });
            });
        }
        else {
            log(err);
        }
    });
}
