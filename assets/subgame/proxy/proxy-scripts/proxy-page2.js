// import { host, account_name, token } from "./proxy-http";
let commonVal = require("proxy-http");
let gHandler = require("gHandler");
let toFloat = require("./proxy-changeFloat");
let host, account_name, token, balance;
cc.Class({
	extends              : cc.Component,
	properties           : {
		detail       : {
			type    : cc.Prefab,
			default : null,
		},
		myCustomers  : {
			type    : cc.Prefab,
			default : null,
		},
		grid         : {
			type    : cc.Prefab,
			default : null,
		},
		incomedetail : {
			type    : cc.Prefab,
			default : null,
		},
		count        : 0,
	},
	check_income_details : function(e, date) {
		console.log(date);
		let detail = cc.instantiate(this.incomedetail);
		//获取预制资源中的js组件，并作出相应操作
		let detailScript = detail.getComponent("proxy-incomedetails");
		//开始操作JS组件脚本
		detailScript.init(date); //开始为JS组件进行初始化操作,init 为自定义初始化方法
		//将预制资源添加到父节点
		this.node.getChildByName("detailTable").addChild(detail);
	},
	checkDetails         : function(e, num) {
		this.node.getChildByName("basePage").active = false;
		let detail = cc.instantiate(this.detail);
		//获取预制资源中的js组件，并作出相应操作
		let detailScript = detail.getComponent("proxy-detailScript");
		//开始操作JS组件脚本
		detailScript.init(num); //开始为JS组件进行初始化操作,init 为自定义初始化方法
		//将预制资源添加到父节点
		this.node.getChildByName("detailTable").addChild(detail);
		// cc.log(this.node);
	},
	checkCustomers       : function(e, id) {
		console.log(id);
		// if (this.count < 3) {
		this.count++;
		let myCustomers = cc.instantiate(this.myCustomers);
		//获取预制资源中的js组件，并作出相应操作
		let detailScript = myCustomers.getComponent("proxy-detailScript");
		//开始操作JS组件脚本
		detailScript.initMycustomers(id, this.count); //开始为JS组件进行初始化操作,setLabels 为自定义初始化方法
		//将预制资源添加到父节点
		cc.find("Canvas/baseView/home/page1/others").addChild(myCustomers);
		//   console.log("checkCustomers,count", this.count);
		// }
	},
	closeCheckCustomers  : function() {
		this.count--;
		let others = cc.find("Canvas/baseView/home/page1/others");
		console.log("closeCheckCustomers,count", this.count);
		//因为次级客户表格和三级客户表格在关闭时不需要显示basePage,所以单独判断
		if (others.getChildByName("myCustomers")) {
			others.getChildByName("myCustomers").destroy();
		}
		if (this.count === 0) {
			cc.find("Canvas/baseView/home/page1").active = true;
		}
	},
	onLoad() {},
	onEnable() {
		var canvasScript = cc.find("Canvas").getComponent("proxy-canvas");
		var self = this;
		let topdata = this.node
			.getChildByName("basePage")
			.getChildByName("top")
			.getChildByName("topdata");
		host = gHandler.gameGlobal.proxy.proxy_host;
		account_name = commonVal.account_name;
		token = commonVal.token;
		let url = host + "/Proxy/User/login";
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status === 200) {
				var resData = JSON.parse(xhr.responseText);
				console.log("/Proxy/User/login返回:", resData);
				if (resData.code === 200) {
					//获取balance和全民代理的token
					commonVal.balance = resData.msg.proxy_user.balance;
					commonVal.token = resData.msg.token;
					//更新佣金余额
					//如果是科学计数法的极小数
					if (commonVal.balance < 0.001) {
						commonVal.balance = 0.0;
					}
					topdata.getChildByName("cell4").getComponent("cc.Label").string = (Math.floor(
						commonVal.balance * 100,
					) / 100).toFixed(2);

					//更新完token和balance后再初始化其他数据
					url =
						host +
						`/Proxy/User/getAggregation?account_name=${account_name}&ids=[${account_name}]&token=${commonVal.token}`;
					var xhr2 = new XMLHttpRequest(); //readyState===0
					xhr2.onreadystatechange = () => {
						if (xhr2.readyState == 4 && xhr2.status === 200) {
							const res = JSON.parse(xhr2.responseText);
							console.log("getAggregation返回", res);
							if (res.code === 200 && res.msg) {
								const { history_income, children, tax_total } = res.msg[0];
								let sum_income = 0;
								for (const key in history_income) {
									sum_income += history_income[key];
								}
								//作判断以调整佣金余额和累计收益小数点第二位可能不一样的问题
								// sum_income = toFloat(sum_income);
								// let after_deal_balance = (Math.floor(commonVal.balance * 100) / 100).toFixed(2)
								// if (parseFloat(sum_income) < after_deal_balance) {
								//   sum_income = after_deal_balance;
								//   console.log(
								//     "sum_income < (Math.floor(commonVal.balance * 100) / 100).toFixed(2)",
								//     sum_income,
								//     after_deal_balance
								//   );
								// }
								topdata
									.getChildByName("cell3")
									.getComponent("cc.Label").string = sum_income
									? toFloat(sum_income)
									: "0.00";
							}
						}
						xhr2.abort();
					};
					xhr2.open("GET", url, true); //readyState===1
					xhr2.send(); //readyState===2
					//服务器响应，正在接收响应ing readyState===3
					//完成响应readyState===4

					// 更新每日流水;
					url =
						host +
						`/Proxy/User/getProxyUserInductionListGroupByDate?account_name=${account_name}&page=1&limit=30&token=${commonVal.token}`;
					var xhr3 = new XMLHttpRequest(); //readyState===0
					xhr3.onreadystatechange = () => {
						if (xhr3.readyState == 4 && xhr3.status === 200) {
							const res = JSON.parse(xhr3.responseText);
							console.log("getProxyUserInductionListGroupByDate返回数据", res);
							if (res.code === 200 && res.msg) {
								//先渲染top表格的今日佣金和今日流水
								let today = new Date();
								let month = today.getMonth() + 1;
								let day = today.getDate();
								let mydate = res.msg[0].date.split("-").map(Number);
								console.log("返回数据第一组的日期：", mydate);
								if (mydate[1] === month && mydate[2] === day) {
									topdata
										.getChildByName("cell2")
										.getComponent("cc.Label").string = toFloat(
										res.msg[0].statement_income,
									);
									topdata
										.getChildByName("cell1")
										.getComponent("cc.Label").string = toFloat(
										res.msg[0].statement_income / 0.05 / 0.5 / 0.45,
									);
								}

								//确定bottom table的高度
								let contentHeight = res.msg.length * 52 + 52;
								self.node
									.getChildByName("basePage")
									.getChildByName("bottom")
									.getChildByName("view")
									.getChildByName("content")
									.setContentSize(1000, contentHeight);
								//渲染bottom table的数据
								res.msg.forEach((element) => {
									let { date, statement_income, win_total } = element;
									let labels = {
										label1 : date,
										label2 : toFloat(statement_income / 0.05 / 0.5 / 0.45),
										label4 : toFloat(statement_income),
									};
									let grid = cc.instantiate(self.grid);
									//获取预制资源中的js组件，并作出相应操作
									let gridScript = grid.getComponent("proxy-newgrid");
									//开始操作JS组件脚本
									gridScript.setLabels(labels); //开始为JS组件进行初始化操作,setLabels 为自定义初始化方法
									//将预制资源添加到父节点
									self.node
										.getChildByName("basePage")
										.getChildByName("bottom")
										.getChildByName("view")
										.getChildByName("content")
										.getChildByName("data")
										.addChild(grid);
								});
							}
							xhr3.abort();
						}
					};
					xhr3.open("GET", url, true); //readyState===1
					xhr3.send(); //readyState===2
					// 服务器响应，正在接收响应ing readyState===3
					// 完成响应readyState===4
					// const p1 = new Promise((resolve) => {
					// 	let income = 0,
					// 		data = [];
					// 	url =
					// 		host +
					// 		`/Proxy/User/getProxyUserInductionListGroupByDate?account_name=${account_name}&page=1&limit=30&token=${resData
					// 			.msg.token}`;
					// 	var xhr3 = new XMLHttpRequest(); //readyState===0
					// 	xhr3.open("GET", url, true); //readyState===1
					// 	xhr3.send(); //readyState===2
					// 	xhr3.onreadystatechange = () => {
					// 		if (xhr3.readyState == 4 && xhr3.status === 200) {
					// 			const res = JSON.parse(xhr3.responseText);
					// 			console.log("getProxyUserInductionListGroupByDate返回数据", res);
					// 			if (res.code === 200 && res.msg) {
					// 				//先渲染top表格的今日佣金和今日流水

					// 				let today = new Date();
					// 				let month = today.getMonth() + 1;
					// 				let day = today.getDate();
					// 				let mydate = res.msg[0].date.split("-").map(Number);
					// 				console.log("返回数据第一组的日期：", mydate);
					// 				if (mydate[1] === month && mydate[2] === day) {
					// 					income = res.msg[0].statement_income;
					// 				}
					// 				data = res.msg;
					// 			}
					// 		}
					// 		xhr3.abort();
					// 		resolve(income, data);
					// 	};
					// });
					// const p2 = new Promise((resolve) => {
					// 	let res = 0;
					// 	url =
					// 		host +
					// 		`/Proxy/User/getProxyUserInductionListGroupByDate?account_name=${account_name}&page=1&limit=30&token=${resData
					// 			.msg.token}`;
					// 	var xhr3 = new XMLHttpRequest(); //readyState===0
					// 	xhr3.open("GET", url, true); //readyState===1
					// 	xhr3.send(); //readyState===2
					// 	xhr3.onreadystatechange = () => {
					// 		if (xhr3.readyState == 4 && xhr3.status === 200) {
					// 			const res = JSON.parse(xhr3.responseText);
					// 			console.log("getProxyUserInductionListGroupByDate返回数据", res);
					// 			if (res.code === 200 && res.msg) {
					// 				let today = new Date();
					// 				today.setDate(today.getDate() - 1);
					// 				let month = today.getMonth() + 1;
					// 				let day = today.getDate();
					// 				let arr = res.msg.map((item) => {
					// 					return {
					// 						date             : item.date.split("-").map(Number),
					// 						statement_income : item.statement_income,
					// 					};
					// 				});
					// 				console.log(arr, "昨日日期", month, day);
					// 				arr.forEach((ele) => {
					// 					if (ele.date[1] === month && ele.date[2] === day) {
					// 						res = ele.statement_income;
					// 					}
					// 				});
					// 			}
					// 		}
					// 		xhr3.abort();
					// 		resolve(res);
					// 	};
					// });
					// Promise.all([ p1, p2 ]).then((values) => {
					// 	console.log(values);
					// 	dataTable
					// 		.getChildByName("label4")
					// 		.getComponent("cc.Label").string = toFloat(values[0] + values[1]);
					// });

					//隐藏加载数据提示
					self.node.getChildByName("loading").active = false;
				} else {
					canvasScript.onMessagePrefabNeeded(null, "获取数据失败");
				}
			}

			xhr.abort();
		};
		console.log("初始化数据登录接口url", url);
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		// var sendData = `account_name=${gHandler.gameGlobal.player.account_name}&password=123456`;
		var sendData = `account_name=${gHandler.gameGlobal.player.account_name}&token=${gHandler.gameGlobal.token}`

		// var sendData = JSON.stringify({
		//   account_name: commonVal.account_name,
		//   password: "123456" //dev测试用password
		//   // token: gHandler.gameGlobal.token
		// });
		console.log("post data:", sendData);
		xhr.send(sendData);
	},
	onDisable() {
		this.node.getChildByName("loading").active = true;
		this.node
			.getChildByName("basePage")
			.getChildByName("bottom")
			.getChildByName("view")
			.getChildByName("content")
			.getChildByName("data")
			.removeAllChildren();
	},
	moveBalanceToGame    : function() {
		host = gHandler.gameGlobal.proxy.proxy_host;
		var self = this;
		balance = Math.floor(commonVal.balance * 100) / 100;
		token = commonVal.token;
		// gHandler.gameGlobal.proxy.balance
		var canvasScript = cc.find("Canvas").getComponent("proxy-canvas");
		let currentBalance = parseFloat(
			self.node
				.getChildByName("basePage")
				.getChildByName("top")
				.getChildByName("topdata")
				.getChildByName("cell4")
				.getComponent("cc.Label").string,
		);
		console.log("moveBalanceToGame", balance, currentBalance);
		if (balance == 0 || currentBalance == 0) {
			//如果为0，返回消息，没有更多佣金啦
			//操作canvas JS组件脚本
			canvasScript.onMessagePrefabNeeded(null, "暂无可领取佣金，快去推广赚佣金吧！");
		} else {
			//如果有佣金余额，则发送领取佣金请求
			let url = host + "/Proxy/User/moveBalanceToGame";
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
					var response = xhr.responseText;
					var resData = JSON.parse(response);
					console.log("http data返回:", resData);
					if (resData.code === 200) {
						canvasScript.onMessagePrefabNeeded(null, "领取成功");
						//获取佣金余额
						self.node
							.getChildByName("basePage")
							.getChildByName("top")
							.getChildByName("topdata")
							.getChildByName("cell4")
							.getComponent("cc.Label").string =
							"0.00";
					} else {
						canvasScript.onMessagePrefabNeeded(null, "领取失败");
					}
				}
				xhr.abort();
			};
			xhr.open("POST", url, true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			// var sendData = JSON.stringify({
			//   account_name,
			//   token,
			//   money: balance
			// });
			let sendData = `account_name=${account_name}&token=${token}&money=${balance}`;
			console.log("领取余额发送的数据:", sendData);
			xhr.send(sendData);
		}
	},
	// setPlayerInfo(data) {
	//   if (data.balance || data.balance == 0) {
	//     // 修改佣金
	//     this.node
	//       .getChildByName("basePage")
	//       .getChildByName("bottom")
	//       .getChildByName("gold")
	//       .getComponent("cc.Label").string = data.balance.toFixed(2);
	//   }
	// },
	// onDestroy() {
	//   gHandler.eventMgr.unregister(
	//     gHandler.eventMgr.refreshPlayerinfo,
	//     "proxy-page2"
	//   );
	// }
	// update (dt) {},
});
