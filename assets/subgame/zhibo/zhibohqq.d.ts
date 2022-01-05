// hqq
declare namespace hqq {
	export var isDebug:boolean;
	export var gameGlobal;
	export var subGameList;
	export var eventMgr;
	export var audioMgr;
	export var hallConfig;
	export var isOtherGame:boolean;
	export var language;
	export var zhiboRes;
	export var logMgr;
	export var reflect;
	export var gameUser;
	export var app;
}
// tip
interface messageObj {
    str?:       string,
    okFn?:      Function,
    noFn?:      Function,
    closeFn?:   Function,
}
// time
interface dateObj{
    year:   string,
    month:  string,
    date:   string,
    hour:   string,
    min:    string,
    sec:    string,
}
// roomListObj
interface roomList{
	name:	 string,
	game:	 string,
	room:	 string,
	roomUrl: string,
	imgUrl:  string,
}