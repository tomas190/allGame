let gHandler = require("gHandler");
let toFloat = require("./proxy-changeFloat");
let commonVal = require("proxy-http");
cc.Class({
	extends                : cc.Component,
	properties             : {},
	onLoad() {
		//获取显示我的ID
		let package_id = gHandler.gameGlobal.proxy.package_id;
		let account_name = gHandler.gameGlobal.player.account_name;
		let myID = account_name.toString();
		var canvasScript = cc.find("Canvas").getComponent("proxy-canvas");
		this.node
			.getChildByName("bottom")
			.getChildByName("myID")
			.getChildByName("ID")
			.getComponent("cc.Label").string = myID;
		//给我的ID复制按钮绑定事件
		var clickEventHandler = new cc.Component.EventHandler();
		clickEventHandler.target = cc.find("Canvas"); // 这个 node 节点是你的事件处理代码组件所属的节点
		clickEventHandler.component = "proxy-canvas"; // 这个是代码文件名
		clickEventHandler.handler = "onCopyClick";
		clickEventHandler.customEventData = myID;
		var button = this.node
			.getChildByName("bottom")
			.getChildByName("myID")
			.getChildByName("copy")
			.getComponent(cc.Button);
		button.clickEvents.push(clickEventHandler);

		//获取显示专属链接
		let temp_host = gHandler.gameGlobal.proxy.temp_host;
		let myURL =
			temp_host +
			"?p=" +
			package_id +
			"&u=" +
			account_name +
			"&m=" +
			gHandler.gameGlobal.huanjin;
		//根据环境处理myURL
		if (gHandler.appGlobal) {
			let huanjin = gHandler.appGlobal.huanjin;
			if (huanjin == "online") {
				myURL = temp_host + "?p=" + package_id + "&u=" + account_name;
			}
		}
		this.myURL = myURL;
		this.node
			.getChildByName("bottom")
			.getChildByName("myURL")
			.getChildByName("URL")
			.getComponent("cc.Label").string = myURL;
		this.node
			.getChildByName("bottom")
			.getChildByName("myURL")
			.getChildByName("URL")
			.getComponent("cc.Label")
			._updateRenderData(true);
		//给专属链接复制按钮绑定事件
		var URLEventHandler = new cc.Component.EventHandler();
		URLEventHandler.target = cc.find("Canvas"); // 这个 node 节点是你的事件处理代码组件所属的节点
		URLEventHandler.component = "proxy-canvas"; // 这个是代码文件名
		URLEventHandler.handler = "onCopyClick";
		URLEventHandler.customEventData = myURL;
		var button2 = this.node
			.getChildByName("bottom")
			.getChildByName("myURL")
			.getChildByName("URL")
			.getChildByName("copy")
			.getComponent(cc.Button);
		button2.clickEvents.push(URLEventHandler);
		//根据专属链接生成二维码
		this.init(myURL);

		//渲染中间的表格
		let host = gHandler.gameGlobal.proxy.proxy_host;
		let dataTable = this.node.getChildByName("middle").getChildByName("dataTable");
		let url = host + "/Proxy/User/login";
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status === 200) {
				var resData = JSON.parse(xhr.responseText);
				console.log("/Proxy/User/login返回:", resData);
				if (resData.code === 200) {
					commonVal.token = resData.msg.token;
					//渲染表格数据
					dataTable.getChildByName("label1").getComponent("cc.Label").string =
						resData.msg.proxy_user.proxy_pid;
					dataTable.getChildByName("label2").getComponent("cc.Label").string =
						resData.msg.proxy_user.direct_number;

					//请求第三列数据
					url =
						host +
						`/Proxy/User/getAggregation?account_name=${account_name}&ids=[${account_name}]&token=${resData
							.msg.token}`;
					var xhr2 = new XMLHttpRequest(); //readyState===0
					xhr2.onreadystatechange = () => {
						if (xhr2.readyState == 4 && xhr2.status === 200) {
							const res = JSON.parse(xhr2.responseText);
							console.log("getAggregation返回数据", res);
							if (res.code === 200 && res.msg) {
								const { children } = res.msg[0];
								let player_sum = 0;
								for (const key in children) {
									player_sum += children[key];
								}
								dataTable
									.getChildByName("label3")
									.getComponent("cc.Label").string = player_sum;
							}
						}
						xhr2.abort();
					};
					xhr2.open("GET", url, true); //readyState===1
					xhr2.send(); //readyState===2
					//服务器响应，正在接收响应ing readyState===3
					//完成响应readyState===4

					// 请求第四列数据
					let url =
						host +
						`/Proxy/User/getProxyUserInductionListGroupByDate?account_name=${account_name}&page=1&limit=2&token=${resData
							.msg.token}`;
					let xhr3 = new XMLHttpRequest(); //readyState===0
					xhr3.open("GET", url, true); //readyState===1
					xhr3.send(); //readyState===2
					xhr3.onreadystatechange = () => {
						if (xhr3.readyState == 4 && xhr3.status === 200) {
							const res = JSON.parse(xhr3.responseText);
							console.log("getProxyUserInductionListGroupByDate返回数据", res);
							if (res.code === 200 && res.msg) {
								let today = new Date();
								today.setDate(today.getDate() - 1);
								let month = today.getMonth() + 1;
								let day = today.getDate();
								let arr = res.msg.map((item) => {
									return {
										date             : item.date.split("-").map(Number),
										statement_income : item.statement_income,
									};
								});
								console.log(arr, "昨日日期", month, day);
								arr.forEach((ele) => {
									if (ele.date[1] === month && ele.date[2] === day) {
										dataTable
											.getChildByName("label4")
											.getComponent("cc.Label").string = toFloat(
											ele.statement_income,
										);
									}
								});
							}
						}
						xhr3.abort();
					};
					// const p1 = new Promise((resolve) => {
					// 	let income = 0;
					// 	let url =
					// 		host +
					// 		`/Proxy/User/getProxyUserInductionListGroupByDate?account_name=${account_name}&page=1&limit=2&token=${resData
					// 			.msg.token}`;
					// 	let xhr3 = new XMLHttpRequest(); //readyState===0
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
					// 						income = ele.statement_income * 0.45;
					// 					}
					// 				});
					// 			}
					// 		}
					// 		xhr3.abort();
					// 		resolve(income);
					// 	};
					// });
					// const p2 = new Promise((resolve) => {
					// 	let income = 0;
					// 	let url =
					// 		host +
					// 		`/Proxy/User/getGameUserInductionListGroupByDate?account_name=${account_name}&page=1&limit=2&token=${resData
					// 			.msg.token}`;
					// 	let xhr3 = new XMLHttpRequest(); //readyState===0
					// 	xhr3.open("GET", url, true); //readyState===1
					// 	xhr3.send(); //readyState===2
					// 	xhr3.onreadystatechange = () => {
					// 		if (xhr3.readyState == 4 && xhr3.status === 200) {
					// 			const res = JSON.parse(xhr3.responseText);
					// 			console.log("getGameUserInductionListGroupByDate返回数据", res);
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
					// 						income = ele.statement_income;
					// 					}
					// 				});
					// 			}
					// 		}
					// 		xhr3.abort();
					// 		resolve(income);
					// 	};
					// });
					// Promise.all([ p1, p2 ]).then((values) => {
					// 	console.log(values);
					// 	dataTable
					// 		.getChildByName("label4")
					// 		.getComponent("cc.Label").string = toFloat(values[0] + values[1]);
					// });

					//请求所有下级并保存到内存中
					// function getids(i) {
					// 	let url2 =
					// 		host +
					// 		`/Proxy/User/getChildren?account_name=${account_name}&id=${account_name}&page=${i}&limit=50&token=${commonVal.token}`;
					// 	var xhr4 = new XMLHttpRequest(); //readyState===0
					// 	xhr4.open("GET", url2, true); //readyState===1
					// 	xhr4.send(); //readyState===2
					// 	xhr4.onreadystatechange = () => {
					// 		if (xhr4.readyState == 4 && xhr4.status === 200) {
					// 			const res = JSON.parse(xhr4.responseText);
					// 			console.log("请求所有下级并保存到内存中接口返回", res);
					// 			if (res.code === 200 && res.msg) {
					// 				res.msg.forEach((ele) => {
					// 					commonVal.ids.push(ele.id);
					// 				});
					// 				return getids(i + 1);
					// 			}
					// 		}
					// 		xhr4.abort();
					// 		return;
					// 	};
					// }
					// getids(1);
				} else {
					canvasScript.onMessagePrefabNeeded(null, "获取数据失败");
				}
			}
			xhr.abort();
		};
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		// var sendData = `account_name=${gHandler.gameGlobal.player.account_name}&password=123456`;
		var sendData = `account_name=${gHandler.gameGlobal.player.account_name}&token=${gHandler.gameGlobal.token}`
		xhr.send(sendData);

		//添加直属下级玩家数点击事件
		var label2node = dataTable.getChildByName("label2");
		var clickEventHandler = new cc.Component.EventHandler();
		clickEventHandler.target = cc.find("Canvas/baseView/home/page2"); // 这个 node 节点是你的事件处理代码组件所属的节点
		clickEventHandler.component = "proxy-page2"; // 这个是代码文件名
		clickEventHandler.handler = "checkCustomers";
		clickEventHandler.customEventData = account_name;
		var button3 = label2node.getComponent(cc.Button);
		button3.clickEvents.push(clickEventHandler);
	},
	//调出IM窗口
	popupIM() {
		var canvasScript = cc.find("Canvas").getComponent("proxy-canvas");
		canvasScript.onMessagePrefabNeeded(null, "跳转中...");
		let im_host = gHandler.gameGlobal.im_host;
		let url = `${im_host}/im/api/universalAgent`;
		let reqData = {
			user_id   : gHandler.gameGlobal.player.id.toString(),
			token     : "c7a9d6g21v87s",
			user_ip   : gHandler.gameGlobal.ipList[0],
			user_ping : "-",
		};
		reqData.user_link =
			gHandler.gameGlobal.proxy.temp_host +
			"?p=" +
			gHandler.gameGlobal.proxy.package_id +
			"&u=" +
			gHandler.gameGlobal.player.account_name +
			"&m=" +
			gHandler.gameGlobal.huanjin;
		if (gHandler.appGlobal) {
			let huanjin = gHandler.appGlobal.huanjin;
			if (huanjin == "online") {
				reqData.user_link =
					gHandler.gameGlobal.proxy.temp_host +
					"?p=" +
					gHandler.gameGlobal.proxy.package_id +
					"&u=" +
					gHandler.gameGlobal.player.account_name;
			}
		}
		var xhr = new XMLHttpRequest(); //readyState===0
		xhr.onreadystatechange = () => {
			if (xhr.readyState == 4 && xhr.status === 200) {
				console.log("IM调出接口返回数据：", JSON.parse(xhr.responseText));
				const res = JSON.parse(xhr.responseText);
				if (
					res.code === 0
					// && gHandler.gameGlobal.im_host != ""
				) {
					gHandler.gameGlobal.imReceive = 0;
					gHandler.Reflect && gHandler.Reflect.setOrientation("portrait", 750, 1334);
					cc.director.loadScene(gHandler.gameConfig.subModel.im.lanchscene);
				} else {
					canvasScript.onMessagePrefabNeeded(null, res.msg || "操作失败");
				}
			} else if (xhr.status !== 200) {
				console.log(xhr.statusText);
			}
			xhr.abort();
		};
		let ret = "";
		for (let it in reqData) {
			ret += encodeURIComponent(it) + "=" + encodeURIComponent(reqData[it]) + "&";
		}
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		console.log("客服接口的请求数据:", reqData);
		xhr.send(ret);
	},
	//保存二维码按钮事件
	saveQRcode() {
		//保存功能
		console.log("saveQRcodeAction");

		//保存功能
		if (cc.sys.os == cc.sys.OS_IOS) {
			console.log("ios tragger");
			let targetNode;
			for (let i = 1; i < 4; i++) {
				if (cc.find(`Canvas/baseView/templatePage/img${i}/yjfx_gouxuan`).active) {
					targetNode = cc.find(`Canvas/baseView/templatePage/img${i}`);
				}
			}
			targetNode.getChildByName("yjfx_gouxuan").active = false;
			this.screenShot(targetNode);
			this.timer = setTimeout(() => {
				targetNode.getChildByName("yjfx_gouxuan").active = true;
			}, 1000);
		} else {
			let isPermitted = gHandler.Reflect && gHandler.Reflect.getPermission();
			if (isPermitted) {
				let targetNode;
				for (let i = 1; i < 4; i++) {
					if (cc.find(`Canvas/baseView/templatePage/img${i}/yjfx_gouxuan`).active) {
						targetNode = cc.find(`Canvas/baseView/templatePage/img${i}`);
					}
				}
				targetNode.getChildByName("yjfx_gouxuan").active = false;
				this.screenShot(targetNode);
				this.timer = setTimeout(() => {
					targetNode.getChildByName("yjfx_gouxuan").active = true;
				}, 1000);
			}
		}
	},
	onPopupClose           : function(e) {
		this.node.getChildByName("popup").active = !this.node.getChildByName("popup").active;
		this.node.getChildByName("guide").active = !this.node.getChildByName("guide").active;
	},
	onMobanPopupClose      : function(e) {
		if (cc.find("Canvas/baseView/templatePage").active === false) {
			//根据package_id使用不同的图片模板
			switch (gHandler.gameGlobal.proxy.package_id) {
				case 1:
					for (let i = 4; i < 7; i++) {
						cc.loader.loadRes(`/proxy/proxy-${i}`, cc.SpriteFrame, function(
							err,
							spriteFrame,
						) {
							cc.find(`Canvas/baseView/templatePage/img${i}/yjfx_gouxuan`);
							cc
								.find(`Canvas/baseView/templatePage/img${i - 3}`)
								.getComponent(cc.Sprite).spriteFrame = spriteFrame;
						});
					}
					cc.loader.loadRes(`/proxy/yjfx_logo_test`, cc.SpriteFrame, function(
						err,
						spriteFrame,
					) {
						for (let i = 1; i < 4; i++) {
							cc
								.find(`Canvas/baseView/templatePage/img${i}/yjfx_logo_db`)
								.getComponent(cc.Sprite).spriteFrame = spriteFrame;
						}
					});
					break;
				case 2:
					cc.loader.loadRes(`/proxy/yjfx_logo_db`, cc.SpriteFrame, function(
						err,
						spriteFrame,
					) {
						for (let i = 1; i < 4; i++) {
							cc
								.find(`Canvas/baseView/templatePage/img${i}/yjfx_logo_db`)
								.getComponent(cc.Sprite).spriteFrame = spriteFrame;
						}
					});
					break;
				default:
					break;
			}
			//绘制模板图片中的二维码
			var qrcodes = [];
			for (let i = 1; i < 4; i++) {
				qrcodes[i] = cc.find(`Canvas/baseView/templatePage/img${i}/qrcode`);
				this.QRCreate(qrcodes[i].addComponent(cc.Graphics), this.myURL);
			}
		}

		cc.find("Canvas/baseView/templatePage").active = !cc.find("Canvas/baseView/templatePage")
			.active;
	},
	onTemplateImgBeClicked(e, num) {
		for (let i = 1; i < 4; i++) {
			cc.find(`Canvas/baseView/templatePage/img${i}/yjfx_gouxuan`).active = false;
		}
		cc.find(`Canvas/baseView/templatePage/img${num}/yjfx_gouxuan`).active = true;
	},
	init(url) {
		console.log("initurl begin!!!", url);
		var qrcode0 = this.node
			.getChildByName("bottom")
			.getChildByName("qrImage")
			.getChildByName("qrcode");
		//注意 最好把qrImage与qrcode的节点长宽设置为2的倍数。不然可能会出现无法识别二维码
		var ctx = qrcode0.addComponent(cc.Graphics);
		if (typeof url !== "string") {
			console.log("url is not string", url);
			return;
		}
		this.QRCreate(ctx, url);
	},
	QRCreate(ctx, url) {
		var self = this.node
			.getChildByName("bottom")
			.getChildByName("qrImage")
			.getChildByName("qrcode");
		console.log("QRcreate start!!", ctx, url);
		var qrcode = new QRCode(-1, QRErrorCorrectLevel.H);
		qrcode.addData(url);
		qrcode.make();

		ctx.fillColor = cc.Color.BLACK;
		//块宽高
		var tileW = self.width / qrcode.getModuleCount();
		var tileH = self.height / qrcode.getModuleCount();

		// draw in the Graphics
		for (var row = 0; row < qrcode.getModuleCount(); row++) {
			for (var col = 0; col < qrcode.getModuleCount(); col++) {
				if (qrcode.isDark(row, col)) {
					// ctx.fillColor = cc.Color.BLACK;
					var w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW);
					var h = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW);
					ctx.rect(Math.round(col * tileW), Math.round(row * tileH), w, h);
					ctx.fill();
				}
			}
		}
	},
	screenShot(target, fileName) {
		console.log("screenShot start!", target, fileName);
		var canvasScript = cc.find("Canvas").getComponent("proxy-canvas");
		let gl = cc.game._renderContext; // gl.STENCIL_INDEX8 质量较高  gl.DEPTH_STENCIL 质量较低
		let render = new cc.RenderTexture();
		render.initWithSize(
			Math.floor(cc.visibleRect.width),
			Math.floor(cc.visibleRect.height),
			gl.DEPTH_STENCIL,
		);
		cc.Camera.main.targetTexture = render;
		let scaleAction = cc.scaleTo(0.5, 0.3);
		let targetPos = cc.v2(
			cc.visibleRect.width - cc.visibleRect.width / 6,
			cc.visibleRect.height / 4,
		);
		let moveAction = cc.moveTo(0.5, targetPos);
		let spawn = cc.spawn(scaleAction, moveAction);
		let node = new cc.Node();
		node.setPosition(
			cc.v2(cc.visibleRect.width / 2, cc.visibleRect.height / 2),
			// cc.v2(660,130)
		);
		node.zIndex = cc.macro.MAX_ZINDEX;
		node.on(cc.Node.EventType.TOUCH_START, () => {
			node.parent = null;
			node.destroy();
		});
		var date = new Date().getTime();
		var fileName = fileName || `cocosScreenShot${date}.png`;
		if (CC_JSB) {
			//路径的问题
			// var fullPath = jsb.fileUtils.getWritablePath() + fileName;
			// if (Environment && Environment.getExternalStorageDirectory()) {
			//   fullPath = Environment.getExternalStorageDirectory() + "/" + fileName;
			// } else {
			var fullPath = "/storage/emulated/0/" + fileName;
			if (cc.sys.os == cc.sys.OS_IOS) {
				fullPath = jsb.fileUtils.getWritablePath() + fileName;
			}
			// }
			// if (jsb.fileUtils.isFileExist(fullPath)) {
			//   jsb.fileUtils.removeFile(fullPath)
			// }
			target.getChildByName("qrcode").getComponent(cc.Graphics).scheduleOnce(
				() => {
					cc.Camera.main.targetTexture = null;
					console.log("这里是target.node！！", target);
					// let qrcode = target.node.getParent()
					let qrcodepos = cc.v3();
					target.getWorldPosition(qrcodepos);
					let data = render.readPixels(
						null,
						qrcodepos.x - 400 / 2,
						qrcodepos.y - 400 / 2,
						400,
						400,
					);
					// let data = render.readPixels(null, 660, 108, 200, 200);
					// let width = render.width;
					// let height = render.height;
					let width = 400;
					let height = 400;
					let picData = new Uint8Array(width * height * 4);
					let rowBytes = width * 4;
					for (let row = 0; row < height; row++) {
						let srow = height - 1 - row;
						let start = srow * width * 4;
						let reStart = row * width * 4;
						for (let i = 0; i < rowBytes; i++) {
							picData[reStart + i] = data[start + i];
						}
					}
					console.log(picData);
					let success = jsb.saveImageData(picData, width, height, fullPath);
					console.log(success);
					if (success) {
						cc.log("save image data success, file: " + fullPath);
						gHandler.Reflect && gHandler.Reflect.saveTextureToLocal(fullPath);
						canvasScript.onMessagePrefabNeeded(null, "保存二维码到相册成功!");
					} else {
						cc.error("save image data failed!" + fullPath);
						canvasScript.onMessagePrefabNeeded(null, "保存二维码到相册失败!");
					}
					return;
					// let texture = new cc.Texture2D();
					// texture.initWithData(picData, 32, width, height);
					// let spriteFrame = new cc.SpriteFrame();
					// spriteFrame.setTexture(texture);
					// let sprite = node.addComponent(cc.Sprite);
					// sprite.spriteFrame = spriteFrame;
					// node.parent = cc.director.getScene();
					// node.runAction(spawn);
				},
				0,
				0,
			);
		} else {
			return;
		}
	},
	onDestroy() {
		clearTimeout(this.timer);
	},
	onDisable() {
		cc.find("Canvas/baseView/home/page1/others").removeAllChildren();
	},
	// update (dt) {},
});
