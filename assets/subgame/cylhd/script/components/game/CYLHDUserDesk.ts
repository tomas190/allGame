//  桌面玩家
import AssistFunc from '../../CYLHDAssistFunc';
import StateTools from '../../CYLHDStateTools';
const {ccclass, property} = cc._decorator;

@ccclass
export default class CYLHDUserDesk extends cc.Component {

	@property
	index: number = 0;// 0～5的位置索引

	private userID;
	private headpos:cc.Vec2=null;

	onLoad() {
		this.headpos = this.node.getChildByName("head").getPosition();
	}

	public initView(info) {
		if(!cc.isValid(this.node))return;
		if(!info) {
			this.node.active = false
			return
		}
		this.node.getChildByName('lab_info_nick').getComponent(cc.Label).string = info.userName
		this.setCoin(info.balance-info.lockMoney)
		let h = this.node.getChildByName('head')
			, i = h.getChildByName('m').getChildByName('icon_tx')
		if(this.userID!=info.userID) {
			cc.tween(h)
				.to(0.2, {scaleX:0})
				.call(()=>{
					AssistFunc.setHeadIcon(info.headUrl, i, 82, 82)
				})
				.to(0.2, {scaleX:1})
				.start()
		}
		this.userID = info.userID

		this.node.active = true;
	}
	
	// 设置某桌面玩家的金币值
	public setCoin(v:number) {
		if(!cc.isValid(this.node))return;
		this.node.getChildByName('lab_info_gold').getComponent(cc.Label).string = Math.floor(v).toString();
	}
	// 下注时甩动某桌面玩家的头像
	public shakeHead() {
		let u = this.node.getChildByName("head");//Users[ind];
		if(this.index>0 && this.index<4) {
			cc.tween(u)
				.to(0.15,{position:cc.v3(this.headpos.x+20,u.y,0)})
				.to(0.1,{position:cc.v3(this.headpos.x,u.y,0)})
				.start();
		} else {
			cc.tween(u)
				.to(0.15,{position:cc.v3(this.headpos.x-20,u.y,0)})
				.to(0.1,{position:cc.v3(this.headpos.x,u.y,0)})
				.start();
		}
	}
	// 用户赢金币的特效
	public shineWinDeskUser(v:number) {
		if(!cc.isValid(this.node))return;
		let vs = StateTools.valShow(v)
			, noOffset = vs=="0.00"
		// console.log('shineWinDeskUser', this.index, noOffset, v, vs)
		if(noOffset)	return

		let isWin = parseFloat(vs)>0
		let m = this.node.getChildByName(isWin ? 'addMoney' : 'unaddMoney')
		m.getChildByName('label').getComponent(cc.Label).string = vs.replace(/\./g,'/').replace(/\-/,'')
		m.active = true
		setTimeout(()=>{
			m.active = false
		}, 2000)

		if(!isWin)	return

		let spine = this.node.getChildByName('spine');
		spine.active = true;
		AssistFunc.playSpine(spine,'tou_eff_shiny',false,()=>{});
		AssistFunc.playSpine(spine,'win',false,()=>{
			spine.active= false;
		});
	}

}
