<<<<<<< HEAD
=======
<!--
 * @Author: burt
 * @Date: 2019-08-15 14:28:50
 * @LastEditors: burt
 * @LastEditTime: 2019-08-22 17:59:29
 * @Description: 
 -->
>>>>>>> upstream/master
# all hqq native combined-game project
common目录：{
	通用模块
	存放公共资源res目录（音乐audio，图片image，字体font，动画animation，）
	通用预制件prefab目录
	脚本目录script{
		common 主包脚本{
			gameGlobal 游戏全局数据
			gHandler 游戏全局模块管理器
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
	资源名冲突，自己子游戏目录下的资源名字前缀解决
	在common的hallConfig里配置游戏数据
	从hall场景点击游戏按钮，跳转场景进入子游戏场景，进入子游戏
	通用的库（pb库）建议放在主包脚本中，防止文件冲突
}

新开项目流程：{
	1、fork新仓库，子游戏修改后提交至自己的新仓库
	2、阶段性开发完成后，向主仓库提交Pull Requests请求
	3、主仓库合并各个子游戏
	4、发布

	<!-- 1、先拉取master分支 （git clone http://git.0717996.com/burt/allGame）
	2、在本地新建分支 （git checkout -b [分支名称]）
	3、subgame目录下与hall同级建立子游戏工程目录
	4、子游戏修改后提交至自己的分支（注意，只操作自己的分支）
	5、阶段性开发后，主分支合并各开发者的分支，发布 -->
}

游戏配置：{
	大厅展示需在common/gameconfig中配置数据,
	zhname: "抢庄牛牛", // 中文游戏名
    enname: "qznn", // 英文游戏名 （子游戏文件路径，更新子路径）
    lanchscene: "NNGame", // 跳转场景名
}

同步主分支master修改（common目录内容修改）：{
	1、把自己的修改全部上传到自己派生的新仓库
	2、拉取主分支master代码到本地，解决冲突后上传{
		git remote -v // 查看远程仓库状态
		git remote add upstream http://git.0717996.com/burt/allGame // 添加主分支远程仓库
		git fetch upstream // 从主分支远程仓库拉取资源
		git merge upstream/master // 合并到本地代码
		git pull origin master // 更新并合并自己远程仓库代码
		git push 
	}
	注意：有时可能需要重启游戏编辑器才能显示正常
}



