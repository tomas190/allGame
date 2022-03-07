import * as cc from "cc";

declare global {
	export interface hqqinterface {
		isOtherGame?:boolean|null;
		needShowNotice?:boolean|null;
		language?:string|null;
		isDebug?:boolean|null;
		gameGlobal?:any|null;
		agaGame?:any|null;
		agaSubGameList?:any|null;
		subGameList?:any|null;
		hallConfig?:any|null;
		subModel?:any|null;
		oldGameList?:any|null;
		gameUser?:any|null;
		delaySub?:any|null;
		unusestrlist?:any|null;
		webAcconunt?:any|null;
		webAcconuntPass?:any|null;
		webDeviceid?:any|null;
		webUpAgent?:any|null;
		webToken?:any|null;
		webGameID?:any|null;
		setFuxinHallIdType();
		setJudingHallIdType();
		getSpriteFrame(path:string,Res?:cc.AssetManager.Bundle);
		imgLoad(node:cc.Node, path:string);
		getTip(tipname:string);
		btnLoad(node:cc.Node, normal:any, pressed?:any, interactable?:boolean);
		editboxTipLoad(node:cc.Node, tipname:string);
		skeletonLoad(node:cc.Node, path:any, aniname:string, loop:boolean,Res?:any);
		setWidget(node:cc.Node, config:any);
		addNode(node:cc.Node, cfg:any);
		setSprite(node:cc.Node, cfg:any);
		setBtn(node:cc.Node, cfg:any);
		setToggle(node:cc.Node, cfg:any);
		setLabel(node:cc.Node, cfg:any);
		setSkeleton(node:cc.Node, cfg:any);
		setEditbox();
		setScrollView(node:cc.Node, cfg:any);
		checkNode(node:cc.Node);
		setNode(node:cc.Node, cfg:any);
		checkIsAgaSubgame(key:string);
		circleBy(duration:number, dot:any, r:number, angle:number, initangle:number)
		hotUpdateMgr?:any|null;
		loginMgr?:any|null;
		eventMgr?:any|null;
		audioMgr?:any|null;
		reflect?:any|null;
		commonTools?:any|null;
		languageTip?:any|null;
		base64?:any|null;
		app?:any|null;
		iosReflect?:any|null;
		http?:any|null;
		localStorage?:any|null;
		logMgr?:any|null;
		viewCtr?:any|null;
		HBYTick?:any|null;
		hallWebSocket?:any|null;
		HBYinfo?:any|null;
		JFCJinfo?:any|null;
		hallactivitybtn?:any|null;
		FenQudao?:boolean|null;
		pinpaiSubGameList?:any|null;
		game2to1?:any|null;
		game1to2?:any|null;
		spriteResMap?:Map<string,cc.SpriteFrame>|null;
		needShowBubble?:boolean|null;
		hasLineChoiceLayer?:boolean|null;
		open_chongzhi?:boolean;
		open_tixian?:boolean;
		open_back_hall?:boolean;
		open_im?:boolean;
		open_proxy?:boolean;
		resetNineTwoSort?:boolean;
	}
	let hqq:hqqinterface;
	
	export interface APIAPP {
		closeWebview:Function;
	}
	
	export interface Window{
		$APIAPP:APIAPP;
		hqq:hqqinterface;
	}

	export class hqqNode extends cc.Node {
		customIndex: number;
		dpr: number;
		downflag: cc.Node;
		downflag2: cc.Node;
		progress: cc.Node;
		jiantou: cc.Node;
		tempdata: any;
		progresslabel: cc.Label;
	}
	export interface hqqSubgame {
		zhname: string, // 中文游戏名 
		enname: string, // 英文游戏名 （子游戏文件路径，更新子路径） 
		lanchscene: string, // 跳转场景名 
		fuxin_lanchscene: string, // 跳转场景名 
		xingui_lanchscene: string, // 跳转场景名 
		game_id: string,
		serverUrl: string, // 游戏服务器地址 
		endUrl: string, // 游戏服务器地址 
		hasAccount: boolean, // 是否已创建子游戏账号 
		remoteData: any, // 服务端发送过来的游戏数据 
		hallid: number,
		resPath: string,
		isDown: boolean,
		gameType: number, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4 
		loginHistory: Array<number>, // 子游戏最近一周登陆历史
		hasRes: boolean,
	}
	export interface noticeItem{
		text:string;
		time:number;
		rollforver:boolean;
	}
	export interface upgrade{
		url: string,
		index:number,
		time:number,
		err: any
	}
}

declare module "cc"{
	interface Node{
		zIndex:number;
		_myIndex_:number;
		get x():number;
		set x(value:number);
		get y():number;
		set y(value:number);
		// height:number;
		// width:number;
		setPositionEx(...args):void;
		setScaleEx(...args):void;
		addChildEx(child:Node, zIndex?:number, name?:string):void;
	}
	interface Scene{
		zIndex:number;
		addChildEx(child:Node, zIndex?:number, name?:string):void;
	}
	interface Button{
		_myinfo:upgrade;
		_hqqDelay:boolean;
		_hqqDelayTime:number;
		hqqsetDelay(on:boolean);
		hqqDelay(event?: EventTouch);

		_hqqSoundon:boolean;
		tocheEndClose(...args):void;
		setSoundEffect(on:boolean):void;
		hqqEffect():void;
		_onTouchEnded(...args):void;
	}
}
