let commonVal = require("proxy-http");
let gHandler = require("gHandler");
let toFloat = require("./proxy-changeFloat");
let host, account_name, token;
cc.Class({
	extends    : cc.Component,
	properties : {
		grid : {
			type    : cc.Prefab,
			default : null,
		},
	},
	onLoad() {},
	init       : function(date) {
		host = gHandler.gameGlobal.proxy.proxy_host;
		account_name = commonVal.account_name;
		token = commonVal.token;
		var self = this;

		let page = 1;
		let contentHeight = 0;
		let isStop = false;
		addMoreGrids();
		this.node.getComponent(cc.ScrollView).node.on("scrolling", callback, this);
		function callback(scrollView) {
			//   console.log("在滑动！！！", JSON.stringify(scrollView.getScrollOffset()));
			let scrollOffsetHeight = scrollView.getScrollOffset().y;
			if (scrollOffsetHeight >= contentHeight - 48 * 15 && !isStop) {
				page++;
				console.log("请求下一页", page);
				addMoreGrids();
				isStop = true;
			}
		}
		function addMoreGrids() {
			let gridData = [];
			let url =
				host +
				`/Proxy/User/getChildren?account_name=${account_name}&id=${account_name}&page=${page}&limit=50&token=${commonVal.token}`;
			let xhr = new XMLHttpRequest(); //readyState===0
			xhr.open("GET", url, true); //readyState===1
			xhr.send(); //readyState===2
			xhr.onreadystatechange = () => {
				if (xhr.readyState == 4 && xhr.status === 200) {
					const res = JSON.parse(xhr.responseText);
					console.log("-------------请求ids-------------", res);
					if (res.code === 200 && res.msg) {
						contentHeight += res.msg.length * 48;
						self.node
							.getChildByName("view")
							.getChildByName("Content")
							.setContentSize(996, contentHeight);
						let ids = [];
						res.msg.forEach((ele) => {
							gridData.push({ cell2: ele.id, cell3: 0 });
							ids.push(ele.id);
						});
						isStop = false;

						//请求第三列佣金贡献数据
						const p1 = new Promise((resolve) => {
							let url2 =
								host +
								`/Proxy/User/getProxyUserInductionListGroupByID?account_name=${account_name}&ids=[${ids}]&page=${page}&limit=50&token=${commonVal.token}&date=${date}`;
							console.log("请求第三列佣金贡献数据", url2, ids);
							let xhr2 = new XMLHttpRequest(); //readyState===0
							xhr2.open("GET", url2, true); //readyState===1
							xhr2.send(); //readyState===2
							xhr2.onreadystatechange = () => {
								if (xhr2.readyState == 4 && xhr2.status === 200) {
									const res = JSON.parse(xhr2.responseText);
									console.log("请求第三列佣金贡献数据", res);
									if (res.code===200&&res.msg) {
										res.msg.forEach((ele) => {
											gridData.forEach((item) => {
												if (ele.proxy_user_id === item.cell2) {
													item.cell3 += ele.statement_income * 0.45;
													console.log(
														"有收益的玩家是",
														item.cell2,
														ele.statement_income,
													);
												}
											});
										});
									}
								}
								xhr2.abort();
								resolve();
							};
						});
						const p2 = new Promise((resolve) => {
							let url2 =
								host +
								`/Proxy/User/getGameUserInductionListGroupByID?account_name=${account_name}&ids=[${ids}]&page=${page}&limit=50&token=${commonVal.token}&date=${date}`;
							console.log("请求第三列佣金贡献数据", url2, ids);
							let xhr2 = new XMLHttpRequest(); //readyState===0
							xhr2.open("GET", url2, true); //readyState===1
							xhr2.send(); //readyState===2
							xhr2.onreadystatechange = () => {
								if (xhr2.readyState == 4 && xhr2.status === 200) {
									const res = JSON.parse(xhr2.responseText);
									console.log("请求第三列佣金贡献数据", res);
									if (res.code===200&&res.msg) {
										res.msg.forEach((ele) => {
											gridData.forEach((item) => {
												if (ele.game_user_id === item.cell2) {
													item.cell3 += ele.statement_income;
													console.log(
														"有收益的玩家是",
														item.cell2,
														ele.statement_income,
													);
												}
											});
										});
									}
								}
								xhr2.abort();
								resolve();
							};
						});
						Promise.all([ p1, p2 ]).then((values) => {
							console.log(
								"--------Promise.all([ p1, p2 ]).then((values)--------",
								gridData,
							);

							gridData.forEach((item) => {
								let labels = {
									cell1 : date,
									cell2 : item.cell2,
									cell3 : toFloat(item.cell3) || "0.00",
								};
								let grid = cc.instantiate(self.grid);
								//获取预制资源中的js组件，并作出相应操作
								let gridScript = grid.getComponent("proxy-incomedetails_grid");
								//开始操作JS组件脚本
								gridScript.setLabels(labels); //开始为JS组件进行初始化操作,setLabels 为自定义初始化方法
								//将预制资源添加到父节点
								self.node
									.getChildByName("view")
									.getChildByName("Content")
									.addChild(grid);
							});
						});
						// let url2 =
						// 	host +
						// 	`/Proxy/User/getProxyUserInductionListGroupByID?account_name=${account_name}&ids=[${ids}]&page=${page}&limit=50&token=${commonVal.token}&date=${date}`;
						// console.log("请求第三列佣金贡献数据", url2, ids);
						// let xhr2 = new XMLHttpRequest(); //readyState===0
						// xhr2.open("GET", url2, true); //readyState===1
						// xhr2.send(); //readyState===2
						// xhr2.onreadystatechange = () => {
						// 	if (xhr2.readyState == 4 && xhr2.status === 200) {
						// 		const res = JSON.parse(xhr2.responseText);
						// 		console.log("请求第三列佣金贡献数据", res);
						// 		if (res.msg) {
						// 			res.msg.forEach((ele) => {
						// 				gridData.forEach((item) => {
						// 					if (ele.proxy_user_id === item.cell2) {
						// 						item.cell3 =
						// 							toFloat(ele.statement_income) || "0.00";
						// 						console.log(
						// 							"有收益的玩家是",
						// 							item.cell2,
						// 							ele.statement_income,
						// 						);
						// 					}
						// 				});
						// 			});
						// 		}
						// 	}
						// 	xhr2.abort();
						// 	gridData.forEach((item) => {
						// 		let labels = {
						// 			cell1 : date,
						// 			cell2 : item.cell2,
						// 			cell3 : item.cell3 || "0.00",
						// 		};
						// 		let grid = cc.instantiate(self.grid);
						// 		//获取预制资源中的js组件，并作出相应操作
						// 		let gridScript = grid.getComponent("proxy-incomedetails_grid");
						// 		//开始操作JS组件脚本
						// 		gridScript.setLabels(labels); //开始为JS组件进行初始化操作,setLabels 为自定义初始化方法
						// 		//将预制资源添加到父节点
						// 		self.node
						// 			.getChildByName("view")
						// 			.getChildByName("Content")
						// 			.addChild(grid);
						// 	});
						// };
					}
					if (!res.msg) {
						isStop = true;
					}
				}
				xhr.abort();
			};
		}
	},
	onClose    : function() {
		this.node.destroy();
	},
});
