<!--
 * @Author: burt
 * @Date: 2019-08-15 14:28:50
 * @LastEditors: burt
 * @LastEditTime: 2019-10-29 15:59:44
 * @Description: 
 -->
# all hqq native combined-game project

10.29更新{
	头像图片资源修改，由原来的20个，改为10个，根据头像图片取10余数，获取对应头像
	大厅 调用示例 gHandler.eventMgr.dispatch(gHandler.eventMgr.showPerson, null) // 显示个人设置界面
}

10.24更新{
	增加事件派发添加大厅页面及跳转充提模块
	 	gHandler.eventMgr.dispatch(gHandler.eventMgr.showNotice, null) // 显示公告界面
		gHandler.eventMgr.dispatch(gHandler.eventMgr.showRegister, null) // 显示免费金币界面
		gHandler.eventMgr.dispatch(gHandler.eventMgr.showPerson, null) // 显示个人设置界面
		gHandler.eventMgr.dispatch(gHandler.eventMgr.showPayScene, "当前场景的名字（用于充提返回当前场景）") // 跳转充提场景
}

登陆接口改变：{
	原有的账号密码登陆方式，只在本地开发上使用
	发布使用id + token的方式登陆子游戏

	账号密码方式
	账号：gHandler.gameGlobal.player.account_name // number类型
	密码：gHandler.gameGlobal.player.account_pass // string类型

	id+token方式
	id:gHandler.gameGlobal.player.id // number类型
	token:gHandler.gameGlobal.token // string类型
}

滚动公告：{
	common/hall/scene/hall 场景的 Main Camera/toppanel/noticepanel/sp_trumppet_bg节点
	可直接复制此滚动公告节点到需要的场景上，即可实现滚动公告功能
}

注意：{
	一个子游戏有两个文件夹路径，一个是resources下新建的子游戏的动态资源目录，
		一个是subgame目录下新建的子游戏开发目录，不再需要在common/script/下新建脚本目录
	获取大厅用户信息及其他，require gHandler模块，所有信息都会放在此模块内
	对动态加载资源，只需要创建 asserts/resources/子游戏文件夹  目录，并将所有动态资源放置在此目录即可
	资源名冲突（包括图片，脚本等），自己子游戏目录下的资源名字前缀解决
	场景名 ： 请务必加游戏前缀或保证不与其他场景重名
	在common的 gHandler.gameConfig 里配置游戏数据
	从hall场景点击游戏按钮，跳转场景进入子游戏场景，进入子游戏
	通用的库（pb库）建议放在主包脚本中，防止文件冲突
}

ts 项目注意事项：{
	载入模块格式：import 模块名 = require("模块路径")
	暴露模块格式：export = 模块
	ts的命名空间（namesapace）命名请不要冲突，一定加上自己的项目前缀
	文件名也请加上前缀，ts的文件冲突比较苛刻
}

common目录：{
	通用模块
	存放公共资源res目录（音乐audio，图片image，字体font，动画animation，）
	通用预制件prefab目录
	脚本目录script{
		common 主包脚本{
			gHandler 游戏全局模块管理器
			google-protobuf.js pb库
			...
		}
		hall 大厅脚本
	}
}

subgame子游戏资源目录：{
	qznn目录：
		子游戏抢庄牛牛目录，抢庄牛牛的工程资源及代码都在此目录内，开发基本全部在自己的子游戏目录内完成
}

新开项目流程：{
	1、克隆仓库（git clone http://git.0717996.com/burt/allGame ）
		或者克隆仓库已有分支（git clone -b 分支名 http://git.0717996.com/burt/allGame）
	2、查看本地仓库远程分支情况 （git branch -a）
	3、如果没有子游戏分支，在master分支下新建分支 （git checkout -b 分支名）,
		并推送（git push --set-upstream origin 分支名）
		如果已有分支，直接拉取远程分支到本地（
			git fetch origin 分支名 // 拉取远程分支到本地
			git checkout -b 分支名  // 切换分支
		）
	4、开发提交修改至分支... （add pull push）
	5、游戏开发阶段完成，allgame分支合并子游戏分支
	6、出包
}

游戏配置：{
	大厅展示的子游戏动画跳转 需在 gHandler.gameConfig 中配置数据,
	"qznn": {
        zhname: "抢庄牛牛", // 中文游戏名
        enname: "qznn", // 英文游戏名 （子游戏文件路径，更新子路径）
        lanchscene: "NNGame", // 跳转场景名
        game_id: "123456789",
        serverUrl: "", // 游戏服务器地址
        resid: 12,
    },
}

同步主分支master修改（common目录内容修改）：{
	大厅的修改都在master分支下，子游戏同步大厅修改需合并master分支
	1、切换到子游戏分支
	2、合并大厅分支master (git merge master)
	3、解决冲突（modified的在本地编辑器即可修改）
	4、继续开发
	5、开发阶段完成，请求合并

	(注意：大厅分支subgame文件夹已删除，合并分支时请一定注意)
}

常用接口示例：{
	返回大厅：
	let gHandler = require("gHandler");
    cc.director.loadScene(gHandler.gameConfig.hallconfig.lanchscene)

	获取玩家数据：
	let gHandler = require("gHandler");
	gHanler.gameGlobal.player.name

	横竖屏切换：
	竖屏项目注意：需要在loadscene之前调用一次 gHandler.Reflect.setOrientation() 
	不带任何参数，设为大厅场景格式
	完整的调用格式如下：
	gHandler.Reflect.setOrientation("portrait", 640, 1136)  // 竖屏 宽 高
	gHandler.Reflect.setOrientation("landscape", 1334, 750) // 横屏 宽 高
}


