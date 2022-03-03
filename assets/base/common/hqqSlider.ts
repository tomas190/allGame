import * as cc from 'cc';
const {ccclass, property} = cc._decorator;

@ccclass('hqqSlider')
export default class hqqSlider extends cc.Component {
    progressbar:cc.ProgressBar | null = null;
    slider:cc.Slider | null = null;
    callback:Function = null;
    onLoad (){
        this.progressbar = this.node.getChildByName("progressBar").getComponent(cc.ProgressBar);
        this.slider = this.node.getComponent(cc.Slider);

        if(cc.isValid(this.slider)){
        let slideEventHandler = new cc.EventHandler();
        slideEventHandler.target = this.node;
        slideEventHandler.component = "hqqSlider";
        slideEventHandler.handler = "onSliderChange";
        if(this.slider.slideEvents.length > 0 ){
        this.slider.slideEvents[0] = slideEventHandler;
        } else{
        this.slider.slideEvents.push(slideEventHandler);
        }
        }
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