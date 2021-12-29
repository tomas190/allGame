
const {ccclass, property} = cc._decorator;

@ccclass
export default class Config extends cc.Component {
    @property()
    public token:string='e40f01afbb1b9ae3dd6747ced5bca532'
    //获取url参数
    public getUrlData(){
        var path = location.search;
        var arr:any = {};
        path.slice(1).split('&').map(e => e.split('=')).forEach(e => arr[e[0]] = e[1]);
        if(arr.env=='dev'){
            this.token = 'e40f01afbb1b9ae3dd6747ced5bca532'
        }else if(arr.env =='pre'){
            this.token = 'e40f01afbb1b9ae3dd6747ced5bca532'
        }else if(arr.env =='online'){
            this.token = 'e40f01afbb1b9ae3dd6747ced5bca532'
        }

        return arr;
    }
    //复制内容到剪贴板
    public copyToClipBoard(str) {
        var app = cc.find('Canvas/Main').getComponent('payMain');
        if(document.execCommand){
            try
            {
                let input = document.createElement("input");
                input.readOnly = true;
                input.value = str;
                document.body.appendChild(input);
                this.selectText(input,0,str.length);
                input.setSelectionRange(0, input.value.length);
                document.execCommand("Copy");
                document.body.removeChild(input);
                app.showAlert(`复制成功！${str}`);
            } catch (err)
            {
                app.showAlert(`复制失败！${err}`);
            }
        }else{
            app.showAlert(`无法使用复制，请升级系统！`);
        }

    }
    selectText(textbox, startIndex, stopIndex) {
        if(textbox.createTextRange) {//ie
            var range = textbox.createTextRange();
            range.collapse(true);
            range.moveStart('character', startIndex);//起始光标
            range.moveEnd('character', stopIndex - startIndex);//结束光标
            range.select();//不兼容苹果
        }else{//firefox/chrome
            textbox.setSelectionRange(startIndex, stopIndex);
            textbox.focus();
        }
    }
    //保留两位小数
    public toDecimal(num) {
        num = Math.abs(num).toFixed(7)
        var result = num.toString()
        if (isNaN(result)) {
        cc.log('传递参数错误，请检查！')
        return ''
        }
        let newNum = result.indexOf(".") >-1 ?result.substring(0,result.indexOf(".")+3) :result;
        var pos_decimal = newNum.indexOf('.')
        while (newNum.length > 1 && newNum.length <= pos_decimal + 2) {
        newNum += '0'
        }

        return newNum
    }
     
    //保留一位小数
    public toDecimal1(num) {
        num = Math.abs(num).toFixed(7)
        var result = num.toString()
        if (isNaN(result)) {
        cc.log('传递参数错误，请检查！')
        return ''
        }
        let newNum = result.indexOf(".") >-1 ?result.substring(0,result.indexOf(".")+2) :result;
        var pos_decimal = newNum.indexOf('.')
        while (newNum.length > 1 && newNum.length <= pos_decimal + 1) {
        newNum += '0'
        }

        return newNum
    }
    //保留小数,不超过2位
    public toDecimal2(num) {
        num = Math.abs(num).toFixed(7)
        var result = num.toString()
        if (isNaN(result)) {
        cc.log('传递参数错误，请检查！')
        return ''
        }
        let newNum = result.indexOf(".") >-1 ?result.substring(0,result.indexOf(".")+3) :result;
        return newNum
    }
    //时间戳转换 日期加时间
    public getTime(time){
        var date = new Date(time * 1000);    //根据时间戳生成的时间对象
        var m = date.getMonth() + 1 > 9 ? date.getMonth()+1 : `0${date.getMonth()+1}`;
        var d = date.getDate()  > 9 ? date.getDate(): `0${date.getDate()}`;
        var h = date.getHours()  > 9 ? date.getHours() : `0${date.getHours()}`;
        var minute = date.getMinutes()  > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
        var s = date.getSeconds()  > 9 ? date.getSeconds(): `0${date.getSeconds()}`;
        var newDate =  m + "-" + d + " " + h + ":" + minute + ":" + s;
        return newDate;
    }
    //时间戳转换 只要日期
    public getDate(time){
        var date = new Date(time * 1000);    //根据时间戳生成的时间对象
        var y = date.getFullYear();
        var m = date.getMonth() + 1 > 9 ? date.getMonth()+1 : `0${date.getMonth()+1}`;
        var d = date.getDate()  > 9 ? date.getDate(): `0${date.getDate()}`;
        var newDate = y+ '-' + m + "-" + d ;
        return newDate;
    }
    //时间戳转换 只要时间
    public getTime2(time){
        var date = new Date(time * 1000);    //根据时间戳生成的时间对象
        var h = date.getHours()  > 9 ? date.getHours() : `0${date.getHours()}`;
        var minute = date.getMinutes()  > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
        var s = date.getSeconds()  > 9 ? date.getSeconds(): `0${date.getSeconds()}`;
        var newDate = h + ":" + minute + ":" + s;
        return newDate;
    }
    public testBankNum(num){
        console.log(num)
        if (isNaN(num)) {
            alert('传递参数错误，请检查！');
            return '';
        }
        var data = num.replace(/\s/g,'').replace(/(\d{3})\d+(\d{4})$/, "$1************$2") ;
        return data;

    }
    public testAdressNum(str){
        let newStr = ''
        if(str.length > 8){
            var startStr = str.slice(0,4)
            var endStr = str.slice(str.length-4)
            newStr = startStr +"******"+ endStr
        }else{
            var startStr = str.slice(0,2)
            var endStr = str.slice(str.length-2)
            newStr = startStr +"******"+ endStr
        }
        return newStr;

    }
    public testZfbNum(num){
        var num1 = num.slice(0,2)
        var num2 = num.substring(num.length-2)
        var num3 = num1+'************'+num2
        return num3
    }
    public randId(minNum,maxNum){
        var num = parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
        var num1 = `${num}`.slice(0,3)
        var num2 = `${num}`.substring(`${num}`.length-3)
        var num3 = num1+'***'+num2
        return num3
    }
    public randNum(minNum,maxNum){
        var num = parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
        return num
    }
    public transitionTime(time){
        let transTime =``
        if(time <10){
            transTime = `0${time}:00`
        }else{
            if(time == 24){
                transTime = `23:59:59`
            }else{
                transTime = `${time}:00`
            }
            
        }
        return transTime
    }
}
