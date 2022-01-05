// import GameState from "./StateGame"
// import {app} from "../conf/config"
import * as Conf from "./CYLHDStateConfig";
import * as StateCom from "./CYLHDStateCommon";
import StateGame from "./CYLHDState";
// import * as StCom from "./LHDStateCommon";
// import ACUtils from "./AC/ACLHDUtils";


module LHD {
export class StateTools {

	public EMPTY_ROOM_NUM: string = "";
	// 空房间""
	public isEmptyRoomNum(rNum:string) {
		return rNum==this.EMPTY_ROOM_NUM;
	}

	// 可用金额值显示，小数点后的数全为0的话需要去掉
	public balanceShow(val:number) :string {
		var str = this.valShow(val);
		var indInt = str.indexOf('.00')
		if(indInt>-1) {
			str = str.substring(0, indInt)
		}
		if (Number(str) < 0) {
			str = '0';//.00
		}
		return str;
	}
	// 先前版本函数问题：0.95*19-16 = 2.0500000000000007 传入处理后返回 2.04
	// 飘字值显示，小数点后的数全为0的话需要保留
	public valShow(val:number): string {
		var v = this.formatGold(val);
		return v
	}
	private formatGold(num) {
        num = num.toFixed(6)
        let str = num.toString()
        if (str.includes(".")) {
            return str.substring(0, str.indexOf(".") + 3)
        } else {
            return str
        }
	}
	
	public isBalanceZero(n:number) {
		return this.formatGold(n)=="0.00";
	}
	
	// 获取各个路图所对应的图片
	private arrSprFrameRoad = [
		["he", "lon1", "hu1"],
		["", "tk1", "tk2"],
		["", "tk1", "tk2"],
		["", "ts1", "ts2"],
		["", "th1", "th2"]
	];
	// private arrSprPoker = ['poker_']

	public getSpriteFraRoad(roadInd:number, ind:number) {
		var imgName = this.arrSprFrameRoad[roadInd][ind];
		// if(imgName!="")		imgName = "/lhd/trend/" + imgName;
		return imgName;
	}

	// 返回[适配后的数组，大路分列数组与和的出现，大眼仔，小路，甲路]
	public generateGrpRoads(nums:number[]):any[] {
		// cc.log("generateGrp", nums)
		var obj = this.classifyBigRoadGroups(nums);
		var grpBigEyes = this.classifyBigEyesGroups(obj.groups);
		var grpSmallRoad = this.classfySmallRoad(obj.groups);
		var grpJiaRoad = this.classfyJiaRoad(obj.groups);
		
		var g = Conf.UIConf.RoadGrid;

		let lenGrp0 = obj.groups.length;
		obj.groups = this.oneRoad(g.BigRoad.c, g.BigRoad.r, obj.groups);
		let grpEqualOffset = lenGrp0 - obj.groups.length;
		for(var i in obj.equals) {// 处理因超出长度被裁剪导致的“和”的位置的偏移
			obj.equals[i].c -= grpEqualOffset;
		}

		grpBigEyes = this.oneRoad(g.ThreeRoad.c, g.ThreeRoad.r, grpBigEyes);
		grpSmallRoad = this.oneRoad(g.ThreeRoad.c, g.ThreeRoad.r, grpSmallRoad);
		grpJiaRoad = this.oneRoad(g.ThreeRoad.c, g.ThreeRoad.r, grpJiaRoad);

		// if(nums.length>48) {// 历史只显示最后48局
		// 	nums = nums.splice(nums.length-48);
		// }
		return [nums, obj, grpBigEyes, grpSmallRoad, grpJiaRoad];
	}

	private oneRoad(sCol:number, sRow:number, groups:StateCom.TypeBet[][], equals?:{c:number, r:number, s:number}[]) {
		if(this.overGrids(sCol, sRow, groups)) {
			groups.shift();
			return this.adjust(sCol, sRow, groups);
		}
		return groups;
	}
	private adjust(sCol:number, sRow:number, groups:StateCom.TypeBet[][]) {
		return this.oneRoad(sCol, sRow, groups)
	}

	public overGrids(sCol:number, sRow:number, groups:StateCom.TypeBet[][]): boolean {
		var sumG = groups.length;
		if(sumG>sCol) {
			return true;
		}
		var gridGroups:number[][] = [];
		for(var i=0; i<sCol; i++) {
			gridGroups.push(new Array(sRow));
		}
		
		for(var jC=0; jC<sumG; jC++) {// 每列
			var grp = groups[jC];
			var lenGrp = grp.length;
			if(lenGrp>sRow || gridGroups[jC][lenGrp-1]) {// 需要转弯：该组个数>行数 或 该组最后一个元素已经被占
				var indBtm = Math.min(sRow-1, lenGrp-2);// 该列最下面一个是空值的格子的索引
				while(gridGroups[jC][indBtm]==1) {
					indBtm--;// 该列的空值的索引
				}
				var sumTurn = lenGrp - indBtm - 1;
				for(var indC=jC+1; indC<=jC+sumTurn; indC++) {
					if(indC>=sCol)  return true;// 超出右边届
					gridGroups[indC][indBtm] = 1;// 标记后面的格子被占
				}
			}

		}
		return false;
	}
	// 
	public classifyBigEyesGroups(groups:StateCom.TypeBet[][]){
		return this.classifyCols(groups, 1);
	}
	public classfySmallRoad(groups:StateCom.TypeBet[][]) {
		return this.classifyCols(groups, 2);
	}
	public classfyJiaRoad(groups:StateCom.TypeBet[][]) {
		return this.classifyCols(groups, 3);
	}
	
	private classifyCols(groups:StateCom.TypeBet[][], colComp:number){
		var sumG0 = groups.length;
		if(sumG0<colComp+1 || (sumG0==colComp+1&&groups[colComp].length<2)) {
			// cc.log("")
			return [];
		}
		var ctrls = [];
		var i = groups[colComp].length>1 ? colComp : colComp+1;
		var j = i==colComp ? 1 : 0;
		for(; i<sumG0; i++) {
			var grpi = groups[i];
			var grpi_1 = groups[i-1];// 前一行
			var grpComp = groups[i-colComp];
			// cc.log("for-i-grpi", i, grpi);
			for(; j<grpi.length; j++) {
				var ctrl;
				if(j==0) {// 路头规则 
					var bhr = this.isTypeOneHallTwoRoom(groups[i-colComp-1], grpi_1.length);
					ctrl = bhr ? 2 : 1;
				} else {// 路中规则
					var bhr = this.isTypeOneHallTwoRoom(grpComp, j);
					ctrl = bhr ? 1 : 2;
				}
				ctrls.push(ctrl);
				// cc.log("for-j-grpi[j]-ctrl", j, grpi[j], ctrl);
			}
			j = 0;
		}

		var grps = [];
		var sumC = ctrls.length;
		var cCur = -1;
		for(var k=0; k<sumC; k++){
		var c0 = ctrls[k];
		if(c0!=cCur){
			cCur = c0;
			grps.push([]);
		}
		grps[grps.length-1].push(c0);
		}
		// cc.warn("classifyCols-2", colComp, grps);
		return grps;
	}
	// 是否是一厅两房
	private isTypeOneHallTwoRoom(nums:number[], iR:number) {
		return nums.length==iR;
	}

	public classifyBigRoadGroups(nums:StateCom.TypeBet[]) {
		var grps = [];
		var eauals :{c:number,r:number,s:number}[] = [];
		var sumN = nums.length;

		var i=0;
		var n0 = nums[i];

		if(n0==StateCom.TypeBet.Equal) {// 确定数组前头有几个和
			var equal = {c:0, r:0, s:1};
			for(i++; i<sumN; i++) {
				if(nums[i]==StateCom.TypeBet.Equal) equal.s++;
				else break;
			}
			eauals.push(equal);
		}
		// 确保了在此之前nums[i]!= .Equal
		for(; i<sumN; i++) {
			var ni = nums[i]
			var grpi = [ni];

			for(i++; i<sumN; i++) {
				var ipls = nums[i];

				if(ni==ipls) {
					grpi.push(ipls);
				} else if(ipls==StateCom.TypeBet.Equal) {
					var equal = {c:grps.length, r:grpi.length-1, s:1};
					for(i++; i<sumN; i++) {
						if(nums[i]==StateCom.TypeBet.Equal) equal.s++;
						else {
							i--;
							break;
						}
					}
					eauals.push(equal);
				} else {
					i--;
					break;
				}
			}

			grps.push(grpi);
		}
		// cc.warn("nums = ", nums);
		// cc.warn("grps = ", grps);
		// cc.warn("equals = ", eauals);
		return {groups:grps, equals: eauals};
	}

	public cliBigEyesGroups(){

	}

	/**
	 * 计算我每种投注类型的盈亏值， 返回数组[和，龙，虎，总]
	 * @param infoBet 
	 * @param luncky 
	 * @param tax 
	 */
	public compOffsetOfTypes(infoBet:StateCom.InfoBet[], luncky:StateCom.TypeBet, tax:number=0.05) {
		var lossRates = Conf.GamePlayWay.ARR_LOSS_PERCENT;
		var total = 0;
		var eaual = 0;
		var dragon = 0;
		var tiger = 0;
		
		var isLuckyEqual = luncky == StateCom.TypeBet.Equal;
		for(var i=0; i<infoBet.length; i++) {
		var bt = infoBet[i];
		var yes = luncky==bt.type;
		switch(bt.type) {
			case StateCom.TypeBet.Equal:
			if(yes) {
				eaual += bt.val * lossRates[bt.type] * (1-tax);
			} else {
				eaual -= bt.val;
			}
			break;
			case StateCom.TypeBet.Dragon:
			if(yes) {
				dragon += bt.val * lossRates[bt.type] * (1-tax);
			} else {
				dragon -= isLuckyEqual ? 0 : bt.val;
			}
			break;
			case StateCom.TypeBet.Tiger:
				if(yes) {
				tiger += bt.val * lossRates[bt.type] * (1-tax);
				} else {
				tiger -= isLuckyEqual ? 0 : bt.val;
				}
		}
		}
		total = eaual+dragon+tiger;
		return [eaual, dragon, tiger, total];//和，龙，虎，总
	}

	public getSumLuckyOfTypes(nums:StateCom.TypeBet[]) {
		var arr = [0, 0, 0];
		for(var i in nums) {
		var k = nums[i];
		arr[k] = arr[k] + 1;
		}
		return arr;
	}

	// 将续投的值（同一押注类型）分解成1，10，100，500, 1000
	public splitJetKeepBet(nVal:number) {
		var arrList = [];
		var arrSum = [];// 1, 5, 10, 50, 100, 500, 1000
		if(nVal<5) {
			arrSum[0] = nVal;
		} else if(nVal<10) {// 5~9
			arrSum[1] = 1;//5
			arrSum[0] = nVal%5;//1
		} else if(nVal<50) {// 10~49
			arrSum[2] = Math.floor(nVal/10); // 10
			nVal = nVal%10
			arrSum[1] = Math.floor(nVal/5) // 5
			arrSum[0] = nVal>5 ? (nVal%5) : nVal;
		} else if(nVal<100) { // 50~99
			arrSum[3] = Math.floor(nVal/50) // 50
			nVal = nVal%50
			arrSum[2] = Math.floor(nVal/10); // 10
			nVal = nVal%10
			arrSum[1] = Math.floor(nVal/5) // 5
			arrSum[0] = nVal>5 ? (nVal%5) : nVal;// 1
		} else if(nVal<500) {// 100~499
			arrSum[4] = Math.floor(nVal/100)// 100
			nVal = nVal%100
			arrSum[3] = Math.floor(nVal/50) // 50
			nVal = nVal%50
			arrSum[2] = Math.floor(nVal/10); // 10
			nVal = nVal%10
			arrSum[1] = Math.floor(nVal/5) // 5
			arrSum[0] = nVal>5 ? (nVal%5) : nVal;// 1
		} else if(nVal<1000) {// 500~999
			arrSum[5] = Math.floor(nVal/500) // 500
			nVal -= 500
			arrSum[4] = Math.floor(nVal/100) // 100
			nVal = nVal%100
			arrSum[3] = Math.floor(nVal/50) // 50
			nVal = nVal%50
			arrSum[2] = Math.floor(nVal/10); // 10
			nVal = nVal%10
			arrSum[1] = Math.floor(nVal/5) // 5
			arrSum[0] = nVal>5 ? (nVal%5) : nVal;// 1
		} else {// 1000~
			arrSum[6] = Math.floor(nVal/1000);// 1000
			nVal = nVal%1000
			arrSum[5] = Math.floor(nVal/500) // 500
			nVal = nVal%500
			arrSum[4] = Math.floor(nVal/100) // 100
			nVal = nVal%100
			arrSum[3] = Math.floor(nVal/50) // 50
			nVal = nVal%50
			arrSum[2] = Math.floor(nVal/10); // 10
			nVal = nVal%10
			arrSum[1] = Math.floor(nVal/5) // 5
			arrSum[0] = nVal>5 ? (nVal%5) : nVal;// 1
		}
		const arrJet = [1, 5, 10, 50, 100, 500, 1000]
		for(var i=0; i<arrSum.length; i++) {
			var ele = arrJet[i]//i<3 ? (Math.pow(10,i)) : (i==3 ? 500 : 1000);
				, s = arrSum[i]
			for(var j=0; j<s; j++)  arrList.push(ele);
		}
		// if(arrList.length>5)  arrList.splice(0, arrList.length-5);// 只取堆在上面最大的5个
		arrList = arrList.reverse();
		return arrList;
	}

	public getRoomInfoListLobby(roomNumber:string, roomList:StateCom.RoomInfoOfLobby[]):StateCom.RoomInfoOfLobby {
		for(var i=0; i<roomList.length; i++) {
		var rm = roomList[i];
		if(rm.roomNumber==roomNumber) return rm;
		}
	}
	// public getUrlHead(ind:string) {
	//   if(ind.indexOf(".png")) ind = ind.substr(0,ind.length-4);
	//   var nInd:number = parseInt(ind);
	//   var sumPhotos: number = 20;// TODO 
	//   if(nInd>sumPhotos)   nInd = nInd%sumPhotos + 1;
	//   ind = ""+nInd;
	//   if(nInd<10) ind = "0"+ind; 
	//   return Conf.AppConfig.IconPath+ind;
	// }
	public getUrlHead(ind:string):number {
		if(ind.indexOf(".png")) ind = ind.substr(0,ind.length-4);
		var nInd:number = parseInt(ind);
		var sumPhotos: number = 10;// TODO
		nInd = nInd%sumPhotos;
		// if(nInd<10) ind = "0"+ind; 
		return nInd;//Conf.AppConfig.IconPath+
	}

	// <=5是桌面展示玩家, 6表示在线玩家
	public whichUserBetOnDesk(userID:number): number {
		var arrUser = StateGame.roomPlayInfo.arrUserInfoDesk;
		var nInd:number = -1;
		for(var i=0; i<arrUser.length; i++) {
		if(arrUser[i].userID==userID) {
			nInd = i;
			break;
		}
		}
		if(nInd==-1)  nInd = 6;// 在线玩家索引
		return nInd;
	}

	public isMe(userID:number) {
		return userID == Conf.AppConfig.UserID;
	}

	public canBetMeNow(): boolean {
		// cc.log("canBet:", 
		//   StateGame.myLocalPlayInfo.levelBetCan < 1 , 
		//   StateGame.isStatusNotBetting(), 
		//   // StateGame.roomPlayInfo.luckyNum > -1,
		//   !StateGame.clientIntInfo.logined,
		//   !StateGame.clientIntInfo.canTouchMap
		// );
		if (StateGame.myLocalPlayInfo.levelBetCan < 1 || StateGame.isStatusNotBetting()
			|| !StateGame.clientIntInfo.logined || !StateGame.clientIntInfo.canTouchMap || !StateGame.clientIntInfo.onService) //|| StateGame.roomPlayInfo.luckyNum > -1
			return false;
		
		return true;
	}

	// TODO 可以投的骰子种类
	public levelCanBetByBalance(nBalance: number) :number {
		var nLevel:number = -1;
		var cf :number[] = Conf.GamePlayWay.BALANCE_AT_LEAST_CAN_PLAY;
		for(var i=0; i<cf.length; i++) {
			if(nBalance<cf[i]) {
				nLevel = i;
				break;
			}
		}
		if(nLevel==-1)  nLevel = Conf.GamePlayWay.BALANCE_AT_LEAST_CAN_PLAY.length;
		return nLevel;
	}

	public getStringLucky(luckyNum:string) :string {
		return luckyNum.split(",").join("")
	}

	public getAnimalFromLucky(luckyNum:string) :StateCom.TypeBet {
		let a = luckyNum.split(",")
			, dragon = parseInt(a[0])
			, tiger = parseInt(a[4])

		let animal = StateCom.TypeBet.Equal
		if(dragon>tiger)	animal = StateCom.TypeBet.Dragon
		else if(dragon<tiger)	animal = StateCom.TypeBet.Tiger

		return animal
	}

	public getChineseAnimalFromLucky(luckyNum:string) :string {
		if(luckyNum[0]=="-")	return "-"
		
		let a = this.getAnimalFromLucky(luckyNum)
		let animal = "和"
		if(a==StateCom.TypeBet.Dragon)	animal = "龙"
		else if(a==StateCom.TypeBet.Tiger)	animal = "虎"
		return animal
	}

	// 
	public getPrizeTypesFromLuckyNum(luckyNum:string, position:number) :StateCom.TypeBet[] {
		let a = []
		let s = this.getStringLucky(luckyNum)
			, n = parseInt(s[position-1])
		let animalType = this.getAnimalFromLucky(luckyNum)
			, bigSmallType = n<5 ? StateCom.TypeBet.Small : StateCom.TypeBet.Big
			, oddEvenType = n%2==0 ? StateCom.TypeBet.Even : StateCom.TypeBet.Odd
		a.push(animalType, bigSmallType, oddEvenType)
		return a
	}

	// // 计算该局的进程时间信息 0~
	// public computeRoundProgressByStart(numStartTime :number, timeStampMilNow :number) {
	// 	let secondProgOfRound :number = Math.max(0, parseInt((timeStampMilNow)/1000+"") - numStartTime);// 防止<0?
	// 	// console.warn(numStartTime, secondProgOfRound);
	// 	let roundStatus :StateCom.RoundState;// = secondNow<conf.GamePlayWay.BETTING_TIME ? StateCom.RoundState.BETTING : StateCom.RoundState.ACCOUNTING;
	// 	let secondOfStatus :number;// 该阶段剩余时间
	// 	let percentByMil :number = 0;// 剩余时间所占该阶段的百分比，在大厅进度条中用到
	// 	// cc.log("c1", numStartTime, timeStampMilNow, secondProgOfRound);
		
	// 	if(secondProgOfRound <= Conf.GamePlayWay.BLOCK_BETTING_TIME) {
	// 		roundStatus = StateCom.RoundState.BETTING;
	// 		secondOfStatus = Conf.GamePlayWay.BLOCK_BETTING_TIME - secondProgOfRound;
	// 		percentByMil = this.computeTimePassedPercentOfBetting(numStartTime, timeStampMilNow);// secondOfStatus / Conf.GamePlayWay.BETTING_TIME;
	// 	} else if(secondProgOfRound <= Conf.GamePlayWay.ACCOUNTING_TIME) {
	// 		roundStatus = StateCom.RoundState.BLOCK_BETTING;
	// 		// secondOfStatus = Conf.GamePlayWay.ACCOUNTING_TIME - secondProgOfRound;
	// 	} else if() {
	// 		roundStatus = StateCom.RoundState.GET_PRIZE;
	// 		secondOfStatus = Math.max(0, Conf.GamePlayWay.ACCOUNTING_TIME-(secondProgOfRound - Conf.GamePlayWay.BETTING_TIME));
	// 	} else {

	// 	}
	// 	return {status: roundStatus, second: secondOfStatus, percent:percentByMil};
	// }

	public computeTimePassedPercentOfBetting(numStartTime :number, timeStampNow :number) {
		let milSecondStartTime :number = numStartTime*1000;
		let milSecondTotal :number = Conf.GamePlayWay.BETTING_TIME*1000;
		let milSecondTimePassed :number = timeStampNow -  milSecondStartTime;
		let percent :number = milSecondTimePassed/milSecondTotal;
		return percent;
	}

	public ParaUrlString(src: string, SeparatorM: string, SeparatoS: string) {
		let ParaMap = {};
		let factors = src.split(SeparatorM);
		for(var i = 0; i < factors.length; i ++) {
			let finals = factors[i].split(SeparatoS);
			ParaMap[finals[0]] = finals[1];
		}
		// cc.log("ParaMap:",ParaMap);
		return ParaMap;
	}
  
}
}
export default new LHD.StateTools();