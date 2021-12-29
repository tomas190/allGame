import IM_DataTool from "../IM_util/IM_DataTool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class IMCHatItem extends cc.Component {

    @property(cc.Label)
    content: cc.Label = null;
    @property(cc.Label)
    time: cc.Label = null;
    @property(cc.Node)
    chatBg: cc.Node = null;
    @property
    HzWidth: number = 25;//汉字字符宽度
    @property
    NumasWidth: number = 14;//数字和小写字母特殊字符字符宽度
    @property
    AWidth: number = 17;//大写字母字符宽度
    @property
    lineHeight: number = 25;//字符高度
    @property
    maxWidth: number = 500;//最大宽度
    @property
    minHeight: number = 25;//最小高度

    /**
     * @method 设置聊天内容
     * @param content 聊天内容
     */
    setContent(str: string, sendTime: number) {
        //时间
        if (sendTime) {
            this.time.string = IM_DataTool.timestampToTime(sendTime);
            this.time.node.active = true;
        } else {
            this.time.node.active = false;
        }

        let strArr: string[] = str.split("");
        let len = this.countTotalLength(strArr);
        this.content.node.setContentSize(this.maxWidth, this.lineHeight);
        // cc.log("maxWidth==>",len)
        let Width = 0;
        let Height = 0;
        //计算换行符
        let testStr = str.replace(/\n/g, "<br/>");
        let testArr: string[] = testStr.split("<br/>");
        // console.log("换行符：", testStr);
        // console.log("testArr == ", testArr.length);

        if (testArr.length == 1) {
            if (len <= this.maxWidth) {
                Width = len + 50;
                Height = this.lineHeight + 30;
            } else {
                Width = this.maxWidth + 50;
                Height = Math.ceil(len / this.maxWidth) * this.lineHeight + 30;
            }
        }
        //有换行显示
        if (testArr.length > 1) {
            Width = this.maxWidth + 50;
            Height = testArr.length * this.lineHeight + 30;
        }
        this.content.string = str;
        // cc.log("ContentSize==>",Width,Height);
        this.chatBg.setContentSize(cc.size(Width, Height));

    }

    //计算字符串的总长度
    countTotalLength(arr: string[]) {
        let len = 0;
        for (let i = 0; i < arr.length; ++i) {
            len += this.getWidth(arr[i]);
        }
        return len;
    }

    //返回每个字符所占的宽度
    getWidth(str: string) {
        let pattern1 = new RegExp("[.`!*()|{}':;,/\\[\\].|{}‘”“' ]");
        let pattern2 = new RegExp("[~@#$^&=<>《》?~@#￥…&*（）——{}【】；：。，、？]");
        let pattern3 = new RegExp("[`*()|{}':;',/\\[\\].！|{}‘”“']");
        let width = 0;
        if (pattern1.test(str)) {//判断特殊字符
            width = 7;
        } else if (pattern2.test(str)) {
            width = 17;
        } else if (/.*[\u4e00-\u9fa5]+.*/.test(str)) {//判断汉字
            width = this.HzWidth;
        } else if (/^[0-9]+.?[0-9]*$/.test(str)) {//判断数字
            width = this.NumasWidth;
        } else if (/^[A-Z]+$/.test(str)) {//判断大写字母
            width = this.AWidth;
        } else if (/^[a-z]+$/.test(str)) {//判断小写字母
            width = this.NumasWidth;
        } else {//其他鬼东西
            width = this.NumasWidth;
        }
        return width;
    }

}
