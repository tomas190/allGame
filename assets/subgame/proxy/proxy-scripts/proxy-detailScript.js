let commonVal = require("proxy-http");
let gHandler = require("gHandler");
let toFloat = require("./proxy-changeFloat");
let host, account_name, token;
function formatDate(time) {
	if (!time) return;
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var date = time.getDate();
	return year + "/" + month + "/" + date;
}
cc.Class({
	extends         : cc.Component,
	properties      : {
		grid : {
			type    : cc.Prefab,
			default : null,
		},
	},
	onLoad() {
		host = gHandler.gameGlobal.proxy.proxy_host;
		account_name = commonVal.account_name;
		token = commonVal.token;
	},
	init            : function(num) {
		host = gHandler.gameGlobal.proxy.proxy_host;
		account_name = commonVal.account_name;
		token = commonVal.token;
		var self = this;
		cc.loader.loadRes(`/proxy/title_${num}`, cc.SpriteFrame, function(err, spriteFrame) {
			self.node
				.getChildByName("thead")
				.getChildByName("title_bg")
				.getChildByName("title")
				.getComponent(cc.Sprite).spriteFrame = spriteFrame;
		});
		this.agentDetails(num);
	},
	initMycustomers : function(id, count) {
		host = gHandler.gameGlobal.proxy.proxy_host;
		account_name = commonVal.account_name;
		token = commonVal.token;
		var self = this;
		var targetNode = cc.find("Canvas/baseView/home/page2");
		//给关闭按钮添加控制计数器事件
		var closeEventHandler = new cc.Component.EventHandler();
		closeEventHandler.target = targetNode; // 这个 node 节点是你的事件处理代码组件所属的节点
		closeEventHandler.component = "proxy-page2"; // 这个是代码文件名
		closeEventHandler.handler = "closeCheckCustomers";
		// clickEventHandler.customEventData = labels.id;

		var button = this.node
			.getChildByName("thead")
			.getChildByName("title_bg")
			.getChildByName("close")
			.getComponent(cc.Button);
		button.clickEvents.push(closeEventHandler);

		// 动态控制表格标题
		if (parseInt(count) !== 1) {
			self.node
				.getChildByName("thead")
				.getChildByName("title_bg")
				.getChildByName("title").active = false;
			self.node
				.getChildByName("thead")
				.getChildByName("title_bg")
				.getChildByName("label")
				.getComponent("cc.Label").string = id;
			self.node
				.getChildByName("thead")
				.getChildByName("title_bg")
				.getChildByName("label").active = true;
			switch (parseInt(count)) {
				case 2:
					cc.loader.loadRes("/proxy/proxy-title1", cc.SpriteFrame, function(
						err,
						spriteFrame,
					) {
						self.node
							.getChildByName("thead")
							.getChildByName("title_bg")
							.getChildByName("label")
							.getChildByName("title")
							.getComponent(cc.Sprite).spriteFrame = spriteFrame;
					});
					break;
				case 3:
					cc.loader.loadRes("/proxy/proxy-title2", cc.SpriteFrame, function(
						err,
						spriteFrame,
					) {
						self.node
							.getChildByName("thead")
							.getChildByName("title_bg")
							.getChildByName("label")
							.getChildByName("title")
							.getComponent(cc.Sprite).spriteFrame = spriteFrame;
					});
					break;
				default:
					cc.loader.loadRes("/proxy/proxy-title4", cc.SpriteFrame, function(
						err,
						spriteFrame,
					) {
						self.node
							.getChildByName("thead")
							.getChildByName("title_bg")
							.getChildByName("label")
							.getChildByName("title")
							.getComponent(cc.Sprite).spriteFrame = spriteFrame;
					});
					break;
			}
			console.log("打开了我的客户！", count, account_name, id);
		}
		this.myLevel(id, count);
	},
	agentDetails    : function(num) {
		host = gHandler.gameGlobal.proxy.proxy_host;
		account_name = commonVal.account_name;
		token = commonVal.token;
		var self = this;
		let page = 1;
		let contentHeight = 0;
		let isStop = false;
		let level = parseInt(num);
		addMoreGrids();
		this.node.getComponent(cc.ScrollView).node.on("scrolling", callback, this);
		function callback(scrollView) {
			//   console.log("在滑动！！！", JSON.stringify(scrollView.getScrollOffset()));
			let scrollOffsetHeight = scrollView.getScrollOffset().y;
			if (scrollOffsetHeight >= contentHeight - 53 * 9 * 1.2 && !isStop) {
				page++;
				addMoreGrids();
				isStop = true;
			}
		}
		function addMoreGrids() {
			const RATE = level === 1 ? 0.4 : level === 2 ? 0.2 : 0.1;
			const url =
				host +
				`/Proxy/User/getProxyUserInductionListGroupByDate?account_name=${account_name}&page=${page}&limit=20&statement_level=${level}&token=${token}`;
			// console.log(url);
			var xhr = new XMLHttpRequest(); //readyState===0
			xhr.onreadystatechange = () => {
				if (xhr.readyState == 4 && xhr.status === 200) {
					const res = JSON.parse(xhr.responseText);
					//   console.log("返回内容", xhr.responseText);
					if (res.code === 200 && res.msg) {
						contentHeight += res.msg.length * 53;
						self.node
							.getChildByName("view")
							.getChildByName("Content")
							.setContentSize(996, contentHeight);
						res.msg.forEach((element, index) => {
							let { date, statement_income } = element;
							let labels = {
								label1 : date,
								label2 : toFloat(statement_income / RATE),
								label3 : RATE * 100 + "%",
								label4 : toFloat(statement_income),
							};
							let grid = cc.instantiate(self.grid);
							//获取预制资源中的js组件，并作出相应操作
							let gridScript = grid.getComponent("proxy-gridPrefab");
							//开始操作JS组件脚本
							gridScript.setLabels(labels); //开始为JS组件进行初始化操作,setLabels 为自定义初始化方法
							//将预制资源添加到父节点
							self.node
								.getChildByName("view")
								.getChildByName("Content")
								.addChild(grid);
						});
						isStop = false;
					}
					if (!res.msg) {
						isStop = true;
						// self.node.getComponent(cc.ScrollView).unscheduleAllCallbacks();
						// self.node.getComponent(cc.ScrollView).unschedule(callback);
					}
				}
				xhr.abort();
			};
			xhr.open("GET", url, true); //readyState===1
			xhr.send(); //readyState===2
		}
	},

	onClose         : function() {
		this.node.destroy();
		// cc.find("Canvas/baseView/home/page2/basePage").active = true;
	},
	myLevel         : function(id) {
		host = gHandler.gameGlobal.proxy.proxy_host;
		account_name = commonVal.account_name;
		token = commonVal.token;
		var self = this;
		let page = 1;
		let contentHeight = 0;
		let isStop = false;
		checkMyAgent();
		this.node.getComponent(cc.ScrollView).node.on("scrolling", callback, this);
		function callback(scrollView) {
			let scrollOffsetHeight = scrollView.getScrollOffset().y;
			if (scrollOffsetHeight >= contentHeight - 53 * 9 * 2 && !isStop) {
				page++;
				checkMyAgent();
				isStop = true;
			}
		}
		function checkMyAgent() {
			let gridArray = [];
			let ids = [];
			function check() {
				return new Promise((resolve, reject) => {
					const url =
						host +
						`/Proxy/User/getChildren?id=${id}&account_name=${account_name}&&page=${page}&limit=30&token=${token}`;
					console.log(url);
					var xhr = new XMLHttpRequest(); //readyState===0
					xhr.onreadystatechange = () => {
						if (xhr.readyState == 4 && xhr.status === 200) {
							const res = JSON.parse(xhr.responseText);
							console.log("返回内容", xhr.responseText);
							if (res.code === 200 && res.msg) {
								contentHeight += res.msg.length * 53;
								self.node
									.getChildByName("view")
									.getChildByName("Content")
									.setContentSize(996, contentHeight);
								res.msg.forEach((element, index) => {
									ids.push(element.id);
									let { regin_time, id } = element;
									var d = new Date(regin_time * 1000);
									gridArray.push({
										id     : element.id,
										label1 : formatDate(d),
										label2 : id,
										label3 : 0,
										label4 : 0,
									});
								});
								resolve(ids);
								isStop = false;
							}
							if (!res.msg) {
								isStop = true;
								return;
							}
						}
						xhr.abort();
					};
					xhr.open("GET", url, true); //readyState===1
					xhr.send(); //readyState===2
				});
			}
			//得到前两列数据后请求后两列数据
			check().then(
				(ids) => {
					console.log("成功了,拿到ids以准备请求后两列数据：", ids);
					const promise1 = new Promise((resolve) => {
						const url =
							host +
							`/Proxy/User/getAggregation?account_name=${account_name}&ids=[${ids}]&token=${token}`;
						console.log("请求第3列数据接口", url);
						var xhr2 = new XMLHttpRequest(); //readyState===0
						xhr2.open("GET", url, true); //readyState===1
						xhr2.send(); //readyState===2
						xhr2.onreadystatechange = () => {
							if (xhr2.readyState == 4 && xhr2.status === 200) {
								const res = JSON.parse(xhr2.responseText);
								console.log("第3列数据:", res);
								if (res.code === 200 && res.msg) {
									gridArray.forEach((item) => {
										res.msg.forEach((ele) => {
											if (item.id === ele.id) {
												//因为res.msg只包含带有下级的客户，遍历gridArrayh和res.msg,进行比较
												item.label3 = ele.children
													? ele.children.proxy_level_1
													: 0;
											}
										});
									});
								}
							}
							xhr2.abort();
							resolve();
						};
					});
					const promise2 = new Promise((resolve) => {
						//请求第四行数据
						const url3 =
							host +
							`/Proxy/User/getProxyUserInductionListGroupByID?account_name=${account_name}&page=1&limit=30&ids=[${ids}]&token=${token}`;
						console.log("请求后第4列数据接口", url3);
						var xhr3 = new XMLHttpRequest(); //readyState===0
						xhr3.open("GET", url3, true); //readyState===1
						xhr3.send(); //readyState===2
						xhr3.onreadystatechange = () => {
							if (xhr3.readyState == 4 && xhr3.status === 200) {
								const res = JSON.parse(xhr3.responseText);
								console.log("第四数据:", res);
								if (res.code === 200 && res.msg) {
									gridArray.forEach((item) => {
										res.msg.forEach((ele) => {
											if (item.id === ele.proxy_user_id) {
												//因为res.msg只包含带有下级的客户，遍历gridArrayh和res.msg,进行比较
												item.label4 += (ele.statement_income * 0.45);
											}
										});
									});
								}
							}
							xhr3.abort();
							resolve();
						};
					});
					const promise3 = new Promise((resolve) => {
						//请求第四行数据
						const url3 =
							host +
							`/Proxy/User/getGameUserInductionListGroupByID?account_name=${account_name}&page=1&limit=30&ids=[${ids}]&token=${token}`;
						console.log("请求后第4列数据接口", url3);
						var xhr3 = new XMLHttpRequest(); //readyState===0
						xhr3.open("GET", url3, true); //readyState===1
						xhr3.send(); //readyState===2
						xhr3.onreadystatechange = () => {
							if (xhr3.readyState == 4 && xhr3.status === 200) {
								const res = JSON.parse(xhr3.responseText);
								console.log("第四数据:", res);
								if (res.code === 200 && res.msg) {
									gridArray.forEach((item) => {
										res.msg.forEach((ele) => {
											if (item.id === ele.game_user_id) {
												//因为res.msg只包含带有下级的客户，遍历gridArrayh和res.msg,进行比较
												item.label4 += ele.statement_income;
											}
										});
									});
								}
							}
							xhr3.abort();
							resolve();
						};
					});
					Promise.all([ promise1, promise2, promise3 ]).then((values) => {
						console.log("--------------gridArray---------------", gridArray);
						gridArray.forEach((item) => {
							let labels = {
								id     : item.id,
								label1 : item.label1,
								label2 : item.label2,
								label3 : item.label3,
								label4 : toFloat(item.label4) || "0.00",
							};
							//判断label3是否是0来决定可否点击获取下层表格
							let action = {
								isNextLevelClickable : true,
							};
							if (parseInt(labels.label3) === 0) {
								action.isNextLevelClickable = false;
							}
							let grid = cc.instantiate(self.grid);
							//获取预制资源中的js组件，并作出相应操作
							let gridScript = grid.getComponent("proxy-gridPrefab");
							//开始操作JS组件脚本
							gridScript.setLabels(labels, action); //开始为JS组件进行初始化操作,setLabels 为自定义初始化方法
							//将预制资源添加到父节点
							self.node
								.getChildByName("view")
								.getChildByName("Content")
								.addChild(grid);
						});
					});
				},
				function(error) {
					console.error("出错了", error);
				},
			);
		}
	},
});
