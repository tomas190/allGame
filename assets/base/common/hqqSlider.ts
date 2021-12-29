const {ccclass, property} = cc._decorator;

@ccclass
export default class hqqSlider extends cc.Component {

    progressbar:cc.ProgressBar = null;
    slider:cc.Slider = null;
    callback:Function = null;

    onLoad (){
        this.progressbar = this.node.getChildByName("progressBar").getComponent(cc.ProgressBar);
        this.slider = this.node.getComponent(cc.Slider);
    }
 
    setCallBackOnChange(callback){
        this.callback = callback;
    }
 
    setProgress(value){
        this.progressbar.progress = value;
        this.slider.progress = value;        
    }
 
    onSliderChange(slider, customEventData){
        this.progressbar.progress = slider.progress;
        if(this.callback) {
            this.callback(this.progressbar.progress);
        }
    }
 
    getProgress() {
        return this.progressbar.progress;
    }
}
