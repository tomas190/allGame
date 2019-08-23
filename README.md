<!--
 * @Author: burt
 * @Date: 2019-08-15 14:28:50
 * @LastEditors: burt
 * @LastEditTime: 2019-08-23 11:58:41
 * @Description: 
 -->
# all hqq native combined-game project
common目录：{
	通用模块
	存放公共资源res目录（音乐audio，图片image，字体font，动画animation，）
	通用预制件prefab目录
	脚本目录script{
		common 主包脚本{
			gHandler 游戏全局模块管理器
			gHandler.gameGlobal 游戏全局数据
			gHandler.gameConfig 游戏配置信息
			google-protobuf.js pb库
			...
		}
		hall 大厅脚本
		qznn 抢庄牛牛所有脚本(.js文件)
		...
	}
}

subgame子游戏资源目录：{
	hall目录：
		大厅目录，大厅的项目资源
	qznn目录：
		子游戏抢庄牛牛目录，抢庄牛牛的工程资源及代码都在此目录内，开发基本全部在自己的子游戏目录内完成
}

注意：{
	获取大厅用户信息及其他，require gHandler模块，所有信息都会放在此模块内
	动态加载的资源请尽最大努力改为资源节点形式管理，而不是放在一级目录resource下通过cc.loader来加载（示例：大厅场景hallresmanager节点）
	资源名冲突（包括图片，脚本等），自己子游戏目录下的资源名字前缀解决
	在common的 gHandler.gameConfig 里配置游戏数据
	从hall场景点击游戏按钮，跳转场景进入子游戏场景，进入子游戏
	通用的库（pb库）建议放在主包脚本中，防止文件冲突
}

ts 项目注意事项：{
	载入模块格式：import 模块名 = require("模块路径")
	暴露模块格式：export = 模块
}

新开项目流程：{
	1、fork（派生）新仓库，子游戏修改后提交至自己的新仓库
	2、阶段性开发完成后，向主仓库提交Pull Requests（合并请求）请求
	3、主仓库合并各个子游戏
	4、发布
}

从已有项目迁入自己fork派生的项目内：{
	1、在派生项目内建好子游戏目录结构
	2、从老项目中直接拖曳文件夹至cocos creator 资源管理器面板 子游戏目录位置，合并
	3、继续开发
}

游戏配置：{
	大厅展示需在 gHandler.gameConfig 中配置数据,
	zhname: "抢庄牛牛", // 中文游戏名
    enname: "qznn", // 英文游戏名 （子游戏文件路径，更新子路径）
    lanchscene: "NNGame", // 跳转场景名
}

同步主分支master修改（common目录内容修改）：{
	git remote -v // 查看远程仓库状态
	git remote add upstream http://git.0717996.com/burt/allGame // 添加主分支远程仓库
	git fetch upstream // 从主分支远程仓库拉取资源
	git merge upstream/master // 合并到本地代码
	git pull origin master // 更新并合并自己远程仓库代码
	git push 
	注意：有时可能需要重启游戏编辑器才能显示正常
}

常用接口示例：{
	返回大厅：
	let gHandler = require("gHandler");
    cc.director.loadScene(gHandler.gameConfig.hallconfig.lanchscene)

	获取玩家数据：
	let gHandler = require("gHandler");
	gHanler.gameGlobal.player.name
}


