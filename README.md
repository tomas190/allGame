# all hqq native combined-game project
common目录：
	通用模块
	存放公共资源res目录（音乐audio，图片image，字体font，动画animation，）
	通用预制件prefab目录
	通用场景目录scene
	脚本目录script
hall目录：
	大厅目录，大厅的项目资源
niuniu目录：
	子游戏目录，游戏目录，目录名根据游戏自己创建，工程资源都在此目录下，所有工作都在此目录完成

注意：{
	资源名冲突，自己子游戏目录下的资源名字前缀解决
	游戏第一个场景为common目录 的 loading
	第二个场景为hall目录 的 hall
	在common的hallConfig里配置游戏数据
	从hall场景点击游戏按钮，跳转场景进入子游戏场景，进入子游戏
}

新开项目流程：{
	先拉取master分支 （git clone http: //git.0717996.com/burt/allNativeGame.git）
	进入allNativeGame目录，在本地新建分支 （git checkout -b [分支名称]）
	与common目录同级建立子游戏工程目录
}

修改master分支（修改common 和 hall 里的两个目录）：{
	保存后跳转至master分支（ 
		git add .
		git commit -m [checkoutToMasterSave]
		git push
		git checkout master
	）
	修改后提交 （
		git add .
		git commit -m [注释]
		git push
	）
	返回子游戏分支，合并master分支（
		git branch [子游戏分支]
		git merge master
	）
}



