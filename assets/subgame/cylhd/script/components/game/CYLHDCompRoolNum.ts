const {ccclass, property} = cc._decorator;

@ccclass
export default class CYLHDCompRoolNum extends cc.Component {

	@property(cc.Label)
	labels:cc.Label[] = [];// 2个动画数字

	@property(cc.Font)
	fonts:cc.Font[] = [];// 蓝/黄 字体
	
	private currentNum:number
	private pos = {
		top: 54,
		middle: 0,
		bottom: -54,
	}
	private indAction:number
	private ArrDuration:number[] = [0.12, 0.24, 0.6]
	private LoopDuration:number = 0.12

	onLoad() {
		this.currentNum = parseInt(this.labels[0].string)
		this.setCompNum(this.currentNum)
	}

	onDisable() {
		this.stopActionOfLabels()
	}

	setNumStatistic(n:number) {
		this.stopActionOfLabels()

		this.currentNum = n
		this.setCompNum(n)
	}

	startActionLoop() {
		this.stopActionOfLabels()
		this.loopTween()
	}

	stopActionOfLabels() {
		this.labels.forEach(l=>{
			cc.Tween.stopAllByTarget(l.node)
		})
	}

	tweenToTargetNum(n:number) {
		this.stopActionOfLabels()
		
		this.currentNum = (n+10-this.ArrDuration.length) % 10
		this.setCompNum(this.currentNum)

		this.indAction = 0
		this.queueTween()
	}

	updateFont(selected:boolean) {
		let ind:number = selected ? 1 : 0
		this.labels.forEach(v=>{
			v.font = this.fonts[ind]
		})
	}

	private queueTween() {
		const d = this.ArrDuration[this.indAction]

		cc.tween(this.labels[0].node)
			.to(d, {y: this.pos.middle})
			.start()

		cc.tween(this.labels[1].node)
			.to(d, {y: this.pos.bottom})
			.call(()=>{
				this.currentNum = (this.currentNum+1)%10
				this.setCompNum(this.currentNum)

				this.indAction++
				if(this.indAction<this.ArrDuration.length) {
					this.queueTween()
				} else {
					this.resultTween()
				}
			})
			.start()
	}
	private resultTween() {
		this.stopActionOfLabels()

		const p = 0.6
			, d = this.ArrDuration[this.ArrDuration.length-1]*p
			, dl = 0.2

		cc.tween(this.labels[0].node)
			.to(d, {y: (this.pos.top + this.pos.middle)*p}, {easing: "quadOut"})
			.delay(dl)
			.to(d, {y: this.pos.top}, {easing: "quadIn"})
			.start()

		cc.tween(this.labels[1].node)
			.to(d, {y: (this.pos.middle + this.pos.bottom)*p}, {easing: "quadOut"})
			.delay(dl)
			.to(d, {y: this.pos.middle}, {easing: "quadIn"})
			.start()
	}
	
	private loopTween() {
		cc.tween(this.labels[0].node)
			.to(this.LoopDuration, {y: this.pos.middle})
			.start()

		cc.tween(this.labels[1].node)
			.to(this.LoopDuration, {y: this.pos.bottom})
			.call(()=>{
				this.currentNum = (this.currentNum+1)%10
				this.setCompNum(this.currentNum)
				this.loopTween()
			})
			.start()
	}

	private setCompNum(n:number) {
		let topNum = (n+1)%10
		this.setLabelNum(0, topNum)
		this.setLabelPosition(0, this.pos.top)

		this.setLabelNum(1, n)
		this.setLabelPosition(1, this.pos.middle)
	}

	private setLabelPosition(ind:number, posY:number) {
		this.labels[ind].node.y = posY
	}

	private setLabelNum(ind:number, n) {
		this.labels[ind].string = '' + n
	}

}
