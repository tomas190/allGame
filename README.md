
all hqq native combined-game project
# 新增修改
进入全民代理场景改为呼叫这个接口
hqq.eventMgr.dispatch(hqq.eventMgr.showJumpScene,"proxy");

进入大厅场景改为呼叫这个接口
hqq.eventMgr.dispatch(hqq.eventMgr.showJumpScene,"hall");

以上均有针对品牌做处理

# 大厅结构有大幅度的修改
# 改成分品牌更新
# 项目目录结构：
```javascript
├──base 主包目录
|	|──app  登陆更新模块
|	|──common  公用的脚本
|	|   |──gHandler 游戏全局模块管理器
|	|   |──hqqAudioMgr 音效管理器
|	|   |──hqqBase64 base64转码
|	|   |──hqqCommonTool 工具函数
|	|   |──hqqEvent 事件派发
|	|   |──hqqHttp XMLHttpRequest
|	|   |──hqqLocalStorage 本地存储
|	|   |──hqqLogMgr 日志
|	|   |──hqqNetNode 信号节点脚本
|	|   |──hqqNetPanel 信号测试界面脚本
|	|   └──hqqViewMgr 页面加载
|	└──scene  主包场景ui 
|──resource 主包目录
|	|──base  主包动态资源
|	|──hall  WSS凭证
└──subgame 
|	|──hall_test     大厅特斯特资源
|	|──hall_chaofan  大厅超凡资源
|	|   |──scene     大厅Bundle底下scene统一命名为hall
|	|──pay_test      充提特斯特资源
|	|──pay_fuxin     充提富鑫资源
|	|──proxy_test    全民代理特斯特资源
|	|──proxy_chaofan 全民代理超凡资源
|	|   |──scene     全民代理Bndle底下场景统一命名为proxy_+加品牌名称例如proxy_chaofan
|	|──IM_test       IM资源
|	└──lhd           子游戏目录龙虎斗资源
|	└──lhd_fuxin     子游戏目录龙虎斗富鑫品牌资源
|	└──bjl           子游戏目录百家乐资源
|	└──bjl_fuxin     子游戏目录百家乐富鑫品牌资源
```    
# 新增修改
# 大厅结构有大幅度的修改
原有的引入大厅的gHandler模块，现在需要修改
import gHandler = require("../../../common/script/common/gHandler")

修改为
import gHandler = require("../../../main/common/gHandler")

# 浮动提示增加一种方法
原来的方式：从屏幕中间向上浮动，到中间悬停，然后再向上浮动消失的提示
gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "需要显示的字符串")

新增的方式：从指定节点的指定位置开始浮动提示
gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, { msg: "网络断开，正在努力连接中", parent: "你ui上的一个节点",position:{x:0,y:0} })

# 信号节点
在自己的ui上指定位置显示一个信号状态节点
let pn = cc.find('你ui上的一个节点位置')
gHandler.eventMgr.dispatch(gHandler.eventMgr.showNetStateNode, { parent: pn, position: { x: 0, y: 0 } })

# 项目目录结构：
```javascript
├──main  主包目录
|	|──app  登陆更新模块
|	|──common  公用的脚本
|	|   |──gHandler 游戏全局模块管理器
|	|   |──hqqAudioMgr 音效管理器
|	|   |──hqqBase64 base64转码
|	|   |──hqqCommonTool 工具函数
|	|   |──hqqEvent 事件派发
|	|   |──hqqHttp XMLHttpRequest
|	|   |──hqqLocalStorage 本地存储
|	|   |──hqqLogMgr 日志
|	|   |──hqqNetNode 信号节点脚本
|	|   |──hqqNetPanel 信号测试界面脚本
|	|   └──hqqViewMgr 页面加载
|	└──scene  主包场景ui 
|──resource
|	|──main  主包动态资源
|	|──hall  大厅动态资源
|	|──head  头像资源
|	|──pay   充提资源
|	|──proxy 全民代理资源
|	|──IM    IM资源
|	└──子游戏资源目录...
└──subgame
|	|──hall  大厅资源
|	|──pay   充提资源
|	|──proxy 全民代理资源
|	|──IM    IM资源
	└──子游戏目录...
```

# 合并须知
基本把所有代码都放出来了，只要线路选择这块的代码被删除了
修改当前的开发环境， common/app/appGlobal 中的 huanjin 字段，dev，pre两个环境，任选其一
另外必须修改 deviceID 字段，必须是唯一，不与其他人的设备id冲突，推荐使用自己开发的gameid，再额外加几位数字
比如抢庄牛牛
"5b1f3a3cb76a591e7f251714 + 123456789 = 5b1f3a3cb76a591e7f251714123456789"

如果发现后台无法根据设备id新建账号，可以改为使用已有的账号密码进行登录
方式如下：
在appGlobal下添加一下两项，即可实现指定账号密码登陆
account_name: 账号,
account_pass: 密码,

# 作为其他游戏平台嵌入的判断
gHandler.isOtherGame 只能在loading场景进行修改，需要测试的话需要在loading.js文件中修改其值 gHandler.isOtherGame = true
gHandler.isOtherGame // true 表示是作为其他平台的第三方游戏平台，false 表示是我们自己的平台

作为第三方平台，不需要显示个人信息界面的按钮，充值界面的按钮，返回大厅的按钮等

# 关于新增的按钮音效接口
大厅的按钮音效是通过直接修改按钮组件的源码进行播放的，具体代码详见 hqqAudioMgr.js   
这个接口的好处就是一次修改，期间所有的按钮音效全部都是这个音效，不需要每次按钮点击的时候都特意调用播放点击音效  
这个接口也是有生命周期的，需要进入场景 onload 函数中开启，离开场景时 ondestroy 销毁
开启的参数为（true，'/hall/audio/Click'），ture表示启用，后面紧跟的是按钮点击音效的路径
销毁的参数为（false），如果不做销毁，可能会影响其他未使用此接口的游戏
```js
gHandler.audioMgr.setButtonEffect(true，'/hall/audio/Click');
gHandler.audioMgr.setButtonEffect(false);
```

# 合并须知：
基本把所有代码都放出来了，只要线路选择这块的代码被删除了  
修改当前的开发环境， common/app/appGlobal 中的 huanjin 字段，dev，pre两个环境，任选其一  
另外必须修改 deviceID 字段，必须是唯一，不与其他人的设备id冲突，推荐使用自己开发的gameid，再额外加几位数字    
比如抢庄牛牛  
```js
"5b1f3a3cb76a591e7f251714 + 123456789 = 5b1f3a3cb76a591e7f251714123456789"
``` 
如果发现后台无法根据设备id新建账号，可以改为使用已有的账号密码进行登录  
方式如下：  
在appGlobal下添加一下两项，即可实现指定账号密码登陆  
account_name: 账号,  
account_pass: 密码,  

# 合并master分支建议：
Git merge 会有很多冲突，可以采用直接删除本地大厅文件夹，从工程文件夹内直接拖至cocos引擎资源管理器替换原有文件夹    

# 打印组件打开方法：
进入个人信息界面（点击头像弹出的界面），连续点击音乐和音效文字，各10次以上，可以激活日志打印组件  
可以比较方便的查看js的打印信息  

# 个人头像:
头像图片资源修改，由原来的20个，改为10个，根据头像图片取10余数，获取对应头像    
点击头像显示界面调用示例 gHandler.eventMgr.dispatch(gHandler.eventMgr.showPerson, null) // 显示个人设置界面

# 登陆接口改变：
原有的账号密码登陆方式，只在本地开发上使用  
发布使用id + token的方式登陆子游戏  
* 账号密码方式  
账号：gHandler.gameGlobal.player.account_name // number类型  
密码：gHandler.gameGlobal.player.account_pass // string类型  
* id+token方式  
id:gHandler.gameGlobal.player.id // number类型  
token:gHandler.gameGlobal.token // string类型  

# 滚动公告：
common/hall/scene/hall 场景的 Main Camera/toppanel/noticepanel/sp_trumppet_bg节点  
可直接复制此滚动公告节点到需要的场景上，即可实现滚动公告功能  

# 注意：
一个子游戏有两个文件夹路径，一个是resources下新建的子游戏的动态资源目录，
	一个是subgame目录下新建的子游戏开发目录，不再需要在common/script/下新建脚本目录  
获取大厅用户信息及其他，require gHandler模块，所有信息都会放在此模块内  
对动态加载资源，只需要创建 asserts/resources/子游戏文件夹  目录，并将所有动态资源放置在此目录即可  
资源名冲突（包括图片，脚本等），自己子游戏目录下的资源名字前缀解决  
场景名 ： 请务必加游戏前缀或保证不与其他场景重名  
在common的 gHandler.gameConfig 里配置游戏数据  
从hall场景点击游戏按钮，跳转场景进入子游戏场景，进入子游戏  
通用的库（pb库）建议放在主包脚本中，防止文件冲突  

# ts 项目注意事项：
载入模块格式：import 模块名 = require("模块路径")  
暴露模块格式：export = 模块  
ts的命名空间（namesapace）命名请不要冲突，一定加上自己的项目前缀  
文件名也请加上前缀，ts的文件冲突比较苛刻  

# 项目目录结构：
```javascript
├──common  大厅目录
|	|──app  登陆更新模块
|	|──hall  大厅美术资源及场景
|	|──scene  loading场景
|	|──script  脚本
|	|	|──hall  大厅私有脚本（页面，场景等挂载脚本）
|	|	└──common  公用的脚本
|	|		|──gHandler 游戏全局模块管理器
|	|		|──google-protobuf.js pb库
|	|		|──hqqAudioMgr 音效管理器
|	|		|──hqqBase64 base64转码
|	|		|──hqqCommonTool 工具函数
|	|		|──hqqEvent 事件派发
|	|		|──hqqHttp XMLHttpRequest
|	|		|──hqqLocalStorage 本地存储
|	|		|──hqqLogMgr 日志
|	|		|──hqqViewMgr 页面加载
|	|		└──jsencrypt 转码库
|──resource
|	|──hall  大厅动态资源
|	|──head  头像资源
|	└──子游戏资源目录...
└──subgame
	└──子游戏目录...
```

# 新开项目流程：
1. 克隆仓库（git clone http://git.0717996.com/burt/allGame ）
	或者克隆仓库已有分支（git clone -b 分支名 http://git.0717996.com/burt/allGame） 
    如果克隆失败出现error: RPC failed; curl 18 transfer closed with outstanding read data remaining
    改使用克隆仓库git clone --depth=1 http://git.0717996.com/burt/allGame
    或者克隆仓库已有分支 git clone --depth=1 http://git.0717996.com/burt/allGame -b 分支名
    然后移动到克隆目录底下git fetch --unshallow
2. 查看本地仓库远程分支情况 （git branch -a）  
3. 如果没有子游戏分支   
    在master分支下新建分支 （git checkout -b 分支名）  
    并推送（git push --set-upstream origin 分支名）  
    如果已有分支，直接拉取远程分支到本地（  
        1、git fetch origin 分支名 // 拉取远程分支到本地  
		2、git checkout -b 分支名  // 切换分支  
	）  
4. resource和subgame目录下创建自己的游戏目录并开发  
5. 开发提交修改至分支... （add pull push）  
6. 游戏开发阶段完成，allgame分支合并子游戏分支  
7. 出包  

# 游戏配置：
子游戏的配置 需在 gHandler.gameConfig 中配置
```javascript
"dzpk": {
    zhname: "德州扑克", // 中文游戏名
    enname: "dzpk", // 英文游戏名 （子游戏文件路径，更新子路径）
    lanchscene: "dzpk_roomList", // 跳转场景名
    game_id: "5b1f3a3cb76a591e7f25176", // 游戏id
    serverUrl: "/dezhoupoker", // 游戏服务器地址（大厅登陆后会修改此地址，子游戏需要在进入子游戏时获取服务器地址）
    endUrl: "/dezhoupoker", // 游戏服务器地址（子游戏服务器后缀）
    hasAccount: false, // 是否已创建子游戏账号
    remoteData: null, // 服务端发送过来的游戏数据
    hallid: 22,
    resid: 22,
    isDown: false,
},
```

# 同步主分支master修改（common目录内容修改）：
大厅的修改都在master分支下，子游戏同步大厅修改需合并master分支   
1、切换到子游戏分支   
2、合并大厅分支master (git merge master)   
3、解决冲突（modified的在本地编辑器即可修改）   
4、继续开发   
5、开发阶段完成，请求合并    
<u>(注意：大厅分支subgame文件夹已删除，合并分支时请一定注意)</u>

# 常用接口示例：

## 加载头像资源到指定精灵上
```js
gHandler.commonTools.loadHeadRes(headid, headsprite)
```

## 时差打印
对应脚本 hqqLogMgr.js
```js
gHandler.logMgr.time('唯一的记录键值') // 开始计时
gHandler.logMgr.timeEnd('唯一的记录键值', '额外打印') // 计时结束并打印
```

## 发送至日志服务器的打印
此接口打印的内容将会发送到日志服务器，需要追踪信息的可以使用此接口
```js
gHandler.logMgr.log('字符串1','字符串2'...)
```
<u>(注意：请不要滥用)</u>

## 本地保存
对应脚本 hqqLocalStorage.js
```js
gHandler.localStorage.set("子模块名字", "键值", "可JSON.stringify数据") // 保存
gHandler.localStorage.has("子模块名字", "键值") // 是否存有
gHandler.localStorage.get("子模块名字", "键值") // 获取保存数据
gHandler.localStorage.remove("子模块名字", "键值") // 移除数据
```

## 同步账号切换
```javascript
gHandler.eventMgr.register(gHandler.eventMgr.refreshPlayerinfo,'自己的类名或唯一标识',this.setPlayerInfo.bind(this)); // 进入时注册监听
setPlayerInfo(msg){
    if (msg) { // 如果有信息
        if (msg.id != "自己记录的登陆的用户id") {
            // todo 退出之前的帐号 重新连接新的帐号
        }
    }
}
gHandler.eventMgr.unregister(gHandler.eventMgr.refreshPlayerinfo,'自己的类名或唯一标识'); // 退出取消监听
```

## 浮动提示
从屏幕中间向上浮动，到中间悬停，然后再向上浮动消失的提示
```javascript
gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "需要显示的字符串")
```

## 同步大厅背景音乐
```javascript
gHandler.eventMgr.register(gHandler.eventMgr.refreshBgState, "自己的类名或唯一标识", this.bgstatechange.bind(this)); // 进入时注册监听
bgstatechange(bool) { // bool true 打开 false 关闭   背景音乐的开关状态
    // todo 对自己的音乐资源进行操作
}
gHandler.eventMgr.unregister(gHandler.eventMgr.refreshBgState, "自己的类名或唯一标识"); // 退出取消监听
```

## 大厅背景音乐接口
大厅有音效管理模块，修改大厅音效状态值都会派发事件 gHandler.eventMgr.refreshBgState
```javascript
gHandler.audioMgr.playBg() // 播放大厅音乐
gHandler.audioMgr.stopBg() // 终止大厅正在播放的音乐
gHandler.audioMgr.getBgState() // 获取音效当前状态 返回bool值 true 打开 false 关闭
gHandler.audioMgr.setBgState(bool) // 设置当前音效状态 true 打开 false 关闭
```

## 大厅提示小界面接口
比如 金币不足，不能进入该等级的房间 提示界面
```javascript
gHandler.eventMgr.dispatch(gHandler.eventMgr.showSamlllayer, { type: 10, msg:"需要显示的内容",ensurefunc:function(){""} })
```

## 添加大厅页面及跳转充提模块
```javascript
gHandler.eventMgr.dispatch(gHandler.eventMgr.showNotice, null) // 显示公告界面
gHandler.eventMgr.dispatch(gHandler.eventMgr.showRegister, null) // 显示免费金币界面
gHandler.eventMgr.dispatch(gHandler.eventMgr.showPerson, null) // 显示个人设置界面
gHandler.eventMgr.dispatch(gHandler.eventMgr.showPayScene, "当前场景的名字（用于充提返回当前场景）") // 跳转充提场景
```

## 返回大厅
```javascript
let gHandler = require("gHandler");
cc.director.loadScene(gHandler.gameConfig.hallconfig.lanchscene)
```

## 获取玩家数据
gHanler.gameGlobal.player中有诸多玩家的信息，大厅在登陆后会刷新此数据体
```javascript
let gHandler = require("gHandler");
gHanler.gameGlobal.player.name
```

## 横竖屏切换
竖屏项目注意：需要在loadscene之前调用一次 gHandler.Reflect.setOrientation() 
不带任何参数，默认设为大厅场景格式
完整的调用格式如下：
```javascript
gHandler.Reflect.setOrientation("portrait", 640, 1136)  // 竖屏 宽 高
gHandler.Reflect.setOrientation("landscape", 1334, 750) // 横屏 宽 高
```